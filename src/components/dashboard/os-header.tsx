"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Search,
  Command,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Sparkles,
  Check,
  X,
  Clock,
} from "lucide-react";

interface OSHeaderProps {
  user: any;
  onCommandOpen: () => void;
}

export function OSHeader({ user, onCommandOpen }: OSHeaderProps) {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: "1",
      type: "agent",
      title: "Contract analyzed",
      description: "Your NDA with Acme Corp has been reviewed",
      time: "2 min ago",
      status: "success",
      unread: true,
    },
    {
      id: "2",
      type: "approval",
      title: "Action required",
      description: "Invoice #1024 ready to send",
      time: "15 min ago",
      status: "pending",
      unread: true,
    },
    {
      id: "3",
      type: "info",
      title: "New testimonial",
      description: "Sarah Chen left a 5-star review",
      time: "1 hour ago",
      status: "info",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/[0.04] bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-40">
      {/* Search / Command Bar */}
      <button
        onClick={onCommandOpen}
        className="flex items-center gap-3 px-4 py-2 w-80 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.05] transition-all group"
      >
        <Search className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" />
        <span className="flex-1 text-sm text-zinc-500 text-left">
          Search or type command...
        </span>
        <div className="flex items-center gap-1">
          <kbd className="h-5 px-1.5 flex items-center rounded bg-zinc-800 text-[10px] font-medium text-zinc-400 border border-zinc-700">
            ⌘
          </kbd>
          <kbd className="h-5 px-1.5 flex items-center rounded bg-zinc-800 text-[10px] font-medium text-zinc-400 border border-zinc-700">
            K
          </kbd>
        </div>
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* System Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">All Systems Online</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors"
          >
            <Bell className="w-5 h-5 text-zinc-400" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0a0a0c]" />
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-96 z-50 rounded-2xl bg-[#0f0f12] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-white/[0.04]">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <span className="text-xs text-zinc-500">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/[0.04]">
                    <button className="w-full py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-white/[0.05] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 overflow-hidden flex items-center justify-center text-white font-medium text-sm">
              {clerkUser?.imageUrl ? (
                <img
                  src={clerkUser.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.[0] || "U"
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white leading-none">
                {user?.name || clerkUser?.firstName || "User"}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {user?.subscriptionTier === "pro" ? "Pro Plan" : "Free Plan"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 z-50 rounded-2xl bg-[#0f0f12] border border-white/[0.08] shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div className="p-2">
                    <MenuItem
                      icon={User}
                      label="Profile"
                      href="/dashboard/settings"
                    />
                    <MenuItem
                      icon={Settings}
                      label="Settings"
                      href="/dashboard/settings"
                    />
                    <MenuItem
                      icon={HelpCircle}
                      label="Help & Support"
                      href="#"
                    />
                  </div>
                  <div className="p-2 border-t border-white/[0.04]">
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function NotificationItem({ notification }: { notification: any }) {
  const statusColors = {
    success: "bg-emerald-500",
    pending: "bg-amber-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={cn(
        "p-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer",
        notification.unread && "bg-white/[0.02]"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-2 h-2 rounded-full mt-2 shrink-0",
            statusColors[notification.status as keyof typeof statusColors]
          )}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{notification.title}</p>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">
            {notification.description}
          </p>
          <p className="text-[10px] text-zinc-600 mt-1">{notification.time}</p>
        </div>
        {notification.status === "pending" && (
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
              <Check className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors"
    >
      <Icon className="w-4 h-4 text-zinc-400" />
      <span className="text-sm">{label}</span>
    </a>
  );
}