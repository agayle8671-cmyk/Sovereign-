"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Play,
    Shield,
    Zap,
    Target,
    CheckCircle,
    Star,
} from "lucide-react";

const stats = [
    { value: "10,000+", label: "Freelancers Protected" },
    { value: "$2.4M", label: "Risk Identified" },
    { value: "4.9/5", label: "Average Rating" },
];

const features = [
    "AI-powered contract analysis",
    "Risk detection in seconds",
    "Negotiation email generator",
];

export function PremiumHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient orbs */}
                <motion.div
                    style={{ y }}
                    className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full"
                >
                    <div className="w-full h-full bg-brand-500/30 rounded-full blur-[100px]" />
                </motion.div>
                <motion.div
                    style={{ y }}
                    className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full"
                >
                    <div className="w-full h-full bg-cyan-500/20 rounded-full blur-[100px]" />
                </motion.div>
                <motion.div
                    style={{ y }}
                    className="absolute bottom-20 left-1/3 w-[600px] h-[600px] rounded-full"
                >
                    <div className="w-full h-full bg-purple-500/20 rounded-full blur-[120px]" />
                </motion.div>
            </div>

            <motion.div style={{ opacity }} className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Announcement badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                            </span>
                            <span className="text-sm font-medium text-brand-400">
                                Now with AI-powered contract negotiation
                            </span>
                            <ArrowRight className="w-4 h-4 text-brand-400" />
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                        >
                            <span className="text-white">The Operating System</span>
                            <br />
                            <span className="text-white">for the </span>
                            <span className="relative">
                                <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Business of One
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                >
                                    <path
                                        d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#818cf8" />
                                            <stop offset="50%" stopColor="#22d3ee" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            Sovereign automates 50% of your admin work. Defend contracts.
                            Generate leads. Collect proof. All from one intelligent platform
                            that works while you sleep.
                        </motion.p>

                        {/* Feature pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-3 mt-8"
                        >
                            {features.map((feature, index) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                                >
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm text-neutral-300">{feature}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                        >
                            <Link
                                href="/signup"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full overflow-hidden"
                            >
                                {/* Button background with animated gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 bg-[length:200%_100%] animate-gradient" />

                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Shadow */}
                                <div className="absolute inset-0 shadow-[0_0_40px_8px_rgba(99,102,241,0.3)] rounded-full" />

                                <span className="relative">Get Started Free</span>
                                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button className="group inline-flex items-center gap-3 px-6 py-4 text-base font-medium text-neutral-300 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <Play className="w-4 h-4 text-white ml-0.5" />
                                </div>
                                Watch Demo
                            </button>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-16 pt-10 border-t border-white/5"
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
                                {stats.map((stat, index) => (
                                    <div key={stat.label} className="text-center">
                                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                                        <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Rating stars */}
                            <div className="flex items-center justify-center gap-3 mt-8">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-neutral-400">
                                    Trusted by 10,000+ independent professionals
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="relative mt-20"
                    >
                        {/* Glow behind the preview */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/20 via-transparent to-transparent blur-3xl" />

                        {/* Browser window */}
                        <div className="relative mx-auto max-w-5xl">
                            {/* Browser chrome */}
                            <div className="rounded-t-2xl bg-neutral-800/80 backdrop-blur-xl border border-white/10 border-b-0 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="px-4 py-1.5 rounded-lg bg-neutral-900/80 text-sm text-neutral-400 flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                            app.sovereign.com/dashboard
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Screenshot */}
                            <div className="relative rounded-b-2xl overflow-hidden border border-white/10 border-t-0">
                                <div className="aspect-[16/9] bg-neutral-900">
                                    {/* Dashboard preview - simplified version */}
                                    <div className="p-6 h-full flex">
                                        {/* Sidebar */}
                                        <div className="w-48 bg-neutral-800/50 rounded-xl p-4 mr-4">
                                            <div className="w-8 h-8 rounded-lg bg-brand-500/20 mb-4" />
                                            <div className="space-y-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-8 rounded-lg ${i === 0 ? "bg-white/10" : "bg-white/5"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Main content */}
                                        <div className="flex-1 space-y-4">
                                            {/* Stats row */}
                                            <div className="grid grid-cols-4 gap-4">
                                                {[
                                                    { color: "cyan", value: "12" },
                                                    { color: "amber", value: "8" },
                                                    { color: "purple", value: "24" },
                                                    { color: "rose", value: "156" },
                                                ].map((stat, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-4 rounded-xl bg-neutral-800/50"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 mb-3`}
                                                        />
                                                        <div className="text-2xl font-bold text-white">
                                                            {stat.value}
                                                        </div>
                                                        <div className="h-3 w-16 bg-white/10 rounded mt-1" />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Content grid */}
                                            <div className="grid grid-cols-3 gap-4 flex-1">
                                                <div className="col-span-2 p-4 rounded-xl bg-neutral-800/50">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-6 h-6 rounded bg-cyan-500/20" />
                                                        <div className="h-4 w-32 bg-white/10 rounded" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {[...Array(3)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                                                            >
                                                                <div className="w-8 h-8 rounded-lg bg-white/10" />
                                                                <div className="flex-1">
                                                                    <div className="h-3 w-32 bg-white/10 rounded" />
                                                                    <div className="h-2 w-24 bg-white/5 rounded mt-1" />
                                                                </div>
                                                                <div className="h-6 w-12 rounded bg-emerald-500/20" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="p-4 rounded-xl bg-neutral-800/50">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <div className="w-6 h-6 rounded bg-amber-500/20" />
                                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        {[...Array(4)].map((_, i) => (
                                                            <div key={i} className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                                                <div className="flex-1">
                                                                    <div className="h-3 w-20 bg-white/10 rounded" />
                                                                </div>
                                                                <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating notification */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.5 }}
                                    className="absolute bottom-8 left-8 max-w-xs"
                                >
                                    <div className="p-4 rounded-xl bg-neutral-800/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                                                <Shield className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white text-sm">
                                                    Contract Analyzed
                                                </p>
                                                <p className="text-xs text-neutral-400 mt-0.5">
                                                    Found 3 risk clauses. Generating counteroffer...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-neutral-500">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-neutral-700 p-1"
                    >
                        <div className="w-1.5 h-2.5 rounded-full bg-neutral-500 mx-auto" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
