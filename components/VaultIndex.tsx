import Link from "next/link";
import Row from "@/components/Row";
import type { VaultNode } from "@/lib/vault";

export function vaultHref(segments: string[]): string {
  return `/vault/${segments.map(encodeURIComponent).join("/")}/`;
}

export default function VaultIndex({ nodes }: { nodes: VaultNode[] }) {
  if (nodes.length === 0) {
    return (
      <Row>
        <p className="muted">Nothing here yet.</p>
      </Row>
    );
  }

  return (
    <ul className="index-list">
      {nodes.map((node) => (
        <li key={node.segments.join("/")}>
          <Row
            label={
              node.type === "folder"
                ? `${node.children.length} ${node.children.length === 1 ? "item" : "items"}`
                : node.date
            }
          >
            <Link href={vaultHref(node.segments)} className="index-title">
              {node.type === "folder" ? `${node.name}/` : node.title}
            </Link>
          </Row>
        </li>
      ))}
    </ul>
  );
}
