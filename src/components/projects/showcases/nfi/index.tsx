import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface NfiShowcaseProps {
    slug: string;
}

type SignalGroup = 'entry' | 'exit' | 'protection';

interface Recommendation {
    label: string;
    value: string;
    status: 'required' | 'recommended';
    note: string;
}

interface StrategyFamily {
    name: string;
    role: string;
    timeframe: string;
    focus: string;
    risk: string;
    signals: number;
}

interface Signal {
    id: string;
    label: string;
    weight: number;
    indicators: string[];
    note: string;
}

interface NfiData {
    generatedAt?: string;
    mode?: string;
    source?: string;
    repo?: {
        name?: string;
        description?: string;
        githubUrl?: string;
        docsUrl?: string;
        stars?: number;
        forks?: number;
        watchers?: number;
        commits?: number;
        license?: string;
        primaryLanguage?: string;
        latestRelease?: string;
        latestReleaseDate?: string;
    };
    recommendations?: Recommendation[];
    strategyFamilies?: StrategyFamily[];
    signals?: Record<SignalGroup, Signal[]>;
    releaseTimeline?: Array<{ version: string; date: string; theme: string; details: string }>;
    backtestChecklist?: Array<{ step: string; command: string; reason: string }>;
    configGuards?: Array<{ name: string; expected: string; impact: string }>;
    riskMatrix?: Array<{ risk: string; severity: 'medium' | 'high'; mitigation: string }>;
}

const SIGNAL_GROUPS: Array<[SignalGroup, string]> = [
    ['entry', 'Entry'],
    ['exit', 'Exit'],
    ['protection', 'Protection'],
];

export default function NfiShowcase({ slug }: NfiShowcaseProps) {
    const [data, setData] = useState<NfiData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeSignalGroup, setActiveSignalGroup] = useState<SignalGroup>('entry');

    useEffect(() => {
        const controller = new AbortController();
        fetch(`/data/projects/${slug}.json?t=${Date.now()}`, { cache: 'no-store', signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json() as Promise<NfiData>;
            })
            .then((payload) => {
                setData(payload);
                setError(null);
            })
            .catch((reason: Error) => {
                if (reason.name !== 'AbortError') setError(reason.message);
            });

        return () => controller.abort();
    }, [slug]);

    const repoStats = useMemo(() => {
        const repo = data?.repo || {};
        return [
            ['Stars', repo.stars],
            ['Forks', repo.forks],
            ['Commits', repo.commits],
            ['Watchers', repo.watchers],
        ];
    }, [data]);

    if (error) return <ShowcaseShell><div className="nfi-empty">데이터를 불러오지 못했습니다. {error}</div></ShowcaseShell>;
    if (!data) return <ShowcaseShell><div className="nfi-empty">데이터 로딩 중...</div></ShowcaseShell>;

    const activeSignals = data.signals?.[activeSignalGroup] || [];

    return (
        <ShowcaseShell>
            <section className="nfi-hero" aria-label="NostalgiaForInfinity repository summary">
                <div className="nfi-hero-copy">
                    <p className="nfi-kicker">Freqtrade strategy suite</p>
                    <h2>{data.repo?.name || 'NostalgiaForInfinity'}</h2>
                    <p>{data.repo?.description || 'Trading strategy for the Freqtrade crypto bot.'}</p>
                    <div className="nfi-link-row">
                        {data.repo?.githubUrl && <a href={data.repo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
                        {data.repo?.docsUrl && <a href={data.repo.docsUrl} target="_blank" rel="noreferrer">Docs</a>}
                    </div>
                </div>
                <div className="nfi-repo-card">
                    <div className="nfi-release">
                        <span>Latest release</span>
                        <strong>{data.repo?.latestRelease || 'N/A'}</strong>
                        <em>{formatDate(data.repo?.latestReleaseDate)}</em>
                    </div>
                    <div className="nfi-stat-grid">
                        {repoStats.map(([label, value]) => (
                            <div className="nfi-stat" key={label}>
                                <span>{label}</span>
                                <strong>{formatCompact(value)}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="nfi-meta">
                        <span>{data.repo?.primaryLanguage || 'Python'}</span>
                        <span>{data.repo?.license || 'GPL-3.0'}</span>
                        <span>{data.mode || 'curated'}</span>
                    </div>
                </div>
            </section>

            <Panel title="운용 전제" description="README가 직접 강조하는 설정 조건이야.">
                <div className="nfi-rec-grid">
                    {(data.recommendations || []).map((item) => (
                        <article className="nfi-rec" key={item.label}>
                            <span className={`nfi-status ${item.status}`}>{item.status}</span>
                            <h3>{item.label}</h3>
                            <strong>{item.value}</strong>
                            <p>{item.note}</p>
                        </article>
                    ))}
                </div>
            </Panel>

            <Panel title="전략 계보" description="저장소 루트의 X 계열 전략을 운용 관점으로 나눈 지도야.">
                <div className="nfi-family-grid">
                    {(data.strategyFamilies || []).map((family) => (
                        <article className="nfi-family" key={family.name}>
                            <div className="nfi-family-head">
                                <h3>{family.name.replace('NostalgiaForInfinity', '')}</h3>
                                <span>{family.timeframe}</span>
                            </div>
                            <p className="nfi-muted">{family.role}</p>
                            <p>{family.focus}</p>
                            <SignalBar value={family.signals} max={180} />
                            <span className={`nfi-risk ${family.risk}`}>{family.risk}</span>
                        </article>
                    ))}
                </div>
            </Panel>

            <Panel title="신호 탐색" description="진입, 청산, 보호 신호를 분리해서 확인합니다.">
                <div className="nfi-tabs" role="tablist" aria-label="Signal groups">
                    {SIGNAL_GROUPS.map(([id, label]) => (
                        <button
                            className={activeSignalGroup === id ? 'active' : ''}
                            key={id}
                            type="button"
                            onClick={() => setActiveSignalGroup(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="nfi-signal-layout">
                    <MarketCanvas signals={activeSignals} group={activeSignalGroup} />
                    <div className="nfi-signal-list">
                        {activeSignals.map((signal) => (
                            <article className="nfi-signal" key={signal.id}>
                                <div className="nfi-signal-title">
                                    <h3>{signal.label}</h3>
                                    <strong>{signal.weight}</strong>
                                </div>
                                <p>{signal.note}</p>
                                <div className="nfi-chip-row">
                                    {signal.indicators.map((indicator) => <span key={indicator}>{indicator}</span>)}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Panel>

            <div className="nfi-two-col">
                <Panel title="릴리스 흐름" description="최근 변경은 보호 장치와 설정 보강에 초점이 있습니다.">
                    <ol className="nfi-timeline">
                        {(data.releaseTimeline || []).map((item) => (
                            <li key={`${item.version}-${item.date}`}>
                                <span>{item.date}</span>
                                <strong>{item.version}</strong>
                                <em>{item.theme}</em>
                                <p>{item.details}</p>
                            </li>
                        ))}
                    </ol>
                </Panel>

                <Panel title="설정 가드" description="전략 가정을 깨기 쉬운 값만 따로 모았습니다.">
                    <div className="nfi-guard-list">
                        {(data.configGuards || []).map((guard) => (
                            <article className="nfi-guard" key={guard.name}>
                                <code>{guard.name}</code>
                                <strong>{guard.expected}</strong>
                                <p>{guard.impact}</p>
                            </article>
                        ))}
                    </div>
                </Panel>
            </div>

            <Panel title="백테스트 체크리스트" description="공식 문서의 테스트 흐름을 실행 순서로 정리했습니다.">
                <div className="nfi-check-grid">
                    {(data.backtestChecklist || []).map((item, index) => (
                        <article className="nfi-check" key={item.step}>
                            <span>{index + 1}</span>
                            <h3>{item.step}</h3>
                            <code>{item.command}</code>
                            <p>{item.reason}</p>
                        </article>
                    ))}
                </div>
            </Panel>

            <Panel title="리스크 매트릭스" description="자동매매 전략 검토 때 놓치기 쉬운 위험이야.">
                <div className="nfi-risk-grid">
                    {(data.riskMatrix || []).map((item) => (
                        <article className="nfi-risk-card" key={item.risk}>
                            <span className={`nfi-severity ${item.severity}`}>{item.severity}</span>
                            <h3>{item.risk}</h3>
                            <p>{item.mitigation}</p>
                        </article>
                    ))}
                </div>
            </Panel>

            <p className="nfi-source">Source: {data.source || 'curated project data'} · Generated {formatDate(data.generatedAt)}</p>
        </ShowcaseShell>
    );
}

function ShowcaseShell({ children }: { children: ReactNode }) {
    return (
        <div className="nfi-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
    return (
        <section className="nfi-panel">
            <div className="nfi-section-heading">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
    );
}

function SignalBar({ value, max }: { value: number; max: number }) {
    const width = Math.min(100, Math.max(8, (value / max) * 100));
    return <div className="nfi-signal-bar"><span style={{ width: `${width}%` }} /></div>;
}

function MarketCanvas({ signals, group }: { signals: Signal[]; group: SignalGroup }) {
    const points = [72, 65, 69, 57, 63, 76, 71, 82, 79, 88, 84, 91];
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const polyline = points.map((point, index) => {
        const x = (index / (points.length - 1)) * 300;
        const y = 150 - ((point - min) / range) * 110;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className={`nfi-market ${group}`}>
            <svg viewBox="0 0 300 170" role="img" aria-label={`${group} signal chart`}>
                <path d="M0 150 H300" />
                <path d="M0 95 H300" />
                <path d="M0 40 H300" />
                <polyline points={polyline} />
                {signals.map((signal, index) => {
                    const x = 42 + index * 86;
                    const y = 140 - (signal.weight / 100) * 90;
                    return (
                        <g key={signal.id}>
                            <circle cx={x} cy={y} r="7" />
                            <text x={x} y={y - 14}>{signal.weight}</text>
                        </g>
                    );
                })}
            </svg>
            <div className="nfi-market-caption">
                <strong>{group}</strong>
                <span>Signal weights mapped over a sample trend path</span>
            </div>
        </div>
    );
}

function formatCompact(value?: number): string {
    if (value === undefined || Number.isNaN(Number(value))) return 'N/A';
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value));
}

function formatDate(value?: string): string {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('ko-KR', { dateStyle: 'medium' });
}

const showcaseCss = `
.nfi-showcase{max-width:1120px;margin:0 auto;color:var(--color-text)}
.nfi-hero,.nfi-panel,.nfi-rec,.nfi-family,.nfi-signal,.nfi-guard,.nfi-check,.nfi-risk-card{border:1px solid var(--color-border);background:var(--color-surface)}
.nfi-hero,.nfi-panel{border-radius:12px;padding:20px}
.nfi-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:18px;margin-bottom:18px;background:linear-gradient(135deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 44%),var(--color-surface)}
.nfi-hero-copy h2{margin:0 0 10px;font-size:clamp(1.7rem,3vw,2.5rem);line-height:1.1}
.nfi-hero-copy p{max-width:650px;color:var(--color-text-muted);line-height:1.7}
.nfi-kicker{margin:0 0 8px;color:var(--color-projects)!important;font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:uppercase}
.nfi-link-row,.nfi-meta,.nfi-chip-row,.nfi-tabs{display:flex;flex-wrap:wrap;gap:8px}
.nfi-link-row{margin-top:18px}
.nfi-link-row a,.nfi-tabs button{min-height:36px;border:1px solid var(--color-border);border-radius:8px;font:inherit;font-size:.86rem;font-weight:800}
.nfi-link-row a{display:inline-flex;align-items:center;padding:0 14px;background:var(--color-projects);color:#fff;text-decoration:none}
.nfi-link-row a+a{background:var(--color-surface-elevated);color:var(--color-projects)}
.nfi-repo-card{display:grid;gap:14px;border-radius:10px;padding:16px;background:color-mix(in srgb,var(--color-surface-elevated) 80%,transparent)}
.nfi-release span,.nfi-stat span,.nfi-muted,.nfi-section-heading p,.nfi-meta,.nfi-source{color:var(--color-text-muted)}
.nfi-release strong{display:block;margin:5px 0 2px;color:var(--color-projects);font-family:var(--font-heading);font-size:1.45rem}
.nfi-release em{color:var(--color-text-muted);font-style:normal}
.nfi-stat-grid,.nfi-rec-grid,.nfi-family-grid,.nfi-check-grid,.nfi-risk-grid{display:grid;gap:12px}
.nfi-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.nfi-stat,.nfi-rec,.nfi-family,.nfi-signal,.nfi-guard,.nfi-check,.nfi-risk-card{border-radius:8px;padding:14px}
.nfi-stat{background:var(--color-surface)}
.nfi-stat strong{display:block;margin-top:4px;color:var(--color-model);font-family:var(--font-heading);font-size:1.35rem}
.nfi-meta span,.nfi-chip-row span{border-radius:6px;background:var(--color-surface-alt);padding:4px 8px;font-size:.78rem}
.nfi-panel{margin-top:18px}
.nfi-section-heading{margin-bottom:16px}
.nfi-section-heading h2{margin:0;font-size:1.16rem}
.nfi-section-heading p{margin:5px 0 0;font-size:.88rem}
.nfi-rec-grid{grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}
.nfi-rec,.nfi-family,.nfi-signal,.nfi-check,.nfi-risk-card{display:grid;gap:10px}
.nfi-rec h3,.nfi-family h3,.nfi-signal h3,.nfi-check h3,.nfi-risk-card h3{margin:0;overflow-wrap:anywhere;font-size:.98rem}
.nfi-rec strong{color:var(--color-projects);font-family:var(--font-heading);font-size:1.42rem}
.nfi-rec p,.nfi-family p,.nfi-signal p,.nfi-check p,.nfi-risk-card p,.nfi-timeline p,.nfi-guard p{margin:0;color:var(--color-text-muted);font-size:.84rem;line-height:1.55}
.nfi-status,.nfi-risk,.nfi-severity{display:inline-flex;width:fit-content;border-radius:6px;padding:3px 7px;font-size:.7rem;font-weight:800;text-transform:uppercase}
.nfi-status.required,.nfi-severity.high{background:color-mix(in srgb,var(--color-fail) 16%,transparent);color:var(--color-fail)}
.nfi-status.recommended,.nfi-severity.medium{background:color-mix(in srgb,var(--color-model) 16%,transparent);color:var(--color-model)}
.nfi-family-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.nfi-family-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.nfi-family-head span{flex-shrink:0;border-radius:6px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);padding:3px 7px;font-size:.72rem;font-weight:800}
.nfi-signal-bar{height:8px;overflow:hidden;border-radius:999px;background:var(--color-surface-alt)}
.nfi-signal-bar span{display:block;height:100%;border-radius:inherit;background:var(--color-projects)}
.nfi-risk.guarded{background:color-mix(in srgb,var(--color-pass) 16%,transparent);color:var(--color-pass)}
.nfi-risk.medium,.nfi-risk.baseline{background:color-mix(in srgb,var(--color-model) 16%,transparent);color:var(--color-model)}
.nfi-tabs{margin-bottom:14px}
.nfi-tabs button{padding:0 13px;background:var(--color-surface-elevated);color:var(--color-text-muted);cursor:pointer}
.nfi-tabs button.active{border-color:var(--color-projects);background:var(--color-projects);color:#fff}
.nfi-signal-layout{display:grid;grid-template-columns:minmax(280px,1fr) minmax(280px,.9fr);gap:16px}
.nfi-market{border:1px solid var(--color-border);border-radius:10px;padding:14px;background:var(--color-surface-elevated)}
.nfi-market svg{width:100%;min-height:245px}
.nfi-market path{stroke:var(--color-border);stroke-width:1}
.nfi-market polyline{fill:none;stroke:var(--color-projects);stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.nfi-market circle{fill:var(--color-surface);stroke:var(--color-model);stroke-width:4}
.nfi-market.protection circle{stroke:var(--color-pass)}
.nfi-market.exit circle{stroke:var(--color-fail)}
.nfi-market text{fill:var(--color-text);font-size:11px;font-weight:800;text-anchor:middle}
.nfi-market-caption{display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--color-text-muted);font-size:.82rem}
.nfi-market-caption strong{color:var(--color-projects);text-transform:uppercase}
.nfi-signal-list,.nfi-guard-list{display:grid;gap:10px}
.nfi-signal-title{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.nfi-signal-title strong{color:var(--color-projects);font-family:var(--font-heading);font-size:1.25rem}
.nfi-chip-row{margin-top:10px}
.nfi-two-col{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.nfi-timeline{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.nfi-timeline li{display:grid;gap:4px;border-left:3px solid var(--color-projects);padding-left:12px}
.nfi-timeline span,.nfi-timeline em{color:var(--color-text-muted);font-size:.78rem;font-style:normal}
.nfi-guard{display:grid;grid-template-columns:minmax(130px,.9fr) minmax(70px,.4fr) minmax(0,1fr);align-items:start;gap:10px}
.nfi-guard code,.nfi-check code{overflow-wrap:anywhere;border-radius:6px;background:var(--color-surface-alt);padding:4px 6px;color:var(--color-projects);font-size:.78rem}
.nfi-check-grid,.nfi-risk-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.nfi-check>span{display:inline-grid;width:28px;height:28px;place-items:center;border-radius:999px;background:var(--color-projects);color:#fff;font-size:.78rem;font-weight:800}
.nfi-source,.nfi-empty{margin-top:16px;font-size:.82rem}
.nfi-empty{padding:16px;border:1px dashed var(--color-border-strong);border-radius:8px}
@media (max-width:840px){.nfi-hero,.nfi-signal-layout,.nfi-two-col{grid-template-columns:1fr}}
@media (max-width:640px){.nfi-hero,.nfi-panel{padding:14px}.nfi-market-caption{flex-direction:column;align-items:flex-start}.nfi-stat-grid,.nfi-guard{grid-template-columns:1fr}.nfi-market svg{min-height:190px}}
`;
