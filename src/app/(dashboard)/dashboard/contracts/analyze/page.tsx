"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    FileText,
    AlertTriangle,
    CheckCircle,
    ShieldAlert,
    ArrowRight,
    Copy,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Types for our API response
interface AnalysisResult {
    risk_score: number;
    summary: string;
    payment_terms: {
        found: string;
        recommendation: string;
        status: string;
    };
    clauses: {
        title: string;
        text: string;
        risk: string;
        explanation: string;
        fix: string;
    }[];
    negotiation_email: string;
}

export default function AnalyzeContractPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const startAnalysis = async () => {
        setAnalyzing(true);

        // Call our simulation API
        try {
            const res = await fetch("/api/analyze-contract", {
                method: "POST",
                body: JSON.stringify({ content: "dummy_pdf_content" }),
            });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            console.error("Analysis failed", e);
        } finally {
            setAnalyzing(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Simple alert for MVP, in real app use toast
        alert("Draft copied to clipboard!");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Contract Shield
                </h1>
                <p className="text-zinc-400 mt-2 max-w-2xl">
                    Upload a contract to detect predatory terms. The AI "Guardian" agent will analyze
                    risk, flag Net-90 payment terms, and draft a counter-offer to protect your cash flow.
                </p>
            </div>

            {/* Main Analysis Zone */}
            <AnimatePresence mode="wait">
                {!result && !analyzing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 text-center bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all cursor-pointer group"
                        onClick={startAnalysis}
                    >
                        <div className="w-20 h-20 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl shadow-emerald-500/5">
                            <Upload className="w-8 h-8 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Drop Contract PDF Here
                        </h3>
                        <p className="text-zinc-500 mb-8">
                            or click to simulate upload (MVP Mode)
                        </p>
                        <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors">
                            Analyze Sample Contract
                        </button>
                    </motion.div>
                )}

                {analyzing && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping" />
                            <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldAlert className="w-8 h-8 text-emerald-500" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">
                            Guardian Agent Scanning...
                        </h3>
                        <div className="flex flex-col items-center gap-1 text-zinc-500 text-sm">
                            <span className="animate-fade-in delay-100">Reading Legal Definitions...</span>
                            <span className="animate-fade-in delay-300">Checking Payment Terms...</span>
                            <span className="animate-fade-in delay-500">Comparing to Fairness Database...</span>
                        </div>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Top Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldAlert className="w-5 h-5 text-red-400" />
                                    <span className="text-sm font-medium text-red-400">Risk Score</span>
                                </div>
                                <div className="text-4xl font-bold text-white mb-1">{result.risk_score}/100</div>
                                <div className="text-xs text-red-300">Critical Issues Detected</div>
                            </div>

                            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                                    <span className="text-sm font-medium text-amber-400">Payment Terms</span>
                                </div>
                                <div className="text-4xl font-bold text-white mb-1">{result.payment_terms.found}</div>
                                <div className="text-xs text-amber-300">Recommend: {result.payment_terms.recommendation}</div>
                            </div>

                            <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                                <div className="text-zinc-400 text-sm mb-2">Potential Cash Flow Loss</div>
                                <div className="text-2xl font-semibold text-white">60 Days</div>
                                <p className="text-xs text-zinc-500 mt-1">Due to Net-90 terms</p>
                            </div>
                        </div>

                        {/* Negotiation Email */}
                        <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl overflow-hidden">
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-3 text-sm font-medium text-zinc-300">Guardian Draft: Counter-Offer</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(result.negotiation_email)}
                                    className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copy to Clipboard
                                </button>
                            </div>
                            <div className="p-6 font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                {result.negotiation_email}
                            </div>
                        </div>

                        {/* Detailed Clauses */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white pl-1">Identified Risks</h3>
                            {result.clauses.map((clause, idx) => (
                                <div key={idx} className="bg-zinc-900/50 border border-white/5 p-5 rounded-xl hover:border-white/10 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-white flex items-center gap-2">
                                                {clause.title}
                                                {clause.risk === "Critical" && (
                                                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] uppercase tracking-wider font-bold"> Critical</span>
                                                )}
                                                {clause.risk === "High" && (
                                                    <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] uppercase tracking-wider font-bold"> High Risk</span>
                                                )}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Original Text</div>
                                            <p className="text-sm text-zinc-300 bg-red-500/5 p-3 rounded-lg border border-red-500/10 leading-relaxed font-mono">
                                                "{clause.text}"
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Guardian Recommendation</div>
                                            <p className="text-sm text-zinc-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 leading-relaxed">
                                                {clause.fix}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8 pb-12">
                            <button
                                onClick={() => setResult(null)}
                                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Analyze Another Contract
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
