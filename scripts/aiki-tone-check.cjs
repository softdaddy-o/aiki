'use strict';

/**
 * aiki-tone-check.cjs — AIKI 기사 톤/문체 프로그래밍 검증
 *
 * My Writing Tone + AIKI Blog Writing Guide 규칙을 코드로 강제한다.
 * 팩트체크처럼 발행 전 반드시 통과해야 함.
 *
 * Usage:
 *   node aiki-tone-check.cjs                        # 오늘 기사 검증
 *   node aiki-tone-check.cjs --date 2026-04-06      # 특정 날짜 검증
 *   node aiki-tone-check.cjs --file <path>          # 단일 파일 검증
 *   node aiki-tone-check.cjs --fix                  # 자동 수정 제안 출력
 *
 * Exit codes:
 *   0 = PASS (모든 기사 통과)
 *   1 = FAIL (하나 이상 실패)
 *   2 = 기사 없음
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.resolve(__dirname, '../src/content/news/ko');

// ── 인수 파싱 ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let dateArg = null;
let fileArg = null;
const fixMode = args.includes('--fix');

const dateIdx = args.indexOf('--date');
if (dateIdx >= 0 && args[dateIdx + 1]) dateArg = args[dateIdx + 1];

const fileIdx = args.indexOf('--file');
if (fileIdx >= 0 && args[fileIdx + 1]) fileArg = args[fileIdx + 1];

function kstToday() {
    const n = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}

const targetDate = dateArg || kstToday();

// ── 검증 규칙 정의 ─────────────────────────────────────────────────────────

const RULES = [
    // ── T1. 보도체/평서문 종결어미 과다 (핵심 규칙) ──
    {
        id: 'T1',
        name: '보도체 종결어미 과다',
        desc: '~했다/~됐다/~이다/~한다/~있다 등 보도체 종결어미가 전체 문장의 50% 이상이면 FAIL',
        check(body, sentences) {
            const endings = /(?:했다|됐다|이다|한다|있다|었다|였다|겠다|린다|온다|간다|준다|든다|난다|진다|운다)\s*[.!]?\s*$/;
            const total = sentences.length;
            if (total < 3) return null; // 너무 짧으면 스킵
            const formal = sentences.filter(s => endings.test(s.trim()));
            const ratio = formal.length / total;
            if (ratio > 0.5) {
                return {
                    severity: 'FAIL',
                    msg: `보도체 종결어미 ${formal.length}/${total} (${(ratio * 100).toFixed(0)}%). 50% 이하여야 함.`,
                    examples: formal.slice(0, 3).map(s => s.trim().slice(-30))
                };
            }
            if (ratio > 0.3) {
                return {
                    severity: 'WARN',
                    msg: `보도체 종결어미 ${formal.length}/${total} (${(ratio * 100).toFixed(0)}%). 30% 이하 권장.`,
                    examples: formal.slice(0, 2).map(s => s.trim().slice(-30))
                };
            }
            return null;
        }
    },

    // ── T2. 구어체 종결어미 비율 ──
    {
        id: 'T2',
        name: '구어체 종결어미 부족',
        desc: '~이야/~거야/~해/~거든/~더라/~잖아/~인데 등 구어체 종결어미가 20% 미만이면 FAIL',
        check(body, sentences) {
            const colloquial = /(?:이야|거야|해[.!]?\s*$|거든|더라|잖아|인데|는데|어봐|래[.!]?\s*$|네[.!]?\s*$|지[.!]?\s*$)/;
            const total = sentences.length;
            if (total < 3) return null;
            const casual = sentences.filter(s => colloquial.test(s.trim()));
            const ratio = casual.length / total;
            if (ratio < 0.15) {
                return {
                    severity: 'FAIL',
                    msg: `구어체 종결어미 ${casual.length}/${total} (${(ratio * 100).toFixed(0)}%). 최소 15% 이상 필요.`,
                    examples: []
                };
            }
            return null;
        }
    },

    // ── T3. AI 상투어 감지 ──
    {
        id: 'T3',
        name: 'AI 상투어',
        desc: '혁신적, 획기적, 놀라운, 주목할 만한, 필수적인, 핵심이야, 인상적 등 AI 상투어 감지',
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
                return {
                    severity: 'FAIL',
                    msg: `AI 상투어 ${found.length}개 발견`,
                    examples: found
                };
            }
            return null;
        }
    },

    // ── T4. AI 감탄 서술형 ──
    {
        id: 'T4',
        name: 'AI 감탄 서술형',
        desc: '~이 놀라워/흥미로워/인상적이 등 AI식 감탄 표현',
        check(body) {
            const patterns = [
                /놀라워|놀랍다/,
                /흥미로워|흥미롭다/,
                /인상적이[야다]/,
                /주목할\s*만하/,
                /눈길을\s*끄/,
                /와닿/
            ];
            const found = [];
            for (const p of patterns) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return {
                    severity: 'FAIL',
                    msg: `AI 감탄 서술형 ${found.length}개 발견`,
                    examples: found
                };
            }
            return null;
        }
    },

    // ── T5. 전달체 과다 ──
    {
        id: 'T5',
        name: '전달체 과다',
        desc: '~한대/~했대/~래 종결어미가 3회 연속이면 FAIL',
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
                return {
                    severity: 'FAIL',
                    msg: `전달체(~한대/~래) ${maxConsec}회 연속. 3회 연속 금지.`,
                    examples: []
                };
            }
            return null;
        }
    },

    // ── T6. Reddit 숫자 직접 인용 ──
    {
        id: 'T6',
        name: 'Reddit 숫자 직접 인용',
        desc: 'r/sub에서 N명이 추천 같은 Reddit engagement 수치 직접 인용',
        check(body) {
            const patterns = [
                /r\/\w+에서\s*\d+/,
                /\d+명이\s*추천/,
                /\d+개?\s*upvote/i,
                /\d+명이\s*\[?추천\]?한/
            ];
            const found = [];
            for (const p of patterns) {
                const m = body.match(p);
                if (m) found.push(m[0]);
            }
            if (found.length > 0) {
                return {
                    severity: 'FAIL',
                    msg: `Reddit 숫자 직접 인용 ${found.length}개 발견`,
                    examples: found
                };
            }
            return null;
        }
    },

    // ── T7. 사실 나열 3연속 ──
    {
        id: 'T7',
        name: '사실 나열 3연속',
        desc: '~했어. ~했대. ~했다고. 같은 단순 사실 나열이 3회 연속',
        check(body, sentences) {
            // 3문장 연속으로 주어+동사 팩트만 나열 (질문/의견/전환 없이)
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
            if (maxConsec >= 4) {
                return {
                    severity: 'WARN',
                    msg: `단순 사실 나열 ${maxConsec}문장 연속. 인과/반전/질문을 섞어야 함.`,
                    examples: []
                };
            }
            return null;
        }
    },

    // ── T8. 구체적 숫자 최소 2개 ──
    {
        id: 'T8',
        name: '구체적 숫자 부족',
        desc: '기사에 퍼센트, 금액, 건수, 기간 등 구체적 수치가 2개 미만',
        check(body) {
            const numbers = body.match(/\d[\d,.]*\s*(?:%|퍼센트|달러|원|건|개|명|배|GW|GB|TB|년|월|일|시간|분|억)/g);
            const count = numbers ? numbers.length : 0;
            if (count < 2) {
                return {
                    severity: 'WARN',
                    msg: `구체적 수치 ${count}개. 최소 2개 권장.`,
                    examples: numbers || []
                };
            }
            return null;
        }
    },

    // ── T9. 교과서적 전환어 ──
    {
        id: 'T9',
        name: '교과서적 전환어',
        desc: '또한, 더불어, 결론적으로, 이에 따라 등 딱딱한 전환어',
        check(body) {
            const stiff = ['또한', '더불어', '결론적으로', '이에 따라', '따라서', '그럼에도 불구하고', '이를 통해'];
            const found = [];
            for (const term of stiff) {
                // 문장 시작에서 나오는 경우만
                const re = new RegExp(`(?:^|\\n|\\. )${term}`, 'g');
                if (re.test(body)) found.push(term);
            }
            if (found.length >= 2) {
                return {
                    severity: 'WARN',
                    msg: `교과서적 전환어 ${found.length}개: ${found.join(', ')}`,
                    examples: found
                };
            }
            return null;
        }
    },

    // ── T10. 오프닝 검증 ──
    {
        id: 'T10',
        name: '오프닝 문제',
        desc: '첫 문장이 질문형/따옴표 인용형/결론 단정형이면 WARN',
        check(body, sentences) {
            if (sentences.length === 0) return null;
            const first = sentences[0].trim();
            if (/\?$/.test(first) && !/vs|VS/.test(first)) {
                return {
                    severity: 'WARN',
                    msg: '질문형 오프닝. 주어+동사 직접 서술문 권장.',
                    examples: [first.slice(0, 50)]
                };
            }
            if (/^["'"「]/.test(first)) {
                return {
                    severity: 'WARN',
                    msg: '따옴표 인용 오프닝.',
                    examples: [first.slice(0, 50)]
                };
            }
            return null;
        }
    }
];

// ── 본문 추출 (frontmatter 제거) ────────────────────────────────────────────

function extractBody(content) {
    const fmEnd = content.indexOf('---', content.indexOf('---') + 3);
    if (fmEnd < 0) return content;
    return content.slice(fmEnd + 3).trim();
}

function splitSentences(text) {
    // 마크다운 제목, 리스트 마커 제거
    const clean = text
        .replace(/^#{1,6}\s+.+$/gm, '')  // 제목 제거
        .replace(/^\s*[-*]\s*/gm, '')     // 리스트 마커 제거
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 링크 텍스트만
        .replace(/\*\*([^*]+)\*\*/g, '$1')  // 볼드 제거
        .trim();

    // 문장 단위 분리 (마침표, 물음표, 느낌표)
    return clean
        .split(/(?<=[.?!])\s+/)
        .filter(s => s.trim().length > 5);
}

// ── 파일 수집 ───────────────────────────────────────────────────────────────

function getFiles() {
    if (fileArg) {
        const p = path.resolve(fileArg);
        if (!fs.existsSync(p)) {
            console.error(`❌ 파일 없음: ${p}`);
            process.exit(2);
        }
        return [p];
    }
    if (!fs.existsSync(CONTENT_DIR)) {
        console.error(`❌ 콘텐츠 디렉토리 없음: ${CONTENT_DIR}`);
        process.exit(2);
    }
    return fs.readdirSync(CONTENT_DIR)
        .filter(f => f.startsWith(targetDate) && f.endsWith('.md'))
        .sort()
        .map(f => path.join(CONTENT_DIR, f));
}

// ── 메인 ────────────────────────────────────────────────────────────────────

const files = getFiles();
if (files.length === 0) {
    console.error(`❌ ${targetDate} 날짜의 기사 없음`);
    process.exit(2);
}

console.log(`\n🔍 AIKI 톤 검증 — ${targetDate} (${files.length}건)\n`);

let totalFails = 0;
let totalWarns = 0;

for (const filepath of files) {
    const filename = path.basename(filepath);
    const content = fs.readFileSync(filepath, 'utf-8');
    const body = extractBody(content);
    const sentences = splitSentences(body);

    const results = [];
    for (const rule of RULES) {
        const r = rule.check(body, sentences);
        if (r) results.push({ ...r, id: rule.id, name: rule.name });
    }

    const fails = results.filter(r => r.severity === 'FAIL');
    const warns = results.filter(r => r.severity === 'WARN');
    totalFails += fails.length;
    totalWarns += warns.length;

    const icon = fails.length > 0 ? '❌' : warns.length > 0 ? '⚠️' : '✅';
    console.log(`${icon} ${filename}`);

    for (const r of results) {
        const badge = r.severity === 'FAIL' ? '  ❌ FAIL' : '  ⚠️  WARN';
        console.log(`${badge} [${r.id}] ${r.name}: ${r.msg}`);
        if (r.examples.length > 0) {
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

// ── 요약 ────────────────────────────────────────────────────────────────────

console.log('─'.repeat(60));
if (totalFails > 0) {
    console.log(`\n❌ FAIL — ${totalFails}건 실패, ${totalWarns}건 경고`);
    console.log('톤 가이드에 맞게 수정 후 재검증하세요.\n');
    process.exit(1);
} else if (totalWarns > 0) {
    console.log(`\n⚠️  WARN — 경고 ${totalWarns}건 (통과는 했지만 개선 권장)\n`);
    process.exit(0);
} else {
    console.log('\n✅ PASS — 모든 기사가 톤 가이드를 준수합니다.\n');
    process.exit(0);
}
