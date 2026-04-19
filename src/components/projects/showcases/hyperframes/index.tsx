import { useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface ShowcaseSourceMeta {
    provider: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface HyperFramesShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
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

type SectionId = 'hero' | 'cases' | 'takeaway' | 'decide' | 'adopt' | 'ops' | 'compare' | 'fact';

const SECTION_PREFIX = 'hf-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'cases', label: '실행 쇼케이스', description: '장면 뼈대 3종' },
    { id: 'takeaway', label: '한 줄 판단', description: '핵심 결론' },
    { id: 'decide', label: '도입 판단', description: 'USE / SKIP' },
    { id: 'adopt', label: '도입 흐름', description: 'init → render' },
    { id: 'ops', label: '운영 비용', description: '환경과 부담' },
    { id: 'compare', label: '비교 대상', description: 'vs 대안 도구' },
    { id: 'fact', label: '팩트 체크', description: '검증 상태' },
] as const;

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

export default function HyperFramesShowcase(props: HyperFramesShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="hf-showcase">
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="hf-main">
                <section className="hf-hero" id={`${SECTION_PREFIX}hero`}>
                    <div className="hf-hero-head">
                        <span className="hf-showcase-label">Interactive Showcase</span>
                    </div>

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
                        <MetaCard label="읽는 방식" value="Prompt → HTML → Video" />
                    </div>

                    {tags.length > 0 && (
                        <div className="hf-tag-row">
                            {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </section>

                <Panel id={`${SECTION_PREFIX}cases`} title="실행 쇼케이스">
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
                        <article className="hf-card hf-prompt-card">
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

                <Panel id={`${SECTION_PREFIX}takeaway`} title="한 줄 판단">
                    <div className="hf-take-grid">
                        {TAKE_CARDS.map((item, index) => (
                            <Insight key={item.title} item={item} className={index === 0 ? 'hf-insight-card--lead' : ''} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="도입 판단">
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

                <Panel id={`${SECTION_PREFIX}adopt`} title="도입 흐름">
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

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 비용">
                    <div className="hf-insight-grid hf-insight-grid--ops">
                        {OPS_CARDS.map((item) => (
                            <Insight key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="비교 대상">
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
            </div>
        </div>
    );
}

function Panel({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return (
        <section className="hf-panel" id={id}>
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
.hf-showcase{display:contents;color:var(--color-text)}
.hf-main{grid-column:2;min-width:0;display:grid;gap:22px}
.hf-hero,.hf-panel,.hf-card,.hf-meta-card,.hf-step-card,.hf-insight-card,.hf-compare-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-hero,.hf-panel{border-radius:22px;padding:22px;scroll-margin-top:100px}
.hf-hero{background:linear-gradient(180deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 40%),color-mix(in srgb,var(--color-surface) 94%,var(--color-surface-alt));box-shadow:0 20px 48px rgba(0,0,0,.08);display:grid;gap:18px}
.hf-hero-head{display:flex}
.hf-showcase-label{display:inline-flex;align-items:center;min-height:30px;padding:0 12px;border-radius:999px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:.74rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.hf-hero-copy{display:grid;gap:10px;min-width:0}
.hf-hero-copy h1{margin:0;color:var(--color-projects);font-size:clamp(2.4rem,6.2vw,5rem);font-weight:900;line-height:.96;letter-spacing:.02em;text-transform:uppercase;overflow-wrap:anywhere;word-break:break-word}
.hf-hero-copy p{max-width:760px;margin:0;color:var(--color-text);font-size:clamp(1rem,1.45vw,1.18rem);line-height:1.7}
.hf-meta-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.hf-meta-card{display:grid;gap:6px;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--color-surface) 86%,var(--color-surface-alt));min-width:0}
.hf-meta-card span{color:var(--color-text-muted);font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.hf-meta-card strong{overflow-wrap:anywhere;font-size:.96rem;line-height:1.35}
.hf-meta-card--source{grid-column:span 2;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:12px}
.hf-meta-card--source .hf-meta-mark{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;font-size:.78rem;font-weight:900;letter-spacing:.08em}
.hf-meta-card--source .hf-meta-copy{display:grid;gap:4px;min-width:0}
.hf-meta-card--source.github .hf-meta-mark{background:#24292f;color:#fff}
.hf-meta-card--source.huggingface .hf-meta-mark{background:#ffd166;color:#3d2a00}
.hf-meta-card--source.source .hf-meta-mark{background:var(--color-text);color:var(--color-surface)}
.hf-tag-row{display:flex;flex-wrap:wrap;gap:8px}
.hf-tag-row span,.hf-chip-row span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.hf-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.hf-panel-head{margin-bottom:14px}
.hf-panel-head h2{margin:0;font-size:1.16rem}
.hf-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.hf-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.hf-case-tabs button strong{font-size:.92rem}
.hf-case-tabs button span{color:var(--color-text-muted);font-size:.78rem}
.hf-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.hf-stage-grid{display:grid;gap:14px;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr)}
.hf-prompt-card{grid-column:1;grid-row:1}
.hf-code-card{grid-column:1;grid-row:2}
.hf-video-card{grid-column:2;grid-row:1 / span 2;display:grid;align-content:start;gap:12px}
.hf-watch-card{grid-column:1 / -1;grid-row:3}
.hf-card,.hf-step-card,.hf-insight-card,.hf-compare-card{padding:16px;border-radius:16px}
.hf-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.hf-kicker{color:var(--color-projects)!important;font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-pill{display:inline-flex;align-items:center;min-height:26px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.74rem}
.hf-link{color:var(--color-projects);font-size:.8rem;font-weight:700;text-decoration:none}
.hf-link:hover{text-decoration:underline}
.hf-body-copy,.hf-result-note,.hf-step-card p,.hf-insight-card p,.hf-compare-card p span{margin:0;line-height:1.7}
.hf-code-card pre,.hf-step-card code{margin:0;overflow:auto;border-radius:12px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.hf-video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:14px;background:#09101a;object-fit:contain}
.hf-result-note{color:var(--color-text-muted)}
.hf-list{display:grid;gap:8px;margin:0;padding-left:18px;line-height:1.65}
.hf-take-grid{display:grid;gap:14px;grid-template-columns:minmax(0,1.15fr) repeat(2,minmax(0,.85fr))}
.hf-insight-card{display:grid;align-content:start}
.hf-insight-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.hf-insight-card h3{margin:0 0 10px;font-size:1.08rem;line-height:1.3}
.hf-insight-card p{color:var(--color-text-muted)}
.hf-split-grid{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-split-panel{display:grid;gap:14px;padding:16px;border-radius:18px;background:var(--color-surface-alt)}
.hf-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.hf-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.hf-split-title{color:var(--color-projects);font-size:.82rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.hf-insight-grid{display:grid;gap:14px;grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-insight-grid--ops{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-step-card{display:grid;gap:10px}
.hf-step-card code{padding:10px}
.hf-adoption-grid{display:grid;gap:14px;grid-template-columns:repeat(4,minmax(0,1fr))}
.hf-compare-grid{display:grid;gap:14px;grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-compare-card{display:grid;gap:12px}
.hf-compare-card p{display:grid;gap:4px;margin:0}
.hf-compare-card strong{color:var(--color-text);font-size:.82rem}
.hf-compare-card span{color:var(--color-text-muted);line-height:1.65}
@media (max-width:1100px){
  .hf-stage-grid{grid-template-columns:1fr}
  .hf-prompt-card,.hf-code-card,.hf-video-card,.hf-watch-card{grid-column:1;grid-row:auto}
  .hf-take-grid,.hf-split-grid,.hf-adoption-grid,.hf-compare-grid,.hf-insight-grid,.hf-insight-grid--ops{grid-template-columns:1fr}
}
@media (max-width:900px){
  .hf-main{grid-column:1}
}
@media (max-width:720px){
  .hf-hero,.hf-panel{padding:14px}
  .hf-meta-grid{grid-template-columns:1fr}
  .hf-meta-card--source{grid-column:1}
  .hf-case-tabs button{min-width:0;width:100%}
}
`;
