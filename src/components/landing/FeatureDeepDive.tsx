"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Target, Briefcase, MessageSquare } from "lucide-react";

const features = [
    {
        id: "shield",
        icon: Shield,
        name: "Contract Shield",
        headline: "Catch the traps\nbefore they catch you.",
        description: "Every clause analyzed. Every risk flagged. Every negotiation point identified.",
        color: "from-cyan-500 to-blue-500",
        stat: { value: "$847", label: "avg savings per contract" },
    },
    {
        id: "radar",
        icon: Target,
        name: "Client Radar",
        headline: "Know who's happy.\nKnow who's not.",
        description: "Real-time health scores for every relationship. Predict problems before they happen.",
        color: "from-amber-500 to-orange-500",
        stat: { value: "94%", label: "prediction accuracy" },
    },
    {
        id: "magnet",
        icon: Briefcase,
        name: "Lead Magnet",
        headline: "Your work sells.\nWhile you sleep.",
        description: "AI-powered portfolio that converts visitors into clients automatically.",
        color: "from-purple-500 to-pink-500",
        stat: { value: "3.2x", label: "more qualified leads" },
    },
    {
        id: "forge",
        icon: MessageSquare,
        name: "Proof Forge",
        headline: "Social proof.\nOn autopilot.",
        description: "One-click testimonial collection. Video or text. In under 2 minutes.",
        color: "from-rose-500 to-red-500",
        stat: { value: "8x", label: "faster collection" },
    },
];

export function FeatureDeepDive() {
    return (
        <section id="features" className="relative">
            {features.map((feature, index) => (
                <FeatureSlide key={feature.id} feature={feature} index={index} />
            ))}
        </section>
    );
}

function FeatureSlide({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [100, 0, 0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]);

    const Icon = feature.icon;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center py-32"
        >
            <motion.div
                style={{ opacity, y, scale }}
                className="max-w-5xl mx-auto px-6 text-center"
            >
                {/* Feature label */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white/60">{feature.name}</span>
                </div>

                {/* Massive headline */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 whitespace-pre-line">
                    {feature.headline}
                </h2>

                {/* Description */}
                <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12">
                    {feature.description}
                </p>

                {/* Stat */}
                <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.stat.value}
                    </span>
                    <span className="text-white/40">{feature.stat.label}</span>
                </div>
            </motion.div>
        </section>
    );
}
