"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does contract analysis work?",
        answer:
            "Sovereign uses advanced AI to parse your contracts, extract key terms, and compare them against our database of freelancer-friendly standards. It identifies risky clauses like unfavorable IP transfers, excessive payment terms, or hidden liabilities, and suggests specific revisions.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Absolutely. Your data is encrypted at rest and in transit. We use single-tenant database isolation for business accounts. Your contract data is never used to train our AI models, and you can delete all your data at any time.",
    },
    {
        question: "Can I use Sovereign with my existing tools?",
        answer:
            "Yes! Sovereign integrates with Gmail, Slack, Google Docs, and more through our browser extension. We're adding new integrations regularly based on user feedback.",
    },
    {
        question: "What happens if I want to cancel?",
        answer:
            "You can cancel anytime from your settings. Your data remains accessible for 30 days after cancellation, giving you time to export anything you need. We don't believe in lock-in.",
    },
    {
        question: "How accurate is the AI?",
        answer:
            "Our contract analysis AI has been trained on hundreds of thousands of freelance contracts and achieves 95%+ accuracy on risk detection. For edge cases, we always recommend human review and provide clear confidence scores.",
    },
    {
        question: "Do you offer team plans?",
        answer:
            "Yes! Our Business plan supports teams of up to 5 users with shared clients, contracts, and portfolio items. Contact us for larger team needs or enterprise features.",
    },
];

export function FaqSection() {
    return (
        <section className="py-20 lg:py-32 relative">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-brand-500 mb-4"
                    >
                        FAQ
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white"
                    >
                        Frequently asked questions
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-neutral-800 rounded-xl px-6 bg-neutral-900/50"
                            >
                                <AccordionTrigger className="text-left text-neutral-100 hover:text-white hover:no-underline py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-neutral-400 pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
