"use client";

import { motion } from "framer-motion";
import {
    MoreHorizontal,
    Clock,
    Search,
    Grid,
    List as ListIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
    clerkId: string;
}

export function PremiumDashboard({ clerkId }: DashboardProps) {
    return (
        <div className="flex flex-col gap-8 h-full">
            {/* 1. Toolbar / Filter Bar */}
            <div className="flex items-center justify-between sticky top-0 bg-[#09090b] z-10 py-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636366]" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-[240px] bg-[#1f1f22] border-none rounded-lg pl-9 pr-4 text-[13px] text-white placeholder:text-[#636366] focus:ring-1 focus:ring-[#333333] transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-[#1f1f22] text-[#ededed]">
                        <Grid className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-[#1f1f22] text-[#636366]">
                        <ListIcon className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-px bg-[#1f1f22] mx-2" />
                    <span className="text-[13px] text-[#636366] font-medium mr-2">Sort by: <span className="text-[#ededed]">Last Viewed</span></span>
                </div>
            </div>

            {/* 2. Grid Content */}
            <div>
                <h2 className="text-[13px] font-medium text-[#636366] mb-4">Recent</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Project Card Imitation - 1 */}
                    <ProjectCard
                        title="SaaS Landing Page"
                        time="Edited 2 mins ago"
                        color="bg-purple-500"
                    />
                    {/* Project Card Imitation - 2 */}
                    <ProjectCard
                        title="Mobile App Prototype"
                        time="Edited 2 hours ago"
                        color="bg-blue-500"
                    />
                    {/* Project Card Imitation - 3 (Risk Analysis) */}
                    <ProjectCard
                        title="Contract Risk Analysis"
                        time="Edited yesterday"
                        color="bg-orange-500"
                        preview
                    />
                    {/* Project Card Imitation - 4 */}
                    <ProjectCard
                        title="Design System"
                        time="Edited 2 days ago"
                        color="bg-pink-500"
                    />
                </div>
            </div>

            {/* 3. Team Projects */}
            <div>
                <h2 className="text-[13px] font-medium text-[#636366] mb-4">Engineering Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProjectCard
                        title="Backend API"
                        time="Edited 1 week ago"
                        color="bg-emerald-500"
                    />
                    <ProjectCard
                        title="Database Schema"
                        time="Edited 1 week ago"
                        color="bg-emerald-500"
                    />
                </div>
            </div>
        </div>
    );
}

function ProjectCard({ title, time, color, preview }: { title: string, time: string, color: string, preview?: boolean }) {
    return (
        <div className="group cursor-pointer">
            {/* Thumbnail */}
            <div className="aspect-[4/3] bg-[#1f1f22] rounded-xl border border-[#1f1f22] group-hover:border-[#333333] transition-colors relative overflow-hidden mb-3">
                {/* Simulated Content */}
                <div className={cn("absolute inset-4 rounded-lg opacity-20", color)} />
                {preview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="w-8 h-8 rounded-full bg-orange-500" />
                        </div>
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 transition-colors" />
            </div>

            {/* Meta */}
            <div className="flex items-start justify-between px-1">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-[14px] font-medium text-[#ededed] group-hover:text-white transition-colors leading-snug">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[12px] text-[#636366]">{time}</span>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#1f1f22] rounded text-[#ededed] transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
