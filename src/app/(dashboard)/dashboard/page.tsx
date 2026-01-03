import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, contracts, clients, portfolioItems, testimonials } from "@/lib/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentContracts } from "@/components/dashboard/recent-contracts";
import { ClientHealth } from "@/components/dashboard/client-health";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AiInsights } from "@/components/dashboard/ai-insights";

export default async function DashboardPage() {
    const { userId: clerkId } = await auth();

    // Get user from database
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId!),
    });

    if (!user) {
        // In a real app, you might redirect to a setup page or creating the user via webhook
        // For now, we'll return null or a basic message
        return (
            <div className="flex items-center justify-center h-[50vh] flex-col gap-4">
                <h1 className="text-2xl font-bold">Account Setup Required</h1>
                <p className="text-neutral-400">Please complete your profile to access the dashboard.</p>
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
        // Contract stats
        db
            .select({
                total: count(),
                active: count(sql`CASE WHEN status = 'active' THEN 1 END`),
                pendingReview: count(sql`CASE WHEN status = 'pending_review' THEN 1 END`),
            })
            .from(contracts)
            .where(eq(contracts.userId, user.id)),

        // Client stats
        db
            .select({ total: count() })
            .from(clients)
            .where(eq(clients.userId, user.id)),

        // Portfolio stats
        db
            .select({ total: count() })
            .from(portfolioItems)
            .where(eq(portfolioItems.userId, user.id)),

        // Testimonial stats
        db
            .select({
                total: count(),
                approved: count(sql`CASE WHEN is_approved = true THEN 1 END`),
            })
            .from(testimonials)
            .where(eq(testimonials.userId, user.id)),

        // Recent contracts
        db.query.contracts.findMany({
            where: eq(contracts.userId, user.id),
            orderBy: [desc(contracts.createdAt)],
            limit: 5,
            with: {
                client: true,
            },
        }),

        // Client health (lowest health scores)
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
            change: "+2 this month",
            changeType: "positive" as const,
            icon: "shield" as const,
        },
        {
            name: "Total Clients",
            value: clientStats[0]?.total || 0,
            change: "+3 this month",
            changeType: "positive" as const,
            icon: "radar" as const,
        },
        {
            name: "Portfolio Items",
            value: portfolioStats[0]?.total || 0,
            change: "2 pending",
            changeType: "neutral" as const,
            icon: "magnet" as const,
        },
        {
            name: "Testimonials",
            value: testimonialStats[0]?.approved || 0,
            change: `${(testimonialStats[0]?.total || 0) - (testimonialStats[0]?.approved || 0)} pending`,
            changeType: "neutral" as const,
            icon: "magnet" as const,
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-display font-medium text-neutral-100">
                    Welcome back, {user.name?.split(" ")[0] || "Sovereign"}
                </h1>
                <p className="text-neutral-400 mt-1">
                    Here&apos;s what&apos;s happening with your business today.
                </p>
            </div>

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
                <div className="space-y-6">
                    <ClientHealth clients={clientHealthList} />

                    {/* AI Insights - Placed here for better layout */}
                    <AiInsights userId={user.id} />
                </div>
            </div>
        </div>
    );
}
