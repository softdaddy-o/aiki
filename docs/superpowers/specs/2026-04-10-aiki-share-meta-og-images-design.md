# AIKI Share Meta & OG Images — Design Spec

**Date:** 2026-04-10
**Status:** Approved for implementation planning
**Related issue:** #20 (Investigate static-site social tracking for AIKI) — partial
**Author:** brainstorming session with softdaddy-o

## Problem

When an AIKI news or wiki page is shared on X, Threads, Facebook, LinkedIn, Reddit, or Bluesky, the link preview is bare: no thumbnail, no rich description, just a raw URL. This hurts click-through and makes shared links look untrustworthy.

Additionally the share buttons are buried at the bottom of articles, making them easy to miss.

## Goals

1. Every news and wiki detail page produces a proper rich preview card on all major social platforms.
2. Share buttons are visible near the top of the article, not buried at the bottom.
3. Zero additional writing burden on content authors — existing `summary` frontmatter is reused.
4. No runtime dependency on third-party services — everything resolves at build time.

## Non-goals

- Webmention.io / Bridgy Fed integration (reserved for a later phase of issue #20)
- Public share-count display on pages
- Platform-specific share text variants
- Hook/teaser rewriting of summaries
- OG images for the home page, wiki index, or news index (scoped to detail pages only)

## Decisions

### D1. Share text source — reuse `summary` frontmatter
We use the existing `summary` field for both on-page display AND as `og:description` / Twitter description / share intent pre-fill text.

Rationale: consistency between what a reader sees on the page and what appears in the share composer. Any divergence surprises the sharer and invites distrust. The existing `SocialShare.astro` already truncates to 120 chars for intent URLs, which is kept as-is.

Alternatives considered and rejected:
- Separate `shareSummary` field: creates a new authoring rule and surface for mistakes.
- LLM-generated share copy: adds tooling cost, risks tone drift, requires re-generation pipeline.
- Hook/teaser variant: mismatched tone for a reference site where accuracy is the brand.

### D2. Share button position — below the h1
`SocialShare` renders directly below the article title on both news and wiki detail pages, before the main content. The bottom position is removed.

Rationale: standard blog/news pattern, visible without scrolling, encourages share action before reading fatigue.

### D3. News OG images — Docs pattern
Fetch `og:image` from each news entry's `sourceUrl` using a port of `f:/src3/Docs/social-posting/threads.js` (`fetchOgImage`, `fetchRedditPreview`, `downloadFile`). The result is committed to `public/og/news/{slug}.jpg`.

Rationale: news entries summarize external articles; the original source's thumbnail is the most contextually honest image.

Cache strategy: **commit to git**. Prevents re-fetching on every build, preserves images even if the source changes or goes offline, survives external rate limits.

Fallback when fetch fails: record in `data/og-failures.json` (slug + reason), leave `ogImage` unset for the entry, BaseLayout uses site default (`/softdaddy-logo.jpg`). Next build retries failed entries.

### D4. Wiki OG images — satori auto-generated cards
Generate a branded PNG card per wiki entry at build time using `satori` (JSX → SVG) + `@resvg/resvg-js` (SVG → PNG). Output to `public/og/wiki/{slug}.png`.

Rationale: wiki entries have no external source URL, and using one default image for 100+ entries is visually lifeless. Manual per-category images don't scale. Satori is the emerging standard for static site OG generation and the input (title, category, summary) is already in frontmatter.

Cache strategy: **gitignore, regenerate each build**. Deterministic from frontmatter, no repo bloat (estimated 8 MB avoided). Content edits auto-reflect with no cache invalidation.

Card layout (v1):
- 1200 × 630 px (Twitter large-image / OG standard)
- Category badge (top-left), using site `--color-wiki` palette per category
- Title (large, Pretendard Variable, site font)
- Summary (1-2 lines, muted)
- Horizontal rule
- "AIKI" site brand mark (bottom-right)

Fallback when satori fails: BaseLayout site default. Unlikely to occur — input is deterministic.

### D5. Meta tag set — OG + Twitter
`BaseLayout.astro` `<head>` adds:
- `og:type` (always `article` on detail pages, `website` elsewhere)
- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`
- `og:image` (absolute URL, resolved from `Astro.site`)
- `twitter:card` = `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image`

`BaseLayout` gains an optional `ogImage` prop. When absent, falls back to `/softdaddy-logo.jpg`.

## Architecture

```
                      ┌───────────────────────────────┐
                      │   BaseLayout.astro            │
                      │   <head>                      │
                      │    og:* + twitter:*           │
                      │    ogImage prop + fallback    │
                      └──────────┬────────────────────┘
                                 │
                    ┌────────────┴─────────────┐
                    │                          │
            ┌───────▼────────┐        ┌────────▼────────┐
            │ news/[slug]    │        │ wiki/[slug]     │
            │ passes         │        │ passes          │
            │ /og/news/      │        │ /og/wiki/       │
            │ {slug}.jpg     │        │ {slug}.png      │
            └───────┬────────┘        └────────┬────────┘
                    │                          │
            ┌───────▼────────┐        ┌────────▼────────┐
            │ public/og/news/│        │ public/og/wiki/ │
            │ committed      │        │ gitignored      │
            └───────┬────────┘        └────────┬────────┘
                    │                          │
         ┌──────────▼──────────┐     ┌─────────▼────────────┐
         │ scripts/            │     │ scripts/             │
         │ fetch-news-og.mjs   │     │ gen-wiki-og.mjs      │
         │                     │     │                      │
         │ Docs threads.js port│     │ satori + resvg       │
         │ YouTube/Reddit/html │     │ title+category card  │
         │ 8s timeout, 200KB   │     │ ~50ms per entry      │
         │ runs in CI pre-build│     │ runs in CI pre-build │
         └─────────────────────┘     └──────────────────────┘
```

## Components & interfaces

### `scripts/fetch-news-og.mjs`
**Purpose:** populate `public/og/news/` from each news entry's `sourceUrl`.

**Behavior:**
- Scans `src/content/news/ko/` for entries with `sourceUrl` and no existing cached image
- For each, runs the ported `fetchOgImage(sourceUrl)`:
  - YouTube → construct `img.youtube.com/vi/{id}/hqdefault.jpg` directly
  - Reddit → fetch `.json` API, walk `preview.images[0].source.url → url_overridden_by_dest → thumbnail`
  - Other → fetch HTML, regex `<meta property="og:image">`
  - Redirects followed, 8 s timeout, 200 KB response cap
- Downloads result to `public/og/news/{slug}.jpg`
- Failures recorded in `data/og-failures.json` (does not crash build)

**Dependencies:** Node built-ins only (`https`, `http`, `fs`, `child_process.execSync` for curl fallback to Reddit). No npm additions.

### `scripts/gen-wiki-og.mjs`
**Purpose:** generate `public/og/wiki/{slug}.png` for every wiki entry.

**Behavior:**
- Scans `src/content/wiki/ko/` entries
- For each, constructs the satori JSX tree with title, category badge, summary, brand mark
- Loads Pretendard Variable font buffer (from `@fontsource` or bundled)
- Renders SVG via satori, converts to PNG via resvg
- Writes to `public/og/wiki/{slug}.png`

**Dependencies (new):**
- `satori`
- `@resvg/resvg-js`
- `@fontsource/pretendard` (or manual font file)

### `BaseLayout.astro` changes
Props:
```ts
interface Props {
    title?: string;
    description?: string;
    ogImage?: string;  // relative or absolute; resolved to absolute in component
}
```

Head additions listed in D5. Absolute URL resolution:
```ts
const absoluteOgImage = ogImage
    ? new URL(ogImage, Astro.site).href
    : new URL('/softdaddy-logo.jpg', Astro.site).href;
```

### Detail page changes
`src/pages/ko/news/[...slug].astro`:
```astro
<BaseLayout
    title={entry.data.title}
    description={entry.data.summary}
    ogImage={`/og/news/${slug}.jpg`}
>
```

`src/pages/ko/wiki/[...slug].astro`:
```astro
<BaseLayout
    title={entry.data.title}
    description={entry.data.summary}
    ogImage={`/og/wiki/${entry.data.term}.png`}
>
```

### `.github/workflows/deploy.yml` additions
Before `astro build`:
```yaml
- run: node scripts/fetch-news-og.mjs
- name: Commit new news thumbnails
  run: |
    git add public/og/news data/og-failures.json
    git diff --cached --quiet || git commit -m "chore: refresh news og thumbnails"
    git diff --cached --quiet || git push
- run: node scripts/gen-wiki-og.mjs
- run: npm run build
```

Workflow permission: `contents: write` required for the push step.

### `.gitignore` addition
```
public/og/wiki/
```

## Data flow

**News page request** (runtime is pure static):
1. Reader loads `/ko/news/{slug}/`
2. Browser reads `og:image` → `https://aiki.softdaddy-o.com/og/news/{slug}.jpg`
3. Platform (X/Threads/etc.) fetches the image at first share-preview render, caches it
4. Card shows thumbnail + title + description

**Build time:**
1. GitHub Action triggers on push to `main`
2. `fetch-news-og.mjs` fills missing news thumbnails → commits + pushes if any added
3. (If push, a new workflow run kicks in with the new commit)
4. `gen-wiki-og.mjs` regenerates wiki cards → writes to gitignored dir
5. `astro build` produces `dist/`
6. `dist/` deployed to GitHub Pages

## Error handling

| Case | Behavior |
|---|---|
| News sourceUrl fetch timeout | Logged to `og-failures.json`, BaseLayout uses default fallback image, retry next build |
| News source returns no `og:image` | Same as above |
| News source blocks bot/curl | Same as above; Reddit has curl fallback inside the port |
| Satori throws on wiki entry | Logged to stderr, script continues to next entry, BaseLayout falls back to default |
| Font file missing | Script fails loudly — this is a setup bug, not data — must fix before ship |
| CI push fails (permission) | Workflow fails loudly; fix permissions once, then succeeds |

## Testing plan

1. **Unit — `BaseLayout`**: render with and without `ogImage` prop, assert all meta tags present and `og:image` absolute URL resolution.
2. **Integration — `fetch-news-og.mjs`**: run locally against 5 real news entries spanning YouTube, Reddit, arXiv, and a generic blog. Verify thumbnails land in `public/og/news/`.
3. **Integration — `gen-wiki-og.mjs`**: run locally against at least one wiki entry per category (`concept`, `technique`, `framework`, `tool`, `model`). Visually inspect 5 PNGs.
4. **End-to-end**: deploy to staging branch or preview. Use:
   - Twitter Card Validator: `https://cards-dev.twitter.com/validator`
   - Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/`
   - LinkedIn Post Inspector: `https://www.linkedin.com/post-inspector/`
5. **Regression**: verify homepage and list pages still render (they use default `ogImage` fallback, not a missing path).

## File changes summary

```
NEW:
  scripts/fetch-news-og.mjs
  scripts/gen-wiki-og.mjs
  public/og/news/.gitkeep
  data/og-failures.json
  docs/superpowers/specs/2026-04-10-aiki-share-meta-og-images-design.md

MODIFIED:
  src/layouts/BaseLayout.astro
  src/pages/ko/news/[...slug].astro
  src/pages/ko/wiki/[...slug].astro
  package.json (satori, @resvg/resvg-js, @fontsource/pretendard)
  .github/workflows/deploy.yml
  .gitignore
```

## Risks & open items

| Risk | Mitigation |
|---|---|
| `f:/src3/Docs/social-posting/threads.js` license | Internal sibling project, assumed OK; confirm with owner before port |
| Pretendard font buffer for satori | Use `@fontsource/pretendard` variable weight, load at script start |
| Wiki build time grows with entries | ~50 ms × 100 entries = ~5 s. Acceptable under 200 entries. Reassess at 500+. |
| News repo bloat from committed JPGs | 200 KB cap × ~100 entries = ~20 MB. Acceptable. |
| CI push → infinite loop | Push only commits changes; if nothing changed, no push. No loop. |
| `contents: write` permission not granted | Workflow explicitly requests it; one-time setup |
| Umami analytics script interaction | None — independent code path |

## Rollout

1. Implement behind no feature flag (low-risk, reversible)
2. Ship in one PR covering all files above
3. Post-deploy: manually validate 3-5 pages using the external card validators
4. If satori or news fetch cause issues, revert the deploy workflow step; site continues to work (fallback image)

## Success criteria

- [ ] All news detail pages produce a non-default thumbnail in Twitter Card Validator
- [ ] All wiki detail pages produce a unique branded card image
- [ ] Share buttons appear directly below the h1 on both detail page types
- [ ] `og:description` matches on-page summary exactly
- [ ] Build time increase stays under 15 s
- [ ] No additional runtime JS shipped to visitors
