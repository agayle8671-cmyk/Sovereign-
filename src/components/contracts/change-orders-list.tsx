import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { FileText } from "lucide-react";

interface ChangeOrder {
    id: string;
    description: string;
    impact: string;
    costChange: string | null;
    status: "pending_approval" | "approved" | "rejected";
    requestedDate: Date;
}

export function ChangeOrdersList({ items }: { items: ChangeOrder[] }) {
    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-neutral-400">
                No change orders recorded.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <Card key={item.id} className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded bg-neutral-800">
                            <FileText className="w-5 h-5 text-neutral-400" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-neutral-100">
                                    {item.description}
                                </h4>
                                <div className="text-right">
                                    <Badge
                                        variant={
                                            item.status === "approved"
                                                ? "success"
                                                : item.status === "rejected"
                                                    ? "danger"
                                                    : "warning"
                                        }
                                    >
                                        {item.status.replace("_", " ")}
                                    </Badge>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-neutral-400">
                                <p>Impact: {item.impact}</p>
                                <div className="flex justify-between mt-2">
                                    <span>Requested {formatRelativeTime(item.requestedDate)}</span>
                                    {item.costChange && (
                                        <span className="text-neutral-200 font-medium">
                                            {formatCurrency(parseFloat(item.costChange))}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
