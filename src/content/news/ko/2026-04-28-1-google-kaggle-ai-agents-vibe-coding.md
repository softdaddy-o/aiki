---
title: "Google·Kaggle, 6월 15일 AI 에이전트 바이브 코딩 무료 강의 열어"
date: "2026-04-28T08:30:00+09:00"
lang: ko
category: news
summary: "Google과 Kaggle이 2026년 6월 15-19일 5일짜리 AI 에이전트 바이브 코딩 무료 강의를 연다고 발표했어. 작년 과정은 150만 명 넘게 도달했고, 이번엔 백서·코드랩·실시간 질의응답·선택형 마무리 프로젝트로 이어지는 구조야. 작은 자동화 실험을 잡아볼 팀에 맞아."
readerValue: "에이전트 빌딩에 5일을 써 볼지, 지금은 자료만 챙길지 가를 수 있어."
sourceUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/kaggle-genai-intensive-course-vibe-coding-june-2026/"
sourceTitle: "Google Blog — AI Agents Vibe Coding Course"
draft: false
score: 115
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-28"
  sources:
    - url: "https://blog.google/innovation-and-ai/technology/developers-tools/kaggle-genai-intensive-course-vibe-coding-june-2026/"
      title: "Google Blog — Join the new AI Agents Vibe Coding Course from Google and Kaggle"
    - url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/overview"
      title: "Kaggle — 5-Day AI Agents: Intensive Vibe Coding Course With Google"
    - url: "https://chromeunboxed.com/googles-massive-free-ai-agents-course-returns-with-a-focus-on-vibe-coding/"
      title: "Chrome Unboxed — Google’s massive free AI Agents course returns"
  checks:
    - type: source_match
      result: pass
      summary: "Google 공식 발표에서 일정, 무료 등록, 캡스톤 포함 여부를 다시 대조했어."
      items:
        - "강의 기간: 2026년 6월 15-19일"
        - "작년 첫 AI Agents Intensive는 150만 명 넘는 학습자에게 도달"
        - "업데이트된 콘텐츠, 새 발표자, 실습형 마무리 프로젝트 포함"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "공식 발표와 보조 보도에서 일정과 과정 성격이 충돌하지 않는지 맞춰 봤어."
      items:
        - "Google 공식: 6월 15-19일, 무료 등록, 150만 명+ 도달"
        - "Kaggle 공개 페이지: Google 공식 발표가 연결한 등록 대상"
        - "보조 보도: 하루 과제, 실시간 질의응답, 디스코드 참여 조건을 설명"
    - type: number_verify
      result: pass
      summary: "공식 발표 수치와 보조 보도 수치를 분리해 기록했어."
      items:
        - "공식 발표: 강의 기간 6월 15-19일은 5일 과정"
        - "공식 발표: 150만 명+는 작년 첫 AI Agents Intensive 도달 규모"
        - "보조 보도: 하루 과제 1-2시간, 실시간 질의응답 45-60분"
    - type: adversarial
      result: pass
      summary: "마케팅 표현과 실제 실무 학습 효과를 분리해서 읽도록 한계를 남겼어."
      items:
        - "150만 명+는 이번 과정 수료율이 아니야"
        - "10x agents는 Google의 학습 목표 표현이지 독립 성능 벤치마크가 아니야"
        - "Python 경험 권장과 계정 준비 조건은 보조 보도 기준이라 등록 페이지에서 다시 확인해야 해"
      findings:
        - "Google·Kaggle 자체 공지 중심이라 실제 완주율과 프로젝트 품질은 아직 별도 확인이 필요해"
        - "공식 근거가 약한 보상 조건은 본문과 factCheck에서 제외했어"
tags: ["google", "kaggle", "ai-agents", "vibe-coding", "education"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "388f817e21a59d7c"
  reviewedAt: "2026-04-28"
---
## 무슨 일이 일어났나

이 강의는 자연어 지시와 도구 호출을 엮어 작은 AI 에이전트를 직접 만들어 보는 초급 실습 과정이야. Google과 [Kaggle](https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/overview)이 2026년 6월 15-19일 [AI 에이전트 바이브 코딩 강의](https://blog.google/innovation-and-ai/technology/developers-tools/kaggle-genai-intensive-course-vibe-coding-june-2026/)를 무료로 연다고 발표했어.

핵심 주제인 [바이브 코딩](/ko/wiki/vibe-coding/)은 자연어를 주된 프로그래밍 인터페이스로 쓰고, 도구와 API를 붙여 자동화 범위를 넓히는 방식이야.

## 왜 이게 중요해

Google 공식 발표와 보조 보도를 합치면 참여 흐름은 세 가지야:

- 공식 발표 기준: 자연어 워크플로, 도구·API 연결, 실습 예시, 선택형 마무리 프로젝트
- 보조 보도 기준: 매일 백서·설명 팟캐스트·코드랩을 1-2시간 자기 속도로 진행
- 보조 보도 기준: 45-60분 실시간 질의응답과 디스코드 참여

## 어떤 의미인가

Python 노트북을 따라갈 수 있고 반복 업무 하나를 자동화해 보고 싶은 개인이나 팀이면 6월 15-19일을 비워볼 만해. 반대로 [LLM](/ko/wiki/llm/) 기초나 사내 데이터 연결 기준부터 정해야 하는 팀은 지금은 자료만 저장해도 돼. 작년 과정이 150만 명 넘게 도달했다는 수치는 관심 규모이지 완주율이나 실무 성과가 아니고, 10x agents도 학습 목표 표현으로 봐야 해.

보조 보도 기준으로 하루 자기주도 과제는 1-2시간, 실시간 질의응답은 45-60분이고 Python 경험이 권장돼. 무료 Kaggle 계정과 Google AI Studio 접근도 준비해야 해.

## 다음 수순

[Kaggle 강의 페이지](https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/overview)에서 등록받고 있어. 혼자 듣기보다 동료 2-3명과 과제를 나눠 보고, 캡스톤은 사내 반복 업무 하나를 자동화하는 작은 실험으로 잡는 편이 좋아.
