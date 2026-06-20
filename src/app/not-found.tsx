import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "90px 0 120px", maxWidth: 760 }}>
      <span className="label label--red">Error 404</span>
      <h1 className="display" style={{ fontSize: "var(--fs-h1)", marginTop: 18 }}>
        This exhibit isn’t on the wall.
      </h1>
      <p className="lede" style={{ marginTop: 22, maxWidth: "52ch" }}>
        The page you’re looking for moved, never shipped, or never existed. Head
        back to the index and pick a different path.
      </p>
      <p style={{ marginTop: 32 }}>
        <Link
          className="link link--red mono"
          href="/"
          style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          ← Back to index
        </Link>
      </p>
    </section>
  );
}
