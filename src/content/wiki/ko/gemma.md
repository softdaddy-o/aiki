---
term: gemma
title: "Gemma (젬마)"
lang: ko
summary: "Gemma는 Google DeepMind가 개발자 배포와 자체 호스팅 쪽에 내세우는 공개형 모델 계열이야. 기사에서는 벤치마크 한 줄보다 Google이 어떤 모델을 클라우드 밖으로 풀고, 어떤 기기 범위까지 확장하려는지 읽는 단서로 보는 편이 맞아."
readerValue: "기사에서 Gemma가 나오면 점수표보다 Google이 공개 모델 생태계, 자체 호스팅, 엣지 기기 실행을 어디까지 밀고 있는지 먼저 읽는 기준이 생겨."
category: model
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "google gemma"
  - "젬마"
relatedTerms:
  - gemma-3
  - gemini
  - deepseek-r1
  - llama
firstMentioned: "2026-03-19"
mentionCount: 12
draft: false
tags:
  - open-model
  - google
  - model
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Gemma_(language_model)"
      title: "Gemma (language model)"
    - url: "https://ai.google.dev/gemma"
      title: "Gemma — Google DeepMind"
  checks:
    - type: source_match
      result: pass
      summary: "정의와 본문이 주어진 출처 요약에서 벗어나지 않았는지 맞춰봤어."
      items:
        - "독자 문제 대조: Gemma를 모델 하나가 아니라 Google DeepMind의 계열형 이름으로 설명해서, 기사에서 제품 전략과 사용처를 먼저 읽게 하려는 초점을 본문 앞부분에 반영했어."
        - "Wikipedia 요약의 'source-available large language models'와 'Gemini와 비슷한 기술 기반'이라는 핵심을 정의와 작동 설명에 녹였어."
        - "Google DeepMind 소개문의 'cloud servers to laptops and even phones'라는 배포 범위를 받아서 자체 호스팅, 엣지, 기기 실행 맥락으로 풀었어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "백과 요약과 Google 공식 소개가 서로 어긋나지 않는지 다시 봤어."
      items:
        - "비교 기준: Wikipedia는 Gemma를 Google DeepMind의 계열형 모델로 설명하고, Google 공식 페이지는 여러 기기에서 돌릴 수 있는 open models로 설명해. 둘을 겹쳐 보면 '계열 + 배포 전략'이라는 핵심이 일치해."
        - "공식 페이지는 제품 포지셔닝을, Wikipedia는 출시 흐름과 파생 모델을 보완해 줘서 한쪽만 볼 때보다 계열 성격을 더 안정적으로 설명할 수 있었어."
        - "두 출처 모두 Gemma를 Gemini와 연결된 별도 공개형 축으로 다루지만, 특정 세대의 기능 범위를 한 문장으로 고정하지는 않아서 본문에서도 버전 의존성을 남겨뒀어."
    - type: number_verify
      result: pass
      summary: "출시 시점과 라이선스 변화처럼 날짜가 붙는 부분은 한 번 더 봤어."
      items:
        - "첫 공개는 2024-02-21, Gemma 2는 2024-06-27, Gemma 3는 2025-03-12, Gemma 4는 2026-04-02 흐름으로 맞춰 적었어."
        - "라이선스 표현은 Gemma 4의 Apache 2.0과 Gemma 3 이전의 source-available 구분에 맞춰 썼고, 계열 전체를 처음부터 완전 오픈소스였다고 적지 않았어."
        - "버전별 기능 차이가 커서 파라미터 수나 벤치마크 점수는 계열 소개 문서에서 빼고, 날짜와 배포 성격처럼 비교적 안정적인 정보만 남겼어."
    - type: adversarial
      result: pass
      summary: "헷갈리기 쉬운 오해를 일부러 세게 걸어보고도 문장이 버티는지 다시 봤어."
      items:
        - "Gemma를 Gemini의 다른 이름으로 오해하지 않도록, 같은 연구 계통이지만 공개 배포형 계열이라는 차이를 분리했어."
        - "Gemma를 처음부터 완전한 오픈소스 계열로 읽는 실수를 막으려고, 2026-04-02의 Gemma 4를 기준으로 라이선스 변화가 있었다는 점을 따로 적었어."
        - "Gemma라는 이름만 보고 전부 멀티모달이거나 전부 모바일 최적화라고 단정하지 않도록, 하위 버전 확인이 필요하다는 경고를 남겼어."
      findings:
        - "기사 제목에 Gemma만 쓰고 버전을 빼면 기능 범위를 과장해 읽기 쉽다."
        - "오픈 모델이라는 말이 곧바로 배포 자유도, 상업 사용 조건, 지원 플랫폼까지 자동 보장하는 건 아니다."
---
## 한 줄 정의
Gemma는 Google DeepMind가 개발자에게 직접 배포하는 공개형 모델 계열 이름이야. Gemini와 같은 연구 계통에서 나왔지만, 기사에서는 보통 Google의 주력 폐쇄형 서비스보다 더 넓게 가져가서 돌리고 튜닝할 수 있는 라인업을 가리킨다.
## 어떻게 작동하나
Gemma는 모델 가중치와 문서를 공개해 개발자가 클라우드 서버, 노트북, 폰 같은 환경에서 직접 실행하거나 미세조정할 수 있게 하는 방식으로 쓰여. 즉 API로만 쓰는 제품이 아니라, 가져가서 자기 환경에 맞게 붙이고 바꾸는 쪽까지 염두에 둔 계열이라는 뜻이야.
다만 Gemma라는 이름만으로 기능을 확정하면 안 돼. 세대에 따라 텍스트 중심일 수도 있고, 시각 입력이나 함수 호출처럼 범위가 넓어질 수도 있어서 실제 능력은 Gemma 2, Gemma 3, Gemma 4 같은 하위 버전을 따로 봐야 해. 파생형으로는 시각-언어 작업 쪽 PaliGemma, 의료 주제 쪽 MedGemma처럼 용도를 좁힌 갈래도 붙어.
## 왜 중요한가
실무에서는 Gemma가 API 종속보다 자체 호스팅, 데이터 통제, 오프라인 실행, 특정 업무용 튜닝 쪽에 더 가까운 선택지인지 판단하는 데 중요해. 같은 Google 계열이라도 Gemini를 붙일지, Gemma를 가져다 직접 운영할지에 따라 인프라 비용, 보안 경계, 배포 방식이 꽤 달라져.
기사 해석에서도 무게중심이 다르다. Gemma가 전면에 나오면 Google이 폐쇄형 최상위 모델만 미는 게 아니라, 개발자가 직접 가져가 쓰는 공개형 생태계와 온디바이스 실행까지 같이 밀고 있다는 신호로 읽는 편이 맞아. 그래서 숫자 비교보다 어떤 사용처와 배포 경로를 넓히는지부터 보는 게 덜 틀려.
## 주의해서 볼 점
첫째, Gemma는 계열 이름이지 개별 모델 이름이 아니야. 기사에서 Gemma만 적고 버전을 빼는 경우가 많아서, 2024-06-27의 Gemma 2를 말하는지 2025-03-12의 Gemma 3를 말하는지 2026-04-02의 Gemma 4를 말하는지부터 확인해야 기능 범위를 헷갈리지 않아.
둘째, 공개형 모델이라는 말과 오픈소스를 같은 뜻으로 읽으면 틀려. 첫 Gemma는 2024-02-21에 나왔고, Gemma 3까지는 source-available 성격이 강했지만 Gemma 4부터는 Apache 2.0으로 풀렸다는 차이가 있어. 라이선스, 상업 사용 조건, 재배포 가능 범위는 세대별로 꼭 다시 봐야 해.
## 관련 용어
- `Gemma 3`: Gemma는 계열 이름이고 Gemma 3는 그중 한 세대야. 기사에 함수 호출, 긴 컨텍스트, 비전 입력처럼 구체 기능이 나오면 대개 이런 하위 버전을 말하는 거라서, 계열 소개와 실제 도입 판단을 섞지 않는 데 이 구분이 중요해.
- `Gemini`: 둘 다 Google DeepMind 계열이지만 역할이 다르다. Gemini는 Google 서비스와 API 전면에 서는 주력 라인으로 읽는 편이 맞고, Gemma는 개발자가 직접 배포하거나 가져가 튜닝할 수 있는 공개형 축으로 보는 편이 맞아.
- `DeepSeek R1`: DeepSeek R1 기사는 보통 추론 성능과 비용 대비 효율 쪽에 무게가 실리지만, Gemma 기사는 Google이 공개 모델 생태계를 어디까지 넓히는지에 더 초점이 간다. 둘 다 자체 호스팅 얘기가 붙을 수 있어도 뉴스에서 강조하는 제품 메시지는 꽤 다르다.
- `Llama`: Llama는 Meta의 대표 공개 모델 계열이라 Gemma와 가장 자주 비교된다. 둘 다 생태계 확장 카드라는 점은 비슷하지만, Gemma는 Gemini와의 연구 계통 연결과 Google 플랫폼 전략을 함께 읽어야 한다는 점이 다르다.