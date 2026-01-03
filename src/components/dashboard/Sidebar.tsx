"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Users,
    FileText,
    Settings,
    FolderKanban,
    AreaChart,
    LogOut,
    MessagesSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const navItems = [
    { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
    { icon: FolderKanban, label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: FileText, label: "Contracts", href: "/dashboard/contracts" },
    { icon: MessagesSquare, label: "Testimonials", href: "/dashboard/testimonials" },
];

const secondaryItems = [
    { icon: AreaChart, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-[60px] lg:w-[240px] flex flex-col h-screen bg-[#050505] border-r border-[#1F1F1F] transition-all duration-300">
            {/* 1. Header Logo */}
            <div className="h-14 flex items-center px-4 border-b border-[#1F1F1F]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
                    <span className="font-bold text-white text-lg">S</span>
                </div>
                <span className="ml-3 font-display font-semibold text-white tracking-tight hidden lg:block">
                    Sovereign
                </span>
            </div>

            {/* 2. Main Nav */}
            <div className="flex-1 py-6 px-3 flex flex-col gap-1">
                <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mb-2 px-2 hidden lg:block">
                    Operations
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all group",
                                isActive
                                    ? "bg-[#1F1F1F] text-violet-400"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-violet-400" : "text-neutral-500 group-hover:text-white")} />
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    );
                })}

                <div className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mb-2 px-2 mt-6 hidden lg:block">
                    System
                </div>
                {secondaryItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-2 py-2 rounded-md text-[13px] font-medium transition-all group",
                                isActive
                                    ? "bg-[#1F1F1F] text-violet-400"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-violet-400" : "text-neutral-500 group-hover:text-white")} />
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* 3. User Footer */}
            <div className="p-3 border-t border-[#1F1F1F]">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-[#0F0F0F] border border-[#1F1F1F]">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "w-6 h-6",
                                rootBox: "w-6 h-6"
                            }
                        }}
                    />
                    <div className="hidden lg:flex flex-col overflow-hidden">
                        <span className="text-xs font-medium text-white truncate">Agent</span>
                        <span className="text-[10px] text-neutral-500 truncate">Pro Plan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
