"use client";

import { useState } from "react";
import Link from "next/link";

// ============================================================================
// SOVEREIGN LANDING PAGE
// "Linear" Aesthetic - Precision-Engineered, Dark Future, Calm, Powerful
// ============================================================================

export default function MarketingPage() {
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans antialiased selection:bg-indigo-500/30">

            {/* ================================================================ */}
            {/* NAVBAR */}
            {/* ================================================================ */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <Link href="/" className="text-sm font-bold tracking-widest text-white">
                            SOVEREIGN
                        </Link>

                        {/* Links */}
                        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
                            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                            <Link href="#architecture" className="hover:text-white transition-colors">Architecture</Link>
                            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-lg bg-white/[0.05] backdrop-blur-sm text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/[0.08] hover:ring-white/30 transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ================================================================ */}
            {/* HERO SECTION */}
            {/* ================================================================ */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Lighting Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/0 via-zinc-950/50 to-zinc-950 pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-zinc-400">v2.4.0 · AI-Powered Contract Analysis</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-balance leading-[1.1] mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            The Operating System
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            for Freelancers.
                        </span>
                    </h1>

                    {/* Subhead */}
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                        Orchestrate contracts, clients, and cash flow with zero friction.
                        AI-powered analysis. Immutable audit trails.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <Link
                            href="/signup"
                            className="px-6 py-3 rounded-lg bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 rounded-lg bg-white/[0.05] text-white text-sm font-medium ring-1 ring-white/20 hover:bg-white/[0.08] transition-colors"
                        >
                            Go to Dashboard →
                        </Link>
                    </div>

                    <p className="text-xs text-zinc-600">
                        No credit card required. Deploy in 90 seconds.
                    </p>
                </div>
            </section>

            {/* ================================================================ */}
            {/* TRUSTED BY STRIP */}
            {/* ================================================================ */}
            <section className="py-12 border-y border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-xs font-medium text-zinc-600 uppercase tracking-wider mb-8">
                        Trusted by elite freelancers worldwide
                    </p>
                    <div className="flex items-center justify-center gap-12 md:gap-16">
                        {["Vercel", "Stripe", "Linear", "Raycast", "Supabase"].map((brand) => (
                            <span
                                key={brand}
                                className="text-lg font-semibold text-zinc-700 tracking-tight opacity-30"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* FEATURES SECTION */}
            {/* ================================================================ */}
            <section id="features" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
                            Everything you need,
                            <br />
                            <span className="text-zinc-500">nothing you don't.</span>
                        </h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            A unified control plane for contracts, clients, and cash flow.
                            AI handles the complexity.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div id="architecture" className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Card 1: Contract Analysis (Large) */}
                        <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Contract Shield
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        AI-powered analysis. Risk detection. Negotiation suggestions.
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Abstract UI: Terminal */}
                            <div className="rounded-lg bg-black/50 border border-white/[0.05] overflow-hidden">
                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <span className="ml-2 text-[10px] text-zinc-600 font-mono">analysis.json</span>
                                </div>
                                <div className="p-3 font-mono text-[11px] leading-relaxed">
                                    <div className="text-zinc-600">{"{"}</div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"risk_score"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-amber-400">32</span>
                                        <span className="text-zinc-600">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"flags"</span>
                                        <span className="text-zinc-600">: [</span>
                                        <span className="text-emerald-400">"payment_terms"</span>
                                        <span className="text-zinc-600">, </span>
                                        <span className="text-emerald-400">"ip_clause"</span>
                                        <span className="text-zinc-600">],</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"recommendation"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-emerald-400">"Negotiate NET-15"</span>
                                    </div>
                                    <div className="text-zinc-600">{"}"}</div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Client Radar (Small) */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Client Radar
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        360° visibility. Health scores.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Health indicators */}
                            <div className="space-y-3">
                                {[
                                    { name: "Apex Corp", health: 92, color: "bg-emerald-500" },
                                    { name: "Stark Industries", health: 78, color: "bg-emerald-500" },
                                    { name: "Initech", health: 45, color: "bg-amber-500" },
                                ].map((client) => (
                                    <div key={client.name} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${client.color}`} />
                                        <span className="text-xs text-zinc-500 flex-1">{client.name}</span>
                                        <span className="text-xs font-mono text-zinc-400">{client.health}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3: Financial Pulse (Small) */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Financial Pulse
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Real-time cash flow. Runway tracking.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Stats */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-2xl font-semibold text-white">$84,250</p>
                                    <p className="text-xs text-emerald-400">+24.5% this month</p>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Card 4: AI Agents (Tall) */}
                        <div className="md:row-span-2 p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        AI Agents
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Autonomous task execution. Human-in-the-loop.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Agent Activity */}
                            <div className="flex-1 space-y-3 font-mono text-[11px]">
                                {[
                                    { agent: "Invoicer", action: "Generated #1024", status: "complete" },
                                    { agent: "Scheduler", action: "Booked meeting", status: "complete" },
                                    { agent: "Negotiator", action: "Drafting follow-up", status: "pending" },
                                    { agent: "Compliance", action: "Verified Q4 filings", status: "complete" },
                                    { agent: "Analyst", action: "Risk assessment", status: "complete" },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${log.status === "complete" ? "bg-emerald-500" : "bg-cyan-500 animate-pulse"}`} />
                                        <span className="text-cyan-400">[{log.agent}]</span>
                                        <span className="text-zinc-500">{log.action}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/[0.05]">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs text-zinc-400">5 agents active</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Triage */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Triage Inbox
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Prioritized decisions. Keyboard-first.
                                    </p>
                                </div>
                                <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-xs font-medium text-amber-400">3</span>
                                </div>
                            </div>

                            {/* Abstract UI: Pending items */}
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-3 bg-zinc-800/50 rounded" style={{ width: `${100 - i * 15}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* PRICING SECTION */}
            {/* ================================================================ */}
            <section id="pricing" className="py-24 border-t border-white/[0.05]">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-zinc-400">
                            Start free. Upgrade when you're ready.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Starter */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08]">
                            <h3 className="text-lg font-medium text-white mb-1">Starter</h3>
                            <p className="text-sm text-zinc-500 mb-4">For freelancers getting started</p>
                            <div className="mb-6">
                                <span className="text-4xl font-semibold text-white">Free</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {["3 Active Clients", "5 Contracts/Month", "Basic Analytics"].map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                                        <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/signup"
                                className="block w-full py-3 rounded-lg bg-white/[0.05] text-white text-sm font-medium text-center ring-1 ring-white/10 hover:bg-white/[0.08] transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Pro */}
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-500/10 to-zinc-900/50 backdrop-blur-md border border-indigo-500/20">
                            <div className="inline-flex px-2 py-0.5 rounded bg-indigo-500/20 text-xs font-medium text-indigo-400 mb-3">
                                Most Popular
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">Pro</h3>
                            <p className="text-sm text-zinc-500 mb-4">For established freelancers</p>
                            <div className="mb-6">
                                <span className="text-4xl font-semibold text-white">$29</span>
                                <span className="text-zinc-500">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {["Unlimited Clients", "Unlimited Contracts", "AI Contract Analysis", "Priority Support"].map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/signup"
                                className="block w-full py-3 rounded-lg bg-white text-zinc-900 text-sm font-medium text-center hover:bg-zinc-100 transition-colors"
                            >
                                Start Free Trial
                            </Link>
                        </div>

                        {/* Agency */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08]">
                            <h3 className="text-lg font-medium text-white mb-1">Agency</h3>
                            <p className="text-sm text-zinc-500 mb-4">For teams and agencies</p>
                            <div className="mb-6">
                                <span className="text-4xl font-semibold text-white">$99</span>
                                <span className="text-zinc-500">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-6">
                                {["Everything in Pro", "Team Collaboration", "API Access", "Custom Integrations"].map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-400">
                                        <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/signup"
                                className="block w-full py-3 rounded-lg bg-white/[0.05] text-white text-sm font-medium text-center ring-1 ring-white/10 hover:bg-white/[0.08] transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* CTA SECTION */}
            {/* ================================================================ */}
            <section className="py-24">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                        Ready to take control?
                    </h2>
                    <p className="text-zinc-400 mb-8">
                        Join thousands of freelancers who automated their back-office.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="px-6 py-3 rounded-lg bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 rounded-lg bg-white/[0.05] text-white text-sm font-medium ring-1 ring-white/20 hover:bg-white/[0.08] transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* FOOTER */}
            {/* ================================================================ */}
            <footer className="py-12 bg-black border-t border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">Dashboard</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="/dashboard/contracts/analyze" className="text-sm text-zinc-400 hover:text-white transition-colors">Analyze Contract</Link></li>
                                <li><Link href="/dashboard/clients" className="text-sm text-zinc-400 hover:text-white transition-colors">Clients</Link></li>
                                <li><Link href="/dashboard/portfolio" className="text-sm text-zinc-400 hover:text-white transition-colors">Portfolio</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link></li>
                                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Account</h4>
                            <ul className="space-y-2">
                                <li><Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Sign In</Link></li>
                                <li><Link href="/signup" className="text-sm text-zinc-400 hover:text-white transition-colors">Sign Up</Link></li>
                                <li><Link href="/dashboard/settings" className="text-sm text-zinc-400 hover:text-white transition-colors">Settings</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                        <span className="text-sm font-bold tracking-widest text-zinc-600">SOVEREIGN</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs text-zinc-500">All Systems Operational</span>
                        </div>
                        <span className="text-xs text-zinc-600">© 2026 Sovereign. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
