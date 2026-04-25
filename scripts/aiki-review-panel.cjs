const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const matter = require('gray-matter');

const { loadPanel } = require('./lib/agent-loader.cjs');
const { collectFindings } = require('./lib/script-findings.cjs');
const {
    detectContentType,
    getReviewContentHash,
    getReviewContentHashFromRaw,
    getReviewContentPayload,
    getReviewScopeFiles,
} = require('./lib/review-content.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src', 'content', 'wiki', 'ko');
const NEWS_DIR = path.join(REPO_ROOT, 'src', 'content', 'news', 'ko');
const PROJECTS_DIR = path.join(REPO_ROOT, 'src', 'content', 'projects', 'ko');
const BATCH_DIR = path.join(REPO_ROOT, 'data', 'review-batch');
const GUIDE_FILES = {
    tone: path.join(REPO_ROOT, 'docs', 'tone-guide-common.md'),
    common: path.join(REPO_ROOT, 'docs', 'content-guide-common.md'),
    news: path.join(REPO_ROOT, 'docs', 'content-guide-news.md'),
    wiki: path.join(REPO_ROOT, 'docs', 'content-guide-wiki.md'),
    projects: path.join(REPO_ROOT, 'docs', 'content-guide-projects.md'),
};
const TODAY = new Date().toISOString().slice(0, 10);
const MAX_ROUNDS = 3;
const RUN_ID = `${TODAY}-${process.pid}`;

function readGuideVersion(filePath, fallback = '0.0.0') {
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        const match = text.match(/\*\*Version\*\*[:\s]+`([^`]+)`/);
        return match ? match[1] : fallback;
    } catch {
        return fallback;
    }
}

function extractGuideSection(text, heading) {
    const start = text.indexOf(heading);
    if (start < 0) return '';
    const rest = text.slice(start);
    const nextHeadingMatch = rest.slice(heading.length).match(/\n##\s+/);
    if (!nextHeadingMatch) return rest.trim();
    return rest.slice(0, heading.length + nextHeadingMatch.index).trim();
}

function getPanelContentType(panelName) {
    if (panelName === 'news-review') return 'news';
    if (panelName === 'project-review') return 'projects';
    return 'wiki';
}

function buildGuideContext(contentType) {
    const toneText = fs.readFileSync(GUIDE_FILES.tone, 'utf8');
    const commonText = fs.readFileSync(GUIDE_FILES.common, 'utf8');
    const typeFile = GUIDE_FILES[contentType];
    const typeText = fs.readFileSync(typeFile, 'utf8');
    const typeHeadingMap = {
        news: ['## 1. 뉴스 기사 목표', '## 5. 본문 구조', '## 6. 제목 작성 규칙', '## 7. summary 작성 규칙', '## 9. 톤 검수 경로 (Phase 2.5)'],
        wiki: ['## 1. 위키 페이지 목표', '## 4. 본문 구조 (formatVersion 2 기준)', '## 6. 카테고리별 작성 포인트', '## 7. 팩트체크 (위키 전용 기준)'],
        projects: ['## 1. 프로젝트 페이지 목표', '## 3. 프로젝트 콘텐츠 구성', '## 4. 리뷰 체크포인트'],
    };

    const sections = [
        {
            label: 'Tone',
            filePath: path.relative(REPO_ROOT, GUIDE_FILES.tone).replace(/\\/g, '/'),
            version: readGuideVersion(GUIDE_FILES.tone),
            body: [
                '## 1. 화자의 위치',
                '## 2. 말투 규칙',
                '## 3. 구체화 방식',
                '## 4. 하지 말아야 할 것',
                '## 5. 톤 체크리스트',
            ]
                .map((heading) => extractGuideSection(toneText, heading))
                .filter(Boolean)
                .join('\n\n'),
        },
        {
            label: 'Common Composition',
            filePath: path.relative(REPO_ROOT, GUIDE_FILES.common).replace(/\\/g, '/'),
            version: readGuideVersion(GUIDE_FILES.common),
            body: [
                '## 2. 문서 역할 분리',
                '## 4. 공통 구성 규칙',
                '## 5. 수치 & 근거 규칙',
                '## 6. 팩트체크 공통 규칙',
                '## 7. readerValue 필드',
                '## 9. 링크 규칙',
            ]
                .map((heading) => extractGuideSection(commonText, heading))
                .filter(Boolean)
                .join('\n\n'),
        },
        {
            label: contentType,
            filePath: path.relative(REPO_ROOT, typeFile).replace(/\\/g, '/'),
            version: readGuideVersion(typeFile),
            body: (typeHeadingMap[contentType] || [])
                .map((heading) => extractGuideSection(typeText, heading))
                .filter(Boolean)
                .join('\n\n'),
        },
    ];

    return sections
        .filter((section) => section.body)
        .map((section) => `=== ${section.label.toUpperCase()} GUIDE (${section.filePath} v${section.version}) ===\n${section.body}`)
        .join('\n\n');
}

function getCurrentGuideVersions(contentType) {
    const typeKey = contentType === 'projects' ? 'projects' : contentType;
    return {
        tone: readGuideVersion(GUIDE_FILES.tone),
        common: readGuideVersion(GUIDE_FILES.common),
        [typeKey]: readGuideVersion(GUIDE_FILES[typeKey]),
    };
}

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
        autoRevise: !args.includes('--no-revise'),
        includeDrafts: args.includes('--include-drafts'),
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

function hasCurrentAgentVersions(stamp, panel) {
    if (!stamp || !stamp.agentVersions || typeof stamp.agentVersions !== 'object') {
        return false;
    }

    return panel.agents.every((agent) => stamp.agentVersions[agent.id] === agent.version);
}

function hasCurrentGuideVersions(stamp, contentType) {
    if (!stamp || !stamp.guideVersions || typeof stamp.guideVersions !== 'object') {
        return false;
    }

    const currentGuideVersions = getCurrentGuideVersions(contentType);
    return Object.entries(currentGuideVersions).every(([key, version]) => stamp.guideVersions[key] === version);
}

function needsReview(frontmatter, panel, filepath) {
    const contentType = detectContentType(filepath);
    if (!frontmatter.reviewStamp) return true;
    if (frontmatter.reviewStamp.panelVerdict !== 'pass') return true;
    if (frontmatter.reviewStamp.panelVersion !== panel.version) return true;
    if (!hasCurrentAgentVersions(frontmatter.reviewStamp, panel)) return true;
    if (!hasCurrentGuideVersions(frontmatter.reviewStamp, contentType)) return true;
    if (!frontmatter.reviewStamp.contentHash) return true;
    return frontmatter.reviewStamp.contentHash !== getReviewContentHash(filepath);
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

        if (frontmatter.draft === true && !options.includeDrafts) continue;

        if (options.only.length > 0) {
            if (!options.only.includes(key) && !options.only.includes(path.basename(filename, '.md')) && !options.only.includes(title)) {
                continue;
            }
        } else if (options.staleOnly && !needsReview(frontmatter, panel, filepath)) {
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
    const reviewScopeFiles = getReviewScopeFiles(target.filepath)
        .map((filePath) => path.relative(REPO_ROOT, filePath).replace(/\\/g, '/'));
    const payload = getReviewContentPayload(target.filepath);
    const showcase = payload.showcase && payload.showcase.filepath
        ? {
            component: payload.showcase.component,
            filePath: payload.showcase.relativePath,
            text: payload.showcase.text,
        }
        : null;

    return {
        term,
        contentType,
        frontmatter: target.frontmatter,
        body: target.body,
        reviewScopeFiles,
        showcase,
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
    const guideContext = buildGuideContext(getPanelContentType(panel.name));

    return `
You are the AIKI role-based editorial review panel.

Read the JSON file at "${batchInputRelativePath}". It contains { "pages": [...] } review inputs.
For each page, produce one panel result with exactly ${panel.agents.length} reviewer outputs.

=== Guide Context ===
${guideContext}

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
- For project pages, review both markdown body and showcase.text. Visible TSX showcase copy is part of the editorial surface.
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

function sanitizeFileSegment(value) {
    return String(value || '')
        .replace(/[^a-zA-Z0-9._-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'run';
}

function getReviewArtifactsBase(round) {
    return `${sanitizeFileSegment(RUN_ID)}-round${round}`;
}

function formatRevisionNotes(result) {
    const lines = [];

    for (const review of Array.isArray(result.reviews) ? result.reviews : []) {
        if (Array.isArray(review.mustFix) && review.mustFix.length > 0) {
            lines.push(`- ${review.role} mustFix: ${review.mustFix.join(' | ')}`);
        }
        if (Array.isArray(review.findings) && review.findings.length > 0) {
            lines.push(`- ${review.role} findings: ${review.findings.join(' | ')}`);
        }
    }

    return lines.length > 0 ? lines.join('\n') : '- No reviewer notes were provided.';
}

function buildRevisionPrompt(target, result, reviewInput) {
    const filePaths = Array.isArray(reviewInput.reviewScopeFiles) && reviewInput.reviewScopeFiles.length > 0
        ? reviewInput.reviewScopeFiles
        : [path.relative(REPO_ROOT, target.filepath).replace(/\\/g, '/')];
    const contentType = reviewInput.contentType;
    const fixList = (result.topMustFix || []).map((item) => `- ${item}`).join('\n') || '- No topMustFix items were provided.';
    const linkHints = (reviewInput.internalLinkCandidates || [])
        .map((candidate) => `- ${candidate.title}: ${candidate.url}`)
        .join('\n') || '- No internal link candidates were provided.';
    const scriptHints = (reviewInput.scriptFindings || [])
        .map((item) => `- [${item.severity}] ${item.rule}: ${item.message}`)
        .join('\n') || '- No script findings were provided.';
    const showcaseHint = reviewInput.showcase && reviewInput.showcase.filePath
        ? `- Showcase component: ${reviewInput.showcase.filePath}`
        : '- No showcase component was provided.';

    return `
You are fixing an AIKI ${contentType} markdown file after editorial panel review.

Edit these files in place when relevant:
${filePaths.map((filePath) => `- ${filePath}`).join('\n')}

Requirements:
- Apply the must-fix items from the review to the actual file content.
- Keep valid frontmatter and markdown structure.
- In frontmatter YAML, quote any list item or scalar string that contains markdown link syntax like [Term](/path/).
- Preserve factual claims unless the review explicitly says the claim is weak or unclear.
- Use Korean prose for user-facing sentences.
- Add inline links when the review says links are missing and the candidate list below is relevant.
- Do not invent new sections unless needed to satisfy the review. If a compare/limits section is needed, add it cleanly.
- When the review mentions showcase copy, card headings, or visible project UI text, update the showcase TSX file instead of leaving the issue in place.
- Do not output the full file. Edit the file in place and print a short confirmation only.

Panel topMustFix:
${fixList}

Reviewer details:
${formatRevisionNotes(result)}

Internal link candidates:
${linkHints}

Script findings:
${scriptHints}

Project showcase:
${showcaseHint}
`.trim();
}

function executeRevision(target, result, reviewInput, model) {
    const llmModel = model || process.env.AIKI_WIKI_LLM_MODEL || 'gpt-5.4';
    const prompt = buildRevisionPrompt(target, result, reviewInput);

    const args = [
        'exec',
        '--sandbox', 'workspace-write',
        '--skip-git-repo-check',
        '--model', llmModel,
        '-',
    ];

    cp.execFileSync('codex', args, {
        cwd: REPO_ROOT,
        stdio: 'pipe',
        encoding: 'utf8',
        shell: true,
        input: prompt,
        maxBuffer: 1024 * 1024 * 20,
    });
}

function quoteYamlString(value) {
    return `'${String(value).replace(/'/g, "''")}'`;
}

function repairMarkdownLinksInFrontmatter(filepath) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const match = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)(\r?\n[\s\S]*)$/);
    if (!match) return;

    const newline = raw.includes('\r\n') ? '\r\n' : '\n';
    const lines = match[2].split(/\r?\n/).map((line) => {
        const listMatch = line.match(/^(\s*-\s+)(.*)$/);
        if (!listMatch) return line;

        const value = listMatch[2].trim();
        if (!value.includes('](/')) return line;
        if (/^['"]/.test(value)) return line;

        return `${listMatch[1]}${quoteYamlString(value)}`;
    });

    const repaired = `${match[1]}${lines.join(newline)}${match[3]}${match[4]}`;
    if (repaired !== raw) {
        fs.writeFileSync(filepath, repaired, 'utf8');
    }

    matter(fs.readFileSync(filepath, 'utf8'));
}

function writeReviewStamp(filepath, panelResult, panel) {
    const raw = fs.readFileSync(filepath, 'utf8');
    const agentVersions = {};

    for (const agent of panel.agents) {
        agentVersions[agent.id] = agent.version;
    }

    const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---)(\r?\n[\s\S]*)$/);
    if (!match) {
        throw new Error(`frontmatter not found: ${filepath}`);
    }

    let frontmatter = match[1];
    const body = match[2];
    const contentType = detectContentType(filepath);
    const guideVersions = getCurrentGuideVersions(contentType);
    const newline = raw.includes('\r\n') ? '\r\n' : '\n';

    if (panelResult.panelVerdict === 'pass') {
        if (/guideVersion:\r?\n/.test(frontmatter)) {
            for (const [key, version] of Object.entries(guideVersions)) {
                const guidePattern = new RegExp(`(\\r?\\n\\s+${key}:\\s*)[^\\r\\n]+`);
                if (guidePattern.test(frontmatter)) {
                    frontmatter = frontmatter.replace(guidePattern, `$1"${version}"`);
                } else {
                    frontmatter = frontmatter.replace(/(guideVersion:\r?\n)/, `$1  ${key}: "${version}"${newline}`);
                }
            }
        } else {
            const guideBlock = [
                'guideVersion:',
                ...Object.entries(guideVersions).map(([key, version]) => `  ${key}: "${version}"`),
            ].join(newline);
            frontmatter = frontmatter.replace(/\r?\n---$/, `${newline}${guideBlock}${newline}---`);
        }

        frontmatter = frontmatter.replace(/\r?\ndraft:\s*true(?=\r?\n)/, '\ndraft: false');
    }

    if (/\r?\nreviewStamp:\r?\n/.test(frontmatter)) {
        frontmatter = frontmatter.replace(/\r?\nreviewStamp:\r?\n[\s\S]*?(?=\r?\n---$)/, '');
    }

    const contentHash = getReviewContentHashFromRaw(frontmatter + body, filepath);
    const stamp = [
        'reviewStamp:',
        `  panelVersion: "${panel.version}"`,
        '  agentVersions:',
        ...Object.entries(agentVersions).map(([id, version]) => `    ${id}: "${version}"`),
        '  guideVersions:',
        ...Object.entries(guideVersions).map(([key, version]) => `    ${key}: "${version}"`),
        `  panelVerdict: ${panelResult.panelVerdict}`,
        `  contentHash: "${contentHash}"`,
        `  reviewedAt: "${TODAY}"`,
    ].join('\n');

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

function refreshTarget(target) {
    const raw = fs.readFileSync(target.filepath, 'utf8');
    const parsed = matter(raw);
    target.frontmatter = parsed.data || {};
    target.body = parsed.content.trim();
}

function writeBatchInput(reviewInputs, artifactBase) {
    fs.mkdirSync(BATCH_DIR, { recursive: true });
    const batchInputPath = path.join(BATCH_DIR, `batch-input-${artifactBase}.json`);
    fs.writeFileSync(batchInputPath, `${JSON.stringify({ pages: reviewInputs }, null, 2)}\n`, 'utf8');
    return batchInputPath;
}

function writePanelOutput(response, artifactBase) {
    fs.mkdirSync(BATCH_DIR, { recursive: true });
    const outputPath = path.join(BATCH_DIR, `panel-output-${artifactBase}.json`);
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

    const initialArtifactBase = getReviewArtifactsBase(1);
    const reviewInputs = targets.map((target) => buildReviewInput(target, options.target));
    const batchInputPath = writeBatchInput(reviewInputs, initialArtifactBase);
    const batchInputRelativePath = path.relative(REPO_ROOT, batchInputPath).replace(/\\/g, '/');
    const prompt = composeReviewPrompt(panel, batchInputRelativePath);

    console.log(`Review panel: ${panel.name} v${panel.version}`);
    console.log(`Targets: ${targets.length}`);
    console.log(`Max rounds: ${options.maxRounds}`);
    console.log(`Draft on final fail: ${options.markDrafts ? 'yes' : 'no'}`);
    console.log(`Auto revise: ${options.autoRevise ? 'yes' : 'no'}`);
    console.log(`Batch input: ${batchInputRelativePath}`);

    if (options.dryRun) {
        console.log('\n=== DRY RUN PROMPT PREVIEW ===\n');
        console.log(`${prompt.slice(0, 2400)}\n...`);
        return;
    }

    for (let round = 1; round <= options.maxRounds; round++) {
        const artifactBase = getReviewArtifactsBase(round);
        const reviewInputs = targets.map((target) => buildReviewInput(target, options.target));
        const batchInputPath = writeBatchInput(reviewInputs, artifactBase);
        const batchInputRelativePath = path.relative(REPO_ROOT, batchInputPath).replace(/\\/g, '/');
        const prompt = composeReviewPrompt(panel, batchInputRelativePath);

        console.log(`\nRound ${round}/${options.maxRounds}`);
        const response = executeReview(prompt, options.model);
        const panelOutputPath = writePanelOutput(response, artifactBase);
        console.log(`Panel output: ${path.relative(REPO_ROOT, panelOutputPath).replace(/\\/g, '/')}`);
        const results = Array.isArray(response.results) ? response.results : [];
        let allPassed = true;
        const failedTargets = [];

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
                const reviewInput = reviewInputs.find((item) => item.term === result.term);
                failedTargets.push({ target, result, reviewInput });
                for (const fix of (result.topMustFix || []).slice(0, 3)) {
                    console.log(`  mustFix: ${fix}`);
                }
            }
        }

        if (allPassed) {
            console.log(`\nAll ${results.length} page(s) passed.`);
            return;
        }

        if (round < options.maxRounds && options.autoRevise) {
            console.log('\nApplying revisions to failing pages...');
            for (const item of failedTargets) {
                executeRevision(item.target, item.result, item.reviewInput, options.model);
                repairMarkdownLinksInFrontmatter(item.target.filepath);
                refreshTarget(item.target);
                console.log(`- ${item.result.term}: revised`);
            }
            continue;
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
    buildRevisionPrompt,
    writeReviewStamp,
};
