"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/animations";
import { Menu, X, Sparkles } from "lucide-react";

const navItems = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
];

export function MarketingHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    const headerBg = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]
    );

    const headerBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(0px)", "blur(20px)"]
    );

    const headerBorder = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]
    );

    // Lock body scroll when mobile menu open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                style={{
                    backgroundColor: headerBg,
                    backdropFilter: headerBlur,
                    borderBottomColor: headerBorder,
                }}
                className="fixed top-0 left-0 right-0 z-50 border-b"
            >
                <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springs.snappy}
                            className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                        >
                            <Sparkles className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-lg font-semibold text-white">Sovereign</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative px-4 py-2 text-[15px] text-neutral-400 hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <SignedIn>
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={springs.snappy}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 rounded-full border border-white/10 transition-colors"
                                >
                                    Dashboard
                                </motion.button>
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link href="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={springs.snappy}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 rounded-full shadow-lg shadow-indigo-500/25"
                                >
                                    Get Started Free
                                </motion.button>
                            </Link>
                        </SignedOut>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        transition={springs.snappy}
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden p-2 text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </motion.button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={springs.smooth}
                            className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-neutral-900 border-l border-white/10 md:hidden"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <span className="text-lg font-semibold text-white">Menu</span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 text-neutral-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                            <div className="p-5 space-y-1">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ ...springs.smooth, delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block py-3 text-lg text-neutral-300 hover:text-white transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 space-y-3">
                                <SignedIn>
                                    <Link href="/dashboard" className="block">
                                        <button className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                                            Go to Dashboard
                                        </button>
                                    </Link>
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/login" className="block">
                                        <button className="w-full py-3 text-sm font-medium text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors">
                                            Sign in
                                        </button>
                                    </Link>
                                    <Link href="/signup" className="block">
                                        <button className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                                            Get Started Free
                                        </button>
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
