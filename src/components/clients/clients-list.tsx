"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatRelativeTime, cn } from "@/lib/utils";
import {
    Search,
    Users,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Minus,
    Building,
} from "lucide-react";

interface Client {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
    industry: string | null;
    avatarUrl: string | null;
    healthScore: number | null;
    sentimentTrend: string | null;
    totalRevenue: string | null;
    createdAt: Date;
}

interface ClientsListProps {
    clients: Client[];
}

function getHealthColor(score: number | null) {
    if (score === null) return "text-neutral-400";
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
}

function getSentimentIcon(trend: string | null) {
    switch (trend) {
        case "VERY_POSITIVE":
        case "POSITIVE":
            return <TrendingUp className="w-4 h-4 text-success" />;
        case "NEGATIVE":
        case "VERY_NEGATIVE":
            return <TrendingDown className="w-4 h-4 text-danger" />;
        default:
            return <Minus className="w-4 h-4 text-neutral-400" />;
    }
}

export function ClientsList({ clients }: ClientsListProps) {
    const [search, setSearch] = useState("");

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.company?.toLowerCase().includes(search.toLowerCase()) ||
        client.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (clients.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={Users}
                    title="No clients yet"
                    description="Add your first client to start tracking relationship health."
                    action={{
                        label: "Add Client",
                        href: "/dashboard/clients/new",
                    }}
                />
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                    <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
                        <Card
                            variant="interactive"
                            className="p-4 h-full"
                        >
                            <div className="flex items-start gap-4">
                                <UserAvatar
                                    user={{
                                        name: client.name,
                                        avatarUrl: client.avatarUrl,
                                    }}
                                    size="lg"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-neutral-100 truncate">
                                        {client.name}
                                    </h3>
                                    {client.company && (
                                        <p className="text-sm text-neutral-400 flex items-center gap-1">
                                            <Building className="w-3 h-3" />
                                            {client.company}
                                        </p>
                                    )}
                                </div>
                                {getSentimentIcon(client.sentimentTrend)}
                            </div>

                            <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-neutral-500">Health Score</p>
                                    <p
                                        className={cn(
                                            "text-lg font-semibold",
                                            getHealthColor(client.healthScore)
                                        )}
                                    >
                                        {client.healthScore ?? "—"}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500">Total Revenue</p>
                                    <p className="text-lg font-semibold text-neutral-100">
                                        {client.totalRevenue
                                            ? formatCurrency(parseFloat(client.totalRevenue))
                                            : "—"}
                                    </p>
                                </div>
                            </div>

                            {client.industry && (
                                <div className="mt-3">
                                    <Badge variant="outline" size="sm">
                                        {client.industry}
                                    </Badge>
                                </div>
                            )}
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredClients.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-neutral-400">
                        No clients match your search.
                    </p>
                </div>
            )}
        </div>
    );
}
