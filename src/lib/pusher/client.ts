"use client";

import PusherClient from "pusher-js";

let pusherInstance: PusherClient | null = null;

export function getPusherClient(): PusherClient | null {
    if (typeof window === "undefined") return null;

    if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
        console.warn("Pusher key not set");
        return null;
    }

    if (!pusherInstance) {
        pusherInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "us2",
            authEndpoint: "/api/pusher/auth",
        });
    }

    return pusherInstance;
}
