"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import {
    Shield,
    Plus,
    Search,
    Filter,
    AlertTriangle,
    CheckCircle,
    Clock,
    Calendar,
    DollarSign,
    Building,
    FileText,
    ChevronRight,
    ArrowUpDown,
    MoreHorizontal,
} from "lucide-react";

interface ContractsListProps {
    contracts: any[];
}

type SortField = "date" | "risk" | "value";
type FilterStatus = "all" | "high-risk" | "reviewed" | "pending";

export function PremiumContractsList({ contracts }: ContractsListProps) {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<SortField>("date");
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

    // Filter and sort contracts
    const filteredContracts = contracts
        .filter((contract) => {
            // Search filter
            if (search) {
                const searchLower = search.toLowerCase();
                return (
                    contract.title?.toLowerCase().includes(searchLower) ||
                    contract.client?.name?.toLowerCase().includes(searchLower)
                );
            }
            return true;
        })
        .filter((contract) => {
            // Status filter
            if (filterStatus === "high-risk") return contract.riskScore < 60;
            if (filterStatus === "reviewed") return contract.status === "reviewed";
            if (filterStatus === "pending") return contract.status === "pending_review";
            return true;
        })
        .sort((a, b) => {
            if (sortField === "date") {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (sortField === "risk") {
                return (a.riskScore ?? 100) - (b.riskScore ?? 100);
            }
            if (sortField === "value") {
                const aValue = parseFloat(a.totalValue) || 0;
                const bValue = parseFloat(b.totalValue) || 0;
                return bValue - aValue;
            }
            return 0;
        });

    // Stats
    const totalContracts = contracts.length;
    const highRiskCount = contracts.filter((c) => c.riskScore && c.riskScore < 60).length;
    const totalValue = contracts.reduce((sum, c) => sum + (parseFloat(c.totalValue) || 0), 0);
    const avgRiskScore =
        contracts.length > 0
            ? Math.round(
                contracts.reduce((sum, c) => sum + (c.riskScore ?? 0), 0) /
                contracts.filter((c) => c.riskScore !== null).length || 0
            )
            : 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contracts</h1>
                    <p className="text-neutral-400 mt-1">
                        Manage and analyze your contracts
                    </p>
                </div>
                <Link
                    href="/dashboard/contracts/analyze"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-colors shadow-lg shadow-cyan-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Analyze Contract
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Contracts",
                        value: totalContracts,
                        icon: FileText,
                        color: "cyan",
                    },
                    {
                        label: "High Risk",
                        value: highRiskCount,
                        icon: AlertTriangle,
                        color: "red",
                    },
                    {
                        label: "Avg. Risk Score",
                        value: `${avgRiskScore}%`,
                        icon: Shield,
                        color: avgRiskScore >= 70 ? "emerald" : avgRiskScore >= 50 ? "amber" : "red",
                    },
                    {
                        label: "Total Value",
                        value: `$${totalValue.toLocaleString()}`,
                        icon: DollarSign,
                        color: "purple",
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    `bg-${stat.color}-500/10`
                                )}
                            >
                                <stat.icon className={cn("w-5 h-5", `text-${stat.color}-400`)} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-neutral-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search contracts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50"
                    />
                </div>

                {/* Status filter */}
                <div className="flex items-center gap-2">
                    {[
                        { id: "all" as FilterStatus, label: "All" },
                        { id: "high-risk" as FilterStatus, label: "High Risk" },
                        { id: "pending" as FilterStatus, label: "Pending Review" },
                    ].map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setFilterStatus(filter.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                filterStatus === filter.id
                                    ? "bg-white/10 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                    <ArrowUpDown className="w-4 h-4 text-neutral-500" />
                    <select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as SortField)}
                        className="bg-transparent text-sm text-neutral-400 focus:outline-none cursor-pointer"
                    >
                        <option value="date">Date</option>
                        <option value="risk">Risk Score</option>
                        <option value="value">Value</option>
                    </select>
                </div>
            </div>

            {/* Contracts list */}
            {filteredContracts.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-neutral-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No contracts found
                    </h3>
                    <p className="text-neutral-400 mb-6">
                        {search
                            ? "Try adjusting your search or filters"
                            : "Upload your first contract to get started"}
                    </p>
                    {!search && (
                        <Link
                            href="/dashboard/contracts/analyze"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-medium hover:bg-cyan-500/20 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Analyze Contract
                        </Link>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden">
                    <div className="divide-y divide-white/5">
                        {filteredContracts.map((contract, index) => {
                            const riskScore = contract.riskScore ?? 50;
                            const riskLevel =
                                riskScore >= 80 ? "low" : riskScore >= 60 ? "medium" : "high";

                            return (
                                <motion.div
                                    key={contract.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <Link
                                        href={`/dashboard/contracts/${contract.id}`}
                                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                                    >
                                        {/* Risk indicator */}
                                        <div
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                                riskLevel === "low" && "bg-emerald-500/10",
                                                riskLevel === "medium" && "bg-amber-500/10",
                                                riskLevel === "high" && "bg-red-500/10"
                                            )}
                                        >
                                            {riskLevel === "high" ? (
                                                <AlertTriangle
                                                    className={cn(
                                                        "w-6 h-6",
                                                        riskLevel === "high" && "text-red-400"
                                                    )}
                                                />
                                            ) : riskLevel === "medium" ? (
                                                <Clock className="w-6 h-6 text-amber-400" />
                                            ) : (
                                                <CheckCircle className="w-6 h-6 text-emerald-400" />
                                            )}
                                        </div>

                                        {/* Contract info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="font-medium text-white truncate">
                                                    {contract.title}
                                                </p>
                                                <span
                                                    className={cn(
                                                        "px-2 py-0.5 rounded text-xs font-medium shrink-0",
                                                        riskLevel === "low" && "bg-emerald-500/20 text-emerald-400",
                                                        riskLevel === "medium" && "bg-amber-500/20 text-amber-400",
                                                        riskLevel === "high" && "bg-red-500/20 text-red-400"
                                                    )}
                                                >
                                                    {riskScore}% Safe
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                                {contract.client && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Building className="w-3.5 h-3.5" />
                                                        {contract.client.name}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatRelativeTime(contract.createdAt)}
                                                </span>
                                                {contract.totalValue && (
                                                    <span className="flex items-center gap-1.5">
                                                        <DollarSign className="w-3.5 h-3.5" />
                                                        {parseFloat(contract.totalValue).toLocaleString()}{" "}
                                                        {contract.currency}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Risks summary */}
                                        <div className="hidden md:flex items-center gap-2 shrink-0">
                                            {contract.riskFlags && contract.riskFlags.length > 0 && (
                                                <>
                                                    {contract.riskFlags.filter((r: any) => r.severity === "CRITICAL").length > 0 && (
                                                        <span className="px-2 py-1 rounded bg-red-500/10 text-xs text-red-400">
                                                            {contract.riskFlags.filter((r: any) => r.severity === "CRITICAL").length} Critical
                                                        </span>
                                                    )}
                                                    {contract.riskFlags.filter((r: any) => r.severity === "HIGH").length > 0 && (
                                                        <span className="px-2 py-1 rounded bg-orange-500/10 text-xs text-orange-400">
                                                            {contract.riskFlags.filter((r: any) => r.severity === "HIGH").length} High
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
