import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { LimeSurface } from "@/components/fx/lime-surface";
import { stackGroups } from "@/content/stack";

export function Stack() {
  return (
    <Section id="tooling" className="relative">
      <Container>
        <SectionHeading
          eyebrow="Tooling"
          title="Boring tools, used well."
          lede="We pick technology for longevity, not novelty. Everything below is in production on a real product."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <RevealItem key={group.title}>
              <LimeSurface edge="top" className="h-full p-5">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a6f04c]">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[rgba(166,240,76,0.12)] bg-black/30 px-2 py-1 font-mono text-[11px] text-[#9aa79a] transition-colors hover:border-[rgba(166,240,76,0.35)] hover:text-[#f2f5ef]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </LimeSurface>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
