"use client";

import Link from "next/link";
import { Sparkles, Twitter, Linkedin, Github, Mail } from "lucide-react";

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
        { name: "API Reference", href: "/api" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press", href: "/press" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
    ],
};

const social = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "GitHub", icon: Github, href: "https://github.com" },
];

export function PremiumFooter() {
    return (
        <footer className="relative border-t border-white/5">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/50 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-white">Sovereign</span>
                        </Link>
                        <p className="text-sm text-neutral-500 mb-6 max-w-xs">
                            The autonomous operating system for freelancers, consultants, and
                            independent professionals.
                        </p>
                        <div className="flex items-center gap-3">
                            {social.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-medium text-white mb-4">Product</h4>
                        <ul className="space-y-3">
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
                        <ul className="space-y-3">
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
                        <ul className="space-y-3">
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
                        <ul className="space-y-3">
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

                {/* Newsletter */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-t border-white/5">
                    <div>
                        <h4 className="font-medium text-white mb-1">
                            Subscribe to our newsletter
                        </h4>
                        <p className="text-sm text-neutral-500">
                            Get product updates and tips for growing your business.
                        </p>
                    </div>
                    <form className="flex gap-2 w-full md:w-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-500/50"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-400 transition-colors whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Sovereign. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            All systems operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
