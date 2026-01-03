"use client";

import { motion } from "framer-motion";

const logos = [
    { name: "Vercel", opacity: 0.5 },
    { name: "Stripe", opacity: 0.5 },
    { name: "Linear", opacity: 0.5 },
    { name: "Notion", opacity: 0.5 },
    { name: "Figma", opacity: 0.5 },
    { name: "Framer", opacity: 0.5 },
];

export function LogoCloud() {
    return (
        <section className="relative py-20 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-neutral-500 mb-10"
                >
                    Trusted by freelancers working with
                </motion.p>

                <div className="relative overflow-hidden">
                    {/* Gradient masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

                    {/* Scrolling logos */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-16 w-fit"
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            <div
                                key={index}
                                className="text-2xl font-bold text-white/20 whitespace-nowrap"
                            >
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
