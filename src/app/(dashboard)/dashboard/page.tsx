import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, contracts, clients, portfolioItems, testimonials } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { DashboardHome } from "@/components/dashboard/dashboard-home";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user) {
    redirect("/onboarding");
  }

  // Fetch all data in parallel
  const [
    contractCount,
    clientCount,
    portfolioCount,
    testimonialCount,
    recentContracts,
    recentClients,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(contracts)
      .where(eq(contracts.userId, user.id))
      .then(r => r[0]?.count ?? 0),
    db.select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(clients)
      .where(eq(clients.userId, user.id))
      .then(r => r[0]?.count ?? 0),
    db.select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(portfolioItems)
      .where(eq(portfolioItems.userId, user.id))
      .then(r => r[0]?.count ?? 0),
    db.select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(testimonials)
      .where(eq(testimonials.userId, user.id))
      .then(r => r[0]?.count ?? 0),
    db.query.contracts.findMany({
      where: eq(contracts.userId, user.id),
      orderBy: [desc(contracts.createdAt)],
      limit: 5,
      with: { client: true },
    }),
    db.query.clients.findMany({
      where: eq(clients.userId, user.id),
      orderBy: [desc(clients.healthScore)],
      limit: 5,
    }),
  ]);

  return (
    <DashboardHome
      user={user}
      stats={{
        contracts: contractCount,
        clients: clientCount,
        portfolio: portfolioCount,
        testimonials: testimonialCount,
      }}
      recentContracts={recentContracts}
      recentClients={recentClients}
    />
  );
}