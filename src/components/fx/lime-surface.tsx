"use client";

import { useRef, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "@/hooks/use-media-query";

export type SurfaceTone = "solid" | "translucent";
export type SurfaceEdge = "top" | "wide" | "left" | "none";

interface LimeSurfaceProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  tone?: SurfaceTone;
  edge?: SurfaceEdge;
  interactive?: boolean;
  padded?: boolean;
}

/**
 * The one panel base of the site: near-black translucent fill, lime hairline
 * border, a 2px lime filament along one edge, pointer spotlight, and an
 * optional hover lift. Every card in the page layers its own signature on top
 * of this so radii, borders and hover timing never drift.
 */
export function LimeSurface({
  children,
  className,
  tone = "solid",
  edge = "top",
  interactive = false,
  padded = true,
  onMouseMove,
  ...rest
}: LimeSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);
    if (!rich || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - box.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - box.top}px`);
  };

  return (
    <div
      ref={ref}
      data-tone={tone}
      data-edge={edge}
      onMouseMove={handleMove}
      className={cn(
        "nl-surface",
        interactive && "nl-surface-interactive",
        padded && "p-6",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
