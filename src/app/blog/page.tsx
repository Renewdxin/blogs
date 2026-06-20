import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { getPosts } from "../../lib/content";
import { fmtDate } from "../../lib/format";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog, research logs, and technical fragments on backend, AI infrastructure, and agentic systems.",
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHeader
        label="Release Notes"
        meta={`${posts.length} entries`}
        title="Notes & updates"
        lede="Blog, research logs, and technical fragments. Long-form writing around agents, infrastructure, and product-grade AI systems."
      />

      <section className={`container ${styles.feed}`}>
        {posts.map((p) => (
          <article key={p.slug} className={styles.post}>
            <div className={styles.rail}>
              <time className={`mono ${styles.date}`} dateTime={p.data.date}>
                {fmtDate(p.data.date)}
              </time>
              <span className={`label label--red ${styles.kind}`}>{p.data.kind}</span>
            </div>
            <div>
              <h2 className={`serif ${styles.title}`}>
                <Link className="link" href={`/blog/${p.slug}`}>
                  {p.data.title}
                </Link>
              </h2>
              <p className={styles.desc}>{p.data.description}</p>
              {p.data.tags.length > 0 && (
                <ul className={styles.tags}>
                  {p.data.tags.map((t) => (
                    <li key={t} className={`mono ${styles.tag}`}>
                      #{t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p className={`muted ${styles.empty}`}>No posts yet — writing in progress.</p>
        )}
      </section>
    </>
  );
}
