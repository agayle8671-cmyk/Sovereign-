"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface ScrollIndicatorProps {
    scrollProgress: MotionValue<number>;
}

export function ScrollIndicator({ scrollProgress }: ScrollIndicatorProps) {
    const opacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);
    const y = useTransform(scrollProgress, [0, 0.1], [0, 20]);

    return (
        <motion.div
            style={{ opacity, y }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
            <span className="text-xs text-neutral-500 uppercase tracking-widest">
                Scroll to explore
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-6 h-10 rounded-full border-2 border-neutral-700 p-1.5"
            >
                <motion.div
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-neutral-500 mx-auto"
                />
            </motion.div>
        </motion.div>
    );
}
