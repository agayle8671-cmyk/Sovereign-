"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function StickyNav() {
    const [visible, setVisible] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            // Show nav after scrolling past hero (100vh)
            if (currentScroll > window.innerHeight * 0.8) {
                // Show when scrolling up, hide when scrolling down
                setVisible(currentScroll < lastScroll || currentScroll < window.innerHeight);
            } else {
                setVisible(false);
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 left-0 right-0 z-50"
                >
                    <div className="mx-4 mt-4">
                        <div className="max-w-6xl mx-auto px-6 py-3 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="text-lg font-semibold text-white">
                                    Sovereign
                                </Link>

                                <div className="hidden md:flex items-center gap-8">
                                    <Link href="#product" className="text-sm text-white/60 hover:text-white transition-colors">
                                        Product
                                    </Link>
                                    <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
                                        Features
                                    </Link>
                                    <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                                        Pricing
                                    </Link>
                                </div>

                                <SignedIn>
                                    <Link href="/dashboard">
                                        <button className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors">
                                            Dashboard
                                        </button>
                                    </Link>
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/signup">
                                        <button className="px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-colors">
                                            Get Started
                                        </button>
                                    </Link>
                                </SignedOut>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
