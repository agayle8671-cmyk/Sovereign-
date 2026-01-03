"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Shield,
    Users,
    Briefcase,
    ArrowRight,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

interface WelcomeSectionProps {
    user: {
        name: string | null;
    };
    isNewUser: boolean;
}

const onboardingSteps = [
    {
        title: "Analyze a Contract",
        description: "Upload and scan contracts for risks with AI",
        href: "/dashboard/contracts/analyze",
        icon: Shield,
        gradient: "from-cyan-500 to-blue-500",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
    },
    {
        title: "Add Your Clients",
        description: "Track relationships and communication",
        href: "/dashboard/clients/new",
        icon: Users,
        gradient: "from-amber-500 to-orange-500",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
    },
    {
        title: "Build Your Portfolio",
        description: "Showcase your best work to attract leads",
        href: "/dashboard/portfolio/new",
        icon: Briefcase,
        gradient: "from-purple-500 to-pink-500",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
    },
];

export function WelcomeSection({ user, isNewUser }: WelcomeSectionProps) {
    const firstName = user.name?.split(" ")[0] || "there";
    const hour = new Date().getHours();
    const greeting =
        hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white">
                    {greeting}, {firstName}
                </h1>
                <p className="text-neutral-400 mt-1">
                    Here's what's happening with your business today.
                </p>
            </motion.div>

            {/* Onboarding Card - Only show for new users */}
            {isNewUser && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative rounded-2xl overflow-hidden"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-cyan-500/20" />
                    <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-xl" />

                    {/* Content */}
                    <div className="relative p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Welcome to Sovereign!
                                </h2>
                                <p className="text-sm text-neutral-400">
                                    Complete these steps to unlock your full potential
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {onboardingSteps.map((step, index) => (
                                <Link
                                    key={step.title}
                                    href={step.href}
                                    className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className={`w-8 h-8 rounded-lg ${step.bg} flex items-center justify-center`}
                                        >
                                            <step.icon className={`w-4 h-4 ${step.color}`} />
                                        </div>
                                        <span className="text-xs text-neutral-500">
                                            Step {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="font-medium text-white mb-1">{step.title}</h3>
                                    <p className="text-sm text-neutral-400">{step.description}</p>
                                    <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
