"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NoteComposer.module.css";

const TOKEN_KEY = "notesToken";

/**
 * Owner-only composer for 碎碎念.
 * Hidden from visitors: it only appears if a token is saved in localStorage,
 * or if the page is opened with `?compose=1` (to enter the token the first time).
 */
export default function NoteComposer() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [needsToken, setNeedsToken] = useState(false);

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [pinned, setPinned] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    const wantsCompose = new URLSearchParams(window.location.search).has("compose");
    if (saved) setToken(saved);
    else if (wantsCompose) setNeedsToken(true);
    setReady(true);
  }, []);

  if (!ready || (!token && !needsToken)) return null;

  if (!token && needsToken) {
    return (
      <div className={styles.gate}>
        <span className="label label--red">Owner access</span>
        <input
          className={styles.input}
          type="password"
          placeholder="Posting token"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = (e.target as HTMLInputElement).value.trim();
              if (v) {
                localStorage.setItem(TOKEN_KEY, v);
                setToken(v);
                setNeedsToken(false);
              }
            }
          }}
        />
        <span className={styles.hint}>Press Enter to save. Stored only in this browser.</span>
      </div>
    );
  }

  async function submit() {
    if (!body.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          body,
          title: title || undefined,
          tags,
          pinned,
        }),
      });
      if (res.status === 401) {
        setError("Token rejected. Clearing — re-enter it.");
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setNeedsToken(true);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to post");
        return;
      }
      setBody("");
      setTitle("");
      setTags("");
      setPinned(false);
      router.refresh(); // re-render the server-rendered list with the new note
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.composer}>
      <div className={styles.head}>
        <span className="label label--red">New 碎碎念</span>
        <button
          type="button"
          className={styles.signout}
          onClick={() => {
            localStorage.removeItem(TOKEN_KEY);
            setToken(null);
          }}
        >
          sign out
        </button>
      </div>
      <input
        className={styles.title}
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.body}
        placeholder="What's on your mind?"
        value={body}
        rows={4}
        maxLength={2000}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
        }}
      />
      <div className={styles.row}>
        <input
          className={styles.tags}
          placeholder="tags, comma, separated"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <label className={styles.pin}>
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          pin
        </label>
        <button type="button" className={styles.post} onClick={submit} disabled={busy || !body.trim()}>
          {busy ? "Posting…" : "Post"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <span className={styles.hint}>⌘/Ctrl + Enter to post.</span>
    </div>
  );
}
