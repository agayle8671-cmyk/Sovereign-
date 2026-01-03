"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
    Shield,
    Target,
    Briefcase,
    MessageSquare,
    ArrowRight,
    CheckCircle,
    Zap,
    Lock,
    TrendingUp,
    Users,
    Star,
    AlertTriangle,
} from "lucide-react";

const features = [
    {
        id: "shield",
        name: "Contract Shield",
        icon: Shield,
        color: "cyan",
        gradient: "from-cyan-500 to-blue-500",
        tagline: "Never sign a bad contract again",
        description:
            "AI analyzes every clause, identifies risks, and generates negotiation emails that protect your interests. Catch liability traps before they catch you.",
        benefits: [
            "50+ risk factors analyzed automatically",
            "Plain English explanations of legal jargon",
            "AI-generated counter-offer emails",
            "Version comparison and change tracking",
        ],
        stat: { value: "$847", label: "avg risk identified per contract" },
    },
    {
        id: "radar",
        name: "Client Radar",
        icon: Target,
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
        tagline: "Know your clients better than they know themselves",
        description:
            "Track relationships, analyze communication sentiment, and get early warnings before clients become problems. Never be blindsided again.",
        benefits: [
            "Real-time relationship health scoring",
            "Communication sentiment analysis",
            "Payment behavior tracking",
            "Churn prediction alerts",
        ],
        stat: { value: "94%", label: "accuracy in predicting client issues" },
    },
    {
        id: "magnet",
        name: "Lead Magnet",
        icon: Briefcase,
        color: "purple",
        gradient: "from-purple-500 to-pink-500",
        tagline: "Turn your work into a lead generation machine",
        description:
            "Automatically capture and nurture leads with intelligent portfolio showcases. Your best work does the selling while you sleep.",
        benefits: [
            "Auto-generated case studies",
            "SEO-optimized portfolio pages",
            "Lead capture forms with smart follow-up",
            "Analytics on what converts",
        ],
        stat: { value: "3.2x", label: "more qualified leads on average" },
    },
    {
        id: "forge",
        name: "Proof Forge",
        icon: MessageSquare,
        color: "rose",
        gradient: "from-rose-500 to-red-500",
        tagline: "Social proof that actually converts",
        description:
            "Collect testimonials effortlessly with magic link requests. Video or text, your clients can leave reviews in under 2 minutes.",
        benefits: [
            "One-click testimonial requests",
            "Video testimonial support",
            "Auto-generated review widgets",
            "Smart timing suggestions",
        ],
        stat: { value: "8x", label: "faster testimonial collection" },
    },
    {
        id: "test",
        name: "Test",
        icon: Users,
        color: "green",
        gradient: "from-green-500 to-emerald-500",
        tagline: "A test feature",
        description: "This is a test feature description.",
        benefits: ["Benefit 1", "Benefit 2"],
        stat: { value: "100%", label: "test success rate" },
    },
];

export function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState(features[0]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="features"
            ref={ref}
            className="relative py-32 bg-black overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        background: `radial-gradient(ellipse at 50% 50%, ${activeFeature.color === "cyan"
                                ? "rgba(6, 182, 212, 0.08)"
                                : activeFeature.color === "amber"
                                    ? "rgba(245, 158, 11, 0.08)"
                                    : activeFeature.color === "purple"
                                        ? "rgba(168, 85, 247, 0.08)"
                                        : "rgba(244, 63, 94, 0.08)"
                            } 0%, transparent 70%)`,
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={springs.smooth}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Zap className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-neutral-300">Four Powerful Engines</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Everything you need.
                        <br />
                        <span className="text-neutral-500">Nothing you don't.</span>
                    </h2>
                </motion.div>

                {/* Feature Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...springs.smooth, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {features.slice(0, 4).map((feature) => {
                        const Icon = feature.icon;
                        const isActive = activeFeature.id === feature.id;

                        return (
                            <motion.button
                                key={feature.id}
                                onClick={() => setActiveFeature(feature)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={springs.snappy}
                                className={cn(
                                    "relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors",
                                    isActive
                                        ? "text-white"
                                        : "text-neutral-400 hover:text-white bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={cn(
                                            "absolute inset-0 rounded-xl bg-gradient-to-r",
                                            feature.gradient
                                        )}
                                        transition={springs.smooth}
                                    />
                                )}
                                <Icon className="relative w-5 h-5" />
                                <span className="relative hidden sm:inline">{feature.name}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Feature Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFeature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={springs.smooth}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left - Feature Details */}
                        <div>
                            <div
                                className={cn(
                                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6",
                                    `bg-${activeFeature.color}-500/10`
                                )}
                            >
                                <activeFeature.icon
                                    className={cn("w-4 h-4", `text-${activeFeature.color}-400`)}
                                />
                                <span className={cn("text-sm", `text-${activeFeature.color}-400`)}>
                                    {activeFeature.name}
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {activeFeature.tagline}
                            </h3>

                            <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                                {activeFeature.description}
                            </p>

                            <ul className="space-y-4 mb-8">
                                {activeFeature.benefits.map((benefit, i) => (
                                    <motion.li
                                        key={benefit}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ ...springs.smooth, delay: i * 0.08 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle
                                            className={cn(
                                                "w-5 h-5 mt-0.5 shrink-0",
                                                `text-${activeFeature.color}-400`
                                            )}
                                        />
                                        <span className="text-neutral-300">{benefit}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Stat */}
                            <div
                                className={cn(
                                    "inline-flex items-center gap-4 px-5 py-4 rounded-2xl",
                                    `bg-${activeFeature.color}-500/10 border border-${activeFeature.color}-500/20`
                                )}
                            >
                                <div
                                    className={cn(
                                        "text-3xl font-bold",
                                        `text-${activeFeature.color}-400`
                                    )}
                                >
                                    {activeFeature.stat.value}
                                </div>
                                <div className="text-sm text-neutral-400">
                                    {activeFeature.stat.label}
                                </div>
                            </div>
                        </div>

                        {/* Right - Visual */}
                        <div className="relative">
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-3xl blur-3xl opacity-20",
                                    `bg-gradient-to-br ${activeFeature.gradient}`
                                )}
                            />
                            <div className="relative rounded-3xl bg-neutral-900/50 border border-white/10 p-8 min-h-[400px]">
                                <FeatureVisual feature={activeFeature} />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

function FeatureVisual({ feature }: { feature: (typeof features)[0] }) {
    if (feature.id === "shield") {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-medium text-white">Risk Analysis</p>
                            <p className="text-sm text-neutral-500">Contract_v2.pdf</p>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-amber-400">67%</div>
                </div>
                <div className="space-y-3">
                    {[
                        { label: "Unlimited revisions clause", severity: "high" },
                        { label: "NET-60 payment terms", severity: "medium" },
                        { label: "Missing kill fee", severity: "high" },
                        { label: "IP rights secured", severity: "good" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "p-3 rounded-xl border",
                                item.severity === "high"
                                    ? "bg-red-500/10 border-red-500/20"
                                    : item.severity === "medium"
                                        ? "bg-amber-500/10 border-amber-500/20"
                                        : "bg-emerald-500/10 border-emerald-500/20"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {item.severity === "good" ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                ) : (
                                    <AlertTriangle
                                        className={cn(
                                            "w-4 h-4",
                                            item.severity === "high" ? "text-red-400" : "text-amber-400"
                                        )}
                                    />
                                )}
                                <span
                                    className={cn(
                                        "text-sm",
                                        item.severity === "good"
                                            ? "text-emerald-400"
                                            : item.severity === "high"
                                                ? "text-red-400"
                                                : "text-amber-400"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    if (feature.id === "radar") {
        return (
            <div className="space-y-4">
                <div className="text-sm text-neutral-500 mb-4">Client Health Overview</div>
                <div className="space-y-3">
                    {[
                        { name: "Acme Corp", health: 92, trend: "up" },
                        { name: "TechStart Inc", health: 78, trend: "down" },
                        { name: "Design Studio", health: 85, trend: "up" },
                        { name: "StartupXYZ", health: 45, trend: "down" },
                    ].map((client, i) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-xl bg-white/5"
                        >
                            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-medium">
                                {client.name[0]}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white">{client.name}</p>
                                <div className="h-1.5 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${client.health}%` }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                        className={cn(
                                            "h-full rounded-full",
                                            client.health >= 80
                                                ? "bg-emerald-500"
                                                : client.health >= 60
                                                    ? "bg-amber-500"
                                                    : "bg-red-500"
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <TrendingUp
                                    className={cn(
                                        "w-4 h-4",
                                        client.trend === "up" ? "text-emerald-400" : "text-red-400 rotate-180"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        client.health >= 80
                                            ? "text-emerald-400"
                                            : client.health >= 60
                                                ? "text-amber-400"
                                                : "text-red-400"
                                    )}
                                >
                                    {client.health}%
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    if (feature.id === "magnet") {
        return (
            <div className="space-y-4">
                <div className="text-sm text-neutral-500 mb-4">Portfolio Performance</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-white/5">
                        <p className="text-2xl font-bold text-purple-400">847</p>
                        <p className="text-xs text-neutral-500">Portfolio views</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                        <p className="text-2xl font-bold text-pink-400">23</p>
                        <p className="text-xs text-neutral-500">Leads this month</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {[
                        { project: "E-commerce Redesign", views: 234, leads: 8 },
                        { project: "Brand Identity", views: 189, leads: 5 },
                        { project: "Mobile App UI", views: 156, leads: 4 },
                    ].map((item, i) => (
                        <motion.div
                            key={item.project}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                        >
                            <span className="text-sm text-white">{item.project}</span>
                            <div className="flex items-center gap-4 text-xs text-neutral-400">
                                <span>{item.views} views</span>
                                <span className="text-purple-400">{item.leads} leads</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    // Forge
    return (
        <div className="space-y-4">
            <div className="text-sm text-neutral-500 mb-4">Recent Testimonials</div>
            <div className="space-y-4">
                {[
                    {
                        name: "Sarah Chen",
                        text: "Incredible experience working together...",
                        rating: 5,
                    },
                    {
                        name: "Marcus Johnson",
                        text: "Transformed our entire brand...",
                        rating: 5,
                    },
                ].map((item, i) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-white/5"
                    >
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(item.rating)].map((_, j) => (
                                <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-sm text-neutral-300 mb-2">"{item.text}"</p>
                        <p className="text-xs text-neutral-500">— {item.name}</p>
                    </motion.div>
                ))}
            </div>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full py-3 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-medium hover:bg-rose-500/20 transition-colors"
            >
                Request Testimonial →
            </motion.button>
        </div>
    );
}
