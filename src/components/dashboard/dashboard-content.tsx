import { db } from "@/lib/db";
import { users, contracts, clients, portfolioItems, testimonials } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { DashboardStats } from "./stats";
import { RecentContracts } from "./recent-contracts";
import { ClientHealth } from "./client-health";
import { QuickActions } from "./quick-actions";
import { WelcomeCard } from "./welcome-card";
import { CreateUserPrompt } from "./create-user-prompt";

interface DashboardContentProps {
    clerkId: string;
}

export async function DashboardContent({ clerkId }: DashboardContentProps) {
    // Get user from database
    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    // If no user exists, show prompt to create
    if (!user) {
        return <CreateUserPrompt />;
    }

    // Fetch all dashboard data
    const [
        contractCount,
        clientCount,
        portfolioCount,
        testimonialCount,
        recentContractsList,
        clientsList,
    ] = await Promise.all([
        // Count contracts
        db
            .select({
                count: sql<number>`count(*)`.mapWith(Number)
            })
            .from(contracts)
            .where(eq(contracts.userId, user.id))
            .then(r => r[0]?.count ?? 0),

        // Count clients
        db
            .select({
                count: sql<number>`count(*)`.mapWith(Number)
            })
            .from(clients)
            .where(eq(clients.userId, user.id))
            .then(r => r[0]?.count ?? 0),

        // Count portfolio items
        db
            .select({
                count: sql<number>`count(*)`.mapWith(Number)
            })
            .from(portfolioItems)
            .where(eq(portfolioItems.userId, user.id))
            .then(r => r[0]?.count ?? 0),

        // Count testimonials
        db
            .select({
                count: sql<number>`count(*)`.mapWith(Number)
            })
            .from(testimonials)
            .where(eq(testimonials.userId, user.id))
            .then(r => r[0]?.count ?? 0),

        // Recent contracts with client
        db.query.contracts.findMany({
            where: eq(contracts.userId, user.id),
            orderBy: [desc(contracts.createdAt)],
            limit: 5,
            with: {
                client: true,
            },
        }),

        // All clients for health display
        db.query.clients.findMany({
            where: eq(clients.userId, user.id),
            orderBy: [clients.healthScore],
            limit: 5,
        }),
    ]);

    const stats = [
        {
            name: "Contracts",
            value: contractCount,
            href: "/dashboard/contracts",
            icon: "shield" as const,
        },
        {
            name: "Clients",
            value: clientCount,
            href: "/dashboard/clients",
            icon: "radar" as const,
        },
        {
            name: "Portfolio Items",
            value: portfolioCount,
            href: "/dashboard/portfolio",
            icon: "magnet" as const,
        },
        {
            name: "Testimonials",
            value: testimonialCount,
            href: "/dashboard/testimonials",
            icon: "magnet" as const,
        },
    ];

    const isNewUser = contractCount === 0 && clientCount <= 1;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-neutral-100">
                    Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
                </h1>
                <p className="text-neutral-400 mt-1">
                    Here's what's happening with your business.
                </p>
            </div>

            {/* New User Onboarding */}
            {isNewUser && <WelcomeCard />}

            {/* Stats */}
            <DashboardStats stats={stats} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentContracts contracts={recentContractsList} />
                </div>
                <div>
                    <ClientHealth clients={clientsList} />
                </div>
            </div>
        </div>
    );
}
