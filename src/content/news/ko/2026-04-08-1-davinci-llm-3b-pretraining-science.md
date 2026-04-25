---
title: daVinci-LLM-3B, 3B 모델로 7B급 성능에 근접한 공개 사전학습 실험
date: "2026-04-08T11:30:00+09:00"
lang: ko
category: news
summary: SII-GAIR가 daVinci-LLM-3B를 공개했다. 3.09B 파라미터 모델인데도 19개 벤치 평균 51.72로 OLMo-3 7B와 비슷한 수준을 보였고, 가중치만이 아니라 8T 토큰 학습 과정과 200개 넘는 ablation 결과까지 함께 공개했다.
readerValue: 이 모델이 화제성 공개인지 실제 배포 후보인지 빠르게 판단하는 데 도움이 된다.
sourceUrl: https://huggingface.co/SII-GAIR-NLP/davinci-llm-model
sourceTitle: Hugging Face / arXiv
draft: false
score: 105
factCheck:
  status: passed
  date: "2026-04-08"
  sources:
    - url: https://huggingface.co/SII-GAIR-NLP/davinci-llm-model
      title: Hugging Face model card
    - url: https://arxiv.org/abs/2603.27164
      title: "arXiv: daVinci-LLM: Towards the Science of Pretraining"
  checks:
    - type: source_match
      result: pass
      summary: 이 글이 실제로 같은 사건과 제품을 가리키는지부터 먼저 확인해뒀어.
      items:
        - 독자가 먼저 갈라 봐야 할 건 이 모델이 화제성 공개인지 실제 배포 후보인지.
        - 제목부터 다시 보면 기사 제목은 "daVinci-LLM-3B, 3B 모델로 7B급 성능에 근접한 공개 사전학습 실험"이고, 원문 제목은 "Hugging Face / arXiv"로 잡혔어.
        - 출처를 다시 보면 대표 원문 도메인은 huggingface.co로 잡혔어.
        - 이 글의 축을 다시 보면 이 글의 핵심 축은 llm, pretraining, open-model, hugging-face로 읽었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 원문 하나만 믿지 않으려고 관련 출처 2건을 옆에 두고 비교해뒀어.
      items:
        - 여기서 먼저 갈라 볼 기준은 이 모델이 화제성 공개인지 실제 배포 후보인지.
        - 같이 본 출처로는 Hugging Face model card (https://huggingface.co/SII-GAIR-NLP/davinci-llm-model)
        - "같이 본 출처로는 arXiv: daVinci-LLM: Towards the Science of Pretraining (https://arxiv.org/abs/2603.27164)"
    - type: number_verify
      result: pass
      summary: 헷갈리기 쉬운 숫자와 고유 명칭은 따로 떼어 검증해뒀어.
      items:
        - 숫자를 다시 보면 원문에서 다시 본 숫자나 버전 표기는 daVinci-LLM-3B, 3B, 7B, 3.09B 쪽이야.
        - 이름처럼 보이는 숫자 표기는 버전명인지 실제 스펙인지 따로 갈라서 읽었어.
    - type: adversarial
      result: pass
      summary: 독자가 너무 크게 믿거나 잘못 읽기 쉬운 지점은 따로 의심해보고 걸러뒀어.
      items:
        - 제목의 강한 표현이 실제 영향 범위를 과장하지 않는지 먼저 다시 봤어.
        - 출처 성격상 주장과 해석을 분리해서 독자가 바로 써먹을 판단 기준만 남겼어.
      findings: []
tags:
  - llm
  - pretraining
  - open-model
  - hugging-face
  - research
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
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
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "0fcbdbe8f80b2c65"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

오픈 모델 얘기가 나올 때 늘 아쉬운 지점이 있잖아. 가중치는 공개됐는데, 정작 어떻게 학습했는지는 거의 안 보이는 경우가 많다는 거야. [daVinci-LLM-3B](https://huggingface.co/SII-GAIR-NLP/davinci-llm-model)는 그 빈칸을 메우겠다고 나온 쪽에 가까워.

SII-GAIR가 공개한 이 모델은 Qwen2 계열의 decoder-only [Transformer](/ko/wiki/transformer/) 기반이고, 파라미터는 약 3.09B야. 그런데 포인트는 크기보다 공개 범위야. 최종 가중치만 올린 게 아니라 훈련 궤적, 중간 체크포인트, 데이터 처리 결정, 그리고 200개가 넘는 ablation 결과까지 같이 열어놨어. 사전학습을 "결과물"이 아니라 "재현 가능한 연구 과정"으로 보여주겠다는 접근이야.

## 왜 중요할까

[학습](/ko/wiki/training/) 규모도 작지 않아. [Hugging Face](/ko/wiki/hugging-face/) 모델 카드와 arXiv 논문 기준으로 이 모델은 약 8T 토큰을 두 단계로 학습했어. 1단계는 6T [토큰](/ko/wiki/token/) 규모의 범용 웹 코퍼스 프리트레이닝이고, 2단계는 2T [토큰](/ko/wiki/token/) 규모의 QA와 [reasoning](/ko/wiki/reasoning/) 중심 데이터로 수학·코드 추론을 더 밀어 올리는 구조야. 논문은 이 과정을 설명하면서 데이터 정제 강도를 L0부터 L9까지 나누는 "Data Darwinism" 프레임도 같이 제시해.

성능도 눈에 띄어. 공개된 평가표를 보면 daVinci-LLM-3B는 19개 벤치 평균 51.72를 기록했어. 같은 표에서 OLMo-3 7B는 51.65, [Qwen](/ko/wiki/qwen/)-2.5-3B는 51.44였고, 수학 점수는 62.80으로 OLMo-3 7B의 39.60보다 높게 나왔어. 코드 생성도 55.99로 OLMo-3 7B의 54.42를 약간 넘겼고. 3B 모델이 7B급 결과에 근접하는 장면 자체보다 더 중요한 건, 이런 결과가 어떤 데이터 처리와 커리큘럼에서 나왔는지를 연구자가 그대로 따라가 볼 수 있게 했다는 점이야.

## 앞으로 볼 점

다만 바로 서비스형 모델로 받아들이면 곤란해. 모델 카드에도 이 모델은 instruction- or safety-aligned 모델이 아니라고 분명히 적혀 있어. 그러니까 지금 단계에선 "바로 써먹는 완성형 챗봇"이라기보다, 사전학습을 어떻게 설계해야 작은 모델에서도 성능 상한을 끌어올릴 수 있는지 보여주는 공개 실험장에 더 가깝다고 보는 편이 맞아.
