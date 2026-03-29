import type { MetadataRoute } from "next";
import { listPublishedGallerySitemapEntries } from "@/lib/admin/gallery-list";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const staticRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/events",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/gallery",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/telegram",
    changeFrequency: "monthly",
    priority: 0.6,
  },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const galleryEntries = await listPublishedGallerySitemapEntries().catch(() => []);

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...galleryEntries.map((entry) => ({
      url: absoluteUrl(`/gallery/${entry.id}`),
      lastModified: new Date(entry.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
