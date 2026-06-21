# C REN / ENGINEERING SYSTEM

Personal portfolio, blog, and notes (碎碎念) for **C Ren** — a retro-future
editorial site. The home page is a 1:1 code recreation of the original Framer
design ("File Exhibition").

Built with **Next.js (App Router) + TypeScript**. Marketing pages are
statically prerendered; the **Notes (碎碎念) feed is dynamic**, backed by
**Neon Postgres**, so new notes appear instantly with no rebuild.

## Stack

- **Next.js 15** (App Router, React 19), server runtime
- **TypeScript** (strict)
- **CSS Modules** + a small global design-token layer (`src/styles/globals.css`)
- **Neon Postgres** for notes (`@neondatabase/serverless`)
- **Markdown** for blog + works (`gray-matter` + `react-markdown`)
- **Fonts** — Inter, Ibarra Real Nova, Martian Mono (`next/font/google`);
  Stardom self-hosted (`next/font/local`)

## Rendering model

| Route | Rendering | Source |
| --- | --- | --- |
| `/`, `/works`, `/blog`, `/about`, `/contact` | static (prerendered) | code + Markdown |
| `/works/[slug]`, `/blog/[slug]` | static (SSG) | Markdown in `content/` |
| `/notes`, `/notes/[slug]` | **dynamic** | Neon Postgres |
| `/api/notes` | **dynamic** API | Neon Postgres |

## Environment variables

Create `.env.local` (already gitignored) and set the same two values in your
host's dashboard for production:

```bash
DATABASE_URL="postgresql://…neon.tech/neondb?sslmode=require"  # Neon connection string
NOTES_TOKEN="<a long random secret>"                           # required to post/delete notes
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & run

```bash
npm run build      # server build (.next)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Posting 碎碎念 (notes)

Notes live in Neon — no git, no rebuild. To post:

1. Open **`/notes?compose=1`** once and paste your `NOTES_TOKEN`. It's saved in
   that browser's localStorage (never bundled into the site).
2. The composer appears at the top of `/notes`: write, optionally add a title /
   tags / pin, and **Post** (or ⌘/Ctrl + Enter). It shows up immediately.
3. Each note shows a **delete** control while you're signed in.

The API also works directly:

```bash
curl -X POST https://your-domain/api/notes \
  -H "Authorization: Bearer $NOTES_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"body":"a quick thought","tags":"meta","pinned":false}'
```

## Blog / works content

- **Article** → add Markdown to `content/blog/`.
- **Project** → add Markdown to `content/works/`.

## Deploy

Because the notes feed runs server-side, deploy to a **Node host**:

- **Vercel (recommended)** — import the GitHub repo, add `DATABASE_URL` and
  `NOTES_TOKEN` env vars, deploy. Zero config for Next.js + Neon.
- **Railway** — deploy from the repo; it runs `next build` + `next start`. Add
  the same env vars.
- **Cloudflare Pages** — needs the `@cloudflare/next-on-pages` adapter for the
  dynamic routes (the static pages alone would work without it).

## Before launch

Replace placeholders in `src/lib/site.ts` (email, URL) and drop a real
`resume.pdf` into `public/`.
