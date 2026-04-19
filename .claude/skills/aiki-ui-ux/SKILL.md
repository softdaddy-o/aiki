---
name: aiki-ui-ux
description: aiki 프로젝트에서 UI/UX를 만들거나 고칠 때 매번 읽는 가이드. Claude와 Codex 모두 읽는다. 모든 페이지에 공통으로 적용되는 레이아웃·반응형 규칙, showcase-native 전용 패턴, news/wiki 표준 페이지 패턴을 한 문서에 모은다. 새로 만드는 경우와 기존을 고치는 경우 각각 워크플로우가 따로 있고, eval 테스트로 자체 검증한다.
---

# aiki UI/UX 가이드

이 문서는 aiki 저장소에서 레이아웃·스타일을 건드리는 모든 작업의 진입점이야. 새 페이지 만들기, 기존 쇼케이스 고치기, news/wiki 카드 수정 — 어떤 경우든 먼저 §0 을 읽고 맞는 섹션으로 이동해.

**규칙: 이 가이드와 충돌하는 ad-hoc 결정을 내리지 마.** 이 문서의 항목 하나하나는 실제 세션에서 수 시간 피드백으로 잡아낸 버그에서 나왔어. 중복된 주의처럼 보여도 전부 실제 상처임.

## 0. How to use this skill

| 상황 | 어디부터 읽어 |
|---|---|
| 새 페이지 만들기 | §1 (전역 규칙) → §2 or §3 (타입별) → §4 (from-scratch 워크플로우) |
| 기존 페이지 고치기 | §1 → §5 (fix 워크플로우) → 관련 타입 섹션 |
| 레이아웃 깨짐 디버그 | §5.2 + `refs/debug-iframe.html` |
| 배포 후 "똑같아 보임" | §7 (배포 검증) |
| 커밋 전 자체 검증 | §6 (evals) |

모든 세션이 끝나면 §6 eval 을 통과해야 머지. WARN은 판단, FAIL은 절대 머지 금지.

---

## 1. Universal rules (모든 페이지 공통)

모든 페이지에 예외 없이 적용. 반복 출현한 실수부터 나열.

### 1.1 레이아웃 부모 제약을 "먼저" 측정해라

aiki 의 `src/layouts/BaseLayout.astro` 에는 `main { max-width: 960px }` 가 있어. 이게 모든 페이지의 최상위 컨테이너 폭을 960으로 묶음. 자식 요소의 `max-width: 1440px` 같은 설정은 이 제약 안에서만 의미 있음.

**규칙:**
- 쉘/컨테이너에 `max-width` 를 설정할 때, 먼저 부모의 computed width 를 측정해. 설정한 값보다 부모가 작으면 내 max-width 는 무의미.
- Full-bleed(960 초과) 페이지를 만들 때는 반드시 `main` 을 해제해야 함. 방법은 §2.4 참고.
- 디버그 방법: `refs/debug-iframe.html` 의 컨테이너 체인 측정 섹션.

**세션 흉터:** 2026-04-19, HyperFrames 쉘을 `max-width: 1440px` 로 키웠는데 2560 뷰포트에서 실제 쉘 폭이 **390px** 였음. 원인은 `main { max-width: 960 }`. `main:has(.project-page--showcase-native) { max-width: none }` 으로 해제 후 정상 작동.

### 1.2 Responsive grid: 맨손 `1fr` 금지

`grid-template-columns: 1fr` 은 `minmax(auto, 1fr)` 과 같고, `auto = min-content`. 그리드 안에 max-content 성향이 강한 자식(긴 HTML 코드 블록, 영문 헤딩, 섹션 네비 가로 버튼)이 있으면 트랙이 그 자식을 수용하려고 확장됨. 결과: 그리드 컨테이너가 부모를 뚫고 오버플로우.

**규칙:**
- 단일 열 그리드는 항상 `grid-template-columns: minmax(0, 1fr)`.
- 다열 그리드: `repeat(2, minmax(0, 1fr))` 처럼 모든 트랙에 `minmax(0, ...)`.
- 그리드·플렉스 자식 카드에 `min-width: 0`.
- `<pre>`, `<code>` 와 같이 intrinsic 너비가 긴 요소: `max-width: 100%; min-width: 0; overflow: auto`.

**세션 흉터:** `.hf-main { display: grid; gap: 22px }` 에 `grid-template-columns` 없음 → `grid-auto-columns: auto` = max-content 가 되어 자식 패널이 666px 로 팽창해 모바일 오버플로우.

### 1.3 한국어 + 영문 혼용 타이포

- 영문 hero H1 (대문자, letter-spacing): `overflow-wrap: anywhere; word-break: break-word`.
- 한국어 본문: `word-break: keep-all` (단어 단위 줄바꿈).
- Hero font clamp 상한 **7rem 이하**. 7.5rem 이상 쓰면 1280~1440 뷰포트에서 우측 컬럼 침범함 (findings 참조).
- Hero vw 값은 **9vw 이하**. 그 이상이면 울트라와이드에서 터짐.

### 1.4 공유 컴포넌트 강제

이미 공유 컴포넌트가 있는 UI는 절대 인라인으로 재구현하지 마. PR 리뷰어가 FAIL 보낼 항목.

| UI | 공유 컴포넌트 | 위치 |
|---|---|---|
| Fact Check 카드 | `<FactCheck>` | `src/components/FactCheck.astro` |
| Showcase 섹션 네비 | `<ShowcaseSectionNav>` + `useShowcaseSectionNav` | `src/components/projects/showcases/` |
| 모델/프로젝트 메타 카드 | `<ModelProfile>` | `src/components/ModelProfile.astro` |
| BackLinks | `<BackLinks>` | `src/components/BackLinks.astro` |
| Score 배지 | `<ScoreBadge>` | `src/components/ScoreBadge.astro` |
| Timeline | `<Timeline>` | `src/components/Timeline.astro` |
| Social share | `<SocialShare>` | `src/components/SocialShare.astro` |

**세션 흉터:** HyperFrames가 `<FactCheck>` 대신 `.hf-fact-*` 인라인 카드 사용 — findings.md 에서 "🚨 규칙 위반" 으로 적힘.

### 1.5 톤/보이스

톤은 별도 가이드에 있음. 이 스킬에서 중복 안 함.

- **일반**: `docs/content-guide-common.md`
- **쇼케이스**: auto-memory `feedback_showcase_tone.md` (mixed oral/reportage)

쇼케이스 카피는 showcase 기존 페이지(`yfinance`, `nemotron-ocr-v2`, `nfi`) 본문 tone 참고.

### 1.6 스코프된 Astro CSS + React island

React island(`client:load`)에 CSS를 주입할 때 주의:

- Astro 스코프된 `<style>` 의 CSS는 `data-astro-cid-*` 어트리뷰트가 있는 요소에만 매치. React가 렌더하는 요소엔 자동으로 안 붙음.
- React 내부로 침투하려면 `:global(...)` 사용.
- 이때 **스페시피시티** 주의: `.showcase-frame :global(.child)` 는 `.showcase-frame`(0,1,0) + `.child`(0,1,0) = 0,2,0. 같은 것이 중복되면 소스 순서로 결정. `.showcase-frame.hf-frame :global(.child)` = 0,2,1,0 이 이김.

**세션 흉터:** `.hf-frame :global(.showcase-section-nav)` 규칙을 `.showcase-frame` 일반 규칙이 덮었음. `.showcase-frame.hf-frame :global(.showcase-section-nav)` 로 키워서 해결.

### 1.7 `100vw` vs `100%`

- `100vw` 는 스크롤바 폭을 포함함. 1px 오버플로우 원인 자주 됨.
- 안전한 기본: `max-width: 100%`, `calc(100vw - 24px)` 처럼 여유 두기.
- 수평 스크롤바 생기면 먼저 `100vw` 하드코드를 의심.

---

## 2. Showcase-native pages (projects 전용)

`project-page--showcase-native` 클래스가 붙는 페이지. `src/pages/ko/projects/[...slug].astro` 에서 `usesShowcaseNarrative === true` 분기로 진입. 2026-04 기준 `hyperframes` 만 해당. 다른 쇼케이스(yfinance, nfi 등)는 §3 표준 쇼케이스 사용.

### 2.1 Anatomy

```
<main>                                  ← BaseLayout, max-width 해제됨 (§2.4)
  <article class="project-page project-page--showcase-native">
    <section class="showcase-area showcase-area--lead">
      <div class="showcase-shell hf-shell">       ← 쉘 (폭·마진 담당)
        <div class="showcase-frame hf-frame">     ← 그리드 (네비 + 콘텐츠)
          <ShowcaseSectionNav />                  ← 고정 네비 (≥1280에서 floating)
          <HyperFramesShowcase>                   ← React island
            <header class="hf-hero">...</header>
            <Panel id="hf-section-cases">...</Panel>
            ...
          </HyperFramesShowcase>
          <div class="hf-fact-wrap">
            <FactCheck />                         ← 공유 컴포넌트 (§1.4)
          </div>
        </div>
      </div>
    </section>
    <footer class="project-footer">...</footer>
  </article>
</main>
```

자세한 구조는 `refs/showcase-native-anatomy.md`.

### 2.2 폭 규칙

| 뷰포트 | Shell max-width | 메모 |
|---|---|---|
| ≥ 1280 | `min(1440px, calc(100vw - 236px))` | 좌측에 floating nav 184px + 여백 |
| 1280 미만 ~ 901 | `min(1240px, calc(100vw - 24px))` | 네비는 쉘 안쪽 그리드 첫 열 |
| ≤ 900 | `100%` (엣지 투 엣지, padding 12px) | 네비는 상단 가로 스크롤로 접힘 |

### 2.3 Floating section nav (≥1280)

- `position: fixed; top: 92px; left: 16px; width: 188px;`
- 컨테이닝 블록 주의: `backdrop-filter: blur` 는 새 containing block 생성 → fixed 가 viewport 가 아니라 blur한 조상 기준이 됨. **쉘에서 `backdrop-filter: none`**.
- `z-index: 40` (사이트 nav 아래, 콘텐츠 위).
- Shell 이 `margin-left: max(220px, calc((100vw - 1440px) / 2))` 로 네비 자리 확보.

### 2.4 Main 제약 해제 (CRITICAL)

`src/layouts/BaseLayout.astro`:

```css
main { max-width: 960px; margin: 0 auto; padding: 32px 20px; }
main:has(.project-page--showcase-native) {
    max-width: none;
    padding-left: 0;
    padding-right: 0;
}
```

`:has()` 없으면 §1.1 버그 재발. **이 규칙을 건드리거나 새로운 wide 페이지 클래스를 만들 때는 반드시 여기에 추가해.**

### 2.5 Panel id (섹션 딥링크)

- React island 내부 각 `<Panel>` 에 `id` prop 필수 (예: `hf-section-cases`, `hf-section-takeaway`).
- `useShowcaseSectionNav` 훅이 IntersectionObserver 로 활성 섹션 감지.
- id 누락 시 섹션 네비 클릭/스크롤 동기화 안 됨.

### 2.6 Showcase-native 만들 때 흔한 함정

- React island 안에서 `<style>{cssString}</style>` 로 CSS 주입 시, Astro scoped CSS 와 분리됨 (§1.6).
- 그리드 자식에 `min-width: 0` 빠뜨리면 max-content 요소가 팽창.
- 긴 HTML 스니펫 `<pre>` 에 `max-width: 100%` 없으면 모바일 찢김.
- Hero `clamp` 상한 7rem 넘으면 1280~1440 에서 우측 컬럼 침범 (§1.3).
- 쉘 `backdrop-filter` 켜면 floating nav 가 쉘 안에 박힘 (§2.3).

---

## 3. Standard pages (news / wiki / 기본 project)

### 3.1 레이아웃 defaults

- `main { max-width: 960px }` 그대로 사용. 절대 해제하지 마.
- 페이지 article 클래스: `.project-page`, `.wiki-page`, `.news-page` 등.
- FactCheck 있는 글은 `<FactCheck>` 카드 필수 (§1.4).

### 3.2 News 페이지 특이사항

- 썸네일: 원본 소스 `og:image` 우선, 없으면 제목만 있는 fallback (auto-memory `feedback_news_thumbnails.md`).
- FactCheck 라벨은 한국어만 (auto-memory `feedback_factcheck_consistency.md`).
- Body 텍스트 포함 fallback은 만들지 마.

### 3.3 Wiki 페이지 특이사항

- Quality gate 4 차원 (≥60/100) 통과해야 머지 (auto-memory `project_wiki_quality_scoring.md`).
- 인라인 링크, 구체적 숫자 최소치 존재.
- 관련 용어 자동 링킹은 `scripts/aiki-link-related-terms.cjs` 가 처리.

### 3.4 Standard project 쇼케이스 (non-hyperframes)

- `showcase-frame-with-nav` 래퍼 사용 (180px nav 레일 + 1fr 콘텐츠).
- 쉘 1120px max 고정.
- 외부 `<header class="showcase-intro">` 로 타이틀/레데/서브 제공 (showcase 컴포넌트 내부에 hero 중복 넣지 마).

---

## 4. New-from-scratch workflow

신규 페이지/섹션 만들 때 순서. 건너뛰면 나중에 다시 고치게 됨.

1. **타입 결정**: showcase-native(§2) vs standard(§3). 고민되면 기본 standard.
2. **BaseLayout 영향 확인**: 신규 클래스가 `main` 폭을 바꿔야 하면 §2.4 형식으로 `main:has(.신규-클래스)` 규칙을 `BaseLayout.astro` 에 추가.
3. **Anatomy 스캐폴드**: `src/pages/` 또는 `src/components/` 에 구조 작성. Id, 공유 컴포넌트 사용, `:global()` 경계 명시.
4. **Responsive 체크리스트 적용** (`refs/responsive-checklist.md` 전부):
   - [ ] 모든 그리드: `minmax(0, 1fr)` / `repeat(N, minmax(0, 1fr))`
   - [ ] 그리드·플렉스 카드: `min-width: 0`
   - [ ] `<pre>`, `<code>`: `max-width: 100%; min-width: 0; overflow: auto`
   - [ ] Hero clamp 상한 `6rem` 선, 최대 `7rem`
   - [ ] Korean 본문: `word-break: keep-all`
   - [ ] 브레이크포인트 최소 4: 1200, 1100, 900, 720 (필요 시 추가)
5. **디버그 iframe 통과**: `refs/debug-iframe.html` 복사해서 `dist/_eval/dbg.html` 로 놓고 Chrome headless 로 돌려봄 (§5.2 참고). TRUE overflow 0 확인.
6. **Eval 통과** (§6): `bun run eval:ui` (또는 수동으로 `node .claude/skills/aiki-ui-ux/eval/check-source.mjs`).
7. **커밋 → 푸시 → 배포 검증** (§7).

---

## 5. Fixing existing pages workflow

버그 리포트 받았을 때 순서. 증거 없이 고치지 마.

### 5.1 증거 수집 먼저

1. 문제 뷰포트에서 **직접 스크린샷**. Chrome headless `--window-size=W,H --screenshot=out.png`.
2. `refs/debug-iframe.html` 로 실제 측정값 얻기:
   - innerWidth, html.scrollWidth, body.scrollWidth
   - 주요 컨테이너(`.main`, `.shell`, `.frame`, hero) 의 computed width/margin/max-width/grid-template-columns
   - TRUE overflow 요소(overflow:auto 스크롤 컨테이너 내부 제외) 리스트
3. 측정값 근거로 root cause 가설 수립. 추측 금지.

### 5.2 디버그 iframe 사용법

`refs/debug-iframe.html` 을 `dist/<target-path>/dbg.html` 로 복사. target URL 을 iframe src 로 로드해서 measurements 를 `<pre>` 에 출력.

```bash
# preview 서버 실행 중이어야 함 (bun run preview)
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --user-data-dir=/tmp/chromeDbg \
  --window-size=500,1400 --virtual-time-budget=7000 \
  --screenshot=.tmp/dbg.png \
  "http://127.0.0.1:4321/<target-path>/dbg.html"
```

스크린샷의 녹색 텍스트로 측정값 읽음.

**주의:** dbg.html 은 `dist/` 에 두되 프리뷰 빌드 후에만 serve 됨. 개발 중이면 `public/` 에 복사. 작업 끝나면 반드시 삭제/trash.

### 5.3 Root cause 별 대응

| 증상 | 일반 원인 | 참조 |
|---|---|---|
| 쉘이 지정한 max-width 못 미침 | 부모 `main` 제약 | §1.1 §2.4 |
| 모바일 가로 스크롤 | `1fr` 단독 사용 / `min-width:0` 누락 / `100vw` 하드코드 | §1.2 §1.7 |
| `<pre>` 가 카드 밀어냄 | `max-width:100%` 누락 | §1.2 |
| 섹션 네비 위치 이상 | `backdrop-filter` 가 fixed 컨테이닝 블록 생성 | §2.3 |
| 쇼케이스 CSS가 안 먹힘 | Astro 스코프 경계 / 스페시피시티 | §1.6 |
| 배포해도 똑같아 보임 | 아직 빌드 중 / 캐시 | §7 |

### 5.4 수정 후 회귀 확인

모든 브레이크포인트 재측정:
- 360, 390, 768, 1280, 1440, 1920, 2560
- 각 뷰포트에서 TRUE overflow 0 개, 핵심 컨테이너가 의도한 폭인지.

`eval/check-layout.mjs` 로 일괄 검증.

---

## 6. Evals

두 가지 eval 을 둠.

### 6.1 정적 소스 체커 (빠름, 서버 불필요)

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs
```

검사 항목:
- `grid-template-columns: 1fr` 단독 사용 (minmax 없이)
- Showcase `<pre>` / `<code>` 에 `max-width: 100%` 누락
- Hero `clamp(..., ..., >7rem)` 고폰트
- `hf-fact-*`, `news-fact-*` 등 인라인 FactCheck 재구현
- `main { max-width: ... }` 을 BaseLayout 밖 파일에 쓴 경우
- Showcase-native 페이지인데 `main:has(...)` override 누락

출력: FAIL / WARN / INFO 카테고리. FAIL 있으면 프로세스 exit code 1.

### 6.2 헤드리스 레이아웃 체커 (느림, preview 서버 필요)

```bash
# 먼저 preview 실행
bun run build && bun run preview &

# 체크 실행
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

검사 항목 (viewport 마다):
- body.scrollWidth ≤ innerWidth + 1 (오버플로우 없음)
- Showcase-native: 1440 뷰포트에서 쉘 폭 ≥ 1200
- Standard: 1440 뷰포트에서 main content ≤ 960
- TRUE overflow(스크롤 컨테이너 외부) 요소 0 개

대상 URL은 `eval/targets.json` 에.

### 6.3 한 번에 실행

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs && \
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

---

## 7. Deploy verification protocol

"똑같아 보여요" 재발 방지. 커밋 → 푸시 후 2~5분 후 라이브에 실제 CSS 가 반영됐는지 확인.

1. 변경한 CSS 에서 고유한 문자열 추출 (예: `margin-left:max(220px,calc`).
2. ```bash
   curl -s "https://aiki.softdaddy-o.com/ko/projects/hyperframes/" | grep -F "margin-left:max(220px,calc"
   ```
3. 매치 없으면 아직 빌드 중. 60초~2분 대기 후 재시도.
4. 매치 있으면 라이브 스크린샷으로 최종 확인.
5. 스크린샷 대조 시 URL 에 `?v=$(date +%s)` 쿼리 붙여 캐시 우회.

자세한 레시피: `refs/deploy-verify.md`.

---

## 8. 이 스킬 유지보수

스킬 자체가 실수에서 나오는 문서임. 새 버그나 피드백 잡으면 두 가지 중 하나:

- **반복 가능한 규칙**: 해당 섹션(§1~§3)에 항목 추가 + **세션 흉터** 기록.
- **체커로 잡을 수 있는 규칙**: `eval/check-source.mjs` 또는 `check-layout.mjs` 에 룰 추가.

한 번 잡으면 다시 잡지 않는다.
