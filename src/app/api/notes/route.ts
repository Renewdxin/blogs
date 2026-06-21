import { NextResponse } from "next/server";
import { getDbNotes, createNote, deleteNote, updateNote } from "../../../lib/db";
import { isAuthorized } from "../../../lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/notes — list all notes (public).
export async function GET() {
  try {
    const notes = await getDbNotes();
    return NextResponse.json({ notes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load notes" }, { status: 500 });
  }
}

// POST /api/notes — create a note (session cookie or bearer token).
export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { body?: string; title?: string; tags?: string[] | string; pinned?: boolean };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const body = (payload.body ?? "").trim();
  if (!body) return NextResponse.json({ error: "Body is required" }, { status: 400 });
  if (body.length > 2000) {
    return NextResponse.json({ error: "Body too long (max 2000)" }, { status: 400 });
  }

  try {
    const note = await createNote({
      body,
      title: payload.title ?? null,
      tags: normalizeTags(payload.tags),
      pinned: Boolean(payload.pinned),
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}

// PATCH /api/notes — edit a note.
export async function PATCH(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: {
    id?: string;
    body?: string;
    title?: string | null;
    tags?: string[] | string;
    pinned?: boolean;
  };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  try {
    const note = await updateNote(payload.id, {
      title: payload.title,
      body: payload.body?.trim(),
      tags: payload.tags === undefined ? undefined : normalizeTags(payload.tags),
      pinned: payload.pinned,
    });
    if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ note });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}

// DELETE /api/notes?id=<uuid> — remove a note.
export async function DELETE(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  try {
    const ok = await deleteNote(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}

function normalizeTags(tags: string[] | string | undefined): string[] {
  if (Array.isArray(tags)) return tags.map((t) => t.trim()).filter(Boolean);
  if (typeof tags === "string") return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}
