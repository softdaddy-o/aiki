# AIKI Nemotron-Personas-Korea Showcase Design Spec

**Date:** 2026-04-27
**Status:** Approved for implementation planning
**Author:** brainstorming session with muscly

## Problem

AIKI `projects` currently has no first-class `dataset` category, and its existing showcase grammar is tuned mostly for models, tools, and frameworks. `nvidia/Nemotron-Personas-Korea` is materially different: the main user question is not "how does this model run?" but "what kind of synthetic population does this dataset represent, where is it useful, and how can I turn a row into an immediately usable persona seed?"

If we present it like a generic model page, readers will miss its core value:

1. fast go/no-go judgment for use cases,
2. a clear map of the dataset structure,
3. a concrete path from demographic slice to applied output.

## Goals

1. Add `dataset` as a first-class `projects` category across schema, i18n, catalog filtering, and per-page labeling.
2. Add a new Korean project page for `Nemotron-Personas-Korea` using the showcase-native format.
3. Optimize the page for this user priority order:
   1. usage judgment,
   2. dataset structure understanding,
   3. direct application.
4. Use a representative demo that turns dataset slices into worldbuilding character seeds and relationship scaffolds.
5. Preserve the real meaning of the dataset: a synthetic population-aligned seed bank, not a factual directory of real people.

## Non-goals

- Turning the page into a dataset browser or full record explorer
- Building live filtering against the dataset itself
- Claiming factual correctness at the individual persona level
- Reframing the dataset primarily as a model-training benchmark page
- Adding a new global content type outside the existing `projects` collection

## Source baseline

Primary factual baseline for the page:

- Hugging Face dataset card: `nvidia/Nemotron-Personas-Korea`
- Hugging Face NVIDIA blog: `How to Ground a Korean AI Agent in Real Demographics with Synthetic Personas`

Facts to anchor in the showcase copy:

- Released on Hugging Face on **April 20, 2026**
- Blog/tutorial published on **April 21, 2026**
- **7 million personas** total, structured as **1 million records x 7 persona variants**
- **26 fields**
- Coverage includes **17 Korean provinces** and **25 districts**
- **2K+ occupation categories**
- Persona types: **professional, family, sports, arts, travel, culinary, concise**
- License: **CC BY 4.0**
- Designed as fully synthetic, aligned to Korean official statistics and seed data, with no PII

## Decisions

### D1. Keep the content inside `projects`, but add a `dataset` category

`Nemotron-Personas-Korea` is still presented as a project showcase, but its category becomes `dataset`.

Rationale:

- It belongs beside models/tools/frameworks in AIKI's "things you may adopt" surface.
- The existing showcase-native route already supports the right interactive density.
- Adding a new top-level collection would create more routing, templates, and filters than needed.

Implementation effect:

- `src/content.config.ts` extends the `projects.category` enum with `dataset`
- project labels and filters gain a `dataset` string in both Korean and English

### D2. Use a judgment-first showcase, not a field-first showcase

The top of the page answers "Should I use this?" before it answers "What are all 26 fields?"

Rationale:

- The user explicitly prioritized `usage judgment > structure understanding > direct use`
- For datasets, readers often abandon the page if the first screen reads like schema documentation

Resulting section order:

1. `hero`
2. `takeaway`
3. `decide`
4. `dataset map`
5. `worldbuilding lab`
6. `slice board`
7. `pipeline`
8. `limits`
9. `fact`

### D3. Representative demo = worldbuilding seeds and relationship scaffolds

The primary demo is not agent evaluation or SFT. It is a worldbuilding-oriented transformation:

`dataset slice -> grounded character seed -> relationship hooks -> fictional setting adaptation`

Rationale:

- This best satisfies the user's chosen representative use case
- It still respects the dataset's true strength: realistic demographic grounding
- It creates an immediately legible "why this data is useful" moment without pretending the dataset is a finished character generator

### D4. Keep the dataset's real strength visible: synthetic population grounding

The creative demo is secondary to the dataset's actual meaning. The page must repeatedly clarify:

- the rows are synthetic,
- the utility is grounded variation and demographic texture,
- the dataset should not be read as real-person reconstruction.

Rationale:

- Without this, the page drifts into "fun persona cards" and loses technical integrity
- The dataset's differentiation is sovereign, distribution-aligned Korean grounding

### D5. Showcase-native panel grammar remains mandatory

The page uses the same HyperFrames-derived showcase-native shell:

- no prose body render,
- panel/card breakdown only,
- section nav,
- fact check in shared component,
- flat nesting rules,
- no legacy `showcase-frame-with-nav` fallback implementation.

Rationale:

- Required by the aiki UI/UX project rules
- Keeps the new `dataset` type consistent with the rest of the modern project catalog

## Page design

### 1. Hero

Purpose:

- classify the dataset quickly,
- state the main use case boundary,
- surface hard facts that affect adoption.

Hero copy should frame the dataset as:

`A Korea-grounded synthetic persona seed bank for evaluation, persona design, and scenario generation`

Hero meta cards should include:

- total personas: `7M`
- fields: `26`
- geography: `17 provinces + 25 districts`
- license: `CC BY 4.0`

Hero takeaway signal:

- good for grounded persona seeds and scenario slices
- bad for claims about real individuals or factual sociological truth

### 2. Takeaway

Three dense cards:

1. `Why it matters`
2. `What you get`
3. `What it is not`

This section should convert the dataset from an abstract "1M rows" asset into an adoption judgment.

### 3. Decide

Split panel:

- `USE IT`
- `SKIP IT`

`USE IT` examples:

- persona-based agent evaluation
- demographic slice simulation
- character/worldbuilding seed generation
- prompt grounding for synthetic user archetypes

`SKIP IT` examples:

- factual real-person lookup
- truth claims about individual Korean users
- evaluation requiring non-synthetic observed human behavior
- legally sensitive use cases where synthetic provenance is insufficient

### 4. Dataset map

Purpose:

- explain the structure without dropping into raw prose
- show how a row becomes a usable seed

Recommended card grouping:

- persona text fields
- persona attribute fields
- demographic and geographic context fields
- unique identifier

Also show:

- 7 persona types
- age/life-stage framing
- region and district coverage
- occupation density

This section should answer:

- what kind of row exists here?
- what can I slice on?
- what parts are narrative vs context?

### 5. Worldbuilding lab

This is the signature panel.

Subsections:

- `Seed cards`
- `Relation board`
- `Reality -> Fiction transformer`

#### Seed cards

Three curated grounded personas, each built from fields such as:

- province or district
- occupation cluster
- age band
- family type
- education
- hobbies/interests
- one persona variant

The emphasis is:

- first, show the structured seed,
- second, show the readable character brief.

#### Relation board

Show how three grounded seeds can be connected through relationship hooks such as:

- family
- work
- neighborhood/community
- hobby/interest
- conflict/misalignment

This is not a network visualization requirement. It can be implemented as connected cards or a structured board. The key is to show how demographic grounding creates believable relationship material.

#### Reality -> Fiction transformer

Each seed gets a second rendering:

- left: grounded Korean persona
- right: adapted fictional role in a fully invented world

Example transformation pattern:

`regional occupation + life stage + values -> guild role / faction role / district role in a fictional setting`

This preserves the distinction between:

- source grounding,
- creative transformation.

### 6. Slice board

Purpose:

- let the reader feel how useful the dataset is as a compositional seed source
- avoid building a real interactive dataset browser

The board should behave like a "small combinational dashboard" rather than a true filter system.

Control axes:

- province
- occupation cluster
- age band
- family type

Output cards:

- likely persona tone
- relationship hooks
- worldbuilding angles
- sample seed briefs

This section answers:

- if I change one or two dimensions, what kind of character material changes with it?

### 7. Pipeline

Purpose:

- connect the dataset to actual downstream use

Suggested flow:

1. dataset row
2. seed brief
3. relation arc
4. setting note
5. system prompt or sample dialogue seed

This should read like a practical transformation chain, not abstract methodology.

### 8. Limits

Purpose:

- defend the page from overclaiming

Key constraints to state:

- synthetic data
- distribution-aligned, not individual-truthful
- grounded by official statistics and seed data, but still generated
- useful for scenario grounding and testing, not identity reconstruction

This section should be blunt and compact.

### 9. Fact check

Use the shared `<FactCheck>` component in the standard showcase-native placement.

## Architecture and code changes

### Content schema

File:

- `src/content.config.ts`

Change:

- extend `projects.category` from
  - `library | framework | agent | model | tool | bot`
- to
  - `library | framework | agent | model | tool | bot | dataset`

### i18n

Files:

- `src/i18n/ko.json`
- `src/i18n/en.json`

Add:

- `projects.category.dataset`

### Project catalog

File:

- `src/pages/ko/projects/index.astro`

Change:

- include `dataset` in the category filter list

Result:

- the new entry appears with a badge and a working tab filter

### Project detail page

File:

- `src/pages/ko/projects/[...slug].astro`

Changes:

- add `dataset` to the category label map
- add the new showcase component import
- add the new slug/component to the showcase-native routing set
- render the new showcase in the same shell used by other narrative project pages

### New project entry

File:

- `src/content/projects/ko/nemotron-personas-korea.md`

Requirements:

- category = `dataset`
- Hugging Face dataset URL in `githubUrl` field for existing compatibility
- showcaseComponent = `nemotron-personas-korea`
- summary and readerValue optimized for judgment-first reading
- factCheck grounded in Hugging Face primary sources
- `formatVersion: 2`
- `guideVersion.projects: 4.2.0`

### New showcase component

File:

- `src/components/projects/showcases/nemotron-personas-korea/index.tsx`

Requirements:

- showcase-native panel grammar
- own section prefix and nav items
- no markdown prose render
- dense card-based structure
- responsive layout with `minmax(0, 1fr)` discipline
- explicit support for desktop nav rail and mobile fixed pill nav behavior via shared project shell

## Data model for the showcase component

The component should define curated data arrays, not fetch live remote data.

Suggested local arrays:

- `SECTIONS`
- `TAKE_CARDS`
- `USE_CARDS`
- `SKIP_CARDS`
- `FIELD_GROUPS`
- `PERSONA_TYPE_CARDS`
- `WORLD_SEEDS`
- `RELATION_LINKS`
- `TRANSFORM_STEPS`
- `SLICE_VARIANTS`
- `LIMIT_CARDS`

This keeps the page deterministic and reviewable.

## Error handling

### Content risk: overclaiming

Mitigation:

- all strong numeric or structural claims come from the dataset card or NVIDIA blog
- all interpretation cards must distinguish `source fact` from `recommended use`

### UX risk: the creative demo overwhelms the dataset explanation

Mitigation:

- keep `worldbuilding lab` below `dataset map`
- keep `limits` explicit and visible
- maintain clear labels such as `grounded seed`, `fictional adaptation`

### Structure risk: page feels like a generic model showcase

Mitigation:

- make the top sections clearly dataset-centric
- avoid model/runtime cards except where directly relevant to provenance or usage framing

## Testing plan

1. Run `node .claude/skills/aiki-ui-ux/eval/check-source.mjs`
2. Run `bun run build`
3. Run `bun run preview`
4. Run `node .claude/skills/aiki-ui-ux/eval/check-layout.mjs`
5. Manually inspect:
   - `/ko/projects/`
   - `/ko/projects/nemotron-personas-korea/`
   - dataset category tab behavior
   - desktop section nav
   - mobile fixed pill nav
6. Confirm the page communicates:
   - use case fit,
   - dataset structure,
   - worldbuilding transformation path

## File changes summary

```
NEW
  docs/superpowers/specs/2026-04-27-nemotron-personas-korea-showcase-design.md
  src/content/projects/ko/nemotron-personas-korea.md
  src/components/projects/showcases/nemotron-personas-korea/index.tsx

MODIFIED
  src/content.config.ts
  src/i18n/ko.json
  src/i18n/en.json
  src/pages/ko/projects/index.astro
  src/pages/ko/projects/[...slug].astro
```

## Success criteria

- [ ] `dataset` appears as a first-class project category in schema, labels, and filters
- [ ] `/ko/projects/nemotron-personas-korea/` renders through showcase-native, not legacy prose
- [ ] the first screen answers use/no-use before schema details
- [ ] the page explains the 26-field / 7-persona / Korea-coverage structure without raw prose blocks
- [ ] the worldbuilding demo clearly shows grounded seed -> relation -> fictional adaptation
- [ ] the limits section explicitly prevents real-person or truth-claim misreading
- [ ] source and layout evals pass with `FAIL 0`
