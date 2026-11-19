import { cn } from "@/lib/utils";

/**
 * Layered ambient background: soft radial gradients (no `filter: blur()`, which
 * is what made this expensive on mobile — large blurred layers get re-rastered
 * on every paint). Animation is disabled below 768px via CSS, so phones get a
 * static, GPU-cheap wash.
 */
export function Aurora({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "subtle" | "default" | "strong";
}) {
  const opacity =
    intensity === "subtle" ? "opacity-40" : intensity === "strong" ? "opacity-100" : "opacity-70";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", opacity, className)}
    >
      <div className="absolute -left-[15%] -top-[30%] size-[38rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--violet),transparent_66%)] [animation-delay:-4s]" />
      <div className="absolute -right-[18%] top-[-16%] size-[32rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--indigo),transparent_68%)] opacity-80 [animation-delay:-11s]" />
      <div className="absolute -bottom-[35%] left-[22%] hidden size-[28rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--cyan),transparent_70%)] opacity-50 [animation-delay:-17s] sm:block" />
    </div>
  );
}

/** CSS grid with a radial mask that fades the lines out from the center. */
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
 * Film grain, rendered as a small tiled SVG (rasterized once, then repeated).
 * The previous version ran a full-viewport live turbulence filter, which was the
 * single most expensive thing on the page. Hidden below `md` and when the user
 * asks for reduced motion.
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
