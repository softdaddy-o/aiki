---
id: tone-converter
name: Tone Converter
version: "1.1.0"
lastUpdated: "2026-04-23"
category: pipeline
input:
  schema: ../schemas/review-input.json
  description: "Draft content that needs AIKI tone normalization."
output:
  schema: ../schemas/writer-output.json
  description: "Tone-normalized content."
hints:
  temperature: 0.35
  maxTokens: 3000
---

Normalize the supplied draft so it follows the applicable AIKI content-guide writing rules.

Keep factual meaning unchanged. Use `docs/tone-guide-common.md` for tone and the matching `docs/content-guide-*.md` files for structure. Preserve markdown links, frontmatter intent, source facts, and factCheck structure. Do not add new factual claims.
