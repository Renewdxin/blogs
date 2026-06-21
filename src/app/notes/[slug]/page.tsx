import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Prose from "../../../components/Prose";
import { getDbNote } from "../../../lib/db";
import { fmtDateTime } from "../../../lib/format";
import styles from "./note.module.css";

// Notes are dynamic (DB-backed) — resolve each permalink at request time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = await getDbNote(slug);
  if (!n) return {};
  return {
    title: n.title ?? "Note",
    description: n.title ?? n.body.trim().slice(0, 140),
  };
}

export default async function NoteDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = await getDbNote(slug);
  if (!n) notFound();

  return (
    <article className={`container ${styles.detail}`}>
      <Link className={`link mono ${styles.back}`} href="/notes">
        ← Notes
      </Link>

      <div className={styles.top}>
        <time className="label" dateTime={n.created_at}>
          {fmtDateTime(n.created_at)}
        </time>
        {n.pinned && <span className="label label--red">Pinned</span>}
      </div>

      {n.title && <h1 className={`display ${styles.title}`}>{n.title}</h1>}

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
    </article>
  );
}
