import { db } from "@/lib/db";
import { pitches, portfolioItems, testimonials, users } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PitchPage } from "@/components/pitch/pitch-page";

interface PitchPageProps {
    params: Promise<{ slug: string }>;
}

export default async function DynamicPitchPage(props: PitchPageProps) {
    const params = await props.params;

    const pitch = await db.query.pitches.findFirst({
        where: eq(pitches.publicSlug, params.slug),
    });

    if (!pitch || !pitch.isActive) {
        notFound();
    }

    // Increment view count
    await db
        .update(pitches)
        .set({
            viewCount: (pitch.viewCount || 0) + 1,
            lastViewedAt: new Date(),
        })
        .where(eq(pitches.id, pitch.id));

    // Fetch related data
    const [user, portfolio, reviews] = await Promise.all([
        db.query.users.findFirst({
            where: eq(users.id, pitch.userId),
        }),
        pitch.selectedPortfolioIds?.length
            ? db.query.portfolioItems.findMany({
                where: inArray(portfolioItems.id, pitch.selectedPortfolioIds),
            })
            : [],
        pitch.selectedTestimonialIds?.length
            ? db.query.testimonials.findMany({
                where: inArray(testimonials.id, pitch.selectedTestimonialIds),
            })
            : [],
    ]);

    if (!user) {
        notFound();
    }

    return (
        <PitchPage
            pitch={{
                ...pitch,
                generatedMockups: pitch.generatedMockups || [],
            }}
            user={user}
            portfolio={portfolio}
            testimonials={reviews}
        />
    );
}
