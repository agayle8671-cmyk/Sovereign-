"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthHeatmapProps {
    data?: { date: string; value: number; label?: string }[];
    weeks?: number;
    color?: "emerald" | "cyan" | "amber" | "purple" | "rose";
    showLabels?: boolean;
    className?: string;
}

const colorSchemes = {
    emerald: {
        empty: "bg-zinc-800/30",
        levels: [
            "bg-emerald-900/30",
            "bg-emerald-700/40",
            "bg-emerald-600/60",
            "bg-emerald-500/80",
            "bg-emerald-500",
        ],
    },
    cyan: {
        empty: "bg-zinc-800/30",
        levels: [
            "bg-cyan-900/30",
            "bg-cyan-700/40",
            "bg-cyan-600/60",
            "bg-cyan-500/80",
            "bg-cyan-500",
        ],
    },
    amber: {
        empty: "bg-zinc-800/30",
        levels: [
            "bg-amber-900/30",
            "bg-amber-700/40",
            "bg-amber-600/60",
            "bg-amber-500/80",
            "bg-amber-500",
        ],
    },
    purple: {
        empty: "bg-zinc-800/30",
        levels: [
            "bg-purple-900/30",
            "bg-purple-700/40",
            "bg-purple-600/60",
            "bg-purple-500/80",
            "bg-purple-500",
        ],
    },
    rose: {
        empty: "bg-zinc-800/30",
        levels: [
            "bg-rose-900/30",
            "bg-rose-700/40",
            "bg-rose-600/60",
            "bg-rose-500/80",
            "bg-rose-500",
        ],
    },
};

// Generate mock activity data
const generateMockData = (weeks: number) => {
    const data: { date: string; value: number }[] = [];
    const today = new Date();

    for (let i = weeks * 7 - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Simulate varying activity levels
        let value = 0;
        if (Math.random() > 0.3) { // 70% chance of some activity
            value = Math.floor(Math.random() * 100);
        }

        data.push({
            date: date.toISOString().split("T")[0],
            value,
        });
    }

    return data;
};

export function HealthHeatmap({
    data,
    weeks = 12,
    color = "emerald",
    showLabels = true,
    className,
}: HealthHeatmapProps) {
    const [mounted, setMounted] = useState(false);
    const [hoveredCell, setHoveredCell] = useState<{ date: string; value: number; x: number; y: number } | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const heatmapData = useMemo(() => data || generateMockData(weeks), [data, weeks]);
    const scheme = colorSchemes[color];

    // Organize data into weeks
    const weekGrid = useMemo(() => {
        type DayEntry = { date: string; value: number };
        const grid: DayEntry[][] = [];
        let currentWeek: DayEntry[] = [];

        heatmapData.forEach((day, index) => {
            currentWeek.push(day);
            if (currentWeek.length === 7 || index === heatmapData.length - 1) {
                grid.push(currentWeek);
                currentWeek = [];
            }
        });

        return grid;
    }, [heatmapData]);

    const getColorLevel = (value: number) => {
        if (value === 0) return scheme.empty;
        if (value <= 20) return scheme.levels[0];
        if (value <= 40) return scheme.levels[1];
        if (value <= 60) return scheme.levels[2];
        if (value <= 80) return scheme.levels[3];
        return scheme.levels[4];
    };

    const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <div className={cn("relative", className)}>
            <div className="flex gap-0.5">
                {/* Day labels */}
                {showLabels && (
                    <div className="flex flex-col gap-0.5 mr-1">
                        {dayLabels.map((day, i) => (
                            <div
                                key={day + i}
                                className="w-3 h-3 flex items-center justify-center text-[8px] text-zinc-600"
                            >
                                {i % 2 === 0 ? day : ""}
                            </div>
                        ))}
                    </div>
                )}

                {/* Heatmap grid */}
                <div className="flex gap-0.5">
                    {weekGrid.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-0.5">
                            {week.map((day, dayIndex) => (
                                <motion.div
                                    key={day.date}
                                    initial={mounted ? undefined : { scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: (weekIndex * 7 + dayIndex) * 0.005,
                                        duration: 0.2,
                                    }}
                                    onMouseEnter={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setHoveredCell({
                                            ...day,
                                            x: rect.left + rect.width / 2,
                                            y: rect.top,
                                        });
                                    }}
                                    onMouseLeave={() => setHoveredCell(null)}
                                    className={cn(
                                        "w-3 h-3 rounded-[2px] cursor-pointer transition-all duration-150",
                                        getColorLevel(day.value),
                                        "hover:ring-1 hover:ring-white/30 hover:ring-offset-1 hover:ring-offset-[#0f0f12]"
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tooltip */}
            {hoveredCell && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed z-50 px-2 py-1 rounded-lg bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl pointer-events-none"
                    style={{
                        left: hoveredCell.x,
                        top: hoveredCell.y - 40,
                        transform: "translateX(-50%)",
                    }}
                >
                    <p className="text-[10px] text-zinc-400">{hoveredCell.date}</p>
                    <p className="text-xs font-medium text-white">{hoveredCell.value}% active</p>
                </motion.div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] text-zinc-600">Less</span>
                {[scheme.empty, ...scheme.levels].map((level, i) => (
                    <div
                        key={i}
                        className={cn("w-3 h-3 rounded-[2px]", level)}
                    />
                ))}
                <span className="text-[10px] text-zinc-600">More</span>
            </div>
        </div>
    );
}

// Compact variant for dashboard tiles
export function MiniHeatmap({
    data,
    weeks = 8,
    color = "emerald",
}: {
    data?: { date: string; value: number }[];
    weeks?: number;
    color?: "emerald" | "cyan" | "amber" | "purple" | "rose";
}) {
    return (
        <HealthHeatmap
            data={data}
            weeks={weeks}
            color={color}
            showLabels={false}
            className="scale-90 origin-left"
        />
    );
}
