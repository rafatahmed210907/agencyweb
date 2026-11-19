import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]",
  {
    variants: {
      variant: {
        default: "border-[rgba(166,240,76,0.3)] bg-[rgba(166,240,76,0.1)] text-[#a6f04c]",
        secondary: "border-[rgba(166,240,76,0.12)] bg-white/[0.04] text-[#c3ccc3]",
        outline: "border-[rgba(166,240,76,0.14)] text-[#9aa79a]",
        success: "border-[rgba(166,240,76,0.3)] bg-[rgba(166,240,76,0.1)] text-[#a6f04c]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
