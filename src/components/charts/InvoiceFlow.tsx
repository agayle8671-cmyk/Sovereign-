"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Wallet, Clock, CheckCircle2 } from "lucide-react";

interface InvoiceFlowProps {
    className?: string;
}

export function InvoiceFlow({ className }: InvoiceFlowProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Particle configuration
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 0.8,
        duration: 4 + Math.random() * 2,
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                "relative rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-6 overflow-hidden hover:border-white/[0.08] transition-all group",
                className
            )}
        >
            <div className="flex items-center justify-between mb-8 z-10 relative">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white">Cash Flow</h3>
                        <p className="text-[10px] text-zinc-500">Real-time settlement</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-zinc-500">Net Volume</p>
                    <p className="text-lg font-bold text-white tabular-nums">$98.2k</p>
                </div>
            </div>

            {/* Flow Visualization */}
            <div className="relative h-[160px] flex items-center justify-between px-4 z-10">

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                        <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    {/* Path 1: Pending -> Processing */}
                    <path
                        d="M60,80 C120,80 150,80 200,80"
                        stroke="url(#flowGrad)"
                        strokeWidth="40"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Path 2: Processing -> Paid */}
                    <path
                        d="M260,80 C320,80 350,80 420,80"
                        stroke="url(#flowGrad)"
                        strokeWidth="40"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Animated Particles */}
                    {mounted && particles.map(p => (
                        <motion.circle
                            key={p.id}
                            r="3"
                            fill="#fff"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            style={{
                                offsetPath: "path('M60,80 C120,80 150,80 420,80')",
                                opacity: 0.6
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: p.delay
                            }}
                        />
                    ))}
                </svg>

                {/* Nodes */}
                <FlowStep
                    icon={Clock}
                    label="Pending"
                    amount="$12.4k"
                    color="indigo"
                    delay={0}
                />

                <FlowStep
                    icon={ArrowRight}
                    label="Processing"
                    amount="$3.2k"
                    color="purple"
                    delay={0.2}
                    isProcessing
                />

                <FlowStep
                    icon={CheckCircle2}
                    label="Settled"
                    amount="$82.6k"
                    color="emerald"
                    delay={0.4}
                />

            </div>

            {/* Background glow */}
            <div className="absolute bottom-0 left-1/3 w-1/3 h-1/2 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />

        </motion.div>
    );
}

function FlowStep({ icon: Icon, label, amount, color, delay, isProcessing }: any) {
    const colorClasses = {
        indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    }[color as string];

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay }}
            className="flex flex-col items-center gap-3 z-10 bg-[#0f0f12] p-2 rounded-xl"
        >
            <div className={cn(
                "w-12 h-12 rounded-xl border flex items-center justify-center relative",
                colorClasses
            )}>
                <Icon className="w-5 h-5" />
                {isProcessing && (
                    <div className="absolute inset-0 border border-current rounded-xl animate-ping opacity-20" />
                )}
            </div>
            <div className="text-center">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-bold text-white">{amount}</p>
            </div>
        </motion.div>
    );
}
