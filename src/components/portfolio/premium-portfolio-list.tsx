"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Briefcase,
    Plus,
    Search,
    Grid,
    List,
    Star,
    Eye,
    ExternalLink,
    Calendar,
    Building,
    ImageIcon,
} from "lucide-react";

interface PortfolioItem {
    id: string;
    title: string;
    description: string | null;
    category: string | null;
    featuredImageUrl: string | null;
    projectUrl: string | null;
    status: string;
    isFeatured: boolean;
    completedAt: Date | null;
    createdAt: Date;
    client: {
        name: string;
        company: string | null;
    } | null;
}

interface PortfolioListProps {
    items: PortfolioItem[];
}

type ViewMode = "grid" | "list";
type FilterCategory = "all" | string;

export function PremiumPortfolioList({ items }: PortfolioListProps) {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [category, setCategory] = useState<FilterCategory>("all");

    // Get unique categories
    const categories = Array.from(
        new Set(items.map((item) => item.category).filter(Boolean))
    ) as string[];

    const filteredItems = items.filter((item) => {
        if (search) {
            const searchLower = search.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchLower) ||
                item.description?.toLowerCase().includes(searchLower) ||
                item.client?.name.toLowerCase().includes(searchLower)
            );
        }
        if (category !== "all" && item.category !== category) {
            return false;
        }
        return true;
    });

    const featuredCount = items.filter((i) => i.isFeatured).length;
    const publishedCount = items.filter((i) => i.status === "published").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Portfolio</h1>
                    <p className="text-neutral-400 mt-1">
                        Showcase your best work and attract new clients
                    </p>
                </div>
                <Link
                    href="/dashboard/portfolio/new"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-colors shadow-lg shadow-purple-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Projects",
                        value: items.length,
                        icon: Briefcase,
                        color: "purple",
                    },
                    {
                        label: "Featured",
                        value: featuredCount,
                        icon: Star,
                        color: "amber",
                    },
                    {
                        label: "Published",
                        value: publishedCount,
                        icon: Eye,
                        color: "emerald",
                    },
                    {
                        label: "Categories",
                        value: categories.length,
                        icon: Grid,
                        color: "cyan",
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
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50"
                    />
                </div>

                {/* Category filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none cursor-pointer"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* View toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            viewMode === "grid"
                                ? "bg-white/10 text-white"
                                : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                            "p-2 rounded-lg transition-colors",
                            viewMode === "list"
                                ? "bg-white/10 text-white"
                                : "text-neutral-400 hover:text-white"
                        )}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Portfolio Grid */}
            {filteredItems.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto mb-6">
                        <Briefcase className="w-10 h-10 text-neutral-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No projects found
                    </h3>
                    <p className="text-neutral-400 mb-6">
                        {search
                            ? "Try adjusting your search"
                            : "Add your first project to start building your portfolio"}
                    </p>
                    {!search && (
                        <Link
                            href="/dashboard/portfolio/new"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 text-purple-400 font-medium hover:bg-purple-500/20 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </Link>
                    )}
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            {/* Note: In a real app, this would link to a detail page */}
                            {/* <Link href={`/dashboard/portfolio/${item.id}`}> */}
                            <div className="group rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300">
                                {/* Image */}
                                <div className="aspect-video relative bg-neutral-800 overflow-hidden">
                                    {item.featuredImageUrl ? (
                                        <Image
                                            src={item.featuredImageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-neutral-700" />
                                        </div>
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        {item.isFeatured && (
                                            <span className="px-2 py-1 rounded bg-amber-500/80 text-[10px] font-medium text-white">
                                                Featured
                                            </span>
                                        )}
                                        {item.status === "draft" && (
                                            <span className="px-2 py-1 rounded bg-neutral-800/80 text-[10px] font-medium text-neutral-300">
                                                Draft
                                            </span>
                                        )}
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center gap-2">
                                                {item.projectUrl && (
                                                    <a
                                                        href={item.projectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors text-sm font-medium"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Visit Site
                                                    </a>
                                                )}
                                                <span className="flex-1"></span>
                                                <div className="flex items-center gap-1">
                                                    {item.completedAt && (
                                                        <span className="text-xs text-neutral-300 bg-black/50 px-2 py-1 rounded opacity-80">
                                                            {new Date(item.completedAt).getFullYear()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                                            {item.title}
                                        </h3>
                                        {item.category && (
                                            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-[10px] font-medium text-purple-400 shrink-0">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                    {item.description && (
                                        <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                                            {item.description}
                                        </p>
                                    )}
                                    {item.client && (
                                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                                            <Building className="w-3.5 h-3.5" />
                                            {item.client.name}
                                            {item.client.company && ` @ ${item.client.company}`}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* </Link> */}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl bg-neutral-900/50 border border-white/5 overflow-hidden">
                    <div className="divide-y divide-white/5">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                {/* Note: Link disabled for now as detail page isn't in scope yet */}
                                <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group cursor-default">
                                    {/* Thumbnail */}
                                    <div className="w-24 h-16 rounded-lg bg-neutral-800 overflow-hidden shrink-0">
                                        {item.featuredImageUrl ? (
                                            <Image
                                                src={item.featuredImageUrl}
                                                alt={item.title}
                                                width={96}
                                                height={64}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="w-6 h-6 text-neutral-700" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-white truncate">
                                                {item.title}
                                            </p>
                                            {item.isFeatured && (
                                                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                                            {item.category && (
                                                <span className="flex items-center gap-1.5">
                                                    <Grid className="w-3.5 h-3.5" />
                                                    {item.category}
                                                </span>
                                            )}
                                            {item.client && (
                                                <span className="flex items-center gap-1.5">
                                                    <Building className="w-3.5 h-3.5" />
                                                    {item.client.name}
                                                </span>
                                            )}
                                            {item.completedAt && (
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(item.completedAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <span
                                        className={cn(
                                            "px-2.5 py-1 rounded-lg text-xs font-medium shrink-0",
                                            item.status === "published"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-neutral-500/10 text-neutral-400"
                                        )}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
