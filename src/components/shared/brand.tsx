import { cn } from "@/lib/utils";

/**
 * Northlane mark: a compass-style diamond with a lane cut through it.
 * Pure SVG so it stays crisp at any size and works in both themes.
 */
export function BrandMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="nl-mark" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--violet-soft)" />
          <stop offset="0.55" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#nl-mark)" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M16 6.5 22.5 16 16 25.5 9.5 16 16 6.5Z"
        stroke="url(#nl-mark)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="color-mix(in oklab, var(--violet) 14%, transparent)"
      />
      <path d="M16 11.5v9" stroke="url(#nl-mark)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({
  className,
  markSize = 28,
  textClassName,
  showText = true,
}: {
  className?: string;
  markSize?: number;
  textClassName?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={markSize} />
      {showText ? (
        <span className={cn("text-[15px] font-semibold tracking-[-0.02em]", textClassName)}>
          Northlane
        </span>
      ) : null}
    </span>
  );
}
