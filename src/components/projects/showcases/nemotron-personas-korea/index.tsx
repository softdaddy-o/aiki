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

interface NemotronPersonasKoreaShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

interface InsightCard {
    title: string;
    body: string;
    chips?: string[];
}

interface FieldDescriptor {
    name: string;
    type: string;
    required: boolean;
    source: string;
    note: string;
}

interface FieldGroup {
    title: string;
    fields: ReadonlyArray<FieldDescriptor>;
}

interface WorldSeed {
    id: string;
    groundedSeed: string;
    fictionalAdaptation: string;
    district: string;
    adaptationNote: string;
}

interface RelationLink {
    id: string;
    from: string;
    to: string;
    arc: string;
    link: string;
}

interface SliceVariant {
    axis: string;
    variants: ReadonlyArray<string>;
    styleHint: string;
}

interface PipelineStep {
    step: string;
    action: string;
    output: string;
    styleHint: string;
}

interface LimitCard {
    title: string;
    body: string;
    boundary: string;
}

type SectionId =
    | 'hero'
    | 'takeaway'
    | 'decide'
    | 'map'
    | 'worldbuilding'
    | 'slice'
    | 'pipeline'
    | 'limits';

const SECTION_PREFIX = 'npk-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: 'Project-level framing for Korean synthetic persona operations.' },
    { id: 'takeaway', label: 'takeaway', description: 'Primary implications for synthetic workflows and governance.' },
    { id: 'decide', label: 'decide', description: 'Use/skip decision split with rollout constraints.' },
    { id: 'map', label: '데이터 맵', description: 'Data map in cards to show schema structure clearly.' },
    { id: 'worldbuilding', label: '월드빌딩 랩', description: 'Grounded seed -> fictional adaptation and relation arcs.' },
    { id: 'slice', label: '슬라이스 보드', description: 'Region / occupation / age / family-type composition board.' },
    { id: 'pipeline', label: 'pipeline', description: 'Row -> seed brief -> relation arc -> setting note -> prompt/sample style.' },
    { id: 'limits', label: '한계', description: 'Synthetic provenance and simulation-vs-observation boundaries.' },
] as const;

const TAKE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: 'Korean personas for synthetic workflows',
        body: 'Korean-first persona records are normalized into a stable schema to support deterministic synthetic generation and evaluation.',
        chips: ['Korean context', 'synthetic data', 'persona-first'],
    },
    {
        title: 'Coverage-oriented schema',
        body: 'Core attributes, metadata, and optional trait fields are grouped to support multi-step prompt and orchestration use-cases.',
        chips: ['coverage', 'orchestration', 'schema-first'],
    },
    {
        title: 'Evaluation-ready dataset design',
        body: 'The dataset layout supports reproducible checks across use-cases that require behavior-level assertions and segment diagnostics.',
        chips: ['validation', 'behavior diagnostics', 'benchmarking'],
    },
];

const USE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: 'Use for synthetic profile generation',
        body: 'Ideal when you need consistent persona signals for long prompts and scenario simulation at scale.',
        chips: ['persona synthesis', 'scenario simulation', 'agent testing'],
    },
    {
        title: 'Use for multilingual product flows',
        body: 'Blend Korean and multilingual metadata to check cross-locale behavior in retrieval, recommendation, and response generation tasks.',
        chips: ['Korean', 'multilingual', 'RAG'],
    },
    {
        title: 'Use with strict validation',
        body: 'Pair with validator rules, required-field checks, and optional-field tolerances before downstream publishing.',
        chips: ['validation', 'schema', 'governance'],
    },
];

const SKIP_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: 'Skip for sensitive PII handling',
        body: 'Avoid direct use in workflows that require explicit consent for personal profiling and retention policies.',
        chips: ['PII', 'consent', 'privacy'],
    },
    {
        title: 'Skip for unrestricted open-profile products',
        body: 'Do not use unchanged in systems with weak profile governance or broad external distribution.',
        chips: ['governance', 'access control', 'risk'],
    },
    {
        title: 'Skip for throwaway experiments',
        body: 'Use lightweight fixtures for quick hypotheses, then move to this dataset once evaluation protocol is finalized.',
        chips: ['quick test', 'pilot only', 'low-cost'],
    },
];

const WORLD_SEEDS: ReadonlyArray<WorldSeed> = [
    {
        id: 'npk-seed-seoul-office',
        groundedSeed: '서울 수도권 거주, 30대 초반, 플랫폼 직장인, 1인 가구.',
        fictionalAdaptation: '서울의 가상 자치구 "남촌-52"에서 새벽 출근 동선을 최적화하는 시뮬레이션 캐릭터로 재배치.',
        district: 'Baseline district card: 252',
        adaptationNote: '고밀도 교통-근무 패턴을 허구적 지오코드로 변환해 이동 스트레스 곡선을 제어한다.',
    },
    {
        id: 'npk-seed-busan-care',
        groundedSeed: '부산 중단거리권 거주, 20대 후반, 공공기관 직장인, 다자녀 가구 구성원.',
        fictionalAdaptation: '가상의 해안 도시 "남해면 9구" 내 24시간 돌봄 허브 운영자 배경으로 확장.',
        district: 'Baseline district card: 252',
        adaptationNote: '가족 유형 기반 돌봄 간격 토폴로지를 허구화해 시간대별 의사결정을 고정한다.',
    },
    {
        id: 'npk-seed-daegu-student',
        groundedSeed: '대구 인근 도시권 거주, 40대 초반, 파트타임 강사, 1명 자녀.',
        fictionalAdaptation: '영문구 3도 학습형 경제권의 교육 캐릭터로 전이해 수요-지출 반응성을 시뮬레이션.',
        district: 'Baseline district card: 252',
        adaptationNote: '월 단위 구매주기와 교육비 결정을 분리된 설정 레이어로 정렬한다.',
    },
];

const RELATION_LINKS: ReadonlyArray<RelationLink> = [
    {
        id: 'npk-link-seoul-busan',
        from: 'npk-seed-seoul-office',
        to: 'npk-seed-busan-care',
        arc: 'support loop',
        link: '돌봄 비용 공유 장면에서 업무 루틴으로 정보가 연결되어 소비 압박을 유도한다.',
    },
    {
        id: 'npk-link-busan-daegu',
        from: 'npk-seed-busan-care',
        to: 'npk-seed-daegu-student',
        arc: 'mobility bridge',
        link: '지역 교육 이동성 이벤트가 학습/근무 축으로 역류하며 가격 민감도를 동기화한다.',
    },
    {
        id: 'npk-link-seoul-daegu',
        from: 'npk-seed-seoul-office',
        to: 'npk-seed-daegu-student',
        arc: 'aspiration anchor',
        link: '경력·소득 프레임이 동일 장면에서 서로 다른 대체 결정을 유도한다.',
    },
];

const SLICE_VARIANTS: ReadonlyArray<SliceVariant> = [
    {
        axis: 'region',
        variants: ['수도권 중심', '부산·경남 연안권', '내륙 교육권'],
        styleHint: '지역 고유성보다 이동 패턴을 우선 축으로 지정.',
    },
    {
        axis: 'occupation',
        variants: ['정규직', '공공기관', '교육/강사'],
        styleHint: '직종은 의사결정 타이밍을 바꾸는 프롬프트 축이다.',
    },
    {
        axis: 'age',
        variants: ['20대 후반', '30대 초반', '40대 초반'],
        styleHint: '연령은 리스크 선호도와 메시지 위계를 분리한다.',
    },
    {
        axis: 'family-type',
        variants: ['1인 가구', '부부 가구', '다자녀 가구'],
        styleHint: '가족 유형은 예산·시간 제약 우선순위를 제어한다.',
    },
];

const PIPELINE_STEPS: ReadonlyArray<PipelineStep> = [
    {
        step: 'row',
        action: '원본 레코드 1건을 선택한다.',
        output: '핵심 정규화 필드(연령, 직군, 거주권, 가족형태) 추출.',
        styleHint: '구조 신호 우선',
    },
    {
        step: 'seed brief',
        action: 'grounded seed 3줄 요약을 만든다.',
        output: '세계관 이전용 seed brief 카드.',
        styleHint: '현실적 맥락 + 충돌 없는 핵심 속성',
    },
    {
        step: 'relation arc',
        action: '인접 seed를 관계 링크로 연결한다.',
        output: '관계 타입/장면 트리거/전이 규칙.',
        styleHint: '관계 기반 장면 전이 제약',
    },
    {
        step: 'setting note',
        action: '허구 배경 메모를 작성한다.',
        output: '지역, 활동지점, 시간축이 포함된 설정 레이어.',
        styleHint: '지역-연령-직군 조합 정렬',
    },
    {
        step: 'prompt/sample style',
        action: '샘플 프롬프트 스택을 구성한다.',
        output: '시뮬레이션 대화문과 테스트 케이스.',
        styleHint: '단일 톤 + 실패 모드 주석',
    },
];

const LIMIT_CARDS: ReadonlyArray<LimitCard> = [
    {
        title: 'Synthetic provenance',
        body: '모든 페르소나는 합성 데이터 구성 요소이며, 실존 개인 정보나 실제 서사와 동치되지 않는다.',
        boundary: '데이터를 실시간 개인 관찰 진실로 간주하지 않는다.',
    },
    {
        title: 'Not real-person truth',
        body: '연구/평가에선 유용하지만 특정 실재 인물의 성향 증거로 직접 단정할 수 없다.',
        boundary: '개인 신상 복원, 동의 없는 프로파일링, 재식별 추론에 사용하지 않는다.',
    },
    {
        title: 'Simulation-vs-observation',
        body: '관찰 집계는 비교 프레임일 뿐, 최종 품질 판단은 시뮬레이션 응답군에서 분리 검증한다.',
        boundary: '배포 전 샘플링 편향, 프롬프트 누수, 도메인 드리프트를 별도 점검한다.',
    },
];

const FIELD_GROUPS: ReadonlyArray<FieldGroup> = [
    {
        title: 'Identity',
        fields: [
            { name: 'persona_id', type: 'string', required: true, source: 'dataset', note: 'Global persona identifier.' },
            { name: 'dataset', type: 'string', required: true, source: 'dataset', note: 'Dataset source name for traceability.' },
            { name: 'locale', type: 'string', required: true, source: 'dataset', note: 'Locale code, e.g., ko-KR.' },
            { name: 'persona_version', type: 'string', required: true, source: 'dataset', note: 'Schema revision of persona record.' },
            { name: 'country', type: 'string', required: true, source: 'metadata', note: 'Geographic market label.' },
        ],
    },
    {
        title: 'Profile',
        fields: [
            { name: 'age_range', type: 'string', required: true, source: 'metadata', note: 'Age band of the persona.' },
            { name: 'gender', type: 'string', required: false, source: 'metadata', note: 'Gender value when available.' },
            { name: 'occupation', type: 'string', required: true, source: 'metadata', note: 'Occupation classification string.' },
            { name: 'income_band', type: 'string', required: true, source: 'metadata', note: 'Income bracket category.' },
            { name: 'education', type: 'string', required: true, source: 'metadata', note: 'Education level label.' },
            { name: 'language_primary', type: 'string', required: true, source: 'metadata', note: 'Primary language code.' },
            { name: 'language_secondary', type: 'string[]', required: false, source: 'metadata', note: 'Optional secondary language codes.' },
            { name: 'residence_type', type: 'string', required: false, source: 'metadata', note: 'Urban/rural/other residence category.' },
        ],
    },
    {
        title: 'Behavior',
        fields: [
            { name: 'personality_archetype', type: 'string', required: false, source: 'metadata', note: 'Primary persona archetype.' },
            { name: 'communication_style', type: 'string', required: false, source: 'metadata', note: 'Communication style profile.' },
            { name: 'dominant_tone', type: 'string', required: false, source: 'metadata', note: 'Default tone selected for responses.' },
            { name: 'goals', type: 'string[]', required: false, source: 'dataset', note: 'Intent and outcome goals for tasks.' },
            { name: 'interests', type: 'string[]', required: false, source: 'dataset', note: 'Interest tags for personalization tasks.' },
            { name: 'pain_points', type: 'string[]', required: false, source: 'dataset', note: 'Observed friction points in journeys.' },
            { name: 'behavior_traits', type: 'string[]', required: false, source: 'metadata', note: 'Fine-grained behavioral descriptors.' },
        ],
    },
    {
        title: 'Context',
        fields: [
            { name: 'tech_comfort', type: 'string', required: false, source: 'metadata', note: 'Technology comfort level.' },
            { name: 'privacy_sensitivity', type: 'string', required: false, source: 'metadata', note: 'Privacy preference category.' },
            { name: 'preferred_channel', type: 'string', required: false, source: 'metadata', note: 'Preferred communication channel.' },
            { name: 'time_zone', type: 'string', required: false, source: 'metadata', note: 'IANA timezone identifier.' },
            { name: 'data_quality_score', type: 'number', required: false, source: 'metadata', note: 'Quality score assigned to dataset row.' },
            { name: 'validation_status', type: 'string', required: false, source: 'metadata', note: 'Validation result state.' },
        ],
    },
];

function getSeedLabel(seedId: string): string {
    return WORLD_SEEDS.find((seed) => seed.id === seedId)?.groundedSeed ?? seedId;
}

export default function NemotronPersonasKoreaShowcase({
    slug,
    title,
    summary,
    tags,
    sourceMeta,
    metricValue,
    license,
}: NemotronPersonasKoreaShowcaseProps) {
    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="npk-showcase" data-project={slug}>
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav items={SECTIONS} activeId={activeId} onSelect={scrollToSection} />

            <div className="npk-main">
                <section className="npk-hero" id={`${SECTION_PREFIX}hero`}>
                    <ShowcaseMetaHero
                        id={`${SECTION_PREFIX}hero`}
                        className="npk-hero"
                        heroCopyClassName="npk-hero-copy"
                        metaGridClassName="npk-meta-grid"
                        metaCardClassName="npk-meta-card"
                        metaSourceCardClassName="npk-meta-card--source"
                        metaMarkClassName="npk-meta-mark"
                        metaCopyClassName="npk-meta-copy"
                        tagRowClassName="npk-tag-row"
                        title={title}
                        summary={summary}
                        tags={tags}
                        sourceMeta={sourceMeta}
                        metricValue={metricValue}
                        license={license}
                        renderSection={false}
                    />
                </section>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="takeaway">
                    <div className="npk-take-grid">
                        {TAKE_CARDS.map((item) => (
                            <ShowcaseCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}decide`}
                    title="decide"
                    description={(
                        <>
                            <span>Use/skip decision split for deployment planning. </span>
                            <TermHint
                                term="schema completeness"
                                description="When required fields are missing, synthetic flow risks become unstable and hard to validate."
                            />
                        </>
                    )}
                >
                    <div className="npk-split-grid">
                        <section className="npk-split-panel">
                            <div className="npk-split-title">use</div>
                            <div className="npk-insight-grid">
                                {USE_CARDS.map((item) => (
                                    <ShowcaseCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                        <section className="npk-split-panel npk-split-panel--skip">
                            <div className="npk-split-title">skip</div>
                            <div className="npk-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ShowcaseCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}map`} title="데이터 맵">
                    <div className="npk-map-grid">
                        {FIELD_GROUPS.map((group) => (
                            <article key={group.title} className="npk-group-card">
                                <h3>{group.title}</h3>
                                <div className="npk-field-grid">
                                    {group.fields.map((field) => (
                                        <article key={field.name} className="npk-field-card">
                                            <div className="npk-field-card__header">
                                                <span>{field.name}</span>
                                                <span>{field.type}</span>
                                            </div>
                                            <p>{field.note}</p>
                                            <div className="npk-chip-row">
                                                <span>{field.required ? 'required' : 'optional'}</span>
                                                <span>{field.source}</span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}worldbuilding`} title="월드빌딩 랩">
                    <div className="npk-world-grid">
                        {WORLD_SEEDS.map((seed) => (
                            <article key={seed.id} className="npk-card npk-world-card">
                                <span className="npk-card-kicker">grounded seed → fictional adaptation</span>
                                <h3>{seed.id}</h3>
                                <p>{seed.groundedSeed}</p>
                                <p>{seed.fictionalAdaptation}</p>
                                <div className="npk-chip-row">
                                    <span>{seed.district}</span>
                                    <span>{seed.adaptationNote}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="npk-relation-grid">
                        {RELATION_LINKS.map((link) => (
                            <article key={link.id} className="npk-card npk-relation-card">
                                <div className="npk-link-meta">
                                    <span className="npk-chip-row">
                                        <span>{link.arc}</span>
                                    </span>
                                </div>
                                <h3>{`${getSeedLabel(link.from)} → ${getSeedLabel(link.to)}`}</h3>
                                <p>{link.link}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}slice`} title="슬라이스 보드">
                    <div className="npk-slice-grid">
                        {SLICE_VARIANTS.map((slice) => (
                            <article key={slice.axis} className="npk-card">
                                <h3>{slice.axis}</h3>
                                <div className="npk-chip-row">
                                    {slice.variants.map((variant) => (
                                        <span key={variant}>{variant}</span>
                                    ))}
                                </div>
                                <p>{slice.styleHint}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}pipeline`} title="pipeline">
                    <div className="npk-pipeline-grid">
                        {PIPELINE_STEPS.map((step, index) => (
                            <article key={step.step} className="npk-card npk-step-card">
                                <div className="npk-step-meta">
                                    <span className="npk-chip-row">
                                        <span>{`Step ${index + 1}`}</span>
                                    </span>
                                    <span>{step.styleHint}</span>
                                </div>
                                <h3>{step.step}</h3>
                                <p>{step.action}</p>
                                <p>{step.output}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}limits`} title="한계">
                    <div className="npk-limits-grid">
                        {LIMIT_CARDS.map((item) => (
                            <article key={item.title} className="npk-card npk-limits-card">
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                                <p>{item.boundary}</p>
                            </article>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    );
}

function Panel({
    id,
    title,
    description,
    children,
}: {
    id: string;
    title: string;
    description?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="npk-panel" id={id}>
            <div className="npk-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function ShowcaseCard({ item }: { item: InsightCard }) {
    return (
        <article className="npk-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.chips ? (
                <div className="npk-chip-row">
                    {item.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            ) : null}
        </article>
    );
}

const showcaseCss = `
${createSharedShowcaseChromeCss({
    rootClass: 'npk-showcase',
    heroClass: 'npk-hero',
    panelClass: 'npk-panel',
    heroCopyClass: 'npk-hero-copy',
    metaGridClass: 'npk-meta-grid',
    metaCardClass: 'npk-meta-card',
    metaSourceCardClass: 'npk-meta-card--source',
    metaMarkClass: 'npk-meta-mark',
    metaCopyClass: 'npk-meta-copy',
    tagRowClass: 'npk-tag-row',
    heroCopyMaxWidth: '760px',
})}

.npk-main {
    grid-column: 2;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
}

.npk-showcase,
.npk-hero,
.npk-panel,
.npk-card,
.npk-group-card,
.npk-field-card,
.npk-field-grid,
.npk-map-grid,
.npk-take-grid,
.npk-split-grid,
.npk-insight-grid,
.npk-world-grid,
.npk-relation-grid,
.npk-slice-grid,
.npk-pipeline-grid,
.npk-limits-grid,
.npk-step-card {
    min-width: 0;
}

.npk-hero,
.npk-panel {
    border-radius: 12px;
    scroll-margin-top: 100px;
}

.npk-panel-head {
    display: grid;
    gap: 6px;
    margin-bottom: 12px;
}

.npk-panel-head h2 {
    margin: 0;
    font-size: 1.18rem;
}

.npk-panel-head p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
}

.npk-take-grid,
.npk-insight-grid,
.npk-split-grid,
.npk-map-grid,
.npk-field-grid,
.npk-world-grid,
.npk-relation-grid,
.npk-slice-grid,
.npk-pipeline-grid,
.npk-limits-grid {
    display: grid;
    min-width: 0;
    gap: 14px;
}

.npk-take-grid,
.npk-insight-grid,
.npk-world-grid,
.npk-slice-grid,
.npk-pipeline-grid,
.npk-limits-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.npk-split-grid,
.npk-map-grid,
.npk-relation-grid {
    grid-template-columns: minmax(0, 1fr);
}

.npk-field-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.npk-card,
.npk-group-card,
.npk-field-card,
.npk-split-panel,
.npk-world-card,
.npk-relation-card,
.npk-step-card,
.npk-limits-card {
    display: grid;
    gap: 10px;
    padding: 16px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
}

.npk-group-card h3 {
    margin: 0;
    font-size: 1.02rem;
}

.npk-card h3,
.npk-field-card strong {
    margin: 0;
}

.npk-card h3,
.npk-card p,
.npk-field-card p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
}

.npk-card h3 {
    color: var(--color-text);
    font-size: 1rem;
}

.npk-card-kicker {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    width: fit-content;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--color-surface-alt);
    color: var(--color-text-muted);
    font-size: 0.78rem;
}

.npk-field-card__header,
.npk-step-meta,
.npk-link-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.npk-field-card span,
.npk-chip-row span {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--color-surface-alt);
    color: var(--color-text-muted);
    font-size: 0.78rem;
}

.npk-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.npk-split-panel {
    padding: 16px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    gap: 14px;
}

.npk-split-panel--skip {
    border-color: color-mix(in srgb, var(--color-border) 88%, transparent);
}

.npk-split-title {
    color: var(--color-projects);
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

@media (max-width: 1200px) {
    .npk-take-grid,
    .npk-insight-grid,
    .npk-field-grid,
    .npk-world-grid,
    .npk-slice-grid,
    .npk-pipeline-grid,
    .npk-limits-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

@media (max-width: 900px) {
    .npk-main {
        grid-column: 1;
    }
}
`;
