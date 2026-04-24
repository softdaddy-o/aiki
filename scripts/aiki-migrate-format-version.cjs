#!/usr/bin/env node
/**
 * aiki-migrate-format-version.cjs
 *
 * wiki/news/projects 콘텐츠의 formatVersion 과 guideVersion 을 최신으로 맞춘다.
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
 *   --projects-only        프로젝트만
 *   --rewrite              h2 없고 guideVersion 최신인 콘텐츠도 codex 로 재작성
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
const PROJECTS_DIR = path.join(REPO_ROOT, 'src/content/projects/ko');
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
    tone: readGuideVersion('docs/tone-guide-common.md'),
    common: readGuideVersion('docs/content-guide-common.md'),
    wiki: readGuideVersion('docs/content-guide-wiki.md'),
    news: readGuideVersion('docs/content-guide-news.md'),
    projects: readGuideVersion('docs/content-guide-projects.md'),
};

// ── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
    const argv = process.argv.slice(2);
    const bsi = argv.indexOf('--batch-size');
    const rmsi = argv.indexOf('--review-max-rounds');
    const rtsi = argv.indexOf('--review-timeout-ms');
    const envBatch = parseInt(process.env.MIGRATE_BATCH_SIZE || '', 10);
    const cliBatch = bsi >= 0 ? parseInt(argv[bsi + 1] || '', 10) : NaN;
    const envReviewMaxRounds = parseInt(process.env.MIGRATE_REVIEW_MAX_ROUNDS || '', 10);
    const cliReviewMaxRounds = rmsi >= 0 ? parseInt(argv[rmsi + 1] || '', 10) : NaN;
    const envReviewTimeoutMs = parseInt(process.env.MIGRATE_REVIEW_TIMEOUT_MS || '', 10);
    const cliReviewTimeoutMs = rtsi >= 0 ? parseInt(argv[rtsi + 1] || '', 10) : NaN;
    return {
        batchSize: Number.isFinite(cliBatch) && cliBatch > 0 ? cliBatch
            : Number.isFinite(envBatch) && envBatch > 0 ? envBatch : 3,
        reviewMaxRounds: Number.isFinite(cliReviewMaxRounds) && cliReviewMaxRounds > 0
            ? cliReviewMaxRounds
            : Number.isFinite(envReviewMaxRounds) && envReviewMaxRounds > 0
                ? envReviewMaxRounds
                : 2,
        reviewTimeoutMs: Number.isFinite(cliReviewTimeoutMs) && cliReviewTimeoutMs > 0
            ? cliReviewTimeoutMs
            : Number.isFinite(envReviewTimeoutMs) && envReviewTimeoutMs > 0
                ? envReviewTimeoutMs
                : 600_000,
        newsOnly: argv.includes('--news-only'),
        wikiOnly: argv.includes('--wiki-only'),
        projectsOnly: argv.includes('--projects-only'),
        reviewOnly: argv.includes('--review-only'),
        bumpOnly: argv.includes('--bump-only'),
        rewriteOnly: argv.includes('--rewrite-only'),
        draftOnFail: argv.includes('--draft-on-fail'),
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

function getGuideKeysForType(type) {
    return ['tone', 'common', type];
}

function getCurrentGuideVersions(type, currentGuide = CURRENT_GUIDE) {
    return Object.fromEntries(
        getGuideKeysForType(type).map((key) => [key, String(currentGuide[key] || '0').trim()]),
    );
}

function getArticleGuideVersions(frontmatter, type) {
    const guideVersion = frontmatter && typeof frontmatter.guideVersion === 'object'
        ? frontmatter.guideVersion
        : {};

    return Object.fromEntries(
        getGuideKeysForType(type).map((key) => [key, String(guideVersion[key] || '').trim()]),
    );
}

function isGuideStale(fm, type, currentGuide = CURRENT_GUIDE) {
    const currentVersions = getCurrentGuideVersions(type, currentGuide);
    const articleVersions = getArticleGuideVersions(fm, type);

    return Object.entries(currentVersions).some(([key, version]) => (
        !articleVersions[key] || semverLt(articleVersions[key], version)
    ));
}

function isFormatStale(fm) {
    return !fm.formatVersion || fm.formatVersion < TARGET_FORMAT_VERSION;
}

function getMigrationSignature(currentGuide = CURRENT_GUIDE) {
    return JSON.stringify({
        formatVersion: TARGET_FORMAT_VERSION,
        guideVersions: currentGuide,
    });
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
                action = type === 'projects'
                    ? 'review-panel'
                    : 'rewrite-only';       // h2 없음, guideVersion 최신 → --rewrite 필요
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

function isReviewMigrationComplete(file) {
    const raw = fs.readFileSync(file.absPath, 'utf8');
    const { data: fm } = matter(raw);
    return !fm.draft && !isGuideStale(fm, file.type) && !isFormatStale(fm);
}

// ── Actions ───────────────────────────────────────────────────────────────────

function bumpFormatVersion(file, dryRun) {
    if (dryRun) return;
    const updated = { ...file.fm, formatVersion: TARGET_FORMAT_VERSION };
    const output = matter.stringify('\n' + file.content, updated);
    fs.writeFileSync(file.absPath, output, 'utf8');
}

function runReviewPanel(targets, opts) {
    // targets: [{type, term, ...}]
    // wiki, news, projects 를 분리해서 각각 review panel 실행
    const byType = { wiki: [], news: [], projects: [] };
    for (const t of targets) byType[t.type].push(t.term);

    for (const [type, terms] of Object.entries(byType)) {
        if (terms.length === 0) continue;
        const args = [
            'scripts/aiki-review-panel.cjs',
            '--target', type,
            '--only', terms.join(','),
            '--max-rounds', String(opts.reviewMaxRounds),
        ];
        if (!opts.draftOnFail) args.push('--no-draft');
        console.log(`  review-panel [${type}]: ${terms.join(', ')}`);
        if (!opts.dryRun) {
            cp.execFileSync(process.execPath, args, {
                cwd: REPO_ROOT,
                stdio: 'inherit',
                timeout: opts.reviewTimeoutMs,
            });
        }
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const opts = parseArgs();
    let progress = loadProgress();
    const currentSignature = getMigrationSignature();

    if (progress.signature !== currentSignature) {
        progress = {
            completed: [],
            lastRun: progress.lastRun || null,
            stats: progress.stats || { totalCompleted: 0, remaining: null },
            signature: currentSignature,
        };
        console.log('[migrate-format-version] guide signature changed; resetting completed progress cache');
    }

    const done = new Set(progress.completed || []);

    console.log(
        `[migrate-format-version] batch=${opts.batchSize}, guides: tone=${CURRENT_GUIDE.tone} common=${CURRENT_GUIDE.common} wiki=${CURRENT_GUIDE.wiki} news=${CURRENT_GUIDE.news} projects=${CURRENT_GUIDE.projects}${opts.dryRun ? ' (dry-run)' : ''}`,
    );

    const candidates = [];
    if (!opts.newsOnly && !opts.projectsOnly) candidates.push(...scanFiles(WIKI_DIR, 'wiki'));
    if (!opts.wikiOnly && !opts.projectsOnly) candidates.push(...scanFiles(NEWS_DIR, 'news'));
    if (!opts.newsOnly && !opts.wikiOnly) candidates.push(...scanFiles(PROJECTS_DIR, 'projects'));

    let pending = candidates.filter(f => !done.has(f.relPath));

    if (opts.reviewOnly) pending = pending.filter((f) => f.action === 'review-panel');
    if (opts.bumpOnly) pending = pending.filter((f) => f.action === 'bump-format');
    if (opts.rewriteOnly) pending = pending.filter((f) => f.action === 'rewrite-only');

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
        console.log(`처리 가능한 대상 없음. h2 없는 콘텐츠 ${rewriteOnly}개는 --rewrite 로 처리 필요.`);
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
            runReviewPanel(reviewTargets, opts);
            for (const f of reviewTargets) {
                if (isReviewMigrationComplete(f)) {
                    done.add(f.relPath);
                    processed++;
                } else {
                    console.log(`  still pending after review: ${f.relPath}`);
                }
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
                    // h2 없는 콘텐츠를 codex 로 섹션 구조화
                    const guidePath = path.join(REPO_ROOT, `docs/content-guide-${f.type}.md`);
                    const guide = fs.existsSync(guidePath)
                        ? fs.readFileSync(guidePath, 'utf8').slice(0, 3000)
                        : '';
                    const prompt = `AIKI ${f.type} 편집자. 아래 문서를 2~3개 h2 섹션으로 재구성하고 formatVersion: 2 로 변경해. 파일 전체만 출력.\n\n${guide ? '=== Guide ===\n' + guide + '\n\n' : ''}=== 원본 ===\n${f.raw}`;
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
        progress.signature = currentSignature;
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

if (require.main === module) {
    main().catch(err => {
        console.error(err.message || err);
        process.exit(1);
    });
}

module.exports = {
    CURRENT_GUIDE,
    TARGET_FORMAT_VERSION,
    getArticleGuideVersions,
    getCurrentGuideVersions,
    getGuideKeysForType,
    getMigrationSignature,
    isFormatStale,
    isGuideStale,
    parseArgs,
    semverLt,
};
