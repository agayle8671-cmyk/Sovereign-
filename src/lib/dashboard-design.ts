/**
 * Sovereign Dashboard Design System
 * Inspired by: Linear, Arc, Mercury, Raycast
 * 
 * Core Principles:
 * 1. Sidebar Sovereignty - Vertical command center
 * 2. Bento Intelligence - Modular, hierarchical data
 * 3. Agentic Transparency - AI visible and controllable
 * 4. Fintech Trust - Bank-grade aesthetics
 * 5. Invisible Speed - Keyboard-first, instant feedback
 */

// Color tokens optimized for dark interfaces
export const colors = {
  // Base surfaces
  surface: {
    0: "#000000",    // True black
    1: "#09090b",    // App background
    2: "#0f0f12",    // Elevated surface (cards)
    3: "#18181b",    // Hover states
    4: "#27272a",    // Active states
  },
  
  // Borders
  border: {
    subtle: "rgba(255, 255, 255, 0.04)",
    default: "rgba(255, 255, 255, 0.08)",
    strong: "rgba(255, 255, 255, 0.12)",
    focus: "rgba(99, 102, 241, 0.5)",
  },
  
  // Engine colors (brand)
  engine: {
    shield: { base: "#06b6d4", glow: "rgba(6, 182, 212, 0.15)" },
    radar: { base: "#f59e0b", glow: "rgba(245, 158, 11, 0.15)" },
    magnet: { base: "#a855f7", glow: "rgba(168, 85, 247, 0.15)" },
    forge: { base: "#f43f5e", glow: "rgba(244, 63, 94, 0.15)" },
  },
  
  // Status colors
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    processing: "#06b6d4",
  },
  
  // Text
  text: {
    primary: "#fafafa",
    secondary: "#a1a1aa",
    tertiary: "#71717a",
    muted: "#52525b",
    inverse: "#09090b",
  },
};

// Animation presets
export const motion = {
  spring: {
    snappy: { type: "spring", stiffness: 500, damping: 30 },
    smooth: { type: "spring", stiffness: 300, damping: 30 },
    bouncy: { type: "spring", stiffness: 400, damping: 20 },
  },
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
  },
  ease: {
    out: [0.16, 1, 0.3, 1],
    in: [0.4, 0, 1, 1],
    inOut: [0.4, 0, 0.2, 1],
  },
};

// Spacing (8pt grid)
export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
};

// Typography
export const typography = {
  display: { size: "32px", weight: 600, lineHeight: 1.2, tracking: "-0.02em" },
  title: { size: "20px", weight: 600, lineHeight: 1.3, tracking: "-0.01em" },
  subtitle: { size: "16px", weight: 500, lineHeight: 1.4, tracking: "0" },
  body: { size: "14px", weight: 400, lineHeight: 1.5, tracking: "0" },
  caption: { size: "12px", weight: 500, lineHeight: 1.4, tracking: "0.01em" },
  mono: { size: "12px", weight: 400, lineHeight: 1.5, tracking: "0" },
};