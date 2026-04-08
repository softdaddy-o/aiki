---
title: "Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리"
date: "2026-04-05T09:00:00+09:00"
lang: ko
category: news
summary: "Google이 Gemini API에 Flex(50% 할인)랑 Priority(75-100% 프리미엄) 티어를 넣었어. 파라미터 하나로 전환 가능."
readerValue: "이 뉴스의 값은 Google이 Gemini API에 Flex(50% 할인)랑 Priority(75-100% 프리미엄) 티어를 넣었어. 파라미터 하나로 전환 가능가 실제 시장과 개발 흐름에 어떤 신호인지 빠르게 판단하게 해준다는 점이다."
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/"
sourceTitle: "Google Blog"
draft: false
score: 65
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
    - type: adversarial
      result: pass
      findings:
        - "50% 할인은 Google 자체 발표 수치 — 실사용 시 지연 시간(latency) 트레이드오프 미공개"
        - "Priority 75-100% 프리미엄의 구체적 SLA(응답 시간 보장) 미명시"
tags: ["gemini", "google", "api", "pricing"]
---

Google이 Gemini API에 추론 티어를 두 개 넣었어. 4월 2일 발표.

**Flex 티어**는 비용 최적화용이야. 표준 대비 50% 저렴한 대신 응답 지연이 생길 수 있어. 기존 Batch API랑 다르게 동기식 API라서 별도 파일 관리나 폴링 없이 같은 엔드포인트를 그대로 써. CRM 일괄 업데이트, 대규모 리서치 시뮬레이션, 에이전트가 백그라운드에서 탐색하는 워크플로우에 적합해.

**Priority 티어**는 정반대야. 75-100% 프리미엄을 내고 최우선 컴퓨팅 큐에 라우팅돼. 트래픽이 동적 한도를 초과하면 서버가 자동으로 표준 처리로 다운그레이드하는 방식이야. Tier 2/3 유료 프로젝트에서만 쓸 수 있어.

둘 다 `service_tier` 파라미터 하나로 전환해. 코드 변경이 거의 없어서 기존 프로젝트에 바로 적용할 수 있어. AI 에이전트를 만드는 입장에서는? 사용자 대면 요청은 Priority, 백그라운드 작업은 Flex로 나누면 비용을 상당히 줄일 수 있어.
