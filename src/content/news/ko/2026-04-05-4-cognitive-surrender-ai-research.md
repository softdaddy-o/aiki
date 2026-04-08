---
title: "\"인지 항복\" — AI가 틀려도 80%가 그대로 따른다는 연구 결과"
date: "2026-04-05T12:00:00+09:00"
lang: ko
category: news
summary: "와튼스쿨 연구팀이 1,372명 대상 실험에서 AI가 오답을 줘도 79.8%가 그대로 수용한다는 결과를 발표했어. 연구팀은 이걸 '인지 항복(cognitive surrender)'이라고 불러."
readerValue: "이 변화가 제품 우선순위와 배포 판단을 어떻게 바꾸는지 빠르게 판단하게 해준다."
sourceUrl: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646"
sourceTitle: "SSRN — Wharton School"
draft: false
score: 50
factCheck:
  status: passed
  date: "2026-04-05"
  sources:
    - url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646"
      title: "SSRN — Thinking Fast, Slow, and Artificial"
    - url: "https://knowledge.wharton.upenn.edu/podcast/ripple-effect/how-ai-is-reshaping-human-intuition-and-reasoning-gideon-nave-and-steven-shaw/"
      title: "Wharton Knowledge — Podcast"
    - url: "https://futurism.com/artificial-intelligence/study-do-what-chatgpt-tells-us"
      title: "Futurism — Study coverage"
  checks:
    - type: source_match
      result: pass
    - type: web_cross_check
      result: pass
      sources: 3
    - type: number_verify
      result: pass
    - type: adversarial
      result: pass
      findings:
        - "실험 환경(MTurk/Prolific)과 실제 업무 환경의 차이 — 전문가 집단에서도 동일할지 미확인"
        - "79.8% 수용률이 AI 없는 기존 권위(상사, 교과서) 수용률과 비교되지 않음"
tags: ["research", "cognitive-surrender", "wharton", "ai-safety"]
---

AI가 정답을 주면 따르는 건 합리적이야. 근데 AI가 오답을 줘도 거의 같은 비율로 따른다면? 와튼스쿨의 Steven Shaw랑 Gideon Nave 연구팀이 1,372명 대상 3건의 사전등록 실험(총 9,593 시행)에서 이걸 확인했어.

실험 참가자의 절반 이상이 AI 조언을 요청했고, AI가 정답을 줬을 때 수용률은 92.7%였어. 문제는 AI가 **틀린 답**을 줬을 때도 수용률이 79.8%나 됐다는 거야. 연구팀은 사람들이 AI 앞에서 직관(시스템 1)이랑 숙고(시스템 2)를 모두 내려놓는 현상을 ["인지 항복(cognitive surrender)"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6097646)이라고 명명했어. 기존 이중 처리 이론에 AI를 "시스템 3"으로 추가하는 삼중 시스템 이론(Tri-System Theory)도 제안했고.

다만 연구팀은 인지 항복이 무조건 비합리적인 건 아니라고 짚었어. 통계적으로 우월한 시스템에 판단을 맡기는 건 확률적 의사결정이나 리스크 평가에서는 오히려 나을 수 있거든. 뭐, 결국 "언제 AI를 믿고, 언제 직접 생각할지"를 구분하는 메타인지 능력이 중요한 거야. AI 도구를 쓰면서 비판적 사고까지 같이 넘겨주고 있는 건 아닌지, 한 번쯤 점검해볼 타이밍이야.
