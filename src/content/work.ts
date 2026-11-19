import type { VisualSpec } from "./art";

export type PillarKey = "planning" | "build" | "marketing";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  year: number;
  pillar: PillarKey;
  summary: string;
  services: string[];
  stack: string[];
  cover: VisualSpec;
  metrics: { label: string; value: number; suffix?: string; decimals?: number }[];
  challenge: string;
  approach: { title: string; body: string }[];
  highlights: string[];
  gallery: VisualSpec[];
  testimonial?: { quote: string; name: string; role: string };
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "atlas-console",
    title: "Establishing a telemetry platform in six weeks",
    client: "Atlas Systems",
    year: 2025,
    pillar: "planning",
    summary:
      "Atlas had funding, a rough deck, and no technical plan. We ran discovery, fixed the architecture, and stood up a working console before their first enterprise call.",
    services: ["Discovery", "Architecture", "Establishment"],
    stack: ["Next.js", "TypeScript", "Postgres", "WebSockets"],
    cover: { pattern: "rings", label: "Atlas / telemetry", variant: 0 },
    metrics: [
      { label: "Time to first demo", value: 6, suffix: " weeks" },
      { label: "Scope changes after sign-off", value: 0, suffix: "" },
      { label: "Nodes observed at launch", value: 24, suffix: "k+" },
    ],
    challenge:
      "The founders were three weeks from an enterprise pilot with no repository, no data model, and an infrastructure diagram on a whiteboard. Every decision was still open.",
    approach: [
      {
        title: "Discovery before architecture",
        body: "Two days of workshops produced a written brief: who the operators are, what a decision needs, and which assumptions could sink the pilot.",
      },
      {
        title: "Fix the contract, not the UI",
        body: "We specified the realtime event contract and the data model first. Interface work became a consequence of those decisions instead of a guessing game.",
      },
      {
        title: "Establish in week one",
        body: "Repository, CI, preview environments, and a seeded dataset were live on day five, so every later demo happened on real infrastructure.",
      },
    ],
    highlights: [
      "Written discovery brief signed off by all three founders",
      "Phased roadmap with fixed outcomes per two-week block",
      "Streaming data contract documented before any component was built",
      "Working environment and deploy pipeline inside week one",
    ],
    gallery: [
      { pattern: "grid", label: "Architecture map", variant: 1 },
      { pattern: "bars", label: "Load profile", variant: 2 },
    ],
    testimonial: {
      quote:
        "They turned a whiteboard into something we could actually demo, and they did it without us having to make a single decision twice.",
      name: "Dana Whitfield",
      role: "Co-founder, Atlas Systems",
    },
    featured: true,
  },
  {
    slug: "kite-launch",
    title: "Scoping a usage-based billing launch",
    client: "Kite",
    year: 2025,
    pillar: "planning",
    summary:
      "Kite needed to launch metered billing without breaking existing customers. We scoped the migration, defined the event schema, and set up the environments the team still runs today.",
    services: ["Discovery", "Scope & roadmap", "Establishment"],
    stack: ["Next.js", "Stripe", "tRPC", "Prisma"],
    cover: { pattern: "cells", label: "Kite / billing", variant: 1 },
    metrics: [
      { label: "Billing tickets after launch", value: 71, suffix: "% fewer" },
      { label: "Self-serve upgrades", value: 3, suffix: ".4x" },
      { label: "Migration incidents", value: 0, suffix: "" },
    ],
    challenge:
      "Existing contracts were flat-rate, the product was already metered internally, and finance wanted predictable revenue. Nobody agreed on what an event should be.",
    approach: [
      {
        title: "Map the money paths",
        body: "We traced every path that could create a charge, then wrote the schema that all of them had to satisfy before any code changed.",
      },
      {
        title: "Sequence the migration",
        body: "Grandfathered plans, new plans, and proration became three separate phases with their own acceptance criteria.",
      },
      {
        title: "Stand up the test bed",
        body: "A staging environment with synthetic invoices let finance validate numbers before customers ever saw them.",
      },
    ],
    highlights: [
      "Event schema with a documented contract for every billable action",
      "Three-phase migration plan with acceptance criteria per phase",
      "Staging environment with synthetic invoice generation",
      "Runbook for billing incidents handed to the internal team",
    ],
    gallery: [
      { pattern: "mesh", label: "Invoice timeline", variant: 0 },
      { pattern: "arcs", label: "Revenue paths", variant: 3 },
    ],
    featured: true,
  },
  {
    slug: "meridian-platform",
    title: "A field research platform, designed and built",
    client: "Meridian Labs",
    year: 2024,
    pillar: "build",
    summary:
      "We designed and built an offline-first capture app plus the web workspace used to analyse it — then kept both healthy through two research seasons.",
    services: ["Design", "Development", "Maintenance"],
    stack: ["Next.js", "MapLibre", "SQLite", "Service Workers"],
    cover: { pattern: "arcs", label: "Meridian / field", variant: 2 },
    metrics: [
      { label: "Offline capture uptime", value: 99, suffix: ".98%", decimals: 2 },
      { label: "Sync conflict rate", value: 0, suffix: ".2%", decimals: 1 },
      { label: "First map render", value: 0, suffix: ".9s", decimals: 1 },
    ],
    challenge:
      "Field teams worked for days without connectivity, then needed every observation to reconcile cleanly with the lab's canonical dataset.",
    approach: [
      {
        title: "Local-first by default",
        body: "Every write lands in a local database first. The network is an optional sync channel, never a requirement.",
      },
      {
        title: "Design for glare and gloves",
        body: "Tap targets, contrast, and type scale were set against field photos, not a desktop monitor.",
      },
      {
        title: "Keep it healthy",
        body: "A retainer covered tile pipeline upkeep, dependency upgrades, and on-call during both research seasons.",
      },
    ],
    highlights: [
      "Offline capture with resumable background sync",
      "Conflict review queue with side-by-side diffs",
      "Region-scoped vector tile pipeline",
      "Two seasons of continuous maintenance with no data-loss incidents",
    ],
    gallery: [
      { pattern: "grid", label: "Capture flow", variant: 2 },
      { pattern: "rings", label: "Sync topology", variant: 1 },
    ],
    testimonial: {
      quote:
        "They built it, then kept it running through two seasons. That continuity is worth more than any launch sprint.",
      name: "Ines Marchetti",
      role: "Research Director, Meridian Labs",
    },
    featured: true,
  },
  {
    slug: "signal-onboarding",
    title: "Cutting onboarding from 14 days to 40 minutes",
    client: "Signal",
    year: 2024,
    pillar: "build",
    summary:
      "Signal's enterprise onboarding ran on spreadsheets and calls. We designed and shipped a guided setup flow, then maintained it through a season of pricing changes.",
    services: ["Design", "Development", "QA & hardening"],
    stack: ["Next.js", "Server Components", "Zod", "Postgres"],
    cover: { pattern: "bars", label: "Signal / onboarding", variant: 0 },
    metrics: [
      { label: "Activation time", value: 40, suffix: " min" },
      { label: "Setup drop-off", value: 84, suffix: "% lower" },
      { label: "Support load", value: 3, suffix: "x lower" },
    ],
    challenge:
      "Every new enterprise customer needed a solutions engineer to hand-build their workspace. The company could not grow faster than its onboarding team.",
    approach: [
      {
        title: "Find the real fork",
        body: "Analytics showed 80% of customers followed three setup paths. We designed explicit branches for those and an escalation for the rest.",
      },
      {
        title: "Show the workspace forming",
        body: "Each step rendered the real tenant being created rather than a progress bar, which kept users oriented.",
      },
      {
        title: "Harden before launch",
        body: "A full accessibility and performance pass ran before release, with budgets published to the team.",
      },
    ],
    highlights: [
      "Guided tenant provisioning with resumable drafts",
      "CSV import with column mapping and validation preview",
      "Typed analytics events on every step",
      "WCAG AA audit with fixes shipped pre-launch",
    ],
    gallery: [
      { pattern: "cells", label: "Setup steps", variant: 2 },
      { pattern: "mesh", label: "Tenant provision", variant: 1 },
    ],
    featured: false,
  },
  {
    slug: "harbor-launch",
    title: "Launching a partner portal to 310 freight partners",
    client: "Harbor Logistics",
    year: 2023,
    pillar: "marketing",
    summary:
      "Harbor had a platform nobody outside the company knew about. We positioned it, ran the partner launch, and built the content engine that keeps sign-ups moving.",
    services: ["Positioning", "Launch", "Content engine"],
    stack: ["Next.js", "TypeScript", "Supabase", "Plausible"],
    cover: { pattern: "mesh", label: "Harbor / launch", variant: 2 },
    metrics: [
      { label: "Partners onboarded in 90 days", value: 310, suffix: "+" },
      { label: "Weekly partner emails", value: 78, suffix: "% fewer" },
      { label: "Qualified sign-ups", value: 4, suffix: ".1x" },
    ],
    challenge:
      "The portal was genuinely useful and completely unknown. Partners still sent shipments by email because the portal had been announced once, in a PDF.",
    approach: [
      {
        title: "Rewrite the message",
        body: "We replaced feature language with the one outcome partners cared about: fewer emails, one shared record.",
      },
      {
        title: "Run a staged launch",
        body: "Ten pilot partners, then a regional wave, then the full network — each with its own landing page and email sequence.",
      },
      {
        title: "Build a content engine",
        body: "Templates and a monthly cadence let the internal team keep publishing without an agency retainer.",
      },
    ],
    highlights: [
      "Positioning doc adopted by product, sales, and support",
      "Three-stage launch with per-stage landing pages",
      "Email sequences written and automated",
      "Monthly reporting tied to activated partners, not impressions",
    ],
    gallery: [
      { pattern: "bars", label: "Launch waves", variant: 3 },
      { pattern: "grid", label: "Channel plan", variant: 0 },
    ],
    featured: false,
  },
  {
    slug: "verdant-growth",
    title: "Turning a design system into a growth story",
    client: "Verdant",
    year: 2023,
    pillar: "marketing",
    summary:
      "Verdant had rebuilt its product on a shared design system but had no story to tell about it. We packaged the work into a launch campaign that drove qualified demand.",
    services: ["Positioning", "Content engine", "Measurement"],
    stack: ["Next.js", "Storybook", "Turborepo", "Plausible"],
    cover: { pattern: "grid", label: "Verdant / growth", variant: 3 },
    metrics: [
      { label: "Demo requests", value: 62, suffix: "% lift" },
      { label: "Organic sessions", value: 2, suffix: ".8x" },
      { label: "Content pieces shipped", value: 24, suffix: "" },
    ],
    challenge:
      "The system work was real and expensive, but invisible to buyers. Marketing had no proof points and sales had no narrative.",
    approach: [
      {
        title: "Package the invisible",
        body: "We documented the migration as a case study with before/after build times and shipped it as the lead asset.",
      },
      {
        title: "Write for buyers, not engineers",
        body: "Technical work was translated into velocity and consistency claims that a product leader could repeat.",
      },
      {
        title: "Measure what matters",
        body: "Attribution moved from page views to demo requests, reviewed weekly against the content calendar.",
      },
    ],
    highlights: [
      "Flagship case study used as the primary sales asset",
      "24 content pieces shipped on a repeatable template",
      "Weekly measurement review tied to demo requests",
      "Narrative adopted across the sales deck and website",
    ],
    gallery: [
      { pattern: "arcs", label: "Content funnel", variant: 1 },
      { pattern: "cells", label: "Asset library", variant: 0 },
    ],
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

export const pillarLabels: Record<PillarKey, string> = {
  planning: "Planning → Establishment",
  build: "Design · Dev · Maintenance",
  marketing: "Marketing",
};
