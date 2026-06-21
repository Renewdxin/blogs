"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbNote } from "../../lib/db";
import { fmtDateTime } from "../../lib/format";
import styles from "./Studio.module.css";

export default function Studio({ initialNotes }: { initialNotes: DbNote[] }) {
  const router = useRouter();
  const [notes, setNotes] = useState<DbNote[]>(initialNotes);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // composer
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [pinned, setPinned] = useState(false);

  // inline edit
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editTags, setEditTags] = useState("");

  async function refresh() {
    const res = await fetch("/api/notes", { cache: "no-store" });
    if (res.ok) setNotes((await res.json()).notes);
  }

  async function create() {
    if (!body.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || undefined, body, tags, pinned }),
      });
      if (!res.ok) {
        setError((await res.json().catch(() => ({}))).error ?? "Failed to post");
        return;
      }
      setTitle("");
      setBody("");
      setTags("");
      setPinned(false);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this note?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function patch(id: string, fields: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch("/api/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...fields }),
      });
      if (res.ok) await refresh();
    } finally {
      setBusy(false);
    }
  }

  function startEdit(n: DbNote) {
    setEditId(n.id);
    setEditTitle(n.title ?? "");
    setEditBody(n.body);
    setEditTags(n.tags.join(", "));
  }

  async function saveEdit() {
    if (!editId) return;
    await patch(editId, { title: editTitle || null, body: editBody, tags: editTags });
    setEditId(null);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <section className={`container ${styles.studio}`}>
      <header className={styles.topbar}>
        <div>
          <span className="label label--red">Studio</span>
          <h1 className={`display ${styles.heading}`}>碎碎念</h1>
        </div>
        <div className={styles.topActions}>
          <a className={`mono ${styles.ghost}`} href="/notes" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button className={`mono ${styles.ghost}`} onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      {/* composer */}
      <div className={styles.composer}>
        <input
          className={styles.titleInput}
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.bodyInput}
          placeholder="What's on your mind?"
          rows={4}
          maxLength={2000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") create();
          }}
        />
        <div className={styles.composerRow}>
          <input
            className={styles.tagsInput}
            placeholder="tags, comma, separated"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <label className={styles.pin}>
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
            pin
          </label>
          <button className={styles.post} onClick={create} disabled={busy || !body.trim()}>
            {busy ? "…" : "Post"}
          </button>
        </div>
        <span className={styles.hint}>⌘/Ctrl + Enter to post · {notes.length} notes</span>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* list */}
      <ul className={styles.list}>
        {notes.map((n) => (
          <li key={n.id} className={styles.item}>
            {editId === n.id ? (
              <div className={styles.editor}>
                <input
                  className={styles.titleInput}
                  placeholder="Title (optional)"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className={styles.bodyInput}
                  rows={4}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
                <input
                  className={styles.tagsInput}
                  placeholder="tags"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                />
                <div className={styles.editActions}>
                  <button className={styles.post} onClick={saveEdit} disabled={busy}>
                    Save
                  </button>
                  <button className={`mono ${styles.ghost}`} onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.itemHead}>
                  <time className={`mono ${styles.itemTime}`}>{fmtDateTime(n.created_at)}</time>
                  {n.pinned && <span className="label label--red">Pinned</span>}
                  <span className={styles.itemActions}>
                    <button className={`mono ${styles.ghost}`} onClick={() => patch(n.id, { pinned: !n.pinned })}>
                      {n.pinned ? "unpin" : "pin"}
                    </button>
                    <button className={`mono ${styles.ghost}`} onClick={() => startEdit(n)}>
                      edit
                    </button>
                    <button className={`mono ${styles.danger}`} onClick={() => remove(n.id)}>
                      delete
                    </button>
                  </span>
                </div>
                {n.title && <p className={`serif ${styles.itemTitle}`}>{n.title}</p>}
                <p className={styles.itemBody}>{n.body}</p>
                {n.tags.length > 0 && (
                  <div className={styles.itemTags}>
                    {n.tags.map((t) => (
                      <span key={t} className={`mono ${styles.tag}`}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
