import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Plus } from "lucide-react";

export default async function PortfolioPage() {
    const { userId: clerkId } = await auth();

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId!),
    });

    if (!user) return null;

    const items = await db.query.portfolioItems.findMany({
        where: eq(portfolioItems.userId, user.id),
        orderBy: [desc(portfolioItems.createdAt)],
        with: {
            client: true,
            testimonials: {
                where: (t, { eq }) => eq(t.isApproved, true),
                limit: 1,
            },
        },
    });

    const listItems = items.map((item) => ({
        ...item,
        isFeatured: item.isFeatured ?? false,
        client: item.client
            ? {
                name: item.client.name,
                company: item.client.company,
            }
            : null,
    }));

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-100">Portfolio</h1>
                    <p className="text-neutral-400 mt-1">
                        Showcase your best work and attract new clients.
                    </p>
                </div>
                <Button variant="magnet" asChild>
                    <Link href="/dashboard/portfolio/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Link>
                </Button>
            </div>

            <PortfolioGrid items={listItems} />
        </div>
    );
}
