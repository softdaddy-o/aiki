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
    fit: string;
    tradeoff: string;
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

type SectionId = 'hero' | 'cases' | 'pages' | 'logic' | 'takeaway' | 'decide' | 'adopt' | 'ops' | 'compare' | 'fact';

const SECTION_PREFIX = 'pb-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'cases', label: '실행 맵', description: 'release / CRUD / hooks' },
    { id: 'pages', label: '화면 캡처', description: 'login / records / edit / public' },
    { id: 'logic', label: '로직 연결', description: 'pb_hooks + custom route' },
    { id: 'takeaway', label: '판단 요약', description: '30초 결론' },
    { id: 'decide', label: '도입 판단', description: 'USE / SKIP' },
    { id: 'adopt', label: '적용 순서', description: 'PoC에서 확장까지' },
    { id: 'ops', label: '운영 포인트', description: '메모리 / 디렉터리 / 규칙' },
    { id: 'compare', label: '비교 대상', description: '다른 backend와 차이' },
    { id: 'fact', label: '팩트 체크', description: '검증 상태' },
] as const;

const CASES: ReadonlyArray<CaseStudy> = [
    {
        id: 'release',
        label: 'Release',
        useCase: 'repo sample + single binary',
        commandTitle: 'official base runtime',
        command: `pocketbase.exe --dir .\\pb_data serve --http 127.0.0.1:18092
pocketbase.exe --dir .\\pb_data superuser upsert showcase@example.com Passw0rd!`,
        commandNote: 'README가 prebuilt executable이 `examples/base/main.go` 기반이라고 적고 있어서, 이번에는 그 sample을 새로 빌드하지 않고 공식 Windows amd64 release 자체를 실행했다.',
        outcomeTitle: '직접 확인한 출발점',
        outcome: '`/api/health`가 즉시 200을 반환했고, `/_/#/login`이 별도 셋업 없이 바로 열렸다. 첫 superuser 생성과 로그인도 같은 바이너리에서 끝났다.',
        checkTitle: '런타임 증거',
        checkItems: [
            'Windows amd64 release v0.37.2 실행',
            '`/api/health` 200 확인',
            'superuser login 성공',
            '`pb_data`, `pb_hooks`, `pb_public` 디렉터리 모두 인식',
        ],
        watchFor: [
            'pre-v1이므로 버전 pin이 운영 기본값에 가깝다',
            'single-node 전제를 먼저 받아들일 수 있어야 한다',
            '백업 대상은 결국 `pb_data`와 업로드 경로다',
        ],
        chips: ['examples/base', 'v0.37.2', 'health 200', 'single binary'],
    },
    {
        id: 'crud',
        label: 'Admin CRUD',
        useCase: 'collection and record screens',
        commandTitle: 'generated collection setup',
        command: `Collection: tasks_demo (base)
Fields: title(text, presentable), slug(text), status(text), done(bool)
Records: 2 visible rows in Admin UI`,
        commandNote: '관리 화면은 Playwright로 직접 밟았다. 운영자가 읽기 쉬운 자동 생성 리스트가 되도록 `title`을 presentable field로 바꿔 준 상태다.',
        outcomeTitle: '자동 생성 CRUD가 보인 방식',
        outcome: '레코드 리스트 화면이 `id / title / slug / status / done / created / updated` 컬럼으로 즉시 생성됐고, 행을 클릭하자 같은 스키마를 쓰는 edit drawer가 열렸다.',
        checkTitle: '화면에서 본 것',
        checkItems: [
            '`New collection`으로 base collection 생성',
            '`New Record`와 edit drawer가 자동 생성',
            '실제 레코드 2개가 리스트에 표시',
            'drawer에서 hook이 채운 `slug`와 `status` 확인',
        ],
        watchFor: [
            '`presentable` 필드 선택이 운영 UX에 바로 반영된다',
            '이번 기본 설정에선 record 접근이 superuser-only였다',
            '스키마 변경이 리스트와 drawer를 곧바로 다시 그린다',
        ],
        chips: ['Playwright', 'tasks_demo', '2 records', 'generated CRUD'],
    },
    {
        id: 'hooks',
        label: 'Hooks + Route',
        useCase: 'light business logic',
        commandTitle: 'pb_hooks + pb_public demo',
        command: `pb_hooks/main.pb.js
GET /api/demo/tasks
GET /api/demo/stats
pb_public/index.html -> fetch('/api/demo/tasks')`,
        commandNote: '이 환경엔 Go toolchain이 없어서 custom Go app 대신 PocketBase 내장 JS hook과 public directory로 가장 짧은 확장 경로를 재현했다.',
        outcomeTitle: '데이터와 로직이 실제로 묶인 방식',
        outcome: 'record create/update 시 `slug`를 title에서 다시 만들고, 비어 있는 `status`는 `draft`로 채웠다. 루트 `/`의 작은 공개 페이지는 custom route를 fetch해서 `total 2 / done 1 / draft 1`을 렌더링했다.',
        checkTitle: '연동 증거',
        checkItems: [
            '`First PocketBase Task Revised` -> `first-pocketbase-task-revised`',
            '`Admin Dashboard Review` -> `admin-dashboard-review`',
            '공개 route가 두 record와 count를 JSON으로 반환',
            '`pb_public/index.html`이 그 JSON을 바로 카드로 렌더링',
        ],
        watchFor: [
            '읽기 전용 public route부터 열고 쓰기 권한은 따로 다루는 편이 안전하다',
            'hook과 route가 커지면 custom Go app으로 올리는 편이 낫다',
            '`pb_public`은 작은 내부 표면엔 좋지만 전체 프론트엔드 대체재는 아니다',
        ],
        chips: ['pb_hooks', 'custom route', 'slug sync', 'public page'],
    },
] as const;

const PAGE_CARDS: ReadonlyArray<ScreenshotCard> = [
    {
        title: 'Superuser login',
        kicker: 'admin entry',
        body: '바이너리 첫 실행 뒤 운영자가 처음 마주치는 페이지다. email, password, Login 버튼만 있는 가장 얇은 진입점이다.',
        path: '/_/#/login',
        src: '/pocketbase/admin-login.png',
        alt: 'PocketBase superuser login screen',
        chips: ['Playwright capture', 'superuser', 'first page'],
    },
    {
        title: 'Generated records list',
        kicker: 'auto CRUD',
        body: '`tasks_demo` 스키마에서 바로 생성된 레코드 리스트다. title을 presentable로 두자 id-only 리스트가 아니라 사람이 읽는 운영 화면이 됐다.',
        path: '/_/#/collections?collection=tasks_demo',
        src: '/pocketbase/admin-records.png',
        alt: 'PocketBase tasks_demo records list',
        chips: ['generated table', '2 records', 'API preview'],
    },
    {
        title: 'Record edit drawer',
        kicker: 'auto form',
        body: '행 클릭으로 열린 edit drawer다. 별도 폼을 만들지 않아도 `title / slug / status / done`이 스키마대로 붙고, hook 결과도 같은 화면에서 바로 보였다.',
        path: 'row click -> edit drawer',
        src: '/pocketbase/admin-record-edit.png',
        alt: 'PocketBase record edit drawer',
        chips: ['generated form', 'slug filled', 'status review'],
    },
    {
        title: 'Public demo page',
        kicker: 'pb_public',
        body: '`pb_public/index.html`이 `GET /api/demo/tasks`를 fetch해 그린 작은 페이지다. Admin에서 만든 데이터가 public route를 거쳐 루트 `/`로 흘러오는 흐름을 눈으로 볼 수 있다.',
        path: '/ from pb_public/index.html',
        src: '/pocketbase/public-page.png',
        alt: 'PocketBase public demo page showing tasks_demo records',
        chips: ['fetch route', '2 records', 'stats cards'],
    },
] as const;

const LOGIC_CARDS: ReadonlyArray<CodeCard> = [
    {
        title: 'Record hook',
        kicker: 'pb_hooks/main.pb.js',
        code: `onRecordCreateRequest((e) => {
  if (e.record.getString("title")) {
    e.record.set("slug", /* slug from title */)
  }
  if (!e.record.getString("status")) {
    e.record.set("status", "draft")
  }
}, "tasks_demo")`,
        body: '별도 Node 프로세스 없이 PocketBase hook 안에서 기본 business rule을 처리했다. slug 동기화와 draft 기본값 정도는 여기서 끝낼 수 있다.',
        chips: ['create hook', 'update hook', 'draft default'],
    },
    {
        title: 'Custom route',
        kicker: 'routerAdd',
        code: `routerAdd("GET", "/api/demo/tasks", (e) => {
  let records = $app.findRecordsByFilter("tasks_demo", "1=1", "-created", 20, 0)
  return e.json(200, { items, stats })
})`,
        body: '`/api/demo/stats`는 superuser-only로 두고, `/api/demo/tasks`는 작은 public demo를 위해 읽기 전용으로 열었다. collection rule과 별개로 route 책임을 나눌 수 있다.',
        chips: ['stats route', 'public route', 'JSON'],
    },
    {
        title: 'Observed JSON',
        kicker: 'live result',
        code: `{
  "stats": { "total": 2, "done": 1, "draft": 1 },
  "items": [
    "Admin Dashboard Review",
    "First PocketBase Task Revised"
  ]
}`,
        body: '두 record와 한 번의 update 뒤 route가 돌려준 실제 값이다. admin list, edit drawer, public page가 같은 count를 공유하는지 이 응답으로 맞춰 봤다.',
        chips: ['total 2', 'done 1', 'draft 1'],
    },
] as const;

const TAKE_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'repo sample이 설명용 문서가 아니라 실제 배포 바이너리와 거의 붙어 있다.',
        body: 'README가 가리키는 `examples/base/main.go` 계열이 곧 release binary라서, sample과 실전 출발점 사이 거리가 짧다.',
    },
    {
        title: 'Admin CRUD는 collection만 잡으면 바로 운영 가능한 수준까지 나온다.',
        body: 'list, new record, edit drawer가 자동 생성되고 스키마 변경도 즉시 반영됐다. 작은 내부툴에선 이 한 가지가 제일 큰 속도 이점이다.',
    },
    {
        title: '추가 로직은 생각보다 오래 PocketBase 안에 머물 수 있다.',
        body: '`pb_hooks`와 custom route, `pb_public`만으로도 slug 동기화, 기본 상태값, 작은 읽기 전용 페이지까지는 충분히 붙었다.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '내부툴과 운영 화면',
        body: 'auth, admin, files, CRUD를 며칠 안에 같이 붙여야 하면 PocketBase가 아주 빠르다.',
        chips: ['internal tool', 'ops dashboard'],
    },
    {
        title: 'single-node MVP',
        body: '초기 제품 검증에서 collection과 admin이 먼저 나와야 하는 팀에 잘 맞는다.',
        chips: ['mvp', 'single-node'],
    },
    {
        title: 'Go 팀의 가벼운 확장',
        body: '기본 기능은 PocketBase에 맡기고 route와 rule만 조금 얹고 싶은 팀이면 무게 배분이 좋다.',
        chips: ['go path later', 'custom routes'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '분산 구조가 첫날부터 기본 전제일 때',
        body: 'multi-region과 복잡한 topology를 처음부터 깔고 가면 PocketBase의 단순함이 장점으로 남기 어렵다.',
        chips: ['distributed', 'multi-region'],
    },
    {
        title: 'managed Postgres가 핵심 요구일 때',
        body: '이미 Postgres ecosystem과 managed infra가 핵심이면 다른 선택지가 더 자연스럽다.',
        chips: ['managed db', 'postgres'],
    },
    {
        title: '버전과 파일시스템 운영을 피하고 싶을 때',
        body: 'binary version, backup, upload path, access rule을 직접 들고 가는 게 싫으면 여기서부터 부담이 커진다.',
        chips: ['backups', 'filesystem', 'version pin'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        title: '1. Start from the official runtime',
        command: 'run release binary or build examples/base',
        body: '문서를 먼저 읽기보다 공식 release나 `examples/base`를 바로 띄워서 login과 health를 보는 편이 빠르다.',
    },
    {
        title: '2. Shape collections for operators',
        command: 'create fields and pick one presentable field',
        body: '레코드 리스트가 읽을 만한 운영 화면이 되려면 사람이 읽는 대표 필드를 하나 presentable로 잡는 게 좋다.',
    },
    {
        title: '3. Add hooks and one thin route',
        command: 'pb_hooks/main.pb.js + /api/demo/*',
        body: 'draft 기본값, slug 동기화, 간단한 read-only API 정도는 여기서 끝내는 편이 제일 싸다.',
    },
    {
        title: '4. Promote to Go only when needed',
        command: 'move logic into a custom Go app',
        body: 'hook과 route가 커지거나 타입 안정성이 더 필요할 때 그제서야 custom Go app으로 올리면 된다.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '이번 lab 인스턴스의 서버 메모리는 작았다.',
        body: '`pocketbase.exe` 기준 Working Set 32.6 MB, Private 61.6 MB였고, 두 record를 넣은 `data.db`는 156 KB였다.',
        chips: ['WorkingSet 32.6 MB', 'Private 61.6 MB', 'data.db 156 KB'],
    },
    {
        title: '디렉터리 구조가 운영 경계다.',
        body: '`pb_data`는 SQLite와 내부 데이터, `pb_hooks`는 JS logic, `pb_public`은 바로 서빙되는 정적 페이지를 맡는다.',
        chips: ['pb_data', 'pb_hooks', 'pb_public'],
    },
    {
        title: '기본 rule과 pre-v1 성격을 같이 봐야 한다.',
        body: '이번 `tasks_demo`는 기본적으로 superuser 쪽 접근만 열렸고, public route는 명시적으로 따로 만들었다. 여기에 버전 pin과 backup plan을 같이 붙여야 운영이 안정된다.',
        chips: ['rules', 'pre-v1', 'backup plan'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'Supabase / Firebase',
        fit: 'hosted ecosystem과 managed service 묶음이 더 중요할 때',
        tradeoff: 'single binary와 자동 생성 admin CRUD의 즉시성은 PocketBase 쪽이 더 가볍다.',
    },
    {
        title: 'Go + chi + SQLite 직접 조합',
        fit: '모든 조각을 직접 고르고 admin도 직접 만들고 싶을 때',
        tradeoff: '초기 속도와 기본 기능 묶음은 PocketBase가 훨씬 빠르다.',
    },
    {
        title: 'PocketBase',
        fit: 'admin, auth, files, realtime, CRUD를 single-node에 빨리 올리고 싶을 때',
        tradeoff: '버전과 파일시스템, access rule 운영을 직접 가져가야 한다.',
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

                <Panel
                    id={`${SECTION_PREFIX}cases`}
                    title="실행 맵"
                    description={<>PocketBase는 repo sample, prebuilt release, admin CRUD, `pb_hooks`, `pb_public`이 한 줄로 이어지는 구조다. 이번 검증은 release binary와 Playwright, 그리고 아주 작은 public demo까지 같이 밟아 본 쪽에 가깝다. 운영 화면 쪽은 <TermHint term="presentable field" description="PocketBase가 record list에서 사람에게 먼저 보여 줄 대표 필드를 뜻한다. 이 값을 잡아 두면 id-only 리스트보다 훨씬 읽기 쉬운 admin 화면이 된다." /> 하나만 골라도 체감이 크게 달라진다.</>}
                >
                    <article className="pb-card pb-card--accent pb-overview-card">
                        <CardHeader kicker="showcase overview" title="무엇을 실제로 돌렸나" pill="repo sample first" />
                        <p>{summary}</p>
                        <div className="pb-chip-row">
                            <span>release binary</span>
                            <span>generated admin CRUD</span>
                            <span>pb_hooks + pb_public</span>
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
                            <CardHeader kicker="command" title={activeCase.commandTitle} pill={activeCase.label} />
                            <pre>{activeCase.command}</pre>
                            <p className="pb-muted-copy">{activeCase.commandNote}</p>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="outcome" title={activeCase.outcomeTitle} />
                            <p>{activeCase.outcome}</p>
                            <div className="pb-chip-row">
                                {activeCase.chips.map((chip) => (
                                    <span key={chip}>{chip}</span>
                                ))}
                            </div>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="check" title={activeCase.checkTitle} />
                            <ul className="pb-list">
                                {activeCase.checkItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="pb-card">
                            <CardHeader kicker="watch" title="도입 전에 같이 볼 것" />
                            <ul className="pb-list">
                                {activeCase.watchFor.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}pages`}
                    title="화면 캡처"
                    description={<>기본적으로 보게 되는 페이지는 superuser login, collection records, record edit drawer, 그리고 `pb_public`에서 띄운 작은 공개 페이지 네 가지였다. 아래 네 장은 모두 이번 lab 인스턴스에서 Playwright로 저장한 캡처다.</>}
                >
                    <div className="pb-shot-grid">
                        {PAGE_CARDS.map((item) => (
                            <ScreenshotPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}logic`}
                    title="로직 연결"
                    description={<>기본 CRUD는 admin에서 자동 생성되고, 추가 로직은 <TermHint term="pb_hooks" description="PocketBase가 내장한 JS hook 디렉터리다. record create/update 이벤트와 custom route를 별도 Node 서버 없이 여기에 붙일 수 있다." /> 와 custom route로 붙였다. 여기서는 `slug`와 `status`를 자동 채우고, 공개 읽기용 `/api/demo/tasks`와 count용 `/api/demo/stats`를 나눠서 봤다.</>}
                >
                    <div className="pb-logic-grid">
                        {LOGIC_CARDS.map((item) => (
                            <CodePanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="판단 요약">
                    <div className="pb-insight-grid pb-insight-grid--takeaway">
                        {TAKE_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="도입 판단">
                    <div className="pb-split-grid">
                        <section className="pb-split-panel fit">
                            <div className="pb-split-title">USE IT</div>
                            <div className="pb-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="pb-split-panel skip">
                            <div className="pb-split-title">SKIP IT</div>
                            <div className="pb-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="적용 순서">
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

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 포인트">
                    <div className="pb-insight-grid">
                        {OPS_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="비교 대상">
                    <div className="pb-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="pb-compare-card">
                                <CardHeader title={item.title} />
                                <p>
                                    <strong>잘 맞는 경우</strong>
                                    <span>{item.fit}</span>
                                </p>
                                <p>
                                    <strong>대가</strong>
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
.pb-hero-copy h1{font-size:clamp(2.3rem,5.6vw,4.8rem);line-height:.94;letter-spacing:-.03em}
.pb-hero-copy p{color:var(--color-text);font-size:clamp(1rem,1.3vw,1.12rem)}
.pb-panel{display:grid;gap:0}
.pb-panel-head{display:grid;gap:8px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid color-mix(in srgb,var(--color-border) 84%,transparent)}
.pb-panel-head h2{margin:0;font-size:1.18rem}
.pb-panel-head p{margin:0;max-width:760px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.pb-card,.pb-step-card,.pb-compare-card,.pb-shot-card,.pb-code-card{display:grid;gap:12px;padding:16px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface);min-width:0}
.pb-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.pb-overview-card{margin-bottom:16px}
.pb-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.pb-card-title{display:grid;gap:5px;min-width:0}
.pb-card-title h3{margin:0;font-size:1.04rem;line-height:1.3;word-break:keep-all}
.pb-kicker{color:var(--color-projects);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.pb-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.pb-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.pb-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
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
.pb-card pre,.pb-code-card pre,.pb-step-card code{display:block;margin:0;max-width:100%;min-width:0;overflow:auto;border-radius:12px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.pb-shot-trigger{border-radius:10px}
.pb-shot{display:block;width:100%;height:auto;border:1px solid color-mix(in srgb,var(--color-border) 88%,transparent);border-radius:10px}
.pb-path{display:block;margin:0;padding:0;background:transparent;color:var(--color-text-muted);font-size:.78rem}
.pb-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.pb-split-panel{display:grid;gap:14px;padding:18px;border-radius:18px;background:var(--color-surface-alt)}
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
