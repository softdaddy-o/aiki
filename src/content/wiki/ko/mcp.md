---
term: mcp
title: "MCP"
lang: ko
summary: "MCP는 AI 앱이 외부 도구와 데이터 소스에 연결되는 방식을 표준화하려는 오픈 프로토콜이야. 모델 성능을 높이는 기술이라기보다, 도구 연결을 같은 규격으로 정리하는 접속 표준에 가까워."
readerValue: "모델 능력 이야기와 도구 연결 구조 이야기를 구분해야 하는지 먼저 판단하는 데 도움이 돼."
category: framework
aliases:
  - "model context protocol"
relatedTerms:
  - function-calling
firstMentioned: "2026-04-01"
mentionCount: 2
draft: false
tags:
  - protocol
  - tool-use
factCheck:
  status: passed
  date: "2026-04-10"
  sources:
    - url: "https://modelcontextprotocol.io/introduction"
      title: "What is the Model Context Protocol (MCP)? - Model Context Protocol"
    - url: "https://modelcontextprotocol.io/specification/2024-11-05/index"
      title: "Specification - Model Context Protocol"
  checks:
    - type: source_match
      result: pass
      summary: "MCP를 오픈 표준 프로토콜로 읽는 게 맞는지부터 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 모델 능력 이야기와 도구 연결 구조 이야기를 먼저 구분해야 해."
        - "원문을 보면 introduction은 MCP를 open standard로 소개해."
        - "정체성을 보면 앱과 도구를 연결하는 protocol 성격이 핵심이라는 설명과 맞는다."
        - "비유 대조: 공식 소개가 USB-C 비유를 쓰는 이유도 연결 규격 표준이라는 해석과 일치해."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "소개, 아키텍처, 스펙 문서를 같이 놓고 MCP 범위를 과장하지 않았는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 함수 호출 규격, 에이전트 프레임워크, 도구 연결 표준 가운데 MCP가 어디에 놓이는지 봐야 해."
        - "공식 자료를 같이 보면 architecture 문서는 host, client, server 구성을 분리해 설명해."
        - "공식 자료를 같이 보면 specification 문서는 tools, resources, prompts 같은 노출 단위를 별도로 정의해."
        - "그래서 MCP를 agent framework 하나로 축소하거나 function calling의 다른 이름으로 치환하면 범위가 틀어진다."
    - type: number_verify
      result: pass
      summary: "스펙 버전과 구성 요소 이름처럼 자주 틀리는 고유 항목도 따로 검증해뒀어."
      items:
        - "버전 검증: 공식 스펙 경로는 2024-11-05 버전을 포함해."
        - "이름부터 다시 보면 MCP는 Model Context Protocol의 약자다."
        - "구성 검증: tools, resources, prompts는 공식 문서에서 분리된 개념으로 다뤄진다."
    - type: adversarial
      result: pass
      summary: "MCP 주변에서 가장 흔한 과장을 어떻게 걸러야 하는지 의심해보고 정리해뒀어."
      items:
        - "헷갈리기 쉬운 건 MCP는 모델 자체를 더 똑똑하게 만드는 기술이 아니다."
        - "헷갈리기 쉬운 건 MCP를 붙였다고 보안 문제가 자동으로 해결되는 것도 아니다."
        - "헷갈리기 쉬운 건 function calling은 호출 형식에 가깝고, MCP는 도구를 발견하고 연결하는 표준이라는 점에서 층위가 다르다."
      findings:
        - "MCP를 이해할 때 핵심은 어떤 모델이냐보다, 서로 다른 도구 연결을 같은 계약으로 묶을 수 있느냐에 있어."
---
## 한 줄 정의
MCP는 AI 앱이 외부 도구, 파일, 데이터 소스에 연결되는 방식을 표준화하려는 오픈 프로토콜이야.
## 어떻게 작동하나
MCP를 이해할 때 먼저 잡아야 할 점은 이것이 모델 기능이 아니라 연결 규격이라는 사실이야. AI 앱이 바깥 세계와 붙으려면 파일 시스템도 읽어야 하고, API도 호출해야 하고, 데이터베이스도 조회해야 하거든. 문제는 도구마다 연결 방식이 제각각이면 앱마다 연동 코드를 따로 써야 한다는 점이야. MCP는 그 연결부를 공통 규격으로 맞추려 해. 공식 아키텍처 문서 기준으로는 host, client, server가 분리되고, server는 tools, resources, prompts 같은 단위를 노출해. 그래서 MCP를 지원하는 앱은 각 도구마다 전용 연동을 새로 만드는 대신, 같은 계약을 따라 여러 외부 시스템에 붙을 수 있어.
## 왜 중요한가
MCP가 중요한 이유는 에이전트나 코딩 도구가 실제로 쓸모 있으려면 결국 외부 도구와 연결돼야 하기 때문이야. 모델이 답을 생성하는 것만으로는 업무를 끝낼 수 없어. 파일을 읽고, 이슈를 만들고, 노션을 수정하고, 배포 상태를 확인하는 순간부터는 연결 표준이 중요해진다. 그래서 MCP는 "새로운 모델 기술"이라기보다 도구 연결을 재사용 가능하게 만드는 인프라 용어로 이해해야 해. 이 차이를 놓치면 MCP 관련 뉴스를 읽을 때도 과장되게 받아들이기 쉬워. 실제로는 모델 능력보다 도구 생태계를 어떻게 표준화할지에 대한 이야기인 경우가 많아.
## 관련 용어
- [Function Calling](/ko/wiki/function-calling/) — 모델이 도구를 호출하는 인터페이스라는 점은 겹치지만, MCP는 호출 자체보다 도구 발견과 연결 규격을 표준화한다는 점에서 층위가 다르다. - [AI Agent](/ko/wiki/agent/) — MCP는 에이전트가 외부 세계와 상호작용할 때 자주 쓰는 연결 규격이라서, 에이전트가 실제로 어떤 도구를 만지는지 이해하는 데 도움이 돼. - [Claude Code](/ko/wiki/claude-code/) — MCP를 실제 개발 도구 안에서 어떻게 체감하는지 보여 주는 사례라서, 추상 표준이 제품 안에서 어떻게 드러나는지 볼 때 좋아.