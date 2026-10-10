import type { MetadataRoute } from "next";
import { apps } from "@/config/apps";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...apps.map((app) => ({
      url: `${siteUrl}/${app.slug}`,
      lastModified: app.versions[0]?.releaseDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
