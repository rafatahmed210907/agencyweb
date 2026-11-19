import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 hidden h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-70 sm:block"
      />

      <Container className="relative pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1.75fr] lg:gap-16">
          <div>
            <Brand markSize={30} textClassName="text-[17px]" />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
              A senior software studio building product interfaces and web platforms for teams that
              care about craft.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button asChild size="sm" variant="glow">
                <Link href="/contact">
                  Start a project
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {site.email}
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1.5">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
              <span className="text-[11.5px] text-emerald-600 dark:text-emerald-400">
                {site.availability}
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="ml-1 size-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[11.5px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 max-w-2xl text-[10.5px] leading-relaxed text-muted-foreground/60">
          {site.disclaimer}
        </p>
      </Container>

      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <span className="block translate-y-[0.16em] bg-gradient-to-b from-foreground/[0.11] to-transparent bg-clip-text text-center text-[clamp(3.75rem,17vw,12rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-transparent">
          Northlane
        </span>
      </div>
    </footer>
  );
}
