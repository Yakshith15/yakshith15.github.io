import Link from "next/link";
import Row from "@/components/Row";

export default function NotFound() {
  return (
    <Row className="not-found" label="404">
      <h1 className="page-title">Nothing here.</h1>
      <p>
        The page may have moved. <Link href="/">Start from the home page.</Link>
      </p>
    </Row>
  );
}
