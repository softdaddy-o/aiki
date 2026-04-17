const { buildWikiLookup, normalizePhrase } = require('./wiki-term-registry.cjs');

const RELATED_SECTION_HEADINGS = new Set([
    '관련 용어',
    '같이 보면 좋은 모델',
]);

function stripMarkdownDecorators(label) {
    return String(label || '')
        .replace(/^\[(.+?)\]\([^)]+\)$/u, '$1')
        .replace(/^`(.+)`$/u, '$1')
        .replace(/^\*\*(.+)\*\*$/u, '$1')
        .replace(/^__(.+)__$/u, '$1')
        .trim();
}

function normalizeLookupLabel(label) {
    return normalizePhrase(label)
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function resolveWikiTarget(label, lookupItems) {
    const normalized = normalizeLookupLabel(stripMarkdownDecorators(label));
    if (!normalized) {
        return null;
    }

    return lookupItems.find((item) => item.normalized === normalized) || null;
}

function linkRelatedBulletLine(line, options = {}) {
    const lookupItems = options.lookup || buildWikiLookup(options.rootDir);
    const match = String(line || '').match(/^(\s*-\s+)(.+?)(\s*(?::|—|-)\s+)(.+)$/u);
    if (!match) {
        return line;
    }

    const [, prefix, rawLabel, separator, remainder] = match;
    if (/\[[^\]]+\]\([^)]+\)/u.test(rawLabel)) {
        return line;
    }

    const label = stripMarkdownDecorators(rawLabel);
    const target = resolveWikiTarget(label, lookupItems);
    if (!target) {
        return line;
    }

    return `${prefix}[${label}](${target.url})${separator}${remainder}`;
}

function linkRelatedBulletBlock(content, options = {}) {
    const lookupItems = options.lookup || buildWikiLookup(options.rootDir);
    const lines = String(content || '').split(/\r?\n/u);
    let changed = false;

    const nextLines = lines.map((line) => {
        if (!/^\s*-\s+/u.test(line)) {
            return line;
        }

        const linked = linkRelatedBulletLine(line, { lookup: lookupItems });
        if (linked !== line) {
            changed = true;
        }
        return linked;
    });

    return {
        changed,
        content: nextLines.join('\n'),
    };
}

function linkRelatedSections(content, options = {}) {
    const lookupItems = options.lookup || buildWikiLookup(options.rootDir);
    const lines = String(content || '').split(/\r?\n/u);
    let currentHeading = null;
    let changed = false;

    const nextLines = lines.map((line) => {
        const headingMatch = line.match(/^##\s+(.+?)\s*$/u);
        if (headingMatch) {
            currentHeading = headingMatch[1].trim();
            return line;
        }

        if (!RELATED_SECTION_HEADINGS.has(currentHeading) || !/^\s*-\s+/u.test(line)) {
            return line;
        }

        const linked = linkRelatedBulletLine(line, { lookup: lookupItems });
        if (linked !== line) {
            changed = true;
        }
        return linked;
    });

    return {
        changed,
        content: nextLines.join('\n'),
    };
}

module.exports = {
    RELATED_SECTION_HEADINGS,
    linkRelatedBulletBlock,
    linkRelatedBulletLine,
    linkRelatedSections,
    resolveWikiTarget,
    stripMarkdownDecorators,
};
