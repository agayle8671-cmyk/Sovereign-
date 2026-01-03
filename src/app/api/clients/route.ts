import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, clients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await db.query.users.findFirst({
            where: eq(users.clerkId, clerkId),
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();
        const { name, email, company, phone, website, address, notes } = body;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const [client] = await db
            .insert(clients)
            .values({
                userId: user.id,
                name,
                email: email || null,
                company: company || null,
                phone: phone || null,
                website: website || null,
                address: address || null,
                notes: notes || null,
                status: "active",
                healthScore: 75, // Default health score
            })
            .returning();

        return NextResponse.json({ success: true, client });
    } catch (error) {
        console.error("Create client error:", error);
        return NextResponse.json(
            { error: "Failed to create client" },
            { status: 500 }
        );
    }
}
