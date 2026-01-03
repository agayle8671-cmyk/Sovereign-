"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    FileText,
    UserPlus,
    FolderPlus,
    Send,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const actions = [
    {
        title: "Analyze Contract",
        description: "AI-powered risk detection",
        href: "/dashboard/contracts/analyze",
        icon: FileText,
        gradient: "from-cyan-500/20 to-blue-500/20",
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/10",
    },
    {
        title: "Add Client",
        description: "Track a new relationship",
        href: "/dashboard/clients/new",
        icon: UserPlus,
        gradient: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/10",
    },
    {
        title: "Add Project",
        description: "Showcase your work",
        href: "/dashboard/portfolio/new",
        icon: FolderPlus,
        gradient: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-400",
        iconBg: "bg-purple-500/10",
    },
    {
        title: "Request Review",
        description: "Collect testimonials",
        href: "/dashboard/testimonials",
        icon: Send,
        gradient: "from-rose-500/20 to-red-500/20",
        iconColor: "text-rose-400",
        iconBg: "bg-rose-500/10",
    },
];

export function QuickActionsGrid() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    <h2 className="text-sm font-medium text-neutral-400">Quick Actions</h2>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {actions.map((action, index) => (
                    <motion.div
                        key={action.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                    >
                        <Link href={action.href}>
                            <div className="group relative p-4 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                                {/* Hover gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                />

                                <div className="relative">
                                    <div
                                        className={`w-10 h-10 rounded-lg ${action.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                                    </div>
                                    <h3 className="font-medium text-white text-sm">
                                        {action.title}
                                    </h3>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        {action.description}
                                    </p>
                                    <ArrowRight className="absolute bottom-0 right-0 w-4 h-4 text-neutral-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
