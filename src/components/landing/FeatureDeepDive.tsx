"use client";

import { Shield, Target, Briefcase, MessageSquare, ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { motion } from "framer-motion";

export function FeatureDeepDive() {
    return (
        <section id="features" className="py-32 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 mb-4">
                    Everything you need.
                </h2>
                <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                    A complete operating system for your freelance business.
                </p>
            </div>

            <BentoGrid className="max-w-6xl mx-auto relative z-10">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}

const items = [
    {
        title: "Contract Shield",
        description: "AI-powered analysis that flags risky clauses before you sign. Detects unlimited revisions, NET-60 terms, and IP theft traps.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative group/image">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4 bg-neutral-900 rounded-lg border border-white/10 p-4 shadow-2xl group-hover/image:scale-105 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-3/4 bg-white/10 rounded" />
                            <div className="h-2 w-1/2 bg-white/10 rounded" />
                            <div className="h-2 w-full bg-red-500/20 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        ),
        icon: <Shield className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Client Radar",
        description: "Predict client health and churn risk with 94% accuracy.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Target className="w-16 h-16 text-cyan-500/50" />
                </div>
            </div>
        ),
        icon: <Target className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Proof Forge",
        description: "Automated testimonial collection using AI-generated drafts.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex -space-x-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-white/50">
                                User
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        icon: <MessageSquare className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Lead Magnet",
        description: "Showcase your work with an AI-curated portfolio that converts.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 overflow-hidden relative">
                <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-neutral-900 border-t border-l border-white/10 rounded-tl-xl p-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-square bg-white/5 rounded-lg" />
                        <div className="aspect-square bg-white/5 rounded-lg" />
                        <div className="aspect-square bg-white/5 rounded-lg" />
                        <div className="aspect-square bg-white/5 rounded-lg" />
                    </div>
                </div>
            </div>
        ),
        icon: <Briefcase className="h-4 w-4 text-neutral-500" />,
    },
];
