import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import VaultIndex, { vaultHref } from "@/components/VaultIndex";
import {
  getAllVaultSegments,
  getNoteAssetBase,
  getVaultNodeBySegments,
  getVaultNoteBySegments,
} from "@/lib/vault";

interface Props {
  params: { slug: string[] };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const { notes, folders } = getAllVaultSegments();
  return [...folders, ...notes].map((segments) => ({ slug: segments }));
}

export function generateMetadata({ params }: Props): Metadata {
  const note = getVaultNoteBySegments(params.slug);
  if (note) return { title: note.title, description: note.description, robots: { index: false } };
  const node = getVaultNodeBySegments(params.slug);
  return { title: node ? `${node.name} · Vault` : "Vault", robots: { index: false } };
}

function Crumbs({ segments }: { segments: string[] }) {
  const parents = segments.slice(0, -1);
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/vault/">Vault</Link>
      {parents.map((_, i) => {
        const prefix = parents.slice(0, i + 1);
        const node = getVaultNodeBySegments(prefix);
        return (
          <span key={prefix.join("/")}>
            {" / "}
            <Link href={vaultHref(prefix)}>{node?.name ?? prefix[i]}</Link>
          </span>
        );
      })}
    </nav>
  );
}

export default function VaultSlugPage({ params }: Props) {
  const { slug } = params;
  const note = getVaultNoteBySegments(slug);

  if (note) {
    const assetBase = getNoteAssetBase(note.fsSegments);

    // Obsidian embeds images by path relative to the note; the prebuild step
    // copies them under /vault-assets with the same folder layout.
    const VaultImg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      const src = typeof props.src === "string" ? props.src : "";
      const isAbsolute = /^(https?:)?\/\//.test(src) || src.startsWith("/");
      const resolved = !src || isAbsolute ? src : `${assetBase}${src.replace(/^\.?\//, "")}`;
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...props} src={resolved} />;
    };

    return (
      <article>
        <header className="article-head">
          <p className="meta">
            <Crumbs segments={slug} />
          </p>
          <h1 className="article-title">{note.title}</h1>
          {note.description && <p className="article-dek">{note.description}</p>}
        </header>
        <div className="prose">
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
  if (!node || node.type !== "folder") notFound();

  return (
    <>
      <header className="page-head">
        <p className="meta">
          <Crumbs segments={slug} />
        </p>
        <h1 className="page-title">{node.name}</h1>
      </header>
      <VaultIndex nodes={node.children} />
    </>
  );
}
