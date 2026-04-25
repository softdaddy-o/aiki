---
title: whisper.cpp
slug: whisper-cpp
lang: ko
category: library
summary: 'Whisper를 로컬 장비와 자체 서버에 붙일 때 바로 쓰는 C/C++ 런타임.'
readerValue: '오프라인 음성 인식과 자체 호스팅 STT로 갈지, managed speech API로 넘길지 가르는 기준.'
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
    - url: '/whisper-cpp/jfk.wav'
      title: 'whisper.cpp showcase sample: repo jfk.wav'
    - url: '/whisper-cpp/ko-sample.wav'
      title: 'whisper.cpp showcase sample: local Korean ko-sample.wav'
  checks:
    - type: source_match
      result: pass
      sources: 4
      summary: 'README와 release를 다시 맞춰봤어. whisper.cpp는 hosted STT보다 로컬 inference runtime 쪽이고, 핵심은 plain C/C++ 구현과 폭넓은 backend 선택지거든.'
      items:
        - 'README는 whisper.cpp를 OpenAI Whisper의 high-performance C/C++ port로 소개한다.'
        - '공식 quick start는 clone, `download-ggml-model.sh`, CMake build, `whisper-cli` 실행 순서를 그대로 제시한다.'
        - 'README는 CPU-only, Metal, Core ML, CUDA, Vulkan, OpenVINO, WASM, Docker, server example, VAD를 모두 공식 확장 경로로 올린다.'
    - type: web_cross_check
      result: pass
      sources: 3
      summary: 'README를 따라 CLI에서 VAD, server, bindings, Docker, mobile로 이어지는 확장 경로를 다시 봤어.'
      items:
        - 'README에는 `whisper-cli`, `whisper-server`, `whisper-stream`, `whisper-bench` 같은 example 진입점이 정리돼 있다.'
        - 'VAD는 별도 Silero model 다운로드와 `--vad` 옵션 조합으로 붙인다.'
        - 'Docker usage도 model volume mount와 `whisper-server` 실행 예시까지 같이 제시한다.'
    - type: number_verify
      result: pass
      sources: 3
      summary: '공식 웹에서 바로 확인되는 숫자는 2026-04-21 기준으로 다시 적어 뒀어.'
      items:
        - '[공식 웹] GitHub API 기준 repository stars는 48,830이다.'
        - '[공식 웹] latest release는 2026-03-19에 게시된 `v1.8.4`다.'
        - '[공식 웹] README 메모리 표 기준 `base` 모델은 disk 142 MiB, memory 약 388 MB다.'
    - type: number_verify
      result: pass
      summary: 'repo 기본 샘플과 Windows x64 로컬 실행 근거는 이번 테스트 관찰값으로 따로 묶었어.'
      items:
        - '[lab observation | repo sample] Windows x64 release `whisper-cli.exe -m .\models\ggml-tiny.en.bin -f .\jfk.wav --no-gpu` 실행에서 11초 `samples/jfk.wav`가 전사됐고 total time 로그는 903.41 ms였다.'
        - '[lab observation | repo sample] 같은 tiny.en 모델로 `whisper-server.exe --host 127.0.0.1 --port 18091 --model .\models\ggml-tiny.en.bin --no-gpu`를 띄웠을 때 루트 `/` HTML form과 `/inference` text 응답을 확인했다.'
        - '[lab observation | repo sample] CLI 로그에는 `whisper_backend_init_gpu: no GPU found`가 찍혀 CPU-only 출발선으로 확인했다.'
    - type: number_verify
      result: pass
      summary: '자체 제작 한국어 샘플 결과는 repo 샘플과 분리해서 남겼어.'
      items:
        - '[lab observation | ko sample] 로컬 `ko-sample.wav`는 `Microsoft Heami Desktop - Korean` 음성으로 만든 14.3초 16 kHz mono WAV다.'
        - '[lab observation | ko sample] Windows x64 release `whisper-cli.exe`에 `ggml-base.bin`과 `-l ko`를 써서 실행했을 때 total time 로그는 2421.81 ms였다.'
        - '[lab observation | ko sample] 전사 결과는 제품명 `whisper cpp`를 `위스포시피피`처럼 한 번 다르게 읽고, 나머지 문장은 그대로 인식했다.'
    - type: adversarial
      result: pass
      sources: 3
      summary: 'backend, model file, audio path를 직접 쥘 때만 장점이 커지는지, managed STT와 어디서 갈리는지 다시 봤어.'
      items:
        - '모델 다운로드, build flags, audio 전처리, backend 선택을 팀이 직접 쥐고 갈 생각이 있어야 whisper.cpp의 이점이 산다.'
        - 'managed speech API처럼 diarization, 저장, 모니터링, SLA를 통째로 기대하면 이 repo의 책임 범위보다 바깥이다.'
        - '그래서 첫 비교 축도 offline and self-hosted STT runtime에 두고 잡았다.'
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  projects: "4.2.0"
formatVersion: 2
reviewStamp:
  panelVersion: 1.1.0
  agentVersions:
    beginner-editor: "1.0.0"
    fact-checker: "1.0.0"
    skeptical-critic: "1.1.0"
    tone-editor: "1.6.0"
    structure-editor: "1.1.0"
  guideVersions:
    tone: "2.0.0"
    common: "2.3.0"
    projects: "4.2.0"
  panelVerdict: pass
  contentHash: "67e1b7e2462b2741"
  reviewedAt: "2026-04-25T09:56:00Z"
---
## 한 줄 판단

whisper.cpp를 볼 때 첫 질문은 "[Whisper](/ko/wiki/whisper/)를 로컬에서 직접 쥘 건가"야. 2026년 4월 21일 기준 공식 README도 plain C/C++ implementation, CPU-only, Metal, Core ML, CUDA, Vulkan, OpenVINO, WASM, Docker, server example까지 한 repo 안에 묶어 두거든. 그래서 이 프로젝트는 단순 정확도보다 오프라인, [온디바이스](/ko/wiki/on-device/), self-hosted 제어권이 필요한지부터 보는 편이 맞아.

## 바로 맞는 팀

첫째, 오디오를 외부 [API](/ko/wiki/api/)로 보내기 어렵거나 보내고 싶지 않은 팀. 둘째, Apple Silicon이나 NVIDIA GPU처럼 이미 손에 쥔 하드웨어에 맞춰 backend를 고르고 싶은 팀. 셋째, C/C++, 모바일, WebAssembly, Docker, 자체 server처럼 같은 코어 [런타임](/ko/wiki/runtime/)을 여러 배포 경로로 재사용하려는 팀. whisper.cpp가 오래 살아남는 이유도 이 portability에 있다.

## 바로 안 맞는 팀

managed speech [API](/ko/wiki/api/)처럼 업로드, diarization, 저장, 모니터링, 운영 SLA까지 통째로 받고 싶은 팀이면 whisper.cpp만으로는 부족해. build flag, model file, ffmpeg 전처리, backend 선택을 직접 다루고 싶지 않아도 마찬가지고. 이 repo는 [추론](/ko/wiki/inference/) [런타임](/ko/wiki/runtime/)에 강하지, 전체 speech platform을 대신해 주는 쪽은 아니야.

## 10분 검증

이번에는 quick start를 설명만 하지 않고 릴리스 바이너리로 바로 돌려 봤어. Windows x64 릴리스의 `whisper-cli.exe`에 `ggml-tiny.en.bin`과 repo 기본 샘플인 `samples/jfk.wav`를 넣고 `--no-gpu`로 실행했을 때, 이번 테스트 기준으로 11초 샘플이 `And so my fellow Americans ask not what your country can do for you...`로 전사됐고 total time 로그는 903.41 ms였다. 이어서 로컬 [런타임](/ko/wiki/runtime/) 경로를 확인하려고 `whisper-server.exe`를 같은 tiny 모델로 띄워 보니 루트 `/`에 기본 HTML form이 바로 열렸고, Playwright로 `jfk.wav`를 업로드했을 때 `/inference` 응답 본문도 같은 문장을 텍스트로 돌려줬다.

샘플 출처도 이번에 정리했어. `jfk.wav`는 내가 임의로 구한 파일이 아니라 [Whisper](/ko/wiki/whisper/)용 whisper.cpp repo의 `samples/jfk.wav`와 `samples/jfk.mp3`다. 여기에 더해 로컬 [온디바이스](/ko/wiki/on-device/) [추론](/ko/wiki/inference/) 감각을 보려고 이 환경의 `Microsoft Heami Desktop - Korean` 음성으로 14.3초짜리 한국어 샘플을 새로 만들고 16 kHz mono WAV로 맞춘 뒤, `ggml-base.bin`과 `-l ko`로 돌려 봤다. 이번 테스트에서는 제품명 `whisper cpp`를 `위스포시피피`처럼 한 군데만 살짝 틀렸고, 나머지 문장은 그대로 읽었으며 total time 로그는 2421.81 ms였다.

즉, 이 프로젝트는 "빌드가 되나?"보다 "release binary만으로도 우리 장비에서 어느 정도로 바로 쓸 수 있나?"를 먼저 확인해도 감이 와. 영어 repo 기본 샘플과 한국어 로컬 샘플을 같이 붙여 보면 언어별 출발선 감각도 빨리 잡히거든. 다만 base 이상 모델로 올라가면 메모리 감각이 달라지기 때문에, 운영 판단은 여전히 model size를 같이 봐야 해.

```bash
whisper-cli.exe -m .\models\ggml-tiny.en.bin -f .\jfk.wav --no-gpu
whisper-server.exe --host 127.0.0.1 --port 18091 --model .\models\ggml-tiny.en.bin --no-gpu
```

mp3나 다른 포맷이 바로 안 들어오면 README가 안내하는 대로 ffmpeg로 16-bit WAV로 바꾸면 된다.

## 운영에서 먼저 볼 것

운영 판단은 model size와 backend 선택에서 거의 끝난다. README 메모리 표 기준 `base`는 약 388 MB, `small`은 약 852 MB, `medium`은 약 2.1 GB, `large`는 약 3.9 GB라서 모델을 한 단계만 올려도 체감이 크게 달라진다. 여기에 Metal, CUDA, OpenVINO, Vulkan, Core ML, VAD, server, Docker 같은 확장 경로가 붙으니, "우리 팀은 어디까지 직접 [런타임](/ko/wiki/runtime/)을 운영할 건가"를 먼저 정해야 한다.

## 최종 판단

whisper.cpp는 로컬과 self-hosted STT에서 여전히 제일 실용적인 축 중 하나야. 오프라인 처리, 하드웨어별 backend 제어, 경량 배포, C/C++ 통합이 중요하면 바로 실험할 가치가 크거든. 결과만 빨리 받고 운영 책임을 줄이고 싶다면 managed [API](/ko/wiki/api/)나 더 높은 수준의 speech platform이 더 편할 거야.

## 같이 볼 용어

- [Whisper](/ko/wiki/whisper/): whisper.cpp가 어떤 모델 계열을 C/C++ 포팅으로 다루는지 먼저 정리할 때 같이 보면 좋아.
- [API](/ko/wiki/api/): 자체 호스팅 STT와 managed speech API를 어디서 가를지 판단할 때 바로 이어진다.
- [Inference](/ko/wiki/inference/): 모델 품질보다 실행 비용과 지연을 먼저 봐야 하는 이유를 붙여 읽기 좋다.
- [On-device AI](/ko/wiki/on-device/): 오프라인 처리와 프라이버시 장점이 실제로 어디서 생기는지 확인할 때 같이 보면 편하다.
- [Runtime](/ko/wiki/runtime/): 모델 자체와 그것을 실제 장비에서 돌리는 실행 계층을 구분할 때 바로 연결된다.
