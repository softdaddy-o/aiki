# AIKI Content Guide — Projects

> **Guide ID**: `projects`
> **Version**: `4.2.0`
> **Last Updated**: 2026-04-23
> **Depends on**: `tone-guide-common.md` v2.0.0+, `content-guide-common.md` v2.2.0+
> **Applies to**: `src/content/projects/ko/*.md` frontmatter/body + 사용자에게 보이는 showcase copy

이 문서는 AIKI 프로젝트 페이지의 콘텐츠 구성 문서다. tone은 `docs/tone-guide-common.md`를 따르고, 레이아웃과 반응형 규칙은 `.claude/skills/aiki-ui-ux/SKILL.md`가 맡는다. 이 문서는 프로젝트 페이지가 어떤 정보 순서와 카드 구조를 가져야 하는지만 다룬다.

---

## 1. 프로젝트 페이지 목표

독자가 저장소 소개를 읽는 데서 끝나지 않고, `지금 바로 테스트할지`, `보류할지`, `어떤 워크플로로 검증할지`를 빠르게 가를 수 있어야 한다.

좋은 프로젝트 페이지의 기준:
1. 첫 구간에서 프로젝트가 뭘 하는지와 어디서 빛나는지가 바로 보인다
2. 실제 실행, 화면, 입력/출력, 운영 감각이 텍스트에 들어 있다
3. 독자가 붙여 볼 대상과 피해야 할 조건이 같이 보인다
4. 카드, 본문, factCheck가 같은 판단축과 같은 증거 체계를 유지한다

---

## 2. 적용 범위

- frontmatter `summary`, `readerValue`
- markdown body
- showcase 카드 제목, 카드 본문, 섹션 리드, 캡션, 상태 문구
- factCheck summary / items / findings

프로젝트 페이지에서 사용자에게 보이는 문장형 카피는 전부 이 가이드를 따른다.

검사와 리뷰는 markdown body만 보지 않는다. `showcaseComponent`가 가리키는 TSX showcase source까지 같은 편집 면으로 본다. review hash도 markdown과 showcase source를 같이 묶는다. TSX 카피만 바뀌어도 project review가 다시 돌아야 한다.

### 2-1. 숨은 입력도 같은 톤 규칙을 따른다

- 사용자가 직접 보는 카피만 검사한다고 끝내지 않는다.
- prompt에 들어가는 `userProblem`, `decisionAxis`, `relatedHints`, review hint, 예시 카드 문구, 기본 템플릿, script default도 전부 같은 tone guide를 따라야 한다.
- 숨은 입력이 `~해준다`, `~보게 해 준다`, `~판단하게 해 준다`, `~구분하게 해 준다` 같은 helper-verb 골격을 밀어 넣으면, 아직 화면에 드러나지 않았더라도 가이드 위반으로 본다.
- project 쪽 숨은 입력은 판단 축, 비교 축, 조건, 범위, 근거처럼 바로 써야 한다. 말투를 유도하는 예시나 canned ending을 넣지 않는다.
- 숨은 입력에 tone 예시를 따로 적지 않는다. tone은 `docs/tone-guide-common.md`만 정본이다.
- review나 pre-publish 단계에서 이런 숨은 입력이 확인되면, 화면 카피가 멀쩡해 보여도 바로 FAIL로 본다.

---

## 3. 프로젝트 콘텐츠 구성

### 3-1. 모든 프로젝트 페이지는 showcase-native 기준으로 설계한다

- 모든 project 페이지는 HyperFrames 계열의 `showcase-native`를 기준선으로 잡는다.
- legacy `showcase-frame-with-nav` 나 `project-explainer + <Content />` 구조는 신규 기준이 아니다.
- 콘텐츠 설계는 `읽는 산문`이 아니라 `훑어서 판단하는 카드형 면`을 전제로 한다.

### 3-2. no-prose 규칙을 기본으로 둔다

- showcase-native 프로젝트는 markdown `<Content />` 산문을 본문에 그대로 렌더하지 않는다.
- `entry.body`의 정보는 CASES, TAKE_CARDS, FIT/SKIP, ADOPTION_STEPS, OPS, COMPARE 같은 카드 데이터로 분해해서 쓴다.
- 카드 안 문단이 길게 이어지면 분해가 덜 된 것으로 본다.
- `readerValue`도 페이지 소개가 아니라 독자의 실제 go/no-go 판단을 써야 한다.

### 3-3. 첫 화면은 hero 메타 다음에 판단 카드로 이어진다

- 첫 구간은 `hero → takeaway → decide` 흐름을 기본으로 둔다.
- hero는 프로젝트 정체성, summary, source/metric/license, tags 같은 메타를 먼저 정리한다.
- hero 바로 아래에는 독자가 한눈에 잡을 수 있는 판단 카드가 와야 한다.
- `Interactive Showcase`, 데모 보드, 실행 통계, 운영 조건은 hero를 밀어내지 않는 선에서 다음 panel로 넘긴다.

### 3-4. panel set은 역할이 분명해야 한다

기본 panel set:

| Panel | 역할 |
|---|---|
| `hero` | 프로젝트 정체성, summary, 메타, tags |
| `takeaway` | 한눈 판단 2-4개 |
| `decide` | `USE IT / SKIP IT` 또는 동급의 go/no-go 분기 |
| `cases` | 실제 입력, 실행 흐름, 화면, 출력 |
| `adopt` | 설치/도입/연결 흐름 |
| `ops` | 운영 비용, 메모리, 제약, 환경 조건 |
| `compare` | 대안과 갈리는 축 |
| `fact` | FactCheck 컴포넌트 |

- 모든 프로젝트가 모든 panel을 다 가져갈 필요는 없지만, `hero`, `takeaway`, `decide`, `fact`는 기본 세트로 본다.
- 생략한 panel이 있으면 그 자리를 다른 panel이 어떤 역할로 대신하는지 설명 가능해야 한다.

### 3-5. 카드 헤더는 라벨형으로 짧게 둔다

- 카드 제목과 섹션 헤더는 라벨, 판단 축, 기능 묶음 형태로 짧게 둔다.
- 제목 줄에서 설명문을 끝내지 않는다. 설명은 카드 본문이나 근거 block에서 푼다.
- 헤더만 읽어도 어떤 면을 비교하는지 보여야 한다.

### 3-6. 비교 문구는 근거 카드와 붙여 쓴다

`X보다 Y에 가깝다`, `A쪽이다`, `B에 맞다` 같은 비교 문구는 단독 결론으로 끝내지 않는다. 바로 뒤에 최소 하나는 붙는다.

- 어떤 테스트를 해 보면 되는지
- 운영상 어디서 갈리는지
- 붙이면 이득인 워크플로가 뭔지
- 피해야 할 조건이 뭔지

### 3-7. 데모가 있으면 입력과 출력을 같이 둔다

- 프로젝트 쇼케이스는 UI 설명보다 실제 입력과 실제 출력이 먼저 보여야 한다.
- 화면, 명령, 응답, 저장 결과, 메모리 수치처럼 독자가 그대로 따라 볼 수 있는 근거를 우선한다.
- 리포지토리 소개만 있고 실행 흔적이 없으면 판단 면이 비어 있는 것으로 본다.

---

## 4. 리뷰 체크포인트

5인 리뷰와 수동 리뷰에서 아래를 같이 본다.

1. `docs/tone-guide-common.md` 위반이 없는가
2. 첫 구간이 페이지 소개가 아니라 프로젝트 판단과 증거로 열리는가
3. `<Content />` 산문 대신 showcase-native 카드 구조로 분해되어 있는가
4. panel set이 역할별로 분명하게 나뉘어 있는가
5. 비교 문구가 concrete go/no-go 없이 누적되지 않는가
6. 카드 제목과 헤더가 라벨형으로 정리되어 있는가
7. factCheck까지 같은 판단축과 증거 체계를 유지하는가
8. 숨은 prompt 입력, 예시, review hint, script default가 tone guide 바깥의 말투를 다시 밀어 넣지 않는가

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 4.2.0 | 2026-04-23 | 숨은 prompt 입력, 예시, review hint, script default도 같은 tone guide를 따라야 한다는 규칙을 추가. `~해준다`류 helper-verb 골격을 project 가이드 위반으로 명시. |
| 4.1.1 | 2026-04-23 | 공통 구성 가이드 v2.2.0에 맞춰 `Depends on` 버전을 갱신. |
| 4.1.0 | 2026-04-23 | tone 정본 버전 상향에 맞춰 의존 버전을 갱신. 프로젝트 구성 문서는 여전히 구조 규칙만 소유한다. |
| 4.0.0 | 2026-04-23 | tone 규칙을 `docs/tone-guide-common.md`로 분리하고, 이 문서를 프로젝트 콘텐츠 구성 문서로 재정의. `showcase-native`, `no-prose`, `panel set` 규칙을 UI/UX skill에서 이관. |
| 3.1.0 | 2026-04-22 | project tone 적용 범위를 markdown body에서 showcase TSX까지 확장. project review와 review hash가 두 파일 범위를 함께 보도록 명시. |
| 3.0.0 | 2026-04-21 | 프로젝트 페이지 텍스트 규칙을 별도 content-guide로 분리. UI/UX 스킬과 tone-editor 프롬프트에서 중복 정의하던 프로젝트 톤 규칙을 이 문서로 이동. |
