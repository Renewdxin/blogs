import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { site, socials } from "../../lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start deployment — résumé, email, and repository links.",
};

const channels = [
  {
    k: "Email",
    v: site.email,
    href: `mailto:${site.email}`,
    note: "Best for project + collaboration enquiries.",
  },
  {
    k: "GitHub",
    v: "github.com/Renewdxin",
    href: "https://github.com/Renewdxin",
    note: "Code, repositories, and open work.",
  },
  {
    k: "Résumé",
    v: "Download PDF",
    href: "/resume.pdf",
    note: "Full engineering record — replace before launch.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Closing Plaque"
        meta="Conversion Paths"
        title="Start deployment / contact"
        lede="Use the résumé, email, or repository links as conversion paths. Replace placeholders with final documents and live addresses before launch."
      />

      <section className={`container ${styles.contact}`}>
        <div>
          {channels.map((c) => (
            <a key={c.k} className={styles.channel} href={c.href}>
              <span className={`label label--ink ${styles.channelK}`}>{c.k}</span>
              <span className={`serif ${styles.channelV}`}>{c.v}</span>
              <span className={styles.channelNote}>{c.note}</span>
              <span className={`mono ${styles.channelArrow}`} aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>

        <aside className={styles.aside}>
          <span className="label label--red">Availability</span>
          <p className="lede">
            Open to backend, AI-infrastructure, and full-stack engineering work.
            Async-friendly, terminal-first, and biased toward systems that ship.
          </p>
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.href}>
                <a className="link link--red mono" href={s.href}>
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
