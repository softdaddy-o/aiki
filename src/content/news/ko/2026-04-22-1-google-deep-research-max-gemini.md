---
title: "Google, Deep Research Max 공개 — MCP 연결로 기업 내부 데이터까지 분석"
date: "2026-04-22T09:00:00+09:00"
lang: ko
category: news
summary: "구글이 Gemini 3.1 Pro 기반의 자율 리서치 에이전트 Deep Research와 Deep Research Max를 4월 21일 공개했다. MCP를 통해 기업 내부 문서와 외부 웹 데이터를 동시에 분석하고, DeepSearchQA 벤치마크에서 93.3%를 기록했다."
readerValue: "리서치 자동화 도구가 실무에 쓸 만한 수준인지 판단하게 해준다."
sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/"
sourceTitle: "Google Blog — Deep Research Max"
draft: false
score: 70
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-22"
  sources:
    - url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/"
      title: "Google Blog — Deep Research Max announcement"
    - url: "https://venturebeat.com/technology/googles-new-deep-research-and-deep-research-max-agents-can-search-the-web-and-your-private-data"
      title: "VentureBeat — Deep Research coverage"
    - url: "https://the-decoder.com/google-launches-deep-research-and-deep-research-max-agents-to-automate-complex-research/"
      title: "The Decoder — Deep Research launch"
  checks:
    - type: source_match
      result: pass
      summary: "Google 공식 블로그에서 Gemini 3.1 Pro 기반, DeepSearchQA 93.3%, HLE 54.6% 수치를 직접 확인했어."
      items:
        - "Gemini 3.1 Pro 기반 — 공식 블로그 확인"
        - "DeepSearchQA 93.3% (12월 66.1%에서 상승) — 공식 블로그 수치"
        - "HLE 54.6% (12월 46.4%에서 상승) — 공식 블로그 수치"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "VentureBeat, The Decoder, blockchain.news 세 곳이 각각 MCP 지원, 두 티어 구분, 벤치마크 수치를 독립적으로 보도했어."
      items:
        - "VentureBeat: 기업 내부 데이터 연결 MCP 지원 확인"
        - "The Decoder: 두 티어(Deep Research vs Max) 구분 확인"
        - "blockchain.news: 벤치마크 수치 독립 확인"
    - type: number_verify
      result: pass
      summary: "DeepSearchQA 93.3%와 HLE 54.6% 모두 Google 공식 블로그에 명시된 수치야."
      items:
        - "DeepSearchQA 93.3% — Google 블로그 명시"
        - "HLE 54.6% — Google 블로그 명시"
        - "이전 12월 수치 66.1%/46.4% — 공식 블로그 기준선으로 제시"
    - type: adversarial
      result: pass
      summary: "DeepSearchQA와 HLE는 Google이 직접 고른 벤치마크라 독립 기관 비교가 아직 없고, Max 버전은 유료 티어에서만 접근 가능해."
      items:
        - "DeepSearchQA와 HLE는 Google이 선택한 벤치마크 — 독립 검증 필요"
        - "기업 내부 MCP 연결은 기업용 유료 티어에서만 가능 — 일반 사용자 체감 다를 수 있음"
        - "Max 버전은 속도가 느림 — 비동기 워크플로 전용"
      findings:
        - "벤치마크는 Google 자체 선정 — 독립 기관 비교 아직 없음"
        - "API 유료 티어 한정 — 일반 무료 사용자 접근 불가"
tags: ["gemini", "deep-research", "mcp", "google", "agentic"]
guideVersion:
  common: "1.0.0"
  news: "2.1.0"
formatVersion: 2
---

## 무슨 일이 일어났나

구글이 4월 21일 Gemini API에 자율 리서치 에이전트 두 가지를 공개했어. Deep Research는 빠른 응답이 필요한 실시간 인터페이스용이고, Deep Research Max는 방대한 정보를 깊게 파고들어야 하는 비동기 워크플로용이야. 두 버전 모두 Gemini 3.1 Pro 기반이고, [MCP](/ko/wiki/mcp/)를 통해 기업 내부 문서와 외부 웹 데이터를 단일 API 호출로 연결할 수 있어.

## 왜 지금 이게 나왔나

기존 딥 리서치 기능은 지난해 12월 미리보기로 나왔는데 품질이 아쉬웠거든. 이번에는 테스트 타임 컴퓨팅을 늘려 반복적으로 추론하고 검색하고 결과를 다듬는 루프를 강화했어. DeepSearchQA에서 93.3%로, 12월의 66.1%에서 크게 올라갔고, HLE 벤치마크는 46.4%에서 54.6%로 올라갔어. 시각 자료 생성 기능도 새로 들어가서 보고서 안에 차트를 바로 만들어낼 수 있어.

## 어떤 의미인가

달라진 건 [MCP](/ko/wiki/mcp/) 연결이야. 외부 뉴스만 긁어오는 게 아니라, 회사 내부 문서나 전문 금융 데이터까지 연결해서 분석할 수 있거든. 사람이 정보를 찾고 취합하고 차트를 그리던 과정이 지시어 하나로 압축되는 거야. Gemini API 유료 티어에서 지금 바로 쓸 수 있어.

## 주의할 점

Deep Research Max는 속도가 느린 대신 깊이가 있어. 빠른 시안 작업보다는 최종 보고서 완성도가 중요한 워크플로에 맞아. 벤치마크 수치는 구글이 선정한 기준이라 독립 비교 데이터가 아직 없다는 점도 감안해야 해.
