"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "0",
        description: "For new freelancers",
        features: ["3 Contracts/mo", "Basic Portfolio", "Email Support"],
        featured: false,
    },
    {
        name: "Pro",
        price: "29",
        description: "For growing businesses",
        features: ["Unlimited Contracts", "AI Negotiation", "Client Radar", "Priority Support"],
        featured: true,
    },
    {
        name: "Agency",
        price: "99",
        description: "For scaling teams",
        features: ["Everything in Pro", "White Labeling", "API Access", "Dedicated Success Manager"],
        featured: false,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-4">
                        Simple Pricing
                    </h2>
                    <p className="text-neutral-400">Start for free, scale as you grow.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-3xl border flex flex-col ${plan.featured
                                    ? "bg-white/5 border-white/10 shadow-2xl shadow-purple-500/10"
                                    : "bg-black border-white/5"
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-neutral-500">/mo</span>
                                </div>
                                <p className="text-sm text-neutral-500 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                                        <Check className="w-4 h-4 text-emerald-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${plan.featured
                                        ? "bg-white text-black hover:bg-neutral-200"
                                        : "bg-white/5 text-white hover:bg-white/10 border border-white/5"
                                    }`}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
