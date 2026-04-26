---
title: "Llama.cpp, 같은 RTX 5080에서 Lubuntu가 Windows보다 18% 빨랐어"
date: "2026-04-27T09:30:00+09:00"
lang: ko
category: news
summary: "RTX 5080 + i9-14900KF 동일 하드웨어에서 Lubuntu 26.04가 평균 128 tok/s, Windows 11이 108 tok/s를 냈어. r/LocalLLaMA 벤치마크에서 약 18% 격차고, Vulkan 백엔드까지 합쳐도 Linux가 일관되게 앞섰어."
readerValue: "로컬 LLM을 Windows에서 돌릴지 듀얼부팅으로 갈지 결정선을 가를 수 있어."
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1sw2fjc/benchmark_windows_11_vs_lubuntu_2604_on_llamacpp/"
sourceTitle: "r/LocalLLaMA — Llama.cpp Windows 11 vs Lubuntu 26.04 Benchmark"
draft: false
score: 100
sourceCount: 3
factCheck:
  status: passed
  date: "2026-04-27"
  sources:
    - url: "https://www.reddit.com/r/LocalLLaMA/comments/1sw2fjc/benchmark_windows_11_vs_lubuntu_2604_on_llamacpp/"
      title: "r/LocalLLaMA — Benchmark: Windows 11 vs Lubuntu 26.04 on Llama.cpp"
    - url: "https://startupfortune.com/linux-crushes-windows-on-llamacpp-inference-by-double-digits/"
      title: "Startup Fortune — Linux crushes Windows on llama.cpp"
    - url: "https://www.it-boltwise.de/linux-uebertrifft-windows-bei-ki-inferenz-mit-llama-cpp.html"
      title: "IT Boltwise — Linux übertrifft Windows bei KI-Inferenz"
  checks:
    - type: source_match
      result: pass
      summary: "Reddit 원글 수치와 두 보도 매체의 인용을 일치 확인."
      items:
        - "하드웨어: RTX 5080 + i9-14900KF 동일 구성"
        - "Lubuntu 26.04 평균 128 tok/s, Windows 11 평균 108 tok/s"
        - "Vulkan 백엔드 결과까지 게시자가 추가했음"
    - type: web_cross_check
      result: pass
      sources: 3
      summary: "Reddit 원글 외 독립 보도 2건이 같은 수치를 인용."
      items:
        - "Startup Fortune: 15-25% 격차로 정리"
        - "IT Boltwise(독일): 같은 수치 재인용"
        - "두 매체가 평균 차이를 두 자릿수 percent로 동일하게 기술"
    - type: number_verify
      result: pass
      summary: "tok/s 절대값과 격차 비율을 정량 확인."
      items:
        - "(128 - 108) / 108 ≈ 18.5%"
        - "Startup Fortune의 '15-25% 격차'는 모델별 변동을 합한 범위"
        - "테스터가 본인을 'life-long Windows user'라고 명시 — 결과를 기대하지 않은 위치"
    - type: adversarial
      result: pass
      summary: "단일 사용자 벤치마크의 한계와 본인 인정 사항을 표시."
      items:
        - "단일 사용자가 본인 PC로 측정한 결과라 모집단 평균이 아님"
        - "Windows 11 GPU 드라이버, 백그라운드 프로세스 같은 변수 영향 가능"
        - "게시자가 'AI를 글 쓰는 데 도움 받았다'고 명시 — 분석 일부에 LLM 개입"
      findings:
        - "동일 RTX 5080 + i9-14900KF 한 세트의 결과라, 다른 GPU 세대에서 같은 격차가 날지는 별도 검증이 필요해"
        - "Vulkan과 CUDA 백엔드를 따로 보면 일부 모델에서 Windows가 더 가까이 붙는다는 보조 결과도 같이 있어"
tags: ["llama-cpp", "linux", "windows", "rtx-5080", "benchmark"]
formatVersion: 2
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  news: "3.1.2"
---
## 무슨 일이 일어났나

[r/LocalLLaMA](/ko/wiki/localllama/)에 평생 Windows를 써온 사용자가 [Lubuntu 26.04와 Windows 11을 같은 PC에서 비교한 [llama.cpp](/ko/wiki/llama.cpp/) 벤치마크](https://www.reddit.com/r/LocalLLaMA/comments/1sw2fjc/benchmark_windows_11_vs_lubuntu_2604_on_llamacpp/)를 올렸어. 하드웨어는 RTX 5080 + i9-14900KF로 고정. 평균 추론 속도는 Lubuntu가 128 tok/s, Windows가 108 tok/s. 약 18% 차이고, 본인도 이 정도일 줄은 몰랐다고 적었어.

이후 Vulkan 백엔드까지 추가로 돌려서 결과가 더 두꺼워졌어. CUDA든 Vulkan이든 Linux 쪽이 일관되게 앞섰다는 게 게시자 결론이야.

## 왜 이게 일어났나

llama.cpp 인퍼런스는 GPU 드라이버, 메모리 매니저, 시스템 콜 오버헤드 영향을 그대로 받아. Windows는 게임용 그래픽 드라이버 스택과 백그라운드 서비스가 같이 도는 환경이라 컨텍스트 스위칭 부담이 더 커. 같은 [llama.cpp](/ko/wiki/llama.cpp/) 바이너리라도 OS 쪽에서 깎이는 자원이 다른 거지.

[Startup Fortune](https://startupfortune.com/linux-crushes-windows-on-llamacpp-inference-by-double-digits/)이 이를 정리하면서 "double digits 격차"라고 표현했고, 모델별 변동을 합쳐 15-25% 범위로 봤어.

## 어떤 의미인가

로컬 LLM을 진지하게 돌리는 사람한테 OS 선택은 이제 취향이 아니라 비용이야. 같은 GPU에서 18% 더 짜낸다는 건 [추론](/ko/wiki/inference/) 한 번에 들어가는 전기와 시간이 그만큼 줄어든다는 뜻이지. 듀얼부팅을 깔아두거나 LLM 서버만 Linux로 분리하는 셋업이 합리적인 선택지로 들어와.

## 주의할 점

단일 사용자 벤치마크라는 점은 짚고 가야 해. RTX 5080 한 대에 본인 PC 환경의 결과니까 다른 GPU 세대에서 격차가 그대로 나오리란 보장은 없어. 도입 전에 본인 워크로드로 한 번 더 측정하는 게 안전해. 게시자도 "AI를 글 쓰는 데 도움 받았다"고 본문에 적어놨으니, 분석 부분은 참고용으로만 보면 돼.
