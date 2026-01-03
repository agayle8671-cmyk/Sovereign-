import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, iconPosition = "left", ...props }, ref) => {
        if (icon) {
            return (
                <div className="relative">
                    {iconPosition === "left" && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            iconPosition === "left" && "pl-10",
                            iconPosition === "right" && "pr-10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {iconPosition === "right" && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                            {icon}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
