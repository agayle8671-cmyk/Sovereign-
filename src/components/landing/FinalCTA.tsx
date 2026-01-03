"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[200px]" />
            </div>

            <motion.div style={{ scale, opacity }} className="relative z-10 text-center px-6">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
                    Ready?
                </h2>

                <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-xl mx-auto">
                    Join 10,000+ freelancers who've taken control of their business.
                </p>

                <Link href="/signup">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-10 py-5 text-xl font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </Link>

                <p className="text-white/40 mt-8">No credit card required</p>
            </motion.div>
        </section>
    );
}
