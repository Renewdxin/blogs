"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Studio.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !password) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={`container ${styles.loginWrap}`}>
      <form className={styles.login} onSubmit={submit}>
        <span className="label label--red">Studio access</span>
        <h1 className={`display ${styles.loginTitle}`}>Sign in</h1>
        <p className={styles.loginHint}>
          Owner area for posting and managing 碎碎念. This page is not indexed.
        </p>
        <input
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginBtn} type="submit" disabled={busy || !password}>
          {busy ? "Signing in…" : "Enter studio"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}
