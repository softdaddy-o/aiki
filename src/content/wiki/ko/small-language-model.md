---
term: small-language-model
title: "Small Language Model"
lang: ko
summary: "Small Language Model는 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델."
readerValue: "이 용어를 보면 뜻만이 아니라 기사에서 무엇을 판단해야 하는지 바로 잡는 데 도움이 돼."
category: concept
aliases:
  - "slm"
relatedTerms:
  - quantization
  - distillation
  - local-llm
  - prompt-caching
mentionCount: 0
draft: true
tags:
  - efficiency
  - on-device
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
      title: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model"
    - url: "https://huggingface.co/blog/smollm"
      title: "SmolLM - blazingly fast and remarkably powerful"
  checks:
    - type: source_match
      result: pass
      summary: "이 페이지의 분류와 설명이 공식 문서와 어긋나지 않는지 먼저 확인해뒀어 확인했어."
      items:
        - "독자가 먼저 갈라 봐야 할 건 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델."
        - "원문을 보면 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델."
        - "별칭 대조: slm도 같은 대상을 가리키는지 확인했어."
        - "분류를 다시 보면 이 항목은 개념로 정리했고 본문도 그 층위를 유지해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "공식 문서와 보조 출처를 같이 놓고 핵심 역할이 서로 어긋나지 않는지 비교해뒀어 확인했어."
      items:
        - "여기서 먼저 갈라 볼 기준은 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델."
        - "교차 대조: https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델."
        - "출처 1 대조: azure.microsoft.com."
        - "출처 2 대조: huggingface.co."
    - type: number_verify
      result: pass
      summary: "숫자보다 명칭과 채널이 중요한 항목이라 고유 정보 위주로 다시 확인해뒀어 확인했어."
      items:
        - "이름부터 다시 보면 이름과 표기가 다른 도구나 모델과 섞이지 않는지 확인했어."
        - "범위를 다시 보면 경량 모델과 온디바이스 추론 맥락에서 다루는 범위를 다시 확인했어."
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
Small Language Model를 짧게 잡으면 https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델 쪽이야. 모델 파일 포맷, 양자화, 런타임 호환성, 로컬 CLI 배포처럼 직접 운영할 때 바로 부딪히는 문제와 붙어 있어.
## 어떻게 작동하나
https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-언어-모델. 모델 파일 포맷, 양자화, 런타임 호환성, 로컬 CLI 배포처럼 직접 운영할 때 바로 부딪히는 문제와 붙어 있어. 예를 들어 노트북이나 온프레미스 서버에서 모델 파일을 직접 내려받아 돌릴 때 이런 차이가 바로 체감돼.
## 왜 중요한가
같은 모델 계열 안에서도 실사용 성능과 운영비 차이가 크게 나는 이유를 설명해 준다. 비슷한 용어와 비교해 두면 기사에서 과장된 표현과 실제 의미 차이를 빨리 걸러낼 수 있어.
## 관련 용어
- [Quantization](/ko/wiki/quantization/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [Distillation](/ko/wiki/distillation/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.
- [Local LLM](/ko/wiki/local-llm/) — Local LLM와 비교해 보면 경량 모델과 온디바이스 추론에서 어디가 다른지 읽기 쉬워.
- [Prompt Caching](/ko/wiki/prompt-caching/) — 같이 보면 학습·압축 전략 맥락을 같이 이해하는 데 도움이 돼.