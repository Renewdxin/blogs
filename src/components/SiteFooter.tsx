import { socials, site } from "../lib/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <hr className="rule" />
        <div className={styles.inner}>
          <div>
            <p className={`display ${styles.name}`}>{site.brandShort}</p>
            <p className="label" style={{ marginTop: 10 }}>
              Engineering System · Est. {year}
            </p>
          </div>
          <nav className={styles.links} aria-label="Elsewhere">
            {socials.map((s) => (
              <a key={s.href} className={`link link--red mono ${styles.link}`} href={s.href}>
                {s.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className={`mono ${styles.meta}`}>
          <span>
            © {year} {site.author}
          </span>
          <span>Built with Next.js · Neon</span>
        </div>
      </div>
    </footer>
  );
}
