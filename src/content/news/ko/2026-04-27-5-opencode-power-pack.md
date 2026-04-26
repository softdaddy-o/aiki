---
title: "Claude Code의 skills 라이브러리가 OpenCode로 이식됐어"
date: "2026-04-27T10:30:00+09:00"
lang: ko
category: news
summary: "r/LocalLLaMA에 opencode-power-pack이 올라왔어. Claude Code의 commands·agents 디렉터리는 호환 안 되지만, skills 디렉터리만은 SKILL.md 표준으로 OpenCode·Cursor·Gemini CLI에서도 그대로 돌아간다는 게 이번 노트의 무게중심이야."
readerValue: "Claude Code 락인을 피하면서 워크플로 자산을 어디까지 옮길 수 있는지 직접 가를 수 있어."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1swf37n/opencodepowerpack_claude_code_skills_ported_to/"
sourceTitle: "r/LocalLLaMA — Opencode-power-pack: Claude Code skills ported to OpenCode"
draft: false
score: 80
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-27"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1swf37n/opencodepowerpack_claude_code_skills_ported_to/"
      title: "r/LocalLLaMA — opencode-power-pack"
    - url: "https://opencode.ai/docs/skills/"
      title: "OpenCode Docs — Agent Skills"
    - url: "https://github.com/dkmnx/superpowers-opencode"
      title: "GitHub — superpowers-opencode"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원글의 호환성 주장을 OpenCode 공식 문서와 GitHub 저장소로 검증."
      items:
        - "Claude Code commands/·agents/ 포맷은 Claude Code 전용"
        - "skills/ 디렉터리는 SKILL.md 표준이라 양쪽 호환"
        - "OpenCode 공식 문서가 skills 사용법을 별도 페이지로 안내"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Reddit 게시물 외 OpenCode 공식 문서, 별개 GitHub 포팅 프로젝트로 교차 확인."
      items:
        - "Reddit 게시물: 직접 사용 후 정리한 호환성 표"
        - "OpenCode Docs: skills 공식 지원 명시"
        - "superpowers-opencode 저장소: 별개 사람이 같은 작업"
    - type: number_verify
      result: pass
      summary: "호환성 표의 도구 매핑 수를 정량 확인."
      items:
        - "TodoWrite → update_plan"
        - "Task 서브에이전트 → @mention 시스템"
        - "Skill 도구 → use_skill 커스텀 도구"
        - "Read·Write·Edit·Bash → 네이티브 도구"
    - type: adversarial
      result: pass
      summary: "skills 호환성의 한계와 락인 잔여 영역을 표시."
      items:
        - "commands·agents 디렉터리는 여전히 Claude Code 전용"
        - "use_skill 같은 커스텀 도구를 OpenCode가 직접 지원해야 동작"
        - "스킬 자체가 Claude의 도구 이름에 의존하면 변환이 필요"
      findings:
        - "Claude Code의 모든 자산이 옮겨지는 게 아니라 skills/ 디렉터리에 한정돼"
        - "복잡한 멀티에이전트 워크플로는 여전히 Claude Code 안에서만 동작 — 단순 스킬만 휴대 가능"
tags: ["claude-code", "opencode", "skills", "agents", "interop"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[r/LocalLLaMA](/ko/wiki/localllama/)에 [opencode-power-pack](https://www.reddit.com/r/LocalLLaMA/comments/1swf37n/opencodepowerpack_claude_code_skills_ported_to/)이라는 글이 올라왔어. 작성자가 [Claude Code](/ko/wiki/claude-code/)에서 [OpenCode](https://opencode.ai/docs/skills/)로 옮겨가면서 정리한 호환성 노트야. 결론은 단순해. 3개 디렉터리 중 `commands/`와 `agents/`는 Claude Code 전용 포맷이라 그대로는 안 옮겨지지만, `skills/` 디렉터리만은 표준 SKILL.md 포맷이라 양쪽에서 같이 돌아가. 이 호환성 한 줄이 6개 도구로 자산을 옮겨갈 길을 열어줘.

## 왜 이게 일어났나

Anthropic이 [skills](/ko/wiki/skill/) 시스템을 처음부터 마크다운 + YAML frontmatter 표준으로 깔았어. 그 덕에 같은 SKILL.md 파일이 [Claude Code](/ko/wiki/claude-code/), OpenCode, Cursor, Gemini CLI, Codex CLI, Antigravity IDE 같은 도구에서 다 인식돼. 도구별로 환경이 다르니까 변환 테이블이 따로 필요해:

- **TodoWrite** → update_plan
- **Task 서브에이전트** → OpenCode의 @mention 시스템
- **Skill 도구** → use_skill 커스텀 도구
- **Read·Write·Edit·Bash** → 네이티브 도구로 그대로

[GitHub](https://github.com/dkmnx/superpowers-opencode)에는 superpowers-opencode라는 별개 프로젝트도 같은 작업을 진행 중이야. 한 사람만 시도하는 흐름이 아니라는 거지.

## 어떤 의미인가

[Claude Code](/ko/wiki/claude-code/) 락인을 걱정하던 사람한테는 작은 안전망이 생긴 거야. 본인이 그동안 만들어둔 skills 자산은 도구를 갈아타도 그대로 들고 갈 수 있어. 반대로 commands와 agents까지 깊이 깐 워크플로는 여전히 Claude Code 안에 묶여있어.

## 주의할 점

이게 "전부 옮겨진다"는 얘기가 아니야. 휴대 가능한 건 어디까지나 단일 SKILL.md 단위 작업이고, 멀티 에이전트 오케스트레이션 같은 복잡한 자산은 여전히 변환 비용이 들어. 본인 워크플로 중 어디가 skills 단위로 묶여있고 어디가 commands/agents에 박혀있는지 한 번 그려보면, 락인 정도가 더 정확히 보여.
