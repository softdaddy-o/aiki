---
title: "HyperFrames"
slug: "hyperframes"
lang: "ko"
category: "framework"
summary: "HTML로 비디오 컴포지션을 만들고 브라우저에서 미리 본 뒤 MP4로 렌더링하는 에이전트 친화형 오픈소스 프레임워크"
readerValue: "HyperFrames를 쓰려는 사람이 에이전트 기반 작성 흐름, 수동 CLI 워크플로우, HTML 조합 방식, 필요한 런타임과 패키지 구성을 빠르게 파악할 수 있습니다."
githubUrl: "https://github.com/heygen-com/hyperframes"
showcaseComponent: "hyperframes"
tags: ["html", "video", "typescript", "ffmpeg", "gsap"]
stars: 2760
license: "Apache-2.0"
version: "v0.4.3"
contentStatus: "final"
draft: false
date: "2026-04-18"
edition: "ai"
---

## 무엇을 할 수 있나

- HTML과 `data-*` 속성만으로 비디오, 이미지, 오디오 레이어를 조합한 영상 컴포지션을 만들 수 있어.
- 브라우저에서 라이브 프리뷰를 보면서 수정하고, 최종 결과는 로컬이나 Docker 환경에서 MP4로 렌더링할 수 있어.
- `npx skills add heygen-com/hyperframes`로 에이전트용 스킬을 설치하면 Claude Code, Cursor, Gemini CLI, Codex 같은 도구가 HyperFrames 문법과 GSAP 애니메이션 패턴을 더 정확히 쓰게 할 수 있어.
- `hyperframes add` 명령으로 소셜 오버레이, 셰이더 전환, 데이터 시각화 블록 같은 카탈로그 컴포넌트를 바로 붙일 수 있어.
- CLI, 코어, 렌더링 엔진, 스튜디오 UI, 플레이어, 셰이더 전환 패키지가 분리돼 있어서 필요한 수준만 골라 쓸 수 있어.

## 왜 HyperFrames인가

HyperFrames의 핵심은 "영상도 HTML로 쓴다"는 점이야. React 전용 컴포지션 DSL이나 독자적인 영상 문법 대신, HTML과 데이터 속성으로 타임라인을 기술하고 브라우저 프리뷰와 렌더링 엔진을 연결해. 그래서 웹 개발자나 코딩 에이전트가 이미 잘 다루는 문법으로 바로 영상 제작 흐름에 들어갈 수 있어.

저장소가 특히 강조하는 건 에이전트 친화성, 비대화형 CLI, 그리고 결정론적 렌더링이야. 같은 입력이면 같은 결과를 내는 자동화 파이프라인을 전제로 설계돼 있어서, 반복 생성이나 배치 렌더링 워크플로우와 잘 맞는 편이야.

## 주요 기능

- **에이전트 우선 워크플로우**: 스킬을 설치하면 프롬프트만으로 컴포지션 작성, 애니메이션, 렌더링까지 연결할 수 있어.
- **수동 CLI 워크플로우**: `npx hyperframes init`, `preview`, `render`만으로 기본 프로젝트를 시작할 수 있어.
- **HTML 기반 컴포지션**: `data-start`, `data-duration`, `data-track-index` 같은 속성으로 타이밍과 레이어를 정의해.
- **확장 패키지 구성**: `@hyperframes/core`, `@hyperframes/engine`, `@hyperframes/producer`, `@hyperframes/studio`, `@hyperframes/player` 등으로 구성돼 있어.
- **카탈로그 제공**: 소셜 UI, 차트, 전환 효과, 시네마틱 블록 등 50개 이상 준비된 블록을 붙일 수 있어.

## 주의점

- **런타임 요구사항이 분명해**: 공식 README 기준으로 Node.js 22 이상과 FFmpeg가 필요해.
- **렌더링은 로컬 책임이 커**: 클라우드 SaaS가 아니라 로컬 또는 Docker 렌더링 흐름이 기본이어서, 자산 준비와 실행 환경 관리는 직접 해야 해.
- **에이전트 결과물은 최종 검수가 필요해**: 스킬이 HyperFrames 패턴을 잘 가르쳐 주긴 하지만, 장면 길이, 타이밍, 자막, 미디어 저작권까지 자동으로 보증해 주는 건 아니야.
- **버전 변화가 빠른 편이야**: 저장소가 활발히 업데이트되고 릴리스도 잦아서, 카탈로그 블록이나 CLI 옵션은 실제 사용하는 버전에 맞춰 문서를 같이 봐야 해.
