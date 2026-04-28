import { useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseMetaHero from '../ShowcaseMetaHero';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';
import { createSharedShowcaseChromeCss } from '../sharedShowcaseCss';

interface ShowcaseSourceMeta {
    provider: string;
    itemLabel: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface ActivepiecesShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

interface CaseStudy {
    id: string;
    label: string;
    useCase: string;
    commandTitle: string;
    command: string;
    commandNote: ReactNode;
    outcomeTitle: string;
    outcome: ReactNode;
    checkTitle: string;
    checkItems: string[];
    watchFor: string[];
    chips: string[];
}

interface ContentCard {
    title: string;
    body: ReactNode;
    chips?: string[];
    tone?: 'accent' | 'default';
}

interface StepCard {
    title: string;
    command: string;
    body: ReactNode;
}

interface CompareCard {
    title: string;
    fit: ReactNode;
    tradeoff: ReactNode;
}

type SectionId = 'hero' | 'takeaway' | 'decide' | 'cases' | 'adopt' | 'ops' | 'compare';

const SECTION_PREFIX = 'ap-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '자동화의 출발점' },
    { id: 'takeaway', label: '첫 판단', description: '무엇을 봐야 하나' },
    { id: 'decide', label: '도입 판단', description: '맞는 팀 / 아닌 팀' },
    { id: 'cases', label: '검증 장면', description: '흐름 / MCP / piece' },
    { id: 'adopt', label: '붙이는 순서', description: '시험에서 운영까지' },
    { id: 'ops', label: '운영 전제', description: 'DB / queue / 보안' },
    { id: 'compare', label: '대안 비교', description: 'Zapier / n8n / code' },
] as const;

const CASES: ReadonlyArray<CaseStudy> = [
    {
        id: 'flow',
        label: 'Flow',
        useCase: '업무 흐름',
        commandTitle: '기본 실행 단위',
        command: `Trigger: webhook -> new lead
Step 1: normalize fields
Step 2: AI classifies intent
Step 3: branch -> Slack alert or review queue
Output: run history + routed lead`,
        commandNote: (
            <>
                공식 문서는 flow를 trigger와 action으로 나눠. 그래서 첫 테스트도 “webhook이 들어오면
                어떤 run history가 남나”부터 보는 편이 빨라.
            </>
        ),
        outcomeTitle: '손에 잡히는 결과',
        outcome: '리드 한 건이 들어오고, AI 분류 뒤 Slack 알림이나 검토 queue로 나뉘는 장면을 보면 돼. run history에서 입력, branch, 실패한 단계가 읽히면 현업 flow로 올릴 만해.',
        checkTitle: '확인할 것',
        checkItems: [
            'trigger가 schedule, webhook, app event 중 어느 쪽인지',
            'action이 기존 piece로 끝나는지, code step이 필요한지',
            'flow versioning과 retry가 운영 방식에 맞는지',
        ],
        watchFor: [
            '긴 business logic을 no-code canvas에 계속 밀어 넣으면 추적이 어려워져',
            '승인, 지연, branch가 많으면 run history를 먼저 열어 봐야 해',
            '비개발자 수정 권한과 publish 권한을 나눌 수 있는지도 같이 봐',
        ],
        chips: ['flow builder', 'trigger', 'action', 'versioned'],
    },
    {
        id: 'mcp',
        label: 'MCP',
        useCase: 'AI 도구 연결',
        commandTitle: 'MCP 연결',
        command: `{
  "mcpServers": {
    "activepieces": {
      "url": "https://your-instance.com/mcp"
    }
  }
}`,
        commandNote: (
            <>
                <a href="/ko/wiki/mcp/">MCP</a> 문서는 Settings에서 server URL을 켜고, Claude Desktop,
                Cursor, Windsurf 같은 client에 URL을 넣는 절차를 보여 줘. 인증은 OAuth로 붙어.
            </>
        ),
        outcomeTitle: '붙이면 생기는 작업',
        outcome: 'AI assistant가 flow를 만들고, table을 다루고, run을 점검하는 데까지 들어와. 사람이 누르던 builder를 agent가 조작하므로 권한을 좁혀야 해.',
        checkTitle: '확인할 것',
        checkItems: [
            'project-scoped MCP 권한 범위',
            'connection secret이 tool 응답으로 노출되지 않는지',
            '어떤 tool category를 켜고 끌지',
        ],
        watchFor: [
            '민감한 연결 설정은 UI로 돌리고 assistant에게 secret을 넘기지 않는 구조인지',
            'agent가 flow를 publish할 수 있는 범위를 좁힐 수 있는지',
            'run retry와 실패 조회 권한이 운영 정책과 맞는지',
        ],
        chips: ['OAuth', 'project scoped', 'tool categories', 'agent ops'],
    },
    {
        id: 'piece',
        label: 'Piece',
        useCase: '앱 연결 추가',
        commandTitle: '새 piece 생성',
        command: `npm run cli pieces create
? Enter the piece name: gelato
? Enter the package name: @activepieces/piece-gelato
? Select the piece type: community`,
        commandNote: (
            <>
                piece 문서는 TypeScript package를 만들고 action과 trigger를 붙이는 길을 열어 둬.
                사내 <a href="/ko/wiki/api/">API</a>를 자주 붙이면 여기서 차이가 나.
            </>
        ),
        outcomeTitle: '개발자가 맡는 작업',
        outcome: '기본 앱 연결로 닿지 않는 API는 내부 piece로 뺄 수 있어. builder 사용자는 같은 UI에서 쓰고, 개발자는 typed package와 hot reload로 유지보수해.',
        checkTitle: '확인할 것',
        checkItems: [
            'community piece로 공유할지, custom piece로 내부에 둘지',
            'auth 방식이 secret text, OAuth, custom property 중 무엇인지',
            'action과 trigger 테스트가 로컬에서 재현되는지',
        ],
        watchFor: [
            'piece가 늘수록 versioning과 sync 정책이 중요해져',
            '외부 API rate limit과 retry 정책은 piece 안에서 따로 봐야 해',
            '간단한 HTTP 호출이면 custom piece보다 HTTP action이 더 싸',
        ],
        chips: ['TypeScript', 'npm package', 'actions', 'triggers'],
    },
    {
        id: 'docker',
        label: 'Docker',
        useCase: '서버 시험',
        commandTitle: '빠른 서버 실행',
        command: `docker run -d -p 8080:80 \\
  -v ~/.activepieces:/root/.activepieces \\
  -e AP_REDIS_TYPE=MEMORY \\
  -e AP_DB_TYPE=PGLITE \\
  -e AP_FRONTEND_URL="http://localhost:8080" \\
  activepieces/activepieces:latest`,
        commandNote: (
            <>
                Docker 문서의 단일 image 경로야. PGLite와 memory queue라서 개인 테스트용이고,
                production과 multi-instance는 Docker Compose, PostgreSQL, Redis 쪽으로 넘어가야 해.
            </>
        ),
        outcomeTitle: '운영 판단',
        outcome: '직접 띄울 수 있는지보다 어떤 저장소와 queue를 쓰는지가 먼저 갈려. 빠른 검토는 단일 image, 운영 검토는 Postgres와 Redis 기준으로 봐.',
        checkTitle: '확인할 것',
        checkItems: [
            'AP_FRONTEND_URL과 webhook URL이 외부에서 접근 가능한지',
            'PGLite + memory queue가 테스트 범위를 넘지 않는지',
            '업그레이드 전에 data directory 백업 절차가 있는지',
        ],
        watchFor: [
            'Enterprise 전환을 염두에 두면 PGLite 경로가 바로 이어지지 않아',
            'webhook이 많은 자동화는 localhost tunnel만으로 판단하지 마',
            'worker 분리, queue, DB backup이 운영 체크리스트로 올라와',
        ],
        chips: ['Docker', 'PGLite', 'memory queue', 'Postgres'],
    },
] as const;

const TAKE_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '무엇인가',
        body: (
            <>
                Zapier처럼 업무 자동화를 화면에서 만들고, 부족한 앱 연결은 TypeScript piece로 덧붙이는 오픈소스 도구.
            </>
        ),
    },
    {
        title: '어디에 맞나',
        body: '운영팀은 flow builder로 반복 업무를 묶고, 개발자는 내부 piece와 MCP 서버로 부족한 앱 연결을 채우는 팀에 잘 맞아.',
    },
    {
        title: '먼저 확인할 항목',
        body: '“자동화 SaaS 대체”보다 “비개발자 builder와 개발자용 확장을 같은 서버에 둘 수 있나”를 먼저 봐.',
        tone: 'accent',
    },
] as const;

const FIT_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '현업이 고치는 반복 업무',
        body: 'marketing, sales, support, ops flow를 현업이 직접 고치고 개발자는 guardrail과 앱 연결만 맡는 조직.',
        chips: ['no-code builder', 'run history'],
    },
    {
        title: 'AI assistant 연결',
        body: 'MCP로 assistant가 flow, table, run을 다루게 하려는 팀. agent가 어디까지 조작해도 되는지 같이 설계해야 해.',
        chips: ['MCP', 'OAuth', 'project scope'],
    },
    {
        title: '사내 API가 많은 팀',
        body: (
            <>
                기성 connector만으로 끝나지 않고 사내 <a href="/ko/wiki/api/">API</a>와 SaaS를 TypeScript piece로 계속 붙여야 하는 팀.
            </>
        ),
        chips: ['TypeScript pieces', 'internal API'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '코드로만 관리하는 자동화',
        body: '모든 workflow를 git, queue, typed code, CI 안에서만 관리해야 하면 visual builder가 오히려 관리할 화면 하나를 더 만들어.',
        chips: ['Temporal', 'custom workers'],
    },
    {
        title: '운영을 맡기고 싶은 팀',
        body: 'DB, queue, webhook, upgrade를 직접 보지 않겠다면 직접 운영하는 장점보다 운영 부담이 먼저 보여.',
        chips: ['SaaS only', 'hosted ops'],
    },
    {
        title: '엄격한 권한 분리 미완성',
        body: 'AI assistant가 자동화를 수정하기 전에 project 권한, connection 관리, publish 권한을 좁힐 준비가 필요해.',
        chips: ['governance', 'approval'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        title: '1. 작은 flow',
        command: 'trigger -> action -> run history',
        body: '자주 반복되는 수동 업무 하나를 trigger와 action으로 끝까지 태워 봐. 성공 여부는 builder 모양보다 run log가 읽히는지로 봐.',
    },
    {
        title: '2. 서버로 한번 띄우기',
        command: 'docker run ... AP_DB_TYPE=PGLITE',
        body: '단일 Docker image는 빠른 감각 확인용이야. webhook URL, data directory, upgrade backup을 같이 적어 둬.',
    },
    {
        title: '3. MCP 권한',
        command: 'Settings -> MCP Server -> client config',
        body: 'assistant에게 읽기, flow build, publish, run retry 중 어디까지 맡길지 project 단위로 나눠.',
    },
    {
        title: '4. piece 확장',
        command: 'npm run cli pieces create',
        body: '기본 연결로 부족한 API만 custom piece로 뽑아. HTTP action으로 끝나는 것은 piece로 키우지 마.',
    },
    {
        title: '5. 운영 기준',
        command: 'Docker Compose + PostgreSQL + Redis',
        body: 'production이나 multi-instance는 PGLite + memory queue가 아니라 Postgres와 Redis 기준으로 다시 산정해.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'DB와 큐',
        body: '단일 Docker 경로는 PGLite와 memory queue를 써서 테스트용에 가까워. 운영 판단은 PostgreSQL, Redis, worker 분리에서 시작해.',
        chips: ['PGLite test', 'PostgreSQL prod', 'Redis'],
    },
    {
        title: 'MCP 보안',
        body: 'MCP docs는 OAuth, project-scoped operation, secret 미노출을 전제로 둬. 이 전제가 실제 조직 권한 모델과 맞는지 확인해야 해.',
        chips: ['OAuth', 'credentials hidden', 'project scoped'],
    },
    {
        title: '라이선스 경계',
        body: 'Community Edition은 MIT로 공개되고 enterprise 기능은 commercial license로 갈라져. 직접 운영 비용만 보고 edition 경계를 놓치면 안 돼.',
        chips: ['MIT CE', 'commercial EE'],
    },
    {
        title: '내부 piece 관리',
        body: '공개 piece는 npm package와 repository source를 통해 흘러. 내부 custom piece는 build, sync, version pin 정책을 먼저 정해.',
        chips: ['npm packages', 'versioning', 'sync'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'Zapier / Make',
        fit: '서버 운영 없는 자동화와 풍부한 기성 앱 목록이 최우선일 때.',
        tradeoff: 'Activepieces는 직접 운영과 코드 확장에서 여지가 크지만 DB, queue, upgrade 책임을 팀이 더 많이 봐.',
    },
    {
        title: 'n8n',
        fit: (
            <>
                <a href="/ko/wiki/n8n/">n8n</a>처럼 직접 운영하는 자동화 도구를 보되 node-level builder와 넓은 community 생태계를 비교하고 싶을 때.
            </>
        ),
        tradeoff: 'Activepieces는 MCP와 TypeScript piece를 앞에 둔 판단 기준이 더 뚜렷해.',
    },
    {
        title: 'Temporal / custom workers',
        fit: '긴 실행, compensation, typed workflow, strict CI/CD가 제품 핵심일 때.',
        tradeoff: 'Activepieces는 현업 builder와 빠른 앱 연결 조립이 장점이야. 코드 중심 workflow engine 대체재로 보면 빗나가.',
    },
] as const;

export default function ActivepiecesShowcase(props: ActivepiecesShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license, slug } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="ap-showcase" data-project={slug}>
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="ap-main">
                <section className="ap-hero" id={`${SECTION_PREFIX}hero`}>
                    <ShowcaseMetaHero
                        id={`${SECTION_PREFIX}hero`}
                        className="ap-hero"
                        heroCopyClassName="ap-hero-copy"
                        metaGridClassName="ap-meta-grid"
                        metaCardClassName="ap-meta-card"
                        metaSourceCardClassName="ap-meta-card--source"
                        metaMarkClassName="ap-meta-mark"
                        metaCopyClassName="ap-meta-copy"
                        tagRowClassName="ap-tag-row"
                        title={title}
                        summary={summary}
                        tags={tags}
                        sourceMeta={sourceMeta}
                        metricValue={metricValue}
                        license={license}
                        renderSection={false}
                    />
                </section>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="첫 판단">
                    <div className="ap-insight-grid ap-insight-grid--takeaway">
                        {TAKE_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="누가 지금 붙이나">
                    <div className="ap-split-grid">
                        <section className="ap-split-panel fit">
                            <div className="ap-split-title">먼저 테스트할 팀</div>
                            <div className="ap-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="ap-split-panel skip">
                            <div className="ap-split-title">처음부터 다른 쪽 볼 팀</div>
                            <div className="ap-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}cases`}
                    title="검증 장면"
                    description={<>Activepieces는 <TermHint term="flow" description="trigger로 시작하고 action을 이어 붙이는 자동화 단위. run history와 versioning이 운영 판단의 핵심이야." /> 와 <TermHint term="piece" description="Activepieces 앱 연결 단위. TypeScript package로 작성되고 action, trigger, auth를 담아." /> 를 나눠 봐야 해. 여기에 <a href="/ko/wiki/mcp/">MCP</a>와 직접 운영 경로를 얹으면 팀의 책임선이 보여.</>}
                >
                    <article className="ap-card ap-card--accent ap-overview-card">
                        <CardHeader kicker="범위" title="이번 쇼케이스가 보는 네 장면" pill="문서 기준" />
                        <p>{summary}</p>
                        <div className="ap-chip-row">
                            <span>flow builder</span>
                            <span>MCP server</span>
                            <span>TypeScript pieces</span>
                            <span>직접 운영</span>
                        </div>
                    </article>

                    <div className="ap-case-tabs" role="tablist" aria-label="Activepieces verification paths">
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

                    <div className="ap-case-grid">
                        <article className="ap-card">
                            <CardHeader kicker="입력" title={activeCase.commandTitle} pill={activeCase.label} />
                            <pre>{activeCase.command}</pre>
                            <p className="ap-muted-copy">{activeCase.commandNote}</p>
                        </article>

                        <article className="ap-card">
                            <CardHeader kicker="판단" title={activeCase.outcomeTitle} />
                            <p>{activeCase.outcome}</p>
                            <div className="ap-chip-row">
                                {activeCase.chips.map((chip) => (
                                    <span key={chip}>{chip}</span>
                                ))}
                            </div>
                        </article>

                        <article className="ap-card">
                            <CardHeader kicker="확인" title={activeCase.checkTitle} />
                            <ul className="ap-list">
                                {activeCase.checkItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="ap-card">
                            <CardHeader kicker="주의" title="먼저 막히는 조건" />
                            <ul className="ap-list">
                                {activeCase.watchFor.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="붙이는 순서">
                    <div className="ap-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="ap-step-card">
                                <CardHeader kicker="step" title={item.title} />
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 전제">
                    <div className="ap-insight-grid ap-insight-grid--ops">
                        {OPS_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="대안 비교">
                    <div className="ap-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="ap-compare-card">
                                <CardHeader title={item.title} />
                                <p>
                                    <strong>갈리는 조건</strong>
                                    <span>{item.fit}</span>
                                </p>
                                <p>
                                    <strong>불리한 조건</strong>
                                    <span>{item.tradeoff}</span>
                                </p>
                            </article>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
}

function Panel({ id, title, description, children }: { id: string; title: string; description?: ReactNode; children: ReactNode }) {
    return (
        <section className="ap-panel" id={id}>
            <div className="ap-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function CardHeader({ kicker, title, pill }: { kicker?: string; title: string; pill?: string }) {
    return (
        <div className="ap-card-head">
            <div className="ap-card-title">
                {kicker ? <span className="ap-kicker">{kicker}</span> : null}
                <h3>{title}</h3>
            </div>
            {pill ? <span className="ap-pill">{pill}</span> : null}
        </div>
    );
}

function ContentPanelCard({ item }: { item: ContentCard }) {
    return (
        <article className={`ap-card ${item.tone === 'accent' ? 'ap-card--accent' : ''}`.trim()}>
            <CardHeader title={item.title} />
            <p>{item.body}</p>
            {item.chips && (
                <div className="ap-chip-row">
                    {item.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

const showcaseCss = `
${createSharedShowcaseChromeCss({
    rootClass: 'ap-showcase',
    heroClass: 'ap-hero',
    panelClass: 'ap-panel',
    heroCopyClass: 'ap-hero-copy',
    metaGridClass: 'ap-meta-grid',
    metaCardClass: 'ap-meta-card',
    metaSourceCardClass: 'ap-meta-card--source',
    metaMarkClass: 'ap-meta-mark',
    metaCopyClass: 'ap-meta-copy',
    tagRowClass: 'ap-tag-row',
    heroCopyMaxWidth: '780px',
})}
.ap-main{grid-column:2;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.ap-hero,.ap-panel{scroll-margin-top:100px}
.ap-hero-copy h1{font-size:clamp(2.3rem,5.4vw,4.7rem);line-height:.96;letter-spacing:0}
.ap-hero-copy p{color:var(--color-text);font-size:clamp(1rem,1.3vw,1.12rem)}
.ap-panel{display:grid;gap:0}
.ap-panel-head{display:grid;gap:8px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid color-mix(in srgb,var(--color-border) 84%,transparent)}
.ap-panel-head h2{margin:0;font-size:1.18rem}
.ap-panel-head p{margin:0;max-width:800px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.ap-card,.ap-step-card,.ap-compare-card{display:grid;gap:12px;padding:16px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface);min-width:0}
.ap-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.ap-overview-card{margin-bottom:16px}
.ap-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.ap-card-title{display:grid;gap:5px;min-width:0}
.ap-card-title h3{margin:0;font-size:1.04rem;line-height:1.3;word-break:keep-all}
.ap-kicker{color:var(--color-projects);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.ap-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem;white-space:nowrap}
.ap-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.ap-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.ap-case-tabs button strong{font-size:.92rem}
.ap-case-tabs button span{color:var(--color-text-muted);font-size:.78rem}
.ap-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.ap-case-grid,.ap-insight-grid,.ap-adoption-grid,.ap-compare-grid{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.ap-insight-grid--takeaway{grid-template-columns:repeat(3,minmax(0,1fr))}
.ap-insight-grid--ops{grid-template-columns:repeat(4,minmax(0,1fr))}
.ap-adoption-grid{grid-template-columns:repeat(5,minmax(0,1fr))}
.ap-chip-row{display:flex;flex-wrap:wrap;gap:8px}
.ap-chip-row span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.ap-list{display:grid;gap:8px;margin:0;padding-left:18px;line-height:1.68}
.ap-card p,.ap-step-card p,.ap-compare-card p span{margin:0;line-height:1.7;word-break:keep-all}
.ap-muted-copy{color:var(--color-text-muted);font-size:.9rem}
.ap-card pre,.ap-step-card code{display:block;margin:0;max-width:100%;min-width:0;overflow:auto;border-radius:10px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.ap-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.ap-split-panel{display:grid;gap:14px;padding:18px;border-radius:12px;background:var(--color-surface-alt)}
.ap-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.ap-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.ap-split-title{color:var(--color-projects);font-size:.82rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.ap-compare-card p{display:grid;gap:4px;margin:0}
.ap-compare-card strong{color:var(--color-text);font-size:.82rem}
.ap-compare-card span{color:var(--color-text-muted)}
@media (max-width:1240px){
  .ap-insight-grid--ops,.ap-adoption-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:980px){
  .ap-case-grid,.ap-insight-grid,.ap-insight-grid--takeaway,.ap-insight-grid--ops,.ap-adoption-grid,.ap-compare-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:900px){
  .ap-main{grid-column:1}
}
@media (max-width:720px){
  .ap-panel-head{margin-bottom:14px}
  .ap-case-tabs button{min-width:0;width:100%}
  .ap-hero-copy h1{font-size:clamp(2rem,8vw,3.4rem)}
}
`;
