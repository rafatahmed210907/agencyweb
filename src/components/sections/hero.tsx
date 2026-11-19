"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/magnetic";
import { SunlightCone, GridBackdrop } from "@/components/fx/atmosphere";
import { ProductMock } from "@/components/shared/product-mock";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROOF = ["Plan & establish", "Design & build", "Maintain & market"];

export function Hero() {
  return (
    <section
      id="discover"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 sm:px-6"
    >
      <SunlightCone />
      <GridBackdrop className="hero-grid opacity-100" fade={false} />

      <div className="relative z-[1] mx-auto w-full max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
          className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#f2f5ef] sm:text-6xl lg:text-[4.6rem]"
        >
          <span className="block">One studio for the</span>
          <span className="block text-[#a6f04c]">whole product lifecycle.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9aa79a] sm:text-lg"
        >
          We plan and establish the project, design and build it, keep it running, then take it to
          market — without handing you between three vendors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <Button asChild size="lg" variant="glow">
              <Link href="/contact">
                Start a project
                <span className="flex size-6 items-center justify-center rounded-full bg-[#08120a] text-[#a6f04c] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </Button>
          </Magnetic>
          <Button asChild size="lg" variant="outline">
            <Link href="/work">See our work</Link>
          </Button>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6b776b]"
        >
          {PROOF.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-[#a6f04c]">✓</span>
              {item}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="relative z-[1] mt-16 w-full max-w-5xl"
      >
        <ProductMock />
      </motion.div>
    </section>
  );
}
