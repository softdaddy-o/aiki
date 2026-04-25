---
term: prompt-engineering
title: Prompt Engineering(프롬프트 엔지니어링)
lang: ko
summary: >-
  Prompt Engineering은 모델을 다시 학습시키는 일이 아니라, 같은 모델에 넣는 지시와 맥락과 출력 형식을 설계해서 결과를 더
  원하는 방향으로 맞추는 기법이야. 입력 설계 문제인지 모델 선택 문제인지 가르는 데 특히 중요해.
readerValue: 이 말이 모델 교체가 아니라 입력 설계와 출력 제어를 다루는 기법이라는 점을 바로 잡아 줘. 그래서 실패 원인을 더 빨리 가를 수 있어.
category: technique
aliases:
  - prompt engineering
relatedTerms:
  - chain-of-thought
mentionCount: 0
draft: false
tags:
  - prompting
  - instruction
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Prompt_engineering'
      title: Prompt engineering
    - url: >-
        https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
      title: Prompt engineering overview
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: 입력 설계 기법이라는 본질을 원문 설명에 맞춰 다시 봤어.
      items:
        - '독자 문제 대조: 프롬프트 엔지니어링을 모델 재학습으로 오해하기 쉬워서, 입력 설계 문제라는 점을 첫 문단에 먼저 뒀어.'
        - 위키 계열 설명의 구조화된 입력 정의와 Anthropic 문서의 성공 기준 중심 접근을 함께 반영했어.
        - '예시, 역할, 출력 형식 같은 구성 요소가 실제 작업 단위로 보이게 본문을 다시 짰어.'
      findings:
        - 이 개념은 모델 자체보다 입력 설계 표면을 다룬다는 점이 중요해.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 일반 정의와 실무 가이드를 붙여 보고 공통 축만 남겼어.
      items:
        - '비교 기준: Prompt engineering 일반 정의와 Anthropic 공식 가이드의 실무 순서를 나란히 봤어.'
        - 둘 다 공통으로 말하는 입력 구조 설계와 출력 유도라는 핵심만 본문 중심으로 남겼어.
        - 체인 오브 소트 같은 세부 기법은 전체 개념을 가리지 않게 관련 용어로만 묶었어.
      findings:
        - 프롬프트 엔지니어링은 기법 목록보다 실패 원인 분류 도구로 읽을 때 더 유용해.
    - type: number_verify
      result: pass
      sources: 1
      summary: 숫자가 본질이 아닌 항목이라 검증 가능한 비교축만 남겼어.
      items:
        - '가격, 토큰 한도, 성능 점수처럼 프롬프트 엔지니어링 정의와 직접 상관없는 숫자는 넣지 않았어.'
        - 대신 모델 선택이 비용과 지연시간 문제를 더 쉽게 풀 수 있다는 공식 가이드의 질적 구분만 남겼어.
        - 숫자 중심 설명으로 흐르지 않게 개념 경계와 사용 조건을 우선했어.
      findings:
        - 이 페이지는 정량표보다 원인 분리 감각을 주는 쪽이 더 값어치가 커.
    - type: adversarial
      result: pass
      sources: 1
      summary: 프롬프트만 잘 쓰면 다 해결된다는 과장을 막았어.
      items:
        - 최신 사실 문제는 검색이나 RAG가 더 중요할 수 있다는 점을 주의 문단에 넣었어.
        - 비용과 지연시간은 모델 선택이 더 직접적인 해법일 수 있다는 공식 문서 메시지도 반영했어.
        - 체인 오브 소트 같은 하위 기법을 전체 개념과 같은 말처럼 읽지 않게 분리했어.
      findings:
        - '프롬프트 엔지니어링은 강하지만, 문제 종류를 잘못 읽으면 바로 한계가 보여.'
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
formatVersion: 2
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "cb9f28264eddf63d"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Prompt Engineering은 생성형 AI 모델에 넣는 입력을 설계해서 원하는 출력 방향과 형식을 조정하는 방법이야. 모델 가중치를 바꾸는 재학습과는 다르고, 어떤 지시와 예시와 제약을 묶어 넣느냐를 다루는 일에 더 가까워.
## 어떻게 작동하나
모델은 질문 한 줄만 읽는 게 아니라 역할 지시, 성공 기준, 예시, 금지 조건, 출력 포맷까지 같이 읽고 다음 응답을 정해. [Anthropic](/ko/wiki/anthropic/)의 프롬프트 엔지니어링 문서도 명확한 성공 기준을 먼저 세우고, 예시 넣기·역할 부여·체인 구성 같은 기법을 단계적으로 시험해 보라고 안내하고 있어.
## 왜 중요한가
같은 모델이라도 프롬프트 설계가 달라지면 정확도와 일관성과 재현성이 꽤 크게 달라져. 그래서 결과가 좋아졌다고 할 때 진짜 원인이 모델 교체인지, 프롬프트 개선인지, 검색이나 도구 연결 같은 다른 맥락 개선인지 분리해서 볼 수 있게 해 줘.
## 주의해서 볼 점
프롬프트 엔지니어링이 만능 열쇠는 아니야. [Anthropic](/ko/wiki/anthropic/) 문서도 지연시간과 비용 문제는 모델을 바꾸는 편이 더 쉬울 수 있다고 적고 있어서, 최신 사실이 필요한 문제나 도구 연결이 중요한 문제를 프롬프트만으로 해결하려고 하면 금방 한계가 보여.
## 관련 용어
- [chain-of-thought](/ko/wiki/chain-of-thought/): 프롬프트 안에서 추론 전개를 유도하는 한 가지 기법이야. 프롬프트 엔지니어링 전체를 이 한 기술로 축소해 읽지 않게 도와줘.
