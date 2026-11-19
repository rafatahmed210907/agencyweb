"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel";
import { LimeSurface } from "@/components/fx/lime-surface";
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
              index === selectedIndex ? "w-6 bg-[#a6f04c]" : "w-3 bg-[rgba(166,240,76,0.2)]",
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
            <LimeSurface edge="left" className="flex h-full flex-col p-6">
              <Quote className="size-6 text-[rgba(166,240,76,0.5)]" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#dfe8df]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[rgba(166,240,76,0.1)] pt-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[rgba(166,240,76,0.25)] bg-[rgba(166,240,76,0.08)] font-mono text-[10px] text-[#a6f04c]">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-medium text-[#f2f5ef]">{item.name}</p>
                  <p className="mt-0.5 text-xs text-[#9aa79a]">
                    {item.role}, {item.company}
                  </p>
                </div>
              </figcaption>
            </LimeSurface>
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
