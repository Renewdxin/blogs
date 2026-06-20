# C REN / ENGINEERING SYSTEM

Personal portfolio, blog, and notes (碎碎念) for **C Ren** — a retro-future
editorial site recreated in code from a Framer design ("File Exhibition").

Built with **Next.js (App Router) + TypeScript**, statically exported so it
deploys as plain HTML/CSS to Cloudflare Pages, Railway, Netlify, or any static
host.

## Stack

- **Next.js 15** (App Router, React 19) — static export (`output: "export"`)
- **TypeScript** (strict)
- **CSS Modules** + a small global design-token layer (`src/styles/globals.css`)
- **Markdown content** via `gray-matter` + `react-markdown` (+ `remark-gfm`)
- **Fonts** — Inter, Ibarra Real Nova, Martian Mono (`next/font/google`);
  Stardom self-hosted in `public/fonts` (`next/font/local`)

## Structure

```
content/            # Markdown content (edit these to publish)
  works/            #   projects / experience records
  blog/             #   long-form articles
  notes/            #   碎碎念 — short threads / micro-posts
public/fonts/       # self-hosted Stardom display serif
src/
  app/              # App Router pages (home, works, blog, notes, about, contact)
  components/       # SiteHeader, SiteFooter, PageHeader, LogRow, Prose
  lib/              # content loaders (content.ts), site config, formatters
  styles/globals.css# design tokens, base, prose
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static)

```bash
npm run build      # emits ./out — a fully static site
npx serve out      # preview the static export locally
```

`npm run typecheck` runs `tsc --noEmit`.

## Publishing content

- **Article** → add a Markdown file to `content/blog/`.
- **碎碎念 / note** → add a Markdown file to `content/notes/`.
- **Project** → add a Markdown file to `content/works/`.

The home page "Notes & updates" feed and "Experience records" are generated
automatically from these collections. Set `draft: true` in frontmatter to hide
an entry.

## Before launch

Replace the placeholders marked `TODO` in `src/lib/site.ts` (email, URL),
update `site` in `next.config`-consumed metadata, and drop a real `resume.pdf`
into `public/`.

## Deploy

The `out/` directory is a static bundle.

- **Cloudflare Pages** — build command `npm run build`, output directory `out`.
- **Railway** — serve `out/` with any static server, or use the static template.
- **Netlify / others** — publish directory `out`.
