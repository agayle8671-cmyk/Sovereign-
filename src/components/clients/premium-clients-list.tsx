"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Users,
    Plus,
    Search,
    Filter,
    ArrowUpRight,
    MoreHorizontal,
    Mail,
    Phone,
    Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    status: string | null;
    healthScore: number | null;
    contractCount: number;
    totalValue: number;
}

interface PremiumClientsListProps {
    clients: Client[];
}

export function PremiumClientsList({ clients }: PremiumClientsListProps) {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight">Client Radar</h1>
                    <p className="text-sm text-slate-500">Manage your client relationships and track health scores.</p>
                </div>
                <Link
                    href="/dashboard/clients/new"
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm text-white font-medium transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Client
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Total Clients" value={clients.length.toString()} icon={Users} />
                <StatCard label="Active" value={clients.filter(c => c.status === "active").length.toString()} icon={ArrowUpRight} accent="emerald" />
                <StatCard label="At Risk" value={clients.filter(c => (c.healthScore || 100) < 50).length.toString()} icon={ArrowUpRight} accent="amber" />
                <StatCard
                    label="Total Revenue"
                    value={`$${clients.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}`}
                    icon={ArrowUpRight}
                />
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/5">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#0a0f1a] border border-white/5 text-sm text-slate-400 hover:text-white hover:border-white/10 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Client List */}
            {clients.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-2">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={`/dashboard/clients/${client.id}`}
                                className="block p-4 rounded-xl bg-[#0a0f1a] border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {client.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div>
                                            <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                                                {client.name}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                {client.email && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-500">
                                                        <Mail className="w-3 h-3" />
                                                        {client.email}
                                                    </span>
                                                )}
                                                {client.company && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-500">
                                                        <Building2 className="w-3 h-3" />
                                                        {client.company}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex items-center gap-6">
                                        {/* Health Score */}
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 mb-1">Health</p>
                                            <HealthBadge score={client.healthScore || 75} />
                                        </div>

                                        {/* Contracts */}
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 mb-1">Contracts</p>
                                            <p className="text-sm font-medium text-white">{client.contractCount}</p>
                                        </div>

                                        {/* Value */}
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 mb-1">Value</p>
                                            <p className="text-sm font-medium text-emerald-400">${client.totalValue.toLocaleString()}</p>
                                        </div>

                                        <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/5 text-slate-400 transition-all">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, icon: Icon, accent }: { label: string; value: string; icon: React.ElementType; accent?: string }) {
    return (
        <div className="p-4 rounded-xl bg-[#0a0f1a] border border-white/5">
            <div className="flex items-center justify-between mb-3">
                <Icon className={cn("w-4 h-4", accent === "emerald" ? "text-emerald-500" : accent === "amber" ? "text-amber-500" : "text-slate-500")} />
            </div>
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
        </div>
    );
}

function HealthBadge({ score }: { score: number }) {
    const color = score >= 70 ? "text-emerald-400 bg-emerald-500/10" : score >= 40 ? "text-amber-400 bg-amber-500/10" : "text-red-400 bg-red-500/10";
    return (
        <span className={cn("inline-flex px-2 py-0.5 rounded text-xs font-medium", color)}>
            {score}%
        </span>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No clients yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
                Start building your client roster by adding your first client.
            </p>
            <Link
                href="/dashboard/clients/new"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm text-white font-medium transition-colors flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Add Your First Client
            </Link>
        </div>
    );
}
