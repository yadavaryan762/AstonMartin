'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
                isScrolled ? "bg-aston-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
            )}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="flex items-center">
                <Link href="/" className="font-orbitron text-xl md:text-2xl font-bold tracking-widest text-white hover:text-aston-lime transition-colors">
                    ASTON MARTIN
                </Link>
            </div>

            <button className="group relative px-6 py-2 overflow-hidden border border-aston-lime/50 bg-transparent text-white font-rajdhani font-medium tracking-wider uppercase hover:border-aston-lime transition-colors">
                <span className="relative z-10 group-hover:text-aston-black transition-colors duration-300">Inquire</span>
                <div className="absolute inset-0 bg-aston-lime transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
        </motion.nav>
    );
}
