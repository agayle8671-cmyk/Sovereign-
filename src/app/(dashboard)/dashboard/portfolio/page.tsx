import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PremiumPortfolioList } from "@/components/portfolio/premium-portfolio-list";

export default async function PortfolioPage() {
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

    const items = await db.query.portfolioItems.findMany({
        where: eq(portfolioItems.userId, user.id),
        orderBy: [desc(portfolioItems.createdAt)],
        with: {
            client: true,
        },
    });

    return <PremiumPortfolioList items={items} />;
}
