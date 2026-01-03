"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";

export function PricingSection() {
    const [annual, setAnnual] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

    const price = annual ? 24 : 29;

    return (
        <section
            id="pricing"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center py-32"
        >
            <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto px-6">
                {/* Simple headline */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        Simple pricing.
                    </h2>
                    <p className="text-xl text-white/50">
                        Start free. Upgrade when you're ready.
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-lg ${!annual ? "text-white" : "text-white/40"}`}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setAnnual(!annual)}
                        className="relative w-16 h-8 rounded-full bg-white/10 p-1"
                    >
                        <motion.div
                            animate={{ x: annual ? 32 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-6 h-6 rounded-full bg-white"
                        />
                    </button>
                    <span className={`text-lg ${annual ? "text-white" : "text-white/40"}`}>
                        Annual <span className="text-emerald-400 text-sm ml-1">-20%</span>
                    </span>
                </div>

                {/* Two-column pricing */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Free */}
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10">
                        <p className="text-sm text-white/40 uppercase tracking-wider mb-4">Free</p>
                        <p className="text-6xl font-bold mb-2">$0</p>
                        <p className="text-white/40 mb-8">Forever free</p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "3 contract analyses / month",
                                "5 clients",
                                "Basic portfolio",
                                "Email testimonials",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-white/70">
                                    <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/signup" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                            >
                                Get Started Free
                            </motion.button>
                        </Link>
                    </div>

                    {/* Pro */}
                    <div className="relative p-8 rounded-3xl bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30">
                        {/* Popular badge - FIXED positioning */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium text-white z-10">
                            Most Popular
                        </div>

                        <p className="text-sm text-purple-400 uppercase tracking-wider mb-4">Pro</p>
                        <div className="flex items-baseline gap-2 mb-2">
                            <p className="text-6xl font-bold">${price}</p>
                            <span className="text-white/40">/month</span>
                        </div>
                        <p className="text-white/40 mb-8">
                            {annual ? `$${price * 12} billed annually` : "Billed monthly"}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Unlimited contract analyses",
                                "Unlimited clients",
                                "AI negotiation emails",
                                "Client health scoring",
                                "Video testimonials",
                                "Priority support",
                                "API access",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-white/70">
                                    <Check className="w-5 h-5 text-purple-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link href="/signup?plan=pro" className="block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-colors"
                            >
                                Start 14-Day Free Trial
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Enterprise note */}
                <p className="text-center text-white/40 mt-12">
                    Need more? <Link href="/contact" className="text-white underline">Contact us</Link> for enterprise pricing.
                </p>
            </motion.div>
        </section>
    );
}
