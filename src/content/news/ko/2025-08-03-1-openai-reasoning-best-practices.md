---
title: "OpenAI Platform ??, OpenAI가 o1, o3 같은 추론 모델을 제대로 쓰는 방법을 담은 공식 가..."
date: "2025-08-03T12:00:00+09:00"
lang: ko
category: news
summary: "OpenAI가 o1, o3 같은 추론 모델을 제대로 쓰는 방법을 담은 공식 가이드를 공개했어. 언제 추론 모델을 써야 하는지, 시스템 프롬프트는 어떻게 써야 하는지 핵심 원칙을 정리했어."
sourceUrl: "https://platform.openai.com/docs/guides/reasoning-best-practices"
sourceTitle: "OpenAI Platform"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 72
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://platform.openai.com/docs/guides/reasoning-best-practices"
      title: "OpenAI Platform Docs — Reasoning Best Practices"
  checks:
    - type: source_match
      result: pass
    - type: adversarial
      result: pass
      findings: []
tags: ["openai", "reasoning", "prompting", "o3", "llm"]
---

OpenAI가 [추론 모델(o1, o3 계열)을 효과적으로 쓰는 방법](https://platform.openai.com/docs/guides/reasoning-best-practices)을 담은 공식 가이드를 플랫폼 문서에 공개했어.

핵심 원칙은 세 가지야.

**언제 추론 모델을 써야 하나**: 수학·코딩·복잡한 분석처럼 "단계적 사고"가 필요한 작업에 적합해. o3 기준 입력 1M 토큰당 약 10달러로, GPT-4o(2.5달러)보다 4배 비싸. 간단한 Q&A나 요약처럼 빠른 응답이 필요한 건 GPT-4o 같은 일반 모델이 더 효율적이야.

**시스템 프롬프트 작성법**: 추론 모델에게는 "어떻게 생각해"라고 지시하지 말고 "무엇을 달성해야 하는가"만 명시해. 추론 과정은 모델이 알아서 하거든. 지나치게 구체적인 단계 지시는 오히려 성능을 낮춰.

**`<think>` 태그 활용**: 모델의 내부 추론을 명시적으로 요청할 수 있어. 단, 태그 파싱 시 `<|channel>thought` 같은 특수 문자 처리에 주의해야 해 — 파이프(`|`) 위치가 표준과 달라서 많은 파서가 오류를 낼 수 있어.

추론 모델을 처음 써보는 사람이라면, API 비용이 일반 모델 대비 약 3~10배 높다는 점도 감안해서 작업 성격에 맞게 선택하는 게 중요해. 간단한 작업에 추론 모델을 쓰면 비용만 올라가거든. 컨텍스트 윈도우도 최대 128K 토큰이니 긴 문서 처리에는 유리해.
