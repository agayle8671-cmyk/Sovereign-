"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Briefcase, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const portfolioSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    shortDescription: z.string().max(500).optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    externalUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    tags: z.string().optional(),
    isFeatured: z.boolean(),
    isPublic: z.boolean(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

const categories = [
    "Web Design",
    "UI/UX Design",
    "Mobile App",
    "Brand Identity",
    "Development",
    "Consulting",
    "Marketing",
    "Other",
];

export default function NewPortfolioPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PortfolioFormData>({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            title: "",
            shortDescription: "",
            description: "",
            externalUrl: "",
            tags: "",
            isFeatured: false,
            isPublic: true,
        },
    });

    const isFeatured = watch("isFeatured");
    const isPublic = watch("isPublic");

    const onSubmit = async (data: PortfolioFormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    tags: data.tags?.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (!response.ok) throw new Error("Failed to create portfolio item");

            const item = await response.json();
            toast.success("Portfolio item created");
            router.push(`/dashboard/portfolio/${item.id}`);
        } catch (error) {
            toast.error("Failed to create portfolio item");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/portfolio">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-semibold text-neutral-100">Add Project</h1>
                    <p className="text-neutral-400">
                        Add a new project to your portfolio.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-magnet" />
                        Project Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title *</Label>
                            <Input
                                id="title"
                                placeholder="E-commerce Redesign for TechStart"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-sm text-danger">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shortDescription">Short Description</Label>
                            <Textarea
                                id="shortDescription"
                                placeholder="A brief summary of the project..."
                                className="h-20"
                                {...register("shortDescription")}
                            />
                            <p className="text-xs text-neutral-500">
                                This appears in portfolio cards. Max 500 characters.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select onValueChange={(value) => setValue("category", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category.toLowerCase()}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="externalUrl">Project URL</Label>
                                <Input
                                    id="externalUrl"
                                    placeholder="https://project.com"
                                    {...register("externalUrl")}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                placeholder="React, TypeScript, E-commerce (comma separated)"
                                {...register("tags")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Full Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Detailed description of the project, your role, technologies used..."
                                className="h-32"
                                {...register("description")}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50">
                            <div>
                                <p className="font-medium text-neutral-100">Featured Project</p>
                                <p className="text-sm text-neutral-400">
                                    Highlight this project in your portfolio
                                </p>
                            </div>
                            <Switch
                                checked={isFeatured}
                                onCheckedChange={(checked) => setValue("isFeatured", checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50">
                            <div>
                                <p className="font-medium text-neutral-100">Public</p>
                                <p className="text-sm text-neutral-400">
                                    Include in public portfolio and pitches
                                </p>
                            </div>
                            <Switch
                                checked={isPublic}
                                onCheckedChange={(checked) => setValue("isPublic", checked)}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/dashboard/portfolio">Cancel</Link>
                            </Button>
                            <Button type="submit" variant="magnet" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Create Project
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
