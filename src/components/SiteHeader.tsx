import Link from "next/link";
import { site } from "../lib/site";
import styles from "./SiteHeader.module.css";

// Exact recreation of the "Museum Header" — brand left, INDEX / WORKS / CONTACT right.
const links = [
  { label: "INDEX", href: "/" },
  { label: "WORKS", href: "/works" },
  { label: "CONTACT", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className={`container ${styles.header}`}>
      <Link className={styles.brand} href="/">
        {site.brand}
      </Link>
      <nav className={styles.links} aria-label="Primary">
        {links.map((l) => (
          <Link key={l.href} className={styles.link} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
