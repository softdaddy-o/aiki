const fs = require('fs');
const path = require('path');

const USER_AGENT = 'AIKI-Codex/1.0 (+https://aiki.softdaddy-o.com)';

async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'User-Agent': USER_AGENT,
            Accept: 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed (${response.status}) for ${url}`);
    }

    return response.json();
}

async function fetchText(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'User-Agent': USER_AGENT,
            Accept: 'text/html,application/xhtml+xml',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed (${response.status}) for ${url}`);
    }

    return response.text();
}

function stripHtml(html) {
    return String(html || '')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractTitle(html) {
    const og = String(html || '').match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    if (og) return og[1].trim();

    const title = String(html || '').match(/<title>([\s\S]*?)<\/title>/i);
    if (title) return stripHtml(title[1]);

    const h1 = String(html || '').match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1) return stripHtml(h1[1]);

    return null;
}

function extractDescription(html) {
    const patterns = [
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["']/i,
    ];

    for (const pattern of patterns) {
        const match = String(html || '').match(pattern);
        if (match) {
            return stripHtml(match[1]);
        }
    }

    const paragraphs = String(html || '').match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi) || [];
    for (const paragraph of paragraphs) {
        const text = stripHtml(paragraph);
        if (text.length >= 80) return text;
    }

    return stripHtml(html).slice(0, 320);
}

async function translateToKorean(text) {
    const source = String(text || '').trim();
    if (!source) return '';

    const url = 'https://translate.googleapis.com/translate_a/single'
        + `?client=gtx&sl=auto&tl=ko&dt=t&q=${encodeURIComponent(source)}`;

    const response = await fetch(url, {
        headers: {
            'User-Agent': USER_AGENT,
        },
    });

    if (!response.ok) {
        throw new Error(`Translation failed (${response.status})`);
    }

    const payload = await response.json();
    return (payload[0] || []).map((item) => item[0]).join('').trim();
}

async function summarizeSource(source) {
    if (source.type === 'wikipedia') {
        const page = encodeURIComponent(source.page);
        const payload = await fetchJson(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${page}`,
        );

        return {
            url: payload.content_urls?.desktop?.page || source.url || `https://en.wikipedia.org/wiki/${source.page}`,
            title: payload.title || source.page.replace(/_/g, ' '),
            summary: payload.extract || '',
        };
    }

    if (source.type === 'githubRepo') {
        const payload = await fetchJson(
            `https://api.github.com/repos/${source.repo}`,
            { headers: { Accept: 'application/vnd.github+json' } },
        );

        return {
            url: payload.html_url,
            title: payload.full_name,
            summary: payload.description || `${payload.full_name} repository`,
        };
    }

    const html = await fetchText(source.url);

    return {
        url: source.url,
        title: source.title || extractTitle(html) || source.url,
        summary: extractDescription(html),
    };
}

function sentenceSplit(text) {
    return String(text || '')
        .split(/(?<=[.!?])\s+/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function clip(text, maxLength) {
    const source = String(text || '');
    if (source.length <= maxLength) {
        return source;
    }

    return `${source.slice(0, maxLength - 1).trim()}…`;
}

function yamlQuote(value) {
    return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function writeUtf8(filePath, content) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
    USER_AGENT,
    clip,
    extractDescription,
    extractTitle,
    fetchJson,
    fetchText,
    sentenceSplit,
    stripHtml,
    summarizeSource,
    translateToKorean,
    writeUtf8,
    yamlQuote,
};
