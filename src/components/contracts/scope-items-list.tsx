import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface ScopeItem {
    id: string;
    description: string;
    category: string;
    status: "pending" | "in_progress" | "completed" | "blocked";
    estimatedHours: number | null;
    deliverableType: string | null;
}

export function ScopeItemsList({ items }: { items: ScopeItem[] }) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-5 h-5 text-success" />;
            default:
                return <Circle className="w-5 h-5 text-neutral-500" />;
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-neutral-400">
                No scope items defined.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <Card key={item.id} className="p-4 flex items-start gap-4">
                    <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-neutral-100">{item.description}</p>
                            {item.estimatedHours && (
                                <span className="text-sm text-neutral-400">
                                    {item.estimatedHours} hrs
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" size="sm">
                                {item.category}
                            </Badge>
                            {item.deliverableType && (
                                <Badge variant="outline" size="sm">
                                    {item.deliverableType}
                                </Badge>
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
