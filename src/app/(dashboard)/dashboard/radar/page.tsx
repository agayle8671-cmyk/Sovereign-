"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Radar,
    Activity,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    MessageSquare,
    Copy,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Client {
    id: string;
    name: string;
    sentiment_score: number;
    trend: "up" | "down" | "stable";
    last_interaction: string;
    risk_factors: string[];
    opportunity: string;
    status: "healthy" | "at_risk" | "stable";
}

export default function RadarPage() {
    const [scanning, setScanning] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const scanRelationships = async () => {
        setScanning(true);
        try {
            const res = await fetch("/api/radar/scan", { method: "POST" });
            const data = await res.json();
            setClients(data.clients);
        } catch (e) {
            console.error(e);
        } finally {
            setScanning(false);
        }
    };

    const copyScript = (text: string) => {
        alert("Battlecard Script Copied!");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                    The War Room
                </h1>
                <p className="text-zinc-400 mt-2 max-w-2xl">
                    Client Intelligence Radar. Analyze email sentiment to predict churn, identify upsell opportunities,
                    and generate "Battlecard" scripts for high-stakes negotiations.
                </p>
            </div>

            {/* Main Action Area */}
            <AnimatePresence mode="wait">
                {clients.length === 0 && !scanning && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="border-2 border-dashed border-zinc-800 rounded-3xl p-16 text-center bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-indigo-500/30 transition-all cursor-pointer group"
                        onClick={scanRelationships}
                    >
                        <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-indigo-500/10">
                            <Radar className="w-10 h-10 text-zinc-500 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">
                            Scan Communication Channels
                        </h3>
                        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                            The Radar Core will analyze your Gmail & Slack history to build a psychological profile of each client relationship.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2 mx-auto">
                            <Activity className="w-5 h-5" />
                            Activate Radar
                        </button>
                    </motion.div>
                )}

                {scanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-32 flex flex-col items-center"
                    >
                        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                            <div className="absolute inset-0 border border-zinc-800 rounded-full" />
                            <div className="absolute inset-4 border border-zinc-800/50 rounded-full" />
                            <div className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-indigo-500 top-1/2 left-1/2 origin-left animate-[spin_2s_linear_infinite]" />
                            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1/4 left-1/4 animate-ping" />
                            <div className="absolute w-2 h-2 bg-emerald-500 rounded-full bottom-1/3 right-1/4 animate-pulse" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-xl font-medium text-white">Analyzing Sentiment...</h3>
                            <p className="text-zinc-500 font-mono text-sm">Processing 142 Emails / 5 Slack Channels</p>
                        </div>
                    </motion.div>
                )}

                {clients.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* Client List */}
                        <div className="lg:col-span-1 space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Detected Relationships</h3>
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    onClick={() => setSelectedClient(client)}
                                    className={cn(
                                        "p-4 rounded-xl border cursor-pointer transition-all",
                                        selectedClient?.id === client.id
                                            ? "bg-zinc-800 border-indigo-500"
                                            : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900 hover:border-white/10"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">{client.name}</h4>
                                        <div className={cn(
                                            "text-xs px-2 py-0.5 rounded-full font-bold uppercase",
                                            client.status === "healthy" ? "bg-emerald-500/20 text-emerald-400" :
                                                client.status === "at_risk" ? "bg-red-500/20 text-red-400" : "bg-zinc-500/20 text-zinc-400"
                                        )}>
                                            {client.sentiment_score}% {client.status.replace("_", " ")}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <MessageSquare className="w-3 h-3" />
                                        Last active: {client.last_interaction}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Battlecard / Details */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Tactical Intelligence</h3>
                            {selectedClient ? (
                                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold",
                                            selectedClient.status === "healthy" ? "bg-emerald-500/10 text-emerald-500" :
                                                selectedClient.status === "at_risk" ? "bg-red-500/10 text-red-500" : "bg-zinc-500/10 text-zinc-500"
                                        )}>
                                            {selectedClient.sentiment_score}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                                            <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                                                Trend:
                                                {selectedClient.trend === "up" ? <TrendingUp className="w-4 h-4 text-emerald-500" /> :
                                                    selectedClient.trend === "down" ? <TrendingDown className="w-4 h-4 text-red-500" /> :
                                                        <Activity className="w-4 h-4 text-zinc-500" />}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedClient.risk_factors.length > 0 && (
                                        <div className="mb-8">
                                            <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> Risk Factors
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedClient.risk_factors.map(risk => (
                                                    <span key={risk} className="text-xs bg-red-500/10 text-red-300 px-3 py-1 rounded-full border border-red-500/20">
                                                        {risk}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-[#0A0A0B] border border-white/10 rounded-xl overflow-hidden">
                                        <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                            <span className="text-sm font-medium text-zinc-300">AI Recommendation: Battlecard</span>
                                            <button
                                                onClick={() => copyScript(selectedClient.opportunity)}
                                                className="text-xs flex items-center gap-2 text-indigo-400 hover:text-white transition-colors"
                                            >
                                                <Copy className="w-3 h-3" /> Copy Script
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                                                "{selectedClient.opportunity}"
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-2xl min-h-[400px]">
                                    Select a client to view tactical intel
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
