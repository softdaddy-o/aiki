---
term: autogen
title: AutoGen(오토젠)
lang: ko
summary: 'AutoGen은 여러 에이전트, 모델, 도구를 대화 흐름으로 묶어 agentic AI 앱을 만드는 프레임워크야.'
readerValue: AutoGen이 보이면 단일 모델 호출 도구가 아니라 역할 분담과 멀티에이전트 흐름을 짜는 개발 프레임워크라는 점을 빨리 잡는 데 도움 돼.
category: framework
guideVersion:
  common: 1.0.0
  wiki: "3.0.0"
aliases:
  - AutoGen(오토젠)
relatedTerms:
  - langchain
  - tool-use
  - llamaindex
  - agentic-ai
mentionCount: 0
draft: false
tags:
  - agents
  - multi-agent
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://github.com/microsoft/autogen'
      title: microsoft/autogen
    - url: 'https://microsoft.github.io/autogen/stable/'
      title: AutoGen &#8212; AutoGen
  checks:
    - type: source_match
      result: pass
      summary: AutoGen을 agentic AI용 프레임워크로 잡은 정의를 공식 소개에 맞춰봤어.
      items:
        - '독자 문제 대조: AutoGen을 모델 이름이 아니라 agentic AI 프로그래밍 프레임워크로 먼저 고정했어.'
        - >-
          GitHub 소개의 programming framework for agentic AI 문구와 공식 문서의 AgentChat
          기반 설명이 같은 대상을 가리키는지 확인했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 저장소 소개와 문서 설명이 같은 제품 방향을 가리키는지 다시 봤어.
      items:
        - '비교 기준: AutoGen을 코드 라이브러리로만 볼지, 프로토타이핑 UI까지 포함한 프레임워크 묶음으로 볼지 비교했어.'
        - >-
          GitHub는 개발 프레임워크 성격을, 문서는 웹 기반 프로토타이핑 UI를 보여 줘서 본문에 둘 다 넣어도 축이 어긋나지
          않는지 확인했어.
    - type: number_verify
      result: skip
      summary: 버전 수치 대신 확인 가능한 제품 구성만 남겼어.
      items:
        - 제공된 소스 요약에는 고정 가격이나 성능 수치가 없어서 본문에 숫자 비교를 넣지 않았어.
        - '대신 Microsoft 공개 저장소, AgentChat 기반 UI, 멀티에이전트 흐름 같은 확인 가능한 운영 포인트만 남겼어.'
    - type: adversarial
      result: pass
      summary: AutoGen을 쓰면 자동으로 좋은 에이전트가 나온다는 오해를 막았어.
      items:
        - 프레임워크와 모델 성능을 분리해서 설명해 도구 도입이 곧 품질 보장이라는 기대를 낮췄어.
        - 역할을 많이 쪼갤수록 더 좋다는 식의 멀티에이전트 과장을 막기 위해 비용과 디버깅 부담도 같이 남겼어.
      findings:
        - 멀티에이전트라는 말은 멋있어 보이지만 실제로는 설계와 관찰 지표가 더 중요해.
        - 프레임워크 소개를 모델 성능 기사처럼 읽으면 핵심 판단 포인트가 빗나가기 쉬워.
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
---
## 한 줄 정의
AutoGen은 에이전트형 AI 애플리케이션을 만들기 위한 프로그래밍 프레임워크야. 모델 하나를 직접 부르는 도구가 아니라 여러 역할과 도구 호출을 대화처럼 엮어서 워크플로를 만드는 쪽에 초점이 있어.
## 어떻게 작동하나
개발자는 서로 다른 역할을 맡은 [에이전트](/ko/wiki/agent/), 연결할 모델, 사용할 도구, 종료 조건을 코드로 정의해. 그러면 AutoGen이 누가 언제 말하고 어떤 도구를 부르며 언제 흐름을 멈출지 관리해서 멀티스텝 작업을 실행하고, 문서 기준으로는 AgentChat 위에 얹은 웹 UI로 코드 없이 프로토타입도 잡아볼 수 있어.
## 왜 중요한가
복잡한 작업은 모델 한 번 호출로 끝나지 않고 계획, 실행, 검토가 나뉘는 경우가 많아. AutoGen은 이런 분업 구조를 빠르게 실험하게 해 줘서 멀티에이전트 제품 아이디어를 코드 수준에서 붙여 보는 데 유용해.
## 주의해서 볼 점
프레임워크를 쓴다고 자동으로 똑똑한 에이전트가 되는 건 아니야. 역할을 너무 잘게 쪼개면 비용과 지연이 늘고 메시지 흐름이 복잡해지면 디버깅이 어려워져서 오히려 단일 체인보다 관리가 힘들어질 수 있어.
## 관련 용어
- [langchain](/ko/wiki/langchain/): LangChain도 LLM 앱 조합을 돕지만 체인과 컴포넌트 구성 쪽 색이 더 강해. AutoGen은 에이전트 간 대화와 역할 분담을 더 앞에 세우는 편이야.
- [tool-use](/ko/wiki/tool-use/): tool use는 AutoGen 안에서 에이전트가 실제 바깥 행동을 하는 핵심 수단이야. 둘을 같이 봐야 프레임워크가 단순 채팅 루프가 아니라는 게 보여.
- [llamaindex](/ko/wiki/llamaindex/): LlamaIndex는 데이터 연결과 검색 쪽에 강점이 있어. AutoGen과 묶이면 에이전트가 어떤 자료를 찾아와 쓸지 구성하기 쉬워져.
- [agentic-ai](/ko/wiki/agentic-ai/): agentic AI는 더 큰 개념이고 AutoGen은 그걸 구현하는 개발 도구 쪽이야. 그래서 기사에서 둘이 같이 나오면 개념과 구현 층위를 분리해서 읽는 게 좋아.
