import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, clients, contracts } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { PremiumClientsList } from "@/components/clients/premium-clients-list";

export default async function ClientsPage() {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        redirect("/login");
    }

    const userClients = await db.query.clients.findMany({
        where: eq(clients.userId, user.id),
        orderBy: [desc(clients.createdAt)],
    });

    // Get contract counts per client
    const clientsWithStats = await Promise.all(
        userClients.map(async (client) => {
            const contractCount = await db
                .select({ count: sql<number>`count(*)`.mapWith(Number) })
                .from(contracts)
                .where(eq(contracts.clientId, client.id))
                .then((r) => r[0]?.count ?? 0);

            const totalValue = await db
                .select({ total: sql<number>`COALESCE(SUM(CAST(total_value AS DECIMAL)), 0)`.mapWith(Number) })
                .from(contracts)
                .where(eq(contracts.clientId, client.id))
                .then((r) => r[0]?.total ?? 0);

            return {
                ...client,
                contractCount,
                totalValue,
            };
        })
    );

    return <PremiumClientsList clients={clientsWithStats} />;
}
