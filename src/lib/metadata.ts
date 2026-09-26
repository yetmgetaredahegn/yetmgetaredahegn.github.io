import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Full per-page metadata. Pages set openGraph and twitter in full because
 * Next.js replaces (does not merge) those objects from the layout.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title without the site name. Omit for the home page. */
  title?: string;
  description: string;
  /** Path with a trailing slash, e.g. "/work/foo/". */
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : site.seo.title;
  const image = { url: site.seo.ogImage, width: 1200, height: 630, alt: site.seo.ogImageAlt };
  return {
    title: title ?? { absolute: site.seo.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
