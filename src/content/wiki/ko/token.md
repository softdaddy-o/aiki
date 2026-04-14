---
term: token
title: "Token (토큰)"
lang: ko
summary: "Token은 모델이 문장을 받아 계산할 때 쓰는 최소 처리 단위야. 기사에서 컨텍스트 길이, 최대 출력, 요금 숫자를 읽을 때는 글자 수가 아니라 토큰 기준인지 먼저 봐야 해."
readerValue: "컨텍스트 창이 얼마나 큰지, 답변이 어디서 끊길 수 있는지, 비용이 입력과 출력 중 어디에서 커지는지를 숫자만 보고도 바로 판단할 수 있게 해줘."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "tokenization"
relatedTerms:
  - llm
  - long-context
  - memory
firstMentioned: "2026-02-23"
mentionCount: 12
draft: false
tags:
  - language-model
  - context-window
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Lexical_analysis"
      title: "Lexical analysis"
    - url: "https://platform.openai.com/tokenizer"
      title: "OpenAI Platform"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "정의와 처리 흐름을 제공된 출처 방향에 맞춰 다시 썼어."
      items:
        - "독자 문제 대조: 뜻 설명에서 끝내지 않고 기사 숫자를 어떻게 읽어야 하는지까지 바로 이어지게 구성했어."
        - "단어 경계와 꼭 일치하지 않는다는 점을 남겼어."
      findings:
        - "tokenizer가 조각을 만들고 숫자 ID로 바꾼다는 처리 흐름을 빠뜨리지 않았어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "위키백과 설명과 tokenizer 맥락에 어긋나지 않게 일반화 수준을 맞춰봤어."
      items:
        - "비교 기준: 토큰을 자연어 단어 그 자체로 설명하지 않았는지, 그리고 모델 처리에서 숫자 단위로 바뀐다는 점이 빠지지 않았는지 확인했어."
        - "컨텍스트와 출력 상한과 비용을 특정 벤더 전용 주장처럼 쓰지 않았어."
      findings:
        - "언어별 토큰 효율 차이는 고정 수치로 단정하지 않고 tokenizer에 따라 달라질 수 있다고 남겼어."
    - type: number_verify
      result: pass
      sources: 2
      summary: "새로운 수치 주장은 덧붙이지 않았어."
      items:
        - "컨텍스트 길이나 최대 출력 예시 숫자는 본문에 임의로 추가하지 않았어."
        - "요금 구조는 입력 토큰과 출력 토큰이 따로 잡힐 수 있다는 원리만 남겼어."
      findings:
        - "메타데이터 숫자와 본문 설명을 섞지 않았어."
    - type: adversarial
      result: pass
      sources: 2
      summary: "처음 보는 독자가 가장 흔하게 하는 오해를 먼저 막았어."
      items:
        - "토큰을 단어, 글자, 음절과 같은 고정 단위로 오해하지 않게 했어."
        - "큰 컨텍스트 숫자가 곧 좋은 성능이라는 식으로 점프하지 않게 입력 한도와 출력 한도를 분리해서 보게 했어."
      findings:
        - "글자 수 감각으로 토큰을 짐작하면 실제 비용과 제한을 자주 잘못 읽게 돼."
---
## 한 줄 정의
Token은 모델이 텍스트를 받아들일 때 바로 세는 처리 단위야. 사람이 보는 글자 수나 단어 수와 같지 않을 수 있고, 한 단어가 여러 조각으로 나뉘거나 짧은 묶음이 하나로 잡히기도 해.
## 어떻게 작동하나
문장이 들어오면 먼저 tokenizer가 문자열을 여러 조각으로 나눠. 그다음 각 조각은 숫자 ID로 바뀌고, 모델은 그 숫자열을 바탕으로 다음 내용을 계산해. 입력 프롬프트와 이전 대화와 시스템 지시문과 출력까지 모두 같은 단위로 합산되기 때문에 토큰 수가 늘면 한도와 비용도 같이 움직여.
## 왜 중요한가
긴 프롬프트가 잘리거나 답변이 중간에서 끊기거나 예상보다 요금이 커지는 이유를 설명할 때 토큰 개념이 바로 쓰여. 기사에서도 컨텍스트 길이는 몇 토큰을 한 번에 유지하느냐를 뜻하고 최대 출력은 답변에 남겨 둔 토큰 상한을 뜻하니까, 숫자를 읽을 때 글자 수 감각으로 보면 자꾸 틀리게 돼.
## 주의해서 볼 점
토큰을 단어와 같은 말로 받아들이면 금방 헷갈려. 같은 문장도 모델마다 tokenizer가 달라서 토큰 수와 비용 추정이 달라질 수 있어. 그래서 큰 숫자만 보고 우열을 정하지 말고 어떤 모델 기준인지와 입력 한도와 출력 한도가 분리돼 있는지까지 같이 봐야 해.
## 관련 용어
- **LLM (대규모 언어 모델)**: LLM은 토큰을 입력으로 받아 다음 토큰을 예측하는 본체야. Token이 계산 재료라면 LLM은 그 재료를 이어 붙여 답을 만드는 모델이야.
- **Long Context (긴 문맥)**: Long Context는 많은 토큰을 한 번에 유지하는 능력이야. Token이 길이를 세는 단위라면 Long Context는 그 단위를 얼마나 넓게 담을 수 있는지에 관한 성능이야.
- **Memory (메모리)**: Memory는 현재 입력창 밖의 정보를 다음 상호작용에도 이어 쓰게 하는 장치에 가까워. Token은 한 번의 처리 안에서 쓰이는 길이 기준이고 Memory는 그 바깥 저장과 재호출에 더 가까워.