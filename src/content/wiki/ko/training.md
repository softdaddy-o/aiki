---
term: training
title: "Training(학습)"
lang: ko
summary: "Training(학습)은 모델이 데이터를 보면서 내부 가중치를 바꾸는 과정이야. 이 개념을 잡아두면 성능 향상, 비용 증가, training-free 같은 말이 각각 어디를 가리키는지 바로 읽을 수 있어."
readerValue: "이 말을 알면 어떤 변화가 진짜 학습인지, 아니면 프롬프트 요령이나 추론 최적화인지 빠르게 가를 수 있어."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "training"
  - "Training"
relatedTerms:
  - adaptation
  - alignment
  - claude
  - concept
  - copilot
  - deep-learning
firstMentioned: "2025-01-20"
mentionCount: 11
draft: false
tags:
  - adaptation
  - alignment
  - claude
  - concept
  - copilot
factCheck:
  status: passed
  date: "2026-04-17"
  sources:
    - url: "https://arxiv.org/abs/2603.25737v1"
      title: "Training the Knowledge Base through Evidence Distillation and Write-Back Enrichment"
    - url: "https://arxiv.org/abs/2603.25702v1"
      title: "Secondary source"
    - url: "https://en.wikipedia.org/wiki/AI_alignment"
      title: "AI alignment"
  checks:
    - type: source_match
      result: pass
      summary: "입문 독자가 training을 성능 트릭으로 오해하지 않게, 가중치 업데이트 과정이라는 축으로 본문을 다시 맞춰봤어."
      items:
        - "독자 문제 대조: 입력 파일의 초점이 성능 트릭인지 비용 절감 방식인지 헷갈린다는 데 있어서, 첫 문장부터 training을 모델 자체를 바꾸는 학습 과정으로 못 박았어."
        - "제공된 논문 요약에 training-free 대비 표현이 보여서, 본문에서도 training은 가중치 업데이트가 있는 경우라는 경계선을 분명히 남겼어."
      findings:
        - "간접 출처가 많아서 특정 논문 용례보다 일반적인 ML 용례로 범위를 좁혀서 맞춰봤어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "제공된 웹 출처 셋을 나란히 놓고 training, training-free, alignment가 서로 다른 층위라는 점을 다시 봤어."
      items:
        - "비교 기준: training 자체 설명, training-free 대비 용례, alignment처럼 목표를 맞추는 개념을 나눠 보고 본문에서 역할을 섞지 않았어."
        - "arXiv 추상 두 건은 학습이 일어나는 경우와 학습 없이 속도를 높이는 경우를 대비해 보여 줘서, 본문 비교축을 세우는 데만 썼어."
        - "AI alignment 요약은 학습 목적과 모델 행동 조정이 연결될 수 있다는 맥락 확인용으로만 남겼어."
    - type: number_verify
      result: skip
      summary: "이 페이지엔 가격, 파라미터 수, 벤치마크처럼 오해하기 쉬운 숫자 주장을 안 넣어서 수치 검증 부담을 줄였어."
      items:
        - "가중치 수, GPU 시간, 비용 같은 숫자는 일반 정의 페이지에선 고정값이 아니라서 본문에서 빼뒀어."
        - "training을 설명하는 데 꼭 필요한 정량 수치가 없어서 숫자보다 과정 구분에 집중했어."
    - type: adversarial
      result: pass
      summary: "training을 프롬프트 요령이나 서비스 사용 로그와 바로 같은 말로 읽지 않게 일부러 비판적으로 다시 봤어."
      items:
        - "오해 점검: prompt engineering, RAG, 캐시 최적화는 보통 training이 아니라는 선을 본문에 남겼어."
        - "오해 점검: 사용자가 서비스에 질문했다고 그 대화가 자동으로 학습에 들어간다고 단정하지 않게 정책 분리 맥락을 넣었어."
      findings:
        - "training을 너무 넓게 쓰면 비용, 성능, 개인정보 이슈를 전부 같은 문제로 읽게 되는 위험이 남아 있어."
---
## 한 줄 정의
Training(학습)은 모델이 데이터 예시를 보면서 내부 가중치를 바꾸는 과정이야. 가중치는 모델이 어떤 패턴을 더 중요하게 볼지 정하는 숫자들이고, training은 그 숫자들을 반복해서 조정하는 일이야.
## 어떻게 작동하나
보통은 데이터를 여러 묶음으로 넣고 오차를 계산한 다음, 역전파와 옵티마이저로 가중치를 조금씩 움직여. 프리트레이닝, [파인튜닝](/ko/wiki/fine-tuning/), [RLHF](/ko/wiki/rlhf/)처럼 이름은 달라도 핵심은 모델 파라미터가 실제로 업데이트되느냐에 달려 있어.
## 왜 중요한가
모델 성격의 큰 부분은 training 단계에서 굳어져서, 어떤 데이터를 봤는지와 어떤 목표로 학습했는지가 나중 답변 스타일과 한계를 많이 좌우해. 기사에서 training cost, training run, training data라는 표현이 나오면 그건 서비스 실행 단계가 아니라 모델을 만드는 공장 쪽 이야기로 읽으면 돼.
## 주의해서 볼 점
모든 개선이 training은 아니야. 프롬프트를 잘 쓰는 일, RAG를 붙이는 일, 캐시나 [추론](/ko/wiki/inference/) 엔진을 최적화하는 일은 보통 가중치를 안 바꾸니까 training과는 다른 층위야. 또 사용자가 서비스에 질문했다고 그 대화가 자동으로 학습에 들어가는 것도 아니어서, 실제로는 수집 정책과 옵트인 여부를 따로 봐야 해.
## 관련 용어
- [Alignment](/ko/wiki/alignment/): alignment는 모델이 어떤 방향으로 답해야 하는지 기준을 맞추는 쪽이야. 그 기준을 실제 가중치 변화로 밀어 넣는 순간은 training 단계에서 자주 일어나.
- [Claude](/ko/wiki/claude/): Claude는 학습이 끝난 뒤 서비스로 쓰이는 모델 제품 이름이야. 그래서 Claude를 보는 일과 Claude가 어떻게 training됐는지를 보는 일은 같은 질문이 아니야.
- [GitHub Copilot](/ko/wiki/copilot/): Copilot은 training 과정 자체보다 학습된 모델을 개발 도구에 붙여 쓰는 제품에 가까워. Copilot 성능 이야기를 읽을 때도 뒤에는 training과 inference가 같이 숨어 있어.
- adaptation: adaptation은 모델을 새 환경에 맞추는 넓은 말이야. training은 그 적응을 실제 가중치 업데이트로 밀어붙이는 대표 방법 중 하나야.
- deep learning: deep learning은 여러 층의 신경망으로 패턴을 배우는 방식 전체를 가리켜. training은 그 신경망이 실제로 배우는 절차라고 보면 돼.