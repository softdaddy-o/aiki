---
term: tokenizer
title: Tokenizer(토크나이저)
lang: ko
summary: Tokenizer는 텍스트를 토큰으로 쪼개고 숫자 ID로 바꾸는 규칙과 도구를 말해.
readerValue: 'tokenizer가 나오면 모델 품질 얘기보다 비용, 길이 제한, 입력 처리 방식부터 읽는 데 도움 돼.'
category: tool
aliases:
  - tokenizer
relatedTerms:
  - context-window
mentionCount: 0
draft: false
tags:
  - tokens
  - preprocessing
factCheck:
  status: passed
  date: '2026-04-14'
  sources:
    - url: 'https://en.wikipedia.org/wiki/Lexical_analysis'
      title: Lexical analysis
    - url: 'https://platform.openai.com/tokenizer'
      title: OpenAI Platform
  checks:
    - type: source_match
      result: pass
      summary: tokenizer를 텍스트 분해와 숫자화 규칙으로 잡은 정의를 소스에 맞춰봤어.
      items:
        - >-
          독자 문제 대조: tokenizer를 독립 모델이나 단순 텍스트 에디터 기능으로 읽지 않도록 입력 전처리 도구라는 점부터
          확인했어.
        - >-
          Lexical analysis 설명과 OpenAI tokenizer 도구 맥락을 겹쳐 보고, 토큰화 뒤에 숫자 ID 단계가
          따라온다는 축을 본문에 남겼어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 일반 토큰화 설명과 LLM 실사용 맥락이 같은 흐름으로 이어지는지 다시 봤어.
      items:
        - >-
          비교 기준: 일반 언어 처리의 tokenization 개념과 LLM 서비스에서 보는 tokenizer 도구가 얼마나 이어지는지
          비교했어.
        - >-
          위키 쪽 설명은 개념 정의를 주고 OpenAI 쪽은 실제 토큰 단위 체감 도구를 보여 줘서, 본문을 개념과 실무 영향 둘 다
          잡는 방향으로 맞췄어.
    - type: number_verify
      result: skip
      summary: 고정 배율처럼 오해 부르는 숫자는 빼고 검증 가능한 말만 남겼어.
      items:
        - 문장 하나가 몇 토큰이 되는지는 모델과 tokenizer마다 달라져서 본문에 고정 비율을 넣지 않았어.
        - 대신 토큰 수가 비용과 한도에 직접 영향을 준다는 구조적 설명만 남겼어.
    - type: adversarial
      result: pass
      summary: tokenizer를 모델 품질과 같은 층위로 읽는 오해를 막았어.
      items:
        - 입력 분해 방식과 모델의 추론 능력은 다른 층위라서 둘을 분리해 적었어.
        - 모델 이름이 비슷하다는 이유만으로 tokenizer도 같다고 보는 실수를 피하도록 경계 문장을 남겼어.
      findings:
        - tokenizer를 모르면 토큰 한도 기사에서 왜 비용 얘기가 같이 붙는지 읽기 어려워져.
        - 반대로 tokenizer만 보고 모델 성능까지 단정하면 해석이 과해지기 쉬워.
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
  contentHash: "0356082613d08560"
  reviewedAt: "2026-04-25T09:55:57Z"
---
## 한 줄 정의
Tokenizer는 사람이 읽는 문장을 모델이 다루는 [토큰](/ko/wiki/token/) 묶음으로 바꾸는 규칙과 도구야. 모델은 문장을 통째로 받는 게 아니라 tokenizer가 잘게 나눈 조각과 그 조각의 숫자 표현을 입력으로 받아.
## 어떻게 작동하나
텍스트가 들어오면 tokenizer가 자주 함께 나타나는 글자 조합, 공백, 기호 같은 기준으로 문자열을 쪼개서 [토큰](/ko/wiki/token/) 시퀀스를 만들어. 그다음 각 토큰이 숫자 ID로 바뀌고, 모델은 그 숫자열을 바탕으로 길이 계산과 다음 [토큰](/ko/wiki/token/) 예측을 진행해.
## 왜 중요한가
같은 프롬프트라도 tokenizer가 다르면 [토큰](/ko/wiki/token/) 수가 달라져서 비용과 컨텍스트 소모 속도가 같이 바뀌어. 그래서 기사나 문서에서 [토큰](/ko/wiki/token/) 한도 얘기가 나오면 모델 이름만 볼 게 아니라 어떤 tokenizer를 쓰는지도 같이 봐야 감이 맞아.
## 주의해서 볼 점
Tokenizer는 모델 자체가 아니고 모델이 텍스트를 읽는 방식의 일부야. tokenizer가 효율적이라고 해서 모델 답변 품질까지 자동으로 좋아진다고 결론 내리면 과하고, 반대로 모델 이름이 비슷하다고 tokenizer까지 같다고 봐도 틀릴 수 있어.
## 관련 용어
- [context-window](/ko/wiki/context-window/): context window는 몇 토큰까지 한 번에 담을 수 있는지의 한도야. tokenizer를 알아야 실제로 문장이 얼마나 빨리 창을 채우는지 감이 와.
- [token](/ko/wiki/token/): token은 tokenizer가 만들어 내는 기본 단위야. 둘을 떼어 읽으면 비용 계산과 길이 계산이 자꾸 헷갈려.
