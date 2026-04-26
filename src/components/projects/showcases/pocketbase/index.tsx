import { useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseMetaHero from '../ShowcaseMetaHero';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import ShowcaseZoomImage, { showcaseZoomImageCss } from '../ShowcaseZoomImage';
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

interface PocketBaseShowcaseProps {
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
    commandNote: string;
    outcomeTitle: string;
    outcome: string;
    checkTitle: string;
    checkItems: string[];
    watchFor: string[];
    chips: string[];
}

interface ContentCard {
    title: string;
    body: string;
    chips?: string[];
    tone?: 'accent' | 'default';
}

interface StepCard {
    title: string;
    command: string;
    body: string;
}

interface CompareCard {
    title: string;
    fit: ReactNode;
    tradeoff: ReactNode;
}

interface ScreenshotCard {
    title: string;
    kicker: string;
    body: string;
    path: string;
    src: string;
    alt: string;
    chips: string[];
}

interface CodeCard {
    title: string;
    kicker: string;
    code: string;
    body: string;
    chips?: string[];
}

type SectionId = 'hero' | 'takeaway' | 'decide' | 'cases' | 'adopt' | 'ops' | 'compare';

const SECTION_PREFIX = 'pb-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '누가 지금 붙이나' },
    { id: 'takeaway', label: '첫 판단', description: '어디서 갈리나' },
    { id: 'decide', label: '테스트 대상', description: 'go / no-go' },
    { id: 'cases', label: '검증 장면', description: '실행과 화면' },
    { id: 'adopt', label: '붙이는 순서', description: '어디까지 올리나' },
    { id: 'ops', label: '운영 전제', description: '책임과 한계' },
    { id: 'compare', label: '대안 비교', description: '출발점 차이' },
] as const;

const CASES: ReadonlyArray<CaseStudy> = [
    {
        id: 'release',
        label: 'Release',
        useCase: 'single binary',
        commandTitle: 'release 실행',
        command: `pocketbase.exe --dir .\\pb_data serve --http 127.0.0.1:18092
pocketbase.exe --dir .\\pb_data superuser upsert showcase@example.com Passw0rd!`,
        commandNote: 'README가 가리키는 prebuilt executable 흐름을 공식 Windows amd64 release로 바로 밟은 경로.',
        outcomeTitle: '확인 결과',
        outcome: '`/api/health` 200과 `/_/#/login` 오픈까지 한 번에 붙었어. repo sample에서 실전 출발선으로 넘어가는 거리가 짧아.',
        checkTitle: '검증 포인트',
        checkItems: [
            'Windows amd64 release v0.37.2 실행',
            '`/api/health` 200 확인',
            'superuser login 성공',
            '`pb_data`, `pb_hooks`, `pb_public` 디렉터리 모두 인식',
        ],
        watchFor: [
            'pre-v1이라 버전 pin과 업그레이드 순서를 먼저 잡아 두는 편',
            'single-node 전제를 먼저 받아들일 수 있는지',
            '백업 대상은 결국 `pb_data`와 업로드 경로다',
        ],
        chips: ['examples/base', 'v0.37.2', 'health 200', 'single binary'],
    },
    {
        id: 'crud',
        label: 'Admin',
        useCase: 'generated CRUD',
        commandTitle: '컬렉션 설정',
        command: `Collection: tasks_demo (base)
Fields: title(text, presentable), slug(text), status(text), done(bool)
Records: 2 visible rows in Admin UI`,
        commandNote: 'Playwright로 admin 경로를 직접 밟았어. `title`을 presentable field로 잡으니 리스트가 바로 사람 읽는 화면으로 바뀌더라.',
        outcomeTitle: '보인 화면',
        outcome: 'records list가 바로 생기고, 행을 누르면 edit drawer가 같은 스키마로 따라와. 컬렉션 한 번 잡으면 list와 form이 같이 붙어.',
        checkTitle: '확인 포인트',
        checkItems: [
            '`New collection`으로 base collection 생성',
            '`New Record`와 edit drawer가 자동 생성',
            '실제 레코드 2개가 리스트에 표시',
            'drawer에서 hook이 채운 `slug`와 `status` 확인',
        ],
        watchFor: [
            '`presentable` 필드 선택이 운영 UX에 바로 반영',
            '이번 기본 설정에선 record 접근이 superuser-only',
            '스키마 변경 뒤 리스트와 drawer가 곧바로 재렌더',
        ],
        chips: ['Playwright', 'tasks_demo', '2 records', 'generated CRUD'],
    },
    {
        id: 'hooks',
        label: 'Hook',
        useCase: 'route + public',
        commandTitle: 'hook + route',
        command: `pb_hooks/main.pb.js
GET /api/demo/tasks
GET /api/demo/stats
pb_public/index.html -> fetch('/api/demo/tasks')`,
        commandNote: 'Go toolchain 없이 PocketBase 내장 JS hook과 public directory만 써서 가장 짧은 확장 경로를 다시 만들었어.',
        outcomeTitle: '붙은 흐름',
        outcome: '`title -> slug`, 빈 `status -> draft`, 읽기 전용 route, `pb_public` 카드 렌더링까지 한 흐름으로 묶였어. 작은 내부용 화면이면 여기서 끊어도 돼.',
        checkTitle: '확인 포인트',
        checkItems: [
            '`First PocketBase Task Revised` -> `first-pocketbase-task-revised`',
            '`Admin Dashboard Review` -> `admin-dashboard-review`',
            '공개 route가 두 record와 count를 JSON으로 반환',
            '`pb_public/index.html`이 그 JSON을 바로 카드로 렌더링',
        ],
        watchFor: [
            '읽기 전용 public route부터 먼저 열고 쓰기 권한은 분리',
            'hook과 route가 커지면 custom Go app으로 승격',
            '`pb_public`은 작은 내부용 화면까지만 두고, 전체 프론트엔드 대체재로까지 보진 않는 편',
        ],
        chips: ['pb_hooks', 'custom route', 'slug sync', 'public page'],
    },
] as const;

const PAGE_CARDS: ReadonlyArray<ScreenshotCard> = [
    {
        title: 'Superuser login',
        kicker: '입구',
        body: '바이너리 첫 실행 뒤 바로 마주치는 로그인 화면. release 실행이 곧 admin 입구로 이어져.',
        path: '/_/#/login',
        src: '/pocketbase/admin-login.png',
        alt: 'PocketBase superuser login screen',
        chips: ['capture 1/4', 'Playwright', 'superuser'],
    },
    {
        title: 'Generated records list',
        kicker: '리스트',
        body: '`tasks_demo` 스키마에서 바로 나온 레코드 리스트. 두 record가 admin 화면에 어떻게 붙는지 여기서 바로 읽혀.',
        path: '/_/#/collections?collection=tasks_demo',
        src: '/pocketbase/admin-records.png',
        alt: 'PocketBase tasks_demo records list',
        chips: ['capture 2/4', '2 records', 'generated table'],
    },
    {
        title: 'Record edit drawer',
        kicker: '편집',
        body: '행을 누르면 열리는 edit drawer. 별도 폼 없이 `title / slug / status / done`이 붙고, hook이 채운 값도 같은 자리에서 보여.',
        path: 'row click -> edit drawer',
        src: '/pocketbase/admin-record-edit.png',
        alt: 'PocketBase record edit drawer',
        chips: ['capture 3/4', 'slug filled', 'status review'],
    },
    {
        title: 'Public demo page',
        kicker: '공개',
        body: '`pb_public/index.html`이 `GET /api/demo/tasks`를 fetch해 그린 작은 페이지. admin 바깥 읽기 전용 화면을 어디까지 빨리 만들 수 있는지 여기서 잡혀.',
        path: '/ from pb_public/index.html',
        src: '/pocketbase/public-page.png',
        alt: 'PocketBase public demo page showing tasks_demo records',
        chips: ['capture 4/4', '2 records', 'stats cards'],
    },
] as const;

const LOGIC_CARDS: ReadonlyArray<CodeCard> = [
    {
        title: 'Record hook',
        kicker: 'hook',
        code: `onRecordCreateRequest((e) => {
  if (e.record.getString("title")) {
    e.record.set("slug", /* slug from title */)
  }
  if (!e.record.getString("status")) {
    e.record.set("status", "draft")
  }
}, "tasks_demo")`,
        body: '별도 Node 프로세스 없이 PocketBase hook 안에서 기본 business rule 처리. slug 동기화와 draft 기본값 정도는 여기서 마감 가능.',
        chips: ['create hook', 'update hook', 'draft default'],
    },
    {
        title: 'Custom route',
        kicker: 'route',
        code: `routerAdd("GET", "/api/demo/tasks", (e) => {
  let records = $app.findRecordsByFilter("tasks_demo", "1=1", "-created", 20, 0)
  return e.json(200, { items, stats })
})`,
        body: '`/api/demo/stats`는 superuser-only, `/api/demo/tasks`는 작은 public demo용 읽기 전용 경로. collection rule과 별개로 route 책임 분리.',
        chips: ['stats route', 'public route', 'JSON'],
    },
    {
        title: 'Stats JSON',
        kicker: 'json',
        code: `{
  "stats": { "total": 2, "done": 1, "draft": 1 },
  "items": [
    "Admin Dashboard Review",
    "First PocketBase Task Revised"
  ]
}`,
        body: '두 record와 한 번의 update 뒤 route가 돌려준 실제 값. admin data와 public page가 같은 숫자를 공유하는지 확인하는 기준점.',
        chips: ['total 2', 'done 1', 'draft 1'],
    },
] as const;

const TAKE_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '무엇인가',
        body: 'embedded SQLite, admin UI, auth/files/realtime를 한 바이너리에 묶은 single-node Go 백엔드.',
    },
    {
        title: '누가 지금 테스트하나',
        body: '작은 내부툴, 운영 대시보드, single-node MVP처럼 admin 화면과 CRUD를 먼저 붙여 봐야 하는 팀.',
    },
    {
        title: '어디서 갈리나',
        body: 'managed Postgres, multi-region, 복잡한 분산 운영이 출발점이면 PocketBase에서 챙길 이점이 금방 줄어.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '내부툴',
        body: 'auth, admin, files, CRUD를 며칠 안에 같이 붙여야 할 때 제일 먼저 손이 가는 구간.',
        chips: ['internal tool', 'ops dashboard'],
    },
    {
        title: 'single-node MVP',
        body: '초기 제품 검증에서 collection과 admin이 먼저 나와야 하는 팀.',
        chips: ['mvp', 'single-node'],
    },
    {
        title: 'Go 팀',
        body: '기본 기능은 PocketBase에 맡기고 route와 rule만 얇게 얹을 계획인 팀.',
        chips: ['go path later', 'custom routes'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '분산 전제',
        body: 'multi-region과 복잡한 topology를 첫날부터 깔고 갈 팀. PocketBase의 단순함이 오래 버티기 어렵다.',
        chips: ['distributed', 'multi-region'],
    },
    {
        title: 'managed Postgres 중심',
        body: '이미 Postgres ecosystem과 managed infra가 핵심인 팀. 다른 선택지가 더 자연스럽게 이어져.',
        chips: ['managed db', 'postgres'],
    },
    {
        title: '운영 회피',
        body: 'binary version, backup, upload path, access rule을 직접 들고 가기 싫은 팀. 여기서부터 부담이 빨리 커져.',
        chips: ['backups', 'filesystem', 'version pin'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        title: '1. 바이너리 먼저',
        command: 'run release binary or build examples/base',
        body: '문서부터 길게 읽지 말고 공식 release나 `examples/base`를 바로 띄워서 login과 health부터 봐.',
    },
    {
        title: '2. 컬렉션 정리',
        command: 'create fields and pick one presentable field',
        body: '대표 필드 하나를 presentable로 잡아 두면 record list가 id-only 테이블에서 바로 벗어나.',
    },
    {
        title: '3. hook + route 추가',
        command: 'pb_hooks/main.pb.js + /api/demo/*',
        body: 'draft 기본값, slug 동기화, 간단한 read-only API 정도면 여기서 끊는 편이 싸.',
    },
    {
        title: '4. Go 승격',
        command: 'move logic into a custom Go app',
        body: 'hook과 route가 커지거나 타입 안정성이 더 필요할 때만 custom Go app으로 올려.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '메모리',
        body: '`pocketbase.exe` 기준 Working Set 32.6 MB, Private 61.6 MB. 두 record를 넣은 `data.db`는 156 KB.',
        chips: ['WorkingSet 32.6 MB', 'Private 61.6 MB', 'data.db 156 KB'],
    },
    {
        title: '디렉터리',
        body: '`pb_data`는 SQLite와 내부 데이터, `pb_hooks`는 JS logic, `pb_public`은 바로 서빙되는 정적 페이지 담당.',
        chips: ['pb_data', 'pb_hooks', 'pb_public'],
    },
    {
        title: '운영 전제',
        body: '이번 `tasks_demo`는 기본적으로 superuser 접근만 열고 public route는 따로 만들었다. 버전 pin과 backup plan도 같이 묶어 두는 편이 낫겠어.',
        chips: ['rules', 'pre-v1', 'backup plan'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'Supabase / Firebase',
        fit: (
            <>
                <a href="/ko/wiki/supabase/">Supabase</a> / Firebase처럼 auth, storage, DB를 managed
                service로 묶고 서버 운영을 줄이고 싶을 때
            </>
        ),
        tradeoff: 'PocketBase는 1개 바이너리와 자동 admin CRUD로 출발이 가볍지만, managed Postgres나 multi-region 전제로 가면 이 이점이 금방 줄어.',
    },
    {
        title: 'Go + chi + SQLite 직접 조합',
        fit: 'admin 화면까지 직접 설계하고 schema와 runtime을 코드로 세밀하게 통제하고 싶을 때',
        tradeoff: '초기 CRUD와 운영 화면은 PocketBase 쪽이 먼저 붙지만, 구조 제어를 끝까지 쥘수록 직접 조합이 더 편해질 수 있어.',
    },
    {
        title: 'PocketBase',
        fit: 'single-node 내부툴과 MVP에서 admin, auth, files, realtime을 한 번에 올리고 싶을 때',
        tradeoff: 'binary, filesystem, access rule 운영 책임은 팀이 계속 직접 안고 가야 해.',
    },
] as const;

export default function PocketBaseShowcase(props: PocketBaseShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license, slug } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="pb-showcase" data-project={slug}>
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="pb-main">
                <section className="pb-hero" id={`${SECTION_PREFIX}hero`}>
                    <ShowcaseMetaHero
                        id={`${SECTION_PREFIX}hero`}
                        className="pb-hero"
                        heroCopyClassName="pb-hero-copy"
                        metaGridClassName="pb-meta-grid"
                        metaCardClassName="pb-meta-card"
                        metaSourceCardClassName="pb-meta-card--source"
                        metaMarkClassName="pb-meta-mark"
                        metaCopyClassName="pb-meta-copy"
                        tagRowClassName="pb-tag-row"
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
                    <div className="pb-insight-grid pb-insight-grid--takeaway">
                        {TAKE_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="누가 지금 붙이나">
                    <div className="pb-split-grid">
                        <section className="pb-split-panel fit">
                            <div className="pb-split-title">먼저 테스트할 팀</div>
                            <div className="pb-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="pb-split-panel skip">
                            <div className="pb-split-title">처음부터 다른 쪽 볼 팀</div>
                            <div className="pb-insight-grid">
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
                    description={<>release 실행, 자동 CRUD, <TermHint term="pb_hooks" description="PocketBase가 내장한 JS hook 디렉터리. record create/update 이벤트와 custom route를 별도 Node 서버 없이 여기에 붙이는 구조." /> 와 custom route, `pb_public` 공개 화면을 한 흐름으로 확인했어. <TermHint term="presentable field" description="PocketBase가 record list에서 사람에게 먼저 보여 줄 대표 필드. 이 값을 잡아 두면 id-only 리스트보다 훨씬 읽기 쉬운 admin 화면." /> 하나만 잡아도 admin 화면 가독성이 바로 달라져.</>}
                >
                    <article className="pb-card pb-card--accent pb-overview-card">
                        <CardHeader kicker="범위" title="이번에 직접 확인한 흐름" pill="repo sample first" />
                        <p>{summary}</p>
                        <div className="pb-chip-row">
                            <span>health 200</span>
                            <span>login 화면</span>
                            <span>records list / drawer</span>
                            <span>public page</span>
                        </div>
                    </article>

                    <div className="pb-case-tabs" role="tablist" aria-label="PocketBase verification paths">
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

                    <div className="pb-case-grid">
                        <article className="pb-card">
                            <CardHeader kicker="실행" title={activeCase.commandTitle} pill={activeCase.label} />
                            <pre>{activeCase.command}</pre>
                            <p className="pb-muted-copy">{activeCase.commandNote}</p>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="결과" title={activeCase.outcomeTitle} />
                            <p>{activeCase.outcome}</p>
                            <div className="pb-chip-row">
                                {activeCase.chips.map((chip) => (
                                    <span key={chip}>{chip}</span>
                                ))}
                            </div>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="확인" title={activeCase.checkTitle} />
                            <ul className="pb-list">
                                {activeCase.checkItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="주의" title="갈리기 시작하는 지점" />
                            <ul className="pb-list">
                                {activeCase.watchFor.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>

                    <div className="pb-section-block">
                        <div className="pb-section-lead">
                            <h3>실행 화면</h3>
                            <p>login, records list, edit drawer, 공개 페이지까지 네 장으로 끊어 봤어.</p>
                        </div>
                        <div className="pb-shot-grid">
                            {PAGE_CARDS.map((item) => (
                                <ScreenshotPanelCard key={item.title} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="pb-section-block">
                        <div className="pb-section-lead">
                            <h3>붙여 본 확장</h3>
                            <p>`pb_hooks`, read-only route, `pb_public`이 어디까지 한 묶음으로 가는지 여기서 끊어 봤어.</p>
                        </div>
                        <div className="pb-logic-grid">
                            {LOGIC_CARDS.map((item) => (
                                <CodePanelCard key={item.title} item={item} />
                            ))}
                        </div>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="붙이는 순서">
                    <div className="pb-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="pb-step-card">
                                <CardHeader kicker="step" title={item.title} />
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 전제">
                    <div className="pb-insight-grid">
                        {OPS_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="대안 비교">
                    <div className="pb-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="pb-compare-card">
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
        <section className="pb-panel" id={id}>
            <div className="pb-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function CardHeader({ kicker, title, pill }: { kicker?: string; title: string; pill?: string }) {
    return (
        <div className="pb-card-head">
            <div className="pb-card-title">
                {kicker ? <span className="pb-kicker">{kicker}</span> : null}
                <h3>{title}</h3>
            </div>
            {pill ? <span className="pb-pill">{pill}</span> : null}
        </div>
    );
}

function ContentPanelCard({ item }: { item: ContentCard }) {
    return (
        <article className={`pb-card ${item.tone === 'accent' ? 'pb-card--accent' : ''}`.trim()}>
            <CardHeader title={item.title} />
            <p>{item.body}</p>
            {item.chips && (
                <div className="pb-chip-row">
                    {item.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

function ScreenshotPanelCard({ item }: { item: ScreenshotCard }) {
    return (
        <article className="pb-shot-card">
            <CardHeader kicker={item.kicker} title={item.title} />
            <ShowcaseZoomImage
                src={item.src}
                alt={item.alt}
                buttonClassName="pb-shot-trigger"
                imgClassName="pb-shot"
            />
            <code className="pb-path">{item.path}</code>
            <p>{item.body}</p>
            <div className="pb-chip-row">
                {item.chips.map((chip) => (
                    <span key={`${item.title}-${chip}`}>{chip}</span>
                ))}
            </div>
        </article>
    );
}

function CodePanelCard({ item }: { item: CodeCard }) {
    return (
        <article className="pb-code-card">
            <CardHeader kicker={item.kicker} title={item.title} />
            <pre>{item.code}</pre>
            <p>{item.body}</p>
            {item.chips && (
                <div className="pb-chip-row">
                    {item.chips.map((chip) => (
                        <span key={`${item.title}-${chip}`}>{chip}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

const showcaseCss = `
${showcaseZoomImageCss}
${createSharedShowcaseChromeCss({
    rootClass: 'pb-showcase',
    heroClass: 'pb-hero',
    panelClass: 'pb-panel',
    heroCopyClass: 'pb-hero-copy',
    metaGridClass: 'pb-meta-grid',
    metaCardClass: 'pb-meta-card',
    metaSourceCardClass: 'pb-meta-card--source',
    metaMarkClass: 'pb-meta-mark',
    metaCopyClass: 'pb-meta-copy',
    tagRowClass: 'pb-tag-row',
    heroCopyMaxWidth: '760px',
})}
.pb-main{grid-column:2;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.pb-hero,.pb-panel{scroll-margin-top:100px}
.pb-hero-copy h1{font-size:clamp(2.3rem,5.6vw,4.8rem);line-height:.94;letter-spacing:0}
.pb-hero-copy p{color:var(--color-text);font-size:clamp(1rem,1.3vw,1.12rem)}
.pb-panel{display:grid;gap:0}
.pb-panel-head{display:grid;gap:8px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid color-mix(in srgb,var(--color-border) 84%,transparent)}
.pb-panel-head h2{margin:0;font-size:1.18rem}
.pb-panel-head p{margin:0;max-width:760px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.pb-card,.pb-step-card,.pb-compare-card,.pb-shot-card,.pb-code-card{display:grid;gap:12px;padding:16px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface);min-width:0}
.pb-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.pb-overview-card{margin-bottom:16px}
.pb-section-block{display:grid;gap:14px;margin-top:18px}
.pb-section-lead{display:grid;gap:6px}
.pb-section-lead h3{margin:0;font-size:1rem;line-height:1.3}
.pb-section-lead p{margin:0;color:var(--color-text-muted);font-size:.9rem;line-height:1.7}
.pb-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.pb-card-title{display:grid;gap:5px;min-width:0}
.pb-card-title h3{margin:0;font-size:1.04rem;line-height:1.3;word-break:keep-all}
.pb-kicker{color:var(--color-projects);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.pb-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.pb-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.pb-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.pb-case-tabs button strong{font-size:.92rem}
.pb-case-tabs button span{color:var(--color-text-muted);font-size:.78rem}
.pb-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.pb-case-grid,.pb-shot-grid,.pb-logic-grid,.pb-insight-grid,.pb-adoption-grid,.pb-compare-grid{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.pb-insight-grid--takeaway{grid-template-columns:repeat(3,minmax(0,1fr))}
.pb-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.pb-chip-row{display:flex;flex-wrap:wrap;gap:8px}
.pb-chip-row span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.pb-list{display:grid;gap:8px;margin:0;padding-left:18px;line-height:1.68}
.pb-card p,.pb-step-card p,.pb-compare-card p span,.pb-shot-card p,.pb-code-card p{margin:0;line-height:1.7;word-break:keep-all}
.pb-muted-copy{color:var(--color-text-muted);font-size:.9rem}
.pb-card pre,.pb-code-card pre,.pb-step-card code{display:block;margin:0;max-width:100%;min-width:0;overflow:auto;border-radius:10px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.pb-shot-trigger{border-radius:10px}
.pb-shot{display:block;width:100%;height:auto;border:1px solid color-mix(in srgb,var(--color-border) 88%,transparent);border-radius:10px}
.pb-path{display:block;margin:0;padding:0;background:transparent;color:var(--color-text-muted);font-size:.78rem}
.pb-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.pb-split-panel{display:grid;gap:14px;padding:18px;border-radius:12px;background:var(--color-surface-alt)}
.pb-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.pb-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.pb-split-title{color:var(--color-projects);font-size:.82rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.pb-compare-card p{display:grid;gap:4px;margin:0}
.pb-compare-card strong{color:var(--color-text);font-size:.82rem}
.pb-compare-card span{color:var(--color-text-muted)}
@media (max-width:1200px){
  .pb-insight-grid--takeaway,.pb-adoption-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:980px){
  .pb-case-grid,.pb-shot-grid,.pb-logic-grid,.pb-insight-grid,.pb-insight-grid--takeaway,.pb-adoption-grid,.pb-compare-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:900px){
  .pb-main{grid-column:1}
}
@media (max-width:720px){
  .pb-panel-head{margin-bottom:14px}
  .pb-case-tabs button{min-width:0;width:100%}
  .pb-hero-copy h1{font-size:clamp(2rem,8vw,3.4rem)}
}
`;
