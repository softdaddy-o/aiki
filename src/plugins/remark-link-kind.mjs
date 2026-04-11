const INTERNAL_HOSTS = new Set(['aiki.softdaddy-o.com']);

function mergeTokens(existingValue, nextTokens) {
    const currentTokens = Array.isArray(existingValue)
        ? existingValue
        : typeof existingValue === 'string'
            ? existingValue.split(/\s+/)
            : [];

    const merged = new Set(currentTokens.filter(Boolean));
    for (const token of nextTokens) {
        merged.add(token);
    }

    return Array.from(merged).join(' ');
}

function classifyLink(url) {
    if (!url || typeof url !== 'string') {
        return null;
    }

    if (url.startsWith('/') || url.startsWith('#')) {
        return 'internal';
    }

    if (/^(mailto:|tel:)/i.test(url)) {
        return 'external';
    }

    if (/^(https?:)?\/\//i.test(url)) {
        try {
            const parsedUrl = new URL(url, 'https://aiki.softdaddy-o.com');
            return INTERNAL_HOSTS.has(parsedUrl.host) ? 'internal' : 'external';
        } catch {
            return 'external';
        }
    }

    return 'internal';
}

function annotateLink(node) {
    const kind = classifyLink(node?.url);
    if (!kind) {
        return;
    }

    const properties = { ...(node.data?.hProperties ?? {}) };
    const classNames = Array.isArray(properties.className)
        ? [...properties.className]
        : typeof properties.className === 'string'
            ? [properties.className]
            : [];

    if (!classNames.includes(`is-${kind}-link`)) {
        classNames.push(`is-${kind}-link`);
    }

    properties.className = classNames;
    properties['data-link-kind'] = kind;

    if (kind === 'external' && /^(https?:)?\/\//i.test(node.url)) {
        properties.target ??= '_blank';
        properties.rel = mergeTokens(properties.rel, ['noopener', 'noreferrer']);
    }

    node.data = {
        ...(node.data ?? {}),
        hProperties: properties,
    };
}

function walk(node) {
    if (!node || typeof node !== 'object') {
        return;
    }

    if (node.type === 'link') {
        annotateLink(node);
    }

    if (!Array.isArray(node.children)) {
        return;
    }

    for (const child of node.children) {
        walk(child);
    }
}

export default function remarkLinkKind() {
    return (tree) => {
        walk(tree);
    };
}
