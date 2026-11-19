import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/shared/brand";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(60%_100%_at_50%_100%,var(--glow),transparent_70%)]"
      />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Brand markSize={32} textClassName="text-lg" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A senior software studio building product interfaces and web platforms for teams that
              care about craft.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {site.email}
              <ArrowUpRight className="size-3.5" />
            </a>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5">
              <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                {site.availability}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-muted-foreground/70">
          {site.disclaimer}
        </p>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-8 select-none overflow-hidden px-4 text-center"
      >
        <span className="block bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_14%,transparent),transparent)] bg-clip-text text-[clamp(3.5rem,15vw,11rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-transparent">
          Northlane
        </span>
      </div>
    </footer>
  );
}
