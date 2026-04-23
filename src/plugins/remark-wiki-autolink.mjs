import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const require = createRequire(import.meta.url);
const { buildWikiLookup, findWikiTextMatches } = require('../../scripts/lib/wiki-term-registry.cjs');

const LOOKUP = buildWikiLookup(ROOT);
const SKIP_NODE_TYPES = new Set(['link', 'linkReference', 'code', 'inlineCode', 'html', 'heading']);

function shouldProcessFile(file) {
    const normalizedPath = String(file?.path || '').replace(/\\/g, '/');
    return normalizedPath.includes('/src/content/news/');
}

function linkifyText(value) {
    if (!value) {
        return null;
    }

    const matches = findWikiTextMatches(value, LOOKUP);
    if (matches.length === 0) {
        return null;
    }

    const nodes = [];
    let cursor = 0;
    for (const match of matches) {
        const start = match.start;
        const end = match.end;

        if (start > cursor) {
            nodes.push({ type: 'text', value: value.slice(cursor, start) });
        }

        nodes.push({
            type: 'link',
            url: match.entry.url,
            children: [{ type: 'text', value: value.slice(start, end) }],
        });

        cursor = end;
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
