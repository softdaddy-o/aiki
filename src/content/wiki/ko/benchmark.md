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
  date: "2026-04-10"
  sources:
    - url: "https://en.wikipedia.org/wiki/Benchmark_(computing)"
      title: "Benchmark (computing)"
    - url: "https://huggingface.co/docs/evaluate/index"
      title: "Evaluate on the Hub · Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지를 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지 문제로 읽어도 되는지 먼저 확인해뒀어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름을 다시 보면 Benchmark로 잡혀."
        - "분류를 다시 보면 개념로 읽는 게 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "관련 출처 2건을 나란히 놓고 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 설명이 어긋나지 않는지 비교해뒀어."
      items:
        - "여기서 먼저 갈라 볼 기준은 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "같이 본 출처로는 Benchmark (computing) (https://en.wikipedia.org/wiki/Benchmark_(computing))"
        - "같이 본 출처로는 Evaluate on the Hub · Hugging Face (https://huggingface.co/docs/evaluate/index)"
    - type: number_verify
      result: pass
      summary: "숫자가 적은 항목이라도 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지를 가르는 고유 명칭과 설명 축은 따로 검증해뒀어."
      items:
        - "숫자보다 먼저 갈라 볼 기준은 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지야."
        - "이름부터 다시 보면 Benchmark로 고정돼."
        - "고정 스펙이 적은 항목이라 숫자보다 실제 선택 기준이 되는 설명 축부터 다시 맞춰봤어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 선택 포인트는 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지 기준으로 한 번 더 의심해보고 정리해뒀어."
      items:
        - "헷갈리지 않으려면 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 먼저 잡아야 해."
        - "정의만 외우기보다 실제 선택을 틀리게 만드는 해석부터 먼저 걸러냈어."
      findings:
        - "이 페이지는 평가와 검증를 기사에서 어떤 판단 기준으로 읽어야 하는지부터 빠르게 큰 흐름을 잡는 데 도움이 되는 용도라서, 시점마다 바뀌는 가격표나 운영 조건은 공식 문서와 최신 기사에서 다시 확인해야 해."
---
## 한 줄 정의
Benchmark는 여러 모델을 같은 조건에서 평가해 누가 어떤 작업에 강한지 비교하게 해 주는 테스트 묶음이야.
## 어떻게 작동하나
예를 들어 코딩 모델은 SWE-bench 같은 벤치마크로, 수학 추론 모델은 MATH 같은 벤치마크로 비교해. 같은 모델도 어떤 벤치마크를 쓰느냐에 따라 강점이 다르게 보일 수 있어. 그래서 벤치마크 숫자는 유용하지만 절대적인 답은 아니다. 데이터 누수, 테스트 편향, 실제 사용자 환경과의 거리 때문에 현업 성능과 완전히 같지는 않다.
## 왜 중요한가
벤치마크를 모르면 발표 자료 숫자를 그대로 믿게 되고, 반대로 벤치마크만 믿어도 실제 성능을 과대평가하게 돼. AI 뉴스를 읽을 때 가장 먼저 필요한 필터 중 하나다.
## 관련 용어
- [Synthetic Data](/ko/wiki/synthetic-data/) — 성능 검증 기준을 같이 잡아 준다.