# aiki UI/UX evals

두 체커:

## `check-source.mjs` — 정적 소스 체커 (빠름)

서버 필요 없음. `src/pages`, `src/layouts`, `src/components` 아래의 `.astro`, `.tsx`, `.css` 파일을 훑어 안티패턴 감지.

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs
```

규칙:

| id | level | 설명 |
|---|---|---|
| R1-bare-1fr | WARN | `grid-template-columns` 에 맨손 `1fr`. `minmax(0, 1fr)` 로. |
| R2-pre-code-guard | INFO | `pre`/`code` CSS 규칙에 `max-width: 100%` 가 없음. |
| R3-hero-clamp | WARN | hero font clamp 상한 > 7rem. |
| R4-inline-factcheck | **FAIL** | 인라인 `*-fact-*` 클래스 — 공유 `<FactCheck>` 사용해. |
| R5-main-maxwidth | WARN | BaseLayout 밖에서 `main { max-width }` 수정. |
| R6-baselayout-has | **FAIL** | BaseLayout 에 `main:has(.project-page--showcase-native)` override 누락. |
| R7-backdrop-filter | INFO | showcase 관련 파일에 `backdrop-filter` 활성화. floating 자식 있으면 꺼. |

FAIL 1개라도 있으면 exit 1.

## `check-layout.mjs` — 헤드리스 레이아웃 체커 (느림)

사전조건:
- `bun run build` 성공 (`dist/` 존재).
- 프리뷰 서버 실행 중 (기본 `http://127.0.0.1:4321`).
- Chrome 설치됨 (Windows/macOS/Linux 경로 자동 탐지, `CHROME_PATH` env 로 override).

```bash
bun run build && bun run preview &
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

각 `targets.json` 항목에 대해 5개 뷰포트(390/768/1280/1440/2560)에서 측정:

- `body.scrollWidth > innerWidth + 1` → FAIL (가로 오버플로우).
- TRUE overflow(overflow:auto 외부) 요소 수 > 0 → FAIL.
- `showcase-native` 타입: 1440 뷰포트에서 shell 폭 < 1200 → FAIL (main 제약 회귀 의심).
- `standard` 타입: 1440 뷰포트에서 main 폭 > 1000 → WARN.

## 대상 수정

`eval/targets.json` 편집. 새 페이지 추가 시 URL + type 만 넣으면 됨. 타입은 `showcase-native` 또는 `standard`.

## 한 번에 실행

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs && \
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```
