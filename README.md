# Northlane — Digital Studio Website

A dark, lime-accented marketing site for a fictional digital studio that plans, builds, maintains, and markets software products. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn-style primitives, and Motion.

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Highlights

- **Single dark theme** — near-black `#050706` canvas with a lime `#A6F04C` accent. No theme toggle, no light-mode debt.
- **Scroll-linked sunlight** — a cone of light falls from the top of the hero and fades as you scroll, driven by Motion's `useScroll`.
- **One surface primitive** — every card is built on `LimeSurface` (filament edge, pointer spotlight, hover lift), with five distinct section signatures layered on top.
- **Code-drawn artwork** — no photography. Case-study covers are deterministic CSS/SVG compositions, so there is nothing to download and nothing to mis-crop.
- **Typed content layer** — all copy, services, case studies, pricing, and FAQs live in `src/content/*`.
- **Working contact form** — zod validation, honeypot, in-memory rate limiting, and a one-file swap point for a real email provider.
- **Static by default** — every page prerendered except the contact API route.
- **Mobile-aware motion** — ambient animation and heavy blur are disabled below 768px; `prefers-reduced-motion` disables the rest.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with `@theme inline` CSS variables |
| Primitives | Radix UI (accordion, dialog, select, sheet, tooltip, label, separator) |
| Animation | Motion (`motion/react`), GSAP + ScrollTrigger for the process timeline |
| Carousel | Embla Carousel |
| Validation | Zod |
| Icons | Lucide React |
| Fonts | Sora (headings) + Figtree (body) via `next/font/google` |

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 20+ is required.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              fonts, providers, navbar, noise overlay, toaster
│  ├─ page.tsx                home (hero → trust → services → work → process → tooling → stats → testimonials → pricing → faq → cta)
│  ├─ template.tsx            opacity-only page transition
│  ├─ globals.css             design tokens, surface system, keyframes, utilities
│  ├─ about/page.tsx
│  ├─ work/page.tsx           filterable case-study index
│  ├─ work/[slug]/page.tsx    prerendered case study
│  ├─ contact/page.tsx
│  ├─ api/contact/route.ts    validation + transport
│  ├─ not-found.tsx
│  ├─ sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx
├─ components/
│  ├─ layout/                 navbar, footer, page-hero, container
│  ├─ sections/               one file per home section
│  ├─ shared/                 brand, section-heading, reveal, art-frame, product-mock
│  ├─ fx/                     lime-surface, atmosphere, spotlight, tilt, magnetic, marquee, count-up, scroll-progress
│  ├─ ui/                     button, card, badge, accordion, input, textarea, label, select, dialog, sheet, tooltip, sonner, carousel
│  └─ providers/              gsap provider
├─ content/                   site, pillars, work, process, stack, stats, testimonials, pricing, faq, studio, art
└─ lib/                       utils, motion, seo, contact/{schema,transport}
```

## Customising

**Brand** — `src/content/site.ts` (name, tagline, email, availability, socials, nav).
Name and tagline also appear in `src/app/layout.tsx` metadata and `opengraph-image.tsx`.

**Colour** — `src/app/globals.css`. The palette is a single `:root` block; change `--primary`, `--lime`, `--background`, and the surface rules follow. Most components also use explicit lime rgba values, so search for `166,240,76` to retint everything.

**Content** — edit the files in `src/content/`. Types are exported next to each dataset, so the compiler catches missing fields when you add a case study or pillar.

**Artwork** — `src/components/shared/art-frame.tsx` renders six patterns (`mesh`, `grid`, `rings`, `bars`, `arcs`, `cells`). Each case study picks a pattern and a variant in `src/content/work.ts`.

**Images** — the site currently ships zero photos. `next.config.ts` has no `images.remotePatterns`; if you add `next/image` later, register your host there.

## Contact form

`src/app/api/contact/route.ts` handles the request:

1. Parses JSON and applies a per-IP limit (5 requests/minute).
2. Validates with `contactSchema` in `src/lib/contact/schema.ts`.
3. Caches the honeypot check (`website` must be empty).
4. Calls `transport.send(payload)`.

`src/lib/contact/transport.ts` ships a logging transport that requires no environment variables. To deliver real email, replace that single object:

```ts
export const transport: ContactTransport = {
  async send(payload) {
    await resend.emails.send({
      from: "Northlane <hello@northlane.studio>",
      to: process.env.CONTACT_INBOX!,
      subject: `New enquiry from ${payload.name}`,
      text: payload.message,
    });
  },
};
```

Nothing else in the app changes. Responses are `{ ok: true, id }` or `{ ok: false, error, fieldErrors? }`.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it into Vercel; the framework preset is detected automatically.
3. No environment variables are needed for the current behaviour.
4. Set `site.url` in `src/content/site.ts` to your production domain so canonicals, sitemap, and OG URLs are correct.

The only server-rendered route is `/api/contact`; everything else is static.

## Accessibility and performance notes

- Single `h1` per page, semantic landmarks, skip link, visible focus rings.
- Radix primitives supply keyboard handling and focus traps for accordion, sheet, dialog, and select.
- Decorative layers are `aria-hidden` and `pointer-events-none`.
- The noise overlay is a tiled SVG data URI (rasterized once) instead of a live turbulence filter.
- No `filter: blur()` on large animated layers; the hero cone animates only `opacity` and `transform`.
- Ambient animation stops below 768px and under `prefers-reduced-motion`.

## Roadmap

- CMS-backed content (the `src/content` shape maps cleanly onto a schema)
- Case-study detail pages with richer media once real artwork exists
- Real email transport and inbox routing
- Optional client portal / project dashboard behind auth
- Light theme, if it ever becomes a requirement

## License

MIT. All copy, client names, testimonials, and metrics are fictional sample content written for this build.
