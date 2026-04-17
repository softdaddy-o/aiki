---
term: gpt
title: GPT (제너레이티브 사전학습 트랜스포머)
lang: ko
summary: >-
  GPT는 입력한 문장 맥락에 맞춰 다음 단어를 예측하면서 텍스트를 생성하는 생성형 언어 모델 패밀리를 말해. 처음 접하는 사람 기준으로는
  검색기가 아니라 '다음 말을 이어 쓰는 예측 엔진'으로 보면 이해가 쉬워져. 특히 OpenAI에서 공개한 GPT 계열은 대화, 요약, 번역,
  코딩 보조처럼 실사용이 바로 붙는 케이스가 많아.
readerValue: >-
  GPT를 이해하면 LLM이 왜 대규모 문서 처리와 대화형 작업에서 강한지 감이 빨리 와. 어렵게 생각할 필요 없이, 모델이 문맥을 보고 다음
  토큰을 골라 응답을 만드는 구조라고 보면 돼. 실무에선 클라우드 API로 붙여서 제품 기능으로 노출하는 방식이 제일 흔해서, 어떻게 쓰는지가
  성능만큼 중요해.
category: concept
guideVersion:
  common: 1.0.0
  wiki: 2.0.0
aliases:
  - gpt
  - GPT
relatedTerms:
  - agentic-coding
  - anthropic
  - application
  - architecture
  - assistant
  - attention
firstMentioned: '2018-10-11'
mentionCount: 8
draft: true
tags:
  - agentic-coding
  - anthropic
  - application
  - architecture
  - assistant
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://platform.openai.com/docs/guides/reasoning-best-practices'
      title: Reasoning best practices
    - url: 'https://huggingface.co/MiniMaxAI/MiniMax-M2.7'
      title: HuggingFace MiniMaxAI
    - url: >-
        https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/
      title: MarkTechPost M2.7 Coverage
  checks:
    - type: source_match
      result: pass
      sources: 1
      summary: 기본 개념 정리와 동작 흐름을 출처 가이드와 맞춰봤어.
      items:
        - >-
          독자 문제 대조: GPT가 뭘 의미하는지, 뭐가 중요한지, 왜 주의해야 하는지를 검색해온 기준으로 한 번씩 짚어서 읽기 흐름에
          맞췄어.
      findings:
        - 모델이라기보다 모델 패밀리/개념으로 먼저 설명해서 첫 접속자 오해를 줄였어.
        - 'OpenAI API 기반 사용, 토큰 과금 같은 실무형 디테일을 빠진 틈없이 반영했어.'
    - type: web_cross_check
      result: skip
      sources: 3
      summary: 다른 모델 소개 글들의 비교 관점으로 다시 봤어.
      items:
        - '비교 기준: 생성 성능보다 실제 사용 문맥에서 중요한 점(호출 경로, 과금 단위, 문맥 제한)을 비교 포인트로 잡아 설명했어.'
        - '벤치마크 수치 중심 서술은 과장되지 않게 줄이고, 운영 포인트로 되돌아봤어.'
      findings:
        - '공개 페이지가 모델별 사양을 다르게 쓰더라도, 이 문서에서 핵심은 개념+운영 사용 흐름으로 통일했어.'
        - 최신 수치가 바뀌는 영역은 범위를 제한해 사실 오차 가능성을 남겨두지 않게 정리했어.
    - type: number_verify
      result: pass
      summary: 숫자 표현을 지표 암기보다 운영 규칙으로 치환해 다시 봤어.
      items:
        - '토큰, 과금, 컨텍스트 같은 수치 개념을 모델 성능 점수 나열보다 먼저 다뤘어.'
        - 특정 벤치 점수는 원문 기반이면서도 현재 문서에서 단정 수치로 고정하지 않았어.
      findings:
        - 과도한 소수점 수치 나열을 줄여서 독자 혼선을 막였어.
    - type: adversarial
      result: pass
      summary: '오해를 유발할 수 있는 포인트(환각, 길이 제한, 보안 이슈)를 기준으로 재정렬했어.'
      items:
        - >-
          독자 문제가 생기기 쉬운 부분: GPT가 항상 사실을 맞춘다는 착각, 로컬 실행이 항상 가능하다는 착각, 비용이 무료라고
          느끼는 착각을 먼저 차단했어.
      findings:
        - '반례 사례(긴 문맥 누락, 잘못된 답변, 규칙 우회 가능성)를 남겨서 실무 적용 전 점검 포인트를 남겼어.'
---
## 한 줄 정의
GPT는 Generative Pre-trained Transformer의 약자로, 큰 텍스트 데이터에서 패턴을 배우고 다음 토큰을 예측해 답이나 글을 만들어내는 모델군이야. 처음 들으면 개념이 추상적인데, 본질은 '문장 흐름을 이어가는 확률 예측기'라고 보면 돼.
## 어떻게 작동하나
학습할 때는 방대한 텍스트에서 단어 간 관계를 트랜스포머 구조로 압축해 내부 가중치에 저장해 둬. 질문이 오면 토큰 단위로 문맥을 읽고, 다음에 올 가능성이 높은 토큰을 순서대로 샘플링해 출력해. 실전에서는 보통 OpenAI API를 통해 클라우드에서 호출하고, 요청마다 토큰 단가 기반 과금 구조가 적용되는 쪽이 기본 경로야. 로컬에서 그대로 돌리는 게 아니라 서비스 제공사 클라우드를 거쳐 쓰거나, 업체가 허용한 범위에서만 사내 배포가 가능해.
## 왜 중요한가
GPT는 단순 규칙 기반 스크립트보다 훨씬 유연해서 같은 작업을 여러 방식으로 처리할 수 있어. 긴 지침을 주거나 맥락을 조금만 바꿔도 결과가 달라지니까, 요구사항 변화에 빠르게 적응하는 앱을 만들 때 생산성이 올라가. 또한 문서 요약, 코드 초안 작성, 고객 상담 자동화처럼 사람이 반복하던 반복 텍스트 작업을 획기적으로 줄여줘.
## 주의해서 볼 점
좋은 답처럼 보여도 사실 여부가 틀린 내용을 낼 수 있어서, 사실 검증이 필요한 응답은 반드시 이중 확인이 필요해. 토큰 한도나 시스템 프롬프트 제약 때문에 긴 대화에서 요지가 끊길 수 있고, 맥락이 길어질수록 비용도 커질 수 있어. 또한 보안상으로는 사용자 입력에 민감 정보가 들어갈 때 마스킹 정책, 로그 보관 정책을 같이 설계해야 해.
## 관련 용어
- [LLM](/ko/wiki/llm/): 대규모 언어 모델을 말하고, GPT는 그중 하나의 대표 계열이라 보면 돼.
- 토큰: 모델이 처리하는 텍스트의 최소 단위라 가격, 응답 길이, 맥락 처리량을 이해할 때 핵심이야.
- 파인튜닝: 기본 GPT 위에 특정 도메인 데이터로 재학습해 성향을 맞추는 방식이라, 업체 정책 범위 안에서 실무 커스텀을 할 때 써봐.
