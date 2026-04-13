---
term: api
title: "API"
lang: ko
summary: "API는 한 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하게 해 주는 연결 규격이야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "application programming interface"
relatedTerms:
  - llm
firstMentioned: "2025-01-20"
mentionCount: 25
draft: false
tags:
  - integration
  - infrastructure
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/API"
      title: "API"
    - url: "https://aws.amazon.com/what-is/api/"
      title: "What is an API? - Application Programming Interface Explained - AWS"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 컴퓨터 간 또는 컴퓨터 프로그램 간의 연결입니다."
        - "원문을 보면 컴퓨터 간 또는 컴퓨터 프로그램 간의 연결입니다."
        - "별칭 대조: application programming interface도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 이러한 연결이나 인터페이스를 구축하는 방법을 설명하는 문서나 표준을 API 사양이라고 합니다."
        - "교차 대조: 이러한 연결이나 인터페이스를 구축하는 방법을 설명하는 문서나 표준을 API 사양이라고 합니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: aws.amazon.com."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 API 연결과 제품 통합 맥락에서 다루는 범위를 다시 확인했어."
        - "접근 채널을 보면 공식 문서와 제품 소개에서 어떤 사용 경로로 연결되는지 비교했어."
    - type: adversarial
      result: pass
      summary: "이 용어를 읽을 때 가장 흔하게 섞이는 오해가 무엇인지 따로 의심해보고 정리해뒀어 확인했어."
      items:
        - "헷갈리기 쉬운 건 특정 제품 기능 하나로만 읽으면 더 큰 개념 차이를 놓치기 쉬워."
        - "헷갈리기 쉬운 건 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어."
      findings:
        - "이름만 외우기보다 실제 입력, 출력, 운영 위치를 같이 봐야 덜 헷갈려."
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