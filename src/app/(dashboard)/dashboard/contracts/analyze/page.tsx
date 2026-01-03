import { ContractUpload } from "@/components/ui/contract-upload";
import { Shield } from "lucide-react";

export default function ContractAnalyzePage() {
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
                    Upload your contract and let Sovereign's AI identify risks,
                    unfavorable terms, and suggest improvements.
                </p>
            </div>

            {/* Upload Component */}
            <ContractUpload />

            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                    <p className="text-2xl font-bold text-shield mb-1">30s</p>
                    <p className="text-sm text-neutral-400">Average analysis time</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                    <p className="text-2xl font-bold text-shield mb-1">50+</p>
                    <p className="text-sm text-neutral-400">Risk factors checked</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                    <p className="text-2xl font-bold text-shield mb-1">100%</p>
                    <p className="text-sm text-neutral-400">Confidential & secure</p>
                </div>
            </div>
        </div>
    );
}
