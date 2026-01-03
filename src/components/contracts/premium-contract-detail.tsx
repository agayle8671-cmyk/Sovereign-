"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
    Calendar,
    DollarSign,
    FileText,
    ChevronLeft,
    Download,
    Mail,
    Copy,
    ExternalLink,
    TrendingUp,
    TrendingDown,
    Minus,
    Building,
    User,
    Info,
    Sparkles,
} from "lucide-react";
import { RiskScoreRing } from "./risk-score-ring";
import { RiskDetailsPanel } from "./risk-details-panel";
import { NegotiationPanel } from "./negotiation-panel";

interface ContractDetailProps {
    contract: any;
}

export function PremiumContractDetail({ contract }: ContractDetailProps) {
    const [showNegotiation, setShowNegotiation] = useState(false);
    const [selectedRisks, setSelectedRisks] = useState<number[]>([]);

    const analysis = contract.extractedTerms;
    const risks = analysis?.risks || [];
    const positives = analysis?.positives || [];
    const missingClauses = analysis?.missingClauses || [];

    const riskScore = contract.riskScore ?? 50;
    const riskLevel = riskScore >= 80 ? "low" : riskScore >= 60 ? "medium" : "high";

    const criticalRisks = risks.filter((r: any) => r.severity === "CRITICAL").length;
    const highRisks = risks.filter((r: any) => r.severity === "HIGH").length;
    const mediumRisks = risks.filter((r: any) => r.severity === "MEDIUM").length;
    const lowRisks = risks.filter((r: any) => r.severity === "LOW").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <Link
                        href="/dashboard/contracts"
                        className="mt-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-neutral-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{contract.title}</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                            {contract.client && (
                                <span className="flex items-center gap-1.5">
                                    <Building className="w-4 h-4" />
                                    {contract.client.name}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(contract.createdAt).toLocaleDateString()}
                            </span>
                            {contract.totalValue && (
                                <span className="flex items-center gap-1.5">
                                    <DollarSign className="w-4 h-4" />
                                    {parseFloat(contract.totalValue).toLocaleString()}{" "}
                                    {contract.currency}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Download className="w-5 h-5 text-neutral-400" />
                    </button>
                    <button
                        onClick={() => setShowNegotiation(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-400 hover:to-blue-400 transition-colors shadow-lg shadow-cyan-500/20"
                    >
                        <Mail className="w-4 h-4" />
                        Generate Counter-Offer
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Risk Overview */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Risk Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-2xl overflow-hidden"
                    >
                        {/* Gradient background based on risk */}
                        <div
                            className={cn(
                                "absolute inset-0",
                                riskLevel === "low" && "bg-gradient-to-br from-emerald-500/20 to-emerald-600/5",
                                riskLevel === "medium" && "bg-gradient-to-br from-amber-500/20 to-amber-600/5",
                                riskLevel === "high" && "bg-gradient-to-br from-red-500/20 to-red-600/5"
                            )}
                        />

                        <div className="relative p-6 backdrop-blur-xl border border-white/5 rounded-2xl">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-1">
                                        Risk Score
                                    </h2>
                                    <p className="text-sm text-neutral-400">
                                        Based on {risks.length} identified factors
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "px-3 py-1 rounded-full text-sm font-medium",
                                        riskLevel === "low" && "bg-emerald-500/20 text-emerald-400",
                                        riskLevel === "medium" && "bg-amber-500/20 text-amber-400",
                                        riskLevel === "high" && "bg-red-500/20 text-red-400"
                                    )}
                                >
                                    {riskLevel === "low" && "Low Risk"}
                                    {riskLevel === "medium" && "Medium Risk"}
                                    {riskLevel === "high" && "High Risk"}
                                </div>
                            </div>

                            {/* Score Ring */}
                            <div className="flex justify-center mb-6">
                                <RiskScoreRing score={riskScore} size={180} />
                            </div>

                            {/* Risk breakdown */}
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { label: "Critical", count: criticalRisks, color: "red" },
                                    { label: "High", count: highRisks, color: "orange" },
                                    { label: "Medium", count: mediumRisks, color: "amber" },
                                    { label: "Low", count: lowRisks, color: "emerald" },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="text-center p-3 rounded-xl bg-white/5"
                                    >
                                        <p
                                            className={cn(
                                                "text-2xl font-bold",
                                                item.color === "red" && "text-red-400",
                                                item.color === "orange" && "text-orange-400",
                                                item.color === "amber" && "text-amber-400",
                                                item.color === "emerald" && "text-emerald-400"
                                            )}
                                        >
                                            {item.count}
                                        </p>
                                        <p className="text-xs text-neutral-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contract Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-neutral-400" />
                            Contract Summary
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            {analysis?.summary || "No summary available."}
                        </p>

                        <div className="space-y-3">
                            {/* Parties */}
                            {analysis?.parties && (
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-xs text-neutral-500 mb-2">Parties</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-cyan-400" />
                                            <span className="text-sm text-white">
                                                {analysis.parties.client?.name || "Client"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm text-white">
                                                {analysis.parties.contractor?.name || "You"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Terms */}
                            {contract.paymentTerms && (
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-xs text-neutral-500 mb-1">Payment Terms</p>
                                    <p className="text-sm text-white font-medium">
                                        {contract.paymentTerms.replace(/_/g, " ")}
                                    </p>
                                </div>
                            )}

                            {/* Duration */}
                            {analysis?.timeline && (
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-xs text-neutral-500 mb-1">Duration</p>
                                    <p className="text-sm text-white font-medium">
                                        {analysis.timeline.duration || "Not specified"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Positives Card */}
                    {positives.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
                        >
                            <h3 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Good Clauses ({positives.length})
                            </h3>
                            <div className="space-y-3">
                                {positives.slice(0, 3).map((positive: any, index: number) => (
                                    <div
                                        key={index}
                                        className="p-3 rounded-xl bg-emerald-500/10"
                                    >
                                        <p className="text-sm text-white">{positive.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Column - Risk Details */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Negotiation Priority */}
                    {analysis?.negotiationPriority && analysis.negotiationPriority.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                <h3 className="font-semibold text-white">
                                    Negotiation Priority
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {analysis.negotiationPriority.map((item: string, index: number) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-medium">
                                            {index + 1}
                                        </span>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Risk Details */}
                    <RiskDetailsPanel
                        risks={risks}
                        selectedRisks={selectedRisks}
                        onSelectRisk={(index) => {
                            setSelectedRisks((prev) =>
                                prev.includes(index)
                                    ? prev.filter((i) => i !== index)
                                    : [...prev, index]
                            );
                        }}
                        onGenerateEmail={() => setShowNegotiation(true)}
                    />

                    {/* Missing Clauses */}
                    {missingClauses.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20"
                        >
                            <h3 className="font-semibold text-amber-400 mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Missing Clauses ({missingClauses.length})
                            </h3>
                            <div className="space-y-3">
                                {missingClauses.map((clause: any, index: number) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/10"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-medium text-white">{clause.clause}</p>
                                            <span
                                                className={cn(
                                                    "px-2 py-0.5 rounded text-xs font-medium",
                                                    clause.importance === "CRITICAL" && "bg-red-500/20 text-red-400",
                                                    clause.importance === "IMPORTANT" && "bg-amber-500/20 text-amber-400",
                                                    clause.importance === "RECOMMENDED" && "bg-blue-500/20 text-blue-400"
                                                )}
                                            >
                                                {clause.importance}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-400">
                                            Suggested: {clause.suggestedLanguage}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Scope Items */}
                    {contract.scopeItems && contract.scopeItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                        >
                            <h3 className="font-semibold text-white mb-4">
                                Scope & Deliverables ({contract.scopeItems.length})
                            </h3>
                            <div className="space-y-2">
                                {contract.scopeItems.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{item.description}</p>
                                            {item.category && (
                                                <span className="text-xs text-neutral-500">
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Negotiation Modal */}
            <NegotiationPanel
                open={showNegotiation}
                onClose={() => setShowNegotiation(false)}
                contractId={contract.id}
                analysis={analysis}
                selectedRisks={selectedRisks}
                risks={risks}
            />
        </div>
    );
}
