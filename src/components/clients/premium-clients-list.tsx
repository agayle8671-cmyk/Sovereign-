"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import {
    Users,
    Plus,
    Search,
    Building,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    FileText,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Minus,
    Star,
    MoreHorizontal,
    Filter,
    Grid,
    List,
} from "lucide-react";

interface Client {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
    phone: string | null;
    status: string;
    healthScore: number | null;
    lastContactedAt: Date | null;
    createdAt: Date;
    contractCount: number;
    totalValue: number;
}

interface ClientsListProps {
    clients: Client[];
}

type ViewMode = "grid" | "list";
type SortField = "name" | "health" | "value" | "recent";

export function PremiumClientsList({ clients }: ClientsListProps) {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [sortField, setSortField] = useState<SortField>("recent");

    const filteredClients = clients
        .filter((client) => {
            if (!search) return true;
            const searchLower = search.toLowerCase();
            return (
                client.name.toLowerCase().includes(searchLower) ||
                client.company?.toLowerCase().includes(searchLower) ||
                client.email?.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            if (sortField === "name") return a.name.localeCompare(b.name);
            if (sortField === "health")
                return (b.healthScore ?? 0) - (a.healthScore ?? 0);
            if (sortField === "value") return b.totalValue - a.totalValue;
            return (
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        });

    // Stats
    const totalClients = clients.length;
    const activeClients = clients.filter((c) => c.status === "active").length;
    const avgHealth =
        clients.length > 0
            ? Math.round(
                clients.reduce((sum, c) => sum + (c.healthScore ?? 0), 0) /
                clients.filter((c) => c.healthScore !== null).length || 0
            )
            : 0;
    const totalRevenue = clients.reduce((sum, c) => sum + c.totalValue, 0);

    const getHealthColor = (score: number | null) => {
        if (score === null) return "neutral";
        if (score >= 80) return "emerald";
        if (score >= 60) return "amber";
        return "red";
    };

    const getHealthTrend = (score: number | null) => {
        if (score === null) return null;
        if (score >= 80) return "up";
        if (score >= 60) return "stable";
        return "down";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Clients</h1>
                    <p className="text-neutral-400 mt-1">
                        Manage relationships and track client health
                    </p>
                </div>
                <Link
                    href="/dashboard/clients/new"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-400 hover:to-orange-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Add Client
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Clients",
                        value: totalClients,
                        icon: Users,
                        color: "amber",
                    },
                    {
                        label: "Active",
                        value: activeClients,
                        icon: Star,
                        color: "emerald",
                    },
                    {
                        label: "Avg. Health",
                        value: `${avgHealth}%`,
                        icon: TrendingUp,
                        color: avgHealth >= 70 ? "emerald" : avgHealth >= 50 ? "amber" : "red",
                    },
                    {
                        label: "Total Revenue",
                        value: `$${totalRevenue.toLocaleString()}`,
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
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50"
                    />
                </div>

                {/* Sort */}
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none cursor-pointer"
                >
                    <option value="recent">Most Recent</option>
                    <option value="name">Name</option>
                    <option value="health">Health Score</option>
                    <option value="value">Revenue</option>
                </select>

                {/* View toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            viewMode === "grid"
                                ? "bg-white/10 text-white"
                                : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            viewMode === "list"
                                ? "bg-white/10 text-white"
                                : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Clients */}
            {filteredClients.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                        <Users className="w-10 h-10 text-neutral-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No clients found
                    </h3>
                    <p className="text-neutral-400 mb-6">
                        {search
                            ? "Try adjusting your search"
                            : "Add your first client to get started"}
                    </p>
                    {!search && (
                        <Link
                            href="/dashboard/clients/new"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 font-medium hover:bg-amber-500/20 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Client
                        </Link>
                    )}
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredClients.map((client, index) => {
                        const healthColor = getHealthColor(client.healthScore);
                        const healthTrend = getHealthTrend(client.healthScore);

                        return (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Link href={`/dashboard/clients/${client.id}`}>
                                    <div className="group p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-300">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-semibold text-lg">
                                                    {client.name[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                                                        {client.name}
                                                    </h3>
                                                    {client.company && (
                                                        <p className="text-sm text-neutral-500">
                                                            {client.company}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={cn(
                                                    "px-2 py-1 rounded-lg text-xs font-medium",
                                                    client.status === "active"
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-neutral-500/10 text-neutral-400"
                                                )}
                                            >
                                                {client.status}
                                            </div>
                                        </div>

                                        {/* Health Score */}
                                        <div className="p-3 rounded-xl bg-white/5 mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-neutral-500">
                                                    Health Score
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    {healthTrend === "up" && (
                                                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                                                    )}
                                                    {healthTrend === "down" && (
                                                        <TrendingDown className="w-3 h-3 text-red-400" />
                                                    )}
                                                    {healthTrend === "stable" && (
                                                        <Minus className="w-3 h-3 text-amber-400" />
                                                    )}
                                                    <span
                                                        className={cn(
                                                            "text-sm font-semibold",
                                                            `text-${healthColor}-400`
                                                        )}
                                                    >
                                                        {client.healthScore ?? "N/A"}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        `bg-${healthColor}-500`
                                                    )}
                                                    style={{ width: `${client.healthScore ?? 0}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-2 rounded-lg bg-white/5">
                                                <p className="text-xs text-neutral-500">Contracts</p>
                                                <p className="text-sm font-medium text-white">
                                                    {client.contractCount}
                                                </p>
                                            </div>
                                            <div className="p-2 rounded-lg bg-white/5">
                                                <p className="text-xs text-neutral-500">Revenue</p>
                                                <p className="text-sm font-medium text-white">
                                                    ${client.totalValue.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden">
                    <div className="divide-y divide-white/5">
                        {filteredClients.map((client, index) => {
                            const healthColor = getHealthColor(client.healthScore);

                            return (
                                <motion.div
                                    key={client.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <Link
                                        href={`/dashboard/clients/${client.id}`}
                                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-semibold shrink-0">
                                            {client.name[0]}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="font-medium text-white truncate">
                                                    {client.name}
                                                </p>
                                                <span
                                                    className={cn(
                                                        "px-2 py-0.5 rounded text-xs font-medium",
                                                        client.status === "active"
                                                            ? "bg-emerald-500/20 text-emerald-400"
                                                            : "bg-neutral-500/20 text-neutral-400"
                                                    )}
                                                >
                                                    {client.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                                {client.company && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Building className="w-3.5 h-3.5" />
                                                        {client.company}
                                                    </span>
                                                )}
                                                {client.email && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail className="w-3.5 h-3.5" />
                                                        {client.email}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="hidden md:flex items-center gap-6 shrink-0">
                                            <div className="text-right">
                                                <p className="text-xs text-neutral-500">Health</p>
                                                <p
                                                    className={cn(
                                                        "text-sm font-semibold",
                                                        `text-${healthColor}-400`
                                                    )}
                                                >
                                                    {client.healthScore ?? "N/A"}%
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-neutral-500">Contracts</p>
                                                <p className="text-sm font-medium text-white">
                                                    {client.contractCount}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-neutral-500">Revenue</p>
                                                <p className="text-sm font-medium text-white">
                                                    ${client.totalValue.toLocaleString()}
                                                </p>
                                            </div>
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
