import { PremiumHero } from "@/components/marketing/premium-hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { FeaturesSection } from "@/components/marketing/features-section";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SocialProofSection } from "@/components/marketing/social-proof-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { PremiumFooter } from "@/components/marketing/premium-footer";

export default function MarketingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-white selection:bg-brand-500/30 selection:text-brand-200">
            <PremiumHero />
            <LogoCloud />
            <FeaturesSection />
            <ProductShowcase />
            <SocialProofSection />
            <PricingSection />
            <FAQSection />
            <CTASection />
            <PremiumFooter />
        </div>
    );
}
