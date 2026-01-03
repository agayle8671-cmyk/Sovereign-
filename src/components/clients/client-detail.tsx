"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import {
    ArrowLeft,
    Mail,
    Globe,
    Building,
    FileText,
    Edit,
    Trash2,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

interface Client {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
    industry: string | null;
    website: string | null;
    avatarUrl: string | null;
    healthScore: number | null;
    sentimentTrend: string | null;
    totalRevenue: string | null;
    notes: string | null;
    createdAt: Date;
}

interface Contract {
    id: string;
    title: string;
    status: string | null;
    totalValue: string | null;
    createdAt: Date;
}

interface ClientDetailProps {
    client: Client;
    contracts: Contract[];
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
            return <TrendingUp className="w-5 h-5 text-success" />;
        case "NEGATIVE":
        case "VERY_NEGATIVE":
            return <TrendingDown className="w-5 h-5 text-danger" />;
        default:
            return <Minus className="w-5 h-5 text-neutral-400" />;
    }
}

export function ClientDetail({ client, contracts }: ClientDetailProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/clients">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <UserAvatar
                        user={{ name: client.name, avatarUrl: client.avatarUrl }}
                        size="xl"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold text-neutral-100">
                            {client.name}
                        </h1>
                        {client.company && (
                            <p className="text-neutral-400 flex items-center gap-1 mt-1">
                                <Building className="w-4 h-4" />
                                {client.company}
                            </p>
                        )}
                        {client.industry && (
                            <Badge variant="outline" className="mt-2">
                                {client.industry}
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {client.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-neutral-500" />
                                    <a
                                        href={`mailto:${client.email}`}
                                        className="text-brand-500 hover:underline"
                                    >
                                        {client.email}
                                    </a>
                                </div>
                            )}
                            {client.website && (
                                <div className="flex items-center gap-3">
                                    <Globe className="w-5 h-5 text-neutral-500" />
                                    <a
                                        href={client.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-500 hover:underline"
                                    >
                                        {client.website}
                                    </a>
                                </div>
                            )}
                            {!client.email && !client.website && (
                                <p className="text-neutral-500">No contact information added.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    {client.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-300 whitespace-pre-wrap">
                                    {client.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Contracts */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-shield" />
                                Contracts
                            </CardTitle>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/contracts/new?clientId=${client.id}`}>
                                    New Contract
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {contracts.length === 0 ? (
                                <p className="text-neutral-500 text-center py-4">
                                    No contracts with this client yet.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {contracts.map((contract) => (
                                        <Link
                                            key={contract.id}
                                            href={`/dashboard/contracts/${contract.id}`}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-800/50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium text-neutral-100">
                                                    {contract.title}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {formatDate(contract.createdAt)}
                                                </p>
                                            </div>
                                            {contract.totalValue && (
                                                <p className="font-medium text-neutral-100">
                                                    {formatCurrency(parseFloat(contract.totalValue))}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Health & Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Relationship Health</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <p
                                    className={cn(
                                        "text-5xl font-bold",
                                        getHealthColor(client.healthScore)
                                    )}
                                >
                                    {client.healthScore ?? "—"}%
                                </p>
                                <p className="text-neutral-500 mt-1">Health Score</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Sentiment Trend</span>
                                <div className="flex items-center gap-2">
                                    {getSentimentIcon(client.sentimentTrend)}
                                    <span className="text-neutral-100 capitalize">
                                        {client.sentimentTrend?.toLowerCase().replace("_", " ") ||
                                            "Neutral"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Total Revenue</span>
                                <span className="text-neutral-100 font-medium">
                                    {client.totalRevenue
                                        ? formatCurrency(parseFloat(client.totalRevenue))
                                        : "$0"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-400">Client Since</span>
                                <span className="text-neutral-100">
                                    {formatDate(client.createdAt)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
