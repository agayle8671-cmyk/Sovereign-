"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    AlertTriangle,
    AlertCircle,
    Info,
    ChevronDown,
    ChevronUp,
    CheckSquare,
    Square,
    Lightbulb,
    FileEdit,
} from "lucide-react";

interface Risk {
    clause: string;
    category: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    explanation: string;
    recommendation: string;
    suggestedRevision: string | null;
}

interface RiskDetailsPanelProps {
    risks: Risk[];
    selectedRisks: number[];
    onSelectRisk: (index: number) => void;
    onGenerateEmail: () => void;
}

const severityConfig = {
    CRITICAL: {
        icon: AlertTriangle,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        badge: "bg-red-500/20 text-red-400",
    },
    HIGH: {
        icon: AlertTriangle,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        badge: "bg-orange-500/20 text-orange-400",
    },
    MEDIUM: {
        icon: AlertCircle,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        badge: "bg-amber-500/20 text-amber-400",
    },
    LOW: {
        icon: Info,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-400",
    },
};

export function RiskDetailsPanel({
    risks,
    selectedRisks,
    onSelectRisk,
    onGenerateEmail,
}: RiskDetailsPanelProps) {
    const [expandedRisks, setExpandedRisks] = useState<number[]>([0]);

    const toggleExpand = (index: number) => {
        setExpandedRisks((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (risks.length === 0) {
        return (
            <div className="p-12 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    No significant risks detected
                </h3>
                <p className="text-neutral-400">
                    This contract appears to have fair and balanced terms.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="font-semibold text-white">
                        Risk Analysis ({risks.length} issues)
                    </h3>
                </div>
                {selectedRisks.length > 0 && (
                    <button
                        onClick={onGenerateEmail}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                    >
                        <FileEdit className="w-4 h-4" />
                        Address {selectedRisks.length} selected
                    </button>
                )}
            </div>

            {/* Risk list */}
            <div className="divide-y divide-white/5">
                {risks.map((risk, index) => {
                    const config = severityConfig[risk.severity];
                    const Icon = config.icon;
                    const isExpanded = expandedRisks.includes(index);
                    const isSelected = selectedRisks.includes(index);

                    return (
                        <div key={index} className={cn("transition-colors", isExpanded && config.bg)}>
                            {/* Risk header */}
                            <div className="flex items-start gap-3 p-4">
                                {/* Checkbox */}
                                <button
                                    onClick={() => onSelectRisk(index)}
                                    className="mt-0.5 shrink-0"
                                >
                                    {isSelected ? (
                                        <CheckSquare className="w-5 h-5 text-cyan-400" />
                                    ) : (
                                        <Square className="w-5 h-5 text-neutral-600 hover:text-neutral-400" />
                                    )}
                                </button>

                                {/* Icon */}
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        config.bg
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5", config.color)} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className={cn(
                                                "px-2 py-0.5 rounded text-xs font-medium",
                                                config.badge
                                            )}
                                        >
                                            {risk.severity}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {risk.category.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                    <p className="text-white font-medium line-clamp-2">
                                        {risk.explanation}
                                    </p>
                                </div>

                                {/* Expand button */}
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-neutral-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                                    )}
                                </button>
                            </div>

                            {/* Expanded content */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 ml-[68px] space-y-4">
                                            {/* Original clause */}
                                            <div className="p-3 rounded-xl bg-white/5 border-l-2 border-red-500/50">
                                                <p className="text-xs text-neutral-500 mb-1">
                                                    Problematic Clause
                                                </p>
                                                <p className="text-sm text-neutral-300 italic">
                                                    "{risk.clause}"
                                                </p>
                                            </div>

                                            {/* Recommendation */}
                                            <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                                                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-cyan-400 font-medium mb-1">
                                                        Recommendation
                                                    </p>
                                                    <p className="text-sm text-neutral-300">
                                                        {risk.recommendation}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Suggested revision */}
                                            {risk.suggestedRevision && (
                                                <div className="p-3 rounded-xl bg-emerald-500/5 border-l-2 border-emerald-500/50">
                                                    <p className="text-xs text-emerald-400 font-medium mb-1">
                                                        Suggested Revision
                                                    </p>
                                                    <p className="text-sm text-neutral-300">
                                                        "{risk.suggestedRevision}"
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
