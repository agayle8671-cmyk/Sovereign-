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

    const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section id="product" ref={containerRef} className="relative py-32 bg-black overflow-hidden">
            {/* Spotlight Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neutral-900/30 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-[0.2em] mb-4">
                        The Interface
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        Total Clarity.
                    </h2>
                </div>

                <motion.div
                    style={{ scale, opacity }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-xl shadow-2xl"
                >
                    {/* Fake Browser Chrome */}
                    <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[10px] text-neutral-500 font-mono">
                            sovereign.app/dashboard
                        </div>
                    </div>

                    {/* Dashboard UI */}
                    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Col: Analysis */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-medium text-white">Contract Analysis</h3>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs uppercase tracking-wide border border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                                    AI Active
                                </span>
                            </div>

                            {/* Document Simulation */}
                            <div className="space-y-4 p-6 rounded-2xl bg-black border border-white/5">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className={`h-2 rounded-full bg-neutral-800 ${i === 2 ? "w-11/12" : "w-full"}`} />
                                        {i === 1 && (
                                            <div className="p-3 rounded-lg bg-red-500/10 border-l-2 border-red-500 my-4 ml-4">
                                                <p className="text-xs text-red-400 font-medium mb-1">Risk Detected: Unlimited Liablity</p>
                                                <p className="text-[10px] text-red-400/60">Clause 2.4 exposes you to uncapped damages.</p>
                                            </div>
                                        )}
                                        <div className={`h-2 rounded-full bg-neutral-800 ${i === 4 ? "w-4/5" : "w-full"}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Col: Stats */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10">
                                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Health Score</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-bold text-white">92</span>
                                    <span className="text-emerald-400 text-sm mb-1">Anomalies Resolved</span>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-white/5">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <span className="text-sm text-neutral-300">Auto-Negotiation</span>
                                </div>
                                <p className="text-xs text-neutral-500 leading-relaxed">
                                    Sovereign has automatically drafted 3 counter-clauses to protect your interests.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-dashed border-white/10 flex items-center justify-center text-neutral-600 text-sm">
                                + Connect CRM
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
