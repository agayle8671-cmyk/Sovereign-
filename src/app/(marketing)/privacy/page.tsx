"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-zinc-400 mb-8">Last updated: January 1, 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="prose prose-invert prose-zinc max-w-none"
                    >
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                We collect information you provide directly to us, such as when you create an account,
                                use our services, or contact us for support. This includes:
                            </p>
                            <ul className="list-disc list-inside text-zinc-400 space-y-2">
                                <li>Account information (name, email, password)</li>
                                <li>Contract and document data you upload</li>
                                <li>Client information you store in our system</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We use the information we collect to provide, maintain, and improve our services,
                                to process transactions, to send you technical notices and support messages,
                                and to respond to your comments and questions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We implement industry-standard security measures including AES-256 encryption for data
                                at rest and TLS 1.3 for data in transit. We are SOC 2 Type II compliant and undergo
                                regular third-party security audits.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">4. Data Retention</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We retain your information for as long as your account is active or as needed to
                                provide you services. You can request deletion of your data at any time by contacting
                                support@sovereign.app.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                You have the right to access, correct, or delete your personal information.
                                You can also object to or restrict certain processing of your data.
                                Contact us at privacy@sovereign.app to exercise these rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at
                                privacy@sovereign.app.
                            </p>
                        </section>
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
