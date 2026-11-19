"use client";

import { useState } from "react";
import {
  Activity,
  Boxes,
  CircleDot,
  Command,
  Layers,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { GridBackdrop } from "@/components/fx/atmosphere";

const NAV = [
  { icon: Activity, label: "Overview" },
  { icon: Boxes, label: "Projects" },
  { icon: Layers, label: "Components" },
  { icon: CircleDot, label: "Releases" },
  { icon: Settings2, label: "Settings" },
];

const BARS = [38, 52, 44, 68, 58, 82, 74, 92, 66, 88, 96, 78];

const ROWS = [
  { name: "atlas-console", status: "Live", latency: "42ms", live: true, value: 92 },
  { name: "kite-launch", status: "Live", latency: "68ms", live: true, value: 74 },
  { name: "meridian-platform", status: "Deploying", latency: "—", live: false, value: 41 },
  { name: "harbor-launch", status: "Live", latency: "51ms", live: true, value: 63 },
];

const CODE = [
  "export const studio = defineEngagement({",
  "  phases: ['plan', 'build', 'grow'],",
  "  realtime: { transport: 'websocket' },",
  "  budgets: { lcp: 1800, cls: 0.02 },",
  "});",
];

const RANGES = ["1h", "24h", "7d"];

/**
 * Code-built product stage: DOM + CSS only, no image assets. The panel is
 * interactive on hover/focus: sidebar items, time ranges and project rows all
 * respond, and the highlight set drives the chart and readout.
 */
export function ProductMock({ className }: { className?: string }) {
  const [nav, setNav] = useState("Overview");
  const [range, setRange] = useState("24h");
  const [row, setRow] = useState(ROWS[0]!.name);
  const [hovered, setHovered] = useState(false);

  const activeRow = ROWS.find((item) => item.name === row) ?? ROWS[0]!;
  const barScale = range === "1h" ? 0.6 : range === "7d" ? 1.25 : 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group/stage relative isolate overflow-hidden rounded-2xl border bg-[#0a0e0a] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.95)] transition-[border-color,box-shadow] duration-500",
        hovered
          ? "border-[rgba(166,240,76,0.32)] shadow-[0_40px_110px_-45px_rgba(166,240,76,0.4)]"
          : "border-[rgba(166,240,76,0.16)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-[rgba(166,240,76,0.1)] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/10 transition-colors group-hover/stage:bg-[rgba(166,240,76,0.35)]" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-md border border-[rgba(166,240,76,0.1)] bg-black/40 px-2.5 py-1">
          <Search className="size-3 text-[#6b776b]" />
          <span className="truncate font-mono text-[10px] text-[#6b776b]">
            app.northlane.studio/{nav.toLowerCase()}
          </span>
        </div>
        <div className="hidden items-center gap-1.5 rounded-md border border-[rgba(166,240,76,0.1)] px-2 py-1 sm:flex">
          <Command className="size-2.5 text-[#6b776b]" />
          <span className="font-mono text-[9px] text-[#6b776b]">K</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr]">
        <aside className="hidden flex-col gap-1 border-r border-[rgba(166,240,76,0.1)] p-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-[rgba(166,240,76,0.1)] bg-black/30 px-2 py-1.5">
            <span className="grid size-5 place-items-center rounded bg-[rgba(166,240,76,0.2)] font-mono text-[9px] text-[#a6f04c]">
              NL
            </span>
            <span className="text-[10px] font-medium text-[#dfe8df]">northlane</span>
          </div>
          {NAV.map((item) => {
            const active = item.label === nav;
            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setNav(item.label)}
                onFocus={() => setNav(item.label)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[10.5px] transition-colors",
                  active
                    ? "bg-[rgba(166,240,76,0.1)] text-[#a6f04c] ring-1 ring-inset ring-[rgba(166,240,76,0.2)]"
                    : "text-[#6b776b] hover:bg-white/[0.04] hover:text-[#dfe8df]",
                )}
              >
                <item.icon className="size-3" />
                {item.label}
              </button>
            );
          })}
          <div className="mt-auto rounded-lg border border-[rgba(166,240,76,0.1)] bg-black/30 p-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-[#a6f04c]" />
              <span className="text-[9px] font-medium text-[#dfe8df]">Build slots</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[#a6f04c]"
                initial={{ width: "18%" }}
                animate={{ width: hovered ? "78%" : "64%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-1 font-mono text-[8.5px] text-[#6b776b]">
              {hovered ? "3 of 3 booked" : "2 of 3 booked"}
            </p>
          </div>
        </aside>

        <div className="relative min-w-0 p-3 sm:p-4">
          <GridBackdrop size={26} fade={false} className="opacity-50" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#6b776b]">{nav}</p>
              <p className="mt-0.5 text-sm font-semibold tracking-tight text-[#f2f5ef]">
                Delivery pipeline
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(166,240,76,0.2)] bg-[rgba(166,240,76,0.08)] px-2 py-0.5">
              <span className="size-1 animate-pulse-dot rounded-full bg-[#39ff14]" />
              <span className="text-[9px] text-[#a6f04c]">Realtime</span>
            </span>
          </div>

          <div className="relative mt-3 rounded-xl border border-[rgba(166,240,76,0.1)] bg-black/40 p-3 transition-colors group-hover/stage:border-[rgba(166,240,76,0.22)]">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6b776b]">
                  Deploys / {range}
                </p>
                <p className="mt-0.5 text-lg font-semibold tabular text-[#f2f5ef]">
                  {Math.round(48291 * (range === "1h" ? 0.04 : range === "7d" ? 7 : 1)).toLocaleString()}
                  <span className="ml-1.5 text-[10px] font-normal text-[#a6f04c]">
                    {activeRow.name}
                  </span>
                </p>
              </div>
              <div className="flex gap-1">
                {RANGES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRange(item)}
                    aria-pressed={range === item}
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[8.5px] transition-colors",
                      range === item
                        ? "bg-[rgba(166,240,76,0.12)] text-[#a6f04c]"
                        : "text-[#6b776b] hover:text-[#dfe8df]",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex h-20 items-end gap-1">
              {BARS.map((height, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex-1 rounded-sm transition-colors",
                    index > 8 ? "bg-[#a6f04c]/80" : "bg-[#a6f04c]/25",
                    hovered && "hover:bg-[#a6f04c]",
                  )}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min(height * barScale, 100)}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-3 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-xl border border-[rgba(166,240,76,0.1)] bg-black/40 p-2">
              <div className="flex items-center justify-between px-1 pb-1.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6b776b]">
                  Projects
                </p>
                <p className="font-mono text-[8.5px] text-[#6b776b]">4</p>
              </div>
              <div className="space-y-1">
                {ROWS.map((item, index) => {
                  const selected = item.name === row;
                  return (
                    <motion.button
                      key={item.name}
                      type="button"
                      onMouseEnter={() => setRow(item.name)}
                      onFocus={() => setRow(item.name)}
                      aria-pressed={selected}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.09, duration: 0.4 }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-1.5 py-1 text-left transition-colors",
                        selected ? "bg-[rgba(166,240,76,0.08)]" : "hover:bg-white/[0.04]",
                      )}
                    >
                      <span
                        className={cn(
                          "truncate font-mono text-[9.5px]",
                          selected ? "text-[#f2f5ef]" : "text-[#c3ccc3]",
                        )}
                      >
                        {item.name}
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[8px]",
                            item.live
                              ? "bg-[rgba(166,240,76,0.12)] text-[#a6f04c]"
                              : "bg-[rgba(245,181,61,0.14)] text-[#f5b53d]",
                          )}
                        >
                          {item.status}
                        </span>
                        <span className="w-8 text-right font-mono text-[8.5px] text-[#6b776b]">
                          {item.latency}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="hidden rounded-xl border border-[rgba(166,240,76,0.1)] bg-black/40 p-2.5 lg:block">
              <p className="px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#6b776b]">
                engagement.ts
              </p>
              <div className="mt-1.5 space-y-0.5 font-mono text-[9px] leading-relaxed">
                {CODE.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className={cn(
                      "whitespace-pre transition-colors",
                      line.includes(activeRow.name.split("-")[0]!) ? "text-[#a6f04c]" : "text-[#c3ccc3]",
                    )}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050706]/70 to-transparent"
      />
    </div>
  );
}
