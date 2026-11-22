# yakshith15.github.io

Source for [yakshith15.github.io](https://yakshith15.github.io/), my personal site.

Next.js 14 with a static export, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev      # http://localhost:3000, drafts included
npm run build    # static site in out/
```

## Where things live

| What | Where |
| --- | --- |
| Everything the site says about me: intro, work, projects, education | `lib/site-config.ts` |
| Résumé (canonical source; the PDF is compiled from it) | `resume/resume.tex` → `public/resume.pdf` |
| Posts | `content/blog/*.md` (MDX), served at `/writing/` |
| Reading notes | `content/vault/`, a submodule of my Obsidian repo, served at `/vault/` |
| Layout and type | `app/globals.css` |

## Writing a post

Add a Markdown or MDX file to `content/blog/`:

```markdown
---
title: "What building GFS taught me"
date: 2026-12-01
description: "One line that appears under the title and in the feed."
tags: [storage, go]
hidden: true
---
```

`hidden: true` keeps a post a draft: it shows in `npm run dev` and is left
out of the production build. Delete the line to publish. The Writing link in
the nav and the Writing section on the home page only appear once at least
one post is published.

Posts can use `<Callout title="…">…</Callout>` without importing it.

## The vault

`content/vault` tracks the Obsidian repo. Only the folders listed in
`lib/vault-config.ts` are published. A push to the Obsidian repo triggers a
rebuild here through a `repository_dispatch` event. Vault pages are not
linked from the nav, are left out of the sitemap, and are marked `noindex`.
