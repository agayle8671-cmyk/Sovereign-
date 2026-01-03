"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { springs } from "@/lib/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={ref} className="relative py-32 overflow-hidden">
            {/* Animated Background */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
                <div className="absolute inset-0 bg-black/80" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px]" />
            </motion.div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={springs.smooth}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-neutral-300">
                            Join 10,000+ freelancers
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Ready to take control
                        <br />
                        of your business?
                    </h2>

                    <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Start free today. No credit card required.
                        <br />
                        Set up in under 5 minutes.
                    </p>

                    {/* CTA Button */}
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springs.snappy}
                            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden"
                        >
                            {/* Animated gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-shimmer" />

                            {/* Glow */}
                            <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.5)]" />

                            <span className="relative">Get Started Free</span>
                            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </Link>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-white/10">
                        {[
                            { value: "4.9/5", label: "Average rating" },
                            { value: "$2.4M+", label: "Risk identified" },
                            { value: "SOC 2", label: "Certified" },
                        ].map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-2xl font-bold text-white">{item.value}</p>
                                <p className="text-sm text-neutral-500">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
