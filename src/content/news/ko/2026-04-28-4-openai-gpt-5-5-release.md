---
title: "OpenAI, GPT-5.5를 1M 컨텍스트와 5달러/1M 토큰으로 풀었어"
date: "2026-04-28T10:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 4월 23일 GPT-5.5를 API에 풀었어. 1M 토큰 컨텍스트와 입력 5달러·출력 30달러(1M 토큰 기준)에 reasoning 자동 라우팅이 들어갔어. Pro 티어는 30달러·180달러로 SWE-bench 78%를 찍었어."
readerValue: "Claude Opus 4.6 vs GPT-5.5 가격·성능 라인업을 다시 짜야 할지 가를 수 있어."
sourceUrl: "https://openai.com/index/introducing-gpt-5-5/"
sourceTitle: "OpenAI — Introducing GPT-5.5"
draft: false
score: 110
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://openai.com/index/introducing-gpt-5-5/"
      title: "OpenAI — Introducing GPT-5.5"
    - url: "https://platform.openai.com/docs/models/gpt-5-5"
      title: "OpenAI Platform — GPT-5.5 model card"
    - url: "https://techcrunch.com/2026/04/23/openai-launches-gpt-5-5-with-1m-context/"
      title: "TechCrunch — OpenAI launches GPT-5.5"
    - url: "https://www.cnbc.com/2026/04/23/openai-gpt-5-5-pricing-claude-competition.html"
      title: "CNBC — OpenAI GPT-5.5 pricing vs Claude"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 발표·모델카드와 보도 4건에서 가격·컨텍스트·일정 일치 확인."
      items:
        - "공개일: 2026년 4월 23일 (KST 기준 4월 24일 새벽)"
        - "컨텍스트 1M 토큰, 출력 최대 128k 토큰"
        - "Standard 입력 $5 / 출력 $30, Pro 입력 $30 / 출력 $180 (1M 토큰 기준)"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "OpenAI 공식 외 TechCrunch·CNBC가 동일 가격·벤치 확인."
      items:
        - "OpenAI 공식: 모델 카드와 발표 블로그"
        - "TechCrunch: 1M 컨텍스트 출시 맥락"
        - "CNBC: Claude 대비 가격 포지셔닝 분석"
    - type: number_verify
      result: pass
      summary: "벤치마크 점수와 가격 비율을 공식 발표와 비교."
      items:
        - "SWE-bench Verified: GPT-5.5 Pro 78%, Standard 71%"
        - "MMLU-Pro: 85.2% (GPT-5는 82.4%)"
        - "Pro는 Standard 대비 입출력 모두 6배 가격"
    - type: adversarial
      result: pass
      summary: "벤치 자체평가 한계와 reasoning 라우팅 불투명성을 짚어둠."
      items:
        - "SWE-bench는 OpenAI 자체 평가 — Anthropic·Google 독립 재현 필요"
        - "Standard 모델의 reasoning 자동 라우팅 트리거가 비공개라 비용 예측이 어려워"
        - "1M 컨텍스트는 prompt-caching 적용 시에만 가격 정상, 캐시 미스는 별도 청구"
      findings:
        - "GPT-5 대비 가격 인상 — 입력 +25%, 출력 +20%인 점은 OpenAI 발표문에서 명시되지 않음"
        - "Claude Opus 4.6 가격($15/$75)과 비교 시 Standard는 1/3, Pro는 2배 수준"
tags: ["openai", "gpt-5-5", "llm", "api", "pricing"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[OpenAI](/ko/wiki/openai/)가 4월 23일 [GPT-5.5](https://openai.com/index/introducing-gpt-5-5/)를 API에 풀었어. 컨텍스트 1M 토큰, 출력 128k까지 받고, Standard 가격이 입력 $5 / 출력 $30(1M 토큰 기준)이야. Pro 티어는 $30 / $180으로 6배 비싸고 reasoning이 더 깊게 들어가.

[모델 카드](https://platform.openai.com/docs/models/gpt-5-5)에 따르면 reasoning 자동 라우팅이 Standard에도 들어갔는데, 단순 질문은 빠른 경로, 복잡한 멀티스텝은 reasoning 경로로 자동 분기돼.

## 왜 이게 일어났나

[Claude Opus 4.6](/ko/wiki/claude/)이 1M 컨텍스트와 SWE-bench Verified 76%로 코딩 시장을 잡고 있었어. OpenAI는 SWE-bench 78%(Pro 기준)로 살짝 앞섰고, Standard 가격은 [Claude Opus 4.6](/ko/wiki/claude/)의 1/3 수준($15/$75 → $5/$30)으로 내려서 가격 압박을 걸었어.

벤치는 다음과 같아:

- **SWE-bench Verified**: GPT-5.5 Pro 78%, Standard 71%
- **MMLU-Pro**: 85.2% (GPT-5는 82.4%)
- **MATH-500**: Pro 96%, Standard 92%
- **GPQA Diamond**: Pro 84%, Standard 75%

## 어떤 의미인가

API를 [Claude](/ko/wiki/claude/)와 [OpenAI](/ko/wiki/openai/) 모두 쓰는 팀이면 가격 모델 다시 짜야 해. 단순 챗·요약 워크로드는 GPT-5.5 Standard($5/$30)가 가장 저렴하고, 코드 에이전트 같은 깊은 reasoning은 [Claude Opus 4.6](/ko/wiki/claude/)($15/$75)와 GPT-5.5 Pro($30/$180) 사이에서 도메인별 벤치를 돌려봐야 해.

다만 reasoning 자동 라우팅이 비용 변동성을 키워. Standard 호출인데 모델이 reasoning 경로로 분기하면 응답 시간이 5-10초 걸리고 토큰 비용도 늘어. prompt-caching을 켜지 않으면 1M 컨텍스트는 캐시 미스 청구로 예산이 빠르게 새.

## 다음 수순

[OpenAI Platform](https://platform.openai.com/docs/models/gpt-5-5)에서 모델 ID `gpt-5.5`로 바로 호출 가능해. 사내 라우팅 레이어가 있으면 routing rule을 추가해서 비교 측정부터 해. [TechCrunch](https://techcrunch.com/2026/04/23/openai-launches-gpt-5-5-with-1m-context/) 분석에 따르면 OpenAI는 다음 분기에 Mini 티어($1/$5 예상)도 풀 예정이라 가격 파편화가 더 진행돼. 지금 다중 모델 라우터 설계가 안 돼 있으면 한 분기 안에 짜두는 게 좋아.
