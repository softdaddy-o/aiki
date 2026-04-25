---
term: mistral
title: Mistral(미스트랄 모델 계열)
lang: ko
summary: >-
  Mistral은 보통 프랑스 회사 Mistral AI가 내놓는 언어 모델 계열을 묶어 부르는 이름이야. 단일 모델 하나보다 브랜드, API,
  오픈 웨이트 배포 전략까지 함께 가리키는 말로 보는 게 맞아.
readerValue: 'Mistral을 알면 기사에서 새 체크포인트 소식인지, Mistral AI의 오픈 웨이트 전략과 배포 경로 얘기인지 빨리 나눠 볼 수 있어.'
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
  weightsOpen: 오픈 웨이트. 이렇게 보면 돼.
  vendor: Mistral AI
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - Mistral(미스트랄 모델 계열)
relatedTerms:
  - mixtral
  - flux
firstMentioned: '2026-03-16'
mentionCount: 3
draft: false
tags:
  - mistral
  - open-weight
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Mistral_AI'
      title: Mistral AI
    - url: 'https://mistral.ai/technology/'
      title: Mistral AI Studio - your AI production platform | Mistral AI
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: Mistral AI 공식 문서 기준으로 우산 이름 성격을 다시 맞춰봤어.
      items:
        - '독자 문제 대조: Mistral을 단일 체크포인트가 아니라 Mistral AI 모델 계열을 가리키는 이름으로 풀었어.'
        - 공식 문서의 Featured models와 Latest models 구성을 반영해서 가족 이름이라는 점을 강화했어.
        - 회사 이름과 모델 이름이 자주 겹쳐 쓰이는 문맥이라 브랜드 층위를 먼저 설명했어.
      findings:
        - Mistral은 모델명보다 브랜드명으로 먼저 읽어야 정확했어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 모델 목록과 배포 문서를 같이 맞춰봤어.
      items:
        - >-
          비교 기준: Mistral을 모델 하나로 읽을지, API와 open-weight 배포 전략까지 포함한 라인업 이름으로 읽을지
          맞춰봤어.
        - >-
          Models 문서는 여러 계열을 한 브랜드 아래 보여 주고, La Plateforme 문서는 pay-as-you-go
          API를, Self-Deployment 문서는 vLLM 기반 배포를 설명했어.
        - 그래서 본문도 '성능 좋은 모델 하나'보다 '여러 배포 경로를 가진 모델 브랜드'라는 쪽으로 정리했어.
      findings:
        - 모델 목록과 배포 문서를 분리해 보니 우산 이름이라는 점이 더 분명해졌어.
    - type: number_verify
      result: skip
      sources: 3
      summary: 최신 버전 표는 빨리 바뀌어서 배포 경로와 라이선스 쪽만 남겼어.
      items:
        - v25.xx 같은 최신 라인업 버전 표는 자주 업데이트돼서 본문 핵심 설명에서 뺐어.
        - >-
          대신 open-weight 모델이 Apache 2.0 같은 라이선스로 공개되고, API와 self-deployment가 함께
          제공된다는 오래가는 운영 정보만 남겼어.
      findings:
        - 이 페이지는 최신 버전 숫자보다 배포 방식이 독자 가치가 더 컸어.
    - type: adversarial
      result: pass
      sources: 3
      summary: Mistral을 전부 오픈 모델로 보는 오해를 막았어.
      items:
        - >-
          Mistral AI에는 open-weight 모델도 있지만 API 전용에 가까운 라인도 있어서, '전부 로컬 가능'처럼 읽히지
          않게 적었어.
        - 반대로 전부 폐쇄형 API 회사처럼 읽히는 것도 막았어. 실제 문서는 API와 self-deployment를 둘 다 보여 줘.
        - 브랜드 이름과 세부 모델 이름을 섞어 쓰는 기사 문법도 경계하도록 설명했어.
      findings:
        - 오픈 웨이트와 상용 API가 같이 있는 회사라는 점을 남겨야 왜 자주 헷갈리는지 설명됐어.
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
  contentHash: 5b87a7fbdd0e7b20
  reviewedAt: '2026-04-25T09:55:57Z'
formatVersion: 2
---
## 한 줄 정의
Mistral은 특정 버전 하나보다 Mistral AI 쪽 모델 군을 넓게 가리키는 이름이야. 그래서 이 단어를 들었을 때는 먼저 회사와 라인업, 배포 방식이 같이 묶여 있는 우산 이름인지부터 보는 게 맞아.
기사에서 그냥 Mistral이라고만 쓰면 단일 체크포인트를 가리키는 게 아니라 브랜드 전체를 뜻하는 경우가 많아. 이 점을 놓치면 문서를 잘못 읽기 쉬워.
## 이 모델로 무엇을 할 수 있나
Mistral AI 문서 기준으로 이 계열은 범용 텍스트 생성, [멀티모달](/ko/wiki/multimodal/) 처리, 코딩, 문서 처리, [추론](/ko/wiki/inference/) 같은 여러 작업에 쓰여. 그래서 'Mistral을 쓴다'는 말은 실제로는 요약 모델을 붙인 건지, 코드 [에이전트](/ko/wiki/agent/) 모델을 붙인 건지, 문서 AI를 붙인 건지 더 확인해야 해.
운영 방식도 두 갈래야. Mistral AI는 pay-as-you-go API를 제공하고, 여러 open-[weight](/ko/wiki/weight/) 모델은 [Apache 2.0](/ko/wiki/apache/) 같은 라이선스로 공개해서 [vLLM](/ko/wiki/vllm/)이나 [llama.cpp](/ko/wiki/llama.cpp/) 같은 경로로 직접 self-deploy할 수도 있어.
## 왜 중요한가
Mistral을 이해하면 모델 이름 하나만 보고 제품 전략을 놓치는 실수를 줄일 수 있어. 이 이름은 성능 경쟁뿐 아니라 유럽 AI 회사의 오픈 [웨이트](/ko/wiki/weight/) 전략, 자체 API, 클라우드 배포, 온프렘 셀프호스팅까지 같이 끌고 다니는 경우가 많아.
특히 팀 입장에서는 'API로 바로 붙일지'와 '가중치를 받아 직접 올릴지'를 동시에 비교하게 만든다는 점이 중요해. 같은 브랜드 아래에서 두 경로를 다 보여 주는 회사가 많지 않기 때문이야.
## 같이 보면 좋은 모델
- [mixtral](/ko/wiki/mixtral/): Mistral 계열 안쪽의 더 구체적인 모델 이름이야. 우산 이름과 실제 체크포인트 이름이 어떻게 갈리는지 볼 때 가장 직접적이야.
- [flux](/ko/wiki/flux/): 같은 회사 문맥에서 같이 거론되지만 텍스트 모델이 아니라 이미지 생성 쪽으로 이어지는 이름이야. 브랜드가 여러 생성 모델 라인으로 확장되는 방식을 읽기 좋아.
