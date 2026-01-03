"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
    Upload,
    FileText,
    Shield,
    AlertTriangle,
    CheckCircle,
    Loader2,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type AnalysisStep =
    | "upload"
    | "processing"
    | "analyzing"
    | "results";

export default function ContractAnalyzePage() {
    const router = useRouter();
    const [step, setStep] = useState<AnalysisStep>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [analysis, setAnalysis] = useState<any>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024, // 10MB
    });

    const handleAnalyze = async () => {
        if (!file) return;

        setStep("processing");
        setProgress(0);

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 30) {
                    clearInterval(uploadInterval);
                    return 30;
                }
                return prev + 5;
            });
        }, 200);

        try {
            // Create form data
            const formData = new FormData();
            formData.append("file", file);

            // Upload and analyze
            const response = await fetch("/api/contracts/analyze", {
                method: "POST",
                body: formData,
            });

            clearInterval(uploadInterval);
            setStep("analyzing");
            setProgress(50);

            // Simulate analysis progress
            const analysisInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(analysisInterval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);

            if (!response.ok) {
                throw new Error("Analysis failed");
            }

            const result = await response.json();

            clearInterval(analysisInterval);
            setProgress(100);
            setAnalysis(result);
            setStep("results");
        } catch (error) {
            toast.error("Failed to analyze contract. Please try again.");
            setStep("upload");
            setProgress(0);
        }
    };

    const removeFile = () => {
        setFile(null);
        setStep("upload");
        setProgress(0);
        setAnalysis(null);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-shield to-shield-dark mb-4">
                    <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-neutral-100">
                    Contract Analysis
                </h1>
                <p className="text-neutral-400 mt-2 max-w-md mx-auto">
                    Upload your contract and let Sovereign&apos;s AI identify risks,
                    unfavorable terms, and suggest improvements.
                </p>
            </div>

            {/* Upload Area */}
            <AnimatePresence mode="wait">
                {step === "upload" && (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card
                            {...getRootProps()}
                            className={cn(
                                "p-12 border-2 border-dashed cursor-pointer transition-all",
                                isDragActive
                                    ? "border-shield bg-shield/5"
                                    : "border-neutral-700 hover:border-neutral-600"
                            )}
                        >
                            <input {...getInputProps()} />
                            <div className="text-center">
                                {file ? (
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-shield/10 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-shield" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-neutral-100">{file.name}</p>
                                            <p className="text-sm text-neutral-400">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile();
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                                        <p className="text-neutral-300 mb-2">
                                            {isDragActive
                                                ? "Drop your contract here..."
                                                : "Drag & drop your contract here"}
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            or click to browse • PDF, DOC, DOCX up to 10MB
                                        </p>
                                    </>
                                )}
                            </div>
                        </Card>

                        {file && (
                            <div className="mt-6 flex justify-center">
                                <Button
                                    variant="shield"
                                    size="lg"
                                    onClick={handleAnalyze}
                                    className="min-w-[200px]"
                                >
                                    <Shield className="w-5 h-5 mr-2" />
                                    Analyze Contract
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}

                {(step === "processing" || step === "analyzing") && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Card className="p-12">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-shield/10 mb-6">
                                    <Loader2 className="w-8 h-8 text-shield animate-spin" />
                                </div>
                                <h3 className="text-lg font-medium text-neutral-100 mb-2">
                                    {step === "processing"
                                        ? "Processing document..."
                                        : "Analyzing contract..."}
                                </h3>
                                <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                                    {step === "processing"
                                        ? "Extracting text and structure from your document."
                                        : "AI is reviewing terms, identifying risks, and benchmarking against industry standards."}
                                </p>
                                <div className="max-w-xs mx-auto">
                                    <Progress value={progress} className="h-2" />
                                    <p className="text-sm text-neutral-500 mt-2">{progress}%</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {step === "results" && analysis && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Risk Score Card */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-neutral-100">
                                        Overall Risk Score
                                    </h3>
                                    <p className="text-neutral-400 text-sm mt-1">
                                        Based on {analysis.risks?.length || 0} factors analyzed
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold",
                                        analysis.overallRiskScore >= 80
                                            ? "bg-success-muted text-success"
                                            : analysis.overallRiskScore >= 60
                                                ? "bg-warning-muted text-warning"
                                                : "bg-danger-muted text-danger"
                                    )}
                                >
                                    {analysis.overallRiskScore}
                                </div>
                            </div>
                        </Card>

                        {/* Risk Flags */}
                        {analysis.risks && analysis.risks.length > 0 && (
                            <Card className="p-6">
                                <h3 className="text-lg font-medium text-neutral-100 mb-4">
                                    Risk Flags
                                </h3>
                                <div className="space-y-4">
                                    {analysis.risks.map((risk: any, index: number) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "p-4 rounded-lg border",
                                                risk.severity === "CRITICAL" &&
                                                "bg-danger-muted border-danger/20",
                                                risk.severity === "HIGH" &&
                                                "bg-danger-muted border-danger/20",
                                                risk.severity === "MEDIUM" &&
                                                "bg-warning-muted border-warning/20",
                                                risk.severity === "LOW" &&
                                                "bg-info-muted border-info/20"
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle
                                                    className={cn(
                                                        "w-5 h-5 mt-0.5 shrink-0",
                                                        risk.severity === "CRITICAL" && "text-danger",
                                                        risk.severity === "HIGH" && "text-danger",
                                                        risk.severity === "MEDIUM" && "text-warning",
                                                        risk.severity === "LOW" && "text-info"
                                                    )}
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-neutral-100">
                                                            {risk.category.replace("_", " ")}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "text-xs px-2 py-0.5 rounded-full font-medium",
                                                                risk.severity === "CRITICAL" &&
                                                                "bg-danger/20 text-danger",
                                                                risk.severity === "HIGH" &&
                                                                "bg-danger/20 text-danger",
                                                                risk.severity === "MEDIUM" &&
                                                                "bg-warning/20 text-warning",
                                                                risk.severity === "LOW" &&
                                                                "bg-info/20 text-info"
                                                            )}
                                                        >
                                                            {risk.severity}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-neutral-300 mb-2">
                                                        {risk.explanation}
                                                    </p>
                                                    <p className="text-sm text-neutral-400">
                                                        <strong>Recommendation:</strong> {risk.recommendation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={removeFile} className="flex-1">
                                Upload Different Contract
                            </Button>
                            <Button
                                variant="shield"
                                onClick={() =>
                                    router.push(`/dashboard/contracts/${analysis.contractId}`)
                                }
                                className="flex-1"
                            >
                                View Full Analysis
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
