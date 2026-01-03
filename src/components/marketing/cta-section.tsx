"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-cyan-500/20" />
                <div className="absolute inset-0 bg-neutral-950/90" />
            </div>

            {/* Animated orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse animation-delay-2000" />

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-medium text-brand-400">
                            Join 10,000+ freelancers
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Ready to take control
                        <br />
                        of your business?
                    </h2>

                    <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Start free today. No credit card required. Set up in under 5
                        minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden"
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-500 bg-[length:200%_100%] animate-gradient" />

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {/* Shadow */}
                            <div className="absolute inset-0 shadow-[0_0_40px_8px_rgba(99,102,241,0.4)] rounded-full" />

                            <span className="relative">Get Started Free</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="#pricing"
                            className="px-8 py-4 text-lg font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            View Pricing
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-white/5">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">4.9/5</p>
                            <p className="text-sm text-neutral-500">Average rating</p>
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">$2.4M+</p>
                            <p className="text-sm text-neutral-500">Risk identified</p>
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden sm:block" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">SOC 2</p>
                            <p className="text-sm text-neutral-500">Certified</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
