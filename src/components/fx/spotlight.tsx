"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "@/hooks/use-media-query";

/**
 * Wraps content and tracks the pointer in CSS variables (`--mx`, `--my`),
 * letting children paint a spotlight. Disabled on touch and when the user
 * prefers reduced motion.
 */
export function SpotlightArea({
  children,
  className,
  glow = "color-mix(in oklab, var(--violet) 22%, transparent)",
  size = 420,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={cn("group/spotlight relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 0%), ${glow}, transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}
