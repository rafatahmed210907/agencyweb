"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/content/work";
import { media } from "@/content/media";
import { MediaFrame } from "@/components/shared/media-frame";
import { Container } from "@/components/layout/container";

export function WorkGrid() {
  const filters = useMemo(() => {
    const unique = new Set<string>();
    caseStudies.forEach((study) => study.services.forEach((service) => unique.add(service)));
    return ["All", ...Array.from(unique)];
  }, []);

  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? caseStudies : caseStudies.filter((study) => study.services.includes(active))),
    [active],
  );

  return (
    <Container>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter case studies">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                isActive
                  ? "border-primary/40 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/25 hover:text-foreground",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-primary/12"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              <span className="relative">{filter}</span>
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study) => {
            const cover = media[study.cover];
            return (
              <motion.article
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/45 transition-colors hover:border-primary/30"
                >
                  <MediaFrame
                    src={cover.src}
                    alt={cover.alt}
                    label={study.client}
                    aspect="aspect-[16/11]"
                    className="rounded-none border-0 border-b border-border"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                        {study.client}
                      </p>
                      <span className="font-mono text-[10px] text-muted-foreground">{study.year}</span>
                    </div>
                    <h2 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight">
                      {study.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {study.services.slice(0, 2).map((service) => (
                        <span
                          key={service}
                          className="rounded-md border border-border bg-background/40 px-2 py-0.5 text-[10.5px] text-muted-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
                      Read the case study
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nothing tagged “{active}” yet. Pick another filter or view all projects.
          </p>
        </div>
      ) : null}
    </Container>
  );
}
