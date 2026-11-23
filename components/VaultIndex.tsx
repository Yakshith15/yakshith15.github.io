import Link from "next/link";
import type { VaultNode } from "@/lib/vault";

export function vaultHref(segments: string[]): string {
  return `/vault/${segments.map(encodeURIComponent).join("/")}/`;
}

export default function VaultIndex({ nodes }: { nodes: VaultNode[] }) {
  if (nodes.length === 0) {
    return <p className="muted section">Nothing here yet.</p>;
  }

  return (
    <ul className="index-list">
      {nodes.map((node) => (
        <li key={node.segments.join("/")} className="line">
          <Link href={vaultHref(node.segments)} className="index-title">
            {node.type === "folder" ? `${node.name}/` : node.title}
          </Link>
          <span className="meta">
            {node.type === "folder"
              ? `${node.children.length} ${node.children.length === 1 ? "item" : "items"}`
              : node.date}
          </span>
        </li>
      ))}
    </ul>
  );
}
