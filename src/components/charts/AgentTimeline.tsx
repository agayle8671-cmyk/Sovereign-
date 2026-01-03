"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface Activity {
    id: string | number;
    agent: string;
    action: string;
    time: string;
    confidence?: number;
    status?: string;
    target?: string;
}

interface AgentTimelineProps {
    data: Activity[];
    className?: string;
}

export function AgentTimeline({ data, className }: AgentTimelineProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 flex flex-col hover:border-white/[0.08] transition-colors overflow-hidden group h-full",
                className
            )}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-white">Agent Activity</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <p className="text-[10px] text-zinc-500">Operating normally</p>
                    </div>
                </div>
            </div>

            <div className="relative flex-1 pl-2">
                {/* Vertical Spine */}
                <div className="absolute top-2 left-[19px] bottom-4 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent" />

                <div className="space-y-4">
                    {data.slice(0, 5).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex gap-3 group/item"
                        >
                            {/* Node */}
                            <div className="relative z-10 mt-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0f0f12] border-2 border-indigo-500 group-hover/item:border-indigo-400 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pb-1">
                                <div className="flex items-center justify-between mb-0.5">
                                    <span className="text-xs font-medium text-white">{item.agent}</span>
                                    <span className="text-[10px] text-zinc-600">{item.time}</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-snug line-clamp-2 group-hover/item:text-zinc-300 transition-colors">
                                    {item.action}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -right-10 top-1/2 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

        </motion.div>
    );
}
