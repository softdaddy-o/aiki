---
name: aiki-ui-ux
description: aiki 프로젝트에서 UI/UX를 만들거나 고칠 때 매번 읽는 가이드. Claude와 Codex 모두 읽는다. 모든 project 쇼케이스는 HyperFrames 를 레퍼런스로 showcase-native 로 만들고, news/wiki 만 standard 포맷을 쓴다. 산문 금지, Panel+card 로 분해. 레이아웃·반응형 규칙과 eval 테스트 포함.
---

# aiki UI/UX 가이드

이 문서는 aiki 저장소에서 레이아웃·스타일을 건드리는 모든 작업의 진입점이야. 새 페이지 만들기, 기존 쇼케이스 고치기, news/wiki 카드 수정 — 어떤 경우든 먼저 §0 을 읽고 맞는 섹션으로 이동해.

**규칙: 이 가이드와 충돌하는 ad-hoc 결정을 내리지 마.** 이 문서의 항목 하나하나는 실제 세션에서 수 시간 피드백으로 잡아낸 버그에서 나왔어. 중복된 주의처럼 보여도 전부 실제 상처임.

## TL;DR (가장 자주 놓치는 것)

1. **모든 project 쇼케이스 = showcase-native.** Legacy `showcase-frame-with-nav` (yfinance/nfi/nautilus-trader/lightrag 옛날 포맷) 신규에 복붙 금지. **HyperFrames (`/ko/projects/hyperframes/`) 가 정보 위계·조형의 유일한 레퍼런스**. 새 쇼케이스는 이 페이지를 "닮게" 만드는 것이 목표 — 조금 비슷하게가 아니라, 구조·카드 grammar·뷰 밀도가 같은 계보.
2. **산문 금지.** Project 페이지에서 markdown `<Content />` body 는 렌더하지 않는다. 모든 정보를 Panel + card 로 분해. "읽는" 페이지가 아니라 "훑으면 30초에 판단" 이 목표.
3. **News/wiki 만 standard (§3).** 장문 읽기 콘텐츠 전용. Project 는 절대 여기 들어오지 마.
4. **모든 showcase-native 는 nav 첫 항목이 `소개`여야 한다.** hero 는 `id={\`${SECTION_PREFIX}hero\`}` 를 가진 첫 섹션이어야 하고, 섹션 네비도 `소개 / 한눈 요약과 메타`로 시작한다.
5. **hero 는 project meta 전용이다.** hero 안에는 큰 `h1` + source/metric/license + tags 만 둔다. `Interactive Showcase`, summary, 읽는 방식, 데모 통계, 실행 맥락은 hero 에 넣지 않고 다음 섹션에서 각 프로젝트에 맞게 푼다.
5. **포맷/가이드 변경 시 버전 bump 는 필수다 (§3.11).** 레이아웃 바꿨으면 `formatVersion` 올리고, 글쓰기 룰 바꿨으면 `guideVersion` 올리고, 두 guide 파일 Changelog 에 한 줄 남겨라. 빠뜨리면 나중에 어떤 기사가 어떤 기준으로 쓰였는지 추적 불가.

## 0. How to use this skill

| 상황 | 어디부터 읽어 |
|---|---|
| **새 project 쇼케이스 만들기** | §1 → **§2 (HyperFrames 를 기준으로 clone)** → §4 |
| **기존 project 페이지를 HyperFrames 수준으로 승격** | §1 → §2 → §2.9 (legacy 판별) → §5 |
| 새 news/wiki 만들기 | §1 → §3 → §4 |
| 기존 news/wiki 고치기 | §1 → §5 → §3 |
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

- **일반**: `docs/content-guide-common.md`
- **쇼케이스 Panel 문구**: 구어체 혼합 (mixed oral/reportage). 구어체 종결어미 (~이야/~거야/~해/~거든) 15% 이상, 보도체 (~했다/~됐다/~이다) 50% 미만. AI 상투어 (혁신적, 획기적, 놀라운) 금지.
- 정중한 ~입니다체로만 쓰면 사이트 전체 톤과 동떨어짐. `docs/content-guide-common.md` 기준선 동일 적용.

쇼케이스 카피는 showcase 기존 페이지(`nemotron-ocr-v2`, `hyperframes`) 본문 tone 참고.

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

### 1.5 CSS ownership

- `news / wiki / project` 레벨 공통 CSS 는 허용. 같은 카테고리에서 반복되는 chrome 은 공통으로 올린다.
- project 개별 CSS 는 그래프, 캔버스, 표, OCR 결과, 차트, 비교 레일, 탭 같은 **특수 인터랙션**에만 남긴다.
- hero, panel, meta-grid, tag-row, section lead 같은 반복 chrome 은 project 파일마다 다시 쓰지 말고 shared helper 로 뽑는다.
- showcase 공통 chrome 은 `src/components/projects/showcases/sharedShowcaseCss.ts` 를 우선 사용한다.
- 동일 CSS 조각이 2개 showcase 이상에서 반복되면 다음 수정 전에 shared helper 로 승격한다.

## 2. Showcase-native pages (모든 project 쇼케이스)

**Project 카테고리의 모든 페이지가 따라야 할 구성**. `project-page--showcase-native` 클래스가 붙고, `src/pages/ko/projects/[...slug].astro` 의 `usesShowcaseNarrative === true` 분기로 진입.

### 2.0 HyperFrames = 유일한 레퍼런스 (운영 룰)

**`https://aiki.softdaddy-o.com/ko/projects/hyperframes/` (및 프리뷰 `/ko/projects/hyperframes/`) 가 2026-04 기준 최신 UX 컴포지션이다. 모든 신규/승격 project 페이지는 이 페이지의 정보 위계와 조형을 기준선으로 맞춘다.**

- "HyperFrames 가 있는 걸 보고, 다른 건 다른 방식으로 해도 된다"로 해석하지 마. HyperFrames 는 **레퍼런스**다 — 참고용이 아니라 **닮아야 할 기준**.
- 조금 비슷하게가 아니라 **구조·카드 grammar·뷰 밀도가 같은 계보**.
- 과거 `yfinance`, `nfi`, `nautilus-trader`, `lightrag` 의 "standard showcase" 포맷 (`showcase-frame-with-nav`, 1120 max, 180 nav rail, 산문 `<Content />` 병치) 은 **legacy**. 신규 작업에 복붙 금지. 발견하면 §2.9 로 승격 대상.
- 유일한 예외: legacy 페이지를 건드리지 말라는 명시 지시가 있을 때만. 나머지는 무조건 §2.

**세션 흉터 (nemotron-ocr-v2, 2026-04-19):** Codex 가 이 스킬 초판을 읽고 nemotron-ocr-v2 를 standard showcase (legacy `showcase-frame-with-nav`) 로 만듦. 산문 `<Content />` + 쇼케이스 컴포넌트가 섞인 mixed 페이지가 됨. 원인은 §2 opening 이 "2026-04 기준 hyperframes 만 해당" 으로 써 있어 레퍼런스 성격이 가려져 있었음. 이 §2.0 은 그 재발 방지용.

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
- hero 도 예외 아님. 첫 섹션은 반드시 `id={\`${SECTION_PREFIX}hero\`}` 를 가진 `소개` 구역이어야 하고, nav 첫 항목도 여기를 가리켜야 한다.

### 2.6 Showcase-native 만들 때 흔한 함정

- React island 안에서 `<style>{cssString}</style>` 로 CSS 주입 시, Astro scoped CSS 와 분리됨 (§1.6).
- 그리드 자식에 `min-width: 0` 빠뜨리면 max-content 요소가 팽창.
- 긴 HTML 스니펫 `<pre>` 에 `max-width: 100%` 없으면 모바일 찢김.
- Hero `clamp` 상한 7rem 넘으면 1280~1440 에서 우측 컬럼 침범 (§1.3).
- 쉘 `backdrop-filter` 켜면 floating nav 가 쉘 안에 박힘 (§2.3).

### 2.7 No-prose rule (정보 위계 핵심)

Project 쇼케이스의 **핵심 결단**: 읽게 만들지 말고 **훑어서 판단**하게 만든다.

- markdown body `<Content />` 는 **렌더하지 않는다**. `[...slug].astro` 의 `!usesShowcaseNarrative` 분기 안에 있는 `project-explainer` / `.prose` 섹션은 legacy.
- `entry.body` 의 원문 정보는 **React 쇼케이스 컴포넌트의 데이터 배열로 분해**해 들어간다 (CASES, TAKE_CARDS, FIT_CARDS, OPS_CARDS 등).
- 산문 `<p>` 3줄 이상 이어지는 카드는 설계가 잘못된 것. 분해가 덜 된 것.
- 왜: HyperFrames 는 **"훑으면 30초에 판단"** 을 목표로 한다. 산문은 이 목표와 충돌. "읽는 페이지"가 필요하면 news/wiki (§3) 로 가야 할 콘텐츠다.

**체크리스트:**
- [ ] `<Content />` 안 쓰고 있다
- [ ] 각 Panel 의 모든 정보가 `label + value + note` 또는 `title + body + chips` 로 분해돼 있다
- [ ] 카드 안에 `<p>` 가 있으면 한 문단 이하, 2~3줄

### 2.8 Panel/card grammar (HyperFrames 골격)

HyperFrames 의 표준 Panel 골격. 프로젝트 특성 맞춰 조정은 가능하되, grammar 는 동일.

| Panel id (prefix-) | 역할 | 카드 종류 |
|---|---|---|
| `hero` | title, meta grid (source/metric/license), tags | `meta-card` |
| `cases` | 실행 쇼케이스 (tab + prompt + code + video + watch-points) | tab list + 4 stage cards |
| `takeaway` | 한 줄 판단 | `insight-card` ×3, 첫 번째 accent |
| `decide` | USE IT / SKIP IT 2분할 | `insight-card` ×N |
| `adopt` | 도입 흐름 (step + command + body) | `step-card` ×3–5 |
| `ops` | 운영 비용 / 환경 조건 | `insight-card` ×N |
| `compare` | vs 대안 도구 | `compare-card` ×3–5 |
| `fact` | FactCheck 공유 컴포넌트 (§1.4) | `<FactCheck>` 한 개 |

**필수 Panel**: `hero`, `takeaway`, `decide`, `fact`. 나머지는 프로젝트 성격에 맞게 가감 가능하지만 생략 시 이유 기록.

**`hero` 운영 규칙**
- 섹션 네비의 첫 항목은 반드시 `소개`.
- `소개`는 `label: '소개'`, `description: '한눈 요약과 메타'`를 기본값으로 쓴다.
- hero 섹션은 `id={\`${SECTION_PREFIX}hero\`}` 를 가져야 하고, `useShowcaseSectionNav` 의 `initialId` 도 `hero` 로 시작한다.
- 프로젝트 이름은 hero 안에서 큰 `h1` 로 직접 보여야 한다. slug/chip/h2 로 대체하지 않는다.
- hero 는 `source / metric / license` 메타와 tag row 만 가진다. 여기서는 project 메타만 보여준다.
- `Interactive Showcase`, summary, reading mode, 데모 통계, 런타임/실행 보드는 hero 가 아니라 **다음 섹션**에서 프로젝트별 개요로 푼다.
- 소개가 빠진 showcase 는 HyperFrames 기준선에서 이탈한 것으로 보고 수정 대상이다.

**카드 visual contract** — 모든 정보 원자는 bordered card:

```css
border: 1px solid var(--color-border);
background: var(--color-surface);
border-radius: 8~14px;
padding: 14~22px;
min-width: 0;
```

**카드 내용 grammar**:
- `<kicker>` (small uppercase/muted label) + `<strong/h3>` (title) + `<p>` (body, 1~3줄) + 선택적 `<chip-row>`
- 또는 `<label>` (dt-스타일) + `<value>` (dd, 큰 폰트) + 선택적 `<note>`

**Panel visual contract**:
- 같은 bordered surface 사용
- `<Panel head>` 에 h2 (`font-size: clamp(20~28px)`), 아래 카드 grid
- grid 는 `minmax(0, 1fr)` (§1.2)

### 2.9 Legacy 판별 — 보이면 승격

다음 신호 하나라도 있으면 legacy, showcase-native 로 승격 필요.

| 신호 | 의미 |
|---|---|
| `!usesShowcaseNarrative` 분기 안에서 렌더 | legacy project 템플릿 탔음 |
| `project-hero` + `model-card` + `hero-tags` HTML 구조 (astro 내부) | legacy hero. `hf-hero` + `hf-meta-grid` 로 교체 |
| `project-explainer` + `<Content />` | 산문 섹션. §2.7 위반. 제거하고 Panel 로 분해 |
| `showcase-frame-with-nav` (1120 max, 180 nav rail) | legacy shell. `showcase-frame + {slug}-frame` 로 교체 |
| `showcase-intro` + `<p>` + `<h2>` + `<span>` 의 외부 hero | legacy. hero 는 React 컴포넌트 안의 `Panel id={prefix-hero}` 로 이동 |
| Panel 없이 평면 `<section>` 나열 | grammar 없음. Panel 로 래핑 |
| React 컴포넌트 안에 cover 이미지 + HTML 산문 mix | no-prose 위반 (§2.7) |

승격 절차:
1. `showcaseComponent` slug 을 `usesShowcaseNarrative` 판별에 추가 (§2.10).
2. React 컴포넌트 안에 `ShowcaseSectionNav` + Panel grammar 로 재구성.
3. Astro 쪽 legacy hero/explainer 섹션 제거.
4. BaseLayout `main:has()` override 에 이미 `.project-page--showcase-native` 가 있는지 확인 (§2.4).

### 2.10 코드 경로 (`usesShowcaseNarrative` 게이트)

현재 `src/pages/ko/projects/[...slug].astro` 에 다음 줄이 있음:

```ts
const usesShowcaseNarrative = showcaseComponent === 'hyperframes';
```

**이 체크는 임시 방편**. 신규/승격 쇼케이스마다 확장해야 함:

```ts
const SHOWCASE_NATIVE = new Set(['hyperframes', 'nemotron-ocr-v2', /* ... */]);
const usesShowcaseNarrative = SHOWCASE_NATIVE.has(showcaseComponent);
```

장기: legacy 분기 (`!usesShowcaseNarrative` 의 hero/explainer) 를 전부 제거하고 모든 프로젝트가 showcase-native 경로로만 들어가게 리팩토. 새 쇼케이스가 들어올 때마다 이 리팩토 한 스텝씩 전진.

### 2.11 현재 마이그레이션 백로그

2026-04-19 기준 R8 FAIL 로 올라오는 legacy 쇼케이스 (`check-source.mjs` 가 자동 감지):

| slug | 상태 | 비고 |
|---|---|---|
| `hyperframes` | ✅ showcase-native | 레퍼런스 |
| `nemotron-ocr-v2` | 🚧 승격 대기 | §2.7 산문 혼합, §2.9 승격 절차로 먼저 처리 |
| `yfinance` | 🚧 승격 대기 | legacy `showcase-frame-with-nav` |
| `nfi` | 🚧 승격 대기 | legacy `showcase-frame-with-nav` |
| `nautilus-trader` | 🚧 승격 대기 | legacy `showcase-frame-with-nav` |
| `lightrag` | 🚧 승격 대기 | legacy `showcase-frame-with-nav` |

각 승격 시 R8 FAIL 하나씩 내려감. 전부 내려가면 legacy 분기 자체를 제거 (§2.10 장기 목표).

---

## 3. Standard pages (news / wiki 전용)

**읽기용 장문 콘텐츠 전용**. Project 페이지는 절대 여기 포함 안 됨 — project 는 무조건 §2.

### 3.1 레이아웃 defaults

- `main { max-width: 960px }` 그대로 사용. 절대 해제하지 마.
- 기사 본문 열 폭 **720px** (`.wiki-article`, `.news-article`). 이전 680px 는 한국어에서 답답했음 (2026-04 iteration 에서 상향).
- `padding-top: 20px` (모바일 12px).
- FactCheck 있는 글은 `<FactCheck>` 카드 필수 (§1.4).

### 3.2 타이포그래피 스케일 (news / wiki 공통)

| 요소 | 값 | 이유 |
|---|---|---|
| h1 | `font-size: clamp(26px, 4.2vw, 34px); line-height: 1.28; letter-spacing: -0.015em; font-weight: 800;` | 모바일~데스크탑 부드러운 스케일, 한국어 h1 은 굵게 |
| lead / summary | `font-size: 16px; line-height: 1.7;` (wiki) / `line-height: 1.72;` (news) | 가독성 우선 |
| body | `font-size: 16px` (wiki) / `16.5px` (news); `line-height: 1.82;` | 뉴스 본문은 더 크게 |
| h2 (본문) | `font-size: 20px; margin: 32px 0 12px; letter-spacing: -0.01em;` | 섹션 구분 |
| h3 (본문) | `font-size: 17px; margin: 24px 0 8px;` | 서브섹션 |
| kicker h3 (related, model-hierarchy) | `font-size: 13-14px; text-transform: uppercase; letter-spacing: 0.06em; color: --color-text-muted; font-weight: 600;` | 메타 라벨 |

### 3.3 한국어 타이포 필수 규칙

- h1, summary, body `p`, `li`: **`word-break: keep-all`** (단어 단위 줄바꿈).
- h1 은 `overflow-wrap: anywhere` 도 같이. 긴 영어 용어 한 덩어리가 튀어나오는 걸 방지.
- `font-variant-numeric: tabular-nums` 는 날짜·언급 횟수처럼 숫자 라벨에.

### 3.4 메타 섹션 grammar

```
.article-meta {
  display: flex;
  justify-content: space-between;   // 좌: date/badge/source, 우: share
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 14px;
  margin-bottom: 18-20px;
  padding-bottom: 14-16px;
  border-bottom: 1px solid var(--color-border);   // divider 필수
}
```

- 모바일 (`max-width: 640px`): `align-items: stretch`, share 블록 `width: 100%; margin-left: 0`.
- 좌측 아이템 (`.article-meta-primary`): `display: flex; gap: 10px; flex-wrap: wrap; min-width: 0;`

### 3.5 Pill / chip grammar

News/wiki 의 pill 은 일관된 형태로:
- `border-radius: 999px;`
- `padding: 3-5px 10-14px;`
- `border: 1px solid ...;` (색상은 용도별)
- 링크형 (related-link, article-source): `color-mix(in srgb, var(--color-wiki|--color-news) 55%, transparent)` border, hover 시 `14%` 배경 + solid border.
- 중립형 (tag, alias): `var(--color-border)` border, `var(--color-surface-alt)` bg.

### 3.6 Code/pre 가드 (§1 R2)

본문이 `<Content />` 를 렌더하므로 `:global()` 로 guard 필수:

```css
.article-body :global(code),
.article-body :global(pre) {
  max-width: 100%;
  min-width: 0;
  overflow: auto;
}
```

### 3.7 News 페이지 특이사항

- **썸네일 정책**: 원본 소스 `og:image` 우선 (`fetch-news-og.mjs`). 원본 없을 때만 fallback (`gen-news-og-fallback.mjs`).
- **`AIKI` 로고 site-default 는 cover 로 노출하지 마**. slug-specific `og/news/*.jpg` 또는 `og/news-fallback/*.png` 가 없으면 `.article-cover` 자체를 렌더하지 말 것. 로고만 박힌 커버는 읽기 흐름을 끊음.
  ```astro
  const hasExternalOg = fs.existsSync(...);
  const hasFallbackOg = fs.existsSync(...);
  const showCover = hasExternalOg || hasFallbackOg;
  {showCover && <div class="article-cover">...}
  ```
- **fallback 이미지에는 제목만**. summary/body 텍스트 절대 넣지 마 — 제목 길 때 겹쳐서 지저분해짐.
- FactCheck 라벨은 한국어만. 영문 직접 노출 (`source_match` 등) 금지.
- `.article-source` 는 외부 링크 pill — `↗` after 아이콘, `color-mix` 얇은 border.

### 3.8 Wiki 페이지 특이사항

- **Quality gate**: `npm run wiki:quality` (4 차원 반복성/구체성/팩트체크/독자가치). 통과 임계값 **80/100**. 미달 → `draft: true` 자동 설정 (`npm run wiki:quality:fix`).
  - Gate script: `scripts/aiki-wiki-quality-gate.cjs`, 채점 모듈: `scripts/lib/wiki-quality-scoring.cjs`
  - Codex 에서도 쓸 수 있는 스킬: `~/.codex/skills/wiki-content-ops/`
- 인라인 링크, 구체적 숫자 최소치 존재.
- 관련 용어 자동 링킹은 `scripts/aiki-link-related-terms.cjs` 가 처리.
- `.category-badge` 는 solid var(--color-wiki) 배경 + 검정 텍스트 pill (강한 강조).
- `.related-terms` 섹션은 `border-top: 1px solid var(--color-border); margin-top: 36px; padding-top: 22px;` — 본문과 명확한 시각적 분리.

### 3.9 산문 OK, 단 품질 기준은 유지

news/wiki 는 산문 허용 (§2.7 no-prose 규칙은 여기 적용 안 됨). 하지만:
- 인라인 숫자·링크 있는 구체 문장 선호.
- 핵심 정보가 본문 중간에 묻혀 있으면 wiki 는 **하위 헤딩으로 분할**, news 는 **리드 문단에 요약**.

### 3.10 세션 흉터

- **2026-04-19**: wiki/news 열 폭 680→720, h1 스케일 up (clamp 26-34), 메타 divider 추가, pill grammar 통일, news site-default cover 억제. iteration 1 에서 "editorial 톤" 확보. before/after 비교 결과 한국어 가독성 개선 + 데스크탑 공기감 확보.
- **2026-04-20**: h2 섹션 카드 포맷 도입. JS DOM 래퍼로 h2+내용을 `.prose-card` 로 묶음. TechStackMap 을 본문 위로 이동. 관련용어 중복 방지 (backlinks vs relatedTerms dedup). formatVersion 2 신설. 이 변경으로 content guide 도 v2.0.0 으로 버전업.

### 3.11 버전 관리 강제 규칙 (CRITICAL)

**이 섹션은 강제다.** 레이아웃·글쓰기·검증 로직을 바꿀 때마다 반드시 버전을 올려야 한다. 빠뜨리면 나중에 어떤 기사가 어떤 기준으로 쓰였는지 추적 불가.

#### `formatVersion` — 레이아웃/템플릿 변경 시

**언제 올리나**: 페이지 구조·CSS·JS 동작이 바뀌어 이미 발행된 콘텐츠가 새 렌더링 방식으로 표시될 때.

예: h2 섹션 카드 포맷 도입, TechStackMap 위치 이동, 새 UI 컴포넌트 추가, 카드 grammar 변경.

**절차:**
1. `src/content.config.ts` 에서 해당 컬렉션 schema 의 `formatVersion` default 값을 올림.
   ```ts
   formatVersion: z.number().default(2),   // was 1
   ```
2. 새 콘텐츠 frontmatter 에는 새 버전 명시 (`formatVersion: 2`).
3. `docs/content-guide-news.md` 또는 `docs/content-guide-wiki.md` Changelog 에 한 줄 추가.
4. 이 SKILL.md §3.10 세션 흉터에도 기록.

#### `guideVersion` — 글쓰기/팩트체크 룰 변경 시

**언제 올리나**: 글쓰기 톤, 섹션 구조 규칙, 팩트체크 기준, frontmatter 스펙이 바뀔 때.

예: h2 섹션 구조 의무화, 관련용어 섹션 금지 추가, factcheck check 항목 수 변경.

**절차:**
1. 해당 guide 파일 (`docs/content-guide-news.md` / `docs/content-guide-wiki.md`) 헤더의 `**Version**` 올림.
2. 파일 하단 Changelog 에 변경 내용 한 줄 추가.
3. 새 콘텐츠 frontmatter 의 `guideVersion.news` / `guideVersion.wiki` 에 새 버전 명시.

#### 두 버전이 동시에 올라가는 경우

레이아웃도 바뀌고 글쓰기 룰도 바뀌면 둘 다 올린다. 2026-04-20 카드 포맷 도입이 그 예.

#### 절대 빠뜨리지 마

- "작은 변경이라 괜찮다" → 없다. 모든 렌더링/글쓰기 변경은 versioned.
- 버전 없이 배포하면 기존 콘텐츠가 새 포맷/기준에서 어떻게 보이는지 확인 불가.
- 새 콘텐츠를 쓰는 Codex 나 다른 에이전트가 잘못된 버전 참조 → 품질 회귀.

---

## 4. New-from-scratch workflow

신규 페이지/섹션 만들 때 순서. 건너뛰면 나중에 다시 고치게 됨.

1. **타입 결정**:
   - project 카테고리 페이지 → **무조건 §2 (showcase-native, HyperFrames 기준 clone)**. 예외 없음.
   - news 기사 → §3 (standard).
   - wiki 항목 → §3 (standard).
   - 그 외는 기본 standard.
2. **Project 인 경우**: HyperFrames 소스 (`src/components/projects/showcases/hyperframes/index.tsx`) 를 열고 §2.8 Panel grammar 로 **새 쇼케이스 컴포넌트 설계**.
   - 컨텐츠를 우선 CASES / TAKE_CARDS / FIT_CARDS / SKIP_CARDS / ADOPTION_STEPS / OPS_CARDS / COMPARE_CARDS 로 분해 (원본 markdown 은 참고만).
   - Panel id prefix 를 slug 기반으로 잡기 (`nemotron-ocr-section-`).
   - `[...slug].astro` 의 `usesShowcaseNarrative` 집합에 slug 추가 (§2.10).
3. **BaseLayout 영향 확인**: showcase-native 라면 `main:has(.project-page--showcase-native)` override 이미 있음 (§2.4). 새 wide 클래스가 따로 필요한 경우에만 추가.
4. **Anatomy 스캐폴드**: `src/pages/` 또는 `src/components/` 에 구조 작성. Id, 공유 컴포넌트 사용, `:global()` 경계 명시.
5. **Responsive 체크리스트 적용** (`refs/responsive-checklist.md` 전부):
   - [ ] 모든 그리드: `minmax(0, 1fr)` / `repeat(N, minmax(0, 1fr))`
   - [ ] 그리드·플렉스 카드: `min-width: 0`
   - [ ] `<pre>`, `<code>`: `max-width: 100%; min-width: 0; overflow: auto`
   - [ ] Hero clamp 상한 `6rem` 선, 최대 `7rem`
   - [ ] Korean 본문: `word-break: keep-all`
   - [ ] 브레이크포인트 최소 4: 1200, 1100, 900, 720 (필요 시 추가)
6. **Project-only: no-prose 체크** (§2.7): `<Content />` 안 쓰는지, 카드 안 `<p>` 3줄 이하인지.
7. **디버그 iframe 통과**: `refs/debug-iframe.html` 복사해서 `dist/_eval/dbg.html` 로 놓고 Chrome headless 로 돌려봄 (§5.2 참고). TRUE overflow 0 확인.
8. **Eval 통과** (§6): `bun run eval:ui` (또는 수동으로 `node .claude/skills/aiki-ui-ux/eval/check-source.mjs`).
9. **커밋 → 푸시 → 배포 검증** (§7).

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
- **Project 쇼케이스가 showcase-native set 에 없음** (§2.0, R8 FAIL)
- **Project `[...slug].astro` 에 `project-explainer + <Content />` 레거시 산문 분기** (§2.7, R9 WARN)

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
