---
term: small-language-model
title: Small Language Model(소형 언어 모델)
lang: ko
summary: >-
  작은 규모로 설계해서 적은 메모리와 계산 자원으로 돌리기 쉽게 만든 언어 모델 계열이야. 성능 절대치보다 속도, 비용, 배포 편의성이 중요할
  때 자주 거론돼.
readerValue: '이 말을 보면 단순한 모델 크기 얘기인지, 아니면 온디바이스 배포나 저비용 추론 전략 얘기인지 바로 구분할 수 있어.'
category: concept
aliases:
  - slm
relatedTerms:
  - quantization
  - distillation
  - local-llm
  - prompt-caching
mentionCount: 0
draft: false
tags:
  - efficiency
  - on-device
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: >-
        https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model
      title: >-
        https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model
    - url: 'https://huggingface.co/blog/smollm'
      title: SmolLM - blazingly fast and remarkably powerful
  checks:
    - type: source_match
      result: pass
      summary: 정의랑 쓰임새 설명은 공식 SLM 소개 흐름과 맞춰 놨어.
      items:
        - >-
          독자 문제 대조: 이 페이지는 SLM을 단순히 작은 LLM이라고 끝내지 않고, 왜 기사에서 비용·속도·온디바이스 배포와 같이
          묶이는지 바로 이해하게 해 줘.
        - Microsoft 용어 설명이 강조하는 효율성과 작은 자원 풋프린트 방향을 반영했어.
      findings:
        - >-
          확인 출처:
          https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model
        - '보강 출처: https://huggingface.co/blog/smollm'
    - type: web_cross_check
      result: pass
      sources: 1
      summary: 두 출처 다 크기 자체보다 효율적 배포와 실사용성을 같이 잡고 있어.
      items:
        - '비교 기준: 파라미터 수가 작은지만이 아니라, 적은 자원에서 빠르게 돌린다는 실사용 맥락까지 공통으로 말하는지 봤어.'
        - 'Azure는 개념 정의를, Hugging Face는 실제 소형 모델 계열 사례를 보여 줘서 서로 보완돼.'
      findings:
        - SmolLM 소개는 소형 모델이 실제 제품군으로 쓰인다는 사례를 줘.
        - Azure 설명은 개념을 너무 협소하게 보지 않게 잡아 줘.
    - type: number_verify
      result: pass
      sources: 1
      summary: '본문에는 불필요한 벤치 수치를 안 넣고, 예시 규모는 공개된 모델 카드 수준에서만 잡았어.'
      items:
        - 'Hugging Face SmolLM 소개에는 135M, 360M, 1.7B 같은 소형 모델 크기 예시가 나온다.'
        - 페이지 본문은 특정 성능 점수를 단정하지 않아서 숫자 오버클레임을 피했어.
      findings:
        - '크기 예시는 제품군 이해용으로만 쓸 수 있고, 성능 우열 근거로 일반화하면 안 돼.'
    - type: adversarial
      result: pass
      summary: '가장 흔한 오해인 작은 모델=무조건 성능 낮음, 이걸 막는 방향으로 썼어.'
      items:
        - '오해 점검: 모델이 작아도 목표 작업이 좁고 배포 제약이 크면 오히려 더 실용적일 수 있어.'
        - 반대로 작은 모델이라는 이유만으로 로컬 배포가 자동으로 쉬워지는 것도 아니라는 점을 분리해 뒀어.
      findings:
        - 독자가 파라미터 수만 보고 실용성을 단정하지 않게 설계했어.
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
formatVersion: 2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "42282cdbc847fda5"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Small Language Model은 큰 언어 모델보다 훨씬 적은 파라미터와 자원으로 굴리도록 만든 언어 모델이야. [Azure 설명](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-small-language-model)과 [SmolLM 소개](https://huggingface.co/blog/smollm)를 같이 보면, 그냥 작다는 말보다 제한된 하드웨어에서 빠르고 싸게 쓰려는 전략이라는 점이 더 잘 보여.
## 어떻게 작동하나
보통은 [학습](/ko/wiki/training/) 데이터 선택을 더 빡세게 하거나 [distillation](/ko/wiki/distillation/), 구조 단순화, 경량화 같은 방법으로 모델 크기를 줄여. 공개 사례만 봐도 3개 대표 크기 예시가 바로 보일 정도로 폭이 넓어서, SLM은 단일 규격이라기보다 배포 제약에 맞춘 설계 묶음에 가까워.
## 왜 중요한가
현업에서는 최고 점수 모델보다 응답 속도와 운영비처럼 2개 기준이 더 중요할 때가 많아. 그래서 기사에서 SLM이 나오면 성능 대결 기사라기보다 배포 전략, 비용 절감, [로컬](/ko/wiki/local-llm/) 실행 얘기일 가능성이 더 커.
## 주의해서 볼 점
작다고 해서 무조건 실용적인 건 아니야. 같은 SLM이라도 목표 작업, [토크나이저](/ko/wiki/tokenizer/), [학습](/ko/wiki/training/) 데이터 질, [추론](/ko/wiki/inference/) 엔진에 따라 체감 성능 차이가 [커서](/ko/wiki/cursor/) 파라미터 수만 보고 판단하면 틀리기 쉬워.
## 관련 용어
- [quantization](/ko/wiki/quantization/): 이미 있는 모델을 더 적은 비트로 저장하고 계산하게 만들어서 메모리와 지연 시간을 줄이는 기법이야. 작은 모델을 만드는 전략과는 다르지만 실제 배포에서는 자주 같이 붙어.
- [distillation](/ko/wiki/distillation/): 큰 모델이 낸 패턴을 작은 모델이 따라 배우게 해서 성능 손실을 줄이려는 방법이야. SLM 문맥에서 가장 자주 같이 언급되는 압축 기법 중 하나야.
- [local-llm](/ko/wiki/local-llm/): 로컬 장치에서 모델을 직접 돌리는 배포 방식 쪽 표현이야. SLM은 그 방식을 가능하게 만드는 모델 크기 선택에 더 가깝다고 보면 돼.
- [prompt-caching](/ko/wiki/prompt-caching/): 반복되는 프롬프트 계산을 재사용해서 비용과 시간을 줄이는 기법이야. 모델 자체를 작게 만드는 SLM과는 다른 레이어의 최적화야.
