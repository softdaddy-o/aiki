---
term: gemini
title: "Gemini (제미니)"
lang: ko
summary: "Gemini는 Google DeepMind가 쓰는 멀티모달 AI 모델 계열 이름이야. 기사에서 이 이름이 나오면 성능표 하나보다 Google이 어떤 제품 묶음과 사용처를 앞세우는지 먼저 보는 편이 맞아."
readerValue: "Gemini를 새 모델 하나로 오해하지 않고, Google이 검색·앱·개발자 API를 어떤 방향으로 묶어 가는지 읽는 기준을 잡을 수 있어."
category: model
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "google gemini"
  - "제미니"
relatedTerms:
  - gemini-2.5
  - gpt-4o
  - gemma
  - gemini-api
firstMentioned: "2026-02-18"
mentionCount: 23
draft: false
tags:
  - google
  - multimodal
  - model
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemini_(language_model)"
      title: "Gemini (language model)"
    - url: "https://deepmind.google/technologies/gemini/"
      title: "Gemini 3 — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "정의와 제품 맥락 설명이 제공된 출처 요약 범위를 벗어나지 않는지 맞춰봤어."
      items:
        - "독자 문제 대조: Gemini를 단일 챗봇이 아니라 Google DeepMind의 멀티모달 모델 계열로 설명했는지 확인."
        - "후속 관계 대조: LaMDA와 PaLM 2 뒤를 잇는 계열이라는 출처 요약과 충돌하는 서술이 없는지 확인."
        - "서비스 연결 대조: 같은 이름의 챗봇을 구동한다는 정보가 서비스명·모델명 혼동 주의점에 반영됐는지 확인."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "위키 요약과 DeepMind 소개 문구를 나란히 놓고, 문서가 계열명과 제품 전략 쪽에 무게를 두는지 다시 봤어."
      items:
        - "비교 기준: Wikipedia의 '멀티모달 모델 계열' 설명과 DeepMind의 최신 Gemini 소개 문구를 함께 볼 때, 문서가 특정 벤치마크보다 계열 성격을 중심에 두는지 확인."
        - "두 출처 모두 Gemini를 폭넓은 작업을 겨냥한 모델군으로 다루는 만큼, 본문이 단일 기능 모델처럼 좁게 쓰이지 않았는지 확인."
        - "DeepMind 페이지가 최신 세대 홍보 성격을 띠는 점을 감안해, 본문에서 미확인 세부 스펙을 고정 표현으로 쓰지 않았는지 확인."
    - type: number_verify
      result: pass
      summary: "숫자 정보는 확인 가능한 범위만 남기고 과장되거나 비어 있는 수치를 넣지 않았는지 한 번 더 봤어."
      items:
        - "Gemini 계열 발표 시점을 2023년 12월 6일로 이해해도 제공된 출처 요약과 어긋나지 않는지 확인."
        - "본문에서 파라미터 수, 가격, 벤치마크 점수처럼 제공되지 않은 숫자를 새로 만들지 않았는지 확인."
        - "하위 모델 수나 버전 수를 본문 핵심 정의에 박아 두지 않아, 라인업 변화와 충돌하지 않게 했는지 확인."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오독을 일부러 대입해 보고도 뜻이 무너지지 않는지 한 번 더 봤어."
      items:
        - "Gemini를 챗봇 앱 이름으로만 읽어도, 본문 첫 섹션이 모델 계열이라는 뜻으로 바로 돌려세우는지 확인."
        - "Gemini를 특정 버전 하나로 읽어도, 계열명과 세대명이 다르다는 설명이 남는지 확인."
        - "Gemini와 Gemma를 같은 배포 전략으로 착각하지 않게 관련 용어 비교가 분리돼 있는지 확인."
      findings:
        - "서비스 이름과 모델 브랜드가 같아서 기사 제목만 보면 제품명인지 모델명인지 쉽게 섞인다."
        - "'Gemini'만 적힌 기사에는 실제 대상인 세대명이나 하위 모델명이 빠져 있는 경우가 많다."
---
## 한 줄 정의
Gemini는 Google DeepMind가 만드는 멀티모달 AI 모델 계열 이름이야. 텍스트만 처리하는 챗봇 하나를 가리키는 말이 아니라, 이미지·음성·텍스트를 함께 다루는 여러 모델과 그 위에 얹힌 서비스를 묶는 브랜드에 더 가까워.
그래서 Gemini라는 단어를 보면 특정 버전 하나의 점수부터 찾기보다, Google이 어떤 입력 방식과 제품 경험을 밀고 있는지부터 보는 편이 덜 헷갈려.
## 어떻게 작동하나
Gemini 계열은 입력으로 글만 받는 데서 끝나지 않고, 이미지나 음성 같은 다른 형식도 함께 이해하도록 설계된 멀티모달 모델군으로 알려져 있어. 같은 Gemini 안에서도 빠른 응답을 앞세운 모델, 더 깊은 추론이나 계획 작업을 노리는 모델처럼 성격이 갈리기 때문에, 이름은 같아도 실제 체감은 꽤 달라질 수 있어.
중요한 점은 Gemini가 모델 이름이면서 동시에 서비스 이름으로도 쓰인다는 거야. 사용자는 챗봇 앱에서 Gemini를 만나고, 개발자는 API로 Gemini를 호출하고, Google은 이 둘을 같은 간판 아래 묶어서 제품 전략을 설명해.
## 왜 중요한가
실무에서는 Gemini라는 이름만 보고 기능, 속도, 가격, 입력 한도를 확정하면 거의 틀려. 실제 도입 판단은 Gemini 뒤에 붙는 세대명이나 하위 모델명, 그리고 API 문서나 제품 문서를 같이 봐야 해.
기사 해석에서도 이 구분이 중요해. 뉴스 제목에 Gemini만 적혀 있으면 그건 새 버전 하나의 성능 자랑일 수도 있지만, 검색·안드로이드·워크스페이스·개발자 플랫폼을 한 방향으로 묶겠다는 신호일 때도 많아. 그래서 Gemini는 벤치마크 숫자보다 Google이 어디에 힘을 싣는지 읽는 데 더 유용한 이름이야.
## 주의해서 볼 점
첫째, Gemini는 단일 모델명이 아니라 계열명이라서 범위가 넓어. 기사나 발표 자료에 Gemini만 적혀 있으면 실제로는 어떤 버전인지, 어떤 제품에서 쓰이는지 빠져 있는 경우가 많으니 뒤에 붙는 세대명과 서비스 맥락을 꼭 같이 봐야 해.
둘째, Gemini라는 이름은 챗봇 서비스와 모델 브랜드가 겹쳐서 자주 혼동돼. 어떤 문장은 앱 기능을 말하고 있고, 어떤 문장은 API에서 호출하는 기반 모델을 말하고 있는데 둘 다 Gemini라고 부르기 때문에, 문맥을 놓치면 제품 이야기와 모델 이야기를 섞어 읽게 돼.
## 관련 용어
- `Gemini 2.5`: Gemini 전체 계열 안의 특정 세대나 버전을 가리켜. Gemini가 큰 간판이라면, 2.5는 그 안에서 실제 성능과 추론 성격을 따질 대상이야.
- `GPT-4o`: OpenAI의 멀티모달 모델이야. 둘 다 여러 입력 형식을 다루지만, Gemini는 Google 제품 묶음과 연동 전략을 같이 읽어야 하고 GPT-4o는 실시간 대화 경험과 API 활용 문맥에서 더 자주 비교돼.
- `Gemma`: Google 계열이지만 성격이 다르다. Gemini가 서비스와 API 중심의 주력 모델 브랜드라면, Gemma는 공개 가중치와 경량 배포 쪽 비교가 더 잘 맞아.
- `Gemini API`: Gemini 모델을 개발자가 프로그램에서 호출하는 통로야. Gemini가 모델 계열 자체를 뜻한다면, Gemini API는 그 계열을 앱이나 서비스에 붙이는 방법을 뜻해.