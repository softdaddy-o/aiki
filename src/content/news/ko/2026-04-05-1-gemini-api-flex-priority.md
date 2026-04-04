---
title: "Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리"
date: "2026-04-05T09:00:00+09:00"
lang: ko
category: news
summary: "Google이 Gemini API에 Flex(50% 할인)와 Priority(75-100% 프리미엄) 두 가지 추론 티어를 추가했다. 같은 API 엔드포인트에서 service_tier 파라미터 하나로 전환 가능."
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/"
sourceTitle: "Google Blog"
draft: false
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/"
      title: "Google Blog — Flex and Priority tiers"
    - url: "https://ai.google.dev/gemini-api/docs/priority-inference"
      title: "Gemini API Priority Inference Docs"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
tags: ["gemini", "google", "api", "pricing"]
---

Google이 Gemini API에 두 가지 추론 티어를 새로 추가했다. 4월 2일 발표.

**Flex 티어**는 비용 최적화용이다. 표준 대비 50% 저렴한 대신 응답 지연이 생길 수 있다. 기존 Batch API와 다르게 동기식 API라서 별도 파일 관리나 폴링 없이 같은 엔드포인트를 그대로 쓴다. CRM 일괄 업데이트, 대규모 리서치 시뮬레이션, 에이전트가 백그라운드에서 탐색하는 워크플로우에 적합하다.

**Priority 티어**는 정반대다. 75-100% 프리미엄을 내고 최우선 컴퓨팅 큐에 라우팅된다. 트래픽이 동적 한도를 초과하면 서버가 자동으로 표준 처리로 다운그레이드하는 방식. Tier 2/3 유료 프로젝트에서만 사용 가능하다.

둘 다 `service_tier` 파라미터 하나로 전환한다. 코드 변경이 거의 없어서 기존 프로젝트에 바로 적용할 수 있다. AI 에이전트를 만드는 입장에서는 사용자 대면 요청은 Priority, 백그라운드 작업은 Flex로 나누면 비용을 상당히 줄일 수 있다.
