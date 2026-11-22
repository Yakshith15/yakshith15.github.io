// One line of the ledger: a key in the left gutter, content beside it.
export default function Row({
  label,
  children,
  className,
  id,
}: {
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={className ? `row ${className}` : "row"}>
      <div className="key">{label}</div>
      <div>{children}</div>
    </div>
  );
}
