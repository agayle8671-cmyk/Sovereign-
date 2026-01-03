import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const token = formData.get("token") as string;
        const type = formData.get("type") as "text" | "video";
        const rating = parseInt(formData.get("rating") as string) || 5;
        const content = formData.get("content") as string | null;
        const clientName = formData.get("clientName") as string | null;
        const clientTitle = formData.get("clientTitle") as string | null;
        const clientCompany = formData.get("clientCompany") as string | null;
        const videoFile = formData.get("video") as File | null;

        if (!token) {
            return NextResponse.json(
                { error: "Token is required" },
                { status: 400 }
            );
        }

        // Find testimonial by token
        const testimonial = await db.query.testimonials.findFirst({
            where: eq(testimonials.magicLinkToken, token),
        });

        if (!testimonial) {
            return NextResponse.json(
                { error: "Invalid or expired link" },
                { status: 404 }
            );
        }

        // Check if already submitted
        if (testimonial.type !== "pending") {
            return NextResponse.json(
                { error: "Testimonial already submitted" },
                { status: 400 }
            );
        }

        // Check expiration
        if (
            testimonial.magicLinkExpiresAt &&
            new Date() > testimonial.magicLinkExpiresAt
        ) {
            return NextResponse.json({ error: "Link has expired" }, { status: 400 });
        }

        // Handle video upload if present
        let videoUrl: string | null = null;
        if (videoFile && type === "video") {
            // In production, upload to cloud storage
            // For now, we'll just note that video was submitted
            // This would integrate with UploadThing or GCS
            console.log("Video submitted:", videoFile.name, videoFile.size);
            videoUrl = "pending_upload";
        }

        // Update testimonial
        await db
            .update(testimonials)
            .set({
                type,
                content: content || null,
                videoUrl,
                rating,
                clientName: clientName || testimonial.clientName,
                clientTitle: clientTitle || null,
                clientCompany: clientCompany || testimonial.clientCompany,
                collectedAt: new Date(),
                isApproved: false, // Require manual approval
            })
            .where(eq(testimonials.id, testimonial.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Testimonial submit error:", error);
        return NextResponse.json(
            { error: "Failed to submit testimonial" },
            { status: 500 }
        );
    }
}
