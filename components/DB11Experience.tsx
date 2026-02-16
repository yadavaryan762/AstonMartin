'use client';

import { motion, useMotionValueEvent, MotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { carData } from '@/data/carData';

interface DB11ExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function DB11Experience({ scrollYProgress }: DB11ExperienceProps) {
    const [phase, setPhase] = useState<'hero' | 'design' | 'engine'>('hero');

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) {
            setPhase('hero');
        } else if (latest >= 0.33 && latest < 0.66) {
            setPhase('design');
        } else {
            setPhase('engine');
        }
    });

    // Animation variants
    const hudVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
    };

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16 h-screen">
            {/* Global HUD Elements (always visible) */}
            <div className="absolute top-8 left-8 w-64 h-px bg-white/10" />
            <div className="absolute top-8 right-8 w-64 h-px bg-white/10" />
            <div className="absolute bottom-8 left-8 w-64 h-px bg-white/10" />
            <div className="absolute bottom-8 right-8 w-64 h-px bg-white/10" />

            <div className="absolute top-8 left-8 w-px h-16 bg-aston-lime/50" />
            <div className="absolute top-8 right-8 w-px h-16 bg-aston-lime/50" />
            <div className="absolute bottom-8 left-8 w-px h-16 bg-aston-lime/50" />
            <div className="absolute bottom-8 right-8 w-px h-16 bg-aston-lime/50" />


            <AnimatePresence mode="wait">
                {phase === 'hero' && (
                    <motion.div
                        key="hero"
                        variants={hudVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-center justify-center h-full text-center"
                    >
                        <h1 className="font-orbitron text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(215,230,0,0.3)]">
                            {carData.hero.title}
                        </h1>
                        <p className="font-rajdhani text-xl md:text-2xl text-aston-lime tracking-widest mb-8">
                            {carData.hero.price}
                        </p>
                        <div className="border border-aston-lime/50 px-8 py-3 bg-aston-black/50 backdrop-blur-sm">
                            <span className="font-rajdhani tracking-[0.2em] text-white text-sm">SCROLL TO INITIALIZE</span>
                        </div>
                    </motion.div>
                )}

                {phase === 'design' && (
                    <motion.div
                        key="design"
                        variants={hudVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-start justify-center h-full max-w-xl ml-0 md:ml-12"
                    >
                        <div className="border-l-2 border-aston-lime pl-6 py-4 bg-aston-black/40 backdrop-blur-sm">
                            <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
                                {carData.design.title}
                            </h2>
                            <p className="font-rajdhani text-lg md:text-xl text-gray-300 leading-relaxed">
                                {carData.design.text}
                            </p>
                        </div>
                    </motion.div>
                )}

                {phase === 'engine' && (
                    <motion.div
                        key="engine"
                        variants={hudVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-end justify-center h-full max-w-xl ml-auto mr-0 md:mr-12 text-right"
                    >
                        <div className="border-r-2 border-aston-lime pr-6 py-4 bg-aston-black/40 backdrop-blur-sm">
                            <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-8">
                                {carData.engine.title}
                            </h2>
                            <div className="space-y-6">
                                {carData.engine.specs.map((spec, index) => (
                                    <div key={index} className="flex flex-col items-end">
                                        <span className="font-rajdhani text-sm text-aston-lime tracking-widest mb-1 block">
                                            {spec.label.toUpperCase()}
                                        </span>
                                        <span className="font-orbitron text-2xl md:text-4xl text-white block">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-aston-lime to-transparent opacity-50" />
            </div>
        </div>
    );
}
