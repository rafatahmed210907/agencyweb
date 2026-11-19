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
    accent: "from-violet/30 to-indigo/10",
  },
  {
    name: "Bram de Vries",
    role: "Founder, Engineering",
    focus: "Architecture · Performance",
    bio: "Builds interfaces that stay fast under real load. Previously led frontend platform at two scale-ups.",
    initials: "BV",
    accent: "from-cyan/25 to-violet/10",
  },
  {
    name: "Ines Marchetti",
    role: "Principal Engineer",
    focus: "Realtime · Data",
    bio: "Specializes in streaming data models and the state machines that keep dashboards honest.",
    initials: "IM",
    accent: "from-indigo/30 to-cyan/10",
  },
  {
    name: "Theo Lindqvist",
    role: "Design Engineer",
    focus: "Motion · Accessibility",
    bio: "Lives at the seam between design and code, where interaction detail becomes product quality.",
    initials: "TL",
    accent: "from-violet-soft/25 to-indigo/10",
  },
];

export const values = [
  {
    title: "Design in the browser",
    body: "Static frames hide the hard parts. We prototype real behavior early so decisions are made against something that runs.",
  },
  {
    title: "Small and senior",
    body: "No handoffs to juniors. The people you meet in the first call are the people writing the code.",
  },
  {
    title: "Explicit trade-offs",
    body: "Every scope change gets written down with its cost. You will never find out about a trade-off after launch.",
  },
  {
    title: "Leave it owned",
    body: "Documentation, tests, and recorded walkthroughs are part of the deliverable, not an optional extra.",
  },
] as const;

export const milestones = [
  { year: "2019", title: "Two people, one repo", body: "Northlane starts as a design-and-build partnership for early-stage SaaS teams." },
  { year: "2021", title: "First platform rebuild", body: "A telemetry console rebuild establishes the studio's data-interface practice." },
  { year: "2023", title: "Design systems practice", body: "Four product teams standardize on components the studio built and documented." },
  { year: "2025", title: "Six senior specialists", body: "A deliberately small team shipping two to three concurrent engagements." },
] as const;
