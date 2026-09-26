import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...site.caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}/`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
