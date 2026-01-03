"use client";

import { motion } from "framer-motion";
import { cn, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";
import {
  Activity,
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
  TrendingUp,
  Shield,
  Briefcase,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Plus,
  ChevronRight,
} from "lucide-react";

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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] text-sm text-white transition-colors"
          >
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
          >
            <Zap className="w-4 h-4" />
            Quick Action
          </motion.button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Hero Tile: Financial Pulse (2x2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 row-span-2 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-6 flex flex-col hover:border-white/[0.08] transition-colors group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Financial Pulse</h3>
                <p className="text-xs text-zinc-600">Revenue & runway</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              +24.5%
            </div>
          </div>

          {/* Chart Area */}
          <div className="flex-1 relative">
            <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40 V150 H0 Z" fill="url(#pulseGrad)" />
              <path d="M0,120 Q50,100 100,90 T200,60 T300,80 T400,40" fill="none" stroke="#10b981" strokeWidth="2" />
              <circle cx="400" cy="40" r="5" fill="#10b981" className="animate-pulse" />
            </svg>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/[0.04]">
            <Stat label="Revenue" value="$84,250" />
            <Stat label="Runway" value="8.2 mo" color="text-emerald-400" />
            <Stat label="Pending" value="$12,400" color="text-amber-400" />
          </div>
        </motion.div>

        {/* Agent Activity Feed (1x2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 row-span-2 rounded-2xl bg-[#0f0f12] border border-white/[0.04] flex flex-col overflow-hidden hover:border-white/[0.08] transition-colors"
        >
          <div className="p-4 border-b border-white/[0.04] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-white">Agent Activity</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {agentLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      log.status === "complete" ? "bg-emerald-500" : "bg-cyan-500 animate-pulse"
                    )}
                  />
                  <span className="text-[11px] font-medium text-cyan-400">[{log.agent}]</span>
                  <span className="text-[10px] text-zinc-600 ml-auto">{log.time}</span>
                </div>
                <p className="text-xs text-zinc-400 pl-3.5">
                  {log.action} <span className="text-zinc-200">{log.target}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/[0.04]">
            <Link
              href="/dashboard/audit"
              className="block text-center text-xs text-zinc-500 hover:text-white transition-colors"
            >
              View full audit log →
            </Link>
          </div>
        </motion.div>

        {/* Triage / Approvals (1x2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 row-span-2 rounded-2xl bg-[#0f0f12] border border-white/[0.04] flex flex-col overflow-hidden hover:border-white/[0.08] transition-colors"
        >
          <div className="p-4 border-b border-white/[0.04] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-medium text-white">Approvals</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-medium text-amber-400">
              {approvals.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {approvals.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#0a0a0c] border border-white/[0.04] hover:border-white/[0.08] transition-colors"
              >
                <p className="text-xs text-white mb-2 line-clamp-2">{item.action}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400">{item.confidence}% confident</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                      <Check className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/[0.04]">
            <Link
              href="/dashboard/inbox"
              className="block text-center text-xs text-zinc-500 hover:text-white transition-colors"
            >
              View all approvals →
            </Link>
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

        {/* Client Health (2x1) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="col-span-2 row-span-1 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 hover:border-white/[0.08] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h3 className="text-sm font-medium text-white">Client Health</h3>
            </div>
            <Link
              href="/dashboard/clients"
              className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentClients.length === 0 ? (
            <div className="flex items-center justify-center h-20">
              <Link
                href="/dashboard/clients/new"
                className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300"
              >
                <Plus className="w-4 h-4" />
                Add your first client
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentClients.slice(0, 3).map((client) => {
                const score = client.healthScore || 0;
                const color =
                  score >= 80
                    ? "bg-emerald-500"
                    : score >= 60
                    ? "bg-amber-500"
                    : "bg-red-500";

                return (
                  <Link
                    key={client.id}
                    href={`/dashboard/clients/${client.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-amber-400 font-medium text-xs shrink-0">
                      {client.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{client.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", color)}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-400 w-8 text-right">
                        {score}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
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
  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", glow: "group-hover:shadow-amber-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400", glow: "group-hover:shadow-rose-500/20" },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={href}>
        <div className={cn(
          "relative group col-span-1 row-span-1 rounded-2xl bg-[#0f0f12] border border-white/[0.04] p-4 flex flex-col justify-between hover:border-white/[0.08] transition-all",
          colors.glow,
          "group-hover:shadow-lg"
        )}>
          <div className="flex items-center justify-between">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.bg)}>
              <Icon className={cn("w-4 h-4", colors.text)} />
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-600">{label}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}