---
term: llama
title: Llama (라마)
lang: ko
summary: >-
  Llama는 Meta가 내놓는 공개형 LLM 계열 이름이야. 기사에서 이 이름이 보이면 개별 점수보다 어떤 제품을 자체 배포하거나
  파인튜닝하려는 흐름인지 같이 읽으면 좋아.
readerValue: 'Meta가 왜 Llama를 밀고, 사람들이 왜 로컬 실행이나 자체 서버 배포 이야기와 함께 이 이름을 꺼내는지 빠르게 잡는 데 도움 돼.'
category: model
modelType: family
modelProfile:
  memoryUsage: '직접 배포하는 경우 메모리 사용량은 총 파라미터 수, 정밀도, KV 캐시 설정을 같이 봐야 한다. 이렇게 보면 돼.'
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 공개 자료 기준 활성 파라미터 수 확인 필요. 이렇게 보면 돼.
  multimodalSupport: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이렇게 보면 돼.
  access: 무료 실험 또는 자체 호스팅 가능성이 높다. 다만 호스팅 플랫폼에서는 별도 유료 과금이 붙을 수 있어.
  pricing: >-
    직접 호스팅이면 GPU/추론 비용이 핵심이고, API 재판매 채널을 쓸 경우 입력/출력 토큰 단가를 별도로 확인해야 한다. 이렇게 보면
    돼.
  weightsOpen: 오픈 모델 계열이지만 실제 웨이트 공개 범위와 라이선스 조건은 별도 확인이 필요해.
  vendor: Meta
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Llama (라마)
relatedTerms:
  - deepseek-r1
  - gemma
  - qwen
  - local-llm
firstMentioned: '2026-02-20'
mentionCount: 32
draft: false
tags:
  - meta
  - open-model
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Llama_(language_model)'
      title: Llama (language model)
    - url: 'https://ai.meta.com/llama/'
      title: 'Industry Leading, Open-Source AI | Llama'
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: Llama를 단일 모델이 아니라 Meta의 모델 계열로 설명했는지 소스와 맞춰봤어.
      items:
        - '독자 문제 대조: 벤치마크보다 사용처와 배포 맥락을 먼저 보게 하려고 계열 개념부터 앞에 뒀어.'
        - '소스 대조: Wikipedia 요약의 family 표현에 맞춰 개별 모델명이 아니라 묶음 이름으로 정리했어.'
      findings:
        - 단일 버전 소개처럼 읽힐 문장을 빼고 계열 설명으로 고쳤어.
        - Meta라는 벤더 표기를 본문 앞부분에 분명히 남겼어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: Meta 쪽 공개형 배포 맥락과 외부 설명이 어긋나지 않게 다시 봤어.
      items:
        - '비교 기준: Meta 관련 공개 자료에서 Llama가 공개형 모델 생태계와 배포 유연성 쪽으로 읽히는지 확인했어.'
        - '교차 확인: 클라우드·자체 인프라 배포 맥락은 Meta 관련 공식 소개와 기사형 소스가 겹치는 부분만 남겼어.'
      findings:
        - 접속 제한 때문에 공식 랜딩 문구의 세부 표현은 안 가져왔어.
        - 대신 공개형 생태계와 배포 유연성처럼 여러 소스가 공통으로 말하는 수준으로 좁혔어.
    - type: number_verify
      result: pass
      summary: 버전별 수치나 다운로드 수처럼 빨리 낡는 숫자는 본문에서 줄였어.
      items:
        - '정량 점검: 출시 연도, 파라미터 수, 다운로드 수는 이번 문안의 핵심이 아니라서 뺐어.'
        - '오류 방지: 숫자 중심 문장을 덜어내고 배포 방식과 사용처 설명에 무게를 옮겼어.'
      findings:
        - 숫자 오류로 문서가 빨리 낡을 가능성을 낮췄어.
    - type: adversarial
      result: pass
      summary: Llama를 곧바로 오픈소스 단일 모델로 오해할 표현은 막았어.
      items:
        - '오해 점검: Llama를 특정 한 버전이나 앱 이름처럼 읽지 않게 계열 개념을 먼저 설명했어.'
        - '표현 점검: 라이선스 논쟁을 단정하지 않으려고 공개형이라는 넓은 표현으로 묶었어.'
      findings:
        - 과한 단정 대신 독자가 실제 기사 문맥을 읽는 데 필요한 수준만 남겼어.
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
  contentHash: 79e9d3dcb0461c05
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Llama는 Meta가 만드는 대형 언어 모델 가족이야. 한 개의 고정된 모델 이름이라기보다 여러 세대와 파생 모델을 묶는 브랜드로 보면 이해가 쉬워.
## 이 모델로 무엇을 할 수 있나
실무에서는 챗봇, 문서 요약, 코드 보조, 검색 보강형 답변 같은 범용 작업에 넓게 써. Meta가 공개한 모델 계열이라서 API 하나만 쓰는 느낌보다 가중치를 받아 자체 서버나 클라우드에 올리고, 필요하면 파인튜닝해서 쓰는 맥락에서 자주 불려.
## 왜 중요한가
Llama는 Meta가 자사 서비스 안에서만 AI를 잠그지 않고 공개형 생태계를 키우겠다는 신호로 자주 읽혀. 그래서 기사에서 이 이름이 보이면 성능표 하나보다 누가 어떤 인프라에 배포하고 어떤 제품을 붙이려는지까지 같이 보는 게 더 실용적이야.
## 같이 보면 좋은 모델
- `deepseek-r1`는 공개형 [추론 모델](/ko/wiki/reasoning/) 쪽에서 자주 비교되는 이름이야. Llama와 같이 보면 공개형 전략 안에서도 [추론](/ko/wiki/inference/) 중심과 범용 플랫폼 중심이 어떻게 갈리는지 보여.
- `gemma`는 [Google DeepMind](/ko/wiki/google-deepmind/)의 공개형 모델 계열이야. Llama와 나란히 보면 같은 공개형이어도 기기 타깃과 배포 메시지가 어떻게 다른지 읽기 쉬워.
- `qwen`은 Alibaba 쪽 공개형 모델 묶음이야. Llama와 비교하면 기업마다 공개형 모델을 어떤 생태계 확장 카드로 쓰는지 감이 와.
- `local-llm`은 특정 모델명이 아니라 실행 방식이야. Llama가 왜 [로컬](/ko/wiki/local-llm/) 실행 이야기와 함께 자주 묶이는지 이해하는 데 바로 도움이 돼.
