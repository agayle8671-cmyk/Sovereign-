import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, portfolioItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const createPortfolioSchema = z.object({
    title: z.string().min(2),
    shortDescription: z.string().max(500).optional().nullable(),
    description: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    externalUrl: z.string().url().optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
    isFeatured: z.boolean().default(false),
    isPublic: z.boolean().default(true),
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
        const data = createPortfolioSchema.parse(body);

        const [item] = await db
            .insert(portfolioItems)
            .values({
                userId: user.id,
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                category: data.category,
                externalUrl: data.externalUrl,
                tags: data.tags,
                isFeatured: data.isFeatured,
                isPublic: data.isPublic,
            })
            .returning();

        return NextResponse.json(item);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation error", details: error.issues },
                { status: 400 }
            );
        }
        console.error("Error creating portfolio item:", error);
        return NextResponse.json(
            { error: "Failed to create portfolio item" },
            { status: 500 }
        );
    }
}
