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

function isHangulOnly(token) {
    return /^[\uac00-\ud7a3]+$/.test(token);
}

function extractTitleParts(title) {
    // Titles follow the "English (한글)" or "한글(English)" convention.
    // Yield each segment as a separate variant so we can link both the
    // English spelling and the Korean transliteration independently
    // (e.g. "Anthropic" and "앤스로픽", "AI Agent" and "AI 에이전트").
    // For multi-token segments that mix ASCII and hangul (e.g. "AI
    // 에이전트"), also yield each standalone hangul-only token — Korean
    // writers often drop the ASCII prefix and just say "에이전트".
    const out = [];
    if (!title) return out;
    const re = /\(([^)]+)\)/g;
    let lastIndex = 0;
    let m;
    while ((m = re.exec(title)) !== null) {
        const before = title.slice(lastIndex, m.index).trim();
        if (before) out.push(before);
        const inside = m[1].trim();
        if (inside) out.push(inside);
        lastIndex = m.index + m[0].length;
    }
    const tail = title.slice(lastIndex).trim();
    if (tail) out.push(tail);

    const extras = [];
    for (const part of out) {
        if (!/[\uac00-\ud7a3]/.test(part)) continue;
        if (!/\s/.test(part)) continue;
        // Only split when the phrase mixes ASCII and hangul AND contains
        // exactly one standalone hangul token. This matches transliteration
        // patterns like "AI 에이전트" (→ yield "에이전트") while avoiding
        // descriptive phrases like "GGUF 모델 파일 형식" where splitting
        // would mis-alias generic words ("모델", "파일", "형식") to the
        // wrong wiki entry.
        const hasAscii = /[A-Za-z]/.test(part);
        if (!hasAscii) continue;
        const tokens = part.split(/\s+/);
        const hangulTokens = tokens.filter((t) => isHangulOnly(t) && t.length >= 2);
        if (hangulTokens.length !== 1) continue;
        extras.push(hangulTokens[0]);
    }
    return out.concat(extras);
}

function getEntryVariants(entry) {
    const variants = new Set();
    const titleParts = extractTitleParts(entry.title);
    const seeds = [
        entry.term,
        humanizeTermSlug(entry.term),
        entry.title,
        ...titleParts,
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
