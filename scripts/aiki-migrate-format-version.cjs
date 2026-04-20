#!/usr/bin/env node
/**
 * aiki-migrate-format-version.cjs
 *
 * wiki/news 기사의 formatVersion 과 guideVersion 을 최신으로 맞춘다.
 *
 * 우선순위:
 *   1. guideVersion 낡음           → review panel 호출 (LLM 재작성, 자동으로 h2 구조 추가)
 *   2. formatVersion 낡음 + h2 있음 → frontmatter formatVersion 만 bump (빠름, LLM 불필요)
 *   3. formatVersion 낡음 + h2 없음 + guideVersion 최신 → 스킵 (--rewrite 로 별도 처리)
 *
 * Config (우선순위: CLI > 환경변수 > 기본값):
 *   MIGRATE_BATCH_SIZE=3   환경변수
 *   --batch-size N         CLI
 *   --news-only            뉴스만
 *   --wiki-only            위키만
 *   --rewrite              h2 없고 guideVersion 최신인 news 도 codex 로 재작성
 *   --dry-run              변경 없이 미리보기
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const cp = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');
const NEWS_DIR = path.join(REPO_ROOT, 'src/content/news/ko');
const PROGRESS_FILE = path.join(REPO_ROOT, 'data/format-migration-progress.json');

const TARGET_FORMAT_VERSION = 2;

// guide 파일에서 현재 버전을 읽음 (> **Version**: `x.y.z`)
function readGuideVersion(guideFile) {
    try {
        const text = fs.readFileSync(path.join(REPO_ROOT, guideFile), 'utf8');
        const m = text.match(/\*\*Version\*\*[:\s]+`([^`]+)`/);
        return m ? m[1] : '2.0.0';
    } catch {
        return '2.0.0';
    }
}

const CURRENT_GUIDE = {
    wiki: readGuideVersion('docs/content-guide-wiki.md'),
    news: readGuideVersion('docs/content-guide-news.md'),
};

// ── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
    const argv = process.argv.slice(2);
    const bsi = argv.indexOf('--batch-size');
    const envBatch = parseInt(process.env.MIGRATE_BATCH_SIZE || '', 10);
    const cliBatch = bsi >= 0 ? parseInt(argv[bsi + 1] || '', 10) : NaN;
    return {
        batchSize: Number.isFinite(cliBatch) && cliBatch > 0 ? cliBatch
            : Number.isFinite(envBatch) && envBatch > 0 ? envBatch : 3,
        newsOnly: argv.includes('--news-only'),
        wikiOnly: argv.includes('--wiki-only'),
        rewrite: argv.includes('--rewrite'),
        dryRun: argv.includes('--dry-run'),
    };
}

// ── Progress ──────────────────────────────────────────────────────────────────

function loadProgress() {
    if (!fs.existsSync(PROGRESS_FILE)) return { completed: [] };
    try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
    catch { return { completed: [] }; }
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2) + '\n', 'utf8');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function semverLt(a, b) {
    // 단순 major.minor.patch 비교
    const pa = String(a || '0').split('.').map(Number);
    const pb = String(b || '0').split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        const diff = (pa[i] || 0) - (pb[i] || 0);
        if (diff !== 0) return diff < 0;
    }
    return false;
}

function isGuideStale(fm, type) {
    const gv = fm.guideVersion;
    if (!gv) return true;
    const current = type === 'wiki' ? CURRENT_GUIDE.wiki : CURRENT_GUIDE.news;
    const articleVer = type === 'wiki' ? (gv.wiki || '0') : (gv.news || '0');
    return semverLt(articleVer, current);
}

function isFormatStale(fm) {
    return !fm.formatVersion || fm.formatVersion < TARGET_FORMAT_VERSION;
}

// ── Scanning ──────────────────────────────────────────────────────────────────

function scanFiles(dir, type) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => {
            const absPath = path.join(dir, f);
            const raw = fs.readFileSync(absPath, 'utf8');
            const { data: fm, content } = matter(raw);
            const hasH2 = /^## /m.test(content);
            const guideStale = isGuideStale(fm, type);
            const formatStale = isFormatStale(fm);

            // 처리 유형 분류
            let action = null;
            if (guideStale) {
                action = 'review-panel';       // LLM 재작성 (내용 + guideVersion + formatVersion)
            } else if (formatStale && hasH2) {
                action = 'bump-format';        // frontmatter formatVersion 만 bump
            } else if (formatStale && !hasH2) {
                action = 'rewrite-only';       // h2 없음, guideVersion 최신 → --rewrite 필요
            }

            return {
                type,
                absPath,
                relPath: path.relative(path.join(REPO_ROOT, 'src/content'), absPath),
                file: f,
                term: f.replace(/\.md$/, ''),
                raw,
                fm,
                content,
                hasH2,
                guideStale,
                formatStale,
                action,
                needsMigration: action !== null,
            };
        })
        .filter(f => f.needsMigration && !f.fm.draft);
}

// ── Actions ───────────────────────────────────────────────────────────────────

function bumpFormatVersion(file, dryRun) {
    if (dryRun) return;
    const updated = { ...file.fm, formatVersion: TARGET_FORMAT_VERSION };
    const output = matter.stringify('\n' + file.content, updated);
    fs.writeFileSync(file.absPath, output, 'utf8');
}

function runReviewPanel(targets, dryRun) {
    // targets: [{type, term, ...}]
    // wiki 와 news 를 분리해서 각각 review panel 실행
    const byType = { wiki: [], news: [] };
    for (const t of targets) byType[t.type].push(t.term);

    for (const [type, terms] of Object.entries(byType)) {
        if (terms.length === 0) continue;
        const args = [
            'scripts/aiki-review-panel.cjs',
            '--target', type,
            '--only', terms.join(','),
        ];
        console.log(`  review-panel [${type}]: ${terms.join(', ')}`);
        if (!dryRun) {
            cp.execFileSync(process.execPath, args, {
                cwd: REPO_ROOT,
                stdio: 'inherit',
                timeout: 300_000,
            });
        }
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const opts = parseArgs();
    const progress = loadProgress();
    const done = new Set(progress.completed || []);

    console.log(`[migrate-format-version] batch=${opts.batchSize}, guides: wiki=${CURRENT_GUIDE.wiki} news=${CURRENT_GUIDE.news}${opts.dryRun ? ' (dry-run)' : ''}`);

    const candidates = [];
    if (!opts.newsOnly) candidates.push(...scanFiles(WIKI_DIR, 'wiki'));
    if (!opts.wikiOnly) candidates.push(...scanFiles(NEWS_DIR, 'news'));

    const pending = candidates.filter(f => !done.has(f.relPath));

    // 정렬: review-panel 먼저 (가이드 불일치 = 내용 문제), bump-format 다음, rewrite-only 마지막
    const order = { 'review-panel': 0, 'bump-format': 1, 'rewrite-only': 2 };
    pending.sort((a, b) => (order[a.action] ?? 9) - (order[b.action] ?? 9));

    if (pending.length === 0) {
        console.log(`모두 최신. 처리 완료: ${done.size}개`);
        return;
    }

    // --rewrite 없으면 rewrite-only 제외
    const batch = pending
        .filter(f => opts.rewrite || f.action !== 'rewrite-only')
        .slice(0, opts.batchSize);

    if (batch.length === 0) {
        const rewriteOnly = pending.filter(f => f.action === 'rewrite-only').length;
        console.log(`처리 가능한 대상 없음. h2 없는 news ${rewriteOnly}개는 --rewrite 로 처리 필요.`);
        return;
    }

    // review-panel 대상은 한 번에 묶어서 실행
    const reviewTargets = batch.filter(f => f.action === 'review-panel');
    const bumpTargets = batch.filter(f => f.action === 'bump-format');
    const rewriteTargets = batch.filter(f => f.action === 'rewrite-only');

    let processed = 0;

    if (reviewTargets.length > 0) {
        console.log(`\n[review-panel] ${reviewTargets.length}개:`);
        try {
            runReviewPanel(reviewTargets, opts.dryRun);
            for (const f of reviewTargets) {
                done.add(f.relPath);
                processed++;
            }
        } catch (err) {
            console.error(`review-panel 실패: ${err.message}`);
        }
    }

    if (bumpTargets.length > 0) {
        console.log(`\n[bump-format] ${bumpTargets.length}개:`);
        for (const f of bumpTargets) {
            console.log(`  ${f.relPath}`);
            bumpFormatVersion(f, opts.dryRun);
            done.add(f.relPath);
            processed++;
        }
    }

    if (rewriteTargets.length > 0) {
        console.log(`\n[rewrite-only] ${rewriteTargets.length}개 (codex 재작성):`);
        for (const f of rewriteTargets) {
            console.log(`  ${f.relPath}`);
            if (!opts.dryRun) {
                try {
                    // h2 없는 뉴스를 codex 로 섹션 구조화
                    const guide = fs.existsSync(path.join(REPO_ROOT, 'docs/content-guide-news.md'))
                        ? fs.readFileSync(path.join(REPO_ROOT, 'docs/content-guide-news.md'), 'utf8').slice(0, 3000)
                        : '';
                    const prompt = `AIKI 뉴스 편집자. 아래 기사 본문을 2~3개 h2 섹션으로 재구성, formatVersion: 2 로 변경. 파일 전체만 출력.\n\n${guide ? '=== Guide ===\n' + guide + '\n\n' : ''}=== 원본 ===\n${f.raw}`;
                    const tmpFile = path.join(REPO_ROOT, '.tmp_rewrite_prompt.txt');
                    fs.writeFileSync(tmpFile, prompt, 'utf8');
                    const result = cp.execFileSync('codex', ['--quiet', '--prompt-file', tmpFile], {
                        cwd: REPO_ROOT, encoding: 'utf8', timeout: 120_000,
                    }).trim();
                    if (tmpFile && fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
                    if (result) {
                        fs.writeFileSync(f.absPath, result, 'utf8');
                        done.add(f.relPath);
                        processed++;
                    }
                } catch (err) {
                    console.error(`  ERROR: ${err.message}`);
                }
            } else {
                processed++;
            }
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

    const remaining = pending.length - processed;
    console.log(`\n처리: ${processed} | 남은: ${remaining} | 누적 완료: ${done.size}`);

    const stats = {
        reviewPanel: candidates.filter(f => f.action === 'review-panel').length,
        bumpFormat: candidates.filter(f => f.action === 'bump-format').length,
        rewriteOnly: candidates.filter(f => f.action === 'rewrite-only').length,
    };
    console.log(`전체 현황: guideVersion 낡음=${stats.reviewPanel}, formatVersion만 낡음=${stats.bumpFormat}, h2없음(--rewrite 필요)=${stats.rewriteOnly}`);
}

main().catch(err => {
    console.error(err.message || err);
    process.exit(1);
});
