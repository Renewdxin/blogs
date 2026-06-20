import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Prose from "../../../components/Prose";
import { getWorks, getWork } from "../../../lib/content";
import styles from "./detail.module.css";

export function generateStaticParams() {
  return getWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return { title: w.data.title, description: w.data.summary };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) notFound();
  const d = entry.data;

  return (
    <article className={`container ${styles.detail}`}>
      <Link className={`link mono ${styles.back}`} href="/works">
        ← Works
      </Link>

      <div className={styles.top}>
        <span className="label label--red">{d.number ?? "Work"}</span>
        {d.year && <span className="label">{d.year}</span>}
      </div>

      <h1 className={`display ${styles.title}`}>{d.title}</h1>
      <p className={`lede ${styles.summary}`}>{d.summary}</p>

      <dl className={styles.meta}>
        {d.role && (
          <div className={styles.metaRow}>
            <dt className="label">Role</dt>
            <dd>{d.role}</dd>
          </div>
        )}
        {d.stack.length > 0 && (
          <div className={styles.metaRow}>
            <dt className="label">Stack</dt>
            <dd className="mono">{d.stack.join(" · ")}</dd>
          </div>
        )}
        <div className={styles.metaRow}>
          <dt className="label">Status</dt>
          <dd className="mono">{d.status}</dd>
        </div>
        {(d.link || d.repo) && (
          <div className={styles.metaRow}>
            <dt className="label">Links</dt>
            <dd className={styles.metaLinks}>
              {d.link && (
                <a className="link link--red" href={d.link}>
                  Live ↗
                </a>
              )}
              {d.repo && (
                <a className="link link--red" href={d.repo}>
                  Repository ↗
                </a>
              )}
            </dd>
          </div>
        )}
      </dl>

      <hr className={`rule ${styles.rule}`} />
      <Prose>{entry.body}</Prose>
    </article>
  );
}
