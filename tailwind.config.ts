import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Brand Colors
                brand: {
                    50: "#f0f7ff",
                    100: "#e0efff",
                    200: "#baddff",
                    300: "#7cc2ff",
                    400: "#36a3ff",
                    500: "#0088ff",
                    600: "#0070e0",
                    700: "#0058b3",
                    800: "#004080",
                    900: "#002d5c",
                    950: "#001a38",
                },
                // Neutral (Dark Mode First)
                neutral: {
                    0: "#ffffff",
                    50: "#fafafa",
                    100: "#f4f4f5",
                    200: "#e4e4e7",
                    300: "#d4d4d8",
                    400: "#a1a1aa",
                    500: "#71717a",
                    600: "#52525b",
                    700: "#3f3f46",
                    750: "#323238",
                    800: "#27272a",
                    850: "#1f1f23",
                    900: "#18181b",
                    925: "#131316",
                    950: "#0f0f12",
                },
                // Core Accent Colors
                shield: {
                    DEFAULT: "#8b5cf6",
                    light: "#a78bfa",
                    dark: "#7c3aed",
                },
                magnet: {
                    DEFAULT: "#f97316",
                    light: "#fb923c",
                    dark: "#ea580c",
                },
                radar: {
                    DEFAULT: "#06b6d4",
                    light: "#22d3ee",
                    dark: "#0891b2",
                },
                forge: {
                    DEFAULT: "#22c55e",
                    light: "#4ade80",
                    dark: "#16a34a",
                },
                // Semantic Colors
                success: {
                    DEFAULT: "#22c55e",
                    light: "#4ade80",
                    dark: "#16a34a",
                    muted: "rgba(34, 197, 94, 0.1)",
                },
                warning: {
                    DEFAULT: "#f59e0b",
                    light: "#fbbf24",
                    dark: "#d97706",
                    muted: "rgba(245, 158, 11, 0.1)",
                },
                danger: {
                    DEFAULT: "#ef4444",
                    light: "#f87171",
                    dark: "#dc2626",
                    muted: "rgba(239, 68, 68, 0.1)",
                },
                info: {
                    DEFAULT: "#3b82f6",
                    light: "#60a5fa",
                    dark: "#2563eb",
                    muted: "rgba(59, 130, 246, 0.1)",
                },
                // Shadcn compatible
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                display: ["var(--font-display)", ...fontFamily.serif],
                mono: ["var(--font-mono)", ...fontFamily.mono],
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                glow: "0 0 40px -10px rgba(0, 136, 255, 0.5)",
                "glow-shield": "0 0 40px -10px rgba(139, 92, 246, 0.5)",
                "glow-magnet": "0 0 40px -10px rgba(249, 115, 22, 0.5)",
                "glow-radar": "0 0 40px -10px rgba(6, 182, 212, 0.5)",
                "glow-forge": "0 0 40px -10px rgba(34, 197, 94, 0.5)",
                "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-mesh":
                    "radial-gradient(at 40% 20%, hsla(228, 84%, 10%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(228, 84%, 5%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(240, 84%, 7%, 1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(252, 84%, 5%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(228, 84%, 8%, 1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(228, 84%, 3%, 1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(228, 84%, 8%, 1) 0px, transparent 50%)",
                "hero-gradient":
                    "linear-gradient(to bottom, rgba(15, 15, 18, 0) 0%, rgba(15, 15, 18, 1) 100%)",
                "card-gradient":
                    "linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))",
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
                "fade-up": "fade-up 0.5s ease-out",
                "slide-in-right": "slide-in-right 0.3s ease-out",
                "slide-in-left": "slide-in-left 0.3s ease-out",
                shimmer: "shimmer 2s linear infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 6s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-right": {
                    from: { transform: "translateX(100%)" },
                    to: { transform: "translateX(0)" },
                },
                "slide-in-left": {
                    from: { transform: "translateX(-100%)" },
                    to: { transform: "translateX(0)" },
                },
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    from: { boxShadow: "0 0 20px -10px rgba(0, 136, 255, 0.5)" },
                    to: { boxShadow: "0 0 40px -10px rgba(0, 136, 255, 0.8)" },
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
};

export default config;
