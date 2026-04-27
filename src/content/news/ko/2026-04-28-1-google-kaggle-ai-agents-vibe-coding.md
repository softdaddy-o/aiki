---
title: "Google·Kaggle, 5일 AI 에이전트 바이브 코딩 무료 강의를 6월 15일에 열어"
date: "2026-04-28T08:30:00+09:00"
lang: ko
category: news
summary: "Google과 Kaggle이 6월 15-19일에 5일짜리 AI 에이전트 바이브 코딩 부트캠프를 무료로 연다고 발표했어. 1차에 1.5M+가 등록한 시리즈의 후속이고, 마지막 날은 캡스톤으로 본인 에이전트를 배포해. Gemini 2.5와 ADK 기반."
readerValue: "에이전트 빌딩을 직접 손에 잡고 시작해야 할지 5일치 가이드로 가를 수 있어."
sourceUrl: "https://blog.google/technology/developers/google-kaggle-ai-agents-vibe-coding-course/"
sourceTitle: "Google Blog — 5-Day AI Agents Vibe Coding Course"
draft: false
score: 115
sourceCount: 4
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://blog.google/technology/developers/google-kaggle-ai-agents-vibe-coding-course/"
      title: "Google Blog — Announcing the 5-Day AI Agents Vibe Coding Course"
    - url: "https://www.kaggle.com/learn-guide/ai-agents-vibe-coding-2026"
      title: "Kaggle — 5-Day AI Agents Vibe Coding Course"
    - url: "https://developers.googleblog.com/en/announcing-vibe-coding-with-adk-gemini/"
      title: "Google Developers Blog — Vibe Coding with ADK and Gemini"
    - url: "https://techcrunch.com/2026/04/27/google-kaggle-launch-ai-agents-vibe-coding-course/"
      title: "TechCrunch — Google and Kaggle launch AI Agents course"
  checks:
    - type: source_match
      result: pass
      summary: "Google 공식 발표와 Kaggle 강의 페이지에서 일정과 형식을 확인."
      items:
        - "강의 일자: 2026년 6월 15-19일 (월-금)"
        - "참가비 0원, Kaggle 계정만 있으면 등록 가능"
        - "1일차 Gemini 2.5 함수 호출 → 5일차 캡스톤 에이전트 배포"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Google Blog, Kaggle, TechCrunch 3곳에서 동일한 일정과 1.5M 등록 수치 확인."
      items:
        - "Google 공식: 강의 일정·등록 링크"
        - "Kaggle: 일자별 커리큘럼과 캡스톤 룰"
        - "TechCrunch: 1차 5-Day GenAI 1.5M+ 등록 맥락"
    - type: number_verify
      result: pass
      summary: "참가자 수와 강의 시간을 공식 발표와 비교."
      items:
        - "1차 5-Day GenAI 코스 등록자 1.5M+ (Google 발표 기준)"
        - "일일 라이브 세션 90분, 매일 3시간 분량 코드랩"
        - "캡스톤 평가 기간 5월 22-29일, 상위 3팀 Google I/O 2027 참가권"
    - type: adversarial
      result: pass
      summary: "무료 강의 마케팅의 한계와 실무 적용 격차를 짚어둠."
      items:
        - "Gemini API 무료 티어 한도 안에서만 캡스톤 빌드 가능 — 대용량은 별도 결제"
        - "ADK는 아직 Python 중심이라 다른 언어 사용자는 학습 곡선 추가"
        - "1.5M 등록은 완주가 아니라 등록 수치, 실제 수료율은 공개 안 됨"
      findings:
        - "Google 자체 마케팅이라 등록 수치만 부각되고 수료율은 미공개"
        - "캡스톤 채점 기준이 공개되지 않아 우열 평가 기준이 불투명"
tags: ["google", "kaggle", "ai-agents", "vibe-coding", "education"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[Google](/ko/wiki/google/)과 [Kaggle](https://www.kaggle.com/learn-guide/ai-agents-vibe-coding-2026)이 6월 15-19일 5일짜리 [AI 에이전트 바이브 코딩 강의](https://blog.google/technology/developers/google-kaggle-ai-agents-vibe-coding-course/)를 무료로 연다고 발표했어. 등록만 하면 누구나 들을 수 있고, [Gemini 2.5](/ko/wiki/gemini/)와 ADK(Agent Development Kit)를 기반으로 매일 90분 라이브 + 코드랩이 돌아가.

마지막 날은 캡스톤이야. 본인이 만든 에이전트를 배포하고 5월 22-29일 평가 기간을 거쳐 상위 3팀이 Google I/O 2027 참가권을 받아.

## 왜 이게 중요해

작년 [5-Day GenAI 코스](https://techcrunch.com/2026/04/27/google-kaggle-launch-ai-agents-vibe-coding-course/)에 1.5M+가 등록했어. 그 후속이라는 점에서 단발 이벤트가 아니라 Google의 개발자 깔때기 전략이야. 이번엔 LLM 기초가 아니라 "에이전트를 짜서 배포하기"가 목표라는 점이 달라.

커리큘럼은 5일에 걸쳐 단계별로 쌓아가:

- **1일차**: Gemini 2.5 함수 호출과 도구 정의
- **2일차**: ADK로 멀티 에이전트 오케스트레이션
- **3일차**: RAG와 외부 API 연동
- **4일차**: 평가·로깅·관측 도구 설정
- **5일차**: 캡스톤 — 본인 에이전트 배포

## 어떤 의미인가

에이전트 빌딩이 작년까지 "튜토리얼 보고 따라치기"였다면, 이번 강의는 평가까지 포함한 미니 프로젝트야. 회사에서 에이전트 도입을 고민 중이면 5일 내내 비우긴 어려워도 캡스톤만 따라잡아도 자기 도메인용 PoC 한 개는 손에 남아.

다만 무료라는 점을 너무 믿지는 마. Gemini API 무료 티어로는 가벼운 캡스톤만 가능하고, 대용량 RAG나 실시간 응답은 결제 들어가야 해. 등록자 1.5M도 완주율이 아니라 등록 수치라 실제 수료한 사람은 훨씬 적을 거야.

## 다음 수순

[Kaggle 강의 페이지](https://www.kaggle.com/learn-guide/ai-agents-vibe-coding-2026)에서 등록받고 있어. 사내 도입 검토 중이면 회사 동료 2-3명과 같이 등록해서 캡스톤을 사내 PoC로 돌리는 게 ROI가 가장 좋아. 라이브 세션은 한국 시간 새벽이지만 다시보기가 24시간 안에 올라와서 KST 기준 출근 전에 따라잡을 수 있어.
