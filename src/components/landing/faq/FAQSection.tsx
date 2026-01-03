"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { springs } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How does Contract Shield analyze contracts?",
        answer:
            "Our AI reads every clause and compares it against 50+ risk factors based on industry standards. It identifies unfavorable terms like unlimited revisions, poor payment terms, IP issues, and missing protections. Analysis typically takes 30-60 seconds.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely. We use AES-256 encryption for all data at rest and in transit. Your contracts are processed in isolated environments and never used to train AI models. We're SOC 2 Type II compliant and undergo regular security audits.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes, you can cancel your subscription at any time with no questions asked. If you cancel, you'll retain access until the end of your billing period. We also offer a 14-day free trial on all paid plans—no credit card required.",
    },
    {
        question: "What file formats do you support?",
        answer:
            "Contract Shield supports PDF, DOC, DOCX, and plain text files up to 16MB. We can also analyze contracts copy-pasted directly into the app. Images of contracts (JPG, PNG) can be processed with OCR.",
    },
    {
        question: "How accurate is the AI analysis?",
        answer:
            "Our AI achieves 94% accuracy in identifying contract risks compared to legal professional review. However, we always recommend having a lawyer review high-stakes contracts. Sovereign is designed to catch issues early, not replace legal counsel.",
    },
    {
        question: "Can I white-label my portfolio?",
        answer:
            "Yes! On the Agency plan, you can use your own custom domain, remove all Sovereign branding, and fully customize colors and styling. Your portfolio will look completely native to your brand.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="faq" ref={ref} className="relative py-32 bg-black">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={springs.smooth}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Everything you need to know about Sovereign
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ ...springs.smooth, delay: index * 0.05 }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full"
                                >
                                    <div
                                        className={cn(
                                            "rounded-2xl text-left transition-all duration-300",
                                            isOpen
                                                ? "bg-white/5 border border-white/10"
                                                : "bg-transparent border border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-4 p-5">
                                            <h3 className="font-medium text-white text-left">
                                                {faq.question}
                                            </h3>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={springs.snappy}
                                                className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                    isOpen ? "bg-indigo-500" : "bg-white/5"
                                                )}
                                            >
                                                {isOpen ? (
                                                    <Minus className="w-4 h-4 text-white" />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-neutral-400" />
                                                )}
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={springs.smooth}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 pb-5 text-neutral-400 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
