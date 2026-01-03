import { HeroSection } from "@/components/landing/HeroSection";
import { StatementSection } from "@/components/landing/StatementSection";
import { ProductSection } from "@/components/landing/ProductSection";
import { FeatureDeepDive } from "@/components/landing/FeatureDeepDive";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
    return (
        <main className="bg-[#000000] text-white overflow-x-hidden">
            <HeroSection />
            <StatementSection />
            <ProductSection />
            <FeatureDeepDive />
            <SocialProofSection />
            <PricingSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
