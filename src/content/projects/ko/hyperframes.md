---
title: HyperFrames
slug: hyperframes
lang: ko
category: framework
summary: "HyperFrames는 HTML scene을 만들고 `preview`로 확인한 뒤 `render`로 MP4를 뽑는 오픈소스 영상 프레임워크야."
readerValue: "이 페이지는 HyperFrames를 볼 팀인지, 그냥 FFmpeg 스크립트나 기존 영상 스택으로 가는 편이 나은지 빨리 가르는 데 초점을 둬."
githubUrl: "https://github.com/heygen-com/hyperframes"
showcaseComponent: hyperframes
tags:
  - html
  - video
  - typescript
  - ffmpeg
  - gsap
stars: 3218
license: Apache-2.0
version: v0.4.4
contentStatus: final
draft: false
date: "2026-04-18"
edition: "ai"
factCheck:
  status: passed
  date: "2026-04-18"
  sources:
    - url: "https://api.github.com/repos/heygen-com/hyperframes"
      title: "GitHub REST API repository metadata for heygen-com/hyperframes"
    - url: "https://github.com/heygen-com/hyperframes/blob/main/README.md"
      title: "HyperFrames README"
    - url: "https://github.com/heygen-com/hyperframes/releases/tag/v0.4.4"
      title: "HyperFrames v0.4.4 release"
    - url: "https://hyperframes.heygen.com/reference/html-schema"
      title: "HTML Schema Reference - HyperFrames"
    - url: "https://github.com/softdaddy-o/aiki/blob/main/src/components/projects/showcases/hyperframes/index.tsx"
      title: "AIKI HyperFrames showcase component"
    - url: "https://github.com/softdaddy-o/aiki/blob/main/public/hyperframes/showcase-runtime/index.html"
      title: "AIKI HyperFrames static composition HTML"
  checks:
    - type: source_match
      result: pass
      sources: 5
      summary: "핵심 정의는 README 설명을 기준으로 잡았어. HyperFrames를 HTML 기반 영상 렌더 프레임워크로만 소개하고, 생성형 영상 API나 편집 SaaS처럼 섞어 말하지 않게 맞췄어."
      items:
        - "README `Quick Start`에는 `init -> preview -> render` 흐름이 직접 나온다. 그래서 본문도 그 흐름을 기준으로 잡았어."
        - "README 첫 문구가 `Write HTML. Render video. Built for agents.`다. 에이전트 워크플로를 앞세운다는 해석은 여기서 확인했다."
        - "`Why HyperFrames`에는 HTML-native, AI-first, deterministic rendering, frame adapter 패턴이 따로 정리돼 있다."
    - type: web_cross_check
      result: pass
      sources: 5
      summary: "README와 공식 웹 문서, AIKI 구현 파일 두 개를 같이 보고 검증했어. 공식 1차 출처가 기본이고, 쇼케이스 구현 확인만 AIKI 저장소 파일로 닫았어. 나중에 실사용 후기나 운영 데이터가 붙으면 해석은 더 달라질 수 있어."
      items:
        - "`npx hyperframes preview`는 라이브 프리뷰로 설명돼 있다. 근거 위치: README `Quick Start`."
        - "최종 MP4는 `npx hyperframes render`가 만든다. 근거 위치: README `Quick Start`."
        - "HyperFrames 공식 HTML schema reference는 root composition에 `data-composition-id`, `data-width`, `data-height`, GSAP timeline 등록을 요구한다."
        - "AIKI showcase component는 `LIVE_RUNTIME_SRC`를 `/hyperframes/showcase-runtime/index.html`로 두고 iframe으로 직접 붙인다. 근거 위치: `src/components/projects/showcases/hyperframes/index.tsx`."
        - "정적 runtime 파일에는 `data-composition-id`, `data-width`, `data-height`, GSAP timeline, autoplay query param 처리 코드가 들어 있다. 근거 위치: `public/hyperframes/showcase-runtime/index.html`."
    - type: number_verify
      result: pass
      sources: 3
      summary: "본문에 실제로 쓰는 숫자만 다시 찍어 봤어. 2026-04-18 기준 공개 값이고, 어디서 나온 숫자인지도 바로 찾게 경로를 남겨뒀어."
      items:
        - "GitHub REST API repo metadata를 2026-04-18에 조회했을 때 stars 3,218, forks 251이었다."
        - "release tag page 기준 최신 릴리스는 v0.4.4로 확인했어."
        - "README badge와 quick-start requirements 기준으로 Node.js >= 22, FFmpeg 요구가 붙어 있다."
    - type: adversarial
      result: pass
      sources: 3
      summary: "가장 큰 오해는 '에이전트가 영상 작업을 거의 다 대신한다'는 기대야. 실제론 로컬 렌더 환경, 코덱, 자산 경로, 최종 QA가 그대로 남아 있어."
      items:
        - "`preview`는 개발용 흐름이라 정적 배포 경로와 다르다. 여기서 독자가 제일 많이 헷갈릴 수 있어."
        - "FFmpeg, 코덱, 폰트, asset 경로가 꼬이면 render가 바로 깨질 수 있다. 이건 로컬 환경 의존성이 큰 편이야."
        - "브랜드 최종본 품질이 더 중요하면 기존 React 영상 스택이나 수동 파이프라인이 더 나을 수 있어."
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
  contentHash: "2765d41de55a6874"
  reviewedAt: "2026-04-18"
---

## HyperFrames가 뭐냐

HyperFrames는 HTML scene을 만들고 브라우저에서 `preview`로 확인한 뒤 `render`로 MP4를 뽑는 오픈소스 프레임워크야. 여기서 scene은 영상 안에 들어갈 장면 묶음이라고 보면 돼. [API](/ko/wiki/api/)처럼 결과만 바로 받는 생성형 영상 호출보다는, 장면 구조를 코드처럼 잡고 반복 렌더를 돌리는 쪽에 더 가까워.

AIKI에서 이 프로젝트를 보는 이유도 그거야. [CLI](/ko/wiki/cli/)로 프로젝트를 만들고, [Claude Code](/ko/wiki/claude-code/), [Cursor](/ko/wiki/cursor/), [Gemini](/ko/wiki/gemini/), [Codex](/ko/wiki/codex/) 같은 코딩 에이전트가 HTML scene 구조를 바로 만지게 하기 쉽다. 팀이 이미 [IDE](/ko/wiki/ide/) 안에서 에이전트와 작업하는 흐름에 익숙하면 특히 잘 맞아.

## 도입 먼저 가르면

HyperFrames는 "영상 장면을 코드처럼 다루고 싶은 팀"에 맞는 쪽이야. 그냥 텍스트 한 줄 넣으면 완성 영상을 알아서 뽑아 주는 생성형 영상 API를 기대하면 어긋나. 반대로 HTML 구조를 에이전트가 계속 만져도 괜찮고, 로컬 render 환경도 팀이 직접 관리할 수 있다면 꽤 잘 맞아.

도입 전에 세 가지만 보면 돼.

1. 장면 구조를 HTML로 두는 게 팀에 부담이 없나.
2. Node 22+, FFmpeg, asset 경로 같은 로컬 의존성을 직접 관리할 수 있나.
3. 브랜드 필름 완성도보다 반복 생성 속도와 수정 대화 비용 절감이 더 중요한가.

셋 다 `예`에 가까우면 HyperFrames를 볼 이유가 있고, 아니면 그냥 FFmpeg 스크립트나 기존 영상 스택이 더 현실적일 수 있어.

## 5분 테스트 흐름

가장 짧은 시작 흐름은 이거야.

```bash
npx hyperframes init my-video
cd my-video
npx hyperframes preview
npx hyperframes render
```

`init`으로 뼈대를 만들고, `preview`로 장면과 타이밍을 보고, `render`로 MP4를 뽑아. 2026-04-18 기준 최신 릴리스는 [v0.4.4](https://github.com/heygen-com/hyperframes/releases/tag/v0.4.4)고, README 기준 요구 조건은 Node.js 22 이상과 FFmpeg야.

5분 테스트에서 볼 건 복잡하지 않아. `preview`가 바로 뜨는지, 제목 타이밍이 맞는지, safe area가 안 깨지는지, `render`가 한 번에 끝나는지만 보면 돼. safe area는 잘리면 안 되는 텍스트 안전 구역이라고 생각하면 쉽다. 여기서 막히면 팀 운영 흐름에도 그대로 부담이 남아.

## 잘 맞는 작업

첫 번째는 10초 안팎의 제품 소개 영상이야.

- 입력: 제품 문구, 로고 PNG, 배경 클립 1개, 배경 음악 1개.
- 확인: 제목 타이밍, safe area, 오디오 길이, render 성공 여부.
- 실패 포인트: 폰트 로딩, asset 경로, 코덱 충돌.

두 번째는 9:16 쇼츠나 차트 영상이야. chart race는 막대 그래프 순위가 시간에 따라 바뀌는 영상이라고 보면 돼.

- 입력: 짧은 대본이나 CSV, 캡션 문구, 9:16 기준 배경 자산.
- 확인: 자막 줄 수, 세로 화면 안전 여백, 애니메이션 길이, export 시간.
- 실패 포인트: 오버레이 과다, 긴 자막, 자산 수 증가로 생기는 디버깅 비용.

세 번째는 반복 생성 클립이 많은 팀이야. lower-third, caption, chart, transition 같은 조각을 catalog block으로 재사용하면서 여러 버전을 빨리 뽑을 수 있어.

lower-third는 화면 아래쪽 이름표나 설명 막대라고 생각하면 돼. 이런 조각이 자주 반복되는 팀에서 HyperFrames가 특히 편하다.

## 다른 선택지랑 뭐가 다르냐

| 선택지 | 강한 점 | 약한 점 | HyperFrames로 기우는 경우 |
| --- | --- | --- | --- |
| FFmpeg CLI | 제어가 세밀함 | scene 구조를 읽고 바꾸는 비용이 큼 | 에이전트가 장면 구조를 계속 수정해야 할 때 |
| 기존 React/JSX 영상 스택 | 컴포넌트 추상화와 기존 테스트 체인 | HTML/data-*보다 진입이 무거울 수 있음 | 팀이 HTML scene 쪽이 더 단순할 때 |
| 호스티드 생성 API | 결과를 빨리 받기 쉬움 | 장면 구조 제어가 약함 | 결과보다 장면 제어와 반복 render가 더 중요할 때 |

HyperFrames 쪽으로 기우는 핵심 이유는 하나야. 에이전트가 장면 구조를 직접 읽고 고치기 쉬운 표면이 있다는 점이야.

## 피하는 게 나은 경우

브랜드 최종본처럼 마지막 미감이 더 중요하고, 사람이 타임라인을 세밀하게 끝까지 잡아야 하는 작업이면 HyperFrames보다 다른 스택이 더 편할 수 있어. HyperFrames는 초안 속도와 반복 수정엔 강하지만, 최종 미감 보증 도구는 아니거든.

Node, FFmpeg, 코덱, 폰트, asset 경로 같은 의존성을 팀이 관리하기 싫어도 덜 맞아. render 실패가 나면 그 원인을 로컬에서 직접 잡아야 해서, 호스티드 SaaS처럼 운영 부담이 숨겨지지 않아.

긴 영상이나 동시 렌더 안정성이 중요한 경우도 바로 맞는다고 보긴 어려워. 이쪽은 장면 수와 자산 수가 올라갈수록 디버깅 비용, 템플릿 유지보수, 출력 품질 편차가 같이 올라가.

## 쇼케이스 체크리스트

위 Interactive Showcase는 설명용 목업이 아니라 실제 composition을 정적 파일로 두고 페이지 안에 직접 붙인 결과야. [HTML schema reference](https://hyperframes.heygen.com/reference/html-schema) 기준으로도 root composition에는 `data-composition-id`, 크기 정보, GSAP timeline 등록이 맞물려야 해.

- `Embedded Runtime`: 실제 composition 결과가 페이지 안에서 바로 보이는지 본다.
- `Prompt`와 `Generated HTML`: 입력이 HTML 구조로 바뀌는지 본다.
- `playhead`와 레이어 패널: `data-start`, `data-duration`, track 개념이 읽히는지 본다.
- `packages`와 `catalog`: CLI, renderer, studio, player, block 흐름이 한 번에 이해되는지 본다.

## 시작 전에 체크할 것

- 2026-04-18 기준 저장소 stars는 3,218이고 최신 릴리스는 v0.4.4야. 숫자는 자주 바뀌니까 날짜와 같이 봐야 해.
- 라이선스는 [Apache](/ko/wiki/apache/) 2.0이야. 상용 프로젝트 검토에선 이 점이 꽤 편한 편이야.
- `preview`는 개발용이고, 정적 배포는 composition HTML을 따로 다뤄야 해. AIKI에선 그 파일을 iframe으로 바로 붙였어.
- 에이전트 친화적이라는 말은 무인 자동화 보장이라는 뜻이 아니야. render 실패, 코덱 문제, 폰트 누락, safe area 실수는 여전히 사람 몫이야.
