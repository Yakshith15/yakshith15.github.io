import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { vaultConfig } from "./vault-config";

const vaultDirectory = path.join(process.cwd(), "content/vault");

export interface VaultNote {
  type: "note";
  name: string;
  slug: string;
  segments: string[];
  fsSegments: string[];
  title: string;
  description?: string;
  date?: string;
}

export interface VaultFolder {
  type: "folder";
  name: string;
  slug: string;
  segments: string[];
  fsSegments: string[];
  children: VaultNode[];
}

export type VaultNode = VaultNote | VaultFolder;

export interface VaultNoteFull extends VaultNote {
  body: string;
  fsPath: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function globToRegex(pattern: string): RegExp {
  const DOUBLE = "\u0000DS\u0000";
  const escaped = pattern
    .replace(/\*\*/g, DOUBLE)
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, "[^/]*")
    .replace(new RegExp(DOUBLE, "g"), ".*");
  return new RegExp(`^${escaped}$`);
}

function isExcluded(relPath: string): boolean {
  const normalized = relPath.split(path.sep).join("/");
  return vaultConfig.excludePatterns.some((p) => globToRegex(p).test(normalized));
}

function isIncluded(relPath: string): boolean {
  if (vaultConfig.includeFolders.length === 0) return true;
  const top = relPath.split(path.sep)[0];
  return vaultConfig.includeFolders.includes(top);
}

function stringifyDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return String(value);
}

function readFrontmatter(fileContents: string): { data: Record<string, unknown>; content: string } {
  try {
    const parsed = matter(fileContents);
    return { data: parsed.data as Record<string, unknown>, content: parsed.content };
  } catch {
    return { data: {}, content: fileContents };
  }
}

function fileNameToBase(fileName: string): string {
  return fileName.replace(/\.mdx?$/, "");
}

function buildTree(
  dir: string,
  slugSegments: string[],
  fsSegments: string[]
): VaultNode[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: VaultNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const absPath = path.join(dir, entry.name);
    const relFromVault = path.relative(vaultDirectory, absPath);

    if (isExcluded(relFromVault)) continue;
    if (!isIncluded(relFromVault)) continue;

    if (entry.isDirectory()) {
      const slug = slugify(entry.name);
      if (!slug) continue;
      const childSlug = [...slugSegments, slug];
      const childFs = [...fsSegments, entry.name];
      const children = buildTree(absPath, childSlug, childFs);
      if (children.length === 0) continue;
      nodes.push({
        type: "folder",
        name: entry.name,
        slug,
        segments: childSlug,
        fsSegments: childFs,
        children,
      });
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
      const base = fileNameToBase(entry.name);
      const slug = slugify(base);
      if (!slug) continue;
      const contents = fs.readFileSync(absPath, "utf8");
      const { data } = readFrontmatter(contents);
      nodes.push({
        type: "note",
        name: base,
        slug,
        segments: [...slugSegments, slug],
        fsSegments: [...fsSegments, entry.name],
        title: (data.title as string) || base,
        description: data.description as string | undefined,
        date: stringifyDate(data.date),
      });
    }
  }

  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return nodes;
}

export function getVaultTree(): VaultNode[] {
  return buildTree(vaultDirectory, [], []);
}

export function getVaultNodeBySegments(segments: string[]): VaultNode | null {
  let level = getVaultTree();
  let current: VaultNode | null = null;
  for (const seg of segments) {
    const match: VaultNode | undefined = level.find((n) => n.slug === seg);
    if (!match) return null;
    current = match;
    level = match.type === "folder" ? match.children : [];
  }
  return current;
}

export function getVaultNoteBySegments(segments: string[]): VaultNoteFull | null {
  const node = getVaultNodeBySegments(segments);
  if (!node || node.type !== "note") return null;
  const fsPath = path.join(vaultDirectory, ...node.fsSegments);
  if (!fs.existsSync(fsPath)) return null;
  const contents = fs.readFileSync(fsPath, "utf8");
  const { data, content } = readFrontmatter(contents);
  return {
    ...node,
    title: (data.title as string) || node.name,
    description: data.description as string | undefined,
    date: stringifyDate(data.date),
    body: content,
    fsPath,
  };
}

function walkAllSegments(nodes: VaultNode[], acc: { notes: string[][]; folders: string[][] }) {
  for (const node of nodes) {
    if (node.type === "note") {
      acc.notes.push(node.segments);
    } else {
      acc.folders.push(node.segments);
      walkAllSegments(node.children, acc);
    }
  }
}

export function getAllVaultSegments(): { notes: string[][]; folders: string[][] } {
  const acc = { notes: [] as string[][], folders: [] as string[][] };
  walkAllSegments(getVaultTree(), acc);
  return acc;
}

export function getNoteAssetBase(fsSegments: string[]): string {
  const dir = fsSegments.slice(0, -1);
  if (dir.length === 0) return "/vault-assets/";
  return `/vault-assets/${dir.map(encodeURIComponent).join("/")}/`;
}
