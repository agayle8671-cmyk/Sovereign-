import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />

            <MarketingHeader />
            <main>{children}</main>
            <MarketingFooter />
        </div>
    );
}
