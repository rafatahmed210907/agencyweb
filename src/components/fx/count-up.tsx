"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Counts up to `value` when scrolled into view. The final value is what renders
 * on the server, so the number is correct without JavaScript; the animation
 * rewinds to zero on the first frame after mount.
 */
export function CountUp({
  value,
  duration = 1600,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(reduced ? value : display).toFixed(decimals)}
      {suffix}
    </span>
  );
}
