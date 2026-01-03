"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How does Contract Shield analyze my contracts?",
        answer:
            "Our AI reads every clause in your contract and compares it against industry standards and best practices. It identifies risky terms like unlimited revisions, IP issues, unfavorable payment terms, and missing protections. The analysis typically takes 30-60 seconds depending on document length.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely. We use bank-level AES-256 encryption for all data at rest and in transit. Your contracts are processed in isolated environments and never used to train AI models. We're SOC 2 Type II compliant and conduct regular security audits.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes, you can cancel your subscription at any time with no questions asked. If you cancel, you'll retain access until the end of your billing period. We also offer a 14-day free trial on all paid plans—no credit card required.",
    },
    {
        question: "Does it work with any type of contract?",
        answer:
            "Contract Shield works best with service agreements, NDAs, consulting contracts, and freelance agreements. It supports PDF, DOC, DOCX, and plain text formats. While it can analyze any contract, results are optimized for independent professional work.",
    },
    {
        question: "How does the testimonial collection work?",
        answer:
            "When you request a testimonial, we send your client a secure magic link. They can submit text or video feedback in under 2 minutes—no account needed. You review and approve testimonials before they appear on your portfolio.",
    },
    {
        question: "Can I white-label my portfolio?",
        answer:
            "Yes! On the Agency plan, you can use your own domain, customize colors and branding, and remove all Sovereign branding. Your portfolio will look completely native to your business.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="faq" className="relative py-32">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Frequently asked questions
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Everything you need to know about Sovereign
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full"
                                >
                                    <div
                                        className={cn(
                                            "p-6 rounded-2xl text-left transition-all duration-300",
                                            isOpen
                                                ? "bg-neutral-900 border border-white/10"
                                                : "bg-neutral-900/50 border border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <h3 className="font-semibold text-white text-lg">
                                                {faq.question}
                                            </h3>
                                            <div
                                                className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                                    isOpen ? "bg-brand-500" : "bg-white/5"
                                                )}
                                            >
                                                {isOpen ? (
                                                    <Minus className="w-4 h-4 text-white" />
                                                ) : (
                                                    <Plus className="w-4 h-4 text-neutral-400" />
                                                )}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pt-4 text-neutral-400 leading-relaxed">
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
