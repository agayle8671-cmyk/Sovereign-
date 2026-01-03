"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    FileText,
    DollarSign,
    ArrowUpRight,
    MoreHorizontal,
    Activity,
    Zap,
    Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardProps {
    clerkId: string;
}

export function PremiumDashboard({ clerkId }: DashboardProps) {
    return (
        <div className="space-y-6">
            {/* 1. Header Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight">Overview</h1>
                    <p className="text-sm text-neutral-500">Real-time financial and operational data.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 text-xs gap-2 bg-[#1F1F1F] border-[#333] hover:bg-[#2F2F2F] text-neutral-300">
                        <Filter className="w-3 h-3" />
                        Filter View
                    </Button>
                    <Button className="h-8 text-xs bg-violet-600 hover:bg-violet-700 text-white border-0">
                        Export Report
                    </Button>
                </div>
            </div>

            {/* 2. Stats Grid (Excel-like Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1F1F1F] border border-[#1F1F1F] rounded-lg overflow-hidden">
                <StatCard
                    label="Total Revenue"
                    value="$124,500"
                    trend="+12%"
                    icon={DollarSign}
                />
                <StatCard
                    label="Active Clients"
                    value="42"
                    trend="+4"
                    icon={Users}
                />
                <StatCard
                    label="Pending Contracts"
                    value="7"
                    trend="High Risk"
                    trendColor="text-orange-500"
                    icon={FileText}
                />
                <StatCard
                    label="System Velocity"
                    value="98%"
                    trend="Optimal"
                    icon={Activity}
                />
            </div>

            {/* 3. Main Data Table Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: Recent Transactions / Activity */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Recent Activity</h2>
                    </div>

                    <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 p-3 border-b border-[#1F1F1F] bg-[#141414] text-xs font-medium text-neutral-500">
                            <div className="col-span-4">Entity</div>
                            <div className="col-span-3">Type</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-2 text-right">Value</div>
                        </div>

                        {/* Table Rows */}
                        {[
                            { name: "Acme Corp", type: "Contract Renewal", status: "Negotiating", value: "$12,000", statusColor: "text-orange-400 bg-orange-500/10" },
                            { name: "Stark Industries", type: "New Portfolio", status: "Published", value: "-", statusColor: "text-emerald-400 bg-emerald-500/10" },
                            { name: "Cyberdyne", type: "Retainer", status: "Active", value: "$4,500/m", statusColor: "text-blue-400 bg-blue-500/10" },
                            { name: "Globex", type: "Audit", status: "Pending", value: "$8,000", statusColor: "text-neutral-400 bg-neutral-500/10" },
                            { name: "Massive Dynamic", type: "Contract", status: "Signed", value: "$45,000", statusColor: "text-violet-400 bg-violet-500/10" },
                        ].map((row, i) => (
                            <div key={i} className="grid grid-cols-12 gap-4 p-3 border-b border-[#1F1F1F] hover:bg-[#1A1A1A] transition-colors items-center text-sm group cursor-pointer">
                                <div className="col-span-4 font-medium text-white flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-neutral-700 group-hover:bg-violet-500 transition-colors" />
                                    {row.name}
                                </div>
                                <div className="col-span-3 text-neutral-400">{row.type}</div>
                                <div className="col-span-3">
                                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium border border-transparent", row.statusColor)}>
                                        {row.status}
                                    </span>
                                </div>
                                <div className="col-span-2 text-right font-mono text-neutral-300">{row.value}</div>
                            </div>
                        ))}
                        <div className="p-2 text-center">
                            <button className="text-xs text-neutral-500 hover:text-white transition-colors">View All Transactions</button>
                        </div>
                    </div>
                </div>

                {/* Right: Insights & Quick Actions */}
                <div className="space-y-4">
                    <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide">AI Insights</h2>
                    <div className="bg-gradient-to-b from-violet-900/10 to-[#0F0F0F] border border-violet-500/20 rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-medium text-violet-100">Opportunity Detected</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            Based on recent contract velocity, you have capacity to take on <strong>2 more retainers</strong> this month. Acme Corp's renewal is also actionable.
                        </p>
                        <Button className="w-full mt-4 h-8 text-xs bg-violet-600 hover:bg-violet-700">
                            Draft Proposal
                        </Button>
                    </div>

                    <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide mt-6">Allocations</h2>
                    <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg p-4 space-y-4">
                        <AllocationBar label="Design" percent={75} color="bg-pink-500" />
                        <AllocationBar label="Development" percent={45} color="bg-blue-500" />
                        <AllocationBar label="Strategy" percent={20} color="bg-orange-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, icon: Icon, trendColor = "text-emerald-500" }: any) {
    return (
        <div className="bg-[#0F0F0F] p-5 hover:bg-[#141414] transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</span>
                <Icon className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold text-white tracking-tight">{value}</span>
                <span className={cn("text-xs font-medium mb-1 flex items-center gap-0.5", trendColor)}>
                    {trend.includes("+") ? <ArrowUpRight className="w-3 h-3" /> : null}
                    {trend}
                </span>
            </div>
        </div>
    )
}

function AllocationBar({ label, percent, color }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-neutral-400">{label}</span>
                <span className="text-neutral-300 font-mono">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1F1F1F] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", color)}
                />
            </div>
        </div>
    )
}
