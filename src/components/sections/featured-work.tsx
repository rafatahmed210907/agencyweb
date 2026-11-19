import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { ArtFrame } from "@/components/shared/art-frame";
import { LimeSurface } from "@/components/fx/lime-surface";
import { featuredCaseStudies, pillarLabels } from "@/content/work";

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
          lede="One case study from each pillar: a platform we planned and established, one we designed and built, and one we took to market."
          actions={
            <Button asChild variant="outline">
              <Link href="/work">
                All case studies
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((study) => (
            <RevealItem key={study.slug}>
              <Link href={`/work/${study.slug}`} className="group block h-full">
                <LimeSurface
                  edge="none"
                  padded={false}
                  className="flex h-full flex-col transition-colors group-hover:border-[rgba(166,240,76,0.3)]"
                >
                  <ArtFrame
                    pattern={study.cover.pattern}
                    label={study.cover.label}
                    variant={study.cover.variant}
                    className="rounded-none border-0 border-b border-[rgba(166,240,76,0.1)]"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a6f04c]">
                        {study.client}
                      </p>
                      <span className="font-mono text-[10px] text-[#6b776b]">{study.year}</span>
                    </div>

                    <h3 className="mt-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#f2f5ef]">
                      {study.title}
                    </h3>

                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[#9aa79a]">
                      {study.summary}
                    </p>

                    <dl className="mt-4 grid grid-cols-2 border-t border-[rgba(166,240,76,0.1)] pt-4">
                      {study.metrics.slice(0, 2).map((metric, index) => (
                        <div key={metric.label} className={index > 0 ? "border-l border-[rgba(166,240,76,0.1)] pl-4" : undefined}>
                          <dd className="text-[15px] font-semibold tabular text-[#f2f5ef]">
                            {metric.value}
                            {metric.suffix ? (
                              <span className="ml-0.5 text-[10px] font-normal text-[#9aa79a]">
                                {metric.suffix}
                              </span>
                            ) : null}
                          </dd>
                          <dt className="mt-0.5 text-[10.5px] text-[#6b776b]">{metric.label}</dt>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="rounded-md border border-[rgba(166,240,76,0.12)] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#9aa79a]">
                        {pillarLabels[study.pillar]}
                      </span>
                      <ArrowUpRight className="size-3.5 text-[#a6f04c] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </LimeSurface>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
