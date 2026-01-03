"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FolderOpen,
    Users,
    FileText,
    Settings,
    Search,
    Plus,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const navItems = [
    { icon: FolderOpen, label: "Recent", href: "/dashboard" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
    { icon: FileText, label: "Contracts", href: "/dashboard/contracts" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function FramerSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-[260px] flex flex-col h-screen bg-[#09090b] border-r border-[#1f1f22]">
            {/* 1. Header (User/Team Context) */}
            <div className="h-[52px] flex items-center justify-between px-4 border-b border-[#1f1f22]">
                <button className="flex items-center gap-2 hover:bg-[#1f1f22] px-2 py-1.5 rounded-lg transition-colors -ml-2">
                    <div className="w-5 h-5 rounded-md bg-white text-black flex items-center justify-center font-bold text-xs">
                        S
                    </div>
                    <span className="text-sm font-medium text-[#ededed]">Sovereign AI</span>
                    <ChevronDown className="w-3 h-3 text-[#636366]" />
                </button>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-6 h-6",
                            rootBox: "w-6 h-6"
                        }
                    }}
                />
            </div>

            {/* 2. Primary Navigation */}
            <div className="p-2 flex flex-col gap-0.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                                isActive
                                    ? "bg-[#1f1f22] text-white"
                                    : "text-[#8d8d93] hover:text-[#ededed] hover:bg-[#1f1f22]/50"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-[#ededed]" : "text-[#8d8d93]")} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* 3. Sections (Teams style) */}
            <div className="mt-4 px-4">
                <div className="text-[11px] font-medium text-[#636366] uppercase tracking-wider mb-2">
                    Spaces
                </div>
                <div className="flex flex-col gap-0.5">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[#8d8d93] hover:text-[#ededed] hover:bg-[#1f1f22]/50 w-full text-left">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        Engineering
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[#8d8d93] hover:text-[#ededed] hover:bg-[#1f1f22]/50 w-full text-left">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        Marketing
                    </button>
                </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* 4. Bottom Actions */}
            <div className="p-3 border-t border-[#1f1f22]">
                <button className="flex items-center justify-center gap-2 w-full bg-[#0099ff] hover:bg-[#0077ff] text-white text-[13px] font-medium h-9 rounded-lg transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                    New Project
                </button>
            </div>
        </div>
    );
}
