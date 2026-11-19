import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Aurora, GridBackdrop } from "@/components/fx/atmosphere";
import { Magnetic } from "@/components/fx/magnetic";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-card/60 px-6 py-14 text-center sm:px-10 sm:py-16">
            <Aurora intensity="strong" className="opacity-60" />
            <GridBackdrop size={44} className="opacity-40" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur-md">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">{site.availabilityDetail}</span>
              </span>

              <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
                Have something worth <span className="text-gradient">building properly?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                Tell us what you are working on. You will get a considered reply with a rough shape,
                timeline, and whether we are the right studio for it.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <Button asChild size="lg" variant="glow">
                    <Link href="/contact">
                      Start a project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="outline">
                  <Link href={`mailto:${site.email}`}>{site.email}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
