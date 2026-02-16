'use client';

import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DB11ScrollCanvas from '@/components/DB11ScrollCanvas';
import DB11Experience from '@/components/DB11Experience';
import { carData } from '@/data/carData';

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate total frames to display
  // We have 240 frames total.
  const TOTAL_FRAMES = 240;
  const IMAGE_FOLDER = 'images/db11-sequence';

  return (
    <main className="bg-aston-black min-h-screen">
      <Navbar />

      {/* Main Scroll Section */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Canvas Layer */}
          <div className="absolute inset-0 z-0">
            <DB11ScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={TOTAL_FRAMES}
              imageFolderPath={IMAGE_FOLDER}
            />
          </div>

          {/* HUD Overlay Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <DB11Experience scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </section>

      {/* Content Below Scroll Sequence (Optional/Additional Info) */}
      <div className="relative z-20 bg-aston-black py-24 px-6 md:px-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {carData.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-orbitron text-2xl text-aston-lime mb-2">{feature.title}</h3>
              <p className="font-rajdhani text-lg text-gray-300 leading-relaxed border-l border-white/20 pl-4">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="font-rajdhani text-gray-500 text-sm">
            ASTON MARTIN DB11 EXPERIENCE &copy; 2024
          </p>
        </footer>
      </div>
    </main>
  );
}
