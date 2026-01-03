"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Shield,
    Target,
    Briefcase,
    MessageSquare,
    Zap,
    Lock,
    TrendingUp,
    Bot,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Contract Shield",
        description:
            "AI analyzes every clause, identifies risks, and generates negotiation emails that protect your interests.",
        gradient: "from-cyan-500 to-blue-500",
        color: "cyan",
        stats: "50+ risk factors analyzed",
    },
    {
        icon: Target,
        title: "Client Radar",
        description:
            "Track relationships, analyze sentiment from communications, and never let a client slip through the cracks.",
        gradient: "from-amber-500 to-orange-500",
        color: "amber",
        stats: "Real-time health scoring",
    },
    {
        icon: Briefcase,
        title: "Lead Magnet",
        description:
            "Automatically capture and nurture leads with intelligent portfolio showcases and case studies.",
        gradient: "from-purple-500 to-pink-500",
        color: "purple",
        stats: "3x more qualified leads",
    },
    {
        icon: MessageSquare,
        title: "Proof Forge",
        description:
            "Collect testimonials effortlessly with magic link requests and build social proof that converts.",
        gradient: "from-rose-500 to-red-500",
        color: "rose",
        stats: "One-click testimonial flow",
    },
];

const capabilities = [
    { icon: Bot, text: "AI-Powered Analysis" },
    { icon: Lock, text: "Bank-Level Security" },
    { icon: TrendingUp, text: "Growth Insights" },
    { icon: Zap, text: "Lightning Fast" },
];

export function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" className="relative py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-sm font-medium text-brand-400">Features</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Four engines. One platform.
                        <br />
                        <span className="text-neutral-500">Zero busywork.</span>
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Everything you need to protect your business, attract clients, and
                        build lasting relationships—automated.
                    </p>
                </motion.div>

                {/* Features grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden h-full">
                                    {/* Gradient glow on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                                    />

                                    {/* Corner glow */}
                                    <div
                                        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                                    />

                                    <div className="relative">
                                        {/* Icon */}
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-6`}
                                        >
                                            <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center">
                                                <Icon className={`w-7 h-7 text-${feature.color}-400`} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-2xl font-semibold text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-neutral-400 leading-relaxed mb-4">
                                            {feature.description}
                                        </p>

                                        {/* Stats badge */}
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${feature.color}-500/10 border border-${feature.color}-500/20`}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-400`} />
                                            <span className={`text-sm text-${feature.color}-400`}>
                                                {feature.stats}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Capabilities bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-neutral-900/30 border border-white/5"
                >
                    {capabilities.map((capability, index) => {
                        const Icon = capability.icon;
                        return (
                            <div
                                key={capability.text}
                                className="flex items-center gap-3 text-neutral-400"
                            >
                                <Icon className="w-5 h-5 text-brand-400" />
                                <span className="text-sm font-medium">{capability.text}</span>
                                {index < capabilities.length - 1 && (
                                    <div className="hidden sm:block w-px h-4 bg-neutral-700 ml-6" />
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
