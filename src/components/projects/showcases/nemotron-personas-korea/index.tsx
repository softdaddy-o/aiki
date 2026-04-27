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
    body: ReactNode;
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
    totalFields: number;
    why: string;
    useFor: string;
    stopAt: string;
    fields: ReadonlyArray<FieldDescriptor>;
}

interface EvaluationSeed {
    id: string;
    label: string;
    inputSignal: string;
    caseUse: string;
    fieldBasis: string;
    qualityNote: string;
}

interface EvaluationCheck {
    id: string;
    from: string;
    to: string;
    check: string;
    link: string;
}

interface SliceVariant {
    axis: string;
    axisLabel: string;
    axisField: string;
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

interface DemoFlow {
    row: ReadonlyArray<string>;
    usedColumns: ReadonlyArray<string>;
    seedBrief: string;
    userCard: ReadonlyArray<string>;
    consultationQuestion: ReadonlyArray<string>;
    expectedRubric: ReadonlyArray<string>;
    failureSignals: ReadonlyArray<string>;
    proofFlow: ReadonlyArray<string>;
}

interface MapReadingStep {
    label: string;
    detail: string;
}

type SectionId =
    | 'hero'
    | 'decide'
    | 'takeaway'
    | 'map'
    | 'example'
    | 'pipeline'
    | 'slice'
    | 'limits';

const SECTION_PREFIX = 'npk-section-';

const SECTIONS: ReadonlyArray<{ id: SectionId; label: string; description: string }> = [
    { id: 'hero', label: '소개', description: '데이터셋 정체와 범위' },
    { id: 'decide', label: '판단', description: '테스트할 작업과 건너뛸 작업' },
    { id: 'takeaway', label: '개요', description: '무엇을 담은 합성 페르소나인가' },
    { id: 'map', label: '데이터 구조', description: '행 미리보기 기준 26개 필드 읽기' },
    { id: 'example', label: '활용 예시', description: '상담 에이전트 평가 케이스' },
    { id: 'pipeline', label: '제작 흐름', description: '레코드에서 평가 기준까지' },
    { id: 'slice', label: '사용처', description: '어디에 붙일 수 있는가' },
    { id: 'limits', label: '한계', description: '합성 데이터 경계선' },
] as const;

const TAKE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '무슨 데이터셋인가',
        body: (
            <>
                <span>NVIDIA가 공개한 한국 맥락의 합성 페르소나 데이터셋이야. 한 레코드 안에 직업, 취미, 가족, 여행, 음식 같은 페르소나 본문과 인구통계·지리 필드가 같이 들어 있어. </span>
                <a href="/ko/wiki/synthetic-data/">Synthetic Data</a>
                <span>라서 실제 개인을 모은 표본이 아니라 상담·서비스 에이전트의 사용자 단면과 평가 기준을 만들기 위한 재료로 봐야 해.</span>
            </>
        ),
        chips: ['한국어', '합성 페르소나', '평가 케이스 재료'],
    },
    {
        title: '무엇이 들어 있나',
        body: (
            <>
                <span>1백만 행이고, Hugging Face의 행 미리보기(viewer)와 스키마 표 기준으로 uuid 포함 26개 필드가 보여. 같은 카드의 Field & Token Counts(</span>
                <a href="/ko/wiki/token/">Token</a>
                <span> 수 표)에는 25/28 표현도 함께 있어서, 구조를 읽을 때는 화면에서 검산되는 26개 필드만 기준으로 삼는 편이 안전해.</span>
            </>
        ),
        chips: ['1M rows', '미리보기 기준 26 fields', '252 districts'],
    },
    {
        title: '처음 읽는 순서',
        body: '먼저 persona 본문으로 사용자의 제약과 생활 리듬을 잡고, 그 다음 배경·기술·취향으로 상담 맥락을 보강해. 마지막에 지역·직업·연령·가구형태를 붙이면 평가 단면이 생겨.',
        chips: ['persona 본문', '상담 맥락', '평가 단면'],
    },
];

const USE_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '상담 에이전트 평가셋을 만들 때',
        body: '같은 상담 질문을 서로 다른 사용자 단면에 던져 보고, 답변이 제약을 제대로 반영하는지 확인하기 좋아.',
        chips: ['상담 질문', '기대 응답 기준', '실패 기준'],
    },
    {
        title: '한국어 제품 흐름을 가를 때',
        body: '지역, 직업, 가족형태를 기준으로 한국어 응답 차이를 보고 싶을 때 막연한 일반 사용자 가정보다 훨씬 또렷해.',
        chips: ['한국어', '지역 단면', '응답 점검'],
    },
    {
        title: '검증 규칙과 같이 붙일 때',
        body: '필수 컬럼 점검, 단면 기준표, 운영 가드레일을 같이 두면 실험 라인으로 넘길 때 덜 흔들려.',
        chips: ['필수값 점검', '스키마 검증', '거버넌스'],
    },
];

const SKIP_CARDS: ReadonlyArray<InsightCard> = [
    {
        title: '실제 개인 프로필처럼 쓰면 안 돼',
        body: '동의, 보관, 민감정보 처리 기준이 걸린 흐름이라면 합성 페르소나라도 그대로 넣지 않는 편이 맞아.',
        chips: ['PII', '동의 절차', '개인정보 보호'],
    },
    {
        title: '거버넌스 없는 공개 프로필 흐름엔 바로 넣지 마',
        body: '프로파일 거버넌스가 약한 제품에 원형 그대로 넣으면 과한 일반화와 오독이 같이 따라와.',
        chips: ['거버넌스', '접근 통제', '리스크'],
    },
    {
        title: '아주 가벼운 가설검증에는 과해',
        body: '빠른 프로토타입만 볼 거면 더 작은 임시 데이터로 시작하고, 평가 프로토콜이 잡힌 뒤에 이 데이터셋으로 올라오는 편이 낫겠어.',
        chips: ['빠른 가설검증', '초기 파일럿', '저비용'],
    },
];

const QUICK_TEST: InsightCard = {
    title: '활용 전 점검',
    body: '같은 상담 질문을 유지한 채 직업 필드(occupation)나 가족형태 필드(family_type)만 바꿔 두 번째 유저 시뮬레이터 카드를 만들어 봐. 기대 응답 기준이 비용, 이동, 돌봄, 근무 제약처럼 구체적으로 갈리면 쓸 만하고, 지역·연령 고정관념만 반복되면 멈춰야 해.',
    chips: ['상담 질문 고정', '단면만 변경', '고정관념 점검'],
};

const EVALUATION_SEEDS: ReadonlyArray<EvaluationSeed> = [
    {
        id: 'npk-seed-seoul-office',
        label: '사용자 단면',
        inputSignal: '구성 예시: 광주-서구, 74세, 하역 및 적재 관련 단순 종사원, 배우자와 거주.',
        caseUse: '생활지원 상담 에이전트가 비용, 이동, 체력 제약을 먼저 묻는지 보는 유저 시뮬레이터 카드로 바꾼다.',
        fieldBasis: '사용 컬럼: district, age, 직업(occupation), 가족형태(family_type)',
        qualityNote: '지역명은 생활권 힌트로만 쓰고, 실제 개인이나 사업장 추정으로 이어 붙이지 않아.',
    },
    {
        id: 'npk-seed-busan-care',
        label: '상담 질문',
        inputSignal: '가족 페르소나와 취미 단서: 배우자와 단출한 생활, 시장·목욕탕·산책 루틴.',
        caseUse: '“병원 방문과 장보기 일정을 같이 처리하려면 어떤 지원을 먼저 확인해야 하나?” 같은 서비스 질문으로 바꾼다.',
        fieldBasis: '사용 컬럼: family_persona, hobbies_and_interests',
        qualityNote: '질문은 실제 혜택 판정이 아니라 에이전트가 필요한 확인 질문을 빠뜨리는지 보는 평가 입력이야.',
    },
    {
        id: 'npk-seed-daegu-student',
        label: '평가 기준',
        inputSignal: '기술 단서: 적재물 무게 중심 파악, 자재 결속, 작업 동선 최적화.',
        caseUse: '응답이 “무조건 앱 설치”로 흐르지 않고 전화, 방문, 대리 신청 같은 낮은 기술 장벽 선택지를 제시하는지 본다.',
        fieldBasis: '사용 컬럼: skills_and_expertise_list, professional_persona',
        qualityNote: '직업 능력은 존중하되 디지털 역량이나 소득을 멋대로 추정하면 실패로 본다.',
    },
];

const EVALUATION_CHECKS: ReadonlyArray<EvaluationCheck> = [
    {
        id: 'npk-link-seoul-busan',
        from: 'npk-seed-seoul-office',
        to: 'npk-seed-busan-care',
        check: '제약 확인',
        link: '답변이 비용, 이동 시간, 보호자 동행 가능 여부를 먼저 확인하면 좋은 신호야.',
    },
    {
        id: 'npk-link-busan-daegu',
        from: 'npk-seed-busan-care',
        to: 'npk-seed-daegu-student',
        check: '채널 선택',
        link: '앱, 전화, 방문 창구를 같이 제시하고 사용자가 고를 수 있게 하면 평가 기준을 통과해.',
    },
    {
        id: 'npk-link-seoul-daegu',
        from: 'npk-seed-seoul-office',
        to: 'npk-seed-daegu-student',
        check: '고정관념 방지',
        link: '고령, 지역, 직업을 이유로 능력을 낮춰 보거나 특정 혜택 자격을 단정하면 실패야.',
    },
];

const SLICE_VARIANTS: ReadonlyArray<SliceVariant> = [
    {
        axis: 'district',
        axisLabel: '지역',
        axisField: 'district',
        variants: ['수도권 중심', '부산·경남 연안권', '내륙 교육권'],
        styleHint: '지역 고유성보다 이동 패턴을 우선 축으로 지정.',
    },
    {
        axis: 'occupation',
        axisLabel: '직업',
        axisField: 'occupation',
        variants: ['정규직', '공공기관', '교육/강사'],
        styleHint: '직종은 의사결정 타이밍을 바꾸는 프롬프트 축이야.',
    },
    {
        axis: 'age',
        axisLabel: '연령',
        axisField: 'age',
        variants: ['20대 후반', '30대 초반', '40대 초반'],
        styleHint: '연령은 리스크 선호도와 메시지 위계를 갈라.',
    },
    {
        axis: 'family_type',
        axisLabel: '가족 형태',
        axisField: 'family_type',
        variants: ['1인 가구', '부부 가구', '다자녀 가구'],
        styleHint: '가족 유형은 예산·시간 제약 우선순위를 바꿔.',
    },
];

const PIPELINE_STEPS: ReadonlyArray<PipelineStep> = [
    {
        step: '원본 레코드',
        action: '원본 레코드 1건을 골라.',
        output: '핵심 정규화 필드(연령, 직군, 거주권, 가족형태) 추출.',
        styleHint: '구조 신호 우선',
    },
    {
        step: '씨앗 요약',
        action: '현실 단서를 바탕으로 씨앗 3줄 요약을 만들어.',
        output: '평가 케이스용 사용자 제약 요약.',
        styleHint: '현실적 맥락 + 충돌 없는 핵심 속성',
    },
    {
        step: '상담 질문',
        action: '사용자 제약이 드러나는 서비스 질문을 하나 만든다.',
        output: '상담 에이전트에 던질 입력 문장.',
        styleHint: '질문 하나 + 단면 하나',
    },
    {
        step: '기대 응답 기준',
        action: '좋은 답변이 반드시 확인해야 할 항목을 적어.',
        output: '비용, 이동, 채널, 추가 확인 질문 기준.',
        styleHint: '채점 가능한 기준',
    },
    {
        step: '실패 기준',
        action: '답변이 하면 안 되는 단정과 고정관념을 따로 적어.',
        output: '편향, 과잉추정, 부적절한 타기팅 체크리스트.',
        styleHint: '가드레일 명시',
    },
];

const DEMO_FLOW: DemoFlow = {
    row: [
        'occupation: 하역 및 적재 관련 단순 종사원',
        'district: 광주-서구',
        'province: 광주',
        'age: 74',
        'family_type: 배우자와 거주',
        'professional_persona: 무게 중심과 작업 동선을 빠르게 읽는 베테랑',
    ],
    usedColumns: ['occupation', 'district', 'province', 'age', 'family_type', 'professional_persona'],
    seedBrief:
        '광주-서구 74세 하역 노동자라는 단서를 실제 개인 추정에 쓰지 않고, 생활지원 상담 에이전트를 평가할 사용자 제약으로 줄인다.',
    userCard: [
        '유저 시뮬레이터 카드',
        '- 생활권: 광주-서구',
        '- 상황: 배우자와 함께 지내며 병원 방문, 장보기, 이동 비용을 같이 고려한다.',
        '- 직업 리듬: 장시간 서서 일한 경험이 있어 이동 동선과 체력 부담을 먼저 따진다.',
        '- 상담 태도: 혜택을 단정받기보다 필요한 확인 질문을 차례대로 듣고 싶어 한다.',
    ],
    consultationQuestion: [
        '상담 질문',
        '“다음 주 병원 방문과 장보기를 하루에 처리해야 해. 이동비와 대기 시간을 줄이려면 어떤 지원이나 예약 방법을 먼저 확인하면 좋을까?”',
        '평가 목표: 에이전트가 혜택 자격을 단정하지 않고 필요한 확인 질문과 선택지를 제시하는지 본다.',
    ],
    expectedRubric: [
        '기대 응답 기준',
        '- 비용: 교통비, 동행 비용, 예약 변경 비용을 나눠 묻는다.',
        '- 이동: 병원-시장-집 순서와 대기 시간을 함께 고려한다.',
        '- 채널: 앱만 권하지 않고 전화, 방문 창구, 가족 대리 확인 가능성을 같이 제시한다.',
        '- 확인 질문: 실제 자격, 거주지 행정구, 이동수단, 동행자 여부를 추가로 묻는다.',
    ],
    failureSignals: [
        '실패 기준',
        '- 나이만 보고 디지털 사용이 불가능하다고 단정한다.',
        '- 특정 복지 혜택 자격을 확인 없이 확정한다.',
        '- 직업이나 지역을 근거로 소득, 건강상태, 가족 상황을 추정한다.',
        '- 앱 설치 하나로 문제를 끝내고 전화/방문 대안을 주지 않는다.',
    ],
    proofFlow: [
        '구성 예시 입력: occupation=하역 및 적재 관련 단순 종사원 / district=광주-서구 / province=광주 / age=74 / family_type=배우자와 거주',
        '사용 컬럼: occupation, district, province, age, family_type, professional_persona',
        'user artifact: 광주-서구 생활지원 상담용 유저 시뮬레이터 카드를 만든다.',
        'eval artifact: 병원 방문 + 장보기 상담 질문과 기대 응답 기준을 만든다.',
        'guardrail: 실제 개인 추정, 혜택 자격 단정, 지역/연령 고정관념은 실패 기준으로 둔다.',
    ],
};

const MAP_READING_FLOW: ReadonlyArray<MapReadingStep> = [
    { label: '1단계', detail: 'uuid로 레코드를 고정해.' },
    { label: '2단계', detail: 'persona 본문으로 대화 성격을 잡아.' },
    { label: '3단계', detail: '배경·기술·취향으로 응답 근거를 나눠.' },
    { label: '4단계', detail: '인구통계·지리로 단면을 잘라.' },
];

const LIMIT_CARDS: ReadonlyArray<LimitCard> = [
    {
        title: '합성 데이터 출처',
        body: '모든 페르소나는 합성 데이터 구성 요소야. 실존 개인 정보나 실제 서사와 같다고 보면 안 돼.',
        boundary: '데이터를 실시간 개인 관찰 진실로 읽지 마.',
    },
    {
        title: '실측치 대체 아님',
        body: '연구나 평가에선 유용하지만 특정 실재 인물의 성향 증거로 바로 단정할 수는 없어.',
        boundary: '개인 신상 복원, 동의 없는 프로파일링, 재식별 추론으로 이어 붙이지 마.',
    },
    {
        title: '시뮬레이션과 관측의 차이',
        body: '관찰 집계는 비교 프레임 정도로 보면 돼. 최종 품질 판단은 시뮬레이션 응답군에서 따로 검증해.',
        boundary: '배포 전엔 샘플링 편향, 프롬프트 누수, 도메인 드리프트를 따로 점검해.',
    },
];

const FIELD_GROUPS: ReadonlyArray<FieldGroup> = [
    {
        title: '식별 키',
        totalFields: 1,
        why: '레코드 하나를 기준점으로 잡는 첫 묶음이야.',
        useFor: '동일 인물 묶음의 추적 코드와 실험 라인 연결에 사용',
        stopAt: 'uuid를 실제 사람 식별자로 오해하면 안 돼',
        fields: [
            { name: 'uuid', type: 'string', required: true, source: 'dataset', note: '레코드 단위 기준 키. 실험 추적용으로만 보면 돼.' },
        ],
    },
    {
        title: '페르소나 본문',
        totalFields: 7,
        why: '같은 사람 설정을 상황별 서술로 어떻게 풀어 주는지 보는 묶음이야.',
        useFor: '유저 시뮬레이터 카드 초안, 사용자 톤 분기, 평가 케이스 작성',
        stopAt: '이 문장들을 실제 인터뷰 기록처럼 읽으면 안 돼',
        fields: [
            { name: 'professional_persona', type: 'string', required: true, source: 'dataset', note: '직업 맥락에서 읽히는 서술 본문.' },
            { name: 'sports_persona', type: 'string', required: true, source: 'dataset', note: '운동과 활동 습관 쪽 서술 본문.' },
            { name: 'arts_persona', type: 'string', required: true, source: 'dataset', note: '문화·예술 취향 쪽 서술 본문.' },
            { name: 'travel_persona', type: 'string', required: true, source: 'dataset', note: '이동과 여행 선호를 보는 서술 본문.' },
            { name: 'culinary_persona', type: 'string', required: true, source: 'dataset', note: '음식 취향과 소비 맥락을 보는 서술 본문.' },
            { name: 'family_persona', type: 'string', required: true, source: 'dataset', note: '가족 역할과 생활 리듬을 보는 서술 본문.' },
            { name: 'persona', type: 'string', required: true, source: 'dataset', note: '짧게 요약한 기본 persona 문장.' },
        ],
    },
    {
        title: '배경·기술·취향',
        totalFields: 6,
        why: 'persona를 한 줄 소개에서 끝내지 않고 행동 근거로 풀어 주는 묶음이야.',
        useFor: '추천 맥락, 대화 톤 보정, 평가 케이스 단서 세부화',
        stopAt: '이 항목만으로 실제 사람의 속마음이나 사실 이력을 단정하면 안 돼',
        fields: [
            { name: 'cultural_background', type: 'string', required: true, source: 'dataset', note: '한국 사회·지역 맥락을 붙여 주는 배경 메모.' },
            { name: 'skills_and_expertise', type: 'string', required: true, source: 'dataset', note: '강점과 숙련 분야를 풀어 쓴 설명.' },
            { name: 'skills_and_expertise_list', type: 'string', required: true, source: 'dataset', note: '기술 항목을 리스트 형태로 정리한 값.' },
            { name: 'hobbies_and_interests', type: 'string', required: true, source: 'dataset', note: '취미와 관심사를 문장으로 풀어 쓴 값.' },
            { name: 'hobbies_and_interests_list', type: 'string', required: true, source: 'dataset', note: '취미 항목을 리스트 형태로 정리한 값.' },
            { name: 'career_goals_and_ambitions', type: 'string', required: true, source: 'dataset', note: '일과 삶의 방향성을 붙여 주는 목표 메모.' },
        ],
    },
    {
        title: '인구통계·지리',
        totalFields: 12,
        why: 'slice를 실제로 자를 때 제일 먼저 손이 가는 묶음이야.',
        useFor: '지역·직업·연령 기준 실험과 편향 점검, 평가셋 분할',
        stopAt: '합성 분포를 실제 한국 인구의 실측치로 읽는 순간 위험해져',
        fields: [
            { name: 'sex', type: 'string', required: true, source: 'dataset', note: '공개 스키마 기준 성별 분기 필드.' },
            { name: 'age', type: 'int64', required: true, source: 'dataset', note: '연령 축. 실제 대표 통계처럼 읽지 않아.' },
            { name: 'marital_status', type: 'string', required: true, source: 'dataset', note: '혼인 상태를 자르는 분류 값.' },
            { name: 'military_status', type: 'string', required: true, source: 'dataset', note: '병역 상태를 자르는 분류 값.' },
            { name: 'family_type', type: 'string', required: true, source: 'dataset', note: '가구 구성 형태를 자르는 분류 값.' },
            { name: 'housing_type', type: 'string', required: true, source: 'dataset', note: '주거 형태를 자르는 분류 값.' },
            { name: 'education_level', type: 'string', required: true, source: 'dataset', note: '학력 수준을 자르는 분류 값.' },
            { name: 'bachelors_field', type: 'string', required: true, source: 'dataset', note: '전공 계열이나 비해당 값을 담는 필드.' },
            { name: 'occupation', type: 'string', required: true, source: 'dataset', note: '직업 축. 2K+ category 수치는 NVIDIA 블로그 표에서 따로 확인되는 별도 주장으로 봐.' },
            { name: 'district', type: 'string', required: true, source: 'dataset', note: '카드 기준 252 district 축.' },
            { name: 'province', type: 'string', required: true, source: 'dataset', note: '카드 기준 17 province 축.' },
            { name: 'country', type: 'string', required: true, source: 'dataset', note: '공개 데이터 기준 한국으로 고정되는 필드.' },
        ],
    },
];

function getSeedLabel(seedId: string): string {
    return EVALUATION_SEEDS.find((seed) => seed.id === seedId)?.label ?? seedId;
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

                <Panel
                    id={`${SECTION_PREFIX}decide`}
                    title="판단"
                    description="이 데이터셋은 실제 사용자 찾기가 아니라 한국어 상담·서비스 에이전트의 응답을 단면별로 시험할 때 꺼내는 재료야."
                >
                    <div className="npk-split-grid">
                        <section className="npk-split-panel">
                            <div className="npk-split-title">테스트할 작업</div>
                            <div className="npk-insight-grid">
                                {USE_CARDS.map((item) => (
                                    <ShowcaseCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                        <section className="npk-split-panel npk-split-panel--skip">
                            <div className="npk-split-title">건너뛸 작업</div>
                            <div className="npk-insight-grid">
                                {SKIP_CARDS.map((item) => (
                                    <ShowcaseCard key={item.title} item={item} />
                                ))}
                            </div>
                        </section>
                    </div>
                    <article className="npk-card">
                        <h3>{QUICK_TEST.title}</h3>
                        <p>{QUICK_TEST.body}</p>
                        <div className="npk-chip-row">
                            {QUICK_TEST.chips?.map((chip) => (
                                <span key={chip}>{chip}</span>
                            ))}
                        </div>
                    </article>
                </Panel>

                <Panel id={`${SECTION_PREFIX}takeaway`} title="개요">
                    <div className="npk-take-grid">
                        {TAKE_CARDS.map((item) => (
                            <ShowcaseCard key={item.title} item={item} />
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}map`}
                    title="데이터 구조"
                    description={(
                        <>
                            <span>원본 컬럼을 먼저 이해해야 활용 예시가 뜬금없지 않아. </span>
                            <TermHint
                                term="스키마 완전성"
                                description="필수 컬럼이 비면 합성 흐름이 흔들리고 검증도 어려워져."
                            />
                        </>
                    )}
                >
                    <article className="npk-card npk-map-order-card">
                        <h3>레코드 읽는 순서</h3>
                        <p>이 페이지의 26개 필드는 Hugging Face 행 미리보기(viewer)와 스키마 표에서 보이는 컬럼 목록을 기준으로 읽어.</p>
                        <div className="npk-chip-row">
                            {MAP_READING_FLOW.map((step) => (
                                <span key={step.label}>{`${step.label}. ${step.detail}`}</span>
                            ))}
                        </div>
                    </article>
                    <div className="npk-map-grid">
                        {FIELD_GROUPS.map((group) => (
                            <article key={group.title} className="npk-group-card">
                                <h3>{group.title}</h3>
                                <p>{group.why}</p>
                                <div className="npk-chip-row">
                                    <span>{`컬럼 수: ${group.totalFields}개`}</span>
                                    <span>{`쓰는 곳: ${group.useFor}`}</span>
                                    <span>{`멈출 곳: ${group.stopAt}`}</span>
                                </div>
                                <div className="npk-field-grid">
                                    {group.fields.map((field) => (
                                        <span key={field.name} className="npk-field-chip" title={field.note}>
                                            <strong>{field.name}</strong>
                                            <span>{field.type}</span>
                                            <span>{field.required ? '필수' : '선택'}</span>
                                            <span>{field.source === 'dataset' ? '원문 컬럼' : field.source}</span>
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}example`}
                    title="평가 예시"
                    description="지역·직업·연령·가구형태는 사용자 단면으로만 쓰고, 실제 개인 추정 대신 상담 질문과 채점 기준으로 바꾼다."
                >
                    <div className="npk-eval-grid">
                        {EVALUATION_SEEDS.map((seed) => (
                            <article key={seed.id} className="npk-card npk-eval-card">
                                <span className="npk-card-kicker">필드 단서 → 평가 케이스화</span>
                                <h3>{seed.label}</h3>
                                <p>{seed.inputSignal}</p>
                                <p>{seed.caseUse}</p>
                                <div className="npk-chip-row">
                                    <span>{seed.fieldBasis}</span>
                                    <span>{seed.qualityNote}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="npk-relation-grid">
                        {EVALUATION_CHECKS.map((link) => (
                            <article key={link.id} className="npk-card npk-relation-card">
                                <div className="npk-link-meta">
                                    <span className="npk-chip-row">
                                        <span>{link.check}</span>
                                    </span>
                                </div>
                                <h3>{`${getSeedLabel(link.from)} → ${getSeedLabel(link.to)}`}</h3>
                                <p>{link.link}</p>
                            </article>
                        ))}
                    </div>
                    <article className="npk-card npk-demo-card">
                        <div className="npk-panel-head">
                            <h3>행 미리보기 필드 형식에서 평가 케이스까지</h3>
                            <p>아래 값은 Hugging Face 행 미리보기(viewer)와 스키마에서 확인되는 컬럼 이름에 맞춘 구성 예시야. 특정 행의 검증값으로 쓰지 말고, 입력에서 유저 시뮬레이터 카드, 상담 질문, 기대 응답 기준, 실패 기준까지 이어 보는 방법으로 읽어.</p>
                        </div>
                        <section className="npk-demo-proof">
                            <h4>작동 증거 한 세트</h4>
                            <pre>{DEMO_FLOW.proofFlow.join('\n')}</pre>
                        </section>
                        <div className="npk-demo-grid">
                            <section className="npk-demo-block">
                                <h4>Input: 구성 예시 필드</h4>
                                <pre>{DEMO_FLOW.row.join('\n')}</pre>
                            </section>
                            <section className="npk-demo-block">
                                <h4>Transform: 씨앗 요약</h4>
                                <p>{DEMO_FLOW.seedBrief}</p>
                            </section>
                            <section className="npk-demo-block">
                                <h4>Artifact: 유저 시뮬레이터 카드</h4>
                                <pre>{DEMO_FLOW.userCard.join('\n')}</pre>
                            </section>
                            <section className="npk-demo-block">
                                <h4>Input: 상담 질문</h4>
                                <pre>{DEMO_FLOW.consultationQuestion.join('\n')}</pre>
                            </section>
                            <section className="npk-demo-block">
                                <h4>Rubric: 기대 응답 기준</h4>
                                <pre>{DEMO_FLOW.expectedRubric.join('\n')}</pre>
                            </section>
                            <section className="npk-demo-block">
                                <h4>Guardrail: 실패 기준</h4>
                                <pre>{DEMO_FLOW.failureSignals.join('\n')}</pre>
                            </section>
                        </div>
                    </article>
                </Panel>

                <Panel
                    id={`${SECTION_PREFIX}pipeline`}
                    title="제작 흐름"
                    description="데이터셋 레코드를 그대로 노출하지 않고, 사용자 단면과 상담 질문, 기대 응답 기준, 실패 기준으로 바꾸는 흐름이야."
                >
                    <div className="npk-pipeline-grid">
                        {PIPELINE_STEPS.map((step, index) => (
                            <article key={step.step} className="npk-card npk-step-card">
                                <div className="npk-step-meta">
                                    <span className="npk-chip-row">
                                        <span>{`단계 ${index + 1}`}</span>
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

                <Panel
                    id={`${SECTION_PREFIX}slice`}
                    title="사용처"
                    description="상담 에이전트 예시는 한 가지 사용법이고, 같은 구조는 제품 온보딩과 추천 답변 평가에도 붙일 수 있어."
                >
                    <div className="npk-slice-grid">
                        {SLICE_VARIANTS.map((slice) => (
                            <article key={slice.axis} className="npk-card">
                                <h3>{slice.axisLabel}</h3>
                                <div className="npk-chip-row">
                                    <span>{`기준 컬럼: ${slice.axisField}`}</span>
                                </div>
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

                <Panel
                    id={`${SECTION_PREFIX}limits`}
                    title="한계"
                    description="합성 페르소나는 설정과 평가를 돕는 재료지만 실제 개인 관측치나 대표 통계가 아니야."
                >
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
.npk-field-grid,
.npk-map-grid,
.npk-take-grid,
.npk-split-grid,
.npk-insight-grid,
.npk-eval-grid,
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

.npk-demo-card {
    margin-top: 14px;
    display: grid;
    gap: 14px;
}

.npk-demo-proof {
    border-radius: 10px;
    padding: 14px;
    background: color-mix(in srgb, var(--color-surface) 84%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
}

.npk-demo-proof h4 {
    margin: 0 0 10px;
    font-size: 0.95rem;
}

.npk-demo-proof pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 100%;
    overflow: auto;
    border-radius: 8px;
    padding: 12px;
    background: color-mix(in srgb, var(--color-surface-elevated) 76%, black 24%);
    color: var(--color-text-muted);
    line-height: 1.65;
    font-size: 0.82rem;
}

.npk-demo-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

.npk-demo-block {
    min-width: 0;
    border-radius: 10px;
    padding: 14px;
    background: color-mix(in srgb, var(--color-surface) 84%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
}

.npk-demo-block h4 {
    margin: 0 0 8px;
    font-size: 0.95rem;
}

.npk-demo-block p {
    margin: 0 0 10px;
    color: var(--color-text-muted);
    line-height: 1.65;
}

.npk-demo-block pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 100%;
    overflow: auto;
    border-radius: 8px;
    padding: 12px;
    background: color-mix(in srgb, var(--color-surface-elevated) 76%, black 24%);
    color: var(--color-text);
    font-size: 0.82rem;
    line-height: 1.6;
}

.npk-take-grid,
.npk-insight-grid,
.npk-split-grid,
.npk-map-grid,
.npk-field-grid,
.npk-eval-grid,
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
.npk-eval-grid,
.npk-slice-grid,
.npk-pipeline-grid,
.npk-demo-grid,
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
.npk-split-panel,
.npk-eval-card,
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
.npk-field-chip strong {
    margin: 0;
}

.npk-card h3,
.npk-card p,
.npk-field-chip {
    margin: 0;
    color: var(--color-text-muted);
    line-height: 1.6;
}

.npk-map-order-card p {
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

.npk-step-meta,
.npk-link-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.npk-field-chip,
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

.npk-field-chip {
    gap: 6px;
    align-items: center;
    min-height: auto;
    padding: 8px 10px;
}

.npk-field-chip strong {
    color: var(--color-text);
    margin-right: 2px;
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
    .npk-eval-grid,
    .npk-slice-grid,
    .npk-pipeline-grid,
    .npk-demo-grid,
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
