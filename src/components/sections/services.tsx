"use client";

import {
  Code2,
  Gauge,
  Layers,
  LayoutTemplate,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services, type ServiceIcon } from "@/content/services";
import { Container, Section } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SpotlightArea } from "@/components/fx/spotlight";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  layout: LayoutTemplate,
  code: Code2,
  sparkles: Sparkles,
  layers: Layers,
  gauge: Gauge,
  shield: Shield,
};

export function Services() {
  return (
    <Section id="services" className="relative">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Design and engineering,
              <br className="hidden sm:block" /> under one roof.
            </>
          }
          lede="Six focused capabilities. No account managers, no handoff chains — the people you meet are the people building."
        />

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <RevealItem key={service.slug} className={cn(service.span === "wide" && "lg:col-span-1")}>
                <SpotlightArea className="size-full">
                  <article className="group relative flex size-full flex-col rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_24px_60px_-32px_var(--glow)]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="grid size-10 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="size-4.5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-base font-semibold tracking-tight">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {service.summary}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-border pt-4">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/70"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </SpotlightArea>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
