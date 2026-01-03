import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, vaults, clients, portfolioItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const clerkUser = await currentUser();

        if (!clerkUser) {
            return NextResponse.json(
                { error: "Could not fetch user data" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (existingUser) {
            return NextResponse.json({
                success: true,
                userId: existingUser.id,
                message: "User already exists",
            });
        }

        // Create new user
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const name = [clerkUser.firstName, clerkUser.lastName]
            .filter(Boolean)
            .join(" ");

        if (!email) {
            return NextResponse.json(
                { error: "No email address found" },
                { status: 400 }
            );
        }

        const [newUser] = await db
            .insert(users)
            .values({
                clerkId: clerkId,
                email: email,
                name: name || null,
                avatarUrl: clerkUser.imageUrl || null,
                onboardingCompleted: false,
                subscriptionTier: "free",
            })
            .returning();

        // Create vault with default settings
        await db.insert(vaults).values({
            userId: newUser.id,
            settings: {
                defaultCurrency: "USD",
                defaultPaymentTerms: "NET_30",
                autoGenerateChangeOrders: true,
                scopeCreepSensitivity: "medium",
                notificationPreferences: {
                    email: true,
                    push: true,
                },
            },
            aiPreferences: {
                preferredTone: "professional",
                autoNegotiate: false,
                riskTolerance: "moderate",
            },
            defaultRates: {
                hourlyRate: 150,
            },
        });

        // Create a demo client so dashboard isn't empty
        const [demoClient] = await db
            .insert(clients)
            .values({
                userId: newUser.id,
                name: "Demo Client",
                email: "demo@example.com",
                company: "Demo Company Inc.",
                industry: "technology",
                healthScore: 85,
                sentimentTrend: "POSITIVE",
                totalRevenue: "0",
                notes: "This is a demo client. Feel free to edit or delete.",
            })
            .returning();

        // Create a demo portfolio item
        await db.insert(portfolioItems).values({
            userId: newUser.id,
            title: "Sample Project",
            shortDescription:
                "This is a sample portfolio item. Edit or delete it and add your real work!",
            category: "web design",
            industries: ["technology"],
            tags: ["demo"],
            isFeatured: false,
            isPublic: true,
        });

        return NextResponse.json({
            success: true,
            userId: newUser.id,
            message: "Account created successfully",
        });
    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json(
            {
                error: "Failed to sync account",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
