import { useState } from 'react';
import type { ReactNode } from 'react';

interface HyperFramesShowcaseProps {
    slug: string;
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
        useCase: '런칭 인트로',
        prompt: '6초짜리 제품 런칭 영상을 만들어줘. 첫 장면은 큰 헤드라인, 중간에는 한 줄 가치 제안, 마지막에는 CTA만 남겨.',
        html: `<div data-composition-id="product-intro" data-width="1280" data-height="720">
  <div id="eyebrow">Product intro</div>
  <div id="title">Launch faster with HTML video.</div>
  <div id="copy">Prompt first. Layout second.</div>
  <div id="cta">Preview -> revise -> render</div>
</div>`,
        sourcePath: '/hyperframes/cases/product-intro.html',
        videoSrc: '/hyperframes/cases/product-intro.mp4',
        posterSrc: '/hyperframes/cases/product-intro-poster.png',
        resultNote: '문구와 CTA만 바꿔서 같은 장면을 여러 제품 버전으로 돌릴 때 잘 맞아.',
        watchFor: [
            '타이틀이 먼저 잡히는가',
            'CTA가 끝 프레임에 남는가',
            '같은 뼈대로 카피만 갈아끼우기 쉬운가',
        ],
    },
    {
        id: 'vertical-short',
        label: '세로 쇼츠',
        format: '9:16 concept',
        useCase: '후킹 쇼츠',
        prompt: '세로 쇼츠 콘셉트를 잡아줘. 첫 2초는 강한 훅, 이어서 짧은 캡션 세 줄, 마지막에는 브랜드 태그만 남겨.',
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
        resultNote: '세로 결과물을 실제로 뽑기 전에, 훅과 캡션 리듬부터 HTML 장면으로 잡아보는 케이스야.',
        watchFor: [
            '첫 2초 훅이 충분히 센가',
            '캡션 길이가 짧게 유지되는가',
            '세로 비율로 옮겨도 브랜딩이 안 무너지는가',
        ],
    },
    {
        id: 'data-brief',
        label: '데이터 요약',
        format: '16:9',
        useCase: '주간 리포트',
        prompt: '주간 데이터 리캡 영상을 만들어줘. 핵심 수치 3개와 마지막 결론 카드만 남기고, 매주 숫자만 갈아끼울 수 있게 구성해.',
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
        resultNote: '반복 리포트 영상은 장면 뼈대가 고정돼 있을수록 이 방식이 더 편해.',
        watchFor: [
            '카드 구조가 매주 재활용 가능한가',
            '숫자만 바꿔도 리듬이 유지되는가',
            '마지막 결론 카드가 한 문장으로 닫히는가',
        ],
    },
] as const;

const FIT_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '반복 편집 팀',
        body: '장면 뼈대는 유지하고 제목, 캡션, 카드, CTA만 계속 바꾸는 팀이면 HyperFrames 강점이 바로 보여.',
        chips: ['런칭 카피', '주간 리포트', '캠페인 버전'],
    },
    {
        title: '에이전트 편집 워크플로',
        body: '에이전트가 HTML을 만들고, 사람이 레이아웃을 다시 잡는 흐름을 팀 안에 이미 받아들일 수 있으면 속도가 난다.',
        chips: ['HTML-first', 'agent + human', 'fast revise'],
    },
    {
        title: '렌더 환경 운영 가능',
        body: 'Node.js 22+, FFmpeg, 폰트, 에셋 경로를 팀이 직접 관리할 수 있으면 장면 운영 체계로 굴릴 수 있어.',
        chips: ['Node 22+', 'FFmpeg', 'asset path'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '픽셀 단위 최종 마감',
        body: '브랜드 필름처럼 프레임 단위 감리와 모션 디테일이 더 중요하면 기존 영상 툴 쪽이 편해.',
        chips: ['After Effects', 'final polish'],
    },
    {
        title: '결과만 빨리 받는 팀',
        body: 'hosted 생성형 영상 API처럼 입력만 던지고 결과 클립을 받는 흐름을 원하면 HyperFrames는 오히려 무거워.',
        chips: ['hosted API', 'fast output'],
    },
    {
        title: '런타임 관리가 어려운 팀',
        body: '렌더가 깨졌을 때 코덱, 폰트, 에셋 경로를 직접 못 잡으면 운영 부담이 바로 앞에 튀어나와.',
        chips: ['codec', 'fonts', 'debugging'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCardData> = [
    {
        title: '1. Init',
        command: 'npx hyperframes init my-video',
        body: '프로젝트 골격을 먼저 만든다. 여기서 composition 파일 구조와 자산 경로 기준이 잡혀.',
    },
    {
        title: '2. Preview',
        command: 'npx hyperframes preview',
        body: '브라우저에서 장면을 확인한다. safe area, 타이틀 위치, 캡션 길이 감각을 여기서 빨리 본다.',
    },
    {
        title: '3. Revise HTML',
        command: 'edit composition HTML',
        body: '에이전트가 만든 HTML을 직접 다듬는다. 레이아웃과 카피를 손보는 핵심 구간이야.',
    },
    {
        title: '4. Render',
        command: 'npx hyperframes render',
        body: '포스팅이나 배포에 올릴 최종 MP4를 뽑는다. preview는 확인용이고 최종 산출물은 여기서 나와.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '필수 환경',
        body: 'README 기준으로 Node.js 22 이상과 FFmpeg가 필요해. 폰트와 에셋도 팀 환경에서 같은 경로로 맞아야 해.',
        chips: ['Node.js 22+', 'FFmpeg', 'font path'],
    },
    {
        title: '자주 깨지는 포인트',
        body: '코덱, 폰트 fallback, 이미지 경로, 비율별 safe area가 조금만 어긋나도 결과가 바로 흔들려.',
        chips: ['codec', 'fallback', 'safe area'],
    },
    {
        title: '운영 관점 핵심',
        body: '예쁜 결과물 하나보다, 같은 장면 뼈대를 여러 캠페인과 리포트에 재활용할 수 있는지가 더 중요해.',
        chips: ['reusable scene', 'campaign ops'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'Hosted video API',
        fit: '입력을 던지고 결과 클립을 빨리 받고 싶을 때',
        tradeoff: '장면 구조를 직접 쥐고 계속 고치는 감각은 약해.',
    },
    {
        title: '기존 영상 툴체인',
        fit: '픽셀 단위 마감과 최종 감리가 중요할 때',
        tradeoff: '반복 수정과 버전 파생 속도는 HyperFrames보다 느릴 수 있어.',
    },
    {
        title: 'HyperFrames',
        fit: '같은 장면 뼈대로 카피와 데이터만 계속 갈아끼울 때',
        tradeoff: '런타임과 렌더 환경을 팀이 직접 관리해야 해.',
    },
] as const;

const OVERVIEW_METRICS = [
    { label: 'Current read', value: 'HTML video framework' },
    { label: 'Latest tag', value: 'v0.4.6' },
    { label: 'Required env', value: 'Node 22 + FFmpeg' },
    { label: 'Best for', value: 'repeatable scene ops' },
] as const;

export default function HyperFramesShowcase({ slug }: HyperFramesShowcaseProps) {
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    return (
        <Shell>
            <div className="hf-main">
                <Panel
                    title="Prompt -> HTML -> Video"
                    description="케이스를 바꾸면 프롬프트, 생성된 HTML, 렌더 결과, 그리고 뭘 봐야 하는지까지 한 번에 같이 볼 수 있어."
                >
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

                    <div className="hf-case-grid">
                        <div className="hf-left-stack">
                            <article className="hf-card">
                                <div className="hf-card-head">
                                    <span className="hf-kicker">Prompt</span>
                                    <span className="hf-pill">{activeCase.format}</span>
                                </div>
                                <p className="hf-prompt-text">{activeCase.prompt}</p>
                            </article>

                            <article className="hf-card hf-code-card">
                                <div className="hf-card-head">
                                    <span className="hf-kicker">Generated HTML</span>
                                    <a href={activeCase.sourcePath} target="_blank" rel="noreferrer" className="hf-link">
                                        source file
                                    </a>
                                </div>
                                <pre>{activeCase.html}</pre>
                            </article>
                        </div>

                        <div className="hf-right-stack">
                            <article className="hf-card hf-video-card">
                                <div className="hf-card-head">
                                    <span className="hf-kicker">Rendered Video</span>
                                    <span className="hf-pill">{slug}</span>
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
                                    <span className="hf-kicker">What To Check</span>
                                </div>
                                <ul className="hf-list">
                                    {activeCase.watchFor.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </article>
                        </div>
                    </div>
                </Panel>

                <Panel
                    title="What It Is"
                    description="HyperFrames를 영상 생성기로 읽으면 계속 어긋나. 장면을 코드로 운영하는 프레임워크로 보는 쪽이 맞아."
                >
                    <div className="hf-overview-grid">
                        <article className="hf-story-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">One-line take</span>
                            </div>
                            <h3>프롬프트 한 줄 자동완성보다, HTML 장면을 계속 고쳐 가는 쪽에 가까워.</h3>
                            <p>
                                README 첫 줄도 <code>Write HTML. Render video. Built for agents.</code>로
                                잡혀 있어. 결국 이 도구의 가치는 결과물 하나보다 장면 뼈대를 운영 가능한 자산으로
                                만드는 데 있어.
                            </p>
                        </article>

                        <div className="hf-metric-grid">
                            {OVERVIEW_METRICS.map((item) => (
                                <article key={item.label} className="hf-metric-card">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </article>
                            ))}
                        </div>
                    </div>
                </Panel>

                <Panel
                    title="Use It / Skip It"
                    description="여기서 도입 여부를 거의 결정해도 돼. 왼쪽이 두 개 이상 맞으면 테스트, 오른쪽이 더 크면 다른 스택으로 가는 편이 낫다."
                >
                    <div className="hf-split-grid">
                        <section className="hf-split-panel fit">
                            <header>
                                <span className="hf-kicker">Use It</span>
                                <h3>이럴 때 HyperFrames가 잘 맞아</h3>
                            </header>
                            <div className="hf-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="hf-split-panel skip">
                            <header>
                                <span className="hf-kicker">Skip It</span>
                                <h3>이럴 때는 다른 툴이 더 편해</h3>
                            </header>
                            <div className="hf-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel
                    title="How To Adopt"
                    description="설치는 짧아. 중요한 건 preview에서 빨리 보고, HTML을 손보고, render까지 자연스럽게 이어지는지야."
                >
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

                <Panel
                    title="Operational Cost"
                    description="HyperFrames는 결과가 아니라 운영을 같이 데려온다. 이 구간이 괜찮아야 팀 안에서 오래 간다."
                >
                    <div className="hf-insight-grid ops">
                        {OPS_CARDS.map((item) => (
                            <Insight key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    title="Compare The Stack"
                    description="무엇과 비교해야 하는지만 정리해도 선택이 훨씬 빨라져."
                >
                    <div className="hf-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="hf-compare-card">
                                <header>
                                    <span className="hf-kicker">{item.title}</span>
                                </header>
                                <p><strong>잘 맞는 경우</strong>{item.fit}</p>
                                <p><strong>대가</strong>{item.tradeoff}</p>
                            </article>
                        ))}
                    </div>
                </Panel>
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

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
    return (
        <section className="hf-panel">
            <div className="hf-panel-head">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
    );
}

function Insight({ item }: { item: InsightCard }) {
    return (
        <article className="hf-insight-card">
            <h4>{item.title}</h4>
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
.hf-main{grid-column:1 / -1;display:grid;gap:18px;min-width:0}
.hf-panel,.hf-card,.hf-step-card,.hf-story-card,.hf-insight-card,.hf-metric-card,.hf-compare-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-panel{border-radius:18px;padding:22px}
.hf-panel-head{margin-bottom:16px}
.hf-panel-head h2{margin:0;font-size:1.16rem}
.hf-panel-head p{margin:6px 0 0;color:var(--color-text-muted);font-size:.95rem;line-height:1.7}
.hf-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.hf-case-tabs button{display:grid;gap:4px;min-width:152px;padding:13px 15px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.hf-case-tabs button strong{font-size:.95rem}
.hf-case-tabs button span{color:var(--color-text-muted);font-size:.8rem}
.hf-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-case-grid,.hf-overview-grid,.hf-split-grid,.hf-adoption-grid,.hf-insight-grid,.hf-compare-grid,.hf-metric-grid{display:grid;gap:14px}
.hf-case-grid{grid-template-columns:minmax(0,.9fr) minmax(360px,1.1fr)}
.hf-left-stack,.hf-right-stack{display:grid;gap:14px}
.hf-right-stack{grid-template-rows:minmax(0,1fr) auto}
.hf-card,.hf-step-card,.hf-story-card,.hf-insight-card,.hf-metric-card,.hf-compare-card{border-radius:16px;padding:18px}
.hf-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.hf-kicker{color:var(--color-projects)!important;font-size:.74rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.hf-link{color:var(--color-projects);font-size:.82rem;font-weight:700;text-decoration:none}
.hf-link:hover{text-decoration:underline}
.hf-prompt-text,.hf-result-note,.hf-step-card p,.hf-story-card p,.hf-insight-card p,.hf-compare-card p{margin:0;color:var(--color-text);line-height:1.7}
.hf-code-card pre,.hf-step-card code{margin:0;overflow:auto;border-radius:12px;background:var(--color-surface-alt);padding:14px;color:var(--color-projects);font-size:.82rem;line-height:1.6}
.hf-video-card{display:grid;gap:12px}
.hf-video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:16px;background:#09101a;object-fit:contain}
.hf-result-note{color:var(--color-text-muted)}
.hf-watch-card{align-self:start}
.hf-list{display:grid;gap:10px;margin:0;padding-left:18px;line-height:1.7}
.hf-overview-grid{grid-template-columns:minmax(0,1.15fr) minmax(320px,.85fr)}
.hf-story-card h3{margin:0 0 10px;font-size:1.5rem;line-height:1.2}
.hf-story-card p{color:var(--color-text-muted)}
.hf-metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-metric-card{display:grid;gap:8px;background:var(--color-surface-alt)}
.hf-metric-card span{color:var(--color-text-muted);font-size:.78rem}
.hf-metric-card strong{font-size:1.02rem;line-height:1.35}
.hf-split-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-split-panel{display:grid;gap:14px;padding:18px;border-radius:18px;background:var(--color-surface-alt)}
.hf-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 26%,transparent)}
.hf-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.hf-split-panel header h3{margin:4px 0 0;font-size:1.08rem}
.hf-insight-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-insight-grid.ops{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-insight-card h4{margin:0 0 8px;font-size:1rem}
.hf-insight-card p{color:var(--color-text-muted)}
.hf-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.hf-chip-row span{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.78rem}
.hf-step-card{display:grid;gap:12px}
.hf-step-card code{padding:12px}
.hf-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.hf-compare-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-compare-card header{margin-bottom:10px}
.hf-compare-card p{display:grid;gap:4px;color:var(--color-text-muted)}
.hf-compare-card p + p{margin-top:12px}
.hf-compare-card strong{color:var(--color-text);font-size:.84rem}
@media (max-width:1180px){.hf-case-grid,.hf-overview-grid,.hf-split-grid,.hf-adoption-grid,.hf-insight-grid,.hf-insight-grid.ops,.hf-compare-grid{grid-template-columns:1fr}}
@media (max-width:720px){.hf-panel{padding:16px}.hf-case-tabs button{min-width:0;width:100%}.hf-metric-grid{grid-template-columns:1fr}}
`;
