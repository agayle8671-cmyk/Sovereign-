"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Card } from "./card";
import { Button } from "./button";
import { Progress } from "./progress";
import { cn } from "@/lib/utils";
import {
    Upload,
    FileText,
    Shield,
    Loader2,
    X,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ContractUploadProps {
    onAnalysisComplete?: (contractId: string, analysis: any) => void;
    className?: string;
}

type UploadState = "idle" | "uploading" | "analyzing" | "complete" | "error";

export function ContractUpload({
    onAnalysisComplete,
    className,
}: ContractUploadProps) {
    const router = useRouter();
    const [state, setState] = useState<UploadState>("idle");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
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
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            "text/plain": [".txt"],
        },
        maxFiles: 1,
        maxSize: 16 * 1024 * 1024,
        disabled: state !== "idle",
    });

    const handleAnalyze = async () => {
        if (!file) return;

        setState("uploading");
        setProgress(0);
        setError(null);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 10, 40));
        }, 200);

        try {
            const formData = new FormData();
            formData.append("file", file);

            clearInterval(progressInterval);
            setProgress(50);
            setState("analyzing");

            const response = await fetch("/api/contracts/analyze", {
                method: "POST",
                body: formData,
            });

            // Simulate analysis progress
            const analysisInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 5, 95));
            }, 500);

            const data = await response.json();

            clearInterval(analysisInterval);

            if (!response.ok) {
                throw new Error(data.error || "Analysis failed");
            }

            setProgress(100);
            setState("complete");

            toast.success("Contract analyzed successfully!");

            if (onAnalysisComplete) {
                onAnalysisComplete(data.contractId, data.analysis);
            } else {
                // Navigate to contract detail
                router.push(`/dashboard/contracts/${data.contractId}`);
            }
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
        setProgress(0);
        setError(null);
    };

    return (
        <Card className={cn("overflow-hidden", className)}>
            {state === "idle" && (
                <>
                    <div
                        {...getRootProps()}
                        className={cn(
                            "p-12 text-center cursor-pointer transition-all",
                            isDragActive && "bg-shield/5"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div
                            className={cn(
                                "mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                                isDragActive ? "bg-shield/20" : "bg-neutral-800"
                            )}
                        >
                            {file ? (
                                <FileText className="w-8 h-8 text-shield" />
                            ) : (
                                <Upload className="w-8 h-8 text-neutral-500" />
                            )}
                        </div>

                        {file ? (
                            <div>
                                <p className="font-medium text-neutral-100">{file.name}</p>
                                <p className="text-sm text-neutral-400 mt-1">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                    }}
                                    className="text-sm text-neutral-500 hover:text-neutral-300 mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-neutral-300">
                                    {isDragActive
                                        ? "Drop your contract here..."
                                        : "Drag & drop your contract here"}
                                </p>
                                <p className="text-sm text-neutral-500 mt-2">
                                    or click to browse • PDF, DOC, DOCX, TXT up to 16MB
                                </p>
                            </>
                        )}
                    </div>

                    {file && (
                        <div className="p-4 border-t border-neutral-800">
                            <Button
                                onClick={handleAnalyze}
                                variant="default"
                                className="w-full bg-shield hover:bg-shield-dark text-white"
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Analyze Contract
                            </Button>
                        </div>
                    )}
                </>
            )}

            {(state === "uploading" || state === "analyzing") && (
                <div className="p-12 text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-shield/10 flex items-center justify-center mb-6">
                        <Loader2 className="w-8 h-8 text-shield animate-spin" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">
                        {state === "uploading" ? "Uploading document..." : "Analyzing contract..."}
                    </h3>
                    <p className="text-neutral-400 mb-6 max-w-sm mx-auto">
                        {state === "uploading"
                            ? "Securely uploading your document."
                            : "AI is reviewing terms, identifying risks, and benchmarking against industry standards."}
                    </p>
                    <div className="max-w-xs mx-auto">
                        <Progress value={progress} />
                        <p className="text-sm text-neutral-500 mt-2">{progress}%</p>
                    </div>
                </div>
            )}

            {state === "error" && (
                <div className="p-12 text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
                        <AlertCircle className="w-8 h-8 text-danger" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-100 mb-2">
                        Analysis Failed
                    </h3>
                    <p className="text-neutral-400 mb-6 max-w-sm mx-auto">{error}</p>
                    <Button onClick={reset} variant="outline">
                        Try Again
                    </Button>
                </div>
            )}
        </Card>
    );
}
