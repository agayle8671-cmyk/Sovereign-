"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { Bell, Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommandMenu } from "@/hooks/use-command-menu";

export function DashboardHeader() {
    const { user } = useUser();
    const { setOpen } = useCommandMenu();

    return (
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl flex items-center justify-between px-6">
            {/* Search */}
            <div className="flex-1 max-w-md">
                <button
                    onClick={() => setOpen(true)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300 transition-colors"
                >
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search or type a command...</span>
                    <kbd className="ml-auto text-xs bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
                        <Command className="w-3 h-3 inline mr-0.5" />K
                    </kbd>
                </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon-sm" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
                </Button>

                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-neutral-100">
                            {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-neutral-400">Pro Plan</p>
                    </div>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-9 h-9",
                            },
                        }}
                    />
                </div>
            </div>
        </header>
    );
}
