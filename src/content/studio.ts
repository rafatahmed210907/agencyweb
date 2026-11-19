export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  initials: string;
  accent: string;
}

export const team: TeamMember[] = [
  {
    name: "Ada Okonjo",
    role: "Founder, Design",
    focus: "Product design · Systems",
    bio: "Fifteen years designing data-heavy interfaces, from trading terminals to developer consoles.",
    initials: "AO",
    accent: "from-lime/25 to-lime/5",
  },
  {
    name: "Bram de Vries",
    role: "Founder, Engineering",
    focus: "Architecture · Performance",
    bio: "Builds interfaces that stay fast under real load. Previously led frontend platform at two scale-ups.",
    initials: "BV",
    accent: "from-toxic/20 to-lime/5",
  },
  {
    name: "Ines Marchetti",
    role: "Principal Engineer",
    focus: "Realtime · Data",
    bio: "Specializes in streaming data models and the state machines that keep dashboards honest.",
    initials: "IM",
    accent: "from-lime-soft/25 to-lime/5",
  },
  {
    name: "Theo Lindqvist",
    role: "Design Engineer",
    focus: "Motion · Accessibility",
    bio: "Lives at the seam between design and code, where interaction detail becomes product quality.",
    initials: "TL",
    accent: "from-lime-dim/30 to-lime/5",
  },
];

export const values = [
  {
    title: "Plan before building",
    body: "Scope, architecture and success metrics are written down before a screen is designed. Ambiguity is the most expensive line item.",
  },
  {
    title: "Small and senior",
    body: "No handoffs to juniors. The people you meet in the first call are the people writing the code.",
  },
  {
    title: "One team, whole lifecycle",
    body: "Design, development, maintenance and marketing under one roof, so nothing is lost between vendors.",
  },
  {
    title: "Leave it owned",
    body: "Documentation, tests, and recorded walkthroughs are part of the deliverable, not an optional extra.",
  },
] as const;

export const milestones = [
  { year: "2019", title: "Two people, one repo", body: "Northlane starts as a design-and-build partnership for early-stage SaaS teams." },
  { year: "2021", title: "Planning practice", body: "Discovery and establishment work becomes a standalone engagement after three rescues in a row." },
  { year: "2023", title: "Marketing joins", body: "Launch and growth work is added so shipped products actually reach the people meant to use them." },
  { year: "2025", title: "Six senior specialists", body: "A deliberately small team running two to three engagements across the full lifecycle." },
] as const;
