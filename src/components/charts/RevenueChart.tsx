"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface RevenueChartProps {
    data?: { month: string; revenue: number; lastYear?: number }[];
    title?: string;
    className?: string;
}

// Generate mock data if none provided
const generateMockData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();

    return months.slice(0, currentMonth + 1).map((month, i) => ({
        month,
        revenue: Math.floor(Math.random() * 15000) + 5000 + (i * 1200),
        lastYear: Math.floor(Math.random() * 12000) + 4000 + (i * 800),
    }));
};

export function RevenueChart({ data, title = "Financial Pulse", className }: RevenueChartProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const chartData = useMemo(() => data || generateMockData(), [data]);

    const totalRevenue = chartData.reduce((acc, d) => acc + d.revenue, 0);
    const lastMonthRevenue = chartData[chartData.length - 1]?.revenue || 0;
    const previousMonthRevenue = chartData[chartData.length - 2]?.revenue || lastMonthRevenue;
    const percentChange = previousMonthRevenue > 0
        ? ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
        : "0";
    const isPositive = Number(percentChange) >= 0;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload?.length) return null;

        return (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl"
            >
                <p className="text-xs text-zinc-400 mb-2">{label}</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm text-white font-medium">
                            ${payload[0]?.value?.toLocaleString()}
                        </span>
                    </div>
                    {payload[1] && (
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-500" />
                            <span className="text-xs text-zinc-400">
                                Last year: ${payload[1]?.value?.toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-6 overflow-hidden",
                "hover:border-white/[0.08] transition-all duration-300",
                "group",
                className
            )}
        >
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-emerald-500/10 blur-[80px] rounded-full" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/20"
                    >
                        <Activity className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                    <div>
                        <h3 className="text-sm font-medium text-white">{title}</h3>
                        <p className="text-xs text-zinc-600">Revenue & trends</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium",
                        isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}
                >
                    {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                    ) : (
                        <TrendingDown className="w-3 h-3" />
                    )}
                    {isPositive ? "+" : ""}{percentChange}%
                </motion.div>
            </div>

            {/* Chart */}
            <div className="relative h-[180px] -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            {/* Primary gradient */}
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="50%" stopColor="#10b981" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>

                            {/* Glow filter */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Animated gradient for stroke */}
                            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10b981">
                                    <animate attributeName="stop-color" values="#10b981;#34d399;#10b981" dur="3s" repeatCount="indefinite" />
                                </stop>
                                <stop offset="50%" stopColor="#34d399">
                                    <animate attributeName="stop-color" values="#34d399;#10b981;#34d399" dur="3s" repeatCount="indefinite" />
                                </stop>
                                <stop offset="100%" stopColor="#10b981">
                                    <animate attributeName="stop-color" values="#10b981;#34d399;#10b981" dur="3s" repeatCount="indefinite" />
                                </stop>
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10 }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#52525b', fontSize: 10 }}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            dx={-5}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: 'rgba(255,255,255,0.1)',
                                strokeWidth: 1,
                                strokeDasharray: '4 4',
                            }}
                        />

                        {/* Last year comparison (dashed line) */}
                        <Area
                            type="monotone"
                            dataKey="lastYear"
                            stroke="#3f3f46"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            fill="none"
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />

                        {/* Primary revenue area */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="url(#strokeGradient)"
                            strokeWidth={2.5}
                            fill="url(#revenueGradient)"
                            filter={isHovered ? "url(#glow)" : undefined}
                            animationDuration={1200}
                            animationEasing="ease-out"
                            dot={false}
                            activeDot={{
                                r: 6,
                                fill: "#10b981",
                                stroke: "#0f0f12",
                                strokeWidth: 2,
                                filter: "url(#glow)",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>

                {/* Live indicator */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-2 right-2 flex items-center gap-1.5"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-emerald-400 font-medium">LIVE</span>
                </motion.div>
            </div>

            {/* Stats */}
            <div className="relative grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/[0.04]">
                <StatItem label="Total Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}k`} />
                <StatItem label="Runway" value="8.2 mo" valueColor="text-emerald-400" />
                <StatItem label="Pending" value="$12.4k" valueColor="text-amber-400" />
            </div>
        </motion.div>
    );
}

function StatItem({
    label,
    value,
    valueColor = "text-white"
}: {
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <div>
            <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
            <p className={cn("text-lg font-semibold", valueColor)}>{value}</p>
        </div>
    );
}
