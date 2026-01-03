"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Shield, Radio, Magnet, Hammer } from "lucide-react";

interface Stat {
    name: string;
    value: number;
    href: string;
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
    },
    radar: {
        bg: "bg-radar/10",
        text: "text-radar",
    },
    magnet: {
        bg: "bg-magnet/10",
        text: "text-magnet",
    },
    forge: {
        bg: "bg-forge/10",
        text: "text-forge",
    },
};

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = iconMap[stat.icon];
                const colors = colorMap[stat.icon];

                return (
                    <Link key={stat.name} href={stat.href}>
                        <Card className="p-6 hover:border-neutral-700 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                        colors.bg
                                    )}
                                >
                                    <Icon className={cn("w-6 h-6", colors.text)} />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-neutral-100">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-neutral-400">{stat.name}</p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
