"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // The word "SOVEREIGN" zooms toward camera as you scroll
    const wordScale = useTransform(scrollYProgress, [0, 0.5], [1, 8]);
    const wordOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
    const wordY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);

    // Tagline fades in as word fades out
    const taglineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Background gradient intensifies
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            {/* Sticky container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                    <motion.div
                        style={{ opacity: bgOpacity }}
                        className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black to-black"
                    />
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/20 rounded-full blur-[200px]" />
                    </div>
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center px-6">
                    {/* The massive word */}
                    <motion.h1
                        style={{
                            scale: wordScale,
                            opacity: wordOpacity,
                            y: wordY,
                        }}
                        className="text-[15vw] md:text-[12vw] font-bold tracking-tighter leading-none select-none"
                    >
                        <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                            SOVEREIGN
                        </span>
                    </motion.h1>

                    {/* Tagline below */}
                    <motion.div
                        style={{ opacity: taglineOpacity }}
                        className="mt-8"
                    >
                        <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl mx-auto">
                            The operating system for independent professionals
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-10">
                            <Link href="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
                                >
                                    Start Free
                                </motion.button>
                            </Link>
                            <Link href="#product">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 text-lg font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    See How It Works
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: taglineOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowDown className="w-6 h-6 text-white/40" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
