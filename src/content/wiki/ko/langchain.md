---
term: langchain
title: "LangChain (랭체인)"
lang: ko
summary: "LangChain은 대형 언어 모델 앱과 에이전트를 만들 때 모델, 도구, 검색, 상태 흐름을 묶어주는 오픈소스 프레임워크야. 이름이 커 보여도 혼자서 팀의 배포 체계 전체를 뜻하는 말은 아니고, 관측·평가·배포까지 포함하려면 보통 LangGraph나 LangSmith 같은 주변 제품까지 같이 봐야 맞아."
readerValue: "기사, 채용 공고, 기술 문서에서 LangChain이 나오면 코드 프레임워크를 말하는지, 아니면 LangGraph·LangSmith까지 포함한 운영 스택을 말하는지 갈라서 읽을 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "LangChain (랭체인)"
relatedTerms:
  - agentic-ai
  - langgraph
  - crewai
  - agent
mentionCount: 0
draft: false
tags:
  - agents
  - workflow
  - framework
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://github.com/langchain-ai/langchain"
      title: "langchain-ai/langchain"
    - url: "https://www.langchain.com/"
      title: "LangChain: Observe, Evaluate, and Deploy Reliable AI Agents"
  checks:
    - type: source_match
      result: pass
      summary: "주어진 출처 요약이 가리키는 제품 층위를 본문 설명과 어긋나지 않게 맞춰봤어."
      items:
        - "독자 문제 대조: LangChain을 단순 이름값 큰 플랫폼으로 오해하지 않도록, 코드 프레임워크와 운영 제품을 갈라서 설명했는지 확인했어."
        - "제공된 현재 문서의 혼선인 LangChain과 LangSmith의 역할 뒤섞임을 바로잡고, 프레임워크 중심 서술로 재구성했다."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 GitHub와 공식 제품 페이지를 나란히 보고 최신 설명이 framework와 platform을 어떻게 나누는지 다시 봤어."
      items:
        - "비교 기준: GitHub README는 LangChain을 에이전트와 LLM 앱을 만드는 프레임워크로, 공식 LangChain 제품 페이지는 미리 짜인 에이전트 구조와 모델·도구 통합을 제공하는 오픈소스 프레임워크로 설명하는지 확인했어."
        - "관측·평가·배포는 공식 사이트에서 LangSmith 쪽 핵심 가치로 제시되는지 확인하고, 본문에서도 그 역할을 LangChain 본체와 분리했다."
    - type: number_verify
      result: pass
      summary: "숫자와 범위를 괜히 크게 부풀린 표현이 없는지 한 번 더 봤어."
      items:
        - "본문에는 시점 따라 쉽게 바뀌는 스타 수나 고객 수를 넣지 않고, 핵심 이해에 필요한 구조 설명만 남겼다."
        - "공식 페이지의 '1000+ integrations' 같은 마케팅 수치는 뜻만 살리고 정적인 문장으로 바꿔, 문서가 금방 낡지 않게 처리했다."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 반대 해석을 넣어도 문서 설명이 버티는지 다시 봤어."
      items:
        - "LangChain을 곧바로 배포 플랫폼으로 읽는 경우를 가정하고, 배포·관측·평가는 주로 LangSmith 문맥이라는 점을 따로 분리했다."
        - "LangChain을 멀티에이전트 전용 도구로 좁게 읽는 경우를 가정하고, 일반적인 LLM 앱 구성에도 쓰이는 프레임워크라는 점을 분명히 했다."
      findings:
        - "최근 공식 마케팅 문구에 'platform' 표현이 커졌지만, 본문 설명은 README와 제품 페이지의 공통분모인 오픈소스 프레임워크 축에 맞췄다."
        - "LangChain과 LangGraph의 경계는 점점 더 촘촘해지고 있어서, 이후 문서 갱신 때는 런타임 역할 구분을 다시 확인할 필요가 있다."
---
## 한 줄 정의
LangChain은 대형 언어 모델 앱과 에이전트를 만들 때 모델 호출, 프롬프트, 도구 연결, 검색, 출력 처리 같은 조각을 한 틀 안에서 조립하게 해주는 오픈소스 프레임워크야. 그래서 이름만 보면 거대한 플랫폼처럼 들리지만, 본체는 개발용 라이브러리와 프레임워크에 가깝고, 운영과 배포는 다른 제품과 붙여 쓰는 경우가 많아.
## 어떻게 작동하나
기본 아이디어는 복잡한 AI 앱을 작은 부품으로 나누는 거야. 모델 인터페이스, 툴 호출, 벡터 스토어, 리트리버, 미들웨어 같은 요소를 같은 방식으로 다루게 해서 한 모델에서 다른 모델로 바꾸거나 외부 도구를 붙일 때 코드를 덜 뜯어고치게 만든다.
요즘 LangChain은 단순한 체인 라이브러리보다 [에이전트](/ko/wiki/agent/) 프레임워크 쪽으로 더 설명되는 편이야. 미리 짜인 [에이전트](/ko/wiki/agent/) 구조를 바탕으로 모델이 어떤 도구를 쓸지 결정하고, 필요하면 [LangGraph](/ko/wiki/langgraph/) [런타임](/ko/wiki/runtime/) 위에서 체크포인트, 사람 승인, 재시도 같은 흐름 제어까지 이어 붙인다.
## 왜 중요한가
실무에서는 모델이 자주 바뀌고, 검색 방식이나 외부 API도 계속 갈아끼우게 되는데, LangChain은 이런 변화에 맞춰 앱 구조를 통일하는 데 도움이 돼. 처음부터 모든 연결부를 직접 만들지 않아도 되니까 프로토타입을 빨리 만들고, 나중에 일부 부품만 교체하는 식으로 실험하기도 쉽다.
기사나 팀 문서에서 'LangChain을 쓴다'는 말을 보면, 보통 새 모델을 만든다는 뜻이 아니라 애플리케이션 조립층을 LangChain 쪽 규칙으로 맞춘다는 뜻에 가깝다. 반대로 관측, [평가](/ko/wiki/eval/), 운영 배포 이야기까지 같이 나오면 그건 LangChain 단독이라기보다 LangSmith나 [LangGraph](/ko/wiki/langgraph/)까지 묶인 생태계 얘기일 가능성이 높아.
## 주의해서 볼 점
LangChain이라는 이름이 생태계 전체를 가리킬 때가 많아서, 본체 프레임워크와 LangSmith를 자주 헷갈리게 된다. LangChain은 앱과 에이전트를 만드는 코드 쪽 중심이고, 실행 추적, [평가](/ko/wiki/eval/), 배포 같은 운영 기능은 별도 제품이나 연동 기능으로 보는 편이 정확해.
또 추상화가 편하다고 해서 복잡성이 사라지는 건 아니야. 도구 호출이 엉키거나 상태가 길어지면 디버깅이 어려워질 수 있고, 결과를 안정적으로 재현해야 하는 작업은 더 낮은 수준의 흐름 제어가 필요해서 [LangGraph](/ko/wiki/langgraph/)나 직접 짠 오케스트레이션이 더 잘 맞을 때도 있다.
## 관련 용어
- [Agentic AI](/ko/wiki/agentic-ai/)는 목표를 세우고 도구를 써서 여러 단계를 처리하는 접근 전체를 가리키는 말이야. LangChain은 그 접근을 실제 코드로 구현할 때 쓰는 프레임워크라서, 개념 자체와 구현 도구를 구분해야 해.
- [LangGraph](/ko/wiki/langgraph/)는 같은 생태계 안에서 더 낮은 수준의 흐름 제어를 맡는 프레임워크야. 분기, 재시도, 체크포인트, 사람 개입 같은 상태 기반 제어가 중요하면 LangChain보다 LangGraph 설명이 더 핵심일 수 있어.
- [CrewAI](/ko/wiki/crewai/)는 여러 에이전트 역할 분담과 협업 구조를 더 전면에 내세우는 편이야. 반면 LangChain은 특정 협업 비유보다 모델·도구·검색·미들웨어 같은 범용 부품 조합에 더 무게가 있다.
- [AI Agent](/ko/wiki/agent/)는 사용자의 목표를 받아 도구를 선택하고 행동하는 프로그램 자체를 말해. LangChain은 그 에이전트를 만들 수 있게 해주는 프레임워크이지, 에이전트라는 개념 그 자체는 아니야.