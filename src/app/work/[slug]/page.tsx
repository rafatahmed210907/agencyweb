import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Quote } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Container, Section } from "@/components/layout/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { ArtFrame } from "@/components/shared/art-frame";
import { SectionHeading, Eyebrow } from "@/components/shared/section-heading";
import { CountUp } from "@/components/fx/count-up";
import { Sunspot, GridBackdrop } from "@/components/fx/atmosphere";
import { LimeSurface } from "@/components/fx/lime-surface";
import { Button } from "@/components/ui/button";
import { caseStudies, getCaseStudy, getNextCaseStudy, pillarLabels } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return buildMetadata({ title: "Case study not found", path: `/work/${slug}` });

  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const next = getNextCaseStudy(study.slug);

  return (
    <>
      <main id="main">
        <article>
          <header className="relative overflow-hidden pb-12 pt-32 sm:pt-36">
            <Sunspot />
            <GridBackdrop className="opacity-60" />
            <Container className="relative">
              <Reveal>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#9aa79a] transition-colors hover:text-[#f2f5ef]"
                >
                  <ArrowLeft className="size-3.5" />
                  All case studies
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <Eyebrow withLine={false}>{study.client}</Eyebrow>
                  <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                  <span className="font-mono text-[11px] text-[#6b776b]">{study.year}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9aa79a]">
                    {pillarLabels[study.pillar]}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 max-w-4xl text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#f2f5ef]">
                  {study.title}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#9aa79a] sm:text-base">
                  {study.summary}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <dl className="mt-9 grid gap-x-10 gap-y-6 border-t border-[rgba(166,240,76,0.12)] pt-7 sm:grid-cols-3">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b776b]">
                      Services
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-md border border-[rgba(166,240,76,0.14)] bg-[rgba(166,240,76,0.06)] px-2 py-0.5 text-[11px] text-[#c3ccc3]"
                        >
                          {service}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b776b]">
                      Stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-[rgba(166,240,76,0.1)] bg-black/40 px-2 py-0.5 font-mono text-[11px] text-[#9aa79a]"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b776b]">
                      Year
                    </dt>
                    <dd className="mt-2 text-sm tabular text-[#dfe8df]">{study.year}</dd>
                  </div>
                </dl>
              </Reveal>
            </Container>
          </header>

          <Container>
            <Reveal>
              <ArtFrame
                pattern={study.cover.pattern}
                label={study.cover.label}
                variant={study.cover.variant}
                aspect="aspect-[16/9]"
                className="rounded-2xl"
              />
            </Reveal>
          </Container>

          <Section className="pt-16">
            <Container>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
                <Reveal>
                  <div className="lg:sticky lg:top-28">
                    <Eyebrow>The challenge</Eyebrow>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="text-lg leading-relaxed text-[#dfe8df] sm:text-xl">{study.challenge}</p>
                </Reveal>
              </div>
            </Container>
          </Section>

          <Section className="border-y border-[rgba(166,240,76,0.1)] pt-14">
            <Container>
              <SectionHeading eyebrow="Approach" title="What we actually did." />
              <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {study.approach.map((item, index) => (
                  <RevealItem key={item.title}>
                    <LimeSurface edge="top" className="h-full p-6">
                      <span className="font-mono text-xs text-[#a6f04c]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base font-semibold tracking-[-0.01em] text-[#f2f5ef]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#9aa79a]">{item.body}</p>
                    </LimeSurface>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Container>
          </Section>

          <Section>
            <Container>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div>
                  <SectionHeading eyebrow="Outcome" title="What changed." />
                  <RevealGroup className="mt-10 grid grid-cols-2 gap-6">
                    {study.metrics.map((metric) => (
                      <RevealItem key={metric.label}>
                        <div>
                          <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-none tracking-[-0.03em] tabular text-[#f2f5ef]">
                            <CountUp
                              value={metric.value}
                              suffix={metric.suffix}
                              decimals={metric.decimals ?? 0}
                            />
                          </p>
                          <p className="mt-2 text-xs text-[#6b776b]">{metric.label}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>

                <Reveal direction="left">
                  <ul className="space-y-3 rounded-2xl border border-[rgba(166,240,76,0.12)] bg-[rgba(10,14,10,0.6)] p-6">
                    {study.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-[#c3ccc3]">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-[rgba(166,240,76,0.14)] text-[#a6f04c]">
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {study.testimonial ? (
                <Reveal delay={0.08}>
                  <figure className="mt-14 rounded-2xl border border-[rgba(166,240,76,0.12)] bg-[rgba(10,14,10,0.6)] p-8 sm:p-10">
                    <Quote className="size-7 text-[rgba(166,240,76,0.5)]" aria-hidden="true" />
                    <blockquote className="mt-5 max-w-3xl text-lg leading-relaxed text-[#dfe8df] sm:text-xl">
                      “{study.testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-[#9aa79a]">
                      <span className="font-medium text-[#f2f5ef]">{study.testimonial.name}</span>
                      {" · "}
                      {study.testimonial.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ) : null}

              <RevealGroup className="mt-4 grid gap-4 sm:grid-cols-2">
                {study.gallery.map((visual) => (
                  <RevealItem key={visual.label}>
                    <ArtFrame
                      pattern={visual.pattern}
                      label={visual.label}
                      variant={visual.variant}
                      aspect="aspect-[4/3]"
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Container>
          </Section>
        </article>

        <Section className="border-t border-[rgba(166,240,76,0.1)] pt-14">
          <Container>
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-[rgba(166,240,76,0.14)] bg-[rgba(10,14,10,0.6)] p-7 transition-colors hover:border-[rgba(166,240,76,0.32)] sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6b776b]">
                  Next project
                </p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#f2f5ef] sm:text-2xl">
                  {next.title}
                </p>
                <p className="mt-1 text-sm text-[#9aa79a]">
                  {next.client} · {next.year}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#a6f04c]">
                Read case study
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <div className="mt-10 flex flex-wrap gap-2.5">
              <Button asChild variant="outline">
                <Link href="/work">
                  <ArrowLeft className="size-4" />
                  All case studies
                </Link>
              </Button>
              <Button asChild variant="glow">
                <Link href="/contact">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
