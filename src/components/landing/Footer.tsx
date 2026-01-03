"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { springs } from "@/lib/animations";
import { Sparkles, Twitter, Linkedin, Github } from "lucide-react";

const navigation = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
        { name: "Changelog", href: "/changelog" },
    ],
    resources: [
        { name: "Documentation", href: "/docs" },
        { name: "Blog", href: "/blog" },
        { name: "Templates", href: "/templates" },
        { name: "API", href: "/api" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
    ],
    social: [
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "LinkedIn", icon: Linkedin, href: "#" },
        { name: "GitHub", icon: Github, href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-white">Sovereign</span>
                        </Link>
                        <p className="text-sm text-neutral-500 mb-4 max-w-xs">
                            The autonomous operating system for freelancers, consultants, and
                            independent professionals.
                        </p>
                        <div className="flex items-center gap-2">
                            {navigation.social.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={springs.snappy}
                                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <item.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            {navigation.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {navigation.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Sovereign. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
