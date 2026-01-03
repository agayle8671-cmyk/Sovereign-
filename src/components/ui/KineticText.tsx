"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface KineticTextProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // 1-10
}

export function KineticText({
    children,
    className,
    intensity = 5,
}: KineticTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Create a parallax effect for the text itself
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [intensity * 10, -intensity * 10]
    );

    // Subtle scale effect
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.span
            ref={ref}
            style={{ y, scale }}
            className={cn("inline-block will-change-transform", className)}
        >
            {children}
        </motion.span>
    );
}
