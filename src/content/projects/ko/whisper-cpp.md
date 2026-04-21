---
title: whisper.cpp
slug: whisper-cpp
lang: ko
category: library
summary: 'whisper.cpp는 Whisper를 C/C++로 옮겨서 CPU, Metal, CUDA, Vulkan, Core ML 같은 로컬 백엔드에서 직접 돌리게 해 주는 음성 인식 스택이다.'
readerValue: '이 페이지는 whisper.cpp를 오프라인 음성 인식과 자체 호스팅 STT에 바로 붙일지, 아니면 managed speech API나 다른 런타임으로 갈지 판단하려는 팀을 위한 빠른 도입 판정표다.'
githubUrl: 'https://github.com/ggml-org/whisper.cpp'
showcaseComponent: whisper-cpp
tags:
  - c-plus-plus
  - speech-to-text
  - on-device
  - metal
  - cuda
stars: 48830
license: MIT
version: v1.8.4
contentStatus: final
draft: false
date: '2026-04-21'
edition: ai
factCheck:
  status: passed
  date: '2026-04-21'
  sources:
    - url: 'https://github.com/ggml-org/whisper.cpp'
      title: whisper.cpp repository page
    - url: 'https://github.com/ggml-org/whisper.cpp/blob/master/README.md'
      title: whisper.cpp README
    - url: 'https://github.com/ggml-org/whisper.cpp/releases/tag/v1.8.4'
      title: whisper.cpp v1.8.4 release
    - url: 'https://github.com/ggml-org/whisper.cpp/blob/master/models/README.md'
      title: whisper.cpp model documentation
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: 'README와 release를 다시 맞춰봤어. whisper.cpp는 hosted STT보다 로컬 inference runtime에 가깝고, 핵심은 plain C/C++ 구현과 폭넓은 backend 선택지야.'
      items:
        - 'README는 whisper.cpp를 OpenAI Whisper의 high-performance C/C++ port로 소개한다.'
        - '공식 quick start는 clone, `download-ggml-model.sh`, CMake build, `whisper-cli` 실행 순서를 그대로 제시한다.'
        - 'README는 CPU-only, Metal, Core ML, CUDA, Vulkan, OpenVINO, WASM, Docker, server example, VAD를 모두 공식 확장 경로로 올린다.'
    - type: web_cross_check
      result: pass
      sources: 3
      summary: '문서 안의 확장 경로도 분명하다. 기본 CLI에서 끝나지 않고 VAD, server, bindings, Docker, mobile까지 같은 repo 안에서 이어진다.'
      items:
        - 'README에는 `whisper-cli`, `whisper-server`, `whisper-stream`, `whisper-bench` 같은 example 진입점이 정리돼 있다.'
        - 'VAD는 별도 Silero model 다운로드와 `--vad` 옵션 조합으로 붙인다.'
        - 'Docker usage도 model volume mount와 `whisper-server` 실행 예시까지 같이 제시한다.'
    - type: number_verify
      result: pass
      sources: 3
      summary: '가변 숫자는 2026-04-21 기준으로 다시 확인했어.'
      items:
        - 'GitHub API 기준 repository stars는 48,830이다.'
        - 'latest release는 2026-03-19에 게시된 `v1.8.4`다.'
        - 'README 메모리 표 기준 `base` 모델은 disk 142 MiB, memory 약 388 MB다.'
    - type: adversarial
      result: pass
      sources: 3
      summary: '이 페이지의 비교 판단에는 공식 구조에서 읽은 추론도 들어간다. whisper.cpp는 backend와 model 파일을 팀이 직접 관리할수록 강하고, managed STT처럼 운영 책임을 넘기고 싶을수록 장점이 줄어든다.'
      items:
        - '모델 다운로드, build flags, audio 전처리, backend 선택을 팀이 직접 쥐고 갈 생각이 있어야 whisper.cpp의 이점이 산다.'
        - 'managed speech API처럼 diarization, 저장, 모니터링, SLA를 통째로 기대하면 이 repo의 책임 범위보다 바깥이다.'
        - '그래서 이 페이지는 whisper.cpp를 offline and self-hosted STT runtime으로 먼저 평가한다.'
guideVersion:
  common: '3.0.0'
  projects: '3.0.0'
reviewStamp:
  panelVersion: '1.0.0'
  agentVersions:
    beginner-editor: '1.0.0'
    fact-checker: '1.0.0'
    skeptical-critic: '1.1.0'
    tone-editor: '1.3.0'
    structure-editor: '1.1.0'
  panelVerdict: pass
  contentHash: '67493fcde8165415'
  reviewedAt: '2026-04-21'
---

## 한 줄 판단

whisper.cpp는 "Whisper를 로컬에서 얼마나 직접 쥘 건가"에 대한 답에 가깝다. 2026년 4월 21일 기준 공식 README도 plain C/C++ implementation, CPU-only, Metal, Core ML, CUDA, Vulkan, OpenVINO, WASM, Docker, server example까지 한 repo 안에 묶어 둔다. 그래서 이 프로젝트를 볼 때는 단순히 정확도보다 오프라인, 온디바이스, self-hosted 제어권이 필요한지부터 보면 된다.

## 바로 맞는 팀

첫째, 오디오를 외부 API로 보내기 어렵거나 보내고 싶지 않은 팀. 둘째, Apple Silicon이나 NVIDIA GPU처럼 이미 손에 쥔 하드웨어에 맞춰 backend를 고르고 싶은 팀. 셋째, C/C++, 모바일, WebAssembly, Docker, 자체 server처럼 같은 코어를 여러 배포 경로로 재사용하려는 팀. whisper.cpp가 오래 살아남는 이유도 이 portability에 있다.

## 바로 안 맞는 팀

managed speech API처럼 업로드, diarization, 저장, 모니터링, 운영 SLA까지 통째로 받고 싶은 팀이면 whisper.cpp만으로는 부족하다. build flag, model file, ffmpeg 전처리, backend 선택을 직접 다루고 싶지 않아도 마찬가지야. 이 repo는 inference runtime에 강하지, 전체 speech platform을 대신해 주는 쪽은 아니다.

## 10분 검증

이번에는 quick start를 설명만 하지 않고 릴리스 바이너리로 바로 돌려 봤어. Windows x64 릴리스의 `whisper-cli.exe`에 `ggml-tiny.en.bin`과 repo 기본 샘플인 `samples/jfk.wav`를 넣고 `--no-gpu`로 실행하자, 11초 샘플이 `And so my fellow Americans ask not what your country can do for you...`로 전사됐고 total time은 903.41 ms였다. 이어서 `whisper-server.exe`를 같은 tiny 모델로 띄워 보니 루트 `/`에 기본 HTML form이 바로 열렸고, Playwright로 `jfk.wav`를 업로드했을 때 `/inference` 응답 본문도 같은 문장을 텍스트로 돌려줬다.

샘플 출처도 이번에 정리했어. `jfk.wav`는 내가 임의로 구한 파일이 아니라 whisper.cpp repo의 `samples/jfk.wav`와 `samples/jfk.mp3`다. 여기에 더해 이 환경의 `Microsoft Heami Desktop - Korean` 음성으로 14.3초짜리 한국어 샘플을 새로 만들고 16 kHz mono WAV로 맞춘 뒤, `ggml-base.bin`과 `-l ko`로 돌려 봤다. 제품명 `whisper cpp`를 `위스포시피피`처럼 한 군데는 살짝 틀렸지만 나머지 문장은 그대로 읽었고 total time은 2421.81 ms였다.

즉, 이 프로젝트는 "빌드가 되나?"보다 "release binary만으로도 우리 장비에서 어느 정도로 바로 쓸 수 있나?"를 먼저 확인해도 충분히 감이 온다. 영어 repo 기본 샘플과 한국어 로컬 샘플을 같이 붙여 보면 언어별 출발선 감각도 빨리 잡힌다. 다만 base 이상 모델로 올라가면 메모리 감각이 달라지기 때문에, 운영 판단은 여전히 model size를 같이 봐야 한다.

```bash
whisper-cli.exe -m .\models\ggml-tiny.en.bin -f .\jfk.wav --no-gpu
whisper-server.exe --host 127.0.0.1 --port 18091 --model .\models\ggml-tiny.en.bin --no-gpu
```

mp3나 다른 포맷이 바로 안 들어오면 README가 안내하는 대로 ffmpeg로 16-bit WAV로 바꾸면 된다.

## 운영에서 먼저 볼 것

운영 판단은 model size와 backend 선택에서 거의 끝난다. README 메모리 표 기준 `base`는 약 388 MB, `small`은 약 852 MB, `medium`은 약 2.1 GB, `large`는 약 3.9 GB라서 모델을 한 단계만 올려도 체감이 크게 달라진다. 여기에 Metal, CUDA, OpenVINO, Vulkan, Core ML, VAD, server, Docker 같은 확장 경로가 붙으니, "우리 팀은 어디까지 직접 운영할 건가"를 먼저 정해야 한다.

## 최종 판단

whisper.cpp는 로컬과 self-hosted STT에서 여전히 제일 실용적인 축 중 하나다. 오프라인 처리, 하드웨어별 backend 제어, 경량 배포, C/C++ 통합이 중요하면 바로 실험할 가치가 있다. 반대로 결과만 빨리 받고 운영 책임을 줄이고 싶다면 managed API나 더 높은 수준의 speech platform이 더 편할 수 있다.
