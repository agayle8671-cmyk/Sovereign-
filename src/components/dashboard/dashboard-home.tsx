"use client";

import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  X,
  DollarSign,
  Users,
  FileText,
  Clock,
  Send,
  Shield,
  Briefcase,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Plus,
  ChevronRight,
} from "lucide-react";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { Sparkline } from "@/components/charts/Sparkline";
import { ProgressRing, MultiProgressRing } from "@/components/charts/ProgressRing";
import { HealthHeatmap } from "@/components/charts/HealthHeatmap";
import { RiskRadar } from "@/components/charts/RiskRadar";
import { InvoiceFlow } from "@/components/charts/InvoiceFlow";
import { AgentTimeline } from "@/components/charts/AgentTimeline";

interface DashboardHomeProps {
  user: any;
  stats: {
    contracts: number;
    clients: number;
    portfolio: number;
    testimonials: number;
  };
  recentContracts: any[];
  recentClients: any[];
}

export function DashboardHome({
  user,
  stats,
  recentContracts,
  recentClients,
}: DashboardHomeProps) {
  const firstName = user?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Mock agent activity
  const agentLogs = [
    { id: "1", agent: "Shield", action: "Analyzed contract", target: "#47 for Apex", time: "2m", status: "complete" },
    { id: "2", agent: "Invoicer", action: "Generated invoice", target: "#1024", time: "15m", status: "complete" },
    { id: "3", agent: "Negotiator", action: "Drafting follow-up", target: "for past-due", time: "now", status: "processing" },
    { id: "4", agent: "Scheduler", action: "Booked meeting", target: "with Sarah", time: "1h", status: "complete" },
  ];

  // Mock approvals
  const approvals = [
    { id: "1", action: "Send follow-up email to Apex Corp", confidence: 98 },
    { id: "2", action: "Generate invoice #1025 for $4,500", confidence: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {greeting}, {firstName}
          </h1>
          <p className="text-zinc-500 mt-1">
            Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/contracts">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] text-sm text-white transition-colors"
            >
              View Contracts
            </motion.button>
          </Link>
          <Link href="/dashboard/contracts/analyze">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              <Zap className="w-4 h-4" />
              Analyze Contract
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Hero Tile: Financial Pulse (2x2) - Premium Revenue Chart */}
        <Link href="/dashboard/contracts" className="col-span-2 row-span-2 group">
          <RevenueChart className="h-full group-hover:border-white/[0.1] transition-colors" />
        </Link>

        {/* Agent Timeline (1x2) - Visual Feed */}
        <Link href="/dashboard/inbox" className="col-span-1 row-span-2 group">
          <AgentTimeline
            className="h-full group-hover:border-white/[0.1] transition-colors"
            data={agentLogs}
          />
        </Link>

        {/* Monthly Targets (1x2) - Premium Rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 row-span-2 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 flex flex-col items-center justify-between hover:border-white/[0.08] transition-colors group relative overflow-hidden"
        >
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />

          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-medium text-white">Targets</h3>
            </div>
            <Link href="/dashboard/goals" className="text-zinc-600 hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center scale-110 z-10">
            <MultiProgressRing
              size={140}
              strokeWidth={8}
              gap={6}
              rings={[
                { value: 75, color: "emerald", label: "Revenue" },
                { value: 60, color: "cyan", label: "Clients" },
                { value: 45, color: "purple", label: "Projects" },
              ]}
            />
          </div>

          <div className="w-full grid grid-cols-3 gap-1 z-10">
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-1" />
              <p className="text-[10px] text-zinc-500">Rev</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mx-auto mb-1" />
              <p className="text-[10px] text-zinc-500">Cli</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mx-auto mb-1" />
              <p className="text-[10px] text-zinc-500">Proj</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row (4x 1x1) */}
        <StatTile
          icon={Shield}
          label="Contracts"
          value={stats.contracts}
          href="/dashboard/contracts"
          color="cyan"
          delay={0.4}
        />
        <StatTile
          icon={Users}
          label="Clients"
          value={stats.clients}
          href="/dashboard/clients"
          color="amber"
          delay={0.45}
        />
        <StatTile
          icon={Briefcase}
          label="Portfolio"
          value={stats.portfolio}
          href="/dashboard/portfolio"
          color="purple"
          delay={0.5}
        />
        <StatTile
          icon={MessageSquare}
          label="Testimonials"
          value={stats.testimonials}
          href="/dashboard/testimonials"
          color="rose"
          delay={0.55}
        />

        {/* Recent Contracts (2x1) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-2 row-span-1 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 hover:border-white/[0.08] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-medium text-white">Recent Contracts</h3>
            </div>
            <Link
              href="/dashboard/contracts"
              className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentContracts.length === 0 ? (
            <div className="flex items-center justify-center h-20">
              <Link
                href="/dashboard/contracts/analyze"
                className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
              >
                <Plus className="w-4 h-4" />
                Analyze your first contract
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {recentContracts.slice(0, 3).map((contract) => (
                <Link
                  key={contract.id}
                  href={`/dashboard/contracts/${contract.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      contract.riskScore >= 80
                        ? "bg-emerald-500/10 text-emerald-400"
                        : contract.riskScore >= 60
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-red-500/10 text-red-400"
                    )}
                  >
                    {contract.riskScore >= 80 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{contract.title}</p>
                    <p className="text-[10px] text-zinc-600">
                      {contract.client?.name || "No client"} •{" "}
                      {formatRelativeTime(contract.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      contract.riskScore >= 80
                        ? "text-emerald-400"
                        : contract.riskScore >= 60
                          ? "text-amber-400"
                          : "text-red-400"
                    )}
                  >
                    {contract.riskScore}%
                  </span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Client Health (2x1) - Premium Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="col-span-2 row-span-1 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 hover:border-white/[0.08] transition-colors overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Engagement Pulse</h3>
                <p className="text-[10px] text-zinc-500">Client activity heatmap</p>
              </div>
            </div>
            <Link
              href="/dashboard/clients"
              className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center justify-center h-[100px] -mt-2">
            <HealthHeatmap
              weeks={18}
              color="emerald"
              className="scale-105"
            />
          </div>
        </motion.div>

        {/* Deep Dive Row (Row 5 & 6) */}
        <Link href="/dashboard/contracts" className="col-span-2 row-span-2 group">
          <RiskRadar className="h-full group-hover:border-white/[0.1] transition-colors" />
        </Link>
        <Link href="/dashboard/portfolio" className="col-span-2 row-span-2 group">
          <InvoiceFlow className="h-full group-hover:border-white/[0.1] transition-colors" />
        </Link>
      </div>
    </div>
  );
}

// Helper Components

function Stat({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
      <p className={cn("text-lg font-semibold", color)}>{value}</p>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  href,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  href: string;
  color: string;
  delay: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; glow: string; sparkline: "emerald" | "cyan" | "amber" | "purple" | "rose" }> = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20", sparkline: "cyan" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", glow: "group-hover:shadow-amber-500/20", sparkline: "amber" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "group-hover:shadow-purple-500/20", sparkline: "purple" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", glow: "group-hover:shadow-rose-500/20", sparkline: "rose" },
  };

  const colors = colorMap[color];

  // Generate mock trend data based on current value
  const trendData = Array.from({ length: 7 }, (_, i) =>
    Math.max(0, value - 3 + Math.floor(Math.random() * 4) + (i * 0.3))
  );
  const trend = trendData[6] >= trendData[0] ? "up" : "down";
  const changePercent = trendData[0] > 0
    ? Math.abs(((trendData[6] - trendData[0]) / trendData[0]) * 100).toFixed(0)
    : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={href}>
        <div className={cn(
          "relative group col-span-1 row-span-1 h-[180px] rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 flex flex-col justify-between hover:border-white/[0.08] transition-all overflow-hidden",
          colors.glow,
          "group-hover:shadow-lg"
        )}>
          {/* Background glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={cn(
              "absolute bottom-0 right-0 w-24 h-24 blur-[40px] rounded-full",
              color === "cyan" && "bg-cyan-500/20",
              color === "amber" && "bg-amber-500/20",
              color === "purple" && "bg-purple-500/20",
              color === "rose" && "bg-rose-500/20",
            )} />
          </div>

          {/* Header Row */}
          <div className="relative flex items-center justify-between">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", colors.bg)}>
              <Icon className={cn("w-4 h-4", colors.text)} />
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          {/* Sparkline in middle */}
          <div className="relative flex-1 flex items-center justify-center -mx-2">
            <Sparkline
              data={trendData}
              width={120}
              height={40}
              color={colors.sparkline}
              showGradient={true}
            />
          </div>

          {/* Value and Label */}
          <div className="relative flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
              <p className="text-xs text-zinc-600">{label}</p>
            </div>
            {/* Trend indicator */}
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium",
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            )}>
              {trend === "up" ? "▲" : "▼"} {changePercent}%
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}