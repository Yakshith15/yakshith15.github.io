import { links, siteConfig } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="colophon">
        Reach me by <a href={links.email}>email</a>, or on{" "}
        <a href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        and{" "}
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        .
      </p>
      <p className="colophon">
        © {new Date().getFullYear()} {siteConfig.author}
      </p>
    </footer>
  );
}
