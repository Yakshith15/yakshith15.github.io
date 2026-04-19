import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";
import {
  getAllVaultSegments,
  getVaultNodeBySegments,
  getVaultNoteBySegments,
  getNoteAssetBase,
  type VaultNode,
} from "@/lib/vault";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const { notes, folders } = getAllVaultSegments();
  return [...folders, ...notes].map((segments) => ({ slug: segments }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getVaultNoteBySegments(slug);
  if (note) {
    return { title: note.title, description: note.description };
  }
  const folder = getVaultNodeBySegments(slug);
  if (folder && folder.type === "folder") {
    return { title: `${folder.name} — Vault` };
  }
  return { title: "Vault" };
}

function segmentsToHref(segments: string[]): string {
  return `/vault/${segments.map(encodeURIComponent).join("/")}/`;
}

function Breadcrumbs({ segments }: { segments: string[] }) {
  const crumbs = segments.map((_seg, i) => {
    const prefix = segments.slice(0, i + 1);
    const node = getVaultNodeBySegments(prefix);
    return {
      label: node?.name ?? prefix[prefix.length - 1],
      href: segmentsToHref(prefix),
    };
  });
  return (
    <nav className="blog-meta" aria-label="Breadcrumb">
      <Link href="/vault/">Vault</Link>
      {crumbs.map((c, i) => (
        <span key={c.href}>
          {" / "}
          {i === crumbs.length - 1 ? <span>{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
        </span>
      ))}
    </nav>
  );
}

function FolderIndex({
  segments,
  displayName,
  children,
}: {
  segments: string[];
  displayName: string;
  children: VaultNode[];
}) {
  return (
    <div className="blog-container">
      <Breadcrumbs segments={segments} />
      <h1>{displayName}</h1>
      {children.length === 0 ? (
        <p>
          <em>This folder is empty.</em>
        </p>
      ) : (
        <ul className="post-list">
          {children.map((node) => (
            <li key={node.segments.join("/")} className="post-item">
              <Link href={segmentsToHref(node.segments)} className="post-title">
                {node.type === "folder" ? `${node.name}/` : node.name}
              </Link>
              {node.type === "folder" && (
                <span className="post-date">
                  {node.children.length} item{node.children.length === 1 ? "" : "s"}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function VaultSlugPage({ params }: Props) {
  const { slug } = await params;

  const note = getVaultNoteBySegments(slug);
  if (note) {
    const assetBase = getNoteAssetBase(note.fsSegments);

    const VaultImg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const src = typeof props.src === "string" ? props.src : "";
      const isAbsolute = /^(https?:)?\/\//.test(src) || src.startsWith("/");
      const resolved = !src || isAbsolute ? src : `${assetBase}${src.replace(/^\.?\//, "")}`;
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...props} src={resolved} />;
    };

    return (
      <article className="blog-post">
        <header className="post-header">
          <Breadcrumbs segments={slug} />
          <h1 className="post-title">{note.title}</h1>
          {note.date && (
            <div className="blog-meta">
              <time dateTime={note.date}>{note.date}</time>
            </div>
          )}
        </header>

        <div className="blog-content">
          <MDXRemote
            source={note.body}
            components={{ img: VaultImg }}
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

  const node = getVaultNodeBySegments(slug);
  if (node && node.type === "folder") {
    return <FolderIndex segments={slug} displayName={node.name} children={node.children} />;
  }

  notFound();
}
