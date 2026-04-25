---
term: chatgpt
title: "ChatGPT(챗지피티)"
lang: ko
summary: "ChatGPT는 OpenAI가 운영하는 대화형 AI 서비스 이름이야. 단일 모델명이라기보다 여러 GPT 계열 모델, 대화 인터페이스, 안전장치, 보조 기능을 묶은 제품으로 봐야 실무 판단과 기사 해석이 덜 꼬여."
readerValue: "ChatGPT를 그냥 챗봇 이름으로 볼지, 팀의 탐색·문서·코딩 흐름까지 바꾸는 작업 표면으로 볼지 구분할 수 있어. 특히 제품명과 모델명을 섞어 읽을 때 생기는 오해를 줄이는 데 쓸모가 있어."
category: tool
formatVersion: 2
aliases:
  - "ChatGPT(챗지피티)"
relatedTerms:
  - claude
  - claude-sonnet-4-5
  - codex
  - gpt
  - gpt-4o
  - openai
firstMentioned: "2022-11-30"
mentionCount: 3
draft: false
tags:
  - openai
  - assistant
  - application
factCheck:
  status: passed
  date: "2026-04-25"
  sources:
    - url: "https://openai.com/index/chatgpt/"
      title: "Introducing ChatGPT"
    - url: "https://chatgpt.com/pricing/"
      title: "ChatGPT Plans | Free, Go, Plus, Pro, Business, and Enterprise"
    - url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
      title: "ChatGPT search"
    - url: "https://help.openai.com/en/articles/8590148-memory-faq"
      title: "Memory FAQ"
    - url: "https://help.openai.com/en/articles/20001051"
      title: "Retiring GPT-4o and other ChatGPT models"
  checks:
    - type: source_match
      result: pass
      summary: "본문의 제품명·모델명·기능 구분을 OpenAI 공식 문서와 다시 맞췄어."
      items:
        - "2022-11-30 공개 시점과 대화형 상호작용 설명은 `Introducing ChatGPT` 본문과 맞춰 확인했어."
        - "`ChatGPT search`와 `Memory FAQ`를 기준으로 검색과 메모리를 ChatGPT 안의 기능으로 설명했고, 플랜별 차이가 있을 수 있다는 조건도 함께 남겼어."
        - "`GPT-4o`는 ChatGPT 전체 이름이 아니라 시점에 따라 제공되거나 빠질 수 있는 모델 예시로만 서술해서 2026년 공식 공지와 맞췄어."
    - type: web_cross_check
      result: pass
      sources: 5
      summary: "2026-04-25 기준 OpenAI의 소개문, pricing, Help Center 문서를 교차 확인했어."
      items:
        - "`Introducing ChatGPT`는 ChatGPT를 대화형 상호작용 제품으로 설명하고, 후속 질문 대응·실수 인정·잘못된 전제 반박·부적절 요청 거부를 명시해."
        - "`ChatGPT search` 문서는 검색이 ChatGPT Free, Plus, Team, Edu, Enterprise에서 제공되고 `chatgpt.com`과 앱에서 접근된다고 적어."
        - "`Memory FAQ`는 메모리 설정이 플랜에 따라 조금 달라질 수 있다고 적고, `ChatGPT Plans` 페이지는 Free·Go·Plus·Pro·Business·Enterprise별 메모리·컨텍스트 범위를 따로 안내해."
    - type: number_verify
      result: pass
      summary: "시점이 민감한 날짜와 현재형 문장을 공식 문서로 다시 제한했어."
      items:
        - "확정 날짜는 2022-11-30 공개 시점과 2026-02-13, 2026-04-03 GPT-4o 은퇴 일정처럼 공식 문서에서 직접 확인되는 것만 근거로 삼았어."
        - "변동이 큰 사용자 수나 특정 모델 우열 평가는 빼고, 플랜·기능 차이가 있다는 수준만 남겼어."
        - "`2026년 4월` 현재형 문장은 pricing, search, memory 문서로 확인 가능한 범위로만 다시 썼어."
    - type: adversarial
      result: pass
      summary: "독자가 ChatGPT, 모델명, API를 같은 층위로 오해하지 않게 다시 점검했어."
      items:
        - "`ChatGPT에서 된다`와 `API로 바로 넣는다`를 다른 판단 문제로 분리해 썼어."
        - "`GPT-4o`를 현재 기본 구성처럼 쓰지 않고, 바뀔 수 있는 모델 예시로만 낮췄어."
        - "검색과 메모리를 만능성 근거로 쓰지 않고, 출처 품질과 플랜 차이 제약을 함께 남겼어."
      findings:
        - "본문과 `factCheck` 모두 ChatGPT를 제품명으로, [GPT-4o](/ko/wiki/gpt-4o/)를 시점 따라 달라질 수 있는 모델명으로 다루는 방향에 맞췄어."
        - "현재형 제품 차이는 2026-04-25에 확인한 공식 pricing·search·memory 문서 범위 안에서만 남겼어."
        - "검색, 최신성, 요금제 차이를 한계와 함께 적어서 만능 도구처럼 읽히지 않게 했어."
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
  contentHash: "45b335ece700bc11"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
ChatGPT는 [OpenAI](/ko/wiki/openai/)가 운영하는 대화형 AI 서비스야. 2022-11-30에 처음 공개됐고, 많은 사람이 모델 이름처럼 부르지만 실제로는 [GPT](/ko/wiki/gpt/) 계열 모델들을 대화 인터페이스, 도구, 안전장치 위에 얹어 제공하는 제품에 더 가까워. 그래서 "ChatGPT에서 된다"와 "우리 서비스에 바로 넣을 수 있다"는 같은 말이 아니야.
## 실제로 무엇을 하나
ChatGPT는 사용자가 텍스트, 음성, 이미지 같은 입력을 대화창에 넣으면 답변, 요약, 초안, 설명 같은 출력을 돌려주는 제품이야. 기본에는 [GPT](/ko/wiki/gpt/) 계열 모델이 있고, 대화 맥락 유지와 안전 응답 규칙, 검색과 [메모리](/ko/wiki/memory/) 같은 보조 기능이 조합돼 경험이 만들어져. 여기서 [GPT-4o](/ko/wiki/gpt-4o/) 같은 이름은 ChatGPT 전체 이름이 아니라, 시점에 따라 쓰이거나 빠질 수 있는 개별 모델 예시로 보는 편이 정확해.
## 왜 중요한가
- 아이디어를 빠르게 정리하고 방향을 잡는 첫 초안 도구로 많이 쓰여.
- 문서 초안이나 고객응대 문안을 짧은 왕복으로 다듬을 때 효율이 커.
- 코드 설명, 로그 해석, 배포 전 체크리스트 정리처럼 "바로 읽히는 설명"이 필요한 순간에도 자주 붙어.

하지만 배포 관점에서는 ChatGPT 자체를 네 서비스 안에 심는 문제와, [OpenAI](/ko/wiki/openai/) API나 다른 통합 경로를 설계하는 문제를 분리해서 봐야 해. [Claude](/ko/wiki/claude/)나 [Codex](/ko/wiki/codex/) 같은 다른 제품과 비교할 때도 "어느 모델이 더 세냐"보다 제품 경험, 정책, 연결 가능한 도구가 어떻게 다른지부터 보는 편이 실무 판단에 더 도움이 돼.
## 주의해서 볼 점
말을 그럴듯하게 해도 틀릴 수 있다는 점은 여전히 중요해. 최신 정보는 검색이 없으면 비어 있을 수 있고, 검색이 있어도 끌어온 출처가 부실하면 답도 흔들려.

2026년 4월 25일에 확인한 OpenAI 공식 pricing/help 문서를 기준으로 보면, ChatGPT는 무료·유료 플랜과 접속 환경에 따라 쓸 수 있는 모델, 메모리 범위, 도구 구성이 달라질 수 있어. 검색은 여러 플랜과 앱에서 제공되지만, [메모리](/ko/wiki/memory/) 설정과 범위는 플랜에 따라 차이가 날 수 있고, [GPT-4o](/ko/wiki/gpt-4o/) 같은 모델 이름도 고정 구성이 아니라 공지에 따라 은퇴하거나 바뀔 수 있어. 그래서 누가 "ChatGPT로 해봤다"고 말해도 네가 같은 환경을 보고 있는 건 아닐 수 있어.

특히 [Codex](/ko/wiki/codex/)처럼 특정 작업 맥락이 더 선명한 이름과 달리, ChatGPT는 범용 제품 이름이야. 비교할 때는 모델명, 앱 기능, API 경로를 먼저 분리해서 읽어야 판단이 덜 틀어져.
