import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MediaFrame } from "@/components/shared/media-frame";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { TiltCard } from "@/components/fx/tilt-card";
import { featuredCaseStudies } from "@/content/work";
import { media } from "@/content/media";

export function FeaturedWork() {
  return (
    <Section id="work" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Products we shipped,
              <br className="hidden sm:block" /> not decks we presented.
            </>
          }
          lede="Three engagements that show the range: realtime data, billing infrastructure, and offline-first mobile capture."
          actions={
            <Button asChild variant="outline">
              <Link href="/work">
                All case studies
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((study) => {
            const cover = media[study.cover];
            return (
              <RevealItem key={study.slug}>
                <TiltCard strength={5}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group flex size-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors hover:border-primary/30"
                  >
                    <div className="relative">
                      <MediaFrame
                        src={cover.src}
                        alt={cover.alt}
                        label={study.client}
                        aspect="aspect-[4/3]"
                        className="rounded-none border-0 border-b border-border"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium text-foreground backdrop-blur-md">
                        {study.year}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                        {study.client}
                      </p>
                      <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight">
                        {study.title}
                      </h3>

                      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                        {study.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <dd className="text-sm font-semibold tabular text-foreground">
                              {metric.value}
                              {metric.suffix ? (
                                <span className="ml-0.5 text-[10px] font-normal text-muted-foreground">
                                  {metric.suffix}
                                </span>
                              ) : null}
                            </dd>
                            <dt className="text-[11px] text-muted-foreground">{metric.label}</dt>
                          </div>
                        ))}
                      </dl>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
                        Read the case study
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
