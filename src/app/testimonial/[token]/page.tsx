import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { TestimonialCapture } from "@/components/testimonials/testimonial-capture";

interface TestimonialPageProps {
    params: Promise<{ token: string }>;
}

export default async function TestimonialPage(props: TestimonialPageProps) {
    const params = await props.params;
    const testimonial = await db.query.testimonials.findFirst({
        where: eq(testimonials.magicLinkToken, params.token),
        with: {
            user: true,
        },
    });

    if (!testimonial) {
        notFound();
    }

    if (testimonial.type !== "pending") {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
                <div className="max-w-md text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-2xl font-semibold text-neutral-100 mb-2">
                        Already Submitted
                    </h1>
                    <p className="text-neutral-400">
                        Thank you! Your testimonial has already been submitted.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <TestimonialCapture
            token={params.token}
            freelancerName={testimonial.user?.name || ""}
            freelancerAvatar={testimonial.user?.avatarUrl || null}
        />
    );
}
