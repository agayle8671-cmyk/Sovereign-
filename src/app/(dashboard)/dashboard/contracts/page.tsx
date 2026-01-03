import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, contracts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PremiumContractsList } from "@/components/contracts/premium-contracts-list";

export default async function ContractsPage() {
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

    const userContracts = await db.query.contracts.findMany({
        where: eq(contracts.userId, user.id),
        orderBy: [desc(contracts.createdAt)],
        with: {
            client: true,
        },
    });

    return <PremiumContractsList contracts={userContracts} />;
}
