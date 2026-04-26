# aiki Project — Shared Guidance

Snapshot of guidance shared across Claude Code and Codex for the aiki project.

## UI/UX Rules (both hosts)

- All project showcases are showcase-native. HyperFrames (`/ko/projects/hyperframes/`) is the sole reference.
- No prose (`<Content />` forbidden). Decompose into Panel + card. news/wiki are exempt.
- No copy-pasting legacy `showcase-frame-with-nav`. Promote via §2.9 if found.

## Evals (must pass before PR/deploy)

```bash
node .claude/skills/aiki-ui-ux/eval/check-source.mjs
bun run build && bun run preview &
node .claude/skills/aiki-ui-ux/eval/check-layout.mjs
```

FAIL 0 required.

## Agents (12 project-local, mirrored to account)

- Source: `agents/` (review/, pipeline/, ops/)
- Registry: `agents/_registry.yaml` (v3.0.0) — 3 panels, 1 pipeline, 12 agents
- Account mirror: `~/.codex/agents/aiki-*.toml` (must be re-synced on agent edits)
