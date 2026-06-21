import { neon } from "@neondatabase/serverless";

/**
 * Neon Postgres access for the dynamic Notes (碎碎念) feed.
 * Reads `DATABASE_URL` from the environment (see .env.local / host env vars).
 */

export interface DbNote {
  id: string;
  slug: string;
  title: string | null;
  body: string;
  tags: string[];
  pinned: boolean;
  created_at: string;
}

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export async function getDbNotes(): Promise<DbNote[]> {
  const rows = await sql()`
    SELECT id, slug, title, body, tags, pinned, created_at
    FROM notes
    ORDER BY pinned DESC, created_at DESC
  `;
  return rows as DbNote[];
}

export async function getDbNote(slug: string): Promise<DbNote | undefined> {
  const rows = await sql()`
    SELECT id, slug, title, body, tags, pinned, created_at
    FROM notes
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return (rows as DbNote[])[0];
}

/** Slugify the body's opening words and append a short suffix for uniqueness. */
function makeSlug(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join("-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "");
  const suffix = Math.abs(hash(input + base)).toString(36).slice(0, 6);
  return `${base || "note"}-${suffix}`;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

export async function createNote(input: {
  body: string;
  title?: string | null;
  tags?: string[];
  pinned?: boolean;
}): Promise<DbNote> {
  const body = input.body.trim();
  const title = input.title?.trim() || null;
  const tags = (input.tags ?? []).map((t) => t.trim()).filter(Boolean);
  const pinned = Boolean(input.pinned);
  const slug = makeSlug(title || body);

  const rows = await sql()`
    INSERT INTO notes (slug, title, body, tags, pinned)
    VALUES (${slug}, ${title}, ${body}, ${tags}, ${pinned})
    RETURNING id, slug, title, body, tags, pinned, created_at
  `;
  return (rows as DbNote[])[0];
}

export async function deleteNote(id: string): Promise<boolean> {
  const rows = await sql()`DELETE FROM notes WHERE id = ${id} RETURNING id`;
  return (rows as { id: string }[]).length > 0;
}

export async function updateNote(
  id: string,
  patch: { title?: string | null; body?: string; tags?: string[]; pinned?: boolean }
): Promise<DbNote | undefined> {
  const db = sql();
  const rows = await db`
    UPDATE notes SET
      title  = COALESCE(${patch.title ?? null}, title),
      body   = COALESCE(${patch.body ?? null}, body),
      tags   = COALESCE(${patch.tags ?? null}, tags),
      pinned = COALESCE(${patch.pinned ?? null}, pinned)
    WHERE id = ${id}
    RETURNING id, slug, title, body, tags, pinned, created_at
  `;
  return (rows as DbNote[])[0];
}
