"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/avatar";
import {
    formatRelativeTime,
    formatCurrency,
    getRiskColor,
    getRiskBgColor,
} from "@/lib/utils";
import {
    Search,
    Filter,
    FileText,
    AlertTriangle,
    ChevronRight,
    MoreHorizontal,
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

interface ContractsListProps {
    contracts: Contract[];
}

const statusConfig: Record<
    string,
    { label: string; variant: string; color: string }
> = {
    draft: { label: "Draft", variant: "secondary", color: "text-neutral-400" },
    pending_review: {
        label: "Pending Review",
        variant: "warning",
        color: "text-warning",
    },
    in_negotiation: {
        label: "In Negotiation",
        variant: "info",
        color: "text-info",
    },
    active: { label: "Active", variant: "success", color: "text-success" },
    completed: {
        label: "Completed",
        variant: "secondary",
        color: "text-neutral-400",
    },
    cancelled: { label: "Cancelled", variant: "danger", color: "text-danger" },
};

export function ContractsList({ contracts }: ContractsListProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const filteredContracts = contracts.filter((contract) => {
        const matchesSearch =
            contract.title.toLowerCase().includes(search.toLowerCase()) ||
            contract.client?.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = !statusFilter || contract.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (contracts.length === 0) {
        return (
            <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-100 mb-2">
                    No contracts yet
                </h3>
                <p className="text-neutral-400 mb-6 max-w-sm mx-auto">
                    Upload your first contract to get AI-powered risk analysis and
                    protection.
                </p>
                <Button variant="shield" asChild>
                    <Link href="/dashboard/contracts/analyze">
                        Upload & Analyze Contract
                    </Link>
                </Button>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search contracts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={statusFilter === null ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setStatusFilter(null)}
                    >
                        All
                    </Button>
                    <Button
                        variant={statusFilter === "pending_review" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setStatusFilter("pending_review")}
                    >
                        Pending Review
                    </Button>
                    <Button
                        variant={statusFilter === "active" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setStatusFilter("active")}
                    >
                        Active
                    </Button>
                </div>
            </div>

            {/* List */}
            <Card className="divide-y divide-neutral-800">
                {filteredContracts.map((contract) => {
                    const status = statusConfig[contract.status || "draft"] || statusConfig.draft;
                    return (
                        <Link
                            key={contract.id}
                            href={`/dashboard/contracts/${contract.id}`}
                            className="block"
                        >
                            <div className="flex items-center gap-4 p-4 hover:bg-neutral-800/50 transition-colors">
                                {/* Client Avatar */}
                                {contract.client ? (
                                    <UserAvatar
                                        user={{
                                            name: contract.client.name,
                                            avatarUrl: contract.client.avatarUrl,
                                        }}
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-neutral-400" />
                                    </div>
                                )}

                                {/* Contract Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-neutral-100 truncate">
                                            {contract.title}
                                        </h3>
                                        {contract.riskScore !== null && contract.riskScore < 60 && (
                                            <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-neutral-400">
                                        <span>{contract.client?.name || "No client"}</span>
                                        <span>•</span>
                                        <span>{formatRelativeTime(contract.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Value */}
                                {contract.totalValue && (
                                    <div className="hidden sm:block text-right">
                                        <p className="font-medium text-neutral-100">
                                            {formatCurrency(
                                                parseFloat(contract.totalValue),
                                                contract.currency || "USD"
                                            )}
                                        </p>
                                        <p className="text-xs text-neutral-500">Contract Value</p>
                                    </div>
                                )}

                                {/* Risk Score */}
                                {contract.riskScore !== null && (
                                    <div className="hidden md:flex items-center gap-2">
                                        <div
                                            className={`px-3 py-1.5 rounded-lg ${getRiskBgColor(contract.riskScore)}`}
                                        >
                                            <span
                                                className={`text-sm font-semibold ${getRiskColor(contract.riskScore)}`}
                                            >
                                                {contract.riskScore}%
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Status */}
                                <Badge variant={status.variant as any} className="hidden sm:flex">
                                    {status.label}
                                </Badge>

                                {/* Arrow */}
                                <ChevronRight className="w-5 h-5 text-neutral-600" />
                            </div>
                        </Link>
                    );
                })}
            </Card>

            {filteredContracts.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-neutral-400">
                        No contracts match your search criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
