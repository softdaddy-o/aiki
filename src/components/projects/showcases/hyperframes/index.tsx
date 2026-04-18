import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface HyperFramesShowcaseProps {
    slug: string;
}

type SectionId = 'runtime' | 'prompt' | 'timeline' | 'packages' | 'catalog';

interface Layer {
    id: string;
    label: string;
    kind: 'video' | 'title' | 'caption' | 'audio' | 'overlay';
    start: number;
    duration: number;
    description: string;
}

interface Scenario {
    id: string;
    label: string;
    format: string;
    duration: number;
    prompt: string;
    html: string;
    layers: Layer[];
    blocks: string[];
}

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'runtime', label: '실행 결과', description: '실제 HyperFrames composition 임베드' },
    { id: 'prompt', label: '프롬프트', description: '에이전트가 받는 지시' },
    { id: 'timeline', label: '타임라인', description: 'HTML 레이어가 시간축에 놓이는 방식' },
    { id: 'packages', label: '패키지', description: 'CLI에서 렌더까지 흐름' },
    { id: 'catalog', label: '블록', description: '카탈로그와 스킬 활용' },
] as const;

const SECTION_PREFIX = 'hyperframes-section-';
const LIVE_RUNTIME_SRC = '/hyperframes/showcase-runtime/index.html';
const LIVE_RUNTIME_EMBED_SRC = `${LIVE_RUNTIME_SRC}?autoplay=1&loop=1`;

const SCENARIOS: Scenario[] = [
    {
        id: 'product',
        label: '제품 인트로',
        format: '16:9',
        duration: 10,
        prompt: '10초 제품 인트로 영상을 만들어줘. 페이드인 타이틀, 배경 영상, 배경 음악, 마지막 2초 로고 강조를 넣어.',
        html: `<div data-composition-id="product-intro" data-width="1920" data-height="1080">
  <video id="bg" data-start="0" data-duration="10" src="hero.mp4"></video>
  <h1 id="title" data-start="0.4" data-duration="4.8">HyperFrames Product Intro</h1>
  <img id="logo" data-start="8" data-duration="2" src="logo.png" />
  <audio id="music" data-start="0" data-duration="10" src="score.wav"></audio>
</div>`,
        layers: [
            { id: 'bg', label: 'Background video', kind: 'video', start: 0, duration: 10, description: '제품 장면 전체를 덮는 메인 영상' },
            { id: 'title', label: 'Headline title', kind: 'title', start: 0.4, duration: 4.8, description: '오프닝 타이틀 페이드인' },
            { id: 'logo', label: 'Logo punch', kind: 'overlay', start: 8, duration: 2, description: '마지막 2초 로고 강조' },
            { id: 'music', label: 'Music bed', kind: 'audio', start: 0, duration: 10, description: '전 구간 배경 음악' },
        ],
        blocks: ['flash-through-white', 'lower-third', 'logo-lockup'],
    },
    {
        id: 'tiktok',
        label: '쇼트폼 훅',
        format: '9:16',
        duration: 12,
        prompt: '9:16 틱톡 스타일 훅 영상을 만들어줘. 큰 캡션, 바운시 텍스트, 3초마다 컷 전환, TTS 싱크 자막을 넣어.',
        html: `<div data-composition-id="short-hook" data-width="1080" data-height="1920">
  <video id="clip-a" data-start="0" data-duration="3.5" src="clip-a.mp4"></video>
  <video id="clip-b" data-start="3.5" data-duration="4" src="clip-b.mp4"></video>
  <div id="captions" data-start="0.2" data-duration="11.4">Big synced captions</div>
  <audio id="tts" data-start="0" data-duration="12" src="voice.wav"></audio>
</div>`,
        layers: [
            { id: 'clip-a', label: 'Clip A', kind: 'video', start: 0, duration: 3.5, description: '첫 장면과 강한 시각 훅' },
            { id: 'clip-b', label: 'Clip B', kind: 'video', start: 3.5, duration: 4, description: '두 번째 장면 전환' },
            { id: 'captions', label: 'Bouncy captions', kind: 'caption', start: 0.2, duration: 11.4, description: 'TTS와 맞물린 큰 자막' },
            { id: 'tts', label: 'Narration', kind: 'audio', start: 0, duration: 12, description: '음성 내레이션 트랙' },
        ],
        blocks: ['caption-stack', 'subtitle-bounce', 'social-safe-margins'],
    },
    {
        id: 'chart',
        label: '데이터 차트',
        format: '16:9',
        duration: 14,
        prompt: 'CSV를 기반으로 14초짜리 bar chart race 영상을 만들어줘. 배경 그리드, 순위 갱신, 마지막 요약 슬라이드를 넣어.',
        html: `<div data-composition-id="chart-race" data-width="1920" data-height="1080">
  <div id="grid" data-start="0" data-duration="14"></div>
  <div id="bars" data-start="0.6" data-duration="11.8">Animated data bars</div>
  <div id="summary" data-start="12" data-duration="2">Final takeaway</div>
  <audio id="music" data-start="0" data-duration="14" src="pulse.wav"></audio>
</div>`,
        layers: [
            { id: 'grid', label: 'Data grid', kind: 'overlay', start: 0, duration: 14, description: '배경 눈금과 가이드 레이어' },
            { id: 'bars', label: 'Animated bars', kind: 'title', start: 0.6, duration: 11.8, description: '순위가 바뀌는 차트 본체' },
            { id: 'summary', label: 'Summary slide', kind: 'caption', start: 12, duration: 2, description: '마지막 한 줄 요약' },
            { id: 'music', label: 'Pulse audio', kind: 'audio', start: 0, duration: 14, description: '차트 템포를 잡는 배경 음악' },
        ],
        blocks: ['data-chart', 'split-title', 'number-ticker'],
    },
];

const PACKAGE_FLOW = [
    { id: 'cli', title: 'hyperframes', note: 'init, preview, render, lint, transcribe, tts, doctor를 여는 진입점' },
    { id: 'core', title: '@hyperframes/core', note: 'composition 파싱, 런타임 타입, frame adapter 추상화' },
    { id: 'engine', title: '@hyperframes/engine', note: 'Puppeteer + FFmpeg 기반 seekable page capture 엔진' },
    { id: 'producer', title: '@hyperframes/producer', note: 'capture + encode + audio mix를 묶는 전체 렌더 파이프라인' },
    { id: 'studio', title: '@hyperframes/studio', note: '브라우저에서 composition을 편집하는 스튜디오 UI' },
    { id: 'player', title: '@hyperframes/player', note: '완성된 결과를 삽입하는 web component 플레이어' },
] as const;

const SKILL_COMMANDS = [
    'npx skills add heygen-com/hyperframes',
    'npx hyperframes init my-video',
    'npx hyperframes preview',
    'npx hyperframes render',
    'npx hyperframes add data-chart',
] as const;

export default function HyperFramesShowcase({ slug }: HyperFramesShowcaseProps) {
    const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
    const [playhead, setPlayhead] = useState<number>(2);
    const [activePackageId, setActivePackageId] = useState<string>('producer');
    const { activeId, scrollToSection } = useShowcaseSectionNav({
        ids: SECTIONS.map((item) => item.id),
        initialId: 'prompt',
        sectionPrefix: SECTION_PREFIX,
    });

    const activeScenario = SCENARIOS.find((scenario) => scenario.id === activeScenarioId) ?? SCENARIOS[0];
    const activePackage = PACKAGE_FLOW.find((item) => item.id === activePackageId) ?? PACKAGE_FLOW[0];

    const visibleLayers = useMemo(() => {
        return activeScenario.layers.filter((layer) => playhead >= layer.start && playhead <= layer.start + layer.duration);
    }, [activeScenario.layers, playhead]);

    return (
        <Shell>
            <ShowcaseSectionNav items={SECTIONS} activeId={activeId} onSelect={scrollToSection} />

            <div className="hf-main">
                <section className="hf-hero">
                    <div className="hf-hero-copy">
                        <p className="hf-kicker">Agent-first Video Workflow</p>
                        <h2>프롬프트에서 HTML 비디오 컴포지션까지 한 번에 보는 HyperFrames</h2>
                        <p>
                            저장소 설명처럼 HTML을 쓰고 영상을 렌더하는 흐름을 그대로 작은 제작 콘솔처럼 풀어낸 쇼케이스야.
                            Node.js 22+, FFmpeg, preview, render, catalog, skills까지 실제 도입 포인트만 남겼다.
                            첫 패널엔 실제 composition HTML을 바로 넣었고, 아래 패널에선 프롬프트와 타임라인, 패키지 흐름을 옆에서 바로 이어 보게 묶었어.
                        </p>
                        <div className="hf-chip-row">
                            <span>{slug}</span>
                            <span>Node.js ≥ 22</span>
                            <span>FFmpeg</span>
                            <span>HTML-native</span>
                        </div>
                    </div>
                    <div className="hf-hero-card">
                        <Stat label="입력" value="prompt / HTML" />
                        <Stat label="미리보기" value="browser live" />
                        <Stat label="출력" value="MP4" />
                        <Stat label="제작 방식" value="deterministic" />
                    </div>
                </section>

                <section className="hf-section-block" id={`${SECTION_PREFIX}runtime`}>
                    <Panel
                        title="실제 HyperFrames composition 임베드"
                        description="이 패널은 HyperFrames CLI로 만든 composition HTML을 정적 파일로 두고, 페이지 안에 그대로 붙인 실제 실행 화면이야."
                    >
                        <div className="hf-runtime-layout">
                            <article className="hf-runtime-card">
                                <span className="hf-label">Embedded Runtime</span>
                                <div className="hf-runtime-player-shell">
                                    <iframe
                                        src={LIVE_RUNTIME_EMBED_SRC}
                                        title="HyperFrames showcase runtime"
                                        loading="lazy"
                                        allow="autoplay"
                                    />
                                </div>
                            </article>
                            <article className="hf-runtime-card">
                                <span className="hf-label">Runtime Notes</span>
                                <ul className="hf-command-list">
                                    <li><code>npx hyperframes init my-video --example blank</code></li>
                                    <li><code>npx hyperframes lint</code></li>
                                    <li><code>npx hyperframes render</code></li>
                                    <li><code>{LIVE_RUNTIME_SRC}</code></li>
                                </ul>
                                <p>
                                    여기선 개발용 `preview` 서버를 올린 게 아니라, 실제 composition HTML을 정적 파일로 두고 페이지 안에 바로 넣었어.
                                </p>
                            </article>
                        </div>
                    </Panel>
                </section>

                <section className="hf-section-block" id={`${SECTION_PREFIX}prompt`}>
                    <Panel
                        title="에이전트 프롬프트와 HTML 컴포지션"
                        description={
                            <>
                                HyperFrames는 <TermHint term="HTML-native" description="비디오 조합을 React 전용 DSL이 아니라 HTML과 data-* 속성으로 기술하는 접근이야." /> 라서,
                                에이전트가 만든 코드가 곧바로 composition 초안으로 넘어가.
                            </>
                        }
                    >
                        <div className="hf-scenario-tabs" role="tablist" aria-label="시나리오">
                            {SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.id}
                                    type="button"
                                    className={scenario.id === activeScenarioId ? 'active' : ''}
                                    onClick={() => {
                                        setActiveScenarioId(scenario.id);
                                        setPlayhead(Math.min(2, scenario.duration));
                                    }}
                                >
                                    <strong>{scenario.label}</strong>
                                    <span>{scenario.format}</span>
                                </button>
                            ))}
                        </div>
                        <div className="hf-prompt-layout">
                            <article className="hf-prompt-card">
                                <span className="hf-label">Prompt</span>
                                <p>{activeScenario.prompt}</p>
                            </article>
                            <article className="hf-code-card">
                                <span className="hf-label">Generated HTML</span>
                                <pre>{activeScenario.html}</pre>
                            </article>
                        </div>
                    </Panel>
                </section>

                <section className="hf-section-block" id={`${SECTION_PREFIX}timeline`}>
                    <Panel
                        title="타임라인과 프리뷰"
                        description="playhead를 움직이면 지금 프레임에 어떤 레이어가 살아 있는지 바로 잡혀."
                    >
                        <div className="hf-timeline-toolbar">
                            <label htmlFor="hf-playhead">playhead {playhead.toFixed(1)}s</label>
                            <input
                                id="hf-playhead"
                                type="range"
                                min={0}
                                max={activeScenario.duration}
                                step={0.1}
                                value={playhead}
                                onChange={(event) => setPlayhead(Number(event.target.value))}
                            />
                        </div>
                        <div className="hf-timeline-layout">
                            <div className="hf-track-stack">
                                {activeScenario.layers.map((layer) => {
                                    const width = (layer.duration / activeScenario.duration) * 100;
                                    const left = (layer.start / activeScenario.duration) * 100;
                                    const active = visibleLayers.some((visible) => visible.id === layer.id);
                                    return (
                                        <article key={layer.id} className="hf-track-row">
                                            <header>
                                                <strong>{layer.label}</strong>
                                                <span>{layer.kind}</span>
                                            </header>
                                            <div className="hf-track">
                                                <span className={active ? `active ${layer.kind}` : layer.kind} style={{ width: `${width}%`, left: `${left}%` }} />
                                            </div>
                                            <p>{layer.description}</p>
                                        </article>
                                    );
                                })}
                            </div>
                            <div className="hf-preview-card">
                                <div className={`hf-preview-frame ${activeScenario.format === '9:16' ? 'vertical' : 'wide'}`}>
                                    {visibleLayers.map((layer) => (
                                        <div key={layer.id} className={`hf-layer ${layer.kind}`}>
                                            {layer.label}
                                        </div>
                                    ))}
                                </div>
                                <div className="hf-preview-meta">
                                    <strong>현재 보이는 레이어</strong>
                                    <div className="hf-chip-row">
                                        {visibleLayers.map((layer) => <span key={layer.id}>{layer.label}</span>)}
                                        {!visibleLayers.length && <span>no active layers</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="hf-section-block" id={`${SECTION_PREFIX}packages`}>
                    <Panel
                        title="CLI에서 렌더까지 패키지 파이프라인"
                        description={
                            <>
                                저장소는 CLI, core, engine, producer, studio, player를 나눠 둔다. <TermHint term="Frame Adapter pattern" description="GSAP, Lottie, CSS, Three.js 같은 애니메이션 런타임을 끼워 넣기 쉽게 만든 추상화 방식이야." /> 을
                                어디에 끼워 넣는지 한 번에 보기 좋게 정리했어.
                            </>
                        }
                    >
                        <div className="hf-package-layout">
                            <div className="hf-package-list">
                                {PACKAGE_FLOW.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={item.id === activePackageId ? 'active' : ''}
                                        onClick={() => setActivePackageId(item.id)}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                            <article className="hf-package-card">
                                <h3>{activePackage.title}</h3>
                                <p>{activePackage.note}</p>
                                <ol className="hf-flow">
                                    {PACKAGE_FLOW.map((item, index) => (
                                        <li key={item.id} className={item.id === activePackageId ? 'active' : ''}>
                                            <span>{String(index + 1).padStart(2, '0')}</span>
                                            <strong>{item.title}</strong>
                                        </li>
                                    ))}
                                </ol>
                            </article>
                        </div>
                    </Panel>
                </section>

                <section className="hf-section-block" id={`${SECTION_PREFIX}catalog`}>
                    <Panel
                        title="카탈로그 블록과 에이전트 스킬"
                        description="자주 쓰는 블록과 명령만 묶어 둬도 첫 출력이 훨씬 덜 흔들려."
                    >
                        <div className="hf-catalog-layout">
                            <article className="hf-catalog-card">
                                <h3>이번 시나리오에 붙는 블록</h3>
                                <div className="hf-chip-row">
                                    {activeScenario.blocks.map((block) => <span key={block}>{block}</span>)}
                                </div>
                                <p>`hyperframes add`로 블록을 붙여 두면, 그다음 수정은 에이전트가 바로 이어서 만지기 좋다.</p>
                            </article>
                            <article className="hf-catalog-card">
                                <h3>핵심 명령</h3>
                                <ul className="hf-command-list">
                                    {SKILL_COMMANDS.map((command) => <li key={command}><code>{command}</code></li>)}
                                </ul>
                                <p>가장 빠른 경로는 `init`으로 시작해서 `preview`로 보고, 마지막에 `render`로 MP4를 뽑는 흐름이야.</p>
                            </article>
                        </div>
                    </Panel>
                </section>
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

function Panel({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
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
.hf-main{grid-column:2;grid-row:2;display:grid;gap:18px;min-width:0}
.hf-hero,.hf-panel,.hf-stat,.hf-prompt-card,.hf-code-card,.hf-preview-card,.hf-package-card,.hf-catalog-card,.hf-runtime-card{border:1px solid var(--color-border);background:var(--color-surface)}
.hf-hero,.hf-panel{border-radius:12px;padding:20px}
.hf-hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:18px;background:linear-gradient(140deg,color-mix(in srgb,var(--color-projects) 13%,transparent),transparent 46%),var(--color-surface)}
.hf-kicker{margin:0 0 8px;color:var(--color-projects)!important;font-size:.76rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.hf-hero-copy h2{margin:0 0 10px;font-size:clamp(1.7rem,3vw,2.4rem);line-height:1.08}
.hf-hero-copy p{max-width:660px;margin:0;color:var(--color-text-muted);line-height:1.7}
.hf-hero-card,.hf-runtime-layout,.hf-prompt-layout,.hf-timeline-layout,.hf-package-layout,.hf-catalog-layout{display:grid;gap:12px}
.hf-hero-card{grid-template-columns:repeat(2,minmax(0,1fr));align-content:start}
.hf-stat,.hf-runtime-card,.hf-prompt-card,.hf-code-card,.hf-preview-card,.hf-package-card,.hf-catalog-card{border-radius:10px;padding:14px}
.hf-stat{background:var(--color-surface-alt)}
.hf-stat span,.hf-label,.hf-section-heading p,.hf-track-row header span,.hf-track-row p,.hf-preview-meta p{color:var(--color-text-muted)}
.hf-stat strong{display:block;margin-top:5px;color:var(--color-projects);font-family:var(--font-heading);font-size:1.38rem}
.hf-section-block{display:grid;gap:16px;scroll-margin-top:120px}
.hf-section-heading{margin-bottom:16px}
.hf-section-heading h2{margin:0;font-size:1.14rem}
.hf-section-heading p{margin:5px 0 0;font-size:.89rem;line-height:1.6}
.hf-runtime-layout{grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr)}
.hf-runtime-player-shell{margin-top:8px;overflow:hidden;border-radius:14px;background:#050c16}
.hf-runtime-player-shell iframe{display:block;width:100%;aspect-ratio:16/9;border:0;background:#050c16}
.hf-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.hf-chip-row span{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.78rem}
.hf-scenario-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}
.hf-scenario-tabs button,.hf-package-list button{padding:10px 12px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);font:inherit;cursor:pointer;text-align:left}
.hf-scenario-tabs button strong,.hf-package-list button{font-size:.88rem}
.hf-scenario-tabs button span{display:block;margin-top:3px;color:var(--color-text-muted);font-size:.74rem}
.hf-scenario-tabs button.active,.hf-package-list button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-prompt-layout{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}
.hf-prompt-card p,.hf-package-card p,.hf-catalog-card p{margin:8px 0 0;color:var(--color-text-muted);line-height:1.65}
.hf-code-card pre{margin:8px 0 0;overflow:auto;border-radius:8px;background:var(--color-surface-alt);padding:14px;color:var(--color-projects);font-size:.8rem;line-height:1.55}
.hf-timeline-toolbar{display:grid;gap:8px;margin-bottom:14px}
.hf-timeline-toolbar label{font-size:.88rem;font-weight:800}
.hf-timeline-toolbar input{width:100%}
.hf-timeline-layout{grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr)}
.hf-track-stack{display:grid;gap:10px}
.hf-track-row{display:grid;gap:8px;padding:12px;border-radius:10px;background:var(--color-surface-alt)}
.hf-track-row header{display:flex;align-items:center;justify-content:space-between;gap:8px}
.hf-track{position:relative;height:12px;border-radius:999px;background:color-mix(in srgb,var(--color-surface) 90%,#000 10%)}
.hf-track span{position:absolute;top:0;height:100%;border-radius:inherit;opacity:.45}
.hf-track span.active{opacity:1}
.hf-track span.video{background:#5b8cff}
.hf-track span.title{background:#f97316}
.hf-track span.caption{background:#ec4899}
.hf-track span.audio{background:#22c55e}
.hf-track span.overlay{background:#a855f7}
.hf-preview-frame{display:grid;place-items:center;border-radius:14px;background:linear-gradient(180deg,#16203d,#0f1326);padding:16px;aspect-ratio:16/9}
.hf-preview-frame.vertical{aspect-ratio:9/16}
.hf-layer{display:flex;align-items:center;justify-content:center;width:82%;min-height:52px;border-radius:12px;font-size:.84rem;font-weight:800;color:#fff}
.hf-layer+.hf-layer{margin-top:10px}
.hf-layer.video{background:rgba(91,140,255,.55)}
.hf-layer.title{background:rgba(249,115,22,.72)}
.hf-layer.caption{background:rgba(236,72,153,.72)}
.hf-layer.audio{background:rgba(34,197,94,.72)}
.hf-layer.overlay{background:rgba(168,85,247,.72)}
.hf-preview-meta{margin-top:12px}
.hf-package-layout{grid-template-columns:220px minmax(0,1fr)}
.hf-package-list{display:grid;gap:8px}
.hf-package-card h3,.hf-catalog-card h3{margin:0;font-size:1rem}
.hf-flow{display:grid;gap:10px;margin:14px 0 0;padding:0;list-style:none}
.hf-flow li{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface-alt)}
.hf-flow li.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.hf-flow li span{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:999px;background:var(--color-surface);color:var(--color-projects);font-size:.74rem;font-weight:850}
.hf-catalog-layout{grid-template-columns:repeat(2,minmax(0,1fr))}
.hf-command-list{display:grid;gap:8px;margin:14px 0 0;padding:0;list-style:none}
.hf-command-list code{display:block;overflow-wrap:anywhere;border-radius:8px;background:var(--color-surface-alt);padding:10px 12px;color:var(--color-projects)}
@media (max-width:900px){.hf-main{grid-column:1;grid-row:auto}.hf-hero,.hf-runtime-layout,.hf-prompt-layout,.hf-timeline-layout,.hf-package-layout,.hf-catalog-layout{grid-template-columns:1fr}}
@media (max-width:640px){.hf-hero,.hf-panel{padding:14px}.hf-hero-card{grid-template-columns:1fr}.hf-preview-frame{padding:12px}}
`;
