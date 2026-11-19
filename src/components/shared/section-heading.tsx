import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  withLine = true,
}: {
  children: React.ReactNode;
  className?: string;
  withLine?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary",
        className,
      )}
    >
      {withLine ? <span aria-hidden="true" className="h-px w-6 bg-primary/50" /> : null}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  actions,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  actions?: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        actions && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h2
          id={id}
          className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
        >
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {lede}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
