---
title: Activepieces
slug: activepieces
lang: ko
category: tool
summary: >-
  Activepieces는 Zapier류 visual workflow builder에 TypeScript piece framework와 MCP server를 붙인
  open-source automation platform이야. 현업은 flow를 만지고, 개발자는 integration과 권한 경계를 잡아야 하는 팀이면 여기서 먼저 걸러 봐.
readerValue: >-
  Activepieces를 Zapier 대체재로만 볼지, MCP와 TypeScript piece까지 묶은 self-host automation
  runtime으로 볼지 가르는 기준.
githubUrl: 'https://github.com/activepieces/activepieces'
showcaseComponent: activepieces
tags:
  - workflow-automation
  - mcp
  - no-code
  - typescript
  - self-host
stars: 21900
license: MIT / Commercial
version: v0.82.1
contentStatus: final
draft: false
date: '2026-04-28'
edition: ai
factCheck:
  status: passed
  date: '2026-04-28'
  sources:
    - url: 'https://github.com/activepieces/activepieces'
      title: Activepieces repository page
    - url: 'https://raw.githubusercontent.com/activepieces/activepieces/main/README.md'
      title: Activepieces README
    - url: 'https://www.activepieces.com/docs/install/options/docker'
      title: Activepieces Docker install docs
    - url: 'https://www.activepieces.com/docs/mcp/overview'
      title: Activepieces MCP Server docs
    - url: 'https://www.activepieces.com/docs/build-pieces/building-pieces/piece-definition'
      title: Activepieces Create Piece Definition docs
    - url: 'https://www.activepieces.com/docs/flows/building-flows'
      title: Activepieces Building Flows docs
    - url: 'https://www.activepieces.com/mcp'
      title: Activepieces MCP catalog page
    - url: 'https://hub.docker.com/r/activepieces/activepieces'
      title: activepieces/activepieces Docker Hub image page
    - url: 'https://syncgtm.com/blog/activepieces-review'
      title: SyncGTM Activepieces Review 2026
  checks:
    - type: source_match
      result: pass
      sources: 6
      summary: 'README와 공식 docs로 제품 정의, flow 구조, piece 확장, MCP 연결, self-host 경로를 맞춰 봤어.'
      items:
        - >-
          README에서 TypeScript piece framework로 확장되는 all-in-one AI automation 도구라는 설명과, pieces가 MCP server로도 쓰인다는 점을 확인했어.
        - >-
          flow docs에서 flow가 trigger와 action으로 구성되는 기본 실행 단위를 확인했어.
        - >-
          piece docs에서 `npm run cli pieces create`로 TypeScript piece package를 만드는 공식 확장 경로를 확인했어.
        - >-
          MCP docs에서 Settings의 MCP Server URL을 client config에 넣고 OAuth로 인증하는 흐름을 확인했어.
        - >-
          Docker docs에서 단일 image가 PGLite와 memory queue를 쓰는 개인 테스트용이고, production/multi-instance는 PostgreSQL과 Redis 쪽을 보라는 제한을 확인했어.
    - type: web_cross_check
      result: pass
      sources: 4
      summary: >-
        공식 문서만으로 끝내지 않고 GitHub, Docker Hub, SyncGTM review까지 같이 봤어. 외부 출처는 repo 상태, container 배포면, 시장 포지션 확인에만 썼어.
      items:
        - >-
          GitHub repo와 README는 open-source automation, MCP, TypeScript piece framework를 같은 핵심 축으로 보여 줘.
        - >-
          Docker Hub는 activepieces/activepieces image를 open-source business automation tool로 싣고, self-host Docker 경로와 MIT/Enterprise license 경계를 같이 보여 줘.
        - >-
          SyncGTM review는 Activepieces를 open-source workflow automation, visual builder, self-hosting capability로 읽어. 공식 docs의 self-host/visual builder 축과 크게 어긋나지 않아.
        - >-
          integration 숫자는 출처마다 차이가 커. 그래서 300+, 690+ 같은 숫자는 규모감으로만 두고, 도입 판단의 핵심 근거로 쓰지 않았어.
    - type: number_verify
      result: pass
      sources: 4
      summary: '도입 판단에 직접 닿는 숫자와, 단순 인기 지표를 갈라서 적었어.'
      items:
        - '[GitHub repository page] 2026-04-28 확인 시 latest release는 2026-04-24 게시 `0.82.1`. 새 page version도 이 값에 맞췄어.'
        - '[Activepieces Docker docs] 단일 Docker image는 PGLite + memory queue라 개인 테스트용. production/multi-instance는 PostgreSQL + Redis 기준으로 다시 봐야 해.'
        - '[Docker Hub] activepieces/activepieces image는 1M+ pulls로 표시돼. self-host 검토 때 container 배포면이 이미 열려 있다는 정도로만 읽어.'
        - '[GitHub repository page] stars 21.9k, forks 3.6k, TypeScript 99.4%. 인기도와 구현 언어 확인용이지 기능 보증으로 쓰진 않았어.'
        - '[Activepieces MCP catalog page] 690+ integrations, 280+ MCPs, `Showing 690 MCPs`가 함께 보여. 숫자가 움직이는 영역이라 page copy에서는 280+/690+를 도입 결론으로 밀지 않았어.'
    - type: adversarial
      result: pass
      sources: 4
      summary: '맞는 팀과 아닌 팀을 self-host 운영 책임, builder 거버넌스, license 경계로 나눠 봤어.'
      items:
        - >-
          단일 Docker image는 PGLite와 memory queue 기반 개인 테스트용이야. production이나 multi-instance 판단은 PostgreSQL과 Redis 전제로 다시 봐야 해.
        - >-
          MCP는 OAuth, project-scoped operation, secret 미노출을 전제로 해. 그래도 assistant가 flow를 만들고 publish하는 권한은 조직 쪽에서 따로 좁혀야 해.
        - >-
          Community Edition은 MIT, enterprise features는 Commercial License로 갈라져. self-host 가능 여부와 enterprise 기능 접근을 같은 것으로 보면 안 돼.
        - >-
          code-first workflow engine이 필요한 팀에겐 builder layer가 장점이 아니라 추가 운영 표면이 될 수 있어.
guideVersion:
  tone: "2.0.0"
  common: "2.3.0"
  projects: "4.2.0"
formatVersion: 2
reviewStamp:
  panelVersion: "1.1.0"
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
  contentHash: "f75ce04cc4614474"
  reviewedAt: "2026-04-28"
---

## takeaway

- Activepieces는 visual flow builder, AI/[MCP](/ko/wiki/mcp/) 연결, TypeScript piece framework를 한 automation platform 안에 묶어.
- 먼저 볼 팀은 현업이 flow를 직접 고치고 개발자가 custom integration, 권한, self-host 운영면을 잡아야 하는 팀이야.
- 단일 Docker image는 빠른 테스트용이야. 2026-04-28 기준 latest release는 `0.82.1`이고, production은 PostgreSQL, Redis, worker, webhook URL, backup 절차를 따로 잡아.

## USE / SKIP

### USE

- Zapier류 workflow를 self-host하거나 open-source runtime 위에서 검토해야 할 때.
- assistant가 flow, table, run을 다루는 [MCP](/ko/wiki/mcp/) 기반 운영 실험을 하고 싶을 때.
- 기성 integration 밖의 [API](/ko/wiki/api/)를 TypeScript piece로 계속 붙여야 할 때.

### SKIP

- 모든 workflow를 git, typed code, CI/CD 안에서만 관리해야 할 때.
- DB, queue, upgrade, webhook 운영을 직접 보고 싶지 않을 때.
- AI assistant가 자동화를 수정하는 권한 모델을 아직 좁히지 못했을 때.

## cases

### flow builder

- 공식 docs 기준 flow는 trigger와 action으로 구성돼.
- 첫 검증은 webhook lead 한 건을 넣고, AI 분류 뒤 Slack 알림이나 review queue로 갈라지는 run history가 남는지 보면 돼.
- 판단 포인트는 UI보다 run history, retry, versioning, branch가 운영자에게 충분히 읽히는지야.

### MCP server

- [MCP](/ko/wiki/mcp/) docs는 Settings에서 MCP Server를 켜고 client config에 server URL을 넣는 흐름을 보여 줘.
- OAuth, project scope, secret 미노출을 기본 전제로 보지만, flow 생성과 publish 권한은 조직 정책으로 따로 좁혀야 해.

### TypeScript piece

- `npm run cli pieces create`로 community/custom piece를 만들고 action, trigger, auth를 붙여.
- 단순 HTTP 호출은 HTTP action으로 끝내고, 재사용과 versioning이 필요한 integration만 piece로 키우는 편이 나아.

### self-host

- Docker docs의 단일 image는 PGLite와 memory queue라 개인 테스트용이야. Docker Hub의 1M+ pulls는 “배포면이 열려 있다” 정도로만 읽어.
- production이나 multi-instance는 Docker Compose, PostgreSQL, Redis 기준으로 다시 산정해.

## compare

- Zapier / Make: hosted automation과 큰 app marketplace가 최우선이면 더 자연스러워.
- [n8n](/ko/wiki/n8n/): self-host workflow automation을 비교할 때 직접 붙는 대안이야.
- Temporal / custom workers: 긴 실행, compensation, typed workflow가 핵심이면 code-first engine 쪽이 맞아.
