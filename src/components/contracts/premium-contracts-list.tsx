"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    FileText,
    Plus,
    Search,
    Filter,
    AlertTriangle,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Contract {
    id: string;
    title: string;
    status: string | null;
    riskScore: number | null;
    totalValue: string | null;
    createdAt: Date;
    client: {
        name: string;
    } | null;
}

interface PremiumContractsListProps {
    contracts: Contract[];
}

export function PremiumContractsList({ contracts }: PremiumContractsListProps) {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-white tracking-tight">Contract Shield</h1>
                    <p className="text-sm text-slate-500">AI-powered contract analysis and risk management.</p>
                </div>
                <Link
                    href="/dashboard/contracts/analyze"
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm text-white font-medium transition-colors flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Analyze Contract
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard label="Total Contracts" value={contracts.length.toString()} />
                <StatCard
                    label="Active"
                    value={contracts.filter(c => c.status === "active" || c.status === "signed").length.toString()}
                    accent="emerald"
                />
                <StatCard
                    label="High Risk"
                    value={contracts.filter(c => (c.riskScore || 0) >= 70).length.toString()}
                    accent="red"
                />
                <StatCard
                    label="Total Value"
                    value={`$${contracts.reduce((sum, c) => sum + (parseFloat(c.totalValue || "0") || 0), 0).toLocaleString()}`}
                />
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/5">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search contracts..."
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#0a0f1a] border border-white/5 text-sm text-slate-400 hover:text-white hover:border-white/10 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Contract List */}
            {contracts.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-2">
                    {contracts.map((contract, index) => (
                        <motion.div
                            key={contract.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={`/dashboard/contracts/${contract.id}`}
                                className="block p-4 rounded-xl bg-[#0a0f1a] border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Icon */}
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                            (contract.riskScore || 0) >= 70
                                                ? "bg-red-500/10"
                                                : (contract.riskScore || 0) >= 40
                                                    ? "bg-amber-500/10"
                                                    : "bg-emerald-500/10"
                                        )}>
                                            <FileText className={cn(
                                                "w-5 h-5",
                                                (contract.riskScore || 0) >= 70
                                                    ? "text-red-400"
                                                    : (contract.riskScore || 0) >= 40
                                                        ? "text-amber-400"
                                                        : "text-emerald-400"
                                            )} />
                                        </div>

                                        {/* Info */}
                                        <div>
                                            <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                                                {contract.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                {contract.client && (
                                                    <span className="text-xs text-slate-500">
                                                        {contract.client.name}
                                                    </span>
                                                )}
                                                <span className="text-xs text-slate-600">•</span>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(contract.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex items-center gap-6">
                                        {/* Status */}
                                        <StatusBadge status={contract.status} />

                                        {/* Risk Score */}
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 mb-1">Risk</p>
                                            <RiskBadge score={contract.riskScore || 0} />
                                        </div>

                                        {/* Value */}
                                        <div className="text-right min-w-[80px]">
                                            <p className="text-xs text-slate-500 mb-1">Value</p>
                                            <p className="text-sm font-medium text-white">
                                                ${parseFloat(contract.totalValue || "0").toLocaleString()}
                                            </p>
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

function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
    return (
        <div className="p-4 rounded-xl bg-[#0a0f1a] border border-white/5">
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className={cn("text-xs mt-1", accent === "emerald" ? "text-emerald-500" : accent === "red" ? "text-red-500" : "text-slate-500")}>{label}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string | null }) {
    const config: Record<string, { icon: React.ElementType; color: string; label: string }> = {
        active: { icon: Clock, color: "text-cyan-400 bg-cyan-500/10", label: "Active" },
        signed: { icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10", label: "Signed" },
        pending: { icon: Clock, color: "text-amber-400 bg-amber-500/10", label: "Pending" },
        draft: { icon: FileText, color: "text-slate-400 bg-slate-500/10", label: "Draft" },
    };

    const statusConfig = config[status || "draft"] || config.draft;
    const Icon = statusConfig.icon;

    return (
        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", statusConfig.color)}>
            <Icon className="w-3 h-3" />
            {statusConfig.label}
        </span>
    );
}

function RiskBadge({ score }: { score: number }) {
    const color = score >= 70 ? "text-red-400 bg-red-500/10" : score >= 40 ? "text-amber-400 bg-amber-500/10" : "text-emerald-400 bg-emerald-500/10";
    const icon = score >= 70 ? AlertTriangle : CheckCircle2;
    const Icon = icon;

    return (
        <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium", color)}>
            <Icon className="w-3 h-3" />
            {score}%
        </span>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No contracts yet</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm">
                Upload a contract to have our AI analyze risks and suggest negotiation points.
            </p>
            <Link
                href="/dashboard/contracts/analyze"
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm text-white font-medium transition-colors flex items-center gap-2"
            >
                <Upload className="w-4 h-4" />
                Analyze Your First Contract
            </Link>
        </div>
    );
}
