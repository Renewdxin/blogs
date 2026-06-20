import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import Prose from "../../components/Prose";
import { getNotes } from "../../lib/content";
import { fmtDateTime } from "../../lib/format";
import styles from "./notes.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "碎碎念 — short notes, threads, and working fragments.",
};

export default function NotesPage() {
  const notes = getNotes();
  return (
    <>
      <PageHeader
        label="Fragments"
        meta="碎碎念"
        title="Notes"
        lede="Short threads and working fragments — the in-between thinking that doesn't need a full article."
      />

      <section className={`container ${styles.thread}`}>
        {notes.map((n) => (
          <article key={n.slug} id={n.slug} className={styles.note}>
            <div className={styles.rail}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.line} aria-hidden="true" />
            </div>
            <div className={styles.main}>
              <div className={styles.head}>
                <time className={`mono ${styles.time}`} dateTime={n.data.date}>
                  {fmtDateTime(n.data.date)}
                </time>
                {n.data.pinned && <span className="label label--red">Pinned</span>}
                <Link className={`mono ${styles.permalink}`} href={`/notes/${n.slug}`} aria-label="Permalink">
                  #
                </Link>
              </div>
              {n.data.title && <h2 className={`serif ${styles.title}`}>{n.data.title}</h2>}
              <div className={styles.body}>
                <Prose>{n.body}</Prose>
              </div>
              {n.data.tags.length > 0 && (
                <ul className={styles.tags}>
                  {n.data.tags.map((t) => (
                    <li key={t} className={`mono ${styles.tag}`}>
                      #{t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
        {notes.length === 0 && <p className={`muted ${styles.empty}`}>No notes yet.</p>}
      </section>
    </>
  );
}
