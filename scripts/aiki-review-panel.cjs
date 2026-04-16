const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const matter = require('gray-matter');

const { loadPanel } = require('./lib/agent-loader.cjs');
const { collectFindings } = require('./lib/script-findings.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src', 'content', 'wiki', 'ko');
const NEWS_DIR = path.join(REPO_ROOT, 'src', 'content', 'news', 'ko');
const PROJECTS_DIR = path.join(REPO_ROOT, 'src', 'content', 'projects', 'ko');
const BATCH_DIR = path.join(REPO_ROOT, 'data', 'review-batch');
const TODAY = new Date().toISOString().slice(0, 10);
const MAX_ROUNDS = 3;

function parseListArg(args, name) {
    const index = args.indexOf(name);
    if (index < 0) return [];
    const value = args[index + 1];
    if (!value || value.startsWith('--')) return [];
    return value.split(',').map((entry) => entry.trim()).filter(Boolean);
}

function parseValueArg(args, name, fallback) {
    const index = args.indexOf(name);
    if (index < 0) return fallback;
    const value = args[index + 1];
    return value && !value.startsWith('--') ? value : fallback;
}

function parseArgs() {
    const args = process.argv.slice(2);
    const target = parseValueArg(args, '--target', 'wiki');
    const only = parseListArg(args, '--only');
    const all = args.includes('--all');
    const batchSize = Number(parseValueArg(args, '--batch-size', '8')) || 8;
    const maxRounds = Math.min(
        MAX_ROUNDS,
        Math.max(1, Number(parseValueArg(args, '--max-rounds', '1')) || 1),
    );

    return {
        target,
        all,
        staleOnly: !all && only.length === 0,
        only,
        batchSize,
        maxRounds,
        markDrafts: !args.includes('--no-draft'),
        model: parseValueArg(args, '--model', undefined),
        dryRun: args.includes('--dry-run'),
    };
}

function getPanelName(target) {
    if (target === 'news') return 'news-review';
    if (target === 'projects') return 'project-review';
    return 'wiki-review';
}

function getContentDir(target) {
    if (target === 'news') return NEWS_DIR;
    if (target === 'projects') return PROJECTS_DIR;
    return WIKI_DIR;
}

function getTargetKey(target) {
    return target.frontmatter.term || target.frontmatter.slug || path.basename(target.filename, '.md');
}

function needsReview(frontmatter, currentPanelVersion) {
    if (!frontmatter.reviewStamp) return true;
    if (frontmatter.reviewStamp.panelVerdict !== 'pass') return true;
    if (frontmatter.reviewStamp.panelVersion !== currentPanelVersion) return true;
    return false;
}

function listTargets(options, panel) {
    const dir = getContentDir(options.target);
    if (!fs.existsSync(dir)) return [];

    const targets = [];
    for (const filename of fs.readdirSync(dir).filter((file) => file.endsWith('.md')).sort()) {
        const filepath = path.join(dir, filename);
        const raw = fs.readFileSync(filepath, 'utf8');
        const parsed = matter(raw);
        const frontmatter = parsed.data || {};
        const key = frontmatter.term || path.basename(filename, '.md');
        const title = String(frontmatter.title || '');

        if (frontmatter.draft === true) continue;

        if (options.only.length > 0) {
            if (!options.only.includes(key) && !options.only.includes(path.basename(filename, '.md')) && !options.only.includes(title)) {
                continue;
            }
        } else if (options.staleOnly && !needsReview(frontmatter, panel.version)) {
            continue;
        }

        targets.push({
            filepath,
            filename,
            frontmatter,
            body: parsed.content.trim(),
        });
    }

    return targets.slice(0, Math.max(1, options.batchSize));
}

function getCatalogMeta(term) {
    try {
        const { catalog } = require('./lib/wiki-catalog.cjs');
        const entry = (catalog || []).find((item) => item.term === term);
        if (!entry) return {};

        return {
            adversarialRisk: entry.adversarialRisk || '',
            userProblem: entry.userProblem || '',
            decisionAxis: entry.decisionAxis || '',
            relatedHints: entry.relatedHints || {},
        };
    } catch {
        return {};
    }
}

function getLinkableCollections() {
    return [
        { dir: WIKI_DIR, urlBase: '/ko/wiki/', key: 'term', aliasesField: 'aliases' },
        { dir: PROJECTS_DIR, urlBase: '/ko/projects/', key: 'slug', aliasesField: null },
    ];
}

function normalizeSearchText(value) {
    return String(value || '').toLowerCase();
}

function shouldSuggestLink(searchText, candidate) {
    const terms = [candidate.term, candidate.title, ...(candidate.aliases || [])]
        .map((value) => String(value || '').trim())
        .filter((value) => value.length >= 2);

    return terms.some((term) => searchText.includes(term.toLowerCase()));
}

function getInternalLinkCandidates(target) {
    const searchText = normalizeSearchText([
        target.frontmatter.title,
        target.frontmatter.summary,
        target.frontmatter.readerValue,
        target.body,
    ].join('\n'));
    const selfKey = getTargetKey(target);
    const candidates = [];

    for (const collection of getLinkableCollections()) {
        if (!fs.existsSync(collection.dir)) continue;

        for (const filename of fs.readdirSync(collection.dir).filter((file) => file.endsWith('.md')).sort()) {
            const filepath = path.join(collection.dir, filename);
            const raw = fs.readFileSync(filepath, 'utf8');
            const parsed = matter(raw);
            const frontmatter = parsed.data || {};
            if (frontmatter.draft === true) continue;

            const key = frontmatter[collection.key] || path.basename(filename, '.md');
            if (!key || key === selfKey) continue;

            const candidate = {
                term: key,
                title: String(frontmatter.title || key),
                aliases: collection.aliasesField && Array.isArray(frontmatter[collection.aliasesField]) ? frontmatter[collection.aliasesField] : [],
                url: `${collection.urlBase}${key}/`,
            };

            if (shouldSuggestLink(searchText, candidate)) {
                candidates.push(candidate);
            }
        }
    }

    return candidates.slice(0, 20);
}

function getEncodingDiagnostics(target) {
    const text = JSON.stringify({
        frontmatter: target.frontmatter,
        body: target.body,
    });
    const markerCounts = {
        replacementChar: (text.match(/\uFFFD/g) || []).length,
        cjkMojibake: (text.match(/\u5360/g) || []).length,
        repeatedQuestionMarks: (text.match(/\?\?/g) || []).length,
        latinMojibake: (text.match(/[\u00C3\u00C2]/g) || []).length,
    };
    const markerTotal = Object.values(markerCounts).reduce((sum, count) => sum + count, 0);

    return {
        hasBrokenText: markerTotal > 0,
        markerCounts,
    };
}

function buildReviewInput(target, contentType) {
    const term = getTargetKey(target);
    return {
        term,
        contentType,
        frontmatter: target.frontmatter,
        body: target.body,
        catalogMeta: getCatalogMeta(term),
        internalLinkCandidates: getInternalLinkCandidates(target),
        encodingDiagnostics: getEncodingDiagnostics(target),
        scriptFindings: collectFindings(target.filepath, contentType),
    };
}

function composeReviewPrompt(panel, batchInputRelativePath) {
    const reviewerSections = panel.agents.map((agent, index) => (
        `=== REVIEWER ${index + 1}: ${agent.name} (${agent.id}) ===\n\n${agent.systemPrompt}`
    )).join('\n\n');
    const roleIds = panel.agents.map((agent) => agent.id.replace(/-/g, '_')).join(', ');

    return `
You are the AIKI role-based editorial review panel.

Read the JSON file at "${batchInputRelativePath}". It contains { "pages": [...] } review inputs.
For each page, produce one panel result with exactly ${panel.agents.length} reviewer outputs.

${reviewerSections}

=== Output Rules ===
- Output JSON only. No prose outside JSON.
- Output shape: { "results": [panel-result, ...] }.
- A panel result is { "term": string, "panelVerdict": "pass"|"revise"|"fail", "round": number, "reviews": review[], "aggregateScore": number, "topMustFix": string[] }.
- Each review is { "role": string, "verdict": "pass"|"fail"|"warn", "score": number, "findings": string[], "mustFix": string[], "niceToHave": string[] }.
- Use only the reviewer role ids for this panel: ${roleIds}.
- panelVerdict is "pass" only when every reviewer verdict is "pass".
- Use "revise" when at least one reviewer fails or blocking mustFix items remain.
- Include scriptFindings as evidence, but make an editorial judgment instead of copying them blindly.
- If internalLinkCandidates are present, check whether directly relevant existing pages are missing obvious inline links or related links.
- Normal Korean Hangul text is not mojibake. Only flag mojibake or broken text when the page contains replacement characters, "占", repeated "??" artifacts, blocked-page text, or actually illegible encoding damage in the input page itself.
- Each page includes encodingDiagnostics. If encodingDiagnostics.hasBrokenText is false, do not use mojibake, broken Korean, or encoding damage as a finding or mustFix for that page.
`.trim();
}

function extractJson(text) {
    const trimmed = String(text || '').trim();
    try {
        return JSON.parse(trimmed);
    } catch {}

    const match = trimmed.match(/\{[\s\S]*\}$/);
    if (!match) throw new Error('Review output did not contain JSON');
    return JSON.parse(match[0]);
}

function buildOutputSchema() {
    return {
        type: 'object',
        additionalProperties: false,
        required: ['results'],
        properties: {
            results: {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['term', 'panelVerdict', 'round', 'reviews', 'aggregateScore', 'topMustFix'],
                    properties: {
                        term: { type: 'string' },
                        panelVerdict: { type: 'string', enum: ['pass', 'revise', 'fail'] },
                        round: { type: 'number' },
                        reviews: {
                            type: 'array',
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                required: ['role', 'verdict', 'score', 'findings', 'mustFix', 'niceToHave'],
                                properties: {
                                    role: { type: 'string' },
                                    verdict: { type: 'string', enum: ['pass', 'fail', 'warn'] },
                                    score: { type: 'number' },
                                    findings: { type: 'array', items: { type: 'string' } },
                                    mustFix: { type: 'array', items: { type: 'string' } },
                                    niceToHave: { type: 'array', items: { type: 'string' } },
                                },
                            },
                        },
                        aggregateScore: { type: 'number' },
                        topMustFix: { type: 'array', items: { type: 'string' } },
                    },
                },
            },
        },
    };
}

function executeReview(prompt, model) {
    const llmModel = model || process.env.AIKI_WIKI_LLM_MODEL || 'gpt-5.4';
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aiki-review-'));
    const schemaPath = path.join(tempDir, 'schema.json');
    const outputPath = path.join(tempDir, 'output.json');

    try {
        fs.writeFileSync(schemaPath, `${JSON.stringify(buildOutputSchema(), null, 2)}\n`, 'utf8');

        const args = [
            'exec',
            '--sandbox', 'workspace-write',
            '--skip-git-repo-check',
            '--output-schema', schemaPath,
            '-o', outputPath,
            '--model', llmModel,
            '-',
        ];

        cp.execFileSync('codex', args, {
            cwd: REPO_ROOT,
            stdio: 'pipe',
            encoding: 'utf8',
            shell: true,
            input: prompt,
            maxBuffer: 1024 * 1024 * 40,
        });

        if (!fs.existsSync(outputPath)) {
            throw new Error('Review output file was not created');
        }

        return extractJson(fs.readFileSync(outputPath, 'utf8'));
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

function getContentTypeFromFilepath(filepath) {
    const normalized = path.normalize(filepath);
    if (normalized.startsWith(path.normalize(NEWS_DIR))) return 'news';
    if (normalized.startsWith(path.normalize(PROJECTS_DIR))) return 'projects';
    return 'wiki';
}

function getGuideVersionKey(contentType) {
    if (contentType === 'news') return 'news';
    if (contentType === 'projects') return 'projects';
    return 'wiki';
}

function writeReviewStamp(filepath, panelResult, panel) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const agentVersions = {};

    for (const agent of panel.agents) {
        agentVersions[agent.id] = agent.version;
    }

    const stamp = [
        'reviewStamp:',
        `  panelVersion: "${panel.version}"`,
        '  agentVersions:',
        ...Object.entries(agentVersions).map(([id, version]) => `    ${id}: "${version}"`),
        `  panelVerdict: ${panelResult.panelVerdict}`,
        `  reviewedAt: "${TODAY}"`,
    ].join('\n');

    const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---)(\r?\n[\s\S]*)$/);
    if (!match) {
        throw new Error(`frontmatter not found: ${filepath}`);
    }

    let frontmatter = match[1];
    const body = match[2];
    const guideKey = getGuideVersionKey(getContentTypeFromFilepath(filepath));

    if (panelResult.panelVerdict === 'pass') {
        if (/guideVersion:\r?\n/.test(frontmatter)) {
            const guidePattern = new RegExp(`(\\r?\\n\\s+${guideKey}:\\s*)[^\\r\\n]+`);
            if (guidePattern.test(frontmatter)) {
                frontmatter = frontmatter.replace(guidePattern, '$1"3.0.0"');
            } else {
                frontmatter = frontmatter.replace(/(guideVersion:\r?\n)/, `$1  ${guideKey}: "3.0.0"\n`);
            }
        } else {
            frontmatter = frontmatter.replace(/\r?\n---$/, `\nguideVersion:\n  common: "3.0.0"\n  ${guideKey}: "3.0.0"\n---`);
        }
    }

    if (/\r?\nreviewStamp:\r?\n/.test(frontmatter)) {
        frontmatter = frontmatter.replace(/\r?\nreviewStamp:\r?\n[\s\S]*?(?=\r?\n---$)/, `\n${stamp}`);
    } else {
        frontmatter = frontmatter.replace(/\r?\n---$/, `\n${stamp}\n---`);
    }

    fs.writeFileSync(filepath, frontmatter + body, 'utf8');
}

function markAsDraft(filepath) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const parsed = matter(raw);
    parsed.data.draft = true;
    fs.writeFileSync(filepath, matter.stringify(parsed.content, parsed.data), 'utf8');
}

function writeBatchInput(reviewInputs) {
    fs.mkdirSync(BATCH_DIR, { recursive: true });
    const batchInputPath = path.join(BATCH_DIR, 'batch-input.json');
    fs.writeFileSync(batchInputPath, `${JSON.stringify({ pages: reviewInputs }, null, 2)}\n`, 'utf8');
    return batchInputPath;
}

function writePanelOutput(response) {
    fs.mkdirSync(BATCH_DIR, { recursive: true });
    const outputPath = path.join(BATCH_DIR, 'panel-output.json');
    fs.writeFileSync(outputPath, `${JSON.stringify(response, null, 2)}\n`, 'utf8');
    return outputPath;
}

async function main() {
    const options = parseArgs();
    const panel = loadPanel(getPanelName(options.target));
    const targets = listTargets(options, panel);

    if (targets.length === 0) {
        console.log('No review targets found.');
        return;
    }

    const reviewInputs = targets.map((target) => buildReviewInput(target, options.target));
    const batchInputPath = writeBatchInput(reviewInputs);
    const batchInputRelativePath = path.relative(REPO_ROOT, batchInputPath).replace(/\\/g, '/');
    const prompt = composeReviewPrompt(panel, batchInputRelativePath);

    console.log(`Review panel: ${panel.name} v${panel.version}`);
    console.log(`Targets: ${targets.length}`);
    console.log(`Max rounds: ${options.maxRounds}`);
    console.log(`Draft on final fail: ${options.markDrafts ? 'yes' : 'no'}`);
    console.log(`Batch input: ${batchInputRelativePath}`);

    if (options.dryRun) {
        console.log('\n=== DRY RUN PROMPT PREVIEW ===\n');
        console.log(`${prompt.slice(0, 2400)}\n...`);
        return;
    }

    for (let round = 1; round <= options.maxRounds; round++) {
        console.log(`\nRound ${round}/${options.maxRounds}`);
        const response = executeReview(prompt, options.model);
        const panelOutputPath = writePanelOutput(response);
        console.log(`Panel output: ${path.relative(REPO_ROOT, panelOutputPath).replace(/\\/g, '/')}`);
        const results = Array.isArray(response.results) ? response.results : [];
        let allPassed = true;

        for (const result of results) {
            result.round = result.round || round;
            const target = targets.find((item) => getTargetKey(item) === result.term);
            if (!target) continue;

            const status = result.panelVerdict === 'pass' ? 'PASS' : 'REVISE';
            console.log(`- ${result.term}: ${status} (${result.aggregateScore || '?'})`);

            if (result.panelVerdict === 'pass') {
                writeReviewStamp(target.filepath, result, panel);
            } else {
                allPassed = false;
                for (const fix of (result.topMustFix || []).slice(0, 3)) {
                    console.log(`  mustFix: ${fix}`);
                }
            }
        }

        if (allPassed) {
            console.log(`\nAll ${results.length} page(s) passed.`);
            return;
        }

        if (round === options.maxRounds && options.markDrafts) {
            console.log('\nMax rounds reached. Marking remaining failing pages as draft.');
            for (const result of results) {
                if (result.panelVerdict === 'pass') continue;
                const target = targets.find((item) => getTargetKey(item) === result.term);
                if (target) {
                    markAsDraft(target.filepath);
                    console.log(`- ${result.term}: draft=true`);
                }
            }
        } else if (round === options.maxRounds) {
            console.log('\nMax rounds reached. Failing pages were left unchanged because --no-draft was set.');
        }
    }
}

if (require.main === module) {
    main().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = {
    parseArgs,
    needsReview,
    listTargets,
    buildReviewInput,
    composeReviewPrompt,
    writeReviewStamp,
};
