import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { contracts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ContractDetail } from "@/components/contracts/contract-detail";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ContractPage(props: Props) {
    const params = await props.params;
    const { userId: clerkId } = await auth();

    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.clerkId, clerkId!),
    });

    if (!user) redirect("/login");

    const contract = await db.query.contracts.findFirst({
        where: eq(contracts.id, params.id),
        with: {
            scopeItems: true,
            changeOrders: true,
        },
    });

    if (!contract || contract.userId !== user.id) {
        notFound();
    }

    return <ContractDetail contract={contract} />;
}
