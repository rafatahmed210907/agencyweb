"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { caseStudies, pillarLabels, type PillarKey } from "@/content/work";
import { Container } from "@/components/layout/container";
import { ArtFrame } from "@/components/shared/art-frame";
import { LimeSurface } from "@/components/fx/lime-surface";

const FILTERS: { label: string; value: "all" | PillarKey }[] = [
  { label: "All", value: "all" },
  { label: pillarLabels.planning, value: "planning" },
  { label: pillarLabels.build, value: "build" },
  { label: pillarLabels.marketing, value: "marketing" },
];

export function WorkGrid() {
  const [active, setActive] = useState<"all" | PillarKey>("all");

  const visible = useMemo(
    () => (active === "all" ? caseStudies : caseStudies.filter((study) => study.pillar === active)),
    [active],
  );

  return (
    <Container>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter case studies">
        {FILTERS.map((filter) => {
          const isActive = filter.value === active;
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                isActive
                  ? "border-[rgba(166,240,76,0.4)] text-[#f2f5ef]"
                  : "border-[rgba(166,240,76,0.12)] text-[#9aa79a] hover:border-[rgba(166,240,76,0.25)] hover:text-[#f2f5ef]",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 rounded-full bg-[rgba(166,240,76,0.1)]"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              <span className="relative">{filter.label}</span>
            </button>
          );
        })}
        <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b776b]">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study) => (
            <motion.article
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/work/${study.slug}`} className="group block h-full">
                <LimeSurface
                  edge="none"
                  padded={false}
                  className="flex h-full flex-col transition-colors group-hover:border-[rgba(166,240,76,0.3)]"
                >
                  <ArtFrame
                    pattern={study.cover.pattern}
                    label={study.cover.label}
                    variant={study.cover.variant}
                    className="rounded-none border-0 border-b border-[rgba(166,240,76,0.1)]"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a6f04c]">
                        {study.client}
                      </p>
                      <span className="font-mono text-[10px] text-[#6b776b]">{study.year}</span>
                    </div>
                    <h2 className="mt-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#f2f5ef]">
                      {study.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[#9aa79a]">
                      {study.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="rounded-md border border-[rgba(166,240,76,0.12)] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#9aa79a]">
                        {pillarLabels[study.pillar]}
                      </span>
                      <ArrowUpRight className="size-3.5 text-[#a6f04c] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </LimeSurface>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[rgba(166,240,76,0.18)] p-10 text-center">
          <p className="text-sm text-[#9aa79a]">Nothing in this pillar yet. Try another filter.</p>
        </div>
      ) : null}
    </Container>
  );
}
