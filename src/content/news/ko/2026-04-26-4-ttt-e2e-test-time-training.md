---
title: "TTT-E2E — 추론 중에 모델 가중치를 다시 학습시키는 방법"
date: "2026-04-26T09:30:00+09:00"
lang: ko
category: news
summary: "Test-Time Training End-to-End는 긴 입력을 처리할 때 모델 일부 가중치를 추론 중에 다시 학습시키는 방식이야. 128K 컨텍스트에서는 2.7배, 2M 컨텍스트에서는 35배 빨라졌어. 대신 짧은 입력에서는 학습이 3.4배 느려지는 트레이드오프가 있어."
readerValue: "긴 컨텍스트 추론 비용을 낮추는 새 접근법이 어떤 트레이드오프를 가지는지, 자기 워크플로우에 맞는지 미리 평가할 수 있어."
sourceUrl: "https://arxiv.org/abs/2512.23675"
sourceTitle: "TTT-E2E (arXiv 2512.23675)"
draft: false
score: 90
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-26"
  sources:
    - url: "https://arxiv.org/abs/2512.23675"
      title: "TTT-E2E 논문 초록 — 1차 소스"
    - url: "https://ar5iv.labs.arxiv.org/html/2512.23675v2"
      title: "TTT-E2E HTML 본문 — Figure 1, §2.3.1, §3.3"
    - url: "https://developer.nvidia.com/blog/reimagining-llm-memory-using-context-as-training-data-unlocks-models-that-learn-at-test-time/"
      title: "NVIDIA Technical Blog — Reimagining LLM Memory"
  checks:
    - type: source_match
      result: pass
      summary: "arXiv 초록·본문과 NVIDIA Technical Blog 설명을 대조해 핵심 주장 출처를 분리"
      items:
        - "128K 2.7배 빠름 — arXiv 초록과 Figure 1 설명"
        - "마지막 1/4 블록의 MLP만 TTT 대상으로 둠 — arXiv HTML 본문 §2.3.1"
        - "2M 35배 빠름, 짧은 컨텍스트 8K에서 3.4배 느린 학습 — NVIDIA Technical Blog 명시"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "arXiv 초록, arXiv HTML 본문, NVIDIA Technical Blog 3곳 교차 확인"
      items:
        - "arXiv 초록: 128K에서 full attention 대비 더 빠르다는 핵심 주장 확인"
        - "arXiv HTML 본문: 마지막 1/4 블록만 업데이트한다는 구현 세부 확인"
        - "NVIDIA Technical Blog: 2M 35배, 8K에서 3.4배 느린 학습 수치 확인"
    - type: number_verify
      result: pass
      summary: "128K 수치는 논문, 2M·3.4배 수치는 NVIDIA Technical Blog 기준으로 구분해 확인"
      items:
        - "128K 컨텍스트 2.7배 빠름 — arXiv 초록·Figure 1 설명, H100 기준"
        - "2M 컨텍스트 35배 빠름 — NVIDIA Technical Blog Figure 1 설명, H100 기준"
        - "짧은 컨텍스트 8K에서 메타러닝 학습 3.4배 느림 — NVIDIA Technical Blog limitations"
    - type: adversarial
      result: pass
      summary: "추론 시 가중치 변경은 같은 모델이 호출마다 다른 답을 줄 수 있다는 점 본문 반영"
      items:
        - "테스트 환경이 H100 한정 — 다른 GPU에서는 다를 수 있음"
        - "추론 중 가중치 변경은 재현성 측면에서 의문 — 같은 입력이 다른 결과를 줄 가능성"
        - "짧은 컨텍스트 중심 워크로드에서는 8K 기준 3.4배 느린 학습 비용이 불리할 수 있음"
      findings:
        - "추론 시 학습이 들어가면 결정성(deterministic) 보장이 약해진다는 점 본문에 반영"
tags: ["llm", "long-context", "inference", "training", "research"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: "1.0.0"
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
  contentHash: "06df3bd8d29a5e93"
  reviewedAt: "2026-04-26"
---
## 무슨 일이 일어났나

[TTT-E2E 논문](https://arxiv.org/abs/2512.23675)은 [거대 언어 모델](/ko/wiki/llm/)이 긴 입력을 받을 때 [추론](/ko/wiki/inference/) 중에 모델 [웨이트](/ko/wiki/weight/) 일부를 다시 [학습](/ko/wiki/training/)시키는 방식을 제안해. 핵심은 [어텐션](/ko/wiki/attention/)을 전부 버리는 대신, 슬라이딩 윈도 구조 위에서 마지막 25% MLP 블록만 TTT 대상으로 두는 점이야.

- 논문 초록과 Figure 1 설명 기준으로, 3B 모델은 H100에서 128K 컨텍스트에서 full attention 대비 2.7배 빨랐어.
- 논문 본문 기준으로, TTT는 마지막 1/4 블록의 MLP만 업데이트하고 [어텐션](/ko/wiki/attention/)·embedding·normalization은 고정했어.
- NVIDIA Technical Blog 기준으로, 같은 결과 설명을 2M 컨텍스트까지 확장하면 full attention 대비 35배 빨랐어.
- 대신 NVIDIA Technical Blog는 짧은 컨텍스트 8K에서는 메타러닝 [학습](/ko/wiki/training/)이 표준 사전학습보다 3.4배 느리다고 적어.

## 왜 이게 일어났나

[거대 언어 모델](/ko/wiki/llm/)이 긴 입력을 받으면 정확도가 떨어지고 속도도 느려져. 특히 full [어텐션](/ko/wiki/attention/) 계산은 입력이 길어질수록 비용이 빠르게 커지니까 100만 토큰급 [긴 문맥](/ko/wiki/long-context/)을 처리하려면 자원이 폭증해. TTT-E2E는 "[긴 문맥](/ko/wiki/long-context/)은 일종의 데이터다. [추론](/ko/wiki/inference/) 중에 그 데이터로 모델 [웨이트](/ko/wiki/weight/) 일부를 다시 [학습](/ko/wiki/training/)시키자"는 발상이야. 모델 전체를 다시 학습시키지 않고 마지막 MLP 블록만 가변으로 두니까 비용 부담은 제한적이야.

## 어떤 의미인가

긴 문서나 큰 코드베이스 전체를 한 번에 [거대 언어 모델](/ko/wiki/llm/)에 넣는 워크플로우가 늘어나면서 이런 접근의 실무 가치는 분명해. 다만 판단 기준은 분리해서 보는 게 좋아.

- [긴 문맥](/ko/wiki/long-context/)이 핵심인 작업에서는 [추론](/ko/wiki/inference/) 비용 절감 효과가 클 수 있어.
- [추론](/ko/wiki/inference/) 중 [웨이트](/ko/wiki/weight/)가 바뀌면 같은 입력에서도 결과가 미세하게 달라질 수 있어서, 재현성이 중요한 작업은 별도 검토가 필요해.
- 짧은 입력 위주 워크로드라면 8K 기준 3.4배 느린 메타러닝 [학습](/ko/wiki/training/) 비용이 오히려 손해일 수 있어.
