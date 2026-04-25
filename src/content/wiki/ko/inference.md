---
term: inference
title: "Inference (추론)"
lang: ko
summary: "Inference는 학습이 끝난 모델이 실제 입력을 받아 답을 만드는 실행 단계야. AI 서비스를 읽을 때 비용, 지연 시간, 처리량이 왜 계속 같이 언급되는지 이해하려면 이 개념부터 먼저 잡아두면 돼."
readerValue: "추론을 학습이나 추론 모델과 헷갈리지 않고, 실제 서비스 운영에서 왜 GPU 비용과 응답 속도 문제가 함께 따라오는지 바로 연결해서 이해할 수 있어."
category: concept
aliases:
  - "model inference"
  - "추론"
  - "모델 추론"
relatedTerms:
  - runtime
  - vllm
  - sglang
  - triton
  - reasoning
firstMentioned: "2025-01-20"
mentionCount: 40
draft: false
tags:
  - serving
  - runtime
  - deployment
factCheck:
  status: passed
  date: "2026-04-16"
  sources:
    - url: "https://developers.google.com/machine-learning/glossary#inference"
      title: "Machine Learning Glossary | Google for Developers"
    - url: "https://huggingface.co/docs/text-generation-inference/main/en/conceptual/what_is_tgi"
      title: "What is Text Generation Inference? | Hugging Face"
  checks:
    - type: source_match
      result: pass
      summary: "공식 용어집과 추론 서버 문서가 모두 inference를 학습 이후의 실행 단계로 설명하는지 먼저 봤어."
      items:
        - "독자 문제 대조: inference를 reasoning이랑 같은 뜻으로 읽기 쉬운데, 여기서는 학습이 끝난 모델을 실제로 돌리는 단계라는 점부터 갈라 봤어."
        - "Google 머신러닝 용어집은 inference를 학습된 모델이 예측을 수행하는 단계로 정의하고 있어."
        - "Hugging Face TGI 문서도 추론을 실제 요청을 처리하는 서빙 단계로 다루고 있어."
        - "본문에서 학습과 서비스 실행 단계를 분리한 설명이 두 출처와 맞아."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "서로 다른 출처가 모두 추론 비용과 지연 시간 같은 운영 지표를 inference와 함께 다루는지 다시 봤어."
      items:
        - "비교 기준: 한쪽은 개념 정의, 다른 한쪽은 추론 서버 운영 문맥을 다루니까 둘이 같은 방향을 가리키는지 맞춰 봤어."
        - "용어집은 개념 정의에 집중하고, 추론 서버 문서는 실제 운영 맥락을 보완해."
        - "둘 다 inference를 모델 내부 능력이 아니라 서비스 실행 과정으로 보고 있어."
        - "AI 기사에서 추론 비용과 추론 지연 시간이 같이 붙는 이유를 설명하는 데 충분한 근거가 돼."
    - type: number_verify
      result: pass
      summary: "고정 성능 수치를 임의로 넣지 않고, 실제 기사에서 반복적으로 붙는 운영 지표만 남겼는지 다시 확인했어."
      items:
        - "응답 시간, 처리량, GPU 메모리 사용량은 추론 문맥에서 반복적으로 쓰이는 대표 지표야."
        - "예시 문장에 1초 안쪽 응답이나 동시 100건 처리 같은 운영 상황을 넣더라도, 실제 제품 수치로 단정하지 않게 조심했어."
        - "환경에 따라 달라지는 수치를 임의로 박지 않아서 과장 위험을 줄였어."
    - type: adversarial
      result: pass
      summary: "초보자가 자주 하는 오해가 뭔지 먼저 적고, 본문이 그 오해를 분리해서 설명하는지 다시 봤어."
      items:
        - "Inference를 reasoning과 같은 뜻으로 읽는 경우가 많지만, 여기서는 서비스 실행 단계라는 뜻이야."
        - "Inference 최적화가 모델 자체를 더 똑똑하게 만드는 일이라고 오해하기 쉽지만, 보통은 더 싸고 빠르게 돌리는 문제에 가까워."
      findings:
        - "추론은 모델의 사고 방식보다 실행 비용과 응답 경로를 이해하는 데 더 가까운 개념이야."
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
  contentHash: "92462ef85e3210fd"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의

Inference는 학습이 끝난 모델을 실제로 돌려 답을 만드는 단계야. 사용자가 질문을 보내고 모델이 답을 돌려주는 순간, 이미지 생성 모델이 프롬프트를 받아 결과물을 만드는 순간, 음성 모델이 소리를 텍스트로 바꾸는 순간이 모두 추론에 해당해.

쉽게 말하면 학습이 모델을 만드는 과정이라면, 추론은 만든 모델을 실제로 돌려 쓰는 과정이야. 그래서 기사에서 `추론 비용`, `추론 지연 시간`, `추론 서버` 같은 표현이 나오면 거의 항상 배포와 운영 문맥으로 읽으면 돼.

## 실제로 무엇을 하나

실제 서비스에서는 모델을 한 번 실행하는 일보다, 많은 요청을 얼마나 안정적으로 처리하느냐가 더 큰 문제야. 추론 단계에서는 요청을 어떤 순서로 묶을지, GPU 메모리를 어떻게 아낄지, 긴 답변을 얼마나 지연 없이 스트리밍할지가 바로 비용과 성능으로 이어져.

예를 들어 챗봇 서비스는 사용자가 몰리는 시간대에 응답이 느려질 수 있어. 이때 병목은 모델을 다시 학습해야 해서가 아니라, 추론 경로가 현재 트래픽을 감당하지 못해서 생기는 경우가 많아. 반대로 사내 문서 검색 도구처럼 응답이 조금 느려도 정확도가 더 중요한 서비스는, 추론 속도보다 더 큰 컨텍스트를 처리하는 쪽을 우선할 수 있어.

숫자로 감각을 잡아보면 더 쉬워. 1초 안쪽 응답이 중요한 서비스와 5초 정도 걸려도 긴 답을 주는 분석 도구는, 같은 모델을 써도 추론 설계가 달라져. 동시 요청도 10건 수준인지 100건 이상인지에 따라 배치 처리 전략이 달라져.

## 왜 중요한가

먼저 `training`과 구분해야 해. 학습은 모델의 가중치를 업데이트하는 과정이고, 추론은 이미 학습된 모델을 실행하는 과정이야. 둘 다 GPU를 쓰지만 목적과 비용 구조가 달라.

또 [Reasoning Model](/ko/wiki/reasoning/)과도 구분해야 해. `reasoning`은 문제를 풀기 위해 더 긴 사고 경로를 쓰는 모델 특성을 가리키는 경우가 많고, `inference`는 그 모델이 실제 서비스에서 실행되는 단계를 뜻해. 즉 추론 모델은 모델의 성격이고, inference는 실행 단계야.

마지막으로 [Runtime](/ko/wiki/runtime/)과의 관계도 알아둘 만해. 런타임은 추론을 실제 시스템에서 수행하게 만드는 실행 환경이고, inference는 그 환경 안에서 일어나는 작업 자체야. [vLLM](/ko/wiki/vllm/), [SGLang](/ko/wiki/sglang/), [Triton](/ko/wiki/triton/) 같은 도구가 자주 같이 언급되는 이유도 여기에 있어.

AI 서비스는 모델 자체 성능만으로 결정되지 않아. 같은 모델이라도 추론 경로를 어떻게 설계했는지에 따라 응답 속도, 동시 처리량, 운영 비용이 크게 달라져. 그래서 기업 기사에서 `추론 최적화`, `추론 인프라`, `추론 서버`라는 말이 자주 보이면, 대개는 모델을 더 새로 만드는 이야기보다 현재 모델을 더 싸고 빠르게 서비스하는 이야기일 가능성이 높아.

이 개념을 알고 있으면 뉴스도 훨씬 빨리 읽혀. 어떤 회사가 추론 비용을 줄였다고 말하면 모델 자체가 좋아졌다는 뜻인지, 아니면 같은 모델을 더 효율적으로 배포했다는 뜻인지 구분할 수 있어. 또 새로운 추론 엔진이나 서빙 프레임워크가 등장했을 때, 그게 연구 성과가 아니라 운영 생산성 개선이라는 점도 더 쉽게 잡혀.

## 관련 용어

- [Runtime](/ko/wiki/runtime/)은 추론이 실제 어디서 실행되는지 이해할 때 같이 보면 좋아.
- [vLLM](/ko/wiki/vllm/), [SGLang](/ko/wiki/sglang/), [Triton](/ko/wiki/triton/)은 추론을 더 효율적으로 처리하는 대표 도구들이야.
- [Reasoning Model](/ko/wiki/reasoning/)은 실행 단계가 아니라 모델의 문제 해결 방식이라는 점에서 대비해 볼 만해.
