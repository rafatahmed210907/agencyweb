import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/container";
import { WorkGrid } from "@/components/sections/work-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Northlane across the full lifecycle: planning and establishment, design and build, and marketing.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Selected work"
          title={
            <>
              Six engagements,
              <br />
              <span className="text-[#a6f04c]">documented honestly.</span>
            </>
          }
          lede="Each case study covers the constraint we started with, the decisions we made, and what actually changed after launch."
        />

        <Section className="pt-2">
          <WorkGrid />
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
