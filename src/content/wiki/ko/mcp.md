---
term: mcp
title: "MCP"
lang: ko
summary: "MCP는 모델 성능, 제품 전략, 개발 흐름 맥락에서 반복해서 등장하는 AI 프레임워크다."
readerValue: "이 용어가 뉴스에 나오면 MCP가 단순 기능 이름인지, 성능·비용·제품 전략 중 무엇을 바꾸는 이야기인지 빠르게 구분해서 읽게 해준다."
category: framework
aliases:
  - "model context protocol"
relatedTerms:
  - function-calling
firstMentioned: "2026-03-16"
mentionCount: 2
draft: false
tags:
  - protocol
  - tool-use
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: "https://modelcontextprotocol.io/introduction"
      title: "What is the Model Context Protocol (MCP)? - Model Context Protocol"
    - url: "https://github.com/modelcontextprotocol/modelcontextprotocol"
      title: "modelcontextprotocol/modelcontextprotocol"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 2
    - type: adversarial
      result: pass
      findings: []
---
## 먼저 감 잡기
MCP는 개별 기능보다 전체 구조를 잡는 프레임워크다. 보통 모델 성능, 제품 전략, 개발 흐름 같은 문제를 반복 가능하게 묶어 준다. 그래서 기사에서 이 단어가 보이면 단일 모델 뉴스가 아니라 시스템 조합 관점으로 보는 게 맞다.
## 뉴스에서 왜 자주 나오나
MCP는 AIKI 기사에서 2번 이상 언급됐고, 가장 이른 기록도 2026-03-16까지 올라간다. 그만큼 이 용어는 반짝 유행어라기보다 모델 성능, 제품 전략, 개발 흐름 문제를 설명할 때 계속 재등장하는 기준 단어다. 참고 소스도 What is the Model Context Protocol (MCP)? - Model Context Protocol, modelcontextprotocol/modelcontextprotocol 쪽으로 모여 있어, 한 번 정리해 두면 이후 뉴스를 읽을 때 해석 속도가 빨라진다.
## 읽을 때 체크포인트
1. 먼저 MCP가 모델 이름인지, 제품 기능 이름인지, 운영 방식인지부터 구분하면 된다. 같은 단어라도 붙는 위치에 따라 기사 해석이 크게 달라진다.

2. 다음으로 이 용어가 모델 성능, 제품 전략, 개발 흐름 중 어디를 바꾸는지 봐야 한다. 성능 숫자를 바꾸는지, 비용을 줄이는지, 아니면 사용 경험만 부드럽게 만드는지 확인하면 과장된 발표를 거를 수 있다.

3. 마지막으로 기사에서 model context protocol 같은 표현이 함께 나오면 같은 범주인지, 하위 변종인지 확인하면 된다. 이름만 다르고 실질은 비슷한 경우가 많아 여기서 한 번 걸러 두면 발표 내용을 더 차분하게 정리할 수 있다.
## 같이 봐야 할 용어
- [function-calling](/ko/wiki/function-calling/)