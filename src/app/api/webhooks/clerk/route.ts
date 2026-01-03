import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, vaults, clients, contracts, portfolioItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    // For development without webhook secret, create user directly
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If no webhook headers, this might be a direct call
    if (!svix_id || !svix_timestamp || !svix_signature) {
        // For dev mode, allow without verification
        if (process.env.NODE_ENV === "development") {
            const payload = await req.json();
            await handleUserCreated(payload.data);
            return new Response("OK (dev mode)", { status: 200 });
        }
        return new Response("Error: Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook if secret exists
    if (WEBHOOK_SECRET) {
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

        if (evt.type === "user.created") {
            await handleUserCreated(evt.data);
        }

        if (evt.type === "user.updated") {
            await handleUserUpdated(evt.data);
        }

        if (evt.type === "user.deleted") {
            await handleUserDeleted(evt.data);
        }
    }

    return new Response("Webhook processed", { status: 200 });
}

async function handleUserCreated(data: any) {
    const { id, email_addresses, first_name, last_name, image_url } = data;
    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(" ");

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.clerkId, id),
    });

    if (existingUser) {
        console.log(`User ${id} already exists`);
        return;
    }

    // Create user
    const [newUser] = await db
        .insert(users)
        .values({
            clerkId: id,
            email: email,
            name: name || null,
            avatarUrl: image_url || null,
        })
        .returning();

    // Create vault with default settings
    await db.insert(vaults).values({
        userId: newUser.id,
        settings: {
            defaultCurrency: "USD",
            defaultPaymentTerms: "NET_30",
            autoGenerateChangeOrders: true,
            scopeCreepSensitivity: "medium",
            notificationPreferences: {
                email: true,
                push: true,
            },
        },
        aiPreferences: {
            preferredTone: "professional",
            autoNegotiate: false,
            riskTolerance: "moderate",
        },
        defaultRates: {
            hourlyRate: 150,
        },
    });

    // Create demo client
    const [demoClient] = await db
        .insert(clients)
        .values({
            userId: newUser.id,
            name: "Acme Technologies",
            email: "contact@acme.tech",
            company: "Acme Technologies Inc.",
            industry: "technology",
            website: "https://acme.tech",
            healthScore: 85,
            sentimentTrend: "POSITIVE",
            totalRevenue: "15000",
        })
        .returning();

    // Create demo portfolio item
    await db.insert(portfolioItems).values({
        userId: newUser.id,
        clientId: demoClient.id,
        title: "E-commerce Platform Redesign",
        shortDescription:
            "Complete redesign of a B2B e-commerce platform resulting in 40% increase in conversions.",
        category: "web design",
        industries: ["technology", "e-commerce"],
        tags: ["React", "TypeScript", "UI/UX"],
        isFeatured: true,
        isPublic: true,
    });

    console.log(`Created user ${newUser.id} with demo data`);
}

async function handleUserUpdated(data: any) {
    const { id, email_addresses, first_name, last_name, image_url } = data;
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

async function handleUserDeleted(data: any) {
    const { id } = data;
    if (id) {
        await db.delete(users).where(eq(users.clerkId, id));
        console.log(`Deleted user: ${id}`);
    }
}
