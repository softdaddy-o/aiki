---
term: hallucination
title: "Hallucination (환각)"
lang: ko
summary: "Hallucination은 AI가 근거 없거나 틀린 내용을 사실처럼 만들어 내는 현상을 말해. 핵심은 단순한 오답이 아니라, 틀린데도 그럴듯하게 말한다는 데 있어."
readerValue: "이 개념을 알고 있으면 모델이 더 똑똑해졌다는 말과, 오류 위험이 줄었다는 말을 구분해서 볼 수 있어. Hallucination 대응은 보통 성능 과시보다 안전 장치와 검증 비용의 문제에 더 가깝다."
category: concept
guideVersion:
  common: "1.0.0"
  wiki: "2.0.0"
aliases:
  - "ai hallucination"
  - "AI hallucination"
  - "인공지능 환각"
relatedTerms:
  - alignment
  - guardrail
  - grounding
  - red-teaming
mentionCount: 0
draft: false
tags:
  - concept
  - reliability
  - safety
factCheck:
  status: passed
  date: "2026-04-13"
  sources:
    - url: "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)"
      title: "Hallucination (artificial intelligence)"
    - url: "https://www.ibm.com/think/topics/ai-hallucinations"
      title: "What Are AI Hallucinations? | IBM"
  checks:
    - type: source_match
      result: pass
      summary: "제공된 두 출처의 핵심 정의와 현재 문서 초안을 서로 맞춰봤어."
      items:
        - "독자 문제 대조: 이 문서가 hallucination을 성능 향상 개념이 아니라 오류와 위험을 줄이는 안전 맥락으로 설명하는지 확인했어."
        - "인간의 심리학적 환각과 AI의 오류 생성이 같은 현상이 아니라는 점을 본문에서 섞어 쓰지 않았는지 점검했어."
        - "현재 초안에 있던 '그럴듯하지만 근거 없는 답'이라는 축을 유지하면서도 표현 반복은 줄였어."
    - type: web_cross_check
      result: pass
      sources: 2
      summary: "위키와 IBM 요약이 공통으로 말하는 정의 축을 한 번 더 봤어."
      items:
        - "비교 기준: '사실과 다르거나 근거 없는 내용을 사실처럼 제시하는가'를 공통 정의로 잡고 문서를 정리했어."
        - "Wikipedia 요약의 confabulation 성격과 IBM 요약의 부정확하거나 말이 안 되는 출력 설명이 서로 충돌하지 않는지 확인했어."
        - "외부 요약 어디에도 hallucination을 곧바로 성능 개선 용어로 보지 않아서, 실무 위험과 검증 부담 쪽 해석을 유지했어."
    - type: number_verify
      result: pass
      summary: "수치로 단정할 만한 내용이 거의 없어서 숫자 서술은 다시 봤어."
      items:
        - "제시된 출처에 구체적 비율, 벤치마크 수치, 발생률 같은 숫자가 없어서 본문에도 임의 수치를 넣지 않았어."
        - "'완전히 없앨 수 있다' 같은 정량적 암시는 피하고, 위험을 낮출 수 있다는 수준으로 표현을 제한했어."
        - "고위험 분야 예시는 범주 설명으로만 두고 효과 크기나 감소 폭은 주장하지 않았어."
    - type: adversarial
      result: pass
      summary: "초심자가 헷갈리기 쉬운 오해 포인트를 따로 한 번 더 봤어."
      items:
        - "Hallucination을 'AI가 거짓말한다'로 오해하지 않도록 의도 문제와 생성 메커니즘을 분리했어."
        - "'모델이 더 똑똑하다'와 '운영상 더 안전하다'를 같은 말로 읽지 않게 실무와 기사 해석 문단을 넣었어."
        - "검색이나 가드레일을 붙이면 문제가 끝난다고 받아들이지 않도록 완전 제거가 아니라 위험 완화라는 점을 분명히 했어."
      findings:
        - "'정확도 상승 기사면 hallucination도 자동으로 해결됐다'는 오해 가능성을 점검했지만 본문에서 분리해서 막았어."
        - "'환각은 최신 모델에서는 거의 사라졌다'는 과신을 부를 표현이 없는지 확인했고, 완전 제거 표현은 쓰지 않았어."
---
## 한 줄 정의
Hallucination은 AI가 실제 근거가 없거나 사실과 다른 내용을 마치 맞는 말처럼 내놓는 현상이야. 사람이 질문을 들으면 모르면 멈추거나 확인할 수 있지만, 생성형 모델은 종종 가장 그럴듯한 문장을 이어 쓰려 해서 없는 출처, 잘못된 숫자, 존재하지 않는 기능 설명까지 만들어 낼 수 있어.
여기서 중요한 점은 "틀렸다"보다 "틀린데도 자연스럽다"는 데 있어. 그래서 초심자는 답이 매끈하면 맞는 줄 알기 쉽고, 실무에서는 이 점이 단순 성능 문제보다 더 위험하게 작동해.
## 어떻게 작동하나
언어 모델은 기본적으로 주어진 문맥 다음에 어떤 말이 올 확률이 높은지 계산해서 답을 만든다. 즉, 사실 데이터베이스를 직접 꺼내는 기계라기보다 문장을 생성하는 기계에 가깝기 때문에, 확인되지 않은 정보가 들어와도 멈추기보다 이어서 써 버릴 수 있어.
이때 [학습](/ko/wiki/training/) 데이터의 빈틈, 질문의 모호함, 오래된 지식, 잘못된 검색 결과, 도구 연결 실패 같은 요소가 겹치면 환각이 더 잘 생겨. 그래서 실제 시스템에서는 검색으로 근거를 붙이거나, 답변 전후에 검증 단계를 두거나, 아예 모르면 모른다고 말하게 만드는 제한을 같이 걸어 둬.
## 왜 중요한가
실무에서는 환각이 품질 저하로 끝나지 않고 비용과 책임 문제로 이어져. 고객 응대 봇이 없는 환불 규정을 말하거나, 코드 도구가 존재하지 않는 API를 추천하거나, 요약 도구가 원문에 없는 결론을 덧붙이면 나중에 사람이 다시 검토하고 수습하는 비용이 커져.
기사나 제품 발표를 볼 때도 이 개념이 중요해. "성능이 좋아졌다"는 말은 더 긴 답변을 잘 쓰거나 시험 점수가 올랐다는 뜻일 수 있지만, 환각이 줄었다는 말은 운영 리스크와 검증 부담이 줄었다는 뜻에 더 가깝다. 그래서 안전한 도입을 따질 때는 정답률만 볼 게 아니라, 틀릴 때 얼마나 그럴듯하게 틀리는지도 같이 봐야 해.
## 주의해서 볼 점
환각은 모델이 일부러 거짓말을 한다는 뜻이 아니야. 많은 경우 모델은 자기 답이 틀렸다는 감각 없이 확률적으로 그럴듯한 문장을 만든 결과를 내놓는 거라서, 의도 문제로 보면 원인을 잘못 짚게 돼.
또 환각을 완전히 없애겠다는 말도 조심해서 봐야 해. 검색 연결, 출처 표시, [가드레일](/ko/wiki/guardrail/), 사람이 최종 승인하는 절차로 위험을 크게 낮출 수는 있지만, 생성 시스템인 이상 불확실성 자체가 사라지지는 않아. 특히 숫자, 고유명사, 최신 사건, 법률·의료 같은 고위험 정보는 답변의 말투보다 근거 유무를 먼저 확인하는 편이 안전해.
## 관련 용어
- [Alignment](/ko/wiki/alignment/) — Alignment는 모델이 사람의 의도와 규범에 맞게 행동하도록 조정하는 문제야. Hallucination은 그보다 더 좁게, 사실성과 근거가 무너지는 오류를 가리켜서 둘은 겹치기도 하지만 같은 말은 아니야.
- [Guardrail](/ko/wiki/guardrail/) — Guardrail은 위험한 출력이나 금지된 행동을 막는 운영 장치야. Hallucination이 문제 현상이라면 guardrail은 그 현상이 사용자에게 그대로 전달되지 않게 막는 제어 수단에 가깝다.
- [Grounding](/ko/wiki/grounding/) — Grounding은 모델의 답을 외부 문서, 데이터, 현재 맥락에 붙잡아 두는 방식이야. Hallucination이 근거 없이 떠버린 상태라면 grounding은 답이 어디에 기대고 있는지 분명하게 만드는 대응책이야.
- [Red Teaming](/ko/wiki/red-teaming/) — Red teaming은 시스템을 일부러 흔들어 보면서 취약한 지점을 찾는 시험 방식이야. Hallucination은 그 시험에서 자주 확인하는 대표 실패 유형 중 하나지만, red teaming 자체는 환각만 보는 활동은 아니야.