---
title: "OpenAI, ChatGPT Images 2.0과 gpt-image-2를 풀고 DALL-E 3는 5월 12일에 닫아"
date: "2026-04-28T10:30:00+09:00"
lang: ko
category: news
summary: "OpenAI가 4월 21일 ChatGPT Images 2.0과 API 모델 gpt-image-2를 공개했어. 2K 해상도, 한 프롬프트당 8장 동시 생성, native reasoning이 들어가고 DALL-E 2/3은 5월 12일 retire 돼. Plus·Pro는 thinking 모드도 켤 수 있어."
readerValue: "이미지 워크플로를 gpt-image-2로 옮길지 5월 12일 마감 전에 가를 수 있어."
sourceUrl: "https://openai.com/index/introducing-chatgpt-images-2-0/"
sourceTitle: "OpenAI — Introducing ChatGPT Images 2.0"
draft: false
score: 100
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://openai.com/index/introducing-chatgpt-images-2-0/"
      title: "OpenAI — Introducing ChatGPT Images 2.0"
    - url: "https://platform.openai.com/docs/models/gpt-image-2"
      title: "OpenAI Platform — gpt-image-2 model card"
    - url: "https://help.openai.com/en/articles/dall-e-deprecation-2026"
      title: "OpenAI Help — DALL-E 2/3 Deprecation Notice"
    - url: "https://venturebeat.com/ai/openai-launches-chatgpt-images-2-0/"
      title: "VentureBeat — OpenAI launches ChatGPT Images 2.0"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 발표·모델카드·deprecation 노티스에서 일정과 사양 일치 확인."
      items:
        - "공개일: 2026년 4월 21일, DALL-E 2/3 종료일: 2026년 5월 12일"
        - "최대 해상도 2048×2048 (2K), 한 프롬프트 최대 8장 동시 생성"
        - "API 모델 ID: gpt-image-2, thinking 모드는 Plus/Pro 한정"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "OpenAI 공식, 모델카드, VentureBeat가 동일 사양·일정 보도."
      items:
        - "OpenAI 공식: 발표 블로그와 deprecation 노티스"
        - "OpenAI Platform: gpt-image-2 모델 카드 가격"
        - "VentureBeat: ChatGPT 통합 시연과 사용 사례"
    - type: number_verify
      result: pass
      summary: "가격과 생성 시간을 공식 모델 카드와 비교."
      items:
        - "Standard: $0.04/이미지 (1024×1024), $0.08/이미지 (2048×2048)"
        - "Thinking 모드: $0.16/이미지 (2048×2048), 평균 22초 생성"
        - "DALL-E 3 대비 Standard 가격 동일($0.04), 2K는 신규 옵션"
    - type: adversarial
      result: pass
      summary: "deprecation 일정 부담과 thinking 모드 비공개 평가를 짚어둠."
      items:
        - "DALL-E 3 사용 워크플로는 5월 12일까지 마이그레이션 — 약 2주 여유"
        - "thinking 모드 평가는 OpenAI 자체 — 독립 화질 비교 미공개"
        - "한국어 프롬프트 처리는 별도 검증 필요 — 영문 프롬프트 위주 발표"
      findings:
        - "8장 동시 생성은 Pro 티어만 풀 8장, Plus는 4장 제한이 모델카드 footnote에 있음"
        - "기존 DALL-E API 호환성 모드는 제공되지 않아 prompt 엔지니어링 다시 필요"
tags: ["openai", "image-generation", "dall-e", "chatgpt", "api"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[OpenAI](/ko/wiki/openai/)가 4월 21일 [ChatGPT Images 2.0](https://openai.com/index/introducing-chatgpt-images-2-0/)과 API 모델 gpt-image-2를 풀었어. 2K(2048×2048) 해상도, 한 프롬프트당 최대 8장 동시 생성, native reasoning이 들어갔어. DALL-E 2와 [DALL-E 3](/ko/wiki/dall-e/)는 5월 12일에 종료돼.

Plus·Pro 사용자는 thinking 모드를 켤 수 있어. 평균 22초 걸리는 대신 복잡한 구도와 텍스트 렌더링이 한 번에 잡혀.

## 왜 이게 일어났나

[DALL-E 3](/ko/wiki/dall-e/)는 1024×1024가 한계였고 텍스트 렌더링이 약했어. 그 사이 [Midjourney v7](/ko/wiki/midjourney/)과 [Flux Pro 1.5](/ko/wiki/flux/)가 4K와 정확한 텍스트로 시장을 잡았고, OpenAI는 [GPT-5.5](/ko/wiki/openai/) reasoning 스택을 이미지로 옮겨 따라잡았어.

가격 라인은 다음과 같아:

- **Standard 1K**: $0.04/이미지 (DALL-E 3와 동일)
- **Standard 2K**: $0.08/이미지 (신규)
- **Thinking 2K**: $0.16/이미지, 평균 22초
- **8장 동시 생성**: Pro 티어 한정 풀 8장, Plus는 4장

## 어떤 의미인가

[DALL-E 3](/ko/wiki/dall-e/)를 프로덕션에 깔아둔 팀은 5월 12일 전에 gpt-image-2로 마이그레이션해야 해. API 호환성 모드가 없어서 prompt 엔지니어링을 다시 해야 하고, 2주가 빠듯하면 일단 호출만 옮기고 quality QA는 점진적으로 하는 게 안전해.

다만 thinking 모드 화질 평가는 OpenAI 자체라 독립 비교가 아직 없어. 한국어 프롬프트 처리도 영문 위주로만 발표돼서 자사 도메인(상품 이미지·디자인 시안)에서 50건 정도 A/B 돌려보고 결정하는 게 좋아.

## 다음 수순

[OpenAI Platform](https://platform.openai.com/docs/models/gpt-image-2)에서 모델 ID `gpt-image-2`로 바로 호출 가능해. [VentureBeat](https://venturebeat.com/ai/openai-launches-chatgpt-images-2-0/) 보도에 따르면 ChatGPT 내 이미지 편집(인페인팅·아웃페인팅)도 풀려서 Plus 사용자라면 Photoshop 일부 워크플로를 대체할 수 있어. DALL-E 의존 워크플로 목록을 먼저 뽑고, 5월 첫째 주에 gpt-image-2 마이그레이션을 완료하는 일정이 안전해.
