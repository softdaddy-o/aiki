const fs = require('fs');
const path = require('path');

function normalizeQualityDimensionScore(value) {
    if (typeof value === 'number') return value;
    if (value && typeof value.score === 'number') return value.score;
    return null;
}

function collectFindings(filepath, contentType) {
    if (!fs.existsSync(filepath)) return [];

    const findings = [];

    try {
        const { collectFileFindings } = require(path.resolve(__dirname, '..', 'aiki-pre-publish-check.cjs'));
        if (typeof collectFileFindings === 'function') {
            findings.push(...collectFileFindings(filepath, contentType));
        }
    } catch (err) {
        findings.push({
            source: 'pre-publish',
            severity: 'warn',
            rule: 'pre-publish-unavailable',
            message: `pre-publish findings unavailable: ${err.message}`,
        });
    }

    if (contentType === 'wiki') {
        try {
            const { scoreWikiFile } = require('./wiki-quality-scoring.cjs');
            const result = scoreWikiFile(filepath);

            if (result && result.total < 80) {
                findings.push({
                    source: 'quality-scoring',
                    severity: 'fail',
                    rule: 'quality-total',
                    message: `quality score ${result.total}/100 (threshold: 80)`,
                });
            }

            if (result && result.dimensions) {
                for (const [dimension, detail] of Object.entries(result.dimensions)) {
                    const score = normalizeQualityDimensionScore(detail);
                    if (score !== null && score < 15) {
                        findings.push({
                            source: 'quality-scoring',
                            severity: 'warn',
                            rule: `quality-${dimension}`,
                            message: `${dimension} score ${score}/25`,
                        });
                    }
                }
            }
        } catch (err) {
            findings.push({
                source: 'quality-scoring',
                severity: 'warn',
                rule: 'quality-scoring-unavailable',
                message: `quality scoring unavailable: ${err.message}`,
            });
        }
    }

    return findings;
}

module.exports = {
    collectFindings,
};
