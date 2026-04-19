---
title: HyperFrames
slug: hyperframes
lang: ko
category: framework
summary: "HyperFrames는 HTML 장면을 만들고 `preview`로 확인한 뒤 `render`로 MP4를 뽑는 오픈소스 영상 프레임워크야."
readerValue: "이 페이지는 HyperFrames를 볼지, 아니면 그냥 기존 영상 스택으로 갈지 빠르게 가르는 데 초점을 둔다."
relatedTerms:
  - api
  - runtime
githubUrl: "https://github.com/heygen-com/hyperframes"
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
date: "2026-04-19"
edition: "ai"
factCheck:
  status: passed
  date: "2026-04-19"
  sources:
    - url: "https://github.com/heygen-com/hyperframes"
      title: "HyperFrames repository page"
    - url: "https://github.com/heygen-com/hyperframes/blob/main/README.md"
      title: "HyperFrames README"
    - url: "https://github.com/heygen-com/hyperframes/releases/tag/v0.4.6"
      title: "HyperFrames v0.4.6 release"
    - url: "https://hyperframes.heygen.com/reference/html-schema"
      title: "HyperFrames HTML schema reference"
    - url: "https://github.com/softdaddy-o/aiki/blob/main/src/components/projects/showcases/hyperframes/index.tsx"
      title: "AIKI HyperFrames showcase component"
    - url: "https://github.com/softdaddy-o/aiki/blob/main/public/hyperframes/showcase-runtime/index.html"
      title: "AIKI HyperFrames showcase composition source"
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: "공식 README와 릴리스 노트를 기준으로 HyperFrames를 HTML 기반 영상 렌더 프레임워크로만 소개했어."
      items:
        - "README 첫 문구는 `Write HTML. Render video. Built for agents.`야."
        - "Quick Start는 `init -> preview -> render` 순서를 직접 제시해."
        - "Why HyperFrames는 HTML-native, AI-first, deterministic rendering을 핵심 차이로 정리해."
    - type: web_cross_check
      result: pass
      sources: 5
      summary: "공식 문서와 AIKI 구현 파일을 같이 보고, 페이지에서 실제로 보여주는 결과물이 설명과 어긋나지 않게 맞췄어."
      items:
        - "`preview`는 브라우저 live preview고, 최종 산출물은 `render`가 만드는 MP4야."
        - "HTML schema reference는 root composition에 `data-composition-id`, 크기 정보, 시간 관련 data attribute를 요구해."
        - "AIKI showcase component는 `/hyperframes/showcase-video.mp4`를 실제 영상으로 재생하고, 원본 composition은 `public/hyperframes/showcase-runtime/index.html`에 둬."
    - type: number_verify
      result: pass
      sources: 3
      summary: "2026-04-19 기준 공개 숫자는 다시 확인해서 넣었어."
      items:
        - "GitHub 저장소 페이지 표시값 기준 stars는 약 4.9k야."
        - "최신 릴리스 태그는 v0.4.6이야."
        - "README 요구 조건은 Node.js 22 이상과 FFmpeg야."
    - type: adversarial
      result: pass
      sources: 4
      summary: "HyperFrames를 생성형 영상 API처럼 오해하지 않게, 실제 운영 부담과 안 맞는 경우를 같이 적었어."
      items:
        - "장면 구조를 직접 만지는 흐름이라, 결과만 빨리 받는 hosted API와는 성격이 달라."
        - "렌더가 깨지면 FFmpeg, 코덱, 폰트, 에셋 경로를 팀이 직접 잡아야 해."
        - "브랜드 최종본을 픽셀 단위로 다듬는 용도라면 기존 영상 툴체인이 더 맞을 수 있어."
guideVersion:
  common: "3.0.0"
  projects: "3.0.0"
reviewStamp:
  panelVersion: "1.0.0"
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.0.0"
    tone-editor: "1.1.0"
    structure-editor: "1.0.0"
  panelVerdict: pass
  contentHash: "b4ae0494fae7d637"
  reviewedAt: "2026-04-19"
---

## HyperFrames가 뭔가

HyperFrames는 HTML로 장면을 만들고, 브라우저에서 `preview`로 확인한 뒤, `render`로 MP4를 뽑는 프레임워크야. 여기서 중요한 건 "영상 편집 툴 하나를 더 배운다"가 아니라, 장면 구조를 HTML처럼 다루고 에이전트가 그 파일을 계속 고치기 쉽다는 점이야.

그래서 이걸 볼지 말지는 아주 단순해. 우리 팀이 제목, 캡션, 카드, 로고, 데이터 장면 조합을 자주 바꾸는지 보면 돼. 그런 수정이 많으면 HyperFrames 쪽이 맞고, 한 번 만든 영상을 세밀하게 마감하는 쪽이면 다른 툴이 더 맞아.

## 언제 보면 맞나

HyperFrames는 결과만 한 번 뽑는 팀보다, 장면을 반복 수정하는 팀에 맞아.

1. 에이전트가 프롬프트를 받아 HTML 장면을 계속 고쳐도 괜찮다.
2. Node.js 22+, FFmpeg, 폰트와 에셋 경로 같은 로컬 렌더 환경을 팀이 직접 관리할 수 있다.
3. "한 번에 멋진 결과"보다 "빠르게 고쳐서 다시 렌더"가 더 중요하다.

이 셋 중 두 개 이상이 맞으면 HyperFrames를 볼 이유가 충분해.

## 5분 테스트

가장 빠른 테스트는 이것뿐이야.

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview
npx hyperframes render
```

여기서 볼 건 세 가지다.

1. `preview`가 바로 뜨는가.
2. 제목, 캡션, safe area가 원하는 위치에 놓이는가.
3. `render`가 큰 삽질 없이 MP4까지 끝나는가.

이 테스트가 매끄럽게 끝나면, 적어도 "우리 팀이 HTML 장면을 계속 고칠 수 있는가"는 바로 감이 온다.

## 이 페이지에서 실제로 보는 것

Interactive Showcase는 설명용 HTML 카드가 아니야. 지금 페이지에 붙어 있는 영상은 실제 composition source를 바탕으로 렌더한 MP4야. 그래서 사용자는 내부 구현을 읽는 대신, 결과물이 어떤 느낌으로 나오는지 먼저 볼 수 있어.

함께 보여주는 정보도 딱 세 가지만 남겼어.

1. 실제 렌더 결과물
2. 프롬프트 예시
3. `init -> preview -> render` 흐름

굳이 내부 구현 목록을 앞에 세우지 않은 이유도 여기 있어. 대부분의 독자는 구조 설명보다 "이게 우리 팀 작업 방식에 맞느냐"가 먼저거든.

## 덜 맞는 경우

브랜드 최종본을 아주 세밀하게 마감해야 하는 팀이면 HyperFrames보다 기존 영상 툴이 더 편할 수 있어. HyperFrames는 초안 생성과 반복 수정에는 강하지만, 마감 감리까지 대신해 주는 도구는 아니야.

또 하나는 운영 부담이야. `render`가 실패하면 FFmpeg, 코덱, 폰트, 에셋 경로를 팀이 직접 잡아야 해. hosted 생성형 영상 [API](/ko/wiki/api/)처럼 운영 부담을 숨겨 주는 구조는 아니야.

## 무엇과 비교하면 되나

HyperFrames를 고를 때는 두 갈래만 같이 보면 빨라. 하나는 hosted 생성형 영상 [API](/ko/wiki/api/)야. 이쪽은 프롬프트나 입력 자산을 보내고 결과 클립을 받는 흐름에 가깝고, 팀이 렌더 파이프라인을 직접 만질 일은 상대적으로 적어. 대신 장면 구조를 HTML처럼 쥐고 세밀하게 반복 수정하는 감각은 약하다.

다른 하나는 기존 영상 툴체인이야. 이쪽은 픽셀 단위 마감과 최종 감리에 더 강하다. 반대로 HyperFrames는 그 중간이 아니라, 장면 구조를 코드로 들고 가면서 `preview -> render`를 계속 돌리는 쪽에 더 가깝다. 그래서 "결과만 빨리 받으면 되는가", 아니면 "장면을 계속 고치며 통제권을 가져가야 하는가"로 비교하면 판단이 빨라진다.

## 시작 전에 체크할 것

2026-04-19 기준 HyperFrames 공개 저장소 페이지 표시값은 약 4.9k stars고, 최신 릴리스는 [v0.4.6](https://github.com/heygen-com/hyperframes/releases/tag/v0.4.6)이야. 요구 조건은 Node.js 22 이상과 FFmpeg고, 이 전제부터 맞아야 테스트가 편하다.

정리하면 HyperFrames는 "프롬프트를 예쁘게 영상으로 바꿔 주는 마법 상자"보다, "HTML 장면을 계속 고쳐 가며 반복 렌더하는 팀용 프레임워크"에 더 가깝다. 이 기준으로 보면 볼지 말지가 빨리 갈린다.
