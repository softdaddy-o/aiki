# AGENTS

UI/UX 작업 (`.astro`, `.tsx`, CSS, showcase/news/wiki 페이지) 전에 반드시 읽을 것:

- **`.claude/skills/aiki-ui-ux/SKILL.md`** — aiki 프로젝트 UI/UX 가이드 + eval 테스트

이 스킬에는 다음이 들어있다:

- **§1 공통 규칙** — 부모 제약 체인(BaseLayout `main { max-width: 960px }`), `minmax(0, 1fr)`, `min-width: 0`, 공유 컴포넌트 강제(`<FactCheck>` 등).
- **§2 showcase-native** — 와이드 shell(≥1200px @1440+), `main:has()` 에스케이프 해치.
- **§3 standard** — news/wiki 페이지 톤·타이포·레이아웃.
- **§4 새로 만드는 워크플로우** / **§5 기존 페이지 고치기 워크플로우**.
- **§6 evals** — `check-source.mjs` (정적) + `check-layout.mjs` (헤드리스).
- **§7 배포 검증** — `curl | grep` 패턴, 캐시 우회 스크린샷.

eval 명령:

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs
bun run build && bun run preview &
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

FAIL 0 이 되어야 PR/배포.
