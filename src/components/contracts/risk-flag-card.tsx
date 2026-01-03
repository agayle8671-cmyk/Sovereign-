import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskFlag {
    risk: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    explanation: string;
    recommendation: string;
    category: string;
}

export function RiskFlagCard({ risk }: { risk: RiskFlag }) {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "CRITICAL":
                return "text-danger border-danger/30 bg-danger/10";
            case "HIGH":
                return "text-danger-400 border-danger-400/30 bg-danger-400/10";
            case "MEDIUM":
                return "text-warning border-warning/30 bg-warning/10";
            default:
                return "text-success border-success/30 bg-success/10";
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "CRITICAL":
            case "HIGH":
                return <AlertTriangle className="w-5 h-5" />;
            case "MEDIUM":
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    return (
        <Card className="p-4 border-l-4 border-l-transparent hover:border-l-neutral-700 transition-all">
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        "p-2 rounded-lg border",
                        getSeverityColor(risk.severity)
                    )}
                >
                    {getSeverityIcon(risk.severity)}
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-neutral-100">{risk.risk}</h4>
                        <Badge
                            variant={
                                risk.severity === "CRITICAL" || risk.severity === "HIGH"
                                    ? "danger"
                                    : risk.severity === "MEDIUM"
                                        ? "warning"
                                        : "success" // using success for low risk but could be secondary
                            }
                        >
                            {risk.severity}
                        </Badge>
                    </div>
                    <p className="text-sm text-neutral-400">{risk.explanation}</p>
                    <div className="bg-neutral-800/50 p-3 rounded-md mt-2">
                        <p className="text-sm font-medium text-shield-300">
                            Recommendation:
                        </p>
                        <p className="text-sm text-neutral-300 mt-1">
                            {risk.recommendation}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
