import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Prose from "../../../components/Prose";
import { getNotes, getNote } from "../../../lib/content";
import { fmtDateTime } from "../../../lib/format";
import styles from "./note.module.css";

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return {};
  return {
    title: n.data.title ?? "Note",
    description: n.data.title ?? n.body.trim().slice(0, 140),
  };
}

export default async function NoteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getNote(slug);
  if (!entry) notFound();
  const d = entry.data;

  return (
    <article className={`container ${styles.detail}`}>
      <Link className={`link mono ${styles.back}`} href="/notes">
        ← Notes
      </Link>

      <div className={styles.top}>
        <time className="label" dateTime={d.date}>
          {fmtDateTime(d.date)}
        </time>
        {d.pinned && <span className="label label--red">Pinned</span>}
      </div>

      {d.title && <h1 className={`display ${styles.title}`}>{d.title}</h1>}

      <div className={styles.body}>
        <Prose>{entry.body}</Prose>
      </div>

      {d.tags.length > 0 && (
        <ul className={styles.tags}>
          {d.tags.map((t) => (
            <li key={t} className={`mono ${styles.tag}`}>
              #{t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
