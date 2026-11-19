"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

const CarouselContext = React.createContext<{
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  count: number;
} | null>(null);

export function Carousel({
  children,
  className,
  options,
}: {
  children: React.ReactNode;
  className?: string;
  options?: Parameters<typeof useEmblaCarousel>[0];
}) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", ...options });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const sync = () => {
      setCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    };

    const frame = requestAnimationFrame(sync);
    api.on("select", sync);
    api.on("reInit", sync);

    return () => {
      cancelAnimationFrame(frame);
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <CarouselContext.Provider value={{ api, scrollPrev, scrollNext, selectedIndex, count }}>
      <div className={cn("relative", className)}>
        <div ref={viewportRef} className="overflow-hidden">
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex", className)}>{children}</div>;
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}>{children}</div>;
}

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used inside <Carousel>");
  return context;
}
