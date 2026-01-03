"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Shield,
    Zap,
    Target,
} from "lucide-react";

interface SidebarProps {
    user: any;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: any;
    gradient: string;
    badge?: string | null;
}

const navigation: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        gradient: "from-brand-400 to-brand-600",
    },
    {
        name: "Contracts",
        href: "/dashboard/contracts",
        icon: Shield,
        gradient: "from-shield-400 to-shield-600",
        badge: null,
    },
    {
        name: "Clients",
        href: "/dashboard/clients",
        icon: Target,
        gradient: "from-radar-400 to-radar-600",
    },
    {
        name: "Portfolio",
        href: "/dashboard/portfolio",
        icon: Briefcase,
        gradient: "from-magnet-400 to-magnet-600",
    },
    {
        name: "Testimonials",
        href: "/dashboard/testimonials",
        icon: MessageSquare,
        gradient: "from-forge-400 to-forge-600",
    },
];

const bottomNavigation = [
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        gradient: "from-neutral-400 to-neutral-600",
    },
];

export function PremiumSidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col h-full bg-neutral-900/40 backdrop-blur-2xl border-r border-white/5"
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-white/5">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-brand-500/30 blur-lg -z-10" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-lg font-semibold text-white"
                            >
                                Sovereign
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                isActive
                                    ? "text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 rounded-xl bg-white/10"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            {/* Active left bar */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeBar"
                                    className={cn(
                                        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full",
                                        `bg-gradient-to-b ${item.gradient}`
                                    )}
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            {/* Icon with gradient background on active */}
                            <div
                                className={cn(
                                    "relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200",
                                    isActive
                                        ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                                        : "bg-white/5 group-hover:bg-white/10"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "w-5 h-5 transition-colors",
                                        isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                                    )}
                                />
                                {isActive && (
                                    <div
                                        className={cn(
                                            "absolute inset-0 rounded-lg blur-lg opacity-50 -z-10",
                                            `bg-gradient-to-br ${item.gradient}`
                                        )}
                                    />
                                )}
                            </div>

                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="relative text-sm font-medium"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Badge */}
                            {item.badge && !collapsed && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400"
                                >
                                    {item.badge}
                                </motion.span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className="px-3 py-4 border-t border-white/5 space-y-1">
                {bottomNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                                isActive
                                    ? "text-white bg-white/10"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-9 h-9 rounded-lg transition-colors",
                                    isActive ? "bg-white/10" : "bg-white/5 group-hover:bg-white/10"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-sm font-medium"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </div>

            {/* Collapse Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute top-20 -right-3 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors z-10"
            >
                {collapsed ? (
                    <ChevronRight className="w-3 h-3" />
                ) : (
                    <ChevronLeft className="w-3 h-3" />
                )}
            </button>

            {/* Upgrade Card */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-brand-500/20 to-magnet/20 border border-white/10 overflow-hidden relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-brand-400" />
                                <span className="text-xs font-medium text-brand-400">Pro Plan</span>
                            </div>
                            <p className="text-sm text-neutral-300 mb-3">
                                Unlock unlimited contracts and AI features.
                            </p>
                            <button className="w-full py-2 text-sm font-medium rounded-lg bg-white text-neutral-900 hover:bg-neutral-200 transition-colors">
                                Upgrade Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.aside>
    );
}
