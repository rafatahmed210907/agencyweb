import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/container";
import { WorkGrid } from "@/components/sections/work-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Northlane: realtime telemetry consoles, usage-based billing, offline-first capture, and design systems.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="Selected work"
          title={
            <>
              Six engagements,
              <br />
              <span className="text-gradient">documented honestly.</span>
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
