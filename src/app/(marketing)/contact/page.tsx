"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
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
                            Contact Us
                        </h1>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
                            Have questions? We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Methods */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05]">
                                <Mail className="w-6 h-6 text-emerald-400 mb-3" />
                                <h3 className="font-medium mb-1">Email</h3>
                                <p className="text-sm text-zinc-400">support@sovereign.app</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05]">
                                <MessageSquare className="w-6 h-6 text-cyan-400 mb-3" />
                                <h3 className="font-medium mb-1">Live Chat</h3>
                                <p className="text-sm text-zinc-400">Available Mon-Fri, 9am-6pm EST</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05]">
                                <Clock className="w-6 h-6 text-amber-400 mb-3" />
                                <h3 className="font-medium mb-1">Response Time</h3>
                                <p className="text-sm text-zinc-400">Typically within 24 hours</p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors"
                            >
                                Send Message
                            </button>
                        </motion.form>
                    </div>
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
