---
title: "Qwen 3.6 27B, 로컬에서 Claude Code 대신 써도 괜찮더라"
date: "2026-04-24T08:30:00+09:00"
lang: ko
category: news
summary: "r/LocalLLaMA에서 듀얼 RTX 3090에 Qwen 3.6-27B를 Q8로 올려서 Claude Code와 동일하게 vibe-coding을 돌린 사례가 반향을 일으켰어. llama.cpp 서버를 Anthropic API 엔드포인트로 가장해 바로 붙였고, 200k 컨텍스트까지 열었다고 해."
readerValue: "API 비용을 줄이거나 코드를 외부로 안 보내려는 개발자가 로컬 전환 가능성을 가늠할 수 있어."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1st3m8y/qwen_36_is_actually_useful_for_vibecoding_and_way/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 100
sourceCount: 20
factCheck:
  status: passed
  date: "2026-04-24"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1st3m8y/qwen_36_is_actually_useful_for_vibecoding_and_way/"
      title: "r/LocalLLaMA — Qwen 3.6 vibe-coding post"
  checks:
    - type: source_match
      result: pass
      summary: "스크랩된 reddit_LocalLLaMA.json에서 postId=1st3m8y, 본문, 333 upvote, 97 댓글, 듀얼 3090/200k 컨텍스트/Q8 설정을 전부 확인했어."
      items:
        - "postId '1st3m8y', author 'sdfgeoff' — scrape JSON 일치"
        - "likeCount 333, replyCount 97 — scrape JSON 일치"
        - "'Qwen3.6-35B-A3B Q4' → '27B Q8', 'dual 3090 rig with 200k context' — 본문 원문 확인"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "r/LocalLLaMA 관련 스레드와 '27B is a beast' 후속 포스트가 스크랩에서 함께 잡혀 교차 확인됐어."
      items:
        - "r/LocalLLaMA 1st3m8y — 본 포스트 333 upvotes"
        - "r/LocalLLaMA 1steip4 'Qwen 3.6 27B is a beast' 관련 스레드 존재"
        - "sourceCount 20 (scrape-targets allPlatforms blog/threads/youtube 포함)"
    - type: number_verify
      result: pass
      summary: "200k 컨텍스트, Q8 양자화, 듀얼 3090 수치 모두 본문 일치."
      items:
        - "'ctx-size 200000' — llama.cpp 명령어 원문 확인"
        - "'Q8_0' unsloth GGUF — 본문 일치"
        - "'dual 3090 rig' — 본문 일치"
    - type: adversarial
      result: pass
      summary: "개인 체감 사례라 워크로드 규모에 따라 결과가 크게 달라질 수 있어."
      items:
        - "단일 사용자 1명의 체감 — 벤치마크 아님"
        - "'Claude보다 싸다'는 전기세/하드웨어 감가상각 계산이 빠져 있음"
        - "Qwen 3.6-35B-A3B MoE는 최초 배포 기준 — 스펙/이름 추후 변동 가능"
      findings:
        - "개인 체감 사례 — 대규모 팀 워크로드로 바로 일반화 어려움"
        - "총 소유 비용 비교는 미포함 — GPU/전력비 고려 필요"
tags: ["qwen", "local-llm", "vibe-coding", "claude-code", "reddit"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.2.0"
  news: "3.1.1"
---

r/LocalLLaMA에 올라온 [한 포스트](https://www.reddit.com/r/LocalLLaMA/comments/1st3m8y/qwen_36_is_actually_useful_for_vibecoding_and_way/)가 커뮤니티에서 크게 반응을 받았어. 듀얼 RTX 3090 리그에 [Qwen 3.6](/ko/wiki/qwen/) 27B를 Q8로 올리고, [Claude Code](/ko/wiki/claude-code/)를 그쪽으로 붙여서 [vibe-coding](/ko/wiki/vibe-coding/)을 돌린 후기야. 결론은 "그냥 잘 된다" — 로컬 모델이 API 모델과 같은 툴체인에서 실제로 쓸만한 수준이 됐다는 거야.

## 어떻게 붙였나

글쓴이는 llama.cpp의 `llama-server`로 Qwen3.6-27B-GGUF Q8을 띄우고, 컨텍스트를 `ctx-size 200000`으로 열었어. 그다음 Claude Code의 환경변수 `ANTHROPIC_BASE_URL`을 자기 로컬 서버로 돌렸지. Claude Code는 Anthropic API 포맷이기만 하면 뒷단이 뭐든 상관없이 동작하니까, llama.cpp의 OpenAI 호환 엔드포인트를 바로 쓸 수 있어.

셋업은 단순해. Unsloth의 GGUF 빌드를 받아서 Q8_0로 로드하고 temp 0.6, top-p 0.95 기본값 그대로 썼어. 어제는 Qwen 3.6-35B-A3B(MoE Q4)를 돌리다가, 오늘 아침에 27B(Q8)로 바꿨는데 둘 다 문제없이 돌아갔다고 해.

## 비용 얘기가 현실적이 되는 지점

Qwen 3.6이 나오기 전엔 로컬 모델로 [Claude Code](/ko/wiki/claude-code/)를 돌리려고 해도 코드 품질에서 체감이 확 떨어졌어. 이번 기종은 그 격차가 많이 좁혀졌다는 게 요지야. 댓글에서 "작은 모델의 이런 개선이 큰 API 업체들이 가격을 올리는 시점에 나왔다"는 반응이 공감을 받는 이유야.

다만 "Claude보다 싸다"는 말은 주의해서 읽어야 해. 듀얼 3090 리그 가격, 전기료, 관리 비용까지 넣으면 소규모 팀에겐 Claude API가 여전히 싸거든. 반대로 코드가 외부로 나가면 안 되는 보안 요건이 있는 조직이면, 품질이 쓸만해진 지금이 로컬 전환 검토 시점이야.

## 무엇을 해야 하나

Claude Code나 Cursor를 매일 쓰는 개발자라면, 주말에 한 번 Qwen 3.6-27B Q8을 로컬에 띄워보는 게 의미 있어. 지금 워크로드의 몇 %를 로컬로 옮길 수 있는지 감이 잡혀야 내년 예산을 짤 때 로컬 투자 규모를 결정할 수 있어. 24GB VRAM GPU 한 장만 있어도 Q4로는 돌아가니까 진입 장벽이 예전만큼 높지 않고, 27B Q8도 48GB VRAM이면 충분해.
