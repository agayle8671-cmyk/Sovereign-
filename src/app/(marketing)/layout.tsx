import { StickyNav } from "@/components/landing/StickyNav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StickyNav />
      {children}
    </>
  );
}
