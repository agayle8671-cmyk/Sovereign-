import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const createClientSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().optional().nullable(),
    company: z.string().optional().nullable(),
    industry: z.string().optional().nullable(),
    website: z.string().url().optional().nullable(),
    notes: z.string().optional().nullable(),
});

export async function GET() {
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

        const clientsList = await db.query.clients.findMany({
            where: eq(clients.userId, user.id),
            orderBy: [desc(clients.createdAt)],
        });

        return NextResponse.json(clientsList);
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json(
            { error: "Failed to fetch clients" },
            { status: 500 }
        );
    }
}

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
        const data = createClientSchema.parse(body);

        const [client] = await db
            .insert(clients)
            .values({
                userId: user.id,
                name: data.name,
                email: data.email || null,
                company: data.company || null,
                industry: data.industry || null,
                website: data.website || null,
                notes: data.notes || null,
                healthScore: 100,
                sentimentTrend: "NEUTRAL",
            })
            .returning();

        return NextResponse.json(client);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation error", details: error.issues },
                { status: 400 }
            );
        }
        console.error("Error creating client:", error);
        return NextResponse.json(
            { error: "Failed to create client" },
            { status: 500 }
        );
    }
}
