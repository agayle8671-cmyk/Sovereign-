"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { springs } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
    {
        name: "Free",
        description: "Perfect for getting started",
        price: { monthly: 0, annually: 0 },
        icon: Sparkles,
        color: "neutral",
        features: [
            "3 contract analyses / month",
            "Up to 5 clients",
            "Basic portfolio (5 items)",
            "Email testimonial requests",
            "Community support",
        ],
        cta: "Get Started Free",
        href: "/signup",
    },
    {
        name: "Pro",
        description: "For serious freelancers",
        price: { monthly: 29, annually: 24 },
        icon: Zap,
        color: "indigo",
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
        href: "/signup?plan=pro",
    },
    {
        name: "Agency",
        description: "For teams and agencies",
        price: { monthly: 79, annually: 66 },
        icon: Crown,
        color: "amber",
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
        href: "/contact",
    },
];

export function PricingSection() {
    const [annual, setAnnual] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" ref={ref} className="relative py-32 bg-black">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={springs.smooth}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-neutral-400 mb-8">
                        Start free and scale as you grow. No hidden fees.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
                        <button
                            onClick={() => setAnnual(false)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                                !annual ? "bg-white text-black" : "text-neutral-400"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                annual ? "bg-white text-black" : "text-neutral-400"
                            )}
                        >
                            Annually
                            <span className="px-1.5 py-0.5 text-xs bg-emerald-500 text-white rounded">
                                -20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, i) => {
                        const Icon = plan.icon;
                        const price = annual ? plan.price.annually : plan.price.monthly;

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ ...springs.smooth, delay: i * 0.1 }}
                                className={cn(
                                    "relative rounded-2xl p-[1px]",
                                    plan.popular
                                        ? "bg-gradient-to-b from-indigo-500 to-indigo-500/0"
                                        : "bg-gradient-to-b from-white/10 to-white/0"
                                )}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-500 text-xs font-medium text-white">
                                        Most Popular
                                    </div>
                                )}

                                <div className="relative h-full rounded-2xl bg-neutral-950 p-6">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                                plan.color === "indigo"
                                                    ? "bg-indigo-500/20"
                                                    : plan.color === "amber"
                                                        ? "bg-amber-500/20"
                                                        : "bg-white/10"
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "w-5 h-5",
                                                    plan.color === "indigo"
                                                        ? "text-indigo-400"
                                                        : plan.color === "amber"
                                                            ? "text-amber-400"
                                                            : "text-neutral-400"
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{plan.name}</h3>
                                            <p className="text-sm text-neutral-500">{plan.description}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">${price}</span>
                                            {price > 0 && (
                                                <span className="text-neutral-500">/month</span>
                                            )}
                                        </div>
                                        {annual && price > 0 && (
                                            <p className="text-sm text-neutral-500">
                                                ${price * 12} billed annually
                                            </p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2 text-sm text-neutral-300"
                                            >
                                                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <Link href={plan.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={springs.snappy}
                                            className={cn(
                                                "w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors",
                                                plan.popular
                                                    ? "bg-indigo-500 hover:bg-indigo-400 text-white"
                                                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                            )}
                                        >
                                            {plan.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Badge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ ...springs.smooth, delay: 0.4 }}
                    className="text-center text-neutral-500 text-sm mt-10"
                >
                    All paid plans include a 14-day free trial. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}
