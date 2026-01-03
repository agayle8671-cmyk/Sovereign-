"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-500/10 via-transparent to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-3xl opacity-30" />

            <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 mb-8 shadow-glow">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to take control of
                        <br />
                        <span className="text-gradient-brand">your business?</span>
                    </h2>

                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
                        Join 10,000+ sovereign professionals who've reclaimed their time
                        and protected their income with Sovereign.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="xl" asChild>
                            <Link href="/signup">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button size="xl" variant="outline" asChild>
                            <Link href="/demo">Book a Demo</Link>
                        </Button>
                    </div>

                    <p className="text-sm text-neutral-500 mt-6">
                        No credit card required • Free forever plan available
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
