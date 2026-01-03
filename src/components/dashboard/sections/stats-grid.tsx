"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Shield,
    Users,
    Briefcase,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
} from "lucide-react";

interface StatsGridProps {
    stats: {
        contracts: number;
        clients: number;
        portfolio: number;
        testimonials: number;
    };
}

const statItems = [
    {
        key: "contracts",
        label: "Contracts",
        href: "/dashboard/contracts",
        icon: Shield,
        gradient: "from-cyan-500 to-blue-600",
        accent: "cyan",
        trend: "+12%",
        trendUp: true,
    },
    {
        key: "clients",
        label: "Clients",
        href: "/dashboard/clients",
        icon: Users,
        gradient: "from-amber-500 to-orange-600",
        accent: "amber",
        trend: "+5%",
        trendUp: true,
    },
    {
        key: "portfolio",
        label: "Portfolio Items",
        href: "/dashboard/portfolio",
        icon: Briefcase,
        gradient: "from-purple-500 to-pink-600",
        accent: "purple",
        trend: "+3",
        trendUp: true,
    },
    {
        key: "testimonials",
        label: "Testimonials",
        href: "/dashboard/testimonials",
        icon: MessageSquare,
        gradient: "from-rose-500 to-red-600",
        accent: "rose",
        trend: "2 pending",
        trendUp: null,
    },
];

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => {
                const value = stats[item.key as keyof typeof stats];
                const Icon = item.icon;

                return (
                    <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <Link href={item.href}>
                            <div className="group relative p-6 rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                                {/* Gradient glow on hover */}
                                <div
                                    className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                        `bg-gradient-to-br ${item.gradient}`
                                    )}
                                    style={{ filter: "blur(40px)", transform: "scale(0.8)" }}
                                />

                                {/* Content */}
                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                                                item.gradient
                                            )}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>

                                    <p className="text-4xl font-bold text-white mb-1">{value}</p>
                                    <p className="text-sm text-neutral-400">{item.label}</p>

                                    {/* Trend indicator */}
                                    {item.trend && (
                                        <div className="flex items-center gap-1 mt-3">
                                            {item.trendUp !== null && (
                                                <TrendingUp
                                                    className={cn(
                                                        "w-3.5 h-3.5",
                                                        item.trendUp ? "text-emerald-400" : "text-red-400"
                                                    )}
                                                />
                                            )}
                                            <span
                                                className={cn(
                                                    "text-xs",
                                                    item.trendUp === true
                                                        ? "text-emerald-400"
                                                        : item.trendUp === false
                                                            ? "text-red-400"
                                                            : "text-neutral-500"
                                                )}
                                            >
                                                {item.trend}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
