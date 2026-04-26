'use strict';

/**
 * tone-rules.js — 통합 톤/문체 검증 규칙 엔진
 *
 * My Writing Tone + 플랫폼별 가이드를 코드로 강제한다.
 * 플랫폼별로 규칙 프로파일을 선택해서 사용.
 *
 * Usage:
 *   const { checkTone, PLATFORMS } = require('./lib/tone-rules');
 *   const results = checkTone(body, 'blog');  // 또는 'short'
 *
 * Platforms:
 *   - 'blog'  : AIKI 뉴스, Hashnode 등 장문 블로그 (300-800자+)
 *   - 'short'  : Threads, Twitter 등 단문 포스트 (500자 이내)
 */

// ── 공통 유틸 ───────────────────────────────────────────────────────────────

function splitSentences(text) {
    const clean = text
        .replace(/^#{1,6}\s+.+$/gm, '')
        .replace(/^\s*[-*•]\s*/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .trim();
    return clean
        .split(/(?<=[.?!])\s+/)
        .filter(s => s.trim().length > 5);
}

// ── 규칙 정의 ───────────────────────────────────────────────────────────────
// 각 규칙:  id, name, desc, platforms (적용 플랫폼), check(body, sentences, profile)
// check 반환: null(통과) | { severity, msg, examples }

const ALL_RULES = [

    // ═══════════════════════════════════════════════════════════
    // BASE: 모든 플랫폼 공통
    // ═══════════════════════════════════════════════════════════

    {
        id: 'T1',
        name: '보도체 종결어미 과다',
        desc: '~했다/~됐다/~이다 등 보도체가 과다하면 FAIL',
        platforms: ['blog', 'short'],
        check(body, sentences, profile) {
            const endings = /(?:했다|됐다|이다|한다|있다|없다|된다|었다|였다|겠다|린다|온다|간다|준다|든다|난다|진다|운다|바뀐다|갈린다|보인다|남는다|붙는다|잡힌다|필요하다|중요하다|강하다|약하다)\s*[.!]?\s*$/;
            const total = sentences.length;
            if (total === 0) return null;
            const formal = sentences.filter(s => endings.test(s.trim()));
            const ratio = formal.length / total;
            const failThreshold = profile.formalFailRatio || 0.5;
            const warnThreshold = profile.formalWarnRatio || 0.3;
            if (ratio > failThreshold) {
                return {
                    severity: 'FAIL',
                    msg: `보도체 종결어미 ${formal.length}/${total} (${(ratio * 100).toFixed(0)}%). ${(failThreshold * 100).toFixed(0)}% 이하여야 함.`,
                    examples: formal.slice(0, 3).map(s => s.trim().slice(-30))
                };
            }
            if (ratio > warnThreshold) {
                return {
                    severity: 'WARN',
                    msg: `보도체 종결어미 ${formal.length}/${total} (${(ratio * 100).toFixed(0)}%). ${(warnThreshold * 100).toFixed(0)}% 이하 권장.`,
                    examples: formal.slice(0, 2).map(s => s.trim().slice(-30))
                };
            }
            return null;
        }
    },

    {
        id: 'T2',
        name: '구어체 종결어미 부족',
        desc: '~이야/~거야/~해 등 구어체 종결어미가 부족하면 FAIL',
        platforms: ['blog', 'short'],
        check(body, sentences, profile) {
            const colloquial = /(?:이야|거야|해[.!]?\s*$|거든|더라|잖아|인데|는데|어봐|래[.!]?\s*$|네[.!]?\s*$|지[.!]?\s*$)/;
            const total = sentences.length;
            if (total === 0) return null;
            const casual = sentences.filter(s => colloquial.test(s.trim()));
            const ratio = casual.length / total;
            const minRatio = profile.colloquialMinRatio || 0.15;
            if (ratio < minRatio) {
                return {
                    severity: 'FAIL',
                    msg: `구어체 종결어미 ${casual.length}/${total} (${(ratio * 100).toFixed(0)}%). 최소 ${(minRatio * 100).toFixed(0)}% 이상 필요.`,
                    examples: []
                };
            }
            return null;
        }
    },

    {
        id: 'T3',
        name: 'AI 상투어',
        desc: '혁신적, 획기적, 놀라운 등 AI 상투어 감지',
        platforms: ['blog', 'short'],
        check(body) {
            const banned = [
                '혁신적', '획기적', '놀라운', '주목할 만한', '필수적인',
                '핵심이야', '이게 핵심이야', '인상적이',
                '깊이 살펴', '중요성을 강조', '흥미롭게도',
                '다양한 측면', '주목할 만합', '심도 있게',
                '극대화', '체계적인', '에 있어서',
                '더 놀라운 건', '여기서 진짜 중요한',
                '에 기여합', '를 의미합니다'
            ];
            const found = [];
            for (const term of banned) {
                if (body.includes(term)) found.push(term);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `AI 상투어 ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'T4',
        name: 'AI 감탄 서술형',
        desc: '~이 놀라워/흥미로워/인상적이 등 AI식 감탄 표현',
        platforms: ['blog', 'short'],
        check(body) {
            const patterns = [/놀라워|놀랍다/, /흥미로워|흥미롭다/, /인상적이[야다]/, /주목할\s*만하/, /눈길을\s*끄/, /와닿/];
            const found = [];
            for (const p of patterns) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `AI 감탄 서술형 ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'T5',
        name: '전달체 과다',
        desc: '~한대/~했대/~래 종결어미가 3회 연속이면 FAIL',
        platforms: ['blog', 'short'],
        check(body, sentences) {
            let consecutive = 0;
            let maxConsec = 0;
            const relay = /(?:한대|했대|래|라고|다고)\s*[.!]?\s*$/;
            for (const s of sentences) {
                if (relay.test(s.trim())) {
                    consecutive++;
                    maxConsec = Math.max(maxConsec, consecutive);
                } else {
                    consecutive = 0;
                }
            }
            if (maxConsec >= 3) {
                return { severity: 'FAIL', msg: `전달체(~한대/~래) ${maxConsec}회 연속. 3회 연속 금지.`, examples: [] };
            }
            return null;
        }
    },

    {
        id: 'T6',
        name: 'Reddit 숫자 직접 인용',
        desc: 'r/sub에서 N명이 추천 같은 Reddit engagement 수치 직접 인용',
        platforms: ['blog', 'short'],
        check(body) {
            const patterns = [/r\/\w+에서\s*\d+/, /\d+명이\s*추천/, /\d+개?\s*upvote/i, /\d+명이\s*\[?추천\]?한/];
            const found = [];
            for (const p of patterns) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `Reddit 숫자 직접 인용 ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'T7',
        name: '사실 나열 연속',
        desc: '인과/반전/질문 없는 팩트 나열이 과다',
        platforms: ['blog', 'short'],
        check(body, sentences, profile) {
            const factPattern = /^[가-힣A-Za-z0-9\s,\[\]()]+(?:했다|됐다|했어|했대|한대|이다|있다)[.!]?\s*$/;
            let consecutive = 0;
            let maxConsec = 0;
            for (const s of sentences) {
                const trimmed = s.trim();
                if (trimmed.length > 10 && factPattern.test(trimmed)) {
                    consecutive++;
                    maxConsec = Math.max(maxConsec, consecutive);
                } else {
                    consecutive = 0;
                }
            }
            const threshold = profile.factChainWarn || 4;
            if (maxConsec >= threshold) {
                return { severity: 'WARN', msg: `단순 사실 나열 ${maxConsec}문장 연속. 인과/반전/질문을 섞어야 함.`, examples: [] };
            }
            return null;
        }
    },

    {
        id: 'T8',
        name: '구체적 숫자 부족',
        desc: '기사/포스트에 구체적 수치가 부족',
        platforms: ['blog', 'short'],
        check(body, sentences, profile) {
            const numbers = body.match(/\d[\d,.]*\s*(?:%|퍼센트|달러|원|건|개|명|배|점|k|K|GW|GB|TB|년|월|일|시간|분|억)/g);
            const count = numbers ? numbers.length : 0;
            const minNumbers = profile.minNumbers || 2;
            if (count < minNumbers) {
                return { severity: 'WARN', msg: `구체적 수치 ${count}개. 최소 ${minNumbers}개 권장.`, examples: numbers || [] };
            }
            return null;
        }
    },

    {
        id: 'T9',
        name: '교과서적 전환어',
        desc: '또한, 더불어, 결론적으로 등 딱딱한 전환어',
        platforms: ['blog', 'short'],
        check(body) {
            const stiff = ['또한', '더불어', '결론적으로', '이에 따라', '따라서', '그럼에도 불구하고', '이를 통해'];
            const found = [];
            for (const term of stiff) {
                const re = new RegExp(`(?:^|\\n|\\. )${term}`, 'g');
                if (re.test(body)) found.push(term);
            }
            if (found.length >= 2) {
                return { severity: 'WARN', msg: `교과서적 전환어 ${found.length}개: ${found.join(', ')}`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'T10',
        name: '오프닝 문제',
        desc: '첫 문장이 질문형/따옴표 인용형이면 WARN',
        platforms: ['blog', 'short'],
        check(body, sentences) {
            if (sentences.length === 0) return null;
            const first = sentences[0].trim();
            if (/\?$/.test(first) && !/vs|VS/.test(first)) {
                return { severity: 'WARN', msg: '질문형 오프닝. 주어+동사 직접 서술문 권장.', examples: [first.slice(0, 50)] };
            }
            if (/^["'"「]/.test(first)) {
                return { severity: 'WARN', msg: '따옴표 인용 오프닝.', examples: [first.slice(0, 50)] };
            }
            return null;
        }
    },

    // ═══════════════════════════════════════════════════════════
    // SHORT 전용: Threads/Twitter 단문 플랫폼
    // ═══════════════════════════════════════════════════════════

    {
        id: 'S1',
        name: '홍보성 CTA',
        desc: '"무료야", "바로 써봐" 형식의 이용 유도 CTA',
        platforms: ['short'],
        check(body) {
            const cta = [/무료야/, /바로 써봐/, /지금 바로/, /링크는? (프로필|바이오)/, /다운로드/];
            const found = [];
            for (const p of cta) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `홍보성 CTA ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'S2',
        name: '이전 포스트 콜백',
        desc: '"저번에...얘기했잖아" 형식의 콜백 오프닝',
        platforms: ['short'],
        check(body) {
            const callbacks = [/저번에/, /지난번에/, /어제 얘기/, /앞서 말한/, /전에 다뤘/];
            const found = [];
            for (const p of callbacks) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `이전 포스트 콜백 ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    {
        id: 'S3',
        name: '이중 줄바꿈',
        desc: 'Threads 단문에서 \\n\\n 이중 줄바꿈',
        platforms: ['short'],
        check(body) {
            const count = (body.match(/\n\n/g) || []).length;
            if (count > 0) {
                return { severity: 'WARN', msg: `이중 줄바꿈 ${count}개. \\n 단일 줄바꿈으로 압축 권장.`, examples: [] };
            }
            return null;
        }
    },

    {
        id: 'S4',
        name: '소셜 출처 attribution',
        desc: '"r/sub에서 N upvote", "Reddit에서 400개" 같은 출처+반응수',
        platforms: ['short'],
        check(body) {
            const patterns = [
                /Reddit에서\s*\d+/, /트위터에서\s*\d+/, /Threads에서\s*\d+/,
                /HN에서\s*\d+/, /Hacker News에서\s*\d+/
            ];
            const found = [];
            for (const p of patterns) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return { severity: 'FAIL', msg: `소셜 출처 attribution ${found.length}개 발견`, examples: found };
            }
            return null;
        }
    },

    // ═══════════════════════════════════════════════════════════
    // BLOG 전용: AIKI, Hashnode 등 장문
    // ═══════════════════════════════════════════════════════════

    {
        id: 'B1',
        name: '인라인 링크 부족',
        desc: '블로그 기사에 인라인 링크가 없으면 SEO 손해',
        platforms: ['blog'],
        check(body) {
            const links = body.match(/\[([^\]]+)\]\(http[^)]+\)/g);
            const count = links ? links.length : 0;
            if (count === 0) {
                return { severity: 'WARN', msg: '인라인 링크 0개. 블로그는 출처 링크를 적극 활용해야 함.', examples: [] };
            }
            return null;
        }
    },
];

// ── 플랫폼 프로파일 ─────────────────────────────────────────────────────────

const PROFILES = {
    blog: {
        name: 'blog (AIKI, Hashnode)',
        formalFailRatio: 0.5,     // 보도체 50% 이상 → FAIL
        formalWarnRatio: 0.3,     // 30% 이상 → WARN
        colloquialMinRatio: 0.15, // 구어체 15% 이상 필요
        minNumbers: 2,            // 수치 최소 2개
        factChainWarn: 4,         // 사실 나열 4연속 WARN
    },
    short: {
        name: 'short (Threads, Twitter)',
        formalFailRatio: 0.6,     // 단문은 조금 느슨 (전달체 혼합 허용)
        formalWarnRatio: 0.4,
        colloquialMinRatio: 0.10, // 단문은 최소 10%
        minNumbers: 1,            // 단문은 수치 1개
        factChainWarn: 3,         // 단문은 3연속이면 WARN
    },
};

// ── 메인 검증 함수 ──────────────────────────────────────────────────────────

/**
 * 텍스트의 톤을 검증한다.
 * @param {string} body - 검증할 본문 텍스트 (frontmatter 제외)
 * @param {string} platform - 'blog' | 'short'
 * @returns {{ id, name, severity, msg, examples }[]}
 */
function checkTone(body, platform) {
    if (!PROFILES[platform]) {
        throw new Error(`Unknown platform: ${platform}. Use: ${Object.keys(PROFILES).join(', ')}`);
    }
    const profile = PROFILES[platform];
    const sentences = splitSentences(body);
    const results = [];

    for (const rule of ALL_RULES) {
        if (!rule.platforms.includes(platform)) continue;
        const r = rule.check(body, sentences, profile);
        if (r) results.push({ id: rule.id, name: rule.name, ...r });
    }

    return results;
}

/**
 * 검증 결과에서 FAIL이 있는지 확인
 */
function hasFail(results) {
    return results.some(r => r.severity === 'FAIL');
}

/**
 * 검증 결과를 콘솔에 출력
 */
function printResults(label, results) {
    const fails = results.filter(r => r.severity === 'FAIL');
    const warns = results.filter(r => r.severity === 'WARN');
    const icon = fails.length > 0 ? '❌' : warns.length > 0 ? '⚠️' : '✅';
    console.log(`${icon} ${label}`);

    for (const r of results) {
        const badge = r.severity === 'FAIL' ? '  ❌ FAIL' : '  ⚠️  WARN';
        console.log(`${badge} [${r.id}] ${r.name}: ${r.msg}`);
        if (r.examples && r.examples.length > 0) {
            for (const ex of r.examples) {
                console.log(`         → "${ex}"`);
            }
        }
    }

    if (results.length === 0) {
        console.log('  ✅ 모든 톤 규칙 통과');
    }
    console.log('');
}

module.exports = {
    checkTone,
    hasFail,
    printResults,
    splitSentences,
    PROFILES,
    ALL_RULES,
};
