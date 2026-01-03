"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Shield,
    Magnet,
    Radio,
    Hammer,
    FileText,
    Users,
    TrendingUp,
    Package,
    Check,
} from "lucide-react";

const cores = [
    {
        id: "shield",
        name: "Shield Core",
        tagline: "Your General Counsel + Project Manager",
        description:
            "Defend your business from risky contracts and scope creep with AI-powered legal analysis and real-time monitoring.",
        icon: Shield,
        color: "shield",
        features: [
            "Contract risk analysis in seconds",
            "Real-time scope creep detection",
            "Automated change order generation",
            "Negotiation email drafting",
            "Payment term benchmarking",
        ],
        stats: { value: "$15K+", label: "Average risk prevented per user" },
    },
    {
        id: "magnet",
        name: "Magnet Core",
        tagline: "Your CMO + Sales Director",
        description:
            "Automate your sales pipeline and social proof collection with AI-personalized portfolios and frictionless testimonials.",
        icon: Magnet,
        color: "magnet",
        features: [
            "AI-personalized portfolio for every lead",
            "Automatic testimonial collection",
            "Video testimonial capture",
            "Lead enrichment & scoring",
            "Dynamic pitch page generation",
        ],
        stats: { value: "3x", label: "Increase in conversion rate" },
    },
    {
        id: "radar",
        name: "Radar Core",
        tagline: "Your Account Manager",
        description:
            "Monitor client relationships and predict issues before they happen with sentiment analysis and health scoring.",
        icon: Radio,
        color: "radar",
        features: [
            "Client sentiment tracking",
            "Churn risk prediction",
            "Real-time negotiation coaching",
            "Response time analytics",
            "Relationship health scoring",
        ],
        stats: { value: "40%", label: "Reduction in client churn" },
    },
    {
        id: "forge",
        name: "Forge Core",
        tagline: "Your R&D Lab",
        description:
            "Transform your service byproducts into sellable micro-SaaS products with automated packaging and launch optimization.",
        icon: Hammer,
        color: "forge",
        features: [
            "Asset pattern detection",
            "One-click productization",
            "Automated documentation",
            "Launch timing optimization",
            "Revenue diversification",
        ],
        stats: { value: "$2K+", label: "Average monthly passive income" },
    },
];

const colorMap = {
    shield: {
        bg: "bg-shield/10",
        border: "border-shield/30",
        text: "text-shield",
        glow: "shadow-glow-shield",
        gradient: "from-shield to-shield-dark",
    },
    magnet: {
        bg: "bg-magnet/10",
        border: "border-magnet/30",
        text: "text-magnet",
        glow: "shadow-glow-magnet",
        gradient: "from-magnet to-magnet-dark",
    },
    radar: {
        bg: "bg-radar/10",
        border: "border-radar/30",
        text: "text-radar",
        glow: "shadow-glow-radar",
        gradient: "from-radar to-radar-dark",
    },
    forge: {
        bg: "bg-forge/10",
        border: "border-forge/30",
        text: "text-forge",
        glow: "shadow-glow-forge",
        gradient: "from-forge to-forge-dark",
    },
};

export function FeaturesSection() {
    const [activeCore, setActiveCore] = useState(cores[0]);
    const colors = colorMap[activeCore.color as keyof typeof colorMap];

    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background glow */}
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 transition-colors duration-500",
                    colors.bg
                )}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        THE FOUR CORES
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        One platform. Four intelligent engines.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-neutral-400"
                    >
                        Each core handles a critical aspect of your business, working
                        together as a unified system.
                    </motion.p>
                </div>

                {/* Core tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {cores.map((core) => {
                        const coreColors = colorMap[core.color as keyof typeof colorMap];
                        const isActive = activeCore.id === core.id;
                        return (
                            <button
                                key={core.id}
                                onClick={() => setActiveCore(core)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? `${coreColors.bg} ${coreColors.text} ${coreColors.border} border`
                                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                                )}
                            >
                                <core.icon className="w-4 h-4" />
                                {core.name}
                            </button>
                        );
                    })}
                </div>

                {/* Active core content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCore.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left - Info */}
                        <div>
                            <div
                                className={cn(
                                    "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6",
                                    `bg-gradient-to-br ${colors.gradient}`
                                )}
                            >
                                <activeCore.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {activeCore.name}
                            </h3>
                            <p className={cn("text-lg font-medium mb-4", colors.text)}>
                                {activeCore.tagline}
                            </p>
                            <p className="text-neutral-400 mb-8">{activeCore.description}</p>

                            <ul className="space-y-3 mb-8">
                                {activeCore.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full flex items-center justify-center",
                                                colors.bg
                                            )}
                                        >
                                            <Check className={cn("w-3 h-3", colors.text)} />
                                        </div>
                                        <span className="text-neutral-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className={cn(
                                    "inline-flex items-center gap-4 px-6 py-4 rounded-xl border",
                                    colors.bg,
                                    colors.border
                                )}
                            >
                                <span className={cn("text-3xl font-bold", colors.text)}>
                                    {activeCore.stats.value}
                                </span>
                                <span className="text-neutral-400">
                                    {activeCore.stats.label}
                                </span>
                            </div>
                        </div>

                        {/* Right - Visual */}
                        <div className="relative">
                            <div
                                className={cn(
                                    "aspect-square rounded-2xl border backdrop-blur-xl p-8",
                                    colors.border,
                                    "bg-neutral-900/50"
                                )}
                            >
                                {/* Placeholder for feature illustration */}
                                <div className="h-full rounded-xl bg-neutral-800/50 flex items-center justify-center">
                                    <activeCore.icon
                                        className={cn("w-24 h-24 opacity-20", colors.text)}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
