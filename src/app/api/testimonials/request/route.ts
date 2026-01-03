import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, clients, testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/email";
import { testimonialRequestEmail } from "@/lib/email/templates/testimonial-request";
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

        const body = await req.json();
        const { clientId, portfolioItemId, message } = body;

        if (!clientId) {
            return NextResponse.json(
                { error: "Client ID is required" },
                { status: 400 }
            );
        }

        // Get client
        const client = await db.query.clients.findFirst({
            where: eq(clients.id, clientId),
        });

        if (!client) {
            return NextResponse.json({ error: "Client not found" }, { status: 404 });
        }

        if (!client.email) {
            return NextResponse.json(
                { error: "Client has no email address" },
                { status: 400 }
            );
        }

        // Generate magic link token
        const magicToken = generateId(32);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        // Create testimonial request
        const [testimonial] = await db
            .insert(testimonials)
            .values({
                userId: user.id,
                clientId: client.id,
                portfolioItemId: portfolioItemId || null,
                type: "pending",
                clientName: client.name,
                clientCompany: client.company,
                magicLinkToken: magicToken,
                magicLinkExpiresAt: expiresAt,
            })
            .returning();

        // Build magic link
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const magicLink = `${baseUrl}/testimonial/${magicToken}`;

        // Send email
        try {
            await sendEmail({
                to: client.email,
                subject: `${user.name || "Someone"} would love your feedback`,
                html: testimonialRequestEmail({
                    freelancerName: user.name || "Your contact",
                    clientName: client.name,
                    magicLink,
                }),
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the whole request if email fails
        }

        return NextResponse.json({
            success: true,
            testimonialId: testimonial.id,
            magicLink, // Include for development/testing
        });
    } catch (error) {
        console.error("Testimonial request error:", error);
        return NextResponse.json(
            { error: "Failed to send testimonial request" },
            { status: 500 }
        );
    }
}
