---
title: "미국 데이터센터 절반이 지연 또는 취소 — 전력 인프라가 병목"
date: "2026-04-06T14:00:00+09:00"
lang: ko
category: news
summary: "2026년 미국에서 예정된 데이터센터 건설의 30~50%가 지연 또는 취소될 전망이다. 변압기, 배전반 등 핵심 전기 부품의 리드타임이 최대 5년까지 늘어났고, 상당수가 중국산에 의존하고 있다."
readerValue: "이 글이 해결해주는 문제는 2026년 미국에서 예정된 데이터센터 건설의 30~50%가 지연 또는 취소될 전망이다. 변압기, 배전반 등 핵심 전기 부품의 리드타임이 최대 5년까지 늘어났고, 상당수가 중국산에 의존하고 있다가 실제 시장과 개발 흐름에서 왜 중요한지 빠르게 파악하게 해준다는 점이다."
sourceUrl: "https://www.tomshardware.com/tech-industry/artificial-intelligence/half-of-planned-us-data-center-builds-have-been-delayed-or-canceled-growth-limited-by-shortages-of-power-infrastructure-and-parts-from-china-the-ai-build-out-flips-the-breakers"
sourceTitle: "Tom's Hardware"
draft: false
score: 65
factCheck:
  status: passed
  date: "2026-04-06"
  sources:
    - url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/half-of-planned-us-data-center-builds-have-been-delayed-or-canceled-growth-limited-by-shortages-of-power-infrastructure-and-parts-from-china-the-ai-build-out-flips-the-breakers"
      title: "Tom's Hardware 보도"
    - url: "https://www.bloomberg.com/news/features/2026-04-01/us-ai-data-center-expansion-relies-on-chinese-electrical-equipment-imports"
      title: "Bloomberg 보도"
    - url: "https://futurism.com/science-energy/data-centers-construction-supply"
      title: "Futurism 보도"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "30~50% 범위가 넓은 편 — Sightline Climate 추정치로 확정 수치 아님"
        - "빅테크 6500억 달러 투자 계획은 취소분 미반영 가능성"
tags: ["데이터센터", "AI-인프라", "전력", "중국-부품", "공급망"]
---

## 6500억 달러 투자인데 절반이 막혔대

Alphabet, Amazon, Meta, Microsoft가 2026년 AI 인프라에 6,500억 달러 이상을 투입할 계획이거든. 근데 [Sightline Climate 분석](https://www.tomshardware.com/tech-industry/artificial-intelligence/half-of-planned-us-data-center-builds-have-been-delayed-or-canceled-growth-limited-by-shortages-of-power-infrastructure-and-parts-from-china-the-ai-build-out-flips-the-breakers)에 따르면, 미국에서 올해 예정된 데이터센터 건설의 30~50%가 지연 또는 취소될 전망이래.

[Bloomberg](https://www.bloomberg.com/news/features/2026-04-01/us-ai-data-center-expansion-relies-on-chinese-electrical-equipment-imports), [TechSpot](https://www.techspot.com/news/111947-nearly-half-us-data-centers-planned-2026-facing.html), [Futurism](https://futurism.com/science-energy/data-centers-construction-supply) 등에서 꽤 크게 다뤘어.

## 병목이 GPU가 아니라 전력 인프라래

변압기, 배전반, 배터리 같은 전기 부품이 부족한 거야. 고용량 변압기 납기가 미국 내에서 최대 5년까지 늘어났는데, AI 데이터센터 배포 주기는 18개월 이하거든. 격차가 너무 커.

2026년 미국에서 약 12GW의 데이터센터 용량이 가동 예정인데, 실제로 착공 중인 건 3분의 1 수준이래.

## 근데 그 부품이 중국산이야

핵심 전기 장비 상당 부분이 중국산이거든. 변압기, 배전반, 배터리 모두 중국이 세계 최대 생산국이야. 미·중 무역 갈등 속에서 이 의존 구조가 AI 인프라 확장의 또 다른 리스크가 되고 있어.
