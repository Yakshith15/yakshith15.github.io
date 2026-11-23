import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form notes on things I have built and what they taught me.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Writing</h1>
        <p className="page-intro">Notes on things I have built and what they taught me.</p>
      </header>

      {posts.length === 0 ? (
        <p className="muted section">Nothing published yet.</p>
      ) : (
        <ul className="index-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="line">
                <Link href={`/writing/${post.slug}/`} className="index-title">
                  {post.title}
                </Link>
                <time className="meta" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
              {post.description && <p className="index-desc">{post.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
