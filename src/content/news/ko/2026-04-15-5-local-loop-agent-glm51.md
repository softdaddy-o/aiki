---
title: "로컬 LLM 루프 에이전트, 2비트 양자화로도 게임을 만든다"
date: "2026-04-15T09:40:00+09:00"
lang: ko
category: news
summary: "GLM 5.1을 IQ2_XXS(2비트) 양자화로 돌린 루프 에이전트가 단일 웹페이지에서 파쿠르 게임을 생성했다. 프롬프트 2개만으로 코드 작성부터 디버깅까지 자율 반복한 결과로, 로컬 환경에서도 에이전틱 코딩이 가능하다는 걸 보여준다."
readerValue: "고급 GPU 없이도 로컬 LLM으로 에이전틱 코딩을 해볼 수 있는지 판단하게 해준다"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1slb0hz/"
sourceTitle: "r/LocalLLaMA"
draft: false
score: 85
sourceCount: 2
factCheck:
  status: passed
  date: "2026-04-15"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1slb0hz/"
      title: "Reddit r/LocalLLaMA - Loop agent post"
    - url: "https://huggingface.co/zai-org/GLM-5.1"
      title: "HuggingFace - GLM 5.1"
    - url: "https://venturebeat.com/technology/ai-joins-the-8-hour-work-day-as-glm-ships-5-1-open-source-llm-beating-opus-4"
      title: "VentureBeat - GLM 5.1 announcement"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원문의 모델명, 양자화, 태스크가 기사 내용이랑 전부 맞아"
      items:
        - "GLM 5.1 모델 사용 — Reddit 원문 확인"
        - "IQ2_XXS 양자화 — Reddit 원문에서 unsloth UD 확인"
        - "파쿠르 게임 생성 태스크 — Reddit 프롬프트에서 확인"
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "HuggingFace 모델 페이지랑 VentureBeat에서 GLM 5.1 스펙을 확인했어"
      items:
        - "GLM 5.1: 754B MoE 모델 — HuggingFace, VentureBeat 확인"
        - "SWE-Bench Pro 58.4 — VentureBeat 보도 확인"
        - "8시간 자율 실행 — VentureBeat 보도 확인"
    - type: number_verify
      result: pass
      summary: "754B 파라미터랑 SWE-Bench Pro 58.4를 공식 소스에서 대조했어"
      items:
        - "754B MoE — HuggingFace 모델 카드 확인"
        - "SWE-Bench Pro 58.4 — VentureBeat 보도 확인"
        - "IQ2_XXS = 약 2비트 양자화 — llama.cpp 양자화 명명 규칙에 따름"
    - type: adversarial
      result: pass
      summary: "Reddit 개인 실험이라 체계적 벤치마크가 아닌 주관적 시연이야"
      items:
        - "2비트 양자화에서 실제 출력 품질이 괜찮은지 확인"
        - "루프 에이전트 성공이 태스크 난이도에 의존하는지 확인"
        - "스크린샷 외에 재현 가능한 코드가 있는지 확인"
      findings:
        - "2비트 양자화에서의 실제 출력 품질은 스크린샷만으로 검증 불가"
        - "루프 에이전트 성공은 태스크 난이도에 크게 의존 — 파쿠르 게임은 비교적 단순한 태스크"
tags: ["local-llm", "agentic-coding", "glm-5", "vibe-coding"]
guideVersion:
  common: "1.0.0"
  news: "1.0.0"
---

로컬 LLM으로 에이전틱 코딩이 어디까지 되는지 궁금했다면, 이 실험이 꽤 참고가 돼. [GLM 5.1](https://huggingface.co/zai-org/GLM-5.1)을 IQ2_XXS — 그러니까 2비트 극한 양자화로 돌린 루프 에이전트가 파쿠르 게임을 만들어냈거든.

구조가 단순한데 결과물이 꽤 나와. 첫 프롬프트로 "웹페이지 하나에 파쿠르 게임을 만들어라"를 주고, 두 번째 프롬프트로 결과를 검토하고 개선하라고 루프를 걸었어. 모델이 코드 작성 → 에러 확인 → 수정을 자율적으로 반복한 거야. GLM 5.1이 원래 [754B MoE에 8시간 자율 실행](https://venturebeat.com/technology/ai-joins-the-8-hour-work-day-as-glm-ships-5-1-open-source-llm-beating-opus-4)이 가능한 모델이긴 한데, 2비트 양자화에서도 이런 루프가 돌아간다는 게 포인트야.

물론 2비트니까 품질 한계는 분명해. 풀 정밀도 754B 모델이 SWE-Bench Pro 58.4를 찍는 것과는 차원이 다르거든. 그래도 클라우드 API 비용 없이 자기 머신에서 프로토타입을 돌려보고 싶은 개발자라면, 루프 에이전트 패턴 자체를 배워두면 좋아.
