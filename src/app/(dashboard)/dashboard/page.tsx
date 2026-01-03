import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PremiumDashboard } from "@/components/dashboard/premium-dashboard";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <PremiumDashboard clerkId={userId} />
        </Suspense>
    );
}
