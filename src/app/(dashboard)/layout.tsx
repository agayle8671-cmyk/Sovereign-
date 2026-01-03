import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Auth Bypass for Testing */
  // const { userId } = await auth();
  // if (!userId) {
  //   redirect("/login");
  // }
  // const user = await db.query.users.findFirst({
  //   where: eq(users.clerkId, userId),
  // });

  const user = {
    name: "Admin User",
    email: "admin@sovereign.ai",
    subscriptionTier: "pro", // Unlocks "Pro" features for testing
    image: null
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}