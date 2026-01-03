"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export function StatementSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const words = [
        "We", "built", "Sovereign", "to", "eliminate", "the", "chaos",
        "of", "freelancing.", "Focus", "on", "your", "craft,",
        "not", "your", "contracts."
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-[80vh] flex items-center justify-center py-32 bg-black text-white"
        >
            <motion.div
                style={{ opacity }}
                className="max-w-4xl mx-auto px-6 text-center"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
                    {words.map((word, i) => (
                        <span key={i} className="inline-block relative overflow-hidden mr-[0.25em] pb-2">
                            <motion.span
                                custom={i}
                                initial={{ y: "100%" }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.33, 1, 0.68, 1],
                                    delay: i * 0.05
                                }}
                                className="inline-block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 inline-flex items-center gap-8 py-6 px-10 rounded-full bg-white/5 border border-white/5 backdrop-blur-md"
                >
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">$2.4M</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Risk Averted</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">840+</span>
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Active Users</span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
