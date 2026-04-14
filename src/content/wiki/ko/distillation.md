---
term: distillation
title: "Distillation (지식 증류)"
lang: ko
summary: "Distillation은 큰 모델이 내놓는 답변 패턴을 작은 모델이 배우게 해서, 품질을 최대한 유지하면서 비용과 지연 시간을 줄이려는 학습 기법이야."
readerValue: "이 용어는 단순한 성능 꼼수가 아니라, 큰 모델의 행동을 작은 모델로 옮겨 운영비와 응답 속도를 낮추는 학습 단계의 기법이라는 점을 구분하게 해줘."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "knowledge distillation"
relatedTerms:
  - pytorch
  - quantization
  - alignment
  - fine-tuning
firstMentioned: "2026-03-23"
mentionCount: 5
draft: false
tags:
  - training
  - efficiency
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Knowledge_distillation"
      title: "Knowledge distillation"
    - url: "https://platform.openai.com/docs/guides/distillation"
      title: "Supervised fine-tuning | OpenAI API"
  checks:
    - type: source_match
      result: pass
      summary: "제공된 출처 요약과 문서의 핵심 주장 범위를 맞춰봤어."
      items:
        - "독자 문제 대조: 이 문서가 distillation을 성능 트릭이 아니라 큰 모델의 지식을 작은 모델로 옮겨 비용과 지연 시간을 줄이는 학습 기법으로 설명하는지 확인했어."
        - "위키피디아 요약과 맞게 큰 모델에서 작은 모델로 지식을 전달한다는 점을 본문 중심 정의에 반영했어."
        - "OpenAI 문서 요약과 맞게 실제 적용 맥락을 예시 입력과 좋은 출력으로 작은 모델을 다듬는 학습 흐름 쪽으로 설명했어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "두 출처 요약이 서로 크게 어긋나지 않는지 다시 봤어."
      items:
        - "비교 기준: distillation을 모델 압축 일반론이 아니라, 큰 모델의 출력이나 행동을 작은 모델이 배우는 방식으로 볼 수 있는지 대조했어."
        - "위키피디아 요약은 큰 모델에서 작은 모델로 지식을 옮겨 더 싼 하드웨어에서 돌릴 수 있다는 점을 강조하고, OpenAI 문서 요약은 좋은 입력-출력 예시를 이용해 효율을 높인다는 실무 흐름을 보여줘서 서로 보완적이었어."
        - "두 출처 모두 distillation을 단순 추론 설정 변경이나 런타임 옵션이 아니라 학습 단계의 방법으로 읽는 데 무리가 없었어."
    - type: number_verify
      result: pass
      summary: "수치처럼 읽힐 만한 표현은 한 번 더 봤어."
      items:
        - "특정 압축 비율, 비용 절감률, 성능 향상 수치처럼 출처 없이 단정할 숫자는 넣지 않았어."
        - "mentionCount나 firstMentioned 같은 메타데이터는 문서 본문 주장에 필요하지 않아서 설명에서 제외했어."
        - "'더 싸다', '더 빠르다' 같은 표현은 방향 설명으로만 쓰고, 구체 수치는 주장하지 않았어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 반례와 오해 가능성도 한 번 더 봤어."
      items:
        - "distillation을 quantization과 같은 기술처럼 섞어 쓰지 않도록 둘의 단계와 목적 차이를 분리했어."
        - "distillation이 항상 품질을 유지한다고 과장하지 않고, 학생 모델이 능력을 일부 잃을 수 있다는 한계를 넣었어."
        - "fine-tuning과의 관계를 포괄 개념과 특수 사례의 차이로 설명해서, 둘을 동의어처럼 읽지 않게 정리했어."
      findings:
        - "'작은 모델이 항상 큰 모델을 거의 그대로 재현한다'는 오해를 피하려고 성능 손실 가능성을 분명히 적었어."
        - "'비용 절감 기법이니 학습 없이 바로 적용된다'는 오해를 막으려고 distillation이 학습 파이프라인에 붙는다는 점을 분리해서 설명했어."
---
## 한 줄 정의
Distillation은 큰 모델의 출력 방식이나 판단 경향을 더 작은 모델에 학습시켜, 비슷한 일을 더 싸고 가볍게 하게 만드는 기법이야. 핵심은 모델을 그냥 줄이는 게 아니라, 큰 모델이 이미 배운 행동을 작은 모델에 옮긴다는 데 있어.
## 어떻게 작동하나
보통 먼저 성능이 좋은 큰 모델을 준비하고, 그 모델이 입력에 대해 낸 답이나 확률 분포를 작은 모델의 학습 목표로 써. 작은 모델은 정답 데이터만 외우는 대신 큰 모델의 답변 스타일과 판단 순서를 함께 따라가면서 배워서, 같은 크기의 일반 학습보다 더 나은 품질을 노릴 수 있어.
실무에서는 이 과정을 별도 학습 파이프라인에 붙이는 경우가 많아. 예를 들어 큰 모델로 좋은 예시를 대량 생성한 뒤 그 데이터를 가지고 작은 모델을 미세조정하거나, 교사 모델과 학생 모델의 출력을 직접 맞추는 식으로 진행해.
## 왜 중요한가
이 기법이 중요한 이유는 성능과 비용을 한 번에 다루기 때문이야. 큰 모델은 보통 잘하지만 느리고 비싸고, 작은 모델은 싸고 빠르지만 성능이 부족한데, distillation은 그 사이 간극을 줄이려는 현실적인 방법이야.
실무에서는 특히 배포 단계에서 의미가 커. 모바일, 온디바이스, 고트래픽 API, 대량 배치 처리처럼 추론 비용이 계속 쌓이는 환경에서는 모델 한 번의 응답 단가와 지연 시간이 바로 운영비로 이어지기 때문이야. 기사나 제품 문서에서 distillation이 보이면, 새 아키텍처를 발명했다기보다 큰 모델의 성능 일부를 더 작은 모델로 옮겨 서비스 단가를 낮추려는 맥락인지 먼저 읽는 게 맞아.
## 주의해서 볼 점
Distillation이 항상 공짜 이득을 주는 건 아니야. 교사 모델이 잘못 답한 내용을 그대로 따라 배울 수도 있고, 학생 모델이 작을수록 복잡한 추론 능력이나 드문 상황 대응력은 놓칠 수 있어.
또 distillation은 quantization처럼 저장 형식만 바꾸는 최적화와 다르다. quantization은 이미 있는 모델을 더 가볍게 실행하려는 쪽에 가깝고, distillation은 아예 작은 모델을 다시 학습시키는 과정이 중심이야. 그래서 문서에서 둘이 같이 나오더라도 같은 단계의 기술이라고 보면 틀릴 수 있어.
## 관련 용어
- [PyTorch](/ko/wiki/pytorch/) — distillation 자체가 개념이라면, PyTorch는 그 개념을 실제 학습 코드로 옮길 때 자주 쓰는 프레임워크야. 즉 PyTorch는 도구이고, distillation은 그 도구 위에서 구현하는 학습 전략이야.
- [Quantization](/ko/wiki/quantization/) — distillation은 큰 모델의 행동을 작은 모델에 학습시키는 방법이고, quantization은 모델의 수치 표현을 줄여 더 가볍게 실행하는 방법이야. 전자는 학습 단계의 지식 이전, 후자는 배포 단계의 계산 최적화에 더 가깝다.
- [Alignment](/ko/wiki/alignment/) — alignment는 모델이 사람 의도나 정책에 맞게 행동하도록 조정하는 문제를 다뤄. distillation은 그보다 좁게, 이미 있는 모델의 출력을 다른 모델에 옮기는 데 초점이 있어.
- [Fine-tuning](/ko/wiki/fine-tuning/) — fine-tuning은 추가 데이터로 모델을 특정 작업에 맞게 다듬는 큰 범주고, distillation은 그 안에서 교사 모델의 출력을 학습 신호로 쓰는 특수한 경우로 볼 수 있어. 그래서 distillation은 fine-tuning과 겹치기도 하지만, 아무 fine-tuning이나 distillation인 건 아니야.