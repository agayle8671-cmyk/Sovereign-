"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, DollarSign } from "lucide-react";

const stats = [
    {
        value: "30-50%",
        label: "of productive time lost to admin",
        icon: Clock,
        color: "text-warning",
        bgColor: "bg-warning/10",
    },
    {
        value: "65%",
        label: "sign contracts with risky clauses",
        icon: AlertTriangle,
        color: "text-danger",
        bgColor: "bg-danger/10",
    },
    {
        value: "35%",
        label: "of income lost to scope creep",
        icon: DollarSign,
        color: "text-shield",
        bgColor: "bg-shield/10",
    },
];

export function ProblemSection() {
    return (
        <section className="py-20 lg:py-32 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        THE PROBLEM
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        You&apos;re running a business with tools designed for employees
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-neutral-400"
                    >
                        The average freelancer juggles 7+ disconnected apps and loses
                        thousands of dollars annually to administrative overhead.
                    </motion.p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="relative group"
                        >
                            <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-colors text-center">
                                <div
                                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-6`}
                                >
                                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                                <p className={`text-4xl font-bold ${stat.color} mb-2`}>
                                    {stat.value}
                                </p>
                                <p className="text-neutral-400">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
