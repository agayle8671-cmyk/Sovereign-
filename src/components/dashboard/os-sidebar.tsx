"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Shield,
  Users,
  Briefcase,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus,
  Search,
  Bell,
  Zap,
  Activity,
  Clock,
  Inbox,
  Hammer,
  Radar,
} from "lucide-react";

interface OSSidebarProps {
  user: any;
  collapsed: boolean;
  onToggle: () => void;
}

// Core navigation - always visible
const coreNavigation = [
  {
    name: "Command Center",
    href: "/dashboard",
    icon: LayoutDashboard,
    shortcut: "G then H",
  },
  {
    name: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
    badge: 3,
    shortcut: "G then I",
  },
];

// Context navigation - changes based on work
const contextNavigation = [
  {
    name: "Contracts",
    href: "/dashboard/contracts",
    icon: Shield,
    color: "cyan",
    shortcut: "G then C",
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: Users,
    color: "amber",
    shortcut: "G then L",
  },
  {
    name: "Portfolio",
    href: "/dashboard/portfolio",
    icon: Briefcase,
    color: "purple",
    shortcut: "G then P",
  },
  {
    name: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
    color: "rose",
    shortcut: "G then T",
  },
  {
    name: "The Forge",
    href: "/dashboard/forge",
    icon: Hammer,
    color: "orange",
  },
  {
    name: "The Radar",
    href: "/dashboard/radar",
    icon: Radar,
    color: "indigo",
  },
];

// Utility navigation - system level
const utilityNavigation = [
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const colorMap: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/10",
  amber: "text-amber-400 bg-amber-500/10",
  purple: "text-purple-400 bg-purple-500/10",
  rose: "text-rose-400 bg-rose-500/10",
};

export function OSSidebar({ user, collapsed, onToggle }: OSSidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full bg-[#0a0a0c] border-r border-white/[0.04]"
    >
      {/* Logo & Brand */}
      <div className="h-14 flex items-center px-4 border-b border-white/[0.04]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 blur-lg opacity-50" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-semibold tracking-tight"
              >
                Sovereign
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="px-3 py-3 border-b border-white/[0.04]">
        <Link href="/dashboard/contracts/analyze">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all",
              collapsed && "justify-center px-2"
            )}
          >
            <Plus className="w-4 h-4" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-medium"
                >
                  New Contract
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </Link>
      </div>

      {/* Core Zone */}
      <nav className="px-3 py-3 space-y-1">
        {!collapsed && (
          <div className="px-3 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Core
            </span>
          </div>
        )}
        {coreNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={isActive}
              collapsed={collapsed}
              onHover={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          );
        })}
      </nav>

      {/* Context Zone */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <div className="px-3 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Engines
            </span>
          </div>
        )}
        {contextNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={isActive}
              collapsed={collapsed}
              onHover={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          );
        })}
      </nav>

      {/* Utility Zone */}
      <div className="px-3 py-3 border-t border-white/[0.04]">
        {utilityNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={isActive}
              collapsed={collapsed}
              onHover={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          );
        })}
      </div>

      {/* Upgrade Card */}
      <AnimatePresence>
        {!collapsed && user?.subscriptionTier !== "pro" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-3 mb-3"
          >
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-400">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-zinc-400 mb-3">
                  Unlock unlimited contracts and AI features.
                </p>
                <button className="w-full py-2 text-xs font-medium rounded-lg bg-white text-zinc-900 hover:bg-zinc-100 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-10 shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  );
}

function NavItem({
  item,
  isActive,
  collapsed,
  onHover,
  hoveredItem,
}: {
  item: any;
  isActive: boolean;
  collapsed: boolean;
  onHover: (name: string | null) => void;
  hoveredItem: string | null;
}) {
  const Icon = item.icon;
  const colorClass = item.color ? colorMap[item.color] : "";

  return (
    <Link
      href={item.href}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
        collapsed && "justify-center px-2",
        isActive
          ? "bg-white/[0.08] text-white"
          : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
      )}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full",
            item.color
              ? `bg-${item.color}-400`
              : "bg-emerald-400"
          )}
          style={{
            backgroundColor: item.color === "cyan" ? "#22d3ee" :
              item.color === "amber" ? "#fbbf24" :
                item.color === "purple" ? "#a78bfa" :
                  item.color === "rose" ? "#fb7185" :
                    "#34d399"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Icon with color */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
          isActive && item.color ? colorClass : "",
          !isActive && "group-hover:bg-white/[0.04]"
        )}
      >
        <Icon className={cn("w-[18px] h-[18px]", isActive && item.color && colorClass.split(" ")[0])} />
      </div>

      {/* Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 text-sm font-medium"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      {item.badge && !collapsed && (
        <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
          {item.badge}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && hoveredItem === item.name && (
        <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-zinc-800 text-white text-xs whitespace-nowrap z-50 shadow-lg">
          {item.name}
          {item.shortcut && (
            <span className="ml-2 text-zinc-500">{item.shortcut}</span>
          )}
        </div>
      )}
    </Link>
  );
}