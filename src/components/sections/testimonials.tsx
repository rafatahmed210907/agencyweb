"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/testimonials";

function Controls() {
  const { scrollPrev, scrollNext, selectedIndex, count } = useCarousel();
  const total = count || testimonials.length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === selectedIndex ? "w-6 bg-primary" : "w-3 bg-border",
            )}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Testimonial {selectedIndex + 1} of {total}
      </span>
      <div className="flex gap-1.5">
        <Button variant="outline" size="icon" onClick={scrollPrev} aria-label="Previous testimonial">
          <ArrowLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={scrollNext} aria-label="Next testimonial">
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  return (
    <Carousel className="mt-12">
      <SectionHeading
        eyebrow="In their words"
        title="What working together is like."
        lede="A few notes from the people who signed off on the work."
        actions={<Controls />}
        className="mt-0"
      />

      <CarouselContent className="-ml-4 pt-8">
        {testimonials.map((item) => (
          <CarouselItem key={item.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card/45 p-6 transition-colors hover:border-primary/25">
              <Quote className="size-6 text-primary/50" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.role}, {item.company}
                </p>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="relative">
      <Container>
        <TestimonialCarousel />
      </Container>
    </Section>
  );
}
