"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Inbox,
    Mail,
    AlertCircle,
    CheckCircle,
    Clock,
    FileText,
    Users,
    Shield,
    Sparkles,
    ArrowRight,
    Archive,
    Trash2,
    Star,
} from "lucide-react";

// Mock inbox items - in production, this would come from the server
const mockInboxItems = [
    {
        id: "1",
        type: "approval",
        title: "Contract requires review",
        description: "TechStart SaaS Agreement has 2 high-risk clauses flagged by AI",
        time: "2 hours ago",
        priority: "high",
        read: false,
        icon: Shield,
        color: "cyan",
        actionUrl: "/dashboard/contracts",
    },
    {
        id: "2",
        type: "client",
        title: "Client health alert",
        description: "Acme Corp engagement score dropped to 65%",
        time: "5 hours ago",
        priority: "medium",
        read: false,
        icon: Users,
        color: "amber",
        actionUrl: "/dashboard/clients",
    },
    {
        id: "3",
        type: "testimonial",
        title: "New testimonial received",
        description: "Sarah from StartupXYZ submitted a video testimonial",
        time: "1 day ago",
        priority: "low",
        read: true,
        icon: Star,
        color: "rose",
        actionUrl: "/dashboard/testimonials",
    },
    {
        id: "4",
        type: "agent",
        title: "AI Agent completed task",
        description: "Contract analysis finished for 3 new documents",
        time: "1 day ago",
        priority: "low",
        read: true,
        icon: Sparkles,
        color: "purple",
        actionUrl: "/dashboard/contracts",
    },
];

const filterOptions = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Approvals", value: "approval" },
    { label: "Alerts", value: "alert" },
];

export default function InboxPage() {
    const [filter, setFilter] = useState("all");
    const [items, setItems] = useState(mockInboxItems);

    const filteredItems = items.filter((item) => {
        if (filter === "all") return true;
        if (filter === "unread") return !item.read;
        return item.type === filter;
    });

    const unreadCount = items.filter((i) => !i.read).length;

    const markAsRead = (id: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
    };

    const archiveItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const colorMap: Record<string, { bg: string; text: string }> = {
        cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
        amber: { bg: "bg-amber-500/10", text: "text-amber-400" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
        rose: { bg: "bg-rose-500/10", text: "text-rose-400" },
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Inbox className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Inbox</h1>
                        <p className="text-zinc-400 text-sm">
                            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
                {filterOptions.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            filter === option.value
                                ? "bg-white/10 text-white"
                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            {/* Inbox Items */}
            <div className="space-y-3">
                {filteredItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">All caught up!</h3>
                        <p className="text-zinc-400 text-sm">No items match your filter.</p>
                    </motion.div>
                ) : (
                    filteredItems.map((item, index) => {
                        const Icon = item.icon;
                        const colors = colorMap[item.color];

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "group relative p-4 rounded-2xl border transition-all cursor-pointer",
                                    item.read
                                        ? "bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.08]"
                                        : "bg-zinc-900/50 border-white/[0.08] hover:border-white/[0.12]"
                                )}
                                onClick={() => markAsRead(item.id)}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colors.bg)}>
                                        <Icon className={cn("w-5 h-5", colors.text)} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {!item.read && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            )}
                                            <h3 className={cn(
                                                "font-medium",
                                                item.read ? "text-zinc-300" : "text-white"
                                            )}>
                                                {item.title}
                                            </h3>
                                            {item.priority === "high" && (
                                                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-semibold uppercase">
                                                    Urgent
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-zinc-400 mb-2">{item.description}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                                <Clock className="w-3 h-3" />
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                archiveItem(item.id);
                                            }}
                                            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                            title="Archive"
                                        >
                                            <Archive className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={item.actionUrl}
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                            title="View"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Empty state guide */}
            {items.length > 0 && (
                <div className="mt-8 p-4 rounded-2xl bg-zinc-900/30 border border-white/[0.04]">
                    <div className="flex items-center gap-3 text-zinc-400 text-sm">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>
                            Pro tip: Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono">E</kbd> to archive,
                            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono ml-1">J/K</kbd> to navigate
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
