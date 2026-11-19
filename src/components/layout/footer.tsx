import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Brand } from "@/components/shared/brand";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(166,240,76,0.1)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(166,240,76,0.35)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="sunspot pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
      />

      <Container className="relative pb-12 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1.75fr] lg:gap-16">
          <div>
            <Brand markSize={30} textClassName="text-[17px]" />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-[#9aa79a]">
              A digital studio that plans, builds, maintains, and markets software products — one
              team across the whole lifecycle.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Link
                href="/contact"
                className="group inline-flex h-9 items-center gap-2 rounded-full bg-[#a6f04c] px-4 text-[13px] font-semibold text-[#08120a] transition-colors hover:bg-[#bbf873]"
              >
                Start a project
                <span className="flex size-5 items-center justify-center rounded-full bg-[#08120a] text-[#a6f04c] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-3" />
                </span>
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[rgba(166,240,76,0.16)] px-3.5 text-[13px] text-[#c3ccc3] transition-colors hover:border-[rgba(166,240,76,0.4)] hover:text-[#f2f5ef]"
              >
                {site.email}
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(166,240,76,0.16)] bg-black/40 px-3 py-1.5">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-[#39ff14]" />
              <span className="text-[11.5px] text-[#dfe8df]">{site.availabilityDetail}</span>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#6b776b]">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-[13.5px] text-[#9aa79a] transition-colors hover:text-[#f2f5ef]"
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

        <div className="mt-14 flex flex-col gap-5 border-t border-[rgba(166,240,76,0.1)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-[#6b776b]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[11.5px] text-[#9aa79a] transition-colors hover:text-[#f2f5ef]"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <span className="block translate-y-[0.16em] bg-gradient-to-b from-[rgba(166,240,76,0.14)] to-transparent bg-clip-text text-center text-[clamp(3.75rem,17vw,12rem)] font-semibold leading-[0.78] tracking-[-0.06em] text-transparent">
          Northlane
        </span>
      </div>
    </footer>
  );
}
