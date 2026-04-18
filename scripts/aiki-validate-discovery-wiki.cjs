#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const matter = require('gray-matter');

const { linkRelatedTerms } = require('./aiki-link-related-terms.cjs');
const { syncWikiTerms } = require('./aiki-sync-wiki-terms.cjs');
const {
    buildDiscoveryEntry,
    refreshWikiDiscoveryBacklog,
} = require('./lib/wiki-discovery-backlog.cjs');
const { rewriteWikiEntriesWithLlm } = require('./lib/wiki-llm-writer.cjs');
const { scoreWikiFile } = require('./lib/wiki-quality-scoring.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const WIKI_DIR = path.join(REPO_ROOT, 'src', 'content', 'wiki', 'ko');
const REVIEW_BATCH_DIR = path.join(REPO_ROOT, 'data', 'review-batch');
const SUMMARY_PATH = path.join(REVIEW_BATCH_DIR, 'discovery-validation-summary.json');

const DEFAULT_TERMS = [
    'qwen3.5-27b',
    'cli',
    'agentic-coding',
    'ide',
    'gpt',
    'deepseek',
    'qwen3.5-27b-claude-4.6-opus-reasoning-distilled',
    'ai-studio',
    'apache',
    'e2b',
];

const ENTRY_OVERRIDES = {
    'qwen3.5-27b': {
        title: 'Qwen3.5-27B',
        category: 'model',
        modelType: 'version',
        parentModel: 'qwen-3.5',
        aliases: ['Qwen3.5-27B', 'Qwen 3.5 27B'],
        tags: ['qwen', 'local-llm', 'gguf', 'multimodal'],
        relatedTerms: ['qwen-3.5', 'gguf', 'local-llm', 'weight', 'inference'],
        modelProfile: {
            memoryUsage: '27B급이라 직접 돌릴 때는 메모리 부담이 큰 편이야. 그래서 양자화나 경량화 빌드를 같이 보는 경우가 많아.',
            implementation: 'Qwen 계열의 오픈 웨이트 모델이야. 공식 Hugging Face 카드와 Transformers 문서 기준으로 weights를 받아 직접 서빙하거나 실험하는 쪽이 기본 경로야.',
            activeParameters: '공개 모델 카드 기준으로는 27B급 모델로 읽으면 돼. routed expert 수치를 따로 내세우는 family 설명은 아니야.',
            multimodalSupport: '비전-언어 입력을 받는 오픈 웨이트 모델로 소개돼 있어. 다만 실제 배포판마다 이미지 인코더 포함 범위와 지원 런타임은 조금씩 갈리니 실행 경로를 같이 봐야 해.',
            access: '공식 SaaS/API 상품보다 weights 다운로드와 직접 서빙이 기본 경로야. 공식 문서에서 바로 확인되는 경로는 Hugging Face weights와 Transformers 기반 실행 예시야.',
            pricing: '서비스형 토큰 과금표보다 직접 서빙 비용으로 보는 모델이야. GPU 메모리, 양자화, 처리량 계산으로 보는 편이 맞아.',
            weightsOpen: 'Apache-2.0 기반 오픈 웨이트 공개',
            vendor: 'Alibaba / Qwen',
        },
        sources: [
            { type: 'url', url: 'https://huggingface.co/Qwen/Qwen3.5-27B', title: 'Qwen/Qwen3.5-27B' },
            { type: 'url', url: 'https://huggingface.co/docs/transformers/en/model_doc/qwen3_5', title: 'Qwen3.5 · Hugging Face Transformers' },
        ],
    },
    'cli': {
        title: 'CLI',
        category: 'concept',
        aliases: ['CLI', 'Command Line Interface'],
        tags: ['developer-tools', 'terminal', 'shell'],
        relatedTerms: ['aider', 'claude-code', 'codex', 'copilot', 'cursor'],
        sources: [
            { type: 'url', url: 'https://www.gnu.org/software/bash/manual/html_node/Invoking-Bash.html', title: 'GNU Bash manual — Invoking Bash' },
            { type: 'url', url: 'https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments', title: 'Windows Terminal command line arguments' },
        ],
    },
    'agentic-coding': {
        title: 'Agentic Coding',
        category: 'technique',
        aliases: ['Agentic Coding'],
        tags: ['coding-agent', 'developer-tools', 'workflow'],
        relatedTerms: ['codex', 'claude-code', 'aider', 'copilot', 'cursor'],
        sources: [
            { type: 'url', url: 'https://openai.com/codex/', title: 'Codex | OpenAI' },
            { type: 'url', url: 'https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf?hsLang=en', title: '2026 Agentic Coding Trends Report' },
        ],
    },
    ide: {
        title: 'IDE',
        category: 'concept',
        aliases: ['IDE', 'Integrated Development Environment'],
        tags: ['developer-tools', 'editor', 'coding-agent'],
        relatedTerms: ['cursor', 'codex', 'copilot', 'continue', 'claude-code'],
        sources: [
            { type: 'url', url: 'https://visualstudio.microsoft.com/vs/', title: 'Visual Studio IDE' },
            { type: 'url', url: 'https://www.jetbrains.com/idea/', title: 'IntelliJ IDEA' },
        ],
    },
    gpt: {
        title: 'GPT',
        category: 'concept',
        aliases: ['GPT', 'Generative Pre-trained Transformer'],
        tags: ['llm', 'transformer', 'openai'],
        relatedTerms: ['transformer', 'chatgpt', 'openai', 'gpt-oss', 'codex'],
        sources: [
            { type: 'url', url: 'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf', title: 'Improving Language Understanding by Generative Pre-Training' },
            { type: 'url', url: 'https://openai.com/so-DJ/index/introducing-gpt-5/', title: 'Introducing GPT-5' },
        ],
    },
    deepseek: {
        title: 'DeepSeek',
        category: 'concept',
        aliases: ['DeepSeek'],
        tags: ['open-model', 'reasoning', 'china-ai'],
        relatedTerms: ['deepseek-r1', 'qwen-3.5', 'llama', 'gemma-4', 'localllama'],
        sources: [
            { type: 'url', url: 'https://api-docs.deepseek.com/news/news250120', title: 'DeepSeek-R1 Release' },
            { type: 'url', url: 'https://api-docs.deepseek.com/updates/', title: 'DeepSeek API Docs — Change Log' },
        ],
    },
    'qwen3.5-27b-claude-4.6-opus-reasoning-distilled': {
        title: 'Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled',
        category: 'model',
        modelType: 'checkpoint',
        parentModel: 'qwen3.5-27b',
        aliases: ['Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled', 'Qwopus'],
        tags: ['qwen', 'distillation', 'gguf', 'local-llm'],
        relatedTerms: ['qwen3.5-27b', 'distillation', 'claude-opus-4-6', 'llama.cpp', 'gguf'],
        modelProfile: {
            memoryUsage: '27B 기반 체크포인트라 로컬 실험도 메모리 여유를 먼저 봐야 해. MLX 4bit나 GGUF처럼 양자화 변형이 같이 붙는 이유가 바로 이 부담을 줄이려는 거야.',
            implementation: 'Qwen3.5-27B를 바탕으로 Claude 4.6 Opus 스타일 reasoning을 흉내 내도록 커뮤니티가 만든 distillation 체크포인트야. Anthropic의 공식 서비스 모델은 아니야.',
            activeParameters: '기반 크기는 27B급으로 보면 돼. 별도 활성 파라미터 수치를 공식적으로 내건 체크포인트는 아니야.',
            multimodalSupport: '체크포인트 설명은 주로 텍스트 reasoning·coding 실험에 맞춰져 있어. 멀티모달 여부는 기반 Qwen 기능보다 실제 배포판 설정을 먼저 확인해야 해.',
            access: '공식 API가 아니라 Hugging Face 체크포인트를 받아 직접 돌리는 경로가 기본이야. MLX, GGUF, vLLM 같은 서빙 경로를 따로 골라야 해.',
            pricing: '서비스형 토큰 과금이 아니라 직접 돌리는 체크포인트라 GPU·메모리 비용으로 계산하는 편이 맞아.',
            weightsOpen: '커뮤니티 배포 weights 공개',
            vendor: 'Community checkpoint on Qwen base',
        },
        sources: [
            { type: 'url', url: 'https://huggingface.co/Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled', title: 'Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled' },
            { type: 'url', url: 'https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks', title: 'Detecting and Preventing Distillation Attacks' },
            { type: 'url', url: 'https://huggingface.co/mlx-community/Qwen3.5-27B-Claude-4.6-Opus-Distilled-MLX-4bit', title: 'mlx-community/Qwen3.5-27B-Claude-4.6-Opus-Distilled-MLX-4bit' },
        ],
    },
    'ai-studio': {
        title: 'AI Studio',
        category: 'tool',
        aliases: ['AI Studio', 'Google AI Studio'],
        tags: ['developer-tools', 'gemini', 'prompting'],
        relatedTerms: ['gemini-api', 'function-calling', 'grounding', 'token', 'api'],
        sources: [
            { type: 'url', url: 'https://ai.google.dev/aistudio/', title: 'Google AI Studio' },
            { type: 'url', url: 'https://ai.google.dev/tutorials/ai-studio_quickstart/', title: 'Google AI Studio quickstart' },
            { type: 'url', url: 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/migrate/migrate-google-ai', title: 'Migrate from Google AI Studio to Vertex AI' },
        ],
    },
    apache: {
        title: 'Apache 2.0',
        category: 'concept',
        aliases: ['Apache 2.0', 'Apache License 2.0', 'Apache License, Version 2.0'],
        tags: ['license', 'open-source'],
        relatedTerms: ['open-source', 'weight', 'gpt-oss', 'gemma-4', 'qwen-3.5'],
        sources: [
            { type: 'url', url: 'https://www.apache.org/licenses/LICENSE-2.0', title: 'Apache License, Version 2.0' },
            { type: 'url', url: 'https://www.apache.org/legal/apply-license', title: 'Applying the Apache License, Version 2.0' },
        ],
    },
    e2b: {
        title: 'E2B',
        category: 'concept',
        aliases: ['E2B'],
        tags: ['gemma', 'model-size', 'multimodal'],
        relatedTerms: ['gemma-4', 'inference', 'token', 'on-device', 'quantization'],
        sources: [
            { type: 'url', url: 'https://ai.google.dev/gemma/docs/gemma-3n', title: 'Gemma 3n model overview' },
            { type: 'url', url: 'https://ai.google.dev/gemma/docs/releases', title: 'Gemma releases' },
            { type: 'url', url: 'https://ai.google.dev/gemma/docs/core/model_card_4', title: 'Gemma 4 model card' },
        ],
    },
    deepseek: {
        title: 'DeepSeek',
        category: 'model',
        modelType: 'family',
        aliases: ['DeepSeek'],
        tags: ['open-model', 'reasoning', 'china-ai'],
        relatedTerms: ['deepseek-r1', 'reasoning', 'api', 'benchmark', 'weight'],
        modelProfile: {
            memoryUsage: 'DeepSeek라는 이름 아래에는 API 서비스와 오픈 웨이트 계열이 같이 있어서 숫자 하나로 못 묶어. 대표 공개 계열인 R1/V3는 671B total, 37B activated 같은 대형 MoE 축이고 distill variants는 훨씬 가벼워.',
            implementation: 'DeepSeek라는 이름은 회사/브랜드와 R1, V3 같은 모델 계열을 함께 가리켜. 실무에선 DeepSeek-V3 계열, DeepSeek-R1 reasoning, distill checkpoints를 구분해서 봐야 해.',
            activeParameters: '대표 공개 계열인 R1/V3는 671B total / 37B activated로 소개돼 있어. 다만 이 페이지는 특정 버전 하나보다 라인업을 묶어 설명하는 family 페이지야.',
            multimodalSupport: '주요 공개 계열은 텍스트 reasoning·coding 중심으로 보는 편이 맞아.',
            access: 'Open Platform API와 GitHub 공개 weights 경로가 같이 있어. 어떤 DeepSeek 계열을 말하는지에 따라 접근 경로가 달라져.',
            pricing: 'API 과금과 자체 서빙 비용을 같은 축으로 보면 안 돼. 서비스형 가격과 오픈 웨이트 운영비를 나눠 봐야 해.',
            weightsOpen: '핵심 공개 계열과 distill checkpoints가 함께 존재',
            vendor: 'DeepSeek',
        },
        sources: [
            { type: 'url', url: 'https://github.com/deepseek-ai/DeepSeek-R1', title: 'deepseek-ai/DeepSeek-R1' },
            { type: 'url', url: 'https://github.com/deepseek-ai/DeepSeek-V3', title: 'deepseek-ai/DeepSeek-V3' },
            { type: 'url', url: 'https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html', title: 'DeepSeek Open Platform Terms of Service' },
        ],
    },
};

function parseValueArg(args, name, fallback) {
    const index = args.indexOf(name);
    if (index < 0) return fallback;
    const value = args[index + 1];
    return value && !value.startsWith('--') ? value : fallback;
}

function parseListArg(args, name, fallback) {
    const index = args.indexOf(name);
    if (index < 0) return fallback;
    const value = args[index + 1];
    if (!value || value.startsWith('--')) return fallback;
    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function parseArgs() {
    const args = process.argv.slice(2);
    return {
        terms: parseListArg(args, '--only', DEFAULT_TERMS),
        rounds: Math.max(1, Number(parseValueArg(args, '--rounds', '2')) || 2),
        rewriteModel: parseValueArg(args, '--rewrite-model', 'gpt-5.4'),
        reviewModel: parseValueArg(args, '--review-model', 'gpt-5.4'),
        chunkSize: Math.max(1, Number(parseValueArg(args, '--chunk-size', '5')) || 5),
    };
}

function chunkArray(items, size) {
    const chunks = [];
    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
}

function loadBacklogMap() {
    const { backlog } = refreshWikiDiscoveryBacklog({
        rootDir: REPO_ROOT,
        write: false,
        writeReport: false,
    });

    return new Map((backlog.items || []).map((item) => [item.slug, item]));
}

function setDraftState(term, isDraft) {
    const filePath = path.join(WIKI_DIR, `${term}.md`);
    if (!fs.existsSync(filePath)) {
        return;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    parsed.data = parsed.data || {};
    parsed.data.draft = isDraft;
    fs.writeFileSync(filePath, matter.stringify(parsed.content, parsed.data), 'utf8');
}

function mergeEntry(baseEntry, override) {
    const merged = { ...baseEntry };
    for (const [key, value] of Object.entries(override || {})) {
        merged[key] = Array.isArray(value) ? [...value] : value;
    }
    return merged;
}

function buildEntry(term, backlogMap) {
    const candidate = backlogMap.get(term);
    const baseEntry = candidate
        ? buildDiscoveryEntry(candidate)
        : {
            term,
            title: term,
            category: 'concept',
            aliases: [term],
            tags: [],
            relatedTerms: [],
            mentionStats: {
                mentionCount: 0,
                firstMentioned: null,
            },
            sources: [],
        };

    const override = ENTRY_OVERRIDES[term] || {};
    const merged = mergeEntry(baseEntry, override);
    merged.term = term;
    merged.mentionStats = merged.mentionStats || baseEntry.mentionStats || { mentionCount: 0, firstMentioned: null };
    merged.relatedTerms = Array.isArray(merged.relatedTerms) ? merged.relatedTerms : [];
    merged.tags = Array.isArray(merged.tags) ? merged.tags : [];
    merged.aliases = Array.isArray(merged.aliases) ? merged.aliases : [merged.title || term];
    merged.sources = Array.isArray(merged.sources) ? merged.sources : [];
    return merged;
}

async function rewriteTerms(terms, backlogMap, revisionNotesByTerm, rewriteModel, chunkSize) {
    for (const chunk of chunkArray(terms, chunkSize)) {
        const paramsList = chunk.map((term) => {
            const entry = buildEntry(term, backlogMap);
            return {
                entry,
                filePath: path.join(WIKI_DIR, `${term}.md`),
                mentionStats: entry.mentionStats,
                relatedTerms: entry.relatedTerms,
                revisionNotes: revisionNotesByTerm[term] || [],
                model: rewriteModel,
            };
        });

        await rewriteWikiEntriesWithLlm(paramsList, { model: rewriteModel });
        syncWikiTerms();
        linkRelatedTerms(REPO_ROOT);
    }

    for (const term of terms) {
        setDraftState(term, true);
    }
}

function runSingleReview(term, reviewModel) {
    const args = [
        'scripts/aiki-review-panel.cjs',
        '--target', 'wiki',
        '--only', term,
        '--include-drafts',
        '--max-rounds', '1',
        '--no-draft',
        '--model', reviewModel,
    ];

    cp.execFileSync('node', args, {
        cwd: REPO_ROOT,
        stdio: 'inherit',
        shell: true,
    });

    const output = JSON.parse(fs.readFileSync(path.join(REVIEW_BATCH_DIR, 'panel-output.json'), 'utf8'));
    const result = Array.isArray(output.results)
        ? output.results.find((item) => item.term === term)
        : null;

    if (!result) {
        throw new Error(`Review output is missing "${term}"`);
    }

    return result;
}

function collectQualityNotes(score) {
    if (!score) return [];

    const notes = [];
    if (score.total < 80) {
        notes.push(`Quality score is ${score.total}/100. Raise the page above 80/100.`);
    }

    const dimensions = score.dimensions || {};
    if ((dimensions.specificity?.score || 0) < 20) {
        notes.push('Increase specificity with concrete product behavior, practical use cases, and direct comparisons.');
    }
    if ((dimensions.factCheck?.score || 0) < 20) {
        notes.push('Rewrite fact-check items so they verify specific claims instead of restating the page.');
    }
    if ((dimensions.readerValue?.score || 0) < 20) {
        notes.push('Improve reader value with clearer sections, more practical examples, and stronger caveats.');
    }

    return notes;
}

function buildRevisionNotes(reviewResult, qualityScore) {
    const notes = [];

    for (const item of reviewResult.topMustFix || []) {
        if (item) notes.push(String(item).trim());
    }

    for (const review of reviewResult.reviews || []) {
        for (const item of review.mustFix || []) {
            if (item) notes.push(String(item).trim());
        }
    }

    for (const item of collectQualityNotes(qualityScore)) {
        notes.push(item);
    }

    return [...new Set(notes)].slice(0, 10);
}

function scoreTerms(terms) {
    const scores = {};
    for (const term of terms) {
        scores[term] = scoreWikiFile(path.join(WIKI_DIR, `${term}.md`));
    }
    return scores;
}

function writeSummary(summary) {
    fs.mkdirSync(REVIEW_BATCH_DIR, { recursive: true });
    fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
}

async function main() {
    const options = parseArgs();
    const backlogMap = loadBacklogMap();
    let pending = [...options.terms];
    let revisionNotesByTerm = {};
    const rounds = [];

    console.log(`Validation targets: ${pending.join(', ')}`);
    console.log(`Rewrite model: ${options.rewriteModel}`);
    console.log(`Review model: ${options.reviewModel}`);
    console.log(`Max rounds: ${options.rounds}`);

    for (let round = 1; round <= options.rounds && pending.length > 0; round++) {
        console.log(`\n=== Round ${round} rewrite ===`);
        await rewriteTerms(pending, backlogMap, revisionNotesByTerm, options.rewriteModel, options.chunkSize);

        console.log(`\n=== Round ${round} review ===`);
        const reviewResults = {};
        for (const term of pending) {
            reviewResults[term] = runSingleReview(term, options.reviewModel);
        }

        const scores = scoreTerms(pending);
        const nextPending = [];
        revisionNotesByTerm = {};

        for (const term of pending) {
            const reviewResult = reviewResults[term];
            const score = scores[term];
            const total = score ? score.total : null;
            console.log(`- ${term}: ${reviewResult.panelVerdict.toUpperCase()}${total == null ? '' : ` | score ${total}/100`}`);

            if (reviewResult.panelVerdict !== 'pass') {
                nextPending.push(term);
                revisionNotesByTerm[term] = buildRevisionNotes(reviewResult, score);
            }
        }

        rounds.push({
            round,
            passed: pending.filter((term) => !nextPending.includes(term)),
            failed: nextPending,
            scores: Object.fromEntries(
                Object.entries(scores).map(([term, score]) => [
                    term,
                    score
                        ? {
                            total: score.total,
                            repetition: score.dimensions.repetition.score,
                            specificity: score.dimensions.specificity.score,
                            factCheck: score.dimensions.factCheck.score,
                            readerValue: score.dimensions.readerValue.score,
                        }
                        : null,
                ]),
            ),
        });

        pending = nextPending;
    }

    const summary = {
        generatedAt: new Date().toISOString(),
        rewriteModel: options.rewriteModel,
        reviewModel: options.reviewModel,
        rounds,
        unresolved: pending,
        resolved: options.terms.filter((term) => !pending.includes(term)),
    };

    writeSummary(summary);
    console.log(`\nSummary written to ${path.relative(REPO_ROOT, SUMMARY_PATH).replace(/\\/g, '/')}`);

    if (pending.length > 0) {
        console.log(`Unresolved after ${options.rounds} round(s): ${pending.join(', ')}`);
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
