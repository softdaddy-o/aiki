---
term: gemini
title: "Gemini — Google의 멀티모달 AI"
lang: ko
summary: "Gemini는 Google DeepMind가 만든 멀티모달 AI 모델 패밀리야. 텍스트, 이미지, 코드, 오디오, 비디오를 한 모델에서 다 처리하는 게 특징이거든."
category: model
aliases:
    - Google Gemini
    - Gemini Pro
    - Gemini Ultra
    - Gemini Flash
relatedTerms:
    - llm
    - benchmark
    - gemma
    - token
mentionCount: 11
draft: false
tags:
    - google
    - multimodal
    - foundation-model
---

## 한 줄 정의

Gemini는 Google이 만든 "눈도 귀도 있는" AI야. 글만 읽는 게 아니라 사진 보고, 코드 짜고, 영상까지 이해하는 멀티모달 모델이거든.

## 작동 원리

보통 [LLM](/ko/wiki/llm)은 텍스트만 다루잖아. Gemini는 처음부터 텍스트, 이미지, 오디오, 비디오, 코드를 함께 학습했어. 그래서 "이 사진에 뭐가 있어?"라고 물으면 텍스트로 답하고, "이 코드 뭐가 잘못됐어?"라고 물으면 버그를 찾아줘.

모델 라인업은 크기별로 나뉘어:

- **Gemini Ultra/2.5 Pro** — 최상위 모델. 복잡한 추론, 긴 문맥, 멀티모달 작업에 강해.
- **Gemini Flash** — 속도 최적화 모델. 빠르고 저렴해서 대량 처리에 좋아.
- **Gemini Nano** — 온디바이스 모델. 스마트폰에서 직접 돌아가.

특히 Gemini 2.5 Pro는 100만 [토큰](/ko/wiki/token) 컨텍스트 윈도우를 지원해. 책 한 권을 통째로 넣고 질문할 수 있는 수준이야.

## 왜 중요한가

Google은 검색, Gmail, Docs, Android 등 수십억 명이 쓰는 서비스를 갖고 있잖아. Gemini가 이 서비스들에 하나씩 들어가고 있어. Google 검색의 AI Overview, Google Docs의 Gemini 사이드바, Android의 Gemini 어시스턴트 — 전부 같은 모델 패밀리야.

[벤치마크](/ko/wiki/benchmark) 경쟁에서도 GPT-4, Claude와 계속 엎치락뒤치락하고 있어서, AI 뉴스에서 가장 자주 보게 되는 이름 중 하나야.

## 관련 용어

- [LLM](/ko/wiki/llm) — Gemini의 텍스트 처리 핵심이 되는 거대 언어 모델 기술이야.
- [Gemma](/ko/wiki/gemma) — Gemini 기술을 기반으로 만든 Google의 오픈소스 모델이야.
- [벤치마크](/ko/wiki/benchmark) — Gemini 성능을 다른 모델과 비교하는 표준 시험이야.
- [토큰](/ko/wiki/token) — Gemini가 텍스트를 처리하는 기본 단위야. 컨텍스트 윈도우 크기도 토큰으로 재지.
