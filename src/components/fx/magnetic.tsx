"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "@/hooks/use-media-query";

/** Small pointer-follow translation for CTAs and icon buttons. */
export function Magnetic({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const config = { stiffness: 220, damping: 18, mass: 0.5 };
  const x = useSpring(useMotionValue(0), config);
  const y = useSpring(useMotionValue(0), config);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={rich ? { x, y } : undefined}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
