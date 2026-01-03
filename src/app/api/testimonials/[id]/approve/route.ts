import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, testimonials } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        // Update testimonial
        const [updated] = await db
            .update(testimonials)
            .set({ isApproved: true })
            .where(
                and(
                    eq(testimonials.id, id),
                    eq(testimonials.userId, user.id)
                )
            )
            .returning();

        if (!updated) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Testimonial approval error:", error);
        return NextResponse.json(
            { error: "Failed to approve testimonial" },
            { status: 500 }
        );
    }
}
