"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/content/process";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop(1024);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!desktop || reduced || !root.current || !rail.current) return;

      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");

      gsap.set(steps, { opacity: 0.28, y: 18 });
      gsap.set(steps[0], { opacity: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 62%",
          end: "bottom 78%",
          scrub: 0.6,
        },
      });

      timeline.to(rail.current, {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
      });

      steps.forEach((step, index) => {
        timeline.to(step, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, index * 0.6);
        if (dots[index]) {
          timeline.to(
            dots[index],
            { backgroundColor: "var(--primary)", borderColor: "var(--primary)", duration: 0.2 },
            index * 0.6,
          );
        }
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: root, dependencies: [desktop, reduced] },
  );

  return (
    <Section id="process" className="relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="Four steps, no mystery."
          lede="A predictable engagement shape you can plan around. Scope and trade-offs stay visible the whole way through."
        />

        <div ref={root} className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-border lg:block"
          >
            <div
              ref={rail}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-primary via-primary/70 to-transparent"
            />
          </div>

          <ol className="space-y-6 lg:space-y-0">
            {processSteps.map((step, index) => (
              <li
                key={step.index}
                data-step
                className={cn(
                  "relative flex flex-col gap-4 lg:flex-row lg:gap-10",
                  index > 0 && "lg:pt-14",
                )}
              >
                <div className="hidden w-10 shrink-0 justify-center lg:flex">
                  <span
                    data-dot
                    className="mt-1.5 grid size-3 place-items-center rounded-full border border-border bg-background"
                  >
                    <span className="size-1 rounded-full bg-current opacity-0" />
                  </span>
                </div>

                <div className="grid flex-1 gap-6 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/25 hover:bg-card/70 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:p-8">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-primary">{step.index}</span>
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="lg:border-l lg:border-border lg:pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Deliverables
                    </p>
                    <ul className="mt-3 space-y-2">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[13px] text-foreground/85">
                          <Check className="size-3.5 shrink-0 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
