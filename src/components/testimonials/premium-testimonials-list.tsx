"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import {
    MessageSquare,
    Send,
    Star,
    Check,
    X,
    Clock,
    Video,
    FileText,
    Search,
    Filter,
    Loader2,
    Copy,
    ExternalLink,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
    id: string;
    type: string;
    content: string | null;
    rating: number | null;
    clientName: string;
    clientTitle: string | null;
    clientCompany: string | null;
    isApproved: boolean;
    collectedAt: Date | null;
    createdAt: Date;
    client: {
        name: string;
        email: string | null;
    } | null;
}

interface Client {
    id: string;
    name: string;
    email: string | null;
}

interface TestimonialsListProps {
    testimonials: Testimonial[];
    clients: Client[];
}

type FilterStatus = "all" | "approved" | "pending" | "review";

export function PremiumTestimonialsList({
    testimonials,
    clients,
}: TestimonialsListProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterStatus>("all");
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState("");
    const [requestLoading, setRequestLoading] = useState(false);

    const filteredTestimonials = testimonials.filter((t) => {
        if (search) {
            const searchLower = search.toLowerCase();
            return (
                t.clientName.toLowerCase().includes(searchLower) ||
                t.content?.toLowerCase().includes(searchLower)
            );
        }
        if (filter === "approved") return t.isApproved;
        if (filter === "pending") return t.type === "pending";
        if (filter === "review") return t.type !== "pending" && !t.isApproved;
        return true;
    });

    const approvedCount = testimonials.filter((t) => t.isApproved).length;
    const pendingCount = testimonials.filter((t) => t.type === "pending").length;
    const avgRating =
        testimonials.length > 0
            ? (
                testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) /
                testimonials.filter((t) => t.rating).length
            ).toFixed(1)
            : "0.0";

    const handleRequestTestimonial = async () => {
        if (!selectedClient) return;
        setRequestLoading(true);

        try {
            const response = await fetch("/api/testimonials/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clientId: selectedClient }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send request");
            }

            toast.success("Testimonial request sent!");
            setShowRequestModal(false);
            setSelectedClient("");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setRequestLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const response = await fetch(`/api/testimonials/${id}/approve`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to approve");
            }

            toast.success("Testimonial approved!");
            // Would refresh data here
        } catch (error) {
            toast.error("Failed to approve testimonial");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Testimonials</h1>
                    <p className="text-neutral-400 mt-1">
                        Collect and showcase social proof from your clients
                    </p>
                </div>
                <button
                    onClick={() => setShowRequestModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium hover:from-rose-400 hover:to-pink-400 transition-colors shadow-lg shadow-rose-500/20"
                >
                    <Send className="w-4 h-4" />
                    Request Testimonial
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Testimonials",
                        value: testimonials.length,
                        icon: MessageSquare,
                        color: "rose",
                    },
                    {
                        label: "Approved",
                        value: approvedCount,
                        icon: Check,
                        color: "emerald",
                    },
                    {
                        label: "Pending",
                        value: pendingCount,
                        icon: Clock,
                        color: "amber",
                    },
                    {
                        label: "Avg. Rating",
                        value: avgRating,
                        icon: Star,
                        color: "purple",
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-5 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    `bg-${stat.color}-500/10`
                                )}
                            >
                                <stat.icon className={cn("w-5 h-5", `text-${stat.color}-400`)} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-sm text-neutral-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search testimonials..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-rose-500/50"
                    />
                </div>

                <div className="flex items-center gap-2">
                    {[
                        { id: "all" as FilterStatus, label: "All" },
                        { id: "approved" as FilterStatus, label: "Approved" },
                        { id: "pending" as FilterStatus, label: "Pending" },
                        { id: "review" as FilterStatus, label: "In Review" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setFilter(item.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                                filter === item.id
                                    ? "bg-white/10 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Testimonials Grid */}
            {filteredTestimonials.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-10 h-10 text-neutral-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No testimonials found
                    </h3>
                    <p className="text-neutral-400 mb-6">
                        {search
                            ? "Try adjusting your search"
                            : "Request testimonials from your happy clients"}
                    </p>
                    {!search && (
                        <button
                            onClick={() => setShowRequestModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 font-medium hover:bg-rose-500/20 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                            Request Testimonial
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-rose-400 font-semibold">
                                        {testimonial.clientName[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">
                                            {testimonial.clientName}
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            {testimonial.clientTitle && `${testimonial.clientTitle}`}
                                            {testimonial.clientTitle && testimonial.clientCompany && " @ "}
                                            {testimonial.clientCompany}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "px-2.5 py-1 rounded-lg text-xs font-medium",
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
                                    {testimonial.type === "video" && (
                                        <Video className="w-4 h-4 text-purple-400" />
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            {testimonial.rating && (
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "w-4 h-4",
                                                i < testimonial.rating!
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-neutral-600"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Content */}
                            {testimonial.content ? (
                                <p className="text-neutral-300 leading-relaxed mb-4">
                                    "{testimonial.content}"
                                </p>
                            ) : (
                                <p className="text-neutral-500 italic mb-4">
                                    Waiting for response...
                                </p>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-xs text-neutral-500">
                                    {testimonial.collectedAt
                                        ? `Received ${formatRelativeTime(testimonial.collectedAt)}`
                                        : `Requested ${formatRelativeTime(testimonial.createdAt)}`}
                                </span>
                                <div className="flex items-center gap-2">
                                    {!testimonial.isApproved && testimonial.type !== "pending" && (
                                        <button
                                            onClick={() => handleApprove(testimonial.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                            Approve
                                        </button>
                                    )}
                                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Request Modal */}
            <AnimatePresence>
                {showRequestModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRequestModal(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                        >
                            <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                        <Send className="w-5 h-5 text-rose-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            Request Testimonial
                                        </h2>
                                        <p className="text-sm text-neutral-400">
                                            Send a magic link to collect feedback
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm text-neutral-400 mb-2">
                                        Select Client
                                    </label>
                                    <select
                                        value={selectedClient}
                                        onChange={(e) => setSelectedClient(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50 cursor-pointer"
                                    >
                                        <option value="">Choose a client...</option>
                                        {clients
                                            .filter((c) => c.email)
                                            .map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.name} ({client.email})
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setShowRequestModal(false)}
                                        className="flex-1 py-3 rounded-xl text-neutral-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRequestTestimonial}
                                        disabled={!selectedClient || requestLoading}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium hover:from-rose-400 hover:to-pink-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {requestLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Request
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
