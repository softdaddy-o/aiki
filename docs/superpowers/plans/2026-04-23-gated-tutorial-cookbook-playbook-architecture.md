# AIKI Gated Tutorial / Cookbook / Playbook Architecture Plan

> **Related issue:** #24  
> **Status:** Initial planning draft  
> **Date:** 2026-04-23

## Goal

Add first-class `tutorial`, `cookbook`, and `playbook` content to AIKI with support for both public teaser access and gated full-content access, without giving up AIKI's custom layout, animation, and motion design freedom.

## Constraints

- AIKI is currently an Astro site optimized for static output.
- Fully gated content cannot be safely shipped in pre-rendered static HTML.
- The new surfaces should stay inside AIKI, not move to a hosted newsletter archive or external membership CMS.
- Cost should stay close to zero for early rollout.
- Email-based sign-in is preferred over building a heavy credential system.

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

## Content model

Each new entry should at minimum support:

```yaml
title:
summary:
category: tutorial | cookbook | playbook
access: public | member | paid
teaser:
publishedAt:
updatedAt:
tags: []
```

Notes:

- `summary` remains the public metadata source.
- `teaser` is the safe public excerpt.
- Full body should be stored separately from what gets emitted into static HTML.

## Access model

### Member access

- User authenticates via email magic link through Supabase Auth.
- Session is read by Cloudflare runtime.
- Server checks whether the user has at least `member` entitlement.

### Paid access

- Do not block phase 1 on billing integration.
- Treat `paid` as a reserved access tier until payment tooling is chosen.
- Keep the access model ready for later Stripe integration.

## Rollout plan

### Phase 0: architecture proof

- Add adapter support for Cloudflare runtime in Astro.
- Prove one gated endpoint can read session state and return protected content.
- Prove public teaser content remains static.

### Phase 1: member-only content

- Add category collections and routes.
- Add Supabase Auth integration with email magic link.
- Add minimal member entitlement check.
- Ship one gated pilot page in each category.

### Phase 2: authoring ergonomics

- Add content schema validation for new categories.
- Add preview conventions for teaser and full body.
- Add internal guidance for when to mark content `public`, `member`, or `paid`.

### Phase 3: paid tier

- Choose payment integration.
- Add `paid` entitlement grant flow.
- Add upgrade CTA and account management surfaces.

## Open questions

1. Whether full content should live in the repo, database, or encrypted blob storage.
2. Whether teaser and full body should be authored in one source file or two linked sources.
3. Whether gated payloads should be HTML, Markdown-rendered HTML, or structured JSON blocks.
4. Whether member status is open registration or admin-approved registration in phase 1.
5. Whether Korean-only launch is sufficient before extending the category system to English.

## Immediate next steps

- Write the design spec for gated content boundaries and authoring workflow.
- Audit Astro route changes required for selective SSR or protected endpoints.
- Define the Supabase tables needed for entitlements and access checks.
- Decide the storage format for full gated content before implementation starts.
