# AIKI Content Guide — Common Composition

> **Guide ID**: `common`
> **Version**: `2.2.0`
> **Last Updated**: 2026-04-23
> **Applies to**: News, Wiki, Projects 모든 콘텐츠

이 문서는 AIKI 전체의 공통 콘텐츠 구성 문서다. tone은 `docs/tone-guide-common.md`가 맡고, 타입별 구조는 `docs/content-guide-news.md`, `docs/content-guide-wiki.md`, `docs/content-guide-projects.md`가 맡는다.

---

## 1. 버전 관리 규칙

### 가이드 버전

모든 가이드 문서는 시맨틱 버저닝(SemVer)을 따른다:
- **MAJOR** (x.0.0): 구조 변경, 필수 필드 추가/삭제, 문서 역할 전환 → 기존 콘텐츠 전면 재검토 필요
- **MINOR** (0.x.0): 규칙 추가/강화, 새 검증 항목 → 해당 규칙에 걸리는 콘텐츠만 재생성
- **PATCH** (0.0.x): 오타, 표현 개선, 예시 추가 → 재생성 불필요

### 생성된 페이지의 버전 기록

모든 생성 페이지의 frontmatter에 `guideVersion` 필드를 기록한다:

**뉴스 기사:**
```yaml
guideVersion:
  tone: "2.0.0"
  common: "2.2.0"
  news: "3.1.0"
```

**위키 페이지:**
```yaml
guideVersion:
  tone: "2.0.0"
  common: "2.2.0"
  wiki: "3.1.0"
```

**프로젝트 페이지:**
```yaml
guideVersion:
  tone: "2.0.0"
  common: "2.2.0"
  projects: "4.1.0"
```

### 재생성 판단 기준

가이드 버전이 올라갔을 때, 기존 콘텐츠 재생성 여부를 아래 기준으로 판단한다:

| 변경 유형 | 재생성 범위 |
|-----------|-------------|
| tone MAJOR 변경 | 전체 콘텐츠 |
| tone MINOR 변경 | tone 영향이 큰 콘텐츠 우선 |
| tone PATCH 변경 | 없음 |
| common MAJOR 변경 | 전체 콘텐츠 |
| common MINOR 변경 | 변경된 규칙에 해당하는 콘텐츠 |
| common PATCH 변경 | 없음 |
| news/wiki MAJOR 변경 | 해당 카테고리 전체 |
| news/wiki MINOR 변경 | 해당 카테고리에서 관련 콘텐츠 |
| news/wiki PATCH 변경 | 없음 |
| projects MAJOR 변경 | 프로젝트 전체 |
| projects MINOR 변경 | 관련 프로젝트 페이지만 |
| projects PATCH 변경 | 없음 |

**재생성 대상 찾기 (CLI):**
```bash
# tone 2.0.0 이전 버전으로 생성된 뉴스 기사 찾기
grep -Erl "tone: \"(0|1)\\." D:/srcp/aiki/src/content/news/ko/

# common 2.2.0 이전 위키 페이지 찾기
grep -Erl "common: \"(0|1|2\\.[01])\\." D:/srcp/aiki/src/content/wiki/ko/

# guideVersion 필드가 아예 없는 레거시 콘텐츠 찾기
grep -rL "guideVersion" D:/srcp/aiki/src/content/news/ko/
grep -rL "guideVersion" D:/srcp/aiki/src/content/wiki/ko/
grep -rL "guideVersion" D:/srcp/aiki/src/content/projects/ko/
```

---

## 2. 문서 역할 분리

- `docs/tone-guide-common.md`: AIKI 전체 tone 정본
- `docs/content-guide-common.md`: 공통 frontmatter, readerValue, factCheck, 링크, 언어 규칙
- `docs/content-guide-news.md`, `docs/content-guide-wiki.md`, `docs/content-guide-projects.md`: 타입별 콘텐츠 구성 규칙
- `.claude/skills/aiki-ui-ux/SKILL.md`: 레이아웃, 컴포넌트, responsive, eval 규칙만 담당

같은 규칙을 두 군데에 적지 않는다. tone 문제는 tone guide로, 구조 문제는 content guide로, 레이아웃 문제는 UI/UX skill로 보낸다.

## 3. 독자 페르소나

**네니엘** — 모든 콘텐츠의 기준 독자

| 항목 | 내용 |
|------|------|
| 나이/성별 | 30대 여성 |
| 직업 | IT 회사 근무 |
| 관심사 | AI 업무자동화, 바이브코딩 |
| 선호 | 짧은 글, 실행 가능한 콘텐츠 |
| 비선호 | 긴 이론, 추상적 설명, 템플릿 문구 |

**페르소나 적용 원칙:**
- 네니엘이 읽고 "그래서 나한테 뭐가 달라지는데?"라는 질문에 답이 없으면 실패
- 기술 깊이보다 실무 감각 우선
- 전문 용어는 쓰되 맥락으로 이해 가능하게

---

## 4. 공통 구성 규칙

- summary, readerValue, body, factCheck는 서로 다른 표현이어도 같은 판단축을 가리켜야 한다.
- 독자가 얻는 판단은 `readerValue`에 먼저 잡고, 본문과 factCheck가 그 판단을 뒷받침해야 한다.
- 페이지 소개 문구만 길게 늘어놓지 않는다. 무엇을 봐야 하는지, 왜 중요한지, 어디서 갈리는지를 초반에 잡는다.
- 근거 없는 일반론보다 구체적인 입력, 출력, 장면, 수치, 제품 범위, 날짜를 우선한다.
- 다른 제품명으로 바꿔도 그대로 들어맞는 문장이 많으면 실패다.

## 5. 수치 & 근거 규칙

### 구체적 숫자

모든 콘텐츠에 **구체적 수치 최소 2개**를 우선한다.
- 가격, 성능 수치, 날짜, 파라미터 수, 토큰 수, 속도, 메모리 사용량 등

### 사실 나열 금지

인과나 비교 없이 팩트만 길게 나열하면 독자가 판단 축을 못 잡는다. 숫자와 사실은 의미, 조건, 다음 행동과 같이 붙인다.

---

## 6. 팩트체크 공통 규칙

모든 콘텐츠(뉴스, 위키, 프로젝트)는 4단계 팩트체크를 거친다:

| 단계 | 이름 | 방법 |
|------|------|------|
| 1 | 원문 대조 (source_match) | 원본 소스와 기사/페이지 비교 — 수치, 날짜, 고유명사 일치 확인 |
| 2 | 웹 교차검증 (web_cross_check) | WebSearch 또는 독립 출처 2개 이상 확인 |
| 3 | 수치 검증 (number_verify) | 가격, 성능 수치를 공식 문서 기준으로 정량 확인 |
| 4 | 비판적 검증 (adversarial) | 반론, 맥락 누락, 과장 가능성 검토 |

### 비판적 검증 체크리스트

- 기사/페이지에서 빠진 중요한 맥락이 있는가? (경쟁사 비교, 제한사항, 부작용)
- 수치가 체리피킹됐는가? (전체 맥락 없이 좋은 숫자만 인용)
- 출처의 이해관계가 있는가? (자사 벤치마크, PR 자료)
- 인과관계를 상관관계로 혼동하고 있는가?
- 미검증 최상급 표현이 있는가? (`세계 최초`, `최대` 같은 말)

### factCheck frontmatter 구조

```yaml
factCheck:
  status: passed  # passed | failed | pending
  date: "YYYY-MM-DD"
  sources:
    - url: "https://..."
      title: "Source Name"
  checks:
    - type: source_match
      result: pass  # pass | fail | skip
      summary: "무엇을 확인했는지 한 문장"
      items:
        - "구체 확인 항목 1"
        - "구체 확인 항목 2"
        - "구체 확인 항목 3"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "..."
      items: [...]
    - type: number_verify
      result: pass
      summary: "..."
      items: [...]
    - type: adversarial
      result: pass
      summary: "..."
      items: [...]
      findings:
        - "자체 벤치마크라 독립 검증 필요"
```

**각 check의 items는 최소 3개.**
`factCheck.status: pending` 상태로 배포하지 않는다.

---

## 7. readerValue 필드

모든 콘텐츠에 `readerValue` 필드가 필요하다.
- 독자가 이 콘텐츠를 읽고 **어떤 판단을 내릴 수 있게 되는지** 한 문장으로 쓴다
- 20자 이상
- 페이지 자체를 소개하지 말고 독자의 다음 판단을 적는다

**좋은 예:**
> "이 변화가 제품 방향까지 바꾸는 신호인지 먼저 가를 수 있다."

**나쁜 예:**
> "Claude Opus 4.6에 대한 정보를 제공한다."

---

## 8. 태그 규칙

- 소문자 kebab-case: `agentic-coding`, `vector-db`
- 고유명사는 원문 그대로: `anthropic`, `claude`, `openai`
- 최소 2개, 최대 6개
- 카테고리 성격 태그 + 고유명사 태그를 섞는다

---

## 9. 링크 규칙

### 위키 크로스링크

뉴스 본문과 위키 본문 모두에서 AIKI 위키 용어가 나오면 크로스링크한다:
```markdown
[MCP](/ko/wiki/mcp/)
[RAG](/ko/wiki/rag/)
```

### 외부 링크

- 뉴스: 본문 인라인 링크 OK
- 위키: 공식 소스 링크 인라인 OK
- 프로젝트: 저장소, 공식 문서, 데모 경로는 직접 연결

---

## 10. 언어 & 인코딩

- 본문 언어: 한국어 (`lang: ko`)
- frontmatter 문자열: YAML 따옴표 필수 (한국어 포함 시)
- 날짜: KST (UTC+9) 기준, `+09:00` suffix 필수
- 모델 이름과 제품 이름은 구체적으로 쓴다. `"Claude"`보다 `"Claude Opus 4.6"`처럼 적는다.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.2.0 | 2026-04-23 | `readerValue` 예시에서 tone을 유도하는 템플릿 문장을 걷고, 구조 문서답게 역할 설명만 남겼다. |
| 2.1.0 | 2026-04-23 | 공통 구성 문서의 예시 `guideVersion`과 레거시 탐색 예시를 최신 tone 정본(`tone-guide-common.md` v2.0.0) 기준으로 갱신. |
| 2.0.0 | 2026-04-23 | tone 규칙을 `docs/tone-guide-common.md`로 분리하고, 이 문서를 공통 구성 문서로 재정의. `guideVersion.tone` 추가. |
| 1.0.0 | 2026-04-09 | 초기 버전 — 기존 SKILL.md, writing guide, memory feedback 통합 |
