import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx";

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
    <article className="blog-post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="blog-meta">
          <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
        </div>
      </header>

      <div className="blog-content">
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
