# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173). Always run the server via tmux (e.g. in a named tmux session), not as a plain foreground/background shell process.
- `npm run build` / `npm run preview` — production build (Cloudflare adapter) / preview it
- `npm run check` — `svelte-kit sync` + `svelte-check` (type check)
- `npm run lint` — `prettier --check .` and `eslint .`; `npm run format` to fix formatting

There is no test suite. Node version is pinned in `.nvmrc`.

## Architecture

NerdKunst is a Dutch-language (Flemish) blog about creative coding with p5.js, built with SvelteKit 2 + Svelte 4, Tailwind + DaisyUI (+ typography plugin), deployed to Cloudflare via `@sveltejs/adapter-cloudflare`. Pages are prerendered.

**Posts are mdsvex markdown files** in `src/posts/*.md` (`.md` is registered as a Svelte extension in `svelte.config.js`). Frontmatter fields match the `Post` type in `src/lib/types.ts`: `title`, `date`, `tags`, `image`, `description`, `draft`. Drafts (`draft: true`) are filtered out of listings. The slug is the filename.

- `src/routes/api/posts/+server.ts` globs `/src/posts/*.md` and returns sorted non-draft metadata; it is the single source for the post list (consumed by `posts/+page.server.ts`, the home page, and probably the RSS feed at `routes/rss.xml`).
- `src/routes/posts/[slug]/+page.ts` dynamically imports `posts/${slug}.md` and passes `content` (component) and `meta` to the page.
- Post images referenced by frontmatter `image` live in `src/lib/assets/` and are resolved via `getImageUrl` in `src/lib/images.ts` (`import.meta.glob`).
- Site title/description/base URL are in `src/lib/config.ts` (`url` switches on `dev`).

**Interactive p5.js sketches in posts** — the key non-obvious piece:
- Posts embed `<P5 code={sketchN} />` (`src/lib/components/P5.svelte`) after declaring sketch source as a template string in the post's `<script lang="ts">`. The component shows a CodeMirror editor (`svelte-codemirror-editor`, cobalt theme) next to an iframe.
- Play button navigates the iframe to `/p5/index.html?sketch=<code>` (or another `htmlPage`, e.g. `/p5/ml5/index.html`); that static page loads p5 from a CDN, reads the `sketch` query param, appends `; new p5();`, and injects it as a `<script>`. The pause button reloads `/p5/ready/index.html` (idle placeholder page).
- These pages live in `static/p5/` and are plain HTML, outside the Svelte app. Libraries (p5, ml5) should be loaded only in the page that needs them.
- `vite.config.ts` excludes codemirror packages from `optimizeDeps` and aliases `@codemirror/state` to a single copy — this works around duplicate-instance problems; don't remove it casually.
