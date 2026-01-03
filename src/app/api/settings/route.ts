import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, vaults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
            with: { vault: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const { name, timezone, settings, aiPreferences, defaultRates } =
            await req.json();

        // Update user
        await db
            .update(users)
            .set({
                name,
                timezone,
                updatedAt: new Date(),
            })
            .where(eq(users.id, user.id));

        // Update or create vault
        if (user.vault) {
            await db
                .update(vaults)
                .set({
                    settings: { ...user.vault.settings, ...settings },
                    aiPreferences: { ...user.vault.aiPreferences, ...aiPreferences },
                    defaultRates: { ...user.vault.defaultRates, ...defaultRates },
                    updatedAt: new Date(),
                })
                .where(eq(vaults.userId, user.id));
        } else {
            await db.insert(vaults).values({
                userId: user.id,
                settings,
                aiPreferences,
                defaultRates,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving settings:", error);
        return NextResponse.json(
            { error: "Failed to save settings" },
            { status: 500 }
        );
    }
}
