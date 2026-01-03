"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
    FileText,
    Users,
    Briefcase,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const actions = [
    {
        name: "Analyze Contract",
        description: "Upload and scan for risks",
        href: "/dashboard/contracts/analyze",
        icon: FileText,
        color: "shield",
        gradient: "from-shield to-shield-dark",
    },
    {
        name: "Add Client",
        description: "Start tracking a new client",
        href: "/dashboard/clients/new",
        icon: Users,
        color: "radar",
        gradient: "from-radar to-radar-dark",
    },
    {
        name: "Create Portfolio",
        description: "Showcase your work",
        href: "/dashboard/portfolio/new",
        icon: Briefcase,
        color: "magnet",
        gradient: "from-magnet to-magnet-dark",
    },
    {
        name: "Ask Sovereign",
        description: "Get AI assistance",
        href: "#",
        icon: Sparkles,
        color: "brand",
        gradient: "from-brand-500 to-brand-600",
        special: true,
    },
];

export function QuickActions() {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-100">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {actions.map((action, index) => (
                    <motion.div
                        key={action.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Link href={action.href}>
                            <div
                                className={`
                  group relative p-4 rounded-xl border border-neutral-800 
                  hover:border-neutral-700 transition-all duration-200
                  ${action.special ? "bg-gradient-to-br from-brand-500/10 to-brand-600/5" : ""}
                `}
                            >
                                <div
                                    className={`
                    w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient}
                    flex items-center justify-center mb-3
                    group-hover:scale-110 transition-transform
                  `}
                                >
                                    <action.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-medium text-neutral-100 text-sm">
                                    {action.name}
                                </h3>
                                <p className="text-xs text-neutral-400 mt-1">
                                    {action.description}
                                </p>
                                <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
}
