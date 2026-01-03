"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Customers", href: "/customers" },
    { name: "Blog", href: "/blog" },
];

export function MarketingHeader() {
    const { isSignedIn } = useAuth();
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
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-glow">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-white">Sovereign</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="p-2 text-neutral-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
                        {isSignedIn ? (
                            <Button asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden"
                    >
                        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-xl">
                            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-lg font-semibold text-white">
                                            Sovereign
                                        </span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="p-2 text-neutral-400 hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="border-t border-neutral-800 py-6 space-y-3">
                                        {isSignedIn ? (
                                            <Button className="w-full" asChild>
                                                <Link href="/dashboard">Dashboard</Link>
                                            </Button>
                                        ) : (
                                            <>
                                                <Button variant="outline" className="w-full" asChild>
                                                    <Link href="/login">Log in</Link>
                                                </Button>
                                                <Button className="w-full" asChild>
                                                    <Link href="/signup">Get Started</Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
