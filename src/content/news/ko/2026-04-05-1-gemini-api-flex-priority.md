---
title: Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리
date: "2026-04-05T09:00:00+09:00"
lang: ko
category: news
summary: Google이 Gemini API에 Flex(50% 할인)랑 Priority(75-100% 프리미엄) 티어를 넣었어. 파라미터 하나로 전환 가능.
readerValue: 이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다.
sourceUrl: https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/
sourceTitle: Google Blog
draft: false
score: 65
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/
      title: Google Blog — Flex and Priority tiers
    - url: https://ai.google.dev/gemini-api/docs/priority-inference
      title: Gemini API Priority Inference Docs
  checks:
    - type: source_match
      result: pass
      summary: 대표 원문과 기사 메타데이터를 먼저 대조해 제목 축이 맞는지 확인했다.
      items:
        - "기사 제목 대조: Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리"
        - "원문 제목 대조: Google Blog"
        - "대표 출처 도메인: blog.google"
        - "핵심 태그 축: gemini, google, api, pricing"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 출처 2건을 비교해 같은 사건을 가리키는지 교차검증했다.
      items:
        - "출처 1: Google Blog — Flex and Priority tiers (https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/)"
        - "출처 2: Gemini API Priority Inference Docs (https://ai.google.dev/gemini-api/docs/priority-inference)"
    - type: number_verify
      result: pass
      summary: 숫자와 고유 명칭은 별도 묶음으로 다시 훑어 과장 여부를 걸렀다.
      items:
        - "수치 대조: Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리"
        - "수치 대조: Google이 Gemini API에 Flex(50% 할인)랑 Priority(75-100% 프리미엄) 티어를 넣었어."
        - "수치 대조: 4월 2일 발표."
        - "수치 대조: 표준 대비 50% 저렴한 대신 응답 지연이 생길 수 있어."
    - type: adversarial
      result: pass
      summary: 헷갈리기 쉬운 해석 포인트를 비판적으로 다시 검토했다.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 확인했다.
        - 출처 성격상 주장과 해석을 분리해 독자가 바로 써먹을 판단 기준만 남겼다.
      findings: []
tags:
  - gemini
  - google
  - api
  - pricing
---

Google이 Gemini API에 추론 티어를 두 개 넣었어. 4월 2일 발표.

**Flex 티어**는 비용 최적화용이야. 표준 대비 50% 저렴한 대신 응답 지연이 생길 수 있어. 기존 Batch API랑 다르게 동기식 API라서 별도 파일 관리나 폴링 없이 같은 엔드포인트를 그대로 써. CRM 일괄 업데이트, 대규모 리서치 시뮬레이션, 에이전트가 백그라운드에서 탐색하는 워크플로우에 적합해.

**Priority 티어**는 정반대야. 75-100% 프리미엄을 내고 최우선 컴퓨팅 큐에 라우팅돼. 트래픽이 동적 한도를 초과하면 서버가 자동으로 표준 처리로 다운그레이드하는 방식이야. Tier 2/3 유료 프로젝트에서만 쓸 수 있어.

둘 다 `service_tier` 파라미터 하나로 전환해. 코드 변경이 거의 없어서 기존 프로젝트에 바로 적용할 수 있어. AI 에이전트를 만드는 입장에서는? 사용자 대면 요청은 Priority, 백그라운드 작업은 Flex로 나누면 비용을 상당히 줄일 수 있어.
