"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

export function CreateUserPrompt() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSetup = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/sync", {
                method: "POST",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to set up account");
            }

            // Refresh to load the new user data
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="p-8 max-w-md text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-100 mb-2">
                    Welcome to Sovereign!
                </h2>
                <p className="text-neutral-400 mb-6">
                    Let's set up your account and get you started with your autonomous
                    commercial operating system.
                </p>

                {error && (
                    <p className="text-danger text-sm mb-4">{error}</p>
                )}

                <Button
                    onClick={handleSetup}
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Setting up...
                        </>
                    ) : (
                        "Set Up My Account"
                    )}
                </Button>
            </Card>
        </div>
    );
}
