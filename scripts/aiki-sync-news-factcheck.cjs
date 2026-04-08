const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const { writeUtf8 } = require('./lib/content-utils.cjs');
const { buildNewsFactChecks } = require('./lib/fact-check-details.cjs');

const NEWS_DIR = path.resolve(__dirname, '../src/content/news/ko');
const TODAY = new Date().toISOString().slice(0, 10);

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) {
        return null;
    }

    return {
        raw: match[1],
        data: yaml.load(match[1]) || {},
    };
}

function extractBody(content) {
    const match = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
    return match ? match[1].trim() : '';
}

function normalizeScalar(value) {
    if (Array.isArray(value)) {
        return value.map((entry) => normalizeScalar(entry));
    }

    if (value && typeof value === 'object') {
        return value;
    }

    if (value === undefined || value === null) {
        return '';
    }

    return String(value);
}

function coerceBoolean(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'string') {
        if (value === 'true') return true;
        if (value === 'false') return false;
    }
    return value;
}

function coerceNumber(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }
    return value;
}

function buildOrderedFrontmatter(frontmatter, factCheck) {
    const ordered = {
        title: normalizeScalar(frontmatter.title),
        date: normalizeScalar(frontmatter.date),
        lang: normalizeScalar(frontmatter.lang),
        category: normalizeScalar(frontmatter.category),
        summary: normalizeScalar(frontmatter.summary),
        readerValue: normalizeScalar(frontmatter.readerValue),
        sourceUrl: normalizeScalar(frontmatter.sourceUrl),
        sourceTitle: normalizeScalar(frontmatter.sourceTitle),
    };

    if (frontmatter.draft !== undefined) {
        ordered.draft = coerceBoolean(frontmatter.draft);
    }
    if (frontmatter.backfilled !== undefined) {
        ordered.backfilled = coerceBoolean(frontmatter.backfilled);
    }
    if (frontmatter.backfilledAt !== undefined) {
        ordered.backfilledAt = normalizeScalar(frontmatter.backfilledAt);
    }
    if (frontmatter.score !== undefined) {
        ordered.score = coerceNumber(frontmatter.score);
    }
    if (frontmatter.sourceCount !== undefined) {
        ordered.sourceCount = coerceNumber(frontmatter.sourceCount);
    }

    ordered.factCheck = factCheck;

    if (Array.isArray(frontmatter.tags)) {
        ordered.tags = frontmatter.tags.map((tag) => String(tag));
    }

    for (const [key, value] of Object.entries(frontmatter)) {
        if (ordered[key] !== undefined) {
            continue;
        }
        ordered[key] = value;
    }

    return ordered;
}

function rewriteFile(fileName) {
    const filePath = path.join(NEWS_DIR, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(content);
    if (!parsed) {
        return false;
    }

    const body = extractBody(content);
    const nextFactCheck = buildNewsFactChecks(parsed.data, body);
    const currentFactCheck = parsed.data.factCheck || {};
    const ordered = buildOrderedFrontmatter(parsed.data, {
        status: String(currentFactCheck.status || 'passed'),
        date: String(currentFactCheck.date || TODAY),
        sources: nextFactCheck.sources,
        checks: nextFactCheck.checks,
    });

    const nextFrontmatter = yaml.dump(ordered, {
        lineWidth: -1,
        noRefs: true,
        quotingType: '"',
    }).trimEnd();

    const nextContent = `---\n${nextFrontmatter}\n---\n\n${body}\n`;
    if (nextContent === content) {
        return false;
    }

    writeUtf8(filePath, nextContent);
    return true;
}

function main() {
    const files = fs.readdirSync(NEWS_DIR)
        .filter((file) => file.endsWith('.md'))
        .sort();
    let updated = 0;

    for (const file of files) {
        if (rewriteFile(file)) {
            updated += 1;
            console.log(`Synced fact-check: ${file}`);
        }
    }

    console.log(`News fact-check sync complete: ${updated} file(s).`);
}

main();
