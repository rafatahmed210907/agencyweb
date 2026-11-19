export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export const site = {
  name: "Northlane",
  tagline: "Plan it. Build it. Grow it.",
  description:
    "Northlane is a digital studio taking products from planning and establishment through design, development and maintenance, then into market.",
  shortDescription: "Planning, build and marketing under one roof.",
  url: "https://northlane.studio",
  email: "hello@northlane.studio",
  location: "Remote · Working worldwide",
  availability: "Booking next quarter",
  availabilityDetail: "Two build slots open",
  founded: 2019,
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/#discover", sectionId: "discover" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process", sectionId: "process" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { label: "FAQ", href: "/#faq", sectionId: "faq" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Planning → Establishment", href: "/#services" },
      { label: "Design · Dev · Maintenance", href: "/#services" },
      { label: "Marketing", href: "/#services" },
      { label: "Engagements", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Process", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
      { label: "Tooling", href: "/#tooling" },
    ],
  },
] as const;
