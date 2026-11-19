"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Brand } from "@/components/shared/brand";
import { ScrollProgress } from "@/components/fx/scroll-progress";

const HOME_SECTIONS = ["discover", "services", "process", "pricing", "faq"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const elements = HOME_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.sectionId === "discover") {
      return isHome && (activeSection === null || activeSection === "discover");
    }
    if (item.sectionId) return isHome && activeSection === item.sectionId;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-2xl border px-3 py-2 transition-[background,border-color,box-shadow] duration-300 sm:px-4",
          scrolled
            ? "border-[rgba(166,240,76,0.16)] bg-[#050706]/90 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-[rgba(166,240,76,0.1)] bg-[#050706]/45 backdrop-blur-md",
        )}
      >
        <Link href="/" className="shrink-0 pl-1" aria-label="Northlane home">
          <Brand />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3",
                isActive(item) ? "text-[#f2f5ef]" : "text-[#9aa79a] hover:text-[#f2f5ef]",
              )}
            >
              {isActive(item) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-[rgba(166,240,76,0.08)] ring-1 ring-inset ring-[rgba(166,240,76,0.2)]"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-[#a6f04c] px-4 py-2 text-[13px] font-semibold text-[#08120a] shadow-[0_10px_30px_-14px_rgba(166,240,76,0.7)] transition-colors hover:bg-[#bbf873] sm:inline-flex"
          >
            Start a project
            <span className="flex size-5 items-center justify-center rounded-full bg-[#08120a] text-[#a6f04c] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-3" />
            </span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 border-[rgba(166,240,76,0.14)] bg-white/[0.03] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-r-[rgba(166,240,76,0.1)] bg-[#080b08] p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b border-[rgba(166,240,76,0.08)] px-5 py-4 pr-14">
                  <Brand />
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
                  <AnimatePresence initial={false}>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                            isActive(item)
                              ? "bg-[rgba(166,240,76,0.08)] text-[#f2f5ef]"
                              : "text-[#9aa79a] hover:bg-white/[0.04] hover:text-[#f2f5ef]",
                          )}
                        >
                          {item.label}
                          <ArrowUpRight className="size-4 text-[#6b776b]" />
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="border-t border-[rgba(166,240,76,0.08)] p-5">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a6f04c] px-5 py-3 text-sm font-semibold text-[#08120a]"
                  >
                    Start a project
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <ScrollProgress />
      </nav>
    </header>
  );
}
