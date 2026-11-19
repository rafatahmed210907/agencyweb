import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell Northlane what you are building. Every enquiry gets a considered reply from the people who would do the work.",
  path: "/contact",
});

const DETAILS = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Location", value: site.location },
  { icon: Clock, label: "Response time", value: "Within two business days" },
  { icon: MessageSquare, label: "Availability", value: site.availability },
];

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Tell us what you are
              <br />
              <span className="text-gradient">trying to build.</span>
            </>
          }
          lede="A short, honest description beats a long brief. You will get a reply from the people who would actually do the work — not a sales team."
        />

        <Section className="pt-4">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
              <div className="space-y-8">
                <Reveal>
                  <div className="space-y-1">
                    {DETAILS.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex items-start justify-between gap-6 border-b border-[rgba(166,240,76,0.1)] py-4 last:border-b-0"
                      >
                        <span className="flex items-center gap-2.5 text-[13px] text-[#9aa79a]">
                          <detail.icon className="size-4 text-[#a6f04c]/70" />
                          {detail.label}
                        </span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="inline-flex items-center gap-1 text-right text-[13px] font-medium text-[#f2f5ef] transition-colors hover:text-[#a6f04c]"
                          >
                            {detail.value}
                            <ArrowUpRight className="size-3" />
                          </a>
                        ) : (
                          <span className="text-right text-[13px] text-[#f2f5ef]">{detail.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b776b]">
                      Before you write
                    </h2>
                    <Accordion type="single" collapsible className="mt-4 space-y-2">
                      {faqs.slice(0, 3).map((item, index) => (
                        <AccordionItem key={item.question} value={`mini-${index}`}>
                          <AccordionTrigger className="text-sm">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-[13px]">{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="rounded-2xl border border-[rgba(166,240,76,0.14)] bg-[rgba(10,14,10,0.6)] p-5">
                    <p className="text-[13px] leading-relaxed text-[#9aa79a]">
                      This build accepts submissions through a local API route and does not deliver
                      email yet. The form validates, stores nothing personal, and reports success
                      exactly as it would in production.
                    </p>
                    <Link
                      href="/about"
                      className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[#a6f04c] hover:underline"
                    >
                      More about the studio
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1} direction="left">
                <Suspense
                  fallback={
                    <div className="h-[34rem] animate-pulse rounded-2xl border border-[rgba(166,240,76,0.14)] bg-[rgba(10,14,10,0.6)]" />
                  }
                >
                  <ContactForm />
                </Suspense>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
