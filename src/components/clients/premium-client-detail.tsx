"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import {
    ChevronLeft,
    Building,
    Mail,
    Phone,
    Globe,
    MapPin,
    Calendar,
    DollarSign,
    FileText,
    MessageSquare,
    Edit,
    Trash2,
    MoreHorizontal,
    TrendingUp,
    TrendingDown,
    Minus,
    Star,
    Send,
    ExternalLink,
    Clock,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import { ClientHealthRing } from "./client-health-ring";

interface ClientDetailProps {
    client: any;
    contracts: any[];
    testimonials: any[];
}

export function PremiumClientDetail({
    client,
    contracts,
    testimonials,
}: ClientDetailProps) {
    const [showRequestTestimonial, setShowRequestTestimonial] = useState(false);

    const healthScore = client.healthScore ?? 75;
    const healthLevel =
        healthScore >= 80 ? "excellent" : healthScore >= 60 ? "good" : "at-risk";

    const totalValue = contracts.reduce(
        (sum, c) => sum + (parseFloat(c.totalValue) || 0),
        0
    );
    const avgRiskScore =
        contracts.length > 0
            ? Math.round(
                contracts.reduce((sum, c) => sum + (c.riskScore ?? 0), 0) /
                contracts.filter((c) => c.riskScore !== null).length || 0
            )
            : 0;

    const approvedTestimonials = testimonials.filter((t) => t.isApproved);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <Link
                        href="/dashboard/clients"
                        className="mt-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-neutral-400" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-bold text-2xl">
                            {client.name[0]}
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-white">{client.name}</h1>
                                <span
                                    className={cn(
                                        "px-2.5 py-1 rounded-lg text-xs font-medium",
                                        client.status === "active"
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-neutral-500/10 text-neutral-400"
                                    )}
                                >
                                    {client.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                                {client.company && (
                                    <span className="flex items-center gap-1.5">
                                        <Building className="w-4 h-4" />
                                        {client.company}
                                    </span>
                                )}
                                {client.email && (
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4" />
                                        {client.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Edit className="w-5 h-5 text-neutral-400" />
                    </button>
                    <button
                        onClick={() => setShowRequestTestimonial(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-400 hover:to-orange-400 transition-colors shadow-lg shadow-amber-500/20"
                    >
                        <Send className="w-4 h-4" />
                        Request Testimonial
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Health Score Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative rounded-2xl overflow-hidden"
                    >
                        <div
                            className={cn(
                                "absolute inset-0",
                                healthLevel === "excellent" &&
                                "bg-gradient-to-br from-emerald-500/20 to-emerald-600/5",
                                healthLevel === "good" &&
                                "bg-gradient-to-br from-amber-500/20 to-amber-600/5",
                                healthLevel === "at-risk" &&
                                "bg-gradient-to-br from-red-500/20 to-red-600/5"
                            )}
                        />

                        <div className="relative p-6 backdrop-blur-xl border border-white/5 rounded-2xl">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-white mb-1">
                                        Client Health
                                    </h2>
                                    <p className="text-sm text-neutral-400">
                                        Overall relationship status
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5",
                                        healthLevel === "excellent" &&
                                        "bg-emerald-500/20 text-emerald-400",
                                        healthLevel === "good" && "bg-amber-500/20 text-amber-400",
                                        healthLevel === "at-risk" && "bg-red-500/20 text-red-400"
                                    )}
                                >
                                    {healthLevel === "excellent" && (
                                        <TrendingUp className="w-3.5 h-3.5" />
                                    )}
                                    {healthLevel === "good" && <Minus className="w-3.5 h-3.5" />}
                                    {healthLevel === "at-risk" && (
                                        <TrendingDown className="w-3.5 h-3.5" />
                                    )}
                                    {healthLevel === "excellent" && "Excellent"}
                                    {healthLevel === "good" && "Good"}
                                    {healthLevel === "at-risk" && "At Risk"}
                                </div>
                            </div>

                            <div className="flex justify-center mb-6">
                                <ClientHealthRing score={healthScore} size={160} />
                            </div>

                            {/* Health factors */}
                            <div className="space-y-3">
                                {[
                                    { label: "Communication", value: 92, good: true },
                                    { label: "Payment History", value: 100, good: true },
                                    { label: "Project Satisfaction", value: 85, good: true },
                                    { label: "Response Time", value: 78, good: true },
                                ].map((factor) => (
                                    <div key={factor.label}>
                                        <div className="flex items-center justify-between text-sm mb-1">
                                            <span className="text-neutral-400">{factor.label}</span>
                                            <span
                                                className={cn(
                                                    "font-medium",
                                                    factor.value >= 80
                                                        ? "text-emerald-400"
                                                        : factor.value >= 60
                                                            ? "text-amber-400"
                                                            : "text-red-400"
                                                )}
                                            >
                                                {factor.value}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full",
                                                    factor.value >= 80
                                                        ? "bg-emerald-500"
                                                        : factor.value >= 60
                                                            ? "bg-amber-500"
                                                            : "bg-red-500"
                                                )}
                                                style={{ width: `${factor.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <h3 className="font-semibold text-white mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            {client.email && (
                                <a
                                    href={`mailto:${client.email}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-neutral-500">Email</p>
                                        <p className="text-sm text-white truncate">{client.email}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-amber-400" />
                                </a>
                            )}
                            {client.phone && (
                                <a
                                    href={`tel:${client.phone}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-neutral-500">Phone</p>
                                        <p className="text-sm text-white">{client.phone}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-amber-400" />
                                </a>
                            )}
                            {client.website && (
                                <a
                                    href={client.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-neutral-500">Website</p>
                                        <p className="text-sm text-white truncate">
                                            {client.website}
                                        </p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-amber-400" />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                            <p className="text-2xl font-bold text-white">
                                {contracts.length}
                            </p>
                            <p className="text-sm text-neutral-500">Contracts</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                            <p className="text-2xl font-bold text-white">
                                ${totalValue.toLocaleString()}
                            </p>
                            <p className="text-sm text-neutral-500">Total Revenue</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                            <p className="text-2xl font-bold text-white">
                                {approvedTestimonials.length}
                            </p>
                            <p className="text-sm text-neutral-500">Testimonials</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                            <p className="text-2xl font-bold text-white">{avgRiskScore}%</p>
                            <p className="text-sm text-neutral-500">Avg Risk Score</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Contracts Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h3 className="font-semibold text-white">Contracts</h3>
                            </div>
                            <Link
                                href="/dashboard/contracts/analyze"
                                className="text-sm text-cyan-400 hover:text-cyan-300"
                            >
                                + New Contract
                            </Link>
                        </div>

                        {contracts.length === 0 ? (
                            <div className="p-12 text-center">
                                <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                                <p className="text-neutral-400">No contracts with this client</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                {contracts.slice(0, 5).map((contract) => {
                                    const riskScore = contract.riskScore ?? 50;
                                    const riskLevel =
                                        riskScore >= 80
                                            ? "low"
                                            : riskScore >= 60
                                                ? "medium"
                                                : "high";

                                    return (
                                        <Link
                                            key={contract.id}
                                            href={`/dashboard/contracts/${contract.id}`}
                                            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                                        >
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                                    riskLevel === "low" && "bg-emerald-500/10",
                                                    riskLevel === "medium" && "bg-amber-500/10",
                                                    riskLevel === "high" && "bg-red-500/10"
                                                )}
                                            >
                                                {riskLevel === "high" ? (
                                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                                ) : riskLevel === "medium" ? (
                                                    <Clock className="w-5 h-5 text-amber-400" />
                                                ) : (
                                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">
                                                    {contract.title}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {formatRelativeTime(contract.createdAt)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p
                                                    className={cn(
                                                        "text-sm font-medium",
                                                        riskLevel === "low" && "text-emerald-400",
                                                        riskLevel === "medium" && "text-amber-400",
                                                        riskLevel === "high" && "text-red-400"
                                                    )}
                                                >
                                                    {riskScore}%
                                                </p>
                                                <p className="text-xs text-neutral-500">Risk Score</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>

                    {/* Testimonials Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-rose-400" />
                                </div>
                                <h3 className="font-semibold text-white">Testimonials</h3>
                            </div>
                            <button
                                onClick={() => setShowRequestTestimonial(true)}
                                className="text-sm text-rose-400 hover:text-rose-300"
                            >
                                + Request
                            </button>
                        </div>

                        {testimonials.length === 0 ? (
                            <div className="p-12 text-center">
                                <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                                <p className="text-neutral-400 mb-4">
                                    No testimonials from this client yet
                                </p>
                                <button
                                    onClick={() => setShowRequestTestimonial(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                    Request Testimonial
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="p-4 rounded-xl bg-white/5"
                                    >
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={cn(
                                                        "w-4 h-4",
                                                        i < (testimonial.rating || 5)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-neutral-600"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-neutral-300 mb-3">
                                            "{testimonial.content || "No content provided"}"
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-xs font-medium",
                                                    testimonial.isApproved
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : testimonial.type === "pending"
                                                            ? "bg-amber-500/10 text-amber-400"
                                                            : "bg-neutral-500/10 text-neutral-400"
                                                )}
                                            >
                                                {testimonial.isApproved
                                                    ? "Approved"
                                                    : testimonial.type === "pending"
                                                        ? "Pending"
                                                        : "In Review"}
                                            </span>
                                            <span className="text-xs text-neutral-500">
                                                {formatRelativeTime(testimonial.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Notes Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <h3 className="font-semibold text-white mb-4">Notes</h3>
                        <textarea
                            placeholder="Add notes about this client..."
                            defaultValue={client.notes || ""}
                            className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 resize-none"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
