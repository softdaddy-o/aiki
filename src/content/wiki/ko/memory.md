---
term: memory
title: "Memory(메모리)"
lang: ko
summary: "Memory는 에이전트가 이전 대화, 선호, 작업 결과를 저장했다가 다음 행동에 다시 쓰는 기억 구조야."
readerValue: "memory가 나오면 긴 문맥 얘기인지, 저장하고 다시 꺼내 쓰는 운영 설계인지 구분하는 데 도움 돼."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "agent memory"
  - "ai memory"
relatedTerms:
  - langchain
  - tool-use
  - llamaindex
  - long-context
firstMentioned: "2026-02-27"
mentionCount: 18
draft: false
tags:
  - agents
  - context-window
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/context-engineering"
      title: "Not Found - Claude API Docs"
    - url: "https://blog.langchain.dev/short-term-memory-agent/"
      title: "https://blog.langchain.dev/short-term-memory-agent/"
  checks:
    - type: source_match
      result: skip
      summary: "살아 있는 자료와 깨진 링크를 같이 보고 memory 정의 범위를 보수적으로 다시 봤어."
      items:
        - "독자 문제 대조: memory를 하드웨어 RAM이나 단순 긴 context와 같은 말로 읽지 않도록 저장-재주입 구조라는 점부터 고정했어."
        - "LangChain 글에서 short-term memory 맥락을 확인했고, 깨진 Anthropic 링크는 세부 주장 근거로 쓰지 않았어."
    - type: web_cross_check
      result: skip
      sources: 1
      summary: "교차검증에 쓸 살아 있는 자료가 적어서 과한 제품별 주장은 줄였어."
      items:
        - "비교 기준: memory를 세션 길이 문제로 볼지, 외부 저장소를 통한 회수 문제로 볼지 먼저 나눠서 봤어."
        - "확인 가능한 자료가 부족해서 특정 제품 구현 세부보다 개념 차이와 실무 역할 쪽 설명만 남겼어."
    - type: number_verify
      result: skip
      summary: "안정적으로 확인되는 숫자가 거의 없어서 수치 서술은 의도적으로 줄였어."
      items:
        - "컨텍스트 길이, 저장 기간, 비용 같은 숫자는 제공된 자료만으로 확정하기 어려워서 본문에 넣지 않았어."
        - "대신 단기와 장기, 저장과 재주입이라는 구조 차이만 남겼어."
    - type: adversarial
      result: pass
      summary: "memory를 long context와 같은 말로 읽는 오해를 막았어."
      items:
        - "한 번에 많이 넣는 능력과 잘 저장해 다시 꺼내는 능력은 다른 층위라는 점을 따로 적었어."
        - "기억을 많이 쌓을수록 무조건 좋아진다는 식의 낙관 대신 오염과 프라이버시 문제도 같이 남겼어."
      findings:
        - "memory라는 단어가 너무 넓어서 기사마다 저장소, 회수, 개인화가 뒤섞여 보이기 쉬워."
        - "제품 홍보 문구만 보면 기억력 향상처럼 들리지만 실제론 설계와 운영 책임 문제가 더 커."
---
## 한 줄 정의
Memory는 에이전트가 이전 대화, 사용자 선호, 작업 결과를 저장했다가 필요할 때 다시 꺼내 쓰는 기억 구조야. 그냥 입력창에 긴 문장을 더 붙이는 게 아니라 다음 판단에 쓸 정보를 별도 저장소에 남겨 두는 방식이라고 보면 돼.
## 어떻게 작동하나
보통은 현재 세션 안에서 잠깐 쓰는 단기 메모리와 여러 세션을 넘겨 유지하는 장기 메모리로 나뉘어. 모델이 전부를 항상 들고 있는 게 아니라 저장소에서 관련 기록을 찾아 프롬프트나 도구 호출에 다시 주입하는 식으로 굴러가.
## 왜 중요한가
memory가 있으면 에이전트가 방금 한 일과 사용자의 취향을 이어서 다룰 수 있어서 작업이 덜 끊겨. 코딩 에이전트가 직전에 고친 파일 맥락을 이어받거나 비서형 앱이 선호 일정과 반복 선택을 반영하는 차이가 여기서 나와.
## 주의해서 볼 점
Memory는 long context랑 같지 않아. 많이 담는 능력과 잘 저장하고 다시 꺼내는 능력은 다른 문제라서, 오래된 기록의 오염과 개인정보 저장 범위를 같이 봐야 해.
## 관련 용어
- long-context: long context는 한 번에 많이 넣는 쪽이야. memory는 나중에 다시 꺼내 쓰는 쪽이라서 둘을 같은 말로 보면 기사 해석이 자꾸 어긋나.
- tool-use: memory는 어떤 도구를 언제 다시 쓸지 결정할 때 자주 같이 붙어. 그래서 둘을 같이 보면 에이전트의 행동 흐름이 더 잘 보여.
- langchain: LangChain은 memory 패턴을 코드 단위로 자주 설명하는 프레임워크야. 구현 예시를 볼 때 기준점으로 쓰기 좋아.
- llamaindex: LlamaIndex는 저장한 정보를 다시 찾아 붙이는 흐름을 볼 때 같이 보면 편해. 특히 검색과 memory의 경계가 어디인지 감 잡기 좋지.
