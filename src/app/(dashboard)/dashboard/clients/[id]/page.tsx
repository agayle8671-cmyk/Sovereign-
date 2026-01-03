import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, clients, contracts, communications } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { ClientDetail } from "@/components/clients/client-detail";

interface ClientPageProps {
    params: { id: string };
}

export default async function ClientPage({ params }: ClientPageProps) {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        redirect("/dashboard");
    }

    const client = await db.query.clients.findFirst({
        where: and(
            eq(clients.id, params.id),
            eq(clients.userId, user.id)
        ),
    });

    if (!client) {
        notFound();
    }

    // Get client's contracts
    const clientContracts = await db.query.contracts.findMany({
        where: and(
            eq(contracts.clientId, client.id),
            eq(contracts.userId, user.id)
        ),
        orderBy: [desc(contracts.createdAt)],
        limit: 5,
    });

    return <ClientDetail client={client} contracts={clientContracts} />;
}
