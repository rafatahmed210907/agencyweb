export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Frame",
    description:
      "We start with the decision you are trying to make possible, not the screen that shows it. A discovery sprint produces a shared map of users, constraints, and the riskiest assumptions.",
    deliverables: ["Discovery notes", "Success metrics", "Scope and risk map"],
  },
  {
    index: "02",
    title: "Establish",
    description:
      "Architecture, stack, and environments are settled and stood up. You get a working deploy in the first week, so every later conversation happens against real infrastructure.",
    deliverables: ["Architecture doc", "Live environment", "Phased roadmap"],
  },
  {
    index: "03",
    title: "Build",
    description:
      "Design and engineering run together in production code. Weekly live demos replace status documents, and scope changes are written down with their cost.",
    deliverables: ["Design direction", "Working build", "Component library"],
  },
  {
    index: "04",
    title: "Grow",
    description:
      "We harden what shipped, then carry it into market and keep it running: accessibility and performance passes, launch campaign, and a maintenance retainer.",
    deliverables: ["A11y + perf audit", "Launch campaign", "Maintenance retainer"],
  },
];
