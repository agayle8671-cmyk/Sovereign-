"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function StatementSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-32">
            <motion.div
                style={{ opacity, y }}
                className="max-w-5xl mx-auto px-6 text-center"
            >
                {/* Massive stat */}
                <p className="text-[20vw] md:text-[15vw] font-bold tracking-tighter leading-none">
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        $2.4M
                    </span>
                </p>

                <p className="text-2xl md:text-4xl text-white/60 font-light mt-6 max-w-3xl mx-auto leading-relaxed">
                    in risky contract clauses identified and fixed
                    <br />
                    <span className="text-white">before they became problems.</span>
                </p>
            </motion.div>
        </section>
    );
}
