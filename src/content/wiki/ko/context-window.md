---
term: context-window
title: "Context Window(컨텍스트 윈도우)"
lang: ko
summary: "모델이 한 번의 요청과 응답 동안 실제로 참고할 수 있는 전체 토큰 범위를 뜻해."
readerValue: "기사나 제품 문서에서 128K, 200K, 1M 같은 숫자가 보일 때 그게 품질 보장이 아니라 입력·출력 상한이라는 점, 그리고 비용·지연·실사용 문서 길이를 따로 봐야 한다는 기준을 잡을 수 있어."
category: concept
aliases:
  - "context length"
  - "컨텍스트 윈도우"
relatedTerms:
  - long-context
  - tokenizer
firstMentioned: "2026-04-11"
mentionCount: 1
draft: false
tags:
  - tokens
  - memory
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Large_language_model"
      title: "Large language model - Wikipedia"
    - url: "https://docs.anthropic.com/en/docs/build-with-claude/context-windows"
      title: "Context windows"
  checks:
    - type: source_match
      result: pass
      summary: "정의와 본문이 출처에서 말하는 '현재 요청에서 모델이 참고하는 토큰 범위'라는 핵심 뜻에 맞는지 맞춰봤어."
      items:
        - "독자 문제 대조: 컨텍스트 윈도우를 학습량이나 영구 기억으로 오해하지 않게, 요청 시점의 작업 범위로 설명했어."
        - "입력만이 아니라 생성될 출력도 같은 예산에 들어간다는 점을 본문에 넣었어."
        - "길이가 커져도 품질이 자동으로 좋아지지 않는다는 조건을 함께 적어 과장 해석을 막았어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "Anthropic 문서와 Wikipedia 설명이 서로 충돌하지 않는지 다시 봤어."
      items:
        - "비교 기준: 한 번의 생성에서 모델이 참조하는 범위를 말하는지, 학습 데이터 전체를 말하는지 구분했어."
        - "Anthropic 문서는 입력과 출력 전체가 컨텍스트 예산에 들어간다고 설명하고, Wikipedia는 attention이 context window 안에서 토큰 관계를 본다고 설명해 기본 개념이 이어져."
        - "두 출처 모두 토큰 단위로 서술해서 글자 수나 페이지 수로 단정하는 표현을 피했어."
    - type: number_verify
      result: pass
      summary: "숫자 예시가 특정 모델의 고정 스펙처럼 읽히지 않도록 한 번 더 봤어."
      items:
        - "128K, 200K, 1M 같은 표기는 기사에서 자주 보이는 예시라는 맥락으로만 다뤘어."
        - "토큰 수를 단어 수나 페이지 수로 고정 환산하지 않았어."
        - "출력 토큰도 같은 한도를 쓰기 때문에 입력 여유가 줄 수 있다는 점을 남겼어."
    - type: adversarial
      result: pass
      summary: "자주 붙는 오해를 기준으로 설명이 헷갈리지 않는지 한 번 더 봤어."
      items:
        - "컨텍스트 윈도우를 장기 기억, 개인화 메모리, 학습 데이터 크기와 같은 뜻으로 쓰지 않았어."
        - "큰 숫자가 곧 정확도 상승이라는 인상을 주는 문장을 피했어."
        - "긴 컨텍스트가 있어도 RAG, 요약, 압축 전략이 완전히 사라진다고 말하지 않았어."
      findings:
        - "'1M 컨텍스트면 모델이 모든 내용을 끝까지 정확히 기억한다'는 오해를 배제했어."
        - "'컨텍스트 윈도우가 크면 학습량도 더 많다'는 혼동을 분리했어."
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
  contentHash: "0a4730ca4d93dc6d"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Context Window는 모델이 답을 만들 때 눈앞에 두고 참고하는 전체 [토큰](/ko/wiki/token/) 범위야. 프롬프트, 이전 대화, 붙인 문서, 도구 호출 결과, 그리고 이번에 생성할 답변까지 전부 이 범위 안에서 같이 계산돼.
이건 [학습](/ko/wiki/training/) 데이터의 크기나 모델의 장기 기억을 뜻하는 말이 아니야. 더 정확하게는 지금 이 순간 모델이 작업용으로 붙잡고 있는 임시 작업 공간에 가까워.
## 어떻게 작동하나
모델은 문장을 글자 그대로 읽지 않고 [토큰](/ko/wiki/token/) 단위로 쪼개서 처리해. 그래서 컨텍스트 윈도우도 글자 수가 아니라 [토큰](/ko/wiki/token/) 수로 잡히고, 같은 문서라도 [tokenizer](/ko/wiki/tokenizer/)가 다르면 실제로 들어가는 양이 달라져.
대화가 길어질수록 이전 턴과 새 입력이 계속 누적되고, 여기에 출력 [토큰](/ko/wiki/token/) 몫까지 더해져 전체 예산을 써. 상한이 크면 긴 문서나 긴 대화를 한 번에 다루기 쉬워지지만, 내용이 많다고 항상 더 잘 읽는 건 아니고 중간 정보 회수력이 떨어지는 문제도 생길 수 있어.
## 왜 중요한가
실무에서는 이 숫자가 곧바로 설계 선택으로 이어져. 컨텍스트가 넓으면 문서를 덜 잘게 쪼개도 되고, 여러 검색 결과나 로그를 한 번에 붙여 넣기 쉬워져서 요약 파이프라인이나 RAG 구성을 단순하게 만들 수 있어.
기사 해석에서도 중요해. '1M 컨텍스트' 같은 문구가 나오면 먼저 긴 입력을 넣을 수 있는 상한이 커졌다고 읽으면 되고, 그다음에 실제 품질이 유지되는지, 응답 지연이 얼마나 늘어나는지, 비용이 감당 가능한지 따로 봐야 해. 숫자가 커졌다는 사실만으로 정확도나 [추론](/ko/wiki/inference/) 능력까지 같이 올라갔다고 보면 오독이야.
## 주의해서 볼 점
첫째, 큰 컨텍스트와 좋은 성능은 같은 말이 아니야. 윈도우가 넓어도 모델이 긴 문서의 모든 부분을 균등하게 잘 쓰는 건 아니어서, 중요한 정보는 여전히 앞뒤 배치나 요약 방식의 영향을 받아.
둘째, 숫자 비교를 그대로 믿으면 곤란해. 같은 200K라도 어떤 [tokenizer](/ko/wiki/tokenizer/)를 쓰는지, 한국어·코드·표·PDF가 얼마나 섞였는지에 따라 체감 길이가 달라지고, 출력 토큰이 많이 필요하면 입력에 쓸 수 있는 몫은 줄어들어. 셋째, 제품 채팅 화면에서 보여 주는 체감 대화 길이와 API의 공식 컨텍스트 계산 방식이 같지 않은 경우도 있어서, 기사나 문서가 무엇을 기준으로 말하는지도 확인해야 해.
## 관련 용어
- [Long Context(롱 컨텍스트)](/ko/wiki/long-context/) — 컨텍스트 윈도우가 '얼마나 많이 담을 수 있나'라는 상한 개념이라면, 롱 컨텍스트는 그 긴 범위를 실제 성능과 제품 경쟁력으로 다루는 쪽에 더 가까워. 숫자만 큰지, 긴 입력에서도 회수와 추론이 버티는지는 여기서 갈려.
- [Tokenizer(토크나이저)](/ko/wiki/tokenizer/) — 컨텍스트 윈도우 숫자를 실제 문서 길이로 바꿔 읽으려면 먼저 봐야 하는 도구야. 같은 문장도 tokenizer가 다르면 토큰 수가 달라져서, 스펙표의 K 숫자가 현실에서 체감되는 길이와 어긋날 수 있어.
