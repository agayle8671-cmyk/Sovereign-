import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, vaults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add CLERK_WEBHOOK_SECRET to .env");
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing svix headers", { status: 400 });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify the webhook
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error: Verification failed", { status: 400 });
    }

    // Handle the event
    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const email = email_addresses[0]?.email_address;
        const name = [first_name, last_name].filter(Boolean).join(" ");

        // Create user in database
        const [newUser] = await db
            .insert(users)
            .values({
                clerkId: id,
                email: email,
                name: name || null,
                avatarUrl: image_url || null,
            })
            .returning();

        // Create vault for user
        await db.insert(vaults).values({
            userId: newUser.id,
            settings: {
                defaultCurrency: "USD",
                defaultPaymentTerms: "NET_30",
                autoGenerateChangeOrders: true,
                scopeCreepSensitivity: "medium",
            },
            aiPreferences: {
                preferredTone: "professional",
                autoNegotiate: false,
                riskTolerance: "moderate",
            },
        });

        console.log(`Created user: ${newUser.id}`);
    }

    if (eventType === "user.updated") {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const email = email_addresses[0]?.email_address;
        const name = [first_name, last_name].filter(Boolean).join(" ");

        await db
            .update(users)
            .set({
                email: email,
                name: name || null,
                avatarUrl: image_url || null,
                updatedAt: new Date(),
            })
            .where(eq(users.clerkId, id));

        console.log(`Updated user: ${id}`);
    }

    if (eventType === "user.deleted") {
        const { id } = evt.data;

        if (id) {
            await db.delete(users).where(eq(users.clerkId, id));
            console.log(`Deleted user: ${id}`);
        }
    }

    return new Response("Webhook processed", { status: 200 });
}
