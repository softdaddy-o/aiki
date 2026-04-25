---
title: "TTT-E2E — 추론 중에 모델 가중치를 다시 학습시키는 방법"
date: "2026-04-26T09:30:00+09:00"
lang: ko
category: news
summary: "Test-Time Training End-to-End는 긴 입력을 처리할 때 모델 일부 가중치를 추론 중에 재학습시키는 방식이다. 128K 컨텍스트에서 2.7배, 2M 컨텍스트에서 35배 빨라졌다. 트레이드오프는 짧은 입력에서 학습이 3.4배 느려지는 점이다."
readerValue: "긴 컨텍스트 추론 비용을 낮추는 새 접근법이 어떤 트레이드오프를 가지는지, 자기 워크플로우에 맞는지 미리 평가할 수 있어."
sourceUrl: "https://arxiv.org/abs/2512.23675"
sourceTitle: "TTT-E2E (arXiv 2512.23675)"
draft: false
score: 90
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://arxiv.org/abs/2512.23675"
      title: "TTT-E2E 논문 — 1차 소스"
    - url: "https://www.deeplearning.ai/the-batch/tag/apr-03-2026/"
      title: "DeepLearning.AI The Batch — 4월 3일자"
  checks:
    - type: source_match
      result: pass
      summary: "arXiv 논문 본문과 The Batch 요약 비교"
      items:
        - "128K 2.7배, 2M 35배 — arXiv 논문 명시"
        - "MLP 레이어를 마지막 25% 블록에서 가변화 — 논문 명시"
        - "단점: 짧은 입력에서 3.4배 느린 학습 — 논문 명시"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "arXiv, The Batch, Reddit 3곳 교차 확인"
      items:
        - "arXiv: 1차 소스 논문"
        - "The Batch: 4월 3일자 요약 게재"
        - "Reddit r/MachineLearning 관련 토론 발견"
    - type: number_verify
      result: pass
      summary: "성능 수치와 측정 환경 논문에서 직접 확인"
      items:
        - "128K 컨텍스트 2.7배 빠름 — H100 기준"
        - "2M 컨텍스트 35배 빠름 — H100 기준"
        - "짧은 입력 학습 3.4배 느림 — 트레이드오프 명시"
    - type: adversarial
      result: pass
      summary: "추론 시 가중치 변경은 같은 모델이 호출마다 다른 답을 줄 수 있다는 점 본문 반영"
      items:
        - "테스트 환경이 H100 한정 — 다른 GPU에서는 다를 수 있음"
        - "추론 중 가중치 변경은 재현성 측면에서 의문 — 같은 입력이 다른 결과를 줄 가능성"
        - "짧은 입력에서 3.4배 느린 학습은 양쪽 모두에 부담"
      findings:
        - "추론 시 학습이 들어가면 결정성(deterministic) 보장이 약해진다는 점 본문에 반영"
tags: ["llm", "long-context", "inference", "training", "research"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[TTT-E2E 논문](https://arxiv.org/abs/2512.23675)이 흥미로운 접근을 보여줬어. LLM이 긴 입력을 받을 때, 추론 중에 모델 가중치 일부를 다시 학습시키는 방식이야. MLP 레이어 중에서도 마지막 25% 블록만 가변으로 만들고, 나머지는 그대로 둬. 결과는 H100에서 측정했을 때 128K 컨텍스트 기준 2.7배, 2M 컨텍스트 기준 35배 빨라졌어. 트레이드오프는 짧은 입력에서는 학습이 3.4배 느려진다는 점이야.

## 왜 이게 일어났나

LLM이 긴 입력을 받으면 정확도가 떨어지고 속도도 느려져. 특히 attention 계산은 입력 길이의 제곱으로 늘어나니까 100만 토큰을 처리하려면 자원이 폭증해. TTT-E2E는 "[긴 컨텍스트](/ko/wiki/long-context/)는 일종의 데이터다 — 추론 중에 그 데이터로 모델을 살짝 학습시키자"는 발상이야. 모델 전체를 다시 학습시키지 않고 마지막 MLP 블록만 가변으로 두니까 비용 부담은 제한적이야.

## 어떤 의미인가

긴 문서나 큰 코드베이스 전체를 한 번에 LLM에 넣어서 작업하는 워크플로우가 늘어나면서 효율 문제가 더 커지고 있어. TTT-E2E 같은 접근은 그 압박에서 나온 거야. 다만 추론 중에 가중치가 바뀐다는 건 같은 입력에 대해 결과가 미세하게 달라질 수 있다는 의미고, 재현성이 중요한 작업에서는 따로 검토가 필요해. 짧은 입력에서 학습이 3.4배 느려지는 트레이드오프도 워크로드 특성에 따라 평가해야 할 부분이야.
