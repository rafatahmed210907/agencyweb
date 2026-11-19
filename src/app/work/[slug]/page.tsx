import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Quote } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container, Section } from "@/components/layout/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { MediaFrame } from "@/components/shared/media-frame";
import { SectionHeading } from "@/components/shared/section-heading";
import { Eyebrow } from "@/components/shared/section-heading";
import { CountUp } from "@/components/fx/count-up";
import { Aurora, GridBackdrop } from "@/components/fx/atmosphere";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/content/work";
import { media } from "@/content/media";
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

  const cover = media[study.cover];
  const next = getNextCaseStudy(study.slug);

  return (
    <>
      <Navbar />
      <main id="main">
        <article>
          <header className="relative overflow-hidden pb-12 pt-32 sm:pt-36">
            <Aurora intensity="subtle" />
            <GridBackdrop className="opacity-60" />
            <Container className="relative">
              <Reveal>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5" />
                  All case studies
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <Eyebrow withLine={false}>{study.client}</Eyebrow>
                  <span aria-hidden="true" className="h-3 w-px bg-border" />
                  <span className="font-mono text-[11px] text-muted-foreground">{study.year}</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-4 max-w-4xl text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                  {study.title}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {study.summary}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <dl className="mt-9 grid gap-x-10 gap-y-6 border-t border-border pt-7 sm:grid-cols-3">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Services
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.services.map((service) => (
                        <Badge key={service} variant="secondary" className="normal-case tracking-normal">
                          {service}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Year
                    </dt>
                    <dd className="mt-2 text-sm tabular">{study.year}</dd>
                  </div>
                </dl>
              </Reveal>
            </Container>
          </header>

          <Container>
            <Reveal>
              <MediaFrame
                src={cover.src}
                alt={cover.alt}
                aspect="aspect-[16/9]"
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
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
                  <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                    {study.challenge}
                  </p>
                </Reveal>
              </div>
            </Container>
          </Section>

          <Section className="border-y border-border bg-surface/40 pt-14">
            <Container>
              <SectionHeading eyebrow="Approach" title="What we actually did." />
              <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {study.approach.map((item, index) => (
                  <RevealItem key={item.title}>
                    <div className="h-full rounded-2xl border border-border bg-card/50 p-6">
                      <span className="font-mono text-xs text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
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
                          <p className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-none tracking-[-0.03em] tabular">
                            <CountUp value={metric.value} suffix={metric.suffix} />
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>

                <Reveal direction="left">
                  <ul className="space-y-3 rounded-2xl border border-border bg-card/40 p-6">
                    {study.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-foreground/85">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
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
                  <figure className="mt-14 rounded-2xl border border-border bg-card/50 p-8 sm:p-10">
                    <Quote className="size-7 text-primary/50" aria-hidden="true" />
                    <blockquote className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
                      “{study.testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{study.testimonial.name}</span>
                      {" · "}
                      {study.testimonial.role}
                    </figcaption>
                  </figure>
                </Reveal>
              ) : null}

              <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
                {study.gallery.map((key) => {
                  const asset = media[key];
                  return (
                    <RevealItem key={key}>
                      <MediaFrame
                        src={asset.src}
                        alt={asset.alt}
                        aspect="aspect-[4/3]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </Container>
          </Section>
        </article>

        <Section className="border-t border-border pt-14">
          <Container>
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card/45 p-7 transition-colors hover:border-primary/30 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Next project
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{next.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {next.client} · {next.year}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-primary">
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
