# AIKI Content Guide — News

> **Guide ID**: `news`
> **Version**: `2.0.0`
> **Last Updated**: 2026-04-20
> **Depends on**: `content-guide-common.md` v1.0.0+
> **Applies to**: `src/content/news/ko/*.md`

이 문서는 AIKI 뉴스 기사 생성에 적용되는 규칙이다.
공통 규칙은 `content-guide-common.md`를 참조한다.

---

## 1. 뉴스 기사 목표

독자(네니엘)가 AI 업계에서 일어난 일을 빠르게 파악하고, "나한테 어떤 영향이 있는지" 판단할 수 있게 만든다.

좋은 뉴스 기사의 기준:
1. 무슨 일이 일어났는지 첫 문단에서 바로 보인다
2. 왜 중요한지 실무 맥락에서 설명한다
3. 독자가 다음에 뭘 해야 하는지 시사점이 보인다
4. 숫자 2개+ 포함으로 구체성을 확보한다

---

## 2. Frontmatter 스펙

```yaml
---
title: "제목 (한국어, 60자 이내)"
date: "YYYY-MM-DDTHH:MM:SS+09:00"
lang: ko
category: news
summary: "SEO 요약 (150-200자, 핵심 수치 포함)"
readerValue: "독자가 어떤 판단을 내릴 수 있는지 (20자+)"
sourceUrl: "원본 URL"
sourceTitle: "출처 이름"
draft: false
score: 75          # 0-100, 40 미만 제외
sourceCount: 2     # 교차검증 소스 수
factCheck:
  status: passed
  date: "YYYY-MM-DD"
  sources: [...]
  checks: [...]
tags: ["tag1", "tag2"]
guideVersion:
  common: "1.0.0"
  news: "2.0.0"
formatVersion: 2   # 1=구 산문, 2=h2 섹션 카드 포맷 (2026-04-20~)
---
```

### 필수 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| title | string | 60자 이내, 핵심 키워드 포함 |
| date | string | KST ISO 8601 (`+09:00`) |
| summary | string | 150-200자, SEO meta description |
| readerValue | string | 20자+, 독자 판단 기준 |
| sourceUrl | string | 원본 소스 URL |
| sourceTitle | string | 출처 이름 |
| factCheck | object | 4단계 검증 결과 (common 참조) |
| tags | array | 2-6개 |
| guideVersion | object | 생성 시 사용한 가이드 버전 |
| formatVersion | number | **레이아웃 포맷 버전** — `1`=구 산문, `2`=h2 섹션 카드 포맷. 기본값 1. 새 기사는 반드시 `2` 명시. |

### 선택 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| score | number | 0-100 관련도 점수 |
| sourceCount | number | 교차검증 소스 수 |
| backfilled | boolean | 소급 생성 여부 |
| backfilledAt | string | 소급 생성 날짜 |

---

## 3. 날짜 규칙 (Critical)

**일반 기사:**
- `date` = 오늘 날짜 KST
- 파일명 날짜 = frontmatter `date` 날짜 = 오늘 날짜
- 위반 시 `aiki-pre-publish-check.cjs`가 배포 차단

**소급(backfill) 기사:**
- `date` = 원본 `publishedAt` 날짜 (오늘 아님!)
- `backfilled: true`, `backfilledAt: "오늘 날짜"` 추가 필수
- `publishedAt` 없는 포스트는 스킵
- 오늘 날짜를 backfill 기사에 절대 사용 금지

---

## 4. 파일명 규칙

```
YYYY-MM-DD-N-slug.md
```

- `YYYY-MM-DD`: frontmatter `date`의 날짜 (KST)
- `N`: 같은 날짜 내 순번 (없으면 생략 가능)
- `slug`: 영문 kebab-case, 핵심 키워드 2-4개

**예시:**
```
2026-04-04-claude-opus-4-6.md
2026-04-04-2-google-gemini-update.md
```

---

## 5. 본문 구조

### formatVersion 2 (신규 기사 기본 — 2026-04-20~)

**h2 섹션 분리 필수.** 템플릿이 각 h2+내용을 카드로 렌더링하므로, 의도적으로 섹션을 나눠야 효과가 생긴다.

| 섹션 | h2 예시 | 내용 | 길이 |
|------|---------|------|------|
| 1 | 무슨 일이 일어났나 | 핵심 팩트 — 인물·수치·날짜 | 2-3문장 |
| 2 | 왜 이게 일어났나 | 배경·맥락·원인 | 2-4문장 |
| 3 | 어떤 의미인가 | 독자 실무 영향·전망 | 2-3문장 |
| (선택) 4 | 주의할 점 / 다음 수순 | 불확실성·후속 액션 | 1-3문장 |

h2 제목은 위 예시에 얽매이지 말고, 기사 내용에 맞게 자연스럽게 짓는다.

### formatVersion 1 (레거시 — 소급 기사)

3-5 문단 산문. h2 없음. 기존 기사를 굳이 v2로 마이그레이션하지 않아도 됨.

### 공통 규칙

- 최소 300자, 최대 900자 (한국어 기준)
- 인라인 링크 OK (SEO + 위키 크로스링크)
- 코드 블록은 수치 강조에만 사용: `` `100만 토큰` ``
- 이미지 없음 (현재 지원 안 함)

---

## 6. 제목 작성 규칙

- 60자 이내
- 주어 + 핵심 액션 + 수치/키워드 구조
- 수동태 금지, 능동태 사용

**좋은 예:**
> "Claude Opus 4.6, 1M 컨텍스트와 128k 출력을 열었다"
> "Google, Gemini 2.5 Flash를 API에 바로 풀었다"

**나쁜 예:**
> "새로운 AI 모델이 발표되었다"
> "흥미로운 업데이트 소식"

---

## 7. summary 작성 규칙

- 150-200자
- 첫 문장에 주어 + 핵심 행동
- 핵심 수치 1-2개 포함
- SEO meta description으로 사용됨

---

## 8. 후보 선별 & 등급

### 등급 분류 (aiki-generate.cjs 자동 적용)

| 등급 | 기준 | 처리 |
|------|------|------|
| A (필수 발행) | 공식 소스 + (트렌딩 OR 높은 engagement) | 전부 발행 (최대 7건) |
| B (발행 권장) | 공식 소스 OR engagement 높음 OR 트렌딩 | 최대 3건 |
| C (검토 후 결정) | 키워드 매칭만 | 드래프트만 (draft: true) |

### 일일 버짓

- 스코어 40 미만: 무조건 제외
- 일일 최소 1건, 최대 7건
- 같은 주제 (키워드 겹침 50%+): 최대 2건
- A등급 우선 → B등급 3건 → 나머지 드래프트

### 제외 기준

- 이미 널리 알려진 뉴스 (중복 보도)
- 한국어 계정 원글 큐레이션 (직접 번역/소개만 하는 것)
- 순수 뉴스 전달 (독자 문제 해결이 없는 것)
- 영상 추천만 하는 포스트

---

## 9. 톤 검증 (Phase 2.5)

기사 작성 후 `aiki-tone-check.cjs --date YYYY-MM-DD`로 검증한다.
PASS될 때까지 수정 → 재실행 반복. 최대 5회. **Phase 3(팩트체크) 진입 불가.**

### 검증 규칙 (11개, blog 프로파일)

| ID | 규칙 | 기준 | 수준 |
|----|------|------|------|
| T1 | 보도체 종결어미 과다 | ~했다/~됐다/~이다 50%+ | FAIL |
| T2 | 구어체 종결어미 부족 | ~이야/~거야/~해 15% 미만 | FAIL |
| T3 | AI 상투어 | 금지어 감지 | FAIL |
| T4 | AI 감탄 서술형 | 감탄 표현 감지 | FAIL |
| T5 | 전달체 과다 | ~한대/~했대/~래 3연속 | FAIL |
| T6 | Reddit 숫자 직접 인용 | r/sub에서 N명 형식 | FAIL |
| T7 | 사실 나열 연속 | 4연속 팩트 나열 | WARN |
| T8 | 구체적 숫자 부족 | 수치 2개 미만 | WARN |
| T9 | 교과서적 전환어 | 또한/더불어/결론적으로 | FLAG |
| T10 | 오프닝 문제 | 질문형/따옴표 시작 | FLAG |
| B1 | 인라인 링크 부족 | 링크 0개 | WARN |

### FAIL 시 수정 매핑

| 결과 | 수정 |
|------|------|
| T1 보도체 과다 | 종결어미를 구어체로 교체 |
| T2 구어체 부족 | ~했다/~이다를 ~이야/~거든/~해로 전환 |
| T3 AI 상투어 | 금지어를 대안 표현으로 교체 |
| T4 감탄 서술형 | 삭제 후 팩트 진입으로 교체 |
| T5 전달체 과다 | 3연속 중 1개를 본인 목소리로 전환 |
| T6 Reddit 숫자 | 간접 표현으로 교체 |
| B1 링크 부족 | 원본 출처 URL을 인라인 링크로 추가 |

---

## 10. 배포 전 검증

```bash
node D:/srcp/aiki/scripts/aiki-pre-publish-check.cjs --date YYYY-MM-DD
```

**검사 항목 (exit 1 시 배포 차단):**
- `factCheck.status: pending` → 팩트체크 미완
- `score: 0` 또는 미설정 → 점수 입력 필요
- 파일명 날짜 ≠ frontmatter 날짜 → 불일치
- 필수 frontmatter 필드 누락
- `guideVersion` 필드 누락 (v1.0.0+)

---

## 11. 파이프라인 요약

```
Phase 1: 데이터 수집 & 후보 선별
  ↓
Phase 2: 기사 생성 (Writing Guide 적용)
  ↓
Phase 2.5: 톤 검증 루프 (PASS 필수)
  ↓
Phase 3: 팩트체크 4단계
  ↓
Phase 4: 배포 (pre-publish-check 통과 필수)
  ↓
Phase 5: 결과 보고
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-04-20 | **카드 레이아웃 포맷 도입** — `formatVersion: 2` 신설, h2 섹션 분리 필수화, §5 본문 구조 개정. 템플릿이 h2를 섹션 카드로 렌더링하므로 의도적 섹션 분할이 표준. |
| 1.0.0 | 2026-04-09 | 초기 버전 — SKILL.md 뉴스 파이프라인 규칙 분리 |
