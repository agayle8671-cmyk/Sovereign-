import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { users, contracts, scopeItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PremiumContractDetail } from "@/components/contracts/premium-contract-detail";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ContractDetailPage({ params }: Props) {
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

    const { id } = await params;

    const contract = await db.query.contracts.findFirst({
        where: and(
            eq(contracts.id, id),
            eq(contracts.userId, user.id)
        ),
        with: {
            client: true,
            scopeItems: true,
        },
    });

    if (!contract) {
        notFound();
    }

    return <PremiumContractDetail contract={contract} />;
}
