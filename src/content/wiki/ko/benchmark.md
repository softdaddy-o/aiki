---
term: benchmark
title: "Benchmark (벤치마크)"
lang: ko
summary: "Benchmark는 모델이나 시스템을 같은 문제와 같은 규칙으로 시험해 성능을 비교하는 기준이다. 점수 하나만 보는 말이 아니라, 무엇을 어떤 조건에서 재서 비교했는지까지 포함하는 개념이야."
readerValue: "기사나 발표에서 벤치마크 점수가 나왔을 때 그 숫자를 그대로 믿지 않고, 무엇을 재었는지와 실제 쓰임새에 얼마나 가까운지 따져볼 기준을 잡을 수 있어."
category: concept
formatVersion: 2
aliases:
  - "벤치마크"
  - "evaluation benchmark"
relatedTerms:
  - synthetic-data
firstMentioned: "2026-02-20"
mentionCount: 12
draft: false
tags:
  - concept
  - evaluation
  - measurement
factCheck:
  status: passed
  date: "2026-04-25"
  sources:
    - url: "https://en.wikipedia.org/wiki/Benchmark_(computing)"
      title: "Benchmark (computing)"
    - url: "https://huggingface.co/docs/evaluate/index"
      title: "Evaluate on the Hub · Hugging Face"
    - url: "https://arxiv.org/abs/2009.03300"
      title: "Measuring Massive Multitask Language Understanding"
    - url: "https://github.com/openai/human-eval"
      title: "HumanEval: Hand-Written Evaluation Set"
    - url: "https://arxiv.org/abs/2107.03374"
      title: "Evaluating Large Language Models Trained on Code"
    - url: "https://www.swebench.com/verified.html"
      title: "SWE-bench Verified"
    - url: "https://arxiv.org/abs/2406.01574"
      title: "MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark"
    - url: "https://arxiv.org/abs/2005.14165"
      title: "Language Models are Few-Shot Learners"
    - url: "https://github.com/EleutherAI/lm-evaluation-harness"
      title: "Language Model Evaluation Harness"
  checks:
    - type: source_match
      result: pass
      summary: "benchmark의 기본 정의와 본문에 든 예시 benchmark 설명을 원문 출처와 직접 대조했다."
      items:
        - "독자 문제 대조: 이 페이지는 benchmark 점수를 그대로 믿지 말고 무엇을 어떤 조건에서 재었는지 읽게 만드는 것이 핵심이다. Wikipedia의 benchmark 설명과 Hugging Face Evaluate 문서를 대조한 결과, 본문의 '같은 문제 세트, 채점 방식, 실행 조건을 먼저 고정한다'는 설명은 그 독해 축과 일치한다."
        - "MMLU 원문은 57개 과제를 가로지르는 multitask accuracy test이며 폭넓은 지식과 problem solving ability를 요구한다고 설명한다. 본문의 `MMLU` 예시는 넓은 지식과 추론 문제 묶음을 비교하는 benchmark라는 수준으로만 요약돼 과장되지 않았다."
        - "HumanEval 저장소와 Codex 논문은 HumanEval을 코드 생성의 functional correctness 평가셋으로 설명하고, 결과 예시를 `pass@1`, `pass@10`, `pass@100` 형식으로 제시한다. 본문의 `HumanEval`과 `pass@1` 설명은 이 평가 구조와 맞는다."
        - "SWE-bench Verified 공식 페이지는 이를 human-validated subset of 500 instances from SWE-bench로 설명한다. 본문의 `SWE-bench Verified` 설명은 실제 소프트웨어 이슈 해결 평가라는 범위를 벗어나지 않는다."
        - "MMLU-Pro 원문은 MMLU보다 reasoning-focused questions를 늘리고 선택지를 4개에서 10개로 확장한 benchmark라고 적는다. 본문의 'MMLU와 MMLU-Pro처럼 구성 자체가 다를 수 있다'는 문장은 원문과 부합한다."
    - type: web_cross_check
      result: pass
      sources: 9
      summary: "서로 다른 benchmark 원문과 평가 도구 문서를 교차 대조해 본문의 해석 축이 맞는지 확인했다."
      items:
        - "비교 기준: MMLU는 폭넓은 지식과 문제 해결, HumanEval은 unit test 기반 코드 정답성, SWE-bench Verified는 실제 GitHub 이슈 해결 가능성을 본다. 본문이 세 예시를 같은 성능 축으로 뭉개지 않고 나눠 설명한 이유가 각 benchmark의 원문 범위와 맞는다."
        - "MMLU-Pro는 original MMLU의 noisy하거나 쉬운 문항을 덜어내고 reasoning-focused questions를 늘린 변형 benchmark다. 따라서 같은 benchmark 계열이라도 구성 차이가 결과 해석을 바꾼다는 본문 경고는 출처상 타당하다."
        - "Language Models are Few-Shot Learners는 few-shot demonstrations를 prompt에 넣는 평가 설정을 설명하고, LM Evaluation Harness는 `--num_fewshot 5` 예시를 제공한다. 본문이 0-shot과 5-shot을 점수 이름이 아니라 실행 조건 예시로 다루는 방식은 이 문서들과 충돌하지 않는다."
    - type: number_verify
      result: pass
      summary: "본문에 남긴 benchmark 이름, 지표 이름, 설정 표기가 실제 출처에 있는 표현인지 항목별로 점검했다."
      items:
        - "`MMLU`, `HumanEval`, `SWE-bench Verified`, `MMLU-Pro`는 각각 논문 제목 또는 공식 페이지 명칭과 일치한다."
        - "HumanEval 저장소는 결과 예시를 `{'pass@1': ..., 'pass@10': ..., 'pass@100': ...}` 형식으로 제시한다. 본문의 `pass@1` 표기는 실제 평가 출력 형식과 맞는다."
        - "MMLU 논문은 57 tasks를, SWE-bench Verified 공식 페이지는 500 instances를 명시한다. 본문은 이 수치를 새로 주장하지 않고 benchmark 성격 설명에 필요한 이름과 설정만 남겼다."
        - "LM Evaluation Harness README의 `--num_fewshot 5` 예시와 GPT-3 few-shot 문맥을 대조해, 본문의 0-shot·5-shot 표기가 실행 조건 예시라는 점을 확인했다."
    - type: adversarial
      result: pass
      summary: "benchmark 점수를 절대 성능처럼 읽게 만드는 표현이 남아 있는지 출처 기준으로 다시 검토했다."
      items:
        - "MMLU와 HumanEval은 서로 다른 능력을 재는 benchmark다. 본문이 둘을 같은 '성능 향상'으로 묶지 않고 해석 단위를 갈라 둔 점은 각 원문 설명과 맞는다."
        - "SWE-bench Verified 공식 페이지가 human-validated subset과 actual GitHub issues 문맥을 강조하는 점을 감안하면, 본문이 이를 '실제 이슈 해결 여부를 보는 benchmark'로 제한해 적은 수준은 과장되지 않는다."
        - "MMLU-Pro와 few-shot setting 예시를 함께 둔 주의 문단은 데이터 누수와 실행 조건 차이가 점수 해석을 바꾼다는 점을 드러낸다. 이는 benchmark 점수를 절대 성능으로 읽는 오해를 줄이는 방향이다."
      findings:
        - "이 문서는 benchmark를 점수표가 아니라 비교 규칙과 해석 조건까지 포함한 틀로 정의하고 있다."
        - "예시 benchmark들은 이름 나열이 아니라 서로 다른 평가 축을 보여 주는 용도로만 사용되고 있다."
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  wiki: "3.1.2"
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
    wiki: "3.1.2"
  panelVerdict: pass
  contentHash: "976ecad11f179012"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Benchmark는 모델이나 시스템을 같은 테스트로 재서 서로 비교할 수 있게 만드는 기준이야. 쉽게 말해 누가 더 낫다고 말하기 전에, 무엇을 어떤 방식으로 시험했는지를 고정해 두는 틀이야.
## 어떻게 작동하나
보통은 정해진 문제 세트, 채점 방식, 실행 조건을 먼저 고정하고 여러 모델이나 시스템을 그 위에 올려 비교해. 이렇게 해야 점수 차이가 시험 방식 때문인지, 실제 성능 차이 때문인지 구분할 수 있어.
예를 들어 어떤 언어 모델을 평가할 때는 같은 질문 묶음을 풀게 하고 정확도나 성공률을 계산해. 대표 예시는 보통 이렇게 나눠서 읽으면 쉬워.

- `MMLU`: 넓은 지식과 [추론](/ko/wiki/inference/) 문제 묶음을 같은 규칙으로 비교하는 benchmark야.
- `HumanEval`의 `pass@1`: 한 번 생성한 코드가 바로 통과하는 비율을 보는 코딩 benchmark 지표야.
- `SWE-bench Verified`: 실제 이슈 해결 여부를 보는 소프트웨어 수정 benchmark야.

핵심은 이런 예시가 서로 다른 작업을 재더라도, 각 benchmark 안에서는 같은 기준으로 반복해서 비교한다는 점이야.
## 왜 중요한가
실무에서는 새 모델이나 도구를 고를 때 벤치마크가 첫 번째 걸러내기 역할을 해. 모든 후보를 직접 길게 써 보기 어렵기 때문에, 먼저 공통 시험 결과를 보고 대략적인 범위를 좁히는 거야.
기사 해석에서도 중요해. 예를 들어 기사에 "모델 A가 MMLU에서 앞섰다"고 쓰였으면 넓은 지식·추론 질문 benchmark에서 강하다는 뜻에 가깝고, "HumanEval `pass@1`이 올랐다"고 쓰였으면 코드를 한 번에 맞히는 비율이 좋아졌다는 뜻에 가깝다. 둘은 같은 "성능 향상"처럼 보이지만 실제로는 다른 능력을 재는 장면이야. 그래서 점수만 볼 게 아니라 어떤 작업을 재었는지, 최신 데이터인지, 실제 사용 환경과 얼마나 닮았는지를 같이 봐야 해.
## 주의해서 볼 점
벤치마크는 비교를 쉽게 해 주지만 현실 전체를 대신하지는 못해. 테스트 문제가 너무 좁거나 특정 유형에 치우치면 점수는 좋아도 실제 사용에서는 약점이 바로 드러날 수 있어.
데이터 누수도 조심해야 해. 모델이 [Eval(평가)](/ko/wiki/eval/) 문제를 미리 봤거나 비슷한 데이터를 학습했다면 점수는 높아져도 진짜 실력이라고 보기 어렵다. 또 같은 benchmark라도 MMLU와 MMLU-Pro처럼 구성 자체가 다를 수 있고, 같은 묶음이라도 0-shot인지 5-shot인지처럼 실행 조건이 달라지면 결과를 그대로 나란히 놓고 보면 안 돼.
[Synthetic Data](/ko/wiki/synthetic-data/)와 benchmark를 같은 말처럼 읽으면 해석이 더 꼬여. synthetic data는 학습용이나 평가용 데이터를 만들어 넣는 쪽에 가깝고, benchmark는 그렇게 준비된 문제를 어떤 규칙으로 시험하고 어떤 점수로 읽을지 정하는 기준에 가깝다.
