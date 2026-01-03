"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/animations";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Sovereign caught a $12,000 liability clause I would have completely missed. Paid for itself 100x over on day one.",
        author: "Sarah Chen",
        title: "UX Designer",
        company: "Independent",
        rating: 5,
    },
    {
        quote: "I used to spend 3 hours reviewing every contract. Now it takes 10 minutes. The AI negotiation emails are incredibly good.",
        author: "Marcus Rodriguez",
        title: "Full-Stack Developer",
        company: "Freelance",
        rating: 5,
    },
    {
        quote: "The client health scoring predicted exactly which clients would become problems. It's like having a business analyst on staff.",
        author: "Emily Watson",
        title: "Brand Strategist",
        company: "Watson Design Co",
        rating: 5,
    },
    {
        quote: "Collecting testimonials used to be awkward. Now I just send a magic link and they come in beautifully formatted. Game changer.",
        author: "James Park",
        title: "Video Producer",
        company: "Park Productions",
        rating: 5,
    },
];

const stats = [
    { value: "10,000+", label: "Freelancers Protected" },
    { value: "$2.4M", label: "Risk Identified" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "50%", label: "Time Saved" },
];

export function SocialProofSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const goTo = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const goPrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <section ref={ref} className="relative py-24 bg-black overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={springs.smooth}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ ...springs.smooth, delay: i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </p>
                            <p className="text-sm text-neutral-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                    {/* Rating */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ ...springs.smooth, delay: 0.3 }}
                        className="flex items-center justify-center gap-1 mb-8"
                    >
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="ml-2 text-sm text-neutral-400">
                            4.9/5 from 847 reviews
                        </span>
                    </motion.div>

                    {/* Testimonial */}
                    <div className="relative h-[280px] md:h-[200px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={springs.smooth}
                                className="absolute inset-0"
                            >
                                <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                                    {/* Quote icon */}
                                    <Quote className="absolute top-6 left-6 w-8 h-8 text-indigo-500/30" />

                                    <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-6 pl-6">
                                        "{testimonials[activeIndex].quote}"
                                    </blockquote>

                                    <div className="flex items-center gap-4 pl-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                            {testimonials[activeIndex].author[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">
                                                {testimonials[activeIndex].author}
                                            </p>
                                            <p className="text-sm text-neutral-400">
                                                {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={springs.snappy}
                            onClick={goPrev}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex
                                            ? "bg-indigo-500 w-6"
                                            : "bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={springs.snappy}
                            onClick={goNext}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}
