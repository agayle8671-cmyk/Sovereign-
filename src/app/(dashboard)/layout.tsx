import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { CommandMenu } from "@/components/dashboard/command-menu";
import { SyncUser } from "@/components/dashboard/sync-user";
import { RealtimeProvider } from "@/components/providers/realtime-provider";
import { Toaster } from "sonner";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    // Check if user exists in database
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Sync user if not in database */}
            {!user && <SyncUser />}

            {/* Background Pattern */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
            <div className="fixed inset-0 pattern-dots opacity-30 pointer-events-none" />

            {user ? (
                <RealtimeProvider userId={user.id}>
                    <div className="relative flex h-screen overflow-hidden">
                        {/* Sidebar */}
                        <DashboardSidebar />

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Header */}
                            <DashboardHeader />

                            {/* Page Content */}
                            <main className="flex-1 overflow-y-auto">
                                <div className="container max-w-7xl mx-auto p-6">{children}</div>
                            </main>
                        </div>
                    </div>
                    {/* Command Menu (⌘K) */}
                    <CommandMenu />
                </RealtimeProvider>
            ) : (
                <>
                    <div className="relative flex h-screen overflow-hidden">
                        {/* Sidebar */}
                        <DashboardSidebar />

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Header */}
                            <DashboardHeader />

                            {/* Page Content */}
                            <main className="flex-1 overflow-y-auto">
                                <div className="container max-w-7xl mx-auto p-6">{children}</div>
                            </main>
                        </div>
                    </div>
                    {/* Command Menu (⌘K) */}
                    <CommandMenu />
                </>
            )}

            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#171717",
                        border: "1px solid #262626",
                        color: "#fff",
                    },
                }}
            />
        </div>
    );
}
