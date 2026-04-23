'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SHOWCASES_DIR = path.join(REPO_ROOT, 'src', 'components', 'projects', 'showcases');
const VISIBLE_PROPERTY_KEYS = [
    'title',
    'body',
    'description',
    'kicker',
    'label',
    'useCase',
    'commandNote',
    'outcomeTitle',
    'outcome',
    'checkTitle',
    'fit',
    'tradeoff',
    'goal',
    'note',
    'localSummary',
    'effectiveSummary',
    'surfaceTitle',
    'verificationText',
    'referenceText',
];

function toPosix(value) {
    return value.replace(/\\/g, '/');
}

function resolveProjectShowcaseFile(showcaseComponent) {
    const component = String(showcaseComponent || '').trim();
    if (!component) return null;
    const filepath = path.join(SHOWCASES_DIR, component, 'index.tsx');
    return fs.existsSync(filepath) ? filepath : null;
}

function unescapeQuotedLiteral(quote, rawValue) {
    const literal = quote === '`'
        ? rawValue.replace(/\$\{[\s\S]*?\}/g, ' ')
        : rawValue;

    try {
        return Function(`"use strict"; return ${quote}${literal}${quote};`)();
    } catch {
        return literal;
    }
}

function stripJsxNoise(value) {
    return String(value || '')
        .replace(
            /<TermHint\b[^>]*\bterm=(['"`])([\s\S]*?)\1[^>]*\/>/g,
            (_, quote, rawValue) => ` ${unescapeQuotedLiteral(quote, rawValue)} `,
        )
        .replace(
            /<TermHint\b[^>]*\bterm=(['"`])([\s\S]*?)\1[^>]*>([\s\S]*?)<\/TermHint>/g,
            (_, quote, rawValue, children) => ` ${unescapeQuotedLiteral(quote, rawValue)} ${children} `,
        )
        .replace(/<TermHint\b[\s\S]*?\/>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\{[^{}]*\}/g, ' ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractVisibleLiterals(source) {
    const values = [];
    const propertyPattern = new RegExp(
        `\\b(?:${VISIBLE_PROPERTY_KEYS.join('|')})\\s*:\\s*(['"\`])([\\s\\S]*?)\\1`,
        'g',
    );
    const attributePattern = /\b(?:title|kicker|label|pill)\s*=\s*(['"`])([\s\S]*?)\1/g;
    const jsxTextPattern = /description=\{<>[\s\S]*?<\/>\}/g;

    for (const pattern of [propertyPattern, attributePattern]) {
        let match = pattern.exec(source);
        while (match) {
            const text = stripJsxNoise(unescapeQuotedLiteral(match[1], match[2]));
            if (text) values.push(text);
            match = pattern.exec(source);
        }
    }

    let jsxMatch = jsxTextPattern.exec(source);
    while (jsxMatch) {
        const text = stripJsxNoise(
            jsxMatch[0]
                .replace(/^description=\{<>/, '')
                .replace(/<\/>\}$/, ''),
        );
        if (text) values.push(text);
        jsxMatch = jsxTextPattern.exec(source);
    }

    return values;
}

function dedupeOrdered(values) {
    const seen = new Set();
    const items = [];
    for (const value of values) {
        const normalized = value.replace(/\s+/g, ' ').trim();
        if (!normalized || seen.has(normalized)) continue;
        seen.add(normalized);
        items.push(normalized);
    }
    return items;
}

function extractProjectShowcaseText(source) {
    return dedupeOrdered(extractVisibleLiterals(source)).join('\n');
}

function getProjectShowcaseInfo(frontmatter) {
    const component = String(frontmatter && frontmatter.showcaseComponent || '').trim();
    if (!component) return null;

    const filepath = resolveProjectShowcaseFile(component);
    if (!filepath) {
        return {
            component,
            filepath: null,
            relativePath: '',
            source: '',
            text: '',
        };
    }

    const source = fs.readFileSync(filepath, 'utf8');
    return {
        component,
        filepath,
        relativePath: toPosix(path.relative(REPO_ROOT, filepath)),
        source,
        text: extractProjectShowcaseText(source),
    };
}

module.exports = {
    resolveProjectShowcaseFile,
    extractProjectShowcaseText,
    getProjectShowcaseInfo,
};
