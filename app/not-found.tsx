import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="meta">404</p>
      <h1 className="page-title">Nothing here.</h1>
      <p>
        The page may have moved. <Link href="/">Start from the home page.</Link>
      </p>
    </div>
  );
}
