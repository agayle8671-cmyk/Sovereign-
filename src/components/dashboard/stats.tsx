"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Shield, Radio, Magnet, Hammer, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface Stat {
    name: string;
    value: number;
    change: string;
    changeType: "positive" | "negative" | "neutral" | "warning";
    icon: "shield" | "radar" | "magnet" | "forge";
}

interface DashboardStatsProps {
    stats: Stat[];
}

const iconMap = {
    shield: Shield,
    radar: Radio,
    magnet: Magnet,
    forge: Hammer,
};

const colorMap = {
    shield: {
        bg: "bg-shield/10",
        text: "text-shield",
        glow: "shadow-glow-shield",
    },
    radar: {
        bg: "bg-radar/10",
        text: "text-radar",
        glow: "shadow-glow-radar",
    },
    magnet: {
        bg: "bg-magnet/10",
        text: "text-magnet",
        glow: "shadow-glow-magnet",
    },
    forge: {
        bg: "bg-forge/10",
        text: "text-forge",
        glow: "shadow-glow-forge",
    },
};

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                const colors = colorMap[stat.icon];

                return (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-6 hover:border-neutral-700 transition-colors">
                            <div className="flex items-start justify-between">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center",
                                        colors.bg
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5", colors.text)} />
                                </div>
                                <div
                                    className={cn(
                                        "flex items-center gap-1 text-xs font-medium",
                                        stat.changeType === "positive" && "text-success",
                                        stat.changeType === "negative" && "text-danger",
                                        stat.changeType === "neutral" && "text-neutral-400",
                                        stat.changeType === "warning" && "text-yellow-500"
                                    )}
                                >
                                    {stat.changeType === "positive" && (
                                        <TrendingUp className="w-3 h-3" />
                                    )}
                                    {stat.changeType === "negative" && (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {(stat.changeType === "neutral" || stat.changeType === "warning") && (
                                        <Minus className="w-3 h-3" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-3xl font-semibold text-neutral-100">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-neutral-400 mt-1">{stat.name}</p>
                            </div>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
