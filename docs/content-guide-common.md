# AIKI Content Guide — Common Rules

> **Guide ID**: `common`
> **Version**: `1.0.0`
> **Last Updated**: 2026-04-09
> **Applies to**: News, Wiki, Projects 모든 콘텐츠

이 문서는 AIKI 사이트의 모든 콘텐츠(뉴스, 위키, 프로젝트)에 공통으로 적용되는 생성 규칙이다.
타입별 세부 규칙은 `content-guide-news.md`, `content-guide-wiki.md`, `content-guide-projects.md`를 참조한다.

---

## 1. 버전 관리 규칙

### 가이드 버전

모든 가이드 문서는 시맨틱 버저닝(SemVer)을 따른다:
- **MAJOR** (x.0.0): 구조 변경, 필수 필드 추가/삭제, 톤 방향 전환 → 기존 콘텐츠 전면 재생성 필요
- **MINOR** (0.x.0): 규칙 추가/강화, 새 검증 항목 → 해당 규칙에 걸리는 콘텐츠만 재생성
- **PATCH** (0.0.x): 오타, 표현 개선, 예시 추가 → 재생성 불필요

### 생성된 페이지의 버전 기록

모든 생성 페이지의 frontmatter에 `guideVersion` 필드를 기록한다:

**뉴스 기사:**
```yaml
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
```

**위키 페이지:**
```yaml
guideVersion:
  common: "1.0.0"
  wiki: "1.0.0"
```

**프로젝트 페이지:**
```yaml
guideVersion:
  common: "1.0.0"
  projects: "3.0.0"
```

### 재생성 판단 기준

가이드 버전이 올라갔을 때, 기존 콘텐츠 재생성 여부를 아래 기준으로 판단한다:

| 변경 유형 | 재생성 범위 |
|-----------|-------------|
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
# common 1.0.0 이전 버전으로 생성된 뉴스 기사 찾기
grep -rl "common: \"0\." D:/srcp/aiki/src/content/news/ko/

# wiki 가이드 1.0.0 이전 위키 페이지 찾기
grep -rl "wiki: \"0\." D:/srcp/aiki/src/content/wiki/ko/

# guideVersion 필드가 아예 없는 레거시 콘텐츠 찾기
grep -rL "guideVersion" D:/srcp/aiki/src/content/news/ko/
grep -rL "guideVersion" D:/srcp/aiki/src/content/wiki/ko/
grep -rL "guideVersion" D:/srcp/aiki/src/content/projects/ko/
```

---

## 2. 독자 페르소나

**네니엘** — 모든 콘텐츠의 기준 독자

| 항목 | 내용 |
|------|------|
| 나이/성별 | 30대 여성 |
| 직업 | IT 회사 근무 |
| 관심사 | AI 업무자동화, 바이브코딩 |
| 선호 | 짧은 글, 실행 가능한 콘텐츠 |
| 비선호 | 긴 이론, 추상적 설명, AI 상투어 |

**페르소나 적용 원칙:**
- 네니엘이 읽고 "그래서 나한테 뭐가 달라지는데?"라는 질문에 답이 없으면 실패
- 기술 깊이보다 실무 감각 우선
- 전문 용어는 쓰되 맥락으로 이해 가능하게

---

## 3. 톤 & 문체

### 기본 톤: 구어체 혼합

보도체(~했다)와 구어체(~이야/~거든/~해)를 자연스럽게 섞는다.

**비율 기준:**
- 보도체 종결어미(~했다/~됐다/~이다): **50% 미만**
- 구어체 종결어미(~이야/~거야/~해/~거든): **15% 이상**

**좋은 예:**
> Anthropic이 Claude Opus 4.6를 내놓으면서 최상위 모델 경쟁의 초점을 다시 잡았어. 이번 발표에서 가장 먼저 보이는 숫자는 100만 토큰 컨텍스트와 12만8000 토큰 출력이야.

**나쁜 예:**
> Anthropic이 Claude Opus 4.6를 발표했다. 100만 토큰 컨텍스트와 128k 출력을 지원한다. 기존 가격을 유지했다.

### 금지 패턴

#### 3-1. AI 상투어 (T3)

| 금지어 | 대안 |
|--------|------|
| 혁신적 | 요점/골자/결국 |
| 획기적 | 핵심은/달라진 건 |
| 놀라운 | 눈에 띄는 건 |
| 인상적인 | 주목할 건 |
| 주목할 만한 | 짚어볼 건 |
| 급격한 | 빠른/큰 |

#### 3-2. AI 감탄 서술형 (T4)

"~이 놀라워", "~이 흥미로워", "~이 인상적이" 같은 감탄 표현 금지.
바로 팩트로 진입한다.

**금지:** "이 성능 향상이 놀랍다."
**대안:** "성능이 기존 대비 40% 올랐다."

#### 3-3. AI 가짜 경험담

"나도 느껴봤는데", "해봤는데" 같은 AI가 지어낸 1인칭 경험담 금지.

#### 3-4. 전달체 과다 (T5)

~한대/~했대/~래가 3회 연속 나오면 FAIL. 1회는 본인 목소리(~이야/~거야)로 전환.

#### 3-5. 교과서적 전환어 (T9)

"또한", "더불어", "결론적으로", "따라서" 등 교과서 전환어 최소화.

#### 3-6. Reddit 숫자 직접 인용 (T6)

"r/sub에서 N명 추천" 형식 금지. 간접 표현으로 교체.

**금지:** "r/MachineLearning에서 500 upvotes를 받았다"
**대안:** "ML 커뮤니티에서 큰 관심을 받았다"

### 오프닝 규칙 (T10)

- 질문형 시작 금지 ("~일까?")
- 따옴표 인용형 시작 금지
- 뉴스 훅으로 바로 시작

---

## 4. 숫자 & 팩트 규칙

### 구체적 숫자 (T8)

모든 콘텐츠에 **구체적 수치 최소 2개** 포함:
- 가격, 성능 수치, 날짜, 파라미터 수, 토큰 수, 속도 등

### 사실 나열 금지 (T7)

인과/반전/질문 없이 팩트만 4연속 나열하면 WARN.
서사 구조(인과관계, 반전, 질문)를 섞는다.

---

## 5. 팩트체크 공통 규칙

모든 콘텐츠(뉴스, 위키)는 4단계 팩트체크를 거친다:

| 단계 | 이름 | 방법 |
|------|------|------|
| 1 | 원문 대조 (source_match) | 원본 소스와 기사/페이지 비교 — 수치, 날짜, 고유명사 일치 확인 |
| 2 | 웹 교차검증 (web_cross_check) | WebSearch로 2+ 독립 출처 확인 |
| 3 | 수치 검증 (number_verify) | 가격, 성능 수치를 공식 문서 기준으로 정량 확인 |
| 4 | 비판적 검증 (adversarial) | 반론/맥락 누락/과장 검토 |

### 비판적 검증 체크리스트

- 기사/페이지에서 빠진 중요한 맥락이 있는가? (경쟁사 비교, 제한사항, 부작용)
- 수치가 체리피킹됐는가? (전체 맥락 없이 좋은 숫자만 인용)
- 출처의 이해관계가 있는가? (자사 벤치마크, PR 자료)
- 인과관계를 상관관계로 혼동하고 있는가?
- 미검증 최상급 표현이 있는가? ("세계 최초", "최대", "혁명적")

### 팩트체크 서술 톤

팩트체크도 본문과 같은 톤으로 쓴다. 보고서 메모처럼 끊지 않고, 독자가 "무엇을 확인했는지" 바로 읽히게 쓴다.

**좋은 예:**
> "공식 워크플로 문서는 workflow를 connected graph of nodes라고 설명한다."

**나쁜 예:**
> "공식 문서와 대체로 일치한다."

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
      sources: 2  # 독립 출처 수
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
      findings:  # 발견된 주의점 (pass여도 있을 수 있음)
        - "Anthropic 자체 벤치마크 수치라 독립 검증 필요"
```

**각 check의 items는 최소 3개.**
`factCheck.status: pending` 상태로 배포 금지.

---

## 6. readerValue 필드

모든 콘텐츠에 `readerValue` 필드 필수:
- 독자가 이 콘텐츠를 읽고 **어떤 판단을 내릴 수 있게 되는지** 한 문장으로 쓴다
- 20자 이상 필수
- "~하게 해준다" 또는 "~판단하게 해준다" 형태 권장

**좋은 예:**
> "이 모델이 성능 경쟁 이상의 제품 전략 신호를 주는지 빠르게 판단하게 해준다."

**나쁜 예:**
> "Claude Opus 4.6에 대한 정보를 제공한다."

---

## 7. 태그 규칙

- 소문자 kebab-case: `agentic-coding`, `vector-db`
- 고유명사는 원문 그대로: `anthropic`, `claude`, `openai`
- 최소 2개, 최대 6개
- 카테고리 성격 태그 + 고유명사 태그 혼합

---

## 8. 링크 규칙

### 위키 크로스링크

뉴스 본문과 위키 본문 모두에서 AIKI 위키 용어가 나오면 크로스링크한다:
```markdown
[MCP](/ko/wiki/mcp/)
[RAG](/ko/wiki/rag/)
```

### 외부 링크

- 뉴스: 본문 인라인 링크 OK (SEO 이점)
- 위키: 공식 소스 링크 인라인 OK

---

## 9. 언어 & 인코딩

- 본문 언어: 한국어 (`lang: ko`)
- frontmatter 문자열: YAML 따옴표 필수 (한국어 포함 시)
- 날짜: KST (UTC+9) 기준, `+09:00` suffix 필수
- 모델 이름: 반드시 구체적으로 — "Claude" (X) → "Claude Opus 4.6" (O)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-09 | 초기 버전 — 기존 SKILL.md, writing guide, memory feedback 통합 |
