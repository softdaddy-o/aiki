import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface ShowcaseSourceMeta {
    provider: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface FactCheckCheck {
    type: string;
    result: string;
    sources?: number;
    summary?: string;
    items?: string[];
    findings?: string[];
}

interface FactCheckSource {
    url: string;
    title: string;
}

interface FactCheckData {
    status: string;
    date: string;
    checks: FactCheckCheck[];
    sources: FactCheckSource[];
}

interface HyperFramesShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
    factCheck?: FactCheckData;
}

interface ShowcaseCase {
    id: string;
    label: string;
    format: string;
    useCase: string;
    prompt: string;
    html: string;
    sourcePath: string;
    videoSrc: string;
    posterSrc: string;
    resultNote: string;
    watchFor: string[];
}

interface InsightCard {
    title: string;
    body: string;
    chips?: string[];
    tone?: 'accent' | 'default';
}

interface StepCardData {
    title: string;
    command: string;
    body: string;
}

interface CompareCard {
    title: string;
    fit: string;
    tradeoff: string;
}

const CASES: ReadonlyArray<ShowcaseCase> = [
    {
        id: 'product-intro',
        label: '제품 소개',
        format: '16:9',
        useCase: '런칭 소개 영상',
        prompt: '6초짜리 제품 소개 영상을 만들어줘. 첫 장면은 강한 헤드라인, 중간에는 두 줄 가치 제안, 마지막에는 CTA만 남겨.',
        html: `<div data-composition-id="product-intro" data-width="1280" data-height="720">
  <div id="eyebrow">Product intro</div>
  <div id="title">Launch faster with HTML video.</div>
  <div id="copy">Prompt first. Layout second.</div>
  <div id="cta">Preview -> revise -> render</div>
</div>`,
        sourcePath: '/hyperframes/cases/product-intro.html',
        videoSrc: '/hyperframes/cases/product-intro.mp4',
        posterSrc: '/hyperframes/cases/product-intro-poster.png',
        resultNote: '문구와 CTA만 갈아 끼워도 같은 장면 뼈대를 여러 제품 버전으로 돌리기 편해.',
        watchFor: [
            '타이틀이 첫 1초 안에 잡히는가',
            'CTA가 마지막 프레임에 또렷하게 남는가',
            '같은 레이아웃으로 카피만 바꾸기 쉬운가',
        ],
    },
    {
        id: 'vertical-short',
        label: '세로 쇼츠',
        format: '9:16',
        useCase: '세로 숏폼',
        prompt: '세로 쇼츠 콘셉트를 잡아줘. 첫 2초는 강한 훅, 이어지는 캡션은 짧게, 마지막에는 브랜드 큐 하나만 남겨.',
        html: `<div data-composition-id="vertical-short" data-width="1280" data-height="720">
  <div id="phone"></div>
  <div id="hook">Stop the scroll.</div>
  <div id="caption-a">1. Open with one hard claim.</div>
  <div id="caption-b">2. Keep captions brutally short.</div>
  <div id="brand">Brand cue</div>
</div>`,
        sourcePath: '/hyperframes/cases/vertical-short.html',
        videoSrc: '/hyperframes/cases/vertical-short.mp4',
        posterSrc: '/hyperframes/cases/vertical-short-poster.png',
        resultNote: '세로 결과물의 훅과 자막 리듬을 잡아 볼 때 감각이 빨리 온다.',
        watchFor: [
            '첫 2초 훅이 충분히 센가',
            '캡션 길이가 짧게 유지되는가',
            '세로 비율에서도 브랜딩이 안 무너지는가',
        ],
    },
    {
        id: 'data-brief',
        label: '데이터 요약',
        format: '16:9',
        useCase: '주간 리포트',
        prompt: '주간 데이터 브리프 영상을 만들어줘. 핵심 수치 세 개와 마지막 결론 카드만 남기고, 매주 숫자만 갈아 끼울 수 있게 구성해.',
        html: `<div data-composition-id="data-brief" data-width="1280" data-height="720">
  <div id="title">Three numbers, one conclusion.</div>
  <div id="cards">
    <div class="card">Revenue +24%</div>
    <div class="card">Retention 91%</div>
    <div class="card">Ticket size $128</div>
  </div>
  <div id="summary">Prompt -> cards -> render.</div>
</div>`,
        sourcePath: '/hyperframes/cases/data-brief.html',
        videoSrc: '/hyperframes/cases/data-brief.mp4',
        posterSrc: '/hyperframes/cases/data-brief-poster.png',
        resultNote: '반복 리포트는 장면 뼈대가 먼저 고정될수록 이쪽이 더 편하다.',
        watchFor: [
            '카드 구조가 매주 재활용 가능한가',
            '숫자만 바꿔도 리듬이 유지되는가',
            '마지막 결론 카드가 한 문장으로 닫히는가',
        ],
    },
] as const;

const TAKE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '영상 생성기보다 장면 운영 프레임워크에 가깝다.',
        body: '핵심은 한 번 잘 뽑는 게 아니라, 같은 장면 뼈대를 계속 고쳐 가며 운영하는 데 있다.',
        tone: 'accent',
    },
    {
        title: '가치가 생기는 순간',
        body: '카피, 수치, CTA는 자주 바뀌고 장면 구조는 자주 안 바뀔 때 바로 힘이 붙는다.',
    },
    {
        title: '제일 먼저 볼 포인트',
        body: 'preview에서 safe area, 텍스트 길이, 브랜드 위치가 버티는지부터 보면 판단이 빨라진다.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '반복 편집 팀',
        body: '같은 장면에서 제목, 카드, 캡션, CTA만 계속 바꾸는 팀이면 효율이 바로 보인다.',
        chips: ['런칭 카피', '주간 리포트', '캠페인 버전'],
    },
    {
        title: '에이전트 + 사람 흐름',
        body: '에이전트가 HTML 초안을 만들고 사람이 레이아웃을 손보는 방식이 자연스러운 팀이면 잘 맞는다.',
        chips: ['HTML-first', 'fast revise'],
    },
    {
        title: '렌더 환경 운영 가능',
        body: 'Node 22, FFmpeg, 폰트, 자산 경로를 팀 안에서 직접 관리할 수 있으면 오래 간다.',
        chips: ['Node 22+', 'FFmpeg', 'asset path'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '픽셀 단위 최종 마감',
        body: '브랜드 필름처럼 프레임 단위 감리와 모션 디테일이 더 중요하면 기존 영상 툴 쪽이 편하다.',
        chips: ['After Effects', 'final polish'],
    },
    {
        title: '결과만 빨리 받는 팀',
        body: 'hosted 생성형 영상 API처럼 입력만 던지고 클립을 받는 흐름을 원하면 오히려 무겁게 느껴진다.',
        chips: ['hosted API', 'fast output'],
    },
    {
        title: '디버깅 부담이 큰 팀',
        body: '폰트 fallback, 에셋 경로, 코덱 문제를 직접 못 잡으면 운영 부담이 먼저 튀어나온다.',
        chips: ['codec', 'fonts', 'debugging'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCardData> = [
    {
        title: '1. Init',
        command: 'npx hyperframes init my-video',
        body: '프로젝트 골격을 먼저 만든다. composition 구조와 자산 경로 기준이 여기서 잡힌다.',
    },
    {
        title: '2. Preview',
        command: 'npx hyperframes preview',
        body: '브라우저에서 장면을 먼저 본다. 타이틀 위치와 safe area 감각은 여기서 빨리 확인한다.',
    },
    {
        title: '3. Revise HTML',
        command: 'edit composition HTML',
        body: '에이전트가 만든 HTML을 사람이 고친다. 레이아웃과 카피를 다듬는 핵심 구간이다.',
    },
    {
        title: '4. Render',
        command: 'npx hyperframes render',
        body: '최종 산출물 MP4를 뽑는다. 포스팅과 배포에 올릴 파일은 이 단계에서 나온다.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '필수 환경',
        body: 'README 기준으로 Node.js 22 이상과 FFmpeg가 필요하다. 폰트와 자산 경로도 같은 기준으로 맞아야 한다.',
        chips: ['Node.js 22+', 'FFmpeg', 'font path'],
    },
    {
        title: '자주 깨지는 포인트',
        body: '코덱, 폰트 fallback, 이미지 경로, safe area가 어긋나면 결과물이 바로 흔들린다.',
        chips: ['codec', 'fallback', 'safe area'],
    },
    {
        title: '운영에서 보는 핵심',
        body: '예쁜 결과물 하나보다, 같은 장면 뼈대를 여러 캠페인과 리포트에 재활용할 수 있는지가 더 중요하다.',
        chips: ['reusable scene', 'campaign ops'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'Hosted video API',
        fit: '입력을 던지고 결과 클립을 빨리 받아야 할 때',
        tradeoff: '장면 구조를 직접 쥐고 계속 고치는 감각은 약하다.',
    },
    {
        title: '기존 영상 툴체인',
        fit: '픽셀 단위 마감과 최종 감리가 더 중요할 때',
        tradeoff: '반복 수정과 버전 파생 속도는 HyperFrames보다 느릴 수 있다.',
    },
    {
        title: 'HyperFrames',
        fit: '같은 장면 뼈대에서 카피와 수치만 계속 갈아 끼울 때',
        tradeoff: '런타임과 렌더 환경을 팀이 직접 관리해야 한다.',
    },
] as const;

const FACT_LABELS: Record<string, string> = {
    source_match: '원문 대조',
    web_cross_check: '교차 검증',
    number_verify: '수치 검증',
    adversarial: '비판 검토',
};

const FACT_RESULT_LABELS: Record<string, string> = {
    pass: 'PASS',
    skip: 'SKIP',
    fail: 'FAIL',
};

const FACT_STATUS_LABELS: Record<string, string> = {
    passed: '통과',
    failed: '실패',
    pending: '검토 중',
};

function cleanText(value?: string) {
    return String(value || '').replace(/\s+/g, ' ').trim();
}

function uniqueStrings(values: string[]) {
    const seen = new Set<string>();
    return values.filter((value) => {
        const normalized = cleanText(value);
        if (!normalized || seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
    }).map((value) => cleanText(value));
}

function factFallback(check: FactCheckCheck, sourceCount: number) {
    if (check.type === 'source_match') return '본문 설명이 공식 저장소가 말하는 범위를 벗어나지 않는지 다시 맞춰 봤다.';
    if (check.type === 'web_cross_check') return `공개 출처 ${check.sources ?? sourceCount}건을 다시 대조해 과장이 없는지 확인했다.`;
    if (check.type === 'number_verify') return '버전, 스타 수, 요구 환경처럼 틀리기 쉬운 항목만 따로 떼어 봤다.';
    if (check.type === 'adversarial') return '도입 판단을 흐리게 만드는 과한 표현이 없는지 한 번 더 비판적으로 읽었다.';
    return '핵심 주장과 수치를 다시 검토했다.';
}

function statusLabel(value: string) {
    return FACT_STATUS_LABELS[value] ?? value;
}

function resultLabel(value: string) {
    return FACT_RESULT_LABELS[value] ?? value.toUpperCase();
}

function checkLabel(value: string) {
    return FACT_LABELS[value] ?? value;
}

export default function HyperFramesShowcase(props: HyperFramesShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license, factCheck } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const visibleChecks = useMemo(() => {
        if (!factCheck) return [];

        return factCheck.checks
            .map((check) => {
                const preview = cleanText(check.summary || factFallback(check, factCheck.sources.length));
                const detailItems = uniqueStrings(Array.isArray(check.items) ? check.items : []).filter((item) => item !== preview);
                const findingItems = uniqueStrings(Array.isArray(check.findings) ? check.findings : []).filter(
                    (item) => item !== preview && !detailItems.includes(item),
                );

                return {
                    ...check,
                    preview,
                    detailItems,
                    findingItems,
                    label: checkLabel(check.type),
                    badge: resultLabel(check.result),
                };
            })
            .filter((check) => check.preview || check.detailItems.length > 0 || check.findingItems.length > 0);
    }, [factCheck]);

    return (
        <Shell>
            <div className="hf-main">
                <section className="hf-hero">
                    <div className="hf-hero-head">
                        <span className="hf-showcase-label">Interactive Showcase</span>
                    </div>
                    <div className="hf-hero-grid">
                        <div className="hf-hero-copy">
                            <h1>{title}</h1>
                            <p>{summary}</p>
                        </div>

                        <div className="hf-meta-grid">
                            <article className={`hf-meta-card hf-meta-card--source ${sourceMeta.className}`}>
                                <div className="hf-meta-mark">{sourceMeta.mark}</div>
                                <div className="hf-meta-copy">
                                    <span>{sourceMeta.provider}</span>
                                    <strong>{sourceMeta.path}</strong>
                                </div>
                            </article>
                            <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                            <MetaCard label="라이선스" value={license} />
                            <MetaCard label="읽는 방식" value="Prompt -> HTML -> Video" />
                        </div>
                    </div>
                    {tags.length > 0 && (
                        <div className="hf-tag-row">
                            {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </section>

                <Panel title="실행 쇼케이스">
                    <div className="hf-case-tabs" role="tablist" aria-label="HyperFrames case studies">
                        {CASES.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={item.id === activeCaseId ? 'active' : ''}
                                onClick={() => setActiveCaseId(item.id)}
                            >
                                <strong>{item.label}</strong>
                                <span>{item.useCase}</span>
                            </button>
                        ))}
                    </div>

                    <div className="hf-stage-grid">
                        <article className="hf-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">프롬프트</span>
                                <span className="hf-pill">{activeCase.format}</span>
                            </div>
                            <p className="hf-body-copy">{activeCase.prompt}</p>
                        </article>

                        <article className="hf-card hf-code-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">생성된 HTML</span>
                                <a href={activeCase.sourcePath} target="_blank" rel="noreferrer" className="hf-link">
                                    원본 파일
                                </a>
                            </div>
                            <pre>{activeCase.html}</pre>
                        </article>

                        <article className="hf-card hf-video-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">렌더 영상</span>
                                <span className="hf-pill">{activeCase.label}</span>
                            </div>
                            <video
                                className="hf-video"
                                src={activeCase.videoSrc}
                                poster={activeCase.posterSrc}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                preload="metadata"
                            />
                            <p className="hf-result-note">{activeCase.resultNote}</p>
                        </article>

                        <article className="hf-card hf-watch-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">볼 포인트</span>
                            </div>
                            <ul className="hf-list">
                                {activeCase.watchFor.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </article>
                    </div>
                </Panel>

                <Panel title="한 줄 판단">
                    <div className="hf-take-grid">
                        {TAKE_CARDS.map((item, index) => (
                            <Insight key={item.title} item={item} className={index === 0 ? 'hf-insight-card--lead' : ''} />
                        ))}
                    </div>
                </Panel>

                <Panel title="도입 판단">
                    <div className="hf-split-grid">
                        <section className="hf-split-panel fit">
                            <div className="hf-split-title">USE IT</div>
                            <div className="hf-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="hf-split-panel skip">
                            <div className="hf-split-title">SKIP IT</div>
                            <div className="hf-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel title="도입 흐름">
                    <div className="hf-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="hf-step-card">
                                <span className="hf-kicker">{item.title}</span>
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel title="운영 비용">
                    <div className="hf-insight-grid hf-insight-grid--ops">
                        {OPS_CARDS.map((item) => (
                            <Insight key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel title="비교 대상">
                    <div className="hf-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="hf-compare-card">
                                <span className="hf-kicker">{item.title}</span>
                                <p><strong>잘 맞는 경우</strong><span>{item.fit}</span></p>
                                <p><strong>대가</strong><span>{item.tradeoff}</span></p>
                            </article>
                        ))}
                    </div>
                </Panel>

                {factCheck && (
                    <Panel title="팩트 체크">
                        <div className="hf-fact-meta-grid">
                            <MetaCard label="상태" value={statusLabel(factCheck.status)} />
                            <MetaCard label="마지막 검증" value={`${factCheck.date} KST`} />
                            <MetaCard label="출처 수" value={`${factCheck.sources.length}개`} />
                        </div>

                        <div className="hf-fact-grid">
                            {visibleChecks.map((check) => (
                                <article key={`${check.type}-${check.result}`} className="hf-fact-card">
                                    <div className="hf-card-head">
                                        <span className={`hf-result-badge hf-result-badge--${check.result}`}>{check.badge}</span>
                                        <span className="hf-fact-label">{check.label}</span>
                                    </div>
                                    {check.preview && <p className="hf-body-copy">{check.preview}</p>}
                                    {check.detailItems.length > 0 && (
                                        <ul className="hf-list">
                                            {check.detailItems.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    )}
                                    {check.findingItems.length > 0 && (
                                        <ul className="hf-list hf-list--subtle">
                                            {check.findingItems.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    )}
                                </article>
                            ))}
                        </div>

                        {factCheck.sources.length > 0 && (
                            <article className="hf-card hf-sources-card">
                                <div className="hf-card-head">
                                    <span className="hf-kicker">출처</span>
                                </div>
                                <div className="hf-source-links">
                                    {factCheck.sources.map((source) => (
                                        <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                                            {source.title}
                                        </a>
                                    ))}
                                </div>
                            </article>
                        )}
                    </Panel>
                )}
            </div>
        </Shell>
    );
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <div className="hf-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="hf-panel">
            <div className="hf-panel-head">
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="hf-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function Insight({ item, className = '' }: { item: InsightCard; className?: string }) {
    return (
        <article className={`hf-insight-card ${item.tone === 'accent' ? 'hf-insight-card--accent' : ''} ${className}`.trim()}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.chips && (
                <div className="hf-chip-row">
                    {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
            )}
        </article>
    );
}

const showcaseCss = `
.hf-showcase{display:block;color:var(--color-text)}
.hf-main{display:grid;gap:22px;min-width:0}
.hf-hero,.hf-panel,.hf-card,.hf-meta-card,.hf-step-card,.hf-insight-card,.hf-compare-card,.hf-fact-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-hero,.hf-panel{border-radius:26px;padding:24px}
.hf-hero{background:
linear-gradient(180deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 36%),
color-mix(in srgb,var(--color-surface) 92%,var(--color-surface-alt));box-shadow:0 20px 48px rgba(0,0,0,.08)}
.hf-hero-head{margin-bottom:16px}
.hf-showcase-label{display:inline-flex;align-items:center;min-height:32px;padding:0 12px;border-radius:999px;background:color-mix(in srgb,var(--color-projects) 12%,transparent);color:var(--color-projects);font-size:.76rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.hf-hero-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(360px,.8fr);gap:18px;align-items:start}
.hf-hero-copy h1{margin:0;color:var(--color-projects);font-size:clamp(3.2rem,9vw,7.5rem);font-weight:900;line-height:.92;letter-spacing:.04em;text-transform:uppercase}
.hf-hero-copy p{max-width:760px;margin:16px 0 0;color:var(--color-text);font-size:clamp(1.05rem,1.6vw,1.22rem);line-height:1.7}
.hf-meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.hf-meta-card{display:grid;gap:8px;padding:16px;border-radius:18px;background:color-mix(in srgb,var(--color-surface) 86%,var(--color-surface-alt))}
.hf-meta-card span{color:var(--color-text-muted);font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.hf-meta-card strong{overflow-wrap:anywhere;font-size:1rem;line-height:1.35}
.hf-meta-card--source{grid-column:1 / -1;grid-template-columns:auto 1fr;align-items:center}
.hf-meta-card--source .hf-meta-mark{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;font-size:.8rem;font-weight:900;letter-spacing:.08em}
.hf-meta-card--source .hf-meta-copy{display:grid;gap:6px}
.hf-meta-card--source.github .hf-meta-mark{background:#24292f;color:#fff}
.hf-meta-card--source.huggingface .hf-meta-mark{background:#ffd166;color:#3d2a00}
.hf-meta-card--source.source .hf-meta-mark{background:var(--color-text);color:var(--color-surface)}
.hf-tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.hf-tag-row span,.hf-chip-row span{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.78rem}
.hf-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.hf-panel-head{margin-bottom:14px}
.hf-panel-head h2{margin:0;font-size:1.16rem}
.hf-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.hf-case-tabs button{display:grid;gap:4px;min-width:152px;padding:13px 15px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.hf-case-tabs button strong{font-size:.95rem}
.hf-case-tabs button span{color:var(--color-text-muted);font-size:.8rem}
.hf-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-stage-grid,.hf-take-grid,.hf-split-grid,.hf-insight-grid,.hf-adoption-grid,.hf-compare-grid,.hf-fact-meta-grid,.hf-fact-grid{display:grid;gap:14px}
.hf-stage-grid{grid-template-columns:minmax(0,.9fr) minmax(0,.9fr) minmax(360px,1.1fr)}
.hf-card,.hf-step-card,.hf-insight-card,.hf-compare-card,.hf-fact-card{padding:18px;border-radius:18px}
.hf-video-card{grid-row:span 2;display:grid;align-content:start;gap:12px}
.hf-watch-card{align-self:start}
.hf-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.hf-kicker{color:var(--color-projects)!important;font-size:.74rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.hf-link{color:var(--color-projects);font-size:.82rem;font-weight:700;text-decoration:none}
.hf-link:hover{text-decoration:underline}
.hf-body-copy,.hf-result-note,.hf-step-card p,.hf-insight-card p,.hf-fact-card p{margin:0;line-height:1.7}
.hf-code-card pre,.hf-step-card code{margin:0;overflow:auto;border-radius:14px;background:var(--color-surface-alt);padding:14px;color:var(--color-projects);font-size:.82rem;line-height:1.6}
.hf-video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:18px;background:#09101a;object-fit:contain}
.hf-result-note{color:var(--color-text-muted)}
.hf-list{display:grid;gap:10px;margin:0;padding-left:18px;line-height:1.7}
.hf-list--subtle{color:var(--color-text-muted)}
.hf-take-grid{grid-template-columns:minmax(0,1.15fr) repeat(2,minmax(0,.85fr))}
.hf-insight-card{display:grid;align-content:start}
.hf-insight-card--lead{grid-column:span 1}
.hf-insight-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.hf-insight-card h3{margin:0 0 10px;font-size:1.14rem;line-height:1.3}
.hf-insight-card p{color:var(--color-text-muted)}
.hf-split-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-split-panel{display:grid;gap:14px;padding:18px;border-radius:22px;background:var(--color-surface-alt)}
.hf-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.hf-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.hf-split-title{color:var(--color-projects);font-size:.84rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.hf-insight-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-insight-grid--ops{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-step-card{display:grid;gap:12px}
.hf-step-card code{padding:12px}
.hf-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.hf-compare-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-compare-card{display:grid;gap:14px}
.hf-compare-card p{display:grid;gap:6px;margin:0}
.hf-compare-card strong{color:var(--color-text);font-size:.84rem}
.hf-compare-card span{color:var(--color-text-muted);line-height:1.7}
.hf-fact-meta-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:14px}
.hf-fact-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-fact-card{display:grid;gap:12px}
.hf-fact-label{font-weight:800}
.hf-result-badge{display:inline-flex;align-items:center;justify-content:center;min-width:54px;min-height:26px;padding:0 10px;border-radius:999px;font-size:.72rem;font-weight:900;letter-spacing:.08em}
.hf-result-badge--pass{background:rgba(27,157,92,.14);color:#1b9d5c}
.hf-result-badge--skip{background:rgba(224,167,46,.16);color:#e0a72e}
.hf-result-badge--fail{background:rgba(215,78,78,.14);color:#d74e4e}
.hf-sources-card{margin-top:14px}
.hf-source-links{display:flex;flex-wrap:wrap;gap:10px}
.hf-source-links a{display:inline-flex;align-items:center;min-height:34px;padding:0 12px;border:1px solid var(--color-border);border-radius:999px;background:var(--color-surface-alt);color:var(--color-text);font-size:.84rem;text-decoration:none}
.hf-source-links a:hover{border-color:var(--color-projects);color:var(--color-projects)}
@media (max-width:1240px){.hf-hero-grid,.hf-stage-grid,.hf-take-grid,.hf-split-grid,.hf-adoption-grid,.hf-insight-grid,.hf-insight-grid--ops,.hf-compare-grid,.hf-fact-grid,.hf-fact-meta-grid{grid-template-columns:1fr}.hf-video-card{grid-row:auto}.hf-meta-grid{grid-template-columns:1fr}}
@media (max-width:720px){.hf-hero,.hf-panel{padding:16px}.hf-showcase-label{min-height:28px;padding:0 10px}.hf-hero-copy h1{font-size:clamp(2.6rem,16vw,4.2rem)}.hf-case-tabs button{min-width:0;width:100%}.hf-card,.hf-step-card,.hf-insight-card,.hf-compare-card,.hf-fact-card,.hf-meta-card{padding:14px}}
`;
