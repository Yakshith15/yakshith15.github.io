"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactLinks, navigation, siteConfig } from "@/lib/site-config";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Rail() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <aside className="rail">
      <div className="rail-identity">
        <Link href="/" className="rail-photo-link" aria-label="Home">
          <Image
            src="/images/profile.jpg"
            alt={siteConfig.author}
            width={72}
            height={72}
            className="rail-photo"
            priority
          />
        </Link>
        <div>
          <div className="rail-name">
            <Link href="/">{siteConfig.author}</Link>
          </div>
          <div className="rail-role">{siteConfig.currentLocation}</div>
        </div>
      </div>

      <nav className="rail-nav">
        {navigation.map((item) =>
          item.newTab ? (
            <a
              key={item.name}
              href={item.url}
              className="rail-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              href={item.url}
              className={`rail-link ${isActive(item.url) ? "active" : ""}`}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>

      <div className="rail-contact">
        {contactLinks.map((contact) => (
          <a
            key={contact.text}
            href={contact.url}
            className="rail-contact-item"
            {...(contact.newTab || !contact.url.startsWith("mailto:")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Image
              src={contact.icon}
              alt=""
              width={13}
              height={13}
              className="contact-icon"
            />
            <span>
              {contact.url.startsWith("mailto:") ? "Email" : contact.text}
            </span>
          </a>
        ))}
      </div>

      <ThemeToggle />
    </aside>
  );
}
