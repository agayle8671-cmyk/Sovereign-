"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  Settings,
  Plus,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Clock,
  Zap,
  Shield,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const commands = [
  {
    category: "Navigation",
    items: [
      { id: "dashboard", icon: LayoutDashboard, label: "Go to Dashboard", shortcut: "G H", href: "/dashboard" },
      { id: "contracts", icon: Shield, label: "Go to Contracts", shortcut: "G C", href: "/dashboard/contracts" },
      { id: "clients", icon: Users, label: "Go to Clients", shortcut: "G L", href: "/dashboard/clients" },
      { id: "portfolio", icon: Briefcase, label: "Go to Portfolio", shortcut: "G P", href: "/dashboard/portfolio" },
      { id: "testimonials", icon: MessageSquare, label: "Go to Testimonials", shortcut: "G T", href: "/dashboard/testimonials" },
    ],
  },
  {
    category: "Actions",
    items: [
      { id: "new-contract", icon: Plus, label: "Analyze New Contract", shortcut: "N C", href: "/dashboard/contracts/analyze" },
      { id: "new-client", icon: Plus, label: "Add New Client", shortcut: "N L", href: "/dashboard/clients/new" },
      { id: "new-portfolio", icon: Plus, label: "Add Portfolio Item", shortcut: "N P", href: "/dashboard/portfolio/new" },
    ],
  },
  {
    category: "AI Agents",
    items: [
      { id: "agent-analyze", icon: Sparkles, label: "AI: Analyze Contract", shortcut: "A A", action: "analyze" },
      { id: "agent-negotiate", icon: Zap, label: "AI: Draft Negotiation", shortcut: "A N", action: "negotiate" },
      { id: "agent-insights", icon: Sparkles, label: "AI: Generate Insights", shortcut: "A I", action: "insights" },
    ],
  },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  const allItems = filteredCommands.flatMap((c) => c.items);

  const handleSelect = useCallback((item: any) => {
    onOpenChange(false);
    setQuery("");
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      // Handle AI actions
      console.log("AI Action:", item.action);
    }
  }, [router, onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % allItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (allItems[selectedIndex]) {
          handleSelect(allItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, allItems, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="mx-4 rounded-2xl bg-[#0f0f12] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
                <Search className="w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search commands, pages, or AI actions..."
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
                />
                <kbd className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700">
                  ESC
                </kbd>
              </div>

              {/* Commands */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center">
                    <Search className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                    <p className="text-sm text-zinc-500">No results found</p>
                  </div>
                ) : (
                  filteredCommands.map((category) => (
                    <div key={category.category} className="mb-4">
                      <div className="px-3 py-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                          {category.category}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {category.items.map((item) => {
                          const globalIndex = allItems.findIndex((i) => i.id === item.id);
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                                isSelected
                                  ? "bg-white/[0.08] text-white"
                                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                              )}
                            >
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                isSelected ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                              )}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <span className="flex-1 text-sm">{item.label}</span>
                              {item.shortcut && (
                                <div className="flex items-center gap-1">
                                  {item.shortcut.split(" ").map((key, i) => (
                                    <kbd
                                      key={i}
                                      className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-500 border border-zinc-700"
                                    >
                                      {key}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                              {isSelected && (
                                <ArrowRight className="w-4 h-4 text-zinc-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.04] text-[11px] text-zinc-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-zinc-800 text-zinc-500">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 rounded bg-zinc-800 text-zinc-500">↵</kbd>
                    Select
                  </span>
                </div>
                <span>Sovereign Command</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}