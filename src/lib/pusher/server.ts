import Pusher from "pusher";

if (
    !process.env.PUSHER_APP_ID ||
    !process.env.PUSHER_KEY ||
    !process.env.PUSHER_SECRET ||
    !process.env.PUSHER_CLUSTER
) {
    console.warn("Pusher environment variables not set - real-time disabled");
}

export const pusher = process.env.PUSHER_APP_ID
    ? new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: process.env.PUSHER_CLUSTER!,
        useTLS: true,
    })
    : null;

export type PusherEvent =
    | "contract:analyzed"
    | "contract:updated"
    | "client:updated"
    | "testimonial:received"
    | "notification:new"
    | "scope-creep:detected";

export async function triggerEvent(
    channel: string,
    event: PusherEvent,
    data: any
) {
    if (!pusher) {
        console.log(`[Pusher disabled] ${channel}:${event}`, data);
        return;
    }

    try {
        await pusher.trigger(channel, event, data);
    } catch (error) {
        console.error("Pusher trigger error:", error);
    }
}

// Helper to get user's private channel
export function getUserChannel(userId: string) {
    return `private-user-${userId}`;
}
