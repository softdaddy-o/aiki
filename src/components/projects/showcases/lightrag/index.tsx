import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface LightRagShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

type SectionId = 'hero' | 'ingest' | 'graph' | 'query' | 'deploy';

interface ShowcaseSourceMeta {
    provider: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
    itemLabel?: string;
}

interface SampleDocument {
    id: string;
    title: string;
    kind: string;
    chunks: number;
    entities: string[];
    relations: number;
    summary: string;
    excerpt: string;
}

interface GraphNode {
    id: string;
    label: string;
    type: 'project' | 'feature' | 'backend' | 'integration';
    note: string;
    links: string[];
}

interface QueryScenario {
    id: string;
    question: string;
    answer: string;
    citations: string[];
    contexts: Array<{ source: string; score: number; snippet: string }>;
    graphTrail: string[];
}

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'ingest', label: '인덱싱', description: '문서가 그래프로 바뀌는 흐름' },
    { id: 'graph', label: '그래프', description: '추출된 엔터티와 관계' },
    { id: 'query', label: '질의', description: 'citation 포함 답변 샘플' },
    { id: 'deploy', label: '운영', description: '서버, 저장소, 관측 구성' },
] as const;

const SECTION_PREFIX = 'lightrag-section-';

const SAMPLE_DOCS: SampleDocument[] = [
    {
        id: 'release',
        title: 'release-notes.md',
        kind: '릴리스 노트',
        chunks: 7,
        entities: ['LightRAG', 'citation', 'RAGAS', 'Langfuse', 'OpenSearch'],
        relations: 12,
        summary: '릴리스 변화만 모아도 기능 추가 흐름과 운영 포인트가 드러난다.',
        excerpt:
            'citation 지원, RAGAS 평가, Langfuse tracing, OpenSearch 통합처럼 운영 관점의 기능이 순차적으로 추가된다.',
    },
    {
        id: 'quickstart',
        title: 'quickstart-guide.md',
        kind: '설치 가이드',
        chunks: 5,
        entities: ['uv', 'Docker Compose', 'LightRAG Server', '.env'],
        relations: 8,
        summary: '코어 라이브러리보다 서버 경로가 먼저 눈에 들어오도록 구성돼 있다.',
        excerpt:
            'uv 또는 pip로 설치하고, 필요하면 Docker Compose와 setup wizard로 .env를 만든 뒤 서버를 띄운다.',
    },
    {
        id: 'stack',
        title: 'architecture-notes.md',
        kind: '운영 메모',
        chunks: 6,
        entities: ['PostgreSQL', 'MongoDB', 'Neo4j', 'reranker', 'mix mode'],
        relations: 10,
        summary: 'LightRAG는 그래프 추출 품질과 저장소 설계가 같이 맞물린다.',
        excerpt:
            '임베딩 차원, reranker 사용, mix mode, 스토리지 선택이 실제 질의 품질과 운영 난이도를 좌우한다.',
    },
];

const GRAPH_NODES: GraphNode[] = [
    {
        id: 'lightrag',
        label: 'LightRAG',
        type: 'project',
        note: '문서에서 엔터티·관계를 추출해 지식 그래프와 RAG 흐름을 묶는 중심 노드',
        links: ['server', 'citation', 'postgres', 'ragas'],
    },
    {
        id: 'server',
        label: 'Server + Web UI',
        type: 'feature',
        note: '문서 인덱싱, 질의, 그래프 시각화, Ollama 호환 인터페이스를 담당',
        links: ['lightrag', 'postgres', 'opensearch'],
    },
    {
        id: 'citation',
        label: 'Citation',
        type: 'feature',
        note: '답변과 함께 근거 문맥을 다시 보여 줘서 traceability를 높인다.',
        links: ['lightrag', 'ragas'],
    },
    {
        id: 'postgres',
        label: 'PostgreSQL',
        type: 'backend',
        note: '올인원 스토리지 경로 중 하나. 벡터 차원과 초기 테이블 설계가 중요하다.',
        links: ['lightrag', 'server'],
    },
    {
        id: 'opensearch',
        label: 'OpenSearch',
        type: 'backend',
        note: '최근 추가된 통합 스토리지 백엔드. 검색 계층과 운영 편의성에 맞춰 고를 수 있다.',
        links: ['server'],
    },
    {
        id: 'ragas',
        label: 'RAGAS + Langfuse',
        type: 'integration',
        note: '평가와 추적을 연결해 retrieval quality를 운영 데이터로 살피는 축',
        links: ['lightrag', 'citation'],
    },
];

const QUERY_SCENARIOS: QueryScenario[] = [
    {
        id: 'ops',
        question: 'LightRAG를 실제 서비스에 붙일 때 코어보다 서버를 먼저 보는 이유는?',
        answer:
            '공식 문서 기준으로 외부 프로젝트 통합에는 LightRAG Server의 REST API 경로가 더 적합하다. Web UI, API, 지식 그래프 탐색, Ollama 호환 인터페이스가 한 묶음으로 제공되기 때문이다.',
        citations: ['quickstart-guide.md', 'architecture-notes.md'],
        contexts: [
            {
                source: 'quickstart-guide.md',
                score: 0.93,
                snippet: 'LightRAG Server is designed to provide Web UI and API support.',
            },
            {
                source: 'architecture-notes.md',
                score: 0.88,
                snippet: 'External integration is typically better served through the REST API than direct core embedding.',
            },
        ],
        graphTrail: ['LightRAG', 'Server + Web UI', 'PostgreSQL'],
    },
    {
        id: 'quality',
        question: '질의 품질을 높이려면 어떤 운영 포인트를 먼저 점검해야 해?',
        answer:
            'README 기준으로는 임베딩 모델 고정, reranker 활성화, mix mode 기본 질의 설정이 먼저다. 그 다음에 citation과 RAGAS/Langfuse로 검색 맥락이 실제로 좋아졌는지 검증하는 흐름이 자연스럽다.',
        citations: ['release-notes.md', 'architecture-notes.md'],
        contexts: [
            {
                source: 'architecture-notes.md',
                score: 0.95,
                snippet: 'When a Reranker model is enabled, it is recommended to set the mix mode as the default query mode.',
            },
            {
                source: 'release-notes.md',
                score: 0.82,
                snippet: 'Integrated RAGAS for Evaluation and Langfuse for Tracing.',
            },
        ],
        graphTrail: ['LightRAG', 'Citation', 'RAGAS + Langfuse'],
    },
    {
        id: 'storage',
        question: '저장소를 바꿀 때 가장 조심할 점은 뭐야?',
        answer:
            '스토리지를 바꾸는 문제는 단순 연결 교체가 아니다. 특히 임베딩 차원과 초기 스키마가 엮이는 PostgreSQL 계열은 모델 교체 시 벡터 관련 테이블 재생성이 필요할 수 있어 초기 설계를 보수적으로 잡는 편이 낫다.',
        citations: ['architecture-notes.md'],
        contexts: [
            {
                source: 'architecture-notes.md',
                score: 0.91,
                snippet: 'For certain storage solutions such as PostgreSQL, vector dimension must be defined upon initial table creation.',
            },
        ],
        graphTrail: ['LightRAG', 'PostgreSQL', 'OpenSearch'],
    },
];

const STORAGE_CARDS = [
    {
        title: '서버 레이어',
        chips: ['Web UI', 'REST API', 'Ollama compatible'],
        body: '운영자는 코어 호출보다 먼저 서버 경로를 검토하는 편이 안전하다. UI, 그래프 탐색, 질의 인터페이스가 이미 묶여 있다.',
    },
    {
        title: '스토리지 레이어',
        chips: ['PostgreSQL', 'MongoDB', 'Neo4j', 'OpenSearch'],
        body: '벡터 저장, 그래프 저장, 통합 검색 성격이 다르다. 임베딩 차원과 스키마 변경 비용을 같이 봐야 한다.',
    },
    {
        title: '품질 레이어',
        chips: ['reranker', 'mix mode', 'citation'],
        body: '검색 품질은 추출 단계만으로 끝나지 않는다. reranker와 mix mode, citation 노출이 사용자 체감 품질을 좌우한다.',
    },
    {
        title: '관측 레이어',
        chips: ['RAGAS', 'Langfuse', 'token usage'],
        body: '정답률이 아니라 retrieved context와 trace를 같이 남겨야 운영 중 회귀를 잡기 쉽다.',
    },
];

export default function LightRagShowcase({ slug, title, summary, tags, sourceMeta, metricValue, license }: LightRagShowcaseProps) {
    const [activeDocId, setActiveDocId] = useState<string>(SAMPLE_DOCS[0].id);
    const [activeNodeId, setActiveNodeId] = useState<string>('lightrag');
    const [activeQueryId, setActiveQueryId] = useState<string>(QUERY_SCENARIOS[0].id);
    const [rerankerOn, setRerankerOn] = useState(true);
    const { activeId, scrollToSection } = useShowcaseSectionNav({
        ids: SECTIONS.map((item) => item.id),
        initialId: 'hero',
        sectionPrefix: SECTION_PREFIX,
    });

    const activeDoc = SAMPLE_DOCS.find((doc) => doc.id === activeDocId) ?? SAMPLE_DOCS[0];
    const activeNode = GRAPH_NODES.find((node) => node.id === activeNodeId) ?? GRAPH_NODES[0];
    const activeQuery = QUERY_SCENARIOS.find((query) => query.id === activeQueryId) ?? QUERY_SCENARIOS[0];

    const visibleContexts = useMemo(() => {
        if (rerankerOn) return activeQuery.contexts;
        return [...activeQuery.contexts].sort((left, right) => left.score - right.score);
    }, [activeQuery.contexts, rerankerOn]);

    return (
        <Shell>
            <ShowcaseSectionNav items={SECTIONS} activeId={activeId} onSelect={scrollToSection} />

            <div className="lr-main">
                <section className="lr-hero" id={`${SECTION_PREFIX}hero`}>
                    <div className="lr-hero-head">
                        <span className="lr-showcase-label">Interactive Showcase</span>
                    </div>
                    <div className="lr-hero-copy">
                        <h1>{title}</h1>
                        <p>{summary}</p>
                        <h2>샘플 문서 3개를 넣었을 때 LightRAG가 어떻게 읽는지</h2>
                        <p>
                            실제 저장소를 붙이지 않아도 인덱싱, 엔터티 추출, citation 포함 답변,
                            서버 운영 구성을 한 페이지에서 이해할 수 있게 만든 쇼케이스야.
                        </p>
                        <div className="lr-chip-row">
                            <span>{slug}</span>
                            <span>3 sample docs</span>
                            <span>27 entities</span>
                            <span>30 relations</span>
                        </div>
                    </div>
                    <div className="lr-meta-grid">
                        <article className={`lr-meta-card lr-meta-card--source ${sourceMeta.className}`}>
                            <div className="lr-meta-mark">{sourceMeta.mark}</div>
                            <div className="lr-meta-copy">
                                <span>{sourceMeta.provider}</span>
                                <strong>{sourceMeta.path}</strong>
                            </div>
                        </article>
                        <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                        <MetaCard label="라이선스" value={license} />
                        <MetaCard label="읽는 방식" value="Sample -> Graph -> Query" />
                    </div>
                    {tags.length > 0 && (
                        <div className="lr-tag-row">
                            {tags.map((tag) => <span key={tag}>{tag}</span>)}
                        </div>
                    )}
                    <div className="lr-hero-card">
                        <Stat label="문서" value="3" />
                        <Stat label="청크" value="18" />
                        <Stat label="엔터티" value="27" />
                        <Stat label="답변 근거" value="citation on" />
                    </div>
                </section>

                <section className="lr-section-block" id={`${SECTION_PREFIX}ingest`}>
                    <Panel
                        title="샘플 문서 인덱싱"
                        description={
                            <>
                                릴리스 노트, 설치 가이드, 운영 메모를 넣으면 <TermHint term="엔터티-관계 추출" description="문서 속 개체와 그 사이의 관계를 뽑아 지식 그래프를 만드는 단계야." /> 단계에서
                                어떤 노드가 살아남는지 보는 구간이야.
                            </>
                        }
                    >
                        <div className="lr-ingest-layout">
                            <div className="lr-doc-list" role="tablist" aria-label="샘플 문서">
                                {SAMPLE_DOCS.map((doc) => (
                                    <button
                                        key={doc.id}
                                        type="button"
                                        className={doc.id === activeDocId ? 'active' : ''}
                                        onClick={() => setActiveDocId(doc.id)}
                                    >
                                        <strong>{doc.title}</strong>
                                        <span>{doc.kind}</span>
                                        <em>{doc.chunks} chunks</em>
                                    </button>
                                ))}
                            </div>
                            <div className="lr-doc-detail">
                                <header>
                                    <h3>{activeDoc.title}</h3>
                                    <p>{activeDoc.summary}</p>
                                </header>
                                <blockquote>{activeDoc.excerpt}</blockquote>
                                <div className="lr-step-grid">
                                    <StepCard label="Chunking" value={`${activeDoc.chunks} blocks`} note="문장을 문맥 단위로 잘라 retriever 입력으로 정리" />
                                    <StepCard label="Entities" value={String(activeDoc.entities.length)} note="문서마다 반복 등장하는 개체만 남겨 그래프 노드 후보로 승격" />
                                    <StepCard label="Relations" value={String(activeDoc.relations)} note="기능, 저장소, 운영 항목 사이 연결을 edge로 정리" />
                                </div>
                                <div className="lr-chip-row">
                                    {activeDoc.entities.map((entity) => <span key={entity}>{entity}</span>)}
                                </div>
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="lr-section-block" id={`${SECTION_PREFIX}graph`}>
                    <Panel
                        title="추출된 지식 그래프"
                        description="문서 요약보다 중요한 건 어떤 개체들이 서로 이어지는지다. 노드를 눌러 연결된 의미를 따라가 볼 수 있다."
                    >
                        <div className="lr-graph-layout">
                            <div className="lr-node-cloud">
                                {GRAPH_NODES.map((node) => (
                                    <button
                                        key={node.id}
                                        type="button"
                                        className={`lr-node ${node.type} ${node.id === activeNodeId ? 'active' : ''}`}
                                        onClick={() => setActiveNodeId(node.id)}
                                    >
                                        {node.label}
                                    </button>
                                ))}
                            </div>
                            <div className="lr-graph-detail">
                                <h3>{activeNode.label}</h3>
                                <p>{activeNode.note}</p>
                                <div className="lr-link-grid">
                                    {activeNode.links.map((linkId) => {
                                        const linked = GRAPH_NODES.find((node) => node.id === linkId);
                                        if (!linked) return null;
                                        return (
                                            <button key={linked.id} type="button" onClick={() => setActiveNodeId(linked.id)}>
                                                <strong>{linked.label}</strong>
                                                <span>{linked.type}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="lr-section-block" id={`${SECTION_PREFIX}query`}>
                    <Panel
                        title="Citation 포함 질의 응답"
                        description={
                            <>
                                LightRAG는 답만 주는 대신, retrieved context를 다시 보여주고 <TermHint term="citation" description="답변이 어느 문맥 조각을 근거로 삼았는지 다시 연결해 보여주는 방식이야." /> 으로 추적 가능성을 높일 수 있어.
                            </>
                        }
                    >
                        <div className="lr-query-tabs" role="tablist" aria-label="질의 시나리오">
                            {QUERY_SCENARIOS.map((query) => (
                                <button
                                    key={query.id}
                                    type="button"
                                    className={query.id === activeQueryId ? 'active' : ''}
                                    onClick={() => setActiveQueryId(query.id)}
                                >
                                    {query.question}
                                </button>
                            ))}
                        </div>
                        <div className="lr-query-toolbar">
                            <span>reranker</span>
                            <button type="button" className={rerankerOn ? 'active' : ''} onClick={() => setRerankerOn((value) => !value)}>
                                {rerankerOn ? 'ON / mix mode 추천 순서' : 'OFF / raw similarity 순서'}
                            </button>
                        </div>
                        <div className="lr-query-layout">
                            <article className="lr-answer-card">
                                <span className="lr-answer-label">질문</span>
                                <h3>{activeQuery.question}</h3>
                                <p>{activeQuery.answer}</p>
                                <div className="lr-chip-row">
                                    {activeQuery.citations.map((item) => <span key={item}>{item}</span>)}
                                </div>
                                <ol className="lr-trail">
                                    {activeQuery.graphTrail.map((item) => <li key={item}>{item}</li>)}
                                </ol>
                            </article>
                            <div className="lr-context-stack">
                                {visibleContexts.map((context) => (
                                    <article key={`${context.source}-${context.score}`} className="lr-context-card">
                                        <header>
                                            <strong>{context.source}</strong>
                                            <span>{Math.round(context.score * 100)}%</span>
                                        </header>
                                        <p>{context.snippet}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="lr-section-block" id={`${SECTION_PREFIX}deploy`}>
                    <Panel
                        title="운영 스택 설계 포인트"
                        description="LightRAG는 모델 선택만의 문제가 아니다. 서버, 저장소, 관측, 품질 보정 계층을 같이 잡아야 운영이 편해진다."
                    >
                        <div className="lr-deploy-grid">
                            {STORAGE_CARDS.map((card) => (
                                <article key={card.title} className="lr-deploy-card">
                                    <h3>{card.title}</h3>
                                    <div className="lr-chip-row">
                                        {card.chips.map((chip) => <span key={chip}>{chip}</span>)}
                                    </div>
                                    <p>{card.body}</p>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>
            </div>
        </Shell>
    );
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <div className="lr-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function Panel({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
    return (
        <section className="lr-panel">
            <div className="lr-section-heading">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="lr-stat">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="lr-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function StepCard({ label, value, note }: { label: string; value: string; note: string }) {
    return (
        <article className="lr-step-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
        </article>
    );
}

const showcaseCss = `
.lr-showcase{display:contents;color:var(--color-text)}
.lr-main{grid-column:2;grid-row:2;display:grid;gap:18px;min-width:0}
.lr-hero,.lr-panel,.lr-stat,.lr-step-card,.lr-answer-card,.lr-context-card,.lr-deploy-card{border:1px solid var(--color-border);background:var(--color-surface)}
.lr-hero,.lr-panel{border-radius:12px;padding:20px}
.lr-hero{display:grid;gap:16px;background:linear-gradient(140deg,color-mix(in srgb,var(--color-projects) 13%,transparent),transparent 46%),var(--color-surface)}
.lr-hero-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.lr-showcase-label{display:inline-flex;align-items:center;min-height:30px;padding:0 12px;border-radius:999px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:.74rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.lr-hero-copy h1{margin:0 0 10px;font-size:clamp(2rem,4vw,3.2rem);line-height:.98;letter-spacing:-.03em}
.lr-hero-copy p{max-width:660px;margin:0;color:var(--color-text-muted);line-height:1.7}
.lr-hero-copy h2,.lr-hero-copy h2 + p,.lr-hero-copy .lr-chip-row{display:none}
.lr-meta-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.lr-meta-card{display:grid;gap:10px;align-content:start;min-width:0;padding:14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt)}
.lr-meta-card--source{grid-template-columns:auto minmax(0,1fr);align-items:center}
.lr-meta-mark{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:10px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:1.1rem;font-weight:900}
.lr-meta-copy{display:grid;gap:4px;min-width:0}
.lr-meta-card span,.lr-meta-copy span{color:var(--color-text-muted);font-size:.76rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.lr-meta-card strong,.lr-meta-copy strong{overflow-wrap:anywhere;font-family:var(--font-heading);font-size:1.02rem;line-height:1.25}
.lr-hero-card,.lr-step-grid,.lr-deploy-grid,.lr-query-layout,.lr-ingest-layout,.lr-graph-layout{display:grid;gap:12px}
.lr-hero-card{grid-template-columns:repeat(4,minmax(0,1fr));align-content:start}
.lr-stat,.lr-step-card,.lr-answer-card,.lr-context-card,.lr-deploy-card{border-radius:10px;padding:14px}
.lr-stat{background:var(--color-surface-alt)}
.lr-stat span,.lr-step-card span,.lr-query-toolbar span,.lr-section-heading p,.lr-context-card header span,.lr-link-grid button span{color:var(--color-text-muted)}
.lr-stat strong,.lr-step-card strong{display:block;margin-top:5px;color:var(--color-projects);font-family:var(--font-heading);font-size:1.38rem}
.lr-section-block{display:grid;gap:16px;scroll-margin-top:120px}
.lr-section-heading{margin-bottom:16px}
.lr-section-heading h2{margin:0;font-size:1.14rem}
.lr-section-heading p{margin:5px 0 0;font-size:.89rem;line-height:1.6}
.lr-ingest-layout{grid-template-columns:minmax(230px,.7fr) minmax(0,1.3fr)}
.lr-doc-list{display:grid;gap:10px}
.lr-doc-list button,.lr-link-grid button,.lr-node-cloud button,.lr-query-tabs button,.lr-query-toolbar button{font:inherit;cursor:pointer}
.lr-doc-list button{display:grid;gap:3px;padding:14px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);text-align:left}
.lr-doc-list button strong,.lr-link-grid button strong{font-size:.92rem}
.lr-doc-list button span,.lr-doc-list button em{font-size:.78rem;font-style:normal;color:var(--color-text-muted)}
.lr-doc-list button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.lr-doc-detail header h3,.lr-answer-card h3,.lr-graph-detail h3,.lr-deploy-card h3{margin:0;font-size:1rem}
.lr-doc-detail header p,.lr-step-card p,.lr-answer-card p,.lr-context-card p,.lr-graph-detail p,.lr-deploy-card p{margin:6px 0 0;color:var(--color-text-muted);font-size:.86rem;line-height:1.6}
.lr-doc-detail blockquote{margin:14px 0;padding:14px 16px;border-left:3px solid var(--color-projects);border-radius:0 8px 8px 0;background:var(--color-surface-alt);color:var(--color-text)}
.lr-step-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.lr-chip-row,.lr-tag-row{display:flex;flex-wrap:wrap;gap:8px}
.lr-chip-row{margin-top:14px}
.lr-chip-row span,.lr-tag-row span{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.78rem}
.lr-graph-layout{grid-template-columns:minmax(0,1fr) minmax(280px,.8fr)}
.lr-node-cloud{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start;padding:6px 0}
.lr-node{padding:10px 12px;border:1px solid var(--color-border);border-radius:12px;background:var(--color-surface-alt);color:var(--color-text)}
.lr-node.project,.lr-node.active{border-color:var(--color-projects)}
.lr-node.feature.active{background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.lr-node.backend.active{background:color-mix(in srgb,var(--color-wiki-framework) 14%,var(--color-surface))}
.lr-node.integration.active{background:color-mix(in srgb,var(--color-model) 14%,var(--color-surface))}
.lr-graph-detail{display:grid;gap:14px;padding:16px;border-radius:10px;background:var(--color-surface-alt)}
.lr-link-grid{display:grid;gap:10px}
.lr-link-grid button{display:grid;gap:2px;padding:12px;border:1px solid var(--color-border);border-radius:8px;background:var(--color-surface);text-align:left}
.lr-query-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.lr-query-tabs button,.lr-query-toolbar button{padding:10px 12px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface-alt);text-align:left}
.lr-query-tabs button.active,.lr-query-toolbar button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 10%,var(--color-surface))}
.lr-query-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.lr-query-layout{grid-template-columns:minmax(0,1.05fr) minmax(260px,.95fr)}
.lr-answer-label{display:inline-flex;width:fit-content;padding:3px 8px;border-radius:999px;background:color-mix(in srgb,var(--color-projects) 12%,transparent);color:var(--color-projects);font-size:.72rem;font-weight:800}
.lr-trail{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0;padding:0;list-style:none}
.lr-trail li{display:inline-flex;align-items:center;gap:8px}
.lr-trail li:not(:last-child)::after{content:'→';color:var(--color-text-muted)}
.lr-context-stack{display:grid;gap:10px}
.lr-context-card header{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
.lr-deploy-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
@media (max-width:900px){.lr-main{grid-column:1;grid-row:auto}.lr-meta-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.lr-ingest-layout,.lr-graph-layout,.lr-query-layout{grid-template-columns:1fr}.lr-hero-card{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:640px){.lr-hero,.lr-panel{padding:14px}.lr-meta-grid,.lr-hero-card,.lr-step-grid{grid-template-columns:1fr}.lr-query-toolbar{flex-direction:column;align-items:flex-start}}
`;
