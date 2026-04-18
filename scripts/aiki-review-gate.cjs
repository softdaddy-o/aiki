#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');
const matter = require('gray-matter');

const { loadPanel } = require('./lib/agent-loader.cjs');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = {
    news: {
        dir: path.join(ROOT, 'src/content/news/ko'),
        panel: 'news-review',
    },
    wiki: {
        dir: path.join(ROOT, 'src/content/wiki/ko'),
        panel: 'wiki-review',
    },
    projects: {
        dir: path.join(ROOT, 'src/content/projects/ko'),
        panel: 'project-review',
    },
};

function toPosix(value) {
    return value.replace(/\\/g, '/');
}

function runGit(args) {
    try {
        return cp.execFileSync('git', args, {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        })
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);
    } catch {
        return [];
    }
}

function getChangedFiles() {
    const tracked = runGit(['diff', '--name-only', '--diff-filter=ACMRT', 'HEAD', '--']);
    const untracked = runGit(['ls-files', '--others', '--exclude-standard']);
    const workingTreeFiles = [...tracked, ...untracked];

    if (workingTreeFiles.length > 0) {
        return new Set(workingTreeFiles.map(toPosix));
    }

    const headCommitFiles = runGit(['diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD', '--']);
    return new Set(headCommitFiles.map(toPosix));
}

function getReviewContentHash(filePath) {
    const parsed = matter(fs.readFileSync(filePath, 'utf8'));
    const frontmatter = { ...(parsed.data || {}) };
    delete frontmatter.reviewStamp;
    const canonical = matter.stringify(parsed.content, frontmatter);
    return crypto.createHash('sha256').update(canonical, 'utf8').digest('hex').slice(0, 16);
}

function listMarkdownFiles(targetName, mode) {
    const target = TARGETS[targetName];
    if (!target || !fs.existsSync(target.dir)) return [];

    const allFiles = fs.readdirSync(target.dir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => path.join(target.dir, file));

    if (mode === 'all') return allFiles;

    const changed = getChangedFiles();
    return allFiles.filter((file) => {
        const rel = toPosix(path.relative(ROOT, file));
        return changed.has(rel);
    });
}

function hasCurrentAgentVersions(stamp, panel) {
    if (!stamp || !stamp.agentVersions || typeof stamp.agentVersions !== 'object') {
        return false;
    }

    return panel.agents.every((agent) => stamp.agentVersions[agent.id] === agent.version);
}

function isReviewCurrent(frontmatter, panel, filePath) {
    const stamp = frontmatter.reviewStamp;
    return Boolean(
        stamp
        && stamp.panelVerdict === 'pass'
        && stamp.contentHash
        && stamp.panelVersion === panel.version
        && hasCurrentAgentVersions(stamp, panel)
        && filePath
        && stamp.contentHash === getReviewContentHash(filePath),
    );
}

function checkTarget(targetName, mode) {
    const panel = loadPanel(TARGETS[targetName].panel);
    const files = listMarkdownFiles(targetName, mode);
    const failures = [];

    for (const file of files) {
        const raw = fs.readFileSync(file, 'utf8');
        const parsed = matter(raw);
        const frontmatter = parsed.data || {};
        if (frontmatter.draft === true) continue;

        if (!isReviewCurrent(frontmatter, panel, file)) {
            failures.push({
                target: targetName,
                file: toPosix(path.relative(ROOT, file)),
                reason: frontmatter.reviewStamp
                    ? `reviewStamp is not current/pass for ${panel.name} v${panel.version}`
                    : `missing reviewStamp for ${panel.name} v${panel.version}`,
            });
        }
    }

    return { checked: files.length, failures };
}

function parseArgs() {
    const args = process.argv.slice(2);
    const all = args.includes('--all');
    const targetIndex = args.indexOf('--target');
    const target = targetIndex >= 0 ? args[targetIndex + 1] : 'all';
    return {
        mode: all ? 'all' : 'changed',
        targets: target === 'all'
            ? Object.keys(TARGETS)
            : target.split(',').map((entry) => entry.trim()).filter(Boolean),
    };
}

function main() {
    const options = parseArgs();
    const allFailures = [];
    let checked = 0;

    for (const target of options.targets) {
        if (!TARGETS[target]) {
            throw new Error(`Unknown review target: ${target}`);
        }
        const result = checkTarget(target, options.mode);
        checked += result.checked;
        allFailures.push(...result.failures);
    }

    if (allFailures.length > 0) {
        console.error(`aiki-review-gate: ${allFailures.length} file(s) need review`);
        for (const failure of allFailures) {
            console.error(`- ${failure.file}: ${failure.reason}`);
        }
        console.error('\nRun the matching review command, for example:');
        console.error('  npm run review:wiki:only -- <term>');
        console.error('  npm run review:news:only -- <slug>');
        console.error('  npm run review:projects:only -- <slug>');
        process.exit(1);
    }

    console.log(`aiki-review-gate: ${checked} ${options.mode} file(s) checked`);
}

if (require.main === module) {
    try {
        main();
    } catch (err) {
        console.error(err.message || err);
        process.exit(1);
    }
}

module.exports = {
    checkTarget,
    isReviewCurrent,
};
