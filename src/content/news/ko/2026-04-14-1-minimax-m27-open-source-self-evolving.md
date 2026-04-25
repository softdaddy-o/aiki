---
title: "MiniMax M2.7 오픈소스 공개, 230B MoE로 자기 진화하는 에이전트 모델"
date: "2026-04-14T09:00:00+09:00"
lang: ko
category: news
summary: "MiniMax가 230B 파라미터(활성 10B) MoE 모델 M2.7을 오픈소스로 공개했다. SWE-Pro 56.22%, Terminal Bench 2 57.0%를 기록하며, 자체 학습 과정에 직접 참여하는 자기 진화(self-evolving) 구조가 특징이다."
readerValue: "로컬 에이전트 모델로 M2.7을 쓸지, 기존 Qwen/Gemma를 유지할지 판단하게 해준다"
sourceUrl: "https://huggingface.co/MiniMaxAI/MiniMax-M2.7"
sourceTitle: "HuggingFace MiniMaxAI"
draft: false
score: 100
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-14"
  sources:
    - url: "https://huggingface.co/MiniMaxAI/MiniMax-M2.7"
      title: "HuggingFace MiniMax-M2.7"
    - url: "https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/"
      title: "MarkTechPost M2.7 Coverage"
    - url: "https://www.minimax.io/news/minimax-m27-en"
      title: "MiniMax Official Announcement"
  checks:
    - type: source_match
      result: pass
      summary: "HuggingFace 모델카드랑 공식 발표 수치를 기사 내용이랑 하나씩 비교해뒀어."
      items:
        - "230B 파라미터, 10B 활성 — HuggingFace 모델카드 확인"
        - "256 experts, 8 experts activated — HuggingFace 확인"
        - "200K 컨텍스트 — 공식 스펙 확인"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "HuggingFace, MarkTechPost, MiniMax 공식 3곳에서 같은 수치가 나오는지 확인해뒀어."
      items:
        - "SWE-Pro 56.22% — MarkTechPost + MiniMax 공식 일치"
        - "Terminal Bench 2 57.0% — MarkTechPost + MiniMax 공식 일치"
        - "오픈소스 공개 — HuggingFace에 가중치 공개 확인"
    - type: number_verify
      result: pass
      summary: "기사에 나온 숫자 5개를 전부 공식 소스에서 맞는지 검증해뒀어."
      items:
        - "230B/10B 파라미터 — HuggingFace 모델카드"
        - "SWE-Pro 56.22% — MarkTechPost 보도"
        - "Terminal Bench 2 57.0% — MarkTechPost 보도"
        - "입력 $0.30/1M, 출력 $1.20/1M — Artificial Analysis 가격 비교"
        - "200K 컨텍스트 — 공식 스펙"
    - type: adversarial
      result: pass
      summary: "자사 벤치마크에만 의존하는 거 아닌지, 로컬 실행이 현실적인지 검증해뒀어."
      items:
        - "SWE-Pro, Terminal Bench 2는 비교적 새로운 벤치마크 — 독립 검증 제한적이라는 점 본문에 반영 ✅"
        - "230B 모델 로컬 실행 — 고사양 GPU 필요하다는 점 본문에 명시 ✅"
        - "자기 진화(self-evolving) 주장 — MiniMax 공식 발표 기반, 독립 검증은 아직 없음을 감안 ✅"
      findings:
        - "SWE-Pro, Terminal Bench 2는 비교적 새로운 벤치마크로 독립 검증이 제한적"
        - "230B 모델의 로컬 실행은 고사양 하드웨어 필요 — 본문에서 언급"
tags: ["minimax", "open-source", "mixture-of-experts", "agentic-coding", "local-llm"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
reviewStamp:
  panelVersion: 1.0.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    news: "3.1.2"
  panelVerdict: pass
  contentHash: "5a48beecade3fb33"
  reviewedAt: "2026-04-25T09:55:59Z"
---
## 무슨 일이 있었나

중국 AI 스타트업 [MiniMax](https://www.minimax.io/news/minimax-m27-en)가 M2.7 모델을 오픈소스로 풀었어. 230B 파라미터에 토큰당 10B만 활성화하는 [MoE](/ko/wiki/moe/) 구조이고, [HuggingFace](https://huggingface.co/MiniMaxAI/MiniMax-M2.7)에서 가중치를 바로 받을 수 있어. 256개 전문가 중 8개만 동시에 돌리는 구조라 [추론](/ko/wiki/inference/) 비용이 낮은 게 포인트야.

코딩 에이전트 벤치마크에서 눈에 띄는 숫자가 나왔어. [SWE-Pro](https://www.marktechpost.com/2026/04/12/minimax-just-open-sourced-minimax-m2-7-a-self-evolving-agent-model-that-scores-56-22-on-swe-pro-and-57-0-on-terminal-bench-2/)에서 56.22%, Terminal Bench 2에서 57.0%를 기록했거든. VIBE-Pro(프로젝트 전체 전달 능력)도 55.6%야. API 가격은 입력 $0.30, 출력 $1.20(100만 [토큰](/ko/wiki/token/) 기준)으로 [Claude](/ko/wiki/claude/)나 GPT 대비 상당히 저렴해.

## 왜 중요할까

이 모델의 차별점은 "자기 진화(self-evolving)" 구조야. M2.7은 자기 [메모리](/ko/wiki/memory/) 업데이트, [학습](/ko/wiki/training/) 스킬 구축, [학습](/ko/wiki/training/) 과정 개선에 직접 참여해. 쉽게 말하면 모델이 자기 훈련 파이프라인의 일부를 스스로 조율한다는 거야. 200K 컨텍스트 윈도우에 체인 오브 소트 추론도 지원해.

## 앞으로 볼 점

[로컬 LLM](/ko/wiki/local-llm/) 커뮤니티에서는 이미 [GGUF](/ko/wiki/gguf/) [양자화](/ko/wiki/quantization/) 버전으로 게임 개발 벤치마크까지 돌려보고 있어. 다만 230B 모델이니 [로컬](/ko/wiki/local-llm/) 실행에는 고사양 GPU가 필요하고, SWE-Pro나 Terminal Bench 2 같은 벤치마크는 아직 독립 검증이 충분하지 않다는 점은 감안해야 해. [Qwen 3.5](/ko/wiki/qwen-3.5/)나 [Gemma 4](/ko/wiki/gemma-4/)와 비교하는 테스트가 계속 나오고 있으니, [로컬](/ko/wiki/local-llm/) 에이전트 모델을 찾고 있다면 지켜볼 만해.
