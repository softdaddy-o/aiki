---
term: autogen
title: "AutoGen(오토젠)"
lang: ko
summary: >-
  AutoGen은 여러 AI 에이전트가 역할을 나눠 대화하며 작업을 푸는 구조를 빠르게 실험하게 해 주는 Microsoft 계열 프레임워크야. 다만 2026년 4월 기준 공식 README가 maintenance mode를 명시하므로, 새 프로젝트는 Microsoft Agent Framework(MAF)로 시작하고 AutoGen은 기존 코드 유지·학습·프로토타입 용도로 보는 판단이 맞아.
readerValue: >-
  AutoGen을 지금 계속 써도 되는 팀과, 새로 시작할 때는 MAF로 넘어가야 하는 팀을 구분하는 기준을 잡을 수 있어.
category: framework
formatVersion: 2
aliases:
  - AutoGen
  - "오토젠"
relatedTerms:
  - agentic-ai
  - langchain
  - llamaindex
  - rag
  - runtime
  - tool-use
mentionCount: 0
draft: false
tags:
  - agents
  - multi-agent
factCheck:
  status: passed
  date: "2026-04-25"
  sources:
    - url: "https://github.com/microsoft/autogen"
      title: "microsoft/autogen README"
    - url: "https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html"
      title: "AgentChat - AutoGen"
    - url: "https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/teams.html"
      title: "Teams - AutoGen"
    - url: "https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/termination.html"
      title: "Termination - AutoGen"
    - url: "https://microsoft.github.io/autogen/stable/user-guide/autogenstudio-user-guide/installation.html"
      title: "Installation - AutoGen Studio"
    - url: "https://microsoft.github.io/autogen/stable/user-guide/autogenstudio-user-guide/index.html"
      title: "AutoGen Studio - AutoGen"
    - url: "https://learn.microsoft.com/en-us/agent-framework/overview/"
      title: "MAF overview"
    - url: "https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/"
      title: "AutoGen migration guide to MAF"
    - url: "https://docs.langchain.com/oss/python/langchain/agents"
      title: "Agents - LangChain Docs"
    - url: "https://docs.llamaindex.ai/en/stable/understanding/agent/"
      title: "Building an agent - LlamaIndex"
  checks:
    - type: source_match
      result: pass
      summary: "본문의 핵심 주장인 '기존 AutoGen은 유지 가능하지만 새 시작은 MAF 우선' 판단축이 공식 README, AgentChat 문서, Studio 문서와 직접 맞물리는지 확인했다."
      items:
        - "독자가 가장 오해하기 쉬운 지점은 AutoGen을 아직도 신규 채택 기본값으로 읽는 거야. README는 maintenance mode, community managed, new users should start with MAF라고 명시하므로 본문의 go/no-go 기준이 공식 문구와 맞는다."
        - "AgentChat 문서는 AutoGen을 single-agent와 multi-agent 앱용 고수준 API로 설명하고, 팀과 종료 조건을 중심으로 예시를 든다. 그래서 본문을 '멀티에이전트 대화 패턴 프레임워크'로 잡은 해석이 맞다."
        - "Studio 문서는 low-code UI이지만 production-ready app이 아니라고 분명히 적는다. 경고 섹션에서 Studio를 운영용 콘솔처럼 과대평가하지 않게 한 이유가 여기서 나온다."
        - "Migration Guide와 overview 문서는 이 새 SDK를 AutoGen의 direct successor로 설명한다. readerValue가 약속한 '언제 AutoGen을 보고 언제 MAF로 넘어갈지' 판단축을 공식 출처가 직접 뒷받침한다."
      findings:
        - "핵심 판단은 기능 수가 아니라 유지보수 상태와 새 프로젝트 여부다."
        - "공식 README와 공식 문서만으로도 본문 중심 주장의 대부분을 검증할 수 있었다."
    - type: web_cross_check
      result: pass
      sources: 4
      summary: "AutoGen, MAF, LangChain 계열, LlamaIndex의 공식 문서를 나란히 비교해 AutoGen을 어떤 층위에서 읽어야 하는지 다시 정리했다."
      items:
        - "AutoGen README와 MAF overview를 비교하니, 둘은 경쟁 브랜드라기보다 successor 관계에 가깝다. 그래서 새 프로젝트의 1차 비교축은 'AutoGen vs 아무 프레임워크'가 아니라 '기존 AutoGen 유지 vs MAF로 시작'으로 바뀐다."
        - "AutoGen 문서는 Team과 TerminationCondition 같은 대화 중심 추상화를 전면에 두고, 후속 SDK 문서는 typed workflows, checkpointing, middleware, session state를 강조한다. 이 차이가 production 적합성 판단을 바꾼다."
        - "LangChain 공식 docs는 `create_agent`와 LangGraph durable runtime을 중심에 둔다. 그래서 LangChain은 범용 에이전트 구성과 운영 생태계 쪽 비교축이고, AutoGen에서 MAF로 가는 직접 마이그레이션 축과는 다르다."
        - "LlamaIndex 공식 docs는 문서·질의·workflow·query engine 결합을 더 강하게 드러낸다. 문서나 [RAG(검색 증강 생성)](/ko/wiki/rag/)가 문제의 중심이면 LlamaIndex와의 비교가 유효하지만, 그것만으로 AutoGen의 successor 판단을 대신할 수는 없다."
      findings:
        - "비교 결과, AutoGen의 가장 직접적인 대안은 MAF이고, LangChain과 LlamaIndex는 인접 대안이다."
        - "이 페이지는 기능 소개보다 선택 기준 문서로 읽히는 쪽이 맞다."
    - type: number_verify
      result: pass
      summary: "변동성이 큰 지표는 버리고, 공식 문서가 고정적으로 제시하는 날짜·버전·포트만 남겼다."
      items:
        - "README는 AutoGen이 Python 3.10 or later를 요구한다고 적는다. 본문의 환경 설명은 이 수치에만 기대고 있다."
        - "AutoGen Studio 설치 문서는 `--port` 기본값을 8080으로 적는다. 포트 언급은 이 기본값 기준으로만 남겼다."
        - "같은 설치 문서는 실행 예시를 `autogenstudio ui --port 8081`로 보여 준다. 그래서 본문에서 '예시 포트'와 '기본 포트'를 섞지 않게 정리했다."
        - "MAF overview와 migration guide의 최근 갱신일은 각각 2026-04-06, 2026-04-02로 표시된다. 새 프레임워크 판단이 2026년 봄의 공식 문서 상태를 반영하는지 확인하는 보조 근거로만 썼다."
      findings:
        - "GitHub stars 같은 변동 수치는 모두 뺐다."
        - "숫자는 환경 판단에 직접 필요한 항목만 남겼다."
    - type: adversarial
      result: pass
      summary: "AutoGen을 '그래도 유명하니 새 프로젝트에 써도 되겠지'라고 읽는 낙관적 해석이 공식 문서 앞에서 버티는지 반대로 점검했다."
      items:
        - "README가 new users should start with MAF라고 말하므로, 새 팀의 greenfield 기본값으로 AutoGen을 권하는 문장은 방어되지 않는다."
        - "MAF overview는 'If you can write a function to handle the task, do that instead of using an AI agent'라고 선을 긋는다. 이 기준을 가져오면 AutoGen도 과용하면 안 된다는 경고가 더 선명해진다."
        - "Studio docs가 production-ready app이 아니라고 못 박기 때문에, UI가 있다는 이유만으로 운영 적합성을 높게 주는 해석은 성립하지 않는다."
        - "LangChain, LlamaIndex, [Tool Use(도구 사용)](/ko/wiki/tool-use/)를 같은 층위로 놓으면 독자가 프레임워크 선택과 기능 선택을 헷갈린다. 본문은 이 혼선을 줄이도록 비교 층위를 나눴다."
      findings:
        - "AutoGen의 강점은 여전히 빠른 멀티에이전트 실험이지만, 신규 채택 추천과는 다른 이야기다."
        - "독자에게 필요한 건 기능 카탈로그보다 채택 중단선과 마이그레이션 기준이다."
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "cd533a7e2c0460ae"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
AutoGen은 무엇을 위한 프레임워크인가를 한 문장으로 말하면, 여러 AI 에이전트가 역할을 나눠 대화하면서 한 작업을 같이 풀게 만드는 프레임워크야. 예를 들어 "작성자"와 "검토자" 두 역할을 번갈아 돌리거나, 사람 입력을 중간에 끼워 넣는 식의 멀티에이전트 실험을 빠르게 보여 주는 데 강했어.

그런데 여기서 바로 판단이 갈려. 2026년 4월 기준 공식 README는 AutoGen을 maintenance mode라고 밝히고, 새 사용자는 MAF로 시작하라고 적어 둔다. 그래서 AutoGen은 "지금도 돌아가는 기존 코드와 학습용 구조"를 이해할 때는 볼 가치가 있지만, 새 production 프로젝트의 기본 선택지로 보기는 어렵다.

## 실제로 무엇을 하나
AutoGen의 중심은 AgentChat이야. 여러 에이전트를 팀으로 묶고, 각 에이전트가 [LLM(거대 언어 모델)](/ko/wiki/llm/)과 [Tool Use(도구 사용)](/ko/wiki/tool-use/)를 섞어 응답하게 한 뒤, `TerminationCondition`으로 언제 멈출지 정하는 흐름이 핵심이야. "번갈아 말하기", "특정 문구가 나오면 종료", "메시지 수 제한" 같은 패턴을 빨리 붙일 수 있어서 데모와 프로토타입에 잘 맞아.

초보자 기준으로는 이렇게 보면 돼. "한 번의 답변"이 아니라 "여러 역할이 몇 턴 동안 상호작용하는 흐름"을 만들고 싶다면 AutoGen이 설명해 주는 문제가 맞아. 반대로 모델 호출 1회나 간단한 함수 호출 1~2개면 AutoGen은 과할 수 있어.

선택 기준도 분명해. 이미 AutoGen `Team`이나 `RoundRobinGroupChat` 기반 내부 실험 코드가 있고, 지금 필요한 일이 버그 수정·프롬프트 조정·도구 추가 정도라면 계속 써도 돼. 하지만 새 서비스에서 체크포인트, 타입 있는 워크플로, 장기 지원, 운영 관측성을 처음부터 요구한다면 MAF로 넘어가는 게 맞아.

## 왜 중요한가
이 용어를 알아야 하는 이유는 "AutoGen을 지금 채택해도 되나?"라는 질문에 바로 답해야 하기 때문이야. 이름만 보면 그냥 멀티에이전트 프레임워크 중 하나처럼 보이지만, 공식 문서가 direct successor와 migration path를 제시한 순간부터 읽는 법이 달라졌어.

실무 장면으로 보면 더 선명해. 사내 연구팀이 2~3개 역할의 협업 프롬프트를 시험하고, 기존 노트북과 Python 3.10+ 환경에서 빠르게 반복해 보는 상황이라면 AutoGen은 아직 참고할 가치가 있어. 반대로 고객 데이터가 걸린 새 운영 서비스에서 승인 흐름, 복구 가능 실행, 장기 유지보수를 설계해야 한다면 AutoGen보다 MAF가 우선이야.

관련 용어도 같은 층위로 보면 안 돼.

- [LangChain(랭체인)](/ko/wiki/langchain/)과 [LangGraph(랭그래프)](/ko/wiki/langgraph/): 범용 에이전트 구성과 durable runtime 쪽 비교축이고, AutoGen은 그보다 멀티에이전트 대화와 팀 운영 패턴 쪽에 더 가깝다.
- [LlamaIndex(라마인덱스)](/ko/wiki/llamaindex/): [RAG(검색 증강 생성)](/ko/wiki/rag/)나 문서 질의처럼 데이터 연결 문제가 중심일 때의 비교축이다.
- [Tool Use(도구 사용)](/ko/wiki/tool-use/): 프레임워크 이름이 아니라, AutoGen이나 LangChain 안에서 쓰는 능력이라는 구분축이다.

## 주의해서 볼 점
가장 큰 주의점은 유지보수 상태야. AutoGen은 새 기능이 활발히 들어가는 전략 제품이 아니라, 기존 사용자와 커뮤니티가 관리하는 코드베이스로 보는 게 맞아. 그래서 새 프로젝트를 시작하면서 "일단 유명하니까 AutoGen으로 가자"라고 결정하면, 나중에 migration 비용을 다시 치를 가능성이 커.

AutoGen Studio도 이름 때문에 오해하기 쉬워. 문서상으로는 웹 UI 프로토타입 도구이고, production-ready app으로 보지 말라고 분명히 적혀 있어. 기본 포트는 8080이지만 설치 예시는 8081로 띄우기도 하니, 이건 완성 제품의 표준 운영 콘솔이라기보다 실험용 작업면에 가깝다고 이해하면 돼.

마지막으로, AutoGen을 다른 프레임워크 이름으로 바꿔도 말이 통하는 문장은 경계해야 해. 이 용어의 핵심은 Microsoft가 밀던 멀티에이전트 대화 추상화, Team·termination 중심 패턴, 그리고 지금은 MAF로 이어지는 계보라는 데 있어. 이 맥락이 빠지면 그냥 일반론이 돼.
