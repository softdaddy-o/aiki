---
title: "Google DeepMind, Gemini Robotics-ER 1.6으로 로봇 계기판 판독 정확도를 93%로 올렸다"
date: "2026-04-16T09:30:00+09:00"
lang: ko
category: news
summary: "Google DeepMind이 Gemini Robotics-ER 1.6을 4월 14일 출시했다. 이전 버전 대비 계기판 판독 정확도가 23%에서 93%로 뛰었고, 안전 지시 준수율도 텍스트 기반 +6%, 영상 기반 +10% 개선됐다. Boston Dynamics Spot 로봇에 이미 통합돼 산업 시설 점검에 투입되고 있다."
readerValue: "산업용 AI 로봇이 실제 현장 투입 단계인지 판단하게 해준다"
sourceUrl: "https://deepmind.google/blog/gemini-robotics-er-1-6/"
sourceTitle: "Google DeepMind"
draft: false
score: 50
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-16"
  sources:
    - url: "https://deepmind.google/blog/gemini-robotics-er-1-6/"
      title: "Google DeepMind - Gemini Robotics-ER 1.6 Blog"
    - url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-1-6/"
      title: "Google Blog - Gemini Robotics ER 1.6"
    - url: "https://www.therobotreport.com/boston-dynamics-and-google-deepmind-are-using-gemini-to-make-spot-smarter/"
      title: "The Robot Report - Boston Dynamics Spot Integration"
  checks:
    - type: source_match
      result: pass
      summary: "DeepMind 공식 블로그와 Google 블로그에서 정확도 수치와 파트너십이 맞아"
      items:
        - "계기판 판독 23% → 93% (agentic vision) — DeepMind 공식 블로그에서 확인"
        - "안전 지시 준수 텍스트 +6%, 영상 +10% — DeepMind 공식에서 확인"
        - "4월 14일 출시 — Google 블로그, MarketScreener에서 일치"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "DeepMind 공식, Google 블로그, The Robot Report 3개 소스에서 동일 내용 확인했어"
      items:
        - "DeepMind 공식: 기술 스펙, 벤치마크 수치"
        - "Google 블로그: 출시일, 가용성 정보"
        - "The Robot Report: Boston Dynamics Spot 통합 상세"
    - type: number_verify
      result: pass
      summary: "계기판 정확도, 안전 지시 개선율, 출시일을 공식 소스에서 대조했어"
      items:
        - "23% → 93% 계기판 판독 — DeepMind 공식 블로그에서 확인"
        - "텍스트 +6%, 영상 +10% 안전 개선 — DeepMind 공식에서 확인"
        - "Boston Dynamics Orbit AIVI-Learning 4월 8일 라이브 — DeepMind 공식에서 확인"
    - type: adversarial
      result: pass
      summary: "Google/DeepMind 자체 벤치마크 기반이라 독립 검증 여부를 확인했어"
      items:
        - "93% 정확도는 DeepMind 자체 테스트 — 제3자 독립 벤치마크 미공개"
        - "Boston Dynamics 파트너십은 상업적 이해관계가 있는 양사 발표"
        - "산업 현장 실제 배포 사례의 규모와 기간이 구체적으로 공���되지 않음"
      findings:
        - "93% 정확도는 DeepMind 내부 테스트 결과이며 독립 재현 데이터 없음"
        - "Spot 로봇 실배포 고객 수와 현장 규모가 구체적으로 미공개"
tags: ["google-deepmind", "robotics", "gemini", "boston-dynamics", "embodied-reasoning"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

Google DeepMind이 4월 14일 [Gemini Robotics-ER 1.6](https://deepmind.google/blog/gemini-robotics-er-1-6/)을 공개했어. "ER"은 Embodied Reasoning, 즉 로봇이 물리적 환경을 이해하고 판단하는 능력을 뜻하는데, 이번 업데이트의 킬러 피처는 산업용 계기판 판독이야. [이전 버전 ER 1.5에서 23%였던 계기판 읽기 정확도가 93%로](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-1-6/) 뛰었거든.

실제로 [Boston Dynamics의 Spot 로봇](https://www.therobotreport.com/boston-dynamics-and-google-deepmind-are-using-gemini-to-make-spot-smarter/)에 이미 통합됐어. 공장이나 화학 시설에서 압력 게이지, 온도계, 사이트 글래스를 자율적으로 읽고 판단하는 용도야. Boston Dynamics VP 마르코 다 실바는 "Spot이 현장 문제를 완전 자율로 보고, 이해하고, 대응하게 해주는 역량"이라고 설명했어. 안전 지시 준수율도 텍스트 기반 +6%, 영상 기반 +10% 개선됐고.

개발자는 Gemini API와 Google AI Studio에서 바로 쓸 수 있어. 산업 현장 점검에 AI를 도입하려는 팀이라면, "사람이 주기적으로 돌면서 게이지 확인하는 업무"를 자동화할 수 있는 첫 번째 현실적 선택지가 된 셈이야.
