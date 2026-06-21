"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NoteComposer.module.css";

/** Owner-only delete button — only renders if a posting token is stored. */
export default function NoteDelete({ id }: { id: string }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("notesToken"));
  }, []);

  if (!token) return null;

  async function remove() {
    if (busy) return;
    if (!confirm("Delete this note?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" className={styles.delete} onClick={remove} disabled={busy} aria-label="Delete note">
      {busy ? "…" : "delete"}
    </button>
  );
}
