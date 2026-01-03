"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ImageIcon,
    Upload,
    X,
    Link as LinkIcon,
    Building,
    FileText,
    Calendar,
    Tag,
    Star,
    Eye,
    Loader2,
    Briefcase,
} from "lucide-react";
import { toast } from "sonner";

interface Client {
    id: string;
    name: string;
    company: string | null;
}

interface PortfolioFormProps {
    clients: Client[];
}

interface FormData {
    title: string;
    description: string;
    category: string;
    clientId: string;
    projectUrl: string;
    completedAt: string;
    isFeatured: boolean;
    status: "draft" | "published";
}

const categories = [
    "Web Design",
    "Mobile App",
    "Branding",
    "UI/UX",
    "Development",
    "Marketing",
    "Consulting",
    "Other",
];

export function PremiumPortfolioForm({ clients }: PortfolioFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        category: "",
        clientId: "",
        projectUrl: "",
        completedAt: "",
        isFeatured: false,
        status: "draft",
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, String(value));
            });
            if (image) {
                payload.append("image", image);
            }

            const response = await fetch("/api/portfolio", {
                method: "POST",
                body: payload,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create project");
            }

            toast.success("Project created successfully!");
            router.push("/dashboard/portfolio"); // Redirect to list for now
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/dashboard/portfolio"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-neutral-400" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add Portfolio Project</h1>
                    <p className="text-neutral-400 mt-1">
                        Showcase your work to attract new clients
                    </p>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Featured Image */}
                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-purple-400" />
                        </div>
                        <h2 className="font-semibold text-white">Featured Image</h2>
                    </div>

                    {imagePreview ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                }}
                                className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            {...getRootProps()}
                            className={cn(
                                "aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors",
                                isDragActive
                                    ? "border-purple-500 bg-purple-500/5"
                                    : "border-white/10 hover:border-white/20"
                            )}
                        >
                            <input {...getInputProps()} />
                            <Upload
                                className={cn(
                                    "w-10 h-10 mb-3",
                                    isDragActive ? "text-purple-400" : "text-neutral-500"
                                )}
                            />
                            <p className="text-neutral-300 text-sm">
                                {isDragActive
                                    ? "Drop image here..."
                                    : "Drag & drop or click to upload"}
                            </p>
                            <p className="text-neutral-500 text-xs mt-1">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    )}
                </div>

                {/* Project Details */}
                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h2 className="font-semibold text-white">Project Details</h2>
                    </div>

                    <div>
                        <label className="block text-sm text-neutral-400 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            placeholder="E-commerce Website Redesign"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-neutral-400 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Describe the project, your role, and the results..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Category
                            </label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <select
                                    value={formData.category}
                                    onChange={(e) => updateField("category", e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 cursor-pointer appearance-none"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Client
                            </label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <select
                                    value={formData.clientId}
                                    onChange={(e) => updateField("clientId", e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 cursor-pointer appearance-none"
                                >
                                    <option value="">Select client (optional)</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name}
                                            {client.company && ` (${client.company})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Project URL
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type="url"
                                    value={formData.projectUrl}
                                    onChange={(e) => updateField("projectUrl", e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Completion Date
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type="date"
                                    value={formData.completedAt}
                                    onChange={(e) => updateField("completedAt", e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Publishing Options */}
                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-amber-400" />
                        </div>
                        <h2 className="font-semibold text-white">Publishing Options</h2>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="font-medium text-white">Featured Project</p>
                                <p className="text-sm text-neutral-500">
                                    Show prominently on your portfolio
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateField("isFeatured", !formData.isFeatured)}
                            className={cn(
                                "w-12 h-6 rounded-full transition-colors relative",
                                formData.isFeatured ? "bg-amber-500" : "bg-neutral-700"
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                                    formData.isFeatured ? "translate-x-7" : "translate-x-1"
                                )}
                            />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => updateField("status", "draft")}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-medium transition-colors",
                                formData.status === "draft"
                                    ? "bg-neutral-700 text-white"
                                    : "bg-white/5 text-neutral-400 hover:text-white"
                            )}
                        >
                            Save as Draft
                        </button>
                        <button
                            type="button"
                            onClick={() => updateField("status", "published")}
                            className={cn(
                                "flex-1 py-3 rounded-xl font-medium transition-colors",
                                formData.status === "published"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/5 text-neutral-400 hover:text-white"
                            )}
                        >
                            Publish
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/dashboard/portfolio"
                        className="px-6 py-3 rounded-xl text-neutral-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading || !formData.title}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-400 hover:to-pink-400 transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Briefcase className="w-4 h-4" />
                                Create Project
                            </>
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
