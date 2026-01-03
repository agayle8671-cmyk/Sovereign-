import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, vaults, clients, portfolioItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
    try {
        const { userId: clerkId } = await auth();
        const clerkUser = await currentUser();

        if (!clerkId || !clerkUser) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Check if user exists
        let user = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (!user) {
            // Create user
            const [newUser] = await db
                .insert(users)
                .values({
                    clerkId: clerkId,
                    email: clerkUser.emailAddresses[0]?.emailAddress || "",
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || null,
                    avatarUrl: clerkUser.imageUrl || null,
                })
                .returning();

            user = newUser;

            // Create vault
            await db.insert(vaults).values({
                userId: user.id,
                settings: {
                    defaultCurrency: "USD",
                    defaultPaymentTerms: "NET_30",
                    autoGenerateChangeOrders: true,
                    scopeCreepSensitivity: "medium",
                    notificationPreferences: { email: true, push: true },
                },
                aiPreferences: {
                    preferredTone: "professional",
                    autoNegotiate: false,
                    riskTolerance: "moderate",
                },
                defaultRates: { hourlyRate: 150 },
            });

            // Create demo client
            const [demoClient] = await db
                .insert(clients)
                .values({
                    userId: user.id,
                    name: "Acme Technologies",
                    email: "contact@acme.tech",
                    company: "Acme Technologies Inc.",
                    industry: "technology",
                    website: "https://acme.tech",
                    healthScore: 85,
                    sentimentTrend: "POSITIVE",
                    totalRevenue: "15000",
                })
                .returning();

            // Create demo portfolio
            await db.insert(portfolioItems).values({
                userId: user.id,
                clientId: demoClient.id,
                title: "E-commerce Platform Redesign",
                shortDescription:
                    "Complete redesign of a B2B e-commerce platform resulting in 40% increase in conversions.",
                category: "web design",
                industries: ["technology", "e-commerce"],
                tags: ["React", "TypeScript", "UI/UX"],
                isFeatured: true,
                isPublic: true,
            });

            console.log("Created new user with demo data:", user.id);
        }

        return NextResponse.json({ success: true, userId: user.id });
    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}
