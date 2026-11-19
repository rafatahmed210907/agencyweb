import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { ArtFrame } from "@/components/shared/art-frame";
import { Sunspot, GridBackdrop } from "@/components/fx/atmosphere";
import { LimeSurface } from "@/components/fx/lime-surface";
import { Button } from "@/components/ui/button";
import { milestones, team, values } from "@/content/studio";
import { pillars } from "@/content/pillars";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Northlane is a small senior studio taking products from planning and establishment through design, development, maintenance and marketing.",
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
              <span className="text-[#a6f04c]">Senior by default.</span>
            </>
          }
          lede="Northlane is six specialists who plan, design, build and market software products together. No account layer, no junior handoff — the people in the first call are the people doing the work."
        />

        <Section className="pt-4">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a6f04c]">
                    The short version
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#9aa79a]">
                    Founded in 2019 by a designer and an engineer who were tired of handoff-shaped
                    projects.
                  </p>
                </div>
              </Reveal>

              <div className="space-y-8">
                <Reveal>
                  <p className="text-lg leading-relaxed text-[#dfe8df] sm:text-xl">
                    Most software projects fail in the spaces between vendors: the planning studio
                    that never ships, the build team with no positioning, the agency that runs ads
                    for a product it has never opened. We removed those spaces. One team plans,
                    builds, maintains, and markets.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-[15px] leading-relaxed text-[#9aa79a]">
                    That means we take on fewer engagements than a typical agency. Two to three at a
                    time, each with people who have shipped this kind of product before. The
                    trade-off is deliberate: fewer projects, deeper involvement, better outcomes.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ArtFrame pattern="mesh" label="The studio" variant={1} aspect="aspect-[4/3]" />
                    <ArtFrame pattern="grid" label="Working process" variant={2} aspect="aspect-[4/3]" />
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="relative border-y border-[rgba(166,240,76,0.1)]">
          <Sunspot className="opacity-70" />
          <GridBackdrop className="opacity-50" />
          <Container className="relative">
            <SectionHeading
              eyebrow="Principles"
              title="Four rules we do not break."
              lede="These are the operating constraints that keep the work honest."
            />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <RevealItem key={value.title}>
                  <LimeSurface edge="top" className="flex h-full gap-5 p-6">
                    <span className="font-mono text-xs text-[#a6f04c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.01em] text-[#f2f5ef]">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#9aa79a]">{value.body}</p>
                    </div>
                  </LimeSurface>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>

        <Section>
          <Container>
            <SectionHeading
              eyebrow="What we cover"
              title="Three pillars, one team."
              lede="The same people move through planning, build, and marketing with you."
            />
            <div className="mt-12 space-y-0">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.slug} delay={index * 0.06}>
                  <div className="grid gap-3 border-t border-[rgba(166,240,76,0.12)] py-7 sm:grid-cols-[4rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-8">
                    <span className="font-mono text-sm text-[#a6f04c]">{pillar.index}</span>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-[#f2f5ef]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#9aa79a]">{pillar.summary}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-t border-[rgba(166,240,76,0.1)]">
          <Container>
            <SectionHeading eyebrow="Timeline" title="How the studio grew." lede="Slowly, and on purpose." />
            <ol className="mt-12 space-y-0">
              {milestones.map((item, index) => (
                <Reveal key={item.year} delay={index * 0.06}>
                  <li className="grid gap-3 border-t border-[rgba(166,240,76,0.12)] py-7 first:border-t-0 sm:grid-cols-[5rem_minmax(0,16rem)_minmax(0,1fr)] sm:gap-8">
                    <span className="font-mono text-sm text-[#a6f04c]">{item.year}</span>
                    <h3 className="text-base font-semibold tracking-[-0.01em] text-[#f2f5ef]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#9aa79a]">{item.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>

        <Section className="border-t border-[rgba(166,240,76,0.1)]">
          <Container>
            <SectionHeading
              eyebrow="The team"
              title="Six people, no bench."
              lede="Every engagement is staffed by the founders and senior specialists. No one is learning on your budget."
            />
            <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <RevealItem key={member.name}>
                  <LimeSurface interactive className="h-full p-5">
                    <div
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${member.accent} font-mono text-sm font-semibold text-[#f2f5ef] ring-1 ring-inset ring-white/10`}
                      aria-hidden="true"
                    >
                      {member.initials}
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-[#f2f5ef]">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#a6f04c]">{member.role}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#9aa79a]">{member.bio}</p>
                    <p className="mt-4 border-t border-[rgba(166,240,76,0.1)] pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b776b]">
                      {member.focus}
                    </p>
                  </LimeSurface>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-[rgba(166,240,76,0.14)] bg-[rgba(10,14,10,0.6)] p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#9aa79a]">Want to see the work instead of the team page?</p>
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
