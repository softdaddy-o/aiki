const fs = require('fs');
const path = require('path');

function getRepoRoot(rootDir) {
    return rootDir || path.resolve(__dirname, '../..');
}

function loadWikiTerms(rootDir) {
    const repoRoot = getRepoRoot(rootDir);
    const filePath = path.join(repoRoot, 'data', 'wiki-terms.json');
    if (!fs.existsSync(filePath)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizePhrase(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .trim();
}

function humanizeTermSlug(term) {
    return String(term || '')
        .replace(/-/g, ' ')
        .trim();
}

function pluralizeAsciiToken(token) {
    if (!/^[A-Za-z0-9.+-]+$/.test(token) || /s$/i.test(token)) {
        return null;
    }

    if (/[^aeiou]y$/i.test(token)) {
        return `${token.slice(0, -1)}ies`;
    }

    if (/(x|z|ch|sh)$/i.test(token)) {
        return `${token}es`;
    }

    return `${token}s`;
}

function addVariant(target, value) {
    const normalized = normalizePhrase(value);
    if (!normalized) {
        return;
    }

    target.add(normalized);

    const parts = normalized.split(' ');
    const last = parts[parts.length - 1];
    const pluralLast = pluralizeAsciiToken(last);
    if (pluralLast) {
        parts[parts.length - 1] = pluralLast;
        target.add(parts.join(' '));
    }
}

function getEntryVariants(entry) {
    const variants = new Set();
    const seeds = [
        entry.term,
        humanizeTermSlug(entry.term),
        entry.title,
        ...(entry.aliases || []),
    ];

    for (const seed of seeds) {
        addVariant(variants, seed);
    }

    return [...variants];
}

function getVariantPriority(entry, variant) {
    if (variant === entry.title) {
        return 4;
    }
    if (variant === entry.term) {
        return 3;
    }
    if (variant === humanizeTermSlug(entry.term)) {
        return 2;
    }
    return 1;
}

function buildWikiLookup(rootDir) {
    const lookup = new Map();

    for (const entry of loadWikiTerms(rootDir)) {
        for (const variant of getEntryVariants(entry)) {
            const normalized = variant.toLowerCase();
            const candidate = {
                term: entry.term,
                title: entry.title,
                label: variant,
                normalized,
                url: `/ko/wiki/${entry.term}/`,
                priority: getVariantPriority(entry, variant),
            };

            const prev = lookup.get(normalized);
            if (
                !prev
                || candidate.priority > prev.priority
                || (candidate.priority === prev.priority && candidate.label.length > prev.label.length)
            ) {
                lookup.set(normalized, candidate);
            }
        }
    }

    return [...lookup.values()].sort((a, b) =>
        b.label.length - a.label.length || b.priority - a.priority || a.label.localeCompare(b.label),
    );
}

module.exports = {
    buildWikiLookup,
    getEntryVariants,
    humanizeTermSlug,
    loadWikiTerms,
    normalizePhrase,
};
