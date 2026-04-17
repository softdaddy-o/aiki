---
title: "OpenAI GPT-Rosalind 공개 — 생명과학 전용 추론 모델"
date: "2026-04-18T09:30:00+09:00"
lang: ko
category: news
summary: "OpenAI가 생명과학·신약 개발용 추론 모델 GPT-Rosalind를 리서치 프리뷰로 공개했다. LABBench2 11개 과제 중 6개에서 GPT-5.4를 앞섰고, Codex 내부 평가에선 인간 전문가 상위 5% 구간에 들어갔다. Amgen, Moderna, Allen Institute 등이 초기 파트너다."
readerValue: "일반 LLM이 아닌 도메인 특화 모델이 업무 파이프라인에 쓸 만한지 판단하게 해준다"
sourceUrl: "https://openai.com/index/introducing-gpt-rosalind/"
sourceTitle: "OpenAI"
draft: false
score: 110
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://openai.com/index/introducing-gpt-rosalind/"
      title: "OpenAI 공식 발표"
    - url: "https://venturebeat.com/technology/openai-debuts-gpt-rosalind-a-new-limited-access-model-for-life-sciences-and-broader-codex-plugin-on-github"
      title: "VentureBeat — GPT-Rosalind & Codex plugin"
    - url: "https://www.marktechpost.com/2026/04/16/openai-launches-gpt-rosalind-life-sciences-ai/"
      title: "MarkTechPost — Life Sciences AI"
    - url: "https://the-decoder.com/openai-launches-gpt-rosalind-a-reasoning-model-built-for-life-sciences-research/"
      title: "The Decoder — GPT-Rosalind reasoning model"
  checks:
    - type: source_match
      result: pass
      summary: "OpenAI 공식 발표와 외부 보도 3곳을 대조했어"
      items:
        - "모델명 GPT-Rosalind, Rosalind Franklin에서 따온 이름 — OpenAI 공식 확인"
        - "리서치 프리뷰, 미국 Enterprise 고객 한정 — OpenAI 공식 확인"
        - "Amgen, Moderna, Allen Institute, Thermo Fisher Scientific 초기 파트너 — 공식 발표 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "VentureBeat, MarkTechPost, The Decoder 3곳에서 벤치마크 수치가 다 일치했어"
      items:
        - "LABBench2 11개 태스크 중 6개에서 GPT-5.4 상회 — 3곳 일치"
        - "Codex 환경 예측 태스크 인간 전문가 상위 5% — 3곳 일치"
        - "시퀀스 생성 태스크 84 퍼센타일 — 3곳 일치"
    - type: number_verify
      result: pass
      summary: "벤치마크와 플러그인 수치를 공식 발표 기준으로 확인했어"
      items:
        - "LABBench2 6/11 태스크 우위 — OpenAI + 3개 매체 일치"
        - "Codex 예측 95 퍼센타일, 시퀀스 생성 84 퍼센타일 — OpenAI 공식 수치"
        - "Codex Life Sciences 플러그인이 50개 이상 과학 도구·DB 연결 — 공식 발표 확인"
    - type: adversarial
      result: pass
      summary: "벤치마크 해석과 접근 제한을 비판적으로 검토했어"
      items:
        - "LABBench2는 신약 개발 전체 과정이 아닌 제한된 하위 태스크 평가임"
        - "11개 중 6개 우위는 반대로 5개는 GPT-5.4가 같거나 더 낫다는 뜻"
        - "리서치 프리뷰·미국 Enterprise 한정이라 일반 개발자는 바로 접근 불가"
      findings:
        - "11개 중 5개는 GPT-5.4와 비슷하거나 뒤처진다는 점 기사에 반영 필요"
        - "초기 파트너가 모두 OpenAI 기존 고객사라 독립 평가 수치는 아직 없음"
tags: ["openai", "gpt-rosalind", "life-sciences", "drug-discovery", "codex"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

OpenAI가 생명과학·신약 개발용 추론 모델 [GPT-Rosalind](https://openai.com/index/introducing-gpt-rosalind/)를 리서치 프리뷰로 공개했다. 이름은 DNA 이중나선 구조 발견에 결정적 기여를 한 화학자 Rosalind Franklin에서 따왔고, 일반 범용 LLM이 아니라 분자 클로닝, 실험 설계, 문헌 합성 같은 도메인 태스크에 특화된 모델이야.

수치를 보면 포인트가 두 개 있어. 첫 번째는 [LABBench2](https://venturebeat.com/technology/openai-debuts-gpt-rosalind-a-new-limited-access-model-for-life-sciences-and-broader-codex-plugin-on-github) 11개 태스크 중 6개에서 GPT-5.4를 앞섰다는 점. 두 번째는 Codex 환경에서 예측 태스크는 인간 전문가 상위 5%(95 퍼센타일), 시퀀스 생성은 상위 16%(84 퍼센타일) 구간에 들어갔다는 점이거든. 6/11이라는 숫자는 뒤집으면 나머지 5개는 GPT-5.4와 비슷하거나 뒤진다는 뜻이라, "무조건 더 낫다"가 아니라 "특정 태스크에서 확실히 낫다"로 읽는 게 맞아.

같이 공개된 Codex용 Life Sciences 플러그인도 실무 쪽에 더 가깝다. 50개 이상의 과학 도구와 데이터베이스에 프로그래매틱하게 접근할 수 있어서, 바이오 분야 개발자라면 익숙한 개발자 UX로 실험 파이프라인을 설계할 수 있게 된다. 초기 파트너는 Amgen, Moderna, Allen Institute, Thermo Fisher Scientific 네 곳이고.

문제는 접근이 제한적이라는 거야. 리서치 프리뷰는 미국 Enterprise 고객만 받을 수 있고, 초기 파트너는 모두 기존 OpenAI 큰손이라 독립 평가 수치는 아직 안 나왔거든. 일반 개발자가 "업무 파이프라인에 바로 붙일 수 있는 도구"냐는 질문엔 지금 답이 "아직"이지만, 도메인 특화 모델이 벤치마크에서 범용 플래그십을 이기는 구조가 하나 더 확인됐다는 신호로 볼 만해.
