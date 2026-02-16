'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValueEvent, MotionValue } from 'framer-motion';

interface DB11ScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function DB11ScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath
}: DB11ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            // Correct filename format: ezgif-frame-001.jpg
            const filename = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            const img = new Image();
            img.src = `${imageFolderPath}/${filename}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            };

            // Handle potential errors (e.g., missing frame)
            img.onerror = () => {
                console.error(`Failed to load image: ${filename}`);
                loadedCount++; // Still count to avoid hanging
                if (loadedCount === totalFrames) {
                    setImagesLoaded(true);
                }
            }

            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    // Handle Canvas Drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to window size * pixelRatio
        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Scale context
            ctx.scale(dpr, dpr);

            // Draw current frame immediately after resize
            drawFrame(currentFrame);
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [imagesLoaded, images, currentFrame]); // Re-run if these change

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        // Safety checks
        if (!canvas || !ctx || !images[index]) return;

        const img = images[index];
        const dpr = window.devicePixelRatio || 1;

        // Calculate scaled dimensions to "contain"
        // Canvas visual size (CSS pixels)
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            // Image is taller than canvas
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Sync scroll progress to frame index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!imagesLoaded) return;

        // Convert 0-1 progress to frame index (0 to totalFrames - 1)
        const frameIndex = Math.min(
            Math.max(Math.floor(latest * (totalFrames - 1)), 0),
            totalFrames - 1
        );

        setCurrentFrame(frameIndex);
        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    return (
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-aston-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-contain"
                style={{ width: '100%', height: '100%' }}
            />
            {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-aston-black z-50">
                    <div className="text-aston-lime font-orbitron text-xl animate-pulse">
                        INITIALIZING SYSTEMS...
                    </div>
                </div>
            )}
        </div>
    );
}
