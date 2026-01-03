import { PremiumContractUpload } from "@/components/contracts/premium-contract-upload";
import { Shield, Lock, Zap, FileSearch } from "lucide-react";

export default function ContractAnalyzePage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6 shadow-lg shadow-cyan-500/25">
                    <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">
                    Contract Shield Analysis
                </h1>
                <p className="text-neutral-400 max-w-lg mx-auto">
                    Upload your contract and let AI identify risks, unfavorable terms, and
                    generate negotiation strategies in seconds.
                </p>
            </div>

            {/* Upload Component */}
            <PremiumContractUpload />

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                    {
                        icon: Zap,
                        title: "30-Second Analysis",
                        description: "AI scans every clause instantly",
                    },
                    {
                        icon: FileSearch,
                        title: "50+ Risk Factors",
                        description: "Comprehensive protection check",
                    },
                    {
                        icon: Lock,
                        title: "Bank-Level Security",
                        description: "AES-256 encryption, SOC 2 certified",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="text-center p-6 rounded-2xl bg-neutral-900/30 border border-white/5"
                    >
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                            <item.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h3 className="font-medium text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-neutral-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
