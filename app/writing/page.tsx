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
    <div className="blog-container">
      <h1>Writing</h1>
      {posts.length === 0 ? (
        <p>Nothing published yet.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.slug} className="post-item">
              <span className="post-date">{formatDate(post.date)}</span>
              <Link href={`/writing/${post.slug}/`} className="post-title">
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
