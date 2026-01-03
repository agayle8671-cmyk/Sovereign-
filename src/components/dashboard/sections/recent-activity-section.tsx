"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatRelativeTime, cn } from "@/lib/utils";
import {
    FileText,
    Users,
    ArrowRight,
    AlertTriangle,
    CheckCircle,
    Clock,
    Building,
    ChevronRight,
} from "lucide-react";

interface RecentActivitySectionProps {
    contracts: any[];
    clients: any[];
}

const riskColors = {
    low: "text-emerald-400 bg-emerald-500/10",
    medium: "text-amber-400 bg-amber-500/10",
    high: "text-red-400 bg-red-500/10",
};

function getRiskLevel(score: number | null) {
    if (score === null) return null;
    if (score >= 80) return "low";
    if (score >= 60) return "medium";
    return "high";
}

export function RecentActivitySection({
    contracts,
    clients,
}: RecentActivitySectionProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Recent Contracts - Takes more space */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-3"
            >
                <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-cyan-400" />
                            </div>
                            <h3 className="font-semibold text-white">Recent Contracts</h3>
                        </div>
                        <Link
                            href="/dashboard/contracts"
                            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="p-2">
                        {contracts.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-6 h-6 text-neutral-600" />
                                </div>
                                <p className="text-neutral-400 mb-4">No contracts yet</p>
                                <Link
                                    href="/dashboard/contracts/analyze"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                >
                                    <FileText className="w-4 h-4" />
                                    Analyze your first contract
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {contracts.map((contract, index) => {
                                    const riskLevel = getRiskLevel(contract.riskScore);

                                    return (
                                        <Link
                                            key={contract.id}
                                            href={`/dashboard/contracts/${contract.id}`}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                        >
                                            {/* Risk indicator */}
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                                    riskLevel
                                                        ? riskColors[riskLevel]
                                                        : "bg-neutral-800 text-neutral-400"
                                                )}
                                            >
                                                {riskLevel === "high" ? (
                                                    <AlertTriangle className="w-5 h-5" />
                                                ) : riskLevel === "low" ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <Clock className="w-5 h-5" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">
                                                    {contract.title}
                                                </p>
                                                <p className="text-sm text-neutral-500 truncate">
                                                    {contract.client?.name || "No client"} •{" "}
                                                    {formatRelativeTime(contract.createdAt)}
                                                </p>
                                            </div>

                                            {/* Risk score */}
                                            {contract.riskScore !== null && (
                                                <div className="hidden sm:block text-right">
                                                    <p
                                                        className={cn(
                                                            "text-lg font-bold",
                                                            riskLevel === "high"
                                                                ? "text-red-400"
                                                                : riskLevel === "medium"
                                                                    ? "text-amber-400"
                                                                    : "text-emerald-400"
                                                        )}
                                                    >
                                                        {contract.riskScore}%
                                                    </p>
                                                    <p className="text-xs text-neutral-500">Risk Score</p>
                                                </div>
                                            )}

                                            <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Client Health */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="lg:col-span-2"
            >
                <div className="rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 overflow-hidden h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <Users className="w-4 h-4 text-amber-400" />
                            </div>
                            <h3 className="font-semibold text-white">Client Health</h3>
                        </div>
                        <Link
                            href="/dashboard/clients"
                            className="flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            View all
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="p-2">
                        {clients.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-neutral-600" />
                                </div>
                                <p className="text-neutral-400 mb-4">No clients yet</p>
                                <Link
                                    href="/dashboard/clients/new"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                                >
                                    <Users className="w-4 h-4" />
                                    Add your first client
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {clients.map((client) => {
                                    const healthScore = client.healthScore || 0;
                                    const healthColor =
                                        healthScore >= 80
                                            ? "bg-emerald-500"
                                            : healthScore >= 60
                                                ? "bg-amber-500"
                                                : "bg-red-500";

                                    return (
                                        <Link
                                            key={client.id}
                                            href={`/dashboard/clients/${client.id}`}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-medium shrink-0">
                                                {client.name[0]}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">
                                                    {client.name}
                                                </p>
                                                <p className="text-sm text-neutral-500 truncate flex items-center gap-1">
                                                    <Building className="w-3 h-3" />
                                                    {client.company || "No company"}
                                                </p>
                                            </div>

                                            {/* Health bar */}
                                            <div className="w-20">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs text-neutral-400">
                                                        Health
                                                    </span>
                                                    <span className="text-xs font-medium text-white">
                                                        {healthScore}%
                                                    </span>
                                                </div>
                                                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full", healthColor)}
                                                        style={{ width: `${healthScore}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
