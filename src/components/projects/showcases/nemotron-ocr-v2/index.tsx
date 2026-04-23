import { useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseMetaHero from '../ShowcaseMetaHero';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import ShowcaseZoomImage, { showcaseZoomImageCss } from '../ShowcaseZoomImage';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface ShowcaseSourceMeta {
    provider: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
}

interface NemotronOcrShowcaseProps {
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
    href?: string;
}

type SectionId = 'hero' | 'cases' | 'takeaway' | 'decide' | 'adopt' | 'ops' | 'compare' | 'fact';
type DemoView = 'annotated' | 'input' | 'text' | 'checks';

const SECTION_PREFIX = 'nm-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: 'GPU 서버형 go/no-go' },
    { id: 'cases', label: '실행 보드', description: '벤더 수치와 관찰 분리' },
    { id: 'takeaway', label: '판단 요약', description: '30초 판단용 카드' },
    { id: 'decide', label: '도입 판단', description: 'USE / SKIP' },
    { id: 'adopt', label: '적용 순서', description: '검증에서 파이프라인까지' },
    { id: 'ops', label: '운영 조건', description: '재실측이 필요한 지점' },
    { id: 'compare', label: '비교 대상', description: '다른 OCR 선택지와 비교' },
    { id: 'fact', label: '팩트 체크', description: '검증 상태' },
] as const;

const DEMO = {
    runDate: '2026-04-19',
    mergeLevel: 'layout',
    inputSrc: '/nemotron-ocr-v2/showcase-input.png',
    annotatedSrc: '/nemotron-ocr-v2/showcase-output.webp',
    size: '1280x720 PNG',
    runtime: 'Hugging Face public Space / ZeroGPU',
    extractedText: `샘플 OCR 테스트 문서
프로젝트: Nemotron OCR v2
작업 번호: AIKI-2026-0419
요청 내용: 빠른 속도와 문단형 레이아웃 추출이 보이는지 확인
체크 항목:
1. 한글 문장 인식
2. 영문 코드와 숫자 추출
3. 읽기 순서 유지
메모: 예상 완료 14:30 / 담당자 Minseo Kim
페이지 1 / synthetic card`,
} as const;

const LOCAL_GPU_RUN = {
    runDate: '2026-04-19',
    runtime: 'Local WSL2 / RTX 5070 / CUDA 12.8 / torch 2.11.0+cu128',
    mergeLevel: 'paragraph',
    modelDir: 'v2_multilingual',
    observationScope: '샘플 1장 / 기능 확인용',
} as const;

const OCR_CHECKS = [
    {
        label: '한글 제목',
        expected: '샘플 OCR 테스트 문서',
        actual: '샘플 OCR 테스트 문서',
        verdict: '정확',
    },
    {
        label: '영문 코드',
        expected: 'AIKI-2026-0419',
        actual: 'AIKI-2026-0419',
        verdict: '정확',
    },
    {
        label: '읽기 순서',
        expected: '요청 내용 다음에 체크 항목 목록이 이어져야 함',
        actual: '문장 블록과 목록 순서가 위에서 아래로 유지됨',
        verdict: '유지',
    },
    {
        label: '혼합 문자',
        expected: 'Minseo Kim / 14:30',
        actual: 'Minseo Kim / 14:30',
        verdict: '정확',
    },
] as const;

const TAKE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: 'GPU 서버형 OCR',
        body: 'NVIDIA GPU 서버에서 다국어 문서 OCR과 읽기 순서 보존을 함께 운영할 팀이면 검토. CPU-only, Mac, 단순 텍스트 추출이면 여기서 멈추면 된다.',
        tone: 'accent',
    },
    {
        title: '벤더 벤치마크',
        body: '34.7 pages/s는 NVIDIA 블로그의 single A100 벤치마크다. 공개 Space나 로컬 런과 같은 줄에서 섞지 않는 편이 안전하다.',
    },
    {
        title: '로컬 재실측',
        body: '공개 데모와 타깃 GPU 관찰은 기능 확인용이다. cold / warm과 VRAM은 팀 배치 조건으로 다시 재야 운영 판단이 선다.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '레이아웃 보존 RAG 입력',
        body: '텍스트만 뽑는 OCR로는 부족하고 문단 구조와 읽기 순서까지 함께 적재해야 할 때. 여기서 바로 테스트할 이유가 생김.',
        chips: ['layout-aware', 'rag ingest'],
    },
    {
        title: '혼합 문자 한 번 처리',
        body: '한글 본문과 영문 토큰을 서로 다른 파이프라인으로 쪼개지 않고 한 모델로 보고 싶을 때 볼 이유가 있음.',
        chips: ['korean', 'code tokens'],
    },
    {
        title: 'GPU 서버형 팀',
        body: 'Linux amd64, NVIDIA GPU, CUDA 환경을 이미 팀이 다루고 있다면 PoC에서 운영까지 이어 붙이기 쉬운 편.',
        chips: ['gpu server', 'cuda'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: 'CPU-only / Mac',
        body: '이 모델은 Linux amd64, NVIDIA GPU, CUDA 빌드 전제를 강하게 탐. 로컬 첫 검증부터 무거운 편.',
        chips: ['cpu-only', 'mac dev'],
    },
    {
        title: '단순 텍스트 OCR',
        body: '읽기 순서와 구조 추출까지 필요하지 않다면 더 가벼운 OCR 스택 쪽 운영 부채가 적음.',
        chips: ['simple OCR', 'lighter stack'],
    },
    {
        title: 'VRAM 명시 필수',
        body: '공식 문서엔 최소 VRAM이 직접 적혀 있지 않음. 팀이 자체 배치 크기로 cold / warm 실측을 해야 하는 구조.',
        chips: ['self benchmark', 'capacity planning'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        title: '1. Public Space',
        command: 'run sample card on public Space',
        body: '공개 Space에서 한글 문장, 영문 코드, 숫자가 섞인 샘플 1장을 돌려 읽기 순서가 무너지지 않는지 먼저 확인.',
    },
    {
        title: '2. Local CUDA',
        command: 'measure cold vs warm on target GPU',
        body: '운영 후보 GPU에서 첫 실행과 반복 실행 시간을 따로 재고, reserved peak VRAM도 같이 기록.',
    },
    {
        title: '3. Own Batch',
        command: 'test 50-100 real pages with paragraph mode',
        body: '실제 문서 50~100장을 paragraph mode로 돌려 페이지당 지연과 실패 케이스 확인.',
    },
    {
        title: '4. RAG Ingest',
        command: 'store text + order + layout metadata together',
        body: '텍스트만 저장하지 말고 읽기 순서와 박스 메타데이터까지 같이 넣는 편. 그래야 이 모델을 쓰는 이유가 남음.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '런타임 전제',
        body: '문서 기준 전제는 Linux amd64, NVIDIA GPU, CUDA toolkit, Python 3.12. Mac 로컬 확인용 도구로 보기엔 무거운 편.',
        chips: ['linux amd64', 'python 3.12'],
    },
    {
        title: '체크포인트보다 재실측',
        body: 'Hub 파일 크기는 다운로드 단서일 뿐. 실제 운영 판단은 타깃 GPU와 배치 크기 기준으로 따로 재는 편이 맞다.',
        chips: ['checkpoint', 'self benchmark'],
    },
    {
        title: '공개 데모는 기능 확인',
        body: 'ZeroGPU Space는 읽기 순서와 주석 결과를 보는 데모 환경으로만 읽고, 서버 sizing 근거는 벤더 A100 수치와 팀 재실측으로 나눠 본다.',
        chips: ['demo only', 'separate evidence'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'PaddleOCR',
        fit: 'CPU나 가벼운 GPU에서 텍스트만 빠르게 꺼내고 싶을 때',
        tradeoff: '읽기 순서나 레이아웃 reasoning은 추가 파이프라인이 더 필요한 쪽.',
    },
    {
        title: 'Hosted OCR API',
        fit: '결과 JSON만 빨리 받고 런타임 운영은 줄이고 싶을 때',
        tradeoff: '모델, 배치, 메모리 제어권이 약하고 문서 구조를 팀 기준으로 다듬기 어려운 편.',
        href: '/ko/wiki/api/',
    },
    {
        title: 'Nemotron OCR v2',
        fit: 'GPU 서버에서 구조 보존 OCR을 RAG 앞단에 바로 붙이고 싶을 때',
        tradeoff: 'CUDA 환경과 실측 책임은 팀이 직접 보유.',
    },
] as const;

const EXTRACTED_LINES = DEMO.extractedText.split('\n').filter(Boolean);

export default function NemotronOcrShowcase(props: NemotronOcrShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license, slug } = props;
    const [view, setView] = useState<DemoView>('input');

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="nm-showcase">
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="nm-main">
                <section className="nm-hero" id={`${SECTION_PREFIX}hero`}>
                    <ShowcaseMetaHero
                        id={`${SECTION_PREFIX}hero`}
                        className="nm-hero"
                        heroCopyClassName="nm-hero-copy"
                        metaGridClassName="nm-meta-grid"
                        metaCardClassName="nm-meta-card"
                        metaSourceCardClassName="nm-meta-card--source"
                        metaMarkClassName="nm-meta-mark"
                        metaCopyClassName="nm-meta-copy"
                        tagRowClassName="nm-tag-row"
                        title={title}
                        summary={summary}
                        tags={tags}
                        sourceMeta={sourceMeta}
                        metricValue={metricValue}
                        license={license}
                        renderSection={false}
                    />

                    <div className="nm-meta-grid-legacy">
                        <article className={`nm-meta-card nm-meta-card--source ${sourceMeta.className}`}>
                            <div className="nm-meta-mark">{sourceMeta.mark}</div>
                            <div className="nm-meta-copy">
                                <span>{sourceMeta.provider}</span>
                                <strong>{sourceMeta.path}</strong>
                            </div>
                        </article>
                        <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                        <MetaCard label="라이선스" value={license} />
                        <MetaCard label="검증 런" value="ZeroGPU + RTX 5070" />
                    </div>

                    <div className="nm-signal-grid-legacy">
                        <SignalCard label="공식 처리량" value="34.7 pages/s" note="single A100 / multilingual 기준" />
                        <SignalCard label="로컬 관찰" value="별도 재측정 필요" note="타깃 GPU 기준으로 다시 기록" />
                        <SignalCard label="공개 데모" value="기능 확인용" note="ZeroGPU Space는 성능 수치 근거가 아님" />
                    </div>

                    <div className="nm-tag-row-legacy">
                        {tags.map((tag) => <span key={tag}>{tag}</span>)}
                        <span>{slug}</span>
                    </div>
                </section>

                <Panel
                    id={`${SECTION_PREFIX}cases`}
                    title="실행 보드"
                    description={<>입력 카드 → 주석 결과 → 추출 텍스트 → 체크 포인트 순서로 본다. NVIDIA 벤치마크와 공개 Space, 로컬 <TermHint term="merge mode" description="OCR이 감지한 박스들을 줄, 문단, 레이아웃 단위로 어떻게 묶어 최종 텍스트를 만드는지 정하는 옵션이야." /> 관찰은 근거를 나눠 둔다.</>}
                >
                    <div className="nm-overview-stack">
                        <article className="nm-card nm-overview-card">
                            <div className="nm-card-head">
                                <span className="nm-kicker">쇼케이스 개요</span>
                                <span className="nm-pill">Vendor benchmark + demo observation</span>
                            </div>
                            <p className="nm-result-note nm-overview-summary">{summary}</p>
                            <p className="nm-result-note">한 장의 샘플 카드가 박스 주석, 추출 텍스트, 체크 포인트로 어떻게 이어지는지 바로 확인할 수 있다.</p>
                        </article>

                        <div className="nm-signal-grid">
                            <SignalCard label="입력 → 출력" value="카드 → 주석 → 텍스트" note="같은 샘플 1장을 네 뷰로 나눠 확인" />
                            <SignalCard label="벤더 벤치마크" value="34.7 pages/s" note="NVIDIA 공개 블로그 / single A100 / v2_multilingual" />
                            <SignalCard label="로컬 관찰" value="별도 재측정 필요" note="공개 Space와 타깃 GPU 런은 기능 확인용으로만 보기" />
                        </div>
                    </div>
                    <div className="nm-case-tabs" role="tablist" aria-label="Nemotron OCR v2 demo views">
                        <DemoTab current={view} next="input" label="입력 카드" onSelect={setView} />
                        <DemoTab current={view} next="annotated" label="주석 결과" onSelect={setView} />
                        <DemoTab current={view} next="text" label="추출 텍스트" onSelect={setView} />
                        <DemoTab current={view} next="checks" label="체크 포인트" onSelect={setView} />
                    </div>

                    <div className="nm-stage-grid">
                        <article className="nm-card nm-preview-card">
                            <div className="nm-card-head">
                                <span className="nm-kicker">공개 데모</span>
                                <span className="nm-pill">{DEMO.runtime}</span>
                            </div>

                            {view === 'annotated' && (
                                <figure className="nm-media-frame">
                                    <ShowcaseZoomImage src={DEMO.annotatedSrc} alt="Nemotron OCR v2 주석 결과 미리보기" buttonClassName="nm-media-zoom" />
                                    <figcaption>실제 Space 출력에서 박스 감지와 읽기 순서를 같이 확인하는 보드.</figcaption>
                                </figure>
                            )}

                            {view === 'input' && (
                                <figure className="nm-media-frame">
                                    <ShowcaseZoomImage src={DEMO.inputSrc} alt="Nemotron OCR v2 입력 카드" buttonClassName="nm-media-zoom" />
                                    <figcaption>한글 본문, 영문 코드, 숫자, 이름을 한 장에 섞은 synthetic card.</figcaption>
                                </figure>
                            )}

                            {view === 'text' && (
                                <div className="nm-text-output" aria-label="Nemotron OCR v2 extracted text">
                                    <pre>{DEMO.extractedText}</pre>
                                </div>
                            )}

                            {view === 'checks' && (
                                <div className="nm-check-grid">
                                    {OCR_CHECKS.map((item) => (
                                        <article key={item.label} className="nm-check-card">
                                            <div className="nm-check-head">
                                                <h3>{item.label}</h3>
                                                <span>{item.verdict}</span>
                                            </div>
                                            <p><strong>기대:</strong> {item.expected}</p>
                                            <p><strong>실제:</strong> {item.actual}</p>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </article>

                        <article className="nm-card nm-note-card">
                            <div className="nm-card-head">
                                <span className="nm-kicker">관찰 메모</span>
                                <span className="nm-pill">{LOCAL_GPU_RUN.modelDir}</span>
                            </div>
                            <div className="nm-note-grid">
                                <InfoCard label="공개 데모" value="기능 확인용" note={`${DEMO.runtime} / 읽기 순서와 주석 결과 확인`} />
                                <InfoCard label="로컬 실행" value="타깃 GPU 재측정" note={`${LOCAL_GPU_RUN.runtime} / ${LOCAL_GPU_RUN.observationScope}`} />
                                <InfoCard label="merge mode" value={LOCAL_GPU_RUN.mergeLevel} note="문단 단위로 묶이는지 확인하는 설정" />
                                <InfoCard label="배치 판단" value="VRAM 별도 기록" note="실서비스 batch 조건으로 다시 측정" />
                            </div>
                        </article>

                        <article className="nm-card nm-lines-card">
                            <div className="nm-card-head">
                                <span className="nm-kicker">추출 라인</span>
                                <span className="nm-pill">{EXTRACTED_LINES.length} lines</span>
                            </div>
                            <div className="nm-line-list">
                                {EXTRACTED_LINES.map((line, index) => (
                                    <div className="nm-line-item" key={`${index + 1}-${line}`}>
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        <code>{line}</code>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="판단 요약">
                    <div className="nm-take-grid">
                        {TAKE_CARDS.map((item, index) => (
                            <Insight key={item.title} item={item} className={index === 0 ? 'nm-insight-card--lead' : ''} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="도입 판단">
                    <div className="nm-split-grid">
                        <section className="nm-split-panel fit">
                            <div className="nm-split-title">USE IT</div>
                            <div className="nm-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="nm-split-panel skip">
                            <div className="nm-split-title">SKIP IT</div>
                            <div className="nm-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <Insight key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="적용 순서">
                    <div className="nm-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="nm-step-card">
                                <span className="nm-kicker">{item.title}</span>
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}ops`}
                    title="운영 조건"
                    description={<>cold start와 warm run을 나눠 보고, <TermHint term="reserved VRAM" description="프레임워크가 실제 사용량과 별도로 미리 잡아 둔 GPU 메모리까지 포함한 보수적 점유량." /> 기준으로 배치 여유 판단.</>}
                >
                    <div className="nm-insight-grid nm-insight-grid--ops">
                        {OPS_CARDS.map((item) => (
                            <Insight key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="비교 대상">
                    <div className="nm-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="nm-compare-card">
                                {item.href ? (
                                    <a className="nm-compare-link" href={item.href}>{item.title}</a>
                                ) : (
                                    <span className="nm-kicker">{item.title}</span>
                                )}
                                <p><strong>맞는 경우</strong><span>{item.fit}</span></p>
                                <p><strong>대가</strong><span>{item.tradeoff}</span></p>
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
        <section className="nm-panel" id={id}>
            <div className="nm-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function DemoTab({
    current,
    next,
    label,
    onSelect,
}: {
    current: DemoView;
    next: DemoView;
    label: string;
    onSelect: (value: DemoView) => void;
}) {
    return (
        <button
            type="button"
            className={current === next ? 'active' : ''}
            aria-selected={current === next}
            onClick={() => onSelect(next)}
        >
            {label}
        </button>
    );
}

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="nm-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function SignalCard({ label, value, note }: { label: string; value: string; note: string }) {
    return (
        <article className="nm-signal-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
        </article>
    );
}

function InfoCard({ label, value, note }: { label: string; value: string; note: string }) {
    return (
        <article className="nm-info-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
        </article>
    );
}

function Insight({ item, className = '' }: { item: InsightCard; className?: string }) {
    return (
        <article className={`nm-insight-card ${item.tone === 'accent' ? 'nm-insight-card--accent' : ''} ${className}`.trim()}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            {item.chips && (
                <div className="nm-chip-row">
                    {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
                </div>
            )}
        </article>
    );
}

const showcaseCss = `
${showcaseZoomImageCss}
.nm-showcase{display:contents;color:var(--color-text)}
.nm-main{grid-column:2;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.nm-hero,.nm-panel{min-width:0}
.nm-hero,.nm-panel,.nm-card,.nm-meta-card,.nm-signal-card,.nm-info-card,.nm-step-card,.nm-insight-card,.nm-compare-card,.nm-check-card{
  border:1px solid var(--color-border);
  background:var(--color-surface)
}
.nm-hero,.nm-panel{border-radius:12px;padding:22px;scroll-margin-top:100px}
.nm-hero{
  display:grid;
  gap:18px
}
.nm-hero-copy{display:grid;gap:10px;min-width:0}
.nm-hero-copy h1{
  margin:0;
  color:var(--color-text);
  font-size:clamp(2.4rem,6vw,5rem);
  font-weight:900;
  line-height:.96;
  letter-spacing:.02em;
  text-transform:none;
  overflow-wrap:anywhere;
  word-break:break-word
}
.nm-hero-copy p{
  max-width:760px;
  margin:0;
  color:var(--color-text);
  font-size:clamp(1rem,1.4vw,1.14rem);
  line-height:1.72;
  word-break:keep-all
}
.nm-meta-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.nm-meta-card{
  display:grid;
  gap:6px;
  min-width:0;
  padding:14px;
  border-radius:10px;
  background:color-mix(in srgb,var(--color-surface) 86%,var(--color-surface-alt))
}
.nm-meta-card span{
  color:var(--color-text-muted);
  font-size:.74rem;
  font-weight:800;
  letter-spacing:.06em;
  text-transform:uppercase
}
.nm-meta-card strong{overflow-wrap:anywhere;font-size:.96rem;line-height:1.35}
.nm-meta-card--source{grid-column:span 2;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:12px}
.nm-meta-card--source .nm-meta-mark{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:42px;
  height:42px;
  border-radius:12px;
  font-size:.78rem;
  font-weight:900;
  letter-spacing:.08em
}
.nm-meta-card--source .nm-meta-copy{display:grid;gap:4px;min-width:0}
.nm-meta-card--source.github .nm-meta-mark{background:#24292f;color:#fff}
.nm-meta-card--source.huggingface .nm-meta-mark{background:#ffd166;color:#3d2a00}
.nm-meta-card--source.source .nm-meta-mark{background:var(--color-text);color:var(--color-surface)}
.nm-meta-grid-legacy,.nm-signal-grid-legacy,.nm-tag-row-legacy{display:none}
.nm-signal-grid{display:grid;gap:12px;grid-template-columns:repeat(3,minmax(0,1fr))}
.nm-signal-card,.nm-info-card,.nm-check-card,.nm-step-card,.nm-insight-card,.nm-compare-card,.nm-card{
  min-width:0;
  padding:16px;
  border-radius:10px
}
.nm-signal-card,.nm-info-card{background:color-mix(in srgb,var(--color-surface) 88%,var(--color-surface-alt))}
.nm-signal-card span,.nm-info-card span,.nm-line-item span{
  color:var(--color-text-muted);
  font-size:.76rem;
  font-weight:800;
  letter-spacing:.04em;
  text-transform:uppercase
}
.nm-signal-card strong,.nm-info-card strong{
  display:block;
  margin-top:6px;
  color:var(--color-projects);
  font-size:1.2rem;
  line-height:1.2
}
.nm-signal-card p,.nm-info-card p,.nm-insight-card p,.nm-compare-card p span,.nm-check-card p{
  margin:10px 0 0;
  color:var(--color-text-muted);
  line-height:1.65;
  word-break:keep-all
}
.nm-tag-row,.nm-chip-row{
  display:flex;
  flex-wrap:wrap;
  gap:8px
}
.nm-tag-row span,.nm-chip-row span,.nm-pill{
  display:inline-flex;
  align-items:center;
  min-height:28px;
  padding:0 10px;
  border-radius:999px;
  background:var(--color-surface-alt);
  color:var(--color-text-muted);
  font-size:.76rem
}
.nm-panel-head{display:grid;gap:6px;margin-bottom:14px}
.nm-panel-head h2{margin:0;font-size:1.16rem}
.nm-panel-head p{margin:0;max-width:760px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.nm-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.nm-case-tabs button{
  min-width:148px;
  padding:12px 14px;
  border:1px solid var(--color-border);
  border-radius:14px;
  background:var(--color-surface-alt);
  color:var(--color-text);
  font:inherit;
  cursor:pointer
}
.nm-case-tabs button.active{
  border-color:var(--color-projects);
  background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))
}
.nm-stage-grid{display:grid;gap:14px;grid-template-columns:minmax(0,1.22fr) minmax(0,.78fr)}
.nm-preview-card{grid-column:1;grid-row:1}
.nm-note-card{grid-column:2;grid-row:1}
.nm-lines-card{grid-column:1 / -1}
.nm-card-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:12px
}
.nm-kicker{
  color:var(--color-projects)!important;
  font-size:.72rem;
  font-weight:850;
  letter-spacing:.08em;
  text-transform:uppercase
}
.nm-note-grid,.nm-line-list,.nm-check-grid,.nm-chip-row,.nm-adoption-grid,.nm-compare-grid,.nm-insight-grid,.nm-take-grid{
  display:grid;
  gap:12px
}
.nm-overview-stack{display:grid;gap:14px;margin-bottom:16px}
.nm-note-grid{grid-template-columns:minmax(0,1fr)}
.nm-media-frame{margin:0;border:1px solid var(--color-border);border-radius:14px;overflow:hidden;background:#f2eee7}
.nm-media-zoom{display:block}
.nm-media-zoom:focus-visible{outline-offset:-3px}
.nm-media-frame img{display:block;width:100%;height:auto}
.nm-media-frame figcaption{
  padding:12px 14px;
  border-top:1px solid var(--color-border);
  background:var(--color-surface);
  color:var(--color-text-muted);
  font-size:.82rem;
  line-height:1.55
}
.nm-text-output pre,.nm-step-card code,.nm-line-item code{
  margin:0;
  min-width:0;
  max-width:100%;
  overflow:auto;
  border-radius:12px;
  background:var(--color-surface-alt)
}
.nm-text-output pre,.nm-step-card code{
  padding:12px;
  color:var(--color-projects);
  font-size:.8rem;
  line-height:1.6
}
.nm-line-list{gap:8px}
.nm-line-item{
  display:grid;
  grid-template-columns:auto minmax(0,1fr);
  align-items:start;
  gap:10px;
  padding:10px 12px;
  border-radius:12px;
  background:var(--color-surface-alt)
}
.nm-line-item code{
  padding:0;
  background:none;
  color:var(--color-text);
  white-space:pre-wrap;
  word-break:break-word
}
.nm-check-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.nm-check-card h3,.nm-insight-card h3{margin:0}
.nm-check-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:10px
}
.nm-check-head span{
  display:inline-flex;
  align-items:center;
  min-height:26px;
  padding:0 10px;
  border-radius:999px;
  background:color-mix(in srgb,var(--color-projects) 12%,transparent);
  color:var(--color-projects);
  font-size:.74rem;
  font-weight:800
}
.nm-take-grid{grid-template-columns:minmax(0,1.15fr) repeat(2,minmax(0,.85fr))}
.nm-insight-card{display:grid;align-content:start}
.nm-insight-card--accent,.nm-insight-card--lead{
  background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))
}
.nm-insight-card h3{
  margin:0 0 10px;
  font-size:1.04rem;
  line-height:1.35;
  word-break:keep-all
}
.nm-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.nm-split-panel{
  display:grid;
  gap:14px;
  padding:18px;
  border-radius:18px;
  background:var(--color-surface-alt)
}
.nm-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.nm-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.nm-split-title{
  color:var(--color-projects);
  font-size:.82rem;
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase
}
.nm-insight-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.nm-insight-grid--ops{grid-template-columns:repeat(3,minmax(0,1fr))}
.nm-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.nm-step-card{display:grid;gap:10px}
.nm-step-card p{margin:0;color:var(--color-text-muted);line-height:1.65}
.nm-compare-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.nm-compare-card{display:grid;gap:12px}
.nm-compare-link{color:var(--color-projects);font-size:.74rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase;text-decoration:none}
.nm-compare-link:hover{text-decoration:underline}
.nm-compare-card p{display:grid;gap:4px;margin:0}
.nm-compare-card strong{color:var(--color-text);font-size:.82rem}
@media (max-width:1200px){
  .nm-meta-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .nm-meta-card--source{grid-column:span 2}
  .nm-signal-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .nm-adoption-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .nm-insight-grid,.nm-insight-grid--ops,.nm-compare-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .nm-take-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:1100px){
  .nm-stage-grid{grid-template-columns:minmax(0,1fr)}
  .nm-preview-card,.nm-note-card,.nm-lines-card{grid-column:1;grid-row:auto}
}
@media (max-width:900px){
  .nm-main{grid-column:1}
  .nm-insight-grid,.nm-insight-grid--ops,.nm-adoption-grid,.nm-compare-grid,.nm-check-grid,.nm-signal-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:720px){
  .nm-hero,.nm-panel{padding:14px}
  .nm-meta-grid{grid-template-columns:minmax(0,1fr)}
  .nm-meta-card--source{grid-column:1}
  .nm-case-tabs button{min-width:0;width:100%}
  .nm-hero-copy h1{font-size:clamp(2rem,8vw,3.2rem)}
}
`;
