---
term: apache
title: Apache 2.0(아파치 2.0 라이선스)
lang: ko
summary: >-
  Apache 2.0(아파치 2.0 라이선스)은 코드나 모델 가중치를 고쳐 쓰고 배포할 수 있게 해 주는 permissive 오픈소스 라이선스예요.
  다만 public domain처럼 아무 조건이 없는 건 아니고, LICENSE 유지, 변경 고지, NOTICE 전달 같은 배포 의무가 함께 따라와요.
readerValue: >-
  이 페이지를 읽으면 모델 카드에서 Apache 2.0을 봤을 때 "상업적으로 써도 되나"뿐 아니라 "배포할 때 LICENSE, NOTICE, 변경 고지를
  어디까지 챙겨야 하나"를 바로 판단할 수 있어요.
category: concept
aliases:
  - Apache 2.0
  - Apache License 2.0
  - 'Apache License, Version 2.0'
relatedTerms:
  - weight
  - gpt-oss
  - gemma-4
  - qwen
  - local-llm
firstMentioned: '2026-03-16'
mentionCount: 11
draft: false
tags:
  - license
  - open-source
formatVersion: 2
factCheck:
  status: passed
  date: '2026-04-25'
  sources:
    - url: 'https://www.apache.org/licenses/LICENSE-2.0'
      title: 'Apache License, Version 2.0'
    - url: 'https://www.apache.org/legal/apply-license'
      title: 'Applying the Apache License, Version 2.0'
  checks:
    - type: source_match
      result: pass
      summary: 상업 사용 가능 여부보다 배포 의무가 함께 따라온다는 핵심을 원문과 적용 가이드에 맞춰 다시 확인했어요.
      items:
        - >-
          독자 문제 대조: Apache 2.0을 "써도 되나"에만 묶지 않고, 배포할 때 LICENSE, 변경 고지, NOTICE를 어떻게 챙기는지까지
          바로 답하게 설명하는 구성이 실제 독자 질문과 맞는지 먼저 확인했어요.
        - >-
          Apache License 2.0 본문에서 2항은 copyright license, 3항은 patent license, 4항은 redistribution 조건을 다룬다는
          점을 다시 확인했어요.
        - >-
          ASF 적용 가이드는 배포물에 라이선스 전문을 함께 두고, 필요할 때 NOTICE를 전달하는 실무 흐름을 설명해 주기 때문에 본문
          체크포인트와 방향이 맞아요.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 라이선스 본문과 ASF 적용 가이드를 함께 보고, 권리 범위와 실제 배포 체크리스트를 분리해서 교차 확인했어요.
      items:
        - >-
          비교 기준: 라이선스 본문은 권리 범위와 조항 기준을, ASF 적용 가이드는 LICENSE·NOTICE를 어떤 배포물 단위로 붙이는지 설명하므로,
          둘을 나눠 봐야 "내부 사용", "외부 재배포", "모델 카드 해석"의 판단이 어떻게 달라지는지 드러나요.
        - >-
          Apache 2.0을 permissive 라이선스로만 요약하면 재배포 문서 의무가 흐려질 수 있어서, LICENSE와 NOTICE 처리까지 함께 보는
          설명으로 정리했어요.
        - >-
          적용 가이드는 소스코드뿐 아니라 바이너리와 배포 패키지에도 라이선스 문서를 어떻게 붙여야 하는지 실무 해석을 보태 줘요.
        - >-
          모델 카드에서 Apache 2.0을 읽을 때도 "상업 사용 가능" 문구만 볼 게 아니라, 실제 배포 장면이 있는지부터 구분해야 한다는
          점을 다시 점검했어요.
    - type: number_verify
      result: pass
      summary: 조항 번호뿐 아니라 NOTICE와 배포물 단위 판단에 쓰는 숫자와 장면을 함께 다시 검증했어요.
      items:
        - >-
          2항, 3항, 4항이 각각 저작권 라이선스, 특허 라이선스, 재배포 조건을 다룬다는 번호 체계를 다시 맞춰 봤어요.
        - >-
          배포물 1개를 만들 때도 LICENSE 사본 1개를 함께 두는지, 수정한 파일이 1개라도 있으면 변경 사실을 남겼는지를 독자 판단
          기준으로 다시 확인했어요.
        - >-
          원 배포물에 NOTICE 파일 1개가 있었다면, 재배포 ZIP 1개나 Docker 이미지 1개 같은 배포 단위마다 그 고지를 읽을 수 있는
          형태로 실어야 하는지 검토하는 흐름이 맞는지 다시 점검했어요.
    - type: adversarial
      result: pass
      summary: Apache 2.0이 해결하지 않는 권리 범위와 배포 오해를 반례 중심으로 더 분명하게 막았어요.
      items:
        - >-
          반례 1: 저장소에 Apache 2.0이 붙어 있어도 모델 이름이나 로고를 제품 홍보 문구에 바로 쓰는 건 상표 허락이 아니에요.
        - >-
          반례 2: 가중치 파일 1개를 내부 서버에서만 돌리는 장면과, 그 파일을 고객이 내려받게 하는 장면은 달라요. 뒤쪽은 재배포
          판단과 LICENSE, NOTICE 전달 검토가 바로 붙어요.
        - >-
          반례 3: 체크포인트가 Apache 2.0이어도 데이터셋 이용권, 모델 카드 제한, 서비스 약관이 함께 붙어 있으면 그 제한이
          자동으로 사라지지 않아요.
        - >-
          반례 4: 특허 조항이 있다고 해서 모든 분쟁 위험이 사라지는 건 아니고, 수령자가 해당 저작물에 대해 특허 소송을 먼저
          제기하면 3항에 따른 특허 라이선스 종료 가능성을 함께 봐야 해요.
      findings:
        - Apache 2.0만 보고 상표, 데이터, 서비스 약관까지 한 번에 해결된다고 읽으면 출시 검토에서 빠지는 항목이 많아요.
        - NOTICE는 원 배포물에 있을 때 따라가지만, 원본에 없던 NOTICE를 무조건 새로 써 넣으라는 규칙으로 읽으면 과장돼요.
        - 내부 사용과 외부 재배포를 구분하지 않으면 문서 의무를 너무 줄이거나 너무 넓히게 돼요.
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
  contentHash: "f06779b68078e5e5"
  reviewedAt: "2026-04-25T09:55:56Z"
---
## 한 줄 정의
Apache 2.0은 소스코드, 바이너리, 파생 작업물을 비교적 자유롭게 복제하고 수정하고 배포하게 해 주는 permissive 오픈소스 라이선스예요. 다만 public domain처럼 아무 문서도 안 챙겨도 된다는 뜻은 아니에요. 실무에서는 [Model Weights](/ko/wiki/weight/)나 [LLM](/ko/wiki/llm/) 저장소에서 Apache 2.0 표기를 봤을 때, 상업 이용 가능성만 보지 말고 배포 문서 의무까지 같이 봐야 해요.

## 어떻게 작동하나
실무 체크포인트는 먼저 세 가지예요. 배포물 1개를 만들 때 LICENSE 사본을 넣는지, 수정한 파일이 1개라도 있으면 변경 사실을 남기는지, 원래 배포물에 NOTICE가 있었다면 그 NOTICE를 함께 전달하는지예요. Apache License 2.0 본문에서 2항은 저작권 라이선스 범위, 3항은 특허 라이선스, 4항은 재배포 조건을 다뤄요.

예를 들어 [gpt-oss](/ko/wiki/gpt-oss/)나 [Gemma 4](/ko/wiki/gemma-4/)처럼 모델 카드나 저장소에 Apache 2.0이 붙어 있으면, 가중치 파일 1개만 다시 올리더라도 원 저장소의 LICENSE와 NOTICE 유무를 먼저 확인하는 게 안전해요. 또 수정한 체크포인트를 담은 Docker 이미지 1개, 설치 패키지 1개, 사내 미러 ZIP 1개처럼 배포 단위가 달라져도 각 배포물에서 문서가 빠지지 않았는지 따로 봐야 해요. MIT류 permissive 라이선스와 비슷하게 재사용 폭은 넓지만, Apache 2.0은 특허와 NOTICE를 더 또렷하게 적어 두는 편이라 배포 실무에서 확인할 항목이 한 단계 더 분명해요.

## 왜 중요한가
이 라이선스가 자주 언급되는 이유는 "써도 되나"보다 "어떻게 내보내나"를 빨리 판단하게 해 주기 때문이에요. 특히 [Local LLM](/ko/wiki/local-llm/) 환경에서 [GGUF](/ko/wiki/gguf/) 파일 3개를 묶어 배포하거나, [Qwen](/ko/wiki/qwen/) 같은 오픈 모델을 사내 패키지 저장소로 다시 올릴 때는 재배포인지 내부 사용인지부터 갈라서 봐야 해요. 외부에 파일을 넘기면 4항 검토가 바로 앞에 나오고, 내부 사용만 하는 장면이라면 문서 전달 문제는 상대적으로 작아져요. 그래서 모델 카드에서 Apache 2.0을 봤다면 "상업 사용 가능" 다음 질문으로 "내가 지금 만드는 게 외부 재배포인가, 내부 배포인가, 아니면 서비스 제공인가"를 이어서 물어보는 게 좋아요.

## 주의해서 볼 점
Apache 2.0이 해결하는 건 저작권, 특허, 재배포 조건까지예요. 상표 사용권, 데이터셋 이용권, 서비스 약관, 모델 출력 책임은 자동으로 따라오지 않아요. 예를 들어 모델 파일은 Apache 2.0이어도 모델 이름 로고를 광고 문구에 쓰는 건 상표 문제예요. 학습 데이터 재사용도 별도 권리 문제고요. 또 원 배포물에 NOTICE가 없었다면 새 NOTICE를 억지로 만드는 의무로 읽으면 안 돼요. 반대로 NOTICE가 있었는데 재배포 ZIP이나 앱 번들에서 빼버리면 실무 위험이 커져요. 특허 분쟁을 먼저 제기하면 3항에 따른 특허 라이선스가 종료될 수 있다는 점도 같이 읽어야 해요.
