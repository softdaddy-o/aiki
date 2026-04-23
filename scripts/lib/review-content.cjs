'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { getProjectShowcaseInfo } = require('./project-showcase.cjs');

function detectContentType(filepath) {
    const normalized = path.normalize(filepath);
    if (normalized.includes(path.normalize(`${path.sep}src${path.sep}content${path.sep}news${path.sep}`))) {
        return 'news';
    }
    if (normalized.includes(path.normalize(`${path.sep}src${path.sep}content${path.sep}projects${path.sep}`))) {
        return 'projects';
    }
    return 'wiki';
}

function getCanonicalMarkdown(raw) {
    const parsed = matter(raw);
    const frontmatter = { ...(parsed.data || {}) };
    delete frontmatter.reviewStamp;
    return matter.stringify(parsed.content, frontmatter);
}

function getReviewContentPayload(filepath, rawOverride) {
    const raw = rawOverride == null ? fs.readFileSync(filepath, 'utf8') : rawOverride;
    const parsed = matter(raw);
    const contentType = detectContentType(filepath);
    const showcase = contentType === 'projects' ? getProjectShowcaseInfo(parsed.data || {}) : null;

    return {
        contentType,
        canonicalMarkdown: getCanonicalMarkdown(raw),
        showcase,
    };
}

function getReviewScopeFiles(filepath, rawOverride) {
    const payload = getReviewContentPayload(filepath, rawOverride);
    return [
        filepath,
        payload.showcase && payload.showcase.filepath ? payload.showcase.filepath : null,
    ].filter(Boolean);
}

function getReviewContentHashFromRaw(raw, filepath) {
    const payload = getReviewContentPayload(filepath, raw);
    const hash = crypto.createHash('sha256');
    hash.update(payload.canonicalMarkdown, 'utf8');

    if (payload.showcase && payload.showcase.filepath) {
        hash.update('\n', 'utf8');
        hash.update(payload.showcase.relativePath, 'utf8');
        hash.update('\n', 'utf8');
        hash.update(payload.showcase.source, 'utf8');
    }

    return hash.digest('hex').slice(0, 16);
}

function getReviewContentHash(filepath) {
    return getReviewContentHashFromRaw(fs.readFileSync(filepath, 'utf8'), filepath);
}

module.exports = {
    detectContentType,
    getReviewContentHash,
    getReviewContentHashFromRaw,
    getReviewContentPayload,
    getReviewScopeFiles,
};
