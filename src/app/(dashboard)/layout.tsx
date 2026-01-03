import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PremiumSidebar } from "@/components/dashboard/premium-sidebar";
import { PremiumHeader } from "@/components/dashboard/premium-header";
import { CommandMenu } from "@/components/dashboard/command-menu";
import { Toaster } from "sonner";
import { RealtimeProvider } from "@/components/providers/realtime-provider";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    return (
        <div className="min-h-screen bg-neutral-950 overflow-hidden">
            {/* Premium Background Layers */}
            <div className="fixed inset-0 bg-premium-mesh" />
            <div className="fixed inset-0 bg-noise pointer-events-none" />
            <div className="fixed inset-0 bg-grid opacity-40 pointer-events-none" />

            {/* Ambient glow effects */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-magnet/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex h-screen">
                {/* Sidebar */}
                <PremiumSidebar user={user} />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <PremiumHeader user={user} />

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-6 py-8">
                            <RealtimeProvider userId={user?.id || ""}>
                                {children}
                            </RealtimeProvider>
                        </div>
                    </main>
                </div>
            </div>

            {/* Command Menu */}
            <CommandMenu />

            {/* Toast Notifications */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    className: "glass-card",
                    style: {
                        background: "rgba(23, 23, 23, 0.9)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        color: "#fff",
                    },
                }}
            />
        </div>
    );
}
