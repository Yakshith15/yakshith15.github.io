"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function SiteHeader({
  hasWriting,
  resumeHref,
}: {
  hasWriting: boolean;
  resumeHref: string;
}) {
  const pathname = usePathname();

  const nav = [{ name: "Projects", href: "/projects/" }];
  if (hasWriting) nav.push({ name: "Writing", href: "/writing/" });

  return (
    <header className="site-header">
      <div>
        <Link href="/" className="site-name">
          {siteConfig.author}
        </Link>
        <p className="meta site-role">Software engineer · {siteConfig.location}</p>
      </div>

      <nav className="site-nav" aria-label="Site">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname.startsWith(item.href) ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
        <a href={resumeHref} target="_blank" rel="noopener noreferrer">
          Résumé ↗
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
