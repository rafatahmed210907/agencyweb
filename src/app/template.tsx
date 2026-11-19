"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Page transition. Deliberately avoids animating `filter` or `transform` on a
 * wrapper that contains `position: sticky` children, since both create a
 * containing block and break sticky/fixed descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
