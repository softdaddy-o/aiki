# AIKI Share Meta & OG Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every AIKI news and wiki detail page a rich social preview with thumbnail and description by wiring OG/Twitter meta tags, porting a news thumbnail fetcher from the sibling Docs project, and generating per-entry wiki cards at build time.

**Architecture:** BaseLayout.astro owns all meta tag output and accepts an `ogImage` prop. News detail pages pass a committed path `/og/news/{slug}.jpg` produced by `scripts/fetch-news-og.mjs` (ported from `f:/src3/Docs/social-posting/threads.js`). Wiki detail pages pass a gitignored path `/og/wiki/{term}.png` produced by `scripts/gen-wiki-og.mjs` using satori + @resvg/resvg-js with Pretendard Regular. The wiki generator runs in `prebuild` (deterministic). The news fetcher is a manual npm script users run after adding news content.

**Tech Stack:** Node.js 22 ESM, Astro 6.1.3, satori, satori-html, @resvg/resvg-js, Pretendard TTF font (committed).

**Spec:** `docs/superpowers/specs/2026-04-10-aiki-share-meta-og-images-design.md`

**Deviation from spec (§3 CI integration):** The spec describes deploy.yml fetching and pushing news thumbnails from CI. This plan instead keeps `fetch-news-og.mjs` as a **manual npm script** run by the author when adding news. This avoids the `contents: write` permission and the self-triggered workflow loop. Wiki generation still runs automatically in `prebuild` because it is deterministic and needs no network.

---

## File Structure

```
NEW:
  scripts/fetch-news-og.mjs         — port of Docs threads.js fetchOgImage/fetchRedditPreview/downloadFile
  scripts/gen-wiki-og.mjs           — satori card generator for wiki entries
  scripts/assets/pretendard-regular.ttf — font buffer for satori (~1MB, committed)
  scripts/assets/.gitkeep
  public/og/news/.gitkeep           — ensure dir exists pre-first-fetch
  data/og-failures.json             — news fetch failure log (committed)

MODIFIED:
  src/layouts/BaseLayout.astro               — ogImage prop + OG/Twitter meta tags
  src/pages/ko/news/[...slug].astro          — pass ogImage prop
  src/pages/ko/wiki/[...slug].astro          — pass ogImage prop
  package.json                               — add deps + fetch:news-og/gen:wiki-og scripts
  .gitignore                                 — exclude public/og/wiki/
```

## Responsibility breakdown

- **BaseLayout.astro**: sole owner of every OG/Twitter meta tag. Other files only pass an `ogImage` path.
- **fetch-news-og.mjs**: stateless batch job that scans news entries, fetches missing thumbnails, writes JPGs, and logs failures. Pure Node (no npm deps).
- **gen-wiki-og.mjs**: stateless batch job that regenerates every wiki card from frontmatter + font buffer. Deterministic; safe to run every build.
- **Detail pages**: thin — they derive the `ogImage` path from the entry and forward it.
- **deploy.yml**: untouched by news fetch (manual). Adds nothing — `gen-wiki-og` runs via `prebuild`, which `npm run build` already triggers.

---

## Testing approach (pragmatic for a project with no test framework)

AIKI has no Jest/Vitest setup. Each task uses **verification commands** that must produce specific output. The flow is:

1. Run a command **before** implementation → confirm it fails (no match, file missing, etc.)
2. Implement
3. Run the same command → confirm it passes

This is the TDD loop adapted to "grep dist/ and inspect generated files". Nothing is added to the project for a test framework.

---

## Task 1: Install satori, satori-html, @resvg/resvg-js, gray-matter

`gray-matter` is included to parse YAML frontmatter correctly (the collection files may use multi-line summaries with `|` or `>`, which a regex parser would mishandle).

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verify deps not installed**

Run: `node --input-type=module -e "import('satori').then(()=>console.log('present')).catch(e=>console.log('missing:', e.code))"`
Expected: prints `missing: ERR_MODULE_NOT_FOUND` (or similar "not found" message).

- [ ] **Step 2: Install**

Run:
```bash
npm install --save satori satori-html @resvg/resvg-js gray-matter
```

- [ ] **Step 3: Verify install**

Run: `node --input-type=module -e "import satori from 'satori'; import { html } from 'satori-html'; import { Resvg } from '@resvg/resvg-js'; import matter from 'gray-matter'; console.log(typeof satori, typeof html, typeof Resvg, typeof matter)"`
Expected: `function function function function`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add satori, resvg-js, gray-matter for og card generation"
```

---

## Task 2: Provision Pretendard TTF font for satori

Satori requires a TTF/OTF font buffer (not woff2). Pretendard provides a static TTF in GitHub releases. Commit one weight (Regular) under `scripts/assets/`.

**Files:**
- Create: `scripts/assets/pretendard-regular.ttf` (~1 MB binary)
- Create: `scripts/assets/.gitkeep`

- [ ] **Step 1: Verify file missing**

Run: `ls scripts/assets/pretendard-regular.ttf 2>&1`
Expected: `No such file or directory` or equivalent error.

- [ ] **Step 2: Download font**

Run (bash):
```bash
mkdir -p scripts/assets
curl -L -o scripts/assets/pretendard-regular.ttf \
  https://github.com/orioncactus/pretendard/raw/main/packages/pretendard/dist/public/static/Pretendard-Regular.ttf
```

- [ ] **Step 3: Verify file exists and looks like a TTF**

Run (bash):
```bash
ls -lh scripts/assets/pretendard-regular.ttf
head -c 4 scripts/assets/pretendard-regular.ttf | xxd
```
Expected:
- File size roughly 1–2 MB.
- First 4 bytes should be `00010000` (TTF magic) — xxd shows `0000: 0001 0000`.

- [ ] **Step 4: Create .gitkeep (for future sibling files)**

Write empty file `scripts/assets/.gitkeep`.

- [ ] **Step 5: Commit**

```bash
git add scripts/assets/pretendard-regular.ttf scripts/assets/.gitkeep
git commit -m "chore: add pretendard regular ttf for satori card generation"
```

---

## Task 3: Set up output directories, failure log, and gitignore

**Files:**
- Create: `public/og/news/.gitkeep`
- Create: `data/og-failures.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create news output directory with .gitkeep**

Run:
```bash
mkdir -p public/og/news
```

Write empty file `public/og/news/.gitkeep`.

- [ ] **Step 2: Create empty failure log**

Write `data/og-failures.json`:
```json
{}
```

- [ ] **Step 3: Read current .gitignore**

Run: `cat .gitignore`

Note whatever is in it. Do NOT delete existing entries.

- [ ] **Step 4: Append wiki output ignore**

Append to `.gitignore`:
```
# Generated wiki OG cards (deterministic, regenerated each build)
public/og/wiki/
```

- [ ] **Step 5: Verify gitignore works**

Run:
```bash
mkdir -p public/og/wiki
touch public/og/wiki/test.png
git status --short public/og/wiki/
```
Expected: no output (ignored).

Clean up: `rm public/og/wiki/test.png`

- [ ] **Step 6: Commit**

```bash
git add public/og/news/.gitkeep data/og-failures.json .gitignore
git commit -m "chore: scaffold og output dirs and failure log"
```

---

## Task 4: Port fetch-news-og.mjs from Docs threads.js

Port `fetchOgImage`, `fetchRedditPreview`, `downloadFile` from `f:/src3/Docs/social-posting/threads.js` (lines 355-446) to ESM. Add a driver that reads all news entries and fills missing `public/og/news/{slug}.jpg`.

**Files:**
- Create: `scripts/fetch-news-og.mjs`

### Key design points
- Script **only** touches entries where `sourceUrl` exists and `public/og/news/{slug}.jpg` does not.
- `slug` is derived from file path: strip `src/content/news/`, strip leading `ko/`, strip `.md` → e.g. `2016-03-15-alphago-lee-sedol`.
- Failures logged to `data/og-failures.json` with `{ slug: reason }` pairs. Successful slugs are removed from the log on retry.
- Native Node `https`, `http`, `fs`, `child_process.execSync` for Reddit (Reddit returns 403 to plain Node).
- Frontmatter parsed via `gray-matter` (installed in Task 1).

- [ ] **Step 1: Write verification that script does not exist yet**

Run: `node scripts/fetch-news-og.mjs 2>&1 | head -5`
Expected: error like `Cannot find module` or `Error: Cannot find`.

- [ ] **Step 2: Create the script file**

Create `scripts/fetch-news-og.mjs` with this exact content:

```javascript
#!/usr/bin/env node
// Fetch og:image from each news entry's sourceUrl and cache under public/og/news/{slug}.jpg.
// Ported from f:/src3/Docs/social-posting/threads.js — fetchOgImage / fetchRedditPreview / downloadFile.

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src/content/news');
const OUT_DIR = path.join(ROOT, 'public/og/news');
const FAILURES_PATH = path.join(ROOT, 'data/og-failures.json');

function extractYouTubeId(url) {
    const m = url.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
}

function fetchOgImage(pageUrl) {
    const ytId = extractYouTubeId(pageUrl);
    if (ytId) {
        return Promise.resolve(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
    }

    const redditMatch = pageUrl.match(/reddit\.com\/r\/[^/]+\/comments\/([a-z0-9]+)/i);
    if (redditMatch) {
        return fetchRedditPreview(pageUrl);
    }

    return new Promise((resolve) => {
        const lib = pageUrl.startsWith('https') ? https : http;
        const req = lib.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return resolve(fetchOgImage(res.headers.location));
            }
            let data = '';
            res.on('data', chunk => { data += chunk; if (data.length > 200000) req.destroy(); });
            res.on('end', () => {
                const match = data.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                    || data.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
                resolve(match ? match[1].replace(/&amp;/g, '&') : null);
            });
        });
        req.on('error', () => resolve(null));
        req.on('timeout', () => { req.destroy(); resolve(null); });
    });
}

function fetchRedditPreview(redditUrl) {
    const jsonUrl = redditUrl.replace(/\/?(\?.*)?$/, '/.json');
    const fullUrl = jsonUrl.startsWith('https') ? jsonUrl : 'https://www.' + jsonUrl;
    try {
        const raw = execSync(
            `curl -s "${fullUrl}" -H "User-Agent: AIKI/1.0" -H "Accept: application/json" --max-time 10`,
            { encoding: 'utf-8', maxBuffer: 1024 * 1024 }
        );
        const json = JSON.parse(raw);
        const post = json[0].data.children[0].data;
        const previewUrl = post.preview
            && post.preview.images
            && post.preview.images[0]
            && post.preview.images[0].source
            && post.preview.images[0].source.url;
        if (previewUrl) {
            return Promise.resolve(previewUrl.replace(/&amp;/g, '&'));
        }
        if (post.url_overridden_by_dest && /\.(jpg|jpeg|png|gif|webp)/i.test(post.url_overridden_by_dest)) {
            return Promise.resolve(post.url_overridden_by_dest);
        }
        if (post.thumbnail && post.thumbnail.startsWith('http')) {
            return Promise.resolve(post.thumbnail.replace(/&amp;/g, '&'));
        }
        return Promise.resolve(null);
    } catch {
        return Promise.resolve(null);
    }
}

function downloadFile(fileUrl, destPath) {
    return new Promise((resolve) => {
        const lib = fileUrl.startsWith('https') ? https : http;
        const file = fs.createWriteStream(destPath);
        lib.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                file.close();
                fs.unlink(destPath, () => {});
                return resolve(downloadFile(res.headers.location, destPath));
            }
            if (res.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => {});
                return resolve(false);
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', () => { fs.unlink(destPath, () => {}); resolve(false); });
    });
}

function walkMarkdown(dir) {
    const results = [];
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            results.push(...walkMarkdown(full));
        } else if (name.endsWith('.md')) {
            results.push(full);
        }
    }
    return results;
}

function slugFromPath(mdPath) {
    const rel = path.relative(NEWS_DIR, mdPath).replace(/\\/g, '/');
    return rel.replace(/^ko\//, '').replace(/\.md$/, '');
}

async function main() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
    const failures = fs.existsSync(FAILURES_PATH)
        ? JSON.parse(fs.readFileSync(FAILURES_PATH, 'utf-8'))
        : {};

    const files = walkMarkdown(NEWS_DIR);
    let fetched = 0;
    let skipped = 0;
    let failed = 0;

    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8');
        const { data: fm } = matter(source);
        if (fm.lang && fm.lang !== 'ko') continue;
        if (!fm.sourceUrl) continue;

        const slug = slugFromPath(file);
        const outPath = path.join(OUT_DIR, `${slug}.jpg`);
        if (fs.existsSync(outPath)) {
            delete failures[slug];
            skipped++;
            continue;
        }

        console.log(`[fetch] ${slug} <- ${fm.sourceUrl}`);
        const ogUrl = await fetchOgImage(fm.sourceUrl);
        if (!ogUrl) {
            failures[slug] = 'no og:image found';
            failed++;
            continue;
        }
        const ok = await downloadFile(ogUrl, outPath);
        if (ok) {
            delete failures[slug];
            fetched++;
        } else {
            failures[slug] = `download failed: ${ogUrl}`;
            failed++;
        }
    }

    fs.writeFileSync(FAILURES_PATH, JSON.stringify(failures, null, 2) + '\n');
    console.log(`\nfetched=${fetched} skipped=${skipped} failed=${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 3: Run the script**

Run: `node scripts/fetch-news-og.mjs`
Expected: prints `[fetch] <slug> <- <url>` for each news entry without a cached image, ends with `fetched=N skipped=M failed=K`. **Do not require all to succeed** — some sources block bots.

- [ ] **Step 4: Verify at least one thumbnail landed**

Run (bash):
```bash
ls public/og/news/ | wc -l
```
Expected: > 1 (.gitkeep plus at least one fetched .jpg).

- [ ] **Step 5: Verify failure log is valid JSON**

Run: `node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('data/og-failures.json', 'utf-8'))).length)"`
Expected: prints a number (0 or more).

- [ ] **Step 6: Commit the script and whatever thumbnails arrived**

```bash
git add scripts/fetch-news-og.mjs public/og/news/ data/og-failures.json
git commit -m "feat: add news og image fetcher ported from docs threads.js"
```

---

## Task 5: Write gen-wiki-og.mjs (satori card generator)

Generate a 1200×630 PNG card per wiki entry using satori + satori-html + @resvg/resvg-js. Output goes to the gitignored `public/og/wiki/{term}.png`.

**Files:**
- Create: `scripts/gen-wiki-og.mjs`

### Key design points
- Read all wiki markdown files via the same `walkMarkdown` pattern.
- Filter to `lang: ko` entries.
- Need frontmatter fields: `term`, `title`, `summary`, `category`.
- Use `satori-html` tagged template to build the card markup.
- Inline CSS via `style=` attributes (satori does not support classes).
- Category color map hardcoded in the script (mirrors the site's `--color-wiki` family).
- Font loaded once, reused across all entries.

- [ ] **Step 1: Verify script does not exist yet**

Run: `node scripts/gen-wiki-og.mjs 2>&1 | head -5`
Expected: `Cannot find module` error.

- [ ] **Step 2: Create the script file**

Create `scripts/gen-wiki-og.mjs` with this exact content:

```javascript
#!/usr/bin/env node
// Generate per-entry OG card PNGs for wiki pages using satori + resvg.
// Output: public/og/wiki/{term}.png (gitignored, regenerated every build).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(ROOT, 'src/content/wiki');
const OUT_DIR = path.join(ROOT, 'public/og/wiki');
const FONT_PATH = path.join(ROOT, 'scripts/assets/pretendard-regular.ttf');

const CATEGORY_LABEL = {
    concept: '개념',
    technique: '기법',
    framework: '프레임워크',
    tool: '도구',
    model: '모델',
};

const CATEGORY_COLOR = {
    concept: '#8b5cf6',
    technique: '#06b6d4',
    framework: '#f59e0b',
    tool: '#10b981',
    model: '#ec4899',
};

function walkMarkdown(dir) {
    const results = [];
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) results.push(...walkMarkdown(full));
        else if (name.endsWith('.md')) results.push(full);
    }
    return results;
}

function truncate(text, max) {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max - 1).trimEnd() + '…';
}

function buildCardMarkup({ title, summary, category }) {
    const label = CATEGORY_LABEL[category] || category;
    const color = CATEGORY_COLOR[category] || '#64748b';
    const safeTitle = truncate(title, 40);
    const safeSummary = truncate(summary, 110);
    return html`
        <div style="display: flex; flex-direction: column; width: 1200px; height: 630px; background: #0b0b0f; padding: 72px; font-family: Pretendard; color: #f5f5f7;">
            <div style="display: flex; align-items: center; font-size: 28px; font-weight: 700; color: #000; background: ${color}; padding: 8px 20px; border-radius: 8px; align-self: flex-start;">${label}</div>
            <div style="display: flex; font-size: 84px; font-weight: 700; line-height: 1.15; margin-top: 48px; letter-spacing: -0.02em;">${safeTitle}</div>
            <div style="display: flex; font-size: 34px; font-weight: 400; line-height: 1.45; color: #a1a1aa; margin-top: 32px;">${safeSummary}</div>
            <div style="display: flex; flex-grow: 1;"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #27272a; padding-top: 28px;">
                <div style="display: flex; font-size: 28px; color: #71717a;">aiki.softdaddy-o.com</div>
                <div style="display: flex; font-size: 40px; font-weight: 700; letter-spacing: 0.08em;">AIKI</div>
            </div>
        </div>
    `;
}

async function main() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
    if (!fs.existsSync(FONT_PATH)) {
        console.error(`FATAL: font missing at ${FONT_PATH}. Run Task 2 of the plan.`);
        process.exit(1);
    }
    const fontData = fs.readFileSync(FONT_PATH);

    const files = walkMarkdown(WIKI_DIR);
    let generated = 0;
    let failed = 0;

    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8');
        const { data: fm } = matter(source);
        if (fm.lang && fm.lang !== 'ko') continue;
        if (!fm.term || !fm.title) continue;

        const outPath = path.join(OUT_DIR, `${fm.term}.png`);
        try {
            const markup = buildCardMarkup({
                title: fm.title,
                summary: fm.summary || '',
                category: fm.category || 'concept',
            });
            const svg = await satori(markup, {
                width: 1200,
                height: 630,
                fonts: [{ name: 'Pretendard', data: fontData, weight: 400, style: 'normal' }],
            });
            const png = new Resvg(svg).render().asPng();
            fs.writeFileSync(outPath, png);
            generated++;
        } catch (err) {
            console.error(`[fail] ${fm.term}: ${err.message}`);
            failed++;
        }
    }

    console.log(`\ngenerated=${generated} failed=${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
```

- [ ] **Step 3: Run the script**

Run: `node scripts/gen-wiki-og.mjs`
Expected:
- No crash.
- Prints `generated=N failed=0` where N > 0.

If satori reports "missing font weight" for Pretendard, the font file at `scripts/assets/pretendard-regular.ttf` is wrong — re-run Task 2.

- [ ] **Step 4: Verify output**

Run (bash):
```bash
ls public/og/wiki/ | head -5
head -c 8 public/og/wiki/$(ls public/og/wiki/ | head -1) | xxd
```
Expected:
- At least one `.png` listed.
- First 8 bytes are `89504e47 0d0a1a0a` (PNG magic).

- [ ] **Step 5: Visually spot-check one card**

Open one generated PNG in an image viewer. Confirm:
- Dark background, Korean title readable, category badge top-left, AIKI brand bottom-right.
- No missing glyph boxes (□□□) — if present, font loading failed.

- [ ] **Step 6: Commit the script (NOT the PNGs — they're gitignored)**

```bash
git add scripts/gen-wiki-og.mjs
git status --short
```
Expected `git status` shows **only** `scripts/gen-wiki-og.mjs` staged. No `.png` files. If PNGs appear, Task 3 gitignore is broken — fix before committing.

```bash
git commit -m "feat: generate wiki og card pngs via satori"
```

---

## Task 6: Add OG/Twitter meta tags to BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Verify meta tags absent in current build**

Run:
```bash
npm run build
grep -l 'og:title' dist/ 2>/dev/null | head -3
```
Expected: no output (no files contain `og:title`).

- [ ] **Step 2: Read current BaseLayout head section and Props interface**

Open `src/layouts/BaseLayout.astro`. Find the `interface Props` block (around line 5) and the `<head>` block (around line 34).

- [ ] **Step 3: Extend Props and add meta tags**

Modify `src/layouts/BaseLayout.astro`:

Change the Props interface from:
```ts
interface Props {
    title?: string;
    description?: string;
}
```
to:
```ts
interface Props {
    title?: string;
    description?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
}
```

Change the destructuring from:
```ts
const { title, description } = Astro.props;
```
to:
```ts
const { title, description, ogImage, ogType = 'website' } = Astro.props;
const siteUrl = Astro.site ? new URL(Astro.url.pathname, Astro.site).href : Astro.url.href;
const ogImageUrl = new URL(ogImage ?? '/softdaddy-logo.jpg', Astro.site ?? Astro.url).href;
```

Add these meta tags inside `<head>` **immediately after** the existing `<meta name="description" content={siteDesc} />` line:
```astro
    <link rel="canonical" href={siteUrl} />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={siteTitle} />
    <meta property="og:description" content={siteDesc} />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:site_name" content="AIKI" />
    <meta property="og:locale" content={lang === 'ko' ? 'ko_KR' : 'en_US'} />
    <meta property="og:image" content={ogImageUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={siteTitle} />
    <meta name="twitter:description" content={siteDesc} />
    <meta name="twitter:image" content={ogImageUrl} />
```

- [ ] **Step 4: Rebuild and verify**

Run:
```bash
npm run build
grep -l 'og:title' dist/ko/index.html dist/ 2>/dev/null
```

Run (bash):
```bash
grep -c 'og:title' dist/ko/index.html
grep 'twitter:card' dist/ko/index.html
grep 'softdaddy-logo.jpg' dist/ko/index.html
```
Expected:
- `og:title` grep count = 1
- `twitter:card` line shown with `summary_large_image`
- `softdaddy-logo.jpg` present (home page uses fallback because it does not pass `ogImage`)

- [ ] **Step 5: Verify absolute URL format for og:image on a page**

Run (bash):
```bash
grep 'property="og:image"' dist/ko/index.html
```
Expected: contains `https://aiki.softdaddy-o.com/softdaddy-logo.jpg` (absolute URL, not a relative path).

If it shows a relative path, check `astro.config.mjs` has `site: 'https://aiki.softdaddy-o.com'`.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add og and twitter meta tags to BaseLayout"
```

---

## Task 7: Wire news detail page to pass ogImage

**Files:**
- Modify: `src/pages/ko/news/[...slug].astro`

- [ ] **Step 1: Verify news pages currently use fallback og:image**

Run (bash):
```bash
npm run build
grep 'property="og:image"' dist/ko/news/2016-03-15-alphago-lee-sedol/index.html
```
Expected: `/softdaddy-logo.jpg` (fallback — we have not passed ogImage yet).

- [ ] **Step 2: Derive slug and pass ogImage prop**

Open `src/pages/ko/news/[...slug].astro`.

Inside the frontmatter script (the `---` block at top), **after** `const fc = entry.data.factCheck;` add:
```ts
const slug = entry.id.replace(/^ko\//, '');
const ogImage = `/og/news/${slug}.jpg`;
```

Change:
```astro
<BaseLayout title={entry.data.title}>
```
to:
```astro
<BaseLayout title={entry.data.title} description={entry.data.summary} ogImage={ogImage} ogType="article">
```

- [ ] **Step 3: Rebuild and verify**

Run (bash):
```bash
npm run build
grep 'property="og:image"' dist/ko/news/2016-03-15-alphago-lee-sedol/index.html
```
Expected: URL ending in `/og/news/2016-03-15-alphago-lee-sedol.jpg`.

- [ ] **Step 4: Verify the JPG file is actually bundled in dist**

Run (bash):
```bash
ls dist/og/news/2016-03-15-alphago-lee-sedol.jpg 2>&1
```

If it exists, good. If missing, it means Task 4 could not fetch the thumbnail for this entry — that's acceptable (page still has `og:image` pointing to a 404, browsers will fail gracefully). Pick a news entry from `public/og/news/` that did succeed and verify its page:

```bash
ls public/og/news/*.jpg | head -1 | xargs -I {} basename {} .jpg
```
Then substitute that slug in the grep command above.

- [ ] **Step 5: Verify `og:type` is `article`**

Run: `grep 'og:type' dist/ko/news/2016-03-15-alphago-lee-sedol/index.html`
Expected: `content="article"`.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ko/news/[...slug].astro
git commit -m "feat: wire news detail pages to pass ogImage prop"
```

---

## Task 8: Wire wiki detail page to pass ogImage

**Files:**
- Modify: `src/pages/ko/wiki/[...slug].astro`

- [ ] **Step 1: Ensure wiki cards exist for verification**

Run: `node scripts/gen-wiki-og.mjs`
Expected: `generated=N failed=0`.

- [ ] **Step 2: Pass ogImage prop from the wiki page**

Open `src/pages/ko/wiki/[...slug].astro`.

Inside the frontmatter script, **after** `const shareUrl = Astro.url.href;` (around line 54) add:
```ts
const ogImage = `/og/wiki/${entry.data.term}.png`;
```

Change:
```astro
<BaseLayout title={entry.data.title}>
```
to:
```astro
<BaseLayout title={entry.data.title} description={entry.data.summary} ogImage={ogImage} ogType="article">
```

- [ ] **Step 3: Rebuild**

Run: `npm run build`
Expected: build succeeds without errors.

- [ ] **Step 4: Verify a wiki page uses its card**

Run (bash): pick the first wiki term and verify:
```bash
TERM=$(ls public/og/wiki/*.png | head -1 | xargs -I {} basename {} .png)
echo "checking $TERM"
grep 'property="og:image"' dist/ko/wiki/$TERM/index.html
```
Expected: URL ending in `/og/wiki/<term>.png`.

- [ ] **Step 5: Verify the PNG is actually in dist**

Run (bash):
```bash
TERM=$(ls public/og/wiki/*.png | head -1 | xargs -I {} basename {} .png)
ls dist/og/wiki/$TERM.png
```
Expected: file exists (Astro copies `public/` into `dist/` during build).

- [ ] **Step 6: Commit**

```bash
git add src/pages/ko/wiki/[...slug].astro
git commit -m "feat: wire wiki detail pages to pass ogImage prop"
```

---

## Task 9: Add npm scripts and hook wiki generation into prebuild

Wire the two scripts into `package.json`:
- `fetch:news-og` — manual (user runs after adding news content)
- `gen:wiki-og` — automatic via `prebuild` (runs before every `npm run build`)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read current package.json scripts block**

Open `package.json`. Note the current `scripts` object.

- [ ] **Step 2: Add the two new scripts and chain gen:wiki-og into prebuild**

Change the `prebuild` line from:
```json
"prebuild": "node scripts/aiki-pre-publish-check.cjs && node scripts/aiki-pre-publish-check.cjs --all",
```
to:
```json
"prebuild": "node scripts/aiki-pre-publish-check.cjs && node scripts/aiki-pre-publish-check.cjs --all && node scripts/gen-wiki-og.mjs",
```

Add these two new entries anywhere in the `scripts` object:
```json
"fetch:news-og": "node scripts/fetch-news-og.mjs",
"gen:wiki-og": "node scripts/gen-wiki-og.mjs"
```

- [ ] **Step 3: Verify scripts are runnable**

Run: `npm run gen:wiki-og`
Expected: prints `generated=N failed=0`.

Run: `npm run fetch:news-og`
Expected: prints `fetched=0 skipped=N failed=K` (since everything already cached locally).

- [ ] **Step 4: Verify prebuild chain still works**

Run: `npm run build`
Expected:
- `prebuild` runs the two `aiki-pre-publish-check.cjs` calls.
- Then runs `gen-wiki-og.mjs` and prints `generated=N failed=0`.
- Then `astro build` runs and succeeds.

- [ ] **Step 5: Commit**

```bash
git add package.json
git commit -m "feat: add fetch:news-og and gen:wiki-og npm scripts; run wiki gen in prebuild"
```

---

## Task 10: End-to-end deploy + card validator verification

This task is the full end-to-end smoke test after everything lands.

- [ ] **Step 1: Push all commits**

Run:
```bash
git log --oneline main...origin/main
git push
```
Expected: Tasks 1–9 commits flow to origin.

- [ ] **Step 2: Watch the GitHub Actions build**

Run: `gh run watch`
Expected: "Deploy to GitHub Pages" workflow completes successfully.

If it fails, the most likely cause is `gen-wiki-og.mjs` crashing in CI — check the log. If the font file did not commit (Task 2), add it and retry.

- [ ] **Step 3: Wait for deploy to go live**

Run: `curl -sI https://aiki.softdaddy-o.com/ko/ | head -1`
Expected: `HTTP/2 200`.

- [ ] **Step 4: Verify a live wiki page has the new meta tags**

Pick a wiki term that exists (e.g., `transformer` if available, otherwise inspect the wiki index).

Run:
```bash
curl -s https://aiki.softdaddy-o.com/ko/wiki/transformer/ | grep -E '(og:image|twitter:card|og:title)'
```
Expected: all three meta lines present, `og:image` pointing to `https://aiki.softdaddy-o.com/og/wiki/transformer.png`.

- [ ] **Step 5: Verify the card image is actually served**

Run: `curl -sI https://aiki.softdaddy-o.com/og/wiki/transformer.png | head -1`
Expected: `HTTP/2 200`.

- [ ] **Step 6: Run external card validators**

Open each of these in the browser and paste a wiki detail URL:
- Twitter/X: `https://cards-dev.twitter.com/validator`
- Facebook: `https://developers.facebook.com/tools/debug/`
- LinkedIn: `https://www.linkedin.com/post-inspector/`

Expected: all three show a large preview card with the generated image, the Korean title, and the summary.

- [ ] **Step 7: Run the same check on one news page that has a fetched thumbnail**

Pick any slug from `public/og/news/` and repeat steps 4-6 against `/ko/news/<slug>/`.

- [ ] **Step 8: Document the manual workflow**

Add a section to the project README (or create `docs/og-images.md`) with this text:

```markdown
## OG Images

### News thumbnails
After adding a news entry with a `sourceUrl`, run:

    npm run fetch:news-og

This fetches the og:image from the source URL and writes it to
`public/og/news/{slug}.jpg`. Commit that file alongside the markdown.

If a source refuses the fetch it is recorded in `data/og-failures.json`
and the page falls back to the site default image.

### Wiki cards
Wiki OG cards are generated automatically on every build (via the
`prebuild` script). They are derived from frontmatter and are
gitignored at `public/og/wiki/`.

To regenerate manually:

    npm run gen:wiki-og
```

Decide where this belongs:
- If `README.md` exists in the project root, append to it.
- If not, create `docs/og-images.md` with the content above.

- [ ] **Step 9: Commit docs**

```bash
git add README.md docs/og-images.md 2>/dev/null || true
git commit -m "docs: document og image workflow"
git push
```

---

## Post-implementation checklist

- [ ] All 10 tasks committed.
- [ ] `git status` shows clean working tree.
- [ ] Live site passes all three external card validators on at least one news page and one wiki page.
- [ ] Issue #20 on GitHub can be updated with a comment: "Share meta + OG images shipped. Webmention / Bridgy Fed deferred."
- [ ] No uncommitted `public/og/wiki/*.png` files (they should be gitignored).

## Rollback plan

If a card validator flags a critical error post-deploy:
1. `git revert` Tasks 6-8 commits (BaseLayout + detail page wiring). Meta tags disappear, fallback to current state.
2. Keep Tasks 1-5 and 9 landed — scripts are inert without the wiring.
3. Investigate, re-wire, redeploy.

The file-fetching and card-generating scripts are harmless — they only touch `public/og/` and `data/og-failures.json`.
