"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { KineticText } from "@/components/ui/KineticText";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Background parallax
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    // Content fade
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section ref={containerRef} className="relative h-screen overflow-hidden bg-black text-white">
            {/* Immersive Depth: Background */}
            <motion.div
                style={{ y: bgY, scale: bgScale }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-neutral-950/80 z-10" />
                <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />
                {/* Spotlight Effect */}
                <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-purple-500/20 blur-[120px] animate-spotlight" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[100px] animate-float delay-1000" />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    style={{ opacity: contentOpacity, scale: contentScale }}
                    className="max-w-5xl mx-auto space-y-12"
                >
                    {/* Kinetic Typography */}
                    <div className="overflow-hidden">
                        <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter select-none mix-blend-difference">
                            <KineticText className="block text-white" intensity={2}>
                                ABSOLUTE
                            </KineticText>
                            <KineticText className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50" intensity={4}>
                                CONTROL
                            </KineticText>
                        </h1>
                    </div>

                    <p className="max-w-xl mx-auto text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
                        The operating system for the world's most <span className="text-white font-medium">ambitious</span> independent minds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/signup">
                            <button className="px-10 py-5 rounded-full bg-white text-black font-semibold text-lg tracking-tioght hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.7)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,1)]">
                                Start Now
                            </button>
                        </Link>
                        <p className="text-sm text-neutral-500 uppercase tracking-widest text-[10px]">
                            No credit card required
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Scroll</span>
                        <ArrowDown className="w-4 h-4 text-neutral-600 animate-bounce" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
