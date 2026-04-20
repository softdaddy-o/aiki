---
term: function-calling
title: "Function Calling(함수 호출)"
lang: ko
summary: "Function Calling(함수 호출)은 모델이 답변만 쓰는 대신, 바깥 함수나 API를 어떤 인자로 부를지 구조화된 요청을 만드는 방식이야. 핵심은 문장 생성보다 외부 시스템과 연결되는 호출 계약에 있어."
readerValue: "이 말이 답변 생성 얘기가 아니라 외부 도구 실행과 연결 구조 얘기인지 빨리 구분하게 해줘."
category: technique
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "tool calling"
relatedTerms:
  - mcp
  - openai-api
  - anthropic-api
  - gemini-api
firstMentioned: "2026-04-07"
mentionCount: 1
draft: false
tags:
  - tool-use
  - api
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://platform.openai.com/docs/guides/function-calling"
      title: "Function calling | OpenAI API"
    - url: "https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview"
      title: "Tool use with Claude"
  checks:
    - type: source_match
      result: pass
      summary: "정의를 답변 꾸미기 기술이 아니라 호출 계약이라는 축으로 맞춰봤어."
      items:
        - "독자 문제 대조: 이 문서를 답변 품질 설명이 아니라 외부 도구 실행 연결 구조 설명으로 잡았는지 확인했어."
        - "OpenAI 문서의 설명처럼 모델이 함수 이름과 인자를 포함한 호출을 만들고, 앱이 그 호출을 실행한 뒤 결과를 다시 넘기는 흐름을 반영했어."
        - "Anthropic 문서의 설명처럼 모델이 스스로 코드를 실행하지 않고 구조화된 요청을 내보내며, 실행 위치에 따라 책임이 달라진다는 점을 넣었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "OpenAI와 Anthropic 문서를 같이 놓고 공통점과 차이를 다시 봤어."
      items:
        - "비교 기준: 두 문서 모두 function calling 또는 tool use를 외부 도구 연결 방식으로 설명하는지 확인했어."
        - "OpenAI 쪽은 앱이 `tool_calls`를 실행하고 결과를 돌려보내야 한다는 점을 강조하고, Anthropic 쪽은 `tool_use`와 `tool_result`, 실행 위치 구분을 더 선명하게 설명해."
        - "용어는 달라도 둘 다 모델이 실행 자체를 맡는 게 아니라 구조화된 요청을 만들고 주변 시스템이 그 요청을 처리한다는 틀은 같아."
    - type: number_verify
      result: pass
      summary: "시간 지나면 깨지기 쉬운 숫자는 본문에서 최대한 뺐어."
      items:
        - "벤치마크 점수, 가격, 지원 모델 수처럼 자주 바뀌는 숫자는 본문에 넣지 않았어."
        - "예시는 구조 설명용으로만 두고, 호출 횟수나 성능 향상 폭처럼 근거가 빨리 낡는 수치 표현은 피했어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해가 다시 들어오지 않았는지 따로 점검했어."
      items:
        - "가장 흔한 오해인 모델이 함수나 API를 직접 실행한다는 식으로 읽히지 않는지 봤어."
        - "또 다른 오해인 Function Calling은 JSON 출력만 예쁘게 만드는 기능이라는 방향으로 흐르지 않게, 실행 책임이 앱이나 서버 쪽에 있다는 점을 분리했어."
      findings:
        - "Function Calling은 실행 그 자체보다 호출 계약과 실행 루프를 뜻한다는 해석으로 유지했어."
        - "단순 구조화 출력과 실제 도구 연결을 같은 말처럼 섞지 않도록 문장을 정리했어."
---
## 한 줄 정의
Function Calling은 모델이 자연어 답변 대신 함수 이름과 인자를 갖춘 호출 요청을 내보내는 방식이야. 그래서 이 말은 글을 더 그럴듯하게 쓰는 기술보다, 바깥 시스템을 연결하는 실행 인터페이스를 뜻한다고 보면 돼.
## 어떻게 작동하나
개발자는 먼저 어떤 도구를 쓸 수 있는지와 각 도구가 받는 입력 형식을 스키마로 알려 줘. 그러면 모델은 바로 답할지, 아니면 특정 도구를 호출할지 고른 뒤 구조화된 요청을 만들어.
그다음 실제 실행은 앱이나 서버가 맡아. 예를 들어 날씨를 묻는 요청이면 모델이 `weather` 호출과 도시 이름 같은 인자를 만들고, 서버가 그 호출을 실행한 뒤 결과를 다시 모델에 넣어서 최종 답변을 완성하는 식이야.
## 왜 중요한가
실무에서는 검색, 결제, 사내 API 조회, 파일 수정처럼 텍스트만으로 끝나지 않는 일을 붙일 때 이 구조가 필요해. 그래서 에이전트나 자동화를 만들 때 진짜 난점은 모델의 문장력보다 도구 스키마, 권한, 실패 처리, 재시도 설계에 더 많이 걸려.
이걸 알고 있으면 기사에서 모델이 스스로 행동한다는 표현이 나와도 안쪽에서 뭐가 돌아가는지 덜 헷갈려. 어디까지가 모델 책임이고 어디부터가 애플리케이션 책임인지 읽어내는 기준이 생겨.
## 주의해서 볼 점
Function Calling을 붙였다고 해서 모델이 외부 세계를 자동으로 이해하는 건 아니야. 도구 설명이 모호하거나 인자 스키마가 헐거우면 엉뚱한 호출을 만들 수 있고, 실행 결과가 틀리면 최종 답도 같이 흔들려.
또 이름이 비슷하다고 항상 같은 범위를 뜻하는 것도 아니야. 어떤 서비스는 function calling, 어떤 서비스는 [tool use](/ko/wiki/tool-use/)나 tool calling이라고 부르지만, 단순 JSON 출력만 있는 경우는 실제 도구 실행 루프까지 포함하지 않을 수 있어서 구분해서 봐야 해.
## 관련 용어
- [MCP](/ko/wiki/mcp/)는 모델이 여러 도구와 리소스를 만나는 연결 규약에 더 가까워. Function Calling은 그 안에서 실제 호출 요청을 어떤 형식으로 주고받을지에 더 가깝다고 보면 돼.
- [OpenAI API](/ko/wiki/openai-api/)는 function calling을 모델 출력과 도구 실행 루프로 다루는 대표 사례야. 여기서는 모델이 `tool_calls`를 만들고, 앱이 그 호출을 실행한 뒤 결과를 다시 넘겨.
- [Anthropic API](/ko/wiki/anthropic-api/)는 비슷한 개념을 `tool_use`와 `tool_result`라는 흐름으로 설명해. 특히 도구가 앱에서 도는지, 제공사 서버에서 도는지 실행 위치를 더 분명하게 나눠.
- [Gemini API](/ko/wiki/gemini-api/)도 함수 호출 계열 기능을 제공하지만 세부 스키마와 응답 형식은 다를 수 있어. 그래서 공급자 이름만 보고 전부 같은 방식이라고 넘기면 놓치는 게 생겨.