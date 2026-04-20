#!/usr/bin/env node
/**
 * aiki-migrate-format-version.cjs
 *
 * wiki/news 기사를 formatVersion 1 → 2 로 마이그레이션.
 *
 * Phase 1 (기본): h2 섹션이 있는 파일 → frontmatter formatVersion: 2 만 업데이트.
 * Phase 2 (--rewrite): h2 없는 news 파일 → codex 로 구조화 후 버전 bump.
 *
 * Config (우선순위: CLI > 환경변수 > 기본값):
 *   MIGRATE_BATCH_SIZE=3     환경변수
 *   --batch-size N           CLI
 *   --news-only              뉴스만 처리
 *   --wiki-only              위키만 처리
 *   --rewrite                h2 없는 news 도 LLM 재작성 (--news-only 와 함께 사용)
 *   --dry-run                변경 없이 미리보기
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');
const NEWS_DIR = path.join(REPO_ROOT, 'src/content/news/ko');
const PROGRESS_FILE = path.join(REPO_ROOT, 'data/format-migration-progress.json');

const TARGET_FORMAT_VERSION = 2;

// ── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
    const argv = process.argv.slice(2);
    const batchSizeArg = argv.indexOf('--batch-size');
    const envBatch = parseInt(process.env.MIGRATE_BATCH_SIZE || '', 10);
    const cliBatch = batchSizeArg >= 0 ? parseInt(argv[batchSizeArg + 1] || '', 10) : NaN;
    return {
        batchSize: (Number.isFinite(cliBatch) && cliBatch > 0 ? cliBatch
            : Number.isFinite(envBatch) && envBatch > 0 ? envBatch : 3),
        newsOnly: argv.includes('--news-only'),
        wikiOnly: argv.includes('--wiki-only'),
        rewrite: argv.includes('--rewrite'),
        dryRun: argv.includes('--dry-run'),
    };
}

// ── Progress tracking ─────────────────────────────────────────────────────────

function loadProgress() {
    if (!fs.existsSync(PROGRESS_FILE)) return { completed: [] };
    try {
        return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch {
        return { completed: [] };
    }
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2) + '\n', 'utf8');
}

// ── File scanning ─────────────────────────────────────────────────────────────

function scanFiles(dir, type) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => {
            const absPath = path.join(dir, f);
            const raw = fs.readFileSync(absPath, 'utf8');
            const { data, content } = matter(raw);
            const hasH2 = /^## /m.test(content);
            return {
                type,
                absPath,
                relPath: path.relative(path.join(REPO_ROOT, 'src/content'), absPath),
                raw,
                frontmatter: data,
                content,
                hasH2,
                needsMigration: !data.formatVersion || data.formatVersion < TARGET_FORMAT_VERSION,
            };
        })
        .filter(f => f.needsMigration && !f.frontmatter.draft);
}

// ── Frontmatter update ────────────────────────────────────────────────────────

function guideVersionFor(type, current) {
    // guideVersion 은 글쓰기 내용이 바뀔 때만 올림. frontmatter-only 마이그레이션은 유지.
    return current || undefined;
}

function bumpFrontmatter(file) {
    const updated = { ...file.frontmatter, formatVersion: TARGET_FORMAT_VERSION };
    // gray-matter stringify 는 content 앞에 --- 붙여줌
    return matter.stringify('\n' + file.content, updated);
}

// ── LLM rewrite (Phase 2) ────────────────────────────────────────────────────

function buildNewsRewritePrompt(file) {
    const guide = fs.existsSync(path.join(REPO_ROOT, 'docs/content-guide-news.md'))
        ? fs.readFileSync(path.join(REPO_ROOT, 'docs/content-guide-news.md'), 'utf8').slice(0, 4000)
        : '';
    return `당신은 AIKI 뉴스 편집자입니다.
아래 뉴스 기사 본문을 formatVersion 2 형식으로 재구성해 주세요.

규칙:
1. frontmatter 는 그대로 유지 (formatVersion 만 2로 변경).
2. 본문을 2~3개의 h2 섹션 (## 제목) 으로 나눈다.
3. 섹션 제목은 내용을 반영한 짧은 한국어 명사구.
4. 요약 (summary) 는 변경하지 않는다.
5. 전체 글자 수는 20% 이내로 변경.
6. 완성된 마크다운 파일 전체를 출력 (frontmatter 포함).

${guide ? '=== content-guide-news.md 발췌 ===\n' + guide + '\n=== 끝 ===\n\n' : ''}
=== 원본 파일 ===
${file.raw}
=== 끝 ===

위 파일을 규칙에 맞게 재작성하세요. 파일 전체 내용만 출력 (설명 없이).`;
}

function rewriteWithCodex(file) {
    const cp = require('child_process');
    const prompt = buildNewsRewritePrompt(file);
    const tmpPrompt = path.join(REPO_ROOT, '.tmp_migrate_prompt.txt');
    fs.writeFileSync(tmpPrompt, prompt, 'utf8');
    try {
        const result = cp.execFileSync('codex', ['--quiet', '--prompt-file', tmpPrompt], {
            cwd: REPO_ROOT,
            encoding: 'utf8',
            timeout: 120_000,
        });
        return result.trim();
    } finally {
        if (fs.existsSync(tmpPrompt)) fs.unlinkSync(tmpPrompt);
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const opts = parseArgs();
    const progress = loadProgress();
    const done = new Set(progress.completed || []);

    console.log(`[migrate-format-version] batch=${opts.batchSize}${opts.dryRun ? ' (dry-run)' : ''}`);

    // 스캔
    const candidates = [];
    if (!opts.newsOnly) candidates.push(...scanFiles(WIKI_DIR, 'wiki'));
    if (!opts.wikiOnly) candidates.push(...scanFiles(NEWS_DIR, 'news'));

    // 이미 처리된 것 제외
    const pending = candidates.filter(f => !done.has(f.relPath));

    // Phase 1 (h2 있음) 먼저, Phase 2 (h2 없음) 나중
    pending.sort((a, b) => {
        if (a.hasH2 && !b.hasH2) return -1;
        if (!a.hasH2 && b.hasH2) return 1;
        // wiki 우선
        if (a.type === 'wiki' && b.type !== 'wiki') return -1;
        if (a.type !== 'wiki' && b.type === 'wiki') return 1;
        return 0;
    });

    const batch = pending.slice(0, opts.batchSize);

    if (batch.length === 0) {
        const totalPending = pending.length;
        const totalDone = done.size;
        console.log(`완료 없음. 이미 처리: ${totalDone}, 남은 대상: ${totalPending}`);
        return;
    }

    let processed = 0;
    let skipped = 0;

    for (const file of batch) {
        const label = `[${file.type}] ${path.basename(file.absPath)}`;

        if (!file.hasH2 && !opts.rewrite) {
            // Phase 2 대상인데 --rewrite 없음 → 이번 배치에서 스킵
            console.log(`  skip (h2 없음, --rewrite 필요): ${label}`);
            skipped++;
            continue;
        }

        if (!file.hasH2 && opts.rewrite) {
            // Phase 2: LLM 재작성
            console.log(`  rewrite (LLM): ${label}`);
            if (!opts.dryRun) {
                try {
                    const rewritten = rewriteWithCodex(file);
                    fs.writeFileSync(file.absPath, rewritten, 'utf8');
                    done.add(file.relPath);
                    processed++;
                } catch (err) {
                    console.error(`  ERROR rewriting ${label}: ${err.message}`);
                    skipped++;
                }
            } else {
                processed++;
            }
        } else {
            // Phase 1: frontmatter 만 업데이트
            console.log(`  bump frontmatter: ${label}`);
            if (!opts.dryRun) {
                const output = bumpFrontmatter(file);
                fs.writeFileSync(file.absPath, output, 'utf8');
                done.add(file.relPath);
            }
            processed++;
        }
    }

    if (!opts.dryRun && processed > 0) {
        progress.completed = Array.from(done);
        progress.lastRun = new Date().toISOString().slice(0, 10);
        progress.stats = {
            totalCompleted: done.size,
            remaining: pending.length - processed,
        };
        saveProgress(progress);
    }

    console.log(`\n처리: ${processed}, 스킵: ${skipped}`);
    console.log(`진행: ${done.size} / ${candidates.length} (남은: ${pending.length - processed})`);
}

main().catch(err => {
    console.error(err.message || err);
    process.exit(1);
});
