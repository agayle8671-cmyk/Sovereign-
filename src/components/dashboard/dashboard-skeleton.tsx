import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header skeleton */}
            <div>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96 mt-2" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="p-6">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-8 w-16 mt-4" />
                        <Skeleton className="h-4 w-24 mt-2" />
                    </Card>
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full mb-3" />
                    ))}
                </Card>
                <Card className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-12 w-full mb-3" />
                    ))}
                </Card>
            </div>
        </div>
    );
}
