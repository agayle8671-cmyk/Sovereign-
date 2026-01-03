"use client";

import { FramerSidebar } from "@/components/dashboard/FramerSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full bg-[#09090b] overflow-hidden font-sans selection:bg-[#0099ff]/30 text-[#ededed]">
            {/* 1. Left Sidebar (Fixed width) */}
            <aside className="shrink-0 z-20">
                <FramerSidebar />
            </aside>

            {/* 2. Main Content Area (Fluid) */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative overflow-y-auto">
                {/* Optional: Top Bar could go here if needed, otherwise content fills */}
                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
