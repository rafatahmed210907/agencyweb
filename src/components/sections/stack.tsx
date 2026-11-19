import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { stackGroups } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Tooling"
          title="Boring tools, used well."
          lede="We pick technology for longevity, not novelty. Everything below is in production on a real product."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <RevealItem key={group.title}>
              <div className="h-full rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/25">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background/50 px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
