import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, clients, testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils";

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

        const { clientId } = await req.json();

        if (!clientId) {
            return NextResponse.json(
                { error: "Client ID required" },
                { status: 400 }
            );
        }

        // Get client
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, clientId),
        });

        if (!client || !client.email) {
            return NextResponse.json(
                { error: "Client not found or has no email" },
                { status: 404 }
            );
        }

        // Generate magic link token
        const magicToken = generateId(32);

        // Create pending testimonial
        const [testimonial] = await db
            .insert(testimonials)
            .values({
                userId: user.id,
                clientId: client.id,
                type: "pending",
                clientName: client.name,
                clientCompany: client.company,
                magicLinkToken: magicToken,
                magicLinkExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            })
            .returning();

        // In production, send email here using Resend
        // await sendTestimonialRequestEmail(client.email, magicToken, user.name);

        console.log(
            `Testimonial request created. Magic link: /testimonial/${magicToken}`
        );

        return NextResponse.json({
            success: true,
            testimonialId: testimonial.id,
        });
    } catch (error) {
        console.error("Error requesting testimonial:", error);
        return NextResponse.json(
            { error: "Failed to request testimonial" },
            { status: 500 }
        );
    }
}
