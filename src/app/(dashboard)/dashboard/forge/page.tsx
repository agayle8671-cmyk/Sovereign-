"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Hammer,
    Search,
    Package,
    DollarSign,
    ArrowRight,
    GitBranch,
    Loader2,
    CheckCircle2,
    ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Asset {
    id: string;
    name: string;
    type: string;
    source: string;
    reusability_score: number;
    market_value: string;
    description: string;
    status: "ready" | "needs_polish";
}

export default function ForgePage() {
    const [scanning, setScanning] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [productizing, setProductizing] = useState<string | null>(null);
    const [launched, setLaunched] = useState<string[]>([]);

    const scanRepositories = async () => {
        setScanning(true);
        try {
            const res = await fetch("/api/forge/mine", { method: "POST" });
            const data = await res.json();

            if (res.ok && data.assets) {
                setAssets(data.assets);
            } else {
                console.error("Forge Scan Failed:", data);
                // Optional: set an error state here to show a toast
            }
        } catch (e) {
            console.error(e);
        } finally {
            setScanning(false);
        }
    };

    const launchProduct = async (id: string) => {
        setProductizing(id);
        // Simulate "wrapping" code, generating docs, and creating Stripe link
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setProductizing(null);
        setLaunched([...launched, id]);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
                    The Forge
                </h1>
                <p className="text-zinc-400 mt-2 max-w-2xl">
                    Turn your code into passive income. The Forge scans your diverse client projects for
                    reusable components, packages them as Micro-SaaS, and deploys payment links instantly.
                </p>
            </div>

            {/* Main Action Area */}
            <AnimatePresence mode="wait">
                {assets.length === 0 && !scanning && (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="border-2 border-dashed border-zinc-800 rounded-3xl p-16 text-center bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-amber-500/30 transition-all cursor-pointer group"
                        onClick={scanRepositories}
                    >
                        <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-amber-500/10">
                            <Search className="w-10 h-10 text-zinc-500 group-hover:text-amber-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">
                            Scan Repositories for Assets
                        </h3>
                        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                            The Asset Miner will analyze your GitHub history to find high-value, reusable components hidden in your client work.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2 mx-auto">
                            <Hammer className="w-5 h-5" />
                            Start Mining
                        </button>
                    </motion.div>
                )}

                {scanning && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-32 flex flex-col items-center"
                    >
                        <div className="relative w-32 h-32 mb-8">
                            <div className="absolute inset-0 border-4 border-zinc-800 rounded-full" />
                            <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-amber-500 font-bold animate-pulse">
                                Thinking
                            </div>
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-xl font-medium text-white">Analyzing Codebase...</h3>
                            <p className="text-zinc-500 font-mono text-sm">Scanning src/components/*</p>
                        </div>
                    </motion.div>
                )}

                {assets.length > 0 && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
                                <span className="text-zinc-400 text-sm">Potential MRR Found:</span>
                                <span className="ml-2 text-emerald-400 font-bold">$1,250/mo</span>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assets.map((asset, idx) => (
                                <motion.div
                                    key={asset.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-zinc-900 border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-colors group relative overflow-hidden"
                                >
                                    {/* Status Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                                            asset.reusability_score > 90 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                                        )}>
                                            {asset.reusability_score}% Reusable
                                        </span>
                                    </div>

                                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors">
                                        <Package className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-1">{asset.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4 font-mono">
                                        <GitBranch className="w-3 h-3" />
                                        {asset.source}
                                    </div>

                                    <p className="text-sm text-zinc-400 mb-6 min-h-[60px]">
                                        {asset.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                        <div>
                                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Market Price</div>
                                            <div className="text-lg font-bold text-white">{asset.market_value}</div>
                                        </div>

                                        {launched.includes(asset.id) ? (
                                            <button disabled className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-lg flex items-center gap-2 cursor-default">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Live
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => launchProduct(asset.id)}
                                                disabled={productizing === asset.id}
                                                className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2"
                                            >
                                                {productizing === asset.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <DollarSign className="w-4 h-4" />
                                                        Launch
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {launched.includes(asset.id) && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            className="mt-4 pt-4 border-t border-white/5 bg-emerald-500/5 -mx-6 -mb-6 px-6 py-4"
                                        >
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-emerald-400 font-medium">Product Active</span>
                                                <Link
                                                    href={`/product/${asset.id === "comp_1" ? "modern-auth-hook" : asset.id === "comp_2" ? "saas-pricing-table" : "invoice-generator-pdf"}`}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-zinc-400 hover:text-white"
                                                >
                                                    View Landing Page <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
