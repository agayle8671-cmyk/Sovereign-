import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700",
                destructive:
                    "bg-danger text-white shadow-sm hover:bg-danger-dark active:bg-red-700",
                outline:
                    "border border-neutral-700 bg-transparent text-neutral-100 hover:bg-neutral-800 hover:border-neutral-600",
                secondary:
                    "bg-neutral-800 text-neutral-100 shadow-sm hover:bg-neutral-750 active:bg-neutral-700",
                ghost:
                    "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100",
                link: "text-brand-500 underline-offset-4 hover:underline",
                shield:
                    "bg-gradient-to-r from-shield to-shield-dark text-white shadow-sm hover:from-shield-light hover:to-shield",
                magnet:
                    "bg-gradient-to-r from-magnet to-magnet-dark text-white shadow-sm hover:from-magnet-light hover:to-magnet",
                radar:
                    "bg-gradient-to-r from-radar to-radar-dark text-white shadow-sm hover:from-radar-light hover:to-radar",
                forge:
                    "bg-gradient-to-r from-forge to-forge-dark text-white shadow-sm hover:from-forge-light hover:to-forge",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-12 rounded-xl px-6 text-base",
                xl: "h-14 rounded-xl px-8 text-lg",
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
                "icon-lg": "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
