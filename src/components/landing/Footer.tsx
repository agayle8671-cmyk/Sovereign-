import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/5 py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-lg font-semibold text-white">
                            Sovereign
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-white/40">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>

                    <p className="text-sm text-white/40">
                        © {new Date().getFullYear()} Sovereign. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
