---
term: phi
title: Phi (파이)
lang: ko
summary: >-
  Phi는 Microsoft가 만든 소형 언어 모델 계열이야. 큰 모델보다 가볍게 돌리면서도 실무에 쓸 만한 성능을 노리는 전략을 보여줄 때
  자주 같이 언급돼.
readerValue: >-
  Phi를 보면 벤치마크 숫자보다 작은 모델을 어디에 배포하려는지 읽는 데 도움돼. 로컬 실행, 엣지 기기, 비용 절감 같은 운영 맥락을 같이
  보는 눈이 생겨.
category: model
modelType: family
modelProfile:
  memoryUsage: '소형 또는 온디바이스 지향으로 읽으면 되고, 실제 메모리 요구량은 양자화 방식과 컨텍스트 길이에 따라 달라진다. 이렇게 보면 돼.'
  implementation: 'Transformer 계열로 보는 편이 맞지만, Dense/MoE와 추론 최적화 방식은 공식 문서 확인이 필요해.'
  activeParameters: 소형 모델 계열이지만 활성 파라미터 수는 공식 모델 카드 기준으로 다시 확인하는 편이 안전하다. 이렇게 보면 돼.
  multimodalSupport: 텍스트 중심 모델이거나 공식 문서 기준 멀티모달 범위 확인 필요. 이렇게 보면 돼.
  access: '무료 체험 여부와 유료 플랜 구성은 배포 채널마다 다르다. API, 앱 구독, 팀 플랜을 나눠서 보는 편이 안전하다. 이렇게 보면 돼.'
  pricing: >-
    유료 모델이면 입력/출력 토큰당 가격, 캐시 할인, 배치 할인 같은 전략 단가를 공식 가격표에서 함께 확인하는 게 좋다. 이렇게 보면
    돼.
  weightsOpen: 비공개 또는 서비스/API 제공 중심. 이렇게 보면 돼.
  vendor: Microsoft
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - Phi (파이)
relatedTerms:
  - llm
firstMentioned: '2026-03-05'
mentionCount: 1
draft: false
tags:
  - microsoft
  - small-language-model
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Phi_(language_model)'
      title: Phi (language model)
    - url: 'https://azure.microsoft.com/en-us/blog/introducing-phi-4/'
      title: 'https://azure.microsoft.com/en-us/blog/introducing-phi-4/'
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Phi를 Microsoft의 소형 모델 계열로 잡은 정의가 출처 요약과 맞는지 맞춰봤어.
      items:
        - '독자 문제 대조: Phi를 단일 모델 하나로 오해하지 않게 시리즈라는 점을 먼저 적었어.'
        - >-
          제공된 요약에 있는 Microsoft 개발, open-weights, local run 가능성이라는 축을 본문 첫 단락에
          반영했어.
      findings:
        - 벤더와 제품 방향을 초반에 명확히 남겼어.
        - 클라우드 전용 모델처럼 읽히는 표현은 덜어냈어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: '외부 개요와 Microsoft 쪽 발표를 기준으로, Phi를 경량 실전 배포용 계열로 읽어도 되는지 다시 봤어.'
      items:
        - '비교 기준: 시리즈 구조, Microsoft 제작, 소형 모델 전략, 로컬 실행 가능성이라는 네 축을 서로 맞춰봤어.'
        - 특정 버전 성능 수치 대신 제품 배치 맥락을 설명하는 쪽으로 정리했어.
      findings:
        - 둘 다 Phi를 작은 모델 전략의 대표 사례로 읽게 만드는 점은 같았어.
        - 버전별 성능 경쟁은 너무 빨리 바뀌어서 본문에서 덜어냈어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 파라미터 수나 벤치마크 점수처럼 금방 낡는 숫자는 일부러 줄였어.
      items:
        - '몇 B 모델인지, 어떤 점수인지 같은 숫자는 시리즈 업데이트마다 흔들려서 넣지 않았어.'
        - 대신 소형 모델이라는 운영 의미가 유지되는 설명만 남겼어.
      findings:
        - 독자가 숫자 하나에 매달리지 않고 배포 맥락을 읽게 막았어.
    - type: adversarial
      result: pass
      summary: Phi를 대형 모델 대체재 하나로 단순화하는 오해를 줄였어.
      items:
        - '작은 모델이라서 무조건 열세라는 오해도 있고, 반대로 모든 작업을 다 대신한다는 과장도 있어서 둘 다 피했어.'
        - '실무에서 주로 붙는 자리는 요약, 분류, 보조 챗, 로컬 실행 같은 영역이라고 범위를 남겼어.'
      findings:
        - Phi를 성능 과장 대신 운영 전략의 맥락에서 읽게 만들었어.
---
## 한 줄 정의
Phi는 Microsoft가 만든 [소형 언어 모델](/ko/wiki/small-language-model/) 시리즈야. 오픈 웨이트로 공개된 계열이어서 클라우드 API만 보는 모델이라기보다, [로컬](/ko/wiki/local-llm/) 장치나 제한된 하드웨어에도 올려 쓰는 방향까지 같이 떠오르는 이름이야.
## 이 모델로 무엇을 할 수 있나
Phi는 긴 추론보다는 요약, 분류, 문서 Q&A, 가벼운 코딩 보조, [온디바이스](/ko/wiki/on-device/) 챗 기능처럼 짧고 반복적인 작업에서 특히 실용적이야. 응답 지연과 비용을 낮춰야 하는 앱에서 보조 모델로 붙이기 좋고, 인터넷 연결이 약하거나 개인 데이터가 민감한 환경에서 [로컬](/ko/wiki/local-llm/) 실행 후보로도 자주 거론돼.
## 왜 중요한가
Phi가 중요한 이유는 작은 모델도 제품 안에서 분명한 자리를 가질 수 있다는 걸 Microsoft가 강하게 밀었기 때문이야. 거대한 범용 모델 하나로 모든 걸 해결하는 흐름이 아니라, 용도에 맞는 경량 모델을 Azure나 [로컬](/ko/wiki/local-llm/) 런타임에 나눠 배치하는 전략을 읽게 해줘.
## 같이 보면 좋은 모델
- [Gemma](/ko/wiki/gemma/): 경량 모델을 어디까지 밀 수 있는지 비교하기 좋아. Phi처럼 작은 크기 대비 실용성을 자주 이야기해.
- `Llama 3.2`: [로컬](/ko/wiki/local-llm/) 배포와 엣지 사용처를 같이 볼 때 자주 같이 올라와. 같은 소형 계열이어도 생태계와 배포 흐름이 꽤 달라.
- `Mistral 7B`: 소형에서 중형 사이 범용 모델의 기준점처럼 많이 쓰여. Phi가 얼마나 더 가볍고 특정 기기 친화적인지 비교하기 좋아.
