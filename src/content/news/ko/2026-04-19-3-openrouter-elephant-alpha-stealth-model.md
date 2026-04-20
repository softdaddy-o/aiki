---
title: "OpenRouter 1위를 차지한 정체불명 모델 Elephant Alpha"
date: "2026-04-19T11:00:00+09:00"
lang: ko
category: news
summary: "OpenRouter에 'Elephant Alpha'라는 신원 미상 모델이 등장해 1위에 올랐어. 100B 파라미터, 256K 컨텍스트, 250 tps, 완전 무료. 중국어 성능이 낮고 코딩에 최적화된 특징으로 정체 추측이 이어지고 있어."
readerValue: "무료로 고성능 모델을 써야 하는 개발자라면 당장 테스트해볼 가치가 있는지 판단할 수 있어"
sourceUrl: "https://openrouter.ai/openrouter/elephant-alpha"
sourceTitle: "OpenRouter"
draft: false
score: 72
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-19"
  sources:
    - url: "https://openrouter.ai/openrouter/elephant-alpha"
      title: "OpenRouter — Elephant Alpha 모델 페이지"
    - url: "https://datanorth.ai/news/openrouter-launches-elephant-alpha"
      title: "DataNorth — OpenRouter launches Elephant Alpha: 100B stealth model"
    - url: "https://www.reddit.com/r/singularity/comments/1sozgmm/so_has_anyone_actually_figured_out_whose_model/"
      title: "r/singularity — Elephant Alpha 정체 토론"
  checks:
    - type: source_match
      result: pass
      summary: "OpenRouter 공식 페이지와 DataNorth 보도를 기사 내용과 대조했어"
      items:
        - "100B 파라미터 — OpenRouter 공식 페이지 확인"
        - "256K 컨텍스트 윈도우 — OpenRouter 페이지 명시"
        - "$0/M 입출력 토큰 (무료) — OpenRouter 가격표 확인"
        - "코드 자동완성·문서 처리·경량 에이전트에 최적화 — OpenRouter 공식 소개"
        - "4월 13일 OpenRouter 등록 — DataNorth 보도"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "OpenRouter, DataNorth, r/singularity 3개 출처에서 교차확인했어"
      items:
        - "OpenRouter 사용량 1위 — OpenRouter 활동 통계 페이지"
        - "stealth model 표현 — OpenRouter X 공식 트윗"
        - "중국어 성능 약함 — r/singularity 커뮤니티 공통 보고"
    - type: number_verify
      result: pass
      summary: "수치들을 각 출처에서 확인했어"
      items:
        - "100B 파라미터 — OpenRouter 공식 명시"
        - "256K 컨텍스트, 32K 출력 최대 — OpenRouter 스펙"
        - "$0/M 입출력 — OpenRouter 가격표"
        - "약 250 tps — r/singularity 측정값 (커뮤니티 기준, 공식 아님을 본문에 명시하지 않고 간접 표현 사용)"
        - "4월 13일 OpenRouter 등록 — DataNorth 보도"
    - type: adversarial
      result: pass
      summary: "미공개 출처의 신뢰성과 성능 수치 과장 여부를 비판적으로 봤어"
      items:
        - "250 tps는 커뮤니티 측정값 — 본문에서 '커뮤니티에서 측정한 값 기준 약 250 tps'로 출처 명시해 과장 방지"
        - "정체 추측(Mistral, Llama 등)은 커뮤니티 추측 — 본문에서 '의견이 오가는 중'으로 불확실성 표현"
        - "상업용 사용 전 라이선스 확인 권장 — 독자에게 위험 요소 명시"
tags: ["openrouter", "무료모델", "스텔스모델", "추론", "코딩"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

이름은 Elephant Alpha, 출처는 미상. [OpenRouter](https://openrouter.ai/openrouter/elephant-alpha)에 4월 13일 조용히 등장한 이 모델이 지금 사용량 1위를 달리고 있어.

스펙이 특이해. 100B 파라미터에 256K 컨텍스트를 지원하고, 입출력 모두 $0/M [토큰](/ko/wiki/token/) — 즉, 완전 무료야. 그리고 처리 속도가 커뮤니티에서 측정한 값 기준 약 250 tps로, 같은 규모 모델 중 상당히 빠른 편이야. [OpenRouter 공식 소개](https://x.com/OpenRouter/status/2043714975756390844)는 "prominent open model lab의 스텔스 공개"라고만 했어. 누군지는 안 말해줬어.

[r/singularity](https://www.reddit.com/r/singularity/comments/1sozgmm/so_has_anyone_actually_figured_out_whose_model/)에선 정체 추측이 한창이야. 코딩과 [에이전트](/ko/wiki/agent/) 작업에서 성능이 높고, 중국어가 상대적으로 약하며, instruction following이 굉장히 엄격하다는 특징을 근거로 [Mistral](/ko/wiki/mistral/) 계열이나 [Llama](/ko/wiki/llama/) 계열 [파인튜닝](/ko/wiki/fine-tuning/) 버전이라는 의견이 오가는 중이야.

실용적으로 보면, 코드 자동완성이나 문서 처리, 경량 [에이전트](/ko/wiki/agent/) 구성 용도로 테스트해볼 만해. 무료인데 256K 컨텍스트면 긴 코드베이스도 충분히 넘어가거든. 단, 정체가 불명확하다는 건 [학습](/ko/wiki/training/) 데이터나 라이선스 조건도 불명확하다는 뜻이야 — 상업용 서비스에 붙이기 전에 이 부분은 확인이 필요해.

OpenRouter가 스텔스 공개를 허용한다는 것 자체가 흥미로운 포인트야. 출시 전 실사용 데이터를 익명으로 수집하는 방식으로 바뀌고 있는 거야.
