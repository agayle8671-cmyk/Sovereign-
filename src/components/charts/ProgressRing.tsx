"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
    value: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: "emerald" | "cyan" | "amber" | "purple" | "rose";
    showLabel?: boolean;
    label?: string;
    showValue?: boolean;
    className?: string;
    animated?: boolean;
}

const colorMap = {
    emerald: {
        stroke: "#10b981",
        gradient: ["#10b981", "#34d399"],
        glow: "rgba(16, 185, 129, 0.4)",
    },
    cyan: {
        stroke: "#06b6d4",
        gradient: ["#06b6d4", "#22d3ee"],
        glow: "rgba(6, 182, 212, 0.4)",
    },
    amber: {
        stroke: "#f59e0b",
        gradient: ["#f59e0b", "#fbbf24"],
        glow: "rgba(245, 158, 11, 0.4)",
    },
    purple: {
        stroke: "#a855f7",
        gradient: ["#a855f7", "#c084fc"],
        glow: "rgba(168, 85, 247, 0.4)",
    },
    rose: {
        stroke: "#f43f5e",
        gradient: ["#f43f5e", "#fb7185"],
        glow: "rgba(244, 63, 94, 0.4)",
    },
};

export function ProgressRing({
    value,
    size = 120,
    strokeWidth = 8,
    color = "emerald",
    showLabel = true,
    label,
    showValue = true,
    className,
    animated = true,
}: ProgressRingProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const colors = colorMap[color];
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const clampedValue = Math.min(100, Math.max(0, value));
    const offset = circumference - (clampedValue / 100) * circumference;
    const center = size / 2;
    const gradientId = `progressGradient-${color}-${Math.random().toString(36).substr(2, 9)}`;
    const glowId = `progressGlow-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                <defs>
                    {/* Gradient */}
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors.gradient[0]} />
                        <stop offset="100%" stopColor={colors.gradient[1]} />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                />

                {/* Track pattern (subtle dots) */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth={strokeWidth}
                    strokeDasharray="2 8"
                />

                {/* Progress arc */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    filter={`url(#${glowId})`}
                    initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
                    animate={mounted ? { strokeDashoffset: offset } : undefined}
                    transition={{
                        duration: 1.5,
                        ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
                    }}
                    style={{
                        filter: `drop-shadow(0 0 6px ${colors.glow})`,
                    }}
                />

                {/* Endpoint glow */}
                {clampedValue > 0 && (
                    <motion.circle
                        cx={center + radius * Math.cos((2 * Math.PI * clampedValue) / 100 - Math.PI / 2)}
                        cy={center + radius * Math.sin((2 * Math.PI * clampedValue) / 100 - Math.PI / 2)}
                        r={strokeWidth / 2 + 2}
                        fill={colors.stroke}
                        initial={animated ? { opacity: 0, scale: 0 } : undefined}
                        animate={mounted ? { opacity: 1, scale: 1 } : undefined}
                        transition={{ delay: 1.2, duration: 0.3 }}
                    >
                        <animate
                            attributeName="r"
                            values={`${strokeWidth / 2 + 2};${strokeWidth / 2 + 4};${strokeWidth / 2 + 2}`}
                            dur="2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="1;0.6;1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                )}
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showValue && (
                    <motion.span
                        initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
                        animate={mounted ? { opacity: 1, scale: 1 } : undefined}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="text-2xl font-bold text-white"
                    >
                        {Math.round(clampedValue)}%
                    </motion.span>
                )}
                {showLabel && label && (
                    <motion.span
                        initial={animated ? { opacity: 0 } : undefined}
                        animate={mounted ? { opacity: 1 } : undefined}
                        transition={{ delay: 0.7 }}
                        className="text-[10px] text-zinc-500 uppercase tracking-wider"
                    >
                        {label}
                    </motion.span>
                )}
            </div>
        </div>
    );
}

// Multi-ring variant for multiple metrics
export function MultiProgressRing({
    rings,
    size = 160,
    strokeWidth = 8,
    gap = 4,
}: {
    rings: Array<{
        value: number;
        color: "emerald" | "cyan" | "amber" | "purple" | "rose";
        label?: string;
    }>;
    size?: number;
    strokeWidth?: number;
    gap?: number;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative inline-flex items-center justify-center">
            {rings.map((ring, index) => {
                const adjustedSize = size - (index * (strokeWidth + gap) * 2);
                const colors = colorMap[ring.color];
                const radius = (adjustedSize - strokeWidth) / 2;
                const circumference = radius * 2 * Math.PI;
                const offset = circumference - (ring.value / 100) * circumference;
                const center = size / 2;
                const gradientId = `multiGradient-${ring.color}-${index}`;

                return (
                    <svg
                        key={index}
                        width={size}
                        height={size}
                        className="absolute transform -rotate-90"
                    >
                        <defs>
                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={colors.gradient[0]} />
                                <stop offset="100%" stopColor={colors.gradient[1]} />
                            </linearGradient>
                        </defs>

                        {/* Background */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth={strokeWidth}
                        />

                        {/* Progress */}
                        <motion.circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke={`url(#${gradientId})`}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={mounted ? { strokeDashoffset: offset } : undefined}
                            transition={{
                                duration: 1.5,
                                delay: index * 0.2,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            style={{
                                filter: `drop-shadow(0 0 4px ${colors.glow})`,
                            }}
                        />
                    </svg>
                );
            })}

            {/* Center content */}
            <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
                <span className="text-xl font-bold text-white">
                    {Math.round(rings.reduce((acc, r) => acc + r.value, 0) / rings.length)}%
                </span>
                <span className="text-[10px] text-zinc-500">Average</span>
            </div>
        </div>
    );
}

// Gauge variant (semi-circle)
export function GaugeRing({
    value,
    size = 140,
    strokeWidth = 10,
    label,
    className,
}: {
    value: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
    className?: string;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI; // Half circle
    const clampedValue = Math.min(100, Math.max(0, value));
    const offset = circumference - (clampedValue / 100) * circumference;
    const center = size / 2;

    // Determine color based on value
    const color = clampedValue >= 80 ? "emerald" : clampedValue >= 60 ? "amber" : "rose";
    const colors = colorMap[color];

    return (
        <div className={cn("relative inline-flex flex-col items-center", className)}>
            <svg width={size} height={size / 2 + 10} className="overflow-visible">
                {/* Background arc */}
                <path
                    d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Progress arc */}
                <motion.path
                    d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={mounted ? { strokeDashoffset: offset } : undefined}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{
                        filter: `drop-shadow(0 0 6px ${colors.glow})`,
                    }}
                />
            </svg>

            {/* Value */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-2">
                <span className="text-2xl font-bold text-white">{Math.round(clampedValue)}</span>
                {label && <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>}
            </div>
        </div>
    );
}
