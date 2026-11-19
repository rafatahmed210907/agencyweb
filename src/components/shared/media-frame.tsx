import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridBackdrop } from "@/components/fx/atmosphere";

/**
 * Photo frame with a deterministic gradient fallback. If `src` is missing or
 * the image fails to load, the composition still holds its layout with a
 * generated mesh + label instead of an empty box.
 */
export function MediaFrame({
  src,
  alt,
  label,
  className,
  aspect = "aspect-[16/10]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  overlay = true,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/media relative isolate overflow-hidden rounded-xl border border-border bg-surface-2",
        aspect,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={85}
          className="object-cover transition-transform duration-700 ease-out group-hover/media:scale-[1.04]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_0%,var(--violet),transparent_58%),radial-gradient(100%_100%_at_100%_100%,var(--indigo),transparent_60%)] opacity-45" />
          <GridBackdrop size={28} />
          {label ? (
            <span className="absolute inset-0 grid place-items-center px-6 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              {label}
            </span>
          ) : null}
        </div>
      )}

      {overlay ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
      />
    </div>
  );
}
