# Northlane — Software Studio Website (Frontend Build Plan)

## Goal

Build a production-quality, fully static, Vercel-ready marketing site for a fictional software studio, **Northlane**, in `D:\work\agencyweb`. Dark-first (violet/indigo) with a working light theme, heavy but tasteful motion, code-owned UI-kit effect components, and a typed content layer so it can become dynamic (CMS/backend/auth) later without rewriting sections.

The result must be clearly more polished than the Project CPP reference site in `C:\Users\Admin\Downloads\cpp\cpp-frontend` while borrowing its good parts (floating pill navbar, spotlight + grid atmosphere, glow cards, glass panels, scroll reveals).

## Locked decisions

| Topic | Decision |
| --- | --- |
| Site type | Software agency / studio (not the FiveM storefront) |
| Pages | Home, About, Work index, Work case study (`/work/[slug]`), Contact, 404 |
| Brand | **Northlane** — "Software studio for ambitious products." |
| Content | Fictional but credible, all in `src/content/*`, no fake client logos or awards |
| Visual | Dark-first near-black + violet/indigo + cyan accent; light theme toggle |
| Foundation | Next.js 16 (App Router, `src/`), TypeScript strict, Tailwind CSS v4 |
| UI base | shadcn/ui (Radix + CVA) in `components/ui/*`, vendored effects in `components/fx/*` |
| Animation | `motion` for interaction/layout; `gsap` + ScrollTrigger for scroll-scrubbed timelines; CSS keyframes for ambient loops |
| Fonts | Geist + Geist Mono via `next/font/google` |
| Media | Hotlinked Unsplash photos via `images.remotePatterns`, wrapped in a fallback-safe `MediaFrame` |
| Contact | Preview-only: `POST /api/contact` with zod validation + swappable transport, no external provider |
| Auth | **None.** No login/dashboard routes |
| 3D | None. CSS/SVG only |
| Package manager | npm |
| Deploy | Not now. Must build cleanly for Vercel |
| Finish | Run `npm run dev` and report the live URL |

## Out of scope

Login/signup, dashboard, database, real email delivery, CMS, analytics keys, blog, i18n, WebGL, payment checkout, real client assets. Also no fabricated real-person team photos/names — team entries are clearly fictional.

---

## Target structure

```
agencyweb/
├─ components.json                 shadcn config (new-york, cssVariables, rsc)
├─ next.config.ts                  images.remotePatterns, headers, poweredByHeader:false
├─ postcss.config.mjs              @tailwindcss/postcss
├─ eslint.config.mjs
├─ tsconfig.json                   strict, "@/*" -> "./src/*"
├─ README.md
├─ public/
│  ├─ brand/{mark.svg,logo.svg,og.svg}
│  └─ patterns/noise.svg
└─ src/
   ├─ app/
   │  ├─ layout.tsx                fonts, ThemeProvider, TooltipProvider, Toaster, skip-link
   │  ├─ template.tsx              page-transition fade/blur
   │  ├─ globals.css               tokens, dark variant, scrollbar, utilities, keyframes
   │  ├─ page.tsx                  Home
   │  ├─ about/page.tsx
   │  ├─ work/page.tsx
   │  ├─ work/[slug]/page.tsx      generateStaticParams + generateMetadata
   │  ├─ contact/page.tsx
   │  ├─ api/contact/route.ts
   │  ├─ not-found.tsx
   │  ├─ sitemap.ts
   │  ├─ robots.ts
   │  └─ opengraph-image.tsx
   ├─ components/
   │  ├─ ui/          shadcn primitives (see list)
   │  ├─ fx/          owned effect components (see list)
   │  ├─ layout/      navbar, mobile-nav, footer, theme-toggle, section, page-hero
   │  ├─ sections/    home/about/work/contact sections
   │  ├─ shared/      brand, reveal, media-frame, section-heading, eyebrow, stat
   │  └─ providers/   theme-provider, smooth-scroll-provider (ScrollTrigger sync)
   ├─ content/        site, services, work, process, stack, stats, testimonials, pricing, faq, media
   └─ lib/            utils, motion, seo, contact/{schema,transport}, hooks
```

---

## Design system (must be implemented first)

### Tokens — `src/app/globals.css`

Use Tailwind v4 `@import "tailwindcss";`, `@custom-variant dark (&:is(.dark *));`, `@theme inline` mapping, and `oklch()` variables in `:root` (light) + `.dark`.

Required semantic vars (shadcn-compatible): `--background --foreground --card --card-foreground --popover* --primary --primary-foreground --secondary* --muted* --accent* --destructive* --border --input --ring`.

Add studio-specific vars: `--surface`, `--surface-2`, `--elevated`, `--violet`, `--violet-soft`, `--indigo`, `--cyan`, `--glow`, `--grid-line`, `--noise-opacity`.

Dark palette anchor: background ≈ `oklch(0.15 0.02 285)`, card ≈ `oklch(0.19 0.03 285)`, primary violet ≈ `oklch(0.64 0.21 288)`, cyan accent ≈ `oklch(0.78 0.13 205)`. Light palette: lavender-tinted near-white background, same primary chroma reduced. Verify WCAG AA on body text, muted text, and button labels in both themes.

Also define: `--radius` scale, `--ease-out-expo`, `--ease-spring`, durations `--dur-fast/default/slow`, and a `--font-sans/--font-mono` mapping from `next/font` variables.

### Global CSS requirements

- Themed scrollbars: `::-webkit-scrollbar` (8px, transparent track, violet-tinted rounded thumb, brighter on hover) + `scrollbar-color` / `scrollbar-width` for Firefox, different values per theme.
- `html { scroll-behavior: smooth }` with a `prefers-reduced-motion` override to `auto`.
- Utilities: `.text-gradient`, `.grid-bg`, `.noise-overlay`, `.glass-panel`, `.glow-ring`, `.mask-fade-x`, `.mask-fade-b`, `.balance` (text-wrap balance on headings).
- Global focus-visible ring using `--ring`, skip-link styles.
- Keyframes: `aurora-drift`, `float-slow`, `marquee`, `shimmer`, `pulse-dot`, `grid-fade`.
- One reduced-motion block that neutralizes animations/transitions and disables custom cursor/parallax.

### Typography scale

Geist for UI/body; Geist Mono for eyebrows, metrics, tags, and code chips. Hero H1 `clamp(2.6rem, 6vw, 5.2rem)` with tight tracking and `text-wrap: balance`. Section H2 `clamp(2rem, 3.6vw, 3.1rem)`. Body 15–17px, muted color, max 68ch. Establish an `Eyebrow` component (mono, uppercase, tracked, violet, with a leading dot/line).

---

## Component inventory

### `components/ui/*` (shadcn, themed)

button, card, accordion, input, textarea, label, badge, dialog, sheet, tabs, tooltip, separator, select, sonner (toast), carousel (embla). Do not vendor anything we don't use.

Extend `button` with variants: `default` (violet gradient), `secondary`, `outline`, `ghost`, `link`, `glow` (gradient + halo + hover lift), sizes `sm|default|lg|icon`.

### `components/fx/*` (owned, no external kit dependency)

| File | Behavior |
| --- | --- |
| `aurora.tsx` | 3–4 blurred animated radial/conic blobs, absolute, masked; prop-tunable intensity |
| `grid-background.tsx` | CSS grid lines + radial mask, optional perspective fade; no JS |
| `spotlight.tsx` | Pointer-follow radial highlight on a wrapper via CSS vars; disabled on touch/reduced |
| `border-beam.tsx` | Animated conic-gradient border via masked pseudo-element |
| `marquee.tsx` | Duplicated track, direction/speed/pause-on-hover props, edge masks, `aria-hidden` duplicate |
| `tilt-card.tsx` | 3D pointer tilt with `rotateX/rotateY` springs, resets on leave |
| `magnetic.tsx` | Wraps CTAs; translates toward pointer within bounds, spring return |
| `text-reveal.tsx` | Word-by-word blur/fade stagger on view; renders plain text under reduced motion |
| `count-up.tsx` | rAF counter triggered by IntersectionObserver, respects reduced motion |
| `scroll-progress.tsx` | Fixed 2px top progress driven by GSAP ScrollTrigger |
| `noise.tsx` | Fixed SVG feTurbulence overlay, low opacity, `pointer-events-none` |
| `shimmer-button.tsx` | Wraps Button with passing light sweep |
| `glow-card.tsx` | Card shell with spotlight + hairline gradient top edge + hover lift |
| `cursor-glow.tsx` | Pointer-follow soft violet blob; only when `pointer: fine` and motion allowed |
| `beam-connector.tsx` | SVG path that draws in as the process timeline scrolls |

### `components/shared/*`

`Brand` (SVG mark + wordmark lockup, light/dark safe, links home), `Reveal` (Motion `whileInView`, direction/delay/blur props, reduced-motion fallback), `SectionHeading` (eyebrow + H2 + lede + optional actions), `MediaFrame` (next/image with fixed aspect ratio, gradient fallback if `src` missing or fails, optional overlay + caption), `Stat`.

---

## Content model — `src/content/*`

All copy is typed and exported as `const` objects with `satisfies`. No strings hardcoded in sections.

- `site.ts` — name, tagline, description, url, nav items, socials, email, availability, footer copy, fictional-content disclaimer string.
- `services.ts` — 6 services: `{ slug, title, summary, bullets[3], icon (lucide name), accent }`.
- `work.ts` — 6 case studies: `{ slug, title, client, year, summary, services[], stack[], cover{src,alt,blur?}, metrics[{label,value}], challenge, approach[], highlights[], gallery[], testimonial? }`. Used by Home featured grid, Work index, and `/work/[slug]`.
- `process.ts` — 4 steps `{ index, title, description, deliverables[] }`.
- `stack.ts` — grouped capabilities (Frontend / Backend / Infra / Design).
- `stats.ts` — 4 metrics `{ value, suffix, label }`.
- `testimonials.ts` — 4 fictional quotes `{ quote, name, role, company }` + `isFictional: true`.
- `pricing.ts` — 3 engagement tiers `{ name, price, cadence, summary, features[], cta, highlighted }`.
- `faq.ts` — 6 Q/A items (also reused on Contact).
- `media.ts` — single map of all image URLs + alt text + credits, so swapping to local or CMS assets touches one file.

Type the whole content layer with explicit interfaces in the same files and derive page props from it. Pages must import only from `@/content`.

---

## Page specifications

### Global shell

- **Navbar**: floating pill, max-w-6xl, sticky top with `pt-3`; on scroll adds blur + stronger border + shadow. Left: brand. Center: Work / Services / Process / Pricing / About. Right: theme toggle (icon button) + `Start a project` glow CTA. Active-section highlighting via `IntersectionObserver` on the Home anchors. Client component.
- **Mobile nav**: shadcn `Sheet` from the left, large tap targets, brand header, links, CTA, closes on route change; lock body scroll while open.
- **Theme toggle**: `next-themes`, `attribute="class"`, `defaultTheme="dark"`, `enableSystem` off (dark default, user choice persisted), animated sun/moon crossfade via Motion. `suppressHydrationWarning` on `<html>`.
- **Footer**: oversized Northlane wordmark with gradient mask, 4 link columns, socials, availability pill, newsletter-style email capture that opens `mailto:` (not a fake API), back-to-top button, fine print + "Case studies and testimonials are fictional sample content." disclaimer.
- **Page transition**: `app/template.tsx` with Motion opacity+blur+small y; instant under reduced motion.

### Home (`src/app/page.tsx`)

1. **Hero** — aurora + grid + noise + spotlight; availability pill; H1 with gradient accent phrase; lede; `Start a project` (glow, magnetic) + `View our work` (outline); 3 inline trust stats; product mock stage: code-built browser/editor frame containing a mock dashboard (sidebar, chart bars, code pane, violet glow halo, floating micro-cards), subtle float + scroll parallax via GSAP; scroll-cue line.
2. **Logo cloud** — "Trusted by product teams" + infinite marquee of 8 code-drawn fictional wordmarks (SVG text), edge masks, pause on hover.
3. **Services** — bento grid (2 large + 4 standard), each `GlowCard` with spotlight, lucide icon chip, title, summary, 3 bullets, hover `ArrowUpRight`.
4. **Featured work** — 3 case studies, tall `MediaFrame` covers with `TiltCard`, meta row (year · services), metric chips, link to `/work/[slug]`; "All case studies" secondary link.
5. **Process** — GSAP ScrollTrigger pinned timeline: vertical/horizontal rail with `beam-connector` drawing progress, 4 steps revealing sequentially, sticky step index. Must degrade to a simple stacked list under reduced motion or `< lg`.
6. **Stack** — grouped chip clusters with hover glow, mono labels; optional slow marquee row of technologies.
7. **Stats** — 4 `count-up` metrics in a hairline-divided rack.
8. **Testimonials** — shadcn `Carousel` (embla) with 4 quote cards, drag + arrows + dots, keyboard accessible.
9. **Pricing / engagements** — 3 tiers, middle highlighted with `border-beam` and gradient wash, feature lists, CTA scrolls to Contact with `?plan=`.
10. **FAQ** — shadcn `Accordion`, single-open, animated height, plus link to full contact page.
11. **Final CTA** — wide glass panel with aurora, headline, dual CTA, availability note.

### About (`/about`)

Page hero (eyebrow, H1, lede), studio story (two-column with sticky side label), values grid (4), timeline of studio milestones (scroll-reveal), capabilities summary linking to Services, fictional team grid (4 members, initial-based avatars, roles, short bios, `isFictional`), CTA band.

### Work (`/work`)

Page hero + count, client-side filter chips by service (All + each service) using `useState` + Motion layout transitions, responsive grid of all 6 case studies, empty-state guard, CTA band.

### Work detail (`/work/[slug]`)

- `generateStaticParams` from `content/work.ts`; `dynamicParams = false`; `notFound()` for unknown slugs.
- `generateMetadata` with title/description/openGraph, per-case-study canonical.
- Layout: breadcrumb → title + summary → meta table (client, year, services, stack) → cover `MediaFrame` → Challenge → Approach (numbered blocks) → Highlights → Metrics rack (`count-up`) → optional testimonial → gallery grid (2-col) → `Next project` card → CTA band.

### Contact (`/contact`)

Two-column: left = heading, availability status pill, email link, response-time note, socials, 3-item mini FAQ (`Accordion`); right = form card.

Form fields: name, email, company (optional), budget (`Select`), project details (`Textarea`), consent checkbox, hidden honeypot. Client validation with inline errors (`aria-invalid`, `aria-describedby`), pending state, success state replacing the form (`role="status"`), error state with retry. `plan` query param prefills a hidden subject.

### 404

Centered, grid + aurora, oversized `404`, short copy, `Back home` + `See our work`.

### API — `/api/contact`

`route.ts`: `zod` schema (email format, length caps, honeypot must be empty), best-effort in-memory IP rate limit (5/min), returns `{ ok, id }`; validation failures `400` with field errors; never leaks internals. `lib/contact/transport.ts` defines `ContactTransport { send(payload): Promise<void> }`, default `logTransport` (console + accepted), documented single-file swap point for Resend/Supabase/webhook. No env vars required.

---

## Motion choreography rules

- Shared variants/easings in `lib/motion.ts` (`fadeUp`, `fadeBlur`, `stagger`, `EASE_OUT_EXPO`, spring presets). No inline magic numbers scattered across files.
- Every scroll animation uses `viewport={{ once: true, margin: "-80px" }}` unless intentionally repeating.
- Animate only `transform`, `opacity`, `filter`. No animating `width/height/top/left` except accordion height (Motion handles it).
- GSAP: register plugins inside a client-only provider (`gsap.registerPlugin(ScrollTrigger, useGSAP)`), use `useGSAP` for cleanup, and call `ScrollTrigger.refresh()` after fonts/images settle; disable all GSAP timelines when `prefers-reduced-motion` matches.
- Do not nest pinning inside pinned sections; one pinned sequence on Home (Process) max.
- Custom cursor glow, tilt, magnetic, spotlight: all gated on `(pointer: fine)` and motion permission; SSR-safe (no `window` at module scope).
- Respect a single source of truth for reduced motion: `usePrefersReducedMotion` hook (useSyncExternalStore) + CSS media query.

---

## Image strategy

- `next.config.ts`: `images.remotePatterns` for `https://images.unsplash.com/**`; `formats: ["image/avif","image/webp"]`; add `qualities: [70, 85]` allowlist entry for Next 16.
- All photos referenced only from `content/media.ts` with `{ src, alt, credit }`.
- Implementer picks 8–10 dark/tech/abstract Unsplash photos, confirms each URL returns 200 (HEAD request), and records the exact URL. If a URL fails, swap it — never ship a broken image.
- `MediaFrame` handles: missing `src` → deterministic gradient+grid composition with the item title; load failure → same fallback via `onError` (keeps layout stable).
- Hero/product mock, logo cloud marks, brand logo, and OG image are all code/SVG — no photography dependency for the first viewport.
- `sizes` set correctly; `priority` only on the Home hero visual; everything else lazy.

---

## Accessibility & quality bar

- Semantic landmarks (`header/nav/main/footer/section` with `aria-labelledby`), single `h1` per page, logical heading order.
- Visible focus rings everywhere; all icon-only buttons have `aria-label`; theme toggle exposes state.
- Accordion/Carousel/Sheet/Dialog use Radix semantics (keyboard, escape, focus trap) — don't reimplement.
- Decorative layers `aria-hidden` + `pointer-events-none`.
- Contrast AA in both themes, including muted text and violet-on-dark CTA labels.
- No horizontal overflow at 360px; test 360/768/1024/1440.
- Images have meaningful `alt` or empty `alt` when decorative.

## Performance bar

- No page should ship three.js or a video. Keep first-load JS lean; import heavy client sections with `next/dynamic` only where it helps (e.g. Process GSAP section, Carousel).
- Prefer server components for static sections; isolate `"use client"` to interactive leaves (Navbar, theme toggle, filters, form, animated widgets).
- Target Lighthouse (mobile) ≥ 90 Performance / ≥ 95 Accessibility / 100 Best Practices / ≥ 90 SEO on Home.

---

## Implementation order

1. **Scaffold** — `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` in `D:\work\agencyweb` (the existing `.git` is tolerated; if it refuses, scaffold in a temp dir and move files in). Clear boilerplate, set metadata baseline, `.gitignore`, verify `npm run dev` boots.
2. **shadcn init** — `npx shadcn@latest init` (new-york, cssVariables, base slate) then add: button card accordion input textarea label badge dialog sheet tabs tooltip separator select sonner carousel. Confirm Tailwind v4 wiring (`tw-animate-css`).
3. **Design tokens + globals.css** — full light/dark oklch sets, dark variant, scrollbars, utilities, keyframes, reduced-motion block, fonts in `layout.tsx`. Verify theme toggle works before building sections.
4. **Primitives & fx layer** — `lib/utils.ts`, `lib/motion.ts`, `usePrefersReducedMotion`, `useMediaQuery`, then all `components/fx/*` and `components/shared/*`. Build a throwaway `/styleguide` page? **No** — instead validate each fx component inline as it's first used to avoid shipping dead routes.
5. **Content layer** — all `content/*` files with types, 6 services, 6 case studies, 4 steps, 4 testimonials, 3 tiers, 6 FAQs, 4 stats, media map.
6. **Shell** — Brand, Navbar (+mobile sheet), ThemeToggle, Footer, `template.tsx` transition, Toaster, TooltipProvider.
7. **Home sections** in order: hero → logo cloud → services → featured work → process (GSAP) → stack → stats → testimonials → pricing → FAQ → CTA.
8. **Work** — index with filters, then `[slug]` with `generateStaticParams`/`generateMetadata`.
9. **About** and **Contact** pages; Contact form + `/api/contact` + zod + transport.
10. **SEO & metadata** — `metadataBase`, per-route `generateMetadata`, OG image route, `sitemap.ts`, `robots.ts`, `not-found.tsx`, canonical URLs from `site.url`.
11. **Responsive + polish pass** — 360/768/1024/1440 sweep, fix overflow, spacing rhythm, hover states, focus states, light-theme contrast, reduced-motion pass, mobile GSAP fallbacks.
12. **README.md** — see outline below.
13. **Validate** — see validation list. Fix everything before step 14.
14. **Run live** — `npm run dev` in `D:\work\agencyweb`, keep it running, report `http://localhost:3000`.

---

## README outline (must be genuinely useful)

Title + one-line pitch + status badge row (Next.js, TypeScript, Tailwind, license) · Preview/screenshot placeholder line · Features (motion, themes, content layer, contact API, SEO, a11y) · Tech stack table with versions · Quick start (clone, `npm install`, `npm run dev`, `npm run build`) · Project structure tree with one-line purpose per folder · Customizing (brand name, colors via tokens, content files, images in `media.ts`) · Contact form integration (where `transport.ts` is and how to swap in Resend/webhook) · Deployment to Vercel (zero env vars today; what to add later) · Accessibility & performance notes · Roadmap toward dynamic backend/auth/CMS · Credits/attribution for Unsplash images · License + "sample content is fictional" disclaimer.

---

## Validation plan

Commands (run in `D:\work\agencyweb`, PowerShell — chain with `;` not `&&`):

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build` (must produce all static routes; confirm `/work/[slug]` pages are prerendered)
4. `npm run dev` and confirm the site loads with no console errors and no hydration warnings

Manual checks:

- Theme toggle persists across reloads and both themes are readable (headings, muted text, borders, buttons, cards).
- Keyboard-only pass: skip link → nav → CTAs → accordions → carousel → form; focus always visible.
- Reduced motion (`prefers-reduced-motion: reduce`): no marquee, parallax, tilt, cursor glow, GSAP pin; content still fully visible.
- 360px width: no horizontal scroll; navbar usable; Process timeline collapses to a stacked list.
- Light theme: aurora/grid/noise opacities retuned so nothing looks washed out.
- All 6 case studies reachable from Work and from Home featured cards; unknown slug renders 404.
- Contact form: invalid input shows field errors; valid submit shows success state; honeypot submissions are rejected silently; API returns typed errors.
- Lighthouse mobile run on Home; note scores in the final summary.

## Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| `create-next-app` refuses non-empty dir (`.git` present) | Scaffold into `%TEMP%` and copy into `D:\work\agencyweb`, preserving `.git` |
| Sandbox denies npm/`npx`/pipe commands | Request approval per command; run commands one at a time without pipes |
| shadcn init misconfigures Tailwind v4 | Verify `components.json` + `globals.css` `@theme inline` block before adding components |
| GSAP + React 19 double-init in StrictMode | Always register plugins once inside a client provider; use `@gsap/react` `useGSAP` with scope + cleanup |
| Hydration mismatch from theme/cursor/greensock | `suppressHydrationWarning` on `<html>`, mount-gate pointer effects, never read `window` during render |
| Unsplash URL rot / hotlink failure | Centralize in `media.ts`, HEAD-check each URL at build time, `MediaFrame` gradient fallback |
| Tailwind v4 `dark:` not applying with `next-themes` | Add `@custom-variant dark (&:is(.dark *));` and set `attribute="class"` |
| Pinned GSAP section breaking layout on mobile | Pin only at `lg+` via `matchMedia`; stacked fallback below |

## Done criteria

- All 6 routes render with the final art direction; nothing looks like default shadcn.
- Motion is layered (ambient CSS loops + scroll reveals + one GSAP pinned sequence + pointer micro-interactions) and never fights the user.
- Dark and light themes both intentional, not auto-inverted.
- `lint`, `tsc --noEmit`, and `build` pass with zero errors.
- Dev server is running and the URL is reported.
- README is complete enough that a stranger could clone, customize the brand, and deploy to Vercel.
