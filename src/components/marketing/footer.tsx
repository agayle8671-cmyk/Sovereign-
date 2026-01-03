import Link from "next/link";
import { Sparkles } from "lucide-react";

const navigation = {
    product: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Changelog", href: "/changelog" },
        { name: "Roadmap", href: "/roadmap" },
    ],
    resources: [
        { name: "Documentation", href: "/docs" },
        { name: "Blog", href: "/blog" },
        { name: "Guides", href: "/guides" },
        { name: "API Reference", href: "/api" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Customers", href: "/customers" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
    ],
    social: [
        { name: "Twitter", href: "https://twitter.com/sovereign" },
        { name: "LinkedIn", href: "https://linkedin.com/company/sovereign" },
        { name: "GitHub", href: "https://github.com/sovereign" },
    ],
};

export function MarketingFooter() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-950">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Logo and description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-white">Sovereign</span>
                        </Link>
                        <p className="text-sm text-neutral-400 max-w-xs">
                            The Autonomous Commercial Operating System for independent
                            professionals. Defend, attract, grow.
                        </p>
                        <div className="flex gap-4">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-neutral-400 hover:text-white transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <span className="text-sm">{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Product</h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.product.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold text-white">Resources</h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.resources.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-white">Company</h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold text-white">Legal</h3>
                                <ul className="mt-4 space-y-3">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-neutral-800 pt-8">
                    <p className="text-xs text-neutral-500">
                        &copy; {new Date().getFullYear()} Sovereign. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
