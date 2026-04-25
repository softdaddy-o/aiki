---
term: grounding
title: Grounding (그라운딩)
lang: ko
summary: >-
  Grounding은 모델 답변을 외부 근거와 연결해서 말하게 만드는 방법이야. 모델이 원래 알고 있던 것만 꺼내게 두지 않고, 실행 시점의
  검색 결과나 내부 문서를 붙여 정확도를 끌어올리는 쪽에 가깝지.
readerValue: >-
  Grounding을 알면 모델이 똑똑한 건지, 검색과 근거 붙이기가 잘 된 건지 구분하는 데 도움돼. 최신 정보나 사내 문서를 다루는 제품을
  볼 때 특히 유용해.
category: technique
aliases:
  - retrieval grounding
relatedTerms:
  - rag
  - llamaindex
  - embedding
  - vector-db
firstMentioned: '2026-03-23'
mentionCount: 1
draft: false
tags:
  - retrieval
  - reliability
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview'
      title: >-
        接地總覽 &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud
        Documentation
    - url: 'https://ai.google.dev/gemini-api/docs/google-search'
      title: >-
        Grounding with Google Search &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp;
        Google AI for Developers
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: Grounding을 외부 근거 연결 방식으로 설명한 핵심 정의를 Google 계열 문서 흐름에 맞춰봤어.
      items:
        - '독자 문제 대조: Grounding을 추가 학습이나 파인튜닝으로 오해하지 않게, 실행 시점의 근거 연결이라고 먼저 적었어.'
        - >-
          Google 문서가 말하는 Search 연결, world knowledge 연결, citations 향상 맥락을 본문에
          반영했어.
      findings:
        - 근거 연결과 응답 사실성 개선이라는 중심축이 잘 맞았어.
        - 학습 기법처럼 읽히는 표현은 덜어냈어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 'Vertex AI 문서와 Gemini API 문서를 비교해서, Grounding의 실무 의미를 너무 좁히지 않았는지 다시 봤어.'
      items:
        - '비교 기준: 검색 결과 연결, 최신 정보 반영, 사실성 향상, 인용 가능성이라는 네 축을 맞춰봤어.'
        - 'Google Search 전용 기능으로만 읽히지 않게, broader retrieval 구조로 설명 범위를 조정했어.'
      findings:
        - 검색 기반 Grounding이 대표 사례지만 개념 자체는 더 넓게 써도 괜찮았어.
        - 특정 제품 API 이름은 과하게 넣지 않고 줄였어.
    - type: number_verify
      result: pass
      sources: 1
      summary: 정확도 향상 비율 같은 숫자 주장은 근거가 분산돼 있어서 본문에서 뺐어.
      items:
        - 몇 퍼센트 더 정확하다는 식의 수치는 데이터셋과 설정에 따라 크게 달라져서 넣지 않았어.
        - 독자에게 더 중요한 건 구조적 차이라서 개념 설명에 집중했어.
      findings:
        - 수치 과장 없이도 Grounding의 역할이 보이게 남겼어.
    - type: adversarial
      result: pass
      summary: Grounding이 붙으면 무조건 사실이라는 오해를 막았어.
      items:
        - 검색 결과가 틀리거나 낡으면 그 오류가 그대로 답변에 실릴 수 있다는 점을 주의 항목에 넣었어.
        - 또 모델 자체가 좋아진 것과 검색층이 좋아진 걸 헷갈리기 쉬워서 둘을 구분해 적었어.
      findings:
        - 근거 기반 답변과 진실 보증을 같은 말로 읽지 않게 막았어.
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
formatVersion: 2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "ebb46bb600388f87"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Grounding은 모델이 허공에서 답을 짓지 않게, 검색 결과나 데이터베이스, 문서 같은 외부 근거에 답변을 연결하는 방식이야. 쉽게 말하면 모델 자체를 다시 훈련하는 게 아니라, 답변 직전에 발밑에 근거를 깔아 주는 절차라고 보면 돼.
## 어떻게 작동하나
질문이 들어오면 먼저 웹 검색, 사내 검색, 벡터 검색 같은 단계에서 관련 자료를 가져오고, 그 내용을 프롬프트나 컨텍스트에 넣어 모델이 그 근거를 바탕으로 답하게 만들어. 어떤 시스템은 인용 링크나 출처 텍스트까지 같이 보여 줘서 사용자가 답의 근거를 직접 확인하게 하고, 어떤 시스템은 보이지 않더라도 내부적으로 같은 구조를 써.
## 왜 중요한가
모델은 최신 사건이나 조직 내부 문서를 기본적으로 모르기 때문에, 실서비스에 들어가면 Grounding이 거의 필수처럼 붙는 경우가 많아. 특히 검색 결과를 붙이면 사실성, 시의성, 추적 가능성이 같이 올라가서, 그냥 그럴듯한 답보다 검증 가능한 답에 더 가까워져.
## 주의해서 볼 점
Grounding을 붙였다고 무조건 참이 되진 않아. 잘못 검색한 문서나 낡은 자료를 붙이면 오히려 틀린 답을 근거 있어 보이게 만들 수 있고, 검색 품질이 낮으면 모델 자체보다 검색층이 병목이 되기도 해.
## 관련 용어
- [RAG](/ko/wiki/rag/): Grounding을 구현하는 대표 패턴이야. 자료를 찾고, 그 자료를 붙여 답하게 만드는 전체 흐름을 말해.
- [LlamaIndex](/ko/wiki/llamaindex/): Grounding 파이프라인을 코드로 짜는 데 자주 쓰이는 도구야. 어떤 문서를 어떻게 연결할지 설계할 때 많이 등장해.
- [Embedding](/ko/wiki/embedding/): 어떤 문서가 질문과 가까운지 찾는 핵심 표현 방식이야. Grounding의 검색 품질을 크게 좌우해.
- [Vector DB](/ko/wiki/vector-db/): 임베딩을 저장하고 꺼내는 저장소야. Grounding 시스템에서 검색 속도와 운영 편의성을 받쳐 줘.
