"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, ArrowRight, Plus } from "lucide-react";

interface Client {
    id: string;
    name: string;
    company: string | null;
    avatarUrl: string | null;
    healthScore: number | null;
}

interface ClientHealthProps {
    clients: Client[];
}

function getHealthColor(score: number | null) {
    if (score === null) return "bg-neutral-600";
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-danger";
}

function getHealthTextColor(score: number | null) {
    if (score === null) return "text-neutral-400";
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
}

export function ClientHealth({ clients }: ClientHealthProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-radar" />
                    Client Health
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/clients">
                        View all
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {clients.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-neutral-500" />
                        </div>
                        <p className="text-neutral-400 mb-4">No clients yet</p>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/dashboard/clients/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Client
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {clients.map((client) => (
                            <Link
                                key={client.id}
                                href={`/dashboard/clients/${client.id}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
                            >
                                <UserAvatar
                                    user={{
                                        name: client.name,
                                        avatarUrl: client.avatarUrl,
                                    }}
                                    size="sm"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-neutral-100 truncate">
                                        {client.name}
                                    </p>
                                    <p className="text-xs text-neutral-500 truncate">
                                        {client.company || "No company"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                getHealthColor(client.healthScore)
                                            )}
                                            style={{ width: `${client.healthScore || 0}%` }}
                                        />
                                    </div>
                                    <span
                                        className={cn(
                                            "text-xs font-medium w-8 text-right",
                                            getHealthTextColor(client.healthScore)
                                        )}
                                    >
                                        {client.healthScore ?? 0}%
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
