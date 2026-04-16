---
title: "NostalgiaForInfinity"
slug: "nostalgia-for-infinity"
lang: "ko"
category: "bot"
summary: "Freqtrade 암호화폐 트레이딩 봇에서 쓰는 커뮤니티 기반 전략 묶음입니다."
readerValue: "Freqtrade 전략을 실제로 운용하거나 백테스트하려는 사람이 NFI의 전략 계보, 필수 설정, 보호 장치, 업데이트 흐름을 한 화면에서 점검할 수 있습니다."
githubUrl: "https://github.com/iterativv/NostalgiaForInfinity"
showcaseComponent: "nfi"
tags: ["freqtrade", "crypto", "trading-bot", "strategy"]
stars: 3100
license: "GPL-3.0"
version: "v2"
contentStatus: "draft"
draft: false
date: "2026-04-15"
edition: "ai"
factCheck:
  status: "pending"
  date: "2026-04-15"
  sources:
    - url: "https://github.com/iterativv/NostalgiaForInfinity"
      title: "iterativv/NostalgiaForInfinity GitHub repository"
    - url: "https://iterativv.github.io/NostalgiaForInfinity/"
      title: "NostalgiaForInfinity official documentation"
    - url: "https://github.com/iterativv/NostalgiaForInfinity/releases/tag/v17.3.1079"
      title: "NostalgiaForInfinity v17.3.1079 release"
  checks:
    - type: "source_match"
      result: "pass"
      sources: 3
      summary: "현재 공개 초안은 README, 공식 문서, 최신 릴리스 페이지를 기준으로 맞춰뒀어."
      items:
        - "기준 버전: Projects showcase v2. 다른 세션에서 제작 중인 v3 기준 내용은 아직 반영하지 않았습니다."
        - "프로젝트 설명, 권장 설정, 문서 링크, 최신 릴리스 표기는 공개 GitHub/문서 페이지 기준입니다."
    - type: "web_cross_check"
      result: "pass"
      sources: 2
      summary: "README와 공식 문서를 대조해서 NFI를 Freqtrade용 크립토 전략 프로젝트로 설명해도 어긋나지 않는지 확인했어."
      items:
        - "공식 문서는 backtesting 데이터 다운로드와 실행 흐름을 별도 페이지에서 안내합니다."
        - "GitHub README는 5분봉 타임프레임, 동시 거래 6~12개, 페어리스트 40~80개 권장을 명시합니다."
    - type: "number_verify"
      result: "pass"
      sources: 1
      summary: "저장소 지표는 초안 작성 시점 기준으로 잡았고, 최종 확정 전에는 한 번 더 새로 확인해야 해."
      items:
        - "GitHub 표시값 기준 약 3.1k stars, 704 forks, 87 watchers, 21,757 commits로 기록했습니다."
        - "최신 릴리스는 v17.3.1079, 2026-04-09 공개로 기록했습니다."
    - type: "adversarial"
      result: "skip"
      sources: 0
      summary: "이 페이지는 전략 성과를 보증하지 않는 드래프트입니다."
      items:
        - "쇼케이스의 signal weight와 전략 계보 설명은 운용 이해를 돕는 큐레이션이며 투자 조언이나 실거래 추천이 아닙니다."
---

## NostalgiaForInfinity란?

NostalgiaForInfinity, 줄여서 NFI는 오픈소스 암호화폐 트레이딩 봇 Freqtrade에서 실행하는 전략 저장소입니다. 단일 매매 아이디어라기보다는 여러 세대의 전략 파일과 설정, 블랙리스트, 문서, 테스트 보조 도구를 함께 관리하는 프로젝트에 가깝습니다.

저장소의 README는 5분 봉(<span class="term-hint"><span class="term-hint__label">타임프레임</span><button class="term-hint__button" type="button" aria-label="용어 설명 보기">?</button><span class="term-hint__tooltip">캔들 하나가 몇 분 단위인지 뜻해. 전략이 5분봉 기준으로 짜였으면 다른 값으로 바꾸는 순간 신호 의미가 달라질 수 있어.</span></span> 5m), 6~12개 수준의 동시 거래, 40~80개 페어의 볼륨 기반 <span class="term-hint"><span class="term-hint__label">페어리스트</span><button class="term-hint__button" type="button" aria-label="용어 설명 보기">?</button><span class="term-hint__tooltip">봇이 매매 대상으로 삼는 코인 목록이야. 너무 좁거나 거래가 적은 코인이 많으면 전략이 흔들릴 수 있어.</span></span>, USDT/USDC 같은 스테이블 코인 마켓, 레버리지 토큰 블랙리스트를 강하게 권장합니다. 이 조건을 벗어나면 백테스트 숫자가 좋아 보여도 실거래 리스크가 크게 달라질 수 있습니다.

## 핵심 구조

- **전략 파일 계보**: `NostalgiaForInfinityX.py`부터 `X7`까지 여러 전략 변형을 저장소 루트에서 관리합니다.
- **Freqtrade 통합**: Docker Compose, 설정 예시, 사용자 데이터 디렉터리, 테스트 스크립트를 함께 제공합니다.
- **자동 업데이트**: Docker 사용자는 `nfi-updater` 사이드카로 전략, 블랙리스트, 페어리스트 변경을 주기적으로 따라갈 수 있습니다.
- **보호 장치 중심 변경**: 최신 릴리스 로그는 다수의 signal에 <span class="term-hint"><span class="term-hint__label">프로텍션</span><button class="term-hint__button" type="button" aria-label="용어 설명 보기">?</button><span class="term-hint__tooltip">연속 손실이나 과도한 재진입을 막기 위해 잠시 거래를 쉬게 하거나 진입을 제한하는 보호 규칙이야.</span></span>을 추가하는 식의 리스크 제어 변경이 자주 등장합니다.

## 이 페이지에서 보는 것

아래 인터랙티브 쇼케이스는 GitHub 페이지와 공식 문서에서 확인한 공개 정보를 바탕으로 NFI를 운용 관점에서 재구성합니다. 전략 계보, 추천 설정, 보호 장치, 최근 릴리스 변화, 백테스트 체크리스트를 한 화면에서 비교할 수 있게 만들었습니다.

실거래 신호를 추천하는 페이지가 아닙니다. 암호화폐 자동매매 전략은 시장 국면, 거래소 수수료, 슬리피지, 페어 구성, 설정 오버라이드에 따라 결과가 크게 달라지므로, 여기서는 프로젝트의 구조와 점검 포인트만 다룹니다.
