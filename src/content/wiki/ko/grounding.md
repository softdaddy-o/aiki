---
term: grounding
title: "Grounding"
lang: ko
summary: "Grounding는 검색 결과와 메모리 연결 맥락에서 반복해서 등장하는 AI 기법다."
readerValue: "이 용어가 뉴스에 나오면 Grounding가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
category: technique
aliases:
  - "retrieval grounding"
relatedTerms:
  - rag
  - llamaindex
  - embedding
  - vector-db
firstMentioned: "2026-03-23"
mentionCount: 1
draft: false
tags:
  - retrieval
  - reliability
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://ai.google.dev/gemini-api/docs/grounding"
      title: "Google 검색으로 그라운딩 &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers"
    - url: "https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview"
      title: "Grounding overview &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 먼저 감 잡기
Grounding는 특정 제품명이 아니라 일을 처리하는 방법에 가깝다. 결국 이 기법이 검색 결과와 메모리 연결 가운데 무엇을 바꾸는지 봐야 한다. 같은 기법이라도 어떤 모델과 데이터 위에 얹히느냐에 따라 무게가 달라진다.
## 뉴스에서 왜 자주 나오나
Grounding는 AIKI 기사에서 1번 이상 언급됐고, 가장 이른 기록도 2026-03-23까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 검색 결과와 메모리 연결 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 Google 검색으로 그라운딩 &nbsp;|&nbsp; Gemini API &nbsp;|&nbsp; Google AI for Developers, Grounding overview &nbsp;|&nbsp; Generative AI on Vertex AI &nbsp;|&nbsp; Google Cloud Documentation 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라진다.
## 읽을 때 체크포인트
1. 먼저 Grounding가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 검색 결과와 메모리 연결 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 retrieval grounding 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [rag](/ko/wiki/rag/)
- [llamaindex](/ko/wiki/llamaindex/)
- [embedding](/ko/wiki/embedding/)
- [vector-db](/ko/wiki/vector-db/)