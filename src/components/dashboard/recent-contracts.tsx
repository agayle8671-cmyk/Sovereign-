"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import { cn, formatRelativeTime, formatCurrency } from "@/lib/utils";
import {
    FileText,
    ArrowRight,
    AlertTriangle,
    Plus,
    ChevronRight,
} from "lucide-react";

interface Contract {
    id: string;
    title: string;
    status: string | null;
    riskScore: number | null;
    totalValue: string | null;
    currency: string | null;
    createdAt: Date;
    client: {
        id: string;
        name: string;
        avatarUrl: string | null;
    } | null;
}

interface RecentContractsProps {
    contracts: Contract[];
}

const statusLabels: Record<string, { label: string; variant: string }> = {
    draft: { label: "Draft", variant: "secondary" },
    pending_review: { label: "Pending Review", variant: "warning" },
    in_negotiation: { label: "Negotiating", variant: "info" },
    active: { label: "Active", variant: "success" },
    completed: { label: "Completed", variant: "secondary" },
    cancelled: { label: "Cancelled", variant: "danger" },
};

function getRiskColor(score: number | null) {
    if (score === null) return "text-neutral-400";
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
}

export function RecentContracts({ contracts }: RecentContractsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-shield" />
                    Recent Contracts
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/contracts">
                        View all
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {contracts.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-6 h-6 text-neutral-500" />
                        </div>
                        <p className="text-neutral-400 mb-4">No contracts yet</p>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/dashboard/contracts/analyze">
                                <Plus className="w-4 h-4 mr-2" />
                                Analyze Your First Contract
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {contracts.map((contract) => {
                            const status = (contract.status ? statusLabels[contract.status] : null) || statusLabels.draft;

                            return (
                                <Link
                                    key={contract.id}
                                    href={`/dashboard/contracts/${contract.id}`}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors group"
                                >
                                    {contract.client ? (
                                        <UserAvatar
                                            user={{
                                                name: contract.client.name,
                                                avatarUrl: contract.client.avatarUrl,
                                            }}
                                            size="sm"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                                            <FileText className="w-4 h-4 text-neutral-500" />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-neutral-100 truncate">
                                                {contract.title}
                                            </p>
                                            {contract.riskScore !== null && contract.riskScore < 60 && (
                                                <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-500">
                                            {contract.client?.name || "No client"} •{" "}
                                            {formatRelativeTime(contract.createdAt)}
                                        </p>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-3">
                                        {contract.riskScore !== null && (
                                            <span className={cn("text-sm font-medium", getRiskColor(contract.riskScore))}>
                                                {contract.riskScore}%
                                            </span>
                                        )}
                                        <Badge variant={status.variant as any} size="sm">
                                            {status.label}
                                        </Badge>
                                    </div>

                                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                                </Link>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
