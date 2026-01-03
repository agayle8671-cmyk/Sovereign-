"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Play, ArrowRight, Shield, Magnet, Radio, Check } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl opacity-20" />
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-shield/30 rounded-full blur-3xl opacity-20" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="primary" className="mb-6">
                            <span className="mr-2">✨</span>
                            Now with AI-powered contract negotiation
                            <ArrowRight className="w-3 h-3 ml-2" />
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                    >
                        The Operating System for{" "}
                        <span className="text-gradient-brand">the Business of One</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto"
                    >
                        Sovereign automates 50% of your admin work. Defend contracts.
                        Generate leads. Collect proof. All from one intelligent sidebar that
                        lives where you work.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="xl" asChild>
                            <Link href="/signup">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button size="xl" variant="outline" asChild>
                            <Link href="#demo">
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex flex-col items-center"
                    >
                        <p className="text-sm text-neutral-400 mb-4">
                            Trusted by 10,000+ independent professionals
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-900"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-yellow-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-sm font-medium text-white ml-1">4.9</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image/Demo */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-16 lg:mt-24"
                >
                    <div className="relative mx-auto max-w-5xl">
                        {/* Browser frame */}
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                            {/* Browser header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 rounded-md bg-neutral-800 text-xs text-neutral-400">
                                        app.sovereign.com/dashboard
                                    </div>
                                </div>
                            </div>
                            {/* Dashboard preview */}
                            <div className="aspect-[16/9] bg-neutral-950 p-4">
                                <div className="h-full rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 mb-4">
                                            <Shield className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-neutral-400">
                                            Interactive demo coming soon
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="absolute -left-4 top-1/4 hidden lg:block"
                        >
                            <div className="p-4 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 shadow-xl w-64">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-shield/20 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-shield" />
                                    </div>
                                    <span className="text-sm font-medium text-white">
                                        Contract Scanned
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400">
                                    Found 3 risk clauses. Auto-generating counter-proposal...
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="absolute -right-4 top-1/2 hidden lg:block"
                        >
                            <div className="p-4 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 shadow-xl w-64">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-magnet/20 flex items-center justify-center">
                                        <Magnet className="w-4 h-4 text-magnet" />
                                    </div>
                                    <span className="text-sm font-medium text-white">
                                        New Testimonial
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400">
                                    Video testimonial collected from TechStart. Added to portfolio.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
