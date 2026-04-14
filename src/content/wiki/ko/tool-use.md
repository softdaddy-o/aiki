---
term: tool-use
title: "Tool Use(도구 사용)"
lang: ko
summary: "Tool Use는 모델이 검색, 코드 실행, API 같은 바깥 기능을 호출하고 그 결과를 다시 받아 다음 판단과 답변에 반영하는 실행 방식이야."
readerValue: "이 표현이 단순 답변 생성 기법이 아니라 외부 시스템 호출과 결과 연결 구조를 가리킨다는 점을 빠르게 구분할 수 있어."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "tool use"
  - "도구 사용"
relatedTerms:
  - langchain
  - llamaindex
  - agentic-ai
  - langgraph
firstMentioned: "2026-02-27"
mentionCount: 1
draft: false
tags:
  - agents
  - function-calling
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "https://platform.openai.com/docs/guides/function-calling"
  checks:
    - type: source_match
      result: pass
      summary: "제공된 출처 요약과 독자 초점에 맞춰, Tool Use를 외부 도구 실행 구조라는 뜻으로 좁혀 설명했어."
      items:
        - "독자 문제 대조: 답변 생성 기법과 외부 실행 연결 구조를 빠르게 구분해야 한다는 요구를 첫 섹션에 직접 반영했어."
        - "Anthropic 요약의 핵심인 에이전트 루프와 실행 위치를 '모델 밖에서 도구가 실행된다'는 설명으로 옮겼어."
        - "OpenAI의 function calling 문맥과 헷갈리지 않게 호출 형식과 전체 실행 흐름을 구분했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 웹 출처 요약을 함께 보면, Tool Use를 외부 실행 루프 중심으로 설명한 서술은 무리 없어."
      items:
        - "비교 기준: Anthropic 쪽은 도구 실행 위치와 루프를, OpenAI 쪽은 구조화된 호출 형식을 중심에 두고 봤어."
        - "두 자료 모두 모델이 직접 외부 작업을 수행한다기보다 호출을 만들고 앱이나 플랫폼이 실행을 맡는 구도로 읽혀."
        - "그래서 본문에서도 도구 선택, 호출 생성, 바깥 실행, 결과 반영의 순서를 유지했어."
    - type: number_verify
      result: pass
      summary: "검증이 필요한 수치 주장이나 날짜 해석을 본문에 넣지 않아서 숫자 오류 위험이 낮아."
      items:
        - "정확도, 비용 절감률, 속도 향상 같은 정량 표현은 쓰지 않았어."
        - "mentionCount와 firstMentioned 같은 메타데이터는 개념 이해에 필요하지 않아 본문에서 제외했어."
    - type: adversarial
      result: pass
      summary: "자주 생기는 오해를 막도록 범위와 한계를 분리해서 적었어."
      items:
        - "Tool Use를 모델 내부 추론 향상으로 오해하지 않게, 실행이 모델 바깥에서 일어난다고 못 박았어."
        - "검색 연결만 뜻하는 말로 좁아지지 않게 계산, 파일 작업, API 호출까지 예시 범위를 넓혔어."
        - "에이전트와 같은 뜻으로 읽히지 않게 Agentic AI와의 범위 차이를 관련 용어에서 분리했어."
---
## 한 줄 정의
Tool Use는 모델이 외부 도구를 골라 호출하고, 그 결과를 다시 받아 다음 행동이나 답변에 반영하는 실행 방식이야. 핵심은 문장을 그럴듯하게 만드는 기술이 아니라 검색, 계산, 파일 작업, API 호출처럼 모델 바깥에서 일어나는 일을 연결하는 구조라는 점이야. 그래서 Tool Use라는 말은 답변 스타일보다 실행 경로와 시스템 연결을 설명할 때 더 정확하게 쓰여.
## 어떻게 작동하나
애플리케이션은 먼저 모델에게 어떤 도구를 쓸 수 있는지와 각 도구가 받는 입력 형식을 알려 줘. 그러면 모델은 사용자 요청을 보고 바로 최종 답을 쓰는 대신, 필요한 도구 이름과 인자를 구조화된 형태로 내보낼 수 있어.
실제 실행은 모델 안이 아니라 바깥 런타임에서 일어나. 앱이나 플랫폼이 그 호출을 검증한 뒤 도구를 돌리고, 나온 결과를 다시 모델에 넣어 후속 판단이나 최종 응답으로 이어 가는 식이야. Function Calling(함수 호출)이 호출 형식 자체를 가리키는 말이라면, Tool Use는 그 형식이 실행과 결과 반영까지 이어지는 전체 흐름에 더 가까워.
## 왜 중요한가
실제 업무에서는 최신 정보 조회, 데이터베이스 읽기, 사내 서비스 호출, 코드 실행처럼 모델 혼자 끝낼 수 없는 일이 많아. Tool Use가 있어야 모델이 설명만 하는 인터페이스를 넘어서 실제 작업 단계에 끼어들 수 있어.
이 개념을 알아두면 제품 설명도 덜 헷갈려. 겉으로는 모델이 더 똑똑해진 것처럼 보여도, 실제 성능 차이가 도구 연결, 호출 스키마, 실행 루프 설계에서 나오는 경우가 많아서 어디서 가치가 생기는지 더 정확히 볼 수 있어.
## 주의해서 볼 점
Tool Use가 붙었다고 해서 항상 정확하거나 안전한 건 아니야. 도구 설명이 모호하면 잘못된 인자를 만들 수 있고, 권한 범위가 넓으면 작은 호출 실수도 운영 문제로 번질 수 있어.
도구가 돌려준 결과도 그대로 믿으면 안 돼. 검색 품질, API 실패, 지연 시간, 비용, 권한 오류가 최종 응답에 그대로 스며들 수 있어서 입력 스키마 검증, 로그, 재시도, 권한 제한 같은 운영 장치가 같이 있어야 해.
## 관련 용어
- [LangChain(랭체인)](/ko/wiki/langchain/)은 Tool Use 자체라기보다 그 흐름을 코드로 엮어 쓰기 쉽게 만든 프레임워크야. Tool Use가 개념이라면 LangChain은 그 개념을 체인, 에이전트, 메모리 같은 구성요소로 조립하는 도구 쪽이야.
- [LlamaIndex(라마인덱스)](/ko/wiki/llamaindex/)는 범용 도구 실행 전체보다 외부 데이터 연결과 검색 계층에 더 무게가 실려 있어. Tool Use와 겹치긴 하지만, 특히 문서 인덱싱과 검색 기반 질의 쪽에서 차이가 분명해.
- [Agentic AI(에이전틱 AI)](/ko/wiki/agentic-ai/)는 목표를 세우고 계획하고 행동을 이어 가는 더 큰 범주의 개념이야. Tool Use는 그 안에서 실제 행동을 검색, 계산, API 호출 같은 구체적 실행으로 바꾸는 수단 중 하나야.
- [LangGraph(랭그래프)](/ko/wiki/langgraph/)는 여러 단계의 상태, 분기, 반복을 그래프로 관리하는 오케스트레이션 틀이야. Tool Use가 개별 도구를 쓰는 능력이라면, LangGraph는 그 능력을 긴 작업 흐름 안에서 안정적으로 굴리게 만드는 제어 구조에 가깝다.