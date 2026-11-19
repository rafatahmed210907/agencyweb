import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-[rgba(166,240,76,0.14)] bg-black/40 px-3.5 py-2 text-sm text-[#f2f5ef] transition-[border-color,box-shadow]",
        "placeholder:text-[#6b776b]",
        "focus-visible:border-[rgba(166,240,76,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(166,240,76,0.18)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-[#f2555a]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
