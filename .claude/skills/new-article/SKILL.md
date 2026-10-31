---
name: new-article
description: Scaffold a new NerdKunst blog article (mdsvex post in src/posts) with frontmatter, p5.js sketches and example images. Use when the user wants to add, write or start a new article/post/tutorial.
---

# Add a new article

Articles are Dutch (Flemish) mdsvex files in `src/posts/<slug>.md`. The slug is the filename: lowercase, hyphenated, no accents (e.g. `variatie-op-truchet-tegels.md`). No registration step is needed — `src/routes/api/posts/+server.ts` globs the folder.

## Steps

1. Ask for (or infer) the title, one-sentence description, tags and topic. Write all article text in Dutch, in the informal, enthusiastic tutorial voice of existing posts (look at `src/posts/truchet-tegels.md` for tone).
2. Create `src/posts/<slug>.md` using the template below. Use today's date as `date` (format `'YYYY-MM-DD'`, quoted). Keep `draft: true` until the user says it is ready to publish, then set `draft: false`.
3. Cover image: `image` must be a filename that exists in `src/lib/assets/` (looked up by `getImageUrl` via `import.meta.glob`, so a missing file breaks the build). If the user supplies one, put it there; otherwise reuse an existing asset and tell the user it is a placeholder.
4. Reuse existing tags where possible (`grep -h -A6 '^tags' src/posts/*.md`) — common ones: `tutorial`, `p5`, `lijnenspel`.
5. Verify with `npm run check`. If a dev server is needed, run it in tmux (see CLAUDE.md) and open `/posts/<slug>`.

## Template

```md
---
title: <Titel>
date: 'YYYY-MM-DD'
tags:
 - tutorial
 - p5
image: <existing-file-in-src/lib/assets>.png
description: <Eén zin die het artikel samenvat>
draft: true
---
<script lang="ts">
    import P5 from '$lib/components/P5.svelte';
    import ExampleImages from '$lib/components/ExampleImages.svelte';

    let sketch1 = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`
</script>

Inleiding...

## Eerste stap

Uitleg...

<P5 code={sketch1} />

## Conclusie

Mogelijke ideetjes voor uitbreidingen:
- ...
```

## Conventions and gotchas

- Put the `<script lang="ts">` block with sketches either right after the frontmatter or at the end of the file (both are used); only import components the post actually uses.
- Each interactive sketch is a template-string variable (`sketch1`, `sketch2`, ...) rendered with `<P5 code={sketchN} />`. Sketches must be complete p5 global-mode code (`setup`/`draw`); the iframe page appends `new p5()`. Canvas is conventionally 400x400 (the iframe is square).
- Inside the template string, escape backticks and `${` as `\`` and `\${`. Avoid `</script>` inside sketches.
- For sketches using ml5 pass `htmlPage="ml5/index.html"` to `<P5>`; the default is `index.html`.
- `<ExampleImages images="{[{fileName: 'x.png', title: 'Bijschrift'}]}" />` shows static images side by side; the files must exist in `src/lib/assets/`.
- Use `##` for section headings, ``` `code` ``` for inline function names, and end with a short "Conclusie" plus extension ideas.
