import type { Transition, Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.7,
};

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 22,
  mass: 0.6,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const fadeBlur: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT_EXPO },
  },
};

export const stagger = (step = 0.075, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
