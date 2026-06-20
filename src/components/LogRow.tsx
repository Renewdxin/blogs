import Link from "next/link";
import styles from "./LogRow.module.css";

interface Props {
  timestamp: string;
  kind: string;
  title: string;
  href?: string;
  highlight?: boolean;
}

export default function LogRow({ timestamp, kind, title, href, highlight = false }: Props) {
  const sigil = kind.toUpperCase() === "RESEARCH" ? "~" : ">";
  const className = `${styles.row} ${highlight ? styles.highlight : ""} ${href ? styles.link : ""}`;

  const inner = (
    <>
      <time className={`${styles.time} mono`}>{timestamp}</time>
      <span className={`${styles.kind} mono`}>
        <span className={styles.sigil} aria-hidden="true">
          {sigil}
        </span>
        {kind.toUpperCase()}
      </span>
      <span className={styles.title}>{title}</span>
      {href && (
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
