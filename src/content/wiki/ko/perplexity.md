---
term: perplexity
title: "Perplexity (퍼플렉시티)"
lang: ko
summary: "Perplexity는 웹 검색 결과와 출처를 묶어 답으로 정리해 주는 답변형 검색 제품이야. 모델 이름이라기보다 검색, 요약, 출처 제시를 한데 묶은 서비스로 보는 게 더 정확해."
readerValue: "답변형 검색 제품을 볼 때 모델 자체보다 검색·출처 합성이 핵심인지 읽게 해 줘."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Perplexity (퍼플렉시티)"
relatedTerms:
  - chatgpt
  - claude
  - vector-db
  - grok
firstMentioned: "2026-03-18"
mentionCount: 3
draft: false
tags:
  - search
  - assistant
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://en.wikipedia.org/wiki/Perplexity_AI"
      title: "Perplexity AI"
    - url: "https://www.perplexity.ai/hub"
      title: "Perplexity Blog"
  checks:
    - type: source_match
      result: pass
      summary: "Perplexity를 답변형 검색 제품으로 소개하는 축을 공식 문서에 맞췄어."
      items:
        - "독자 문제 대조: Perplexity를 모델 이름이 아니라 web-grounded 답변과 검색을 묶은 제품으로 정리했어."
        - "Perplexity Help Center가 answer engine이라고 직접 설명하고, docs도 Search와 Sonar를 따로 둬서 본문을 검색+합성 서비스 관점으로 썼어."
        - "출처 제시를 강점으로 보되 정확성 보장은 아니라는 공식 안내도 반영해서 주의 문단에 넣었어."
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "도움말과 개발자 문서가 같은 제품 성격을 말하는지 맞춰 봤어."
      items:
        - "비교 기준: Help Center의 answer engine 설명과 API docs의 Search, Sonar 소개가 모두 '웹에서 찾고 답으로 합성한다'는 축을 공유하는지 확인했어."
        - "도움말은 trusted sources와 synthesis를, docs는 ranked search results와 web-grounded responses를 말해서 서로 보완적으로 맞물렸어."
        - "검색 API와 답변 API가 분리돼 있다는 점도 본문에서 '모델 하나'가 아니라 제품 조합으로 설명하는 근거가 됐어."
    - type: number_verify
      result: pass
      summary: "개발자 문서에 고정돼 있는 숫자만 골라 다시 맞췄어."
      items:
        - "현재 quickstart가 Agent, Search, Sonar, Embeddings 네 가지 핵심 API를 제시하는지 확인했어."
        - "Search API 문서에서 max_results 범위가 1~20인지, 기본값이 10인지 확인했어."
        - "max_tokens_per_page 기본값이 1024로 적혀 있는지도 다시 맞췄어."
    - type: adversarial
      result: pass
      summary: "출처가 보인다는 이유만으로 정답이라고 읽히지 않게 막아 뒀어."
      items:
        - "링크가 붙어 있다는 사실과 그 링크를 제대로 읽고 요약했다는 건 다르다는 점을 주의 문단에 남겼어."
        - "Perplexity를 '검색 엔진 대체' 하나로만 보지 않게, 답변 합성과 후속 질문 흐름까지 같이 설명했어."
        - "실시간 정보 강점만 강조하다가 문서 선택 편향과 요약 오독 가능성이 빠지지 않게 균형을 잡았어."
      findings:
        - "Perplexity는 인터페이스가 워낙 매끄러워서 답이 곧 사실처럼 느껴지기 쉬워. 실제론 검색 결과 선택과 요약이라는 두 단계가 더 끼어 있으니까 출처까지 같이 읽어야 해."
---
## 한 줄 정의
Perplexity는 질문을 웹에서 찾고 그 결과를 묶어 답으로 정리해 주는 AI 검색 서비스야. [공식 허브](https://www.perplexity.ai/hub)와 [도움말 문서](https://www.perplexity.ai/help-center/en/articles/10354919-what-is-perplexity)는 둘 다 이걸 answer engine 쪽 서비스로 설명해.
## 어떻게 작동하나
질문이 들어오면 관련 웹 문서를 찾고, 그 내용을 모델이 요약하고 정리해서 답으로 보여줘. [개발자 문서](https://docs.perplexity.ai/) 기준으로도 `max_results`를 1~20개 범위로 두고 기본값을 10개로 설명할 만큼 검색 단계와 답변 단계가 명확하게 갈려 있어.
## 왜 중요한가
Perplexity를 이해하면 누가 더 똑똑한 모델이냐보다, 누가 최신 정보를 어떻게 끌어오고 출처를 어떻게 붙여 주느냐가 중요한 제품이 있다는 걸 바로 알 수 있어. Search API 문서의 `max_tokens_per_page` 기본값도 1024토큰으로 잡혀 있어서, 이 제품은 모델 하나보다 검색과 요약 파이프라인 설계가 더 중요하다는 점이 드러나.
## 주의해서 볼 점
Perplexity가 출처를 보여준다고 해서 답 전체가 자동으로 정확해지는 건 아니야. 검색 품질, 문서 선택, 요약 과정이 한 번 더 개입하니까 링크가 있다는 사실과 링크를 제대로 읽었다는 건 따로 판단해야 해.
## 관련 용어
- [chatgpt](/ko/wiki/chatgpt/)는 범용 챗봇 인상이 더 강해. Perplexity와 같이 보면 대화 제품과 검색 제품의 중심축 차이가 선명해져.
- [claude](/ko/wiki/claude/)는 긴 문서 해석과 글쓰기 보조 쪽에서 자주 비교돼. Perplexity는 검색 연결이 앞에 있고 Claude는 모델 상호작용이 앞에 있다는 차이가 보여.
- [vector-db](/ko/wiki/vector-db/)는 사내 문서 검색이나 RAG에서 웹 대신 내부 데이터를 꺼낼 때 들어가는 계층이야. 그래서 Perplexity를 보면 public web 쪽 retrieval 감각을 떠올리기 쉬워.
- [grok](/ko/wiki/grok/)는 질문 응답 제품처럼 보이지만 실시간성, 검색, 브랜딩 조합이 다르게 잡혀 있어. 둘을 비교하면 모델 대결보다 제품 설계 차이가 더 잘 보여.
