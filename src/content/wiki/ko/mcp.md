---
term: mcp
title: "MCP (모델 컨텍스트 프로토콜)"
lang: ko
summary: "MCP는 AI 앱이 파일, 데이터베이스, 검색, 실행 도구 같은 바깥 자원을 같은 규격으로 연결하게 하려는 프로토콜이야. 모델 성능을 높이는 기술이라기보다 연결 방식을 표준화하는 쪽에 가까워."
readerValue: "MCP를 모델 기능이 아니라 도구 연결 표준으로 보면 기사에서 무엇이 바뀌는지 훨씬 정확하게 읽을 수 있어."
category: framework
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "model context protocol"
relatedTerms:
  - function-calling
firstMentioned: "2026-04-01"
mentionCount: 3
draft: false
tags:
  - protocol
  - tool-use
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://modelcontextprotocol.io/introduction"
      title: "What is the Model Context Protocol (MCP)? - Model Context Protocol"
    - url: "https://modelcontextprotocol.io/specification/2024-11-05/index"
      title: "Specification - Model Context Protocol"
  checks:
    - type: source_match
      result: pass
      summary: "MCP를 도구와 데이터 연결 규격을 표준화하는 프로토콜로 설명해도 공식 소개와 맞는지 먼저 맞춰봤어."
      items:
        - "독자 문제 대조: MCP를 새 모델이나 에이전트 제품 이름으로 읽기 쉬운데, 실제로는 연결 규격이라는 점부터 갈라 봐야 해."
        - "핵심 목적도 모델과 외부 도구, 데이터 소스를 같은 방식으로 연결하는 데 있어."
        - "그래서 본문에서 MCP를 성능 향상 기술보다 연결 표준으로 푼 건 방향이 맞아."
        - "Model Context Protocol이라는 풀네임도 같은 뜻으로 이어져."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "소개 문서와 스펙 문서를 같이 놓고 MCP 범위를 과장하지 않았는지 다시 봤어."
      items:
        - "비교 기준: MCP를 도구 호출 형식 하나로 읽을지, 더 넓은 도구 연결 규약으로 읽을지부터 갈라 봐야 해."
        - "스펙에는 tools, resources, prompts처럼 노출 단위가 나뉘어 있어."
        - "즉 MCP는 에이전트 프레임워크 하나의 이름이 아니라, 여러 앱이 공유할 수 있는 연결 계약이야."
        - "본문도 이 층위를 먼저 설명하도록 맞췄어."
    - type: number_verify
      result: pass
      summary: "자주 틀리는 고유 항목인 이름과 스펙 버전을 한 번 더 봤어."
      items:
        - "MCP는 Model Context Protocol의 약자야."
        - "사용한 스펙 URL은 2024-11-05 버전을 가리켜."
        - "tools, resources, prompts가 스펙에서 구분된 개념이라는 점도 다시 확인했어."
    - type: adversarial
      result: pass
      summary: "처음 읽는 사람이 흔히 하는 과장을 따로 떼서 다시 봤어."
      items:
        - "MCP는 모델 자체를 더 똑똑하게 만드는 기술이 아니야."
        - "MCP를 쓴다고 보안, 권한, 인증이 자동으로 해결되는 것도 아니야."
        - "도구 호출 형식과 겹치는 부분은 있어도, MCP는 도구를 발견하고 연결하는 더 넓은 계약이라는 점이 달라."
      findings:
        - "MCP의 핵심은 모델 성능이 아니라, 도구 연결을 같은 방식으로 다루게 만드는 데 있어."
---

## 한 줄 정의

MCP는 AI 앱이 바깥 도구나 데이터에 붙을 때 공통 규격을 쓰게 만드는 프로토콜이야. 쉽게 말해 모델이 파일, 검색, 데이터베이스, 코드 실행 같은 외부 자원을 만나는 방식을 표준화하려는 약속이라고 보면 돼.

그래서 MCP는 새 모델도 아니고, 에이전트 제품 이름도 아니야. 여러 앱과 도구가 제각각 따로 연결되지 않게 하려는 연결 계약 쪽 개념이 먼저야.

## 어떻게 작동하나

보통 MCP에서는 호스트 앱, 클라이언트, 서버 같은 역할이 나뉘고, 서버가 tools나 resources를 노출하면 앱이 그걸 같은 형식으로 발견하고 사용할 수 있어. 덕분에 도구를 붙이는 방식이 제품마다 덜 제멋대로가 돼.

예를 들어 데스크톱 AI 앱이 로컬 파일 읽기, Git 저장소 조회, 사내 문서 검색, CLI 실행 같은 기능을 붙일 때 각 도구를 전부 다른 API와 SDK로 연결하면 유지보수가 금방 복잡해져. MCP 서버가 `tools`, `resources`, `prompts`를 공통 형식으로 내놓으면 앱은 그 계약을 따라 여러 기능을 한 방식으로 붙일 수 있어.

이 구조가 중요한 이유는 AI 앱이 점점 더 많은 외부 자원에 붙고 있기 때문이야. 파일 읽기, 깃 저장소 조회, 브라우저 조작, 사내 문서 검색, 터미널 실행 같은 걸 할수록 연결 표준의 가치가 커져.

## 왜 중요한가

MCP를 이해하면 "이 앱이 도구를 얼마나 쉽게 붙일 수 있나"를 보는 눈이 생겨. 기사에서 MCP 지원이 나왔다는 건 보통 모델이 더 좋아졌다는 뜻보다, 생태계 연결성이 좋아졌다는 뜻에 더 가까워.

실무에서도 차이가 커. 표준이 없으면 앱마다 커스텀 연결기를 따로 만들어야 하고, 도구 하나 바꿀 때마다 유지보수 비용이 커진다. MCP는 이 비용을 줄이려는 공통 인터페이스 역할을 노려.

## 주의해서 볼 점

MCP가 있다고 해서 모든 도구가 바로 호환되는 건 아니야. 권한 관리, 인증, 데이터 민감도, 실제 실행 안전장치는 여전히 앱 쪽에서 설계해야 해.

또 MCP를 도구 호출의 다른 이름 정도로 축소해서 보면 놓치는 게 많아. 단순 호출 형식은 "어떻게 부르나"에 더 가깝고, MCP는 어떤 자원이 있고 어떻게 발견하고 연결할지까지 포함하는 더 넓은 층위야.

## 관련 용어

- [Function Calling](/ko/wiki/function-calling/) 은 모델이 도구 호출 형식을 다루는 쪽이라, 자원 발견과 연결 계약까지 다루는 MCP와 비교해서 보면 차이가 잘 보여.
