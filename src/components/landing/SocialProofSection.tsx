"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "Caught a $12,000 liability clause I would have missed.",
        author: "Sarah Chen",
        role: "UX Designer",
    },
    {
        quote: "Went from 3 hours per contract to 10 minutes.",
        author: "Marcus Rodriguez",
        role: "Developer",
    },
    {
        quote: "The AI predicted exactly which client would become a problem.",
        author: "Emily Watson",
        role: "Strategist",
    },
];

export function SocialProofSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-32">
            <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto px-6 text-center">
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-3 text-white/60">4.9 from 847 reviews</span>
                </div>

                {/* Rotating testimonial */}
                <div className="relative h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <blockquote className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                                "{testimonials[activeIndex].quote}"
                            </blockquote>
                            <p className="text-white/60">
                                <span className="text-white">{testimonials[activeIndex].author}</span>
                                {" · "}
                                {testimonials[activeIndex].role}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-white w-8" : "bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
