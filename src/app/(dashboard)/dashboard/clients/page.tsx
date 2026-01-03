import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClientsList } from "@/components/clients/clients-list";
import { Plus } from "lucide-react";

export default async function ClientsPage() {
    const { userId: clerkId } = await auth();

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId!),
    });

    if (!user) return null;

    const clientsList = await db.query.clients.findMany({
        where: eq(clients.userId, user.id),
        orderBy: [desc(clients.createdAt)],
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-100">Clients</h1>
                    <p className="text-neutral-400 mt-1">
                        Manage your client relationships and track engagement health.
                    </p>
                </div>
                <Button variant="radar" asChild>
                    <Link href="/dashboard/clients/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Client
                    </Link>
                </Button>
            </div>

            <ClientsList clients={clientsList} />
        </div>
    );
}
