import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';

interface NautilusShowcaseProps {
    slug: string;
}

type SectionId = 'architecture' | 'assets' | 'venues' | 'performance' | 'quickstart';

interface ArchitectureComponent {
    name: string;
    role: string;
    description: string;
}

interface AssetClass {
    name: string;
    types: string[];
    features: string;
}

interface Venue {
    name: string;
    type: string;
    status: string;
    assets: string[];
}

interface DataProvider {
    name: string;
    description: string;
}

interface PerformanceMetric {
    metric: string;
    value: string;
    note: string;
}

interface DesignPrinciple {
    name: string;
    description: string;
}

interface NautilusData {
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
        license?: string;
        primaryLanguage?: string;
        secondaryLanguage?: string;
        latestRelease?: string;
        latestReleaseDate?: string;
    };
    architecture?: ArchitectureComponent[];
    assetClasses?: AssetClass[];
    venues?: Venue[];
    dataProviders?: DataProvider[];
    performance?: PerformanceMetric[];
    releaseTimeline?: Array<{ version: string; date: string; theme: string; details: string }>;
    quickstart?: Array<{ step: string; command: string; reason: string }>;
    designPrinciples?: DesignPrinciple[];
}

const SECTIONS = [
    { id: 'architecture' as const, label: '아키텍처', description: '핵심 컴포넌트 구조' },
    { id: 'assets' as const, label: '자산군', description: '지원 자산 클래스' },
    { id: 'venues' as const, label: '거래소', description: '연동 거래소와 데이터' },
    { id: 'performance' as const, label: '성능', description: '설계 원칙과 벤치마크' },
    { id: 'quickstart' as const, label: '시작하기', description: '설치와 첫 실행' },
];

export default function NautilusShowcase({ slug }: NautilusShowcaseProps) {
    const [data, setData] = useState<NautilusData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<SectionId>('architecture');

    useEffect(() => {
        const controller = new AbortController();
        fetch(`/data/projects/${slug}.json?t=${Date.now()}`, { cache: 'no-store', signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json() as Promise<NautilusData>;
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
            ['Watchers', repo.watchers],
        ];
    }, [data]);

    if (error) return <Shell><div className="nt-empty">데이터를 불러오지 못했습니다. {error}</div></Shell>;
    if (!data) return <Shell><div className="nt-empty">데이터 로딩 중...</div></Shell>;

    return (
        <Shell>
            <ShowcaseSectionNav items={SECTIONS} activeId={activeSection} onSelect={setActiveSection} />

            <div className="nt-showcase-main">
                <section className="nt-hero" aria-label="NautilusTrader repository summary">
                    <div className="nt-hero-copy">
                        <p className="nt-kicker">Algorithmic Trading Engine</p>
                        <h2>{data.repo?.name || 'NautilusTrader'}</h2>
                        <p>{data.repo?.description || ''}</p>
                        <div className="nt-link-row">
                            {data.repo?.githubUrl && <a href={data.repo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
                            {data.repo?.docsUrl && <a href={data.repo.docsUrl} target="_blank" rel="noreferrer">Docs</a>}
                        </div>
                    </div>
                    <div className="nt-repo-card">
                        <div className="nt-release">
                            <span>Latest release</span>
                            <strong>{data.repo?.latestRelease || 'N/A'}</strong>
                            <em>{formatDate(data.repo?.latestReleaseDate)}</em>
                        </div>
                        <div className="nt-stat-grid">
                            {repoStats.map(([label, value]) => (
                                <div className="nt-stat" key={label}>
                                    <span>{label}</span>
                                    <strong>{formatCompact(value)}</strong>
                                </div>
                            ))}
                        </div>
                        <div className="nt-meta">
                            <span>{data.repo?.primaryLanguage || 'Rust'}</span>
                            <span>{data.repo?.secondaryLanguage || 'Python'}</span>
                            <span>{data.repo?.license || 'LGPL-3.0'}</span>
                        </div>
                    </div>
                </section>

                {activeSection === 'architecture' && <ArchitectureSection data={data} />}
                {activeSection === 'assets' && <AssetsSection data={data} />}
                {activeSection === 'venues' && <VenuesSection data={data} />}
                {activeSection === 'performance' && <PerformanceSection data={data} />}
                {activeSection === 'quickstart' && <QuickstartSection data={data} />}

                <p className="nt-source">Source: {data.source || 'curated project data'} · Generated {formatDate(data.generatedAt)}</p>
            </div>
        </Shell>
    );
}

function ArchitectureSection({ data }: { data: NautilusData }) {
    return (
        <div className="nt-section">
            <Panel title="이벤트 드리븐 아키텍처" description="NautilusTrader를 이루는 핵심 컴포넌트들이야.">
                <div className="nt-arch-grid">
                    {(data.architecture || []).map((comp, index) => (
                        <article className="nt-arch-card" key={comp.name}>
                            <div className="nt-arch-head">
                                <span className="nt-arch-index">{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3>{comp.name}</h3>
                                    <span className="nt-role-badge">{comp.role}</span>
                                </div>
                            </div>
                            <p>{comp.description}</p>
                        </article>
                    ))}
                </div>
            </Panel>
            <Panel title="설계 원칙" description="아키텍처를 관통하는 핵심 설계 철학이야.">
                <div className="nt-principle-grid">
                    {(data.designPrinciples || []).map((p) => (
                        <article className="nt-principle" key={p.name}>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                        </article>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

function AssetsSection({ data }: { data: NautilusData }) {
    return (
        <div className="nt-section">
            <Panel title="지원 자산 클래스" description="단일 인터페이스로 여러 자산군을 한데 다룰 수 있어.">
                <div className="nt-asset-grid">
                    {(data.assetClasses || []).map((asset) => (
                        <article className="nt-asset-card" key={asset.name}>
                            <h3>{asset.name}</h3>
                            <div className="nt-chip-row">
                                {asset.types.map((t) => <span key={t}>{t}</span>)}
                            </div>
                            <p>{asset.features}</p>
                        </article>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

function VenuesSection({ data }: { data: NautilusData }) {
    const cryptoVenues = (data.venues || []).filter((v) => v.type === 'crypto');
    const otherVenues = (data.venues || []).filter((v) => v.type !== 'crypto');
    return (
        <div className="nt-section">
            <Panel title="암호화폐 거래소" description="바로 연결 가능한 암호화폐 거래소들이야.">
                <div className="nt-venue-grid">
                    {cryptoVenues.map((venue) => (
                        <article className="nt-venue-card" key={venue.name}>
                            <div className="nt-venue-head">
                                <h3>{venue.name}</h3>
                                <span className={`nt-status ${venue.status}`}>{venue.status}</span>
                            </div>
                            <div className="nt-chip-row">
                                {venue.assets.map((a) => <span key={a}>{a}</span>)}
                            </div>
                        </article>
                    ))}
                </div>
            </Panel>
            <Panel title="전통 시장 및 기타" description="주식, 선물, 옵션, 베팅 시장 어댑터야.">
                <div className="nt-venue-grid">
                    {otherVenues.map((venue) => (
                        <article className="nt-venue-card" key={venue.name}>
                            <div className="nt-venue-head">
                                <h3>{venue.name}</h3>
                                <span className={`nt-status ${venue.status}`}>{venue.status}</span>
                            </div>
                            <div className="nt-chip-row">
                                {venue.assets.map((a) => <span key={a}>{a}</span>)}
                            </div>
                        </article>
                    ))}
                </div>
            </Panel>
            {(data.dataProviders || []).length > 0 && (
                <Panel title="데이터 제공자" description="히스토리 데이터 소스로 연결할 수 있는 제공자들이야.">
                    <div className="nt-venue-grid">
                        {(data.dataProviders || []).map((dp) => (
                            <article className="nt-venue-card" key={dp.name}>
                                <h3>{dp.name}</h3>
                                <p>{dp.description}</p>
                            </article>
                        ))}
                    </div>
                </Panel>
            )}
        </div>
    );
}

function PerformanceSection({ data }: { data: NautilusData }) {
    return (
        <div className="nt-section">
            <Panel title="성능 프로파일" description="공식 문서에서 발표한 성능 지표들이야.">
                <div className="nt-perf-grid">
                    {(data.performance || []).map((m) => (
                        <article className="nt-perf-card" key={m.metric}>
                            <span>{m.metric}</span>
                            <strong>{m.value}</strong>
                            <p>{m.note}</p>
                        </article>
                    ))}
                </div>
            </Panel>
            <Panel title="릴리스 흐름" description="최근 버전 업데이트 흐름이야.">
                <ol className="nt-timeline">
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
        </div>
    );
}

function QuickstartSection({ data }: { data: NautilusData }) {
    return (
        <div className="nt-section">
            <Panel title="시작하기" description="설치에서 첫 백테스트까지의 스텝들이야.">
                <div className="nt-qs-grid">
                    {(data.quickstart || []).map((item, index) => (
                        <article className="nt-qs-card" key={item.step}>
                            <span className="nt-qs-num">{index + 1}</span>
                            <h3>{item.step}</h3>
                            <code>{item.command}</code>
                            <p>{item.reason}</p>
                        </article>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <div className="nt-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function Panel({ title, description, children }: { title: string; description: string; children: ReactNode }) {
    return (
        <section className="nt-panel">
            <div className="nt-section-heading">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
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
.nt-showcase{display:contents;color:var(--color-text)}
.nt-showcase-main{grid-column:2;grid-row:2;min-width:0}
.nt-hero,.nt-panel,.nt-arch-card,.nt-asset-card,.nt-venue-card,.nt-perf-card,.nt-principle,.nt-qs-card{border:1px solid var(--color-border);background:var(--color-surface)}
.nt-hero,.nt-panel{border-radius:12px;padding:20px}
.nt-hero{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:18px;margin-bottom:18px;background:linear-gradient(135deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 44%),var(--color-surface)}
.nt-hero-copy,.nt-repo-card{min-width:0}
.nt-hero-copy h2{margin:0 0 10px;font-size:clamp(1.7rem,3vw,2.5rem);line-height:1.1;overflow-wrap:anywhere}
.nt-hero-copy p{max-width:650px;color:var(--color-text-muted);line-height:1.7}
.nt-kicker{margin:0 0 8px;color:var(--color-projects)!important;font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:uppercase}
.nt-link-row,.nt-meta,.nt-chip-row{display:flex;flex-wrap:wrap;gap:8px}
.nt-link-row{margin-top:18px}
.nt-link-row a{display:inline-flex;align-items:center;min-height:36px;padding:0 14px;border:1px solid var(--color-border);border-radius:8px;font:inherit;font-size:.86rem;font-weight:800;text-decoration:none}
.nt-link-row a:first-child{background:var(--color-projects);color:#fff}
.nt-link-row a+a{background:var(--color-surface-elevated);color:var(--color-projects)}
.nt-repo-card{display:grid;gap:14px;border-radius:10px;padding:16px;background:color-mix(in srgb,var(--color-surface-elevated) 80%,transparent)}
.nt-release span,.nt-stat span,.nt-section-heading p,.nt-meta,.nt-source{color:var(--color-text-muted)}
.nt-release strong{display:block;margin:5px 0 2px;color:var(--color-projects);font-family:var(--font-heading);font-size:1.45rem}
.nt-release em{color:var(--color-text-muted);font-style:normal}
.nt-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.nt-stat{border-radius:8px;padding:14px;background:var(--color-surface)}
.nt-stat strong{display:block;margin-top:4px;color:var(--color-model);font-family:var(--font-heading);font-size:1.35rem}
.nt-meta span,.nt-chip-row span{border-radius:6px;background:var(--color-surface-alt);padding:4px 8px;font-size:.78rem}
.nt-section{grid-column:2}
.nt-panel{margin-top:18px}
.nt-section-heading{margin-bottom:16px}
.nt-section-heading h2{margin:0;font-size:1.16rem}
.nt-section-heading p{margin:5px 0 0;font-size:.88rem}
.nt-arch-grid,.nt-asset-grid,.nt-venue-grid,.nt-perf-grid,.nt-principle-grid,.nt-qs-grid{display:grid;gap:12px}
.nt-arch-grid{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.nt-arch-card,.nt-asset-card,.nt-venue-card,.nt-perf-card,.nt-principle,.nt-qs-card{border-radius:8px;padding:14px;display:grid;gap:10px}
.nt-arch-head{display:flex;align-items:flex-start;gap:12px}
.nt-arch-index{display:inline-grid;width:32px;height:32px;place-items:center;border-radius:8px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:.76rem;font-weight:850;flex-shrink:0}
.nt-arch-card h3,.nt-asset-card h3,.nt-venue-card h3,.nt-perf-card h3,.nt-principle h3,.nt-qs-card h3{margin:0;font-size:.98rem}
.nt-role-badge{display:inline-block;margin-top:3px;padding:2px 7px;border-radius:5px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.7rem;font-weight:700}
.nt-arch-card p,.nt-asset-card p,.nt-venue-card p,.nt-perf-card p,.nt-principle p,.nt-qs-card p{margin:0;color:var(--color-text-muted);font-size:.84rem;line-height:1.55}
.nt-asset-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.nt-venue-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.nt-venue-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
.nt-status{display:inline-flex;width:fit-content;border-radius:6px;padding:3px 7px;font-size:.7rem;font-weight:800;text-transform:uppercase}
.nt-status.active{background:color-mix(in srgb,var(--color-pass) 16%,transparent);color:var(--color-pass)}
.nt-perf-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.nt-perf-card span{color:var(--color-text-muted);font-size:.78rem}
.nt-perf-card strong{display:block;margin:6px 0;color:var(--color-projects);font-family:var(--font-heading);font-size:1.5rem}
.nt-principle-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.nt-principle{border-left:3px solid var(--color-projects)}
.nt-timeline{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.nt-timeline li{display:grid;gap:4px;border-left:3px solid var(--color-projects);padding-left:12px}
.nt-timeline span,.nt-timeline em{color:var(--color-text-muted);font-size:.78rem;font-style:normal}
.nt-qs-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.nt-qs-num{display:inline-grid;width:28px;height:28px;place-items:center;border-radius:999px;background:var(--color-projects);color:#fff;font-size:.78rem;font-weight:800}
.nt-qs-card code{overflow-wrap:anywhere;border-radius:6px;background:var(--color-surface-alt);padding:4px 6px;color:var(--color-projects);font-size:.78rem}
.nt-source,.nt-empty{margin-top:16px;font-size:.82rem}
.nt-empty{padding:16px;border:1px dashed var(--color-border-strong);border-radius:8px}
@media (max-width:840px){.nt-showcase-main{grid-column:1;grid-row:auto}.nt-hero{grid-template-columns:1fr}.nt-stat-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:640px){.nt-hero,.nt-panel{padding:14px}.nt-stat-grid{grid-template-columns:1fr}}
`;
