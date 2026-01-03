"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import {
    Search,
    Briefcase,
    ExternalLink,
    Star,
    MoreHorizontal,
    Eye,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
    id: string;
    title: string;
    shortDescription: string | null;
    category: string | null;
    thumbnailUrl: string | null;
    externalUrl: string | null;
    industries: string[] | null;
    tags: string[] | null;
    isFeatured: boolean;
    client: {
        name: string;
        company: string | null;
    } | null;
    testimonials: {
        id: string;
        rating: number | null;
    }[];
}

interface PortfolioGridProps {
    items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];

    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.shortDescription?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (items.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={Briefcase}
                    title="No portfolio items yet"
                    description="Add your first project to start building your portfolio."
                    action={{
                        label: "Add Project",
                        href: "/dashboard/portfolio/new",
                    }}
                />
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Button
                        variant={categoryFilter === null ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setCategoryFilter(null)}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={categoryFilter === category ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setCategoryFilter(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-neutral-400">No projects match your search.</p>
                </div>
            )}
        </div>
    );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
    return (
        <Card variant="interactive" className="overflow-hidden group">
            <Link href={`/dashboard/portfolio/${item.id}`}>
                {/* Thumbnail */}
                <div className="aspect-video relative bg-neutral-800 overflow-hidden">
                    {item.thumbnailUrl ? (
                        <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Briefcase className="w-12 h-12 text-neutral-600" />
                        </div>
                    )}
                    {item.isFeatured && (
                        <div className="absolute top-3 left-3">
                            <Badge variant="primary">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                            </Badge>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-neutral-100 truncate">
                                {item.title}
                            </h3>
                            {item.client && (
                                <p className="text-sm text-neutral-400">
                                    {item.client.company || item.client.name}
                                </p>
                            )}
                        </div>
                        {item.testimonials.length > 0 && item.testimonials[0].rating && (
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-medium">
                                    {item.testimonials[0].rating}
                                </span>
                            </div>
                        )}
                    </div>

                    {item.shortDescription && (
                        <p className="text-sm text-neutral-400 mt-2 line-clamp-2">
                            {item.shortDescription}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                        {item.category && (
                            <Badge variant="outline" size="sm">
                                {item.category}
                            </Badge>
                        )}
                        {item.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </Link>
        </Card>
    );
}
