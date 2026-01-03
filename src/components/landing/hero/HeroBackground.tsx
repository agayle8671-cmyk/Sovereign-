"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface HeroBackgroundProps {
    scrollProgress: MotionValue<number>;
}

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {
    const opacity1 = useTransform(scrollProgress, [0, 0.5], [0.3, 0.6]);
    const opacity2 = useTransform(scrollProgress, [0, 0.5], [0.2, 0.4]);
    const scale1 = useTransform(scrollProgress, [0, 0.5], [1, 1.2]);
    const scale2 = useTransform(scrollProgress, [0, 0.5], [1, 1.3]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-black" />

            {/* Animated orbs */}
            <motion.div
                style={{ opacity: opacity1, scale: scale1 }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/30 blur-[120px]"
            />
            <motion.div
                style={{ opacity: opacity2, scale: scale2 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/25 blur-[100px]"
            />
            <motion.div
                style={{ opacity: opacity2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-pink-500/15 blur-[130px]"
            />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
    );
}
