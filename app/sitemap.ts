import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAllVaultSegments } from "@/lib/vault";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const now = new Date();

  const staticRoutes = ["", "/projects", "/blog", "/tags", "/vault"].map((path) => ({
    url: `${base}${path}/`,
    lastModified: now,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const tags = getAllTags().map((tag) => ({
    url: `${base}/tags/${tag.slug}/`,
    lastModified: now,
  }));

  const { notes, folders } = getAllVaultSegments();
  const vault = [...notes, ...folders].map((segments) => ({
    url: `${base}/vault/${segments.join("/")}/`,
    lastModified: now,
  }));

  return [...staticRoutes, ...posts, ...tags, ...vault];
}
