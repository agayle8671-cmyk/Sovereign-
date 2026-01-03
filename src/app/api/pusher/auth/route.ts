import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { pusher } from "@/lib/pusher/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        if (!pusher) {
            return NextResponse.json(
                { error: "Pusher not configured" },
                { status: 500 }
            );
        }

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

        const body = await req.formData();
        const socketId = body.get("socket_id") as string;
        const channel = body.get("channel_name") as string;

        // Verify channel access
        const expectedChannel = `private-user-${user.id}`;
        if (channel !== expectedChannel) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const authResponse = pusher.authorizeChannel(socketId, channel, {
            user_id: user.id,
        });

        return NextResponse.json(authResponse);
    } catch (error) {
        console.error("Pusher auth error:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 500 }
        );
    }
}
