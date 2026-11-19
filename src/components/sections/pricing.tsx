import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/content/pricing";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GridBackdrop } from "@/components/fx/atmosphere";

export function Pricing() {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <GridBackdrop className="opacity-50" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Engagements"
          title="Three ways to work together."
          lede="Fixed, written scope per period. No hourly billing, no surprise invoices."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3" step={0.1}>
          {pricingTiers.map((tier) => (
            <RevealItem key={tier.id} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-7",
                  tier.highlighted
                    ? "border-primary/40 bg-card/85 shadow-[0_30px_90px_-40px_var(--glow)] lg:-mt-4 lg:pb-9"
                    : "border-border bg-card/40 hover:border-primary/25",
                )}
              >
                {tier.highlighted ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_60%_at_50%_0%,var(--glow),transparent_60%)] opacity-40"
                    />
                  </>
                ) : null}

                <div className="relative flex items-start justify-between gap-3">
                  <h3 className="text-sm font-medium text-muted-foreground">{tier.name}</h3>
                  {tier.badge ? <Badge className="shrink-0">{tier.badge}</Badge> : null}
                </div>

                <p className="relative mt-4 flex items-baseline gap-1.5">
                  <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.035em]">
                    {tier.price}
                  </span>
                  <span className="text-xs text-muted-foreground">{tier.cadence}</span>
                </p>

                <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                  {tier.summary}
                </p>

                <ul className="relative mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-foreground/85">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={tier.highlighted ? "glow" : "outline"}
                  className="relative mt-7 w-full"
                >
                  <Link href={`/contact?plan=${tier.id}`}>
                    {tier.cta}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Prices are sample figures for this demo. Real scoping happens on the first call.
        </p>
      </Container>
    </Section>
  );
}
