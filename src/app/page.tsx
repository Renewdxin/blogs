import Link from "next/link";
import styles from "./page.module.css";

/* Exact recreation of the "File Exhibition" home design.
   Content is fixed to match the source 1:1; title links point to the
   matching pages but are styled identically (no visual change). */

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

const records = [
  {
    num: "EXP. 01",
    numClass: styles.expRed,
    title: "AI / hardware product engineering",
    description:
      "Role: bridge software, hardware signals, and AI interaction design. System: local-first device flows, cloud model routing, memory surfaces, and fallback states. Impact: moved exploratory companion-product concepts toward testable engineering prototypes.",
    pad: styles.recordA,
  },
  {
    num: "EXP. 02",
    numClass: styles.expBlue,
    title: "Backend infrastructure & data systems",
    description:
      "Role: design service foundations for high-throughput workloads. System: APIs, async workers, ingestion pipelines, observability, and operational boundaries. Impact: improved reliability, diagnosis speed, and delivery confidence under complex traffic conditions.",
    pad: styles.recordB,
  },
  {
    num: "EXP. 03",
    numClass: styles.expMuted,
    title: "AI-native engineering workflow",
    description:
      "Role: accelerate engineering execution with agentic tools and automation. System: terminal-first workflows, AI-assisted editing, repeatable scripts, and structured knowledge surfaces. Impact: reduced iteration cost while keeping implementation traceable and maintainable.",
    pad: styles.recordC,
  },
];

const logs = [
  {
    time: "2026-06-18 23:40:12",
    badge: "> BLOG",
    title: "MCP tool surfaces: turning agent actions into controlled engineering interfaces",
    href: "/blog/mcp-tool-surfaces",
  },
  {
    time: "2026-05-27 09:16:44",
    badge: "> NOTE",
    title: "backend boundaries for async workloads and observable service behavior",
    href: "/notes/async-backend-boundaries",
  },
  {
    time: "2026-04-09 18:03:28",
    badge: "~ RESEARCH",
    title: "local-first AI hardware loops, latency budgets, and fallback states",
    href: "/blog/local-first-ai-hardware-loops",
  },
  {
    time: "2026-06-18 23:58:01",
    badge: "> UPDATE",
    title: "currently collecting writing around agents, infra, and product-grade AI systems",
    href: "/notes/currently-collecting-writing",
    update: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============ ENTRANCE WALL ============ */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.rails} aria-hidden="true">
          <span className={styles.railLeft} />
          <span className={styles.railMid} />
          <span className={styles.railRight} />
        </div>

        <div className={styles.entranceTop}>
          <span className={styles.labelRed}>PRODUCT BRIEF · HIGH-AVAILABILITY HUMAN SYSTEM</span>
          <span className={styles.labelBlue}>RETRO-FUTURE LANDING · CONVERSION GRID</span>
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>Architecting robust</span>{" "}
          <span className={styles.heroLine}>backend systems and</span>{" "}
          <span className={styles.heroLine}>orchestrating AI agents.</span>
        </h1>

        <div className={styles.wallLabel}>
          <div className={styles.valuePropStack}>
            <span className={styles.labelRed}>VALUE PROP</span>
            <span className={styles.labelRed}>03 SEC READ</span>
          </div>
          <p className={styles.valueBody}>
            A high-availability, extensible software / hardware / AI solution for teams that
            need resilient infrastructure, deployable intelligence, and full-stack engineering
            momentum without narrative overhead.
          </p>
        </div>
      </section>

      {/* ============ CATALOG INDEX ============ */}
      <section className={`container ${styles.catalog}`}>
        <h2 className={styles.catalogTitle}>Core features</h2>
        <div className={styles.entries}>
          {features.map((f) => (
            <article key={f.number} className={styles.entry}>
              <div className={styles.entryLeft}>
                <span className={styles.entryNumber}>{f.number}</span>
                <span className={styles.entryMeta}>{f.meta}</span>
              </div>
              <div className={styles.entryRight}>
                <h3 className={styles.entryTitle}>{f.title}</h3>
                <p className={styles.entryDesc}>{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ WORKS VITRINE ============ */}
      <section className={`container ${styles.works}`}>
        <div className={styles.worksHeading}>
          <h2 className={styles.worksTitle}>Experience records</h2>
          <span className={styles.labelBlue}>ROLE → SYSTEM → IMPACT</span>
        </div>
        <div className={styles.worksRecords}>
          {records.map((r) => (
            <article key={r.num} className={r.pad}>
              <span className={`${styles.expNum} ${r.numClass}`}>{r.num}</span>
              <h3 className={styles.recordTitle}>{r.title}</h3>
              <p className={styles.recordDesc}>{r.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ RELEASE NOTES ============ */}
      <section className={`container ${styles.release}`}>
        <div className={styles.releaseHeading}>
          <h2 className={styles.releaseTitle}>Notes &amp; updates</h2>
          <span className={styles.releaseSub}>Blog, research logs, and technical fragments.</span>
        </div>
        <div className={styles.terminalLog}>
          {logs.map((l) => (
            <Link
              key={l.time}
              href={l.href}
              className={`${styles.logEntry} ${l.update ? styles.logUpdate : ""}`}
            >
              <span className={styles.logTime}>{l.time}</span>
              <span className={`${styles.badge} ${l.update ? styles.badgeDark : ""}`}>
                {l.badge}
              </span>
              <span className={styles.logTitle}>{l.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ CLOSING PLAQUE ============ */}
      <section className={`container ${styles.plaque}`}>
        <h2 className={styles.plaqueTitle}>Start deployment / contact</h2>
        <p className={styles.plaqueBody}>
          Use the resume, email, or repository links as conversion paths. Replace placeholders
          with final documents and live addresses before launch.
        </p>
      </section>
    </>
  );
}
