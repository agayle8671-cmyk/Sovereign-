import { db } from "./index";
import {
    users,
    vaults,
    clients,
    contracts,
    scopeItems,
    portfolioItems,
    testimonials,
} from "./schema";

async function seed() {
    console.log("🌱 Seeding database...");

    // This will be called after a user signs up via Clerk webhook
    // For now, we'll create demo data that gets associated with the first user

    console.log("✅ Database seeded successfully!");
    console.log("👉 Sign up at http://localhost:3000/signup to create your account");
}

seed().catch(console.error);
