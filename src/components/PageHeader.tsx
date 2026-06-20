import styles from "./PageHeader.module.css";

interface Props {
  label: string;
  title: string;
  lede?: string;
  meta?: string;
}

export default function PageHeader({ label, title, lede, meta }: Props) {
  return (
    <header className={`page-header container ${styles.header}`}>
      <div className={styles.top}>
        <span className="label label--red">{label}</span>
        {meta && <span className="label">{meta}</span>}
      </div>
      <h1 className={`display ${styles.title}`}>{title}</h1>
      {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
      <hr className={`rule ${styles.rule}`} />
    </header>
  );
}
