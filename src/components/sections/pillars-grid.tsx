"use client";

import { Compass, Layers, Megaphone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pillars, type Pillar } from "@/content/pillars";
import { LimeSurface } from "@/components/fx/lime-surface";

const ICONS: Record<Pillar["icon"], LucideIcon> = {
  compass: Compass,
  layers: Layers,
  megaphone: Megaphone,
};

function PillarCard({ pillar, wide = false }: { pillar: Pillar; wide?: boolean }) {
  const Icon = ICONS[pillar.icon];

  return (
    <LimeSurface
      interactive
      edge="top"
      className={cn("flex h-full flex-col p-6 sm:p-7", wide && "lg:p-8")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-[rgba(166,240,76,0.2)] bg-[rgba(166,240,76,0.08)] text-[#a6f04c]">
            <Icon className="size-[18px]" strokeWidth={1.7} />
          </span>
          <span className="font-mono text-xs text-[#7fbf3a]">{pillar.index}</span>
        </div>
      </div>

      <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#f2f5ef] sm:text-[19px]">
        {pillar.title}
      </h3>
      <p className="mt-1.5 text-[13px] font-medium text-[#a6f04c]">{pillar.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-[#9aa79a]">{pillar.summary}</p>

      <div className={cn("mt-6 grid gap-x-8 gap-y-4 border-t border-[rgba(166,240,76,0.1)] pt-5", wide && "sm:grid-cols-2")}>
        {pillar.subSteps.map((step, index) => (
          <div key={step.title} className="relative flex gap-3">
            <span className="relative flex flex-col items-center">
              <span className="mt-1 size-1.5 rounded-full bg-[#a6f04c]" />
              {index < pillar.subSteps.length - 1 ? (
                <span aria-hidden="true" className="mt-1 w-px flex-1 bg-[rgba(166,240,76,0.16)]" />
              ) : null}
            </span>
            <div className="-mt-0.5">
              <p className="text-[13px] font-medium text-[#dfe8df]">{step.title}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[#9aa79a]">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {pillar.outcomes.map((outcome) => (
          <li
            key={outcome}
            className="rounded-md border border-[rgba(166,240,76,0.12)] bg-black/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#9aa79a]"
          >
            {outcome}
          </li>
        ))}
      </ul>
    </LimeSurface>
  );
}

export function PillarsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <PillarCard pillar={pillars[0]!} />
      <PillarCard pillar={pillars[1]!} />
      <div className="lg:col-span-2">
        <PillarCard pillar={pillars[2]!} wide />
      </div>
    </div>
  );
}
