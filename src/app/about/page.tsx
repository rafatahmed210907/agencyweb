import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { MediaFrame } from "@/components/shared/media-frame";
import { Aurora } from "@/components/fx/atmosphere";
import { Button } from "@/components/ui/button";
import { milestones, team, values } from "@/content/studio";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Northlane is a small senior software studio building product interfaces and web platforms. Meet the team and how we work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="About the studio"
          title={
            <>
              Small by design.
              <br />
              <span className="text-gradient">Senior by default.</span>
            </>
          }
          lede="Northlane is six specialists who design and build product software together. No account layer, no junior handoff — the people in the first call are the people writing the code."
        />

        <Section className="pt-4">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    The short version
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Founded in 2019 by a designer and an engineer who were tired of handoff-shaped
                    projects.
                  </p>
                </div>
              </Reveal>

              <div className="space-y-8">
                <Reveal>
                  <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                    Most software projects fail in the space between a good design file and working
                    production code. We removed that space. Design and engineering sit in the same
                    pair of hands, review each other&apos;s work in the browser, and ship every week.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    That means we take on fewer engagements than a typical agency. Two to three at a
                    time, each with people who have shipped this kind of product before. The trade-off
                    is deliberate: fewer projects, deeper involvement, better outcomes.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <MediaFrame
                      src={media.galleryStudio.src}
                      alt={media.galleryStudio.alt}
                      aspect="aspect-[4/3]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <MediaFrame
                      src={media.galleryWorkspace.src}
                      alt={media.galleryWorkspace.alt}
                      aspect="aspect-[4/3]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="relative border-y border-border bg-surface/40">
          <Aurora intensity="subtle" />
          <Container className="relative">
            <SectionHeading
              eyebrow="Principles"
              title="Four rules we do not break."
              lede="These are the operating constraints that keep the work honest."
            />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <RevealItem key={value.title}>
                  <div className="flex h-full gap-5 rounded-2xl border border-border bg-card/50 p-6">
                    <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="Timeline"
              title="How the studio grew."
              lede="Slowly, and on purpose."
            />
            <ol className="mt-12 space-y-0">
              {milestones.map((item, index) => (
                <Reveal key={item.year} delay={index * 0.06}>
                  <li className="grid gap-3 border-t border-border py-7 first:border-t-0 sm:grid-cols-[6rem_minmax(0,16rem)_minmax(0,1fr)] sm:gap-8">
                    <span className="font-mono text-sm text-primary">{item.year}</span>
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>

        <Section className="border-t border-border">
          <Container>
            <SectionHeading
              eyebrow="The team"
              title="Six people, no bench."
              lede="Sample profiles for this demo build. Every engagement is staffed by the founders and senior specialists."
            />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <RevealItem key={member.name}>
                  <div className="group h-full rounded-2xl border border-border bg-card/45 p-5 transition-colors hover:border-primary/25">
                    <div
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${member.accent} font-mono text-sm font-semibold text-foreground ring-1 ring-inset ring-white/10`}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{member.name}</h3>
                    <p className="mt-0.5 text-xs text-primary">{member.role}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{member.bio}</p>
                    <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {member.focus}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Want to see the work instead of the team page?
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <Button asChild variant="outline">
                    <Link href="/work">
                      View case studies
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="glow">
                    <Link href="/contact">
                      Start a project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
