import { useState } from 'react';
import type { ReactNode } from 'react';

interface HyperFramesShowcaseProps {
    slug: string;
}

interface ExampleScenario {
    id: string;
    label: string;
    prompt: string;
    html: string;
    takeaway: string;
}

const SHOWCASE_VIDEO_SRC = '/hyperframes/showcase-video.mp4';
const SHOWCASE_POSTER_SRC = '/hyperframes/showcase-video-poster.png';
const SHOWCASE_COMPOSITION_SRC = '/hyperframes/showcase-runtime/index.html';

const EXAMPLES: ReadonlyArray<ExampleScenario> = [
    {
        id: 'product-intro',
        label: '제품 소개',
        prompt: '10초짜리 제품 소개 영상을 만들어줘. 첫 장면은 큰 제목, 중간은 핵심 문장, 마지막은 로고와 CTA만 남겨.',
        html: `<div data-composition-id="product-intro" data-width="1920" data-height="1080">
  <h1 id="title" data-start="0.2" data-duration="3.8">Write HTML. Render video.</h1>
  <p id="copy" data-start="0.8" data-duration="3.5">Prompt -> composition -> MP4</p>
  <img id="logo" data-start="4.8" data-duration="1.8" src="logo.png" />
</div>`,
        takeaway: '프롬프트에서 장면 구조를 잡고, 반복 수정으로 문구와 타이밍을 빠르게 바꾸기 쉬운 흐름이야.',
    },
    {
        id: 'social-hook',
        label: '세로 쇼츠',
        prompt: '9:16 쇼츠 영상으로 바꿔줘. 첫 2초에 강한 제목, 이어서 짧은 캡션 3개, 마지막에 브랜드 카드만 보여줘.',
        html: `<div data-composition-id="social-hook" data-width="1080" data-height="1920">
  <h1 id="hook" data-start="0.1" data-duration="2">Big opening hook</h1>
  <div id="captions" data-start="1.8" data-duration="5.2">Three short caption beats</div>
  <div id="brand" data-start="6.2" data-duration="1.8">Brand card</div>
</div>`,
        takeaway: '프레임마다 수동 편집하기보다, HTML 장면을 고쳐서 여러 세로 버전을 빠르게 돌릴 때 맞아.',
    },
    {
        id: 'data-video',
        label: '데이터 요약',
        prompt: 'CSV를 바탕으로 12초짜리 데이터 요약 영상을 만들어줘. 핵심 수치 3개와 마지막 결론 카드만 남겨.',
        html: `<div data-composition-id="data-summary" data-width="1920" data-height="1080">
  <section id="stats" data-start="0.4" data-duration="6.2">Three metric cards</section>
  <section id="summary" data-start="6.8" data-duration="3.2">Final takeaway</section>
</div>`,
        takeaway: '데이터 카드나 타이틀 조합을 반복 렌더해야 하는 팀이면 HyperFrames 방식이 바로 효율 차이를 만든다.',
    },
] as const;

const WORKFLOW = [
    {
        title: '1. init',
        command: 'npx hyperframes init my-video',
        description: '프로젝트 뼈대와 기본 composition 파일을 만든다.',
    },
    {
        title: '2. preview',
        command: 'npx hyperframes preview',
        description: '브라우저에서 장면을 확인한다. 이 단계는 개발용이다.',
    },
    {
        title: '3. render',
        command: 'npx hyperframes render',
        description: '포스팅이나 배포에 올릴 MP4를 뽑는다. 최종 산출물은 여기서 나온다.',
    },
] as const;

const EVALUATION_POINTS = [
    '제목, 로고, 캡션처럼 자주 바뀌는 장면을 HTML로 수정하는 편이 빠른가.',
    'Node.js 22+, FFmpeg, 폰트와 에셋 경로 같은 로컬 렌더 환경을 팀이 감당할 수 있는가.',
    '호스티드 생성형 영상 API보다 반복 수정과 재렌더 속도가 더 중요한가.',
] as const;

export default function HyperFramesShowcase({ slug }: HyperFramesShowcaseProps) {
    const [activeExampleId, setActiveExampleId] = useState<string>(EXAMPLES[0].id);
    const activeExample = EXAMPLES.find((item) => item.id === activeExampleId) ?? EXAMPLES[0];

    return (
        <Shell>
            <div className="hf-main">
                <section className="hf-hero">
                    <div className="hf-hero-copy">
                        <p className="hf-kicker">Interactive Showcase</p>
                        <h2>실제 결과물을 먼저 보고, 이 방식이 팀에 맞는지 바로 판단하는 HyperFrames</h2>
                        <p>
                            이 쇼케이스는 내부 구현 설명을 길게 늘어놓는 대신, 실제로 렌더한 영상과{' '}
                            <code>init -&gt; preview -&gt; render</code> 흐름만 남겼다. 핵심은 전용 편집기를 새로
                            배우는 게 아니라, 에이전트가 HTML 장면을 계속 고치기 쉬운지 판단하는 데 있다.
                        </p>
                        <div className="hf-chip-row">
                            <span>{slug}</span>
                            <span>HTML composition</span>
                            <span>Preview</span>
                            <span>MP4 render</span>
                        </div>
                    </div>
                    <div className="hf-stat-grid">
                        <Stat label="입력" value="Prompt + HTML" />
                        <Stat label="개발 확인" value="Browser preview" />
                        <Stat label="최종 산출물" value="Publishable MP4" />
                        <Stat label="필수 환경" value="Node 22 + FFmpeg" />
                    </div>
                </section>

                <Panel
                    title="실제로 보는 결과물"
                    description="아래 영상은 HyperFrames composition에서 만든 장면을 실제로 렌더한 MP4야. 더 이상 설명용 iframe을 보여주지 않아."
                >
                    <div className="hf-video-layout">
                        <div className="hf-video-card">
                            <span className="hf-label">Rendered Video</span>
                            <video
                                className="hf-video"
                                src={SHOWCASE_VIDEO_SRC}
                                poster={SHOWCASE_POSTER_SRC}
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                                preload="metadata"
                            />
                        </div>
                        <div className="hf-note-card">
                            <span className="hf-label">What This Shows</span>
                            <ul className="hf-list">
                                <li>정적 composition HTML을 소스로 잡고, 결과물은 MP4로 렌더했다.</li>
                                <li><code>preview</code>는 개발 확인용이고, 포스팅에 올릴 자산은 <code>render</code>에서 나온다.</li>
                                <li>원본 composition은 <code>{SHOWCASE_COMPOSITION_SRC}</code>에 두고 관리한다.</li>
                            </ul>
                            <p className="hf-note">
                                사용자 입장에서 중요한 건 내부 패널이 아니라 실제 결과물이 어떤 느낌으로 나오는지다.
                            </p>
                        </div>
                    </div>
                </Panel>

                <Panel
                    title="프롬프트에서 장면으로 이어지는 방식"
                    description="HyperFrames는 복잡한 전용 편집기보다 HTML 장면을 계속 고쳐 가는 흐름에 가깝다."
                >
                    <div className="hf-example-tabs" role="tablist" aria-label="HyperFrames 예시">
                        {EXAMPLES.map((example) => (
                            <button
                                key={example.id}
                                type="button"
                                className={example.id === activeExampleId ? 'active' : ''}
                                onClick={() => setActiveExampleId(example.id)}
                            >
                                {example.label}
                            </button>
                        ))}
                    </div>
                    <div className="hf-example-grid">
                        <article className="hf-note-card">
                            <span className="hf-label">Prompt</span>
                            <p>{activeExample.prompt}</p>
                            <p className="hf-note">{activeExample.takeaway}</p>
                        </article>
                        <article className="hf-code-card">
                            <span className="hf-label">Composition HTML</span>
                            <pre>{activeExample.html}</pre>
                        </article>
                    </div>
                </Panel>

                <Panel
                    title="도입 전에 5분만 보면 되는 것"
                    description="HyperFrames를 쓸지 말지는 이 세 단계와 세 가지 질문으로 거의 결정된다."
                >
                    <div className="hf-workflow-grid">
                        <div className="hf-steps">
                            {WORKFLOW.map((item) => (
                                <article key={item.title} className="hf-step-card">
                                    <h3>{item.title}</h3>
                                    <code>{item.command}</code>
                                    <p>{item.description}</p>
                                </article>
                            ))}
                        </div>
                        <div className="hf-note-card">
                            <span className="hf-label">Decision Checklist</span>
                            <ul className="hf-list">
                                {EVALUATION_POINTS.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
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
            <div className="hf-section-heading">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="hf-stat">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

const showcaseCss = `
.hf-showcase{display:contents;color:var(--color-text)}
.hf-main{grid-column:1 / -1;display:grid;gap:18px;min-width:0}
.hf-hero,.hf-panel,.hf-stat,.hf-note-card,.hf-code-card,.hf-video-card,.hf-step-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-hero,.hf-panel{border-radius:14px;padding:22px}
.hf-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:18px;background:linear-gradient(140deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 46%),var(--color-surface)}
.hf-kicker{margin:0 0 8px;color:var(--color-projects)!important;font-size:.76rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-hero-copy h2{margin:0 0 12px;font-size:clamp(1.7rem,3vw,2.45rem);line-height:1.08}
.hf-hero-copy p{margin:0;max-width:700px;color:var(--color-text-muted);line-height:1.72}
.hf-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.hf-chip-row span{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.78rem}
.hf-stat-grid,.hf-video-layout,.hf-example-grid,.hf-workflow-grid,.hf-steps{display:grid;gap:12px}
.hf-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr));align-content:start}
.hf-stat,.hf-note-card,.hf-code-card,.hf-video-card,.hf-step-card{border-radius:12px;padding:14px}
.hf-stat{background:var(--color-surface-alt)}
.hf-stat span,.hf-label,.hf-section-heading p,.hf-step-card p{color:var(--color-text-muted)}
.hf-stat strong{display:block;margin-top:5px;color:var(--color-projects);font-family:var(--font-heading);font-size:1.34rem}
.hf-section-heading{margin-bottom:16px}
.hf-section-heading h2{margin:0;font-size:1.12rem}
.hf-section-heading p{margin:6px 0 0;font-size:.9rem;line-height:1.6}
.hf-video-layout{grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr)}
.hf-video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:14px;background:#050c16}
.hf-example-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.hf-example-tabs button{padding:10px 12px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);font:inherit;cursor:pointer}
.hf-example-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-example-grid{grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr)}
.hf-code-card pre{margin:8px 0 0;overflow:auto;border-radius:10px;background:var(--color-surface-alt);padding:14px;color:var(--color-projects);font-size:.8rem;line-height:1.55}
.hf-note-card p,.hf-step-card p{margin:8px 0 0;line-height:1.68}
.hf-note{color:var(--color-text-muted)}
.hf-list{display:grid;gap:10px;margin:10px 0 0;padding-left:18px;color:var(--color-text);line-height:1.65}
.hf-workflow-grid{grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr)}
.hf-steps{grid-template-columns:repeat(3,minmax(0,1fr))}
.hf-step-card h3{margin:0 0 10px;font-size:1rem}
.hf-step-card code{display:block;overflow-wrap:anywhere;border-radius:8px;background:var(--color-surface-alt);padding:10px 12px;color:var(--color-projects)}
@media (max-width:960px){.hf-hero,.hf-video-layout,.hf-example-grid,.hf-workflow-grid,.hf-steps{grid-template-columns:1fr}}
@media (max-width:640px){.hf-hero,.hf-panel{padding:14px}.hf-stat-grid{grid-template-columns:1fr}}
`;
