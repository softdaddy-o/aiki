---
title: Nemotron-Personas-Korea
slug: nemotron-personas-korea
lang: ko
category: dataset
summary: >-
  7M synthetic personas(1M records × 7 variants)와 한국 인구통계 정렬 구조를 바탕으로, AI 에이전트
  합성 사용자군을 빠르게 만들 수 있는지 판단하기 위한 데이터셋이다.
readerValue: '채택 판단은 먼저 모델 성능이 아니라, 지역/직업/인구학적 분포가 당신의 시나리오에 필요한 가드레일을 충분히 재현하는지로 시작한다.'
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
      title: Hugging Face dataset card — Nemotron-Personas-Korea
    - url: >-
        https://huggingface.co/blog/nvidia/build-korean-agents-with-nemotron-personas
      title: >-
        How to Ground a Korean AI Agent in Real Demographics with Synthetic
        Personas
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: '두 출처에서 데이터셋의 공개 성격, 합성 성격, 라이선스와 핵심 수치 범위를 확인했다.'
      items:
        - 데이터셋 카드에 CC BY 4.0 라이선스가 명시되어 있다.
        - 블로그와 데이터셋 설명 모두 한국 인구통계 정렬 합성 persona 목적을 전제한다.
        - 판단 우선순위는 실사용 시뮬레이션용 seed bank로의 적합성이다.
    - type: number_verify
      result: pass
      sources: 2
      summary: '주요 수치(7M personas, 26 fields, 17 provinces + 25 districts)는 공개 설명에 부합한다.'
      items:
        - 전체 레코드는 1M 행을 기준으로 7개 persona 변형을 갖는다.
        - 총 personas는 7M로 설명된다.
        - 구성 필드는 26개로 확인된다.
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
  contentHash: "441006c90aeb2676"
  reviewedAt: '2026-04-27T09:00:00Z'
---
