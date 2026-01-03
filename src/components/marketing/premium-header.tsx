"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles, ChevronRight, ArrowRight } from "lucide-react";

const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
];

export function PremiumMarketingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    scrolled
                        ? "bg-neutral-950/80 backdrop-blur-2xl border-b border-white/5"
                        : "bg-transparent"
                )}
            >
                <nav className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-brand-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xl font-semibold text-white">Sovereign</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors group"
                                >
                                    {item.name}
                                    <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
                                >
                                    Dashboard
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all overflow-hidden"
                                >
                                    <span className="relative z-10">Get Started Free</span>
                                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </Link>
                            </SignedOut>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-xl lg:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-neutral-900 border-l border-white/10 lg:hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-lg font-semibold text-white">
                                        Sovereign
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <nav className="p-6 space-y-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        {item.name}
                                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                                    </Link>
                                ))}
                            </nav>
                            <div className="p-6 mt-auto border-t border-white/5 space-y-3">
                                <SignedIn>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium"
                                    >
                                        Go to Dashboard
                                    </Link>
                                </SignedIn>
                                <SignedOut>
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium"
                                    >
                                        Get Started Free
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </SignedOut>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
