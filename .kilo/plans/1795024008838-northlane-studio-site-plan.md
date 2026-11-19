# Northlane — Dark Lime Redesign (Plan v2)

## Goal

Rebuild the existing Northlane site in `D:\work\agencyweb` as a **dark-only, lime-accented** studio site modelled on the Project CPP / recreate-v3 web UI (`C:\Users\Admin\Downloads\cpp\cpp-frontend`), replacing the current violet/indigo + light-theme system. Every card, panel, and section is redesigned from scratch around one shared surface grammar. Service offering is reframed as **three pillars**: Project Planning → Project Establishment, Design · Development · Maintenance, and Marketing.

Existing infrastructure (Next 16 App Router, Tailwind v4, shadcn primitives, typed content layer, Motion + GSAP, contact API) is kept. Only the design system, card components, and content are replaced.

## Locked decisions

| Topic | Decision |
| --- | --- |
| Theme | **Dark only.** Light theme, `next-themes`, `ThemeProvider`, `ThemeToggle`, `@custom-variant dark`, and every `dark:` class are deleted |
| Palette | Near-black `#050706` canvas, lime `#A6F04C` accent, toxic `#39FF14`, soft `#C6F98A` |
| Fonts | **Sora** (headings) + **Figtree** (body) via `next/font/google`; Geist Mono → Sora-mono fallback for eyebrows only if needed |
| Brand | Name and diamond mark kept; mark recoloured lime |
| Routes | Unchanged: `/`, `/work`, `/work/[slug]`, `/about`, `/contact`, 404, `api/contact`, sitemap, robots, OG image |
| Services | 3 pillars, each with sub-steps (see content model) |
| Copy | Rewritten around the three pillars; all 6 case studies re-themed to pillars |
| Imagery | **No photos.** All covers/galleries are code-generated compositions; Unsplash config and `remotePatterns` removed |
| Light | Scroll-linked sunlight cone on the hero (Motion `useScroll`); static cone on inner page heroes |
| Navbar | 7 links (Home · Services · Work · Process · Pricing · FAQ · About) + lime pill CTA |
| Cards | One shared base primitive + 5 section signature layers (below) |
| Logo cloud | Code-drawn SVG wordmarks |
| Marketing data | Invented metrics are allowed; the fictional-content footer disclaimer is **removed** |
| Home order | Hero → Logos → Pillars → Featured work → Process → Tooling → Stats rack → Testimonials → Pricing → FAQ → Final CTA |
| Motion | Motion for interaction; GSAP ScrollTrigger only for the Process timeline; CSS keyframes for ambient loops |
| Performance | Retain current mobile guards: tiled noise (no live turbulence), no `filter: blur()` on large layers, no marquee/animation below 768px, no remote images |

## Out of scope

Auth/login, dashboard, database, real email delivery, CMS, blog, i18n, WebGL, payments, real client assets.

---

## 1. Design tokens — rewrite `src/app/globals.css`

Replace the entire `:root` / `.dark` / `@theme inline` token block with a single dark set.

```
--background        #050706
--background-1      #080B08
--background-2      #0B0F0B
--card              #0A0E0A   (82% alpha fill used in panels)
--card-foreground   #F2F5EF
--popover           #0B0F0B
--primary           #A6F04C
--primary-foreground#08120A
--secondary         rgba(255,255,255,0.05)
--muted             #0B0F0B
--muted-foreground  #9AA79A
--accent            rgba(166,240,76,0.08)
--accent-foreground #F2F5EF
--border            rgba(166,240,76,0.10)
--border-strong     rgba(166,240,76,0.28)
--input             rgba(255,255,255,0.10)
--ring              #A6F04C
--destructive       #F2555A
--warning           #F5B53D
--success           #A6F04C
--lime              #A6F04C
--lime-soft         #C6F98A
--lime-dim          #7FBF3A
--toxic             #39FF14
--grid-line         rgba(166,240,76,0.055)
--glow              rgba(166,240,76,0.30)
--noise-opacity     0.045
```

Keep shadcn's variable names so `components/ui/*` keeps working, but delete the `.dark` block, `color-scheme: light`, and all light values. Add `color-scheme: dark` to `:root`.

Remove `--violet`, `--violet-soft`, `--indigo`, `--cyan` from tokens and from `@theme inline`. Add `--color-lime*`, `--color-toxic`, `--color-warning`, `--color-success`.

### Utility rewrites

- `text-gradient` → `linear-gradient(110deg, #C6F98A, #A6F04C 55%, #39FF14)`.
- `text-gradient-violet` → rename `text-gradient-lime`; update every usage (`page-hero.tsx`, `hero.tsx`, `work/page.tsx`, `work/[slug]/page.tsx`, `final-cta.tsx`, `not-found.tsx`).
- `grid-bg` → use `--grid-line` at 64px, add `.hero-grid` variant with the reference's radial mask (`110% 80% at 50% 18%`).
- Scrollbars → 4px width, `rgba(166,240,76,0.35)` thumb, transparent track (reference values).
- Add `.sunspot` / `.hero-cone` classes (see §3).
- Add `.nl-surface` classes (see §4).
- Recolour `pulse-dot` box-shadow to lime.
- Keep the reduced-motion block and the `max-width: 767px` animation kill switch.

### Fonts — `src/app/layout.tsx`

```ts
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap", weight: ["400","500","600","700"] });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], display: "swap" });
```

`--font-sans: var(--font-figtree)`, `--font-heading: var(--font-sora)`. Set `h1–h6` to `font-heading` with `letter-spacing: -0.028em`. Body keeps `-0.018em`.

---

## 2. Remove the light theme (complete deletions)

1. `package.json`: drop `next-themes`; run `npm install`.
2. Delete `src/components/layout/theme-toggle.tsx`.
3. `src/components/providers/theme-provider.tsx`: remove `ThemeProvider` and the `next-themes` import; keep `GsapProvider` + `useGsapReady`.
4. `src/app/layout.tsx`: remove `ThemeProvider` wrapper and `suppressHydrationWarning` if unused; set `color-scheme: dark`.
5. `src/components/ui/sonner.tsx`: remove `useTheme`; hardcode `theme="dark"`.
6. `src/components/layout/navbar.tsx`: remove `ThemeToggle` from desktop cluster and mobile sheet "Appearance" row.
7. Grep-verify zero remaining matches for `next-themes`, `useTheme`, `dark:`, `ThemeToggle`.

---

## 3. Ambient background — rewrite `src/components/fx/atmosphere.tsx`

Replace `Aurora` with lime equivalents and add the sunlight system.

- **`SunlightCone`** — scroll-linked, client component.
  - `useScroll({ target: ref, offset: ["start start", "end start"] })` on the hero section.
  - `useTransform` scrollYProgress → `opacity 0.85→0`, `scaleX 1→1.25`, `blur` via a fixed pre-blurred layer (do **not** animate `filter`; animate opacity/transform only).
  - Markup: absolutely positioned cone at top-center, `conic-gradient` plus a radial wash, lime at 0.10–0.18 alpha, `mask-image` fading downward. `aria-hidden`, `pointer-events-none`.
  - Hidden below `md`; render a static cone when `prefers-reduced-motion`.
- **`Sunspot`** — the static top-of-page wash: two stacked radial gradients at `50% -8%` / `50% -2%` (reference values). Used by page heroes, case-study headers, and the final CTA.
- **`GridBackdrop`** — recolour to lime grid lines; keep the radial mask and the `size` prop.
- **`NoiseOverlay`** — keep the tiled 140px data-URI SVG (already perf-safe); bump opacity via `--noise-opacity`; `hidden md:block` retained.
- Recolour `src/components/fx/scroll-progress.tsx` to `from-lime-soft via-lime to-toxic`.
- Recolour `src/components/fx/spotlight.tsx` default `glow` to `color-mix(in oklab, var(--lime) 22%, transparent)`.

`Aurora` usages to replace: `hero.tsx`, `page-hero.tsx`, `about/page.tsx`, `work/[slug]/page.tsx`, `not-found.tsx`, `final-cta.tsx`. On inner pages use `<Sunspot /> + <GridBackdrop />`; on the hero use `<SunlightCone /> + <GridBackdrop />`.

---

## 4. Card system — shared base + 5 signature layers

### 4a. `src/components/fx/lime-surface.tsx` (new)

One primitive for fill, border, radius, spotlight, and hover lift.

```tsx
type Tone = "solid" | "translucent";
type Edge = "top" | "wide" | "left" | "none";

LimeSurface({
  tone?, edge?, interactive?, padded?, className?, children
})
```

- Renders `div.nl-surface` with `data-tone` / `data-edge`.
- Tracks pointer into `--mx` / `--my` (reuse the guard from `spotlight.tsx`: skip on touch and reduced motion).
- `interactive` toggles `.nl-surface-interactive` (hover lift, border to `--border-strong`, spotlight reveal, filament `drop-shadow`).

CSS in `globals.css`:

```css
.nl-surface { position:relative; isolation:isolate; overflow:hidden; border-radius:16px;
  border:1px solid var(--border); background:rgba(10,14,10,0.82);
  box-shadow:0 22px 44px -26px rgba(0,0,0,0.8); }
.nl-surface[data-tone="translucent"] { background:rgba(10,14,10,0.55); backdrop-filter:blur(10px); }
.nl-surface::before { /* 2px top filament: transparent → lime → transparent, left/right 14% */ }
.nl-surface[data-edge="wide"]::before { left:6%; right:6%; }
.nl-surface[data-edge="left"]::before { /* vertical variant */ }
.nl-surface[data-edge="none"]::before { content:none; }
.nl-surface::after { /* radial 240px spotlight at var(--mx) var(--my), opacity 0 → 1 in interactive */ }
.nl-surface-interactive:hover { transform:translateY(-4px); border-color:var(--border-strong);
  box-shadow:0 18px 40px -20px rgba(166,240,76,0.35); }
```

- Keep `backdrop-filter: blur(10px)` only on `translucent`, and only above `md` (media query) to protect mobile paint cost.
- Respect reduced motion: no transform/transition.

### 4b. Signature layers

1. **`PillarCard`** (`components/sections/pillars.tsx`) — `LimeSurface edge="top" interactive`, large `01/02/03` mono index in lime-dim, icon chip (lime 8% bg, lime border), title (Sora 18px), summary, then a **sub-step list** where each item has a lime dot on a vertical hairline connector. Three cards: first two span 1 col each, third spans full width on `lg` (asymmetric grid: `lg:grid-cols-2` + third `lg:col-span-2` split into two text columns).
2. **`WorkCard`** — `LimeSurface edge="none"`, top area is `<ArtFrame />` (code-generated cover), bottom is a metric rail of divided cells (`border-t`, each cell `border-l` except first) reusing the stat-rack grammar.
3. **`StatRack`** — one `LimeSurface` wrapping a divided grid; each cell has its own 2px top filament that brightens on hover and a corner bracket (`::before` L-shaped border). Replaces the current `Stats` section markup.
4. **`TierCard`** — pricing; non-highlighted = `LimeSurface edge="top"`; highlighted = same base plus an animated conic border implemented as a masked pseudo-element (static when reduced motion).
5. **`QuoteCard`** — `LimeSurface edge="left"`; lime quote glyph, initials avatar in a lime ring, name/role footer.

---

## 5. Code-generated art — replace photos

1. Delete `src/content/media.ts` and `src/components/shared/media-frame.tsx`.
2. Add `src/components/shared/art-frame.tsx` exporting `ArtFrame`:
   - Props: `{ pattern: "mesh" | "grid" | "rings" | "bars" | "arcs" | "cells"; label: string; variant?: number; className?; aspect? }`.
   - Each pattern is pure CSS/SVG on `--background-1`, layered: base gradient, pattern layer, `GridBackdrop`, lime corner ticks, and an optional inset "mock UI" strip (three bars + a lime line) so covers read as product shots.
   - Deterministic by `variant`, no randomness, no images, no layout shift.
3. `src/content/work.ts`: replace `cover: MediaKey` / `gallery: MediaKey[]` with
   `cover: VisualSpec` and `gallery: VisualSpec[]` where
   `VisualSpec = { pattern: Pattern; label: string; variant: number }`.
   Add `pillar: "planning" | "build" | "marketing"` to each case study.
4. Update consumers: `featured-work.tsx`, `work-grid.tsx`, `work/[slug]/page.tsx`, `about/page.tsx`.
5. `next.config.ts`: remove `images.remotePatterns`, `formats`, `qualities`, `deviceSizes`, `imageSizes`, `minimumCacheTTL` (keep the security headers). No `next/image` usage should remain — verify with grep.

---

## 6. Content rewrite — `src/content/*`

### `services.ts` → `pillars.ts`

```ts
export interface SubStep { title: string; body: string }
export interface Pillar {
  slug: "planning" | "build" | "marketing";
  index: "01" | "02" | "03";
  title: string;
  tagline: string;
  summary: string;
  subSteps: SubStep[];   // 3–4 each
  outcomes: string[];    // 3 each
  icon: "compass" | "layers" | "megaphone";
}
```

1. **Project Planning → Establishment** — discovery, scope, systems/architecture decisions, environment and launch setup. Sub-steps: Discovery, Scope & roadmap, Architecture, Launch setup.
2. **Design · Development · Maintenance** — one lifecycle shown as three linked stages. Sub-steps: Design direction, Build, QA & hardening, Maintenance retainer.
3. **Marketing** — positioning, launch, and lifecycle campaigns. Sub-steps: Positioning, Launch, Content engine, Measurement.

### Other content files

- `site.ts`: update tagline/description to the pillar framing; nav becomes 7 items; keep `availability`, `email`, `socials`; **delete `disclaimer`**.
- `work.ts`: 6 studies re-themed — 2 planning/establishment, 2 design-dev-maintenance, 2 marketing. Each gets `pillar`, new title/summary/challenge/approach/highlights, and 3 metrics (marketing studies may state growth metrics per the locked decision).
- `process.ts`: keep 4 steps, rename to match the pillars (Frame → Establish → Build → Grow).
- `stack.ts`: keep, retitle the section "Tooling".
- `stats.ts`, `testimonials.ts`, `pricing.ts`, `faq.ts`, `studio.ts`: keep shapes; adjust wording to pillars; `pricing` tiers become **Establish / Build / Growth**; `studio.ts` `accent` values must switch from violet/cyan/indigo to lime variants (`from-lime/25 to-lime/5`, etc.).
- `footerNav`: keep 3 groups, retitle Services group to the pillars.

---

## 7. Navigation, hero, and shell

### `components/layout/navbar.tsx`

- Links: Home (`/#discover`), Services (`/#services`), Work (`/work`), Process (`/#process`), Pricing (`/#pricing`), FAQ (`/#faq`), About (`/about`).
- `HOME_SECTIONS` observer list must include `discover`, `services`, `process`, `pricing`, `faq`.
- Right cluster: `Start a project` lime pill with a circular dark arrow badge (`group-hover:rotate-45`), matching the reference CTA.
- Keep scroll-scrolled blur state, hide-on-scroll-down behaviour, and `ScrollProgress`.
- Pill styling: `border-[rgba(166,240,76,0.10)]` idle, `border-[rgba(166,240,76,0.16)] bg-[#050706]/85 backdrop-blur-xl` scrolled.
- Mobile sheet: 8 entries, lime active state `bg-[rgba(166,240,76,0.08)]`, lime CTA at the bottom, no theme row.
- Active nav indicator: replace the violet pill with `bg-[rgba(166,240,76,0.08)]` + `ring-1 ring-[rgba(166,240,76,0.2)]`.

### `components/sections/hero.tsx` — rewrite, centered reference layout

1. Centered status pill: lime dot (`#39FF14`, `status-dot` pulse), "All systems operational"-style label from `site.availability`.
2. `h1` in three lines: line 1 `#F2F5EF`, lines 2–3 in lime. Sora, `text-[2.6rem] sm:text-6xl lg:text-[4.6rem]`, `tracking-[-0.03em]`, `leading-[1.02]`.
3. Lede, max-w-xl, `#9AA79A`.
4. CTAs: lime pill `Start a project` with circular arrow badge + outline pill `See our work`. Keep `Magnetic` on the primary only.
5. Check row: three uppercase tracked items with lime `✓` (mirrors the reference's STREAM PROOF / CLOUD CONFIGS row).
6. Product stage: keep `ProductMock`, recolour it (see §8), place it centered below the copy inside the sunlight cone, with a single floating "metric" chip; no blurred halo divs.
7. Delete `TextReveal` usage and the two-column layout; use one `motion.h1` with staggered `motion.span` lines.

### Shell

- `layout.tsx`: keep `Navbar` in the root layout (already moved there), keep skip link, `GsapProvider`, `TooltipProvider`, `Toaster`, `NoiseOverlay`.
- `template.tsx`: keep opacity-only transition.
- `footer.tsx`: restyle to lime — brand, lime CTA, email pill, availability pill in lime (not emerald), 3 nav columns, social row, oversized wordmark with lime-to-transparent gradient mask; remove the disclaimer paragraph and give the bottom bar more breathing room (`pb-12`).
- `page-hero.tsx`: `Sunspot` + `GridBackdrop`, lime eyebrow with leading rule, `text-gradient-lime` for the second phrase.
- `brand.tsx`: gradient stops → `--lime-soft`, `--lime`, `--toxic`; diamond fill `color-mix(in oklab, var(--lime) 14%, transparent)`; stroke opacity 0.5.
- `section-heading.tsx`: eyebrow lime with leading 24px rule; optional `align="center"`.
- `button.tsx`: `glow` variant becomes the lime pill with `shadow-[0_14px_40px_-12px_rgba(166,240,76,0.6)]` and `hover:-translate-y-0.5`; `outline` uses lime borders; `primary-foreground` must be `#08120A`.
- `badge.tsx`, `accordion.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `dialog.tsx`, `sheet.tsx`: swap violet-derived styles for lime (`primary`, `ring`, `accent`) and replace `emerald` success with `--success` (lime). Keep `amber` only for the mock "Deploying" state.

---

## 8. Section rewrites

| File | Change |
| --- | --- |
| `sections/hero.tsx` | Full rewrite per §7 |
| `sections/logo-cloud.tsx` | Replace text marquee with 8 `ClientLogo` SVGs (geometric lime monograms + wordmark). Keep `Marquee`, edge masks, mobile stop |
| `sections/services.tsx` → `sections/pillars.tsx` | 3 `PillarCard`s, asymmetric grid, `id="services"` retained |
| `sections/featured-work.tsx` | `WorkCard` with `ArtFrame`, metric rail, pillar tag; 3 featured |
| `sections/process.tsx` | Restyle: lime rail + dots, `LimeSurface` per step, GSAP timeline kept |
| `sections/stack.tsx` | Retitle "Tooling"; chips in lime-bordered mono style |
| `sections/stats.tsx` | `StatRack` divided grid with per-cell filament + corner brackets |
| `sections/testimonials.tsx` | `QuoteCard` carousel; keep embla + controls, restyle dots lime |
| `sections/pricing.tsx` | `TierCard`; highlighted tier gets animated conic border |
| `sections/faq.tsx` | Accordion inside `LimeSurface edge="none"`; trigger hover text lime |
| `sections/final-cta.tsx` | `Sunspot` + `LimeSurface edge="wide"` panel, lime CTAs |
| `sections/work-grid.tsx` | Filter chips in lime; cards use `WorkCard`; keep Motion layout transitions |
| `sections/contact-form.tsx` | Recolour to lime; success state uses lime instead of emerald |
| `app/page.tsx` | Reorder per §Locked decisions; import `Pillars` instead of `Services` |
| `app/about/page.tsx` | `ArtFrame` instead of `MediaFrame`; team accent gradients → lime; values/timeline restyled |
| `app/work/page.tsx`, `app/work/[slug]/page.tsx` | `ArtFrame`, pillar tags, lime metrics rack |
| `app/not-found.tsx` | Lime 404 with `text-gradient-lime` |
| `app/icon.tsx`, `app/opengraph-image.tsx` | Rebuild on the lime/black palette |
| `shared/product-mock.tsx` | Swap violet for lime; remove `backdrop-blur-xl`; sidebar/active states lime; keep the chart/code mock |

---

## 9. Ordered task list

1. **Tokens + fonts.** Rewrite `globals.css` token block and utilities; swap fonts in `layout.tsx`. Verify the site renders dark with lime accents before touching components.
2. **Delete light theme** (§2) and confirm `npm run build` passes with no `next-themes` references.
3. **Atmosphere.** Rewrite `atmosphere.tsx` (`Sunspot`, `SunlightCone`, `GridBackdrop`, `NoiseOverlay`); recolour `scroll-progress.tsx`, `spotlight.tsx`.
4. **Surface primitive.** Add `lime-surface.tsx` + `.nl-surface` CSS.
5. **Art system.** Add `art-frame.tsx`; delete `media.ts` + `media-frame.tsx`; update `work.ts` types.
6. **Content.** Write `pillars.ts`; rewrite `work.ts`, `site.ts`, `process.ts`, `pricing.ts`, `faq.ts`, `studio.ts`, `stats.ts`, `testimonials.ts`; drop the disclaimer.
7. **Shell.** Navbar (7 links + lime CTA), footer, brand mark, page hero, button variants, UI primitives recolour.
8. **Home sections** in plan order (hero first, then logos → pillars → work → process → tooling → stats → testimonials → pricing → FAQ → CTA).
9. **Work index + case-study pages**, then **About**, then **Contact**.
10. **Metadata + art:** `icon.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` already exist — recolour only.
11. **Sweep + validate** (§10).

---

## 10. Validation

Commands (PowerShell, chain with `;`):

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm run dev` → confirm `http://localhost:3000` loads

Checks:

- **No leftovers:** `grep` for `violet`, `indigo`, `cyan`, `next-themes`, `useTheme`, `dark:`, `emerald`, `unsplash`, `next/image`, `disclaimer` must all return zero matches in `src/`.
- **Single theme:** `<html>` has no `class` toggle; `color-scheme: dark`; no FOUC on reload.
- **Palette discipline:** every accent on the page is `--lime`, `--toxic`, `--lime-soft`, `--warning`, or `--destructive`. No stray tailwind color families.
- **Cards:** every panel uses `LimeSurface`; five signatures visibly distinct; hover lift and filament glow consistent.
- **Contrast:** `#F2F5EF` and `#9AA79A` on `#050706` pass AA; lime `#A6F04C` text on near-black passes AA.
- **Mobile (360/390):** no horizontal scroll; no marquee animation; no `backdrop-filter` on large surfaces; hero cone hidden below `md`; Lighthouse mobile Home ≥ 90 performance, ≥ 95 accessibility.
- **Reduced motion:** hero cone static, GSAP Process timeline disabled, marquees stopped, no tilt/spotlight.
- **Routes:** all 6 case studies reachable and prerendered; unknown slug → 404; `/contact` form validates and reports success; `/api/contact` rejects honeypot + rate limits.
- **Visual parity:** hero reads as the reference screenshot — centered copy, three-line headline with lime phrase, lime pill CTA with circular arrow, check row, product stage under a top-down light cone.

## Risks

| Risk | Mitigation |
| --- | --- |
| Removing `next-themes` breaks `sonner` theming or `suppressHydrationWarning` assumptions | Hardcode `theme="dark"`; drop the attribute only after a build passes |
| Deleting `media.ts` breaks `work.ts` and 5 consumers | Do the type change and all consumer updates in one task (step 5), then build |
| Recolouring shadcn primitives leaves violet `ring`/`accent` states | Do primitives in step 7 and grep the palette afterwards |
| Scroll-linked cone re-introduces mobile paint cost | Animate opacity/transform only, pre-blur with a fixed layer, hide below `md` |
| Two large content rewrites (pillars + 6 case studies) drift from the components | Write content before components (step 6 precedes 8) |
| `backdrop-filter` on many panels slows mobile | Only `translucent` tone, only above `md` |
