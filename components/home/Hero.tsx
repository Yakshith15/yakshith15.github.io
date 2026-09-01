import { introParagraphs } from "@/lib/site-config";

function parseLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\{([^}]+)\}/g;
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkUrl = match[1];
    const linkText = match[2];
    parts.push(
      <a
        key={keyIndex++}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function Hero() {
  return (
    <section className="hero">
      {introParagraphs.map((paragraph, index) => (
        <p key={index} className="lede">
          {parseLinks(paragraph)}
        </p>
      ))}
    </section>
  );
}
