import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Sovereign | The Operating System for the Business of One",
    template: "%s | Sovereign",
  },
  metadataBase: new URL("https://sovereign.app"),
  description:
    "Autonomous Commercial Operating System for independent professionals. Defend contracts, automate reputation, grow revenue.",
  keywords: [
    "freelance",
    "solopreneur",
    "contract management",
    "portfolio",
    "testimonials",
    "AI",
  ],
  authors: [{ name: "Sovereign" }],
  creator: "Sovereign",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sovereign.app",
    title: "Sovereign | The Operating System for the Business of One",
    description:
      "Autonomous Commercial Operating System for independent professionals.",
    siteName: "Sovereign",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sovereign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign | The Operating System for the Business of One",
    description:
      "Autonomous Commercial Operating System for independent professionals.",
    images: ["/og-image.png"],
    creator: "@sovereign",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#0088ff",
          colorBackground: "#0f0f12",
          colorInputBackground: "#18181b",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary:
            "bg-brand-500 hover:bg-brand-600 text-white border-0",
          card: "bg-neutral-900 border border-neutral-800",
          headerTitle: "text-white",
          headerSubtitle: "text-neutral-400",
          socialButtonsBlockButton:
            "bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-750",
          formFieldLabel: "text-neutral-300",
          formFieldInput:
            "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500",
          footerActionLink: "text-brand-500 hover:text-brand-400",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
