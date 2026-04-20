---
term: glm-5
title: GLM 5(지엘엠 5)
lang: ko
summary: >-
  GLM 5(지엘엠 5)는 Z.AI가 코딩에서 엔지니어링으로 넘어가겠다고 내세운 플래그십 기반 모델이야. 긴 컨텍스트, deep
  thinking, 함수 호출을 한데 묶어서 복잡한 시스템 작업을 맡기려는 쪽에 초점이 있어.
readerValue: GLM 5가 왜 단순 코드 생성보다 에이전트 엔지니어링 문맥에서 언급되는지 읽는 데 도움 돼.
category: model
modelType: family
modelProfile:
  memoryUsage: >-
    GLM 5 라인은 로컬 경량 모델보다 클라우드형 장기 에이전트 작업 쪽에 맞춰져 있어. 200K급 긴 컨텍스트와 장시간 실행 흐름을 같이
    보는 편이 맞아.
  implementation: >-
    Z.AI가 Agentic Engineering이라고 직접 밀고 있는 foundation 계열이야. 백엔드 리팩터링, 긴 계획 실행, 깊은
    디버깅 같은 엔지니어링 흐름을 겨냥한다. 이렇게 보면 돼.
  activeParameters: >-
    공식 소개 기준 GLM 5 foundation은 744B 총 파라미터에 40B 활성 구조다. family 페이지에서는 GLM 5, GLM
    5-Turbo, GLM 5.1처럼 하위 버전 차이를 같이 봐야 한다. 이렇게 보면 돼.
  multimodalSupport: >-
    현재 핵심 라인은 텍스트 중심 coding/reasoning/agent 모델로 읽는 편이 맞아. 별도 vision 파생 모델과 섞지 않는
    게 안전하다. 이렇게 보면 돼.
  access: >-
    Z.AI 개발자 문서와 OpenAI 호환 API를 통해 붙일 수 있는 서비스형 모델이야. 자체 제품군과 코딩 플랜 쪽 통합도 같이 밀고
    있어.
  pricing: >-
    GLM 5 계열은 서비스형 가격표를 따로 봐. family 페이지에서는 세부 버전별 입력·출력 가격이 갈리므로 현재 과금표를 다시
    확인하는 편이 안전하다. 이렇게 보면 돼.
  weightsOpen: 핵심 GLM 5 계열은 서비스형 제공 중심. 이렇게 보면 돼.
  vendor: Z.AI
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - glm 5
  - glm5
relatedTerms:
  - chain-of-thought
  - o1
  - o3
  - gpt-oss
mentionCount: 0
draft: false
tags:
  - z-ai
  - agentic-coding
  - reasoning
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://docs.z.ai/guides/llm/glm-5'
      title: GLM-5 - Overview - Z.AI DEVELOPER DOCUMENT
    - url: 'https://docs.z.ai/guides/overview/overview'
      title: Overview - Overview - Z.AI DEVELOPER DOCUMENT
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: '공식 소개, 릴리스 노트, 가격표를 기준으로 내가 쓴 정의가 맞는지 맞춰봤어.'
      items:
        - '독자 문제 대조: GLM 5를 단순 채팅 모델이 아니라 Z.AI의 플래그십 엔지니어링 모델로 바로 이해하게 풀었어.'
        - '공식 소개의 200K 컨텍스트, 128K 출력, Agentic Engineering 포지션을 본문 정의에 반영했어.'
        - 릴리스 노트의 복잡한 시스템 엔지니어링과 long-range agent 작업 설명도 같은 축으로 묶었어.
      findings:
        - GLM 5의 핵심은 코딩 결과물 하나보다 긴 작업 흐름 전체를 맡기려는 포지션이야.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '제품 소개, 릴리스 노트, 가격 문서가 같은 모델을 가리키는지 다시 봤어.'
      items:
        - '비교 기준: 소개 페이지의 플래그십 설명과 릴리스 노트의 복잡한 엔지니어링 작업 설명이 같은 제품 포지션인지 맞춰봤어.'
        - 가격표에 GLM 5가 별도로 올라와 있는지도 확인해서 실제 API 운영 모델로 설명해도 되는지 봤어.
        - GLM 5.1과 섞이지 않게 GLM 5 쪽은 기반 모델 성격과 기본 가격 포인트를 앞에 뒀어.
      findings:
        - GLM 5는 5.1 이전 세대이지만 여전히 별도 가격과 문서를 가진 독립 모델로 확인돼.
    - type: number_verify
      result: pass
      sources: 3
      summary: '컨텍스트, 출력, 가격, 파라미터 숫자를 다시 봤어.'
      items:
        - 컨텍스트 200K와 최대 출력 128K를 다시 확인했어.
        - '가격표의 입력 $1, 출력 $3.2를 다시 확인했어.'
        - 공식 소개의 744B 총량과 40B 활성 파라미터 수치를 다시 확인했어.
      findings:
        - 숫자는 전부 Z.AI 공식 문서에서 겹쳐 확인되는 것만 남겼어.
    - type: adversarial
      result: pass
      summary: GLM 5를 단순 벤치마크용 모델처럼 읽는 오해를 막았어.
      items:
        - 코딩 성능 수치만 강조하면 모델 성격이 흐려져서 시스템 엔지니어링과 장기 작업 설명을 앞에 뒀어.
        - GLM 5.1의 코딩 특화 포인트를 끌어오지 않고 GLM 5 자체 문서에 있는 운영 기능만 남겼어.
        - 오픈 가중치 모델처럼 보이게 만드는 표현은 빼고 API 운용 중심 문맥으로 맞췄어.
      findings:
        - 독자가 GLM 5를 벤치마크 표의 한 줄로만 읽지 않게 문장 중심을 바꿨어.
---
## 한 줄 정의
GLM 5는 Z.AI의 플래그십 파운데이션 모델이야. 짧은 답변을 빠르게 만드는 챗봇보다는 복잡한 시스템 설계, 여러 단계짜리 [에이전트](/ko/wiki/agent/) 작업, 긴 코드베이스 처리 쪽을 노리고 나온 모델이라고 보면 돼. 공식 문서 기준 텍스트 입출력 모델이고 컨텍스트 200K, 최대 출력 128K를 지원해.
## 이 모델로 무엇을 할 수 있나
실무에서는 백엔드 구조 설계, 리포지토리 단위 리팩터링, 난해한 버그 추적, 여러 도구를 붙인 코딩 에이전트에 많이 써. Z.AI API에서 `glm-5`를 모델 ID로 호출하고 `thinking`, `stream`, [function calling](/ko/wiki/function-calling/), structured output을 함께 조합하는 운용이 핵심이야. [OpenAI](/ko/wiki/openai/) Python SDK 호환 예시도 따로 제공해서 기존 코드 흐름을 크게 안 바꾸고 붙이기 쉽다는 점이 운영상 장점이야.
## 왜 중요한가
GLM 5가 중요한 이유는 Z.AI가 이 모델을 코딩 보조가 아니라 Agentic Engineering용 기준 모델로 명확하게 밀고 있기 때문이야. 공식 문서에는 파라미터 규모가 355B에서 744B, 활성 파라미터가 32B에서 40B로 커졌다고 적혀 있고, 가격표 기준 1M 토큰당 입력 $1, 출력 $3.2라서 성능과 비용 포지션도 분명해. 그래서 GLM 5를 보면 중국권 프런티어 모델 정도로만 읽기보다 장기 [에이전트](/ko/wiki/agent/) 코딩을 노린 기준 모델로 보는 게 더 맞아.
## 같이 보면 좋은 모델
- [chain-of-thought](/ko/wiki/chain-of-thought/): GLM 5는 deep thinking을 운영 기능으로 앞세워. 추론을 얼마나 길게 쓰는 모델인지 읽을 때 같이 보면 좋아.
- [o1](/ko/wiki/o1/): 장기 추론과 문제 분해를 보는 독자라면 자주 비교하게 되는 기준점이야. GLM 5가 어떤 사용 감각을 노리는지 잡기 쉬워져.
- [o3](/ko/wiki/o3/): 툴 사용과 장기 작업 루프를 같이 보는 모델이라서 비교축으로 자주 등장해. GLM 5의 [에이전트](/ko/wiki/agent/) 지향 포지션을 읽을 때 도움이 돼.
- [gpt-oss](/ko/wiki/gpt-oss/): 공개 배포형 코딩 모델과 API 운영형 코딩 모델을 구분해서 보고 싶을 때 좋은 비교 대상이야. GLM 5가 어디에 강점을 두는지 선명해져.
