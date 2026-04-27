---
title: Nemotron-Personas-Korea
slug: nemotron-personas-korea
lang: ko
category: dataset
summary: NVIDIA가 공개한 한국어 합성 페르소나 데이터셋이야. 지역·직업·연령 단면을 가진 가상 인물과 관계 설정을 만들 때 재료로 쓸 수 있어.
readerValue: >-
  1백만 행, viewer 기준 26개 필드, 17개 province, 252개 district를 바탕으로 가상 인물 카드, 관계 설정,
  에이전트 시드, 평가 단면을 만들 수 있어. 2K+ occupation categories는 NVIDIA 블로그 표의 별도 주장으로 다루고,
  실제 개인 관측치처럼 쓰면 안 된다는 한계도 같이 봐야 해.
tags:
  - synthetic-data
  - persona
  - korea
  - agent
  - eval
githubUrl: 'https://huggingface.co/datasets/nvidia/Nemotron-Personas-Korea'
sourceMetric: 280
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
        핵심 수치는 Hugging Face dataset card와 viewer를 1차 기준으로 두되, 카드 안에서도 스키마 표기 충돌이
        있어. 2026년 4월 27일 기준으로 이 페이지는 1M rows, viewer/schema 기준 uuid 포함 26 fields,
        17 provinces, 252 districts를 구조 읽기 기준으로 채택해.
      items:
        - dataset viewer는 default/train 1M rows와 화면에 나열되는 필드 목록을 직접 보여 줘.
        - >-
          dataset card의 schema 문단은 26 fields를 말하지만, Field & Token Counts 문단은 영어로 25
          columns excluding identifier, 한국어로 UUID 제외 28가지 열이라고 써서 충돌해.
        - >-
          이 페이지의 데이터 구조 표는 viewer와 schema 문단에서 검산되는 26개 visible fields를 기준으로 삼고,
          25/28 표현은 별도 출처 충돌로 남겨 둬.
        - >-
          NVIDIA 블로그 표는 Occupations를 2K+ categories로 제시하지만, Hugging Face dataset viewer가
          그 고유값 수를 직접 검산해 주지는 않아.
        - >-
          Hugging Face의 like 280은 2026년 4월 27일 확인 시점의 공개 반응 스냅샷이야. 데이터셋 규모나 품질
          판단 근거가 아니라 hero 보조 지표로만 써.
        - 외부 기사도 7 million fully synthetic personas라는 큰 수치는 다시 확인해 줘.
      findings:
        - NVIDIA 블로그 본문에는 `6 million`과 `7 million` 표현이 같이 나와.
        - 같은 블로그에 `25 districts`라는 표현도 있어 geography 수치는 dataset card 쪽이 더 안정적이야.
        - >-
          최종 채택 기준은 dataset viewer와 schema 문단에서 같이 확인되는 26개 visible fields야. 다만
          Field & Token Counts의 25/28 충돌은 총 컬럼 수 확정 근거로 쓰지 않아.
        - >-
          2K+ occupation categories는 NVIDIA 블로그 표의 수치로만 다루고, dataset card 직접 검산값처럼
          쓰지 않아.
    - type: web_cross_check
      result: pass
      sources: 3
      summary: >-
        데이터셋 카드와 NVIDIA 블로그, 외부 보도는 서로 다른 무게로 봐야 해. schema와 viewer 숫자는 Hugging
        Face dataset card가 기준이고, occupation category 규모와 agent grounding 맥락은 NVIDIA 블로그
        쪽 주장으로 분리해.
      items:
        - dataset card는 row viewer와 schema 문단을 보여 줘서 이 페이지의 필드 목록 확인 기준으로 쓰기 좋아.
        - >-
          블로그는 persona variant, 2K+ occupation categories, agent grounding 예시를 읽는 데는 좋지만,
          `6M/7M`, `25/252`처럼 수치 표현이 흔들려.
        - >-
          외부 보도는 7 million synthetic personas와 no-PII 성격을 독립 보도 맥락에서 다시 확인해 주지만,
          26/25/28 같은 세부 스키마 충돌을 풀어 주는 출처는 아니야.
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
  contentHash: "94d9475137793388"
  reviewedAt: "2026-04-27"
---

## 개요

이 데이터셋은 한국 맥락의 합성 페르소나를 모아 둔 공개 데이터셋이야. `uuid`, 7개 persona 본문, 배경·취향
메모, 인구통계·지리 필드를 같이 보면서 가상 인물, 관계 설정, 에이전트 시드, 평가 단면을 만들 수 있어. `district
252`, `province 17`, `1백만 행`은 Hugging Face 데이터셋 카드와 viewer를 먼저 보는 쪽이 덜 흔들려.
필드 수는 viewer/schema 기준 26개를 구조 읽기 기준으로 쓰되, 같은 카드의 Field & Token Counts에 25/28
표현이 함께 있어 총 컬럼 수 확정값처럼 과하게 읽지는 않아.

## 어떻게 쓸 수 있나

- 같은 레코드 안의 직업, 지역, 연령, 가족형태를 현실 단서로 삼고, 지명과 사건은 허구로 바꿔 세계관 캐릭터를 만들 수 있어.
- 여러 캐릭터를 관계 링크로 묶으면 생활비, 이동, 기술 승계, 직업 리듬 같은 갈등 축을 설정할 수 있어.
- [Eval(평가)](/ko/wiki/eval/) 흐름에서는 같은 질문을 지역·직업·가구형태 단면별로 나눠 응답이 어떻게 갈리는지 볼 수 있어.

## 사용처와 한계

- 합성 페르소나는 실제 개인 관측치가 아니야. 동의 없는 프로파일링, 민감 속성 추정, [Inference](/ko/wiki/inference/) 단계의 재식별 추론으로 그대로 이어 붙이면 안 돼.
- 게임 NPC, 대화 에이전트 테스트, 추천 답변 평가 단면에는 쓸 수 있지만 실제 한국 인구 대표 통계나 개인 성향 증거로 쓰면 안 돼.
- 수치도 같이 맞춰 봐야 해. 블로그 본문은 `6 million/7 million`, `25 districts`가 같이 보이지만, 카드에서 바로 대조되는 값부터 잡는 편이 안전해.
