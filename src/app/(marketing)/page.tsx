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
                        <span className="text-sm font-bold tracking-widest text-white">SOVEREIGN</span>

                        {/* Links */}
                        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">Changelog</a>
                            <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        </div>
                    </div>

                    {/* CTA */}
                    <button className="px-4 py-2 rounded-lg bg-white/[0.05] backdrop-blur-sm text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/[0.08] hover:ring-white/30 transition-all">
                        Deploy Node
                    </button>
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
                        <span className="text-xs font-medium text-zinc-400">v2.4.0 · Now with Multi-Region HA</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-balance leading-[1.1] mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            The Operating System
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            for Autonomy.
                        </span>
                    </h1>

                    {/* Subhead */}
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
                        Orchestrate hyper-scale infrastructure with zero human intervention.
                        Cryptographically verifiable logs. Self-healing state.
                    </p>

                    {/* CLI Input Group */}
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] ring-1 ring-inset ring-white/[0.05]">
                            <span className="text-zinc-600 pl-2 font-mono text-sm">&gt;</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your work email..."
                                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-mono"
                            />
                            <button className="px-4 py-2 rounded-lg bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors">
                                Request Access
                            </button>
                        </div>
                        <p className="text-xs text-zinc-600 mt-3">
                            Deploy in &lt;90 seconds. No credit card required.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* TRUSTED BY STRIP */}
            {/* ================================================================ */}
            <section className="py-12 border-y border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-xs font-medium text-zinc-600 uppercase tracking-wider mb-8">
                        Trusted by engineering teams at
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
            {/* ARCHITECTURE - BENTO GRID */}
            {/* ================================================================ */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance mb-4">
                            Infrastructure primitives,
                            <br />
                            <span className="text-zinc-500">abstracted.</span>
                        </h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            A unified control plane for governance, observability, and orchestration.
                            No YAML. No toil.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Card 1: Immutable Ledger (Large) */}
                        <div className="md:col-span-2 p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Immutable Ledger
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Cryptographic proof for every state mutation. Audit-ready.
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                            </div>

                            {/* Abstract UI: Terminal */}
                            <div className="rounded-lg bg-black/50 border border-white/[0.05] overflow-hidden">
                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05]">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                    <span className="ml-2 text-[10px] text-zinc-600 font-mono">audit.log</span>
                                </div>
                                <div className="p-3 font-mono text-[11px] leading-relaxed">
                                    <div className="text-zinc-600">{"{"}</div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"timestamp"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-emerald-400">"2026-01-03T17:14:27.891Z"</span>
                                        <span className="text-zinc-600">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"action"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-amber-400">"DEPLOY"</span>
                                        <span className="text-zinc-600">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"node"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-emerald-400">"us-east-1.sovereign.io"</span>
                                        <span className="text-zinc-600">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-indigo-400">"hash"</span>
                                        <span className="text-zinc-600">: </span>
                                        <span className="text-zinc-500">"0x8a7f...3e2d"</span>
                                    </div>
                                    <div className="text-zinc-600">{"}"}</div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Global Edge (Small) */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Global Edge
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        42 regions. &lt;50ms latency.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Pulsing Nodes */}
                            <div className="relative h-32 flex items-center justify-center">
                                <div className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" style={{ top: '20%', left: '30%' }} />
                                <div className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" style={{ top: '60%', left: '70%', animationDelay: '0.3s' }} />
                                <div className="absolute w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" style={{ top: '40%', left: '50%', animationDelay: '0.6s' }} />
                                <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-600" style={{ top: '30%', left: '20%' }} />
                                <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-600" style={{ top: '70%', left: '40%' }} />
                                <div className="absolute w-1.5 h-1.5 rounded-full bg-zinc-600" style={{ top: '25%', left: '80%' }} />
                                {/* Connection Lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-20">
                                    <line x1="30%" y1="20%" x2="50%" y2="40%" stroke="currentColor" className="text-zinc-600" strokeWidth="1" />
                                    <line x1="50%" y1="40%" x2="70%" y2="60%" stroke="currentColor" className="text-zinc-600" strokeWidth="1" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 3: RBAC Native (Small) */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        RBAC Native
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Zero-trust by default. SSO integrated.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Shield */}
                            <div className="flex items-center justify-center h-32">
                                <div className="relative w-16 h-20">
                                    <div className="absolute inset-0 rounded-t-full rounded-b-lg border-2 border-zinc-700 bg-zinc-800/50" />
                                    <div className="absolute inset-2 rounded-t-full rounded-b-md border border-zinc-600 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Telemetry (Tall) */}
                        <div className="md:row-span-2 p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Real-time Telemetry
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Full observability stack. Prometheus-compatible.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Status Bars */}
                            <div className="flex-1 space-y-3">
                                {[
                                    { label: "API Gateway", value: "99.99%", color: "bg-emerald-500" },
                                    { label: "Auth Service", value: "99.97%", color: "bg-emerald-500" },
                                    { label: "Data Plane", value: "100%", color: "bg-emerald-500" },
                                    { label: "Control Plane", value: "99.98%", color: "bg-emerald-500" },
                                    { label: "Edge Nodes", value: "99.95%", color: "bg-emerald-500" },
                                    { label: "Audit Log", value: "100%", color: "bg-emerald-500" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                        <span className="text-xs text-zinc-500 flex-1">{item.label}</span>
                                        <span className="text-xs font-mono text-zinc-400">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/[0.05]">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs text-zinc-400">All systems operational</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Self-Healing */}
                        <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-md border border-white/[0.08] group hover:border-white/[0.15] transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-medium tracking-tight text-white mb-1">
                                        Self-Healing
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        Automatic remediation. Zero pager alerts.
                                    </p>
                                </div>
                            </div>

                            {/* Abstract UI: Toggle */}
                            <div className="flex items-center gap-3 mt-6">
                                <div className="w-10 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                                </div>
                                <span className="text-xs font-mono text-emerald-400">ENABLED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* CODE INTERACTION SECTION */}
            {/* ================================================================ */}
            <section className="py-24 border-t border-white/[0.05]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                            One file. Full governance.
                        </h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            Define your entire infrastructure policy in a single, declarative configuration.
                        </p>
                    </div>

                    {/* IDE Window */}
                    <div className="rounded-2xl bg-black/50 border border-white/[0.08] overflow-hidden">
                        {/* Window Chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-zinc-900/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500/50 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500/50 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-emerald-500/50 transition-colors" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <span className="text-xs font-mono text-zinc-500">sovereign.config.yaml</span>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                            <div className="text-zinc-500"># Sovereign Control Plane Configuration</div>
                            <div className="text-zinc-500"># Version: 2.4.0</div>
                            <br />
                            <div>
                                <span className="text-indigo-400">cluster</span>
                                <span className="text-zinc-500">:</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">name</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">production-us-east</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">regions</span>
                                <span className="text-zinc-500">: [</span>
                                <span className="text-amber-400">us-east-1</span>
                                <span className="text-zinc-500">, </span>
                                <span className="text-amber-400">eu-west-1</span>
                                <span className="text-zinc-500">, </span>
                                <span className="text-amber-400">ap-south-1</span>
                                <span className="text-zinc-500">]</span>
                            </div>
                            <br />
                            <div>
                                <span className="text-indigo-400">governance</span>
                                <span className="text-zinc-500">:</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">immutable_logs</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">true</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">auto_remediation</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">true</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">drift_detection</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">realtime</span>
                            </div>
                            <br />
                            <div>
                                <span className="text-indigo-400">security</span>
                                <span className="text-zinc-500">:</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">rbac</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">strict</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">encryption</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">AES-256-GCM</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-zinc-400">attestation</span>
                                <span className="text-zinc-500">: </span>
                                <span className="text-emerald-400">cryptographic</span>
                            </div>
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
                        Infrastructure at the
                        <br />
                        speed of thought.
                    </h2>
                    <p className="text-zinc-400 mb-8">
                        Zero-touch governance. Immutable audit trails. Deploy in 90 seconds.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="px-6 py-3 rounded-lg bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors">
                            Request Access
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-white/[0.05] text-white text-sm font-medium ring-1 ring-white/20 hover:bg-white/[0.08] transition-colors">
                            Read Documentation
                        </button>
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
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Changelog</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Roadmap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Developers</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">API Reference</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">CLI</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">SDKs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Security</a></li>
                                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">DPA</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
                        <span className="text-sm font-bold tracking-widest text-zinc-600">SOVEREIGN</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs text-zinc-500">System Status: Operational</span>
                        </div>
                        <span className="text-xs text-zinc-600">© 2026 Sovereign Systems, Inc.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
