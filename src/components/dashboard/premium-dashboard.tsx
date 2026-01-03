"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    Zap,
    Check,
    X,
    DollarSign,
    Users,
    FileText,
    Clock,
    Send,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ============================================================================
// SOVEREIGN DASHBOARD HOME - Bento Grid Command Center
// ============================================================================

interface DashboardProps {
    clerkId: string;
}

export function PremiumDashboard({ clerkId }: DashboardProps) {
    const [showNudge, setShowNudge] = useState(true);

    // Mock Agent Activity
    const agentLogs = [
        { id: "1", agent: "Invoicer", action: "Generated invoice", target: "#1024 for Apex Corp", time: "2m ago", status: "complete" as const },
        { id: "2", agent: "Scheduler", action: "Booked meeting", target: "with Sarah Chen", time: "15m ago", status: "complete" as const },
        { id: "3", agent: "Negotiator", action: "Drafting follow-up", target: "for overdue invoice #892", time: "now", status: "processing" as const },
        { id: "4", agent: "Compliance", action: "Verified tax status", target: "Q4 2025 filings", time: "1h ago", status: "complete" as const },
    ];

    // Mock Approvals
    const approvals = [
        { id: "1", trigger: "Client requested meeting", action: "Send 3 available slots for next week", confidence: 98 },
        { id: "2", trigger: "Invoice #892 is 7 days overdue", action: "Send polite payment reminder", confidence: 94 },
        { id: "3", trigger: "Contract expiring in 14 days", action: "Initiate renewal discussion", confidence: 87 },
    ];

    return (
        <div className="p-6 space-y-6 relative min-h-full">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight">Command Center</h1>
                    <p className="text-sm text-slate-500">Real-time overview of your business operations.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-white transition-colors">
                        Export Report
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm text-white font-medium transition-colors flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Quick Action
                    </button>
                </div>
            </div>

            {/* ================================================================ */}
            {/* BENTO GRID */}
            {/* ================================================================ */}
            <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">

                {/* HERO TILE: Financial Pulse (2x2) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-2 row-span-2 rounded-2xl bg-[#0a0f1a] border border-white/5 p-6 flex flex-col hover:border-white/10 transition-colors"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">Financial Pulse</h3>
                                <p className="text-xs text-slate-500">Net cash flow & runway</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                            <ArrowUpRight className="w-3 h-3" />
                            +24.5%
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="flex-1 relative">
                        <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40 V150 H0 Z" fill="url(#pulseGrad)" />
                            <path d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40" fill="none" stroke="#10b981" strokeWidth="2" />
                            <circle cx="400" cy="40" r="5" fill="#10b981" className="animate-pulse" />
                        </svg>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
                        <Stat label="Revenue" value="$84,250" />
                        <Stat label="Runway" value="8.2 mo" color="text-emerald-400" />
                        <Stat label="Pending" value="$12,400" color="text-amber-400" />
                    </div>
                </motion.div>

                {/* FEED TILE: Agent Activity (1x2) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 row-span-2 rounded-2xl bg-[#0a0f1a] border border-white/5 flex flex-col overflow-hidden hover:border-white/10 transition-colors"
                >
                    <div className="p-4 border-b border-white/5 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-sm font-medium text-white">Agent Activity</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-[11px]">
                        {agentLogs.map((log) => (
                            <div key={log.id} className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        log.status === "complete" ? "bg-emerald-500" : "bg-cyan-500 animate-pulse"
                                    )} />
                                    <span className="text-cyan-400">[{log.agent}]</span>
                                    <span className="text-slate-500 ml-auto">{log.time}</span>
                                </div>
                                <p className="text-slate-300 pl-3.5">
                                    {log.action} <span className="text-white">{log.target}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-white/5">
                        <button className="w-full text-xs text-slate-500 hover:text-white transition-colors">
                            View full audit log →
                        </button>
                    </div>
                </motion.div>

                {/* ACTION TILE: Triage (1x2) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-1 row-span-2 rounded-2xl bg-[#0a0f1a] border border-white/5 flex flex-col overflow-hidden hover:border-white/10 transition-colors"
                >
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <h3 className="text-sm font-medium text-white">Triage</h3>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                            <span className="text-xs font-medium text-amber-400">{approvals.length}</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {approvals.map((item) => (
                            <div key={item.id} className="p-3 rounded-xl bg-[#0d1424] border border-white/5 hover:border-white/10 transition-colors">
                                <p className="text-xs text-slate-400 mb-1">{item.trigger}</p>
                                <p className="text-xs text-white mb-2">{item.action}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-emerald-400">{item.confidence}%</span>
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                                            <Check className="w-3 h-3" />
                                        </button>
                                        <button className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* HEALTH TILES (1x1 each) */}
                <HealthTile icon={DollarSign} label="Revenue Today" value="$2,450" status="green" delay={0.4} />
                <HealthTile icon={Users} label="Active Clients" value="12" status="green" delay={0.45} />
                <HealthTile icon={FileText} label="Pending Contracts" value="3" status="amber" delay={0.5} />
                <HealthTile icon={Clock} label="Hours This Week" value="32.5h" status="green" delay={0.55} />
            </div>

            {/* ================================================================ */}
            {/* AGENTIC NUDGE OVERLAY */}
            {/* ================================================================ */}
            <AnimatePresence>
                {showNudge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#0a0f1a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white">
                                        Client <span className="text-cyan-400 font-medium">'Apex'</span> requested a meeting.
                                    </p>
                                    <p className="text-xs text-slate-400">3 available slots found. Send proposal?</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <button
                                    onClick={() => setShowNudge(false)}
                                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    Send
                                </button>
                                <button
                                    onClick={() => setShowNudge(false)}
                                    className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function Stat({ label, value, color = "text-white" }: { label: string; value: string; color?: string }) {
    return (
        <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</p>
            <p className={cn("text-lg font-semibold", color)}>{value}</p>
        </div>
    );
}

function HealthTile({
    icon: Icon,
    label,
    value,
    status,
    delay
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    status: "green" | "amber" | "red";
    delay: number;
}) {
    const colors = {
        green: "bg-emerald-500",
        amber: "bg-amber-500",
        red: "bg-red-500",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="col-span-1 row-span-1 rounded-2xl bg-[#0a0f1a] border border-white/5 p-4 flex flex-col justify-between hover:border-white/10 transition-colors"
        >
            <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-slate-500" />
                <div className={cn("w-2 h-2 rounded-full", colors[status])} />
            </div>
            <div>
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-xl font-semibold text-white">{value}</p>
            </div>
        </motion.div>
    );
}
