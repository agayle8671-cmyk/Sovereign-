"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        quote:
            "Sovereign caught a $12,000 liability clause I would have missed. Paid for itself 100x over.",
        author: "Sarah Chen",
        role: "UX Designer",
        company: "Independent",
        avatar: "S",
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        quote:
            "My client relationships have never been healthier. The AI sentiment tracking is game-changing.",
        author: "Marcus Johnson",
        role: "Web Developer",
        company: "Freelance",
        avatar: "M",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        quote:
            "Went from chasing testimonials for weeks to collecting them in days. The magic links are brilliant.",
        author: "Elena Rodriguez",
        role: "Brand Strategist",
        company: "Studio Elena",
        avatar: "E",
        gradient: "from-purple-500 to-pink-500",
    },
];

const metrics = [
    { value: "50%", label: "Less admin time" },
    { value: "$847", label: "Avg. risk identified per contract" },
    { value: "3.2x", label: "Faster testimonial collection" },
    { value: "10k+", label: "Freelancers protected" },
];

export function SocialProofSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="relative py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Loved by 10,000+ independents
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Join the freelancers, consultants, and creators who run their
                        business with Sovereign
                    </p>
                </motion.div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-500 h-full">
                                {/* Quote icon */}
                                <div
                                    className={`absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}
                                >
                                    <Quote className="w-4 h-4 text-white" />
                                </div>

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-lg text-neutral-200 leading-relaxed mb-8">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold`}
                                    >
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            {testimonial.role} • {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {metrics.map((metric, index) => (
                        <div
                            key={metric.label}
                            className="text-center p-6 rounded-2xl bg-neutral-900/30 border border-white/5"
                        >
                            <p className="text-4xl font-bold bg-gradient-to-r from-brand-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                {metric.value}
                            </p>
                            <p className="text-sm text-neutral-500">{metric.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
