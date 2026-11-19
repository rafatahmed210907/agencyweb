"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Brand } from "@/components/shared/brand";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ScrollProgress } from "@/components/fx/scroll-progress";

const HOME_SECTIONS = ["services", "process", "pricing", "faq"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 12);
      // Hide the bar while scrolling down, reveal it on any upward movement.
      const delta = current - lastScroll.current;
      if (Math.abs(delta) > 6) {
        setHidden(current > 220 && delta > 0);
        lastScroll.current = current;
      }
    };

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
    if (item.sectionId) return isHome && activeSection === item.sectionId;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out sm:px-5 sm:pt-4",
        hidden && !open ? "-translate-y-[130%]" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 transition-[background,border-color,box-shadow] duration-300 sm:px-4",
          scrolled
            ? "border-border bg-background/80 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            : "border-transparent bg-background/25 backdrop-blur-sm",
        )}
      >
        <Link href="/" className="shrink-0 pl-1" aria-label="Northlane home">
          <Brand />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                isActive(item) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive(item) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-inset ring-primary/20"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Button asChild size="sm" variant="glow" className="hidden sm:inline-flex">
            <Link href="/contact">
              Start a project
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-9 lg:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b border-border px-5 py-4 pr-14">
                  <Brand />
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
                  <AnimatePresence initial={false}>
                    {[{ label: "Home", href: "/" }, ...navItems].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + index * 0.045, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-accent"
                        >
                          {item.label}
                          <ArrowUpRight className="size-4 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="space-y-3 border-t border-border p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                  <Button asChild variant="glow" className="w-full">
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Start a project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
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
