export interface SubStep {
  title: string;
  body: string;
}

export interface Pillar {
  slug: "planning" | "build" | "marketing";
  index: "01" | "02" | "03";
  title: string;
  tagline: string;
  summary: string;
  subSteps: SubStep[];
  outcomes: string[];
  icon: "compass" | "layers" | "megaphone";
}

export const pillars: Pillar[] = [
  {
    slug: "planning",
    index: "01",
    title: "Project Planning → Establishment",
    tagline: "Decide what to build before writing code.",
    summary:
      "Most projects fail before the first commit: unclear scope, unowned decisions, and a stack nobody agreed on. We run the discovery, scope the work in writing, and stand the project up properly — repository, environments, and launch path included.",
    subSteps: [
      {
        title: "Discovery",
        body: "Stakeholder interviews, user and market research, and a written brief of the problem worth solving.",
      },
      {
        title: "Scope & roadmap",
        body: "A sequenced plan with fixed outcomes per phase, so trade-offs stay explicit instead of surfacing at launch.",
      },
      {
        title: "Architecture",
        body: "Stack selection, data model, and integration decisions documented before build begins.",
      },
      {
        title: "Establishment",
        body: "Repository, CI, environments, analytics, and a working deploy in week one — not month three.",
      },
    ],
    outcomes: ["Written brief", "Phased roadmap", "Architecture doc", "Live environment"],
    icon: "compass",
  },
  {
    slug: "build",
    index: "02",
    title: "Design · Development · Maintenance",
    tagline: "One team carries it from first frame to runtime.",
    summary:
      "Design and engineering sit in the same hands, so nothing is lost in a handoff file. We design in the browser, build in production code, then keep it healthy with a maintenance retainer after launch.",
    subSteps: [
      {
        title: "Design",
        body: "Flows, high-fidelity interface, and a token layer that maps directly to production components.",
      },
      {
        title: "Development",
        body: "Production code from week one, shipped behind your review process with weekly live demos.",
      },
      {
        title: "QA & hardening",
        body: "Accessibility, performance, and security passes before launch, with budgets we publish.",
      },
      {
        title: "Maintenance",
        body: "Ongoing releases, monitoring, dependency upkeep, and a support window you can plan around.",
      },
    ],
    outcomes: ["Component library", "Production build", "A11y audit", "Maintenance retainer"],
    icon: "layers",
  },
  {
    slug: "marketing",
    index: "03",
    title: "Marketing",
    tagline: "Ship it, then make sure the right people see it.",
    summary:
      "A good product that nobody can find is an unfinished product. We handle positioning, launch campaigns, and the content and measurement loops that keep acquisition moving after launch week.",
    subSteps: [
      {
        title: "Positioning",
        body: "Message architecture, ICP definition, and competitive framing that product and sales can both use.",
      },
      {
        title: "Launch",
        body: "Launch plan, landing pages, email sequences, and channel coordination for the release window.",
      },
      {
        title: "Content engine",
        body: "Repeatable content and social cadence with templates your team can run without an agency retainer.",
      },
      {
        title: "Measurement",
        body: "Analytics, attribution, and a weekly performance review tied to pipeline instead of impressions.",
      },
    ],
    outcomes: ["Positioning doc", "Launch campaign", "Content system", "Reporting dashboard"],
    icon: "megaphone",
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}
