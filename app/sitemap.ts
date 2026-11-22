import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

// The vault is deliberately absent: its notes are still outlines, and they
// stay out of search results until they are written up.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;
  const posts = getAllPosts();

  const pages = ["", "/projects"];
  if (posts.length > 0) pages.push("/writing");

  return [
    ...pages.map((page) => ({ url: `${base}${page}/` })),
    ...posts.map((post) => ({
      url: `${base}/writing/${post.slug}/`,
      lastModified: new Date(post.date),
    })),
  ];
}
