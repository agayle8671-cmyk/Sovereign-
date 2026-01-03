"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { springs } from "@/lib/animations";
import { Shield, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

export function ProductShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // 3D rotation transforms
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Callout animations
    const callout1Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const callout2Progress = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const callout3Progress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-black overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={springs.smooth}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        See it in action
                    </h2>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Watch how Sovereign analyzes contracts and protects your business
                        in real-time
                    </p>
                </motion.div>

                {/* 3D Product Preview */}
                <div className="relative" style={{ perspective: 1200 }}>
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            scale,
                            opacity,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Browser Frame */}
                        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                            {/* Browser Chrome */}
                            <div className="bg-neutral-900 border-b border-white/10 px-4 py-3 flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1.5 rounded-lg bg-neutral-800 text-sm text-neutral-400">
                                        app.sovereign.com/contracts/analyze
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="relative bg-neutral-950 aspect-[16/10]">
                                {/* Sidebar */}
                                <div className="absolute top-0 left-0 bottom-0 w-56 bg-neutral-900/80 border-r border-white/5 p-4">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-semibold text-white text-sm">Sovereign</span>
                                    </div>
                                    <div className="space-y-1">
                                        {["Dashboard", "Contracts", "Clients", "Portfolio", "Testimonials"].map(
                                            (item, i) => (
                                                <div
                                                    key={item}
                                                    className={`px-3 py-2 rounded-lg text-sm ${i === 1
                                                            ? "bg-white/10 text-white"
                                                            : "text-neutral-400"
                                                        }`}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="absolute top-0 left-56 right-0 bottom-0 p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                Contract Analysis
                                            </h3>
                                            <p className="text-sm text-neutral-400">
                                                Acme_Consulting_Agreement.pdf
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-sm font-medium">
                                                Medium Risk
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-3 gap-4 h-[calc(100%-80px)]">
                                        {/* Document Preview */}
                                        <div className="col-span-2 rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                                            <div className="space-y-3">
                                                {[...Array(8)].map((_, i) => (
                                                    <div key={i} className="flex gap-2">
                                                        <div
                                                            className={`h-3 rounded ${i === 2 || i === 5
                                                                    ? "flex-1 bg-red-500/20 border-l-2 border-red-500"
                                                                    : i === 3
                                                                        ? "flex-1 bg-amber-500/20 border-l-2 border-amber-500"
                                                                        : "w-3/4 bg-white/5"
                                                                }`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Risk Panel */}
                                        <div className="rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Shield className="w-5 h-5 text-indigo-400" />
                                                <span className="font-medium text-white text-sm">
                                                    Risk Score
                                                </span>
                                            </div>
                                            <div className="text-4xl font-bold text-amber-400 mb-4">
                                                67%
                                            </div>
                                            <div className="space-y-2">
                                                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                                    <div className="flex items-center gap-2">
                                                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                                                        <span className="text-xs text-red-400">
                                                            Unlimited revisions
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                    <div className="flex items-center gap-2">
                                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                                        <span className="text-xs text-amber-400">
                                                            NET-60 payment
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-xs text-emerald-400">
                                                            IP protection
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Callouts */}
                    <motion.div
                        style={{
                            opacity: callout1Progress,
                            x: useTransform(callout1Progress, [0, 1], [-50, 0]),
                        }}
                        className="absolute top-1/4 -left-4 max-w-xs"
                    >
                        <div className="p-4 rounded-xl bg-neutral-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">
                                        AI Contract Shield
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        Scans 50+ risk factors instantly
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: callout2Progress,
                            x: useTransform(callout2Progress, [0, 1], [50, 0]),
                        }}
                        className="absolute top-1/3 -right-4 max-w-xs"
                    >
                        <div className="p-4 rounded-xl bg-neutral-900/90 backdrop-blur-sm border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Risk Detection</p>
                                    <p className="text-xs text-neutral-400">
                                        Found 3 issues to negotiate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: callout3Progress,
                            y: useTransform(callout3Progress, [0, 1], [30, 0]),
                        }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-xs"
                    >
                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">
                                        AI Negotiation Ready
                                    </p>
                                    <p className="text-xs text-neutral-300">
                                        Click to generate counter-offer email
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
