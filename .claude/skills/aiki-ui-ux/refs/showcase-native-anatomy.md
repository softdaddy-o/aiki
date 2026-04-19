# Showcase-native anatomy

`project-page--showcase-native` 클래스를 가진 페이지의 상세 구조와 CSS 계약.

## 페이지 분기

`src/pages/ko/projects/[...slug].astro:85`

```ts
const usesShowcaseNarrative = showcaseComponent === 'hyperframes';
```

신규 showcase-native 추가 시:
1. 위 조건에 id 추가 (`showcaseComponent === 'hyperframes' || showcaseComponent === '새id'`)
2. 해당 분기에서 `.hf-shell`·`.hf-frame` 와 동일한 wrapper 구조 적용.
3. CSS 클래스는 새 prefix 로 (예: `.foo-shell`, `.foo-frame`) 만들되, §2.4 의 `main:has()` override 는 공통 `.project-page--showcase-native` 로 트리거됨.

## Wrapper 스택

```
<main>                                            ← BaseLayout
  └ article.project-page.project-page--showcase-native
    └ section.showcase-area.showcase-area--lead
      └ div.showcase-shell.hf-shell               ← 폭·마진 담당
        └ div.showcase-frame.showcase-frame-with-nav.hf-frame  ← 그리드 컨테이너
          ├ ShowcaseSectionNav                    ← ≥1280 에서 fixed
          ├ HyperFramesShowcase (React island, client:load)
          │   └ div.hf-showcase (display:contents)
          │     ├ header.hf-hero
          │     │   └ h1 + copy + meta-grid + tags
          │     └ main.hf-main
          │         └ Panel[id="hf-section-*"] × N
          └ div.hf-fact-wrap
              └ FactCheck                         ← 공유 컴포넌트
    └ footer.project-footer
```

## 핵심 CSS 계약

`src/pages/ko/projects/[...slug].astro` scoped `<style>`:

```css
.hf-shell {
  max-width: min(1440px, calc(100vw - 24px));
  backdrop-filter: none;                   /* floating nav containing block 이슈 회피 */
}

.hf-frame :global(.showcase-section-nav) {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.hf-fact-wrap {
  grid-column: 2;
  min-width: 0;
  margin-top: 18px;
  scroll-margin-top: 100px;
}

@media (min-width: 1280px) {
  .hf-shell {
    margin-left: max(220px, calc((100vw - 1440px) / 2));
    margin-right: auto;
    max-width: min(1440px, calc(100vw - 236px));
  }
  .showcase-frame.hf-frame {
    grid-template-columns: minmax(0, 1fr);  /* 네비는 fixed, 단일 열 */
  }
  .showcase-frame.hf-frame :global(.hf-main) { grid-column: 1; }
  .hf-fact-wrap { grid-column: 1; }
  .showcase-frame.hf-frame :global(.showcase-section-nav) {
    position: fixed;
    top: 92px; left: 16px;
    width: 188px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    z-index: 40;
    grid-row: auto; grid-column: auto;
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.32);
  }
}

@media (max-width: 1279px) {
  .hf-shell { max-width: min(1240px, calc(100vw - 24px)); }
}

@media (max-width: 900px) {
  .hf-shell {
    max-width: 100%;
    padding: 16px 12px 20px;
    border-radius: 18px;
  }
}
```

`src/layouts/BaseLayout.astro`:

```css
main { max-width: 960px; margin: 0 auto; padding: 32px 20px; }
main:has(.project-page--showcase-native) {
  max-width: none;
  padding-left: 0;
  padding-right: 0;
}
```

## React island 내부 CSS

React island (`hyperframes/index.tsx`) 의 CSS 는 `<style>{cssString}</style>` 으로 주입. Astro 스코프와 분리되어 전역임. 주요 규칙:

```css
.hf-main {
  grid-column: 2;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);   /* 없으면 max-content 로 팽창 */
  gap: 22px;
}
.hf-hero, .hf-panel { min-width: 0; }
.hf-card, .hf-step-card, .hf-insight-card, .hf-compare-card {
  padding: 16px; border-radius: 16px;
  min-width: 0;                            /* 그리드 자식 수축 허용 */
}
.hf-code-card pre, .hf-step-card code {
  overflow: auto;
  min-width: 0;
  max-width: 100%;                         /* intrinsic 폭 제한 */
}
```

## Panel id 컨벤션

- `hf-section-<topic>` 형식.
- 예: `hf-section-cases`, `hf-section-takeaway`, `hf-section-decide`, `hf-section-adopt`, `hf-section-ops`, `hf-section-compare`, `hf-section-fact`.
- `useShowcaseSectionNav` 에 같은 id 리스트 전달.

## 신규 showcase-native 만들 때 체크리스트

- [ ] `usesShowcaseNarrative` 분기에 신규 showcase id 추가
- [ ] 전용 wrapper 클래스 (`.<slug>-shell`, `.<slug>-frame`) 정의 + 폭 규칙
- [ ] `main:has(.project-page--showcase-native)` override 가 이미 있음 — 재확인만
- [ ] React island 내 모든 그리드 `minmax(0, 1fr)`
- [ ] React island 카드들에 `min-width: 0`
- [ ] `<pre>` 에 `max-width: 100%; min-width: 0`
- [ ] Panel id 규약 준수
- [ ] FactCheck 공유 컴포넌트 사용 (인라인 금지)
- [ ] Hero clamp 상한 6rem
- [ ] `backdrop-filter` OFF on shell (floating nav 유지 위해)
- [ ] `refs/debug-iframe.html` 로 전 뷰포트 검증
