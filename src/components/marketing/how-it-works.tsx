"use client";

import { motion } from "framer-motion";
import { Download, Link, Sparkles, Check } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Install the Extension",
        description:
            "Sovereign lives where you work—Gmail, Slack, and as a universal sidebar. One-click installation, zero configuration.",
        icon: Download,
    },
    {
        number: "02",
        title: "Connect Your Tools",
        description:
            "Link your existing accounts and upload past contracts. Sovereign learns your preferences and builds your business context.",
        icon: Link,
    },
    {
        number: "03",
        title: "Let Sovereign Work",
        description:
            "From day one, Sovereign monitors, protects, and grows your business automatically. You focus on the work you love.",
        icon: Sparkles,
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-20 lg:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        HOW IT WORKS
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        Up and running in minutes
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="relative"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-neutral-700 to-transparent" />
                            )}

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-neutral-800 border border-neutral-700 mb-6 relative">
                                    <step.icon className="w-10 h-10 text-brand-500" />
                                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
