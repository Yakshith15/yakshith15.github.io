import crypto from "crypto";
import fs from "fs";
import path from "path";
import { links } from "@/lib/site-config";

// The résumé link carries a fingerprint of the PDF, so a rebuilt PDF gets a
// new URL and browsers can't keep showing a cached copy of the old one.
// Server-only: reads the file at build time.
export function resumeHref(): string {
  const file = path.join(process.cwd(), "public", links.resume);
  if (!fs.existsSync(file)) return links.resume;
  const hash = crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
  return `${links.resume}?v=${hash}`;
}
