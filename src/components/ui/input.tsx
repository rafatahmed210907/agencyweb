import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-input bg-background/60 px-3.5 py-2 text-sm text-foreground shadow-sm transition-[border-color,box-shadow]",
        "placeholder:text-muted-foreground/70",
        "focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
