import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, contracts, clients, portfolioItems, testimonials } from "@/lib/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentContracts } from "@/components/dashboard/recent-contracts";
import { ClientHealth } from "@/components/dashboard/client-health";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AiInsights } from "@/components/dashboard/ai-insights";
import { WelcomeCard } from "@/components/dashboard/welcome-card";

export default async function DashboardPage() {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    // Get user from database
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    // If no user yet, show loading (SyncUser component will handle creation)
    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-neutral-400">Loading your dashboard...</p>
            </div>
        );
    }

    // Fetch dashboard stats
    const [
        contractStats,
        clientStats,
        portfolioStats,
        testimonialStats,
        recentContractsList,
        clientHealthList,
    ] = await Promise.all([
        db
            .select({
                total: count(),
                active: sql<number>`count(case when status = 'active' then 1 end)`.mapWith(Number),
                pendingReview: sql<number>`count(case when status = 'pending_review' then 1 end)`.mapWith(Number),
            })
            .from(contracts)
            .where(eq(contracts.userId, user.id)),

        db
            .select({ total: count() })
            .from(clients)
            .where(eq(clients.userId, user.id)),

        db
            .select({ total: count() })
            .from(portfolioItems)
            .where(eq(portfolioItems.userId, user.id)),

        db
            .select({
                total: count(),
                approved: sql<number>`count(case when is_approved = true then 1 end)`.mapWith(Number),
            })
            .from(testimonials)
            .where(eq(testimonials.userId, user.id)),

        db.query.contracts.findMany({
            where: eq(contracts.userId, user.id),
            orderBy: [desc(contracts.createdAt)],
            limit: 5,
            with: {
                client: true,
            },
        }),

        db.query.clients.findMany({
            where: eq(clients.userId, user.id),
            orderBy: [clients.healthScore],
            limit: 5,
        }),
    ]);

    const stats = [
        {
            name: "Active Contracts",
            value: contractStats[0]?.active || 0,
            change: contractStats[0]?.pendingReview
                ? `${contractStats[0].pendingReview} pending review`
                : "No pending",
            changeType: contractStats[0]?.pendingReview ? "warning" as const : "neutral" as const,
            icon: "shield" as const,
        },
        {
            name: "Total Clients",
            value: clientStats[0]?.total || 0,
            change: "Manage relationships",
            changeType: "neutral" as const,
            icon: "radar" as const,
        },
        {
            name: "Portfolio Items",
            value: portfolioStats[0]?.total || 0,
            change: "Showcase your work",
            changeType: "neutral" as const,
            icon: "magnet" as const,
        },
        {
            name: "Testimonials",
            value: testimonialStats[0]?.approved || 0,
            change: testimonialStats[0]?.total
                ? `${(testimonialStats[0]?.total || 0) - (testimonialStats[0]?.approved || 0)} pending`
                : "Collect reviews",
            changeType: "neutral" as const,
            icon: "magnet" as const,
        },
    ];

    const isNewUser =
        (contractStats[0]?.total || 0) === 0 &&
        (clientStats[0]?.total || 0) <= 1;

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-semibold text-neutral-100">
                    Welcome back, {user.name?.split(" ")[0] || "there"}
                </h1>
                <p className="text-neutral-400 mt-1">
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

            {/* New User Welcome */}
            {isNewUser && <WelcomeCard />}

            {/* Stats Grid */}
            <DashboardStats stats={stats} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Contracts */}
                <div className="lg:col-span-2">
                    <RecentContracts contracts={recentContractsList} />
                </div>

                {/* Client Health */}
                <div>
                    <ClientHealth clients={clientHealthList} />
                </div>
            </div>

            {/* AI Insights */}
            <AiInsights userId={user.id} />
        </div>
    );
}
