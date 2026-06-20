import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "../../components/PageHeader";
import { site } from "../../lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "C Ren — engineering system. Backend, AI infrastructure, and full-stack product momentum.",
};

const capabilities = [
  {
    k: "Backend & Infrastructure",
    v: "High-throughput, low-latency service foundations: APIs, async workers, data pipelines, deployment surfaces, and operational guardrails.",
  },
  {
    k: "LLM & Agentic Workflows",
    v: "AI systems beyond API calls: tool use, memory surfaces, multi-agent workflows, evaluation loops, and deployable model infrastructure.",
  },
  {
    k: "Tooling & Efficiency",
    v: "A sharp engineering loop: terminal-first workflows, AI-assisted editing, repeatable scripts, and structured knowledge surfaces.",
  },
];

const principles = [
  "Resilient infrastructure over narrative overhead.",
  "Local-first flows with graceful fallback states.",
  "Traceable, maintainable implementation at every step.",
  "Deployable intelligence — not demos that never ship.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="System Profile"
        meta="C Ren"
        title="An engineering system, not a résumé."
        lede={site.description}
      />

      <section className={`container ${styles.about}`}>
        <div className={styles.block}>
          <span className={`label label--ink ${styles.blockLabel}`}>Operating model</span>
          <div className={`lede ${styles.prose}`}>
            <p>
              I build and operate software, hardware, and AI systems for teams that need
              things to actually run in production. The work spans resilient backend
              foundations, agentic and model infrastructure, and the tooling that keeps an
              engineering loop fast and traceable.
            </p>
            <p>
              The framing across this site — exhibition, vitrine, release notes — is
              deliberate: each project is a working artifact with a role, a system, and a
              measurable impact, not a slide.
            </p>
          </div>
        </div>

        <hr className="rule" />

        <div className={styles.block}>
          <span className={`label label--ink ${styles.blockLabel}`}>Capabilities</span>
          <dl className={styles.caps}>
            {capabilities.map((c) => (
              <div key={c.k}>
                <dt className={`serif ${styles.capK}`}>{c.k}</dt>
                <dd className={styles.capV}>{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <hr className="rule" />

        <div className={styles.block}>
          <span className={`label label--ink ${styles.blockLabel}`}>Principles</span>
          <ul className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p} className={styles.principle}>
                <span className={`mono ${styles.principleN}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`serif ${styles.principleT}`}>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="rule" />

        <div className={styles.cta}>
          <p className={`display ${styles.ctaTitle}`}>Want the full record?</p>
          <div className={styles.ctaLinks}>
            <Link className="link link--red mono" href="/works">
              Browse works ↗
            </Link>
            <Link className="link link--red mono" href="/contact">
              Get in touch ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
