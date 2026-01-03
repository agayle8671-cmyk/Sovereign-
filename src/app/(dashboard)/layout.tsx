import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { CommandMenu } from "@/components/dashboard/command-menu";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans selection:bg-brand-500/30">
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
                <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

                <DashboardHeader />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Global Command Menu */}
            <CommandMenu />
        </div>
    );
}
