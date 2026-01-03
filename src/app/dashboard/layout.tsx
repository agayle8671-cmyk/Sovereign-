"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen text-white selection:bg-indigo-500/30">
            {/* Global Background */}
            <DashboardBackground />

            {/* Glass Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="pl-32 pr-8 py-8 min-h-screen relative z-10">
                <div className="max-w-[1600px] mx-auto animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
