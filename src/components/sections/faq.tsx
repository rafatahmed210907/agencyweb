import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/content/faq";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function Faq() {
  return (
    <Section id="faq" className="relative">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Answers before the call."
              lede="If something is missing, send it over — we answer every message ourselves."
            />
            <Button asChild variant="outline" className="mt-7">
              <Link href="/contact">
                Ask a question
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.08} direction="left">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2.5">
              {faqs.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
