import Link from "next/link";
import LogRow from "../components/LogRow";
import { getWorks, getFeed } from "../lib/content";
import { fmtStamp } from "../lib/format";
import { site } from "../lib/site";
import styles from "./page.module.css";

const features = [
  {
    number: "Feature 01",
    meta: "Go · Python · distributed systems",
    title: "Backend & Infrastructure",
    description:
      "Builds high-throughput, low-latency service foundations: APIs, async workers, data pipelines, deployment surfaces, and operational guardrails.",
  },
  {
    number: "Feature 02",
    meta: "MCP · orchestration · model systems",
    title: "LLM & Agentic Workflows",
    description:
      "Designs AI systems beyond API calls: tool use, memory surfaces, multi-agent workflows, evaluation loops, and deployable model infrastructure.",
  },
  {
    number: "Feature 03",
    meta: "terminal-first · AI-assisted engineering",
    title: "Tooling & Efficiency",
    description:
      "Optimizes the engineering loop with sharp tooling, fast iteration, automation, and pragmatic full-stack delivery habits.",
  },
];

export default function HomePage() {
  const works = getWorks().slice(0, 3);
  const feed = getFeed(5);

  return (
    <>
      {/* ============ ENTRANCE WALL (hero) ============ */}
      <section className={`${styles.hero} container`}>
        <div className={styles.heroGrid} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.heroLabels}>
          <span className="label label--red">
            Product Brief · High-Availability Human System
          </span>
          <span className="label">Retro-Future Landing · Conversion Grid</span>
        </div>

        <h1 className={`display ${styles.heroTitle}`}>{site.tagline}</h1>

        <div className={styles.heroValueprop}>
          <div className={styles.heroValuelabel}>
            <span className="label label--ink">Value Prop</span>
            <span className="label">03 Sec Read</span>
          </div>
          <p className={`lede ${styles.heroLede}`}>{site.description}</p>
        </div>
      </section>

      <Rule />

      {/* ============ CATALOG INDEX (core features) ============ */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHead}>
          <h2 className={`display ${styles.sectionTitle}`}>
            Core
            <br />
            features
          </h2>
          <div className={styles.features}>
            {features.map((f) => (
              <article key={f.number} className={styles.feature}>
                <div className={styles.featureMeta}>
                  <span className="label label--ink">{f.number}</span>
                  <span className={`${styles.featureTags} mono`}>{f.meta}</span>
                </div>
                <div>
                  <h3 className={`serif ${styles.featureTitle}`}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ============ WORKS VITRINE (experience records) ============ */}
      <section className={`${styles.section} container`}>
        <div className={styles.expHead}>
          <h2 className={`display ${styles.sectionTitle}`}>Experience records</h2>
          <span className="label">Role → System → Impact</span>
        </div>
        <div className={styles.expGrid}>
          {works.map((w) => (
            <article key={w.slug}>
              <span className={`label label--ink ${styles.expNum}`}>
                {w.data.number ?? "EXP."}
              </span>
              <h3 className={`serif ${styles.expTitle}`}>
                <Link className="link" href={`/works/${w.slug}`}>
                  {w.data.title}
                </Link>
              </h3>
              <p className={styles.expDesc}>{w.data.summary}</p>
            </article>
          ))}
        </div>
        <div className={styles.sectionMore}>
          <Link className={`link link--red mono ${styles.moreLink}`} href="/works">
            All works ↗
          </Link>
        </div>
      </section>

      <Rule />

      {/* ============ RELEASE NOTES (notes & updates) ============ */}
      <section className={`${styles.section} container`}>
        <div className={styles.notesHead}>
          <div>
            <h2 className={`display ${styles.sectionTitle}`}>Notes &amp; updates</h2>
            <p className={`muted ${styles.notesSub}`}>
              Blog, research logs, and technical fragments.
            </p>
          </div>
          <Link className={`link link--red mono ${styles.moreLink}`} href="/blog">
            Read the blog ↗
          </Link>
        </div>
        <div>
          {feed.map((item) => (
            <LogRow
              key={item.href}
              timestamp={fmtStamp(item.date)}
              kind={item.kind}
              title={item.title}
              href={item.href}
              highlight={item.highlight}
            />
          ))}
        </div>
      </section>

      <Rule />

      {/* ============ CLOSING PLAQUE (contact) ============ */}
      <section className={`${styles.plaque} container`} id="contact">
        <h2 className={`display ${styles.plaqueTitle}`}>Start deployment / contact</h2>
        <p className={`lede ${styles.plaqueBody}`}>
          Use the résumé, email, or repository links as conversion paths. Replace
          placeholders with final documents and live addresses before launch.
        </p>
        <div className={styles.plaqueLinks}>
          <a className={`link link--red mono ${styles.moreLink}`} href={`mailto:${site.email}`}>
            {site.email} ↗
          </a>
          <Link className={`link link--red mono ${styles.moreLink}`} href="/contact">
            Contact details ↗
          </Link>
          <a className={`link link--red mono ${styles.moreLink}`} href={site.github}>
            GitHub ↗
          </a>
        </div>
      </section>
    </>
  );
}

function Rule() {
  return <hr className={`rule ${styles.containerRule}`} />;
}
