import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

// A static export refuses a dynamic route with no params at all, so while
// nothing is published this emits one placeholder path, which renders 404.
const NOTHING_PUBLISHED = "_";

export function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) return [{ slug: NOTHING_PUBLISHED }];
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.description };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <header className="article-head">
        <p className="meta">
          <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
          {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
        </p>
        <h1 className="article-title">{post.title}</h1>
        {post.description && <p className="article-dek">{post.description}</p>}
      </header>

      <div className="prose">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </div>
    </article>
  );
}
