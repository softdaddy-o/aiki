'use strict';

const coreToneRules = require('./tone-rules-core.cjs');

const PROJECT_EXCLUDED_RULE_IDS = new Set(['B1']);

const PROFILES = {
    ...coreToneRules.PROFILES,
    projects: {
        name: 'projects (AIKI showcase)',
        formalFailRatio: 0.35,
        formalWarnRatio: 0.2,
        colloquialMinRatio: 0.05,
        minNumbers: 1,
        factChainWarn: 3,
    },
};

function resolvePlatform(platform) {
    if (platform === 'news') return 'blog';
    if (platform === 'projects') return 'projects';
    return platform;
}

function checkProjectTone(body) {
    const profile = PROFILES.projects;
    const sentences = coreToneRules.splitSentences(body);
    const results = [];

    for (const rule of coreToneRules.ALL_RULES) {
        if (!rule.platforms.includes('blog')) continue;
        if (PROJECT_EXCLUDED_RULE_IDS.has(rule.id)) continue;
        const outcome = rule.check(body, sentences, profile);
        if (outcome) {
            results.push({ id: rule.id, name: rule.name, ...outcome });
        }
    }

    return results;
}

function checkTone(body, platform) {
    const resolvedPlatform = resolvePlatform(platform || 'blog');
    if (resolvedPlatform === 'projects') {
        return checkProjectTone(body);
    }
    return coreToneRules.checkTone(body, resolvedPlatform);
}

function hasFail(results) {
    return results.some((result) => result.severity === 'FAIL');
}

function printResults(label, results) {
    if (typeof coreToneRules.printResults === 'function') {
        return coreToneRules.printResults(label, results);
    }

    const fails = results.filter((result) => result.severity === 'FAIL');
    const warns = results.filter((result) => result.severity === 'WARN');
    const icon = fails.length > 0 ? 'FAIL' : warns.length > 0 ? 'WARN' : 'PASS';
    console.log(`${icon} ${label}`);
    for (const result of results) {
        console.log(`  [${result.id}] ${result.name}: ${result.msg}`);
    }
}

module.exports = {
    ...coreToneRules,
    PROFILES,
    resolvePlatform,
    checkTone,
    hasFail,
    printResults,
};
