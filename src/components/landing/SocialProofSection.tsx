"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "It felt like I hired a senior legal team for $29/mo.",
        author: "Alex Rivera",
        role: "Product Designer",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
    },
    {
        quote: "The client radar predicted a churn 3 weeks before it happened.",
        author: "Sarah Chen",
        role: "Fractional CTO",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
    }
];

export function SocialProofSection() {
    return (
        <section className="py-24 bg-black border-y border-white/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-neutral-200">
                                "{t.quote}"
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 overflow-hidden">
                                    {/* In a real project we'd use Next/Image */}
                                    <img src={t.image} alt={t.author} className="w-full h-full object-cover grayscale opacity-70" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{t.author}</p>
                                    <p className="text-sm text-neutral-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
