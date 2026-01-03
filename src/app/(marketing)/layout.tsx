import { MarketingHeader } from "@/components/landing/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <MarketingHeader />
      {children}
    </div>
  );
}
