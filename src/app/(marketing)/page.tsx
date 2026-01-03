"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Check,
    Zap,
    Shield,
    Users,
    FileText,
    BarChart3,
    Sparkles,
    ChevronRight,
    Play,
    Star
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// ============================================================================
// SOVEREIGN LANDING PAGE - FINTECH AESTHETIC
// Deep Navy (#020617), Emerald/Cyan accents, Dense information, Trust signals
// ============================================================================

export default function MarketingPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <div className="bg-[#020617] min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30">

            {/* ================================================================ */}
            {/* NAVIGATION - Fintech Style */}
            {/* ================================================================ */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/5 bg-[#020617]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center relative">
                                <span className="font-bold text-sm">S</span>
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full" />
                            </div>
                            <span className="font-semibold text-lg tracking-tight">Sovereign</span>
                        </Link>
                        <div className="hidden lg:flex items-center gap-6 text-sm text-slate-400">
                            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                            <Link href="#security" className="hover:text-white transition-colors">Security</Link>
                            <Link href="#about" className="hover:text-white transition-colors">About</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ================================================================ */}
            {/* HERO SECTION - Command Center Reveal */}
            {/* ================================================================ */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />
                    <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </div>

                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale }}
                    className="relative z-10 max-w-5xl mx-auto px-6 text-center"
                >
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs font-medium text-emerald-400">Now with AI-Powered Contract Analysis</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
                    >
                        The Operating System
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400">
                            for Elite Freelancers
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Sovereign unifies contracts, clients, and cash flow into one autonomous command center.
                        AI agents handle the busywork while you focus on high-value work.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/signup"
                            className="group px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all flex items-center gap-2"
                        >
                            Start Free Trial
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Trust Signals */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-500" />
                            SOC 2 Compliant
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500" />
                            256-bit Encryption
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-500" />
                            4.9/5 Rating
                        </div>
                    </motion.div>
                </motion.div>

                {/* Product Screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative z-10 mt-20 max-w-6xl mx-auto px-6"
                >
                    <div className="relative rounded-2xl border border-white/10 bg-[#0a0f1a] p-2 shadow-2xl shadow-emerald-500/5">
                        {/* Browser Chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 rounded-full bg-white/5 text-xs text-slate-500">
                                    app.sovereign.io/dashboard
                                </div>
                            </div>
                        </div>

                        {/* Simulated Dashboard */}
                        <div className="aspect-[16/9] bg-[#020617] rounded-lg overflow-hidden">
                            <div className="h-full flex">
                                {/* Sidebar */}
                                <div className="w-64 border-r border-white/5 bg-[#0a0f1a] p-4 space-y-4">
                                    <div className="flex items-center gap-2 p-2">
                                        <div className="w-6 h-6 rounded bg-emerald-500/20" />
                                        <div className="h-3 w-20 bg-white/10 rounded" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-8 bg-white/5 rounded-lg" />
                                        <div className="h-8 bg-white/5 rounded-lg" />
                                        <div className="h-8 bg-emerald-500/10 rounded-lg border border-emerald-500/20" />
                                        <div className="h-8 bg-white/5 rounded-lg" />
                                    </div>
                                </div>
                                {/* Main Content */}
                                <div className="flex-1 p-6 grid grid-cols-4 gap-4 auto-rows-[80px]">
                                    <div className="col-span-2 row-span-2 rounded-xl bg-white/5 border border-white/5 p-4">
                                        <div className="h-3 w-24 bg-emerald-500/20 rounded mb-3" />
                                        <div className="h-20 bg-gradient-to-t from-emerald-500/10 to-transparent rounded" />
                                    </div>
                                    <div className="col-span-1 row-span-2 rounded-xl bg-white/5 border border-white/5 p-4">
                                        <div className="h-3 w-16 bg-cyan-500/20 rounded mb-3" />
                                        <div className="space-y-2">
                                            <div className="h-4 bg-white/5 rounded" />
                                            <div className="h-4 bg-white/5 rounded" />
                                            <div className="h-4 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                    <div className="col-span-1 row-span-2 rounded-xl bg-white/5 border border-white/5 p-4">
                                        <div className="h-3 w-12 bg-amber-500/20 rounded mb-3" />
                                        <div className="flex flex-col gap-2 mt-4">
                                            <div className="h-6 bg-emerald-500/10 rounded" />
                                            <div className="h-6 bg-red-500/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="col-span-1 rounded-xl bg-white/5 border border-white/5" />
                                    <div className="col-span-1 rounded-xl bg-white/5 border border-white/5" />
                                    <div className="col-span-1 rounded-xl bg-white/5 border border-white/5" />
                                    <div className="col-span-1 rounded-xl bg-white/5 border border-white/5" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification */}
                        <div className="absolute bottom-8 right-8 px-4 py-3 rounded-xl bg-[#0a0f1a] border border-emerald-500/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white">Invoice #1024 paid</p>
                                    <p className="text-xs text-slate-500">+$4,500 from Apex Corp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ================================================================ */}
            {/* SOCIAL PROOF */}
            {/* ================================================================ */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm text-slate-500 mb-8">Trusted by elite freelancers and agencies worldwide</p>
                    <div className="flex items-center justify-center gap-12 opacity-50">
                        {["Stripe", "Notion", "Linear", "Vercel", "Figma"].map((brand) => (
                            <div key={brand} className="text-xl font-semibold text-slate-600">{brand}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* FEATURES - Bento Grid Style */}
            {/* ================================================================ */}
            <section id="features" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                            Everything you need to run
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                a modern freelance business
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            From contract analysis to automated invoicing, Sovereign handles the complexity so you can focus on your craft.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Shield}
                            title="Contract Shield"
                            description="AI-powered contract analysis that identifies risky clauses and suggests negotiation points in seconds."
                            gradient="from-emerald-500/20 to-cyan-500/20"
                            iconColor="text-emerald-400"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Client Radar"
                            description="360° view of every client relationship. Track health scores, communication history, and revenue."
                            gradient="from-violet-500/20 to-purple-500/20"
                            iconColor="text-violet-400"
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Invoice Forge"
                            description="Automatic invoice generation, payment tracking, and gentle follow-ups for overdue accounts."
                            gradient="from-amber-500/20 to-orange-500/20"
                            iconColor="text-amber-400"
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Financial Pulse"
                            description="Real-time cash flow tracking, runway calculations, and predictive revenue forecasting."
                            gradient="from-cyan-500/20 to-blue-500/20"
                            iconColor="text-cyan-400"
                        />
                        <FeatureCard
                            icon={Sparkles}
                            title="AI Agents"
                            description="Autonomous agents that draft emails, schedule meetings, and handle routine tasks on your behalf."
                            gradient="from-pink-500/20 to-rose-500/20"
                            iconColor="text-pink-400"
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Velocity Mode"
                            description="Keyboard-first design with Cmd+K navigation. Built for speed, not clicks."
                            gradient="from-emerald-500/20 to-teal-500/20"
                            iconColor="text-emerald-400"
                        />
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* PRICING */}
            {/* ================================================================ */}
            <section id="pricing" className="py-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-lg text-slate-400">
                            Start free, upgrade when you're ready.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <PricingCard
                            name="Starter"
                            price="Free"
                            description="For freelancers just getting started"
                            features={["3 Active Clients", "5 Contracts/Month", "Basic Analytics", "Email Support"]}
                        />
                        <PricingCard
                            name="Pro"
                            price="$29"
                            description="For established freelancers"
                            features={["Unlimited Clients", "Unlimited Contracts", "AI Contract Analysis", "Priority Support", "Custom Branding"]}
                            featured
                        />
                        <PricingCard
                            name="Agency"
                            price="$99"
                            description="For teams and agencies"
                            features={["Everything in Pro", "Team Collaboration", "API Access", "Dedicated Success Manager", "Custom Integrations"]}
                        />
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* CTA */}
            {/* ================================================================ */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Ready to take control?
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of freelancers who have upgraded from chaos to clarity.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all text-lg"
                    >
                        Start Your Free Trial
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ================================================================ */}
            {/* FOOTER */}
            {/* ================================================================ */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                                <span className="font-bold text-xs">S</span>
                            </div>
                            <span className="font-semibold">Sovereign</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="#" className="hover:text-white transition-colors">Security</Link>
                        </div>
                        <p className="text-sm text-slate-600">© 2026 Sovereign. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function FeatureCard({
    icon: Icon,
    title,
    description,
    gradient,
    iconColor
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    gradient: string;
    iconColor: string;
}) {
    return (
        <div className="group p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 hover:border-white/10 transition-all">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}

function PricingCard({
    name,
    price,
    description,
    features,
    featured = false
}: {
    name: string;
    price: string;
    description: string;
    features: string[];
    featured?: boolean;
}) {
    return (
        <div className={`p-6 rounded-2xl border transition-all ${featured
                ? "bg-gradient-to-b from-emerald-500/10 to-[#0a0f1a] border-emerald-500/30"
                : "bg-[#0a0f1a] border-white/5 hover:border-white/10"
            }`}>
            {featured && (
                <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/20 text-xs font-medium text-emerald-400 mb-4">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
            <p className="text-sm text-slate-500 mb-4">{description}</p>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{price}</span>
                {price !== "Free" && <span className="text-slate-500">/month</span>}
            </div>
            <ul className="space-y-3 mb-6">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-500" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Link
                href="/signup"
                className={`block w-full py-3 rounded-lg text-center font-medium transition-colors ${featured
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
            >
                Get Started
            </Link>
        </div>
    );
}
