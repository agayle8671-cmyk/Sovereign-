"use client";

export function DashboardBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-neutral-950" />
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle_at_center,_rgba(120,119,198,0.15),_transparent_60%)] blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.1),_transparent_50%)] blur-[80px]" />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
}
