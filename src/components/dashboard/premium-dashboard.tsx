import { db } from "@/lib/db";
import { users, contracts, clients, portfolioItems, testimonials } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { WelcomeSection } from "./sections/welcome-section";
import { StatsGrid } from "./sections/stats-grid";
import { QuickActionsGrid } from "./sections/quick-actions-grid";
import { RecentActivitySection } from "./sections/recent-activity-section";
import { CreateUserPrompt } from "./create-user-prompt";

interface PremiumDashboardProps {
    clerkId: string;
}

export async function PremiumDashboard({ clerkId }: PremiumDashboardProps) {
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        return <CreateUserPrompt />;
    }

    // Fetch all data in parallel
    const [contractCount, clientCount, portfolioCount, testimonialCount, recentContracts, recentClients] =
        await Promise.all([
            db
                .select({ count: sql<number>`count(*)`.mapWith(Number) })
                .from(contracts)
                .where(eq(contracts.userId, user.id))
                .then((r) => r[0]?.count ?? 0),

            db
                .select({ count: sql<number>`count(*)`.mapWith(Number) })
                .from(clients)
                .where(eq(clients.userId, user.id))
                .then((r) => r[0]?.count ?? 0),

            db
                .select({ count: sql<number>`count(*)`.mapWith(Number) })
                .from(portfolioItems)
                .where(eq(portfolioItems.userId, user.id))
                .then((r) => r[0]?.count ?? 0),

            db
                .select({ count: sql<number>`count(*)`.mapWith(Number) })
                .from(testimonials)
                .where(eq(testimonials.userId, user.id))
                .then((r) => r[0]?.count ?? 0),

            db.query.contracts.findMany({
                where: eq(contracts.userId, user.id),
                orderBy: [desc(contracts.createdAt)],
                limit: 5,
                with: { client: true },
            }),

            db.query.clients.findMany({
                where: eq(clients.userId, user.id),
                orderBy: [desc(clients.createdAt)],
                limit: 5,
            }),
        ]);

    const stats = {
        contracts: contractCount,
        clients: clientCount,
        portfolio: portfolioCount,
        testimonials: testimonialCount,
    };

    const isNewUser = contractCount === 0 && clientCount <= 1;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeSection user={user} isNewUser={isNewUser} />

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Quick Actions */}
            <QuickActionsGrid />

            {/* Recent Activity */}
            <RecentActivitySection
                contracts={recentContracts}
                clients={recentClients}
            />
        </div>
    );
}
