"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Clock, Check } from "lucide-react";

interface AgentNudgeProps {
  initialShow?: boolean;
}

export function AgentNudge({ initialShow = false }: AgentNudgeProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Simulate agent nudge appearing after a delay
  useEffect(() => {
    if (!dismissed && initialShow) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [dismissed, initialShow]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleApprove = () => {
    // Handle approval logic
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#0f0f12]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/50">
            {/* Agent Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-[#0f0f12] animate-pulse" />
            </div>

            {/* Message */}
            <div className="max-w-sm">
              <p className="text-sm text-white">
                Client <span className="text-cyan-400 font-medium">'Apex Corp'</span> requested a meeting.
              </p>
              <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                3 available slots found. Send proposal?
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="p-2 rounded-xl hover:bg-white/[0.05] text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}