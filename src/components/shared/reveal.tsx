"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.65,
  blur = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  as?: "div" | "span" | "li";
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = offsets[direction];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: blur ? "blur(9px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: "div" | "ul";
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = stagger(step, delay);

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  blur?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 22, filter: blur ? "blur(8px)" : "blur(0px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a string into words and reveals each with a stagger. Renders plain
 * text when reduced motion is requested.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={cn("inline-block", wordClassName)}
          initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: delay + index * 0.055,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

export { fadeUp };
