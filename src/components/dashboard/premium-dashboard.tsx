"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Users,
    Calendar,
    Wallet,
    Bell,
    Settings,
    ChevronDown,
    ChevronRight,
    Plus,
    Sparkles,
    Check,
    X,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Command,
    Activity,
    Zap,
    MessageSquare,
    CircleDot,
    Folder,
    FolderOpen,
    Send,
    MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface AgentLog {
    id: string;
    agent: string;
    action: string;
    target: string;
    timestamp: string;
    status: "complete" | "pending" | "processing";
}

interface ApprovalItem {
    id: string;
    trigger: string;
    proposedAction: string;
    confidence: number;
    timestamp: string;
}

// ============================================================================
// SOVEREIGN ACOS SHELL
// ============================================================================
interface DashboardProps {
    clerkId: string;
}

export function PremiumDashboard({ clerkId }: DashboardProps) {
    const [activeSpace, setActiveSpace] = useState<string | null>("apex");
    const [showNudge, setShowNudge] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Mock data for Agent Activity Feed
    const agentLogs: AgentLog[] = [
        { id: "1", agent: "Invoicer", action: "Generated invoice", target: "#1024 for Apex Corp", timestamp: "2m ago", status: "complete" },
        { id: "2", agent: "Scheduler", action: "Booked meeting", target: "with Sarah Chen", timestamp: "15m ago", status: "complete" },
        { id: "3", agent: "Negotiator", action: "Drafting follow-up", target: "for overdue invoice #892", timestamp: "now", status: "processing" },
        { id: "4", agent: "Compliance", action: "Verified tax status", target: "Q4 2025 filings", timestamp: "1h ago", status: "complete" },
    ];

    // Mock data for Approvals
    const approvals: ApprovalItem[] = [
        { id: "1", trigger: "Client requested meeting", proposedAction: "Send 3 available slots for next week", confidence: 98, timestamp: "5m ago" },
        { id: "2", trigger: "Invoice #892 is 7 days overdue", proposedAction: "Send polite payment reminder", confidence: 94, timestamp: "2h ago" },
        { id: "3", trigger: "Contract expiring in 14 days", proposedAction: "Initiate renewal discussion", confidence: 87, timestamp: "4h ago" },
    ];

    return (
        <div className="flex h-screen w-full bg-[#020617] overflow-hidden font-sans selection:bg-emerald-500/30 text-white">

            {/* ================================================================== */}
            {/* 1. VERTICAL COMMAND CENTER (The Sidebar) */}
            {/* ================================================================== */}
            <aside
                className={cn(
                    "flex flex-col h-screen bg-[#0a0f1a] border-r border-white/5 transition-all duration-300 shrink-0",
                    sidebarCollapsed ? "w-[60px]" : "w-[260px]"
                )}
            >
                {/* Header / Logo */}
                <div className="h-14 flex items-center px-4 border-b border-white/5 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 relative">
                        <span className="font-bold text-sm text-white">S</span>
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                    {!sidebarCollapsed && (
                        <span className="font-semibold text-[15px] tracking-tight text-white">Sovereign</span>
                    )}
                </div>

                {/* THE CORE (Pinned) - Section 2.2 */}
                <div className="p-3 space-y-1">
                    {!sidebarCollapsed && (
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-2 mb-2">
                            Core
                        </div>
                    )}
                    <NavItem icon={LayoutDashboard} label="Dashboard" active collapsed={sidebarCollapsed} />
                    <NavItem icon={Bell} label="Inbox" badge={3} collapsed={sidebarCollapsed} />
                    <NavItem icon={Calendar} label="Calendar" collapsed={sidebarCollapsed} />
                    <NavItem icon={Wallet} label="Financials" collapsed={sidebarCollapsed} />
                </div>

                {/* THE CONTEXT (Spaces) - Section 2.3 */}
                <div className="flex-1 p-3 border-t border-white/5 overflow-y-auto">
                    {!sidebarCollapsed && (
                        <div className="flex items-center justify-between mb-2 px-2">
                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                                Spaces
                            </span>
                            <button className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors">
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    <SpaceItem
                        name="Apex Corp"
                        color="bg-violet-500"
                        active={activeSpace === "apex"}
                        onClick={() => setActiveSpace("apex")}
                        collapsed={sidebarCollapsed}
                    />
                    <SpaceItem
                        name="Stark Industries"
                        color="bg-orange-500"
                        active={activeSpace === "stark"}
                        onClick={() => setActiveSpace("stark")}
                        collapsed={sidebarCollapsed}
                    />
                    <SpaceItem
                        name="Initech"
                        color="bg-cyan-500"
                        active={activeSpace === "initech"}
                        onClick={() => setActiveSpace("initech")}
                        collapsed={sidebarCollapsed}
                    />
                </div>

                {/* THE UTILITY (System) - Section 2.2 */}
                <div className="p-3 border-t border-white/5 space-y-1">
                    <NavItem icon={Settings} label="Settings" collapsed={sidebarCollapsed} />

                    {/* Cmd+K Hint - Section 6.1 */}
                    {!sidebarCollapsed && (
                        <button className="w-full flex items-center gap-2 px-2 py-2 text-xs text-slate-500 hover:text-white hover:bg-white/5 rounded-md transition-colors group">
                            <Command className="w-3.5 h-3.5" />
                            <span>Command Menu</span>
                            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 group-hover:border-slate-600">
                                ⌘K
                            </kbd>
                        </button>
                    )}
                </div>
            </aside>

            {/* ================================================================== */}
            {/* 2. MAIN CONTENT AREA */}
            {/* ================================================================== */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#020617] relative overflow-hidden">

                {/* Top Bar */}
                <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#020617]/80 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-sm font-medium text-white">Command Center</h1>
                        {activeSpace && (
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                                <div className="w-2 h-2 rounded-full bg-violet-500" />
                                <span className="text-xs font-medium text-violet-300">Apex Corp</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-md hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {/* Scrollable Canvas */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* ============================================================ */}
                    {/* 3. THE BENTO GRID DASHBOARD - Section 3.1, 3.2 */}
                    {/* ============================================================ */}
                    <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">

                        {/* HERO TILE: Financial Pulse (2x2) - Section 3.2.1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-[#0a0f1a] to-[#0d1424] border border-white/5 p-6 flex flex-col"
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

                            {/* Mock SVG Chart */}
                            <div className="flex-1 relative">
                                <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Area */}
                                    <path
                                        d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40 V150 H0 Z"
                                        fill="url(#pulseGradient)"
                                    />
                                    {/* Line */}
                                    <path
                                        d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2"
                                    />
                                    {/* Dots */}
                                    <circle cx="100" cy="90" r="4" fill="#10b981" />
                                    <circle cx="200" cy="60" r="4" fill="#10b981" />
                                    <circle cx="300" cy="80" r="4" fill="#10b981" />
                                    <circle cx="400" cy="40" r="5" fill="#10b981" className="animate-pulse" />
                                </svg>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Revenue</p>
                                    <p className="text-lg font-semibold text-white">$84,250</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Runway</p>
                                    <p className="text-lg font-semibold text-emerald-400">8.2 mo</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Pending</p>
                                    <p className="text-lg font-semibold text-amber-400">$12,400</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* FEED TILE: Agent Activity Log (1x2) - Section 3.2.2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="col-span-1 row-span-2 rounded-2xl bg-[#0a0f1a] border border-white/5 flex flex-col overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                <h3 className="text-sm font-medium text-white">Agent Activity</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-[11px]">
                                {agentLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                log.status === "complete" ? "bg-emerald-500" :
                                                    log.status === "processing" ? "bg-cyan-500 animate-pulse" :
                                                        "bg-amber-500"
                                            )} />
                                            <span className="text-cyan-400">[{log.agent}]</span>
                                            <span className="text-slate-500 ml-auto">{log.timestamp}</span>
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

                        {/* ACTION TILE: Triage / Pending Approvals (1x2) - Section 3.2.3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="col-span-1 row-span-2 rounded-2xl bg-[#0a0f1a] border border-white/5 flex flex-col overflow-hidden"
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
                                    <div
                                        key={item.id}
                                        className="p-3 rounded-xl bg-[#0d1424] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <p className="text-xs text-slate-400 mb-1">{item.trigger}</p>
                                        <p className="text-xs text-white mb-2">{item.proposedAction}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-emerald-400">{item.confidence}% confidence</span>
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
                            <div className="p-3 border-t border-white/5">
                                <button className="w-full text-xs text-slate-500 hover:text-white transition-colors">
                                    Open triage inbox →
                                </button>
                            </div>
                        </motion.div>

                        {/* HEALTH TILES (1x1 each) - Section 3.2.4 */}
                        <HealthTile label="Tax Compliance" status="green" value="Current" delay={0.4} />
                        <HealthTile label="Contract Status" status="amber" value="1 Expiring" delay={0.45} />
                        <HealthTile label="System Health" status="green" value="All Systems Go" delay={0.5} />
                        <HealthTile label="Client Coverage" status="green" value="100%" delay={0.55} />
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 4. AGENTIC OVERLAY: The Nudge - Section 4.1 */}
                {/* ============================================================ */}
                <AnimatePresence>
                    {showNudge && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50"
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
            </main>
        </div>
    );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function NavItem({
    icon: Icon,
    label,
    active = false,
    badge,
    collapsed = false,
}: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    badge?: number;
    collapsed?: boolean;
}) {
    return (
        <button
            className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all group",
                active
                    ? "bg-white/5 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className={cn("w-4 h-4 shrink-0", active ? "text-emerald-400" : "text-slate-500 group-hover:text-white")} />
            {!collapsed && (
                <>
                    <span>{label}</span>
                    {badge && (
                        <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                            {badge}
                        </span>
                    )}
                </>
            )}
        </button>
    );
}

function SpaceItem({
    name,
    color,
    active,
    onClick,
    collapsed = false
}: {
    name: string;
    color: string;
    active: boolean;
    onClick: () => void;
    collapsed?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all",
                active
                    ? "bg-white/5 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
        >
            <div className={cn("w-4 h-4 rounded shrink-0", color)} />
            {!collapsed && <span className="truncate">{name}</span>}
        </button>
    );
}

function HealthTile({
    label,
    status,
    value,
    delay
}: {
    label: string;
    status: "green" | "amber" | "red";
    value: string;
    delay: number;
}) {
    const statusColors = {
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
                <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
                <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
            </div>
            <p className="text-sm font-medium text-white">{value}</p>
        </motion.div>
    );
}
