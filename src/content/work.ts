import { media, type MediaKey } from "./media";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: number;
  summary: string;
  services: string[];
  stack: string[];
  cover: MediaKey;
  metrics: { label: string; value: number; suffix?: string }[];
  challenge: string;
  approach: { title: string; body: string }[];
  highlights: string[];
  gallery: MediaKey[];
  testimonial?: { quote: string; name: string; role: string };
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "atlas-telemetry",
    title: "A telemetry console for live infrastructure",
    client: "Atlas Systems",
    year: 2025,
    summary:
      "Atlas monitors thousands of edge nodes in real time. We rebuilt their console around a streaming data model so operators can spot failures before they cascade.",
    services: ["Product design", "Design systems", "Web platforms"],
    stack: ["Next.js", "TypeScript", "Postgres", "WebSockets", "Tailwind"],
    cover: "caseAtlas",
    metrics: [
      { label: "Time to triage", value: 62, suffix: "% faster" },
      { label: "Nodes observed", value: 24, suffix: "k+" },
      { label: "Console bundle", value: 41, suffix: "% smaller" },
    ],
    challenge:
      "The legacy console rendered static snapshots on a refresh cycle. Operators watched stale charts, missed anomaly spikes, and had four different tabs open to answer a single question.",
    approach: [
      {
        title: "Map the operator's actual loop",
        body: "We shadowed two on-call engineers for a week and mapped every step between an alert and a decision. Three of the five tabs existed only to join data that should have been in one view.",
      },
      {
        title: "Design around a stream, not a page",
        body: "Every panel subscribes to a shared realtime channel with a typed event contract, so charts, tables, and alerts move together instead of drifting apart.",
      },
      {
        title: "Build a token layer first",
        body: "Dense data UI needs strict type and spacing rules. We shipped a token set with eight density steps before touching a single panel.",
      },
    ],
    highlights: [
      "Streaming charts with a 200ms render budget and automatic downsampling",
      "Keyboard-first command palette for jumping between nodes and incidents",
      "A dark, high-contrast theme tuned for all-day monitoring",
      "Design system with 46 components documented in Storybook",
    ],
    gallery: ["galleryStudio", "galleryDesk"],
    testimonial: {
      quote:
        "Our on-call engineers stopped complaining about the console. That has literally never happened before.",
      name: "Dana Whitfield",
      role: "VP Engineering, Atlas Systems",
    },
    featured: true,
  },
  {
    slug: "kite-billing",
    title: "Usage-based billing that customers trust",
    client: "Kite",
    year: 2025,
    summary:
      "Kite needed transparent, usage-based invoicing for a developer API. We designed and built the pricing simulator, invoice timeline, and self-serve plan changes.",
    services: ["Product design", "Web platforms", "Hardening"],
    stack: ["Next.js", "Stripe", "tRPC", "Prisma", "Tailwind"],
    cover: "caseKite",
    metrics: [
      { label: "Billing tickets", value: 71, suffix: "% fewer" },
      { label: "Self-serve upgrades", value: 3, suffix: ".4x" },
      { label: "Invoice disputes", value: 0, suffix: " net new" },
    ],
    challenge:
      "Customers could not predict what a month would cost, so upgrades stalled and support absorbed the confusion. Finance wanted accuracy; product wanted fewer tickets.",
    approach: [
      {
        title: "Make the meter visible",
        body: "We exposed the same usage events that drive billing as a live simulator, so a customer can model next month before committing.",
      },
      {
        title: "Explain every line item",
        body: "Each invoice row links back to the events that produced it, with a plain-language reason string attached to each charge.",
      },
      {
        title: "Design the failure paths",
        body: "Failed payments, proration, and plan downgrades got designed states and copy before the happy path shipped.",
      },
    ],
    highlights: [
      "Interactive pricing simulator with saved scenarios",
      "Invoice timeline with per-line drill-down into raw events",
      "Proration preview before confirming a plan change",
      "Webhook-backed reconciliation job with an audit trail",
    ],
    gallery: ["galleryMeeting", "galleryDesk"],
    testimonial: {
      quote:
        "We went from dreading billing week to answering questions in the product instead of in a support queue.",
      name: "Marco Ferrante",
      role: "Head of Product, Kite",
    },
    featured: true,
  },
  {
    slug: "meridian-mapping",
    title: "A mapping workspace for field research",
    client: "Meridian Labs",
    year: 2024,
    summary:
      "Meridian's researchers collect geospatial observations offline in remote areas. We built an offline-first capture app and a web workspace for analysis.",
    services: ["Product design", "Web platforms", "Performance work"],
    stack: ["Next.js", "MapLibre", "SQLite", "IndexedDB", "Service Workers"],
    cover: "caseMeridian",
    metrics: [
      { label: "Offline capture uptime", value: 99, suffix: ".98%" },
      { label: "Sync conflict rate", value: 0, suffix: ".2%" },
      { label: "First map render", value: 0, suffix: ".9s" },
    ],
    challenge:
      "Field teams worked for days without connectivity, then needed every observation to reconcile cleanly with the lab's canonical dataset.",
    approach: [
      {
        title: "Local-first by default",
        body: "Every write lands in a local database first. The network is treated as an optional sync channel, never a requirement.",
      },
      {
        title: "Deterministic merges",
        body: "We designed a crdt-lite merge strategy with explicit conflict surfaces, so researchers can resolve the rare conflict instead of guessing.",
      },
      {
        title: "Map performance budget",
        body: "Vector tiles were pre-cut per region so a 60k-feature view renders under a second on a mid-range tablet.",
      },
    ],
    highlights: [
      "Offline capture with background sync and resumable uploads",
      "Conflict review queue with side-by-side diffs",
      "Region-scoped vector tile pipeline",
      "Field-tested tap targets and high-glare color palette",
    ],
    gallery: ["galleryWorkspace", "galleryMeeting"],
    featured: true,
  },
  {
    slug: "signal-onboarding",
    title: "Cutting onboarding from 14 days to 40 minutes",
    client: "Signal",
    year: 2024,
    summary:
      "Signal's enterprise onboarding ran on spreadsheets and calls. We replaced it with a guided setup flow that provisions a tenant, imports data, and invites a team.",
    services: ["Product design", "Design systems", "Motion engineering"],
    stack: ["Next.js", "React Server Components", "Zod", "Postgres", "Framer Motion"],
    cover: "caseSignal",
    metrics: [
      { label: "Activation time", value: 40, suffix: " min" },
      { label: "Setup drop-off", value: 84, suffix: "% lower" },
      { label: "Support load", value: 3, suffix: "x lower" },
    ],
    challenge:
      "Every new enterprise customer needed a solutions engineer to hand-build their workspace. The company could not grow faster than its onboarding team.",
    approach: [
      {
        title: "Find the real fork in the road",
        body: "Analytics showed 80% of customers followed three setup paths. We designed explicit branches for those and a manual escalation for the rest.",
      },
      {
        title: "Show the workspace forming",
        body: "Rather than a progress bar, each step rendered the real tenant being created, which kept users oriented and reduced abandonment.",
      },
      {
        title: "Instrument every step",
        body: "Each step emitted typed analytics events so the team could see exactly where customers stalled after launch.",
      },
    ],
    highlights: [
      "Guided tenant provisioning with resumable drafts",
      "CSV import with column mapping and validation preview",
      "Team invitations with role presets",
      "Motion-led progress that reflects real backend state",
    ],
    gallery: ["galleryDesk", "galleryStudio"],
    testimonial: {
      quote:
        "The flow is so good that our solutions engineers now only touch accounts that genuinely need customization.",
      name: "Priya Raman",
      role: "Director of Customer Experience, Signal",
    },
    featured: false,
  },
  {
    slug: "harbor-portal",
    title: "A partner portal that replaced nine spreadsheets",
    client: "Harbor Logistics",
    year: 2023,
    summary:
      "Harbor's freight partners tracked shipments across email threads. We shipped a portal with shared shipment records, documents, and dispute handling.",
    services: ["Product design", "Web platforms", "Hardening"],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Playwright"],
    cover: "caseHarbor",
    metrics: [
      { label: "Weekly partner emails", value: 78, suffix: "% fewer" },
      { label: "Dispute resolution", value: 4, suffix: ".2 days avg" },
      { label: "Active partners", value: 310, suffix: "+" },
    ],
    challenge:
      "Partners had no shared source of truth, so shipment status lived in email attachments and disputes became archaeology.",
    approach: [
      {
        title: "One record, two audiences",
        body: "Shipment data is the same record for Harbor staff and partners, with role-scoped views instead of parallel systems.",
      },
      {
        title: "Documents as first-class objects",
        body: "Every upload is versioned, attributable, and linked to the shipment, so the paper trail is the product.",
      },
      {
        title: "Test the disputes first",
        body: "We ran an end-to-end test suite against dispute flows before the demo, because that was where trust was lost.",
      },
    ],
    highlights: [
      "Role-scoped shipment views with audit history",
      "Versioned document vault with inline previews",
      "Structured dispute workflow with deadlines",
      "Playwright suite covering 40 critical journeys",
    ],
    gallery: ["galleryWorkspace", "galleryStudio"],
    featured: false,
  },
  {
    slug: "verdant-design-system",
    title: "A design system for a climate data platform",
    client: "Verdant",
    year: 2023,
    summary:
      "Verdant had four product teams shipping four different visual languages. We built a shared token layer and component library adopted across all of them.",
    services: ["Design systems", "Motion engineering", "Performance work"],
    stack: ["React", "Tailwind", "Radix", "Storybook", "Turborepo"],
    cover: "caseVerdant",
    metrics: [
      { label: "UI build time", value: 55, suffix: "% faster" },
      { label: "Shared components", value: 72, suffix: " shipped" },
      { label: "Teams adopted", value: 4, suffix: " of 4" },
    ],
    challenge:
      "Each team had its own button, its own spacing scale, and its own interpretation of accessibility. Fixes had to be made four times.",
    approach: [
      {
        title: "Audit before abstracting",
        body: "We catalogued 240 unique UI patterns across the products and found the 60 that actually mattered.",
      },
      {
        title: "Tokens as the contract",
        body: "Color, type, motion, and spacing were defined once and published to every package, with a diffable changelog.",
      },
      {
        title: "Adoption as a product problem",
        body: "We wrote migration guides, ran pair-coding sessions, and tracked adoption per team instead of declaring victory at publish.",
      },
    ],
    highlights: [
      "Multi-package library with versioned releases",
      "72 accessible Radix-based components",
      "Motion presets with reduced-motion defaults",
      "Automated visual regression on every change",
    ],
    gallery: ["galleryMeeting", "galleryDesk"],
    featured: false,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export const featuredCaseStudies = caseStudies.filter((item) => item.featured);

export function getNextCaseStudy(slug: string): CaseStudy {
  const index = caseStudies.findIndex((item) => item.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

export function caseCover(key: MediaKey) {
  return media[key];
}
