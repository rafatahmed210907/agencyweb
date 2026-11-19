export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "How do engagements usually start?",
    answer:
      "With a short paid discovery or a two-week Establish sprint. That gives both sides a real sample of working together before committing to a longer build.",
  },
  {
    question: "Can you take over a project that already exists?",
    answer:
      "Yes. We start with an audit of the codebase, the infrastructure, and the open decisions, then write the scope for taking it forward.",
  },
  {
    question: "Do you work with our existing team and repo?",
    answer:
      "Yes. We work in your repository, follow your review process, and join your standups. The goal is to leave your team stronger, not to create a dependency.",
  },
  {
    question: "What does maintenance actually cover?",
    answer:
      "Dependency and security updates, monitoring, bug fixes within an agreed window, and a monthly release slot. New feature work is scoped separately.",
  },
  {
    question: "Do you handle marketing without the build?",
    answer:
      "Sometimes. Positioning and launch work stand alone, but growth campaigns are much more effective when we already know the product.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You get a runbook, a recorded walkthrough, and a defined support window. Marketing and maintenance retainers are available if you want continued stewardship.",
  },
];
