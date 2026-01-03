import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const createPortfolioSchema = z.object({
    title: z.string().min(1, "Title is required"),
    shortDescription: z.string().max(500).optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    externalUrl: z.string().url().optional().or(z.literal("")),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().default(false),
    isPublic: z.boolean().default(true),
});

// GET /api/portfolio - List all portfolio items
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

        const items = await db.query.portfolioItems.findMany({
            where: eq(portfolioItems.userId, user.id),
            orderBy: [desc(portfolioItems.createdAt)],
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return NextResponse.json(
            { error: "Failed to fetch portfolio" },
            { status: 500 }
        );
    }
}

// POST /api/portfolio - Create new portfolio item
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

        const validationResult = createPortfolioSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: "Validation error", details: validationResult.error.flatten() },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        const [item] = await db
            .insert(portfolioItems)
            .values({
                userId: user.id,
                title: data.title,
                shortDescription: data.shortDescription || null,
                description: data.description || null,
                category: data.category || null,
                externalUrl: data.externalUrl || null,
                tags: data.tags || [],
                isFeatured: data.isFeatured,
                isPublic: data.isPublic,
            })
            .returning();

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error("Error creating portfolio item:", error);
        return NextResponse.json(
            { error: "Failed to create portfolio item" },
            { status: 500 }
        );
    }
}
