"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Search,
    Command,
    Bell,
    ChevronDown,
    Settings,
    LogOut,
    User,
    HelpCircle,
    Sparkles,
} from "lucide-react";

interface HeaderProps {
    user: any;
}

export function PremiumHeader({ user }: HeaderProps) {
    const { user: clerkUser } = useUser();
    const { signOut } = useClerk();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const notifications = [
        {
            id: 1,
            title: "Contract analyzed",
            description: "Your NDA with Acme Corp has been reviewed",
            time: "2 min ago",
            type: "success",
        },
        {
            id: 2,
            title: "New testimonial",
            description: "Sarah left a 5-star review",
            time: "1 hour ago",
            type: "info",
        },
    ];

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-neutral-900/30 backdrop-blur-xl">
            {/* Search Bar */}
            <button
                onClick={() => {
                    // Trigger command menu
                    const event = new KeyboardEvent("keydown", {
                        key: "k",
                        metaKey: true,
                    });
                    document.dispatchEvent(event);
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-80 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
            >
                <Search className="w-4 h-4 text-neutral-500 group-hover:text-neutral-400" />
                <span className="text-sm text-neutral-500 flex-1 text-left">
                    Search or type a command...
                </span>
                <div className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        ⌘
                    </kbd>
                    <kbd className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        K
                    </kbd>
                </div>
            </button>

            {/* Right Side */}
            <div className="flex items-center gap-2">
                {/* Plan Badge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-500/10 to-magnet/10 border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span className="text-xs font-medium text-brand-400">
                        {user?.subscriptionTier === "pro" ? "Pro" : "Free"} Plan
                    </span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                    >
                        <Bell className="w-5 h-5 text-neutral-400" />
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-neutral-900" />
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-80 z-50 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                                >
                                    <div className="p-4 border-b border-white/5">
                                        <h3 className="font-semibold text-white">Notifications</h3>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                            >
                                                <p className="text-sm font-medium text-white">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-neutral-400 mt-0.5">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 border-t border-white/5">
                                        <button className="w-full py-2 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                                            View all notifications
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-magnet overflow-hidden">
                            {clerkUser?.imageUrl ? (
                                <img
                                    src={clerkUser.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-medium text-white">
                                    {user?.name?.[0] || "U"}
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-white">
                                {user?.name || clerkUser?.firstName || "User"}
                            </p>
                            <p className="text-xs text-neutral-500">
                                {user?.email || clerkUser?.emailAddresses[0]?.emailAddress}
                            </p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-neutral-500" />
                    </button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowUserMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-56 z-50 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                                >
                                    <div className="p-2">
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <User className="w-4 h-4 text-neutral-400" />
                                            <span className="text-sm text-neutral-200">Profile</span>
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <Settings className="w-4 h-4 text-neutral-400" />
                                            <span className="text-sm text-neutral-200">Settings</span>
                                        </Link>
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <HelpCircle className="w-4 h-4 text-neutral-400" />
                                            <span className="text-sm text-neutral-200">Help</span>
                                        </a>
                                    </div>
                                    <div className="border-t border-white/5 p-2">
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-danger/10 transition-colors text-danger"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="text-sm">Sign out</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
