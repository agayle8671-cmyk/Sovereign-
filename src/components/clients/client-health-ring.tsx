"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClientHealthRingProps {
    score: number;
    size?: number;
}

export function ClientHealthRing({ score, size = 140 }: ClientHealthRingProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (animatedScore / 100) * circumference;

    const getColor = (score: number) => {
        if (score >= 80) return { main: "#10b981", glow: "rgba(16, 185, 129, 0.3)" };
        if (score >= 60) return { main: "#f59e0b", glow: "rgba(245, 158, 11, 0.3)" };
        return { main: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" };
    };

    const color = getColor(score);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 100);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <div
                className="absolute inset-0 rounded-full blur-xl opacity-50"
                style={{ backgroundColor: color.glow }}
            />

            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />

                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color.main}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        filter: `drop-shadow(0 0 8px ${color.glow})`,
                    }}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                    className="text-4xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {animatedScore}
                </motion.span>
                <span className="text-sm text-neutral-400">Health</span>
            </div>
        </div>
    );
}
