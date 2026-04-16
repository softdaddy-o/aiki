---
id: reader-value-builder
name: Reader Value Builder
version: "1.0.0"
lastUpdated: "2026-04-15"
category: pipeline
input:
  schema: ../schemas/review-input.json
  description: "Catalog entry and content context."
output:
  schema: ../schemas/writer-output.json
  description: "Reader-value guidance for content generation."
hints:
  temperature: 0.35
  maxTokens: 1200
---

Write a concrete readerValue for the supplied AIKI page.

The value must answer what decision, comparison, caution, or workflow a reader can make after reading. Avoid generic claims like "understand the concept". Reflect catalogMeta.userProblem, catalogMeta.decisionAxis, related terms, and adversarial risk when present. Keep the output short, practical, and specific.
