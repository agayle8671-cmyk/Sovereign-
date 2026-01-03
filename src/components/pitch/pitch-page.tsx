"use client";

import Image from "next/image";
import { UserAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ExternalLink,
    Star,
    Mail,
    Calendar,
    ArrowRight,
    Sparkles,
    Quote,
} from "lucide-react";
import { motion } from "framer-motion";

interface PitchPageProps {
    pitch: {
        id: string;
        leadName: string | null;
        leadCompany: string | null;
        leadIndustry: string | null;
        customHeadline: string | null;
        customIntro: string | null;
        generatedMockups: any[];
    };
    user: {
        name: string | null;
        email: string;
        avatarUrl: string | null;
    };
    portfolio: {
        id: string;
        title: string;
        shortDescription: string | null;
        thumbnailUrl: string | null;
        externalUrl: string | null;
        category: string | null;
    }[];
    testimonials: {
        id: string;
        content: string | null;
        rating: number | null;
        clientName: string | null;
        clientTitle: string | null;
        clientCompany: string | null;
        clientAvatar: string | null;
    }[];
}

export function PitchPage({
    pitch,
    user,
    portfolio,
    testimonials,
}: PitchPageProps) {
    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

            {/* Hero */}
            <section className="relative pt-20 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <UserAvatar
                            user={{ name: user.name, avatarUrl: user.avatarUrl }}
                            size="xl"
                            className="mx-auto mb-4"
                        />
                        <p className="text-neutral-400">
                            A personalized proposal from{" "}
                            <span className="text-neutral-200">{user.name}</span>
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        {pitch.customHeadline || (
                            <>
                                Hello{pitch.leadName ? `, ${pitch.leadName.split(" ")[0]}` : ""}!
                                <br />
                                <span className="text-gradient-brand">
                                    Let's create something amazing together
                                </span>
                            </>
                        )}
                    </motion.h1>

                    {pitch.customIntro && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-neutral-300 max-w-2xl mx-auto"
                        >
                            {pitch.customIntro}
                        </motion.p>
                    )}

                    {pitch.leadCompany && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6"
                        >
                            <Badge variant="primary" className="text-sm">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Customized for {pitch.leadCompany}
                            </Badge>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Portfolio Section */}
            {portfolio.length > 0 && (
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Relevant Work
                                {pitch.leadIndustry && ` in ${pitch.leadIndustry}`}
                            </h2>
                            <p className="text-neutral-400 max-w-xl mx-auto">
                                Selected projects that align with your industry and needs.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {portfolio.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden group">
                                        <div className="aspect-video relative bg-neutral-800">
                                            {item.thumbnailUrl ? (
                                                <Image
                                                    src={item.thumbnailUrl}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-magnet to-magnet-dark flex items-center justify-center">
                                                        <span className="text-2xl font-bold text-white">
                                                            {item.title[0]}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-neutral-100">
                                                {item.title}
                                            </h3>
                                            {item.shortDescription && (
                                                <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
                                                    {item.shortDescription}
                                                </p>
                                            )}
                                            {item.category && (
                                                <Badge variant="outline" size="sm" className="mt-3">
                                                    {item.category}
                                                </Badge>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-16 px-6 bg-neutral-900/50">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                What Clients Say
                            </h2>
                        </motion.div>

                        <div className="space-y-6">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="p-6">
                                        <div className="flex gap-4">
                                            <Quote className="w-8 h-8 text-magnet shrink-0 opacity-50" />
                                            <div>
                                                {testimonial.content && (
                                                    <blockquote className="text-lg text-neutral-200 italic mb-4">
                                                        "{testimonial.content}"
                                                    </blockquote>
                                                )}
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar
                                                        user={{
                                                            name: testimonial.clientName || "Client",
                                                            avatarUrl: testimonial.clientAvatar,
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium text-neutral-100">
                                                            {testimonial.clientName}
                                                        </p>
                                                        <p className="text-sm text-neutral-400">
                                                            {testimonial.clientTitle}
                                                            {testimonial.clientCompany &&
                                                                ` at ${testimonial.clientCompany}`}
                                                        </p>
                                                    </div>
                                                    {testimonial.rating && (
                                                        <div className="ml-auto flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={cn(
                                                                        "w-4 h-4",
                                                                        i < testimonial.rating!
                                                                            ? "text-yellow-500 fill-current"
                                                                            : "text-neutral-600"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-neutral-400 mb-8">
                            Let's discuss how I can help bring your vision to life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <a href={`mailto:${user.email}`}>
                                    <Mail className="w-5 h-5 mr-2" />
                                    Get in Touch
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="#" target="_blank">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Schedule a Call
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <p className="text-sm text-neutral-500">
                        Powered by{" "}
                        <a href="/" className="text-brand-500 hover:text-brand-400">
                            Sovereign
                        </a>
                    </p>
                    <p className="text-sm text-neutral-500">
                        Created just for {pitch.leadCompany || "you"}
                    </p>
                </div>
            </footer>
        </div>
    );
}
