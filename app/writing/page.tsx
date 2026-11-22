import Link from "next/link";
import type { Metadata } from "next";
import Row from "@/components/Row";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Long-form notes on things I have built and what they taught me.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <Row className="page-head">
        <h1 className="page-title">Writing</h1>
        <p className="page-intro">Notes on things I have built and what they taught me.</p>
      </Row>

      <section className="section">
        {posts.length === 0 ? (
          <Row>
            <p className="muted">Nothing published yet.</p>
          </Row>
        ) : (
          <ul className="index-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Row label={<time dateTime={post.date}>{formatDate(post.date)}</time>}>
                  <Link href={`/writing/${post.slug}/`} className="index-title">
                    {post.title}
                  </Link>
                  {post.description && <p className="index-desc">{post.description}</p>}
                </Row>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
