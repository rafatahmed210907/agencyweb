import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Route-level metadata. `title` is intentionally unprefixed — the root layout
 * adds "— Northlane" via its template, so pages never double the brand name.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const resolvedTitle = title ?? `${site.name} — ${site.tagline}`;
  const resolvedDescription = description ?? site.description;
  const url = new URL(path, site.url).toString();

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: title ? `${title} — ${site.name}` : resolvedTitle,
      description: resolvedDescription,
      images: image ? [{ url: image, width: 1200, height: 630, alt: resolvedTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} — ${site.name}` : resolvedTitle,
      description: resolvedDescription,
    },
  };
}
