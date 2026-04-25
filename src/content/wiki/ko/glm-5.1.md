---
term: glm-5.1
title: GLM 5.1(지엘엠 5.1)
lang: ko
summary: >-
  GLM 5.1(지엘엠 5.1)은 Z.AI가 내놓은 코딩 중심 최신 모델이야. 200K 컨텍스트와 128K 출력, 장기 에이전트 작업 운영
  포인트를 같이 밀어서 긴 개발 루프를 API로 돌릴 때 자주 거론돼.
readerValue: 'GLM 5와 뭐가 달라졌는지, 왜 코딩 에이전트 기사에서 이 이름이 자꾸 보이는지 빠르게 잡는 데 도움 돼.'
category: model
modelType: version
parentModel: glm-5
modelProfile:
  memoryUsage: >-
    GLM 5.1은 공식 문서 기준 최대 컨텍스트 200K, 최대 출력 128K를 지원한다. 긴 코딩 에이전트 루프를 한 번에 이어가는
    용도로 읽으면 돼.
  implementation: >-
    GLM 5.1은 장기 수평 작업을 위한 coding/agent 특화 업데이트다. Z.AI 릴리스 노트 기준 한 번의 실행으로 최대
    8시간까지 독립적으로 일할 수 있는 모델로 소개돼.
  activeParameters: >-
    정확한 활성 파라미터 수는 5.1 페이지에서 따로 강조하지 않는다. 대신 GLM 5 foundation을 잇는 상위 코딩 모델이라는
    포지션과 스트리밍 툴 호출 지원이 더 중요해.
  multimodalSupport: >-
    현재 핵심 포지션은 텍스트 중심 coding과 tool use다. thinking 모드와 스트리밍 tool call을 공식적으로
    지원한다. 이렇게 보면 돼.
  access: 'Z.AI API에서 `glm-5.1` 식별자로 바로 붙일 수 있고, 마이그레이션 문서와 코딩 플랜 문서가 따로 있어.'
  pricing: >-
    정확한 과금표는 Z.AI 현재 가격표를 다시 확인해야 한다. 긴 컨텍스트와 긴 실행 시간을 같이 쓰는 모델이라 출력 비용과 캐시 정책까지
    같이 보는 편이 낫다. 이렇게 보면 돼.
  weightsOpen: 서비스형 제공 중심. 이렇게 보면 돼.
  vendor: Z.AI
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - glm 5.1
  - glm5.1
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
    - url: 'https://docs.z.ai/release-notes/new-released'
      title: New Released - Overview - Z.AI DEVELOPER DOCUMENT
    - url: 'https://docs.z.ai/guides/overview/migrate-to-glm-new'
      title: Migrate to GLM-5.1 - Overview - Z.AI DEVELOPER DOCUMENT
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 공식 문서 정의랑 내가 쓴 설명이 코딩 중심 장기 작업 모델이라는 축에서 어긋나지 않는지 맞춰봤어.
      items:
        - >-
          독자 문제 대조: GLM 5.1을 처음 듣는 사람이 새 버전 이름만 보는 대신 Z.AI의 코딩 중심 모델로 바로 이해하게
          풀었어.
        - '마이그레이션 문서의 200K 컨텍스트, 128K 출력, `glm-5.1` ID를 본문 정의에 반영했어.'
        - 릴리스 노트의 최대 8시간 장기 실행 설명은 과장하지 않고 작업 성격을 보여주는 수준으로만 남겼어.
      findings:
        - GLM 5와 5.1을 섞지 않도록 5.1 고유 포인트를 툴 스트리밍과 장기 실행 쪽에 묶어뒀어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '릴리스 노트, 마이그레이션 문서, 가격표가 같은 제품 포지션을 가리키는지 다시 봤어.'
      items:
        - '비교 기준: 출시 노트의 장기 실행 설명과 마이그레이션 문서의 API 운영 포인트가 같은 모델을 말하는지 맞춰봤어.'
        - 가격표에 GLM-5.1이 따로 올라와 있는지도 확인해서 API 호출 모델로 써도 되는지 봤어.
        - GLM 5 문서와 섞이지 않도록 5.1 고유 포인트는 `tool_stream`과 코딩 중심 포지션으로 좁혔어.
      findings:
        - GLM 5.1은 단순 후속 번호가 아니라 코딩 운영 기능을 더 밀어붙인 파생 모델로 읽는 게 맞아.
    - type: number_verify
      result: pass
      sources: 2
      summary: '컨텍스트, 출력, 가격 숫자만 따로 다시 봤어.'
      items:
        - 최대 컨텍스트 200K와 최대 출력 128K를 다시 확인했어.
        - '가격표의 입력 $1.4, 출력 $4.4를 다시 확인했어.'
        - 장기 실행 설명은 시간 수치가 붙어 있어서 최대 8시간 표현을 그대로 확인했어.
      findings:
        - 숫자는 5.1 전용 문서와 가격표에 모두 걸쳐 확인되는 것만 남겼어.
    - type: adversarial
      result: pass
      summary: GLM 5와 5.1을 같은 모델처럼 읽는 오해를 막았어.
      items:
        - 'GLM 5.1을 그냥 GLM 5의 마케팅 이름처럼 쓰지 않고, 새 API 운영 포인트가 붙은 버전으로 분리했어.'
        - 오픈 가중치 모델처럼 보이게 만드는 표현은 빼고 서비스 운용 모델이라는 쪽만 남겼어.
        - 벤치마크 우열보다 실무 운영 포인트를 먼저 읽게 문장 순서를 바꿨어.
      findings:
        - 독자가 GLM 5.1을 이름만 다른 동일 모델로 오해할 가능성을 줄였어.
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    wiki: 3.1.2
  panelVerdict: pass
  contentHash: c4a1eee1f42ad480
  reviewedAt: '2026-04-25T09:55:56Z'
formatVersion: 2
---
## 한 줄 정의
GLM 5.1은 Z.AI가 내놓은 최신 코딩 중심 대형 언어모델이야. 그냥 채팅용 모델이라기보다 계획 세우기, 코드 수정, 툴 호출, 결과 검토까지 길게 이어지는 [에이전트](/ko/wiki/agent/) 작업을 버티도록 나온 버전이라고 보면 돼. 공식 문서 기준 API 모델 ID는 `glm-5.1`이고 최대 컨텍스트 200K, 최대 출력 128K를 지원해.
## 이 모델로 무엇을 할 수 있나
실무에선 리포지토리 단위 버그 수정, 여러 파일에 걸친 리팩터링, 툴을 섞는 자동화 루프 같은 데 많이 써. `thinking`을 켜서 복잡한 추론을 밀고 `stream=true`와 `tool_stream=true`를 같이 써서 툴 호출 인자를 스트리밍으로 받는 운용이 핵심이야. Z.AI 릴리스 노트는 한 번의 실행으로 최대 8시간짜리 장기 작업을 겨냥했다고 설명해.
## 왜 중요한가
GLM 5.1이 중요한 이유는 GLM 5 계열을 조금 손본 정도가 아니라, 코딩 [에이전트](/ko/wiki/agent/) 운용에서 자주 막히던 긴 호흡 안정성과 툴 스트리밍을 앞쪽에 내세웠기 때문이야. Z.AI 가격표 기준 1M 토큰당 입력 $1.4, 출력 $4.4라서 최상위 코딩 모델을 API로 굴릴 때 비용 감각도 바로 잡을 수 있어. 기사에서 이 이름이 보이면 [벤치마크](/ko/wiki/benchmark/) 숫자보다 장기 작업을 얼마나 안정적으로 돌리게 해주는지 먼저 읽는 게 맞아.
## 같이 보면 좋은 모델
- [chain-of-thought](/ko/wiki/chain-of-thought/): GLM 5.1은 deep thinking을 기본 축으로 밀기 때문에 추론을 언제 길게 쓰고 언제 줄일지 같이 보면 이해가 빨라져. 숨은 [추론](/ko/wiki/inference/) 자체보다 운영 방식이 더 중요하다는 점도 같이 보여줘.
- [o1](/ko/wiki/o1/): 장기 추론형 모델을 읽을 때 자주 비교되는 기준점이야. GLM 5.1이 어느 쪽을 따라가려는지 감을 잡기 좋아.
- [o3](/ko/wiki/o3/): 툴 사용과 긴 작업 루프를 보는 사람이라면 o3 계열과의 포지션 차이도 같이 읽는 게 좋아. 제품 전략이 어디에 붙는지 비교하기 쉬워져.
- [gpt-oss](/ko/wiki/gpt-oss/): 오픈 배포와 실사용 코딩 워크플로를 같이 보는 독자라면 좋은 비교축이야. GLM 5.1이 API 운영 모델로 읽히는지, [로컬](/ko/wiki/local-llm/) 배포형으로 읽히는지 선을 긋는 데 도움 돼.
