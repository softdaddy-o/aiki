import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const require = createRequire(import.meta.url);
const { buildWikiLookup } = require('../../scripts/lib/wiki-term-registry.cjs');

const LOOKUP = buildWikiLookup(ROOT);
const LOOKUP_MAP = new Map(LOOKUP.map((entry) => [entry.normalized, entry]));
const SKIP_NODE_TYPES = new Set(['link', 'linkReference', 'code', 'inlineCode', 'html', 'heading']);
const ESCAPE_REGEX = /[.*+?^${}()|[\]\\]/g;
const LINK_PATTERN = LOOKUP.length > 0
    ? new RegExp(
        `(^|[^\\p{L}\\p{N}])(${LOOKUP.map((entry) => entry.label.replace(ESCAPE_REGEX, '\\$&')).join('|')})(?=$|[^\\p{L}\\p{N}]|\\p{Script=Hangul})`,
        'giu',
    )
    : null;

function shouldProcessFile(file) {
    const normalizedPath = String(file?.path || '').replace(/\\/g, '/');
    return normalizedPath.includes('/src/content/news/');
}

function linkifyText(value) {
    if (!LINK_PATTERN || !value) {
        return null;
    }

    const nodes = [];
    let cursor = 0;
    let replaced = false;
    LINK_PATTERN.lastIndex = 0;

    for (let match = LINK_PATTERN.exec(value); match; match = LINK_PATTERN.exec(value)) {
        const prefix = match[1] || '';
        const label = match[2] || '';
        const entry = LOOKUP_MAP.get(label.toLowerCase());
        if (!entry) {
            continue;
        }

        const start = match.index + prefix.length;
        const end = start + label.length;

        if (start > cursor) {
            nodes.push({ type: 'text', value: value.slice(cursor, start) });
        }

        nodes.push({
            type: 'link',
            url: entry.url,
            children: [{ type: 'text', value: value.slice(start, end) }],
        });

        cursor = end;
        replaced = true;
    }

    if (!replaced) {
        return null;
    }

    if (cursor < value.length) {
        nodes.push({ type: 'text', value: value.slice(cursor) });
    }

    return nodes.filter((node) => node.type !== 'text' || node.value.length > 0);
}

function transformChildren(parent) {
    if (!Array.isArray(parent?.children) || SKIP_NODE_TYPES.has(parent.type)) {
        return;
    }

    for (let index = 0; index < parent.children.length; index++) {
        const child = parent.children[index];

        if (child?.type === 'text') {
            const replacement = linkifyText(child.value);
            if (replacement) {
                parent.children.splice(index, 1, ...replacement);
                index += replacement.length - 1;
            }
            continue;
        }

        transformChildren(child);
    }
}

export default function remarkWikiAutolink() {
    return (tree, file) => {
        if (!shouldProcessFile(file)) {
            return;
        }

        transformChildren(tree);
    };
}
