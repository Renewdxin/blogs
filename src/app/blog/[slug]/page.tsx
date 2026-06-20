import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Prose from "../../../components/Prose";
import { getPosts, getPost } from "../../../lib/content";
import { fmtLong } from "../../../lib/format";
import styles from "./article.module.css";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: p.data.title, description: p.data.description };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getPost(slug);
  if (!entry) notFound();
  const d = entry.data;

  return (
    <article className={`container ${styles.article}`}>
      <Link className={`link mono ${styles.back}`} href="/blog">
        ← Notes &amp; updates
      </Link>

      <div className={styles.top}>
        <span className="label label--red">{d.kind}</span>
        <time className="label" dateTime={d.date}>
          {fmtLong(d.date)}
        </time>
      </div>

      <h1 className={`display ${styles.title}`}>{d.title}</h1>
      <p className={`lede ${styles.desc}`}>{d.description}</p>

      {d.tags.length > 0 && (
        <ul className={styles.tags}>
          {d.tags.map((t) => (
            <li key={t} className={`mono ${styles.tag}`}>
              #{t}
            </li>
          ))}
        </ul>
      )}

      <hr className={`rule ${styles.rule}`} />
      <Prose>{entry.body}</Prose>

      {d.updated && <p className={`mono ${styles.updated}`}>Updated {fmtLong(d.updated)}</p>}
    </article>
  );
}
