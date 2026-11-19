import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { id?: string }) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 py-20 sm:py-24 lg:py-28", className)}
      {...rest}
    >
      {children}
    </section>
  );
}
