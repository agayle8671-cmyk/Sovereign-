import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-neutral-800 text-neutral-300 border border-neutral-700",
                primary: "bg-brand-500/10 text-brand-400 border border-brand-500/20",
                secondary: "bg-neutral-700 text-neutral-200",
                success: "bg-success-muted text-success border border-success/20",
                warning: "bg-warning-muted text-warning border border-warning/20",
                danger: "bg-danger-muted text-danger border border-danger/20",
                info: "bg-info-muted text-info border border-info/20",
                shield: "bg-shield/10 text-shield border border-shield/20",
                magnet: "bg-magnet/10 text-magnet border border-magnet/20",
                radar: "bg-radar/10 text-radar border border-radar/20",
                forge: "bg-forge/10 text-forge border border-forge/20",
                outline: "bg-transparent border border-neutral-600 text-neutral-300",
            },
            size: {
                default: "px-2.5 py-0.5 text-xs",
                sm: "px-2 py-0.5 text-2xs",
                lg: "px-3 py-1 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
    dotColor?: string;
}

function Badge({
    className,
    variant,
    size,
    dot,
    dotColor,
    children,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        >
            {dot && (
                <span
                    className={cn(
                        "mr-1.5 h-1.5 w-1.5 rounded-full",
                        dotColor || "bg-current"
                    )}
                />
            )}
            {children}
        </div>
    );
}

export { Badge, badgeVariants };
