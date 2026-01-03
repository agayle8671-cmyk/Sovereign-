import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PremiumPortfolioForm } from "@/components/portfolio/premium-portfolio-form";

export default async function NewPortfolioItemPage() {
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
    });

    return <PremiumPortfolioForm clients={userClients} />;
}
