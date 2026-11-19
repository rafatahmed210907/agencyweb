export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "establish",
    name: "Establish",
    price: "$6k",
    cadence: "per sprint",
    summary: "A focused two-week engagement to plan the project and stand it up before you commit to a build.",
    features: [
      "Discovery workshops",
      "Written scope and roadmap",
      "Architecture and stack decisions",
      "Repository, CI and live environment",
    ],
    cta: "Start with planning",
    highlighted: false,
  },
  {
    id: "build",
    name: "Build",
    price: "$18k",
    cadence: "per month",
    summary: "Our main engagement: design, development and hardening in one team, shipping production code weekly.",
    features: [
      "Design and engineering together",
      "Weekly live demos",
      "Design system and component library",
      "Accessibility and performance budgets",
      "Post-launch maintenance window",
    ],
    cta: "Book a build slot",
    highlighted: true,
    badge: "Most common",
  },
  {
    id: "growth",
    name: "Growth",
    price: "Custom",
    cadence: "quarterly",
    summary: "Marketing layered on top of the build: positioning, launch, content, and measurement.",
    features: [
      "Positioning and message architecture",
      "Launch campaign and landing pages",
      "Content engine your team can run",
      "Attribution and weekly reporting",
      "Priority scheduling",
    ],
    cta: "Talk about growth",
    highlighted: false,
  },
];
