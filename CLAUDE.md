# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The personal website and blog of Stanislav Vasilev (Madman10K), deployed to Cloudflare Pages
at `i-use-gentoo-btw.com`. It is a [Hugo](https://gohugo.io) site
with custom layouts (no third-party theme). The deliverable is static HTML/CSS/JS in `public/`.

## Layout

- `hugo.toml` — site config (`baseURL` is `https://i-use-gentoo-btw.com/`, site params used in `<head>`).
- `content/` — Markdown pages: `_index.md` (home), `about.md`, `contact.md`, `privacy.md`,
  `blog/_index.md` (blog intro), and posts under `blog/<year>/<slug>.md`.
- `layouts/` — `baseof.html` (page shell), `home.html`, `page.html`, `section.html` (blog index),
  `404.html`, `robots.txt`, and `_partials/` (`head`, `header`, `footer`, `post-list`).
- `assets/` — `css/fonts.css` (self-hosted Ubuntu `@font-face`), `css/main.css`, `css/syntax.css` (Chroma, generated with
  `hugo gen chromastyles --style=onedark`), `js/index.js`. Concatenated/minified/fingerprinted via Hugo Pipes.
- `static/` — copied verbatim: `favicon.jpeg`, `fonts/`, `images/` (blog images, by post path), `files/`,
  `.well-known/security.txt`.
- `package.json` — npm deps for self-hosted third-party assets (Twemoji), mounted into
  `assets/`/`static/` by `[[module.mounts]]` in `hugo.toml`. Run `npm ci` before building.

## Authoring content

- Every page has YAML front matter with `title`; the layout renders it as the page `<h1>` and
  `<title>`, so do **not** add a `# Heading` at the top of the body.
- Adding a blog post = create `content/blog/<year>/<slug>.md` with front matter:
  ```yaml
  ---
  title: "Full post title"
  linkTitle: "Shorter title for the blog index"   # optional
  date: 2026-06-01
  flag: "🇬🇧"                                      # language flag shown in the index
  archived: true                                  # optional; lists it under "Archived"
  ---
  ```
  The blog index (`/blog/`) and `sitemap.xml` are generated — no manual edits needed.
- Link to internal pages with `{{< relref "/contact" >}}` or root-relative trailing-slash paths.
- Raw HTML in Markdown is allowed (`markup.goldmark.renderer.unsafe`).
- URLs are Hugo pretty URLs (`/blog/2026/chess-9-mo/`). Pages that existed under the old
  `.html` URLs carry `aliases:` so those links keep redirecting — keep them.

## Commands

```bash
npm ci               # install Twemoji (required before building)
hugo server          # local preview at http://localhost:1313
hugo --gc --minify   # production build into public/
```

Deployed by Cloudflare Pages' Git integration (configured in the Cloudflare dashboard, not in
this repo): it runs `npm ci` (auto-detected from `package-lock.json`), then `hugo --gc --minify`,
and publishes `public/`. The Hugo version is pinned with the `HUGO_VERSION` env var there.

## Notable details

- `baseURL` (and so canonical/OG URLs and the sitemap) targets `i-use-gentoo-btw.com`.
- `enableGitInfo` is on, so sitemap `<lastmod>` comes from git history.
- **No third-party requests:** every font, script, emoji and image is self-hosted, and the privacy
  policy (`content/privacy.md`) says so. Don't add CDN links or hotlinked images — put files in
  `static/` (or add an npm dep + mount) and update the policy if that ever changes.
- Emoji are rendered with Twemoji: `twemoji.min.js` is bundled with `assets/js/index.js`
  (see `head.html`) and SVGs are served from `/twemoji/svg/`.
