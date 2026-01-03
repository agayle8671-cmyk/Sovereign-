"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Users, Zap, Target } from "lucide-react";

export default function AboutPage() {
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
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            About Sovereign
                        </h1>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
                            The autonomous commercial operating system for freelancers, consultants, and independent professionals.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            We believe that independent professionals deserve the same operational
                            infrastructure as Fortune 500 companies. Sovereign eliminates the
                            &quot;admin tax&quot; that consumes up to 50% of freelancers&apos; productive time,
                            allowing them to focus on what they do best: creating value.
                        </p>
                    </motion.section>

                    {/* Values */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-16"
                    >
                        <h2 className="text-2xl font-semibold mb-8">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: Shield, title: "Security First", description: "Bank-grade encryption and SOC 2 Type II compliance. Your data is your data." },
                                { icon: Users, title: "Human in the Loop", description: "AI augments your decisions, never replaces your judgment on critical matters." },
                                { icon: Zap, title: "Speed is a Feature", description: "Every interaction optimized for velocity. Your time is your most valuable asset." },
                                { icon: Target, title: "Outcome Focused", description: "We measure success by your success: revenue protected, time saved, clients retained." },
                            ].map((value, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05]">
                                    <value.icon className="w-8 h-8 text-emerald-400 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                                    <p className="text-sm text-zinc-400">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Team */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">The Team</h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Sovereign is built by a team of former freelancers, agency operators,
                            and enterprise software engineers who experienced the &quot;admin tax&quot; firsthand.
                            We&apos;re backed by leading investors who believe in the future of independent work.
                        </p>
                    </motion.section>
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
