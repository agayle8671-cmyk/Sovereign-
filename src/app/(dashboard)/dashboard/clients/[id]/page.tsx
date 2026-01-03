import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { users, clients, contracts, testimonials } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { PremiumClientDetail } from "@/components/clients/premium-client-detail";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
    const { id } = await params;
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

    const client = await db.query.clients.findFirst({
        where: and(eq(clients.id, id), eq(clients.userId, user.id)),
    });

    if (!client) {
        notFound();
    }

    const clientContracts = await db.query.contracts.findMany({
        where: eq(contracts.clientId, client.id),
        orderBy: [desc(contracts.createdAt)],
    });

    const clientTestimonials = await db.query.testimonials.findMany({
        where: eq(testimonials.clientId, client.id),
        orderBy: [desc(testimonials.createdAt)],
    });

    return (
        <PremiumClientDetail
            client={client}
            contracts={clientContracts}
            testimonials={clientTestimonials}
        />
    );
}
