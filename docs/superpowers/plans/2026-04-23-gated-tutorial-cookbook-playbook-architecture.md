# AIKI Gated Tutorial / Cookbook / Playbook Architecture Plan

> **Related issue:** #24  
> **Status:** Brainstorm draft  
> **Date:** 2026-04-23

## Goal

Add first-class `tutorial`, `cookbook`, and `playbook` content to AIKI with support for both public teaser access and gated full-content access, without giving up AIKI's custom layout, animation, and motion design freedom.

This now includes a stronger requirement:

- Access is not only membership-based.
- Some content unlocks only when the user completes the prior tutorial's quiz or homework.
- The unlocking answer or key should be account-specific so simple answer-sharing does not trivially bypass progression.

## Constraints

- AIKI is currently an Astro site optimized for static output.
- Fully gated content cannot be safely shipped in pre-rendered static HTML.
- The new surfaces should stay inside AIKI, not move to a hosted newsletter archive or external membership CMS.
- Cost should stay close to zero for early rollout.
- Email-based sign-in is preferred over building a heavy credential system.
- Personalized quiz generation and unlock state require server-side logic and persistent user data from day one.

## Cost-efficiency principles

To keep the first release cheap, the architecture should explicitly avoid the expensive or complexity-heavy paths.

### Keep only one dynamic execution layer

Use:

- `Cloudflare Pages / Workers` for dynamic request handling
- `Supabase` for Auth + Postgres only

Avoid in phase 1:

- Supabase Edge Functions
- Cloudflare Durable Objects
- Cloudflare KV as a second state store
- Realtime subscriptions for progress UI

Reason:

- Every extra runtime increases both cost and debugging complexity.
- The progression system already needs one place to execute server logic. That place should be Cloudflare.

### Prefer derivation over storage

Use deterministic seeded challenge generation instead of storing a unique generated quiz payload for every user.

Store only:

- attempts
- unlocks
- durable progress state

Do not store:

- full rendered challenge variants per user
- duplicated lesson bodies per user

Reason:

- Lower storage
- Lower write volume
- Easier debugging

### Keep public shells static

- stage map shell should be mostly static
- teaser pages should be static
- only protected lesson payloads and personalized node state should be dynamic

Reason:

- Static delivery on Cloudflare is effectively the cheapest path in the system.

### Avoid expensive grading in phase 1

Use:

- exact-match grading
- deterministic seeded prompts
- server-side validation

Avoid:

- LLM grading
- arbitrary file uploads
- human review queues

Reason:

- Those features are expensive in both infra and operations.

### Delay billing until progression is proven

The first thing to validate is whether progression-gated content is compelling.
Do not add payment complexity before that is true.

## Product shape brainstorm

These categories should not all behave the same.

- **Tutorial**: linear teaching flow, step-by-step, usually better for onboarding and public discovery.
- **Cookbook**: copyable recipes, tighter structure, high utility, easy to gate by bundle or membership tier.
- **Playbook**: opinionated operating pattern, usually the highest-value and easiest paid candidate.

That suggests a default content ladder:

- `tutorial` leans public or member
- `cookbook` leans member
- `playbook` leans member or paid

It also suggests different page grammars:

- `tutorial`: progress framing, step index, checkpoints, embedded demos
- `cookbook`: ingredients / setup / steps / variations / failure cases
- `playbook`: scenario, constraints, decision tree, operating rules, metrics, failure modes

It also suggests a stronger navigation metaphor:

- not just a flat archive index
- a **stage map** or **world map** that shows where the learner is, what is unlocked, and what is still hidden

## Requirement shift: from gated content to progression-gated learning

There are now two separate gates:

- **Access gate**: public vs member vs paid
- **Progression gate**: whether this account has earned the next lesson key

That means the system is not just a paywall or member wall. It is a lightweight learning engine.

Implications:

- A static site alone is not enough.
- We need stored user progression state.
- We need challenge generation rules.
- We need answer checking logic.
- We need unlock records tied to user accounts, not shared globally.

## Progression model brainstorm

### Model A: raw answer string is the next key

**Shape**

- User submits a quiz or homework answer.
- That literal answer is also the code needed to open the next tutorial.

**Pros**

- The metaphor is simple and fun.
- Easy to explain.

**Cons**

- Fragile UX.
- Easy to leak if copied or screenshotted.
- Hard to rotate or invalidate.
- Hard to support multiple acceptable answers.

### Model B: correct answer grants a derived per-account unlock key

**Shape**

- User submits an answer.
- Server validates it.
- On pass, server creates an unlock record and optionally displays a personalized key phrase or badge.
- The next tutorial checks for that unlock on the account.

**Pros**

- Much stronger than shared raw answers.
- Better fit for account-based progression.
- Easier to evolve later into streaks, badges, and track progress.

**Cons**

- Slightly less romantic than the answer literally being the next password.
- Needs persistent unlock state.

### Progression recommendation

Use **derived per-account unlocks**.

The product can still present this as "your answer generated the next key", but the actual control plane should be an account-bound unlock record, not a reusable plaintext password.

## Personalized challenge brainstorm

### Option 1: deterministic seeded quiz variants

**Shape**

- Each challenge template contains parameters.
- Parameters are generated from a deterministic seed using `user_id + lesson_id + challenge_version`.
- The server computes the expected answer from that same seed.

Example:

- User A gets numbers `17` and `29`
- User B gets numbers `11` and `34`
- Same lesson, different answer

**Pros**

- Cheap to run
- No need to store every generated answer
- Strong fit for short-answer, numeric, multiple-choice, and logic tasks
- Good defense against casual answer sharing

**Cons**

- Works best when the exercise is parameterizable
- Not ideal for open-ended creative homework

### Option 2: pre-generated per-user variants stored in DB

**Shape**

- Generate and persist a full challenge variant row for each user and lesson.

**Pros**

- Easier debugging
- Stable audit trail
- Useful if question text varies more than a few seeded values

**Cons**

- More storage and orchestration
- Probably overkill in phase 1

### Option 3: freeform homework with rubric-based evaluation

**Shape**

- User submits text, link, file, or artifact.
- System or reviewer scores it against a rubric.

**Pros**

- Richer pedagogy
- Better fit for serious assignments

**Cons**

- Expensive
- Hard to automate well
- Opens moderation and quality disputes immediately

### Personalized challenge recommendation

Start with **deterministic seeded challenges** and keep phase-1 evaluation auto-gradable.

Good phase-1 formats:

- exact short text
- exact numeric answer
- parameterized multiple choice
- ordered-step selection
- small structured JSON or form output

Avoid in phase 1:

- essay grading
- arbitrary file upload
- subjective LLM-scored homework

## Learning graph brainstorm

### Linear chain

- Tutorial 1 -> Tutorial 2 -> Tutorial 3

**Pros**

- Simple
- Easy to communicate

**Cons**

- Less flexible later

### Directed graph

- Multiple prerequisites can unlock one node
- One tutorial can branch into multiple next nodes
- Several parallel tracks can later merge into a shared node

**Pros**

- Better long-term model
- Supports specialization paths

**Cons**

- More authoring complexity

### Learning graph recommendation

Model the system internally as a **directed graph**, even if phase 1 presents a mostly linear path.

That avoids painting the data model into a corner.

The graph model also naturally supports a stage-map UI.

This is not optional anymore. The product already needs branch and merge behavior such as:

- foundation node
- choose one of `antigravity`, `claude-code`, or `codex`
- later rejoin into a shared advanced node

So the graph model should be treated as a phase-1 requirement, not a future enhancement.

## Branching and merging rule model

The unlock system needs to support at least these semantics:

### Rule A: `ANY`

Unlock target node if the learner has completed **at least one** qualifying prerequisite.

Examples:

- take either `antigravity-01` or `claude-code-01`
- either path unlocks `agent-workflows-01`

### Rule B: `ALL`

Unlock target node only if the learner has completed **all** prerequisite nodes.

Examples:

- complete both `prompt-basics-01` and `tool-use-01`
- both are required before `automation-01`

### Rule C: grouped alternatives

Support branch groups without hardcoding path names into application logic.

Examples:

- one of `antigravity-01`, `claude-code-01`, `codex-01`
- any one of them unlocks `coding-agents-common-ground`

### Recommendation

Phase 1 should support:

- target node prerequisite mode: `any` or `all`
- multiple inbound edges per node

That is enough for the first real branching system without building an overly abstract rule engine.

## Stage map index brainstorm

### Why a stage map fits this product

A normal blog-style index is weak for progression-gated learning because it hides the sense of path, momentum, and earned access.

A stage map can show:

- current position
- completed nodes
- unlocked next nodes
- locked future nodes
- optional branches
- milestone gates
- earned keys, badges, or artifacts

This makes the gating feel like progression rather than denial.

### Option 1: simple linear stage rail

**Shape**

- A vertical or horizontal connected path
- Stage 1 -> Stage 2 -> Stage 3
- Each stage card has a clear state: locked / current / cleared

**Pros**

- Easy to build
- Easy to understand
- Strong fit for phase 1

**Cons**

- Less expressive for branching content later
- can mis-train users into expecting only one correct path

### Option 2: world map with branches

**Shape**

- Nodes placed across a stylized map or constellation
- Paths can branch into tutorial, cookbook, and playbook lanes

**Pros**

- Stronger identity
- Supports specialization and optional content
- More game-like and memorable

**Cons**

- More UI and layout complexity
- Harder to keep legible on mobile if done too literally

### Option 3: hybrid map

**Shape**

- A clean stage rail in mobile and narrow layouts
- A richer world-map composition on desktop

**Pros**

- Best practical balance
- Keeps the game feeling without sacrificing usability

**Cons**

- Requires two presentational modes

### Stage map recommendation

Use a **hybrid map**:

- phase 1 can visually behave like a polished linear stage rail
- the data model should support branchable world-map behavior later

Do not treat the index page as a generic card grid.

Important nuance:

- the first shipped UI may still look mostly linear for clarity
- but it should include at least one visible branch or optional lane early, so users understand the system is path-based rather than chapter-list based

## Architecture option matrix

### Option A: static teaser + protected full-content fetch

**Shape**

- Static route renders the public shell, teaser, metadata, CTA, and motion-heavy design.
- Full content is fetched from a protected endpoint after session and entitlement checks.

**Pros**

- Smallest dynamic surface area.
- Keeps the current site mostly static.
- Easiest way to preserve bold page design and animation.
- Cheap to operate.

**Cons**

- Full content arrives after initial paint.
- More client-state handling around loading, unauthenticated, and unauthorized states.
- SEO only applies to the teaser shell, not the protected body.

**Best fit**

- Phase 1 member-only library
- AIKI pages with custom motion and visual experiments
- progression-gated lessons where the shell can be static but the unlock check happens dynamically

### Option B: selective SSR for gated detail pages

**Shape**

- Gated detail routes render on demand at the edge.
- Cloudflare runtime checks session and entitlements before rendering full HTML.

**Pros**

- Cleaner mental model for access control.
- Full page HTML is server-rendered for authorized users.
- Better if member-specific page chrome or recommendations become important.

**Cons**

- Larger dynamic surface area.
- More cache and deployment complexity.
- Harder to keep the rest of the system purely static.

**Best fit**

- Later phase if gated pages become a major product surface
- Cases where member state is deeply tied to layout
- Cases where lesson state and progress chrome become part of the initial page render

### Option C: encrypted blob + shared password

**Shape**

- Static site ships encrypted content blobs.
- User enters a shared password in the client to decrypt content.

**Pros**

- Cheapest possible rollout.
- No auth backend required.
- Useful for private beta circulation.

**Cons**

- Password sharing is unavoidable.
- No real user identity.
- Weak fit for ongoing membership product behavior.

**Best fit**

- Temporary soft-launch or early-access preview only

### Option D: external CMS or newsletter-hosted archive

**Shape**

- Store the gated content outside AIKI and link or embed it.

**Pros**

- Fastest to start.
- Often includes auth and billing primitives.

**Cons**

- Weak fit for AIKI's design ambitions.
- Gives up UI and motion freedom.
- Splits brand and authoring workflows.

**Best fit**

- Not recommended for this project

## Storage brainstorm

### Storage option 1: full content in repo, teaser-only emitted publicly

**Shape**

- Source content stays in the repo.
- Build emits teaser only to static routes.
- Protected endpoint reads the full source server-side and renders authorized payloads.

**Pros**

- Best authoring continuity.
- Git remains the source of truth.
- Easy to review, diff, and back up.

**Cons**

- Requires discipline in the build pipeline so full bodies never leak into static output.
- Protected runtime needs file access or bundled server-safe access patterns.
- Challenge templates and evaluation logic need a clear authoring format, not just prose storage.

### Storage option 2: full content in Supabase Postgres

**Shape**

- Store gated body in database rows or document-like fields.

**Pros**

- Natural fit for entitlement checks.
- Easy to evolve into an internal editor later.

**Cons**

- Worse authoring ergonomics right now.
- Harder to review longform content in git.
- Not ideal for visually rich authored content at the current stage.

### Storage option 3: repo metadata + object/blob storage for full body

**Shape**

- Repo keeps teaser and metadata.
- Full body is stored in blob storage and fetched only when authorized.

**Pros**

- Clean separation between public and private payloads.
- Scales well for binary assets or packaged interactive lessons.

**Cons**

- More moving parts.
- Adds operational complexity too early.

### Storage recommendation

Start with **repo-authored source + protected runtime rendering**. It preserves AIKI's current workflow and keeps migration cost low.

Challenge templates should also live in the repo in phase 1, not the database.

## Authoring brainstorm

### Option 1: single source file with explicit teaser boundary

Example shape:

```md
---
title: ...
category: playbook
access: member
---

<!-- teaser:start -->
Public teaser content
<!-- teaser:end -->

<!-- gated:start -->
Full gated body
<!-- gated:end -->
```

**Pros**

- One file per entry.
- Easy for authors to reason about.
- Keeps teaser and full body aligned.

**Cons**

- Requires boundary parsing rules.
- Easy for authors to accidentally blur teaser and gated sections if rules are weak.

### Option 2: paired files

Example shape:

- `foo.public.mdx`
- `foo.member.mdx`

**Pros**

- Strong separation.
- Lower risk of accidental leakage.

**Cons**

- More authoring overhead.
- Metadata duplication risk.

### Authoring recommendation

Start with **single source + explicit teaser/full boundary markers**. It is the most practical fit for the current repo workflow.

For challenge-enabled lessons, extend the source shape with a challenge block rather than storing quiz logic elsewhere.

Possible direction:

```md
---
title: ...
category: tutorial
access: member
challengeType: seeded-short-answer
challengeVersion: 1
unlocks:
  - antigravity-01
  - claude-code-01
  - codex-01
---

<!-- teaser:start -->
...
<!-- teaser:end -->

<!-- gated:start -->
...
<!-- gated:end -->

<!-- challenge:start -->
Prompt template, rules, hints, and grading metadata
<!-- challenge:end -->
```

## Auth and entitlement brainstorm

### Auth

Recommended phase-1 auth:

- Supabase Auth
- email magic link
- optional password login later if user demand appears

Why:

- Lowest friction for end users
- No password-reset surface needed in phase 1
- Good fit for newsletter-adjacent audience behavior

### Entitlements

Minimal tables to expect:

- `profiles`
- `entitlements`
- `content_access_overrides` only if exceptions become necessary

For progression gating, that is not enough.

Additional tables or equivalents to expect:

- `learning_tracks`
- `learning_nodes`
- `learning_edges`
- `challenge_attempts`
- `node_unlocks`
- `user_progress`

Minimal entitlement model:

- site-wide `member`
- site-wide `paid`
- future per-item or per-bundle override only if the product actually needs it

Recommendation:

- Do not start with per-item purchases.
- Start with tier-based site access.

For progression:

- Access tier decides whether the user is allowed in the system at all.
- Unlock state decides which lesson comes next.

These should stay separate.

## Data model brainstorm

### Minimal phase-1 entities

**`learning_nodes`**

- lesson id
- slug
- category
- access tier required
- challenge template version
- map position metadata
- visual track or world id

**`learning_edges`**

- from node
- to node
- unlock type
- optional edge label or gate label

**`challenge_attempts`**

- user id
- node id
- generated seed
- submitted answer
- pass/fail
- score if relevant
- attempt number
- evaluated at

**`node_unlocks`**

- user id
- node id
- unlocked by node id
- unlock key phrase or token id
- unlocked at

### Seed generation direction

Use a deterministic seed derived from:

- stable user id
- lesson id
- challenge version
- server secret

That lets the server regenerate the personalized question and expected answer without storing full variant payloads for every user.

### Stage-map presentation data

The map view will likely need separate presentation metadata in addition to progression logic:

- node display title
- node subtitle or theme
- node icon / emblem
- map x/y position or ordered index
- world / chapter grouping
- node state per user: locked / unlocked / current / cleared
- whether the node is mandatory or optional

This data can live partly in repo-authored metadata and partly in derived user-state queries.

### Branch/merge progression metadata

To support non-linear paths cleanly, nodes also need progression metadata such as:

- `prerequisite_mode`: `any` or `all`
- optional `track_id` such as `antigravity`, `claude-code`, `codex`
- optional `chapter_id` or `world_id` for grouping merged content

This keeps branching logic declarative instead of hardcoded in route handlers.

## Unlock UX brainstorm

### Option 1: invisible unlock

- User passes challenge
- Next lesson just becomes available

**Pros**

- Smooth UX

**Cons**

- Loses the "this answer became your key" feeling

### Option 2: visible personalized key phrase

- User passes challenge
- System reveals a unique key phrase or token name
- Next lesson page recognizes that key on the account and may also show it in the UI

**Pros**

- Keeps the delight and ritual of earning a key
- Still uses secure account-bound unlocks underneath

**Cons**

- Slightly more UI work

### Unlock UX recommendation

Use **account-bound unlocks with a visible personalized key phrase**.

That preserves the story you want without making the raw answer itself the security primitive.

The stage map should reflect this immediately:

- newly unlocked node glows or animates
- previous node shows a cleared state
- earned key phrase or badge can appear on the node or in a progress tray

## Stage map UX requirements

### Core states

Every node on the map should clearly communicate one of:

- `locked`
- `available`
- `current`
- `cleared`
- `optional`
- `paid-locked` if monetization appears later

### Core interactions

- click current or available node to enter
- locked node shows prerequisite hint rather than a dead end
- cleared node can be revisited
- milestone nodes can show the earned key or completion artifact

### AIKI-specific UX direction

The map should feel intentional and authored, not like a generic LMS dashboard.

Promising visual directions:

- expedition map
- systems diagram
- constellation map
- lab progression rail

The point is not to mimic a game literally. The point is to make progress legible and emotionally meaningful.

## Payment brainstorm

### Option 1: no payment in phase 1

**Pros**

- Fastest path to real gated publishing.
- Lets the content model stabilize first.

**Cons**

- No immediate revenue capture.

### Option 2: Stripe-backed paid tier in phase 1

**Pros**

- Immediate monetization path.

**Cons**

- Adds billing, entitlement sync, account-state edge cases, and support load before the content system is proven.

### Payment recommendation

Delay paid billing until after member-gated publishing proves stable and the page grammar for these categories feels right.

With progression gating added, this becomes even more important. Billing plus unlock-state plus attempt-tracking is too much coupling for the first cut.

## Cost-optimized phase-1 stack

As of 2026-04-25, the cheapest credible stack is:

- `Cloudflare Pages` for static delivery
- `Cloudflare Pages Functions / Workers Free` for protected endpoints and challenge validation
- `Supabase Free` for Auth and Postgres

Why this is efficient:

- Cloudflare Pages static asset requests are free and unlimited.
- Pages Functions are billed as Workers requests, and the free plan gives a daily request allowance.
- Supabase Free includes enough Auth and database quota to validate the concept before paid rollout.

Practical implication:

- Keep the dynamic surface tiny.
- Let the heavy read traffic stay on static pages.
- Hit the dynamic endpoint only for:
  - login callback / session checks
  - stage-map personalization
  - challenge submission
  - gated lesson fetch

### Current official pricing signals

Cloudflare official docs say:

- Pages static asset requests are free and unlimited.
- Pages Functions count against Workers quotas.
- Workers Free has a `100,000 requests per day` allowance.
- Workers Paid starts at a `minimum charge of $5 USD per month`.

Supabase official docs say:

- Free plan includes `50,000 MAU`
- Free plan includes `500 MB` database size per project
- Free plan includes `500,000` Edge Function invocations, though phase 1 should avoid using them

### Cost traps to avoid

- Do not render every lesson page through SSR when teaser + protected fetch will do.
- Do not create one database row per generated challenge variant if the answer can be derived from a seed.
- Do not store progress in both Supabase and Cloudflare products.
- Do not add media-heavy uploads early.
- Do not add paid billing before challenge and unlock loops are clearly working.

## Recommended architecture

### Runtime split

- **Astro** remains the page and component layer.
- **Cloudflare Pages / Workers** handles gated route rendering and protected content endpoints.
- **Supabase Auth** handles end-user authentication and session state.
- **Supabase Postgres** stores entitlement data and gated-content metadata as needed.

### Content split

- **Public teaser content** may remain static.
- **Gated full content** must not be emitted into the static site build.
- Gated content should be rendered only after server-side or endpoint-level access checks.
- The stage-map shell can render publicly, but node state and unlock status should personalize after auth.

### Access levels

Start with a minimal entitlement model:

- `public`
- `member`
- `paid`
- `staff` (optional internal override)

This should be represented in content frontmatter and mirrored in a runtime entitlement table or policy layer.

## Recommended URL structure

Keep the categories explicit instead of hiding them behind a generic learning hub in phase 1.

- `/ko/tutorials/`
- `/ko/cookbook/`
- `/ko/playbooks/`
- `/ko/learn/` as the progression hub or stage-map entry point

Each category gets:

- index page
- public teaser detail page shell
- gated full-content boundary

The progression system also gets:

- a **stage-map hub**
- possibly per-track views if multiple tracks emerge later

## Proposed rendering model

### Phase 1 default

Use **static teaser + protected full-content fetch**.

Why:

- Preserves most of the current static-site performance model.
- Minimizes dynamic rendering surface area.
- Keeps cache behavior simple.
- Avoids moving the entire page tree to SSR immediately.

### When to use SSR

Use SSR selectively for:

- account pages
- sign-in / callback pages
- gated content endpoints when access checks are easier server-side
- future personalized recommendations or member state in page chrome

## Recommendation summary

If we optimize for AIKI's actual strengths, the best phase-1 cut is:

- repo-authored content
- explicit teaser/full boundary in one source file
- static teaser pages under dedicated category routes
- protected full-content fetch from Cloudflare runtime
- Supabase Auth magic-link sign-in
- site-wide `member` tier first
- deterministic seeded challenges per account
- branch-capable learning graph from day one
- account-bound unlock records with visible personalized keys
- a dedicated `/ko/learn/` stage-map hub as the main progression index
- no second dynamic backend beyond Cloudflare request handlers
- no paid billing in the first release

This gives AIKI the most important thing early: freedom to make these pages visually distinct and experimentally designed without locking the whole product into a generic content platform or a full-SSR rewrite.

It also gives AIKI a real progression mechanic instead of a thin member wall.

## Content model

Each new entry should at minimum support:

```yaml
title:
summary:
category: tutorial | cookbook | playbook
access: public | member | paid
teaser:
challengeType:
challengeVersion:
unlocks: []
publishedAt:
updatedAt:
tags: []
```

Notes:

- `summary` remains the public metadata source.
- `teaser` is the safe public excerpt.
- Full body should be stored separately from what gets emitted into static HTML.
- Challenge and unlock metadata should be explicit in frontmatter or an adjacent structured block.

## Access model

### Member access

- User authenticates via email magic link through Supabase Auth.
- Session is read by Cloudflare runtime.
- Server checks whether the user has at least `member` entitlement.

### Paid access

- Do not block phase 1 on billing integration.
- Treat `paid` as a reserved access tier until payment tooling is chosen.
- Keep the access model ready for later Stripe integration.

### Progression access

- User can only fetch or render the next gated lesson after the prerequisite unlock exists.
- Passing a challenge writes a `node_unlocks` record tied to the user account.
- The next lesson reads both:
  - membership entitlement
  - progression entitlement

## Challenge evaluation plan

### Phase 1

- exact-match checking only
- deterministic seeded prompt generation
- limited retry count or soft retry cooldown
- server-side grading only

### Phase 2

- multi-part structured answers
- scenario variants
- branch unlocks

### Phase 3

- richer homework artifacts
- possible manual review or AI-assisted rubric scoring

## Abuse and cheating considerations

- Shared screenshots should not be enough because question variants are account-specific.
- Raw answers should not themselves unlock global content.
- Unlock keys should be tied to the account and signed or stored server-side.
- Retry policies should prevent brute-force guessing on short answers.
- Audit logs should keep attempt history for debugging and abuse review.

## Vertical slice: foundation -> branch -> merge

The first implementation should prove the whole loop with the smallest possible surface area.

### Goal of the slice

- User can sign in
- User can open `/ko/learn/`
- User can access `foundation-01`
- User gets a personalized challenge at the end of `foundation-01`
- User submits an answer
- Server evaluates it
- Passing unlocks one or more branch nodes for that account
- Completing one branch can unlock a merged shared node
- `/ko/learn/` updates node state accordingly

### What the slice should not include

- paid access
- branching tracks beyond one optional stub
- multiple challenge types
- admin tooling
- file uploads
- manual review
- streaks, XP, or heavy game systems

## Minimal phase-1 database shape

This is the leanest DB model that still supports the slice cleanly.

### `profiles`

Purpose:

- stable app profile keyed to Supabase auth user id

Minimal columns:

- `id` UUID primary key, same as auth user id
- `email`
- `display_name` nullable
- `created_at`

### `entitlements`

Purpose:

- site-level access tier

Minimal columns:

- `user_id`
- `tier` enum-like text: `member`, `paid`, `staff`
- `granted_at`
- `expires_at` nullable

For the slice:

- only `member` needs to exist

### `learning_nodes`

Purpose:

- canonical lesson registry

Minimal columns:

- `id` text primary key, ex. `foundation-01`
- `slug` text, ex. `tutorials/foundation-01`
- `category` text
- `title`
- `access_tier_required`
- `challenge_type`
- `challenge_version`
- `map_order` integer
- `world_id` text default `core`
- `track_id` nullable
- `prerequisite_mode` text default `any`
- `is_optional` boolean default false

For the slice:

- one row for `foundation-01`
- one row each for `antigravity-01`, `claude-code-01`, `codex-01`
- one row for `coding-agents-common-ground`

### `learning_edges`

Purpose:

- prerequisite graph

Minimal columns:

- `from_node_id`
- `to_node_id`
- `unlock_type` text default `pass-challenge`
- `edge_group` nullable

Interpretation:

- if target node uses `prerequisite_mode = any`, one satisfied inbound edge is enough
- if target node uses `prerequisite_mode = all`, all required inbound edges must be satisfied
- `edge_group` is reserved for richer grouped logic later, but does not need to be used in the first slice

For the slice:

- three branch rows:
  - `foundation-01 -> antigravity-01`
  - `foundation-01 -> claude-code-01`
  - `foundation-01 -> codex-01`
- three merge rows:
  - `antigravity-01 -> coding-agents-common-ground`
  - `claude-code-01 -> coding-agents-common-ground`
  - `codex-01 -> coding-agents-common-ground`

### `challenge_attempts`

Purpose:

- durable audit trail of tries

Minimal columns:

- `id`
- `user_id`
- `node_id`
- `seed`
- `submitted_answer`
- `normalized_answer`
- `is_correct`
- `attempt_number`
- `created_at`

Important note:

- store the seed used for that attempt so debugging stays possible

### `node_unlocks`

Purpose:

- account-bound progression state

Minimal columns:

- `user_id`
- `node_id`
- `unlocked_by_node_id`
- `key_phrase`
- `created_at`

For the slice:

- `foundation-01` can be treated as unlocked by default for members
- passing `foundation-01` inserts unlocks for the branch nodes or marks them available
- passing any one branch unlocks `coding-agents-common-ground`

## Minimal endpoint surface

Keep the endpoint count low.

### `GET /api/learn/map-state`

Purpose:

- return per-user node state for `/ko/learn/`

Returns:

- list of nodes with state: `locked`, `available`, `current`, `cleared`
- optional `key_phrase` for recently unlocked nodes

Called by:

- authenticated users visiting `/ko/learn/`

### `GET /api/learn/node/:id`

Purpose:

- return protected lesson payload for an authorized node

Checks:

- user session exists
- user has required membership tier
- user has unlock for node, or node is the initial node

Returns:

- gated lesson body
- challenge metadata if the node has a challenge

### `POST /api/learn/node/:id/submit`

Purpose:

- validate a challenge answer and write attempt state

Checks:

- user session exists
- node is currently available to this user
- retry policy not exceeded

Behavior:

- derive personalized prompt seed
- normalize submitted answer
- compute expected answer from seed
- insert `challenge_attempts` row
- if correct, insert `node_unlocks` for downstream node
- generate visible personalized `key_phrase`

Returns:

- `pass` or `fail`
- retry guidance if failed
- key phrase and unlocked node if passed

### `GET /api/auth/session`

Purpose:

- lightweight client check for signed-in state when needed

Note:

- if Supabase client state already covers this cleanly, this endpoint may be unnecessary

## Minimal request flow

### Flow A: opening the stage map

1. User loads `/ko/learn/`
2. Static shell renders immediately
3. If signed in, client requests `GET /api/learn/map-state`
4. Response paints node states and highlights the current node

### Flow B: opening foundation-01

1. User enters `foundation-01`
2. Static teaser shell can render first
3. Client requests `GET /api/learn/node/foundation-01`
4. Server returns gated body and personalized challenge metadata

### Flow C: submitting the challenge

1. User submits answer to `POST /api/learn/node/foundation-01/submit`
2. Server grades answer from deterministic seed
3. Attempt is recorded
4. If correct, branch availability is inserted or updated
5. Response returns a personalized key phrase
6. UI updates the completion state and points back to `/ko/learn/`

### Flow D: opening a branch node

1. User returns to `/ko/learn/`
2. Map now shows one or more branch nodes as available
3. User enters `claude-code-01` or another branch
4. Protected fetch succeeds because unlock exists

### Flow E: branch and merge example

1. User completes `foundation-01`
2. Map shows three available branches:
   - `antigravity-01`
   - `claude-code-01`
   - `codex-01`
3. User takes one branch
4. Passing that branch unlocks a merged shared node such as `coding-agents-common-ground`
5. Another user may take a different branch and still reach the same merged node

## How `/ko/learn/` stays cheap

The stage-map hub should be designed so most of it is static.

### Static pieces

- overall layout
- map art or rail
- node labels
- world grouping
- decorative animation
- teaser copy

### Dynamic pieces

- whether the viewer is signed in
- which nodes are unlocked
- which node is current
- which nodes are cleared
- recently earned key phrase or badge

### Cost-efficient rendering model

- render the map shell as a static page
- fetch tiny personalized JSON after auth
- do not SSR the entire map for every visit
- do not fetch full lesson bodies from the map page

This keeps `/ko/learn/` cheap even if it becomes a high-traffic landing page.

## Vertical-slice implementation order

1. Add DB tables for `learning_nodes`, `learning_edges`, `challenge_attempts`, `node_unlocks`
2. Seed a tiny graph, not just a line:
   - `foundation-01`
   - `antigravity-01`
   - `claude-code-01`
   - `codex-01`
   - `coding-agents-common-ground`
3. Add Supabase login
4. Build static `/ko/learn/` shell
5. Implement `GET /api/learn/map-state`
6. Implement `GET /api/learn/node/:id`
7. Implement `POST /api/learn/node/:id/submit`
8. Add personalized key phrase UX after a passing attempt
9. Verify `ANY` prerequisite logic for the merged shared node
10. Verify another account gets a different seeded challenge

## Rollout plan

### Phase 0: architecture proof

- Add adapter support for Cloudflare runtime in Astro.
- Prove one gated endpoint can read session state and return protected content.
- Prove public teaser content remains static.
- Prove one seeded challenge can generate different prompts for two different users.
- Prove passing the challenge writes an unlock that opens the next node.
- Prove the stage map can render generic topology statically and personalize node state after login.

### Phase 1: member-only content

- Add category collections and routes.
- Add Supabase Auth integration with email magic link.
- Add minimal member entitlement check.
- Add challenge templates and seeded grading for tutorials.
- Ship one gated pilot graph, ideally `foundation-01 -> {antigravity-01 | claude-code-01 | codex-01} -> coding-agents-common-ground`.
- Show a personalized unlock key after passing the foundation node and after passing a branch node.
- Ship `/ko/learn/` as the canonical progression index with at least locked / current / cleared states.

### Phase 2: authoring ergonomics

- Add content schema validation for new categories.
- Add preview conventions for teaser and full body.
- Add internal guidance for when to mark content `public`, `member`, or `paid`.
- Add author tooling for challenge templates and unlock graph validation.
- Add progress overview UI for the learner.
- Add richer branch and world-map composition beyond a simple rail.

### Phase 3: paid tier

- Choose payment integration.
- Add `paid` entitlement grant flow.
- Add upgrade CTA and account management surfaces.
- Introduce paid-only playbook branches only after the core progression engine is stable.

## Open questions

1. Whether full content should live in the repo, database, or encrypted blob storage.
2. Whether teaser and full body should be authored in one source file or two linked sources.
3. Whether gated payloads should be HTML, Markdown-rendered HTML, or structured JSON blocks.
4. Whether member status is open registration or admin-approved registration in phase 1.
5. Whether Korean-only launch is sufficient before extending the category system to English.
6. Whether gated content needs copy protection features beyond access control, such as image disabling or partial redaction for unauthenticated users.
7. Whether these categories should share a component grammar or deliberately diverge by content type.
8. Whether users should manually type the earned key phrase on the next lesson, or whether the phrase is purely ceremonial while unlock happens automatically.
9. What the retry policy should be for challenge attempts.
10. Whether any homework types should require human approval in the first release.
11. Whether `/ko/learn/` should be the primary entry point while category indexes remain secondary taxonomy pages.
12. Whether the first map should include a single visible branch or a full three-branch choice from day one.

## Immediate next steps

- Write the design spec for gated content boundaries and authoring workflow.
- Audit Astro route changes required for selective SSR or protected endpoints.
- Define the Supabase tables needed for entitlements and access checks.
- Decide the storage format for full gated content before implementation starts.
- Prototype one vertical slice page with a deliberately expressive layout so the access model is tested against real UI ambition rather than a placeholder page.
- Write one concrete example challenge template and unlocking flow for `foundation-01 -> branch -> merge`.
- Sketch one concrete `/ko/learn/` stage-map layout for desktop and mobile.
