"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Home,
    Users,
    Briefcase,
    Shield,
    Settings,
    LogOut,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
    { icon: Briefcase, label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: Shield, label: "Contracts", href: "/dashboard/contracts" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed left-6 top-6 bottom-6 w-20 flex flex-col items-center py-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] z-50 shadow-2xl shadow-black/50"
        >
            {/* Logo */}
            <div className="mb-10 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-lg">S</span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-4 w-full px-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="relative group flex justify-center">
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={cn(
                                "p-3 rounded-xl transition-all duration-300 relative z-10",
                                isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                            )}>
                                <item.icon className="w-5 h-5" />

                                {/* Tooltip */}
                                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                                    {item.label}
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
                    <button className="p-3 rounded-xl bg-white text-black hover:scale-110 transition-transform shadow-lg shadow-white/10">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Footer */}
            <div className="mt-auto">
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-10 h-10 rounded-xl",
                            rootBox: "w-10 h-10"
                        }
                    }}
                />
            </div>
        </motion.div>
    );
}
