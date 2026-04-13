---
term: benchmark
title: "Benchmark"
lang: ko
summary: "Benchmark는 모델이나 시스템 성능을 같은 문제 세트로 비교하기 위한 시험 기준이야."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "evaluation benchmark"
relatedTerms:
  - synthetic-data
firstMentioned: "2026-02-20"
mentionCount: 12
draft: false
tags:
  - evaluation
  - measurement
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Benchmark_(computing)"
      title: "Benchmark (computing)"
    - url: "https://huggingface.co/docs/evaluate/index"
      title: "Evaluate on the Hub · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 컴퓨팅에서 벤치마크는 개체의 상대적인 성능을 평가하기 위해 컴퓨터 프로그램, 프로그램 세트 또는 기타 작업을 실행하는 행위로, 일반적으로 개체에 대해 여러 가지 표준 테스트 및 시험을 실행합니다."
        - "원문을 보면 컴퓨팅에서 벤치마크는 개체의 상대적인 성능을 평가하기 위해 컴퓨터 프로그램, 프로그램 세트 또는 기타 작업을 실행하는 행위로, 일반적으로 개체에 대해 여러 가지 표준 테스트 및 시험을 실행합니다."
        - "별칭 대조: evaluation benchmark도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 컴퓨팅에서 벤치마크는 개체의 상대적인 성능을 평가하기 위해 컴퓨터 프로그램, 프로그램 세트 또는 기타 작업을 실행하는 행위로, 일반적으로 개체에 대해 여러 가지 표준 테스트 및 시험을 실행합니다."
        - "교차 대조: 컴퓨팅에서 벤치마크는 개체의 상대적인 성능을 평가하기 위해 컴퓨터 프로그램, 프로그램 세트 또는 기타 작업을 실행하는 행위로, 일반적으로 개체에 대해 여러 가지 표준 테스트 및 시험을 실행합니다."
        - "출처 1 대조: en.wikipedia.org."
        - "출처 2 대조: huggingface.co."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 평가와 검증 맥락에서 다루는 범위를 다시 확인했어."
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
Benchmark는 여러 모델을 같은 조건에서 평가해 누가 어떤 작업에 강한지 비교하게 해 주는 테스트 묶음이야.
## 어떻게 작동하나
예를 들어 코딩 모델은 SWE-bench 같은 벤치마크로, 수학 추론 모델은 MATH 같은 벤치마크로 비교해. 같은 모델도 어떤 벤치마크를 쓰느냐에 따라 강점이 다르게 보일 수 있어.

그래서 벤치마크 숫자는 유용하지만 절대적인 답은 아니다. 데이터 누수, 테스트 편향, 실제 사용자 환경과의 거리 때문에 현업 성능과 완전히 같지는 않다.
## 왜 중요한가
벤치마크를 모르면 발표 자료 숫자를 그대로 믿게 되고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하게 돼. AI 뉴스를 읽을 때 가장 먼저 필요한 필터 중 하나다.
## 관련 용어
- [Synthetic Data](/ko/wiki/synthetic-data/) — 같이 보면 성능 검증 기준을 같이 잡아 준다.