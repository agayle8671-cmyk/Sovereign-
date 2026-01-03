import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { brain } from "@/lib/brain";

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
        const { action, message } = body;

        if (action === "insights") {
            const insights = await brain.generateInsights(user.id);
            return NextResponse.json(insights);
        } else if (action === "chat") {
            const response = await brain.chat(message, { userId: user.id });
            return NextResponse.json({ response });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Brain API Error:", error);
        return NextResponse.json(
            { error: "Failed to process Brain request" },
            { status: 500 }
        );
    }
}
