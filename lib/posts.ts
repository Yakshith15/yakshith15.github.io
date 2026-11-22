import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

// Drafts (`hidden: true`) render in `next dev` so they can be previewed, and
// are left out of production builds entirely: no page, no feed entry, no
// sitemap URL.
const showDrafts = process.env.NODE_ENV === "development";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  hidden: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

function readPost(fileName: string): Post {
  const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: fileName.replace(/\.mdx?$/, ""),
    title: String(data.title ?? ""),
    date: toDateString(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: data.description ? String(data.description) : undefined,
    hidden: data.hidden === true,
    content,
  };
}

function loadPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => /\.mdx?$/.test(name))
    .map(readPost)
    .filter((post) => showDrafts || !post.hidden)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPosts(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return loadPosts().map(({ content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  return loadPosts().find((post) => post.slug === slug) ?? null;
}

export function formatDate(date: string, style: "short" | "long" = "short"): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
  });
}
