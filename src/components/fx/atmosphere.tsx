import { cn } from "@/lib/utils";

/**
 * Layered ambient background: drifting violet/indigo aurora blobs behind a
 * masked CSS grid. Pure CSS keyframes — no JS, no canvas, no WebGL.
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
      <div className="absolute -left-[10%] -top-[25%] size-[46rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--violet),transparent_62%)] blur-[110px] [animation-delay:-4s]" />
      <div className="absolute right-[-14%] top-[-12%] size-[40rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--indigo),transparent_64%)] blur-[120px] [animation-delay:-11s]" />
      <div className="absolute bottom-[-30%] left-[24%] size-[34rem] animate-aurora rounded-full bg-[radial-gradient(circle_at_center,var(--cyan),transparent_66%)] blur-[130px] opacity-60 [animation-delay:-17s]" />
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

/** Fine film grain. Fixed overlay, extremely low opacity, never intercepts clicks. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
      style={{ opacity: "var(--noise-opacity)" }}
    >
      <svg className="size-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="nl-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#nl-noise)" />
      </svg>
    </div>
  );
}
