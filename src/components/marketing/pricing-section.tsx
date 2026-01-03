"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
    {
        name: "Free",
        description: "Perfect for getting started",
        price: { monthly: 0, annually: 0 },
        icon: Sparkles,
        gradient: "from-neutral-500 to-neutral-600",
        features: [
            "3 contract analyses / month",
            "Up to 5 clients",
            "Basic portfolio (5 items)",
            "Email testimonial requests",
            "Community support",
        ],
        cta: "Get Started Free",
        ctaVariant: "outline" as const,
    },
    {
        name: "Pro",
        description: "For serious freelancers",
        price: { monthly: 29, annually: 24 },
        icon: Zap,
        gradient: "from-brand-500 to-brand-600",
        popular: true,
        features: [
            "Unlimited contract analyses",
            "Unlimited clients",
            "Unlimited portfolio items",
            "AI negotiation emails",
            "Client health scoring",
            "Video testimonials",
            "Priority support",
            "API access",
        ],
        cta: "Start Pro Trial",
        ctaVariant: "primary" as const,
    },
    {
        name: "Agency",
        description: "For teams and agencies",
        price: { monthly: 79, annually: 66 },
        icon: Crown,
        gradient: "from-amber-500 to-orange-500",
        features: [
            "Everything in Pro",
            "Up to 5 team members",
            "White-label portfolio",
            "Custom branding",
            "Advanced analytics",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        ctaVariant: "outline" as const,
    },
];

export function PricingSection() {
    const [annual, setAnnual] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" className="relative py-32">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-neutral-400 mb-8">
                        Start free and scale as you grow. No hidden fees, no surprises.
                    </p>

                    {/* Billing toggle */}
                    <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-neutral-900/50 border border-white/10">
                        <button
                            onClick={() => setAnnual(false)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                                !annual
                                    ? "bg-white text-neutral-900"
                                    : "text-neutral-400 hover:text-white"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                annual
                                    ? "bg-white text-neutral-900"
                                    : "text-neutral-400 hover:text-white"
                            )}
                        >
                            Annually
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        const price = annual ? plan.price.annually : plan.price.monthly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={cn(
                                    "relative rounded-3xl p-[1px] bg-gradient-to-b",
                                    plan.popular
                                        ? "from-brand-500/50 via-brand-500/10 to-transparent"
                                        : "from-white/10 to-transparent"
                                )}
                            >
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-sm font-medium text-white shadow-lg shadow-brand-500/25">
                                        Most Popular
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "relative rounded-3xl p-8 h-full",
                                        plan.popular ? "bg-neutral-900" : "bg-neutral-900/50"
                                    )}
                                >
                                    {/* Icon & Name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} p-[1px]`}
                                        >
                                            <div className="w-full h-full rounded-xl bg-neutral-900 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {plan.name}
                                            </h3>
                                            <p className="text-sm text-neutral-500">
                                                {plan.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-white">
                                                ${price}
                                            </span>
                                            {price > 0 && (
                                                <span className="text-neutral-500">/month</span>
                                            )}
                                        </div>
                                        {annual && price > 0 && (
                                            <p className="text-sm text-neutral-500 mt-1">
                                                Billed annually (${price * 12}/year)
                                            </p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-neutral-300"
                                            >
                                                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link
                                        href={plan.name === "Agency" ? "/contact" : "/signup"}
                                        className={cn(
                                            "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-medium transition-all",
                                            plan.ctaVariant === "primary"
                                                ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25"
                                                : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                        )}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Money-back guarantee */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-neutral-500 mt-10"
                >
                    All paid plans include a 14-day free trial. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}
