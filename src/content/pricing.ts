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
    id: "sprint",
    name: "Design sprint",
    price: "$6k",
    cadence: "per sprint",
    summary: "A focused two-week engagement to de-risk a direction before you commit to a build.",
    features: [
      "Two-week fixed scope",
      "Flow and UI prototypes",
      "Clickable prototype in the browser",
      "Recorded review and handoff",
    ],
    cta: "Start a sprint",
    highlighted: false,
  },
  {
    id: "build",
    name: "Product build",
    price: "$18k",
    cadence: "per month",
    summary: "Our main engagement: a dedicated senior squad shipping production code alongside your team.",
    features: [
      "Dedicated design and engineering",
      "Weekly live demos",
      "Design system and component library",
      "Accessibility and performance budgets",
      "Async communication in your tools",
    ],
    cta: "Book a build slot",
    highlighted: true,
    badge: "Most common",
  },
  {
    id: "partner",
    name: "Studio partner",
    price: "Custom",
    cadence: "quarterly",
    summary: "An embedded long-term partner for teams with a continuous roadmap and multiple surfaces.",
    features: [
      "Rolling quarterly roadmap",
      "Multiple concurrent workstreams",
      "Design system stewardship",
      "Hiring and code review support",
      "Priority scheduling",
    ],
    cta: "Talk about a partnership",
    highlighted: false,
  },
];
