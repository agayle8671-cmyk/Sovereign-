export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Welcome */}
            <div>
                <div className="h-9 w-64 bg-neutral-800 rounded-lg" />
                <div className="h-5 w-96 bg-neutral-800/50 rounded-lg mt-2" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5"
                    >
                        <div className="w-12 h-12 bg-neutral-800 rounded-xl mb-4" />
                        <div className="h-10 w-16 bg-neutral-800 rounded-lg mb-2" />
                        <div className="h-4 w-24 bg-neutral-800/50 rounded" />
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <div className="h-4 w-32 bg-neutral-800/50 rounded mb-4" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl bg-neutral-900/50 border border-white/5"
                        >
                            <div className="w-10 h-10 bg-neutral-800 rounded-lg mb-3" />
                            <div className="h-4 w-24 bg-neutral-800 rounded mb-1" />
                            <div className="h-3 w-32 bg-neutral-800/50 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 rounded-2xl bg-neutral-900/50 border border-white/5 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-neutral-800 rounded-lg" />
                        <div className="h-5 w-32 bg-neutral-800 rounded" />
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3">
                                <div className="w-10 h-10 bg-neutral-800 rounded-lg" />
                                <div className="flex-1">
                                    <div className="h-4 w-48 bg-neutral-800 rounded mb-2" />
                                    <div className="h-3 w-32 bg-neutral-800/50 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 rounded-2xl bg-neutral-900/50 border border-white/5 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-neutral-800 rounded-lg" />
                        <div className="h-5 w-28 bg-neutral-800 rounded" />
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3">
                                <div className="w-10 h-10 bg-neutral-800 rounded-lg" />
                                <div className="flex-1">
                                    <div className="h-4 w-32 bg-neutral-800 rounded mb-2" />
                                    <div className="h-3 w-20 bg-neutral-800/50 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
