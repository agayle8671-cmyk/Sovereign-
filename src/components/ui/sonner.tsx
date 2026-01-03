"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-neutral-900 group-[.toaster]:text-neutral-100 group-[.toaster]:border-neutral-800 group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-neutral-400",
                    actionButton:
                        "group-[.toast]:bg-brand-500 group-[.toast]:text-white",
                    cancelButton:
                        "group-[.toast]:bg-neutral-800 group-[.toast]:text-neutral-300",
                    error:
                        "group-[.toaster]:bg-danger-muted group-[.toaster]:border-danger/20 group-[.toaster]:text-danger",
                    success:
                        "group-[.toaster]:bg-success-muted group-[.toaster]:border-success/20 group-[.toaster]:text-success",
                    warning:
                        "group-[.toaster]:bg-warning-muted group-[.toaster]:border-warning/20 group-[.toaster]:text-warning",
                    info: "group-[.toaster]:bg-info-muted group-[.toaster]:border-info/20 group-[.toaster]:text-info",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
