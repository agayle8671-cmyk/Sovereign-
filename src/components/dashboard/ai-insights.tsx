"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BrainInsights } from "@/lib/brain";

interface AiInsightsProps {
    userId: string;
}

export function AiInsights({ userId }: AiInsightsProps) {
    const [loading, setLoading] = useState(false);
    const [insights, setInsights] = useState<BrainInsights | null>(null);
    const [error, setError] = useState(false);

    const fetchInsights = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch("/api/brain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "insights" }),
            });

            if (!res.ok) throw new Error("Failed to fetch insights");

            const data = await res.json();
            setInsights(data);
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-brand-500/5 to-transparent border-brand-500/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-brand-400">
                    <Sparkles className="w-5 h-5 text-brand-500" />
                    Sovereign Brain
                </CardTitle>
                {!insights && !loading && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-xs text-brand-400 hover:text-brand-300 hover:bg-brand-500/10"
                        onClick={fetchInsights}
                    >
                        Activate
                    </Button>
                )}
            </CardHeader>

            <CardContent className="min-h-[140px]">
                <AnimatePresence mode="wait">
                    {/* Initial State */}
                    {!insights && !loading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-neutral-400"
                        >
                            <p className="mb-4">
                                Connect to the Sovereign Brain to get real-time forensic analysis
                                and financial outlooks based on your contract activity.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 rounded bg-brand-500/5 border border-brand-500/10 text-xs">
                                    <div className="font-semibold text-brand-200 mb-1">Forensics</div>
                                    <div className="text-brand-400/70">Risk Detection</div>
                                </div>
                                <div className="p-2 rounded bg-magnet/5 border border-magnet/10 text-xs">
                                    <div className="font-semibold text-magnet-200 mb-1">Finance</div>
                                    <div className="text-magnet-400/70">Revenue Projection</div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-4 space-y-3"
                        >
                            <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                            <p className="text-sm text-neutral-400 animate-pulse">
                                Analyzing ecosystem data...
                            </p>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-brand-500"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-4"
                        >
                            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-sm text-neutral-400 mb-3">
                                Connection to Brain failed.
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={fetchInsights}
                                className="text-xs"
                            >
                                Retry
                            </Button>
                        </motion.div>
                    )}

                    {/* Insights State */}
                    {insights && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {/* Financial Outlook */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs uppercase tracking-wide font-medium text-neutral-500">
                                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Financial Outlook</span>
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded",
                                        insights.financial.outlook === "POSITIVE" ? "bg-green-500/20 text-green-400" :
                                            insights.financial.outlook === "NEGATIVE" ? "bg-red-500/20 text-red-400" :
                                                "bg-yellow-500/20 text-yellow-400"
                                    )}>
                                        {insights.financial.outlook}
                                    </span>
                                </div>
                                <div className="text-sm text-neutral-300">
                                    <p className="mb-1"><span className="text-neutral-500">Proj. Revenue:</span> <span className="text-white font-mono">{insights.financial.projectedRevenue}</span></p>
                                    <ul className="list-disc list-inside text-neutral-400 text-xs space-y-0.5 pl-1">
                                        {insights.financial.opportunityAreas.slice(0, 2).map((opt, i) => (
                                            <li key={i}>{opt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="h-px bg-white/5" />

                            {/* Forensic Status */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs uppercase tracking-wide font-medium text-neutral-500">
                                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Forensic Status</span>
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded",
                                        insights.forensic.riskLevel === "LOW" ? "bg-brand-500/20 text-brand-400" :
                                            insights.forensic.riskLevel === "CRITICAL" ? "bg-red-500/20 text-red-400" :
                                                "bg-yellow-500/20 text-yellow-400"
                                    )}>
                                        {insights.forensic.riskLevel} RISK
                                    </span>
                                </div>
                                <div className="text-sm text-neutral-300">
                                    <p className="line-clamp-2 mb-2">{insights.forensic.summary}</p>
                                    {insights.forensic.actionItems.length > 0 && (
                                        <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-200">
                                            <span className="font-bold mr-1">Action:</span>
                                            {insights.forensic.actionItems[0]}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button variant="ghost" size="sm" className="h-6 text-[10px] text-neutral-500 hover:text-neutral-300" onClick={fetchInsights}>
                                    Refresh Analysis
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
