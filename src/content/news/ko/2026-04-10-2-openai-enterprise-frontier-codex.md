---
title: "OpenAI, 엔터프라이즈 매출 비중 40% 돌파 — Codex 300만 사용자"
date: "2026-04-10T09:30:00+09:00"
lang: ko
category: news
summary: "OpenAI 엔터프라이즈 매출이 전체의 40%를 넘겼고 연말까지 소비자 매출과 동률을 목표로 한다. Codex 주간 활성 사용자는 300만 명을 찍었고, Frontier 플랫폼으로 Oracle·Uber 등이 에이전트를 배포 중이다."
readerValue: "OpenAI가 B2B로 얼마나 빠르게 전환하고 있는지 파악해서 내 업무 도구 선택에 참고하게 해준다"
sourceUrl: "https://openai.com/index/next-phase-of-enterprise-ai/"
sourceTitle: "OpenAI - The next phase of enterprise AI"
draft: false
score: 80
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://openai.com/index/next-phase-of-enterprise-ai/"
      title: "OpenAI - The next phase of enterprise AI"
    - url: "https://www.coindesk.com/tech/2026/04/01/openai-raises-a-record-usd122-billion-at-as-revenue-crosses-usd2-billion-per-month"
      title: "CoinDesk - OpenAI raises $122 billion"
    - url: "https://winbuzzer.com/2026/04/04/openai-switches-codex-pay-as-you-go-pricing-cuts-business-seat-cost-xcxwbn/"
      title: "WinBuzzer - OpenAI Codex pricing"
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제 OpenAI 발표 내용과 맞는지부터 먼저 맞춰봤다.
      items:
        - 엔터프라이즈 매출 40%+ — OpenAI 공식 블로그랑 Yahoo Finance 보도에서 같은 수치를 쓰고 있었어.
        - Codex 주간 활성 사용자 300만 명 — OpenAI 공식 발표랑 TechRadar 보도에서 일치했어.
        - 월 매출 20억 달러 — CoinDesk, CNBC 등 여러 매체에서 같은 수치를 봤어.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 원문 하나만 믿지 않으려고 독립 매체 3곳 이상을 옆에 두고 다시 봤다.
      items:
        - 1220억 달러 펀딩, 8520억 달러 밸류에이션 — Bloomberg, CNBC, TechCrunch에서 같은 수치를 쓰고 있었어.
        - Codex 가격 변경(시트당 $20 + 종량제) — WinBuzzer, gHacks에서 같은 내용을 봤어.
        - Frontier 플랫폼 고객사(Oracle, Uber, State Farm) — OpenAI 블로그와 매체 보도가 일치했어.
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 금액이랑 사용자 수는 따로 떼어서 한 번 더 봤다.
      items:
        - 1220억 달러 펀딩 — Bloomberg 2026-03-31 보도에서 정확히 같은 수치를 확인했어.
        - 8520억 달러 밸류에이션 — Bloomberg, CNBC에서 같은 수치였어.
        - 시트당 $25에서 $20 인하 — OpenAI 공식 발표랑 WinBuzzer 보도가 일치했어.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿기 쉬운 지점을 따로 의심해보고 걸렀다.
      items:
        - 매출 수치는 OpenAI 자체 발표이고 감사 보고서는 아직 공개 안 됐어.
        - 300만 주간 활성 사용자의 기준(WAU 정의)이 명확하지 않았어.
        - 엔터프라이즈 40%라는 수치가 ARR인지 MRR인지 기준이 안 나와 있었어.
      findings:
        - "OpenAI 자체 발표 매출 수치라 독립 감사 전까지는 참고 수준으로 봐야 해"
        - "IPO 준비 중인 회사의 성장 수치 발표는 투자자 유치 맥락이 깔려 있다"
tags:
  - openai
  - enterprise-ai
  - codex
  - ai-business
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

OpenAI의 엔터프라이즈 매출이 전체의 40%를 넘겼어. 연말까지 소비자 매출과 동률을 맞추겠다는 목표인데, 이 속도면 충분히 가능해 보여. 월 매출은 20억 달러를 찍었고, [1220억 달러 펀딩](https://openai.com/index/accelerating-the-next-phase-ai/)으로 밸류에이션이 8520억 달러까지 올랐다.

눈에 띄는 건 [Codex](https://openai.com/index/codex-flexible-pricing-for-teams/)야. 주간 활성 사용자가 300만 명인데, 분기 초엔 거의 0에 가까웠거든. 가격도 바뀌었어 — 기존 시트당 $25에서 $20으로 내리면서 종량제(pay-as-you-go) 옵션을 추가했다. 워크스페이스당 최대 5명에게 $500 크레딧도 주고 있어.

[Frontier 플랫폼](https://openai.com/index/next-phase-of-enterprise-ai/)도 주목할 부분이야. Oracle, Uber, State Farm 같은 기업이 여기서 에이전트를 만들어 전사적으로 배포하고 있다. 단일 제품에 에이전트를 끼워넣는 게 아니라 회사 전체 시스템을 넘나들면서 작동하는 구조거든. McKinsey, BCG, Accenture 같은 컨설팅 파트너까지 붙어서 기업 도입을 밀어주고 있어. B2B AI 시장이 본격적으로 열리고 있다는 신호야.
