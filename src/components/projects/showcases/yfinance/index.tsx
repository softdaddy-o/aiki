import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';

interface YfinanceShowcaseProps {
    slug: string;
}

type RecordValue = Record<string, unknown>;

interface Quote {
    symbol: string;
    name?: string;
    assetType?: string;
    currency?: string;
    exchange?: string;
    price?: number | null;
    previousClose?: number | null;
    change?: number | null;
    changePercent?: number | null;
    dayHigh?: number | null;
    dayLow?: number | null;
    marketCap?: number | null;
    fiftyTwoWeekHigh?: number | null;
    fiftyTwoWeekLow?: number | null;
    history?: number[];
}

interface MarketUniverse {
    id: string;
    title: string;
    description?: string;
    quotes: Quote[];
}

interface MarketData {
    generatedAt?: string;
    mode?: string;
    source?: string;
    libraryVersion?: string;
    notes?: string[];
    summaryStats?: {
        marketGroups?: number;
        featureTests?: number;
        deepDives?: number;
        instrumentCount?: number;
    };
    marketUniverses?: MarketUniverse[];
    batchQuotes?: { symbols?: string[]; quotes?: Quote[] };
    bulkDownload?: { symbols?: string[]; rows?: Array<{ date: string; values: Record<string, number | null> }> };
    searchLabs?: Array<RecordValue>;
    screeners?: Array<RecordValue>;
    marketOverviews?: Array<RecordValue>;
    sectorIndustry?: { sector?: RecordValue; industry?: RecordValue };
    deepDives?: Array<RecordValue & { symbol?: string; title?: string; assetType?: string; quote?: Quote }>;
    featureCoverage?: Array<{ feature?: string; sample?: string; status?: string; note?: string }>;
}

const SECTION_LABELS = [
    { id: 'universes', label: 'Markets', description: '지역·자산군 샘플' },
    { id: 'batch', label: 'Batch', description: '여러 종목 다운로드' },
    { id: 'discovery', label: 'Discovery', description: '검색·스크리너' },
    { id: 'deep-dives', label: 'Deep Dives', description: '종목별 상세 표면' },
    { id: 'coverage', label: 'Coverage', description: '테스트한 API 범위' },
] as const;

export default function YfinanceShowcase({ slug }: YfinanceShowcaseProps) {
    const [data, setData] = useState<MarketData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<(typeof SECTION_LABELS)[number]['id']>('universes');

    useEffect(() => {
        const controller = new AbortController();
        fetch(`/data/projects/${slug}.json?t=${Date.now()}`, {
            cache: 'no-store',
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json() as Promise<MarketData>;
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

    const stats = useMemo(() => {
        const summary = data?.summaryStats || {};
        return [
            ['Feature Tests', summary.featureTests],
            ['Market Groups', summary.marketGroups],
            ['Instruments', summary.instrumentCount],
            ['Deep Dives', summary.deepDives],
        ];
    }, [data]);

    if (error) {
        return (
            <ShowcaseShell>
                <div className="yf-empty">데이터를 불러오지 못했습니다: {error}</div>
            </ShowcaseShell>
        );
    }

    if (!data) {
        return (
            <ShowcaseShell>
                <div className="yf-empty">데이터 로딩 중...</div>
            </ShowcaseShell>
        );
    }

    return (
        <ShowcaseShell>
            <ShowcaseSectionNav
                activeId={activeSection}
                items={SECTION_LABELS}
                onSelect={setActiveSection}
            />

            <div className="yf-showcase-main">
                <section className="yf-header" aria-label="yfinance generated data summary">
                    <div className="yf-stat-grid">
                        {stats.map(([label, value]) => (
                            <div className="yf-stat" key={label}>
                                <span>{label}</span>
                                <strong>{formatCompact(value)}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="yf-meta">
                        <span>Mode: <strong>{data.mode || 'unknown'}</strong></span>
                        <span>Generated: {formatDate(data.generatedAt)}</span>
                        <span>yfinance {data.libraryVersion || 'unknown'}</span>
                    </div>
                    {data.notes && data.notes.length > 0 && (
                        <div className="yf-notes">
                            {data.notes.map((note) => <p key={note}>{note}</p>)}
                        </div>
                    )}
                </section>

                <div className="yf-current-section" aria-live="polite">
                    <span>Now viewing</span>
                    <strong>{SECTION_LABELS.find((item) => item.id === activeSection)?.label}</strong>
                    <em>{SECTION_LABELS.find((item) => item.id === activeSection)?.description}</em>
                </div>

                {activeSection === 'universes' && <UniversesSection groups={data.marketUniverses || []} />}
                {activeSection === 'batch' && <BatchSection batch={data.batchQuotes} bulk={data.bulkDownload} />}
                {activeSection === 'discovery' && (
                    <DiscoverySection
                        searchLabs={data.searchLabs || []}
                        screeners={data.screeners || []}
                        markets={data.marketOverviews || []}
                        sectorIndustry={data.sectorIndustry}
                    />
                )}
                {activeSection === 'deep-dives' && <DeepDivesSection dives={data.deepDives || []} />}
                {activeSection === 'coverage' && <CoverageSection features={data.featureCoverage || []} />}
            </div>
        </ShowcaseShell>
    );
}

function ShowcaseShell({ children }: { children: ReactNode }) {
    return (
        <div className="yf-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function UniversesSection({ groups }: { groups: MarketUniverse[] }) {
    if (!groups.length) return <EmptyBox label="No market universe data." />;

    return (
        <div className="yf-stack">
            {groups.map((group) => (
                <section className="yf-panel" key={group.id}>
                    <SectionHeading title={group.title} description={group.description} />
                    <div className="yf-quote-grid">
                        {(group.quotes || []).map((quote) => <QuoteCard quote={quote} key={quote.symbol} />)}
                    </div>
                </section>
            ))}
        </div>
    );
}

function BatchSection({ batch, bulk }: { batch?: MarketData['batchQuotes']; bulk?: MarketData['bulkDownload'] }) {
    const bulkRows = (bulk?.rows || []).map((row) => ({ date: row.date, ...row.values }));

    return (
        <div className="yf-stack">
            <section className="yf-panel">
                <SectionHeading title="Batch Quotes" description={(batch?.symbols || []).join(', ')} />
                <div className="yf-quote-grid">
                    {(batch?.quotes || []).map((quote) => <QuoteCard quote={quote} key={quote.symbol} />)}
                </div>
                {!(batch?.quotes || []).length && <EmptyBox label="No batch quote data." />}
            </section>
            <section className="yf-panel">
                <SectionHeading title="Bulk Download Matrix" description={(bulk?.symbols || []).join(', ')} />
                <DataTable rows={bulkRows} emptyLabel="No bulk download data." />
            </section>
        </div>
    );
}

function DiscoverySection({
    searchLabs,
    screeners,
    markets,
    sectorIndustry,
}: {
    searchLabs: RecordValue[];
    screeners: RecordValue[];
    markets: RecordValue[];
    sectorIndustry?: MarketData['sectorIndustry'];
}) {
    const sector = sectorIndustry?.sector || {};
    const industry = sectorIndustry?.industry || {};

    return (
        <div className="yf-stack">
            <section className="yf-panel">
                <SectionHeading title="Search And Lookup" description="Yahoo Finance search and lookup surfaces." />
                <div className="yf-info-grid">
                    {searchLabs.map((lab) => (
                        <article className="yf-info" key={String(lab.query)}>
                            <h4>{String(lab.query || 'Search')}</h4>
                            <p className="yf-muted">{String(lab.label || '')}</p>
                            <DataTable rows={(lab.topResults as RecordValue[]) || []} emptyLabel="No search results." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading title="Screeners" description="Predefined yfinance screeners sampled at build time." />
                <div className="yf-info-grid">
                    {screeners.map((item) => (
                        <article className="yf-info" key={String(item.name)}>
                            <h4>{String(item.title || item.name || 'Screener')}</h4>
                            <p className="yf-muted">{String(item.description || '')}</p>
                            <DataTable rows={(item.quotes as RecordValue[]) || []} emptyLabel="No screener rows." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading title="Market Overviews" description="Regional market snapshots." />
                <div className="yf-info-grid">
                    {markets.map((market) => (
                        <article className="yf-info" key={String(market.code)}>
                            <div className="yf-info-head">
                                <h4>{String(market.code || 'Market')}</h4>
                                <StatusPill status={String(market.status || 'unknown')} />
                            </div>
                            <p className="yf-muted">{String(market.message || '')}</p>
                            <DataTable rows={(market.entries as RecordValue[]) || []} emptyLabel="No market rows." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading title="Sector And Industry" description="Technology sector and semiconductor industry samples." />
                <div className="yf-info-grid two">
                    <article className="yf-info">
                        <h4>{String(sector.name || 'Sector')}</h4>
                        <p className="yf-muted">{String((sector.overview as RecordValue | undefined)?.description || '')}</p>
                        <DataTable rows={(sector.topCompanies as RecordValue[]) || []} emptyLabel="No sector company rows." />
                    </article>
                    <article className="yf-info">
                        <h4>{String(industry.name || 'Industry')}</h4>
                        <p className="yf-muted">{String((industry.overview as RecordValue | undefined)?.description || '')}</p>
                        <DataTable rows={(industry.topCompanies as RecordValue[]) || []} emptyLabel="No industry company rows." />
                    </article>
                </div>
            </section>
        </div>
    );
}

function DeepDivesSection({ dives }: { dives: Array<RecordValue & { symbol?: string; title?: string; assetType?: string; quote?: Quote }> }) {
    if (!dives.length) return <EmptyBox label="No deep dive data." />;

    return (
        <div className="yf-stack">
            {dives.map((dive, index) => {
                const financials = (dive.financials || {}) as RecordValue;
                const research = (dive.research || {}) as RecordValue;
                const ownership = (dive.ownership || {}) as RecordValue;
                return (
                    <details className="yf-detail" open={index === 0} key={String(dive.symbol)}>
                        <summary>
                            <span>
                                <strong>{String(dive.symbol || 'Ticker')}</strong>
                                <em>{String(dive.title || dive.assetType || '')}</em>
                            </span>
                            <span>{formatNumber(dive.quote?.price, dive.quote?.currency)}</span>
                        </summary>
                        <div className="yf-detail-body">
                            {dive.quote && <QuoteCard quote={dive.quote} />}
                            <InfoBlock title="Highlights" rows={[dive.highlights as RecordValue]} />
                            <InfoBlock title="Price History" rows={(dive.historyRows as RecordValue[]) || []} />
                            <InfoBlock title="Income Statement" rows={(financials.incomeStatement as RecordValue[]) || []} />
                            <InfoBlock title="Balance Sheet" rows={(financials.balanceSheet as RecordValue[]) || []} />
                            <InfoBlock title="Cashflow" rows={(financials.cashflow as RecordValue[]) || []} />
                            <InfoBlock title="Research" rows={(research.earningsDates as RecordValue[]) || []} />
                            <InfoBlock title="Analyst Targets" rows={[research.analystTargets as RecordValue]} />
                            <InfoBlock title="Ownership" rows={(ownership.institutionalHolders as RecordValue[]) || []} />
                            <InfoBlock title="Filings" rows={(dive.filings as RecordValue[]) || []} />
                            <InfoBlock title="News" rows={(dive.news as RecordValue[]) || []} />
                        </div>
                    </details>
                );
            })}
        </div>
    );
}

function CoverageSection({ features }: { features: Array<{ feature?: string; sample?: string; status?: string; note?: string }> }) {
    if (!features.length) return <EmptyBox label="No feature coverage data." />;

    return (
        <div className="yf-coverage-grid">
            {features.map((feature) => (
                <article className="yf-coverage" key={`${feature.feature}-${feature.sample}`}>
                    <div className="yf-info-head">
                        <h4>{feature.feature}</h4>
                        <StatusPill status={feature.status || 'unknown'} />
                    </div>
                    <p className="yf-muted">Sample: {feature.sample}</p>
                    <p>{feature.note}</p>
                </article>
            ))}
        </div>
    );
}

function InfoBlock({ title, rows }: { title: string; rows: RecordValue[] }) {
    return (
        <section className="yf-info">
            <h4>{title}</h4>
            <DataTable rows={rows} emptyLabel={`No ${title.toLowerCase()} data.`} />
        </section>
    );
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
    return (
        <div className="yf-section-heading">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </div>
    );
}

function QuoteCard({ quote }: { quote: Quote }) {
    const positive = (quote.change ?? 0) >= 0;

    return (
        <article className="yf-quote">
            <div className="yf-quote-head">
                <div>
                    <p className="yf-symbol">{quote.symbol}</p>
                    <h4>{quote.name || quote.symbol}</h4>
                    <p className="yf-muted">{quote.assetType || 'UNKNOWN'} · {quote.exchange || 'N/A'}</p>
                </div>
                <span className={positive ? 'yf-change positive' : 'yf-change negative'}>
                    {formatPercent(quote.changePercent)}
                </span>
            </div>
            <p className="yf-price">{formatNumber(quote.price, quote.currency)}</p>
            <Sparkline values={quote.history || []} positive={positive} />
            <dl className="yf-mini-stats">
                <div><dt>Prev</dt><dd>{formatNumber(quote.previousClose, quote.currency)}</dd></div>
                <div><dt>Day</dt><dd>{formatRange(quote.dayLow, quote.dayHigh, quote.currency)}</dd></div>
                <div><dt>52w</dt><dd>{formatRange(quote.fiftyTwoWeekLow, quote.fiftyTwoWeekHigh, quote.currency)}</dd></div>
                <div><dt>Mkt Cap</dt><dd>{formatCompact(quote.marketCap)}</dd></div>
            </dl>
        </article>
    );
}

function Sparkline({ values, positive }: { values: number[]; positive: boolean }) {
    if (!values.length || values.length < 2) {
        return <div className="yf-sparkline empty" aria-hidden="true" />;
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const width = 140;
    const height = 42;
    const points = values
        .map((value, index) => {
            const x = (index / (values.length - 1)) * width;
            const y = height - 4 - ((value - min) / range) * (height - 8);
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg className="yf-sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Price history">
            <polyline points={points} className={positive ? 'positive' : 'negative'} />
        </svg>
    );
}

function DataTable({ rows, emptyLabel }: { rows: RecordValue[]; emptyLabel: string }) {
    const cleanedRows = (rows || []).filter((row) => row && Object.keys(row).length > 0);
    if (!cleanedRows.length) return <EmptyBox label={emptyLabel} />;

    const columns = Object.keys(cleanedRows[0]);
    return (
        <div className="yf-table-wrap">
            <table className="yf-table">
                <thead>
                    <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
                </thead>
                <tbody>
                    {cleanedRows.slice(0, 8).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => <td key={column}>{cellText(row[column])}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function EmptyBox({ label }: { label: string }) {
    return <div className="yf-empty">{label}</div>;
}

function StatusPill({ status }: { status: string }) {
    const normalized = status.toLowerCase();
    const className = normalized === 'ok' || normalized === 'open' || normalized === 'closed'
        ? 'ok'
        : normalized === 'warn'
            ? 'warn'
            : 'bad';
    return <span className={`yf-status ${className}`}>{status}</span>;
}

function cellText(value: unknown): string {
    if (value === null || value === undefined) return 'N/A';
    if (Array.isArray(value)) return value.map(cellText).join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'number') return Math.abs(value) >= 100000 ? formatCompact(value) : formatNumber(value);
    return String(value);
}

function formatNumber(value?: number | null, currency?: string): string {
    if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
    try {
        if (currency) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency,
                maximumFractionDigits: Math.abs(value) >= 1000 ? 0 : 2,
            }).format(value);
        }
        return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
    } catch {
        return Number(value).toLocaleString('en-US');
    }
}

function formatCompact(value?: number | null): string {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(Number(value));
}

function formatPercent(value?: number | null): string {
    if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}

function formatRange(low?: number | null, high?: number | null, currency?: string): string {
    return `${formatNumber(low, currency)} - ${formatNumber(high, currency)}`;
}

function formatDate(value?: string): string {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

const showcaseCss = `
.yf-showcase {
    display: contents;
    color: var(--color-text);
}
.yf-showcase-main {
    grid-column: 2;
    min-width: 0;
}
.yf-header,
.yf-panel,
.yf-detail,
.yf-coverage,
.yf-info,
.yf-quote {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
}
.yf-header,
.yf-panel,
.yf-detail {
    border-radius: 12px;
    padding: 20px;
}
.yf-header {
    margin-bottom: 22px;
    padding: 22px;
    border-radius: 14px;
}
.yf-stat-grid,
.yf-quote-grid,
.yf-info-grid,
.yf-coverage-grid,
.yf-detail-body {
    display: grid;
    gap: 12px;
}
.yf-stat-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
}
.yf-stat,
.yf-info,
.yf-quote,
.yf-coverage {
    border-radius: 8px;
    padding: 14px;
}
.yf-stat {
    background: var(--color-surface-alt);
}
.yf-stat span,
.yf-muted,
.yf-section-heading p,
.yf-mini-stats dt,
.yf-meta {
    color: var(--color-text-muted);
}
.yf-stat strong {
    display: block;
    margin-top: 6px;
    color: var(--color-projects);
    font-family: var(--font-heading);
    font-size: 1.8rem;
    line-height: 1.1;
}
.yf-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 12px;
    font-size: 0.8rem;
}
.yf-notes {
    display: grid;
    gap: 6px;
    margin-top: 14px;
    color: var(--color-text-muted);
    font-size: 0.86rem;
}
.yf-stack {
    display: grid;
    gap: 16px;
}
.yf-current-section {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 14px;
    color: var(--color-text-muted);
    font-size: 0.82rem;
}
.yf-current-section span {
    font-weight: 750;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}
.yf-current-section strong {
    color: var(--color-projects);
    font-size: 1rem;
}
.yf-current-section em {
    font-style: normal;
}
.yf-section-heading {
    margin-bottom: 14px;
}
.yf-section-heading h3 {
    margin: 0;
    font-size: 1.1rem;
}
.yf-section-heading p {
    margin: 4px 0 0;
    font-size: 0.88rem;
}
.yf-quote-grid {
    grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
}
.yf-info-grid,
.yf-coverage-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.yf-info-grid.two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
.yf-quote-head,
.yf-info-head,
.yf-detail summary {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
}
.yf-symbol {
    margin: 0 0 4px;
    color: var(--color-projects);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.yf-quote h4,
.yf-info h4,
.yf-coverage h4 {
    margin: 0 0 4px;
    overflow-wrap: anywhere;
    font-size: 0.98rem;
    line-height: 1.3;
}
.yf-price {
    margin: 12px 0 10px;
    font-family: var(--font-heading);
    font-size: 1.45rem;
    font-weight: 800;
}
.yf-change,
.yf-status {
    flex-shrink: 0;
    padding: 3px 7px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 800;
}
.yf-change.positive,
.yf-status.ok {
    background: color-mix(in srgb, var(--color-pass) 18%, transparent);
    color: var(--color-pass);
}
.yf-change.negative,
.yf-status.bad {
    background: color-mix(in srgb, var(--color-fail) 16%, transparent);
    color: var(--color-fail);
}
.yf-status.warn {
    background: color-mix(in srgb, var(--color-model) 16%, transparent);
    color: var(--color-model);
}
.yf-sparkline {
    width: 100%;
    height: 42px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--color-surface-alt) 78%, transparent);
}
.yf-sparkline polyline {
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.yf-sparkline .positive {
    stroke: var(--color-pass);
}
.yf-sparkline .negative {
    stroke: var(--color-fail);
}
.yf-mini-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
    margin: 0;
    font-size: 0.78rem;
}
.yf-mini-stats dd {
    margin: 3px 0 0;
    font-weight: 700;
    overflow-wrap: anywhere;
}
.yf-table-wrap {
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: 8px;
}
.yf-table {
    width: 100%;
    min-width: 420px;
    border-collapse: collapse;
    font-size: 0.78rem;
}
.yf-table th,
.yf-table td {
    max-width: 240px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    vertical-align: top;
    overflow-wrap: anywhere;
}
.yf-table th {
    background: var(--color-surface-alt);
    color: var(--color-projects);
    font-weight: 800;
}
.yf-empty {
    padding: 16px;
    border: 1px dashed var(--color-border-strong);
    border-radius: 8px;
    color: var(--color-text-muted);
}
.yf-detail summary {
    cursor: pointer;
    list-style: none;
}
.yf-detail summary::-webkit-details-marker {
    display: none;
}
.yf-detail summary strong,
.yf-detail summary em {
    display: block;
}
.yf-detail summary em {
    color: var(--color-text-muted);
    font-size: 0.8rem;
    font-style: normal;
}
.yf-detail-body {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 16px;
}
@media (max-width: 840px) {
    .yf-showcase-main {
        grid-column: 1;
    }
    .yf-stat-grid,
    .yf-info-grid.two,
    .yf-detail-body {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (max-width: 640px) {
    .yf-header,
    .yf-panel,
    .yf-detail {
        padding: 14px;
    }
    .yf-header {
        margin-bottom: 16px;
    }
    .yf-stat-grid,
    .yf-info-grid.two,
    .yf-detail-body {
        grid-template-columns: 1fr;
    }
    .yf-quote-head,
    .yf-info-head,
    .yf-detail summary {
        flex-direction: column;
        align-items: flex-start;
    }
}
`;
