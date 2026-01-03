import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950 flex">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
            <div className="fixed inset-0 pattern-dots opacity-20 pointer-events-none" />

            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-neutral-900 to-neutral-950" />
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-white">Sovereign</span>
                    </div>

                    {/* Testimonial */}
                    <div className="max-w-md">
                        <blockquote className="text-2xl font-display italic text-white/90 leading-relaxed">
                            &quot;Sovereign saved me from signing a contract with a hidden IP clause that would have cost me my entire portfolio. Worth every penny.&quot;
                        </blockquote>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-700" />
                            <div>
                                <p className="font-medium text-white">Sarah Chen</p>
                                <p className="text-sm text-neutral-400">Senior UX Designer, Freelance</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <p className="text-3xl font-bold text-white">10K+</p>
                            <p className="text-sm text-neutral-400">Contracts Analyzed</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">$2.4M</p>
                            <p className="text-sm text-neutral-400">Risk Prevented</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">94%</p>
                            <p className="text-sm text-neutral-400">Time Saved</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Auth */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-white">Sovereign</span>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
