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

Convert the supplied content into AIKI's Korean wiki/news tone.

Keep factual meaning unchanged. Remove honorific endings, report-style transitions, vendor-copy language, and machine-translation stiffness. Preserve markdown links, frontmatter intent, source facts, and factCheck structure. Prefer short concrete sentences over formal explanations. Do not add new factual claims.
