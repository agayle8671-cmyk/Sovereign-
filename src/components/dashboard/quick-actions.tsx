"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
    FileText,
    Users,
    Briefcase,
    MessageSquare,
    ArrowRight,
} from "lucide-react";

const actions = [
    {
        name: "Analyze Contract",
        description: "Upload and scan for risks",
        href: "/dashboard/contracts/analyze",
        icon: FileText,
        iconBg: "bg-shield/10",
        iconColor: "text-shield",
    },
    {
        name: "Add Client",
        description: "Track a new relationship",
        href: "/dashboard/clients/new",
        icon: Users,
        iconBg: "bg-radar/10",
        iconColor: "text-radar",
    },
    {
        name: "Add Portfolio Item",
        description: "Showcase your work",
        href: "/dashboard/portfolio/new",
        icon: Briefcase,
        iconBg: "bg-magnet/10",
        iconColor: "text-magnet",
    },
    {
        name: "Request Testimonial",
        description: "Collect social proof",
        href: "/dashboard/testimonials",
        icon: MessageSquare,
        iconBg: "bg-forge/10",
        iconColor: "text-forge",
    },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action) => (
                <Link key={action.name} href={action.href}>
                    <Card className="p-4 h-full hover:border-neutral-700 transition-colors group cursor-pointer">
                        <div
                            className={`w-10 h-10 rounded-lg ${action.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                        >
                            <action.icon className={`w-5 h-5 ${action.iconColor}`} />
                        </div>
                        <h3 className="font-medium text-neutral-100 text-sm">
                            {action.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">{action.description}</p>
                        <ArrowRight className="w-4 h-4 text-neutral-600 mt-2 group-hover:translate-x-1 group-hover:text-neutral-400 transition-all" />
                    </Card>
                </Link>
            ))}
        </div>
    );
}
