export type ServiceIcon =
  | "layout"
  | "code"
  | "sparkles"
  | "layers"
  | "gauge"
  | "shield";

export interface Service {
  slug: string;
  title: string;
  summary: string;
  bullets: [string, string, string];
  icon: ServiceIcon;
  span: "wide" | "normal";
}

export const services: Service[] = [
  {
    slug: "product-design",
    title: "Product design",
    summary:
      "Interface design that survives contact with real data, real edge cases, and real users. We design in the browser, not just in a static frame.",
    bullets: [
      "UX flows, wireframes, and high-fidelity UI",
      "Interactive prototypes you can click",
      "Design tokens mapped to production code",
    ],
    icon: "layout",
    span: "wide",
  },
  {
    slug: "web-platforms",
    title: "Web platforms",
    summary:
      "Dashboards, portals, and multi-tenant SaaS built on a modern React stack with sensible defaults for scale.",
    bullets: [
      "Next.js App Router and React Server Components",
      "Typed APIs and schema-first data layers",
      "Auth, billing, and role-based access",
    ],
    icon: "code",
    span: "wide",
  },
  {
    slug: "design-systems",
    title: "Design systems",
    summary:
      "A component library your team actually wants to use, documented and versioned like a product.",
    bullets: ["Token architecture", "Accessible component primitives", "Adoption docs and code review"],
    icon: "layers",
    span: "normal",
  },
  {
    slug: "motion-engineering",
    title: "Motion engineering",
    summary:
      "Choreographed interaction: page transitions, scroll systems, and micro-feedback tuned to 60fps.",
    bullets: ["Motion specs and prototypes", "Scroll and gesture systems", "Reduced-motion parity"],
    icon: "sparkles",
    span: "normal",
  },
  {
    slug: "performance",
    title: "Performance work",
    summary:
      "Audits and rebuilds that turn a slow marketing site or heavy app shell into something that feels instant.",
    bullets: ["Core Web Vitals audits", "Bundle and render-path work", "Caching and image pipelines"],
    icon: "gauge",
    span: "normal",
  },
  {
    slug: "hardening",
    title: "Hardening & handoff",
    summary:
      "Accessibility, security headers, and observability so what we ship holds up after launch day.",
    bullets: ["WCAG review and fixes", "Secrets and header hygiene", "Runbooks and monitoring setup"],
    icon: "shield",
    span: "normal",
  },
];
