export interface StackGroup {
  title: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    title: "Interface",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "Radix UI", "Storybook"],
  },
  {
    title: "Platform",
    items: ["Node.js", "Postgres", "Prisma", "tRPC", "Zod", "Supabase", "Redis"],
  },
  {
    title: "Infrastructure",
    items: ["Vercel", "Cloudflare", "Docker", "GitHub Actions", "Playwright", "Sentry"],
  },
  {
    title: "Design",
    items: ["Figma", "Design tokens", "WCAG 2.2", "Prototyping", "Motion specs"],
  },
];
