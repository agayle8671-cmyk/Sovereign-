"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Shield,
    Target,
    Briefcase,
    MessageSquare,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Star,
} from "lucide-react";

const tabs = [
    {
        id: "contracts",
        label: "Contract Analysis",
        icon: Shield,
        color: "cyan",
        description: "AI scans every clause and identifies risks in seconds",
    },
    {
        id: "clients",
        label: "Client Intelligence",
        icon: Target,
        color: "amber",
        description: "Real-time relationship health and sentiment tracking",
    },
    {
        id: "portfolio",
        label: "Portfolio & Leads",
        icon: Briefcase,
        color: "purple",
        description: "Showcase work and capture leads automatically",
    },
    {
        id: "testimonials",
        label: "Social Proof",
        icon: MessageSquare,
        color: "rose",
        description: "One-click testimonial collection system",
    },
];

export function ProductShowcase() {
    const [activeTab, setActiveTab] = useState("contracts");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-32 overflow-hidden">
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
                        See it in action
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Watch how Sovereign transforms the way you manage your independent
                        business
                    </p>
                </motion.div>

                {/* Tab navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-white text-neutral-900"
                                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Tab description */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeTab}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-center text-neutral-400 mb-8"
                    >
                        {tabs.find((t) => t.id === activeTab)?.description}
                    </motion.p>
                </AnimatePresence>

                {/* Product preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-500/10 via-transparent to-transparent blur-3xl" />

                    {/* Browser frame */}
                    <div className="relative max-w-5xl mx-auto rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-neutral-800/50">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 rounded-lg bg-neutral-900/80 text-sm text-neutral-500">
                                    app.sovereign.com
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="aspect-[16/10] p-6 bg-neutral-950">
                            <AnimatePresence mode="wait">
                                {activeTab === "contracts" && (
                                    <ContractPreview key="contracts" />
                                )}
                                {activeTab === "clients" && <ClientPreview key="clients" />}
                                {activeTab === "portfolio" && (
                                    <PortfolioPreview key="portfolio" />
                                )}
                                {activeTab === "testimonials" && (
                                    <TestimonialsPreview key="testimonials" />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ContractPreview() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex gap-6"
        >
            {/* Left panel - Document */}
            <div className="flex-1 rounded-xl bg-neutral-900/50 border border-white/5 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded bg-cyan-500/20" />
                    <span className="text-sm font-medium text-white">
                        Freelance_Agreement.pdf
                    </span>
                </div>
                <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            <div
                                className={`h-3 rounded ${i === 2 || i === 5
                                        ? "w-full bg-red-500/20 border border-red-500/30"
                                        : "w-3/4 bg-white/5"
                                    }`}
                            />
                            {(i === 2 || i === 5) && (
                                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel - Analysis */}
            <div className="w-80 rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-white">Risk Analysis</span>
                    <span className="text-2xl font-bold text-amber-400">67%</span>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">
                                High Risk
                            </span>
                        </div>
                        <p className="text-xs text-neutral-400">
                            Unlimited revisions clause detected
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-medium text-amber-400">
                                Medium Risk
                            </span>
                        </div>
                        <p className="text-xs text-neutral-400">NET-60 payment terms</p>
                    </div>
                </div>

                <button className="w-full py-2.5 rounded-lg bg-cyan-500 text-white font-medium text-sm">
                    Generate Counter-Offer
                </button>
            </div>
        </motion.div>
    );
}

function ClientPreview() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex gap-6"
        >
            {/* Client list */}
            <div className="w-72 rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-white">Clients</span>
                    <span className="text-xs text-neutral-500">12 total</span>
                </div>
                <div className="space-y-2">
                    {[
                        { name: "Acme Corp", health: 92, trend: "up" },
                        { name: "TechStart Inc", health: 78, trend: "down" },
                        { name: "Design Co", health: 85, trend: "up" },
                        { name: "StartupXYZ", health: 45, trend: "down" },
                    ].map((client, i) => (
                        <div
                            key={i}
                            className={`p-3 rounded-lg ${i === 0 ? "bg-white/10" : "bg-white/5"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-medium text-sm">
                                    {client.name[0]}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-white">{client.name}</p>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp
                                            className={`w-3 h-3 ${client.trend === "up"
                                                    ? "text-emerald-400"
                                                    : "text-red-400 rotate-180"
                                                }`}
                                        />
                                        <span
                                            className={`text-xs ${client.health > 70
                                                    ? "text-emerald-400"
                                                    : client.health > 50
                                                        ? "text-amber-400"
                                                        : "text-red-400"
                                                }`}
                                        >
                                            {client.health}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Client detail */}
            <div className="flex-1 rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
                            A
                        </div>
                        <div>
                            <h3 className="font-medium text-white">Acme Corp</h3>
                            <p className="text-sm text-neutral-500">
                                Technology • San Francisco
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-400">92%</p>
                        <p className="text-xs text-neutral-500">Health Score</p>
                    </div>
                </div>

                {/* Health metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: "Response Time", value: "< 2hrs", good: true },
                        { label: "Payment", value: "On Time", good: true },
                        { label: "Sentiment", value: "Positive", good: true },
                    ].map((metric, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/5">
                            <p className="text-xs text-neutral-500 mb-1">{metric.label}</p>
                            <p
                                className={`text-sm font-medium ${metric.good ? "text-emerald-400" : "text-red-400"
                                    }`}
                            >
                                {metric.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recent activity */}
                <div>
                    <p className="text-xs text-neutral-500 mb-2">Recent Activity</p>
                    <div className="space-y-2">
                        {[
                            "Contract signed - Website Redesign",
                            "Invoice paid - $4,500",
                            "Positive feedback received",
                        ].map((activity, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-neutral-400"
                            >
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                {activity}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PortfolioPreview() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
        >
            <div className="grid grid-cols-3 gap-4 h-full">
                {[
                    { title: "E-commerce Redesign", client: "TechStart", featured: true },
                    { title: "Brand Identity", client: "Design Co", featured: false },
                    { title: "Mobile App", client: "StartupXYZ", featured: true },
                    { title: "Marketing Site", client: "Acme Corp", featured: false },
                    { title: "Dashboard UI", client: "DataFlow", featured: true },
                    { title: "Landing Page", client: "LaunchPad", featured: false },
                ].map((project, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-neutral-900/50 border border-white/5 overflow-hidden group"
                    >
                        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                            {project.featured && (
                                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-purple-500/80 text-[10px] text-white font-medium">
                                    Featured
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-medium text-white">{project.title}</p>
                            <p className="text-xs text-neutral-500">{project.client}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function TestimonialsPreview() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex gap-6"
        >
            {/* Testimonial cards */}
            <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                    {
                        name: "Sarah Chen",
                        role: "CEO, TechStart",
                        text: "Working with them was incredible. Delivered on time and exceeded expectations.",
                        rating: 5,
                    },
                    {
                        name: "Michael Ross",
                        role: "Founder, LaunchPad",
                        text: "Professional, creative, and incredibly easy to work with. Highly recommend!",
                        rating: 5,
                    },
                    {
                        name: "Emily Davis",
                        role: "Marketing Dir, Acme",
                        text: "The best freelancer I've ever worked with. Will definitely hire again.",
                        rating: 5,
                    },
                    {
                        name: "James Wilson",
                        role: "CTO, DataFlow",
                        text: "Exceptional quality of work. They truly understand what clients need.",
                        rating: 5,
                    },
                ].map((testimonial, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl bg-neutral-900/50 border border-white/5"
                    >
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, j) => (
                                <Star
                                    key={j}
                                    className="w-3 h-3 fill-amber-400 text-amber-400"
                                />
                            ))}
                        </div>
                        <p className="text-sm text-neutral-300 mb-3 line-clamp-2">
                            "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-rose-500/20" />
                            <div>
                                <p className="text-xs font-medium text-white">
                                    {testimonial.name}
                                </p>
                                <p className="text-[10px] text-neutral-500">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Request form */}
            <div className="w-64 rounded-xl bg-neutral-900/50 border border-white/5 p-4">
                <h3 className="font-medium text-white mb-4">Request Testimonial</h3>
                <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-xs text-neutral-500 mb-1">Client</p>
                        <p className="text-sm text-white">Sarah Chen</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                        <p className="text-xs text-neutral-500 mb-1">Project</p>
                        <p className="text-sm text-white">E-commerce Redesign</p>
                    </div>
                    <button className="w-full py-2.5 rounded-lg bg-rose-500 text-white font-medium text-sm">
                        Send Magic Link
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
