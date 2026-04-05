---
term: mcp
title: 'MCP (Model Context Protocol)'
lang: ko
summary: 'AI 모델이 외부 도구와 데이터 소스에 접근하는 방식을 표준화한 프로토콜. Anthropic이 2024년 말 공개했다.'
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

MCP(Model Context Protocol)는 AI 모델이 외부 도구, 파일 시스템, API 같은 자원에 접근하는 방식을 표준화한 오픈 프로토콜이다.

## 작동 원리

MCP는 클라이언트-서버 구조다.

- **MCP 클라이언트**: AI 모델을 호스팅하는 앱(Claude Desktop, IDE 플러그인 등)이 클라이언트 역할을 한다.
- **MCP 서버**: 특정 도구나 데이터 소스를 노출하는 가벼운 프로세스다. 예를 들어 Notion MCP 서버는 Notion API를, 파일시스템 MCP 서버는 로컬 파일 접근을 제공한다.

클라이언트가 서버에 연결하면 서버가 "나는 이런 도구들을 제공한다"는 목록을 보내준다. AI 모델은 이 목록을 보고 필요한 도구를 골라 쓴다. JSON-RPC 기반이라 어떤 언어로든 구현할 수 있다.

기존에는 AI 도구 연동을 할 때마다 각 서비스별로 따로 코드를 짜야 했다. MCP는 이걸 USB-C 포트처럼 하나의 규격으로 통일한 거라고 보면 된다.

## 왜 중요한가

AI 에이전트가 실제로 쓸모 있으려면 외부 세계와 소통해야 한다. 파일을 읽고, API를 호출하고, 데이터베이스를 조회해야 한다. 그런데 각 도구마다 연동 방식이 다르면 에이전트 개발이 비효율적이다.

MCP가 이 문제를 푸는 방식은 단순하다. 도구 제공자가 MCP 서버 하나만 만들면, MCP를 지원하는 모든 AI 앱에서 그 도구를 바로 쓸 수 있다. N개 앱과 M개 도구를 연결하는 데 N x M이 아니라 N + M만큼의 작업만 필요한 셈이다.

Anthropic이 공개한 뒤 빠르게 생태계가 커지고 있다. Claude Code, Cursor, Windsurf 같은 코딩 도구부터 Notion, Slack, GitHub 같은 서비스까지 MCP 서버가 만들어졌다.

## 관련 용어

- [AI 에이전트](/wiki/ko/agent) — MCP를 통해 도구를 사용하는 자율 AI 시스템
- [LLM](/wiki/ko/llm) — MCP 클라이언트가 호스팅하는 기반 모델
- [랭체인](/wiki/ko/langchain) — MCP 이전에 도구 연동을 추상화했던 프레임워크
