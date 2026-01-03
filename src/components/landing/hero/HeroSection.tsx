"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { springs, stagger } from "@/lib/animations";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { ScrollIndicator } from "./ScrollIndicator";

const features = [
    "AI contract analysis",
    "Risk detection in seconds",
    "Auto-generate counteroffers",
];

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Animations driven by scroll
    const headlineScale = useTransform(scrollYProgress, [0, 0.4], [1, 2.5]);
    const headlineOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
    const headlineY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const badgeOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const badgeY = useTransform(scrollYProgress, [0, 0.1], [0, -30]);

    const ctaOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const ctaY = useTransform(scrollYProgress, [0, 0.2], [0, 30]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[200vh]" // Extra height for scroll
        >
            {/* Background */}
            <HeroBackground scrollProgress={scrollYProgress} />

            {/* Sticky Content Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Announcement Badge */}
                    <motion.div
                        style={{ opacity: badgeOpacity, y: badgeY }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.smooth, delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                            </span>
                            <span className="text-sm text-neutral-300">
                                Now with AI-powered contract negotiation
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        style={{
                            scale: headlineScale,
                            opacity: headlineOpacity,
                            y: headlineY,
                        }}
                        className="mb-6"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...springs.smooth, delay: 0.2 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                        >
                            <span className="text-white">The Operating System</span>
                            <br />
                            <span className="text-white">for the </span>
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Business of One
                                </span>
                                {/* Underline accent */}
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                                        stroke="url(#underline-gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#818cf8" />
                                            <stop offset="50%" stopColor="#c084fc" />
                                            <stop offset="100%" stopColor="#f472b6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </motion.h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div style={{ opacity: subtitleOpacity, y: subtitleY }}>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...springs.smooth, delay: 0.35 }}
                            className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed"
                        >
                            Sovereign automates 50% of your admin work. Defend contracts.
                            Generate leads. Collect proof. All from one intelligent platform.
                        </motion.p>

                        {/* Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...springs.smooth, delay: 0.45 }}
                            className="flex flex-wrap items-center justify-center gap-3 mb-10"
                        >
                            {features.map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ ...springs.bouncy, delay: 0.5 + i * 0.08 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                                >
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm text-neutral-300">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        style={{ opacity: ctaOpacity, y: ctaY }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.smooth, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/signup">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={springs.snappy}
                                className="group relative px-8 py-4 text-base font-semibold text-white rounded-full overflow-hidden"
                            >
                                {/* Animated gradient bg */}
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-shimmer" />
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
                                <span className="relative flex items-center gap-2">
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springs.snappy}
                            className="group flex items-center gap-3 px-6 py-4 text-base font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                                <Play className="w-4 h-4 text-white ml-0.5" />
                            </div>
                            Watch Demo
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <ScrollIndicator scrollProgress={scrollYProgress} />
            </div>
        </section>
    );
}
