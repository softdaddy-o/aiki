#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
    QUALITY_THRESHOLDS,
    scoreWikiFile,
    formatScoreReport,
} = require('./lib/wiki-quality-scoring.cjs');

const WIKI_DIR = path.resolve(__dirname, '../src/content/wiki/ko');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');
const fixMode = args.includes('--fix');
const singleFile = args.find((a) => a.endsWith('.md'));

function getAllWikiFiles() {
    if (singleFile) {
        const resolved = path.isAbsolute(singleFile) ? singleFile : path.resolve(WIKI_DIR, singleFile);
        return fs.existsSync(resolved) ? [resolved] : [];
    }

    return fs.readdirSync(WIKI_DIR)
        .filter((f) => f.endsWith('.md') && f !== 'CLAUDE.md')
        .map((f) => path.join(WIKI_DIR, f));
}

function setDraft(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    if (/^draft:\s*true/m.test(raw)) {
        return false;
    }

    const updated = raw.replace(/^draft:\s*false/m, 'draft: true');
    if (updated === raw) {
        return false;
    }

    fs.writeFileSync(filePath, updated, 'utf8');
    return true;
}

function run() {
    const files = getAllWikiFiles();
    if (files.length === 0) {
        console.log('No wiki files found.');
        return;
    }

    const results = [];
    for (const file of files) {
        const result = scoreWikiFile(file);
        if (result) {
            result.filePath = file;
            results.push(result);
        }
    }

    results.sort((a, b) => a.total - b.total);

    const failing = results.filter((r) => !r.pass);
    const warning = results.filter((r) => r.pass && r.total < 80);
    const passing = results.filter((r) => r.total >= 80);

    console.log(`\n=== Wiki Quality Gate ===`);
    console.log(`Total: ${results.length} pages | Pass: ${passing.length} | Warn: ${warning.length} | Fail: ${failing.length}\n`);

    if (failing.length > 0) {
        console.log(`--- FAIL (< ${QUALITY_THRESHOLDS.publish}) ---`);
        for (const r of failing) {
            console.log(formatScoreReport(r));
        }
        console.log('');
    }

    if (warning.length > 0 && verbose) {
        console.log(`--- WARN (${QUALITY_THRESHOLDS.publish}-79) ---`);
        for (const r of warning) {
            console.log(formatScoreReport(r));
        }
        console.log('');
    }

    if (verbose && passing.length > 0) {
        console.log(`--- PASS (80+) ---`);
        for (const r of passing) {
            console.log(`  ${r.term} — ${r.total}/100`);
        }
        console.log('');
    }

    // Score distribution
    const buckets = { '0-19': 0, '20-39': 0, '40-59': 0, '60-79': 0, '80-100': 0 };
    for (const r of results) {
        if (r.total < 20) buckets['0-19']++;
        else if (r.total < 40) buckets['20-39']++;
        else if (r.total < 60) buckets['40-59']++;
        else if (r.total < 80) buckets['60-79']++;
        else buckets['80-100']++;
    }
    console.log('Score distribution:');
    for (const [range, count] of Object.entries(buckets)) {
        const bar = '#'.repeat(count);
        console.log(`  ${range}: ${bar} (${count})`);
    }

    if (fixMode && failing.length > 0) {
        console.log(`\n--- Auto-fix: setting draft: true on ${failing.length} failing pages ---`);
        let fixed = 0;
        for (const r of failing) {
            if (setDraft(r.filePath)) {
                console.log(`  draft: true → ${r.term}`);
                fixed++;
            }
        }
        console.log(`Fixed: ${fixed} pages\n`);
    }

    if (!dryRun && failing.length > 0) {
        console.error(`\n${failing.length} wiki page(s) below quality threshold (${QUALITY_THRESHOLDS.publish}/100).`);
        console.error('Run with --fix to auto-set draft: true, or --dry-run to skip exit code.\n');
        process.exit(1);
    }
}

run();
