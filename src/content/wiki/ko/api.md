---
term: api
title: "API (애플리케이션 프로그래밍 인터페이스)"
lang: ko
summary: "API는 한 프로그램이 다른 프로그램의 기능을 정해진 형식으로 호출하게 해 주는 연결 규격이야. 요청 형식, 응답 형식, 인증 방식 같은 약속이 여기에 들어가."
readerValue: "AI 기사에서 API라는 말이 나오면 새 앱이 아니라, 모델이나 서비스 기능을 외부에서 호출할 수 있게 여는 통로라는 점부터 잡을 수 있어."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
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
      summary: "API를 프로그램끼리 기능을 주고받는 인터페이스로 설명해도 기본 정의와 맞는지 먼저 맞춰봤어."
      items:
        - "독자 문제 대조: API를 웹사이트 주소 정도로 읽기 쉬운데, 실제로는 기능 호출 규약 전체라는 점부터 갈라 봐야 해."
        - "AWS는 애플리케이션이 서로 통신하는 방법으로 풀어 줘."
        - "그래서 본문에서 요청 형식과 응답 형식을 포함한 연결 규격으로 설명한 건 맞아."
        - "application programming interface라는 풀네임도 같은 뜻으로 이어져."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "기술 정의와 실무 설명을 같이 보고 API를 단순 웹주소 정도로 축소하지 않았는지 다시 봤어."
      items:
        - "비교 기준: API를 URL 하나로 읽을지, 요청과 응답 계약 전체로 읽을지부터 갈라 봐야 해."
        - "즉 API는 URL 하나가 아니라, 입력과 출력 규약 전체를 포함하는 말이야."
        - "그래서 본문도 엔드포인트만이 아니라 인증과 데이터 형식까지 같이 언급했어."
        - "이게 초심자가 가장 먼저 잡아야 할 축이야."
    - type: number_verify
      result: pass
      summary: "숫자보다 호출 구조가 중요한 항목이라, 실제로 구분해야 할 요소를 다시 봤어."
      items:
        - "API를 말할 때는 보통 요청, 응답, 인증, 오류 처리 같은 요소가 함께 따라와."
        - "이건 AI API든 일반 웹 API든 공통으로 잡히는 뼈대야."
        - "그래서 특정 회사 제품명 없이 상위 개념으로 설명하는 구성이 맞아."
    - type: adversarial
      result: pass
      summary: "처음 읽는 사람이 흔히 하는 오해를 따로 떼서 다시 봤어."
      items:
        - "API는 앱 그 자체가 아니라, 앱이나 모델 기능에 접근하는 통로야."
        - "또 API가 있으면 무조건 쉬운 것도 아니고, 가격 정책과 속도 제한, 인증 방식까지 같이 봐야 해."
        - "그래서 'API 공개'라는 말은 기능 판매 방식이 열렸다는 뜻일 때가 많아."
      findings:
        - "API의 핵심은 제품 소개가 아니라 호출 계약과 접근 방식에 있어."
---

## 한 줄 정의

API는 한 프로그램이 다른 프로그램의 기능을 정해진 형식으로 불러다 쓰게 만드는 인터페이스야. 쉽게 말해 "이 기능을 이런 형식으로 요청하면, 저쪽이 이런 형식으로 답해 준다"는 약속이라고 보면 돼.

그래서 API는 앱 화면이 아니라 연결 규칙 쪽 개념이야. 같은 서비스라도 웹사이트로 쓸 수도 있고 API로 붙일 수도 있는데, 둘은 쓰는 방식이 다르다.

## 어떻게 작동하나

예를 들어 개발자가 LLM 서비스를 자기 앱에 넣고 싶으면, 모델 회사 사이트를 직접 클릭하는 대신 API를 호출해서 답변을 받아와. 이때 요청 내용, 모델 이름, 인증 키, 응답 형식 같은 규칙이 API로 정해져 있어.

AI 문맥에서 API는 특히 중요해. 모델 회사가 자기 모델을 직접 서비스로 팔 수도 있지만, API를 열면 다른 회사들이 그 모델을 자기 앱 안에 넣어 쓸 수 있기 때문이야. 그래서 API 공개는 생태계 확장의 신호로 읽힐 때가 많아.

## 왜 중요한가

API를 이해하면 "새 모델 출시"와 "API 출시"를 구분할 수 있어. 전자는 기술 자체가 바뀐 이야기일 수 있고, 후자는 그 기술에 외부가 접근할 수 있게 됐다는 이야기일 수 있어.

또 비용 구조도 여기서 갈린다. API는 보통 호출량, 토큰 수, 속도 제한 같은 조건이 따라오니까, 기술 성능만큼 가격표와 운영 정책이 실무에서 중요해져.

## 주의해서 볼 점

API가 공개됐다고 해서 누구나 바로 쉽게 붙일 수 있는 건 아니야. 인증 방식, 요청 제한, 응답 안정성, 버전 변경 정책까지 같이 봐야 실제 도입 난이도가 보여.

특히 AI API는 데모 화면과 실제 API 성능이 다를 수도 있어. 웹앱에서 잘 보인다고 해서 API 비용이나 응답 지연까지 좋은 건 아니니, 기사나 문서를 읽을 때 이 둘을 분리해서 보는 게 좋아.

## 관련 용어

- [LLM](/ko/wiki/llm/) 은 AI API가 보통 어떤 모델 층을 외부에 여는지 이해할 때 바로 이어져.
