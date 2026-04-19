---
title: HyperFrames
slug: hyperframes
lang: ko
category: framework
summary: HyperFrames는 HTML 장면을 계속 고치면서 영상을 다시 렌더할 팀이 볼 프레임워크야.
readerValue: '코드로 장면을 운영할지, 그냥 기존 영상 툴로 끝낼지 여기서 바로 갈려.'
relatedTerms:
  - api
  - runtime
githubUrl: 'https://github.com/heygen-com/hyperframes'
showcaseComponent: hyperframes
tags:
  - html
  - video
  - typescript
  - ffmpeg
  - gsap
stars: 4900
license: Apache-2.0
version: v0.4.6
contentStatus: final
draft: false
date: '2026-04-19'
edition: ai
factCheck:
  status: passed
  date: '2026-04-19'
  sources:
    - url: 'https://github.com/heygen-com/hyperframes'
      title: HyperFrames repository page
    - url: 'https://github.com/heygen-com/hyperframes/blob/main/README.md'
      title: HyperFrames README
    - url: 'https://github.com/heygen-com/hyperframes/releases/tag/v0.4.6'
      title: HyperFrames v0.4.6 release
    - url: 'https://hyperframes.heygen.com/reference/html-schema'
      title: HyperFrames HTML schema reference
    - url: >-
        https://github.com/softdaddy-o/aiki/blob/main/public/hyperframes/cases/product-intro.html
      title: AIKI HyperFrames product intro composition
    - url: >-
        https://github.com/softdaddy-o/aiki/blob/main/public/hyperframes/cases/vertical-short.html
      title: AIKI HyperFrames vertical short composition
    - url: >-
        https://github.com/softdaddy-o/aiki/blob/main/public/hyperframes/cases/data-brief.html
      title: AIKI HyperFrames data brief composition
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: README랑 릴리스 노트를 다시 맞춰봤어. HyperFrames는 영상 편집기보다 HTML 장면을 렌더하는 쪽으로 읽는 게 맞아.
      items:
        - README 첫 문구는 `Write HTML. Render video. Built for agents.`야.
        - Quick Start는 `init -> preview -> render` 순서를 그대로 밀고 있어.
        - 공식 설명도 HTML-native, AI-first, deterministic rendering 쪽으로 계속 잡혀 있어.
    - type: web_cross_check
      result: pass
      sources: 6
      summary: 공식 문서랑 AIKI 케이스 소스를 같이 대조해봤어. 지금 페이지가 보여주는 흐름은 설명이 아니라 실제 케이스에 맞춰 놨어.
      items:
        - '`preview`는 브라우저 live preview고, 포스팅에 올릴 최종 산출물은 `render`가 만드는 MP4야.'
        - >-
          HTML schema reference는 root composition에 `data-composition-id`, 크기 정보,
          시간 관련 data attribute를 요구해.
        - >-
          AIKI는 제품 소개, 세로 쇼츠, 데이터 요약 세 케이스를 실제 composition HTML과 렌더 영상으로 같이
          보여줘.
    - type: number_verify
      result: pass
      sources: 3
      summary: 숫자는 2026-04-19 기준으로 다시 확인했어. 자주 바뀌는 값이라 시점도 같이 고정해뒀어.
      items:
        - GitHub 저장소 페이지 표시값 기준 stars는 약 4.9k야.
        - 최신 릴리스 태그는 v0.4.6이야.
        - README 요구 조건은 Node.js 22 이상과 FFmpeg야.
    - type: adversarial
      result: pass
      sources: 4
      summary: 생성형 영상 API처럼 읽히지 않게 선을 그어뒀어. 어디서 이 방식이 무거워지는지도 같이 적었어.
      items:
        - 장면 구조를 직접 만지는 흐름이라, 결과만 빨리 받는 hosted API와는 결이 달라.
        - 렌더가 깨지면 FFmpeg, 코덱, 폰트, 에셋 경로를 팀이 직접 잡아야 해.
        - 브랜드 최종본을 픽셀 단위로 마감하는 일이 중심이면 기존 영상 툴체인이 더 나아.
guideVersion:
  common: 3.0.0
  projects: "3.0.0"
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.3.0"
    structure-editor: "1.1.0"
  panelVerdict: pass
  contentHash: "7d687bee14a21bdd"
  reviewedAt: "2026-04-19"
---

## 한 줄 판단

HyperFrames는 "프롬프트 한 줄로 영상이 자동 완성돼" 쪽 도구가 아니야. 공식 [README](https://github.com/heygen-com/hyperframes/blob/main/README.md) 첫 줄 그대로, HTML 장면을 직접 잡고 `preview`와 `render`를 반복하는 프레임워크로 보는 게 맞아. 장면을 코드로 들고 갈 팀이면 볼 이유가 있고, 최종 마감 툴을 찾는 거면 여기서 멈추면 돼.

## 누가 지금 바로 보면 되나

아래 3개 중 2개 이상이 맞으면 바로 테스트해볼 만해.

1. 제목, 캡션, 카드, CTA, 브랜드 문구처럼 장면 구조가 자주 바뀌어.
2. 에이전트가 HTML을 직접 고쳐도 팀이 그 결과를 읽고 바로 손볼 수 있어.
3. Node.js 22+, FFmpeg, 폰트와 에셋 경로 같은 로컬 렌더 환경을 직접 챙길 수 있어.

핵심은 영상 감성이 아니야. 반복 수정 비용이야. 장면을 자주 바꾸는 팀이면 여기서 차이가 바로 나.

## 바로 건너뛰면 되는 팀

브랜드 필름 최종본처럼 픽셀 단위 마감이 핵심이면 HyperFrames보다 기존 영상 툴 쪽이 편해. hosted 생성형 영상 [API](/ko/wiki/api/)처럼 결과만 빨리 받고 싶은 팀도 마찬가지야. HyperFrames는 운영 부담을 숨겨 주지 않아. 렌더가 깨지면 폰트, 코덱, 에셋 경로를 직접 잡아야 해.

## 5분 테스트

가장 빠른 검증은 이 네 줄이면 끝나.

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview
npx hyperframes render
```

여기서 볼 건 세 가지뿐이야.

1. `preview`가 바로 뜨는가.
2. 제목, 캡션, safe area가 원하는 위치에 놓이는가.
3. `render`가 큰 삽질 없이 MP4까지 끝나는가.

이 테스트가 부드럽게 끝나면 적어도 "우리 팀이 장면을 코드로 운영할 수 있나"는 바로 감이 와.

## 실제로 걸리는 운영 비용

HyperFrames는 장면을 HTML처럼 다룰 수 있다는 점이 강점이야. 대신 운영 부담도 같이 안고 가.

1. 렌더 환경을 팀이 직접 맞춰야 해. FFmpeg, 폰트, 에셋 경로가 조금만 어긋나도 결과가 달라져.
2. 영상 기획을 코드 구조로 바꿔 생각해야 해. 장면 수, 시작 시점, 끝 상태를 먼저 정해야 해.
3. 디자이너 툴의 감각으로 마감하는 작업과는 결이 달라. HyperFrames는 반복 수정과 재렌더 쪽이 강해.

이 지점이 [Runtime](/ko/wiki/runtime/) 문제랑 바로 붙어. 장면 소스만 있다고 끝나는 게 아니라, 실제로 렌더를 돌리는 실행 환경까지 팀이 계속 관리해야 하거든. 그래서 도입 판단은 "영상 퀄리티가 좋은가"보다 "장면 구조와 렌더 런타임을 코드로 같이 운영할 이유가 있나"로 내려야 해. 공식 [릴리스 노트](https://github.com/heygen-com/hyperframes/releases/tag/v0.4.6) 기준 최신 버전도 계속 빨리 움직여서, 팀이 버전 변화를 따라갈 수 있는지도 같이 봐야 해.

## 무엇과 비교하면 되나

비교 축은 둘이면 충분해.

하나는 hosted 생성형 영상 [API](/ko/wiki/api/)야. 이쪽은 입력을 보내고 결과 클립을 받는 흐름에 가까워. 파이프라인 운영은 가볍지만, 장면 구조를 직접 쥐고 계속 수정하는 감각은 약해.

다른 하나는 기존 영상 툴체인이야. 이쪽은 픽셀 단위 마감과 최종 감리에 강해. HyperFrames는 그 반대편에 있어. 장면을 코드로 들고 가면서 `preview -> render`를 빠르게 돌리는 팀에 맞아.

## 쇼케이스에서 바로 봐야 할 것

쇼케이스는 한 장면만 멋있게 꾸며 둔 데모가 아니야. 제품 소개, 세로 쇼츠, 데이터 요약 3개 케이스를 같은 구조로 묶어 놨어. 공식 [HTML schema](https://hyperframes.heygen.com/reference/html-schema)를 기준으로 composition 뼈대를 잡고, 그걸 실제 렌더 영상까지 이어서 보여줘.

1. 프롬프트가 어떻게 들어오는지
2. 그 프롬프트가 어떤 HTML 장면으로 바뀌는지
3. 그렇게 나온 장면이 실제 영상으로 어떻게 보이는지

예를 들어 제품 소개 케이스는 "첫 장면은 큰 헤드라인, 중간에는 한 줄 가치 제안, 마지막에는 CTA만 남겨"라는 프롬프트에서 시작해. 생성된 HTML도 `eyebrow`, `title`, `copy`, `cta`, `aside` 다섯 덩어리로 끝나. 영상에서 봐야 할 것도 복잡하지 않아. 큰 타이틀이 먼저 뜨는지, CTA가 끝 상태를 잘 남기는지, 같은 뼈대에서 문구만 바꿔 재렌더하기 쉬운지만 보면 돼.

세로 쇼츠 케이스는 훅과 짧은 캡션 리듬만 보면 돼. 데이터 요약 케이스는 카드 뼈대를 매주 재활용할 만한지만 보면 돼. 이 세 개를 한 화면에서 돌려보면 HyperFrames가 팀에 맞는지 꽤 빨리 갈려.

## 최종 판단

HyperFrames는 "영상 생성 도구"보다 "장면을 코드로 운영하는 영상 프레임워크"라는 쪽이 더 정확해. 장면 변경이 잦고 에이전트가 HTML을 계속 고칠 팀이면 볼 가치가 있어. 결과만 빨리 받거나 마감 감리가 더 중요한 팀이면 다른 스택으로 가는 편이 편해.
