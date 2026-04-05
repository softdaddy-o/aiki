---
term: mcp
title: "MCP — AI가 외부 세계랑 대화하는 공용 언어"
lang: ko
summary: "AI 도구 연동할 때마다 코드 새로 짜는 거 지겹지 않아? MCP는 AI용 USB-C야. 한 번 꽂으면 다 통해."
category: framework
aliases:
    - model context protocol
relatedTerms:
    - agent
    - llm
    - langchain
mentionCount: 0
draft: false
tags:
    - protocol
    - tool-use
    - integration
---

## 한 줄 정의

MCP(Model Context Protocol)는 AI용 USB-C 포트야. AI 모델이 외부 도구, 파일, API 같은 자원에 접근하는 방식을 하나로 통일한 오픈 프로토콜이거든.

## 작동 원리

USB-C 나오기 전에 어땠는지 기억나? 충전기마다 단자가 달라서 케이블을 5개씩 들고 다녔잖아. AI 도구 연동도 똑같은 상황이었어. Notion 연동 코드 따로, Slack 연동 코드 따로, GitHub 연동 코드 따로. MCP는 이걸 하나의 규격으로 통일한 거야.

구조는 클라이언트-서버 방식이야.

- **MCP 클라이언트**: Claude Desktop, Cursor, VS Code 같은 AI 앱이 클라이언트야. 사용자가 쓰는 앱 쪽이라고 보면 돼.
- **MCP 서버**: 특정 도구나 데이터를 제공하는 가벼운 프로세스야. Notion MCP 서버는 Notion API를, 파일시스템 MCP 서버는 로컬 파일 접근을 제공해.

클라이언트가 서버에 연결하면 서버가 "나 이런 도구 있어"라고 목록을 보내줘. AI는 그 목록을 보고 필요한 걸 골라 써. JSON-RPC 기반이라 언어 상관없이 구현할 수 있어.

## 왜 중요한가

AI 에이전트가 진짜 쓸모 있으려면 외부 세계랑 소통해야 하잖아. 파일 읽고, API 호출하고, 데이터베이스 조회하고. 근데 도구마다 연동 방식이 다르면? 앱 5개 x 도구 10개 = 연동 코드 50개를 짜야 해.

MCP는 이걸 뒤집었어. 도구 쪽에서 MCP 서버 하나만 만들면, MCP 지원하는 모든 AI 앱에서 그 도구를 바로 쓸 수 있거든. N개 앱과 M개 도구를 연결하는 데 N x M이 아니라 N + M만큼만 작업하면 돼. 앱 5개 + 도구 10개 = 15개. 50개에서 15개로. 큰 차이지.

Anthropic이 2024년 11월에 공개한 뒤 생태계가 빠르게 커지고 있어. 2025년 4월 기준 공개된 MCP 서버가 1,000개를 넘었고, Claude Code, Cursor, Windsurf 같은 코딩 도구부터 Notion, Slack, GitHub 같은 서비스까지 MCP를 지원해.

## 관련 용어

- [AI 에이전트](/wiki/ko/agent) — MCP로 도구를 갖다 쓰는 자율 AI 시스템. USB-C 케이블을 꽂아서 쓰는 기기인 셈이야.
- [LLM](/wiki/ko/llm) — MCP 클라이언트가 돌리는 기반 모델. AI 앱 안의 두뇌 역할이야.
- [랭체인](/wiki/ko/langchain) — MCP 나오기 전에 도구 연동을 추상화했던 프레임워크. USB-C 이전의 멀티탭 같은 존재야.
