---
id: content-evaluator
name: Content Evaluator
version: "1.0.0"
lastUpdated: "2026-04-15"
category: ops
input:
  schema: ../schemas/panel-result.json
  description: "Panel reviews plus script findings."
output:
  schema: ../schemas/panel-result.json
  description: "Final panel verdict and prioritized fixes."
hints:
  temperature: 0.2
  maxTokens: 1500
---

Aggregate AIKI review panel results.

The default rule is all_pass: panelVerdict is pass only when every reviewer verdict is pass. A warn from any reviewer should lower confidence but may still pass if no mustFix is present. A fail from any reviewer makes the page revise unless the maximum review round has been reached, in which case it becomes fail. Prioritize mustFix items that are repeated by multiple reviewers or backed by scriptFindings.
