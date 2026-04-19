import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const vaultDir = path.join(projectRoot, "content", "vault");
const outDir = path.join(projectRoot, "public", "vault-assets");

const EXCLUDE_DIRS = new Set([".git", ".obsidian", ".trash"]);
const MD_EXT = /\.mdx?$/i;

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function walk(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") && EXCLUDE_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith(".")) continue;

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      walk(srcPath, destPath);
    } else if (entry.isFile() && !MD_EXT.test(entry.name)) {
      ensureDir(path.dirname(destPath));
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (!fs.existsSync(vaultDir)) {
  console.log("[copy-vault-assets] content/vault not present — skipping");
  process.exit(0);
}

rmrf(outDir);
ensureDir(outDir);
walk(vaultDir, outDir);
console.log(`[copy-vault-assets] copied non-markdown assets to ${path.relative(projectRoot, outDir)}`);
