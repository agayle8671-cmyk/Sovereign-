
// Apple-style spring configurations
export const springs = {
    // Snappy - buttons, small UI elements
    snappy: { type: "spring" as const, stiffness: 400, damping: 30 },

    // Smooth - modals, panels, large movements
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },

    // Bouncy - playful, attention-grabbing
    bouncy: { type: "spring" as const, stiffness: 400, damping: 17 },

    // Slow - page transitions, hero animations
    slow: { type: "spring" as const, stiffness: 100, damping: 20 },

    // Gentle - subtle movements
    gentle: { type: "spring" as const, stiffness: 120, damping: 14 },

    // Instant - micro-interactions
    instant: { type: "spring" as const, stiffness: 500, damping: 35 },
};

// Stagger configurations
export const stagger = {
    fast: 0.03,
    medium: 0.05,
    slow: 0.08,
};

// Common animation variants
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
};
