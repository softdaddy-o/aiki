---
title: Nemotron-Personas-Korea
slug: nemotron-personas-korea
lang: ko
category: dataset
summary: >-
  7M synthetic personas(1M records × 7 variants)는 한국 인구통계 패턴을 반영한 합성 데이터셋이다. AI 에이전트의 실전형 시나리오에서 지역·인구층별 동작을 빠르게 재현하고 seed bank를 만들기 위한 기준 템플릿으로 사용한다.
readerValue: >-
  판단 기준은 dataset card의 숫자 정보를 우선으로 두고, 블로그의 표현 모순은 추적해서 표시한다. 수치 신뢰도는 1M records × 7 variants로 설명되는 7M personas와 district 252 클래스를 1차 기준으로 신뢰한다.
githubUrl: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
showcaseComponent: nemotron-personas-korea
license: CC BY 4.0
version: '2026-04-20'
contentStatus: final
draft: false
date: '2026-04-20'
edition: ai
factCheck:
  status: passed
  date: '2026-04-27'
  sources:
    - url: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
      title: Hugging Face dataset card Nemotron-Personas-Korea
    - url: 'https://huggingface.co/blog/nvidia/build-korean-agents-with-nemotron-personas'
      title: How to Ground a Korean AI Agent in Real Demographics with Synthetic Personas
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: '데이터셋 카드와 블로그에서 공개된 라이선스, 합성 목적, 실사용 seed bank 적용 맥락이 일치한다.'
      items:
        - 데이터셋 카드는 CC BY 4.0 라이선스를 명시한다.
        - 블로그와 카드 모두 synthetic personas 기반이라는 공통 목적을 공유한다.
        - 실무 성격상 seed bank 구성과 판단 우선순위 설정에 적합하다.
    - type: number_verify
      result: pass
      sources: 2
      summary: '핵심 수치는 HF 데이터셋 카드와 세부 항목을 1차 근거로 하여 7M personas(1M records × 7 variants), district 252개 클래스가 일치한다. 블로그 본문에는 `6 million`과 `7 million`가 혼재되고 `25 districts`라는 표현이 있어 별도 메모한다.'
      items:
        - HF 데이터셋 카드 및 dataset-details는 1M records × 7 variants로 7M personas를 설명한다.
        - HF 데이터셋 스키마는 district를 문자열 필드로 두고 252 클래스 값을 둔다.
        - 공개 표/항목에서도 7M personas와 252 districts를 동일 맥락으로 다룬다.
      findings:
        - 'NVIDIA 블로그 본문은 일부 문단에서 `6 million`을 사용한다.'
        - '동일 문서에서 `7 million (1 million records x 7 personas each)`도 함께 제시해 내부 수치 모순이 존재한다.'
        - '블로그의 `25 districts`는 252 클래스와 직접적인 일치 여부가 명시되지 않는다.'
formatVersion: 2
guideVersion:
  tone: 2.0.0
  common: 2.3.0
  projects: 4.2.0
reviewStamp:
  panelVersion: 1.1.0
  agentVersions:
    beginner-editor: 1.0.0
    fact-checker: 1.0.0
    skeptical-critic: 1.1.0
    tone-editor: 1.6.0
    structure-editor: 1.1.0
  guideVersions:
    tone: 2.0.0
    common: 2.3.0
    projects: 4.2.0
  panelVerdict: pass
  contentHash: "utf8-clean-2026-04-27-task3"
  reviewedAt: '2026-04-27T09:00:00Z'
---
