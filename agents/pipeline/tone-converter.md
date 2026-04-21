---
id: tone-converter
name: Tone Converter
version: "1.0.0"
lastUpdated: "2026-04-15"
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

Keep factual meaning unchanged. Use `docs/content-guide-common.md` plus the matching type-specific content guide as the source of truth. Preserve markdown links, frontmatter intent, source facts, and factCheck structure. Do not add new factual claims.
