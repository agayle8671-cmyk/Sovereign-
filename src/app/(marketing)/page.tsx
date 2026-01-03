import { HeroSection } from "@/components/landing/hero/HeroSection";
import { SocialProofSection } from "@/components/landing/social-proof/SocialProofSection";
import { ProductShowcase } from "@/components/landing/product-showcase/ProductShowcase";
import { FeaturesSection } from "@/components/landing/features/FeaturesSection";
import { PricingSection } from "@/components/landing/pricing/PricingSection";
import { FAQSection } from "@/components/landing/faq/FAQSection";
import { CTASection } from "@/components/landing/cta/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function MarketingPage() {
    return (
        <main className="bg-black min-h-screen">
            <HeroSection />
            <SocialProofSection />
            <ProductShowcase />
            <FeaturesSection />
            <PricingSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    );
}
