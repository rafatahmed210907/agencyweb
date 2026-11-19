import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Sunspot, GridBackdrop } from "@/components/fx/atmosphere";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-36", className)}>
      <Sunspot />
      <GridBackdrop className="opacity-70" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.032em] text-[#f2f5ef]">
            {title}
          </h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9aa79a] sm:text-base">
              {lede}
            </p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={0.18}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
