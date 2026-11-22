import type { Metadata } from "next";
import Row from "@/components/Row";
import VaultIndex from "@/components/VaultIndex";
import { getVaultTree } from "@/lib/vault";

// Not linked from the nav or listed in the sitemap: these are reading notes
// in progress, synced from the Obsidian repo on every push to it.
export const metadata: Metadata = {
  title: "Vault",
  description: "Reading notes synced from my Obsidian vault.",
  robots: { index: false },
};

export default function VaultPage() {
  return (
    <>
      <Row className="page-head">
        <h1 className="page-title">Vault</h1>
        <p className="page-intro">
          Reading notes on papers and books, synced from my{" "}
          <a href="https://github.com/yakshith15/obsidian" target="_blank" rel="noopener noreferrer">
            Obsidian vault
          </a>
          .
        </p>
      </Row>
      <section className="section">
        <VaultIndex nodes={getVaultTree()} />
      </section>
    </>
  );
}
