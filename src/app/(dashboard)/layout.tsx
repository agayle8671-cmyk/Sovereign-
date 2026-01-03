"use client";

// The PremiumDashboard now includes its own sidebar (Vertical Command Center)
// so this layout is minimal - just passing through the children.
// The dashboard component itself handles the full ACOS shell.

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full overflow-hidden bg-[#020617] dark">
            {children}
        </div>
    );
}
