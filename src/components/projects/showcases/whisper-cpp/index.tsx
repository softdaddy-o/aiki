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

interface WhisperCppShowcaseProps {
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
    surfaceTitle: string;
    surfaceItems: string[];
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

interface ModelSizeCard {
    title: string;
    disk: string;
    memory: string;
}

interface SampleDownloadLink {
    label: string;
    href: string;
    downloadName?: string;
    external?: boolean;
}

interface SampleAudioCard {
    title: string;
    kicker: string;
    body: string;
    audioSrc: string;
    referenceText: string;
    verificationText: string;
    note: string;
    chips: string[];
    links: SampleDownloadLink[];
}

type SectionId = 'hero' | 'cases' | 'samples' | 'matrix' | 'takeaway' | 'decide' | 'adopt' | 'ops' | 'compare' | 'fact';

const SECTION_PREFIX = 'wc-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '한눈 요약과 메타' },
    { id: 'cases', label: '실행 흐름', description: 'CLI / VAD / server' },
    { id: 'samples', label: '샘플 오디오', description: 'download + ko sample' },
    { id: 'matrix', label: '매트릭스', description: 'backend와 model size' },
    { id: 'takeaway', label: '판단 요약', description: '30초 결론' },
    { id: 'decide', label: '도입 판단', description: 'USE / SKIP' },
    { id: 'adopt', label: '적용 순서', description: 'quick start에서 운영까지' },
    { id: 'ops', label: '운영 포인트', description: '메모리와 오디오 전처리' },
    { id: 'compare', label: '비교 대상', description: '다른 STT 선택지와 차이' },
    { id: 'fact', label: '팩트 체크', description: '검증 상태' },
] as const;

const CASES: ReadonlyArray<CaseStudy> = [
    {
        id: 'cli',
        label: 'CLI',
        useCase: 'offline file transcription',
        commandTitle: 'windows release CLI check',
        command: `whisper-cli.exe -m .\\models\\ggml-tiny.en.bin -f .\\jfk.wav --no-gpu`,
        commandNote: '이번 Windows x64 검증에서 실제로 돌린 명령이야. release binary와 `ggml-tiny.en.bin`만으로 샘플 전사를 먼저 확인했다.',
        outcomeTitle: '직접 실행에서 본 것',
        outcome: '11초 `jfk.wav`가 `And so my fellow Americans...` 문장으로 바로 전사됐고, total time은 903.41 ms였다. 로그에는 `no GPU found`가 찍혀서 CPU-only 출발선도 바로 볼 수 있었다.',
        surfaceTitle: '직접 본 결과',
        surfaceItems: [
            '`ggml-tiny.en.bin` 모델 크기 약 77.11 MB 로그 확인',
            'load time 113.78 ms',
            'total time 903.41 ms',
            'sample transcription 문장 반환 확인',
        ],
        watchFor: [
            '이번 테스트는 tiny.en + CPU-only 기준이라는 점',
            '로그에 `whisper_backend_init_gpu: no GPU found`가 찍힌 점',
            'mp3 등 다른 포맷은 ffmpeg 전처리가 여전히 필요하다는 점',
        ],
        chips: ['tiny.en', 'cpu-only', '903 ms', 'jfk.wav'],
    },
    {
        id: 'vad',
        label: 'VAD',
        useCase: 'speech-only long recordings',
        commandTitle: 'vad extension',
        command: `./models/download-vad-model.sh silero-v6.2.0\n./build/bin/whisper-cli \\\n  --file ./samples/jfk.wav \\\n  --model ./models/ggml-base.en.bin \\\n  --vad \\\n  --vad-model ./models/ggml-silero-v6.2.0.bin`,
        commandNote: 'VAD는 whisper 자체가 아니라 별도 모델과 옵션 조합이야. 이번 로컬 검증에서는 실제로 돌리지 않았고, README 기준 확장 경로로만 확인했다.',
        outcomeTitle: 'README 기준 확장 포인트',
        outcome: 'speech segment만 먼저 뽑아서 whisper에 넘기기 때문에 긴 음성이나 silence가 많은 입력에서 처리량 체감이 좋아질 수 있다.',
        surfaceTitle: '적용 조건',
        surfaceItems: [
            'Silero VAD model 별도 다운로드',
            '`--vad`, `--vad-model` 조합으로 활성화',
            'speech / silence threshold 옵션 제공',
            'long audio 최적화용 확장 경로',
        ],
        watchFor: [
            'VAD model을 따로 챙겨야 한다는 점',
            'threshold와 silence 옵션을 안 맞추면 과하게 자를 수 있는 점',
            'managed diarization과는 책임 범위가 다르다는 점',
        ],
        chips: ['VAD', 'silero-v6.2.0', 'long audio', 'speech segments'],
    },
    {
        id: 'server',
        label: 'Server',
        useCase: 'self-hosted STT endpoint',
        commandTitle: 'local server check',
        command: `whisper-server.exe --host 127.0.0.1 --port 18091 --model .\\models\\ggml-tiny.en.bin --no-gpu`,
        commandNote: '이것도 이번 Windows 검증에서 실제로 띄운 명령이야. 루트 `/`에 내장 HTML form이 올라오고, Playwright로 `jfk.wav`를 업로드해 `/inference` 응답까지 확인했다.',
        outcomeTitle: '브라우저에서 본 것',
        outcome: '서버 루트는 바로 `Whisper.cpp Server` 폼을 보여 줬고, 샘플 음성을 제출하자 `/inference`에서 JFK 문장이 텍스트로 반환됐다. CLI에서 끝나지 않고 self-hosted endpoint로 자연스럽게 이어진다.',
        surfaceTitle: 'server 경로에서 확인한 것',
        surfaceItems: [
            '루트 `/`에서 즉시 HTML form 제공',
            '`/inference` multipart 업로드 경로 기본 탑재',
            'response_format `text` 제출 시 바로 문장 반환',
            '브라우저 테스트만으로 endpoint 감각 확인 가능',
        ],
        watchFor: [
            'model 경로와 backend 선택을 직접 관리해야 함',
            'server는 transcription endpoint이지 전체 speech platform은 아님',
            'storage, monitoring, auth는 별도 구성해야 함',
        ],
        chips: ['server', 'html form', '/inference', 'Playwright'],
    },
] as const;

const BACKEND_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'CPU / BLAS',
        body: 'CPU-only inference로도 시작할 수 있고, BLAS를 붙여 encoder 처리량을 올리는 경로가 있다.',
        chips: ['cpu-only', 'GGML_BLAS=1'],
    },
    {
        title: 'Metal / Core ML',
        body: 'Apple Silicon에서는 Metal과 Core ML 경로가 강력하다. 온디바이스와 Mac 로컬 실험에 바로 맞는다.',
        chips: ['metal', 'core ml', 'apple silicon'],
    },
    {
        title: 'CUDA / Vulkan / OpenVINO',
        body: 'NVIDIA GPU, cross-vendor Vulkan, Intel OpenVINO 경로가 다 따로 있다. 하드웨어에 맞춰 골라 쓰는 감각이 핵심이다.',
        chips: ['cuda', 'vulkan', 'openvino'],
    },
    {
        title: 'WASM / Docker / bindings',
        body: 'same core를 browser, container, Rust, JS, Go, Ruby, Swift, Java 쪽으로 재사용할 수 있다.',
        chips: ['wasm', 'docker', 'bindings'],
    },
] as const;

const MODEL_SIZE_CARDS: ReadonlyArray<ModelSizeCard> = [
    { title: 'tiny', disk: '75 MiB', memory: '~273 MB' },
    { title: 'base', disk: '142 MiB', memory: '~388 MB' },
    { title: 'small', disk: '466 MiB', memory: '~852 MB' },
    { title: 'medium', disk: '1.5 GiB', memory: '~2.1 GB' },
    { title: 'large', disk: '2.9 GiB', memory: '~3.9 GB' },
] as const;

const SAMPLE_AUDIO_CARDS: ReadonlyArray<SampleAudioCard> = [
    {
        title: '공식 JFK 샘플',
        kicker: 'repo sample',
        body: '이번 CLI와 server 검증에 쓴 `jfk.wav`는 따로 구한 파일이 아니라 whisper.cpp repo에 기본으로 들어 있는 `samples/jfk.wav`다. 같은 폴더에 `samples/jfk.mp3`도 같이 있다.',
        audioSrc: '/whisper-cpp/jfk.wav',
        referenceText: 'And so my fellow Americans ask not what your country can do for you...',
        verificationText: 'Windows x64 release + tiny.en + CPU-only로 903.41 ms에서 전사 확인',
        note: 'README quick start, bindings test, examples가 모두 `samples/jfk.wav`를 기본 샘플로 참조한다.',
        chips: ['11.0 sec', 'WAV 344 KB', 'MP3 75 KB', 'repo basic sample'],
        links: [
            { label: 'jfk.wav 다운로드', href: '/whisper-cpp/jfk.wav', downloadName: 'whisper-cpp-jfk.wav' },
            { label: 'jfk.mp3 다운로드', href: '/whisper-cpp/jfk.mp3', downloadName: 'whisper-cpp-jfk.mp3' },
            { label: 'GitHub source', href: 'https://github.com/ggml-org/whisper.cpp/blob/master/samples/jfk.wav', external: true },
        ],
    },
    {
        title: '한국어 검증 샘플',
        kicker: 'local ko sample',
        body: '한국어도 바로 내려받아 테스트할 수 있게 이 환경에 있는 `Microsoft Heami Desktop - Korean` 음성으로 짧은 샘플을 만들고 16 kHz mono WAV로 맞췄다.',
        audioSrc: '/whisper-cpp/ko-sample.wav',
        referenceText: '안녕하세요. 이 파일은 whisper cpp 쇼케이스용 한국어 샘플입니다. 로컬 음성 인식이 실제로 어떻게 동작하는지 확인하려고 만들었습니다.',
        verificationText: 'base 다국어 모델 + `-l ko`에서 `위스포시피피`처럼 제품명 한 군데는 살짝 틀렸지만 나머지 문장은 그대로 읽었다.',
        note: 'Windows x64 release `whisper-cli.exe`와 `ggml-base.bin`으로 실제 전사했고 total time은 2421.81 ms였다.',
        chips: ['14.3 sec', 'WAV 447 KB', 'base multilingual', '2421.81 ms'],
        links: [
            { label: 'ko-sample.wav 다운로드', href: '/whisper-cpp/ko-sample.wav', downloadName: 'whisper-cpp-ko-sample.wav' },
        ],
    },
] as const;

const TAKE_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'tiny.en + CPU-only 릴리스 바이너리만으로도 11초 샘플이 1초 안쪽에서 끝났다.',
        body: '이번 Windows x64 검증에서 `whisper-cli` total time은 903.41 ms였고, 로그는 GPU 없이도 바로 돌아가는 출발선을 보여 줬다.',
        tone: 'accent',
    },
    {
        title: '내장 server form도 실제로 바로 쓸 수 있었다.',
        body: '루트 `/`의 HTML 폼에 `jfk.wav`를 올리자 `/inference`에서 전사 문장이 텍스트로 반환됐다. 자체 STT endpoint의 최소 형태는 이미 갖춰져 있다.',
    },
    {
        title: 'VAD와 server는 확장 경로지 마법 버튼이 아니다.',
        body: '추가 모델과 추가 책임이 붙는다. long audio와 self-hosted endpoint가 필요할 때만 열면 된다.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '오프라인 또는 프라이버시 중심 음성 처리',
        body: '오디오를 외부 API로 보내기 어렵거나 보내고 싶지 않으면 whisper.cpp가 바로 설득력을 가진다.',
        chips: ['offline', 'privacy'],
    },
    {
        title: '하드웨어 맞춤 최적화',
        body: 'Apple Silicon, CUDA GPU, OpenVINO, WASM처럼 이미 가진 하드웨어나 배포 경로에 맞춰 움직일 때 잘 맞는다.',
        chips: ['metal', 'cuda', 'openvino', 'wasm'],
    },
    {
        title: '자체 STT endpoint',
        body: 'CLI에서 시작해서 Docker나 server example로 internal speech API를 만들고 싶은 팀이면 흐름이 자연스럽다.',
        chips: ['server', 'docker', 'self-hosted'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'managed speech platform 기대',
        body: '저장, 모니터링, diarization, SLA까지 통째로 원하면 whisper.cpp만으로는 책임 범위가 부족하다.',
        chips: ['managed API', 'platform'],
    },
    {
        title: '모델 파일과 build flag를 만지고 싶지 않을 때',
        body: 'download, backend 선택, ffmpeg 전처리 같은 운영 요소가 싫으면 다른 선택지가 더 편하다.',
        chips: ['ops overhead', 'build flags'],
    },
    {
        title: '메모리 여유가 작은 장비에서 큰 모델을 바로 굴릴 때',
        body: '모델 크기 차이가 커서, 장비에 맞는 size와 backend를 먼저 고르지 않으면 체감이 빠르게 무너진다.',
        chips: ['memory', 'model sizing'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        title: '1. Quick start',
        command: 'download base.en + build whisper-cli',
        body: 'official quick start를 그대로 따라가서 local build와 샘플 transcription 감각부터 확인한다.',
    },
    {
        title: '2. Choose backend',
        command: 'CPU / Metal / Core ML / CUDA / Vulkan / OpenVINO',
        body: '우리 하드웨어에서 어떤 backend가 맞는지 먼저 고르고, 그 뒤에 model size를 정한다.',
    },
    {
        title: '3. Fix audio path',
        command: '16-bit WAV or FFmpeg pipeline',
        body: '입력 포맷과 전처리 경로를 정하지 않으면 운영이 금방 지저분해진다.',
    },
    {
        title: '4. Add extensions',
        command: 'VAD or whisper-server only if needed',
        body: 'long audio면 VAD, internal endpoint면 server를 붙인다. 처음부터 다 열 필요는 없다.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'model size가 곧 운영 비용이다.',
        body: 'README 메모리 표만 봐도 base에서 large로 갈 때 요구량이 급격히 커진다. model choice를 먼저 좁혀야 한다.',
        chips: ['base ~388 MB', 'large ~3.9 GB'],
    },
    {
        title: 'audio preprocessing을 무시하면 바로 막힌다.',
        body: '`whisper-cli`는 기본적으로 16-bit WAV 기준이어서, mp3나 다른 포맷은 ffmpeg 경로를 같이 챙겨야 한다.',
        chips: ['ffmpeg', '16-bit wav'],
    },
    {
        title: 'backend 선택은 compile time 감각도 포함한다.',
        body: 'CUDA, Core ML, OpenVINO, Vulkan은 단순 옵션이 아니라 팀의 build 환경과 배포 체인까지 같이 건드린다.',
        chips: ['compile flags', 'deployment chain'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: 'OpenAI Whisper Python',
        fit: '원본 Python 생태계와 연구용 흐름을 더 직접 따라가고 싶을 때',
        tradeoff: '온디바이스와 C/C++ 배포, backend 최적화 감각은 whisper.cpp가 더 직접적이다.',
    },
    {
        title: 'Managed speech API',
        fit: '결과만 빨리 받고 storage, monitoring, SLA까지 같이 받고 싶을 때',
        tradeoff: '오프라인 제어권과 local hardware 최적화는 약해진다.',
    },
    {
        title: 'whisper.cpp',
        fit: 'offline, self-hosted, on-device, backend tuning이 중요할 때',
        tradeoff: 'model file, build flag, preprocessing, runtime ownership을 팀이 직접 가져가야 한다.',
    },
] as const;

export default function WhisperCppShowcase(props: WhisperCppShowcaseProps) {
    const { title, summary, tags, sourceMeta, metricValue, license, slug } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="wc-showcase" data-project={slug}>
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="wc-main">
                <section className="wc-hero" id={`${SECTION_PREFIX}hero`}>
                    <ShowcaseMetaHero
                        id={`${SECTION_PREFIX}hero`}
                        className="wc-hero"
                        heroCopyClassName="wc-hero-copy"
                        metaGridClassName="wc-meta-grid"
                        metaCardClassName="wc-meta-card"
                        metaSourceCardClassName="wc-meta-card--source"
                        metaMarkClassName="wc-meta-mark"
                        metaCopyClassName="wc-meta-copy"
                        tagRowClassName="wc-tag-row"
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
                    title="실행 흐름"
                    description={<>이 repo는 기본 CLI, <TermHint term="VAD" description="먼저 음성 구간만 잘라내서 ASR에 넘기는 확장 경로야. silence가 많은 입력에서 효율이 올라갈 수 있다." /> 확장, server 경로까지 한 코어로 이어 간다. 같은 whisper라도 hosted API가 아니라 runtime을 직접 쥐는 쪽에 가깝다.</>}
                >
                    <article className="wc-card wc-card--accent wc-overview-card">
                        <CardHeader kicker="showcase overview" title="쇼케이스 개요" pill="offline first" />
                        <p>{summary}</p>
                        <div className="wc-chip-row">
                            <span>CLI first</span>
                            <span>backend aware</span>
                            <span>v1.8.4</span>
                        </div>
                    </article>

                    <div className="wc-case-tabs" role="tablist" aria-label="whisper.cpp use cases">
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

                    <div className="wc-case-grid">
                        <article className="wc-card">
                            <CardHeader kicker="command" title={activeCase.commandTitle} pill={activeCase.label} />
                            <pre>{activeCase.command}</pre>
                            <p className="wc-muted-copy">{activeCase.commandNote}</p>
                        </article>

                        <article className="wc-card">
                            <CardHeader kicker="why now" title={activeCase.outcomeTitle} />
                            <p>{activeCase.outcome}</p>
                            <div className="wc-chip-row">
                                {activeCase.chips.map((chip) => (
                                    <span key={chip}>{chip}</span>
                                ))}
                            </div>
                        </article>

                        <article className="wc-card">
                            <CardHeader kicker="check" title={activeCase.surfaceTitle} />
                            <ul className="wc-list">
                                {activeCase.surfaceItems.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>

                        <article className="wc-card">
                            <CardHeader kicker="watch" title="이 케이스에서 먼저 볼 것" />
                            <ul className="wc-list">
                                {activeCase.watchFor.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}samples`}
                    title="샘플 오디오"
                    description={<>`samples/jfk.wav`는 repo 기본 샘플이고, `make samples`를 돌리면 Wikipedia와 공개 클립을 더 받아 16-bit WAV로 맞춘다. 이번 페이지에는 바로 들어볼 수 있게 공식 JFK 샘플과 한국어 검증용 샘플을 같이 붙였다.</>}
                >
                    <div className="wc-sample-grid">
                        {SAMPLE_AUDIO_CARDS.map((item) => (
                            <SampleAudioPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}matrix`}
                    title="backend + model size 매트릭스"
                    description={<>이 프로젝트는 backend와 model size를 같이 봐야 한다. 같은 Whisper라도 어떤 <TermHint term="backend" description="CPU, Metal, CUDA, Vulkan, OpenVINO처럼 실제 inference를 어디서 어떤 빌드 옵션으로 돌릴지 정하는 실행 경로야." /> 를 고르고 어떤 모델 크기를 쓰느냐에 따라 체감이 완전히 달라진다.</>}
                >
                    <div className="wc-matrix-stack">
                        <div className="wc-backend-grid">
                            {BACKEND_CARDS.map((item) => (
                                <ContentPanelCard key={item.title} item={item} />
                            ))}
                        </div>
                        <div className="wc-model-grid">
                            {MODEL_SIZE_CARDS.map((item) => (
                                <article key={item.title} className="wc-model-card">
                                    <CardHeader title={item.title} />
                                    <div className="wc-model-metrics">
                                        <span>Disk</span>
                                        <strong>{item.disk}</strong>
                                        <span>Memory</span>
                                        <strong>{item.memory}</strong>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="판단 요약">
                    <div className="wc-insight-grid wc-insight-grid--takeaway">
                        {TAKE_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="도입 판단">
                    <div className="wc-split-grid">
                        <section className="wc-split-panel fit">
                            <div className="wc-split-title">USE IT</div>
                            <div className="wc-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="wc-split-panel skip">
                            <div className="wc-split-title">SKIP IT</div>
                            <div className="wc-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="적용 순서">
                    <div className="wc-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="wc-step-card">
                                <CardHeader kicker="step" title={item.title} />
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 포인트">
                    <div className="wc-insight-grid">
                        {OPS_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="비교 대상">
                    <div className="wc-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="wc-compare-card">
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
        <section className="wc-panel" id={id}>
            <div className="wc-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function CardHeader({ kicker, title, pill }: { kicker?: string; title: string; pill?: string }) {
    return (
        <div className="wc-card-head">
            <div className="wc-card-title">
                {kicker ? <span className="wc-kicker">{kicker}</span> : null}
                <h3>{title}</h3>
            </div>
            {pill ? <span className="wc-pill">{pill}</span> : null}
        </div>
    );
}

function ContentPanelCard({ item }: { item: ContentCard }) {
    return (
        <article className={`wc-card ${item.tone === 'accent' ? 'wc-card--accent' : ''}`.trim()}>
            <CardHeader title={item.title} />
            <p>{item.body}</p>
            {item.chips && (
                <div className="wc-chip-row">
                    {item.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

function SampleAudioPanelCard({ item }: { item: SampleAudioCard }) {
    return (
        <article className="wc-sample-card">
            <CardHeader kicker={item.kicker} title={item.title} />
            <p>{item.body}</p>
            <audio className="wc-audio" controls preload="none" src={item.audioSrc} />
            <div className="wc-link-row">
                {item.links.map((link) => (
                    <a
                        key={`${item.title}-${link.label}`}
                        href={link.href}
                        download={link.external ? undefined : link.downloadName}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <div className="wc-quote-stack">
                <div className="wc-quote-card">
                    <span>샘플 문장</span>
                    <p>{item.referenceText}</p>
                </div>
                <div className="wc-quote-card">
                    <span>실행 확인</span>
                    <p>{item.verificationText}</p>
                </div>
            </div>
            <p className="wc-muted-copy">{item.note}</p>
            <div className="wc-chip-row">
                {item.chips.map((chip) => (
                    <span key={`${item.title}-${chip}`}>{chip}</span>
                ))}
            </div>
        </article>
    );
}

const showcaseCss = `
${createSharedShowcaseChromeCss({
    rootClass: 'wc-showcase',
    heroClass: 'wc-hero',
    panelClass: 'wc-panel',
    heroCopyClass: 'wc-hero-copy',
    metaGridClass: 'wc-meta-grid',
    metaCardClass: 'wc-meta-card',
    metaSourceCardClass: 'wc-meta-card--source',
    metaMarkClass: 'wc-meta-mark',
    metaCopyClass: 'wc-meta-copy',
    tagRowClass: 'wc-tag-row',
    heroCopyMaxWidth: '780px',
})}
.wc-main{grid-column:2;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.wc-hero,.wc-panel{scroll-margin-top:100px}
.wc-hero-copy h1{font-size:clamp(2.2rem,5.4vw,4.9rem);line-height:.94;letter-spacing:-.03em}
.wc-hero-copy p{color:var(--color-text);font-size:clamp(1rem,1.28vw,1.12rem)}
.wc-panel{display:grid;gap:0}
.wc-panel-head{display:grid;gap:8px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid color-mix(in srgb,var(--color-border) 84%,transparent)}
.wc-panel-head h2{margin:0;font-size:1.18rem}
.wc-panel-head p{margin:0;max-width:760px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.wc-card,.wc-step-card,.wc-compare-card,.wc-model-card,.wc-sample-card{display:grid;gap:12px;padding:16px;border:1px solid var(--color-border);border-radius:10px;background:var(--color-surface);min-width:0}
.wc-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.wc-overview-card{margin-bottom:16px}
.wc-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.wc-card-title{display:grid;gap:5px;min-width:0}
.wc-card-title h3{margin:0;font-size:1.04rem;line-height:1.3;word-break:keep-all}
.wc-kicker{color:var(--color-projects);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.wc-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.wc-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.wc-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.wc-case-tabs button strong{font-size:.92rem}
.wc-case-tabs button span{color:var(--color-text-muted);font-size:.78rem}
.wc-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.wc-case-grid,.wc-sample-grid,.wc-backend-grid,.wc-insight-grid,.wc-adoption-grid,.wc-compare-grid{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.wc-insight-grid--takeaway{grid-template-columns:repeat(3,minmax(0,1fr))}
.wc-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.wc-chip-row{display:flex;flex-wrap:wrap;gap:8px}
.wc-chip-row span{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.wc-list{display:grid;gap:8px;margin:0;padding-left:18px;line-height:1.68}
.wc-card p,.wc-step-card p,.wc-compare-card p span,.wc-sample-card p,.wc-quote-card p{margin:0;line-height:1.7;word-break:keep-all}
.wc-muted-copy{color:var(--color-text-muted);font-size:.9rem}
.wc-card pre,.wc-step-card code{display:block;margin:0;max-width:100%;min-width:0;overflow:auto;border-radius:12px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6}
.wc-audio{display:block;width:100%}
.wc-link-row{display:flex;flex-wrap:wrap;gap:8px}
.wc-link-row a{display:inline-flex;align-items:center;min-height:30px;padding:0 12px;border:1px solid var(--color-border);border-radius:999px;background:var(--color-surface-alt);color:var(--color-text);font-size:.8rem;font-weight:700;text-decoration:none}
.wc-link-row a:hover{text-decoration:underline}
.wc-quote-stack{display:grid;gap:10px}
.wc-quote-card{display:grid;gap:6px;padding:12px;border:1px solid var(--color-border);border-radius:10px;background:color-mix(in srgb,var(--color-surface) 88%,var(--color-surface-alt))}
.wc-quote-card span{color:var(--color-text-muted);font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.wc-matrix-stack{display:grid;gap:14px}
.wc-model-grid{display:grid;gap:14px;grid-template-columns:repeat(5,minmax(0,1fr))}
.wc-model-card{background:color-mix(in srgb,var(--color-surface) 90%,var(--color-surface-alt))}
.wc-model-metrics{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 12px}
.wc-model-metrics span{color:var(--color-text-muted);font-size:.76rem;font-weight:800;text-transform:uppercase}
.wc-model-metrics strong{overflow-wrap:anywhere}
.wc-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.wc-split-panel{display:grid;gap:14px;padding:18px;border-radius:18px;background:var(--color-surface-alt)}
.wc-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.wc-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.wc-split-title{color:var(--color-projects);font-size:.82rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.wc-compare-card p{display:grid;gap:4px;margin:0}
.wc-compare-card strong{color:var(--color-text);font-size:.82rem}
.wc-compare-card span{color:var(--color-text-muted)}
@media (max-width:1200px){
  .wc-model-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .wc-insight-grid--takeaway,.wc-adoption-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:980px){
  .wc-case-grid,.wc-sample-grid,.wc-backend-grid,.wc-insight-grid,.wc-insight-grid--takeaway,.wc-adoption-grid,.wc-compare-grid,.wc-model-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:900px){
  .wc-main{grid-column:1}
}
@media (max-width:720px){
  .wc-case-tabs button{min-width:0;width:100%}
  .wc-hero-copy h1{font-size:clamp(2rem,8vw,3.4rem)}
}
`;
