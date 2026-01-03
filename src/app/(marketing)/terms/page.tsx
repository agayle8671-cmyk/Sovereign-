"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
                            Terms of Service
                        </h1>
                        <p className="text-zinc-400 mb-8">Last updated: January 1, 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <section>
                            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                By accessing or using Sovereign, you agree to be bound by these Terms of Service and
                                all applicable laws and regulations. If you do not agree with any of these terms,
                                you are prohibited from using this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Sovereign provides an autonomous commercial operating system for freelancers and
                                independent professionals, including contract analysis, client management,
                                portfolio generation, and testimonial collection tools powered by artificial intelligence.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside text-zinc-400 space-y-2">
                                <li>Maintaining the confidentiality of your account</li>
                                <li>All activities that occur under your account</li>
                                <li>Ensuring the accuracy of information you provide</li>
                                <li>Complying with all applicable laws and regulations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">4. AI-Generated Content</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Sovereign uses AI to analyze contracts and generate recommendations. While we strive
                                for accuracy, AI-generated content should not be considered legal advice. We recommend
                                consulting with a qualified attorney for high-stakes legal matters.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">5. Subscription and Billing</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel
                                at any time, and your subscription will remain active until the end of the current
                                billing period. Refunds are provided in accordance with our refund policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Sovereign shall not be liable for any indirect, incidental, special, consequential,
                                or punitive damages resulting from your use of or inability to use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of
                                material changes via email or through the service. Continued use after changes
                                constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                For questions about these Terms of Service, please contact us at legal@sovereign.app.
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
