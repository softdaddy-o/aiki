---
term: apache
title: Apache 2.0(아파치 2.0 라이선스)
lang: ko
summary: >-
  Apache 2.0(아파치 2.0 라이선스)는 코드나 모델 가중치를 배포할 때 얼마나 자유롭게 써도 되는지와, 무엇을 같이 남겨야 하는지를
  정한 오픈소스 라이선스야. 상업 사용과 수정, 재배포를 넓게 허용하지만 LICENSE, 변경 고지, NOTICE 같은 배포 의무도 같이
  따라와.
readerValue: >-
  이 페이지를 읽으면 기사나 모델 카드에서 Apache 2.0을 봤을 때 '상업적으로 써도 되나'만이 아니라, 배포할 때 어떤 문서를 챙겨야
  하는지도 바로 판단할 수 있어. 또 MIT와 비슷한 permissive 계열이지만 특허와 NOTICE 조건이 더 선명하다는 점도 같이 잡을
  수 있어.
category: concept
guideVersion:
  common: 1.0.0
  wiki: "3.0.0"
aliases:
  - Apache 2.0
  - Apache License 2.0
  - 'Apache License, Version 2.0'
relatedTerms:
  - open-source
  - weight
  - gpt-oss
  - gemma-4
  - qwen-3.5
firstMentioned: '2026-03-16'
mentionCount: 11
draft: false
tags:
  - license
  - open-source
factCheck:
  status: passed
  date: '2026-04-17'
  sources:
    - url: 'https://www.apache.org/licenses/LICENSE-2.0'
      title: 'Apache License, Version 2.0'
    - url: 'https://www.apache.org/legal/apply-license'
      title: 'Applying the Apache License, Version 2.0'
  checks:
    - type: source_match
      result: pass
      summary: 상업 사용 가능 여부보다 배포 의무가 핵심이라는 구조를 본문 라이선스와 가이드에 맞춰봤어.
      items:
        - >-
          독자 문제 대조: Apache 2.0을 보면 '돈 벌고 써도 되나'만 먼저 떠올리기 쉬워서, 실제로는 재배포 조건과
          NOTICE 관리가 중요하다는 쪽으로 정의를 맞췄어.
        - >-
          원문 대조: Apache License 2.0
          본문(https://www.apache.org/licenses/LICENSE-2.0)은 2항 저작권 라이선스, 3항 특허
          라이선스, 4항 재배포 조건을 적고 있어.
        - >-
          실무 대조: ASF 적용 가이드(https://www.apache.org/legal/apply-license)는 배포물마다
          라이선스 전문은 한 부면 되고, 파일명은 LICENSE와 NOTICE를 권장한다고 설명해서 본문 체크리스트에 반영했어.
    - type: web_cross_check
      result: pass
      sources: 2
      summary: 라이선스 본문과 적용 가이드를 같이 놓고 느슨한 허용과 실제 배포 의무를 분리해서 다시 봤어.
      items:
        - >-
          비교 기준: Apache 2.0을 permissive 라이선스로만 볼지, 아니면 특허와 NOTICE까지 포함한 배포 규칙으로
          볼지 두 문서를 나란히 비교했어.
        - >-
          교차 확인: 본문은 권리 범위와 조건을 적고, 적용 가이드는 배포물마다 라이선스 전문 한 부와 NOTICE 파일 처리 같은
          실무 해석을 더해 줘.
        - '해석 보정: 그래서 페이지도 ''자유롭게 써도 된다''보다 ''배포할 때 뭘 남겨야 한다''를 더 앞쪽에 배치했어.'
    - type: number_verify
      result: pass
      summary: 조항 번호와 배포 규칙을 섞지 않게 번호 기준으로 다시 맞춰봤어.
      items:
        - >-
          번호 확인: 2항은 copyright license, 3항은 patent license, 4항은 redistribution
          조건으로 나뉘어 있어.
        - '조건 확인: 적용 가이드는 각 소스 파일마다 라이선스 전문을 넣을 필요는 없고 배포물당 한 부면 된다고 적어.'
        - >-
          표현 조정: NOTICE는 Apache 배포물에 원래 있을 때 따라오는 문서라는 점을 명시해서, 무조건 새로 만들어야 하는
          의무처럼 과장하지 않았어.
    - type: adversarial
      result: pass
      summary: Apache 2.0이 모든 권리 문제를 한 번에 풀어 준다고 읽는 오해를 막았어.
      items:
        - '반대 읽기: 라이선스가 열려 있어도 상표권, 데이터 사용권, 별도 서비스 약관은 자동으로 따라오지 않는다고 적어 뒀어.'
        - >-
          반대 읽기: 특허 조항이 있다고 해서 아무 상황에서나 분쟁이 사라지는 건 아니고, 소송을 제기하면 특허 라이선스가 종료될 수
          있다는 본문 문구도 염두에 뒀어.
      findings:
        - Apache 2.0을 '마음대로 써도 됨' 한 줄로 줄이면 실제 배포 단계에서 걸리는 고지 의무를 놓치게 돼.
        - 오픈 라이선스와 제품 운영 권리 전체를 같은 걸로 보면 데이터·브랜드·약관 문제를 뒤늦게 만나게 돼.
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.0.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  reviewedAt: "2026-04-17"
---
## 한 줄 정의
Apache 2.0은 소스코드나 바이너리, 파생 작업물을 꽤 자유롭게 복제하고 수정하고 배포할 수 있게 해 주는 오픈소스 라이선스야. 대신 public domain처럼 아무 책임도 없는 상태는 아니고, 배포할 때 라이선스 사본과 변경 사실, NOTICE 같은 고지 의무를 챙기라는 조건이 붙어 있어.
## 어떻게 작동하나
라이선스 본문 2항은 저작권 라이선스로 복제와 파생물 제작, 재배포를 허용하고, 3항은 기여자가 가진 관련 특허에 대한 라이선스도 같이 준다고 적어. 다만 4항은 재배포할 때 라이선스 사본을 포함하고, 수정한 파일은 바뀌었다는 사실을 표시하고, 원래 NOTICE 파일이 있으면 읽을 수 있는 형태로 같이 실으라고 요구해서, 실제 실무에서는 '써도 되나'보다 '어떻게 내보내야 하나'가 더 중요한 체크포인트가 돼.
## 왜 중요한가
이 라이선스가 자주 언급되는 이유는 상업 사용이 가능하다는 말 한 줄로 끝나지 않고, 기업 배포와 오픈 가중치 배포에서 법적 경계와 운영 체크리스트를 같이 제공하기 때문이야. 특히 특허 라이선스 조항이 명시돼 있어서, 그냥 짧은 고지 정도만 두는 MIT류와 다르게 '기능은 열어 두되 분쟁 리스크는 어디까지 정리했는가'를 같이 읽게 만들어.
## 주의해서 볼 점
Apache 2.0이 붙어 있다고 해서 상표 사용권, 데이터셋 이용권, 서비스 약관, 모델 출력 책임까지 한꺼번에 해결되는 건 아니야. 또 NOTICE가 항상 필요한 것도 아니고 원래 배포물에 NOTICE가 있을 때 따라오는 구조라서, 기사에서 Apache 2.0만 보고 '아무거나 가져다 써도 된다'고 읽으면 실무에서 가장 먼저 부딪히는 배포 문서 의무를 놓치기 쉬워.
## 관련 용어
- [Open Source](/ko/wiki/open-source/): Apache 2.0이 permissive 라이선스라는 큰 틀을 먼저 잡을 때 좋아.
- [Weight](/ko/wiki/weight/): 코드뿐 아니라 모델 가중치 배포에도 같은 라이선스 문구가 붙는지 볼 때 연결돼.
- [GPT-OSS](/ko/wiki/gpt-oss/): 오픈 가중치 모델이 Apache 2.0처럼 넓은 허용을 주는지 비교해 볼 때 좋아.
- [Gemma 4](/ko/wiki/gemma-4/): 실제 모델 카드에서 상업 사용과 배포 조건을 읽는 예시로 보기 좋아.
- [Qwen 3.5](/ko/wiki/qwen-3.5/): Apache 2.0 표기가 로컬 LLM 배포 해석에 어떻게 쓰이는지 비교할 때 도움 돼.
