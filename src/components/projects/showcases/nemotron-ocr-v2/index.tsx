import type { ReactNode } from 'react';
import { useState } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface NemotronOcrShowcaseProps {
    slug: string;
}

type SectionId = 'demo' | 'speed' | 'memory' | 'fit';
type DemoView = 'input' | 'annotated' | 'text' | 'checks';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'demo', label: '한글 데모', description: '실제로 돌린 입력과 출력' },
    { id: 'speed', label: '속도', description: '공식 처리량과 공개 데모 시간' },
    { id: 'memory', label: '메모리', description: '체크포인트 크기와 런타임 조건' },
    { id: 'fit', label: '도입 판단', description: '언어 범위와 추천 상황' },
] as const;

const SECTION_PREFIX = 'nemotron-ocr-section-';

const DEMO = {
    runDate: '2026-04-19',
    mergeLevel: 'layout',
    inputSrc: '/nemotron-ocr-v2/showcase-input.png',
    annotatedSrc: '/nemotron-ocr-v2/showcase-output.webp',
    size: '1280×720 PNG',
    runtime: 'Hugging Face public Space · ZeroGPU',
    durationSeconds: 4.51,
    averageSeconds: 6.38,
    extractedText: `   한글 OCR 테스트 문서
   프로젝트: Nemotron OCR v2
    접수 번호    AIKI-2026-0419
    요청 내용     빠른 속도와 외국어 지원이 포인트라면
             한글 문서 OCR 예시가 바로 보여야 한다.
    체크 항목    1. 한글 문장 인식
             2. 숫자와 영문 코드 추출
              3. 줄 단위 읽기 순서 유지
    메모        예상 완료 시간 14:30 / 담당자 Minseo Kim
             총 페이지 1 / 테스트 이미지`,
} as const;

const LOCAL_GPU_RUN = {
    runDate: '2026-04-19',
    runtime: 'Local WSL2 · RTX 5070 · CUDA 12.8 · torch 2.11.0+cu128',
    mergeLevel: 'paragraph',
    modelDir: 'v2_multilingual',
    loadSeconds: 3.23,
    coldSeconds: 26.47,
    coldTotalSeconds: 29.69,
    warmSeconds: 0.16,
    warmPagesPerSecond: 6.14,
    predictions: 9,
    baselineReservedMiB: 370,
    warmPeakReservedMiB: 2220,
    coldPeakReservedMiB: 2802,
} as const;

const EXTRACTED_LINES = DEMO.extractedText
    .split('\n')
    .map((line) => line.replace(/\s+$/u, ''))
    .filter(Boolean);

const OCR_CHECKS = [
    {
        label: '한글 제목',
        expected: '한글 OCR 테스트 문서',
        actual: '한글 OCR 테스트 문서',
        verdict: '정확',
    },
    {
        label: '영문 혼합 코드',
        expected: 'AIKI-2026-0419',
        actual: 'AIKI-2026-0419',
        verdict: '정확',
    },
    {
        label: '문장 읽기 순서',
        expected: '요청 내용 두 줄이 위에서 아래로 이어져야 함',
        actual: '빠른 속도와 외국어 지원이 포인트라면 → 한글 문서 OCR 예시가 바로 보여야 한다.',
        verdict: '유지',
    },
    {
        label: '혼합 문자',
        expected: '담당자 Minseo Kim / 14:30',
        actual: '담당자 Minseo Kim / 14:30',
        verdict: '정확',
    },
    {
        label: '레이아웃 모드 특성',
        expected: '칸 간격이 일부 유지됨',
        actual: '줄 앞 공백과 항목 간 여백이 남아 있음',
        verdict: '정상',
    },
] as const;

const MEASUREMENT_GUIDE = [
    {
        label: 'CPU 실측',
        value: '없음',
        note: '이 showcase에는 CPU-only 벤치마크를 넣지 않았다.',
    },
    {
        label: '공식 benchmark',
        value: 'GPU · A100',
        note: '34.7 pages/s는 모델 카드의 single A100 처리량이다.',
    },
    {
        label: '로컬 실측',
        value: 'GPU · RTX 5070',
        note: '같은 한글 이미지를 로컬 WSL2 + RTX 5070에서 다시 돌린 지연 시간과 VRAM이다.',
    },
    {
        label: '공개 Space',
        value: 'ZeroGPU 데모',
        note: '온라인 데모 응답 시간이라 큐와 할당 상태 영향을 받는다.',
    },
    {
        label: '체크포인트 336 MB',
        value: '디스크 크기',
        note: '다운로드 파일 크기이며 RAM 또는 VRAM 수치가 아니다.',
    },
] as const;

const SPEED_CARDS = [
    {
        label: '공식 GPU 처리량',
        value: '34.7 pages/s',
        note: 'OmniDocBench crop mode, single A100 GPU 기준.',
    },
    {
        label: '로컬 GPU 워밍 후',
        value: `${LOCAL_GPU_RUN.warmSeconds.toFixed(2)} s/page`,
        note: `${LOCAL_GPU_RUN.runtime}, ${LOCAL_GPU_RUN.mergeLevel} mode 2~3회차 평균. 약 ${LOCAL_GPU_RUN.warmPagesPerSecond.toFixed(2)} pages/s steady-state.`,
    },
    {
        label: '로컬 GPU 첫 결과',
        value: `${LOCAL_GPU_RUN.coldTotalSeconds.toFixed(2)} s`,
        note: `모델 로드 ${LOCAL_GPU_RUN.loadSeconds.toFixed(2)} s + 첫 추론 ${LOCAL_GPU_RUN.coldSeconds.toFixed(2)} s. 첫 호출에는 CUDA warm-up이 크게 섞인다.`,
    },
    {
        label: '공개 Space 데모 시간',
        value: `${DEMO.durationSeconds.toFixed(2)} s`,
        note: `${DEMO.size} 테스트 이미지 1장을 ${DEMO.runtime}에서 돌린 실제 결과. 큐 상태에 따라 편차가 생긴다.`,
    },
] as const;

const MEMORY_CARDS = [
    {
        label: '체크포인트 디스크 크기',
        value: '336 MB',
        note: 'Hub 폴더 전체 크기. detector 182 MB, recognizer 145 MB, relational 9.18 MB.',
    },
    {
        label: '로컬 GPU 로드 후 reserved',
        value: `${LOCAL_GPU_RUN.baselineReservedMiB.toLocaleString('en-US')} MiB`,
        note: `${LOCAL_GPU_RUN.runtime}에서 모델 로드 직후 torch.cuda.memory_reserved 기준.`,
    },
    {
        label: '로컬 GPU 워밍 후 peak VRAM',
        value: `${LOCAL_GPU_RUN.warmPeakReservedMiB.toLocaleString('en-US')} MiB`,
        note: `${LOCAL_GPU_RUN.mergeLevel} mode 2~3회차 기준 reserved peak. 같은 한글 카드에서 ${LOCAL_GPU_RUN.predictions}개 영역을 뽑았다.`,
    },
    {
        label: '로컬 GPU 첫 실행 peak VRAM',
        value: `${LOCAL_GPU_RUN.coldPeakReservedMiB.toLocaleString('en-US')} MiB`,
        note: '첫 추론은 커널 초기화와 추가 버퍼가 섞여 워밍 후보다 더 높게 잡혔다.',
    },
    {
        label: 'GPU 메모리 절약 옵션',
        value: '-35% ~ -37%',
        note: 'detector_only는 약 37% 적게, skip_relational은 약 35% 적게 쓴다고 공식 카드가 설명한다.',
    },
] as const;

const MEMORY_BREAKDOWN = [
    { label: 'detector.pth', value: '182 MB', share: 54 },
    { label: 'recognizer.pth', value: '145 MB', share: 43 },
    { label: 'relational.pth', value: '9.18 MB', share: 3 },
] as const;

const LANGUAGE_CHIPS = ['한국어', 'English', '中文 간체', '中文 번체', '日本語', 'Русский'] as const;

const FIT_CARDS = [
    {
        title: '잘 맞는 팀',
        body: '한국어 문서와 영문 코드, 숫자, 다국어 문장을 한 OCR 서버에 묶어 넣고 싶은 팀.',
    },
    {
        title: '특히 좋은 상황',
        body: 'RAG 적재 전에 읽기 순서와 레이아웃 관계까지 후처리 부담 없이 넘기고 싶을 때.',
    },
    {
        title: '덜 맞는 상황',
        body: 'CPU-only 환경, Mac 로컬 머신, 혹은 PDF에서 텍스트만 빨리 뽑으면 끝나는 파이프라인.',
    },
    {
        title: '주의할 점',
        body: '공식 문서는 절대 최소 VRAM을 공개하지 않는다. 그래서 실제 도입 전에는 목표 해상도와 배치 크기로 직접 재야 한다.',
    },
] as const;

export default function NemotronOcrShowcase({ slug }: NemotronOcrShowcaseProps) {
    const [view, setView] = useState<DemoView>('annotated');
    const { activeId, scrollToSection } = useShowcaseSectionNav({
        ids: SECTIONS.map((item) => item.id),
        initialId: 'demo',
        sectionPrefix: SECTION_PREFIX,
    });

    return (
        <Shell>
            <ShowcaseSectionNav items={SECTIONS} activeId={activeId} onSelect={scrollToSection} />

            <div className="no-showcase-main">
                <section className="no-hero" aria-label="Nemotron OCR v2 한글 OCR 요약">
                    <div className="no-hero-copy">
                        <p className="no-kicker">Korean OCR Run</p>
                        <h2>한글 테스트 이미지를 실제로 돌린 결과를 바로 보여주는 showcase</h2>
                        <p>
                            빠른 속도와 외국어 지원이 핵심인 모델이니까, 공개 Space에서 돌린 한글 샘플 결과를
                            입력 이미지, 주석 이미지, 원문 출력까지 같은 화면에 묶었다. 같은 이미지를 로컬 RTX 5070
                            GPU에서도 다시 돌려서 steady-state latency와 peak VRAM을 함께 적었다. 영어 코드와
                            숫자도 함께 넣어서 혼합 문서 감각을 확인할 수 있다.
                        </p>
                        <div className="no-chip-row">
                            <span>{slug}</span>
                            <span>{DEMO.runDate} run</span>
                            <span>{DEMO.mergeLevel} mode</span>
                            <span>한국어 + 영문 + 숫자</span>
                        </div>
                    </div>

                    <div className="no-hero-stats">
                        <StatCard label="공식 GPU 처리량" value="34.7 pages/s" />
                        <StatCard label="로컬 GPU 지연 시간" value={`${LOCAL_GPU_RUN.warmSeconds.toFixed(2)} s/page`} />
                        <StatCard label="로컬 GPU peak VRAM" value={`${LOCAL_GPU_RUN.warmPeakReservedMiB.toLocaleString('en-US')} MiB`} />
                        <StatCard label="CPU 실측" value="없음" />
                    </div>
                </section>

                <section className="no-section-block" id={`${SECTION_PREFIX}demo`}>
                    <Panel
                        title="한글 테스트 이미지 실측"
                        description={
                            <>
                                공개 <TermHint term="ZeroGPU" description="Hugging Face Space가 GPU를 필요할 때만 할당하는 공개 데모 환경이야. 큐 대기와 할당 시간이 섞이므로 공식 배치 성능과는 따로 봐야 한다." />에서
                                1장만 돌린 결과다. 빠른 속도와 외국어 지원이 실제로 한글 문장, 영문 코드, 숫자에
                                어떻게 보이는지 확인하는 용도에 맞췄다.
                            </>
                        }
                    >
                        <div className="no-demo-toolbar" role="tablist" aria-label="한글 OCR 데모 뷰">
                            <DemoToggle current={view} next="input" label="입력 이미지" onSelect={setView} />
                            <DemoToggle current={view} next="annotated" label="주석 결과" onSelect={setView} />
                            <DemoToggle current={view} next="text" label="실제 출력 텍스트" onSelect={setView} />
                            <DemoToggle current={view} next="checks" label="인식 포인트" onSelect={setView} />
                        </div>

                        <div className="no-demo-layout">
                            <div className="no-media-panel">
                                {view === 'input' && (
                                    <figure className="no-media-frame">
                                        <img alt="Nemotron OCR v2 한글 테스트 입력 이미지" src={DEMO.inputSrc} />
                                        <figcaption>
                                            말굽 고딕으로 만든 1280×720 한글 테스트 카드. 한국어 문장, 영문 코드,
                                            시간, 이름을 섞었다.
                                        </figcaption>
                                    </figure>
                                )}

                                {view === 'annotated' && (
                                    <figure className="no-media-frame">
                                        <img alt="Nemotron OCR v2가 감지한 한글 테스트 이미지 주석 결과" src={DEMO.annotatedSrc} />
                                        <figcaption>
                                            실제 Space 출력 이미지. 텍스트 영역 감지와 읽기 순서를 같이 확인할 수
                                            있다.
                                        </figcaption>
                                    </figure>
                                )}

                                {view === 'text' && (
                                    <div className="no-text-output" aria-label="Nemotron OCR v2 실제 추출 텍스트">
                                        <pre>{DEMO.extractedText}</pre>
                                    </div>
                                )}

                                {view === 'checks' && (
                                    <div className="no-check-grid">
                                        {OCR_CHECKS.map((item) => (
                                            <article className="no-check-card" key={item.label}>
                                                <div className="no-check-head">
                                                    <h3>{item.label}</h3>
                                                    <span>{item.verdict}</span>
                                                </div>
                                                <p><strong>기대:</strong> {item.expected}</p>
                                                <p><strong>실제:</strong> {item.actual}</p>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <aside className="no-demo-notes">
                                <InfoCard label="실행 일시" value={DEMO.runDate} note="같은 날 회수한 실제 출력만 사용했다." />
                                <InfoCard label="출력 모드" value={DEMO.mergeLevel} note="레이아웃 단위라서 줄 앞 공백과 칸 간격이 일부 남는다." />
                                <InfoCard label="실측 시간" value={`${DEMO.durationSeconds.toFixed(2)} s`} note={`${DEMO.runtime}에서 1장 처리.`} />
                                <InfoCard label="입력 특성" value={DEMO.size} note="한국어 본문, 영문 이름, 숫자 코드가 함께 들어간 synthetic card." />
                            </aside>
                        </div>

                        <div className="no-line-panel">
                            <h3>실제 추출 줄 단위</h3>
                            <div className="no-line-list">
                                {EXTRACTED_LINES.map((line, index) => (
                                    <div className="no-line-item" key={`${index + 1}-${line}`}>
                                        <span>{String(index + 1).padStart(2, '0')}</span>
                                        <code>{line}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="no-section-block" id={`${SECTION_PREFIX}speed`}>
                    <Panel
                        title="속도 정보"
                        description={
                            <>
                                CPU 실측은 없고, 아래 수치는 <strong>공식 GPU benchmark</strong>, <strong>로컬 GPU 실측</strong>,
                                <strong>공개 Space 데모 시간</strong>으로 나뉜다. 공식 수치는 single A100 기준 배치 처리량이고,
                                아래 로컬 수치는 <TermHint term="warm-up" description="첫 호출에 모델 로드, CUDA kernel 준비, 메모리 할당이 섞여 느려지고, 2회차부터 steady-state 지연이 보이는 구간을 말한다." /> 후
                                한글 샘플 1장을 로컬 RTX 5070에서 돌린 시간이다. 공개 <TermHint term="Space" description="공개 Space는 GPU 할당과 큐 대기 시간이 섞일 수 있어서 데모 확인에는 좋지만 서버 sizing 기준으로 쓰면 안 된다." /> 응답 시간은 별도 데모 지표다.
                            </>
                        }
                    >
                        <div className="no-section-heading">
                            <h3>먼저 보는 기준표</h3>
                            <p>CPU인지 GPU인지, 데모 시간인지 실제 GPU 측정인지 먼저 구분해서 읽으면 된다.</p>
                        </div>
                        <div className="no-card-grid">
                            {MEASUREMENT_GUIDE.map((item) => (
                                <article className="no-metric-card" key={item.label}>
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                    <p>{item.note}</p>
                                </article>
                            ))}
                        </div>

                        <div className="no-section-heading">
                            <h3>실제 속도 수치</h3>
                            <p>공식 처리량, 로컬 GPU 지연 시간, 공개 데모 시간을 각각 따로 적었다.</p>
                        </div>
                        <div className="no-card-grid">
                            {SPEED_CARDS.map((item) => (
                                <article className="no-metric-card" key={item.label}>
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                    <p>{item.note}</p>
                                </article>
                            ))}
                        </div>
                    </Panel>
                </section>

                <section className="no-section-block" id={`${SECTION_PREFIX}memory`}>
                    <Panel
                        title="메모리와 배포 조건"
                        description={
                            <>
                                이 모델의 장점은 빠른 multilingual OCR이지만, 공식 카드가 절대 최소 VRAM은 공개하지
                                않는다. 그래서 <strong>디스크 크기</strong>와 <strong>로컬 GPU VRAM</strong>을 분리해서 적었다.
                                같은 한글 카드 기준 로컬 RTX 5070에서 실제로 잡힌 reserved peak도 같이 두고, GPU
                                메모리를 줄이는 실행 모드는 공식 카드 설명을 따랐다.
                            </>
                        }
                    >
                        <div className="no-card-grid">
                            {MEMORY_CARDS.map((item) => (
                                <article className="no-metric-card" key={item.label}>
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                    <p>{item.note}</p>
                                </article>
                            ))}
                        </div>

                        <div className="no-breakdown">
                            <div className="no-section-heading">
                                <h3>v2_multilingual 디스크 구성</h3>
                                <p>공식 Hub 파일 크기 기준. detector가 절반 이상을 차지하고 recognizer가 그 뒤를 따른다.</p>
                            </div>
                            <div className="no-breakdown-list">
                                {MEMORY_BREAKDOWN.map((item) => (
                                    <div className="no-breakdown-item" key={item.label}>
                                        <div className="no-breakdown-meta">
                                            <strong>{item.label}</strong>
                                            <span>{item.value}</span>
                                        </div>
                                        <div className="no-breakdown-bar" aria-hidden="true">
                                            <div style={{ width: `${item.share}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </section>

                <section className="no-section-block" id={`${SECTION_PREFIX}fit`}>
                    <Panel
                        title="언어 지원과 도입 판단"
                        description={
                            <>
                                foreign language support를 보고 고르는 모델이니 언어 범위와 운영 부담을 같이 봐야
                                한다. 한국어 문서를 중심에 두고도 영문 코드, 숫자, 다른 언어 문서까지 한 파이프라인으로
                                묶고 싶을 때 강점이 생긴다.
                            </>
                        }
                    >
                        <div className="no-fit-grid">
                            <article className="no-language-card">
                                <h3>지원 언어권</h3>
                                <p>공식 multilingual variant 기준.</p>
                                <div className="no-chip-row">
                                    {LANGUAGE_CHIPS.map((language) => (
                                        <span key={language}>{language}</span>
                                    ))}
                                </div>
                                <p>
                                    한국어는 일본어, 중국어, 러시아어와 함께 line-level recognizer에 묶인다. 그래서
                                    word-level보다 <TermHint term="읽기 순서" description="문서 상단에서 하단, 좌측에서 우측으로 이어지는 논리적 읽기 흐름을 말한다." />와
                                    문장 단위 후처리에 유리하다.
                                </p>
                            </article>

                            <div className="no-fit-card-grid">
                                {FIT_CARDS.map((item) => (
                                    <article className="no-fit-card" key={item.title}>
                                        <h3>{item.title}</h3>
                                        <p>{item.body}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </section>
            </div>
        </Shell>
    );
}

function DemoToggle({
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
            role="tab"
            className={current === next ? 'active' : ''}
            aria-current={current === next ? 'true' : undefined}
            aria-selected={current === next}
            onClick={() => onSelect(next)}
        >
            {label}
        </button>
    );
}

function Shell({ children }: { children: ReactNode }) {
    return (
        <div className="no-showcase">
            <style>{showcaseCss}</style>
            {children}
        </div>
    );
}

function Panel({ title, description, children }: { title: string; description: ReactNode; children: ReactNode }) {
    return (
        <section className="no-panel">
            <div className="no-panel-head">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {children}
        </section>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="no-stat-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function InfoCard({ label, value, note }: { label: string; value: string; note: string }) {
    return (
        <article className="no-info-card">
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
        </article>
    );
}

const showcaseCss = `
.no-showcase{display:contents;color:var(--color-text)}
.no-showcase-main{grid-column:2;grid-row:2;display:grid;gap:18px;min-width:0}
.no-hero,.no-panel,.no-stat-card,.no-info-card,.no-metric-card,.no-check-card,.no-language-card,.no-fit-card{
    border:1px solid var(--color-border);
    background:var(--color-surface);
}
.no-hero,.no-panel{border-radius:12px;padding:20px}
.no-hero{
    display:grid;
    grid-template-columns:minmax(0,1.2fr) minmax(300px,.8fr);
    gap:18px;
    background:
        radial-gradient(circle at top right,color-mix(in srgb,var(--color-projects) 14%,transparent),transparent 36%),
        linear-gradient(140deg,color-mix(in srgb,var(--color-projects) 10%,transparent),transparent 42%),
        var(--color-surface);
}
.no-kicker{
    margin:0 0 8px;
    color:var(--color-projects)!important;
    font-size:.76rem;
    font-weight:850;
    letter-spacing:.08em;
    text-transform:uppercase;
}
.no-hero-copy h2{margin:0 0 10px;font-size:clamp(1.72rem,3vw,2.45rem);line-height:1.08}
.no-hero-copy p,.no-panel-head p,.no-metric-card p,.no-info-card p,.no-check-card p,.no-language-card p,.no-fit-card p{
    margin:0;
    color:var(--color-text-muted);
    line-height:1.65;
}
.no-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.no-chip-row span{
    display:inline-flex;
    align-items:center;
    min-height:30px;
    padding:0 10px;
    border-radius:999px;
    background:var(--color-surface-alt);
    color:var(--color-text-muted);
    font-size:.78rem;
}
.no-hero-stats,.no-card-grid,.no-fit-card-grid,.no-check-grid{display:grid;gap:12px}
.no-hero-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
.no-stat-card,.no-info-card,.no-metric-card,.no-check-card,.no-language-card,.no-fit-card{
    border-radius:10px;
    padding:14px;
}
.no-stat-card,.no-info-card{background:var(--color-surface-alt)}
.no-stat-card span,.no-info-card span,.no-metric-card span,.no-breakdown-meta span,.no-line-item span{
    color:var(--color-text-muted);
    font-size:.78rem;
}
.no-stat-card strong,.no-info-card strong,.no-metric-card strong{
    display:block;
    margin-top:5px;
    color:var(--color-projects);
    font-family:var(--font-heading);
    font-size:1.4rem;
}
.no-panel-head{margin-bottom:16px}
.no-panel-head h2,.no-section-heading h3,.no-line-panel h3,.no-language-card h3,.no-fit-card h3,.no-check-card h3{
    margin:0;
}
.no-section-heading{display:grid;gap:4px}
.no-panel-head p{margin-top:6px;font-size:.89rem}
.no-section-heading + .no-card-grid,.no-section-heading + .no-breakdown-list{margin-top:10px}
.no-card-grid + .no-section-heading{margin-top:16px}
.no-section-block{display:grid;gap:16px;scroll-margin-top:120px}
.no-demo-toolbar{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-bottom:14px;
}
.no-demo-toolbar button{
    padding:10px 12px;
    border:1px solid var(--color-border);
    border-radius:10px;
    background:var(--color-surface-alt);
    color:var(--color-text);
    cursor:pointer;
    font:inherit;
}
.no-demo-toolbar button.active{
    border-color:var(--color-projects);
    background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface));
}
.no-demo-layout{
    display:grid;
    grid-template-columns:minmax(0,1.18fr) minmax(260px,.82fr);
    gap:14px;
}
.no-media-panel,.no-demo-notes,.no-breakdown-list,.no-line-list,.no-fit-grid{display:grid;gap:12px}
.no-media-frame{
    margin:0;
    border:1px solid var(--color-border);
    border-radius:12px;
    overflow:hidden;
    background:#f3efe8;
}
.no-media-frame img{
    display:block;
    width:100%;
    height:auto;
}
.no-media-frame figcaption{
    padding:12px 14px;
    border-top:1px solid var(--color-border);
    background:var(--color-surface);
    color:var(--color-text-muted);
    font-size:.82rem;
    line-height:1.55;
}
.no-text-output{
    border:1px solid var(--color-border);
    border-radius:12px;
    background:#101418;
    overflow:auto;
}
.no-text-output pre{
    margin:0;
    padding:16px;
    color:#dce6ef;
    font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;
    font-size:.83rem;
    line-height:1.65;
    white-space:pre-wrap;
}
.no-check-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.no-check-head{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:8px;
    margin-bottom:8px;
}
.no-check-head span{
    display:inline-flex;
    align-items:center;
    min-height:26px;
    padding:0 9px;
    border-radius:999px;
    background:color-mix(in srgb,var(--color-projects) 12%,transparent);
    color:var(--color-projects);
    font-size:.72rem;
    font-weight:800;
}
.no-check-card p + p{margin-top:8px}
.no-line-panel{
    margin-top:16px;
    padding:14px;
    border-radius:10px;
    background:var(--color-surface-alt);
}
.no-line-panel h3{font-size:1rem}
.no-line-list{margin-top:10px}
.no-line-item{
    display:grid;
    grid-template-columns:34px minmax(0,1fr);
    align-items:start;
    gap:10px;
}
.no-line-item code{
    overflow-wrap:anywhere;
    color:var(--color-text);
    font-size:.82rem;
}
.no-card-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.no-breakdown{
    margin-top:16px;
    padding:16px;
    border-radius:12px;
    background:var(--color-surface-alt);
}
.no-section-heading p{margin-top:5px}
.no-breakdown-item{display:grid;gap:8px}
.no-breakdown-meta{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
}
.no-breakdown-meta strong{font-size:.9rem}
.no-breakdown-bar{
    height:10px;
    border-radius:999px;
    background:color-mix(in srgb,var(--color-border) 74%,transparent);
    overflow:hidden;
}
.no-breakdown-bar div{
    height:100%;
    border-radius:inherit;
    background:linear-gradient(90deg,var(--color-projects),color-mix(in srgb,var(--color-projects) 40%,#fff));
}
.no-fit-grid{
    grid-template-columns:minmax(280px,.85fr) minmax(0,1.15fr);
    align-items:start;
}
.no-fit-card-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.no-language-card,.no-fit-card{display:grid;gap:10px}
.no-language-card{
    background:
        linear-gradient(180deg,color-mix(in srgb,var(--color-projects) 10%,transparent),transparent 48%),
        var(--color-surface);
}
@media (max-width:900px){
    .no-showcase-main{grid-column:1;grid-row:auto}
    .no-hero,.no-demo-layout,.no-fit-grid{grid-template-columns:1fr}
}
@media (max-width:640px){
    .no-hero,.no-panel{padding:14px}
    .no-hero-stats,.no-card-grid,.no-fit-card-grid{grid-template-columns:1fr}
}
`;
