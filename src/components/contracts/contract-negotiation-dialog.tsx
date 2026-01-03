"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Mail, Sparkles, Copy, Loader2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ContractNegotiationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contract: any;
    risks: any[];
}

export function ContractNegotiationDialog({
    open,
    onOpenChange,
    contract,
    risks,
}: ContractNegotiationDialogProps) {
    const [step, setStep] = useState<"select" | "generating" | "result">("select");
    const [selectedRisks, setSelectedRisks] = useState<Set<number>>(new Set());
    const [generatedEmail, setGeneratedEmail] = useState("");
    const [copied, setCopied] = useState(false);

    const toggleRisk = (index: number) => {
        const newSelected = new Set(selectedRisks);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedRisks(newSelected);
    };

    const handleGenerate = async () => {
        setStep("generating");
        // Simulate API call for AI generation
        setTimeout(() => {
            const email = generateNegotiationEmail(
                contract,
                risks.filter((_, i) => selectedRisks.has(i))
            );
            setGeneratedEmail(email);
            setStep("result");
        }, 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedEmail);
        setCopied(true);
        toast.success("Email copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setStep("select");
        setSelectedRisks(new Set());
        setGeneratedEmail("");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-neutral-900 border-neutral-800 text-neutral-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-shield to-shield-dark flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        AI Contract Negotiation
                    </DialogTitle>
                    <DialogDescription>
                        Generate a professional counter-proposal email addressing the
                        identified risks.
                    </DialogDescription>
                </DialogHeader>

                {step === "select" && (
                    <div className="space-y-4">
                        <p className="text-sm text-neutral-400">
                            Select which issues to address in your negotiation email:
                        </p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {risks.map((risk, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleRisk(index)}
                                    className={cn(
                                        "w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all",
                                        selectedRisks.has(index)
                                            ? "border-shield bg-shield/5"
                                            : "border-neutral-700 hover:border-neutral-600"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5",
                                            selectedRisks.has(index)
                                                ? "bg-shield border-shield"
                                                : "border-neutral-600"
                                        )}
                                    >
                                        {selectedRisks.has(index) && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-neutral-100">
                                                {risk.category.replace(/_/g, " ")}
                                            </span>
                                            <Badge
                                                variant={
                                                    risk.severity === "CRITICAL" || risk.severity === "HIGH"
                                                        ? "danger"
                                                        : "warning"
                                                }
                                                size="sm"
                                            >
                                                {risk.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-neutral-400 mt-1">
                                            {risk.recommendation}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="shield"
                                onClick={handleGenerate}
                                disabled={selectedRisks.size === 0}
                            >
                                Generate Email
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}

                {step === "generating" && (
                    <div className="py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-shield/10 mb-4">
                            <Loader2 className="w-8 h-8 text-shield animate-spin" />
                        </div>
                        <p className="text-neutral-300">
                            Generating professional negotiation email...
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                            Crafting persuasive counter-proposals for {selectedRisks.size}{" "}
                            issue(s)
                        </p>
                    </div>
                )}

                {step === "result" && (
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-neutral-800 max-h-80 overflow-y-auto">
                            <pre className="text-sm text-neutral-300 whitespace-pre-wrap font-sans">
                                {generatedEmail}
                            </pre>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={handleReset} className="flex-1">
                                Regenerate
                            </Button>
                            <Button variant="outline" onClick={handleCopy}>
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2 text-success" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy
                                    </>
                                )}
                            </Button>
                            <Button variant="shield">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function generateNegotiationEmail(contract: any, risks: any[]): string {
    const clientName = contract.extractedTerms?.parties?.client?.name || "Client";

    let riskPoints = risks
        .map((risk, i) => {
            const revision = risk.suggestedRevision
                ? `\n   Suggested revision: "${risk.suggestedRevision}"`
                : "";
            return `${i + 1}. ${risk.category.replace(/_/g, " ")}: ${risk.recommendation}${revision}`;
        })
        .join("\n\n");

    return `Subject: Contract Review - Proposed Amendments

Dear ${clientName},

Thank you for sending over the contract for our upcoming engagement. I've thoroughly reviewed the terms and am excited about the opportunity to work together.

After careful consideration, I'd like to discuss a few clauses that I believe would benefit from some adjustments to ensure a fair and productive working relationship for both parties:

${riskPoints}

These proposed changes align with industry standards and will help ensure a smooth collaboration. I'm confident we can find mutually agreeable terms that protect both of our interests.

I'm happy to schedule a call to discuss these points in detail, or feel free to respond with your thoughts via email.

Looking forward to your response and to moving forward with this project.

Best regards,
[Your Name]`;
}
