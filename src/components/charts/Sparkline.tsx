"use client";

import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklineProps {
    data?: number[];
    width?: number;
    height?: number;
    color?: "emerald" | "cyan" | "amber" | "purple" | "rose";
    showGradient?: boolean;
    animated?: boolean;
    className?: string;
}

const colorMap = {
    emerald: { stroke: "#10b981", gradient: "sparklineGradientEmerald" },
    cyan: { stroke: "#06b6d4", gradient: "sparklineGradientCyan" },
    amber: { stroke: "#f59e0b", gradient: "sparklineGradientAmber" },
    purple: { stroke: "#a855f7", gradient: "sparklineGradientPurple" },
    rose: { stroke: "#f43f5e", gradient: "sparklineGradientRose" },
};

// Generate random data for demo
const generateRandomData = (length: number = 7) => {
    const base = Math.random() * 50 + 25;
    return Array.from({ length }, (_, i) =>
        Math.max(0, base + Math.random() * 30 - 15 + (i * 2))
    );
};

export function Sparkline({
    data,
    width = 80,
    height = 32,
    color = "emerald",
    showGradient = true,
    animated = true,
    className,
}: SparklineProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sparklineData = useMemo(() => data || generateRandomData(), [data]);
    const colors = colorMap[color];

    const { path, areaPath } = useMemo(() => {
        if (!sparklineData.length) return { path: "", areaPath: "" };

        const min = Math.min(...sparklineData);
        const max = Math.max(...sparklineData);
        const range = max - min || 1;
        const padding = 2;

        const points = sparklineData.map((value, index) => ({
            x: padding + (index / (sparklineData.length - 1)) * (width - padding * 2),
            y: padding + (1 - (value - min) / range) * (height - padding * 2),
        }));

        // Create smooth bezier curve
        let linePath = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const cp1x = current.x + (next.x - current.x) / 3;
            const cp2x = current.x + (2 * (next.x - current.x)) / 3;
            linePath += ` C ${cp1x} ${current.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`;
        }

        // Area path (for gradient fill)
        const area = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

        return { path: linePath, areaPath: area };
    }, [sparklineData, width, height]);

    const trend = sparklineData[sparklineData.length - 1] > sparklineData[0] ? "up" : "down";

    return (
        <div className={cn("relative", className)}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className="overflow-visible"
            >
                <defs>
                    {/* Gradient fills for each color */}
                    <linearGradient id="sparklineGradientEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradientCyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradientAmber" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradientPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sparklineGradientRose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="sparklineGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Gradient fill area */}
                {showGradient && (
                    <motion.path
                        d={areaPath}
                        fill={`url(#${colors.gradient})`}
                        initial={animated ? { opacity: 0 } : undefined}
                        animate={mounted ? { opacity: 1 } : undefined}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />
                )}

                {/* Main line */}
                <motion.path
                    d={path}
                    fill="none"
                    stroke={colors.stroke}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#sparklineGlow)"
                    initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
                    animate={mounted ? { pathLength: 1, opacity: 1 } : undefined}
                    transition={{
                        pathLength: { duration: 1, ease: "easeOut" },
                        opacity: { duration: 0.3 },
                    }}
                />

                {/* End point dot */}
                {sparklineData.length > 0 && (
                    <motion.circle
                        cx={width - 2}
                        cy={(() => {
                            const min = Math.min(...sparklineData);
                            const max = Math.max(...sparklineData);
                            const range = max - min || 1;
                            return 2 + (1 - (sparklineData[sparklineData.length - 1] - min) / range) * (height - 4);
                        })()}
                        r={3}
                        fill={colors.stroke}
                        initial={animated ? { scale: 0, opacity: 0 } : undefined}
                        animate={mounted ? { scale: 1, opacity: 1 } : undefined}
                        transition={{ delay: 0.8, duration: 0.3 }}
                    >
                        <animate
                            attributeName="r"
                            values="3;4;3"
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
        </div>
    );
}

// Compact version for stat tiles
export function MiniSparkline({
    data,
    trend,
    color = "emerald",
}: {
    data?: number[];
    trend?: "up" | "down";
    color?: "emerald" | "cyan" | "amber" | "purple" | "rose";
}) {
    return (
        <div className="flex items-center gap-2">
            <Sparkline
                data={data}
                width={48}
                height={20}
                color={color}
                showGradient={false}
            />
            {trend && (
                <span className={cn(
                    "text-[10px] font-medium",
                    trend === "up" ? "text-emerald-400" : "text-red-400"
                )}>
                    {trend === "up" ? "▲" : "▼"}
                </span>
            )}
        </div>
    );
}
