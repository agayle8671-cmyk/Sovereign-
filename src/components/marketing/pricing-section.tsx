"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

const tiers = [
    {
        name: "Free",
        id: "free",
        price: { monthly: 0, annual: 0 },
        description: "Perfect for getting started with contract analysis.",
        features: [
            "5 contract scans per month",
            "Basic risk detection",
            "Portfolio builder (3 items)",
            "Community support",
        ],
        cta: "Start Free",
        highlighted: false,
    },
    {
        name: "Pro",
        id: "pro",
        price: { monthly: 49, annual: 39 },
        description: "Everything you need to run your freelance business.",
        features: [
            "Unlimited contract scans",
            "Real-time scope defense",
            "Automated testimonial collection",
            "Client sentiment tracking",
            "AI negotiation drafts",
            "Dynamic portfolio pages",
            "Priority support",
        ],
        cta: "Start 14-day trial",
        highlighted: true,
        badge: "Most Popular",
    },
    {
        name: "Business",
        id: "business",
        price: { monthly: 199, annual: 159 },
        description: "For agencies and teams of sovereign professionals.",
        features: [
            "Everything in Pro",
            "Real-time negotiation coach",
            "Forge Core (productization)",
            "Multi-user seats (up to 5)",
            "Team analytics dashboard",
            "Custom integrations",
            "Dedicated account manager",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        highlighted: false,
    },
];

export function PricingSection() {
    const [annual, setAnnual] = useState(true);

    return (
        <section id="pricing" className="py-20 lg:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        PRICING
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-neutral-400"
                    >
                        Start free, upgrade when you need more power.
                    </motion.p>

                    {/* Billing toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex items-center justify-center gap-4"
                    >
                        <span
                            className={cn(
                                "text-sm",
                                !annual ? "text-white" : "text-neutral-400"
                            )}
                        >
                            Monthly
                        </span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className={cn(
                                "relative w-14 h-8 rounded-full transition-colors",
                                annual ? "bg-brand-500" : "bg-neutral-700"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 w-6 h-6 rounded-full bg-white transition-transform",
                                    annual ? "left-7" : "left-1"
                                )}
                            />
                        </button>
                        <span
                            className={cn(
                                "text-sm",
                                annual ? "text-white" : "text-neutral-400"
                            )}
                        >
                            Annual
                            <Badge variant="success" size="sm" className="ml-2">
                                Save 20%
                            </Badge>
                        </span>
                    </motion.div>
                </div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            className={cn(
                                "relative rounded-2xl border p-8",
                                tier.highlighted
                                    ? "border-brand-500/50 bg-brand-500/5"
                                    : "border-neutral-800 bg-neutral-900/50"
                            )}
                        >
                            {tier.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge variant="primary">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        {tier.badge}
                                    </Badge>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-sm text-neutral-400 mb-4">
                                    {tier.description}
                                </p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        ${annual ? tier.price.annual : tier.price.monthly}
                                    </span>
                                    {tier.price.monthly > 0 && (
                                        <span className="text-neutral-400">/month</span>
                                    )}
                                </div>
                                {annual && tier.price.monthly > 0 && (
                                    <p className="text-sm text-neutral-500 mt-1">
                                        Billed annually (${tier.price.annual * 12}/year)
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                        <span className="text-sm text-neutral-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={tier.highlighted ? "default" : "outline"}
                                asChild
                            >
                                <Link href={tier.id === "business" ? "/contact" : "/signup"}>
                                    {tier.cta}
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
