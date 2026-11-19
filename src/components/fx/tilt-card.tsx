"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "@/hooks/use-media-query";

/**
 * Pointer-driven 3D tilt with spring return. `strength` is degrees at the edges.
 */
export function TiltCard({
  children,
  className,
  strength = 8,
  scaleOnHover = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  scaleOnHover?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 180, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [strength, -strength]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-strength, strength]), springConfig);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={rich ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        whileHover={rich ? { scale: scaleOnHover } : undefined}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="size-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
