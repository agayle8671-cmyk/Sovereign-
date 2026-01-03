"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    DollarSign,
    FileText,
    Shield,
    AlertTriangle,
    History,
    MoreVertical,
    Download,
    Trash,
    Mail,
    Zap,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractNegotiationDialog } from "./contract-negotiation-dialog";
import { RiskFlagCard } from "./risk-flag-card";
import { ScopeItemsList } from "./scope-items-list";
import { ChangeOrdersList } from "./change-orders-list";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ContractDetailProps {
    contract: any;
}

export function ContractDetail({ contract }: ContractDetailProps) {
    const [negotiationOpen, setNegotiationOpen] = useState(false);

    const extracted = contract.extractedTerms;
    const risks = contract.riskFlags || [];
    const scopeItems = contract.scopeItems || [];
    const changeOrders = contract.changeOrders || [];

    // Calculate risk score based on flags if not present
    const riskScore = contract.riskScore ?? Math.max(0, 100 - (risks.length * 10));

    const getRiskLevel = (score: number) => {
        if (score >= 90) return { label: "SAFE", color: "text-success", bg: "bg-success/10" };
        if (score >= 70) return { label: "MODERATE", color: "text-warning", bg: "bg-warning/10" };
        return { label: "HIGH RISK", color: "text-danger", bg: "bg-danger/10" };
    };

    const riskLevel = getRiskLevel(riskScore);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                    <Button variant="ghost" size="icon" asChild className="mt-1">
                        <Link href="/dashboard/contracts">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-100">{contract.title}</h1>
                        <div className="flex items-center gap-3 mt-1 text-sm text-neutral-400">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {contract.startDate ? format(new Date(contract.startDate), "MMM d, yyyy") : "No date"}
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <Badge variant="outline" className="text-xs">
                                {contract.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setNegotiationOpen(true)}>
                        <Zap className="w-4 h-4 mr-2 text-shield" />
                        AI Negotiate
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Download Original
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-danger focus:text-danger">
                                <Trash className="w-4 h-4 mr-2" />
                                Delete Contract
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900">
                    <p className="text-sm text-neutral-400 mb-1">Contract Value</p>
                    <div className="flex items-baseline gap-1">
                        <h3 className="text-2xl font-bold text-neutral-100">
                            {contract.totalValue ? formatCurrency(parseFloat(contract.totalValue)) : "N/A"}
                        </h3>
                        <span className="text-xs text-neutral-500">{contract.currency || "USD"}</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900">
                    <p className="text-sm text-neutral-400 mb-1">Risk Analysis</p>
                    <div className="flex items-center gap-3">
                        <div className={cn("px-2 py-1 rounded text-xs font-bold", riskLevel.bg, riskLevel.color)}>
                            {riskLevel.label}
                        </div>
                        <span className="text-2xl font-bold text-neutral-100">{riskScore}/100</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900">
                    <p className="text-sm text-neutral-400 mb-1">Key Dates</p>
                    <div className="flex flex-col text-sm">
                        <div className="flex justify-between">
                            <span>Start:</span>
                            <span className="text-neutral-200">{contract.startDate ? format(new Date(contract.startDate), "MMM d, yyyy") : "N/A"}</span>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span>End:</span>
                            <span className="text-neutral-200">{contract.endDate ? format(new Date(contract.endDate), "MMM d, yyyy") : "Indefinite"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="analysis" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="analysis">
                        <Shield className="w-4 h-4 mr-2" />
                        Risk Analysis
                    </TabsTrigger>
                    <TabsTrigger value="scope">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Scope & Deliverables
                    </TabsTrigger>
                    <TabsTrigger value="changes">
                        <History className="w-4 h-4 mr-2" />
                        Change Orders
                    </TabsTrigger>
                    <TabsTrigger value="original">
                        <FileText className="w-4 h-4 mr-2" />
                        Original Text
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-neutral-100">Identified Risks</h3>
                        <Badge variant="outline">{risks.length} Issues Found</Badge>
                    </div>

                    <div className="grid gap-3">
                        {risks.length > 0 ? (
                            risks.map((risk: any, i: number) => (
                                <RiskFlagCard key={i} risk={risk} />
                            ))
                        ) : (
                            <div className="p-8 text-center border border-dashed border-neutral-800 rounded-lg">
                                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                                <p className="text-neutral-300 font-medium">No significant risks detected</p>
                                <p className="text-sm text-neutral-500">This contract looks good based on our analysis.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="scope">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-neutral-100">Deliverables</h3>
                        <Button size="sm" variant="outline">Add Item</Button>
                    </div>
                    <ScopeItemsList items={scopeItems} />
                </TabsContent>

                <TabsContent value="changes">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-neutral-100">Change Log</h3>
                        <Button size="sm" variant="outline">New Change Order</Button>
                    </div>
                    <ChangeOrdersList items={changeOrders} />
                </TabsContent>

                <TabsContent value="original">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-mono text-sm text-neutral-300 whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                        {contract.parsedContent || "No content available."}
                    </div>
                </TabsContent>
            </Tabs>

            <ContractNegotiationDialog
                open={negotiationOpen}
                onOpenChange={setNegotiationOpen}
                contract={contract}
                risks={risks}
            />
        </div>
    );
}
