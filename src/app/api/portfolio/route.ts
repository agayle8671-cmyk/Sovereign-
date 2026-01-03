import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, portfolioItems } from "@/lib/db/schema";
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

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const clientId = formData.get("clientId") as string;
        const projectUrl = formData.get("projectUrl") as string;
        const completedAt = formData.get("completedAt") as string;
        const isFeatured = formData.get("isFeatured") === "true";
        const status = formData.get("status") as string;
        const image = formData.get("image") as File | null;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        // Handle image upload here if needed
        // For now, we'll skip the actual upload
        let featuredImageUrl: string | null = null;
        if (image) {
            // Would upload to cloud storage here
            // featuredImageUrl = await uploadToStorage(image);
        }

        const [portfolioItem] = await db
            .insert(portfolioItems)
            .values({
                userId: user.id,
                clientId: clientId || null,
                title,
                description: description || null,
                category: category || null,
                featuredImageUrl,
                projectUrl: projectUrl || null,
                completedAt: completedAt ? new Date(completedAt) : null,
                isFeatured,
                status: status || "draft",
            })
            .returning();

        return NextResponse.json({ success: true, portfolioItem });
    } catch (error) {
        console.error("Create portfolio item error:", error);
        return NextResponse.json(
            { error: "Failed to create portfolio item" },
            { status: 500 }
        );
    }
}
