"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface RiskRadarProps {
    data?: { subject: string; A: number; fullMark: number }[];
    className?: string;
    title?: string;
    score?: number;
}

// Mock data
const defaultData = [
    { subject: "Legal", A: 85, fullMark: 100 },
    { subject: "Financial", A: 98, fullMark: 100 },
    { subject: "Scope", A: 65, fullMark: 100 },
    { subject: "Timeline", A: 75, fullMark: 100 },
    { subject: "Compliance", A: 90, fullMark: 100 },
    { subject: "Security", A: 95, fullMark: 100 },
];

export function RiskRadar({
    data = defaultData,
    className,
    title = "Risk Profile",
    score = 82,
}: RiskRadarProps) {
    const [mounted, setMounted] = useState(false);
    const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const overallRisk = score;
    const riskColor = overallRisk >= 80 ? "emerald" : overallRisk >= 60 ? "amber" : "red";

    const colorMap = {
        emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", stroke: "#10b981", fill: "#10b981" },
        amber: { text: "text-amber-400", bg: "bg-amber-500/10", stroke: "#f59e0b", fill: "#f59e0b" },
        red: { text: "text-red-400", bg: "bg-red-500/10", stroke: "#ef4444", fill: "#ef4444" },
    };

    const colors = colorMap[riskColor];

    // Custom Tick Component
    const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }: any) => {
        return (
            <g className="group cursor-pointer" onMouseEnter={() => setHoveredSubject(payload.value)} onMouseLeave={() => setHoveredSubject(null)}>
                <text
                    radius={radius}
                    stroke={stroke}
                    x={x}
                    y={y}
                    className="text-[10px] font-medium fill-zinc-400 hover:fill-white transition-colors uppercase tracking-wider"
                    textAnchor={textAnchor}
                >
                    {payload.value}
                </text>
            </g>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "relative rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-6 flex flex-col overflow-hidden hover:border-white/[0.08] transition-all group",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.bg)}>
                        <Shield className={cn("w-5 h-5", colors.text)} />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white">{title}</h3>
                        <p className="text-xs text-zinc-600">Contract analysis</p>
                    </div>
                </div>

                <div className={cn(
                    "px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2",
                    colors.bg,
                    colors.text,
                    `border-${riskColor}-500/20`
                )}>
                    <span>{overallRisk}/100</span>
                    <span className="opacity-70 font-normal">Safe</span>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="flex-1 min-h-[200px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={<CustomTick />}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Risk Score"
                            dataKey="A"
                            stroke={colors.stroke}
                            fill={colors.fill}
                            fillOpacity={0.2}
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-zinc-900/90 backdrop-blur border border-white/10 p-2 rounded-lg shadow-xl">
                                            <p className="text-xs text-zinc-400 capitalize">{payload[0].name}</p>
                                            <p className={cn("text-lg font-bold", colors.text)}>{payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>

                {/* Center Glow */}
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-[40px] opacity-20 pointer-events-none",
                    colors.bg.replace("/10", "")
                )} />
            </div>

            {/* Info Panel based on hover */}
            <AnimatePresence>
                {hoveredSubject && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 p-3 rounded-xl z-20 shadow-2xl"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="w-4 h-4 text-zinc-400" />
                            <span className="text-sm font-medium text-white">{hoveredSubject} Risk</span>
                        </div>
                        <p className="text-xs text-zinc-400">
                            Analysis based on 24 clauses. Score indicates relative safety compared to industry standards.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />
        </motion.div>
    );
}
