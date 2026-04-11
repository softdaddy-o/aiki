#!/usr/bin/env node
// Generate deterministic fallback OG cards for news pages.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NEWS_DIR = path.join(ROOT, 'src/content/news');
const OUT_DIR = path.join(ROOT, 'public/og/news-fallback');
const FONT_PATH = path.join(ROOT, 'scripts/assets/pretendard-regular.ttf');

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

function truncate(text, maxLength) {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxLength) {
        return normalized;
    }
    return `${normalized.slice(0, maxLength - 1).trimEnd()}\u2026`;
}

function buildCardMarkup({ title, summary, date, tag }) {
    const safeTitle = truncate(title, 54);
    const safeSummary = truncate(summary, 120);
    const safeTag = truncate(tag || 'AI NEWS', 20).toUpperCase();

    return html`
        <div style="display:flex; flex-direction:column; width:1200px; height:630px; background:linear-gradient(135deg, #0b1020 0%, #111827 55%, #1d4ed8 100%); padding:72px; font-family:Pretendard; color:#f8fafc;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; font-size:28px; font-weight:700; letter-spacing:0.08em; color:#dbeafe; background:rgba(59,130,246,0.22); border:1px solid rgba(191,219,254,0.35); padding:10px 18px; border-radius:999px;">
                    ${safeTag}
                </div>
                <div style="display:flex; font-size:26px; color:#bfdbfe;">
                    ${date}
                </div>
            </div>
            <div style="display:flex; font-size:78px; font-weight:700; line-height:1.13; margin-top:54px; letter-spacing:-0.03em;">
                ${safeTitle}
            </div>
            <div style="display:flex; font-size:34px; line-height:1.45; color:#dbe4f3; margin-top:30px;">
                ${safeSummary}
            </div>
            <div style="display:flex; flex-grow:1;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:2px solid rgba(191,219,254,0.24); padding-top:26px;">
                <div style="display:flex; font-size:28px; color:#bfdbfe;">aiki.softdaddy-o.com</div>
                <div style="display:flex; font-size:42px; font-weight:700; letter-spacing:0.08em;">AIKI</div>
            </div>
        </div>
    `;
}

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    if (!fs.existsSync(FONT_PATH)) {
        console.error(`FATAL: font missing at ${FONT_PATH}`);
        process.exit(1);
    }

    const fontData = fs.readFileSync(FONT_PATH);
    for (const name of fs.readdirSync(OUT_DIR)) {
        if (name.endsWith('.png')) {
            fs.rmSync(path.join(OUT_DIR, name), { force: true });
        }
    }

    const files = walkMarkdown(NEWS_DIR);
    let generated = 0;
    let failed = 0;

    for (const file of files) {
        const source = fs.readFileSync(file, 'utf8');
        const { data: frontmatter } = matter(source);
        if (frontmatter.lang && frontmatter.lang !== 'ko') {
            continue;
        }

        const slug = path.relative(path.join(NEWS_DIR, 'ko'), file).replace(/\\/g, '/').replace(/\.md$/, '');
        const outPath = path.join(OUT_DIR, `${slug}.png`);

        try {
            const markup = buildCardMarkup({
                title: frontmatter.title ?? slug,
                summary: frontmatter.summary ?? '',
                date: String(frontmatter.date || '').slice(0, 10),
                tag: frontmatter.tags?.[0] || 'AI News',
            });
            const svg = await satori(markup, {
                width: 1200,
                height: 630,
                fonts: [{ name: 'Pretendard', data: fontData, weight: 400, style: 'normal' }],
            });
            const png = new Resvg(svg).render().asPng();
            fs.writeFileSync(outPath, png);
            generated++;
        } catch (error) {
            console.error(`[fail] ${slug}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\ngenerated=${generated} failed=${failed}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
