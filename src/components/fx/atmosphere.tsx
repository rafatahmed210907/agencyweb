"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * The single light source of the site: a cone of lime falling from the top
 * centre, exactly like the reference hero. Opacity and spread are driven by
 * scroll progress over the parent section.
 *
 * Animates opacity/transform only (never `filter`), is mounted only on `md+`,
 * and renders a static cone under reduced motion.
 */
export function SunlightCone({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.9, 0.5, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0.86]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-[46rem]", className)}
    >
      <div className="sunspot absolute inset-0" />
      {reduced ? (
        <div className="sunlight-cone absolute left-1/2 top-[-14rem] hidden h-[40rem] w-[64rem] -translate-x-1/2 opacity-60 md:block" />
      ) : (
        <motion.div
          style={{ opacity, scaleX, scaleY }}
          className="sunlight-cone absolute left-1/2 top-[-14rem] hidden h-[40rem] w-[64rem] origin-top -translate-x-1/2 md:block"
        />
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(166,240,76,0.45)] to-transparent" />
    </div>
  );
}

/** Static top-of-page light wash for inner page heroes and CTA panels. */
export function Sunspot({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("sunspot pointer-events-none absolute inset-x-0 top-0 h-[28rem]", className)} />
  );
}

/** CSS grid with a radial mask that fades the lines out from the centre. */
export function GridBackdrop({
  className,
  size = 64,
  fade = true,
}: {
  className?: string;
  size?: number;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid-bg pointer-events-none absolute inset-0", className)}
      style={{
        backgroundSize: `${size}px ${size}px`,
        maskImage: fade
          ? "radial-gradient(120% 90% at 50% 10%, black 0%, rgba(0,0,0,0.45) 55%, transparent 88%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(120% 90% at 50% 10%, black 0%, rgba(0,0,0,0.45) 55%, transparent 88%)"
          : undefined,
      }}
    />
  );
}

const NOISE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Film grain as a small tiled SVG (rasterized once, then repeated) instead of
 * a live full-viewport turbulence filter. Hidden below `md`.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden mix-blend-soft-light md:block"
      style={{
        opacity: "var(--noise-opacity)",
        backgroundImage: NOISE_TILE,
        backgroundSize: "140px 140px",
      }}
    />
  );
}
