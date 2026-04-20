import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface NfiShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

type SignalGroup = 'entry' | 'exit' | 'protection';
type SectionId = 'hero' | 'setup' | 'families' | 'signals' | 'operations' | 'backtest' | 'risk';

interface ShowcaseSourceMeta {
    provider: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
    itemLabel?: string;
}

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
    ['entry', '진입'],
    ['exit', '청산'],
    ['protection', '보호'],
];

const SECTION_LABELS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'setup', label: '운용 전체', description: '권장 설정과 금지 항목' },
    { id: 'families', label: '전략군', description: 'X 계열 전략 구조' },
    { id: 'signals', label: '신호', description: '진입·청산·보호 흐름' },
    { id: 'operations', label: '릴리스 / 설정', description: '업데이트와 가드 포인트' },
    { id: 'backtest', label: '백테스트', description: '검증 순서 체크리스트' },
    { id: 'risk', label: '리스크', description: '놓치기 쉬운 위험 요소' },
] as const;

const SECTION_PREFIX = 'nfi-section-';
const TEXT_LABELS: Record<string, string> = {
    'GitHub repository and official documentation': 'GitHub 저장소와 공식 문서 기준 정리',
    'curated project data': '큐레이션한 프로젝트 데이터',
    curated: '큐레이션',
    'Trading strategy for the Freqtrade crypto bot': 'Freqtrade에서 돌리는 암호화폐 자동매매 전략 모음이야.',
    Timeframe: '타임프레임',
    'Open trades': '동시 거래 수',
    'Pairlist size': '페어리스트 크기',
    Markets: '기본 마켓',
    'Leveraged tokens': '레버리지 토큰',
    required: '필수',
    recommended: '권장',
    'Base generation': '기본 세대',
    Variant: '변형 계열',
    'Current family': '현재 주력 계열',
    'Core signal structure': '핵심 신호 구조',
    'Alternative entry and exit tuning': '진입과 청산 조건을 다르게 다듬은 변형',
    'Market regime refinements': '시장 국면별 예외 처리를 더한 변형',
    'Signal selection experiments': '신호 선택 실험이 많은 변형',
    'Broader condition stack': '조건 묶음을 더 넓힌 변형',
    'Protection-heavy updates': '보호 장치를 많이 덧댄 최신 계열',
    'Newest protection and signal iteration': '보호 규칙과 신호 조정이 가장 최근까지 이어진 계열',
    baseline: '기본',
    medium: '주의',
    guarded: '보수',
    'Trend filter': '추세 필터',
    'Pullback setup': '눌림목 진입',
    'Volume confirmation': '거래량 확인',
    'Profit protection': '이익 보호',
    'Trend break': '추세 이탈',
    'Emergency loss cut': '긴급 손절',
    Cooldown: '재진입 대기',
    'Max drawdown guard': '최대 낙폭 가드',
    'Signal protection': '신호 보호',
    'Avoids entries when the broader trend context is weak.': '큰 추세가 약할 때는 진입을 줄이도록 설계했어.',
    'Looks for discounted entries inside a larger trend.': '큰 흐름 안에서 눌림이 생겼을 때 진입 후보를 찾는 방식이야.',
    'Reduces false positives from thinly traded pairs.': '거래가 적은 코인에서 나오는 헛신호를 줄이는 역할이야.',
    'Locks in gains when momentum weakens.': '상승 힘이 약해질 때 수익을 지키는 쪽으로 움직여.',
    'Exits when trend assumptions fail.': '추세 가정이 깨졌다고 판단되면 빠르게 나오는 규칙이야.',
    'Closes failed trades before losses expand.': '손실이 더 커지기 전에 포지션을 끊는 마지막 방어선이야.',
    'Prevents immediate re-entry after a trade.': '한 번 거래한 뒤 바로 다시 들어가는 과열 진입을 막아.',
    'Limits trading after portfolio-level losses.': '계좌 전체 손실이 커질 때 추가 거래를 줄이는 장치야.',
    'Recent release notes repeatedly add protection to specific X6/X7 signals.': '최근 릴리스에서 X6/X7 특정 신호에 보호 장치를 계속 추가하고 있어.',
    'Protection additions': '보호 장치 추가',
    'Latest GitHub release adds protection to many X6 and X7 signals and refreshes blacklist configs.': '최신 릴리스는 X6와 X7 신호 여러 곳에 보호 규칙을 더하고 블랙리스트 설정도 갱신했어.',
    'Strategy hardening': '전략 보강',
    'Current branch emphasizes small strategy adjustments and frequent config maintenance.': '현재 브랜치는 큰 개편보다 작은 전략 조정과 설정 유지보수에 초점이 있어.',
    'Active strategy families': '현재 운영 계열',
    'The repository exposes X6 and X7 as the most visible current-generation strategy files.': '지금 가장 눈에 띄는 주력 전략 파일은 X6와 X7 계열이야.',
    'Download test data': '테스트 데이터 내려받기',
    'Set exchange': '거래소 지정',
    'Set market type': '시장 유형 지정',
    'Set timerange': '기간 지정',
    'Run analysis': '분석 실행',
    'Official docs point to a separate historical data repository for faster local backtests.': '공식 문서는 로컬 백테스트 속도를 위해 별도 히스토리 데이터 저장소를 같이 쓰라고 안내해.',
    'Tests need an exchange context before running.': '백테스트를 돌리기 전에 어느 거래소 기준인지 먼저 정해야 해.',
    'Docs distinguish spot and futures market runs.': '문서는 현물과 선물 실행 흐름을 따로 구분해 설명해.',
    'A bounded timerange keeps comparisons reproducible.': '기간을 고정해야 결과를 다시 비교하기 쉬워져.',
    'The documented analysis script runs the target backtest suite.': '문서에 나온 분석 스크립트가 목표 백테스트 묶음을 실행해.',
    'Keeps strategy exit rules active.': '전략이 정의한 청산 규칙을 계속 켜 두는 설정이야.',
    'Allows exits that protect capital instead of only profitable exits.': '수익이 아닐 때도 자본을 지키기 위한 청산을 허용해.',
    'Matches the strategy interaction between ROI and entries.': 'ROI 규칙과 재진입 규칙이 문서 가정대로 맞물리게 해.',
    'Changing this invalidates strategy assumptions.': '이 값을 바꾸면 전략이 전제로 둔 조건이 무너질 수 있어.',
    Overfitting: '과최적화',
    'Liquidity mismatch': '유동성 불일치',
    'Leveraged token decay': '레버리지 토큰 감가',
    'Config drift': '설정 드리프트',
    high: '높음',
    'Use out-of-sample periods and avoid tuning only for a single market month.': '한 구간만 맞추지 말고, 다른 기간으로도 따로 검증해야 해.',
    'Use volume pairlists and avoid thin markets.': '거래량 기준 페어리스트를 쓰고 거래가 얇은 시장은 피하는 편이 좋아.',
    'Blacklist BULL, BEAR, UP, DOWN, and similar instruments.': 'BULL, BEAR, UP, DOWN 같은 토큰은 블랙리스트로 막는 게 안전해.',
    'Do not override required strategy variables, especially timeframe and exit flags.': '특히 타임프레임과 청산 관련 플래그는 함부로 덮어쓰지 않는 게 좋아.',
};

const INDICATOR_HINTS: Record<string, string> = {
    EMA: '최근 가격에 더 큰 비중을 주는 이동평균선이야. 짧은 추세 변화를 빨리 읽을 때 많이 써.',
    RSI: '가격이 너무 빨리 오르거나 내렸는지 보는 모멘텀 지표야.',
    MFI: '가격과 거래량을 함께 보는 자금 흐름 지표야.',
    'Bollinger Bands': '평균선 주변에 변동성 범위를 그려서 과열과 눌림을 보는 지표야.',
    Volume: '거래량이야. 신호가 얼마나 많은 참여를 동반하는지 볼 때 중요해.',
    ROI: '투자 대비 수익률이야. 일정 수익 이상이면 청산 규칙이 달라질 수 있어.',
    'Trailing stop': '가격이 오를 때 손절선도 같이 따라 올라가는 방식이야.',
    Stoploss: '손실이 일정 수준을 넘으면 자동으로 포지션을 닫는 방어 규칙이야.',
    Protection: '연속 손실이나 과도한 재진입을 막는 보호 로직 묶음이야.',
    Drawdown: '고점 대비 계좌 가치가 얼마나 내려갔는지 보는 위험 지표야.',
};

export default function NfiShowcase({ slug, title, summary, tags, sourceMeta, metricValue, license }: NfiShowcaseProps) {
    const [data, setData] = useState<NfiData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeSignalGroup, setActiveSignalGroup] = useState<SignalGroup>('entry');
    const { activeId: activeSection, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTION_LABELS.map((item) => item.id),
        initialId: 'hero',
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
            ['스타', repo.stars],
            ['포크', repo.forks],
            ['커밋', repo.commits],
            ['워처', repo.watchers],
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
                <section className="nfi-hero" id={`${SECTION_PREFIX}hero`} aria-label="NostalgiaForInfinity 저장소 요약">
                    <div className="nfi-hero-head">
                        <span className="nfi-showcase-label">Interactive Showcase</span>
                    </div>
                    <div className="nfi-hero-copy">
                        <p className="nfi-kicker">Freqtrade 전략 모음</p>
                        <h2>{data.repo?.name || 'NostalgiaForInfinity'}</h2>
                        <p>{localizeText(data.repo?.description || 'Trading strategy for the Freqtrade crypto bot')}</p>
                        <div className="nfi-link-row">
                            {data.repo?.githubUrl && (
                                <a href={data.repo.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
                            )}
                            {data.repo?.docsUrl && (
                                <a href={data.repo.docsUrl} target="_blank" rel="noreferrer">문서</a>
                            )}
                        </div>
                    </div>
                    <div className="nfi-repo-card">
                        <div className="nfi-release">
                            <span>최신 릴리스</span>
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
                            <span>{localizeText(data.mode || 'curated')}</span>
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
                    <Panel
                        title="운용 전체"
                        description={<>권장 범위와 블랙리스트 조건을 같이 보면서 <TermHint term="타임프레임" description="캔들 한 개가 몇 분 단위인지 뜻해. NFI는 5분봉 기준 가정이 강해서 다른 값으로 바꾸면 결과가 크게 달라질 수 있어." />과 <TermHint term="페어리스트" description="봇이 매매 대상으로 삼는 코인 목록이야. 너무 좁거나 유동성이 약하면 신호 품질이 흔들릴 수 있어." />를 먼저 확인해.</>}
                    >
                        <div className="nfi-rec-grid">
                            {(data.recommendations || []).map((item) => (
                                <article className="nfi-rec" key={item.label}>
                                    <span className={`nfi-status ${item.status}`}>
                                        {localizeText(item.status)}
                                    </span>
                                    <h3>{renderRecommendationLabel(item.label)}</h3>
                                    <strong>{item.value}</strong>
                                    <p>{localizeText(item.note)}</p>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}families`}>
                    <ShowcaseSectionLead index={2} title="전략군" description="저장소 루트의 X 계열 전략을 용도별로 나눠 본 구성이야." />
                    <Panel
                        title="전략군"
                        description={<>전략 세대별로 <TermHint term="리스크 성향" description="같은 전략 계열이라도 방어 규칙이 더 많은지, 신호가 더 공격적인지 구분해서 보는 기준이야." />이 어떻게 달라지는지 비교하는 구역이야.</>}
                    >
                        <div className="nfi-family-grid">
                            {(data.strategyFamilies || []).map((family) => (
                                <article className="nfi-family" key={family.name}>
                                    <div className="nfi-family-head">
                                        <h3>{family.name.replace('NostalgiaForInfinity', '')}</h3>
                                        <span>{family.timeframe}</span>
                                    </div>
                                    <p className="nfi-muted">{localizeText(family.role)}</p>
                                    <p>{localizeText(family.focus)}</p>
                                    <SignalBar value={family.signals} max={180} />
                                    <span className={`nfi-risk ${family.risk}`}>{localizeText(family.risk)}</span>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}signals`}>
                    <ShowcaseSectionLead index={3} title="신호" description="진입, 청산, 보호 신호를 묶어서 비교해." />
                    <Panel
                        title="신호 탐색"
                        description={<>진입, 청산, 보호 신호를 그룹으로 묶고 핵심 <TermHint term="지표" description="가격이나 거래량을 계산해서 만든 숫자야. 전략은 이 지표 조합으로 매매 조건을 정해." />를 같이 본다.</>}
                    >
                        <div className="nfi-tabs" role="tablist" aria-label="신호 그룹">
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
                                            <h3>{localizeText(signal.label)}</h3>
                                            <strong>{signal.weight}</strong>
                                        </div>
                                        <p>{localizeText(signal.note)}</p>
                                        <div className="nfi-chip-row">
                                            {signal.indicators.map((indicator) => renderIndicatorChip(indicator))}
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
                                        <em>{localizeText(item.theme)}</em>
                                        <p>{localizeText(item.details)}</p>
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
                                        <p>{localizeText(guard.impact)}</p>
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
                                        <h3>{localizeText(item.step)}</h3>
                                        <code>{item.command}</code>
                                        <p>{localizeText(item.reason)}</p>
                                    </article>
                                ))}
                            </div>
                    </Panel>
                </section>

                <section className="nfi-section-block" id={`${SECTION_PREFIX}risk`}>
                    <ShowcaseSectionLead index={6} title="리스크" description="자동매매 전략을 볼 때 놓치기 쉬운 위험을 분리해 뒀다." />
                    <Panel
                        title="리스크 매트릭스"
                        description={<>실전 운용 전에 <TermHint term="드로우다운" description="계좌가 고점 대비 얼마나 내려앉았는지 보는 위험 지표야. 수익률보다 먼저 체크해야 할 때가 많아." />과 설정 흔들림이 어디서 생기는지 구분해 둔 표야.</>}
                    >
                        <div className="nfi-risk-grid">
                            {(data.riskMatrix || []).map((item) => (
                                <article className="nfi-risk-card" key={item.risk}>
                                    <span className={`nfi-severity ${item.severity}`}>{localizeText(item.severity)}</span>
                                    <h3>{localizeText(item.risk)}</h3>
                                    <p>{localizeText(item.mitigation)}</p>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>

                <p className="nfi-source">출처: {localizeText(data.source || 'curated project data')} · 생성일 {formatDate(data.generatedAt)}</p>
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

function Panel({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
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
            <svg viewBox="0 0 300 170" role="img" aria-label={`${localizeText(group)} 신호 차트`}>
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
                <strong>{localizeText(group)}</strong>
                <span>샘플 트렌드 위에 신호 가중치를 올려서 보는 시각화다.</span>
            </div>
        </div>
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

function renderIndicatorChip(indicator: string) {
    const hint = INDICATOR_HINTS[indicator];
    if (!hint) return <span key={indicator}>{indicator}</span>;

    return (
        <span key={indicator}>
            <TermHint term={indicator} description={hint} />
        </span>
    );
}

function renderRecommendationLabel(label: string) {
    switch (label) {
        case 'Timeframe':
            return (
                <TermHint
                    term={localizeText(label)}
                    description="캔들 한 개가 몇 분 단위인지 뜻해. 전략이 5분봉 기준으로 짜였으면 다른 시간대로 바꾸는 순간 신호 의미가 달라질 수 있어."
                />
            );
        case 'Open trades':
            return (
                <TermHint
                    term={localizeText(label)}
                    description="한 번에 몇 개 포지션까지 열어 둘지 정하는 값이야. 너무 많이 열면 리스크가 급격히 커질 수 있어."
                />
            );
        case 'Pairlist size':
            return (
                <TermHint
                    term={localizeText(label)}
                    description="봇이 동시에 감시하는 코인 목록 크기야. 거래량이 충분한 코인만 고르는 게 중요해."
                />
            );
        case 'Markets':
            return (
                <TermHint
                    term={localizeText(label)}
                    description="전략이 주로 어느 기준 통화 마켓에서 도는지 뜻해. NFI는 스테이블 코인 마켓을 우선으로 둬."
                />
            );
        case 'Leveraged tokens':
            return (
                <TermHint
                    term={localizeText(label)}
                    description="기초 자산 움직임을 몇 배로 추종하는 토큰이야. 구조상 감가가 누적될 수 있어서 보통 제외해."
                />
            );
        default:
            return localizeText(label);
    }
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
