#!/usr/bin/env node

const path = require('path');
const cp = require('child_process');

const { linkRelatedTerms } = require('./aiki-link-related-terms.cjs');
const { syncWikiTerms } = require('./aiki-sync-wiki-terms.cjs');
const {
    DEFAULT_WIKI_DISCOVERY_QUOTA,
    buildDiscoveryEntry,
    refreshWikiDiscoveryBacklog,
    selectDiscoveryQuota,
    writeCandidateReport,
    writeDiscoveryBacklog,
} = require('./lib/wiki-discovery-backlog.cjs');
const { rewriteWikiEntryWithLlm } = require('./lib/wiki-llm-writer.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src/content/wiki/ko');

function parseArgs() {
    const args = process.argv.slice(2);
    const quotaIndex = args.indexOf('--quota');
    const modelIndex = args.indexOf('--model');
    const reviewModelIndex = args.indexOf('--review-model');
    const reviewRoundsIndex = args.indexOf('--review-max-rounds');

    return {
        quota: quotaIndex >= 0 ? Number(args[quotaIndex + 1]) : DEFAULT_WIKI_DISCOVERY_QUOTA,
        model: modelIndex >= 0 ? String(args[modelIndex + 1] || '').trim() : '',
        reviewModel: reviewModelIndex >= 0 ? String(args[reviewModelIndex + 1] || '').trim() : '',
        reviewMaxRounds: reviewRoundsIndex >= 0 ? Number(args[reviewRoundsIndex + 1]) || 1 : 1,
        skipReview: args.includes('--skip-review'),
        dryRun: args.includes('--dry-run'),
    };
}

function relativeWikiFile(term) {
    return path.relative(REPO_ROOT, path.join(WIKI_DIR, `${term}.md`)).replace(/\\/g, '/');
}

function applyRunMetadata(backlog, options) {
    const previousBySlug = new Map((options.previousItems || []).map((item) => [item.slug, item]));
    const succeeded = new Set(options.succeeded || []);
    const failed = new Map(options.failed || []);

    for (const item of backlog.items) {
        if (succeeded.has(item.slug)) {
            const previous = previousBySlug.get(item.slug);
            item.status = 'generated';
            item.generatedAt = options.today;
            item.generatedFile = relativeWikiFile(item.slug);
            item.lastQueuedAt = options.runAt;
            item.generationCount = Number(previous?.generationCount || item.generationCount || 0) + 1;
            item.lastError = null;
        }

        if (failed.has(item.slug)) {
            const previous = previousBySlug.get(item.slug);
            item.status = 'pending';
            item.lastQueuedAt = options.runAt;
            item.lastError = failed.get(item.slug);
            item.generationCount = Number(previous?.generationCount || item.generationCount || 0);
        }
    }

    backlog.updatedAt = options.runAt;
    return backlog;
}

function runWikiReview(slugs, options) {
    if (!Array.isArray(slugs) || slugs.length === 0) {
        return;
    }

    const args = [
        'scripts/aiki-review-panel.cjs',
        '--target', 'wiki',
        '--only', slugs.join(','),
        '--max-rounds', String(Math.max(1, Number(options.reviewMaxRounds) || 1)),
    ];

    if (options.reviewModel) {
        args.push('--model', options.reviewModel);
    }

    console.log(`Running 5-reviewer wiki panel for ${slugs.length} generated page(s)`);
    cp.execFileSync('node', args, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
        shell: true,
    });
}

async function main() {
    const options = parseArgs();
    const today = new Date().toISOString().slice(0, 10);
    const runAt = new Date().toISOString();
    const initial = refreshWikiDiscoveryBacklog({
        rootDir: REPO_ROOT,
        write: true,
        writeReport: true,
    });
    const selected = selectDiscoveryQuota(initial.backlog, options.quota)
        .filter((item) => Array.isArray(item.sourceUrls) && item.sourceUrls.length > 0);

    if (selected.length === 0) {
        console.log('No pending wiki discovery candidates with usable sources.');
        return;
    }

    console.log(`Selected ${selected.length} candidate(s): ${selected.map((item) => item.slug).join(', ')}`);

    if (options.dryRun) {
        return;
    }

    const succeeded = [];
    const failed = [];

    for (const candidate of selected) {
        const entry = buildDiscoveryEntry(candidate);
        const filePath = path.join(WIKI_DIR, `${entry.term}.md`);
        console.log(`Generating ${entry.term} (${entry.category})`);

        try {
            await rewriteWikiEntryWithLlm({
                entry,
                filePath,
                mentionStats: entry.mentionStats,
                relatedTerms: entry.relatedTerms,
                model: options.model,
            });
            succeeded.push(entry.term);
        } catch (error) {
            failed.push([entry.term, error.message || String(error)]);
            console.error(`Failed ${entry.term}: ${error.message || error}`);
        }
    }

    if (succeeded.length > 0) {
        syncWikiTerms();
        linkRelatedTerms(REPO_ROOT);
        if (!options.skipReview) {
            runWikiReview(succeeded, options);
        }
    }

    const refreshed = refreshWikiDiscoveryBacklog({
        rootDir: REPO_ROOT,
        write: false,
        writeReport: false,
    });
    const backlog = applyRunMetadata(refreshed.backlog, {
        previousItems: initial.backlog.items,
        succeeded,
        failed,
        today,
        runAt,
    });
    writeDiscoveryBacklog(REPO_ROOT, backlog);
    writeCandidateReport(REPO_ROOT, backlog);

    console.log(`Generated ${succeeded.length} wiki page(s). Pending backlog: ${backlog.items.filter((item) => item.status === 'pending').length}`);

    if (failed.length > 0) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
