---
term: cursor
title: "Cursor(커서)"
lang: ko
summary: "Cursor는 AI를 중심에 둔 코드 에디터 제품이야. 모델 이름이 아니라 편집기 이름이라서, 코드 탐색과 수정 제안과 에이전트 실행이 한 화면 안에서 이어져."
readerValue: "Cursor가 모델이 아니라 편집기라는 점만 먼저 잡아도 기사와 도입 검토를 훨씬 빨리 읽을 수 있어. 작업 흐름이 어디서 바뀌는지도 같이 보여 줘."
category: tool
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "Cursor(커서)"
relatedTerms:
  - windsurf
  - continue
  - claude-code
  - codex
firstMentioned: "2026-03-20"
mentionCount: 3
draft: false
tags:
  - coding-agent
  - editor
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://www.cursor.com/"
      title: "The best way to code with AI"
    - url: "https://docs.cursor.com/"
      title: "Cursor Docs"
  checks:
    - type: source_match
      result: pass
      sources: 2
      summary: "Cursor를 모델이 아니라 에디터 제품으로 읽게 다시 맞춰봤어."
      items:
        - "독자 문제 대조: Cursor를 AI 모델명처럼 착각하기 쉬워서, AI 코드 에디터 제품이라는 점을 첫 문단에서 먼저 못 박았어."
        - "공식 개요 문서의 Agent 설명과 코드베이스 인덱싱 문서를 합쳐서 편집기 중심 흐름을 설명했어."
        - "인덱싱·규칙·체크포인트처럼 제품 고유 기능이 보이게 본문을 다시 짰어."
      findings:
        - "Cursor는 성능 기사보다 워크플로 기사에서 더 정확하게 읽혀."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "환영 문서와 세부 기능 문서를 붙여 보고 공통 기능만 남겼어."
      items:
        - "비교 기준: Cursor Welcome 문서의 제품 정의와 Agent/Codebase Indexing 문서의 작업 흐름 설명을 함께 대조했어."
        - "자동 인덱싱, 에이전트 편집, 터미널 실행처럼 여러 문서에서 반복되는 기능만 본문 핵심으로 남겼어."
        - "홍보 문구는 줄이고 실제 사용자가 체감하는 편집기 통합 포인트 위주로 정리했어."
      findings:
        - "Cursor는 채팅 기능보다 코드베이스 문맥을 자동으로 붙이는 점이 더 본질에 가까워."
    - type: number_verify
      result: pass
      sources: 1
      summary: "숫자로 과장될 만한 지표 대신 검증 가능한 기능 이름만 남겼어."
      items:
        - "요금제나 모델 벤치마크처럼 변동이 잦은 숫자는 본문에서 뺐어."
        - "Ctrl+I 같은 단축키는 제품 핵심 정의보다 부차적이라 body 중심 문장에 박지 않았어."
        - "대신 인덱싱, Agent, 체크포인트처럼 문서에서 직접 확인되는 구조 정보만 유지했어."
      findings:
        - "이 페이지는 수치 비교보다 제품 형태를 분리해 읽는 게 중요해."
    - type: adversarial
      result: pass
      sources: 1
      summary: "도구만 바꾸면 팀 생산성이 자동으로 오른다는 식의 과장을 막았어."
      items:
        - "인덱싱 품질과 규칙 파일 관리가 약하면 결과도 흔들린다는 점을 경고로 남겼어."
        - "편집기 제품과 모델 성능 비교를 같은 줄에서 읽지 않게 층위를 분리했어."
        - "도입 효과를 개인 취향이 아니라 팀 운영 변화까지 포함해 보게 만들었어."
      findings:
        - "Cursor는 툴 교체라기보다 작업 표면을 바꾸는 일에 가까워."
---
## 한 줄 정의
Cursor는 AI 기능을 얹은 코드 편집기이자, AI 작업 흐름을 전면에 둔 에디터 제품이야. 특정 모델 한 개의 이름이 아니라 개발자가 코드를 읽고 고치고 질문하는 자리를 다시 짠 도구로 보는 게 맞아.
## 어떻게 작동하나
Cursor는 프로젝트를 열면 코드베이스를 자동으로 인덱싱해서 문맥을 잡고, Agent·Ask 같은 모드에서 검색과 편집과 터미널 실행을 묶어 써. 공식 문서는 코드베이스 인덱싱, 규칙 파일, 체크포인트 같은 기능을 따로 설명하고 있어서, 실무에선 단순 채팅보다 편집기 안의 반복 루프를 줄이는 쪽으로 체감돼.
## 왜 중요한가
Cursor가 중요한 이유는 AI를 외부 탭이 아니라 편집기의 기본 동선 안에 넣기 때문이야. 그래서 도입 효과를 볼 때도 모델 자체 성능만 볼 게 아니라 리뷰 습관, 규칙 파일 관리, 누가 자동 적용을 허용하는지 같은 팀 운영 문제를 같이 봐야 해.
## 주의해서 볼 점
Cursor를 특정 모델의 별칭처럼 읽으면 바로 방향을 잘못 잡게 돼. 또 인덱싱 품질이나 프로젝트 규칙 정리가 약하면 AI가 똑똑해 보여도 결과가 흔들리니까, 편집기만 바꾸면 자동으로 개발 문화가 좋아진다고 보면 안 돼.
## 관련 용어
- `windsurf`: Cursor와 자주 같이 거론되는 AI 코딩 에디터야. 자율성이나 편집기 통합 방식 차이를 볼 때 비교축이 돼.
- `continue`: 기존 IDE에 붙여 쓰는 확장 성격이 강해. 독립 에디터 제품인 Cursor와 접근 방식이 어떻게 다른지 보기 좋아.
- `claude-code`: 터미널 중심 에이전트 제품이라서 편집기 중심 제품인 Cursor와 대비가 선명해. 어디서 작업을 시작하느냐가 다르다는 점을 보여 줘.
- `codex`: 모델 또는 에이전트 계열 이름으로 많이 보여. 제품 이름과 모델 이름을 섞지 않게 잡아 주는 비교 대상이야.
