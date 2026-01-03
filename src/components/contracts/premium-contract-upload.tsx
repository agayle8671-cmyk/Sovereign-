"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Upload,
    FileText,
    Shield,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Sparkles,
    X,
} from "lucide-react";
import { toast } from "sonner";

type UploadState = "idle" | "uploading" | "analyzing" | "complete" | "error";

const analysisSteps = [
    { id: "upload", label: "Uploading document", icon: Upload },
    { id: "parse", label: "Parsing content", icon: FileText },
    { id: "analyze", label: "AI analyzing clauses", icon: Sparkles },
    { id: "risks", label: "Identifying risks", icon: Shield },
    { id: "complete", label: "Analysis complete", icon: CheckCircle2 },
];

export function PremiumContractUpload() {
    const router = useRouter();
    const [state, setState] = useState<UploadState>("idle");
    const [file, setFile] = useState<File | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
        maxSize: 16 * 1024 * 1024,
        disabled: state !== "idle",
    });

    const simulateProgress = async () => {
        for (let i = 0; i < analysisSteps.length - 1; i++) {
            setCurrentStep(i);
            await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setState("uploading");
        setCurrentStep(0);
        setError(null);

        // Start progress simulation
        const progressPromise = simulateProgress();

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/contracts/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            // Wait for progress to catch up
            await progressPromise;

            if (!response.ok) {
                throw new Error(data.error || "Analysis failed");
            }

            setCurrentStep(analysisSteps.length - 1);
            setState("complete");

            toast.success("Contract analyzed successfully!");

            // Navigate after brief delay to show completion
            setTimeout(() => {
                router.push(`/dashboard/contracts/${data.contractId}`);
            }, 1000);
        } catch (err) {
            setState("error");
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            toast.error(message);
        }
    };

    const reset = () => {
        setFile(null);
        setState("idle");
        setCurrentStep(0);
        setError(null);
    };

    return (
        <div className="relative">
            {/* Main upload card */}
            <div className="relative rounded-3xl overflow-hidden">
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl" />

                <div className="relative m-[1px] rounded-3xl bg-neutral-900/90 backdrop-blur-xl overflow-hidden">
                    <AnimatePresence mode="wait">
                        {state === "idle" && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Drop zone */}
                                <div
                                    {...getRootProps()}
                                    className={cn(
                                        "p-12 cursor-pointer transition-all duration-300",
                                        isDragActive && "bg-cyan-500/5"
                                    )}
                                >
                                    <input {...getInputProps()} />

                                    <div className="text-center">
                                        {file ? (
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="space-y-4"
                                            >
                                                <div className="relative inline-block">
                                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto">
                                                        <FileText className="w-10 h-10 text-cyan-400" />
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFile(null);
                                                        }}
                                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{file.name}</p>
                                                    <p className="text-sm text-neutral-500">
                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <>
                                                <div
                                                    className={cn(
                                                        "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300",
                                                        isDragActive
                                                            ? "bg-cyan-500/20 border-2 border-dashed border-cyan-500"
                                                            : "bg-white/5 border-2 border-dashed border-white/10"
                                                    )}
                                                >
                                                    <Upload
                                                        className={cn(
                                                            "w-10 h-10 transition-colors",
                                                            isDragActive ? "text-cyan-400" : "text-neutral-500"
                                                        )}
                                                    />
                                                </div>
                                                <p className="text-lg text-white mb-2">
                                                    {isDragActive
                                                        ? "Drop your contract here..."
                                                        : "Drag & drop your contract"}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    or click to browse • PDF, DOC, DOCX, TXT up to 16MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Analyze button */}
                                {file && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 border-t border-white/5"
                                    >
                                        <button
                                            onClick={handleAnalyze}
                                            className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden"
                                        >
                                            {/* Animated gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_100%] animate-gradient" />

                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                            {/* Shadow */}
                                            <div className="absolute inset-0 shadow-[0_0_30px_rgba(6,182,212,0.3)] rounded-xl" />

                                            <span className="relative flex items-center justify-center gap-2">
                                                <Shield className="w-5 h-5" />
                                                Analyze Contract
                                            </span>
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {(state === "uploading" || state === "analyzing") && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-12"
                            >
                                <div className="text-center mb-10">
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        {/* Spinning ring */}
                                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeDasharray="200"
                                                strokeDashoffset="50"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#06b6d4" />
                                                    <stop offset="50%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#8b5cf6" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        {/* Center icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Shield className="w-10 h-10 text-cyan-400" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Analyzing Your Contract
                                    </h3>
                                    <p className="text-neutral-400">
                                        AI is scanning clauses and identifying potential risks...
                                    </p>
                                </div>

                                {/* Progress steps */}
                                <div className="max-w-sm mx-auto space-y-3">
                                    {analysisSteps.map((step, index) => {
                                        const Icon = step.icon;
                                        const isComplete = index < currentStep;
                                        const isCurrent = index === currentStep;

                                        return (
                                            <motion.div
                                                key={step.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                                                    isComplete && "bg-emerald-500/10",
                                                    isCurrent && "bg-cyan-500/10",
                                                    !isComplete && !isCurrent && "opacity-40"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                                        isComplete && "bg-emerald-500/20",
                                                        isCurrent && "bg-cyan-500/20",
                                                        !isComplete && !isCurrent && "bg-white/5"
                                                    )}
                                                >
                                                    {isComplete ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                                    ) : isCurrent ? (
                                                        <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                                                    ) : (
                                                        <Icon className="w-4 h-4 text-neutral-500" />
                                                    )}
                                                </div>
                                                <span
                                                    className={cn(
                                                        "text-sm font-medium",
                                                        isComplete && "text-emerald-400",
                                                        isCurrent && "text-cyan-400",
                                                        !isComplete && !isCurrent && "text-neutral-500"
                                                    )}
                                                >
                                                    {step.label}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {state === "complete" && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-12 text-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Analysis Complete!
                                </h3>
                                <p className="text-neutral-400">Redirecting to results...</p>
                            </motion.div>
                        )}

                        {state === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-12 text-center"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-10 h-10 text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Analysis Failed
                                </h3>
                                <p className="text-neutral-400 mb-6">{error}</p>
                                <button
                                    onClick={reset}
                                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
