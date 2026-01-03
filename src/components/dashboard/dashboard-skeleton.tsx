"use client";

import { cn } from "@/lib/utils";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-4 w-64 bg-zinc-800/50 rounded-lg mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-28 bg-zinc-800 rounded-xl" />
          <div className="h-10 w-32 bg-zinc-800 rounded-xl" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Hero tile */}
        <div className="col-span-2 row-span-2 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
        {/* Feed tiles */}
        <div className="col-span-1 row-span-2 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
        <div className="col-span-1 row-span-2 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
        {/* Stat tiles */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="col-span-1 row-span-1 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
        ))}
        {/* Content tiles */}
        <div className="col-span-2 row-span-1 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
        <div className="col-span-2 row-span-1 rounded-2xl bg-zinc-900/50 border border-white/[0.04]" />
      </div>
    </div>
  );
}