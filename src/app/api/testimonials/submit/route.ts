import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const token = formData.get("token") as string;
        const type = formData.get("type") as string;
        const rating = parseInt(formData.get("rating") as string) || 5;
        const content = formData.get("content") as string | null;
        const videoFile = formData.get("video") as File | null;

        if (!token) {
            return NextResponse.json({ error: "Token required" }, { status: 400 });
        }

        // Find the testimonial
        const testimonial = await db.query.testimonials.findFirst({
            where: eq(testimonials.magicLinkToken, token),
        });

        if (!testimonial) {
            return NextResponse.json(
                { error: "Invalid or expired link" },
                { status: 404 }
            );
        }

        if (testimonial.type !== "pending") {
            return NextResponse.json(
                { error: "Testimonial already submitted" },
                { status: 400 }
            );
        }

        let videoUrl = null;

        // Handle video upload
        if (videoFile && type === "video") {
            // In production, upload to S3/Cloudinary
            // For now, we'll store a placeholder
            // const buffer = Buffer.from(await videoFile.arrayBuffer());
            // videoUrl = await uploadToStorage(buffer, videoFile.name);
            videoUrl = "placeholder_video_url";
        }

        // Update the testimonial
        await db
            .update(testimonials)
            .set({
                type: type as "text" | "video",
                content: content,
                videoUrl: videoUrl,
                rating: rating,
                isApproved: false, // Requires manual approval
                collectedAt: new Date(),
            })
            .where(eq(testimonials.id, testimonial.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error submitting testimonial:", error);
        return NextResponse.json(
            { error: "Failed to submit testimonial" },
            { status: 500 }
        );
    }
}
