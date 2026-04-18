---
term: e2b
title: "E2B (이투비)"
lang: ko
summary: "E2B는 Gemma 문서군에서 쓰는 E 표기야. 쉽게 말해 모델을 실제 기기에 올렸을 때 체감 부담을 어느 정도로 읽어야 하는지 알려 주는 숫자라고 보면 돼."
readerValue: "E2B를 보면 total parameters, 활성 파라미터, 효율 표기가 왜 서로 다른 숫자인지 비교할 수 있고, 그 차이가 온디바이스 배포 판단에 어떤 힌트를 주는지도 빠르게 정리할 수 있어."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "E2B"
relatedTerms:
  - gemma-4
  - mixture-of-experts
  - inference
  - token
  - on-device
  - quantization
firstMentioned: "2026-04-05T13:00:00+09:00"
mentionCount: 5
draft: false
tags:
  - gemma
  - model-size
  - multimodal
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://ai.google.dev/gemma/docs/gemma-3n"
      title: "Gemma 3n model overview"
    - url: "https://ai.google.dev/gemma/docs/releases"
      title: "Gemma releases"
    - url: "https://ai.google.dev/gemma/docs/core/model_card_4"
      title: "Gemma 4 model card"
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: "본문의 두 핵심 주장만 따로 맞춰 봤어."
      items:
        - "Gemma 3n overview는 E2B와 E4B를 효율 표기로 설명한다."
        - "후속 세대 카드는 Dense section의 E 표기와 MoE section의 `26B A4B`를 나눠 적어 다른 질문에 답하게 만든다."
      findings:
        - "이 페이지는 E2B를 모델명보다 숫자 읽기 규칙으로 설명하는 쪽이 맞다."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "세 문서를 같은 비교 프레임에 놓고 읽었어."
      items:
        - "releases는 2025-06-26에 Gemma 3n E2B/E4B를 기록한다."
        - "같은 카드는 Dense section의 E2B/E4B와 MoE section의 `26B A4B`를 함께 보여 줘서 효율 표기와 A 표기를 분리한다."
      findings:
        - "독자는 E2B를 Gemma 3n 전용 별칭으로만 읽으면 부족하고, Gemma 4에서도 이어지는 숫자 해석 규칙으로 읽어야 한다."
    - type: number_verify
      result: pass
      sources: 3
      summary: "본문에 쓰인 숫자만 다시 확인했어."
      items:
        - "Gemma 3n overview에는 effective memory load 1.91B와 32K context length가 적혀 있다."
        - "후속 세대 카드에는 Dense section의 E2B/E4B/31B와 MoE section의 26B A4B가 함께 적혀 있다."
      findings:
        - "임의의 메모리 추정치나 칩셋 성능 수치는 넣지 않았다."
    - type: adversarial
      result: pass
      sources: 3
      summary: "가장 흔한 오해 두 가지를 먼저 막았어."
      items:
        - "E2B를 활성 파라미터와 같은 뜻으로 읽으면 안 된다."
        - "E2B를 [quantization](/ko/wiki/quantization/) 같은 최적화 기법 이름으로 읽는 것도 틀리다."
      findings:
        - "이 숫자를 잘못 읽으면 [on-device](/ko/wiki/on-device/) 배포 기대치도 같이 어긋난다."
---

## 한 줄 정의

E2B는 [Gemma](/ko/wiki/gemma/) 문서군에서 쓰는 E 표기야. 초심자 기준으로 풀면 "이 모델을 실제 기기에 올렸을 때 체감 부담을 어느 정도로 봐야 하냐"에 답하려는 숫자라고 보면 돼.

## 설명

이 표기가 중요한 이유는 모델 숫자가 하나만 있지 않기 때문이야. 어떤 문서에는 total parameters가 나오고, 어떤 문서에는 활성 파라미터가 나오고, Gemma 3n과 [Gemma 4](/ko/wiki/gemma-4/) small dense 문서처럼 효율 배포를 강조하는 문서에는 E 표기가 따로 붙어. 그래서 E2B를 보면 "파라미터 총량이 얼마냐"보다 "실제 [inference](/ko/wiki/inference/) 비용과 [memory](/ko/wiki/memory/) 적재를 어떤 감각으로 설명하려는가"를 먼저 읽어야 해.

Gemma 3n overview는 E2B/E4B를 everyday devices 문맥과 함께 설명하고, 같은 문서에서 effective memory load 1.91B와 32K [token](/ko/wiki/token/) context를 같이 적어 둬. 후속 세대 카드는 Dense section에서 E2B/E4B/31B를, [Mixture of Experts](/ko/wiki/mixture-of-experts/) section에서 `26B A4B`를 따로 제시해 같은 카드 안에서도 효율 표기와 A 표기를 분리해 읽게 만들어. 여기서 E는 체감 배포 부담 축이고, A는 실행 시 켜지는 파라미터 축이라 질문 자체가 다르다는 점이 핵심이야.

| 표기 | 읽는 질문 | 예시 |
| --- | --- | --- |
| total parameters | 모델이 전체로 얼마나 큰가 | 총 파라미터 수 |
| 활성 파라미터 | 실행 시 실제로 켜지는 양이 얼마나 되는가 | MoE section의 `26B A4B` |
| 효율 표기 | 효율 배포 기준으로 체감 부담이 어느 정도인가 | Gemma 3n과 Dense section의 `E2B`, `E4B` |

## 왜 중요한가

뉴스나 릴리스 노트에서 E2B/E4B 같은 표기를 보면, 그건 대개 [on-device](/ko/wiki/on-device/)나 경량 배포 가능성을 같이 보라는 신호야. 그래서 E2B를 이해하면 "작다"는 표현이 정말 파라미터 총량을 뜻하는지, 아니면 효율 배포 감각을 뜻하는지 구분하기 쉬워져.

실무에서도 바로 영향이 있어. 모바일이나 엣지 기기 배포를 검토할 때는 숫자 하나만 보지 않고 입력 형태, 컨텍스트 길이, [runtime](/ko/wiki/runtime/) 구성, 메모리 예산, [quantization](/ko/wiki/quantization/) 여부를 같이 봐야 하거든. 배포 계획을 세울 때는 E2B를 "이 문서가 효율 배포 쪽 이야기를 하고 있다"는 신호로 사용하면 돼.

## 주의할 점

가장 흔한 오해는 E2B를 활성 파라미터와 같은 뜻으로 읽는 거야. 같은 후속 카드의 `26B A4B`는 실행 시 켜지는 양을 보여 주는 표기이고, E2B는 Gemma 3n 문맥에서 효율 배포 감각을 전달하는 표기야. 둘 다 숫자지만 같은 질문에 답하는 라벨이 아니야.

또 E2B를 [quantization](/ko/wiki/quantization/) 같은 최적화 기법 이름으로 읽으면 안 돼. E2B는 문서가 붙인 해석용 숫자이고, quantization은 실제 저장 형식과 계산 방식을 바꾸는 기법이야. 마찬가지로 E2B가 붙어 있다고 해서 곧바로 모든 기기에서 배포가 쉽다는 보장도 아니야.

## 관련 용어

- [Gemma 4](/ko/wiki/gemma-4/): 작은 dense 모델과 다른 구조를 비교할 때 가장 바로 이어지는 문맥이야.
- [Mixture of Experts](/ko/wiki/mixture-of-experts/): `26B A4B`처럼 A 표기가 왜 따로 보이는지 이해할 때 필요해.
- [Inference](/ko/wiki/inference/): E 표기가 실제 추론 비용 이야기로 어떻게 이어지는지 볼 때 같이 읽기 좋아.
- [Token](/ko/wiki/token/): 32K 같은 컨텍스트 길이 숫자가 별도 축이라는 점을 분리해 준다.
- [On-device](/ko/wiki/on-device/): E2B가 왜 작은 기기 배포 이야기와 자주 같이 나오는지 연결해 준다.
- [Quantization](/ko/wiki/quantization/): 숫자 표기와 최적화 기법을 섞어 읽지 않게 도와준다.
