import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface YfinanceShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

interface ShowcaseSourceMeta {
    provider: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
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
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'universes', label: '시장 샘플', description: '지역별 자산군 샘플' },
    { id: 'batch', label: '묶음 조회', description: '여러 종목을 한 번에 확인' },
    { id: 'discovery', label: '검색 탐색', description: '검색과 스크리너 흐름' },
    { id: 'deep-dives', label: '종목 상세', description: '티커별 상세 화면' },
    { id: 'coverage', label: '기능 범위', description: '확인한 API 범위' },
] as const;

const SECTION_PREFIX = 'yf-section-';
const COLUMN_LABELS: Record<string, string> = {
    date: '날짜',
    value: '값',
    symbol: '심볼',
    shortName: '이름',
    exchange: '거래소',
    type: '유형',
    venue: '시장',
    name: '이름',
    price: '가격',
    changePercent: '등락률',
    marketState: '시장 상태',
    sector: '섹터',
    industry: '산업',
    country: '국가',
    website: '웹사이트',
    lineItem: '항목',
    current: '현재가',
    mean: '평균 목표가',
    publisher: '제공처',
    link: '링크',
    rating: '평가',
    'market weight': '비중',
    companies_count: '기업 수',
    market_cap: '시가총액',
    'ytd return': '연초 대비 수익률',
    'growth estimate': '성장 추정치',
    'last price': '최근 가격',
    'target price': '목표가',
    'Earnings Date': '실적 발표 예정일',
    stock: '주식',
    etf: 'ETF',
    currency: '통화',
    index: '지수',
};

const TEXT_LABELS: Record<string, string> = {
    demo: '데모',
    unknown: '알 수 없음',
    'Bundled sample data': '빌드에 함께 넣은 데모 데이터',
    'Demo mode keeps the page renderable without installing yfinance.': 'yfinance를 설치하지 않아도 화면을 확인할 수 있게 데모 데이터로 구성했어.',
    'Live mode generates a richer payload using the same schema.': '라이브 모드에서는 같은 구조로 더 풍부한 실제 데이터를 채워 넣어.',
    'Bundled demo payload.': '데모 데이터로 미리 채운 샘플 결과야.',
    'Korea Market': '한국 시장',
    'Bundled Korea market sample data.': '한국 시장 샘플 데이터를 묶어서 보여줘.',
    'US Equities': '미국 주식',
    'Bundled U.S. market sample data.': '미국 주식 샘플 데이터를 묶어서 보여줘.',
    Crypto: '암호화폐',
    'Bundled crypto sample data.': '암호화폐 샘플 데이터를 묶어서 보여줘.',
    'Korea large-cap': '한국 대형주 검색 샘플',
    'Samsung preview headline': '삼성전자 샘플 헤드라인',
    'Most Actives': '거래 활발 종목',
    'Demo screener payload.': '스크리너 데모 결과야.',
    'Demo market payload.': '시장 개요 데모 결과야.',
    US: '미국',
    ASIA: '아시아',
    Technology: '기술',
    Semiconductors: '반도체',
    'Demo sector payload.': '섹터 데모 설명이야.',
    'Demo industry payload.': '산업 데모 설명이야.',
    'Strong Buy': '강력 매수',
    'US Equity Deep Dive': '미국 주식 상세 보기',
    'US equity': '미국 주식',
    'Korea Equity Deep Dive': '한국 주식 상세 보기',
    'Korea equity': '한국 주식',
    'Consumer Electronics': '소비자 전자',
    'United States': '미국',
    'South Korea': '대한민국',
    'Apple sample headline': '애플 샘플 헤드라인',
    'Not applicable for this asset type.': '이 자산 유형에는 해당하지 않는 항목이야.',
    'No options chain in bundled demo mode.': '데모 모드에는 옵션 체인 샘플이 들어 있지 않아.',
    CLOSED: '마감',
    closed: '마감',
    ok: '확인됨',
    warn: '주의',
    bad: '제한',
    UNKNOWN: '유형 미확인',
    EQUITY: '주식',
    CRYPTOCURRENCY: '암호화폐',
    Search: '검색',
    Lookup: '조회',
    screen: '스크리너',
    Sector: '섹터',
    Industry: '산업',
    Market: '시장',
    'Ticker.info': 'Ticker.info 기본 정보',
    'Ticker.fast_info': 'Ticker.fast_info 빠른 요약',
    'Ticker.history': 'Ticker.history 가격 이력',
    'Tickers batch container': 'Tickers 묶음 컨테이너',
    download: 'download 일괄 다운로드',
    'Ticker.calendar': 'Ticker.calendar 일정 정보',
    'Ticker.earnings_dates': 'Ticker.earnings_dates 실적 일정',
    'Ticker.recommendations': 'Ticker.recommendations 리서치 의견',
    'Ticker.analyst_price_targets': 'Ticker.analyst_price_targets 목표가',
    'Ticker.income_stmt': 'Ticker.income_stmt 손익계산서',
    'Ticker.balance_sheet': 'Ticker.balance_sheet 대차대조표',
    'Ticker.cashflow': 'Ticker.cashflow 현금흐름표',
    'Ticker.major_holders': 'Ticker.major_holders 주요 보유자',
    'Ticker.institutional_holders': 'Ticker.institutional_holders 기관 보유',
    'Ticker.mutualfund_holders': 'Ticker.mutualfund_holders 펀드 보유',
    'Ticker.insider_transactions': 'Ticker.insider_transactions 내부자 거래',
    'Ticker.insider_purchases': 'Ticker.insider_purchases 내부자 매수',
    'Ticker.insider_roster_holders': 'Ticker.insider_roster_holders 내부자 명단',
    'Ticker.upgrades_downgrades': 'Ticker.upgrades_downgrades 투자의견 변경',
    'Ticker.sec_filings': 'Ticker.sec_filings 공시 문서',
    'Ticker.news': 'Ticker.news 뉴스 목록',
    'Ticker.options + option_chain': 'Ticker.options + option_chain 옵션 체인',
    'Ticker.funds_data': 'Ticker.funds_data 펀드 데이터',
    'WebSocket class availability': 'WebSocket 클래스 제공 여부',
    'AsyncWebSocket class availability': 'AsyncWebSocket 클래스 제공 여부',
    most_actives: '거래 활발 종목',
    technology: '기술',
    semiconductors: '반도체',
    EUROPE: '유럽',
    'Samsung Electronics': '삼성전자',
};

export default function YfinanceShowcase({ slug, title, summary, tags, sourceMeta, metricValue, license }: YfinanceShowcaseProps) {
    const [data, setData] = useState<MarketData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { activeId: activeSection, scrollToSection } = useShowcaseSectionNav({
        ids: SECTION_LABELS.map((item) => item.id),
        initialId: 'hero',
        sectionPrefix: SECTION_PREFIX,
    });

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
            ['확인한 기능', summary.featureTests],
            ['시장 묶음', summary.marketGroups],
            ['샘플 종목', summary.instrumentCount],
            ['상세 종목', summary.deepDives],
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
                onSelect={scrollToSection}
            />

            <div className="yf-showcase-main">
                <section className="yf-header" id={`${SECTION_PREFIX}hero`} aria-label="yfinance 생성 데이터 요약">
                    <div className="yf-hero-head">
                        <span className="yf-showcase-label">Interactive Showcase</span>
                    </div>
                    <div className="yf-hero-copy">
                        <h1>{title}</h1>
                        <p>{summary}</p>
                    </div>
                    <div className="yf-meta-grid">
                        <article className={`yf-meta-card yf-meta-card--source ${sourceMeta.className}`}>
                            <div className="yf-meta-mark">{sourceMeta.mark}</div>
                            <div className="yf-meta-copy">
                                <span>{sourceMeta.provider}</span>
                                <strong>{sourceMeta.path}</strong>
                            </div>
                        </article>
                        <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                        <MetaCard label="라이선스" value={license} />
                        <MetaCard label="읽는 방식" value="Sample -> Batch -> Discovery" />
                    </div>
                    {tags.length > 0 && (
                        <div className="yf-tag-row">
                            {tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                    )}
                    <div className="yf-stat-grid">
                        {stats.map(([label, value]) => (
                            <div className="yf-stat" key={label}>
                                <span>{label}</span>
                                <strong>{formatCompact(value)}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="yf-meta">
                        <span>모드: <strong>{localizeText(data.mode || 'unknown')}</strong></span>
                        <span>생성 시각: {formatDate(data.generatedAt)}</span>
                        <span>yfinance {localizeText(data.libraryVersion || 'unknown')}</span>
                    </div>
                    {data.notes && data.notes.length > 0 && (
                        <div className="yf-notes">
                            {data.notes.map((note) => <p key={note}>{localizeText(note)}</p>)}
                        </div>
                    )}
                </section>

                <div className="yf-current-section" aria-live="polite">
                    <span>지금 보는 구역</span>
                    <strong>{SECTION_LABELS.find((item) => item.id === activeSection)?.label}</strong>
                    <em>{SECTION_LABELS.find((item) => item.id === activeSection)?.description}</em>
                </div>

                <section className="yf-section-block" id={`${SECTION_PREFIX}universes`}>
                    <ShowcaseSectionLead
                        index={1}
                        title="시장 샘플"
                        description="지역별 자산군 샘플"
                    />
                    <UniversesSection groups={data.marketUniverses || []} />
                </section>
                <section className="yf-section-block" id={`${SECTION_PREFIX}batch`}>
                    <ShowcaseSectionLead
                        index={2}
                        title="묶음 조회"
                        description="여러 종목을 한 번에 확인"
                    />
                    <BatchSection batch={data.batchQuotes} bulk={data.bulkDownload} />
                </section>
                <section className="yf-section-block" id={`${SECTION_PREFIX}discovery`}>
                    <ShowcaseSectionLead
                        index={3}
                        title="검색 탐색"
                        description="검색과 스크리너 흐름"
                    />
                    <DiscoverySection
                        searchLabs={data.searchLabs || []}
                        screeners={data.screeners || []}
                        markets={data.marketOverviews || []}
                        sectorIndustry={data.sectorIndustry}
                    />
                </section>
                <section className="yf-section-block" id={`${SECTION_PREFIX}deep-dives`}>
                    <ShowcaseSectionLead
                        index={4}
                        title="종목 상세"
                        description="티커별 상세 화면"
                    />
                    <DeepDivesSection dives={data.deepDives || []} />
                </section>
                <section className="yf-section-block" id={`${SECTION_PREFIX}coverage`}>
                    <ShowcaseSectionLead
                        index={5}
                        title="기능 범위"
                        description="확인한 API 범위"
                    />
                    <CoverageSection features={data.featureCoverage || []} />
                </section>
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

function ShowcaseSectionLead({ index, title, description }: { index: number; title: string; description: string }) {
    return (
        <header className="yf-section-lead">
            <span className="yf-section-index">{String(index).padStart(2, '0')}</span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </header>
    );
}

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="yf-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function UniversesSection({ groups }: { groups: MarketUniverse[] }) {
    if (!groups.length) return <EmptyBox label="시장 샘플 데이터가 아직 없어." />;

    return (
        <div className="yf-stack">
            {groups.map((group) => (
                <section className="yf-panel" key={group.id}>
                    <SectionHeading title={localizeText(group.title)} description={localizeText(group.description)} />
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
                <SectionHeading
                    title="묶음 시세"
                    description={<>여러 <TermHint term="티커" description="종목이나 자산을 구분하는 짧은 코드야. 주식 심볼이나 코인 페어 이름을 떠올리면 돼." />를 한 번에 내려받은 결과야.</>}
                />
                <div className="yf-quote-grid">
                    {(batch?.quotes || []).map((quote) => <QuoteCard quote={quote} key={quote.symbol} />)}
                </div>
                {!(batch?.quotes || []).length && <EmptyBox label="묶음 시세 데이터가 아직 없어." />}
            </section>
            <section className="yf-panel">
                <SectionHeading
                    title="일괄 다운로드 표"
                    description={<>여러 종목을 같은 날짜 축으로 묶어 비교하는 표야.</>}
                />
                <DataTable rows={bulkRows} emptyLabel="일괄 다운로드 데이터가 아직 없어." />
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
                <SectionHeading
                    title="검색과 조회"
                    description={<>Yahoo Finance에서 종목을 찾고 비슷한 결과를 좁혀 가는 흐름이야.</>}
                />
                <div className="yf-info-grid">
                    {searchLabs.map((lab) => (
                        <article className="yf-info" key={String(lab.query)}>
                            <h4>{String(lab.query || '검색')}</h4>
                            <p className="yf-muted">{localizeText(String(lab.label || ''))}</p>
                            <DataTable rows={(lab.topResults as RecordValue[]) || []} emptyLabel="검색 결과가 아직 없어." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading
                    title="스크리너"
                    description={<>미리 정한 조건으로 종목을 추려 주는 <TermHint term="스크리너" description="가격, 거래량, 업종 같은 조건을 넣어 관심 종목 후보를 자동으로 좁혀 주는 필터야." /> 결과야.</>}
                />
                <div className="yf-info-grid">
                    {screeners.map((item) => (
                        <article className="yf-info" key={String(item.name)}>
                            <h4>{localizeText(String(item.title || item.name || '스크리너'))}</h4>
                            <p className="yf-muted">{localizeText(String(item.description || ''))}</p>
                            <DataTable rows={(item.quotes as RecordValue[]) || []} emptyLabel="스크리너 결과가 아직 없어." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading title="시장 개요" description="지역별 시장 상태를 짧게 훑어보는 구역이야." />
                <div className="yf-info-grid">
                    {markets.map((market) => (
                        <article className="yf-info" key={String(market.code)}>
                            <div className="yf-info-head">
                                <h4>{localizeText(String(market.code || '시장'))}</h4>
                                <StatusPill status={String(market.status || 'unknown')} />
                            </div>
                            <p className="yf-muted">{localizeText(String(market.message || ''))}</p>
                            <DataTable rows={(market.entries as RecordValue[]) || []} emptyLabel="시장 개요 데이터가 아직 없어." />
                        </article>
                    ))}
                </div>
            </section>

            <section className="yf-panel">
                <SectionHeading
                    title="섹터와 산업"
                    description={<>기업을 큰 주제별로 나눈 <TermHint term="섹터" description="기술, 금융처럼 넓은 산업 묶음을 뜻해. 종목 성격을 빠르게 파악할 때 자주 쓰는 분류야." />와 더 좁은 산업 분류를 같이 보여줘.</>}
                />
                <div className="yf-info-grid two">
                    <article className="yf-info">
                        <h4>{localizeText(String(sector.name || '섹터'))}</h4>
                        <p className="yf-muted">{localizeText(String((sector.overview as RecordValue | undefined)?.description || ''))}</p>
                        <DataTable rows={(sector.topCompanies as RecordValue[]) || []} emptyLabel="섹터 대표 종목 데이터가 아직 없어." />
                    </article>
                    <article className="yf-info">
                        <h4>{localizeText(String(industry.name || '산업'))}</h4>
                        <p className="yf-muted">{localizeText(String((industry.overview as RecordValue | undefined)?.description || ''))}</p>
                        <DataTable rows={(industry.topCompanies as RecordValue[]) || []} emptyLabel="산업 대표 종목 데이터가 아직 없어." />
                    </article>
                </div>
            </section>
        </div>
    );
}

function DeepDivesSection({ dives }: { dives: Array<RecordValue & { symbol?: string; title?: string; assetType?: string; quote?: Quote }> }) {
    if (!dives.length) return <EmptyBox label="종목 상세 데이터가 아직 없어." />;

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
                                <strong>{String(dive.symbol || '티커')}</strong>
                                <em>{localizeText(String(dive.title || dive.assetType || ''))}</em>
                            </span>
                            <span>{formatNumber(dive.quote?.price, dive.quote?.currency)}</span>
                        </summary>
                        <div className="yf-detail-body">
                            {dive.quote && <QuoteCard quote={dive.quote} />}
                            <InfoBlock title="핵심 정보" rows={[dive.highlights as RecordValue]} />
                            <InfoBlock title="가격 이력" rows={(dive.historyRows as RecordValue[]) || []} />
                            <InfoBlock title="손익계산서" rows={(financials.incomeStatement as RecordValue[]) || []} />
                            <InfoBlock title="대차대조표" rows={(financials.balanceSheet as RecordValue[]) || []} />
                            <InfoBlock title="현금흐름표" rows={(financials.cashflow as RecordValue[]) || []} />
                            <InfoBlock title="리서치 일정" rows={(research.earningsDates as RecordValue[]) || []} />
                            <InfoBlock title="애널리스트 목표가" rows={[research.analystTargets as RecordValue]} />
                            <InfoBlock title="기관 보유" rows={(ownership.institutionalHolders as RecordValue[]) || []} />
                            <InfoBlock title="공시" rows={(dive.filings as RecordValue[]) || []} />
                            <InfoBlock title="뉴스" rows={(dive.news as RecordValue[]) || []} />
                        </div>
                    </details>
                );
            })}
        </div>
    );
}

function CoverageSection({ features }: { features: Array<{ feature?: string; sample?: string; status?: string; note?: string }> }) {
    if (!features.length) return <EmptyBox label="기능 확인 데이터가 아직 없어." />;

    return (
        <div className="yf-coverage-grid">
            {features.map((feature) => (
                <article className="yf-coverage" key={`${feature.feature}-${feature.sample}`}>
                    <div className="yf-info-head">
                        <h4>{localizeText(feature.feature)}</h4>
                        <StatusPill status={feature.status || 'unknown'} />
                    </div>
                    <p className="yf-muted">샘플: {localizeText(feature.sample)}</p>
                    <p>{localizeText(feature.note)}</p>
                </article>
            ))}
        </div>
    );
}

function InfoBlock({ title, rows }: { title: string; rows: RecordValue[] }) {
    return (
        <section className="yf-info">
            <h4>{title}</h4>
            <DataTable rows={rows} emptyLabel={`${title} 데이터가 아직 없어.`} />
        </section>
    );
}

function SectionHeading({ title, description }: { title: string; description?: ReactNode }) {
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
                    <p className="yf-muted">{formatAssetTypeLabel(quote.assetType)} · {quote.exchange || '없음'}</p>
                </div>
                <span className={positive ? 'yf-change positive' : 'yf-change negative'}>
                    {formatPercent(quote.changePercent)}
                </span>
            </div>
            <p className="yf-price">{formatNumber(quote.price, quote.currency)}</p>
            <Sparkline values={quote.history || []} positive={positive} />
            <dl className="yf-mini-stats">
                <div><dt>전일 종가</dt><dd>{formatNumber(quote.previousClose, quote.currency)}</dd></div>
                <div><dt>당일 범위</dt><dd>{formatRange(quote.dayLow, quote.dayHigh, quote.currency)}</dd></div>
                <div><dt>52주 범위</dt><dd>{formatRange(quote.fiftyTwoWeekLow, quote.fiftyTwoWeekHigh, quote.currency)}</dd></div>
                <div><dt><TermHint term="시가총액" description="회사 전체 가치를 주가 기준으로 계산한 값이야. 규모를 비교할 때 가장 자주 보는 숫자 중 하나야." /></dt><dd>{formatCompact(quote.marketCap)}</dd></div>
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
        <svg className="yf-sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="가격 이력">
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
                    <tr>{columns.map((column) => <th key={column}>{COLUMN_LABELS[column] || column}</th>)}</tr>
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
    return <span className={`yf-status ${className}`}>{formatStatusLabel(status)}</span>;
}

function cellText(value: unknown): string {
    if (value === null || value === undefined) return '없음';
    if (Array.isArray(value)) return value.map(cellText).join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'number') return Math.abs(value) >= 100000 ? formatCompact(value) : formatNumber(value);
    return localizeText(String(value));
}

function formatNumber(value?: number | null, currency?: string): string {
    if (value === null || value === undefined || Number.isNaN(value)) return '없음';
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
    if (value === null || value === undefined || Number.isNaN(Number(value))) return '없음';
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(Number(value));
}

function formatPercent(value?: number | null): string {
    if (value === null || value === undefined || Number.isNaN(value)) return '없음';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}

function formatRange(low?: number | null, high?: number | null, currency?: string): string {
    return `${formatNumber(low, currency)} - ${formatNumber(high, currency)}`;
}

function formatDate(value?: string): string {
    if (!value) return '없음';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

function localizeText(value?: string): string {
    if (!value) return '';
    return TEXT_LABELS[value] || value;
}

function formatStatusLabel(status?: string): string {
    return localizeText(status || 'unknown');
}

function formatAssetTypeLabel(assetType?: string): string {
    return localizeText(assetType || 'UNKNOWN');
}

const showcaseCss = `
.yf-showcase {
    display: contents;
    color: var(--color-text);
}
.yf-showcase-main {
    grid-column: 2;
    grid-row: 2;
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
    min-width: 0;
}
.yf-header,
.yf-panel,
.yf-detail {
    border-radius: 12px;
    padding: 20px;
}
.yf-header {
    display: grid;
    gap: 16px;
    margin-bottom: 22px;
    padding: 22px;
    border-radius: 14px;
    background:
        linear-gradient(140deg, color-mix(in srgb, var(--color-projects) 13%, transparent), transparent 46%),
        var(--color-surface);
}
.yf-hero-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.yf-showcase-label {
    display: inline-flex;
    align-items: center;
    min-height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-projects) 14%, transparent);
    color: var(--color-projects);
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}
.yf-hero-copy {
    min-width: 0;
}
.yf-hero-copy h1 {
    margin: 0 0 10px;
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 0.98;
    letter-spacing: -0.03em;
}
.yf-hero-copy p {
    max-width: 720px;
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.7;
}
.yf-meta-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
}
.yf-meta-card {
    display: grid;
    gap: 10px;
    align-content: start;
    min-width: 0;
    padding: 14px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface-alt);
}
.yf-meta-card--source {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
}
.yf-meta-mark {
    display: inline-grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--color-projects) 14%, transparent);
    color: var(--color-projects);
    font-size: 1.1rem;
    font-weight: 900;
}
.yf-meta-copy {
    display: grid;
    gap: 4px;
    min-width: 0;
}
.yf-meta-card span,
.yf-meta-copy span {
    color: var(--color-text-muted);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}
.yf-meta-card strong,
.yf-meta-copy strong {
    overflow-wrap: anywhere;
    font-family: var(--font-heading);
    font-size: 1.02rem;
    line-height: 1.25;
}
.yf-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.yf-tag-row span {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--color-surface-alt);
    color: var(--color-text-muted);
    font-size: 0.76rem;
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
    min-width: 0;
}
.yf-section-block {
    display: grid;
    gap: 16px;
    min-width: 0;
    scroll-margin-top: 120px;
}
.yf-section-lead {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 4px 2px 0;
    min-width: 0;
}
.yf-section-lead > div {
    min-width: 0;
}
.yf-section-index {
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
.yf-section-lead h3 {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.2;
    overflow-wrap: anywhere;
}
.yf-section-lead p {
    margin: 4px 0 0;
    color: var(--color-text-muted);
    font-size: 0.86rem;
    overflow-wrap: anywhere;
}
.yf-section-block + .yf-section-block {
    margin-top: 6px;
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
    min-width: 100%;
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
        grid-row: auto;
    }
    .yf-meta-grid,
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
    .yf-meta-grid,
    .yf-stat-grid,
    .yf-info-grid.two,
    .yf-detail-body {
        grid-template-columns: minmax(0, 1fr);
    }
    .yf-table {
        min-width: 0;
        font-size: 0.75rem;
    }
    .yf-quote-head,
    .yf-info-head,
    .yf-detail summary {
        flex-direction: column;
        align-items: flex-start;
    }
}
`;
