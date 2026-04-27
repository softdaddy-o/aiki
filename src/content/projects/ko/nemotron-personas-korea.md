---
title: Nemotron-Personas-Korea
slug: nemotron-personas-korea
lang: ko
category: dataset
summary: '한국어 에이전트나 평가셋에 지역·직업·연령 단면이 필요하면 볼 만하고, 실제 개인 관측치처럼 읽어야 하면 여기서 멈추는 데이터셋이야.'
readerValue: >-
  1백만 행, 26개 필드, 17개 province, 252개 district, 2K+ 직업 축이 한 번에 잡혀서 단면 실험엔 바로 붙여 보기
  좋아. 대신 실제 개인 추정 작업이면 여기서 끊는 편이 맞아.
tags:
  - synthetic-data
  - persona
  - korea
  - agent
  - eval
githubUrl: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
sourceMetric: 1000000
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
    - url: >-
        https://huggingface.co/blog/nvidia/build-korean-agents-with-nemotron-personas
      title: >-
        How to Ground a Korean AI Agent in Real Demographics with Synthetic
        Personas
    - url: 'https://www.asiae.co.kr/en/article/enterprise-CEO/2026042117324089969'
      title: NVIDIA to Support Korean AI Ecosystem...Sharing Nemotron Expertise
  checks:
    - type: source_match
      result: pass
      sources: 3
      summary: >-
        dataset card와 NVIDIA 블로그, 외부 보도를 같이 보면 이 데이터가 한국어 synthetic persona seed
        bank라는 큰 방향은 일치해.
      items:
        - dataset card는 라이선스를 CC BY 4.0으로 명시해.
        - NVIDIA 블로그도 한국어 agent grounding과 synthetic persona 활용 맥락을 같은 방향으로 설명해.
        - >-
          외부 기사도 7 million fully synthetic personas와 한국 AI 생태계 지원 맥락을 같은 축으로 받아
          적고 있어.
    - type: number_verify
      result: pass
      sources: 3
      summary: >-
        핵심 수치는 Hugging Face dataset card를 1차 기준으로 두는 게 맞아. 2026년 4월 27일 기준으로
        1M rows, 26 fields, 17 provinces, 252 districts를 우선 기준값으로 잡으면 돼.
      items:
        - dataset card와 dataset details는 1M rows와 26 fields를 직접 보여 줘.
        - >-
          dataset card는 7 million personas와 17 provinces + 252 districts를 함께
          제시해.
        - >-
          dataset card는 2K+ occupation categories도 같이 적어 둬서, 이 페이지의 직업 축 설명 근거로
          바로 쓸 수 있어.
        - 외부 기사도 7 million fully synthetic personas라는 큰 수치는 다시 확인해 줘.
      findings:
        - NVIDIA 블로그 본문에는 `6 million`과 `7 million` 표현이 같이 나와.
        - 같은 블로그에 `25 districts`라는 표현도 있어 geography 수치는 dataset card 쪽이 더 안정적이야.
        - >-
          최종 채택 기준은 dataset card야. 26개 컬럼, 1M rows, 17 provinces, 252
          districts처럼 스키마와 숫자를 한 화면에서 같이 검증할 수 있는 출처가 여기뿐이기 때문이야.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: >-
        데이터셋 카드와 NVIDIA 블로그, 외부 보도를 같이 보면 목적은 일치하지만 실제 스키마와 시간민감 수치 판단은 dataset
        card 쪽이 더 구체적이야.
      items:
        - dataset card는 26개 컬럼과 row viewer를 직접 보여 줘서 실제 스키마 확인 기준으로 쓰기 좋아.
        - >-
          블로그는 persona variant와 agent grounding 예시를 읽는 데는 좋지만, `6M/7M`과
          `25/252`처럼 수치 표현이 흔들려.
        - >-
          외부 보도는 7 million synthetic personas와 no-PII 성격을 다시 확인해 주지만, 시점별 수치와 세부
          컬럼 구조는 card를 따라가는 게 맞아.
    - type: adversarial
      result: pass
      sources: 3
      summary: synthetic persona라고 해도 실제 개인 데이터처럼 읽으면 바로 오판이 생겨. 이 페이지는 그 경계선을 같이 적어 둬.
      items:
        - >-
          이 데이터는 실제 개인 프로필 복원용이 아니라 synthetic scenario와 evaluation slice 용도로 보는
          게 맞아.
        - 'region, occupation, age 축이 있다고 해서 실제 한국 인구를 그대로 대표한다고 단정하면 안 돼.'
        - '직접 타기팅, 동의 없는 프로파일링, 민감 속성 추정 같은 흐름에는 그대로 넣지 말아야 해.'
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  projects: "4.2.0"
reviewStamp:
  panelVersion: "1.1.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    projects: "4.2.0"
  panelVerdict: pass
  contentHash: "4950ff3d0f4a612a"
  reviewedAt: "2026-04-27"
---

## 핵심 판단

이 데이터셋은 한국어 에이전트나 평가셋에 지역·직업·연령 단면을 붙일 때 먼저 꺼내 볼 만해. 반대로 실제 개인
관측치처럼 읽어야 하는 작업이면 여기서 멈추는 편이 맞아. 그다음에 `uuid`, 7개 persona 본문, 26개 원문 컬럼,
`district 252`, `province 17`, `1백만 행`을 같이 확인하면 돼. `700만` 같은 큰 수치도 HF 데이터셋 카드를
먼저 보는 쪽이 덜 흔들려.

## 바로 쓰는 흐름

- 같은 레코드 안에서 페르소나 본문, 배경, 인구통계 축이 갈려 있어서 에이전트 시드셋이나 평가 단면 실험에 바로 붙여 보기 좋아.
- 행 단위를 `uuid`로 고정한 뒤 직업, 지역, 연령 축으로 답변 톤이나 추천 결과를 비교해 보면 어디가 갈리는지 빨리 보여.
- [Eval(평가)](/ko/wiki/eval/)나 [Inference](/ko/wiki/inference/) 흐름에서 단면 검증이 필요하다면, 레코드를 샘플→씬→테스트 시나리오로 펴 가면 돼.

## 멈출 선

- 합성 페르소나는 실제 개인 관측치가 아니야. 동의 없는 프로파일링, 민감 속성 추정, [Inference](/ko/wiki/inference/) 단계의 재식별 추론으로 그대로 이어 붙이면 안 돼.
- 수치도 같이 맞춰 봐야 해. 블로그 본문은 `6 million/7 million`, `25 districts`가 같이 보이지만, 카드에서 바로 대조되는 값부터 잡는 편이 안전해.
