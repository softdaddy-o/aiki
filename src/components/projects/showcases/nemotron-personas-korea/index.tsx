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

type SectionId = 'hero' | 'takeaway' | 'decide' | 'map';

const SECTION_PREFIX = 'npk-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '프로젝트의 핵심 요약을 빠르게 확인합니다.' },
    { id: 'takeaway', label: 'takeaway', description: '핵심 결론과 권장 시나리오를 정리합니다.' },
    { id: 'decide', label: '도입 판단', description: 'use/skip 판단 기준을 데이터 관점에서 분류합니다.' },
    { id: 'map', label: '데이터 맵', description: '데이터 맵을 카드로 분해해 필드 구성을 표시합니다.' },
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
                    title="도입 판단"
                    description={(
                        <>
                            <span>도입 판단 기준은 </span>
                            <TermHint
                                term="schema completeness"
                                description="필수 필드 충족도, 검증 규칙, 데이터 거버넌스가 맞아야 실서비스 반영이 가능합니다."
                            />
                            <span>을 함께 확인한 뒤 USE/SKIP을 결정하세요.</span>
                        </>
                    )}
                >
                    <div className="npk-split-grid">
                        <section className="npk-split-panel">
                            <div className="npk-split-title">USE</div>
                            <div className="npk-insight-grid">
                                {USE_CARDS.map((item) => (
                                    <ShowcaseCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                        <section className="npk-split-panel npk-split-panel--skip">
                            <div className="npk-split-title">SKIP</div>
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
.npk-insight-grid {
    min-width: 0;
}

.npk-hero,
.npk-panel {
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
.npk-field-grid {
    display: grid;
    min-width: 0;
    gap: 14px;
}

.npk-take-grid,
.npk-insight-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.npk-split-grid,
.npk-map-grid {
    grid-template-columns: minmax(0, 1fr);
}

.npk-field-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.npk-card,
.npk-group-card,
.npk-field-card,
.npk-split-panel {
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

.npk-card h3 {
    margin: 0;
    font-size: 1rem;
}

.npk-card p,
.npk-field-card p {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
}

.npk-field-card__header {
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
    .npk-field-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

@media (max-width: 900px) {
    .npk-main {
        grid-column: 1;
    }
}
`;
