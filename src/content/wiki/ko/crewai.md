---
term: crewai
title: "CrewAI"
lang: ko
summary: "자동화와 에이전트 흐름을 연결하고 조립하는 프레임워크다. 여러 단계와 도구를 묶는 문맥에서 자주 나온다."
readerValue: "이 이름이 단순 도구 이름인지, 팀의 개발 흐름과 배포 방식까지 바꾸는 축인지 빠르게 구분하게 해준다."
category: framework
aliases:
  - "CrewAI"
relatedTerms:
  - langchain
  - langgraph
  - agent
  - tool-use
mentionCount: 0
draft: false
tags:
  - agents
  - workflow
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://github.com/crewAIInc/crewAI"
      title: "crewAIInc/crewAI"
    - url: "https://docs.crewai.com/"
      title: "CrewAI Documentation - CrewAI"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처를 놓고 용어명과 문서 주제가 같은 축인지 먼저 맞춰봤다."
      items:
        - "용어명 대조: CrewAI"
        - "분류 대조: 프레임워크"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 설명 축이 어긋나지 않는지 다시 봤다."
      items:
        - "crewAIInc/crewAI (https://github.com/crewAIInc/crewAI)"
        - "CrewAI Documentation - CrewAI (https://docs.crewai.com/)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트는 한 번 더 의심해보고 정리했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
자동화와 에이전트 흐름을 연결하고 조립하는 프레임워크다. 쉽게 말하면 여러 도구와 단계를 한 흐름으로 엮는 자동화 레이어를 코드와 시스템 구조로 묶는 뼈대다.
## 실제로 무엇을 하나
결과를 직접 만드는 모델이라기보다 흐름을 묶는 틀에 가깝다. 트리거, 순서, 상태 관리를 통해 반복 작업을 줄이고, 여러 도구를 한 파이프라인으로 묶는다. 보통 프롬프트, 검색, 메모리, 실행 순서를 어떻게 묶는지가 핵심이 된다.
## 왜 중요한가
에이전트나 자동화 제품이 실제 업무에 들어가려면 이런 흐름 관리가 핵심이 된다. 프레임워크는 모델 성능보다 개발 속도와 시스템 구조를 바꾸는 경우가 많아서, 그 차이를 알아야 도입 판단이 쉬워진다.
## 관련 용어
- [LangChain](/ko/wiki/langchain/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [LangGraph](/ko/wiki/langgraph/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [AI Agent](/ko/wiki/agent/) — 자동화와 워크플로 설계를 같이 볼 때 도움이 된다.
- [Tool Use](/ko/wiki/tool-use/) — 외부 도구 실행 맥락을 같이 이해하게 해 준다.