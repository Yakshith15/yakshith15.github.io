interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

// An aside set off from the running text, for a caveat or a result worth
// pausing on. Styled in globals.css so it follows the theme.
export default function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="callout">
      {title && <p className="callout-title">{title}</p>}
      {children}
    </aside>
  );
}
