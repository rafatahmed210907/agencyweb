import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee. The track is duplicated and marked aria-hidden so screen
 * readers only announce the content once. Stops on hover.
 */
export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("mask-fade-x group/marquee relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-12 will-change-transform",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee-x ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}
