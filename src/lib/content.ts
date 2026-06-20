import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ----------------------------- types ----------------------------- */

export type WorkStatus = "active" | "archived" | "prototype" | "shipped";

export interface WorkMeta {
  title: string;
  number?: string;
  summary: string;
  role?: string;
  stack: string[];
  year?: string;
  status: WorkStatus;
  link?: string;
  repo?: string;
  order: number;
  draft: boolean;
}

export type PostKind = "blog" | "note" | "research" | "update";

export interface PostMeta {
  title: string;
  description: string;
  date: string; // ISO
  updated?: string;
  kind: PostKind;
  tags: string[];
  draft: boolean;
}

export interface NoteMeta {
  date: string; // ISO
  title?: string;
  tags: string[];
  pinned: boolean;
  draft: boolean;
}

export interface Entry<T> {
  slug: string;
  data: T;
  body: string;
}

/* --------------------------- internals --------------------------- */

function readCollection(name: string): { slug: string; raw: matter.GrayMatterFile<string> }[] {
  const dir = path.join(CONTENT_DIR, name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      raw: matter(fs.readFileSync(path.join(dir, file), "utf8")),
    }));
}

const toArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v == null ? [] : [String(v)];

const toISO = (v: unknown): string => {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" || typeof v === "number") return new Date(v).toISOString();
  return new Date().toISOString();
};

/* ----------------------------- works ----------------------------- */

export function getWorks(): Entry<WorkMeta>[] {
  return readCollection("works")
    .map(({ slug, raw }) => {
      const d = raw.data;
      return {
        slug,
        body: raw.content,
        data: {
          title: String(d.title ?? slug),
          number: d.number ? String(d.number) : undefined,
          summary: String(d.summary ?? ""),
          role: d.role ? String(d.role) : undefined,
          stack: toArray(d.stack),
          year: d.year ? String(d.year) : undefined,
          status: (d.status ?? "active") as WorkStatus,
          link: d.link ? String(d.link) : undefined,
          repo: d.repo ? String(d.repo) : undefined,
          order: Number(d.order ?? 0),
          draft: Boolean(d.draft ?? false),
        },
      };
    })
    .filter((w) => !w.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export function getWork(slug: string): Entry<WorkMeta> | undefined {
  return getWorks().find((w) => w.slug === slug);
}

/* ------------------------------ blog ----------------------------- */

export function getPosts(): Entry<PostMeta>[] {
  return readCollection("blog")
    .map(({ slug, raw }) => {
      const d = raw.data;
      return {
        slug,
        body: raw.content,
        data: {
          title: String(d.title ?? slug),
          description: String(d.description ?? ""),
          date: toISO(d.date),
          updated: d.updated ? toISO(d.updated) : undefined,
          kind: (d.kind ?? "blog") as PostKind,
          tags: toArray(d.tags),
          draft: Boolean(d.draft ?? false),
        },
      };
    })
    .filter((p) => !p.data.draft)
    .sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
}

export function getPost(slug: string): Entry<PostMeta> | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/* ------------------------------ notes ---------------------------- */

export function getNotes(): Entry<NoteMeta>[] {
  return readCollection("notes")
    .map(({ slug, raw }) => {
      const d = raw.data;
      return {
        slug,
        body: raw.content,
        data: {
          date: toISO(d.date),
          title: d.title ? String(d.title) : undefined,
          tags: toArray(d.tags),
          pinned: Boolean(d.pinned ?? false),
          draft: Boolean(d.draft ?? false),
        },
      };
    })
    .filter((n) => !n.data.draft)
    .sort((a, b) => {
      if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
      return +new Date(b.data.date) - +new Date(a.data.date);
    });
}

export function getNote(slug: string): Entry<NoteMeta> | undefined {
  return getNotes().find((n) => n.slug === slug);
}

/* ------------------------- combined feed ------------------------- */

export interface FeedItem {
  date: string;
  kind: string;
  title: string;
  href: string;
  highlight: boolean;
}

export function getFeed(limit = 5): FeedItem[] {
  const fromBlog: FeedItem[] = getPosts().map((p) => ({
    date: p.data.date,
    kind: p.data.kind,
    title: p.data.title,
    href: `/blog/${p.slug}`,
    highlight: p.data.kind === "update",
  }));
  const fromNotes: FeedItem[] = getNotes().map((n) => ({
    date: n.data.date,
    kind: n.data.pinned ? "update" : "note",
    title: n.data.title ?? n.body.trim().slice(0, 110),
    href: `/notes/${n.slug}`,
    highlight: n.data.pinned,
  }));
  return [...fromBlog, ...fromNotes]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}
