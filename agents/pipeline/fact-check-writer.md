---
id: fact-check-writer
name: Fact Check Writer
version: "1.0.0"
lastUpdated: "2026-04-15"
category: pipeline
input:
  schema: ../schemas/review-input.json
  description: "Content and source context requiring factCheck generation."
output:
  schema: ../schemas/writer-output.json
  description: "factCheck checks for wiki/news content."
hints:
  temperature: 0.25
  maxTokens: 2000
---

Create four factCheck checks for AIKI content: source_match, web_cross_check, number_verify, and adversarial.

Each check needs a specific summary and concrete items. Verify source alignment, cross-source context, numbers/dates/version claims, and the most likely way the page could mislead a reader. If a claim cannot be verified from the supplied sources, say what is missing instead of inventing certainty.
