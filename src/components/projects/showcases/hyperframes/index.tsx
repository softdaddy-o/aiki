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
        resultNote: '문구와 CTA만 바꿔서 같은 장면을 여러 제품 버전으로 재활용하는 데 맞다.',
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
        resultNote: '세로 결과물을 실제로 뽑기 전에, 훅과 캡션 리듬을 먼저 HTML 장면으로 잡는 케이스다.',
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
        resultNote: '반복 리포트 영상은 장면 뼈대가 고정되어 있을수록 이 방식이 효율을 만든다.',
    },
] as const;

const WORKFLOW = [
    {
        title: '1. Prompt',
        body: '장면 수와 끝 상태를 먼저 고정한다. “예쁜 영상”보다 “무슨 구조가 필요한가”를 말해야 한다.',
    },
    {
        title: '2. HTML',
        body: '에이전트가 장면을 HTML로 만든다. 여기서 제목, 카드, 캡션, 브랜드 위치를 직접 수정한다.',
    },
    {
        title: '3. Render',
        body: '`preview`로 확인하고 `render`로 MP4를 뽑는다. 포스팅이나 배포에 올릴 건 여기서 나온다.',
    },
] as const;

const CHECKLIST = [
    '장면 구조가 자주 바뀌는 팀인가.',
    'Node.js 22+, FFmpeg, 폰트와 에셋 경로를 팀이 직접 관리할 수 있는가.',
    '픽셀 단위 마감보다 반복 수정과 재렌더 속도가 더 중요한가.',
] as const;

export default function HyperFramesShowcase({ slug }: HyperFramesShowcaseProps) {
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    return (
        <Shell>
            <div className="hf-main">
                <Panel
                    title="Prompt -> HTML -> Video"
                    description="같은 툴로도 장면 타입은 꽤 다르게 나온다. 아래 케이스를 바꾸면 프롬프트, 생성된 HTML, 렌더 결과를 바로 같이 볼 수 있다."
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
                    </div>
                </Panel>

                <Panel
                    title="도입 판단은 여기서 끝난다"
                    description="HyperFrames를 볼 이유는 장면을 코드로 계속 고칠 수 있느냐 하나다. 아래 두 묶음만 보면 대체로 결론이 난다."
                >
                    <div className="hf-bottom-grid">
                        <div className="hf-workflow">
                            {WORKFLOW.map((item) => (
                                <article key={item.title} className="hf-step-card">
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </article>
                            ))}
                        </div>

                        <article className="hf-card hf-check-card">
                            <div className="hf-card-head">
                                <span className="hf-kicker">Decision Checklist</span>
                            </div>
                            <ul className="hf-list">
                                {CHECKLIST.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </article>
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

const showcaseCss = `
.hf-showcase{display:contents;color:var(--color-text)}
.hf-main{grid-column:1 / -1;display:grid;gap:18px;min-width:0}
.hf-panel,.hf-card,.hf-step-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-panel{border-radius:14px;padding:20px}
.hf-panel-head{margin-bottom:16px}
.hf-panel-head h2{margin:0;font-size:1.08rem}
.hf-panel-head p{margin:6px 0 0;color:var(--color-text-muted);font-size:.92rem;line-height:1.65}
.hf-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.hf-case-tabs button{display:grid;gap:4px;min-width:132px;padding:12px 14px;border:1px solid var(--color-border);border-radius:12px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.hf-case-tabs button strong{font-size:.94rem}
.hf-case-tabs button span{color:var(--color-text-muted);font-size:.8rem}
.hf-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-case-grid,.hf-bottom-grid{display:grid;gap:14px}
.hf-case-grid{grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr)}
.hf-left-stack,.hf-workflow{display:grid;gap:14px}
.hf-workflow{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-card,.hf-step-card{border-radius:14px;padding:16px}
.hf-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.hf-kicker{color:var(--color-projects)!important;font-size:.74rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.hf-link{color:var(--color-projects);font-size:.82rem;font-weight:700;text-decoration:none}
.hf-link:hover{text-decoration:underline}
.hf-prompt-text,.hf-result-note,.hf-step-card p{margin:0;color:var(--color-text);line-height:1.7}
.hf-code-card pre{margin:0;overflow:auto;border-radius:12px;background:var(--color-surface-alt);padding:14px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.hf-video-card{display:grid;gap:12px}
.hf-video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:14px;background:#09101a;object-fit:contain}
.hf-result-note{color:var(--color-text-muted)}
.hf-bottom-grid{grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr)}
.hf-step-card h3{margin:0 0 10px;font-size:1rem}
.hf-list{display:grid;gap:10px;margin:0;padding-left:18px;line-height:1.7}
@media (max-width:1080px){.hf-case-grid,.hf-bottom-grid,.hf-workflow{grid-template-columns:1fr}}
@media (max-width:640px){.hf-panel{padding:14px}.hf-case-tabs button{min-width:0;width:100%}}
`;
