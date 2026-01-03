"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import { formatRelativeTime, getRiskColor } from "@/lib/utils";
import { FileText, ArrowRight, AlertTriangle } from "lucide-react";

interface Contract {
    id: string;
    title: string;
    status: string | null;
    riskScore: number | null;
    totalValue: string | null;
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

const statusColors: Record<string, string> = {
    draft: "default",
    pending_review: "warning",
    in_negotiation: "info",
    active: "success",
    completed: "secondary",
    cancelled: "danger",
};

export function RecentContracts({ contracts }: RecentContractsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
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
                        <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                        <p className="text-neutral-400">No contracts yet</p>
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                            <Link href="/dashboard/contracts/new">
                                Upload your first contract
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {contracts.map((contract) => (
                            <Link
                                key={contract.id}
                                href={`/dashboard/contracts/${contract.id}`}
                                className="block"
                            >
                                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors">
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
                                            <FileText className="w-4 h-4 text-neutral-400" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-neutral-100 truncate">
                                                {contract.title}
                                            </p>
                                            {contract.riskScore !== null && contract.riskScore < 60 && (
                                                <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-400">
                                            {contract.client?.name || "No client"} •{" "}
                                            {formatRelativeTime(contract.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {contract.riskScore !== null && (
                                            <span
                                                className={`text-sm font-medium ${getRiskColor(contract.riskScore)}`}
                                            >
                                                {contract.riskScore}%
                                            </span>
                                        )}
                                        <Badge
                                            variant={statusColors[contract.status || "draft"] as any}
                                            size="sm"
                                        >
                                            {(contract.status || "draft").replace("_", " ")}
                                        </Badge>
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
