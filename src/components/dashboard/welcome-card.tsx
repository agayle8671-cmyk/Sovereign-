"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    FileText,
    Users,
    Briefcase,
    ArrowRight,
    CheckCircle,
    Sparkles,
} from "lucide-react";

const steps = [
    {
        title: "Upload a Contract",
        description: "Let AI analyze risks and protect your interests",
        href: "/dashboard/contracts/analyze",
        icon: FileText,
        color: "shield",
    },
    {
        title: "Add Your Clients",
        description: "Track relationships and sentiment",
        href: "/dashboard/clients/new",
        icon: Users,
        color: "radar",
    },
    {
        title: "Build Your Portfolio",
        description: "Showcase your best work",
        href: "/dashboard/portfolio/new",
        icon: Briefcase,
        color: "magnet",
    },
];

export function WelcomeCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="p-6 border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-transparent">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-100">
                            Welcome to Sovereign!
                        </h2>
                        <p className="text-neutral-400">
                            Let's get your business set up. Complete these steps to unlock the
                            full power of your autonomous commercial engine.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {steps.map((step, index) => (
                        <Link key={step.title} href={step.href}>
                            <div className="p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-900 transition-all group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${step.color}/10`}
                                    >
                                        <step.icon className={`w-4 h-4 text-${step.color}`} />
                                    </div>
                                    <span className="text-xs text-neutral-500">
                                        Step {index + 1}
                                    </span>
                                </div>
                                <h3 className="font-medium text-neutral-100 mb-1">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-neutral-400">{step.description}</p>
                                <div className="mt-3 flex items-center text-sm text-brand-500 group-hover:text-brand-400">
                                    Get started
                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}
