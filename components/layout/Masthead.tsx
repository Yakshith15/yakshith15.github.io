"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactLinks, navigation, siteConfig } from "@/lib/site-config";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Masthead() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <header className="masthead">
      <div className="masthead-main">
        <div className="masthead-name">
          <Link href="/">{siteConfig.author}</Link>
        </div>
        <p className="masthead-role">
          Software engineer · {siteConfig.currentLocation}
        </p>

        <nav className="masthead-nav">
          {navigation.map((item) =>
            item.newTab ? (
              <a
                key={item.name}
                href={item.url}
                className="masthead-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.url}
                className={`masthead-link ${isActive(item.url) ? "active" : ""}`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="masthead-contact">
          {contactLinks.map((contact) => (
            <a
              key={contact.text}
              href={contact.url}
              className="masthead-contact-item"
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
      </div>

      <div className="masthead-side">
        <Image
          src="/images/profile.jpg"
          alt={siteConfig.author}
          width={88}
          height={88}
          className="masthead-photo"
          priority
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
