"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Server, Eye, FileCheck, UserCheck } from "lucide-react";

export default function SecurityPage() {
    const securityFeatures = [
        {
            icon: Lock,
            title: "AES-256 Encryption",
            description: "All data encrypted at rest using bank-grade AES-256 encryption.",
        },
        {
            icon: Shield,
            title: "SOC 2 Type II Compliant",
            description: "Audited annually by independent third parties for security controls.",
        },
        {
            icon: Server,
            title: "Secure Infrastructure",
            description: "Hosted on AWS with isolated VPCs, WAF, and DDoS protection.",
        },
        {
            icon: Eye,
            title: "Zero-Knowledge Processing",
            description: "Your contract data is never used to train AI models.",
        },
        {
            icon: FileCheck,
            title: "GDPR & CCPA Compliant",
            description: "Full data rights including access, correction, and deletion.",
        },
        {
            icon: UserCheck,
            title: "Role-Based Access",
            description: "Granular permissions for team members and external collaborators.",
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">S</span>
                        </div>
                        <span className="text-sm font-bold tracking-wide">SOVEREIGN</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" />
                            Enterprise-Grade Security
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Your Data, Protected
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Sovereign is built on a foundation of security and privacy.
                            We treat your business data with the same care as a bank treats your money.
                        </p>
                    </motion.div>

                    {/* Security Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {securityFeatures.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05]"
                            >
                                <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
                                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                                <p className="text-sm text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center"
                    >
                        <h3 className="text-lg font-semibold mb-4">Report a Vulnerability</h3>
                        <p className="text-zinc-400 mb-4">
                            Found a security issue? We appreciate responsible disclosure.
                            Contact our security team directly.
                        </p>
                        <a
                            href="mailto:security@sovereign.app"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors"
                        >
                            security@sovereign.app
                        </a>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-600">
                    © {new Date().getFullYear()} Sovereign. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
