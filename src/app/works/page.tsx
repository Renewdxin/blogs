import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { getWorks } from "../../lib/content";
import styles from "./works.module.css";

export const metadata: Metadata = {
  title: "Works",
  description: "Engineering work — backend systems, AI infrastructure, and product prototypes.",
};

export default function WorksPage() {
  const works = getWorks();
  return (
    <>
      <PageHeader
        label="Works Vitrine"
        meta={`${works.length} entries`}
        title="Experience records"
        lede="Role → System → Impact. Selected engineering work across backend infrastructure, AI systems, and full-stack product prototypes."
      />

      <section className={`container ${styles.works}`}>
        {works.map((w) => (
          <article key={w.slug} className={styles.work}>
            <div className={styles.num}>
              <span className="label label--ink">{w.data.number ?? "EXP."}</span>
              {w.data.year && <span className="label">{w.data.year}</span>}
            </div>
            <div>
              <h2 className={`serif ${styles.title}`}>
                <Link className="link" href={`/works/${w.slug}`}>
                  {w.data.title}
                </Link>
              </h2>
              <p className={styles.summary}>{w.data.summary}</p>
              {w.data.stack.length > 0 && (
                <ul className={styles.stack}>
                  {w.data.stack.map((s) => (
                    <li key={s} className={`mono ${styles.chip}`}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.go}>
              <Link className="link link--red mono" href={`/works/${w.slug}`}>
                Open ↗
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
