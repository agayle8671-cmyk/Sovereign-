"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Users,
    Calendar,
    Wallet,
    Bell,
    Settings,
    ChevronDown,
    Plus,
    Sparkles,
    Command,
    FolderKanban,
    MessageSquare,
    Search,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

// ============================================================================
// SOVEREIGN ACOS SHELL - Dashboard Layout
// Vertical Command Center with Dock, Spaces, and Utility zones
// ============================================================================

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSpace, setActiveSpace] = useState<string | null>("apex");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Core navigation items (The Dock)
    const coreNav = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: Bell, label: "Inbox", href: "/dashboard/inbox", badge: 3 },
        { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
        { icon: Wallet, label: "Financials", href: "/dashboard/financials" },
    ];

    // Operations navigation
    const operationsNav = [
        { icon: Users, label: "Clients", href: "/dashboard/clients" },
        { icon: FileText, label: "Contracts", href: "/dashboard/contracts" },
        { icon: FolderKanban, label: "Portfolio", href: "/dashboard/portfolio" },
        { icon: MessageSquare, label: "Testimonials", href: "/dashboard/testimonials" },
    ];

    // Client Spaces (Context)
    const spaces = [
        { name: "Apex Corp", color: "bg-violet-500", id: "apex" },
        { name: "Stark Industries", color: "bg-orange-500", id: "stark" },
        { name: "Initech", color: "bg-cyan-500", id: "initech" },
    ];

    return (
        <div className="flex h-screen w-full bg-[#020617] overflow-hidden font-sans selection:bg-emerald-500/30 text-white">

            {/* ================================================================ */}
            {/* VERTICAL COMMAND CENTER (Sidebar) */}
            {/* ================================================================ */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col h-screen bg-[#0a0f1a] border-r border-white/5 transition-all duration-300 shrink-0",
                    sidebarCollapsed ? "w-[60px]" : "w-[260px]"
                )}
            >
                {/* Header / Logo */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 relative">
                            <span className="font-bold text-sm text-white">S</span>
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        </div>
                        {!sidebarCollapsed && (
                            <span className="font-semibold text-[15px] tracking-tight text-white">Sovereign</span>
                        )}
                    </div>
                    {!sidebarCollapsed && (
                        <button
                            onClick={() => setSidebarCollapsed(true)}
                            className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors"
                        >
                            <ChevronDown className="w-4 h-4 rotate-90" />
                        </button>
                    )}
                </div>

                {/* THE CORE (Pinned) */}
                <div className="p-3 space-y-1">
                    {!sidebarCollapsed && (
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-2 mb-2">
                            Core
                        </div>
                    )}
                    {coreNav.map((item) => (
                        <NavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            active={pathname === item.href}
                            badge={item.badge}
                            collapsed={sidebarCollapsed}
                        />
                    ))}
                </div>

                {/* OPERATIONS */}
                <div className="p-3 border-t border-white/5 space-y-1">
                    {!sidebarCollapsed && (
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest px-2 mb-2">
                            Operations
                        </div>
                    )}
                    {operationsNav.map((item) => (
                        <NavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            active={pathname === item.href || pathname.startsWith(item.href + "/")}
                            collapsed={sidebarCollapsed}
                        />
                    ))}
                </div>

                {/* THE CONTEXT (Spaces) */}
                <div className="flex-1 p-3 border-t border-white/5 overflow-y-auto">
                    {!sidebarCollapsed && (
                        <div className="flex items-center justify-between mb-2 px-2">
                            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                                Spaces
                            </span>
                            <button className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-white transition-colors">
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                    {spaces.map((space) => (
                        <button
                            key={space.id}
                            onClick={() => setActiveSpace(space.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all",
                                activeSpace === space.id
                                    ? "bg-white/5 text-white"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className={cn("w-4 h-4 rounded shrink-0", space.color)} />
                            {!sidebarCollapsed && <span className="truncate">{space.name}</span>}
                        </button>
                    ))}
                </div>

                {/* THE UTILITY (System) */}
                <div className="p-3 border-t border-white/5 space-y-1">
                    <NavItem
                        icon={Settings}
                        label="Settings"
                        href="/dashboard/settings"
                        active={pathname === "/dashboard/settings"}
                        collapsed={sidebarCollapsed}
                    />

                    {/* Cmd+K Hint */}
                    {!sidebarCollapsed && (
                        <button className="w-full flex items-center gap-2 px-2 py-2 text-xs text-slate-500 hover:text-white hover:bg-white/5 rounded-md transition-colors group">
                            <Command className="w-3.5 h-3.5" />
                            <span>Command Menu</span>
                            <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 group-hover:border-slate-600">
                                ⌘K
                            </kbd>
                        </button>
                    )}

                    {/* User */}
                    <div className="flex items-center gap-3 px-2 py-2 mt-2">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-7 h-7",
                                }
                            }}
                        />
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-white truncate">Agent</p>
                                <p className="text-[10px] text-slate-500">Pro Plan</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* ================================================================ */}
            {/* MAIN CONTENT AREA */}
            {/* ================================================================ */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#020617] relative overflow-hidden">

                {/* Top Bar */}
                <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 lg:px-6 bg-[#020617]/80 backdrop-blur-md shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-white/5 rounded-md text-slate-400"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Search Bar */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                            <Search className="w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none w-48"
                            />
                            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500">
                                ⌘K
                            </kbd>
                        </div>

                        {activeSpace && (
                            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                                <div className="w-2 h-2 rounded-full bg-violet-500" />
                                <span className="text-xs font-medium text-violet-300">Apex Corp</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-md hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>
                        <div className="lg:hidden">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </header>

                {/* Scrollable Canvas */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </main>

            {/* ================================================================ */}
            {/* MOBILE MENU OVERLAY */}
            {/* ================================================================ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-[#0a0f1a] border-r border-white/10 z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-4 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                                        <span className="font-bold text-sm">S</span>
                                    </div>
                                    <span className="font-semibold">Sovereign</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-3 space-y-1">
                                {[...coreNav, ...operationsNav].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                            pathname === item.href
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// NAV ITEM COMPONENT
// ============================================================================
function NavItem({
    icon: Icon,
    label,
    href,
    active = false,
    badge,
    collapsed = false,
}: {
    icon: React.ElementType;
    label: string;
    href: string;
    active?: boolean;
    badge?: number;
    collapsed?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all group",
                active
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className={cn(
                "w-4 h-4 shrink-0",
                active ? "text-emerald-400" : "text-slate-500 group-hover:text-white"
            )} />
            {!collapsed && (
                <>
                    <span>{label}</span>
                    {badge && (
                        <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                            {badge}
                        </span>
                    )}
                </>
            )}
        </Link>
    );
}
