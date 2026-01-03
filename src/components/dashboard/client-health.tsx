"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, ArrowRight, AlertCircle } from "lucide-react";

interface Client {
    id: string;
    name: string;
    company: string | null;
    avatarUrl: string | null;
    healthScore: number | null;
    sentimentTrend: string | null;
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

export function ClientHealth({ clients }: ClientHealthProps) {
    const atRiskClients = clients.filter(
        (c) => c.healthScore !== null && c.healthScore < 80
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
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
                        <Users className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                        <p className="text-neutral-400">No clients yet</p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/clients/new">Add your first client</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {atRiskClients.length > 0 && (
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-warning-muted border border-warning/20 mb-4">
                                <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                                <p className="text-xs text-warning">
                                    {atRiskClients.length} client{atRiskClients.length > 1 ? "s" : ""}{" "}
                                    need attention
                                </p>
                            </div>
                        )}
                        {clients.map((client) => (
                            <Link
                                key={client.id}
                                href={`/dashboard/clients/${client.id}`}
                                className="block"
                            >
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors">
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
                                        <p className="text-xs text-neutral-400 truncate">
                                            {client.company || "No company"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16">
                                            <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all",
                                                        getHealthColor(client.healthScore)
                                                    )}
                                                    style={{ width: `${client.healthScore || 0}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span
                                            className={cn(
                                                "text-xs font-medium w-12 text-right",
                                                client.healthScore !== null && client.healthScore >= 80
                                                    ? "text-success"
                                                    : client.healthScore !== null && client.healthScore >= 60
                                                        ? "text-warning"
                                                        : "text-danger"
                                            )}
                                        >
                                            {client.healthScore || 0}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
