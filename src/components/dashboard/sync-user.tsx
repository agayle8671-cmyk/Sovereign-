"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function SyncUser() {
    const router = useRouter();
    const [syncing, setSyncing] = useState(true);

    useEffect(() => {
        async function sync() {
            try {
                const response = await fetch("/api/auth/sync", {
                    method: "POST",
                });

                if (response.ok) {
                    // Refresh the page to load user data
                    router.refresh();
                }
            } catch (error) {
                console.error("Failed to sync user:", error);
            } finally {
                setSyncing(false);
            }
        }

        sync();
    }, [router]);

    if (!syncing) return null;

    return (
        <div className="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
                <p className="text-neutral-400">Setting up your account...</p>
            </div>
        </div>
    );
}
