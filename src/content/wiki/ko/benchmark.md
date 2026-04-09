---
term: benchmark
title: "Benchmark"
lang: ko
summary: "Benchmark는 모델이나 시스템 성능을 같은 문제 세트로 비교하기 위한 시험 기준이다."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡게 해준다."
category: concept
aliases:
  - "evaluation benchmark"
relatedTerms:
  - synthetic-data
firstMentioned: "2026-02-20"
mentionCount: 11
draft: false
tags:
  - evaluation
  - measurement
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://en.wikipedia.org/wiki/Benchmark_(computing)"
      title: "Benchmark (computing)"
    - url: "https://huggingface.co/docs/evaluate/index"
      title: "Evaluate on the Hub · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "대표 출처 기준으로 용어명과 문서 주제를 직접 대조했다."
      items:
        - "용어명 대조: Benchmark"
        - "분류 대조: 개념"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 비교해 설명 축이 어긋나지 않는지 확인했다."
      items:
        - "Benchmark (computing) (https://en.wikipedia.org/wiki/Benchmark_(computing))"
        - "Evaluate on the Hub · Hugging Face (https://huggingface.co/docs/evaluate/index)"
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 해석 포인트를 따로 점검했다."
      items:
        - "정의와 역할을 먼저 설명하고, 시점에 따라 달라지는 수치나 가격은 본문에서 과장하지 않도록 제한했다."
      findings:
        - "이 페이지는 개념 이해를 돕는 설명용 항목이라 세부 수치나 정책은 공식 문서와 최신 기사에서 다시 확인해야 한다."
---
## 한 줄 정의
Benchmark는 여러 모델을 같은 조건에서 평가해 누가 어떤 작업에 강한지 비교하게 해 주는 테스트 묶음이다.
## 어떻게 작동하나
예를 들어 코딩 모델은 SWE-bench 같은 벤치마크로, 수학 추론 모델은 MATH 같은 벤치마크로 비교한다. 같은 모델도 어떤 벤치마크를 쓰느냐에 따라 강점이 다르게 보일 수 있다.

그래서 벤치마크 숫자는 유용하지만 절대적인 답은 아니다. 데이터 누수, 테스트 편향, 실제 사용자 환경과의 거리 때문에 현업 성능과 완전히 같지는 않다.
## 왜 중요한가
벤치마크를 모르면 발표 자료 숫자를 그대로 믿게 되고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하게 된다. AI 뉴스를 읽을 때 가장 먼저 필요한 필터 중 하나다.
## 관련 용어
- [Synthetic Data](/ko/wiki/synthetic-data/) — 성능 검증 기준을 같이 잡아 준다.