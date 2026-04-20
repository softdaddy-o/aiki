import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import { createSharedShowcaseChromeCss } from '../sharedShowcaseCss';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface NautilusShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

type SectionId = 'hero' | 'architecture' | 'assets' | 'venues' | 'performance' | 'quickstart';

interface ShowcaseSourceMeta {
    provider: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
    itemLabel?: string;
}

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
    { id: 'hero' as const, label: '소개', description: '한눈 요약과 메타' },
    { id: 'architecture' as const, label: '아키텍처', description: '핵심 컴포넌트 구조' },
    { id: 'assets' as const, label: '자산군', description: '지원 자산 클래스' },
    { id: 'venues' as const, label: '거래소', description: '연동 거래소와 데이터' },
    { id: 'performance' as const, label: '성능', description: '설계 원칙과 벤치마크' },
    { id: 'quickstart' as const, label: '시작하기', description: '설치와 첫 실행' },
];

const SECTION_PREFIX = 'nt-section-';
const TEXT_LABELS: Record<string, string> = {
    'GitHub repository and official website': 'GitHub 저장소와 공식 웹사이트 기준 정리',
    'curated project data': '큐레이션한 프로젝트 데이터',
    'Production-grade Rust-native trading engine with deterministic event-driven architecture': '결정론적 이벤트 흐름을 중심으로 설계한 Rust 기반 트레이딩 엔진이야.',
    active: '연결됨',
    Spot: '현물',
    Futures: '선물',
    Perpetuals: '무기한 선물',
    Options: '옵션',
    Equities: '주식',
    Stocks: '주식',
    Traditional: '전통 선물',
    Derivatives: '파생상품',
    FX: '외환',
    Sports: '스포츠 베팅',
    '5M+ rows/sec': '초당 500만 행 이상',
    Beta: '베타',
    'Research-to-Live Parity': '리서치와 실거래 코드 일치',
    'Deterministic Execution': '결정론적 실행',
    'Modular Architecture': '모듈형 아키텍처',
    'Type Safety': '타입 안정성',
};

export default function NautilusShowcase({ slug, title, summary, tags, sourceMeta, metricValue, license }: NautilusShowcaseProps) {
    const [data, setData] = useState<NautilusData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { activeId: activeSection, scrollToSection } = useShowcaseSectionNav({
        ids: SECTIONS.map((item) => item.id),
        initialId: 'hero',
        sectionPrefix: SECTION_PREFIX,
    });

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
            ['스타', repo.stars],
            ['포크', repo.forks],
            ['워처', repo.watchers],
        ];
    }, [data]);

    if (error) return <Shell><div className="nt-empty">데이터를 불러오지 못했습니다. {error}</div></Shell>;
    if (!data) return <Shell><div className="nt-empty">데이터 로딩 중...</div></Shell>;

    return (
        <Shell>
            <ShowcaseSectionNav items={SECTIONS} activeId={activeSection} onSelect={scrollToSection} />

            <div className="nt-showcase-main">
                <section className="nt-hero" id={`${SECTION_PREFIX}hero`} aria-label="NautilusTrader 저장소 요약">
                    <div className="nt-hero-head">
                        <span className="nt-showcase-label">Interactive Showcase</span>
                    </div>
                    <div className="nt-hero-copy">
                        <h1>{title}</h1>
                        <p>{summary}</p>
                        <p className="nt-kicker">멀티에셋 트레이딩 엔진</p>
                        <h2>{data.repo?.name || 'NautilusTrader'}</h2>
                        <p>{localizeText(data.repo?.description || '')}</p>
                        <div className="nt-link-row">
                            {data.repo?.githubUrl && <a href={data.repo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
                            {data.repo?.docsUrl && <a href={data.repo.docsUrl} target="_blank" rel="noreferrer">문서</a>}
                        </div>
                    </div>
                    <div className="nt-meta-grid">
                        <article className={`nt-meta-card nt-meta-card--source ${sourceMeta.className}`}>
                            <div className="nt-meta-mark">{sourceMeta.mark}</div>
                            <div className="nt-meta-copy">
                                <span>{sourceMeta.provider}</span>
                                <strong>{sourceMeta.path}</strong>
                            </div>
                        </article>
                        <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                        <MetaCard label="라이선스" value={license} />
                        <MetaCard label="읽는 방식" value="Architecture -> Venues -> Quickstart" />
                    </div>
                    {tags.length > 0 && (
                        <div className="nt-tag-row">
                            {tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                    )}
                    <div className="nt-repo-card">
                        <div className="nt-release">
                            <span>최신 릴리스</span>
                            <strong>{data.repo?.latestRelease || '없음'}</strong>
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

                <section className="nt-section-block" id={`${SECTION_PREFIX}architecture`}>
                    <ArchitectureSection data={data} />
                </section>
                <section className="nt-section-block" id={`${SECTION_PREFIX}assets`}>
                    <AssetsSection data={data} />
                </section>
                <section className="nt-section-block" id={`${SECTION_PREFIX}venues`}>
                    <VenuesSection data={data} />
                </section>
                <section className="nt-section-block" id={`${SECTION_PREFIX}performance`}>
                    <PerformanceSection data={data} />
                </section>
                <section className="nt-section-block" id={`${SECTION_PREFIX}quickstart`}>
                    <QuickstartSection data={data} />
                </section>

                <p className="nt-source">출처: {localizeText(data.source || 'curated project data')} · 생성일 {formatDate(data.generatedAt)}</p>
            </div>
        </Shell>
    );
}

function ArchitectureSection({ data }: { data: NautilusData }) {
    return (
        <div className="nt-section">
            <Panel
                title="이벤트 드리븐 아키텍처"
                description={<>시장 이벤트가 들어오면 순서대로 처리하는 <TermHint term="이벤트 드리븐" description="가격 변화, 주문 체결, 타이머 같은 사건이 생길 때마다 다음 동작을 이어 붙이는 설계 방식이야." /> 구조를 한눈에 본다.</>}
            >
                <div className="nt-arch-grid">
                    {(data.architecture || []).map((comp, index) => (
                        <article className="nt-arch-card" key={comp.name}>
                            <div className="nt-arch-head">
                                <span className="nt-arch-index">{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3>{comp.name}</h3>
                                    <span className="nt-role-badge">{localizeText(comp.role)}</span>
                                </div>
                            </div>
                            <p>{comp.description}</p>
                        </article>
                    ))}
                </div>
            </Panel>
            <Panel
                title="설계 원칙"
                description={<>백테스트와 실거래를 같은 코드로 이어 주는 <TermHint term="결정론적 실행" description="입력이 같으면 이벤트 순서와 결과도 같게 유지해서, 테스트 결과를 실거래와 최대한 비슷하게 맞추는 방식이야." /> 중심 설계야.</>}
            >
                <div className="nt-principle-grid">
                    {(data.designPrinciples || []).map((p) => (
                        <article className="nt-principle" key={p.name}>
                            <h3>{localizeText(p.name)}</h3>
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
            <Panel
                title="지원 자산 클래스"
                description={<>하나의 엔진으로 여러 자산을 묶어 다루는 <TermHint term="멀티에셋" description="주식, 선물, 옵션처럼 성격이 다른 자산을 같은 시스템 안에서 함께 운용하는 뜻이야." /> 구성이야.</>}
            >
                <div className="nt-asset-grid">
                    {(data.assetClasses || []).map((asset) => (
                        <article className="nt-asset-card" key={asset.name}>
                            <h3>{localizeText(asset.name)}</h3>
                            <div className="nt-chip-row">
                                {asset.types.map((t) => <span key={t}>{localizeText(t)}</span>)}
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
            <Panel
                title="암호화폐 거래소"
                description={<>공식으로 제공하는 거래소 <TermHint term="어댑터" description="거래소마다 다른 주문 API와 데이터 형식을 NautilusTrader 방식으로 맞춰 주는 연결 모듈이야." />를 묶어 보여줘.</>}
            >
                <div className="nt-venue-grid">
                    {cryptoVenues.map((venue) => (
                        <article className="nt-venue-card" key={venue.name}>
                            <div className="nt-venue-head">
                                <h3>{venue.name}</h3>
                                <span className={`nt-status ${venue.status}`}>{localizeText(venue.status)}</span>
                            </div>
                            <div className="nt-chip-row">
                                {venue.assets.map((a) => <span key={a}>{localizeText(a)}</span>)}
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
                                <span className={`nt-status ${venue.status}`}>{localizeText(venue.status)}</span>
                            </div>
                            <div className="nt-chip-row">
                                {venue.assets.map((a) => <span key={a}>{localizeText(a)}</span>)}
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
            <Panel
                title="성능 프로파일"
                description={<>시간을 매우 잘게 쪼개는 <TermHint term="나노초 해상도" description="1초를 10억 개로 나눈 수준까지 이벤트 시점을 기록하는 뜻이야. 빠른 체결 순서를 재현할 때 중요해." />와 대용량 처리 성능을 같이 본다.</>}
            >
                <div className="nt-perf-grid">
                    {(data.performance || []).map((m) => (
                        <article className="nt-perf-card" key={m.metric}>
                            <span>{m.metric}</span>
                            <strong>{localizeText(m.value)}</strong>
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
            <Panel
                title="시작하기"
                description={<>설치부터 첫 <TermHint term="백테스트" description="과거 시장 데이터를 넣어서 전략이 예전에 어떻게 움직였을지 미리 돌려 보는 실험이야." />까지 가장 짧은 흐름만 추렸어.</>}
            >
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

function Panel({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
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

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="nt-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function formatCompact(value?: number): string {
    if (value === undefined || Number.isNaN(Number(value))) return '없음';
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(Number(value));
}

function formatDate(value?: string): string {
    if (!value) return '없음';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('ko-KR', { dateStyle: 'medium' });
}

function localizeText(value?: string): string {
    if (!value) return '';
    return TEXT_LABELS[value] || value;
}

const showcaseCss = `
${createSharedShowcaseChromeCss({
    rootClass: 'nt-showcase',
    heroClass: 'nt-hero',
    panelClass: 'nt-panel',
    heroHeadClass: 'nt-hero-head',
    showcaseLabelClass: 'nt-showcase-label',
    heroCopyClass: 'nt-hero-copy',
    metaGridClass: 'nt-meta-grid',
    metaCardClass: 'nt-meta-card',
    metaSourceCardClass: 'nt-meta-card--source',
    metaMarkClass: 'nt-meta-mark',
    metaCopyClass: 'nt-meta-copy',
    tagRowClass: 'nt-tag-row',
    heroCopyMaxWidth: '650px',
})}
.nt-showcase-main{grid-column:2;grid-row:2;min-width:0}
.nt-panel,.nt-arch-card,.nt-asset-card,.nt-venue-card,.nt-perf-card,.nt-principle,.nt-qs-card{border:1px solid var(--color-border);background:var(--color-surface)}
.nt-hero{margin-bottom:18px;background:linear-gradient(135deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 44%),var(--color-surface)}
.nt-hero-copy,.nt-repo-card{min-width:0}
.nt-hero-copy .nt-kicker,.nt-hero-copy h2,.nt-hero-copy h2 + p{display:none}
.nt-kicker{margin:0 0 8px;color:var(--color-projects)!important;font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:uppercase}
.nt-link-row,.nt-meta,.nt-chip-row,.nt-tag-row{display:flex;flex-wrap:wrap;gap:8px}
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
.nt-section{min-width:0}
.nt-section-block{display:grid;gap:16px;scroll-margin-top:120px}
.nt-section-block+.nt-section-block{margin-top:6px}
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
@media (max-width:840px){.nt-showcase-main{grid-column:1;grid-row:auto}.nt-stat-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:640px){.nt-stat-grid{grid-template-columns:minmax(0,1fr)}}
`;
