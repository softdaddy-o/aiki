---
title: "Google Blog ??, Google이 Gemini API Docs MCP 서버와 Agent Skills를 공..."
date: "2026-04-01T12:00:00+09:00"
lang: ko
category: news
summary: "Google이 Gemini API Docs MCP 서버와 Agent Skills를 공개했어. 코딩 에이전트가 구버전 API 코드를 생성하는 문제를 해결하는 도구야. 실험 결과 정답률 96.3%, 토큰 사용량은 63% 절감됐어."
readerValue: "이 뉴스의 값은 Google이 Gemini API Docs MCP 서버와 Agent Skills를 공개했어. 코딩 에이전트가 구버전 API 코드를 생성하는 문제를 해결하는 도구야. 실험 결과 정답률 96.3%, 토큰 사용량은 63% 절감됐어가 실제 시장과 개발 흐름에 어떤 신호인지 빠르게 판단하게 해준다는 점이다."
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-docsmcp-agent-skills/"
sourceTitle: "Google Blog"
draft: false
backfilled: true
backfilledAt: "2026-04-07"
score: 68
factCheck:
  status: passed
  date: "2026-04-07"
  sources:
    - url: "https://ai.google.dev/gemini-api/docs/coding-agents"
      title: "Google AI for Developers — Gemini API Docs MCP"
    - url: "https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-docsmcp-agent-skills/"
      title: "Google Blog"
  checks:
    - type: source_match
      result: pass
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "96.3% 정답률은 Google 자체 평가셋 기준 — 독립 검증 데이터 없음"
tags: ["google", "gemini", "mcp", "coding-agent", "developer-tools"]
---

AI 코딩 에이전트의 고질적 문제 중 하나가 뭐냐면, 학습 데이터 컷오프 이후 업데이트된 API를 모른다는 거야. Gemini API 코드를 생성하는데 6개월 전 버전으로 써주는 식이거든.

Google이 이 문제를 해결하려고 [Gemini API Docs MCP 서버](https://ai.google.dev/gemini-api/docs/coding-agents)를 공개했어. `https://gemini-api-docs-mcp.dev`에 호스팅된 공개 MCP 서버로, 에이전트가 `search_documentation` 함수를 호출하면 실시간으로 현재 Gemini API 문서를 참조할 수 있어.

함께 나온 **Agent Skills**도 있어. 올바른 SDK 버전, 최신 모델명 같은 베스트 프랙티스를 에이전트 컨텍스트에 직접 주입하는 방식이야.

둘을 함께 쓰면 Google 자체 평가셋에서 정답률 96.3%, 동일 작업에서 토큰 사용량은 63% 줄었다고 해. (단, Google 자체 벤치마크라 독립 검증은 아직 없어.)

Cursor, Windsurf, Claude Code 같은 코딩 에이전트를 Gemini API 개발에 쓴다면 이 MCP 서버 붙이는 게 아직 흔한 API 오류를 줄이는 가장 빠른 방법이야.
