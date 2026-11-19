import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium",
    "transition-[color,background,box-shadow,transform,border-color] duration-200 ease-out",
    "active:scale-[0.985] motion-reduce:transition-none motion-reduce:active:scale-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[#a6f04c] text-[#08120a] shadow-[0_10px_34px_-14px_rgba(166,240,76,0.6)] hover:bg-[#bbf873]",
        glow: "group relative overflow-hidden bg-[#a6f04c] font-semibold text-[#08120a] shadow-[0_14px_40px_-12px_rgba(166,240,76,0.6)] hover:-translate-y-0.5 hover:bg-[#bbf873] hover:shadow-[0_18px_54px_-12px_rgba(166,240,76,0.75)]",
        secondary:
          "border border-[rgba(166,240,76,0.14)] bg-[rgba(166,240,76,0.05)] text-[#f2f5ef] hover:border-[rgba(166,240,76,0.3)] hover:bg-[rgba(166,240,76,0.09)]",
        outline:
          "border border-[rgba(166,240,76,0.2)] bg-[rgba(166,240,76,0.025)] text-[#f2f5ef] hover:border-[rgba(166,240,76,0.42)] hover:bg-[rgba(166,240,76,0.06)]",
        ghost: "text-[#9aa79a] hover:bg-white/[0.05] hover:text-[#f2f5ef]",
        link: "text-[#a6f04c] underline-offset-4 hover:underline",
        destructive: "bg-[#f2555a] text-[#1a0505] hover:bg-[#ff6a6f]",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-5",
        lg: "h-12 px-6 text-[15px]",
        icon: "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
