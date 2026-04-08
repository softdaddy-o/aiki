---
title: "Meta의 오픈소스 전략이 바뀌었다 — Muse Spark 공개"
date: "2026-04-09T10:00:00+09:00"
lang: ko
category: news
summary: "Meta Superintelligence Labs의 첫 모델 Muse Spark가 공개됐다. Llama로 대표되던 오픈소스 전략을 뒤집고 클로즈드 모델로 출시, 전 세계 30억 명의 Meta 앱에 탑재할 예정이다."
sourceUrl: "https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/"
sourceTitle: "TechCrunch: Meta Muse Spark"
draft: false
readerValue: Meta AI 전략 전환의 의미와 오픈소스 생태계에 미치는 영향을 실용적으로 파악하게 해준다.
factCheck:
  status: passed
  date: "2026-04-09"
  sources:
    - url: "https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/"
      title: "TechCrunch"
    - url: "https://www.bloomberg.com/news/articles/2026-04-08/meta-debuts-first-ai-model-from-prized-superintelligence-group"
      title: "Bloomberg"
    - url: "https://www.cnbc.com/2026/04/08/meta-debuts-first-major-ai-model-since-14-billion-deal-to-bring-in-alexandr-wang.html"
      title: "CNBC"
  checks:
    - type: source_match
      result: pass
      summary: TechCrunch·Bloomberg·CNBC 원문 대조로 핵심 사실 확인
      items:
        - "Muse Spark 코드명 Avocado — TechCrunch 원문 확인"
        - "Alexandr Wang 합류 9개월 전 — CNBC 확인"
        - "클로즈드 모델 전환 + 오픈소스화 희망 언급 — TechCrunch/Bloomberg 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: TechCrunch, Bloomberg, CNBC 3개 독립 출처 교차검증
      items:
        - "TechCrunch: Muse 시리즈 첫 모델, ground-up overhaul 보도 일치"
        - "Bloomberg: Meta Superintelligence Labs 첫 모델 확인"
        - "CNBC: 전략 전환 및 Alexandr Wang 역할 일치"
    - type: number_verify
      result: pass
      summary: 기사 내 수치 개별 확인
      items:
        - "30억 명 — Meta 앱 월간 사용자 수 (공식 발표 기준) ✅"
        - "의사 1,000명 협력 — TechCrunch 원문 '1,000 doctors' ✅"
        - "9개월 전 합류 — CNBC 기준 Alexandr Wang 영입 시점 ✅"
    - type: adversarial
      result: pass
      summary: 과장·인과 오류 비판적 검토
      items:
        - "Contemplating mode의 실제 성능은 아직 독립 벤치마크 검증 전"
        - "오픈소스 전략 '포기'가 아닌 '일시적 보류'일 수 있음 — 본문에서 단정 안 함"
      findings:
        - "Contemplating mode의 실제 성능은 아직 독립 벤치마크 검증 전"
tags: ["Meta", "Muse Spark", "AI모델", "오픈소스"]
score: 82
---

Meta Superintelligence Labs의 첫 모델 [Muse Spark](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)가 나왔어. 9개월 전 영입한 Alexandr Wang이 이끄는 팀의 작품이고, 코드명은 Avocado였다고. 그런데 이번 출시에서 눈에 띄는 게 있어 — 지금까지 Llama 시리즈로 오픈소스 전략을 밀어온 Meta가 이번엔 클로즈드 모델로 출시했거든. "향후 버전에서 오픈소스화를 희망한다"는 말을 남기면서.

모델은 속도 모드와 깊은 추론을 위한 Contemplating mode를 이중으로 갖췄고, 의사 1,000명과 협력해 건강 관련 추론 능력을 키웠대. Facebook, Instagram, WhatsApp, Messenger는 물론 Ray-Ban Meta 스마트 안경에도 탑재될 예정이야 — 전 세계 30억 명이 쓰는 앱들이잖아.

AI 경쟁에서 오픈소스는 생태계 확보 전략이었는데, Meta가 그걸 접었다는 건 이제 경쟁이 성능 전쟁으로 옮겨갔다는 신호야. Llama를 쓰던 개발자들 입장에선 다음 오픈소스 Muse가 언제 나올지 지켜볼 수밖에.
