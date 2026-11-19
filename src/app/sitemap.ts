import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const workRoutes = caseStudies.map((study) => ({
    url: `${site.url}/work/${study.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
