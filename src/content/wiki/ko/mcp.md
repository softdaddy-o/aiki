---
term: mcp
title: "MCP"
lang: ko
summary: "AI 모델이 외부 도구와 데이터 소스에 접근하는 방식을 표준화한 프로토콜. 여러 앱과 도구를 같은 규격으로 연결하게 해준다."
readerValue: "이 말이 답변 생성 이야기가 아니라 외부 도구 실행과 연결 구조 이야기인지 빠르게 구분하게 해준다."
category: framework
aliases:
  - "model context protocol"
relatedTerms:
  - function-calling
firstMentioned: "2026-04-01"
mentionCount: 1
draft: false
tags:
  - protocol
  - tool-use
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://modelcontextprotocol.io/introduction"
      title: "What is the Model Context Protocol (MCP)? - Model Context Protocol"
    - url: "https://github.com/modelcontextprotocol/specification"
      title: "modelcontextprotocol/specification"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: MCP"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "What is the Model Context Protocol (MCP)? - Model Context Protocol (https://modelcontextprotocol.io/introduction)"
        - "modelcontextprotocol/specification (https://github.com/modelcontextprotocol/specification)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
MCP(Model Context Protocol)는 AI 모델이 외부 도구, 파일 시스템, API 같은 자원에 접근하는 방식을 표준화한 오픈 프로토콜이다.
## 어떻게 작동하나
MCP는 클라이언트-서버 구조다.

- **MCP 클라이언트**: AI 모델을 호스팅하는 앱이 클라이언트 역할을 한다. Claude Desktop, IDE 플러그인, 에이전트 런타임이 여기에 들어간다.
- **MCP 서버**: 특정 도구나 데이터 소스를 노출하는 가벼운 프로세스다. 예를 들어 파일 시스템, Notion, GitHub 같은 외부 자원을 MCP 서버가 통일된 형태로 보여 준다.

클라이언트가 서버에 연결하면 서버는 "내가 제공하는 도구" 목록을 알려 준다. 모델은 그 목록을 보고 필요한 도구를 골라 호출한다. 쉽게 말하면 AI용 USB-C 규격에 가깝다.
## 왜 중요한가
에이전트가 실제로 쓸모 있으려면 외부 세계와 연결돼야 한다. 파일을 읽고, API를 호출하고, 데이터베이스를 조회해야 한다. 그런데 서비스마다 연동 방식이 다르면 앱 수와 도구 수가 늘수록 연결 코드가 폭증한다.

MCP는 이 문제를 규격 하나로 줄여 준다. 도구 제공자는 MCP 서버 하나만 만들면 되고, MCP를 지원하는 여러 AI 앱은 같은 규격으로 그 도구를 바로 붙일 수 있다. 그래서 요즘 코딩 도구, 업무 자동화, 사내 도구 연동 뉴스에서 MCP가 빠르게 기준 단어가 되고 있다.
## 관련 용어
- [AI Agent](/ko/wiki/agent/) — MCP를 통해 외부 도구를 실제로 사용하는 주체
- [LLM](/ko/wiki/llm/) — MCP 클라이언트가 호출하는 기반 모델
- [Function Calling](/ko/wiki/function-calling/) — 모델이 도구를 호출하는 실행 방식