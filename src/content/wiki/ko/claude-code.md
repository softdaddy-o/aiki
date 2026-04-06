---
term: claude-code
title: "Claude Code — Anthropic의 AI 코딩 CLI"
lang: ko
summary: "Claude Code는 Anthropic이 만든 터미널 기반 AI 코딩 도구야. 프로젝트 전체를 이해하고 직접 파일 수정, 테스트, 커밋까지 해주는 코딩 에이전트거든."
category: tool
aliases:
    - Claude Code CLI
    - claude-code
relatedTerms:
    - agent
    - llm
    - mcp
    - api
mentionCount: 5
draft: false
tags:
    - anthropic
    - coding
    - cli
    - developer-tool
---

## 한 줄 정의

Claude Code는 터미널에서 돌아가는 AI 코딩 비서야. "이 버그 고쳐줘"라고 말하면 코드 찾고, 수정하고, 테스트까지 알아서 해주는 [에이전트](/ko/wiki/agent)거든.

## 작동 원리

일반 AI 챗봇한테 코드 질문하면 답변을 복사해서 직접 붙여넣어야 하잖아. Claude Code는 다르게 동작해. 네 프로젝트 폴더에서 직접 실행되거든.

터미널에서 `claude`를 치면 대화가 시작돼. 그 상태에서 "로그인 버그 수정해줘"라고 하면 이런 일이 벌어져:

1. 프로젝트 파일들을 탐색해서 관련 코드를 찾아
2. 버그 원인을 분석해
3. 파일을 직접 수정해
4. 테스트를 돌려서 확인해
5. git 커밋까지 만들어줘

[MCP](/ko/wiki/mcp)로 외부 도구도 연결할 수 있어. 데이터베이스 조회, Jira 티켓 생성, 배포까지 — CLI 하나로 개발 워크플로우 전체를 자동화할 수 있는 거야.

## 왜 중요한가

GitHub Copilot이 "한 줄씩 자동완성"이라면, Claude Code는 "프로젝트 단위로 작업"하는 도구야. 파일 하나가 아니라 프로젝트 전체 맥락을 보고 작업하니까, 리팩토링이나 대규모 수정에서 특히 강해.

[API](/ko/wiki/api) 비용이 들긴 하지만, 복잡한 작업을 몇 분 만에 끝내니까 개발자 시간 대비 효율이 좋아서 빠르게 퍼지고 있어.

## 관련 용어

- [AI 에이전트](/ko/wiki/agent) — Claude Code는 대표적인 코딩 에이전트야. 스스로 판단하고 실행해.
- [LLM](/ko/wiki/llm) — Claude Code의 두뇌인 Claude 모델이 LLM이야.
- [MCP](/ko/wiki/mcp) — Claude Code가 외부 도구를 연결할 때 쓰는 프로토콜이야.
