import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users, testimonials, clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PremiumTestimonialsList } from "@/components/testimonials/premium-testimonials-list";

export default async function TestimonialsPage() {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        redirect("/login");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        redirect("/login");
    }

    const userTestimonials = await db.query.testimonials.findMany({
        where: eq(testimonials.userId, user.id),
        orderBy: [desc(testimonials.createdAt)],
        with: {
            client: true,
        },
    });

    const userClients = await db.query.clients.findMany({
        where: eq(clients.userId, user.id),
    });

    return (
        <PremiumTestimonialsList
            testimonials={userTestimonials}
            clients={userClients}
        />
    );
}
