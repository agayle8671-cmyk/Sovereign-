import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const createClientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email().optional().or(z.literal("")),
    company: z.string().optional(),
    industry: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    notes: z.string().optional(),
});

// GET /api/clients - List all clients
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

// POST /api/clients - Create new client
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

        // Validate input
        const validationResult = createClientSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation error", details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Create client
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
                totalRevenue: "0",
            })
            .returning();

        return NextResponse.json(client, { status: 201 });
    } catch (error) {
        console.error("Error creating client:", error);
        return NextResponse.json(
            { error: "Failed to create client" },
            { status: 500 }
        );
    }
}
