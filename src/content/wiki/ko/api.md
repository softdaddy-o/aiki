---
term: api
title: "API"
lang: ko
summary: "API는 한 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하게 해 주는 연결 규격이야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "application programming interface"
relatedTerms:
  - llm
firstMentioned: "2025-01-20"
mentionCount: 19
draft: false
tags:
  - integration
  - infrastructure
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/API"
      title: "API"
    - url: "https://aws.amazon.com/what-is/api/"
      title: "What is an API? - Application Programming Interface Explained - AWS"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 맞춰봤다."
      items:
        - "독자가 먼저 갈라 봐야 할 건 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 API로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 다시 봤다."
      items:
        - "여기서 먼저 갈라 볼 기준은 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 API (https://en.wikipedia.org/wiki/API)"
        - "같이 본 출처로는 What is an API? - Application Programming Interface Explained - AWS (https://aws.amazon.com/what-is/api/)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 한 번 더 봤다."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 API로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리했다."
      items:
        - "헷갈리지 않으려면 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 API 연결과 제품 통합를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 잡게 해 주는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
API(Application Programming Interface)는 소프트웨어가 다른 소프트웨어와 대화할 때 쓰는 약속된 요청·응답 규격이야.
## 어떻게 작동하나
앱이 모델 서버에 요청을 보내고, 서버가 정해진 형식의 응답을 돌려주는 구조를 떠올리면 가장 쉬워. 예를 들어 챗봇 앱이 OpenAI API에 프롬프트를 보내고 답변을 받아 화면에 띄우는 식이야.

AI 뉴스에서 API는 단순 개발자 기능이 아니라 가격, 속도, 도구 호출, 배포 방식까지 묶인 제품 인터페이스를 뜻해. 같은 모델이라도 어떤 API로 제공되느냐에 따라 실무 난도가 크게 달라져.
## 왜 중요한가
모델 자체 성능과 실제 도입 가능성은 다르다. API를 이해해야 "새 모델 공개"가 곧바로 쓸 수 있는 서비스인지, 아직 연구 시연에 가까운지 구분할 수 있어.
## 관련 용어
- [LLM](/ko/wiki/llm/) — 기본 언어 모델 개념을 같이 보면 맥락이 훨씬 빨리 잡힌다.