"use client";

import { useEffect, useState } from "react";
import { getPusherClient } from "@/lib/pusher/client";
import type { Channel } from "pusher-js";

interface UseRealtimeOptions {
    userId: string;
    onContractAnalyzed?: (data: any) => void;
    onTestimonialReceived?: (data: any) => void;
    onNotification?: (data: any) => void;
    onScopeCreepDetected?: (data: any) => void;
}

export function useRealtime({
    userId,
    onContractAnalyzed,
    onTestimonialReceived,
    onNotification,
    onScopeCreepDetected,
}: UseRealtimeOptions) {
    const [connected, setConnected] = useState(false);
    const [channel, setChannel] = useState<Channel | null>(null);

    useEffect(() => {
        const pusher = getPusherClient();
        if (!pusher || !userId) return;

        const channelName = `private-user-${userId}`;
        const userChannel = pusher.subscribe(channelName);

        userChannel.bind("pusher:subscription_succeeded", () => {
            setConnected(true);
            console.log("Connected to real-time channel");
        });

        userChannel.bind("pusher:subscription_error", (err: any) => {
            console.error("Subscription error:", err);
            setConnected(false);
        });

        // Bind events
        if (onContractAnalyzed) {
            userChannel.bind("contract:analyzed", onContractAnalyzed);
        }

        if (onTestimonialReceived) {
            userChannel.bind("testimonial:received", onTestimonialReceived);
        }

        if (onNotification) {
            userChannel.bind("notification:new", onNotification);
        }

        if (onScopeCreepDetected) {
            userChannel.bind("scope-creep:detected", onScopeCreepDetected);
        }

        setChannel(userChannel);

        return () => {
            userChannel.unbind_all();
            pusher.unsubscribe(channelName);
            setConnected(false);
        };
    }, [userId, onContractAnalyzed, onTestimonialReceived, onNotification, onScopeCreepDetected]);

    return { connected, channel };
}
