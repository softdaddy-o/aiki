---
term: gemma
title: "Gemma — Google의 오픈 LLM"
lang: ko
summary: "Gemma는 Google이 Gemini 기술로 만든 오픈소스 LLM 시리즈야. Apache 2.0 라이선스라 누구나 무료로 쓸 수 있고, 노트북에서도 돌릴 수 있을 만큼 가벼워."
category: model
aliases:
    - Gemma 2
    - Gemma 3
    - Google Gemma
relatedTerms:
    - llm
    - gemini
    - benchmark
    - token
mentionCount: 8
draft: false
tags:
    - google
    - open-source
    - small-model
---

## 한 줄 정의

Gemma는 Google이 [Gemini](/ko/wiki/gemini) 기술을 바탕으로 만든 "작고 공개된" [LLM](/ko/wiki/llm)이야. 대기업 AI를 내 컴퓨터에서 직접 돌려볼 수 있게 풀어놓은 거거든.

## 작동 원리

Gemini가 레스토랑 풀코스 요리라면, Gemma는 같은 셰프가 만든 도시락이야. 핵심 레시피(학습 기법, 아키텍처)는 같은데, 크기를 줄여서 누구나 접근할 수 있게 만든 거지.

라인업은 파라미터 크기별로 나뉘어:

- **Gemma 2B/7B** — 초기 버전. 가볍지만 기본기가 탄탄해.
- **Gemma 2 9B/27B** — 같은 크기 대비 성능이 크게 올라간 2세대.
- **Gemma 3** — 멀티모달 지원이 추가된 최신 버전. 이미지도 이해해.

Apache 2.0 라이선스라는 게 핵심이야. 상업적으로 써도 되고, 수정해도 되고, 재배포해도 돼. 제약이 거의 없어.

## 왜 중요한가

GPT-4나 Claude 같은 모델은 [API](/ko/wiki/api)로만 쓸 수 있잖아. 데이터가 외부 서버로 나가니까 보안이 민감한 기업은 쓰기 어려워. Gemma는 내 서버에서 직접 돌릴 수 있으니까 데이터가 밖으로 안 나가.

[벤치마크](/ko/wiki/benchmark)에서도 같은 크기 오픈 모델 중 상위권을 꾸준히 찍고 있어. 특히 Gemma 2 27B는 크기 대비 성능이 인상적이라서, 오픈소스 LLM 커뮤니티에서 기준 모델처럼 쓰이고 있어.

파인튜닝도 쉬워서, 특정 도메인(의료, 법률, 코딩)에 맞게 커스터마이징하는 사례가 많아.

## 관련 용어

- [Gemini](/ko/wiki/gemini) — Gemma의 모태가 된 Google의 대형 멀티모달 모델이야.
- [LLM](/ko/wiki/llm) — Gemma가 속하는 거대 언어 모델 카테고리야.
- [벤치마크](/ko/wiki/benchmark) — Gemma 성능을 다른 오픈 모델과 비교하는 표준 시험이야.
- [토큰](/ko/wiki/token) — Gemma도 텍스트를 토큰 단위로 처리해. Gemini와 토크나이저가 유사해.
