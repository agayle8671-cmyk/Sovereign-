"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    X,
    Mail,
    Copy,
    Check,
    Loader2,
    Sparkles,
    FileEdit,
    Send,
} from "lucide-react";

interface NegotiationPanelProps {
    open: boolean;
    onClose: () => void;
    contractId: string;
    analysis: any;
    selectedRisks: number[];
    risks: any[];
}

type Tone = "professional" | "friendly" | "firm";

export function NegotiationPanel({
    open,
    onClose,
    contractId,
    analysis,
    selectedRisks,
    risks,
}: NegotiationPanelProps) {
    const [tone, setTone] = useState<Tone>("professional");
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const selectedRiskItems = selectedRisks.map((i) => risks[i]).filter(Boolean);
    const risksToUse = selectedRiskItems.length > 0 ? selectedRiskItems : risks.slice(0, 3);

    const generateEmail = async () => {
        setLoading(true);
        setEmail(null);

        try {
            const response = await fetch(`/api/contracts/${contractId}/negotiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selectedRiskIndices: selectedRisks.length > 0 ? selectedRisks : [0, 1, 2].filter(i => i < risks.length),
                    tone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate email");
            }

            setEmail(data.email);
        } catch (error) {
            console.error("Failed to generate email:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!email) return;
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-neutral-900 border-l border-white/10 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        Generate Counter-Offer Email
                                    </h2>
                                    <p className="text-sm text-neutral-400">
                                        AI will draft a professional negotiation email
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5 text-neutral-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Tone Selection */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    Email Tone
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            id: "professional" as Tone,
                                            label: "Professional",
                                            description: "Formal and business-like",
                                        },
                                        {
                                            id: "friendly" as Tone,
                                            label: "Friendly",
                                            description: "Warm but professional",
                                        },
                                        {
                                            id: "firm" as Tone,
                                            label: "Firm",
                                            description: "Direct and confident",
                                        },
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setTone(option.id)}
                                            className={cn(
                                                "p-4 rounded-xl text-left transition-all",
                                                tone === option.id
                                                    ? "bg-cyan-500/10 border-2 border-cyan-500/50"
                                                    : "bg-white/5 border-2 border-transparent hover:border-white/10"
                                            )}
                                        >
                                            <p
                                                className={cn(
                                                    "font-medium mb-1",
                                                    tone === option.id ? "text-cyan-400" : "text-white"
                                                )}
                                            >
                                                {option.label}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {option.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Issues */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    Issues to Address ({risksToUse.length})
                                </label>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {risksToUse.map((risk: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                                        >
                                            <div
                                                className={cn(
                                                    "w-6 h-6 rounded flex items-center justify-center text-xs font-medium",
                                                    risk.severity === "CRITICAL" && "bg-red-500/20 text-red-400",
                                                    risk.severity === "HIGH" && "bg-orange-500/20 text-orange-400",
                                                    risk.severity === "MEDIUM" && "bg-amber-500/20 text-amber-400",
                                                    risk.severity === "LOW" && "bg-blue-500/20 text-blue-400"
                                                )}
                                            >
                                                {risk.severity[0]}
                                            </div>
                                            <p className="text-sm text-neutral-300 flex-1 line-clamp-1">
                                                {risk.explanation}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Generate Button */}
                            {!email && (
                                <button
                                    onClick={generateEmail}
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Email
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Generated Email */}
                            {email && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-emerald-400">
                                            <Check className="w-5 h-5" />
                                            <span className="text-sm font-medium">Email Generated</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={copyToClipboard}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <Check className="w-4 h-4 text-emerald-400" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEmail(null);
                                                    generateEmail();
                                                }}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                                            >
                                                <FileEdit className="w-4 h-4" />
                                                Regenerate
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <pre className="whitespace-pre-wrap text-sm text-neutral-300 font-sans leading-relaxed">
                                            {email}
                                        </pre>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        {email && (
                            <div className="p-6 border-t border-white/5">
                                <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" />
                                    Open in Email Client
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
