"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quote, ChevronLeft, ChevronRight, Star, Play } from "lucide-react";

const testimonials = [
    {
        id: 1,
        content:
            "Sovereign caught a clause in my contract that would have given my client ownership of all my future work in the same industry. That's a $50K+ mistake avoided.",
        author: "Sarah Chen",
        role: "Senior UX Designer",
        company: "Freelance",
        avatar: "/testimonials/sarah.jpg",
        rating: 5,
        type: "text",
    },
    {
        id: 2,
        content:
            "I used to spend 2 hours every Monday morning on admin. Now Sovereign handles it all. Those 100+ hours a year go back into billable work.",
        author: "Marcus Johnson",
        role: "Full-Stack Developer",
        company: "Independent",
        avatar: "/testimonials/marcus.jpg",
        rating: 5,
        type: "text",
    },
    {
        id: 3,
        content:
            "The AI-generated pitches have tripled my close rate. Clients think I spent hours personalizing proposals when it took Sovereign 30 seconds.",
        author: "Elena Rodriguez",
        role: "Brand Strategist",
        company: "Studio Elena",
        avatar: "/testimonials/elena.jpg",
        rating: 5,
        type: "text",
    },
    {
        id: 4,
        content:
            "Finally, a tool that understands the nuances of creative contracts. I feel protected and professional.",
        author: "David Kim",
        role: "Illustrator",
        company: "DK Art",
        avatar: "/testimonials/david.jpg",
        rating: 5,
        type: "text",
    }
];

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((c) => (c + 1) % testimonials.length);
    const prev = () =>
        setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        TESTIMONIALS
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        Loved by sovereign professionals
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-8 md:p-12">
                                <Quote className="w-12 h-12 text-brand-500 opacity-50 mb-6" />
                                <blockquote className="text-xl md:text-2xl text-neutral-200 mb-8">
                                    "{testimonials[current].content}"
                                </blockquote>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-neutral-700" />
                                        <div>
                                            <p className="font-semibold text-neutral-100">
                                                {testimonials[current].author}
                                            </p>
                                            <p className="text-sm text-neutral-400">
                                                {testimonials[current].role},{" "}
                                                {testimonials[current].company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-5 h-5",
                                                    i < testimonials[current].rating
                                                        ? "text-yellow-500 fill-current"
                                                        : "text-neutral-600"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button variant="outline" size="icon" onClick={prev}>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-colors",
                                        index === current ? "bg-brand-500" : "bg-neutral-700"
                                    )}
                                />
                            ))}
                        </div>
                        <Button variant="outline" size="icon" onClick={next}>
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
