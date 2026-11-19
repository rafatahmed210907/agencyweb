import type { Metadata, Viewport } from "next";
import { Figtree, Sora } from "next/font/google";
import { GsapProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { NoiseOverlay } from "@/components/fx/atmosphere";
import { Navbar } from "@/components/layout/navbar";
import { site } from "@/content/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050706",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital agency",
    "project planning",
    "product design",
    "web development",
    "maintenance",
    "marketing",
    "design systems",
    "Next.js development",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${figtree.variable} dark`}>
      <body className="antialiased">
        <GsapProvider>
          <TooltipProvider delayDuration={200}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring"
            >
              Skip to content
            </a>
            <Navbar />
            {children}
            <NoiseOverlay />
            <Toaster />
          </TooltipProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
