"use client";

import { motion } from "motion/react";
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
import { cn } from "@/lib/utils";
import { GridBackdrop } from "@/components/fx/atmosphere";

const NAV = [
  { icon: Activity, label: "Overview", active: true },
  { icon: Boxes, label: "Projects" },
  { icon: Layers, label: "Components" },
  { icon: CircleDot, label: "Releases" },
  { icon: Settings2, label: "Settings" },
];

const BARS = [38, 52, 44, 68, 58, 82, 74, 92, 66, 88, 96, 78];

const ROWS = [
  { name: "atlas-console", status: "Live", latency: "42ms", tone: "emerald" },
  { name: "kite-billing", status: "Live", latency: "68ms", tone: "emerald" },
  { name: "meridian-sync", status: "Deploying", latency: "—", tone: "amber" },
  { name: "signal-onboarding", status: "Live", latency: "51ms", tone: "emerald" },
];

const CODE = [
  { text: "export const config = defineWorkspace({", tone: "muted" },
  { text: "  regions: ['iad1', 'fra1', 'sin1'],", tone: "text" },
  { text: "  realtime: { transport: 'websocket' },", tone: "text" },
  { text: "  budget: { lcp: 1800, cls: 0.02 },", tone: "text" },
  { text: "});", tone: "muted" },
];

/**
 * Code-built product stage: no screenshots, no image assets. Everything is
 * DOM + CSS so it stays crisp, themes with the site, and costs no network.
 */
export function ProductMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border bg-card/80 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-md border border-border bg-background/50 px-2.5 py-1">
          <Search className="size-3 text-muted-foreground" />
          <span className="truncate font-mono text-[10px] text-muted-foreground">
            app.northlane.studio/overview
          </span>
        </div>
        <div className="hidden items-center gap-1.5 rounded-md border border-border px-2 py-1 sm:flex">
          <Command className="size-2.5 text-muted-foreground" />
          <span className="font-mono text-[9px] text-muted-foreground">K</span>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[150px_1fr]">
        {/* sidebar */}
        <aside className="hidden flex-col gap-1 border-r border-border p-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2 py-1.5">
            <span className="grid size-5 place-items-center rounded bg-primary/20 font-mono text-[9px] text-primary">
              NL
            </span>
            <span className="text-[10px] font-medium text-foreground/80">northlane</span>
          </div>
          {NAV.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[10.5px]",
                item.active
                  ? "bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="size-3" />
              {item.label}
            </div>
          ))}
          <div className="mt-auto rounded-lg border border-border bg-background/40 p-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-primary" />
              <span className="text-[9px] font-medium text-foreground/80">Build slots</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: "18%" }}
                animate={{ width: "64%" }}
                transition={{ duration: 2.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-1 font-mono text-[8.5px] text-muted-foreground">2 of 3 booked</p>
          </div>
        </aside>

        {/* main */}
        <div className="relative min-w-0 p-3 sm:p-4">
          <GridBackdrop size={26} fade={false} className="opacity-40" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Overview</p>
              <p className="mt-0.5 text-sm font-semibold tracking-tight text-foreground">
                Studio performance
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5">
              <span className="size-1 animate-pulse-dot rounded-full bg-emerald-500" />
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400">Realtime</span>
            </span>
          </div>

          {/* chart card */}
          <div className="relative mt-3 rounded-xl border border-border bg-background/55 p-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Requests / min
                </p>
                <p className="mt-0.5 text-lg font-semibold tabular text-foreground">
                  48,291
                  <span className="ml-1.5 text-[10px] font-normal text-emerald-500">+12.4%</span>
                </p>
              </div>
              <div className="flex gap-1">
                {["1h", "24h", "7d"].map((range, index) => (
                  <span
                    key={range}
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[8.5px]",
                      index === 1
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex h-20 items-end gap-1">
              {BARS.map((height, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "flex-1 rounded-sm",
                    index > 8 ? "bg-primary/80" : "bg-primary/30",
                  )}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </div>
          </div>

          {/* rows + code */}
          <div className="relative mt-3 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-xl border border-border bg-background/55 p-2">
              <div className="flex items-center justify-between px-1 pb-1.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Workspaces
                </p>
                <p className="font-mono text-[8.5px] text-muted-foreground">4</p>
              </div>
              <div className="space-y-1">
                {ROWS.map((row, index) => (
                  <motion.div
                    key={row.name}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.09, duration: 0.4 }}
                    className="flex items-center justify-between rounded-md px-1.5 py-1 hover:bg-foreground/[0.04]"
                  >
                    <span className="truncate font-mono text-[9.5px] text-foreground/80">
                      {row.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[8px]",
                          row.tone === "emerald"
                            ? "bg-emerald-500/12 text-emerald-500"
                            : "bg-amber-500/12 text-amber-500",
                        )}
                      >
                        {row.status}
                      </span>
                      <span className="w-8 text-right font-mono text-[8.5px] text-muted-foreground">
                        {row.latency}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden rounded-xl border border-border bg-background/55 p-2.5 lg:block">
              <p className="px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                workspace.config.ts
              </p>
              <div className="mt-1.5 space-y-0.5 font-mono text-[9px] leading-relaxed">
                {CODE.map((line, index) => (
                  <motion.p
                    key={line.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className={cn(
                      "whitespace-pre",
                      line.tone === "muted" ? "text-muted-foreground" : "text-foreground/75",
                    )}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent"
      />
    </div>
  );
}
