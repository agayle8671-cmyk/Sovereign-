import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, vaults } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SettingsForm } from "@/components/settings/settings-form";

export default async function SettingsPage() {
    const { userId: clerkId } = await auth();

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId!),
        with: {
            vault: true,
        },
    });

    if (!user) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold text-neutral-100">Settings</h1>
                <p className="text-neutral-400 mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <SettingsForm user={user} vault={user.vault} />
        </div>
    );
}
