"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { KineticText } from "@/components/ui/KineticText";

export function FinalCTA() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden py-24">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-black to-black" />

            <div className="relative z-10 text-center px-6">
                <h2 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-white select-none">
                    <KineticText>READY?</KineticText>
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                >
                    <Link href="/signup">
                        <button className="px-12 py-6 rounded-full bg-white text-black text-xl font-bold tracking-tight hover:scale-105 transition-transform shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)]">
                            Get Started
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
