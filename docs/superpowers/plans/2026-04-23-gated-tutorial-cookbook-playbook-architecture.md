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

**Pros**

- Better long-term model
- Supports specialization paths

**Cons**

- More authoring complexity

### Learning graph recommendation

Model the system internally as a **directed graph**, even if phase 1 presents a mostly linear path.

That avoids painting the data model into a corner.

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
  - tutorial-02
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

**`learning_edges`**

- from node
- to node
- unlock type

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

Each category gets:

- index page
- public teaser detail page shell
- gated full-content boundary

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
- account-bound unlock records with visible personalized keys
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

## Rollout plan

### Phase 0: architecture proof

- Add adapter support for Cloudflare runtime in Astro.
- Prove one gated endpoint can read session state and return protected content.
- Prove public teaser content remains static.
- Prove one seeded challenge can generate different prompts for two different users.
- Prove passing the challenge writes an unlock that opens the next node.

### Phase 1: member-only content

- Add category collections and routes.
- Add Supabase Auth integration with email magic link.
- Add minimal member entitlement check.
- Add challenge templates and seeded grading for tutorials.
- Ship one gated pilot sequence, ideally `tutorial-01 -> tutorial-02`.
- Show a personalized unlock key after passing tutorial 01.

### Phase 2: authoring ergonomics

- Add content schema validation for new categories.
- Add preview conventions for teaser and full body.
- Add internal guidance for when to mark content `public`, `member`, or `paid`.
- Add author tooling for challenge templates and unlock graph validation.
- Add progress overview UI for the learner.

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

## Immediate next steps

- Write the design spec for gated content boundaries and authoring workflow.
- Audit Astro route changes required for selective SSR or protected endpoints.
- Define the Supabase tables needed for entitlements and access checks.
- Decide the storage format for full gated content before implementation starts.
- Prototype one vertical slice page with a deliberately expressive layout so the access model is tested against real UI ambition rather than a placeholder page.
- Write one concrete example challenge template and unlocking flow for `tutorial-01 -> tutorial-02`.
