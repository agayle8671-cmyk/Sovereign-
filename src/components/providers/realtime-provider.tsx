"use client";

import { createContext, useContext, useCallback } from "react";
import { useRealtime } from "@/hooks/use-realtime";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RealtimeContextType {
    connected: boolean;
}

const RealtimeContext = createContext<RealtimeContextType>({
    connected: false,
});

export function useRealtimeContext() {
    return useContext(RealtimeContext);
}

interface RealtimeProviderProps {
    userId: string;
    children: React.ReactNode;
}

export function RealtimeProvider({ userId, children }: RealtimeProviderProps) {
    const router = useRouter();

    const handleContractAnalyzed = useCallback(
        (data: any) => {
            toast.success("Contract analysis complete!", {
                description: `${data.title} has been analyzed`,
                action: {
                    label: "View",
                    onClick: () => router.push(`/dashboard/contracts/${data.contractId}`),
                },
            });
            router.refresh();
        },
        [router]
    );

    const handleTestimonialReceived = useCallback(
        (data: any) => {
            toast.success("New testimonial received!", {
                description: `${data.clientName} submitted a testimonial`,
                action: {
                    label: "View",
                    onClick: () => router.push("/dashboard/testimonials"),
                },
            });
            router.refresh();
        },
        [router]
    );

    const handleNotification = useCallback(
        (data: any) => {
            toast(data.title, {
                description: data.message,
            });
        },
        []
    );

    const handleScopeCreep = useCallback(
        (data: any) => {
            toast.warning("Scope creep detected!", {
                description: data.description,
                action: {
                    label: "Review",
                    onClick: () => router.push(`/dashboard/contracts/${data.contractId}`),
                },
                duration: 10000,
            });
        },
        [router]
    );

    const { connected } = useRealtime({
        userId,
        onContractAnalyzed: handleContractAnalyzed,
        onTestimonialReceived: handleTestimonialReceived,
        onNotification: handleNotification,
        onScopeCreepDetected: handleScopeCreep,
    });

    return (
        <RealtimeContext.Provider value={{ connected }}>
            {children}
        </RealtimeContext.Provider>
    );
}
