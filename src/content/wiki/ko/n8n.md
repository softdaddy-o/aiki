---
term: n8n
title: "n8n"
lang: ko
summary: "자동화와 에이전트 흐름 작업에 자주 쓰이는 AI 도구다. 모델 자체보다 실제 사용 흐름을 바꾸는 쪽에 가깝다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: tool
aliases:
  - "n8n"
relatedTerms:
  - agent
  - langchain
  - langgraph
  - vibe-coding
mentionCount: 0
draft: false
tags:
  - automation
  - workflow
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/N8n"
      title: "N8n"
    - url: "https://docs.n8n.io/"
      title: "Explore n8n Docs: Your Resource for Workflow Automation and Integrations | n8n Docs"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: n8n"
        - "분류 대조: 도구"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "N8n (https://en.wikipedia.org/wiki/N8n)"
        - "Explore n8n Docs: Your Resource for Workflow Automation and Integrations | n8n Docs (https://docs.n8n.io/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
자동화와 에이전트 흐름 작업에 쓰이는 AI 도구다. 쉽게 말하면 여러 도구와 단계를 한 흐름으로 엮는 자동화 레이어를 실제 제품과 워크플로로 옮긴 쪽에 가깝다.
## 실제로 무엇을 하나
모델 자체라기보다 자동화와 에이전트 흐름 작업을 실제로 굴리는 도구 쪽에 가깝다. 트리거, 순서, 상태 관리를 통해 반복 작업을 줄이고, 여러 도구를 한 파이프라인으로 묶는다. 그래서 기능 목록보다 어떤 병목을 줄여 주는지로 읽는 편이 이해가 빠르다.
## 왜 중요한가
에이전트나 자동화 제품이 실제 업무에 들어가려면 이런 흐름 관리가 핵심이 된다. 실무에서는 도구 이름을 모델 이름처럼 오해하면 실제 도입 범위와 필요한 연결 작업을 잘못 보기 쉽다.
## 관련 용어
- [AI Agent](/ko/wiki/agent/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [LangGraph](/ko/wiki/langgraph/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [Vibe Coding](/ko/wiki/vibe-coding/) — 개발 생산성과 도구 조합 맥락을 같이 본다.