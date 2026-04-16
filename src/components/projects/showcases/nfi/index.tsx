import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface NfiShowcaseProps {
    slug: string;
}

type SignalGroup = 'entry' | 'exit' | 'protection';
type SectionId = 'setup' | 'families' | 'signals' | 'operations' | 'backtest' | 'risk';

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

const SECTION_LABELS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'setup', label: '운용 전체', description: '권장 설정과 금지 항목' },
    { id: 'families', label: '전략군', description: 'X 계열 전략 구조' },
    { id: 'signals', label: '신호', description: '진입·청산·보호 흐름' },
    { id: 'operations', label: '릴리스 / 설정', description: '업데이트와 가드 포인트' },
    { id: 'backtest', label: '백테스트', description: '검증 순서 체크리스트' },
    { id: 'risk', label: '리스크', description: '놓치기 쉬운 위험 요소' },
] as const;

const SECTION_PREFIX = 'nfi-section-';

export default function NfiShowcase({ slug }: NfiShowcaseProps) {
    const [data, setData] = useState<NfiData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeSignalGroup, setActiveSignalGroup] = useState<SignalGroup>('entry');
    const { activeId: activeSection, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTION_LABELS.map((item) => item.id),
        initialId: 'setup',
        sectionPrefix: SECTION_PREFIX,
    });

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
        ] as const;
    }, [data]);

    if (error) {
        return (
            <ShowcaseShell>
                <div className="nfi-empty">데이터를 불러오지 못했어. {error}</div>
            </ShowcaseShell>
        );
    }

    if (!data) {
        return (
            <ShowcaseShell>
                <div className="nfi-empty">데이터를 불러오는 중이야.</div>
            </ShowcaseShell>
        );
    }

    const activeSignals = data.signals?.[activeSignalGroup] || [];
    const currentSection = SECTION_LABELS.find((item) => item.id === activeSection);

    return (
        <ShowcaseShell>
            <ShowcaseSectionNav
                activeId={activeSection}
                items={SECTION_LABELS}
                onSelect={scrollToSection}
            />

            <div className="nfi-showcase-main">
                <section className="nfi-hero" aria-label="NostalgiaForInfinity repository summary">
                    <div className="nfi-hero-copy">
                        <p className="nfi-kicker">Freqtrade Strategy Suite</p>
                        <h2>{data.repo?.name || 'NostalgiaForInfinity'}</h2>
                        <p>{data.repo?.description || 'Trading strategy for the Freqtrade crypto bot.'}</p>
                        <div className="nfi-link-row">
                            {data.repo?.githubUrl && (
                                <a href={data.repo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                            )}
                            {data.repo?.docsUrl && (
                                <a href={data.repo.docsUrl} target="_blank" rel="noreferrer">Docs</a>
                            )}
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

                <div className="nfi-current-section" aria-live="polite">
                    <span>지금 보는 섹션</span>
                    <strong>{currentSection?.label}</strong>
                    <em>{currentSection?.description}</em>
                </div>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}setup`}>
                    <ShowcaseSectionLead index={1} title="운용 전체" description="README가 직접 강조하는 설정 조건이야." />
                    <Panel title="운용 전체" description="권장 범위와 블랙리스트 조건을 같이 본다.">
                        <div className="nfi-rec-grid">
                            {(data.recommendations || []).map((item) => (
                                <article className="nfi-rec" key={item.label}>
                                    <span className={`nfi-status ${item.status}`}>
                                        {item.status === 'required' ? 'required' : 'recommended'}
                                    </span>
                                    <h3>{item.label}</h3>
                                    <strong>{item.value}</strong>
                                    <p>{item.note}</p>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}families`}>
                    <ShowcaseSectionLead index={2} title="전략군" description="저장소 루트의 X 계열 전략을 용도별로 나눠 본 구성이야." />
                    <Panel title="전략군" description="타임프레임, 역할, 리스크를 한 장에서 비교한다.">
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
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}signals`}>
                    <ShowcaseSectionLead index={3} title="신호" description="진입, 청산, 보호 신호를 묶어서 비교해." />
                    <Panel title="신호 탐색" description="진입, 청산, 보호 신호를 그룹 단위로 확인한다.">
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
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}operations`}>
                    <ShowcaseSectionLead index={4} title="릴리스 / 설정" description="최근 릴리스와 자주 깨지는 설정 포인트를 같이 본다." />
                    <div className="nfi-two-col">
                        <Panel title="릴리스 흐름" description="최근 변경은 보호 장치와 설정 보강에 집중돼 있어.">
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

                        <Panel title="설정 가드" description="전략 가정을 깨기 쉬운 값만 따로 모았다.">
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
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}backtest`}>
                    <ShowcaseSectionLead index={5} title="백테스트" description="공식 문서 기준 실행 순서를 그대로 정리했다." />
                    <Panel title="백테스트 체크리스트" description="공식 문서의 테스트 흐름을 단계별로 확인한다.">
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
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}risk`}>
                    <ShowcaseSectionLead index={6} title="리스크" description="자동매매 전략을 볼 때 놓치기 쉬운 위험을 분리해 뒀다." />
                    <Panel title="리스크 매트릭스" description="전략 이해와 실제 운용 사이의 간극을 따로 본다.">
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
                </section>

                <p className="nfi-source">Source: {data.source || 'curated project data'} · Generated {formatDate(data.generatedAt)}</p>
            </div>
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

function ShowcaseSectionLead({ index, title, description }: { index: number; title: string; description: string }) {
    return (
        <header className="nfi-section-lead">
            <span className="nfi-section-index">{String(index).padStart(2, '0')}</span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </header>
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
    const polyline = points
        .map((point, index) => {
            const x = (index / (points.length - 1)) * 300;
            const y = 150 - ((point - min) / range) * 110;
            return `${x},${y}`;
        })
        .join(' ');
    const spacing = signals.length > 1 ? 244 / (signals.length - 1) : 0;

    return (
        <div className={`nfi-market ${group}`}>
            <svg viewBox="0 0 300 170" role="img" aria-label={`${group} signal chart`}>
                <path d="M0 150 H300" />
                <path d="M0 95 H300" />
                <path d="M0 40 H300" />
                <polyline points={polyline} />
                {signals.map((signal, index) => {
                    const x = signals.length === 1 ? 150 : 28 + spacing * index;
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
                <span>샘플 트렌드 위에 신호 가중치를 올려서 보는 시각화다.</span>
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
.nfi-showcase {
    display: contents;
    color: var(--color-text);
}
.nfi-showcase-main {
    display: grid;
    gap: 18px;
    grid-column: 2;
    grid-row: 2;
    min-width: 0;
}
.nfi-hero,
.nfi-panel,
.nfi-rec,
.nfi-family,
.nfi-signal,
.nfi-guard,
.nfi-check,
.nfi-risk-card {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
}
.nfi-hero,
.nfi-panel {
    border-radius: 12px;
    padding: 20px;
}
.nfi-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
    gap: 18px;
    background:
        linear-gradient(135deg, color-mix(in srgb, var(--color-projects) 12%, transparent), transparent 44%),
        var(--color-surface);
}
.nfi-hero-copy h2 {
    margin: 0 0 10px;
    overflow-wrap: anywhere;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    line-height: 1.08;
}
.nfi-hero-copy p {
    max-width: 650px;
    color: var(--color-text-muted);
    line-height: 1.7;
}
.nfi-kicker {
    margin: 0 0 8px;
    color: var(--color-projects) !important;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
}
.nfi-link-row,
.nfi-meta,
.nfi-chip-row,
.nfi-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.nfi-link-row {
    margin-top: 18px;
}
.nfi-link-row a,
.nfi-tabs button {
    min-height: 36px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font: inherit;
    font-size: 0.86rem;
    font-weight: 800;
}
.nfi-link-row a {
    display: inline-flex;
    align-items: center;
    padding: 0 14px;
    background: var(--color-projects);
    color: #fff;
    text-decoration: none;
}
.nfi-link-row a + a {
    background: var(--color-surface-elevated);
    color: var(--color-projects);
}
.nfi-repo-card {
    display: grid;
    gap: 14px;
    border-radius: 10px;
    padding: 16px;
    background: color-mix(in srgb, var(--color-surface-elevated) 80%, transparent);
}
.nfi-release span,
.nfi-stat span,
.nfi-muted,
.nfi-section-heading p,
.nfi-meta,
.nfi-source,
.nfi-section-lead p,
.nfi-current-section {
    color: var(--color-text-muted);
}
.nfi-release strong {
    display: block;
    margin: 5px 0 2px;
    color: var(--color-projects);
    font-family: var(--font-heading);
    font-size: 1.45rem;
}
.nfi-release em {
    color: var(--color-text-muted);
    font-style: normal;
}
.nfi-stat-grid,
.nfi-rec-grid,
.nfi-family-grid,
.nfi-check-grid,
.nfi-risk-grid {
    display: grid;
    gap: 12px;
}
.nfi-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
.nfi-stat,
.nfi-rec,
.nfi-family,
.nfi-signal,
.nfi-guard,
.nfi-check,
.nfi-risk-card {
    border-radius: 8px;
    padding: 14px;
}
.nfi-stat {
    background: var(--color-surface);
}
.nfi-stat strong {
    display: block;
    margin-top: 4px;
    color: var(--color-model);
    font-family: var(--font-heading);
    font-size: 1.35rem;
}
.nfi-meta span,
.nfi-chip-row span {
    border-radius: 6px;
    background: var(--color-surface-alt);
    padding: 4px 8px;
    font-size: 0.78rem;
}
.nfi-section-block {
    display: grid;
    gap: 16px;
    scroll-margin-top: 120px;
}
.nfi-section-block + .nfi-section-block {
    margin-top: 2px;
}
.nfi-section-lead {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 4px 2px 0;
}
.nfi-section-index {
    display: inline-grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-projects) 12%, transparent);
    color: var(--color-projects);
    font-size: 0.75rem;
    font-weight: 850;
    flex-shrink: 0;
}
.nfi-section-lead h3 {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.2;
}
.nfi-section-lead p {
    margin: 4px 0 0;
    font-size: 0.86rem;
}
.nfi-current-section {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin: -4px 0 0;
    font-size: 0.82rem;
}
.nfi-current-section span {
    font-weight: 750;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.nfi-current-section strong {
    color: var(--color-projects);
    font-size: 1rem;
}
.nfi-current-section em {
    font-style: normal;
}
.nfi-section-heading {
    margin-bottom: 16px;
}
.nfi-section-heading h2 {
    margin: 0;
    font-size: 1.16rem;
}
.nfi-section-heading p {
    margin: 5px 0 0;
    font-size: 0.88rem;
}
.nfi-rec-grid {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}
.nfi-rec,
.nfi-family,
.nfi-signal,
.nfi-check,
.nfi-risk-card {
    display: grid;
    gap: 10px;
}
.nfi-rec h3,
.nfi-family h3,
.nfi-signal h3,
.nfi-check h3,
.nfi-risk-card h3 {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 0.98rem;
}
.nfi-rec strong {
    color: var(--color-projects);
    font-family: var(--font-heading);
    font-size: 1.42rem;
}
.nfi-rec p,
.nfi-family p,
.nfi-signal p,
.nfi-check p,
.nfi-risk-card p,
.nfi-timeline p,
.nfi-guard p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.84rem;
    line-height: 1.55;
}
.nfi-status,
.nfi-risk,
.nfi-severity {
    display: inline-flex;
    width: fit-content;
    border-radius: 6px;
    padding: 3px 7px;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
}
.nfi-status.required,
.nfi-severity.high {
    background: color-mix(in srgb, var(--color-fail) 16%, transparent);
    color: var(--color-fail);
}
.nfi-status.recommended,
.nfi-severity.medium {
    background: color-mix(in srgb, var(--color-model) 16%, transparent);
    color: var(--color-model);
}
.nfi-family-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.nfi-family-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
}
.nfi-family-head span {
    flex-shrink: 0;
    border-radius: 6px;
    background: color-mix(in srgb, var(--color-projects) 14%, transparent);
    color: var(--color-projects);
    padding: 3px 7px;
    font-size: 0.72rem;
    font-weight: 800;
}
.nfi-signal-bar {
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: var(--color-surface-alt);
}
.nfi-signal-bar span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--color-projects);
}
.nfi-risk.guarded {
    background: color-mix(in srgb, var(--color-pass) 16%, transparent);
    color: var(--color-pass);
}
.nfi-risk.medium,
.nfi-risk.baseline {
    background: color-mix(in srgb, var(--color-model) 16%, transparent);
    color: var(--color-model);
}
.nfi-tabs {
    margin-bottom: 14px;
}
.nfi-tabs button {
    padding: 0 13px;
    background: var(--color-surface-elevated);
    color: var(--color-text-muted);
    cursor: pointer;
}
.nfi-tabs button.active {
    border-color: var(--color-projects);
    background: var(--color-projects);
    color: #fff;
}
.nfi-signal-layout {
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(280px, 0.9fr);
    gap: 16px;
}
.nfi-market {
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 14px;
    background: var(--color-surface-elevated);
}
.nfi-market svg {
    width: 100%;
    min-height: 245px;
}
.nfi-market path {
    stroke: var(--color-border);
    stroke-width: 1;
}
.nfi-market polyline {
    fill: none;
    stroke: var(--color-projects);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.nfi-market circle {
    fill: var(--color-surface);
    stroke: var(--color-model);
    stroke-width: 4;
}
.nfi-market.protection circle {
    stroke: var(--color-pass);
}
.nfi-market.exit circle {
    stroke: var(--color-fail);
}
.nfi-market text {
    fill: var(--color-text);
    font-size: 11px;
    font-weight: 800;
    text-anchor: middle;
}
.nfi-market-caption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--color-text-muted);
    font-size: 0.82rem;
}
.nfi-market-caption strong {
    color: var(--color-projects);
    text-transform: uppercase;
}
.nfi-signal-list,
.nfi-guard-list {
    display: grid;
    gap: 10px;
}
.nfi-signal-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
}
.nfi-signal-title strong {
    color: var(--color-projects);
    font-family: var(--font-heading);
    font-size: 1.25rem;
}
.nfi-chip-row {
    margin-top: 10px;
}
.nfi-two-col {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}
.nfi-timeline {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
}
.nfi-timeline li {
    display: grid;
    gap: 4px;
    border-left: 3px solid var(--color-projects);
    padding-left: 12px;
}
.nfi-timeline span,
.nfi-timeline em {
    color: var(--color-text-muted);
    font-size: 0.78rem;
    font-style: normal;
}
.nfi-guard {
    display: grid;
    grid-template-columns: minmax(130px, 0.9fr) minmax(70px, 0.4fr) minmax(0, 1fr);
    align-items: start;
    gap: 10px;
}
.nfi-guard code,
.nfi-check code {
    overflow-wrap: anywhere;
    border-radius: 6px;
    background: var(--color-surface-alt);
    padding: 4px 6px;
    color: var(--color-projects);
    font-size: 0.78rem;
}
.nfi-check-grid,
.nfi-risk-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.nfi-check > span {
    display: inline-grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 999px;
    background: var(--color-projects);
    color: #fff;
    font-size: 0.78rem;
    font-weight: 800;
}
.nfi-source,
.nfi-empty {
    font-size: 0.82rem;
}
.nfi-empty {
    padding: 16px;
    border: 1px dashed var(--color-border-strong);
    border-radius: 8px;
}
@media (max-width: 840px) {
    .nfi-showcase-main {
        grid-column: 1;
        grid-row: auto;
    }
    .nfi-hero,
    .nfi-signal-layout,
    .nfi-two-col {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 640px) {
    .nfi-hero,
    .nfi-panel {
        padding: 14px;
    }
    .nfi-market-caption {
        flex-direction: column;
        align-items: flex-start;
    }
    .nfi-stat-grid,
    .nfi-guard {
        grid-template-columns: 1fr;
    }
    .nfi-market svg {
        min-height: 190px;
    }
}
`;
