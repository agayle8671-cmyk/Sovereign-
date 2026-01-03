"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            title: "The Rise of the Sovereign Economy",
            excerpt: "How 1.57 billion freelancers are reshaping the global workforce.",
            date: "Jan 2, 2026",
            category: "Industry",
            readTime: "5 min read",
        },
        {
            title: "Contract Clauses Every Freelancer Must Know",
            excerpt: "The top 10 red flags our AI catches in client contracts.",
            date: "Dec 28, 2025",
            category: "Education",
            readTime: "8 min read",
        },
        {
            title: "Introducing Client Health Scoring",
            excerpt: "Predict churn before it happens with AI-powered relationship intelligence.",
            date: "Dec 15, 2025",
            category: "Product",
            readTime: "4 min read",
        },
        {
            title: "The Admin Tax: Why Freelancers Lose 50% of Their Time",
            excerpt: "Research reveals the hidden cost of running a business of one.",
            date: "Dec 1, 2025",
            category: "Research",
            readTime: "6 min read",
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
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Blog
                        </h1>
                        <p className="text-xl text-zinc-400">
                            Insights on freelancing, contracts, and the future of independent work.
                        </p>
                    </motion.div>

                    {/* Blog Posts */}
                    <div className="space-y-6">
                        {posts.map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/[0.05] hover:border-white/[0.1] transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-zinc-600">{post.date}</span>
                                    <span className="text-xs text-zinc-600">·</span>
                                    <span className="text-xs text-zinc-600">{post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-zinc-400 mb-4">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-sm text-emerald-400">
                                    Read more <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.article>
                        ))}
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
