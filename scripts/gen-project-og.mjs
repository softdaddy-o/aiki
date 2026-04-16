#!/usr/bin/env node
// Generate per-entry OG card PNGs for project pages using satori + resvg.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PROJECTS_DIR = path.join(ROOT, 'src/content/projects');
const OUT_DIR = path.join(ROOT, 'public/og/projects');
const FONT_PATH = path.join(ROOT, 'scripts/assets/pretendard-regular.ttf');

const CATEGORY_LABEL = {
    library: '라이브러리',
    framework: '프레임워크',
    agent: '에이전트',
    model: '모델',
    tool: '도구',
    bot: '봇',
};

const CATEGORY_COLOR = {
    library: '#06b6d4',
    framework: '#f59e0b',
    agent: '#8b5cf6',
    model: '#ec4899',
    tool: '#10b981',
    bot: '#ef4444',
};

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
    if (!text) return '';
    const normalized = String(text).replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 1).trimEnd()}\u2026`;
}

function formatStars(value) {
    if (value >= 1000) {
        const compact = (value / 1000).toFixed(1);
        return (compact.endsWith('.0') ? compact.slice(0, -2) : compact) + 'k';
    }
    return String(value);
}

function buildCardMarkup({ title, summary, category, stars, license }) {
    const label = CATEGORY_LABEL[category] ?? category;
    const color = CATEGORY_COLOR[category] ?? '#64748b';
    const safeTitle = truncate(title, 32);
    const safeSummary = truncate(summary, 100);

    return html`
        <div style="display:flex; flex-direction:column; width:1200px; height:630px; background:#0b0b0f; padding:72px; font-family:Pretendard; color:#f5f5f7;">
            <div style="display:flex; align-items:center; gap:16px;">
                <div style="display:flex; align-items:center; font-size:26px; font-weight:700; color:#000; background:${color}; padding:8px 20px; border-radius:8px;">
                    ${label}
                </div>
                <div style="display:flex; align-items:center; gap:8px; font-size:26px; color:#a1a1aa;">
                    <span style="color:#facc15;">★</span> ${formatStars(stars)}
                </div>
                <div style="display:flex; align-items:center; font-size:22px; color:#71717a; border:2px solid #27272a; padding:6px 14px; border-radius:8px;">
                    ${license}
                </div>
            </div>
            <div style="display:flex; font-size:80px; font-weight:700; line-height:1.15; margin-top:48px; letter-spacing:-0.02em;">
                ${safeTitle}
            </div>
            <div style="display:flex; font-size:32px; font-weight:400; line-height:1.45; color:#a1a1aa; margin-top:28px;">
                ${safeSummary}
            </div>
            <div style="display:flex; flex-grow:1;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:2px solid #27272a; padding-top:28px;">
                <div style="display:flex; font-size:28px; color:#71717a;">aiki.softdaddy-o.com</div>
                <div style="display:flex; align-items:center; gap:16px;">
                    <div style="display:flex; font-size:24px; color:${color}; font-weight:700;">PROJECT SHOWCASE</div>
                    <div style="display:flex; font-size:40px; font-weight:700; letter-spacing:0.08em;">AIKI</div>
                </div>
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

    const files = walkMarkdown(PROJECTS_DIR);
    let generated = 0;
    let failed = 0;

    for (const file of files) {
        const source = fs.readFileSync(file, 'utf-8');
        const { data: frontmatter } = matter(source);
        if (frontmatter.lang && frontmatter.lang !== 'ko') continue;
        if (!frontmatter.slug || !frontmatter.title) continue;

        const outPath = path.join(OUT_DIR, `${frontmatter.slug}.png`);
        try {
            const markup = buildCardMarkup({
                title: frontmatter.title,
                summary: frontmatter.summary ?? '',
                category: frontmatter.category ?? 'library',
                stars: frontmatter.stars ?? 0,
                license: frontmatter.license ?? 'MIT',
            });
            const svg = await satori(markup, {
                width: 1200,
                height: 630,
                fonts: [{ name: 'Pretendard', data: fontData, weight: 400, style: 'normal' }],
            });
            const png = new Resvg(svg).render().asPng();
            fs.writeFileSync(outPath, png);
            generated++;
            console.log(`[ok] ${frontmatter.slug}`);
        } catch (error) {
            console.error(`[fail] ${frontmatter.slug}: ${error.message}`);
            failed++;
        }
    }

    console.log(`\ngenerated=${generated} failed=${failed}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
