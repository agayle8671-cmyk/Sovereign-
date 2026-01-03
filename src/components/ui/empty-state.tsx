import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn("text-center py-12", className)}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 mb-4">
                <Icon className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-100 mb-2">{title}</h3>
            <p className="text-neutral-400 max-w-sm mx-auto mb-6">{description}</p>
            {action && (
                <Button
                    variant="outline"
                    onClick={action.onClick}
                    asChild={!!action.href}
                >
                    {action.href ? (
                        <a href={action.href}>{action.label}</a>
                    ) : (
                        action.label
                    )}
                </Button>
            )}
        </div>
    );
}
