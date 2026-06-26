# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The personal website and blog of Stanislav Vasilev (Madman10K), deployed to GitHub Pages
at `madman10k.github.io` / `i-use-gentoo-btw.com`. Content is authored in Markdown and
compiled to a static HTML site by a custom build pipeline. There is no application code to
"run" — the deliverable is static HTML/CSS/JS.

## Authoring content

- Pages are Markdown at the repo root: `README.md` (becomes the home page / `index.html`),
  `about.md`, `blog.md`, `contact.md`.
- Blog posts live under `blog/<year>/<slug>.md`. When adding a post, also add a link to it
  in `blog.md` and an entry in `sitemap.xml`. Post links use the production domain
  (`https://i-use-gentoo-btw.com/blog/...`), not relative paths.
- The first `# Heading` in a Markdown file is extracted as the HTML `<title>` (see
  `generate-html.sh`).

## Build pipeline (how Markdown becomes the site)

The build is driven by **UVKBuildTool** — a C++ static-site generator pulled in as a git
submodule (`UVKBuildTool/`, from MadLadSquad/UVKBuildTool) and configured by `uvproj.yaml`.

Order of operations:
1. `uvproj.yaml` declares a `custom-pre-generation-command` that runs **`generate-html.sh`**.
   This script copies the `*.md` files and `blog/` into `build/`, then uses **pandoc**
   (`--from=gfm`, `--template ../template.html`) to convert each `.md` to `.html` in
   parallel (GNU `parallel`). It renames `README.html` → `index.html` and wraps tables in a
   `.table` div via `sed`.
2. `template.html` is the page shell. It injects pandoc's `$title$`/`$body$` and `{{ include
   Components/*.tmpl.html }}` partials (`head`, `header`, `footer`). UVKBuildTool resolves
   the `{{ include }}` directives; `.tmpl.html` is an intermediate extension (not emitted).
3. `run.sh` invokes the compiled `UVKBuildTool --build ../../build ../../` to assemble the
   final site into `build/`.
4. `ci-clean.sh` flattens `build/` into the repo root and rewrites URLs for production
   (relative `./` → `https://i-use-gentoo-btw.com/`, strips `.html` and `/index.html`).

`build/` is gitignored. **Do not edit generated `.html` files** — edit the `.md` sources,
`template.html`, the `Components/*.tmpl.html` partials, or `main.css` instead.

## Commands

The build tool must be compiled first (it's C++). Requires `pandoc`, GNU `parallel`,
`cmake`, `make`, and `libyaml-cpp-dev`.

```bash
# One-time: build the UVKBuildTool submodule (also scaffolds UBTCustomFunctions/Translations)
git submodule update --init --recursive
cd UVKBuildTool && ./setup-web.sh .. && cd ..

# Generate the site into build/
./run.sh

# Local preview: UVKBuildTool serves build/ at http://localhost:8080
# (see localhost-commands in uvproj.yaml — rewrites URLs to localhost, runs python http.server)
```

CI (`.github/workflows/pages.yml`) reproduces this on push to `master`: installs the latest
pandoc via `get-latest-pandoc.py`, runs `setup-web.sh`/`run.sh`/`ci-clean.sh`, minifies JS
(terser) and CSS (csso), rewrites URLs to production, then deploys to GitHub Pages.

## Notable details

- **Two domains:** the site is served from both `madman10k.github.io` and
  `i-use-gentoo-btw.com`. Production URL rewriting targets `i-use-gentoo-btw.com`.
- **`UBTCustomFunctions/`** is a UVKBuildTool extension hook (C++). `funcExportMain` is the
  entry point for custom generation logic; it is currently empty.
- **`Translations/ui18n-config.yaml`** configures UVKBuildTool's i18n (ui18n) system;
  currently empty (no active translations).
- **`update-dependencies.yaml`** runs on a schedule to bump the UVKBuildTool submodule,
  pushing to an `auto` branch and opening a tracking issue — review those PRs rather than
  hand-bumping the submodule.
- `.htaccess` provides extensionless-URL rewriting for non-GitHub-Pages hosting.
