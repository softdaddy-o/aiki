---
term: claude
title: "Claude(클로드)"
lang: ko
summary: "Claude는 Anthropic의 대형 언어 모델 가족이자 그 모델을 앞세운 AI 제품 이름이야. 버전명 하나가 아니라 모델 라인업과 사용자 서비스 간판이 겹친 이름으로 읽어야 해."
readerValue: "Claude가 보이면 모델 성능 이야기인지, 앱 기능 이야기인지, Anthropic 배포 전략 이야기인지 먼저 가르는 데 도움돼. 하위 모델명과 제공 채널을 같이 보게 해 줘."
category: model
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Claude(클로드)"
relatedTerms:
  - claude-opus
  - claude-sonnet
  - chatgpt
  - claude-sonnet-4-5
firstMentioned: "2026-02-18"
mentionCount: 36
draft: false
tags:
  - anthropic
  - assistant
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Claude_(language_model)"
      title: "Claude (language model)"
    - url: "https://www.anthropic.com/claude"
      title: "The AI for Problem Solvers | Claude by Anthropic"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "계열명과 제품명이 겹친다는 핵심을 원문 기준으로 다시 맞춰봤어."
      items:
        - "독자 문제 대조: Claude를 단일 모델명으로 읽기 쉬운 지점을 먼저 풀고, Anthropic의 모델 가족이자 서비스 간판이라는 점을 첫 문단에 넣었어."
        - "공식 제품 소개의 보조 도구 맥락과 모델 개요 문서의 family 설명이 충돌하지 않게 정리했어."
        - "버전명 하나처럼 보이지 않게 하위 모델과 제공 채널을 같이 읽으라고 본문에서 반복해 줬어."
      findings:
        - "Claude는 모델과 제품이 겹친 이름이라 층위 분리가 제일 중요해."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Anthropic의 제품 소개와 모델 개요를 붙여 보고 공통된 구조만 남겼어."
      items:
        - "비교 기준: Anthropic product 페이지의 사용자 경험 설명과 Claude API docs의 family 설명을 대조했어."
        - "공식 문서가 공통으로 말하는 API·AWS Bedrock·Vertex AI 제공 경로를 운영 디테일로 반영했어."
        - "하위 모델 세대가 자주 바뀌는 부분은 일반 Claude 페이지의 핵심에서 한 발 물렸어."
      findings:
        - "Claude는 앱에서 보든 API에서 보든 같은 큰 브랜드 아래 여러 모델이 움직여."
    - type: number_verify
      result: pass
      sources: 1
      summary: "일반 설명에 꼭 필요한 숫자만 남기고 변동 큰 수치는 줄였어."
      items:
        - "일반 Claude 페이지라서 개별 모델 가격표나 벤치마크 숫자는 본문에서 뺐어."
        - "모델 세대 숫자는 하위 항목 예시에서만 쓰고, 일반 정의를 숫자 중심으로 끌고 가지 않았어."
        - "운영 디테일은 호출 채널처럼 변동성이 덜한 정보 위주로 남겼어."
      findings:
        - "이 페이지는 숫자를 아는 것보다 어떤 이름이 어느 층위인지 아는 게 더 중요해."
    - type: adversarial
      result: pass
      sources: 1
      summary: "Claude 앱과 Claude 모델을 같은 뜻으로 읽는 오해를 줄였어."
      items:
        - "앱 기능 업데이트 기사와 API 모델 업데이트 기사를 같은 변화로 읽지 않게 경계를 세웠어."
        - "하위 모델명 없이 Claude만 보고 결론내리면 정보가 너무 뭉개진다는 점도 분명히 적었어."
        - "제품 간판과 모델 버전을 분리해야 비교가 성립한다는 점을 관련 항목까지 이어서 설명했어."
      findings:
        - "Claude라는 한 단어만으로는 실제 선택 정보가 부족해."
---
## 한 줄 정의
Claude는 Anthropic이 만드는 대형 언어 모델 계열 이름이자, 그 모델을 전면에 세운 사용자용 AI 서비스 이름이야. 그래서 Claude라는 말만으로는 특정 버전 하나를 찍는 게 아니라 모델 가족과 제품 간판이 겹친 상태라고 보는 게 맞아.
## 이 모델로 무엇을 할 수 있나
Claude는 글쓰기, 문서 분석, 코드 설명, 질의응답, 이미지가 섞인 업무 같은 범용 지식 작업에 넓게 쓰여. 실무에선 Anthropic의 Claude API로 붙이거나 AWS Bedrock, Google Vertex AI로 호출하는 경우가 많고, Anthropic 공식 모델 문서는 현재 주력 Claude 모델을 이런 채널에서 함께 제공한다고 안내하고 있어.
## 왜 중요한가
Claude라는 이름을 제대로 읽으면 기사나 제품 문서에서 무엇이 바뀌는지 훨씬 빨리 잡을 수 있어. 같은 이름 아래에 여러 하위 모델과 앱 기능이 같이 움직이기 때문에, 성능 경쟁 이야기와 사용자 경험 이야기와 배포 채널 이야기를 분리해서 읽어야 덜 틀려.
## 같이 보면 좋은 모델
- `claude-opus`: Claude 계열 안에서 더 무거운 추론과 코딩 작업을 맡는 축이야. Claude가 큰 가족 이름이라는 점을 가장 또렷하게 보여 줘.
- `claude-sonnet`: 균형형 주력 축으로 자주 언급돼. Claude 안에서 실제 선택 대상이 어떻게 갈리는지 읽기 좋게 만들어 줘.
- `chatgpt`: 모델 이름과 사용자 서비스 이름이 겹쳐 보이는 사례라는 점에서 비교가 쉬워. 제품 간판과 모델 계열을 나눠 읽는 감각을 잡게 해 줘.
- `claude-sonnet-4-5`: Claude라는 큰 이름 아래 붙는 구체 버전명의 예시야. 기사나 API 문서에서 실제 선택 단위가 어디까지 내려가는지 보여 줘.