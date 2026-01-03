"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    Hammer,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        badge: null,
        badgeColor: null,
    },
    {
        name: "Contracts",
        href: "/dashboard/contracts",
        icon: FileText,
        badge: "3",
        badgeColor: "shield",
    },
    {
        name: "Clients",
        href: "/dashboard/clients",
        icon: Users,
        badge: "1",
        badgeColor: "radar",
    },
    {
        name: "Portfolio",
        href: "/dashboard/portfolio",
        icon: Briefcase,
        badge: "New",
        badgeColor: "magnet",
    },
    {
        name: "Products",
        href: "/dashboard/products",
        icon: Hammer,
        badge: null,
        badgeColor: "forge",
    },
];

const bottomNavigation = [
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 256 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl flex flex-col"
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-neutral-800">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence mode="wait">
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-lg font-semibold text-neutral-100"
                            >
                                Sovereign
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-neutral-800 text-neutral-100"
                                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-5 h-5 shrink-0",
                                    isActive && item.badgeColor === "shield" && "text-shield",
                                    isActive && item.badgeColor === "magnet" && "text-magnet",
                                    isActive && item.badgeColor === "radar" && "text-radar",
                                    isActive && item.badgeColor === "forge" && "text-forge"
                                )}
                            />
                            <AnimatePresence mode="wait">
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="truncate"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {!collapsed && item.badge && (
                                <span
                                    className={cn(
                                        "ml-auto text-2xs px-1.5 py-0.5 rounded uppercase font-semibold",
                                        item.badgeColor === "shield" &&
                                        "bg-shield/10 text-shield",
                                        item.badgeColor === "magnet" &&
                                        "bg-magnet/10 text-magnet",
                                        item.badgeColor === "radar" && "bg-radar/10 text-radar",
                                        item.badgeColor === "forge" && "bg-forge/10 text-forge"
                                    )}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className="p-3 border-t border-neutral-800 space-y-1">
                {bottomNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-neutral-800 text-neutral-100"
                                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50"
                            )}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <AnimatePresence mode="wait">
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="truncate"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
            >
                {collapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                    <ChevronLeft className="w-3.5 h-3.5" />
                )}
            </button>
        </motion.aside>
    );
}
