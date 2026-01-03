import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, contracts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContractsList } from "@/components/contracts/contracts-list";
import { Plus, Upload } from "lucide-react";

export default async function ContractsPage() {
    const { userId: clerkId } = await auth();

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId!),
    });

    // Handle case where user isn't in DB yet (e.g. fresh signup before webhook sync)
    if (!user) {
        return (
            <div className="p-8 text-center text-neutral-400">
                Initializing account... please refresh in a moment.
            </div>
        );
    }

    const contractsList = await db.query.contracts.findMany({
        where: eq(contracts.userId, user.id),
        orderBy: [desc(contracts.createdAt)],
        with: {
            client: true,
        },
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-100">Contracts</h1>
                    <p className="text-neutral-400 mt-1">
                        Manage and analyze your contracts with AI-powered risk detection.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/contracts/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Contract
                        </Link>
                    </Button>
                    <Button variant="shield" asChild>
                        <Link href="/dashboard/contracts/analyze">
                            <Upload className="w-4 h-4 mr-2" />
                            Analyze Contract
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Contracts List */}
            <ContractsList contracts={contractsList} />
        </div>
    );
}
