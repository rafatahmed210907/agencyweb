export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do engagements usually start?",
    answer:
      "Most start with a short paid discovery or a two-week design sprint. That gives both sides a real sample of working together before committing to a longer build.",
  },
  {
    question: "Do you work with our existing team and repo?",
    answer:
      "Yes. We work in your repository, follow your review process, and join your standups. The goal is to leave your team stronger, not to create a dependency.",
  },
  {
    question: "What does a typical build include?",
    answer:
      "Design direction, production frontend, a component library, integration with your APIs, accessibility and performance passes, and documentation for handoff.",
  },
  {
    question: "Can you take on backend work?",
    answer:
      "We handle typed APIs, schema design, auth, and background jobs in Node and Postgres. For heavier infrastructure we collaborate with your platform team.",
  },
  {
    question: "How do you handle timelines and scope?",
    answer:
      "Scope is fixed per sprint or per month with a written list of outcomes. Anything new goes into a visible backlog so the trade-off is explicit rather than silent.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get a runbook, a recorded walkthrough, and a defined support window. Ongoing retainers are available for teams that want continued stewardship.",
  },
];
