"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

export function ProductSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

    // Callouts appear at different scroll points
    const callout1 = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
    const callout2 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
    const callout3 = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

    return (
        <section
            id="product"
            ref={containerRef}
            className="relative min-h-[200vh] py-32"
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Section label */}
                <motion.p
                    style={{ opacity }}
                    className="text-sm uppercase tracking-[0.3em] text-white/40 mb-8"
                >
                    Contract Shield
                </motion.p>

                {/* Main headline */}
                <motion.h2
                    style={{ opacity, y }}
                    className="text-5xl md:text-7xl font-bold text-center mb-16 max-w-4xl px-6"
                >
                    AI that reads contracts
                    <br />
                    <span className="text-white/40">so you don't have to.</span>
                </motion.h2>

                {/* Product visualization - Full bleed dashboard */}
                <motion.div
                    style={{ scale, opacity }}
                    className="relative w-full max-w-6xl mx-auto px-6"
                >
                    {/* The dashboard itself - no chrome, just the UI */}
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 shadow-2xl shadow-purple-500/10">
                        {/* Dashboard header */}
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Contract Analysis</p>
                                        <p className="text-sm text-white/40">Acme_Agreement_v2.pdf</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium">
                                        3 Issues Found
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard content */}
                        <div className="p-6 grid grid-cols-3 gap-6">
                            {/* Document preview */}
                            <div className="col-span-2 space-y-4">
                                <div className="p-4 rounded-2xl bg-white/5">
                                    <div className="space-y-3">
                                        {/* Simulated document lines */}
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-4 rounded ${i === 2
                                                        ? "bg-red-500/30 w-full"
                                                        : i === 5
                                                            ? "bg-amber-500/30 w-4/5"
                                                            : i === 7
                                                                ? "bg-red-500/30 w-3/4"
                                                                : "bg-white/5 w-full"
                                                    }`}
                                                style={{ width: i === 2 || i === 5 || i === 7 ? undefined : `${70 + Math.random() * 30}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Risk panel */}
                            <div className="space-y-4">
                                {/* Risk score */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                                    <p className="text-sm text-white/60 mb-2">Risk Score</p>
                                    <p className="text-5xl font-bold text-amber-400">67</p>
                                    <p className="text-sm text-white/40 mt-1">Medium Risk</p>
                                </div>

                                {/* Issues list */}
                                <div className="space-y-2">
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                                        <span className="text-sm text-red-400">Unlimited revisions</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                                        <span className="text-sm text-amber-400">NET-60 payment</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span className="text-sm text-emerald-400">IP protected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating callouts */}
                    <motion.div
                        style={{ opacity: callout1 }}
                        className="absolute -left-4 top-1/4 max-w-[280px]"
                    >
                        <div className="p-4 rounded-2xl bg-black/90 backdrop-blur border border-white/10 shadow-xl">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">AI Analysis</p>
                                    <p className="text-xs text-white/60 mt-1">
                                        Scans 50+ risk factors in under 30 seconds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: callout2 }}
                        className="absolute -right-4 top-1/3 max-w-[280px]"
                    >
                        <div className="p-4 rounded-2xl bg-black/90 backdrop-blur border border-white/10 shadow-xl">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Risk Detection</p>
                                    <p className="text-xs text-white/60 mt-1">
                                        Highlights dangerous clauses instantly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ opacity: callout3 }}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-6 max-w-[320px]"
                    >
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur border border-purple-500/30 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Generate Counter-Offer</p>
                                    <p className="text-xs text-white/60">AI writes your negotiation email</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
