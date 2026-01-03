"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Bell } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-[#050505] overflow-hidden font-sans selection:bg-violet-500/30 text-white">
            {/* 1. Left Sidebar (Collapsible) */}
            <aside className="shrink-0 z-30">
                <Sidebar />
            </aside>

            {/* 2. Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative">
                {/* Top Header */}
                <header className="h-14 border-b border-[#1F1F1F] flex items-center justify-between px-6 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <CommandPalette />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5 transition-colors text-neutral-400 hover:text-white">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-violet-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {/* Scrollable Canvas */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto animate-fade-in">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
