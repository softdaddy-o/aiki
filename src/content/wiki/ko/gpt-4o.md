---
term: gpt-4o
title: GPT-4o(지피티-4o)
lang: ko
summary: >-
  GPT-4o는 OpenAI가 만든 범용 멀티모달 모델이고, OpenAI API와 ChatGPT 흐름에서 텍스트·이미지·음성을 함께 다루는 데
  쓰여. 기사에서 이 이름이 나오면 벤치마크 숫자보다 어떤 사용자 경험과 제품 전략을 밀고 있는지 먼저 보는 편이 맞아.
readerValue: '기사에서 GPT-4o가 나오면 점수표보다 음성 대화, 이미지 이해, 범용 서비스 배포 같은 실제 사용처를 먼저 읽게 해줘.'
category: model
modelType: version
modelProfile:
  memoryUsage: >-
    OpenAI API 기준 컨텍스트 128K, 최대 출력 16,384토큰이야. 자체 호스팅형 웨이트가 아니라 GPU 메모리 계산보다 요청당
    토큰 예산을 먼저 봐.
  implementation: >-
    OpenAI의 범용 멀티모달 GPT 계열이야. 텍스트와 이미지 입력, 텍스트 출력, 함수 호출, 구조화 출력, 파인튜닝까지 공식
    지원한다. 이렇게 보면 돼.
  activeParameters: >-
    활성 파라미터 수는 비공개다. 대신 gpt-4o, gpt-4o-2024-08-06, gpt-4o-2024-11-20처럼 스냅샷을 고정해
    운영할 수 있어.
  multimodalSupport: '텍스트와 이미지 입력, 텍스트 출력이 기본이야. 오디오 입출력은 별도 GPT-4o Audio 계열과 구분해서 보는 편이 정확해.'
  access: >-
    Responses API, Chat Completions, Batch, Realtime에 바로 붙일 수 있어. 범용 프로덕션 기본 모델로
    쓰기 쉬운 타입이야.
  pricing: 'OpenAI API 기준 1M 토큰당 입력 $2.50, 캐시 입력 $1.25, 출력 $10.00이야.'
  weightsOpen: '오픈 웨이트 미공개, API 제공 중심. 이렇게 보면 돼.'
  vendor: OpenAI
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  wiki: 3.1.2
aliases:
  - GPT-4o(지피티-4o)
relatedTerms:
  - gemini
  - chatgpt
  - codex
  - o3
mentionCount: 0
draft: false
tags:
  - openai
  - multimodal
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/GPT-4o'
      title: GPT-4o
    - url: 'https://openai.com/index/hello-gpt-4o/'
      title: Hello GPT-4o
  checks:
    - type: source_match
      result: pass
      summary: 공식 소개와 보조 출처가 겹쳐 말하는 멀티모달 범위를 기준으로 잡았어.
      items:
        - '독자 문제 대조: 이 이름이 그냥 새 성능 모델인지, 실제 서비스용 기본 멀티모달 모델인지 구분하게 만드는 데 초점을 맞췄어.'
        - >-
          OpenAI 소개 글의 핵심인 audio, vision, text 통합과 omni 방향을 한 줄 정의와 실사용 섹션에
          반영했어.
        - 위키 개요가 말하는 멀티모달 모델이라는 큰 틀도 본문 설명과 충돌하지 않게 유지했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 공식 글과 보조 출처가 겹치는 주장만 남기고 나머지는 과감히 뺐어.
      items:
        - '비교 기준: OpenAI 공식 글의 출시 맥락과 위키 개요의 멀티모달 설명이 같은 대상과 범위를 가리키는지 확인했어.'
        - '두 출처 모두 GPT-4o를 텍스트, 이미지, 오디오를 다루는 OpenAI의 멀티모달 모델로 설명해.'
        - 그래서 본문도 세부 가용성보다 범용 멀티모달 성격과 제품 전략 신호에 집중했어.
    - type: number_verify
      result: pass
      summary: 필수 시점 정보만 남기고 변동 큰 수치는 본문에서 뺐어.
      items:
        - 본문에 남긴 명시 숫자는 공개 시점인 2024년 5월 13일뿐이야.
        - 공식 글에 있는 반응 속도나 비용 절감 수치는 출시 자료 성격이 강해서 핵심 정의와 실사용 설명에는 넣지 않았어.
    - type: adversarial
      result: pass
      summary: 제품 이름과 모델 이름을 섞어 읽는 오해를 먼저 막았어.
      items:
        - >-
          GPT-4o를 ChatGPT와 같은 제품 이름처럼 읽는 오해를 막으려고 ChatGPT와의 층위 차이를 관련 모델 섹션에
          넣었어.
        - 모든 모달리티가 항상 동일하게 바로 열린다고 단정하지 않게 단계적 공개와 실제 가용성 차이를 문장에 반영했어.
      findings:
        - GPT-4o를 무조건 OpenAI 최고 모델로 읽으면 실제 기사에서 말하는 제품 포지션을 놓치기 쉬워.
        - 'GPT-4o를 텍스트 챗봇의 새 이름 정도로 축소하면 음성, 이미지 경험을 묶으려는 전략이 빠져.'
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
  contentHash: 0e6907a3040428e9
  reviewedAt: '2026-04-25T09:55:56Z'
formatVersion: 2
---
## 한 줄 정의
GPT-4o는 [OpenAI](/ko/wiki/openai/)가 만든 범용 [멀티모달](/ko/wiki/multimodal/) 모델이야. [OpenAI API](/ko/wiki/openai-api/)와 [ChatGPT](/ko/wiki/chatgpt/) 음성·비전 흐름에서 텍스트, 이미지, 음성을 한 엔진으로 묶어 쓰게 하려는 기본 모델로 보면 돼.
## 이 모델로 무엇을 할 수 있나
실제로는 텍스트 채팅만 하는 모델로 보기보다, 화면을 보고 설명하고, 이미지나 사진을 읽고, 음성 입력을 받아 답하는 범용 인터페이스 모델로 쓰는 편이 맞아. 고객 지원 챗봇, 음성 비서, 시각 질의응답, 문서 화면 분석, [멀티모달](/ko/wiki/multimodal/) 검색 보조 같은 제품 흐름에서 특히 잘 맞아.
또 여러 모달리티를 따로 잇는 파이프라인을 줄이고 싶은 팀에도 의미가 있어. 예전처럼 음성을 글로 바꾸고 다시 모델에 넣는 층을 여러 개 붙이는 대신, 하나의 기본 모델로 채팅, 이미지 이해, 오디오 상호작용을 묶는 방향을 검토하게 해 줘.
## 왜 중요한가
GPT-4o가 중요한 이유는 단순히 멀티모달이 된다는 사실보다, [OpenAI](/ko/wiki/openai/)가 범용 기본 모델을 어떤 사용자 경험 위에 올릴지 보여줬기 때문이야. 2024년 5월 13일 공개 때도 포인트는 실시간에 가까운 대화감, 시각 이해, 더 넓은 서비스 배포 가능성이었지, 숫자 경쟁 하나가 아니었어.
그래서 이 이름은 연구 데모보다 제품 전략 신호에 가깝게 읽혀. 모델을 여러 개 잇는 복잡한 구조 대신 공통 엔진 하나로 음성, 텍스트, 이미지 경험을 묶겠다는 방향이 여기 들어 있어.
## 같이 보면 좋은 모델
- [Gemini](/ko/wiki/gemini/)는 Google 계열의 [멀티모달](/ko/wiki/multimodal/) 모델군이야. GPT-4o와 비교할 때는 점수보다 검색, 안드로이드, 워크스페이스처럼 어떤 제품 묶음 안에서 힘을 쓰는지 보는 편이 맞아.
- [ChatGPT](/ko/wiki/chatgpt/)는 앱과 서비스 이름이고, GPT-4o는 그 안이나 API에서 쓰이는 모델 이름이야. 둘을 같은 층위로 보면 제품과 엔진을 헷갈리게 돼.
- [Codex](/ko/wiki/codex/)는 코드 작성과 개발 워크플로 쪽 맥락이 강한 이름이야. GPT-4o도 코드를 다루지만, 중심은 음성, 이미지까지 묶는 범용 상호작용에 있어.
- [o3](/ko/wiki/o3/)는 [추론](/ko/wiki/inference/) 성격이 더 강한 계열로 읽는 편이 맞아. GPT-4o가 넓은 입력과 사용자 경험을 맡는다면, o3는 더 어려운 문제를 오래 생각하는 쪽에 가깝지.
