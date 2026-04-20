---
term: gpt
title: GPT (생성형 사전학습 트랜스포머)
lang: ko
summary: >-
  GPT는 OpenAI가 붙인 생성형 사전학습 트랜스포머 계열 이름이야. 서비스 이름처럼 들리지만, 원래는 큰 텍스트로 먼저 학습한 디코더형
  모델 묶음을 가리키는 말에 더 가까워.
readerValue: >-
  GPT가 새 앱 이름이 아니라 모델 계열 이름이라는 걸 먼저 잡게 해. 기사에서 구조 얘기인지, ChatGPT 같은 서비스 얘기인지 헷갈릴
  때 특히 도움 돼.
category: concept
guideVersion:
  common: 1.0.0
  wiki: "3.0.0"
aliases:
  - GPT
  - Generative Pre-trained Transformer
relatedTerms:
  - transformer
  - chatgpt
  - openai
  - gpt-oss
  - codex
firstMentioned: '2018-10-11'
mentionCount: 8
draft: false
tags:
  - llm
  - transformer
  - openai
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: >-
        https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
      title: Improving Language Understanding by Generative Pre-Training
    - url: 'https://openai.com/so-DJ/index/introducing-gpt-5/'
      title: Introducing GPT-5
  checks:
    - type: source_match
      result: pass
      summary: GPT를 서비스 이름이 아니라 모델 계열 이름으로 다시 맞춰봤어.
      items:
        - '독자 문제 대조: GPT가 앱 이름인지 구조 이름인지 헷갈리는 지점을 먼저 갈라 놓았어.'
        - >-
          2018년 OpenAI 논문은 Generative Pre-Training을 핵심으로 설명하고 multi-layer
          Transformer decoder와 multi-headed self-attention을 적고 있어서 정의를 그 축에 맞췄어.
        - >-
          GPT-5 소개 글은 GPT-5를 unified system으로 설명하므로, 최신 제품 맥락은 계열 이름이 서비스 경험까지
          넓어진 상태로 따로 적었어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: '2018 논문과 GPT-5 소개 글을 같이 놓고, 원래 의미와 최근 제품 의미가 어디서 이어지고 어디서 갈리는지 다시 봤어.'
      items:
        - >-
          비교 기준: 처음의 GPT가 학습 구조와 모델 계열 이름을 뜻하는지, 최근의 GPT가 제품 경험까지 포함해 불리는지 두 소스를
          나눠서 봤어.
        - >-
          논문은 구조와 학습 절차를 설명하고, GPT-5 소개는 unified system과 사용 경험을 설명해서 둘의 역할이 다르다는
          점을 본문에 반영했어.
        - '그래서 정의 섹션은 구조 중심으로, 주의 섹션은 서비스명과 계열명을 섞어 쓰는 위험 쪽으로 정리했어.'
    - type: number_verify
      result: pass
      summary: '2018년, 12-layer decoder, 2025년 8월 7일처럼 확인 가능한 숫자만 남기고 일반론은 줄였어.'
      items:
        - OpenAI 2018 논문이 GPT의 첫 절차 설명을 담고 있다는 점을 연도 기준으로 맞췄어.
        - 같은 논문이 12-layer decoder-only transformer를 적고 있어서 작동 방식 설명의 숫자 기준으로 썼어.
        - GPT-5 소개 글의 날짜가 2025년 8월 7일인 것도 확인해서 최근 제품 예시의 시점을 분명히 남겼어.
    - type: adversarial
      result: pass
      summary: GPT를 모든 챗봇과 생성형 AI의 동의어로 읽는 오해를 막았어.
      items:
        - >-
          GPT는 계열 이름이고, [chatgpt](/ko/wiki/chatgpt/)는 그 계열이 얹힌 서비스 이름이라는 점을 분리해
          적었어.
        - >-
          구조를 설명할 때는 [transformer](/ko/wiki/transformer/)와
          [attention](/ko/wiki/attention/)이 더 직접적인 용어라는 점을 넣어서 용어 혼동을 줄였어.
        - 같은 GPT 계열이라도 버전마다 성격이 다르다는 점을 주의 섹션에서 따로 세웠어.
      findings:
        - 'GPT라는 이름만 보고 서비스, 회사, 모델 구조를 한꺼번에 뜻한다고 읽으면 거의 항상 문맥이 흐려져.'
        - 최근 제품 문맥이 넓어졌어도 기본 정의는 모델 계열 이름으로 잡는 편이 맞아.
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
---
## 한 줄 정의
GPT는 [OpenAI](/ko/wiki/openai/)가 붙인 Generative Pre-trained [Transformer](/ko/wiki/transformer/) 계열 이름이야. 서비스 이름이라기보다, 큰 텍스트로 먼저 배우고 다음 토큰을 예측하는 디코더형 [transformer](/ko/wiki/transformer/) 모델 묶음을 가리키는 말에 더 가까워.
## 어떻게 작동하나
2018년 [OpenAI](/ko/wiki/openai/) 논문은 먼저 대규모 텍스트로 언어 모델을 학습하고, 그다음 과제에 맞게 미세조정하는 두 단계 절차를 설명했어. 같은 논문은 GPT가 multi-layer [Transformer](/ko/wiki/transformer/) decoder와 multi-headed [attention](/ko/wiki/attention/)을 써서 다음 [토큰](/ko/wiki/token/) 분포를 만든다고 적어.
최근 제품 층위에선 같은 이름이 더 넓게 쓰여. [OpenAI](/ko/wiki/openai/)의 GPT-5 소개 글은 2025년 8월 7일 GPT-5를 하나의 unified system으로 설명하면서, 빠르게 답할지 더 오래 생각할지를 시스템이 조절하는 경험까지 함께 말하고 있어.
## 왜 중요한가
GPT가 중요해진 건 범용 언어 모델을 서비스 밖 개념으로 묶어 보는 시선을 굳혔기 때문이야. 문서 요약, 질의응답, 코드 보조처럼 서로 다른 일을 한 계열 모델로 읽게 만들면서 모델 경쟁의 기본 축이 됐어.
그래서 기사에서 GPT라는 말이 나오면 새 앱 이름보다 모델 계열과 구조 얘기일 가능성이 커. 다만 실제 사용 경험을 말하는 문맥이면 [chatgpt](/ko/wiki/chatgpt/)나 특정 버전명이 더 정확할 때가 많아.
## 주의해서 볼 점
GPT를 모든 생성형 AI의 동의어처럼 쓰면 금방 헷갈려. 구조를 말할 땐 [transformer](/ko/wiki/transformer/), 서비스 경험을 말할 땐 [chatgpt](/ko/wiki/chatgpt/), 회사 전략을 말할 땐 [openai](/ko/wiki/openai/)가 더 정확한 표현일 때가 많아.
또 GPT 계열도 버전마다 [도구 사용](/ko/wiki/tool-use/), 응답 속도, 가격, 사고 경로가 크게 달라. 이름만 같다고 같은 성격의 모델로 읽으면 제품 판단이 어긋나기 쉬워.
## 관련 용어
- [Transformer](/ko/wiki/transformer/): GPT의 뼈대 구조를 먼저 보고 싶을 때 가장 바로 이어지는 말이야.
- [ChatGPT](/ko/wiki/chatgpt/): GPT 계열이 사용자 서비스로 감싸졌을 때 어떤 경험이 되는지 볼 때 이어져.
- [OpenAI](/ko/wiki/openai/): GPT라는 이름을 누가 만들고 어떤 제품과 API로 풀어내는지 읽을 때 도움이 돼.
- [GPT-OSS](/ko/wiki/gpt-oss/): GPT라는 이름이 항상 같은 공개 범위나 배포 방식을 뜻하지 않는다는 점을 비교하기 좋아.
- [Codex](/ko/wiki/codex/): GPT 계열 능력이 코딩 작업 쪽에서 어떻게 제품화되는지 붙여 볼 수 있어.
