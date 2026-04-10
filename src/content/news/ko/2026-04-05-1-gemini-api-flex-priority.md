---
title: Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리
date: "2026-04-05T09:00:00+09:00"
lang: ko
category: news
summary: Google이 Gemini API에 Flex(50% 할인)랑 Priority(75-100% 프리미엄) 티어를 넣었어. 파라미터 하나로 전환 가능.
readerValue: 이 업데이트가 가격 구조, 사용량 정책, 개발 흐름 중 어디를 바꾸는지 빠르게 판단하는 데 도움이 된다.
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
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 업데이트가 가격 구조, 사용량 정책, 개발 흐름 중 어디를 바꾸는지.
        - 제목부터 다시 보면 기사 제목은 "Gemini API에 Flex/Priority 티어 추가 — 비용 50% 절감 or 최우선 처리"이고, 원문 제목은 "Google Blog"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 blog.google로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 gemini, google, api, pricing로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 원문 하나만 믿지 않으려고 관련 출처 2건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 업데이트가 가격 구조, 사용량 정책, 개발 흐름 중 어디를 바꾸는지.
        - 같이 본 출처로는 Google Blog — Flex and Priority tiers (https://blog.google/innovation-and-ai/technology/developers-tools/introducing-flex-and-priority-inference/)
        - 같이 본 출처로는 Gemini API Priority Inference Docs (https://ai.google.dev/gemini-api/docs/priority-inference)
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 50%, 4, 2, 3 쪽이야.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
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
