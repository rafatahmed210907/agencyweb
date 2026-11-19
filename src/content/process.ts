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
      "We start with the decision you are trying to make possible, not the screen that shows it. A short discovery sprint produces a shared map of users, constraints, and the riskiest assumptions.",
    deliverables: ["Discovery notes", "Success metrics", "Scope and risk map"],
  },
  {
    index: "02",
    title: "Shape",
    description:
      "Flows and interfaces get built in the browser as clickable prototypes, so we are reviewing behavior instead of debating static pictures.",
    deliverables: ["Flow prototypes", "UI direction", "Token draft"],
  },
  {
    index: "03",
    title: "Build",
    description:
      "Production code from day one, in your repo, behind your review process. Weekly demos on a live URL replace status documents.",
    deliverables: ["Working build", "Component library", "Integration docs"],
  },
  {
    index: "04",
    title: "Harden",
    description:
      "Accessibility, performance, and observability passes before launch. Then a handoff that leaves your team owning the code with confidence.",
    deliverables: ["A11y audit", "Performance budget", "Runbook and handoff"],
  },
];
