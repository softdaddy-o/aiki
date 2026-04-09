# AIKI Content Guide — Wiki

> **Guide ID**: `wiki`
> **Version**: `1.0.0`
> **Last Updated**: 2026-04-09
> **Depends on**: `content-guide-common.md` v1.0.0+
> **Applies to**: `src/content/wiki/ko/*.md`

이 문서는 AIKI 위키 페이지 생성에 적용되는 규칙이다.
공통 규칙은 `content-guide-common.md`를 참조한다.

---

## 1. 위키 페이지 목표

독자(네니엘)가 "이 용어가 정확히 무엇인지" 이해하고, AI 스택 전체 그림에서 어디에 놓이는지 감을 잡게 만든다.

좋은 위키 페이지의 기준:
1. 이 용어는 AI 스택 전체 그림에서 어디에 놓이는가
2. 어떤 카테고리에 속하는가
3. 비슷한 다른 것과 무엇이 다르고, 왜 구분해야 하는가
4. 실제로 무엇을 할 수 있게 해주는가
5. 언제 쓰고 언제 과하게 기대하면 안 되는가

---

## 2. Frontmatter 스펙

```yaml
---
term: "slug-형태-id"
title: "표시 이름"
lang: ko
summary: "한 줄 요약 (SEO용)"
readerValue: "독자가 어떤 판단을 내릴 수 있는지 (20자+)"
category: concept    # concept | model | tool | technique | framework
aliases:
  - "영문 풀네임"
  - "약어"
relatedTerms:
  - "related-term-slug"
firstMentioned: "YYYY-MM-DD"
mentionCount: 0
draft: false
tags: ["tag1", "tag2"]
factCheck:
  status: passed
  date: "YYYY-MM-DD"
  sources: [...]
  checks: [...]
guideVersion:
  common: "1.0.0"
  wiki: "1.0.0"
---
```

### 필수 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| term | string | slug 형태 ID (`wiki-terms.json`의 term과 일치) |
| title | string | 표시 이름 |
| summary | string | SEO용 한 줄 요약 |
| readerValue | string | 20자+, 독자가 어떤 판단을 내릴 수 있는지 |
| category | enum | concept, model, tool, technique, framework |
| factCheck | object | 4단계 검증 결과 (common 참조) |
| guideVersion | object | 생성 시 사용한 가이드 버전 |

### 모델 전용 필드 (category: model)

| 필드 | 타입 | 설명 |
|------|------|------|
| modelType | enum | family (계열) 또는 version (특정 버전) |
| parentModel | string | version일 때 상위 family의 term |
| modelProfile | object | 아래 8개 하위 필드 전부 필수 |

**modelProfile 필드:**

| 필드 | 설명 |
|------|------|
| memoryUsage | 메모리 요구량 |
| implementation | 주요 구현 기술 |
| activeParameters | 활성 파라미터 수/범위 |
| multimodalSupport | 멀티모달 지원 범위 |
| access | 접근 경로 (API, 다운로드 등) |
| pricing | 가격 정보 |
| weightsOpen | 가중치 공개 여부 |
| vendor | 개발사 |

---

## 3. 파일명 규칙

```
{term}.md
```

- `wiki-terms.json`의 `term` 값과 동일
- 예: `mcp.md`, `rag.md`, `claude-opus.md`

---

## 4. 본문 구조 (4 섹션 필수)

### 섹션 1: `## 한 줄 정의`

- 카테고리와 역할을 한 문장으로 정리
- "무엇을 위한 무엇"인지 바로 보여준다
- 분류만 말하지 않고 기능적 위치를 같이 넣는다

**좋은 예:**
> "MCP는 AI 앱이 외부 도구, 파일, 데이터 소스에 연결되는 방식을 표준화하려는 오픈 프로토콜이야."

**나쁜 예:**
> "MCP는 프레임워크다."

### 섹션 2: `## 어떻게 작동하나` 또는 `## 실제로 무엇을 하나`

- **concept/technique**: "어떻게 작동하나" — 작동 원리 설명
- **tool/framework**: "실제로 무엇을 하나" — 실제 기능 설명
- 사용자가 어디에 붙여 쓰는지, 입력과 출력이 무엇인지, 어떤 계층에서 동작하는지

### 섹션 3: `## 왜 중요한가`

- 도입 이유
- 이 용어를 몰라서 어떤 판단을 틀리게 되는지
- 실무에서 직접 체감되는 사용 맥락

### 섹션 4: `## 관련 용어`

- 단순 나열 금지
- 각 항목은 **현재 페이지 기준**으로 "왜 같이 봐야 하는지" 설명
- 비교 축: 운영 방식, 성능 특성, 데이터 흐름, 인터페이스, 비용 구조 중 1개+

**좋은 예:**
> `[Function Calling](/ko/wiki/function-calling/)` — 모델이 도구를 호출하는 인터페이스라는 점은 겹치지만, MCP는 호출 자체보다 도구 발견과 연결 규격을 표준화한다는 점에서 층위가 다르다.

**나쁜 예:**
> `[Function Calling](/ko/wiki/function-calling/)` — 같이 보면 좋다.

---

## 5. 문체 규칙 (위키 전용)

### 기본 톤

위키도 common의 구어체 혼합 톤을 따른다. **설명체("~이다/~한다") 일색 금지.**

### 비유

본문에 **비유 1개 이상** 포함 권장. 추상 개념을 실무 감각으로 연결하는 비유.

**좋은 예:**
> "USB-C처럼 도구 연결 방식을 하나로 맞추는 규격이야."

### 핵심 원칙

1. 카테고리 설명은 짧게 끝낸다
2. 본문 중심은 "이 항목만의 특징과 차별점"
3. 독자가 실제로 헷갈리는 비교 포인트를 먼저 푼다
4. `readerValue`가 가리키는 독자 문제를 본문 전체의 축으로 삼는다
5. **다른 제품이나 기술 이름만 바꿔도 그대로 들어맞는 문장은 실패**

---

## 6. 카테고리별 작성 포인트

### `tool`

- "어떤 작업을 실제로 해주는 제품/도구인가"를 먼저 쓴다
- 실행 환경, 인터페이스, 운영 방식, 배포 감각이 드러나야 한다
- 같은 카테고리 다른 도구와 갈리는 기준 최소 2개

### `framework`

- 코드를 어떻게 조직하고 연결하는지 설명
- 기능 목록보다 구조적 장점 우선
- "무엇을 표준화하는가", "무엇을 감추는가", "어디까지 책임지는가" 구분

### `technique`

- 모델 자체가 아니라 문제 해결 방식이라는 점을 분명히
- 어떤 단계에서 개입하는지, 정확도/비용/지연 중 무엇에 영향을 주는지
- 비슷한 용어와 경계를 반드시 짚는다 (RAG vs grounding vs distillation 등)

### `concept`

- 추상 개념을 운영 판단에 연결
- 정의만 말하지 않고 어디에 쓰이는지, 왜 계속 등장하는지

### `model`

- **계열(family) 페이지**: 포지션과 다른 계열과의 차이 설명
- **버전(version) 페이지**: 실제 운영 정보, 접근 채널, 입출력 범위, 가격/제한 조건
- `modelProfile` 8개 필드 전부 채우기

---

## 7. 팩트체크 (위키 전용 기준)

common의 4단계 팩트체크에 더해, 위키는 아래 추가 기준을 적용한다:

### 각 check의 items 최소 3개

**좋은 항목:**
- "공식 워크플로 문서는 workflow를 connected graph of nodes라고 설명한다."
- "Ollama API 소개 문서는 기본 로컬 엔드포인트를 `http://localhost:11434/api`로 적는다."
- "Qdrant 공식 사이트는 dense, sparse, multivector retrieval을 한 제품 범위 안에 묶어 소개한다."

**나쁜 항목:**
- "공식 문서와 대체로 일치한다."
- "숫자와 이름을 확인했다."

### 비판적 검증 위키 포커스

- 분류가 틀리지 않았는가? (tool vs framework vs technique 등)
- 범위를 과장하지 않았는가? (하나의 기능을 전체 플랫폼처럼 묘사)
- 경쟁 제품 대비 공정하게 서술했는가?

---

## 8. 검증 체크리스트 (배포 전)

### 필수 통과 (하나라도 실패 → 배포 불가)

| # | 항목 | 기준 |
|---|------|------|
| 1 | 정체성 & 카테고리 | 첫 문단에서 카테고리와 역할이 동시에 보여야 함 |
| 2 | 차별점 | 최소 2개 이상의 구분 축 |
| 3 | 실제 사용 장면 | 최소 2개 이상의 실제 사용 장면 |
| 4 | 관련 용어 품질 | 모든 관련 용어에 비교 축 포함 |
| 5 | 팩트체크 깊이 | 4묶음 x 각 3항목+ |

### 실패 조건

1. 카테고리 설명이 본문 대부분을 차지한다
2. 다른 제품 이름으로 바꿔도 그대로 맞는 문장이 많다
3. 관련 용어 설명이 generic하다
4. 팩트체크가 추상적이다
5. 카테고리 분류가 틀렸다
6. `readerValue`와 본문 방향이 맞지 않는다

### 경고 조건

1. 일반론이 너무 길다
2. 고유명사나 실제 기능명이 너무 적다
3. 비교 축이 하나뿐이다
4. 실무 장면보다 정의 비중이 높다

### 최종 질문

배포 전 아래 전부 "예":

1. 이 페이지 하나만 읽어도 그 용어가 무엇인지 감이 오나
2. AI 스택 전체 그림에서 어디에 놓이는지 알 수 있나
3. 비슷한 다른 것과 어디서 갈리는지 알 수 있나
4. 실제로 무엇을 할 수 있는지 떠오르나
5. 관련 용어 설명이 단순 링크가 아니라 비교 기준을 주나
6. 팩트체크가 추상 요약이 아니라 실제 검증 내역을 보여주나

---

## 9. wiki-terms.json 연동

모든 위키 페이지는 `data/wiki-terms.json`에 등록되어야 한다.

**신규 위키 페이지 생성 시:**
1. `wiki-terms.json`에 항목 추가 (term, title, category, aliases)
2. `src/content/wiki/ko/{term}.md` 파일 생성
3. frontmatter `term`과 `wiki-terms.json`의 `term` 일치 확인

**뉴스 기사에서 새 용어 감지 시:**
- 자동으로 wiki-terms.json에 candidate 등록 가능 (향후)
- 현재는 수동 판단

---

## 10. 파이프라인 요약

```
Step 1: wiki-terms.json에서 대상 term 확인
  ↓
Step 2: WebSearch로 공식 문서, 독립 소스 수집
  ↓
Step 3: 4섹션 본문 작성 (Writing Guide 적용)
  ↓
Step 4: 톤 검증 (구어체 혼합 확인)
  ↓
Step 5: 팩트체크 4단계
  ↓
Step 6: 검증 체크리스트 통과 확인
  ↓
Step 7: 배포
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-09 | 초기 버전 — wiki-page-writing-guide.md + validation-guide.md 통합, 버전 관리 추가 |
