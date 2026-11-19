import { cn } from "@/lib/utils";
import { GridBackdrop } from "@/components/fx/atmosphere";
import { type ArtPattern, artCells } from "@/content/art";

const TICK = "absolute size-2 border-lime/45";

/**
 * Deterministic, code-drawn cover art. No images, no network, no layout shift:
 * each pattern is plain CSS/SVG on the near-black canvas with lime accents.
 */
export function ArtFrame({
  pattern = "mesh",
  label,
  variant = 0,
  className,
  aspect = "aspect-[16/11]",
  shine = true,
}: {
  pattern?: ArtPattern;
  label: string;
  variant?: number;
  className?: string;
  aspect?: string;
  shine?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border border-border bg-[#080b08]",
        aspect,
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <PatternLayer pattern={pattern} variant={variant} />
        <GridBackdrop size={26} className="opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(166,240,76,0.10),transparent_70%)]" />
      </div>

      <span aria-hidden="true" className={cn(TICK, "left-3 top-3 border-l border-t")} />
      <span aria-hidden="true" className={cn(TICK, "right-3 top-3 border-r border-t")} />
      <span aria-hidden="true" className={cn(TICK, "bottom-3 left-3 border-b border-l")} />
      <span aria-hidden="true" className={cn(TICK, "bottom-3 right-3 border-b border-r")} />

      <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9aa79a]">
        {label}
      </span>

      {shine ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050706]/80 via-transparent to-transparent"
        />
      ) : null}
    </div>
  );
}

function PatternLayer({ pattern, variant }: { pattern: ArtPattern; variant: number }) {
  switch (pattern) {
    case "rings":
      return (
        <div className="absolute inset-0 grid place-items-center">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className="absolute rounded-full border border-lime/20"
              style={{
                width: `${52 - index * 11}%`,
                aspectRatio: "1",
                opacity: 1 - index * 0.18,
                boxShadow: index === 0 ? "0 0 60px -18px rgba(166,240,76,0.5)" : undefined,
              }}
            />
          ))}
          <span className="size-3 rounded-full bg-lime shadow-[0_0_28px_rgba(166,240,76,0.8)]" />
        </div>
      );

    case "bars":
      return (
        <div className="absolute inset-0 flex items-end gap-1.5 p-6 pb-12">
          {Array.from({ length: 14 }).map((_, index) => {
            const height = 22 + ((index * 17 + variant * 13) % 62);
            return (
              <span
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm",
                  index % 4 === 0 ? "bg-lime/70" : "bg-lime/20",
                )}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
      );

    case "arcs":
      return (
        <svg className="absolute inset-0 size-full" viewBox="0 0 400 280" fill="none">
          {[0, 1, 2, 3, 4].map((index) => (
            <path
              key={index}
              d={`M -20 ${240 - index * 12} C 120 ${60 + index * 30}, 280 ${60 + index * 30}, 420 ${240 - index * 12}`}
              stroke="rgba(166,240,76,0.22)"
              strokeWidth={1.2}
              opacity={1 - index * 0.15}
            />
          ))}
          <circle cx="200" cy="150" r="4" fill="#a6f04c" />
        </svg>
      );

    case "cells":
      return (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px p-6 pb-14">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "rounded-sm border border-lime/10",
                artCells(variant).includes(index) ? "bg-lime/[0.14]" : "bg-white/[0.02]",
              )}
            />
          ))}
        </div>
      );

    case "grid":
      return (
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "border border-white/[0.03]",
                (index * 7 + variant * 5) % 11 === 0 && "bg-lime/[0.16]",
              )}
            />
          ))}
        </div>
      );

    case "mesh":
    default:
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_18%_10%,rgba(166,240,76,0.22),transparent_62%),radial-gradient(80%_80%_at_90%_100%,rgba(57,255,20,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_60%_40%,transparent,rgba(166,240,76,0.10),transparent_45%)]" />
        </div>
      );
  }
}
