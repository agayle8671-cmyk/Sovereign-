"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialProofSection } from "@/components/landing/social-proof/SocialProofSection";
import { Footer } from "@/components/landing/Footer";

export default function MarketingPage() {
    return (
        <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-violet-500/30">

            {/* 1. Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center font-bold">S</div>
                    <span className="font-semibold tracking-tight">Sovereign</span>
                </div>
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-400">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="#about" className="hover:text-white transition-colors">About</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-white hover:text-violet-400 transition-colors">Log in</Link>
                    <Link href="/signup">
                        <Button className="h-9 bg-white text-black hover:bg-neutral-200">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* 2. Hero Section (Data Density Focus) */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center text-center">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-violet-300 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        v2.0 is now live
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        The Operating System for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">High-Performance Agencies</span>
                    </h1>

                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Sovereign unifies your entire business into one command center.
                        Manage clients, projects, and contracts with Excel-like speed and AI-driven insights.
                    </p>

                    <div className="flex items-center justify-center gap-3 pt-4">
                        <Link href="/signup">
                            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 h-12 px-8 text-base">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white">
                            View Demo <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>

                {/* Hero Image (Tilted Dashboard) */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 relative z-10 w-full max-w-6xl"
                >
                    <div className="relative rounded-xl border border-white/10 bg-[#0F0F0F]/50 backdrop-blur-sm p-2 shadow-2xl shadow-violet-500/10">
                        <img
                            src="/dashboard-mock.png" // We'll assume a placeholder or I can generate one, but for now using a div representation or img
                            alt="Dashboard"
                            className="rounded-lg w-full h-auto border border-white/5 hidden"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        {/* Simulated Dashboard UI for the mock if image fails or for cleaner code-only look */}
                        <div className="w-full aspect-[16/9] bg-[#09090b] rounded-lg overflow-hidden relative flex flex-col">
                            {/* Header */}
                            <div className="h-12 border-b border-[#1F1F1F] flex items-center px-4 gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="h-6 w-64 bg-[#1F1F1F] rounded ml-4" />
                            </div>
                            {/* Body - Columns */}
                            <div className="flex-1 flex">
                                <div className="w-64 border-r border-[#1F1F1F] bg-[#050505] p-4 space-y-3">
                                    <div className="h-4 w-20 bg-[#1F1F1F] rounded" />
                                    <div className="h-4 w-32 bg-[#1F1F1F] rounded" />
                                    <div className="h-4 w-24 bg-[#1F1F1F] rounded" />
                                </div>
                                <div className="flex-1 bg-[#09090b] p-6 grid grid-cols-3 gap-6">
                                    <div className="col-span-3 h-32 bg-[#1F1F1F]/50 border border-[#1F1F1F] rounded-lg" />
                                    <div className="h-48 bg-[#1F1F1F]/50 border border-[#1F1F1F] rounded-lg" />
                                    <div className="h-48 bg-[#1F1F1F]/50 border border-[#1F1F1F] rounded-lg" />
                                    <div className="h-48 bg-[#1F1F1F]/50 border border-[#1F1F1F] rounded-lg" />
                                </div>
                            </div>
                            {/* Floating Callout */}
                            <div className="absolute bottom-12 right-12 bg-violet-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
                                New Contract Signed +$12k
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 3. Social Proof */}
            <SocialProofSection />

            {/* 4. Features Grid (Wope Bento) */}
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Everything needed to run a <br /> modern agency</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F] hover:border-violet-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Automated Operations</h3>
                        <p className="text-neutral-400 leading-relaxed">Eliminate busywork with autonomous workflows that handle onboarding, invoicing, and reporting.</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F] hover:border-violet-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                            <Check className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Client Transparency</h3>
                        <p className="text-neutral-400 leading-relaxed">Give clients a dedicated portal to view progress, sign contracts, and approve assets in real-time.</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="p-8 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F] hover:border-violet-500/50 transition-colors group">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6">
                            <Check className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Financial Foresight</h3>
                        <p className="text-neutral-400 leading-relaxed">Predict cash flow and resource bottlenecks with AI-driven financial modeling.</p>
                    </div>
                </div>
            </section>

            {/* 5. Footer */}
            <Footer />
        </div>
    );
}
