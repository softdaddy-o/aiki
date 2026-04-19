# AGENTS

UI/UX 작업 (`.astro`, `.tsx`, CSS, showcase/news/wiki 페이지) 전에 반드시 읽을 것:

- **`.claude/skills/aiki-ui-ux/SKILL.md`** — aiki 프로젝트 UI/UX 가이드 + eval 테스트

**핵심 운영 룰 (SKILL §2.0):**
- **모든 project 쇼케이스는 showcase-native**. HyperFrames (`/ko/projects/hyperframes/`) 가 유일한 레퍼런스 — 모든 신규/승격 project 페이지는 이 페이지의 정보 위계와 조형을 기준선으로 맞춘다.
- **산문 금지** (§2.7). `<Content />` 렌더하지 말고 Panel + card 로 분해. news/wiki 는 예외.
- legacy `showcase-frame-with-nav` 복붙 금지. 발견하면 §2.9 로 승격.

이 스킬에는 다음이 들어있다:

- **§1 공통 규칙** — 부모 제약 체인(BaseLayout `main { max-width: 960px }`), `minmax(0, 1fr)`, `min-width: 0`, 공유 컴포넌트 강제(`<FactCheck>` 등).
- **§2 showcase-native** — HyperFrames 레퍼런스, Panel/card grammar, no-prose 규칙, legacy 승격 절차.
- **§3 standard** — news/wiki 전용 (project 제외).
- **§4 새로 만드는 워크플로우** / **§5 기존 페이지 고치기 워크플로우**.
- **§6 evals** — `check-source.mjs` (정적, R1~R9) + `check-layout.mjs` (헤드리스).
- **§7 배포 검증** — `curl | grep` 패턴, 캐시 우회 스크린샷.

eval 명령:

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs
bun run build && bun run preview &
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

FAIL 0 이 되어야 PR/배포.
