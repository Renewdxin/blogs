import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import Prose from "../../components/Prose";
import NoteComposer from "../../components/NoteComposer";
import NoteDelete from "../../components/NoteDelete";
import { getDbNotes } from "../../lib/db";
import { fmtDateTime } from "../../lib/format";
import styles from "./notes.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "碎碎念 — short notes, threads, and working fragments.",
};

// Always render fresh from the database so new notes appear instantly.
export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const notes = await getDbNotes();

  return (
    <>
      <PageHeader
        label="Fragments"
        meta="碎碎念"
        title="Notes"
        lede="Short threads and working fragments — the in-between thinking that doesn't need a full article."
      />

      <section className={`container ${styles.thread}`}>
        <NoteComposer />

        {notes.map((n) => (
          <article key={n.id} id={n.slug} className={styles.note}>
            <div className={styles.rail}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.line} aria-hidden="true" />
            </div>
            <div className={styles.main}>
              <div className={styles.head}>
                <time className={`mono ${styles.time}`} dateTime={n.created_at}>
                  {fmtDateTime(n.created_at)}
                </time>
                {n.pinned && <span className="label label--red">Pinned</span>}
                <Link className={`mono ${styles.permalink}`} href={`/notes/${n.slug}`} aria-label="Permalink">
                  #
                </Link>
                <NoteDelete id={n.id} />
              </div>
              {n.title && <h2 className={`serif ${styles.title}`}>{n.title}</h2>}
              <div className={styles.body}>
                <Prose>{n.body}</Prose>
              </div>
              {n.tags.length > 0 && (
                <ul className={styles.tags}>
                  {n.tags.map((t) => (
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
