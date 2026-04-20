import { useState } from 'react';
import type { ReactNode } from 'react';
import ShowcaseSectionNav from '../ShowcaseSectionNav';
import TermHint from '../TermHint';
import useShowcaseSectionNav from '../useShowcaseSectionNav';

interface ShowcaseSourceMeta {
    provider: string;
    metricLabel: string;
    mark: string;
    className: string;
    path: string;
    itemLabel?: string;
}

interface ManifestShowcaseProps {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    sourceMeta: ShowcaseSourceMeta;
    metricValue: string;
    license: string;
}

interface LocalMetric {
    label: string;
    value: string;
}

interface DemoCase {
    id: string;
    label: string;
    useCase: string;
    prompt: string;
    sourceLabel: string;
    sourceUrl: string;
    sourceNote: string;
    requestTitle: string;
    requestSnippet: string;
    localSummary: string;
    localMetrics: LocalMetric[];
    effectiveSlot: string;
    effectiveSummary: string;
    modelExamples: string[];
    headerLines: string[];
}

interface ContentCard {
    kicker?: string;
    title: string;
    body: string;
    chips?: string[];
    tone?: 'accent' | 'default';
}

interface StepCard {
    kicker?: string;
    title: string;
    command: string;
    body: string;
}

interface CompareCard {
    title: string;
    fit: string;
    tradeoff: string;
}

interface ModelSlotCard {
    kicker?: string;
    title: string;
    goal: string;
    picks: string[];
    note: string;
    tone?: 'accent' | 'default';
}

type SectionId =
    | 'hero'
    | 'spec'
    | 'cases'
    | 'stack'
    | 'takeaway'
    | 'decide'
    | 'adopt'
    | 'ops'
    | 'compare'
    | 'fact';

const SECTION_PREFIX = 'mf-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '개요', description: '프로젝트 한 줄 요약과 메타' },
    { id: 'spec', label: '프로젝트 스펙', description: 'repo 기준 핵심 구조' },
    { id: 'cases', label: '로컬 테스트', description: '실제 scorer run 결과' },
    { id: 'stack', label: '슬롯 설계', description: '운영용 모델 후보' },
    { id: 'takeaway', label: '판단 요약', description: '30초 요약' },
    { id: 'decide', label: '도입 판단', description: 'USE / SKIP' },
    { id: 'adopt', label: '적용 순서', description: '설치부터 검증까지' },
    { id: 'ops', label: '운영 포인트', description: '헤더와 fallback 관찰' },
    { id: 'compare', label: '비교 대상', description: '다른 선택지와 차이' },
    { id: 'fact', label: '팩트 체크', description: '검증 상태' },
] as const;

const SPEC_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'OpenAI-compatible 진입점',
        body: 'SDK에서는 baseURL만 Manifest로 바꾸고 model은 "auto"로 둔다. OpenAI SDK, Vercel AI SDK, LangChain, cURL 예시가 repo에 같이 있다.',
        chips: ['model: "auto"', 'OpenAI SDK', 'Vercel AI SDK', 'LangChain'],
    },
    {
        title: '23-dimension scorer + 4 generalist tiers',
        body: 'README와 tiers 파일 기준으로 simple, standard, complex, reasoning 네 단계가 있고, scorer는 under 2ms를 목표로 둔다.',
        chips: ['23-dimension', 'under 2ms', 'simple', 'reasoning'],
    },
    {
        title: '업무별 specificity 분기',
        body: 'repo 테스트 corpus에는 coding, email_management, calendar_management 같은 specificity가 따로 있다. 여기서 Manifest의 실제 차별점이 나온다.',
        chips: ['coding', 'email_management', 'calendar_management'],
    },
    {
        title: '헤더로 라우팅 결과 확인',
        body: 'proxy-response-handler가 X-Manifest-Tier, X-Manifest-Reason, X-Manifest-Specificity 같은 값을 응답 헤더로 내보낸다. 관측성은 대시보드보다 이 헤더가 핵심이다.',
        chips: ['X-Manifest-Tier', 'X-Manifest-Reason', 'X-Manifest-Specificity'],
    },
] as const;

const CASES: ReadonlyArray<DemoCase> = [
    {
        id: 'simple',
        label: 'Simple',
        useCase: '짧은 사실 질의',
        prompt: 'What is the capital of France?',
        sourceLabel: 'score-request.spec.ts',
        sourceUrl: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/score-request.spec.ts',
        sourceNote: 'repo test prompt를 그대로 로컬 scorer에 넣었다.',
        requestTitle: 'OpenAI TypeScript SDK',
        requestSnippet: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:38238/v1",
  apiKey: process.env.MANIFEST_API_KEY,
});

const response = await client.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "What is the capital of France?" }],
});`,
        localSummary: '2026-04-20 로컬 scorer run에서 simple tier로 분류됐다. specificity는 붙지 않았고, reason은 short_message였다.',
        localMetrics: [
            { label: 'tier', value: 'simple' },
            { label: 'reason', value: 'short_message' },
            { label: 'confidence', value: '0.900' },
            { label: 'specificity', value: 'none' },
        ],
        effectiveSlot: 'simple',
        effectiveSummary: '실제로 읽어야 할 슬롯은 simple 하나다. coding이나 calendar 같은 specificity slot은 붙지 않았다.',
        modelExamples: ['GPT-4.1 Nano', 'GPT-4o Mini', 'Claude Haiku 4.5'],
        headerLines: [
            'X-Manifest-Tier: simple',
            'X-Manifest-Reason: short_message',
            'X-Manifest-Specificity: <absent>',
        ],
    },
    {
        id: 'coding',
        label: 'Coding',
        useCase: '코드 수정 요청',
        prompt: 'fix this bug in my react component',
        sourceLabel: 'specificity-coverage.spec.ts',
        sourceUrl: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/specificity-coverage.spec.ts',
        sourceNote: 'repo specificity coverage prompt를 그대로 재사용했다.',
        requestTitle: 'Vercel AI SDK',
        requestSnippet: `import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const manifest = createOpenAI({
  baseURL: "http://localhost:38238/v1",
  apiKey: process.env.MANIFEST_API_KEY,
});

const { text } = await generateText({
  model: manifest("auto"),
  prompt: "fix this bug in my react component",
});`,
        localSummary: '2026-04-20 로컬 scorer run에서 complex tier까지 올라갔고, specificity는 coding으로 잠겼다. 이 케이스는 범용 complex보다 coding slot 해석이 더 중요하다.',
        localMetrics: [
            { label: 'tier', value: 'complex' },
            { label: 'reason', value: 'scored' },
            { label: 'confidence', value: '0.646' },
            { label: 'specificity', value: 'coding' },
            { label: 'specificity confidence', value: '1.000' },
        ],
        effectiveSlot: 'coding',
        effectiveSummary: '운영에서는 complex 공용 슬롯보다 coding specificity slot을 우선 읽는 편이 맞다. 실제 모델도 coding 전용 슬롯 기준으로 고르는 편이 안정적이다.',
        modelExamples: ['GPT-5.2 Codex', 'Claude Sonnet 4.6', 'Grok Code Fast 1'],
        headerLines: [
            'X-Manifest-Tier: complex',
            'X-Manifest-Reason: scored',
            'X-Manifest-Specificity: coding',
        ],
    },
    {
        id: 'calendar',
        label: 'Calendar',
        useCase: '일정형 업무 요청',
        prompt: 'schedule a budget review meeting',
        sourceLabel: 'specificity-coverage.spec.ts',
        sourceUrl: 'https://github.com/mnfst/manifest/blob/main/packages/backend/src/scoring/__tests__/specificity-coverage.spec.ts',
        sourceNote: 'repo specificity coverage prompt를 그대로 재사용했다.',
        requestTitle: 'cURL + headers',
        requestSnippet: `curl -i -X POST http://localhost:38238/v1/chat/completions \\
  -H "Authorization: Bearer $MANIFEST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "schedule a budget review meeting"}]
  }'`,
        localSummary: '2026-04-20 로컬 scorer run에서 generalist tier는 standard였고, specificity는 calendar_management로 잡혔다. 일반 채팅과 일정형 요청을 분리하는 예시다.',
        localMetrics: [
            { label: 'tier', value: 'standard' },
            { label: 'reason', value: 'scored' },
            { label: 'confidence', value: '0.608' },
            { label: 'specificity', value: 'calendar_management' },
            { label: 'specificity confidence', value: '0.667' },
        ],
        effectiveSlot: 'calendar_management',
        effectiveSummary: '실제로 읽어야 할 슬롯은 standard generalist가 아니라 calendar_management specificity 쪽이다. 일정형 task는 일반 채팅과 따로 운영하는 편이 낫다.',
        modelExamples: ['GPT-4o Mini', 'GPT-4.1 Mini', 'Claude Haiku 4.5'],
        headerLines: [
            'X-Manifest-Tier: standard',
            'X-Manifest-Reason: scored',
            'X-Manifest-Specificity: calendar_management',
        ],
    },
] as const;

const MODEL_SLOTS: ReadonlyArray<ModelSlotCard> = [
    {
        title: 'Simple slot',
        goal: '짧은 질의, ping, greeting, 가벼운 응답',
        picks: ['GPT-4.1 Nano', 'GPT-4o Mini', 'Claude Haiku 4.5'],
        note: '전체 비용 절감은 여기서 먼저 난다. simple slot이 비싸면 router를 둔 이점이 빠르게 줄어든다.',
    },
    {
        title: 'Standard slot',
        goal: '대부분의 일반 assistant traffic',
        picks: ['GPT-4.1', 'Claude Sonnet 4.6', 'Gemini 2.5'],
        note: '일반 채팅의 기본 슬롯이다. 최고 성능보다 안정적인 가격과 fallback 조합이 중요하다.',
    },
    {
        title: 'Coding slot',
        goal: 'diff, patch, refactor, test loop',
        picks: ['GPT-5.2 Codex', 'Claude Sonnet 4.6', 'Grok Code Fast 1'],
        note: 'Manifest의 coding specificity를 실제 운영 정책으로 연결할 때 가장 먼저 분리해야 하는 슬롯이다.',
    },
    {
        title: 'Reasoning slot',
        goal: 'planning, proof, hard trade-off, critical decisions',
        picks: ['GPT-5.4', 'o3', 'Claude Opus 4.6', 'Gemini 3.1 Pro'],
        note: '정말 어려운 요청에만 열어야 한다. reasoning 슬롯이 넓어지면 비용 제어가 무너진다.',
    },
] as const;

const TAKE_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'Manifest의 핵심은 최고 모델 추천이 아니라 슬롯 설계다.',
        body: 'repo 문서도 tier, specificity, fallback을 중심에 둔다. 이 프로젝트를 볼 때는 모델 이름보다 슬롯 구조를 먼저 읽어야 한다.',
        tone: 'accent',
    },
    {
        title: '로컬 테스트 결과는 스펙 설명과 분리해서 봐야 한다.',
        body: '이번 showcase에서는 repo 기준 스펙 섹션과 2026-04-20 로컬 scorer run 섹션을 따로 두었다. 실제 분류 결과와 문서 요약을 섞으면 해석이 흐려진다.',
    },
    {
        title: 'coding, calendar 같은 specificity가 있어야 router가 살아난다.',
        body: 'simple / standard / complex만으로 끝나면 그냥 tier router다. specificity slot이 붙을 때 Manifest의 운영 이점이 분명해진다.',
    },
] as const;

const FIT_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '여러 provider와 fallback 체인을 직접 운영한다.',
        body: 'connected provider 위에 slot별 primary와 fallback을 설계할수록 Manifest의 가치가 커진다.',
        chips: ['multi-provider', 'fallbacks', 'budget control'],
    },
    {
        title: 'coding, calendar 같은 업무 타입을 분리하고 싶다.',
        body: '이번 로컬 테스트처럼 generalist tier와 specificity를 분리해 읽는 운영팀이면 Manifest가 잘 맞는다.',
        chips: ['coding', 'calendar_management', 'specificity'],
    },
    {
        title: '로컬 구조와 헤더 관측성이 중요하다.',
        body: 'cloud proxy보다 local architecture, 응답 헤더, 직접 제어가 중요하면 Manifest 쪽이 더 설명 가능하다.',
        chips: ['local', 'headers', 'observability'],
    },
] as const;

const SKIP_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: '어차피 항상 같은 플래그십 모델만 쓴다.',
        body: 'slot과 fallback을 운영하지 않을 거면 router를 둔 실익이 작다.',
        chips: ['single model', 'no routing'],
    },
    {
        title: '헤더와 라우팅 정책을 직접 들여다볼 의지가 없다.',
        body: 'Manifest는 알아서 맞춰 주는 black box가 아니다. tier와 specificity를 운영하는 도구에 가깝다.',
        chips: ['ops overhead', 'tuning required'],
    },
    {
        title: 'cloud proxy만으로 충분하고 local 제어가 중요하지 않다.',
        body: 'README의 비교 포인트인 transparency와 local architecture가 중요하지 않으면 차별점이 줄어든다.',
        chips: ['cloud proxy', 'less control'],
    },
] as const;

const ADOPTION_STEPS: ReadonlyArray<StepCard> = [
    {
        kicker: 'step 1',
        title: '설치',
        command: 'bash <(curl -sSL https://raw.githubusercontent.com/mnfst/manifest/main/docker/install.sh)',
        body: 'README 기준 self-hosted 설치는 여기서 시작한다. cloud를 쓰면 app.manifest.build 쪽 onboarding으로 간다.',
    },
    {
        kicker: 'step 2',
        title: '슬롯 정의',
        command: 'simple / standard / coding / reasoning / calendar',
        body: '먼저 슬롯과 fallback 정책을 정하고, 그 다음 provider별 모델을 연결한다. 모델 이름보다 슬롯 설계가 먼저다.',
    },
    {
        kicker: 'step 3',
        title: 'SDK 전환',
        command: 'model: "auto"',
        body: 'agent 코드에서는 baseURL과 model 값만 바꾸는 식으로 붙인다. repo의 snippet을 거의 그대로 가져다 쓸 수 있다.',
    },
    {
        kicker: 'step 4',
        title: '로컬 검증',
        command: 'repo prompts -> scorer run -> X-Manifest-* 확인',
        body: 'score-request.spec.ts와 specificity-coverage.spec.ts의 프롬프트를 그대로 재생해서 tier와 specificity가 의도대로 나오는지 먼저 본다.',
    },
] as const;

const OPS_CARDS: ReadonlyArray<ContentCard> = [
    {
        title: 'scorer 속도보다 슬롯 정책이 더 중요하다.',
        body: 'README는 23-dimension, under 2ms를 강조하지만 운영 실패는 대개 잘못된 슬롯 설계에서 난다.',
        chips: ['policy first', '23-dimension', 'under 2ms'],
    },
    {
        title: '응답 헤더가 가장 빠른 디버그 표면이다.',
        body: 'X-Manifest-Tier, X-Manifest-Reason, X-Manifest-Specificity를 먼저 읽으면 지금 어느 슬롯이 선택됐는지 바로 보인다.',
        chips: ['headers', 'debug', 'routing visibility'],
    },
    {
        title: 'fallback은 복구책이 아니라 기본 설계다.',
        body: 'primary 모델만 정해서 끝내면 운영 품질이 흔들린다. provider 장애와 예산 제한을 같이 고려해 체인을 설계해야 한다.',
        chips: ['fallback chain', 'provider resilience', 'budget control'],
    },
] as const;

const COMPARE_CARDS: ReadonlyArray<CompareCard> = [
    {
        title: '단일 플래그십 고정',
        fit: '비용보다 최고 성능이 우선이고, 요청 종류를 굳이 나눌 필요가 없을 때',
        tradeoff: 'simple과 calendar 같은 가벼운 요청도 비싼 모델로 흘러서 비용 최적화가 약하다.',
    },
    {
        title: 'OpenRouter',
        fit: 'cloud proxy를 빠르게 붙이고 싶고 local 운영은 중요하지 않을 때',
        tradeoff: 'README 비교 기준으로는 transparency와 user-defined tier 제어가 Manifest보다 약하다.',
    },
    {
        title: 'Manifest',
        fit: 'tier, specificity, fallback, provider를 직접 설계하고 헤더로 확인하고 싶을 때',
        tradeoff: '설계 책임이 사용자에게 있다. 슬롯을 대충 짜면 router가 있어도 결과가 흐려진다.',
    },
] as const;

export default function ManifestShowcase(props: ManifestShowcaseProps) {
    const { slug, title, summary, tags, sourceMeta, metricValue, license } = props;
    const [activeCaseId, setActiveCaseId] = useState<string>(CASES[0].id);
    const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

    const { activeId, scrollToSection } = useShowcaseSectionNav<SectionId>({
        ids: SECTIONS.map((section) => section.id),
        sectionPrefix: SECTION_PREFIX,
        initialId: 'hero',
    });

    return (
        <div className="mf-showcase" data-project={slug}>
            <style>{showcaseCss}</style>

            <ShowcaseSectionNav
                items={SECTIONS}
                activeId={activeId}
                onSelect={scrollToSection}
            />

            <div className="mf-main">
                <section className="mf-hero" id={`${SECTION_PREFIX}hero`}>
                    <div className="mf-hero-head">
                        <span className="mf-showcase-label">Model Router</span>
                    </div>

                    <div className="mf-hero-copy">
                        <h1>{title}</h1>
                        <p>{summary}</p>
                        <p className="mf-hero-note">
                            이 페이지는 <code>repo 기준 프로젝트 스펙</code>과 <code>2026-04-20 로컬 scorer run</code>을 분리해서 보여준다.
                        </p>
                    </div>

                    <div className="mf-meta-grid">
                        <article className={`mf-meta-card mf-meta-card--source ${sourceMeta.className}`}>
                            <div className="mf-meta-mark">{sourceMeta.mark}</div>
                            <div className="mf-meta-copy">
                                <span>{sourceMeta.provider}</span>
                                <strong>{sourceMeta.path}</strong>
                            </div>
                        </article>
                        <MetaCard label={sourceMeta.metricLabel} value={metricValue} />
                        <MetaCard label="라이선스" value={license} />
                        <MetaCard label="로컬 scorer run" value="2026-04-20 · 3 prompts" />
                    </div>

                    {tags.length > 0 && (
                        <div className="mf-tag-row">
                            {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </section>

                <Panel
                    id={`${SECTION_PREFIX}spec`}
                    title="프로젝트 스펙"
                    description={<>이 섹션은 repo와 문서에서 읽은 구조 요약이다. 실제 분류 결과는 아래 <TermHint term="로컬 테스트" description="repo prompt를 로컬 scorer에 직접 넣어 얻은 실제 출력값만 따로 모아 둔 섹션이다." /> 섹션에서 본다.</>}
                >
                    <div className="mf-spec-grid">
                        {SPEC_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}cases`}
                    title="로컬 테스트"
                    description={<>이 섹션의 숫자는 2026-04-20에 로컬 clone에서 scorer를 직접 실행해 얻은 실제 출력이다. 오른쪽 <TermHint term="slot" description="요청 성격별로 어떤 모델 묶음을 읽을지 정한 운영 단위다. Manifest에서는 tier와 specificity를 같이 읽어 slot을 해석하는 편이 낫다." /> 카드는 그 출력을 운영 관점으로 해석한 결과다.</>}
                >
                    <p className="mf-panel-note">
                        repo 예시 프롬프트는 그대로 쓰고, 스펙 요약과 추천 모델은 분리했다. 여기서는 먼저 실제 분류 결과만 읽으면 된다.
                    </p>

                    <div className="mf-case-tabs" role="tablist" aria-label="Manifest prompt cases">
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

                    <div className="mf-case-grid">
                        <article className="mf-card">
                            <CardHeader kicker="repo prompt" title={activeCase.useCase} pill={activeCase.label} />
                            <a href={activeCase.sourceUrl} target="_blank" rel="noreferrer" className="mf-inline-link">
                                {activeCase.sourceLabel}
                            </a>
                            <p className="mf-body-copy">{activeCase.prompt}</p>
                            <p className="mf-muted-copy">{activeCase.sourceNote}</p>
                        </article>

                        <article className="mf-card">
                            <CardHeader kicker="local scorer output" title="실제 분류 결과" pill="2026-04-20" />
                            <p className="mf-body-copy">{activeCase.localSummary}</p>
                            <div className="mf-data-grid">
                                {activeCase.localMetrics.map((item) => (
                                    <article key={`${activeCase.id}-${item.label}`} className="mf-data-card">
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </article>
                                ))}
                            </div>
                        </article>

                        <article className="mf-card">
                            <CardHeader kicker="slot reading" title="실제로 읽어야 할 슬롯" pill={activeCase.effectiveSlot} />
                            <p className="mf-body-copy">{activeCase.effectiveSummary}</p>
                            <div className="mf-chip-row">
                                {activeCase.modelExamples.map((item) => (
                                    <span key={item}>{item}</span>
                                ))}
                            </div>
                        </article>

                        <article className="mf-card">
                            <CardHeader kicker="runtime verify" title={activeCase.requestTitle} pill="headers" />
                            <pre>{activeCase.requestSnippet}</pre>
                            <ul className="mf-header-list">
                                {activeCase.headerLines.map((line) => (
                                    <li key={line}>
                                        <code>{line}</code>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}stack`}
                    title="슬롯 설계"
                    description={<>공식 추천 모델표는 없다. 아래 카드는 repo 구조와 provider catalog를 보고 짠 운영 예시이며, 핵심은 모델 이름보다 <TermHint term="slot policy" description="simple, coding, reasoning처럼 어떤 요청을 어느 슬롯으로 보낼지와 fallback을 함께 정의한 운영 규칙이다." /> 를 먼저 정하는 데 있다.</>}
                >
                    <div className="mf-slot-grid">
                        {MODEL_SLOTS.map((item) => (
                            <ModelSlot key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="판단 요약">
                    <div className="mf-insight-grid mf-insight-grid--takeaway">
                        {TAKE_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}decide`} title="도입 판단">
                    <div className="mf-split-grid">
                        <section className="mf-split-panel fit">
                            <div className="mf-split-title">USE IT</div>
                            <div className="mf-insight-grid">
                                {FIT_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>

                        <section className="mf-split-panel skip">
                            <div className="mf-split-title">SKIP IT</div>
                            <div className="mf-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ContentPanelCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}adopt`} title="적용 순서">
                    <div className="mf-adoption-grid">
                        {ADOPTION_STEPS.map((item) => (
                            <article key={item.title} className="mf-step-card">
                                <CardHeader kicker={item.kicker} title={item.title} />
                                <code>{item.command}</code>
                                <p>{item.body}</p>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}ops`} title="운영 포인트">
                    <div className="mf-insight-grid">
                        {OPS_CARDS.map((item) => (
                            <ContentPanelCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel id={`${SECTION_PREFIX}compare`} title="비교 대상">
                    <div className="mf-compare-grid">
                        {COMPARE_CARDS.map((item) => (
                            <article key={item.title} className="mf-compare-card">
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
        <section className="mf-panel" id={id}>
            <div className="mf-panel-head">
                <h2>{title}</h2>
                {description ? <p>{description}</p> : null}
            </div>
            {children}
        </section>
    );
}

function CardHeader({ kicker, title, pill }: { kicker?: string; title: string; pill?: string }) {
    return (
        <div className="mf-card-head">
            <div className="mf-card-title">
                {kicker ? <span className="mf-kicker">{kicker}</span> : null}
                <h3>{title}</h3>
            </div>
            {pill ? <span className="mf-pill">{pill}</span> : null}
        </div>
    );
}

function MetaCard({ label, value }: { label: string; value: string }) {
    return (
        <article className="mf-meta-card">
            <span>{label}</span>
            <strong>{value}</strong>
        </article>
    );
}

function ContentPanelCard({ item }: { item: ContentCard }) {
    return (
        <article className={`mf-content-card ${item.tone === 'accent' ? 'mf-content-card--accent' : ''}`.trim()}>
            <CardHeader kicker={item.kicker} title={item.title} />
            <p>{item.body}</p>
            {item.chips && (
                <div className="mf-chip-row">
                    {item.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                    ))}
                </div>
            )}
        </article>
    );
}

function ModelSlot({ item }: { item: ModelSlotCard }) {
    return (
        <article className={`mf-model-card ${item.tone === 'accent' ? 'mf-model-card--accent' : ''}`.trim()}>
            <CardHeader kicker={item.kicker} title={item.title} />
            <p className="mf-body-copy">{item.goal}</p>
            <div className="mf-chip-row">
                {item.picks.map((pick) => (
                    <span key={pick}>{pick}</span>
                ))}
            </div>
            <p>{item.note}</p>
        </article>
    );
}

const showcaseCss = `
.mf-showcase{display:contents;color:var(--color-text)}
.mf-main{grid-column:2;min-width:0;display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.mf-hero,.mf-panel{min-width:0}
.mf-hero,.mf-panel,.mf-card,.mf-meta-card,.mf-step-card,.mf-content-card,.mf-model-card,.mf-compare-card,.mf-data-card{border:1px solid var(--color-border);background:var(--color-surface)}
.mf-hero,.mf-panel{border-radius:22px;padding:22px;scroll-margin-top:100px}
.mf-hero{background:linear-gradient(180deg,color-mix(in srgb,var(--color-projects) 12%,transparent),transparent 42%),color-mix(in srgb,var(--color-surface) 94%,var(--color-surface-alt));box-shadow:0 20px 48px rgba(0,0,0,.08);display:grid;gap:18px}
.mf-hero-head{display:flex}
.mf-showcase-label{display:inline-flex;align-items:center;min-height:30px;padding:0 12px;border-radius:999px;background:color-mix(in srgb,var(--color-projects) 14%,transparent);color:var(--color-projects);font-size:.74rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.mf-hero-copy{display:grid;gap:10px;min-width:0}
.mf-hero-copy h1{margin:0;color:var(--color-projects);font-size:clamp(2.2rem,5.8vw,6.2rem);font-weight:900;line-height:.96;letter-spacing:.02em;text-transform:uppercase;overflow-wrap:anywhere;word-break:break-word}
.mf-hero-copy p{max-width:760px;margin:0;color:var(--color-text);font-size:clamp(1rem,1.45vw,1.16rem);line-height:1.72;word-break:keep-all}
.mf-hero-note{color:var(--color-text-muted)!important;font-size:.94rem!important}
.mf-hero-note code{font-size:.9em}
.mf-meta-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.mf-meta-card{display:grid;gap:6px;padding:14px;border-radius:14px;background:color-mix(in srgb,var(--color-surface) 86%,var(--color-surface-alt));min-width:0}
.mf-meta-card span{color:var(--color-text-muted);font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.mf-meta-card strong{overflow-wrap:anywhere;font-size:.96rem;line-height:1.35}
.mf-meta-card--source{grid-column:span 2;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:12px}
.mf-meta-card--source .mf-meta-mark{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;font-size:.78rem;font-weight:900;letter-spacing:.08em}
.mf-meta-card--source .mf-meta-copy{display:grid;gap:4px;min-width:0}
.mf-meta-card--source.github .mf-meta-mark{background:#24292f;color:#fff}
.mf-meta-card--source.huggingface .mf-meta-mark{background:#ffd166;color:#3d2a00}
.mf-meta-card--source.source .mf-meta-mark{background:var(--color-text);color:var(--color-surface)}
.mf-tag-row,.mf-chip-row{display:flex;flex-wrap:wrap;gap:8px}
.mf-tag-row span,.mf-chip-row span,.mf-pill{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--color-surface-alt);color:var(--color-text-muted);font-size:.76rem}
.mf-panel-head{display:grid;gap:6px;margin-bottom:14px}
.mf-panel-head h2{margin:0;font-size:1.16rem}
.mf-panel-head p{margin:0;max-width:780px;color:var(--color-text-muted);font-size:.92rem;line-height:1.7}
.mf-panel-note{margin:0 0 14px;color:var(--color-text-muted);line-height:1.7}
.mf-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}
.mf-card-title{display:grid;gap:6px;min-width:0}
.mf-card-title h3{margin:0;font-size:1.02rem;line-height:1.35;word-break:keep-all}
.mf-kicker{color:var(--color-projects);font-size:.72rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.mf-inline-link{display:inline-flex;margin-bottom:12px;color:var(--color-projects);font-size:.82rem;font-weight:700;text-decoration:none}
.mf-inline-link:hover{text-decoration:underline}
.mf-body-copy,.mf-muted-copy,.mf-step-card p,.mf-content-card p,.mf-model-card p,.mf-compare-card p span{margin:0;line-height:1.7;word-break:keep-all}
.mf-muted-copy{color:var(--color-text-muted);font-size:.9rem}
.mf-card,.mf-step-card,.mf-content-card,.mf-model-card,.mf-compare-card{padding:16px;border-radius:16px;min-width:0}
.mf-content-card,.mf-model-card,.mf-step-card,.mf-compare-card{display:grid;gap:12px}
.mf-content-card--accent,.mf-model-card--accent{background:color-mix(in srgb,var(--color-projects) 8%,var(--color-surface))}
.mf-case-tabs{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
.mf-case-tabs button{display:grid;gap:4px;min-width:148px;padding:12px 14px;border:1px solid var(--color-border);border-radius:14px;background:var(--color-surface-alt);font:inherit;text-align:left;cursor:pointer}
.mf-case-tabs button strong{font-size:.92rem}
.mf-case-tabs button span{color:var(--color-text-muted);font-size:.78rem}
.mf-case-tabs button.active{border-color:var(--color-projects);background:color-mix(in srgb,var(--color-projects) 12%,var(--color-surface))}
.mf-spec-grid,.mf-case-grid,.mf-slot-grid,.mf-insight-grid,.mf-adoption-grid,.mf-compare-grid{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.mf-insight-grid--takeaway{grid-template-columns:repeat(3,minmax(0,1fr))}
.mf-case-grid{align-items:start}
.mf-request-card pre,.mf-step-card code,.mf-header-list code,.mf-card pre{display:block;margin:0;overflow:auto;max-width:100%;border-radius:12px;background:var(--color-surface-alt);padding:12px;color:var(--color-projects);font-size:.8rem;line-height:1.6;min-width:0}
.mf-header-list{display:grid;gap:8px;margin:12px 0 0;padding:0;list-style:none}
.mf-data-grid{display:grid;gap:10px;margin-top:14px;grid-template-columns:repeat(2,minmax(0,1fr))}
.mf-data-card{display:grid;gap:4px;padding:12px;border-radius:12px;background:color-mix(in srgb,var(--color-surface) 86%,var(--color-surface-alt));min-width:0}
.mf-data-card span{color:var(--color-text-muted);font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.mf-data-card strong{font-size:.96rem;overflow-wrap:anywhere}
.mf-split-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}
.mf-split-panel{display:grid;gap:14px;padding:18px;border-radius:18px;background:var(--color-surface-alt)}
.mf-split-panel.fit{border:1px solid color-mix(in srgb,var(--color-projects) 30%,transparent)}
.mf-split-panel.skip{border:1px solid color-mix(in srgb,var(--color-border) 90%,transparent)}
.mf-split-title{color:var(--color-projects);font-size:.82rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.mf-adoption-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
.mf-compare-card p{display:grid;gap:4px;margin:0}
.mf-compare-card strong{color:var(--color-text);font-size:.82rem}
.mf-compare-card span{color:var(--color-text-muted);line-height:1.65}
@media (max-width:1200px){
  .mf-meta-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .mf-meta-card--source{grid-column:span 2}
  .mf-insight-grid--takeaway,.mf-adoption-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:980px){
  .mf-spec-grid,.mf-case-grid,.mf-slot-grid,.mf-insight-grid,.mf-insight-grid--takeaway,.mf-adoption-grid,.mf-compare-grid,.mf-data-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:900px){
  .mf-main{grid-column:1}
}
@media (max-width:720px){
  .mf-hero,.mf-panel{padding:14px}
  .mf-meta-grid{grid-template-columns:minmax(0,1fr)}
  .mf-meta-card--source{grid-column:1}
  .mf-case-tabs button{min-width:0;width:100%}
  .mf-hero-copy h1{font-size:clamp(2rem,8vw,3.4rem)}
}
`;
