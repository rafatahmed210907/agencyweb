"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Isometric "pooled light" strip: two large radial washes behind the heading,
 * slowly drifting. Static under reduced motion.
 */
export function LightPool() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yA = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={reduced ? undefined : { y: yA }}
        className="absolute -left-[16%] top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(166,240,76,0.10),transparent_66%)]"
      />
      <motion.div
        style={reduced ? undefined : { y: yB }}
        className="absolute -right-[16%] bottom-[-20%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.07),transparent_68%)]"
      />
    </div>
  );
}

export function TrustBar() {
  return (
    <section
      aria-label="Selected clients"
      className="relative overflow-hidden border-y border-[rgba(166,240,76,0.1)] py-10"
    >
      <LightPool />
      <Container className="relative">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b776b]">
          Trusted by product teams at
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 sm:gap-y-6">
          {[
            "Atlas Systems",
            "Kite",
            "Meridian Labs",
            "Signal",
            "Harbor Logistics",
            "Verdant",
          ].map((name) => (
            <li
              key={name}
              className="text-[13.5px] font-semibold tracking-[-0.02em] text-[#6b776b] transition-colors hover:text-[#dfe8df] sm:text-[15px]"
            >
              {name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
