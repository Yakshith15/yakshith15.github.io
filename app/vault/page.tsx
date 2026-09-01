import Link from "next/link";
import { getVaultTree, type VaultNode } from "@/lib/vault";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault",
  description: "Notes from my Obsidian vault, synced automatically.",
};

function segmentsToHref(segments: string[]): string {
  return `/vault/${segments.map(encodeURIComponent).join("/")}/`;
}

function NodeRow({ node }: { node: VaultNode }) {
  return (
    <li className="post-item">
      <Link href={segmentsToHref(node.segments)} className="post-title">
        {node.type === "folder" ? `${node.name}/` : node.name}
      </Link>
      {node.type === "folder" && (
        <span className="post-date">
          {node.children.length} item{node.children.length === 1 ? "" : "s"}
        </span>
      )}
    </li>
  );
}

export default function VaultPage() {
  const tree = getVaultTree();

  return (
    <div className="blog-container">
      <h1>Vault</h1>
      <p>
        Notes synced from my{" "}
        <a href="https://github.com/yakshith15/obsidian" target="_blank" rel="noopener noreferrer">
          Obsidian vault
        </a>
        . Organized by folder, mirroring the source.
      </p>

      {tree.length === 0 ? (
        <p>
          <em>Vault is empty. The Obsidian repo hasn&apos;t been synced yet.</em>
        </p>
      ) : (
        <ul className="post-list">
          {tree.map((node) => (
            <NodeRow key={node.segments.join("/")} node={node} />
          ))}
        </ul>
      )}
    </div>
  );
}
