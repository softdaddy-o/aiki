---
title: '구글, Gemma 4 E2B·E4B 공개…로컬 실행 겨냥 엣지 모델'
date: '2026-04-22T11:00:00+09:00'
lang: ko
category: news
summary: >-
  구글이 Gemma 4에 E2B·E4B 엣지 모델을 같이 올렸어. 공식 LiteRT 카드 기준 E2B는 일부 환경에서 1.5GB 안팎까지
  내려가고, E4B는 3GB대 실측이 먼저 보여서 로컬 보조 작업 자리에 바로 넣어볼 만해.
readerValue: >-
  클라우드 API 대신 기기 안에서 돌릴 Gemma 4 소형 모델을 고를 때, 확인된 메모리 범위와 맡길 만한 업무 선을 먼저
  가를 수 있어.
sourceUrl: 'https://deepmind.google/models/gemma/gemma-4/'
sourceTitle: Google DeepMind — Gemma 4
draft: false
score: 75
sourceCount: 5
factCheck:
  status: passed
  date: '2026-04-23'
  sources:
    - url: 'https://deepmind.google/models/gemma/gemma-4/'
      title: Google DeepMind — Gemma 4
    - url: >-
        https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/
      title: Google Blog — Gemma 4 announcement
    - url: 'https://huggingface.co/blog/gemma4'
      title: Hugging Face — Gemma 4 blog
    - url: 'https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm'
      title: Hugging Face — LiteRT Gemma 4 E2B model card
    - url: 'https://huggingface.co/litert-community/gemma-4-E4B-it-litert-lm'
      title: Hugging Face — LiteRT Gemma 4 E4B model card
  checks:
    - type: source_match
      result: pass
      summary: >-
        Google Blog와 Google DeepMind로 공개 사실, 모델 구성, 라이선스, 배치 위치를 먼저 맞췄어.
        Hugging Face는 PLE 설명과 로컬 실행 경로를 보강했고, 숫자는 LiteRT 모델 카드에서 직접 확인된 값만 남겼어.
      items:
        - 'Google Blog: 2026-04-02 공개와 Apache 2.0 라이선스 확인'
        - 'Google DeepMind: Gemma 4 제품군, E2B=phones, E4B=edge deployment 위치 확인'
        - 'Hugging Face blog: PLE 구조와 llama.cpp·MLX 지원 확인'
        - 'Hugging Face LiteRT model cards: E2B/E4B의 모델 크기와 메모리 수치 확인'
    - type: web_cross_check
      result: pass
      sources: 5
      summary: >-
        출처별 역할을 갈라서 다시 봤어. DeepMind·Google Blog는 공개와 제품 포지션, 라이선스를 맡고,
        Hugging Face는 PLE와 실행 경로, LiteRT 실측 수치를 받쳐 줬어.
      items:
        - 'Google Blog: 출시 시점과 Apache 2.0 라이선스'
        - 'Google DeepMind: E2B/E4B 구분, 다운로드 섹션의 Ollama 노출'
        - 'Hugging Face blog: PLE 설명과 llama.cpp·MLX 지원'
        - 'Hugging Face LiteRT E2B card: 1.5GB 안팎 메모리 수치'
        - 'Hugging Face LiteRT E4B card: 3.65GB 모델 크기와 3GB대 메모리 실측'
    - type: number_verify
      result: pass
      summary: >-
        직접 확인된 수치와 추정치를 갈라 뒀어. E2B의 1.5GB 안팎은 공식 LiteRT 모델 카드에서 바로 보이지만, 기존
        초안의 "E4B 약 5GB RAM"은 이번 공식 출처 묶음만으로 바로 확인되지 않아서 보수적으로 눌렀어.
      items:
        - >-
          E2B: LiteRT 카드에서 Web CPU Memory 1.5GB, Raspberry Pi 5 CPU Memory
          1546MB 직접 확인
        - >-
          E4B: LiteRT 카드에서 model file size 3.65GB, Android/Linux/macOS/iOS 실측
          3.1~3.4GB대 직접 확인
        - '미확인: "E4B 약 5GB RAM"은 이번에 인용한 공식 출처에서 직접 확인하지 못함'
    - type: adversarial
      result: pass
      summary: >-
        공급자 서사를 그대로 받지 않고, 독립 검증이 부족한 성능 해석과 기기 제약을 따로 적어 뒀어. 커뮤니티 반응도 성능
        증거가 아니라 관심 신호 정도로만 남겼어.
      items:
        - 더 큰 모델에 가까운 이해력은 아직 독립 벤치마크 합의로 굳은 결론이 아님
        - '소형 모델이라도 긴 코드 생성, 복잡한 다단계 추론에서는 한계가 빠르게 드러날 수 있음'
        - '로컬 실행 이점은 프라이버시와 오프라인 운용이지만, 정확도 검증이 중요하면 더 큰 모델이나 외부 API가 더 유리해.'
      findings:
        - '공식 출처가 확인한 수치만 남기고, 확인하지 못한 메모리 추정은 삭제 또는 보수화함'
        - Reddit 반응은 출시 관심도를 보여주는 사례로만 사용함
tags:
  - gemma
  - google
  - local-llm
  - edge-ai
  - quantization
guideVersion:
  tone: 2.0.0
  common: 2.2.0
  news: 3.1.1
formatVersion: 2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.2.0
    news: 3.1.1
  panelVerdict: pass
  contentHash: fddada973e78ab16
  reviewedAt: '2026-04-23'
---

## 무슨 일이 일어났나

구글이 [Gemma 4](/ko/wiki/gemma-4/)를 공개하면서 [E2B](/ko/wiki/e2b/)와 E4B를 같이 내놨어. 이 엣지 모델은 클라우드 [API](/ko/wiki/api/) 대신 기기 안에서 직접 [추론](/ko/wiki/inference/)하도록 줄인 버전이야. Google Blog는 2026-04-02 공개와 [Apache 2.0](/ko/wiki/apache/) 라이선스를, DeepMind는 E2B=phone·E4B=edge 포지션을 확인해.

## 왜 이런가

Hugging Face는 E2B/E4B의 PLE 구조와 [llama.cpp](/ko/wiki/llama.cpp/), MLX 지원을 설명해. [Ollama](/ko/wiki/ollama/) 노출은 Hugging Face가 아니라 DeepMind 다운로드 섹션에서 보여. 다만 "더 큰 모델에 가까운 이해력"은 아직 독립 [벤치마크](/ko/wiki/benchmark/) 합의로 굳은 결론까진 아니야.

## 어떤 의미인가

공식 LiteRT 모델 카드 기준으로 E2B는 일부 환경에서 1.5GB 안팎까지 내려가지만, E4B는 3.65GB 모델 크기와 3GB대 실측이 먼저 확인돼. 그래서 문서 분류·회의록 요약 같은 로컬 보조 작업 자리에선 써볼 만하지만, 긴 코드 생성이나 높은 정확도 검증이 필요한 일은 아직 더 큰 모델이나 외부 API가 낫겠어.
