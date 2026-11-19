"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/magnetic";
import { Aurora, GridBackdrop } from "@/components/fx/atmosphere";
import { ProductMock } from "@/components/shared/product-mock";
import { site } from "@/content/site";
import { stats } from "@/content/stats";
import { CountUp } from "@/components/fx/count-up";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
      <Aurora />
      <GridBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur-md">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">{site.availability}</span>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              {site.availabilityDetail}
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-4xl text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
        >
          <span className="block">Software studio for</span>
          <span className="text-gradient block">ambitious products.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base"
        >
          We design and build product interfaces, web platforms, and design systems — small senior
          team, production code from the first week.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Magnetic>
            <Button asChild size="lg" variant="glow">
              <Link href="/contact">
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="outline">
            <Link href="/work">
              View our work
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-lg font-semibold tabular text-foreground">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </dd>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 lg:mt-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 -top-8 hidden h-40 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] sm:block"
          />
          <ProductMock className="relative" />

          <div className="pointer-events-none absolute -right-2 -top-6 hidden lg:block">
            <div className="animate-float rounded-xl border border-border bg-card/85 px-3 py-2 shadow-xl backdrop-blur-md">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Lighthouse
              </p>
              <p className="mt-0.5 text-sm font-semibold tabular text-foreground">
                100<span className="text-[10px] font-normal text-muted-foreground"> / 100 / 100</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
