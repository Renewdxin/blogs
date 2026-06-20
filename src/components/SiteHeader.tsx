"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "../lib/site";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const raw = usePathname() || "/";
  const path = raw.replace(/\/+$/, "") || "/";
  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={`${styles.brand} mono`} href="/" aria-label={site.author}>
          {site.brand}
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} mono ${isActive(item.href) ? styles.active : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <hr className="rule" />
    </header>
  );
}
