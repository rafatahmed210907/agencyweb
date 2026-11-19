export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export const site = {
  name: "Northlane",
  tagline: "Software studio for ambitious products",
  description:
    "Northlane is a small, senior software studio building product interfaces, web platforms, and design systems for teams who care about craft.",
  shortDescription: "Product engineering and interface design studio.",
  url: "https://northlane.studio",
  email: "hello@northlane.studio",
  location: "Remote · Working worldwide",
  availability: "Booking projects for next quarter",
  availabilityDetail: "Two build slots open",
  founded: 2019,
  disclaimer:
    "Case studies, testimonials, and team profiles on this site are fictional sample content created for demonstration purposes.",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Process", href: "/#process", sectionId: "process" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
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
      { label: "Product design", href: "/#services" },
      { label: "Web platforms", href: "/#services" },
      { label: "Design systems", href: "/#services" },
      { label: "Engagements", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Process", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
      { label: "Stack", href: "/#stack" },
    ],
  },
] as const;
