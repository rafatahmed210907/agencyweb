import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { PillarsGrid } from "@/components/sections/pillars-grid";

export function Services() {
  return (
    <Section id="services" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(166,240,76,0.08),transparent_70%)]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Plan it. Build it.
              <br className="hidden sm:block" /> Grow it.
            </>
          }
          lede="Three pillars, one team. Most studios hand you off between planning, build, and marketing. We carry the whole lifecycle, so context is never lost in a transition."
        />

        <Reveal className="mt-12">
          <PillarsGrid />
        </Reveal>
      </Container>
    </Section>
  );
}
