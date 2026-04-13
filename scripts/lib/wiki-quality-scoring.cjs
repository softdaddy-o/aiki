const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.resolve(__dirname, '../../src/content/wiki/ko');

const QUALITY_THRESHOLDS = {
    publish: 80,
    warn: 60,
};

// ── Dimension 1: Repetition (0-25) ──────────────────────────────────────────
// Detects repeated phrases that signal template filler.
// Korean text doesn't split cleanly on punctuation, so we use substring
// frequency counting across the full text instead.

function countSubstringOccurrences(haystack, needle) {
    let count = 0;
    let pos = 0;
    while ((pos = haystack.indexOf(needle, pos)) !== -1) {
        count++;
        pos += 1;
    }
    return count;
}

function scoreRepetition(fullText) {
    const text = fullText.replace(/^---[\s\S]*?---\n*/m, '');

    if (text.trim().length < 20) {
        return { score: 0, details: ['본문 없음'], maxRepeat: 0, worstPhrase: '', uniqueRatio: 0 };
    }

    const clauses = text
        .split(/[.!?\n,]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10);

    const candidates = new Map();
    for (const clause of clauses) {
        for (let len = 15; len <= Math.min(clause.length, 50); len += 3) {
            for (let start = 0; start + len <= clause.length; start += 3) {
                const phrase = clause.slice(start, start + len).trim();
                if (phrase.length >= 15 && !candidates.has(phrase)) {
                    candidates.set(phrase, countSubstringOccurrences(fullText, phrase));
                }
            }
        }
    }

    let maxRepeat = 0;
    let worstPhrase = '';
    for (const [phrase, count] of candidates) {
        if (count > maxRepeat) {
            maxRepeat = count;
            worstPhrase = phrase;
        }
    }

    const details = [];
    if (maxRepeat >= 4) {
        details.push(`"${worstPhrase.slice(0, 40)}…" ${maxRepeat}회 반복`);
    }

    const uniqueClauses = new Set(clauses.map((s) => s.slice(0, 40)));
    const uniqueRatio = clauses.length > 0 ? uniqueClauses.size / clauses.length : 1;

    if (uniqueRatio < 0.5) {
        details.push(`고유 문장 비율 ${(uniqueRatio * 100).toFixed(0)}%`);
    }

    let score = 25;
    if (maxRepeat >= 10) score = 0;
    else if (maxRepeat >= 7) score = 5;
    else if (maxRepeat >= 5) score = 10;
    else if (maxRepeat >= 4) score = 15;
    else if (uniqueRatio < 0.6) score = Math.min(score, 15);

    return { score, details, maxRepeat, worstPhrase, uniqueRatio };
}

// ── Dimension 2: Specificity (0-25) ─────────────────────────────────────────
// Does the content contain information specific to THIS term?

function scoreSpecificity(frontmatter, bodyText) {
    const term = frontmatter.term || '';
    const title = frontmatter.title || '';
    const category = frontmatter.category || '';
    const details = [];
    let score = 25;

    const bodyLower = bodyText.toLowerCase();
    const titleLower = title.toLowerCase();

    const hasToolSpecificFeatures = /dashboard|tracking|sweep|artifact|registry|log|pipeline|deploy|서빙|추론|학습|파라미터|API|SDK|CLI/i.test(bodyText);
    const hasConcreteExample = /예를 들어|예시|사례|실제로|구체적으로|예컨대/.test(bodyText);
    const hasComparison = /비교|차이|반면|대신|대비|반해/.test(bodyText);
    const mentionsOwnName = bodyLower.includes(titleLower) || bodyLower.includes(term.replace(/-/g, ' '));

    if (!mentionsOwnName) {
        score -= 10;
        details.push('본문에 자기 이름 미언급');
    }

    if (!hasToolSpecificFeatures && (category === 'tool' || category === 'framework')) {
        score -= 10;
        details.push('도구 고유 기능 설명 없음');
    }

    if (!hasConcreteExample) {
        score -= 5;
        details.push('구체적 예시 없음');
    }

    if (!hasComparison && frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0) {
        score -= 3;
        details.push('관련 용어와의 비교 설명 없음');
    }

    const genericPatterns = [
        /결국.*부터 못 잡으면/,
        /결국.*판단할 때 보는 기준점/,
        /기능 목록보다.*어떻게 달라지는지/,
        /이 페이지는.*를 판단할 때/,
        /실제 제품과 워크플로로 옮긴 쪽/,
    ];
    const genericHits = genericPatterns.filter((p) => p.test(bodyText)).length;
    if (genericHits >= 3) {
        score -= 10;
        details.push(`템플릿 문구 ${genericHits}개 감지`);
    } else if (genericHits >= 1) {
        score -= genericHits * 3;
        details.push(`템플릿 문구 ${genericHits}개`);
    }

    return { score: Math.max(0, score), details };
}

// ── Dimension 3: Fact-Check Integrity (0-25) ────────────────────────────────
// Are fact-check items substantive or just template filler?

function scoreFactCheck(frontmatter, bodyText) {
    const factCheck = frontmatter.factCheck;
    const details = [];

    if (!factCheck || !factCheck.checks) {
        return { score: 0, details: ['fact-check 블록 없음'] };
    }

    let score = 25;
    const checks = factCheck.checks;

    const requiredTypes = ['source_match', 'web_cross_check', 'number_verify', 'adversarial'];
    const presentTypes = new Set(checks.map((c) => c.type));
    const missingTypes = requiredTypes.filter((t) => !presentTypes.has(t));
    if (missingTypes.length > 0) {
        score -= missingTypes.length * 3;
        details.push(`필수 체크 누락: ${missingTypes.join(', ')}`);
    }

    const allItems = checks.flatMap((c) => [...(c.items || []), c.summary || '', ...(c.findings || [])]);
    const allItemsText = allItems.join(' ');

    // Detect a single phrase dominating the fact-check section
    const fcClauses = allItemsText
        .split(/[.!?,\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 15);

    const fcSubstrings = new Map();
    for (const clause of fcClauses) {
        for (let len = 15; len <= Math.min(clause.length, 45); len += 3) {
            for (let start = 0; start + len <= clause.length; start += 5) {
                const sub = clause.slice(start, start + len).trim();
                if (sub.length >= 15 && !fcSubstrings.has(sub)) {
                    fcSubstrings.set(sub, countSubstringOccurrences(allItemsText, sub));
                }
            }
        }
    }

    let fcMaxRepeat = 0;
    for (const count of fcSubstrings.values()) {
        if (count > fcMaxRepeat) fcMaxRepeat = count;
    }

    if (fcMaxRepeat >= 6) {
        score -= 20;
        details.push(`fact-check 내 동일 문구 ${fcMaxRepeat}회 반복 — 검증 무의미`);
    } else if (fcMaxRepeat >= 4) {
        score -= 15;
        details.push(`fact-check 내 동일 문구 ${fcMaxRepeat}회 반복`);
    } else if (fcMaxRepeat >= 3) {
        score -= 10;
        details.push(`fact-check 내 동일 문구 ${fcMaxRepeat}회 반복`);
    }

    // Check if fact-check items are just body text rephrased
    const bodyCore = bodyText.replace(/^##.*$/gm, '').trim();
    let copiedFromBody = 0;
    for (const item of allItems) {
        const trimmed = item.trim();
        if (trimmed.length > 20 && bodyCore.includes(trimmed.slice(0, 25))) {
            copiedFromBody++;
        }
    }

    if (allItems.length > 0 && copiedFromBody > allItems.length * 0.4) {
        score -= 10;
        details.push('fact-check 항목이 본문 반복');
    }

    const hasConcreteVerification = /확인|검증|대조|비교|출처|문서|공식/.test(allItemsText);
    if (!hasConcreteVerification) {
        score -= 5;
        details.push('구체적 검증 표현 없음');
    }

    if ((factCheck.sources || []).length === 0) {
        score -= 5;
        details.push('출처 없음');
    }

    return { score: Math.max(0, score), details };
}

// ── Dimension 4: Reader Value (0-25) ────────────────────────────────────────
// Would a reader learn something useful? Can they distinguish this term?

function scoreReaderValue(frontmatter, bodyText) {
    const details = [];
    let score = 25;

    const readerValue = frontmatter.readerValue || '';
    if (!readerValue || readerValue.length < 10) {
        score -= 10;
        details.push('readerValue 없거나 너무 짧음');
    }

    const sections = bodyText.split(/^##\s+/m).filter(Boolean);
    if (sections.length < 3) {
        score -= 5;
        details.push(`섹션 ${sections.length}개 (최소 3개 필요)`);
    }

    const wordCount = bodyText.replace(/[#\-\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
    if (wordCount < 50) {
        score -= 10;
        details.push(`본문 단어 수 ${wordCount}개 (최소 50개)`);
    } else if (wordCount < 100) {
        score -= 5;
        details.push(`본문 단어 수 ${wordCount}개 (권장 100개+)`);
    }

    const summary = frontmatter.summary || '';
    const bodyStart = bodyText.slice(0, 200);
    if (summary.length > 20 && bodyStart.includes(summary.slice(0, 30))) {
        score -= 5;
        details.push('summary와 본문 첫 문장이 중복');
    }

    const hasActionableInfo = /사용|설치|연동|적용|도입|시작|설정|구축/.test(bodyText);
    if (!hasActionableInfo) {
        score -= 3;
        details.push('실행 가능한 정보 부재');
    }

    return { score: Math.max(0, score), details };
}

// ── Composite Scoring ───────────────────────────────────────────────────────

function scoreWikiPage(frontmatter, bodyText, rawText) {
    const repetition = scoreRepetition(rawText || bodyText);
    const specificity = scoreSpecificity(frontmatter, bodyText);
    const factCheck = scoreFactCheck(frontmatter, bodyText);
    const readerValue = scoreReaderValue(frontmatter, bodyText);

    const total = repetition.score + specificity.score + factCheck.score + readerValue.score;

    return {
        total,
        pass: total >= QUALITY_THRESHOLDS.publish,
        dimensions: {
            repetition,
            specificity,
            factCheck,
            readerValue,
        },
        term: frontmatter.term,
        title: frontmatter.title,
        category: frontmatter.category,
    };
}

function parseWikiFile(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fmMatch) {
        return null;
    }

    try {
        const yaml = require('js-yaml');
        const frontmatter = yaml.load(fmMatch[1]);
        const body = fmMatch[2].trim();
        return { frontmatter, body, raw };
    } catch {
        return null;
    }
}

function scoreWikiFile(filePath) {
    const parsed = parseWikiFile(filePath);
    if (!parsed) {
        return null;
    }

    return scoreWikiPage(parsed.frontmatter, parsed.body, parsed.raw);
}

function formatScoreReport(result) {
    const { total, dimensions, term, title } = result;
    const status = total >= QUALITY_THRESHOLDS.publish ? 'PASS' : total >= QUALITY_THRESHOLDS.warn ? 'WARN' : 'FAIL';
    const lines = [
        `[${status}] ${term} (${title}) — ${total}/100`,
        `  반복: ${dimensions.repetition.score}/25  특이성: ${dimensions.specificity.score}/25  팩트체크: ${dimensions.factCheck.score}/25  독자가치: ${dimensions.readerValue.score}/25`,
    ];

    const allDetails = [
        ...dimensions.repetition.details,
        ...dimensions.specificity.details,
        ...dimensions.factCheck.details,
        ...dimensions.readerValue.details,
    ];

    if (allDetails.length > 0) {
        lines.push(`  문제: ${allDetails.join(' | ')}`);
    }

    return lines.join('\n');
}

module.exports = {
    QUALITY_THRESHOLDS,
    scoreRepetition,
    scoreSpecificity,
    scoreFactCheck,
    scoreReaderValue,
    scoreWikiPage,
    scoreWikiFile,
    parseWikiFile,
    formatScoreReport,
};
