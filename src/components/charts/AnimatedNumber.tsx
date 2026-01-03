"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    showChange?: boolean;
    previousValue?: number;
}

const sizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
};

export function AnimatedNumber({
    value,
    prefix = "",
    suffix = "",
    decimals = 0,
    duration = 1,
    className,
    size = "lg",
    showChange = false,
    previousValue,
}: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const prevValueRef = useRef(value);

    // Spring animation for smooth counting
    const spring = useSpring(0, {
        stiffness: 100,
        damping: 30,
        duration: duration * 1000,
    });

    // Track changes for shimmer effect
    useEffect(() => {
        if (prevValueRef.current !== value) {
            setIsAnimating(true);
            spring.set(value);
            prevValueRef.current = value;

            const timer = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timer);
        }
    }, [value, spring]);

    // Initial animation on mount
    useEffect(() => {
        spring.set(value);
    }, []);

    // Subscribe to spring changes
    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [spring]);

    const formattedValue = displayValue.toFixed(decimals);
    const change = previousValue !== undefined ? value - previousValue : 0;
    const changePercent = previousValue && previousValue !== 0
        ? ((value - previousValue) / previousValue * 100).toFixed(1)
        : "0";

    return (
        <div className="relative inline-flex items-baseline gap-2">
            <motion.span
                className={cn(
                    "font-bold tabular-nums tracking-tight",
                    sizeMap[size],
                    className
                )}
            >
                {prefix}
                <motion.span
                    animate={isAnimating ? {
                        textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 20px rgba(255,255,255,0.5)",
                            "0 0 0px rgba(255,255,255,0)",
                        ],
                    } : undefined}
                    transition={{ duration: 0.6 }}
                >
                    {formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </motion.span>
                {suffix}
            </motion.span>

            {/* Shimmer overlay on change */}
            {isAnimating && (
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
            )}

            {/* Change indicator */}
            {showChange && previousValue !== undefined && change !== 0 && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "text-xs font-medium",
                        change > 0 ? "text-emerald-400" : "text-red-400"
                    )}
                >
                    {change > 0 ? "+" : ""}{changePercent}%
                </motion.span>
            )}
        </div>
    );
}

// Currency variant
export function AnimatedCurrency({
    value,
    currency = "USD",
    className,
    size = "lg",
}: {
    value: number;
    currency?: "USD" | "EUR" | "GBP";
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}) {
    const symbols = { USD: "$", EUR: "€", GBP: "£" };

    return (
        <AnimatedNumber
            value={value}
            prefix={symbols[currency]}
            decimals={value % 1 !== 0 ? 2 : 0}
            className={className}
            size={size}
        />
    );
}

// Percentage variant
export function AnimatedPercentage({
    value,
    className,
    size = "lg",
    showSign = false,
}: {
    value: number;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    showSign?: boolean;
}) {
    return (
        <AnimatedNumber
            value={value}
            prefix={showSign && value > 0 ? "+" : ""}
            suffix="%"
            decimals={1}
            className={className}
            size={size}
        />
    );
}

// Counter variant with target
export function AnimatedCounter({
    current,
    target,
    label,
    className,
}: {
    current: number;
    target: number;
    label?: string;
    className?: string;
}) {
    const percentage = (current / target) * 100;

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-baseline gap-1">
                <AnimatedNumber value={current} size="lg" className="text-white" />
                <span className="text-sm text-zinc-500">/ {target}</span>
            </div>
            {label && <p className="text-xs text-zinc-600">{label}</p>}

            {/* Progress bar */}
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                        "h-full rounded-full",
                        percentage >= 100 ? "bg-emerald-500" :
                            percentage >= 75 ? "bg-cyan-500" :
                                percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                    )}
                />
            </div>
        </div>
    );
}
